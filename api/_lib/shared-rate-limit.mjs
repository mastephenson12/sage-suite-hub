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
  if (url === undefined && token === undefined) {
    console.warn('Sage rate limiter: shared Redis not configured', { scope });
    return false;
  }
  function fail(reason) {
    console.error('Sage shared limiter failure', { scope, reason });
    throw new Error('Shared limiter unavailable');
  }
  const endpoint = url?.trim();
  const credential = token?.trim();
  if (!endpoint || !credential) fail('incomplete_configuration');
  if (!/^https:\/\/[a-z0-9.-]+\.upstash\.io\/?$/i.test(endpoint)) fail('invalid_endpoint');
  const digest = createHash('sha256').update(identifier).digest('hex');
  const key = `sage:rate:${scope}:${digest}`;
  const response = await fetch(endpoint.replace(/\/$/, ''), {
    method: 'POST',
    headers: { Authorization: `Bearer ${credential}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['EVAL', script, '1', key, String(windowMs)]),
    signal: AbortSignal.timeout(2500),
    cache: 'no-store',
    redirect: 'error',
  }).catch(error => fail(error?.name === 'TimeoutError' ? 'timeout' : 'transport'));
  if (!response.ok) fail('http_' + response.status);
  const data = await response.json().catch(() => fail('invalid_json'));
  if (!Number.isSafeInteger(data?.result) || data.result < 1) fail(data?.error ? 'redis_command' : 'invalid_count');
  // Log only the scope and outcome. Never log tokens, IPs, emails, or Redis keys.
  console.info('Sage rate limiter: shared Redis request succeeded', { scope, limited: data.result > limit });
  return data.result > limit;
}
