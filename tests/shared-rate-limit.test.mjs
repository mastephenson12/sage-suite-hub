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
