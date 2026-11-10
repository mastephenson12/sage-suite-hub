// Shared, atomic Redis limiter for costly Sage endpoints.
// Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN on Vercel.
// With no configuration, the existing instance-local limiter remains a backstop.
import { createHash } from 'node:crypto';

const script = `
local n = redis.call('INCR', KEYS[1])
if n == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end
return n
`;

export async function sharedRateLimited(scope, identifier, limit, windowMs, localLimiter) {
  // Local protection remains in place even if the Redis service fails.
  if (localLimiter(identifier)) return true;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;
  if (!/^https:\/\/[a-z0-9.-]+\.upstash\.io\/?$/i.test(url)) throw new Error('Invalid rate limit configuration');
  const digest = createHash('sha256').update(identifier).digest('hex');
  const key = `sage:rate:${scope}:${digest}`;
  const response = await fetch(url.replace(/\/$/, ''), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['EVAL', script, '1', key, String(windowMs)]),
    signal: AbortSignal.timeout(2500),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Rate limit service unavailable');
  const data = await response.json();
  if (typeof data.result !== 'number' || !Number.isFinite(data.result)) throw new Error('Invalid rate limit response');
  return data.result > limit;
}
