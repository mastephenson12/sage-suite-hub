import test from 'node:test';
import assert from 'node:assert/strict';
import { sharedRateLimited } from '../api/_lib/shared-rate-limit.mjs';

test('without Redis configuration, instance-local limiter still protects requests', async () => {
  const priorUrl = process.env.UPSTASH_REDIS_REST_URL;
  const priorToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    let calls = 0;
    const local = () => ++calls > 2;
    assert.equal(await sharedRateLimited('chat', 'test-ip', 2, 60000, local), false);
    assert.equal(await sharedRateLimited('chat', 'test-ip', 2, 60000, local), false);
    assert.equal(await sharedRateLimited('chat', 'test-ip', 2, 60000, local), true);
  } finally {
    if (priorUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
    else process.env.UPSTASH_REDIS_REST_URL = priorUrl;
    if (priorToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
    else process.env.UPSTASH_REDIS_REST_TOKEN = priorToken;
  }
});

test('configured Redis normalizes whitespace, enforces limits and fails closed', async t => {
  const prior = { ...process.env };
  t.after(() => { process.env = prior; });
  process.env.UPSTASH_REDIS_REST_URL = ' https://example.upstash.io/ ';
  process.env.UPSTASH_REDIS_REST_TOKEN = ' fake ';
  let response;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://example.upstash.io');
    assert.equal(options.headers.Authorization, 'Bearer fake');
    return response;
  });
  const check = () => sharedRateLimited('chat', 'synthetic', 2, 60000, () => false);
  for (const count of [1, 2, 3]) {
    response = Response.json({ result: count });
    assert.equal(await check(), count > 2);
  }
  for (response of [Response.json({}, { status: 401 }), Response.json({ error: 'denied' }), Response.json({ result: 0 })]) {
    await assert.rejects(check(), /Shared limiter unavailable/);
  }
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  await assert.rejects(check(), /Shared limiter unavailable/);
});
