const productionOrigins = ['https://sage.healthandtravels.com', 'https://healthandtravels.com', 'https://www.healthandtravels.com'];

export class RequestError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function trustedOrigins() {
  const origins = new Set(productionOrigins);
  // These values come from this deployment's environment, not a request Host header.
  for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) {
    if (host && /^[a-z0-9.-]+\.vercel\.app$/i.test(host)) origins.add(`https://${host}`);
  }
  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:3000'); origins.add('http://localhost:5173');
  }
  return origins;
}

export function isTrustedTripUrl(value) {
  try {
    const url = new URL(value);
    return !url.username && !url.password && trustedOrigins().has(url.origin) &&
      (url.hostname === 'sage.healthandtravels.com' || url.hostname.endsWith('.vercel.app') || url.hostname === 'localhost') &&
      ['/trip-builder', '/my-arizona-adventure'].includes(url.pathname.replace(/\/$/, ''));
  } catch { return false; }
}

export async function readJsonRequest(req, maxBytes) {
  if (!trustedOrigins().has(req.headers.get('origin'))) throw new RequestError(403, 'Origin not allowed');
  if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new RequestError(415, 'Expected a JSON request');
  const declared = req.headers.get('content-length');
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) throw new RequestError(413, 'Request is too large');
  const reader = req.body?.getReader();
  if (!reader) throw new RequestError(400, 'Invalid request');
  let size = 0;
  const chunks = [];
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new RequestError(413, 'Request is too large'); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const value = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid JSON object');
    return value;
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError(400, 'Invalid JSON request');
  } finally { reader.releaseLock(); }
}

export function requestErrorResponse(error) {
  const status = error instanceof RequestError ? error.status : 500;
  return Response.json({error: status === 500 ? 'Request could not be processed' : error.message},
    {status, headers: {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'}});
}

// Instance-local backstop only. Shared edge/provider quotas are still required.
export function createLimiter(limit, windowMs, maxBuckets = 5000) {
  const buckets = new Map();
  return (key, now = Date.now()) => {
    for (const [id, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(id);
    const bucket = buckets.get(key);
    if (bucket) { if (bucket.count >= limit) return true; bucket.count++; return false; }
    if (buckets.size >= maxBuckets) return true; // Do not evict active limits to admit new clients.
    buckets.set(key, {count: 1, resetAt: now + windowMs}); return false;
  };
}
