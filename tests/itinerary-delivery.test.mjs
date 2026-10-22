import test from 'node:test';
import assert from 'node:assert/strict';
import { Webhook } from 'svix';
import { POST as webhook } from '../api/resend-webhook.ts';
import { POST as send } from '../api/email-trip-pack.ts';

const secret = `whsec_${Buffer.alloc(32, 7).toString('base64')}`;
const planVersionId = 'a'.repeat(64);
function signed(event, { id = 'msg_test_event', date = new Date(), mutate = false } = {}) {
  const body = JSON.stringify(event);
  return new Request('https://sage.healthandtravels.com/api/resend-webhook', {
    method: 'POST', headers: {
      'svix-id': id, 'svix-timestamp': String(Math.floor(date.getTime() / 1000)),
      'svix-signature': new Webhook(secret).sign(id, date, body),
    }, body: mutate ? `${body} ` : body,
  });
}
function event(type = 'email.delivered') {
  return { type, created_at: new Date().toISOString(), data: {
    email_id: 'email_test_1', to: ['test@example.com'],
    tags: { category: 'sage_itinerary', plan_version_id: planVersionId },
    subject: 'private destination', text: 'private trip details',
  } };
}

test('verified events forward minimally; retries retain a stable deduplication key', async () => {
  process.env.RESEND_WEBHOOK_SECRET = secret;
  process.env.ITINERARY_EVENT_SINK_URL = 'https://receiver.example.com/events';
  process.env.ITINERARY_EVENT_SINK_TOKEN = 'x'.repeat(32);
  const original = global.fetch;
  const calls = [];
  global.fetch = async (url, options) => { calls.push({ url, options }); return new Response(null, { status: 204 }); };
  try {
    const payload = event();
    assert.equal((await webhook(signed(payload))).status, 200);
    assert.equal((await webhook(signed(payload))).status, 200);
    const sent = JSON.parse(calls[0].options.body);
    assert.equal(sent.event, 'itinerary_email_delivered');
    assert.equal(sent.purpose, 'transactional_itinerary');
    assert.equal(sent.messageId, 'email_test_1');
    assert.equal(sent.planVersionId, planVersionId);
    assert.equal(calls[0].options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
    assert.equal(calls[0].options.redirect, 'error');
    assert(!calls[0].options.body.includes('private'));
    assert(!('marketingConsent' in sent));
    for (const type of ['email.sent','email.delivery_delayed','email.failed','email.bounced','email.complained','email.suppressed']) {
      assert.equal((await webhook(signed(event(type)))).status, 200);
      assert.notEqual(JSON.parse(calls.at(-1).options.body).event, 'itinerary_email_delivered');
    }
    const count = calls.length;
    assert.equal((await webhook(signed(event(), { mutate: true }))).status, 401);
    assert.equal((await webhook(signed(event(), { date: new Date(Date.now() - 600_000) }))).status, 401);
    const other = event(); other.data.tags.category = 'other_email';
    assert.equal((await webhook(signed(other))).status, 200);
    const malformed = event(); malformed.data.to = [];
    assert.equal((await webhook(signed(malformed))).status, 400);
    assert.equal(calls.length, count);
    const oversized = signed({ ...event(), padding: 'x'.repeat(65_000) });
    assert.equal((await webhook(oversized)).status, 413);
    delete process.env.ITINERARY_EVENT_SINK_URL;
    assert.equal((await webhook(signed(event()))).status, 503);
    process.env.ITINERARY_EVENT_SINK_URL = 'https://receiver.example.com/events';
    global.fetch = async () => new Response(null, { status: 500 });
    assert.equal((await webhook(signed(event()))).status, 502);
    global.fetch = async () => { throw Error('timeout'); };
    assert.equal((await webhook(signed(event()))).status, 502);
    delete process.env.RESEND_WEBHOOK_SECRET;
    assert.equal((await webhook(signed(event()))).status, 503);
  } finally {
    global.fetch = original;
    for (const key of ['RESEND_WEBHOOK_SECRET', 'ITINERARY_EVENT_SINK_URL', 'ITINERARY_EVENT_SINK_TOKEN']) delete process.env[key];
  }
});

test('send acceptance returns correlation IDs, never claims delivery, and preserves the snapshot', async () => {
  process.env.RESEND_API_KEY = 'test'; process.env.TRIP_PACK_FROM_EMAIL = 'test@example.com';
  const original = global.fetch;
  let sent;
  global.fetch = async (url, options) => { sent = JSON.parse(options.body); return Response.json({ id: 'message_123' }); };
  const req = email => new Request('https://sage.healthandtravels.com/api/email-trip-pack', {
    method: 'POST', headers: { origin: 'https://sage.healthandtravels.com', 'content-type': 'application/json' },
    body: JSON.stringify({ email, destination: 'Sedona', planText: 'Exact canonical plan', tripUrl: 'https://sage.healthandtravels.com/trip-builder' }),
  });
  try {
    const response = await send(req('accept@example.com'));
    const body = await response.json();
    assert.equal(response.status, 200); assert.equal(body.accepted, true);
    assert.equal(body.messageId, 'message_123'); assert.equal(body.delivered, undefined);
    assert.equal(sent.text, 'Exact canonical plan');
    assert.equal(sent.tags[0].value, 'sage_itinerary');
    assert.equal(sent.tags[1].value, body.planVersionId);
    assert.match(body.planVersionId, /^[a-f0-9]{64}$/);
    global.fetch = async () => Response.json({});
    assert.equal((await send(req('missing-id@example.com'))).status, 502);
  } finally {
    global.fetch = original; delete process.env.RESEND_API_KEY; delete process.env.TRIP_PACK_FROM_EMAIL;
  }
});
