import { Webhook } from 'svix';

const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const statuses: Record<string, string> = {
  'email.sent': 'accepted',
  'email.delivered': 'delivered',
  'email.delivery_delayed': 'delayed',
  'email.bounced': 'bounced',
  'email.failed': 'failed',
  'email.complained': 'complained',
  'email.suppressed': 'suppressed',
};

function reply(status: number, error: string) {
  return Response.json({ error }, { status, headers });
}

export async function GET() { return reply(405, 'Method not allowed'); }

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return reply(503, 'Delivery tracking is not configured.');
  // Webhooks are server-to-server; verify the raw body signature instead of browser Origin.
  const reader = req.body?.getReader();
  if (!reader) return reply(400, 'Missing webhook payload.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 64_000) { await reader.cancel(); return reply(413, 'Webhook payload is too large.'); }
      chunks.push(value);
    }
  } catch { return reply(400, 'Invalid webhook payload.'); }
  finally { reader.releaseLock(); }
  const bytes = Buffer.concat(chunks);
  const eventId = req.headers.get('svix-id') || '';
  let event: any;
  try {
    new Webhook(secret).verify(bytes.toString('utf8'), {
      'svix-id': eventId,
      'svix-timestamp': req.headers.get('svix-timestamp') || '',
      'svix-signature': req.headers.get('svix-signature') || '',
    });
    event = JSON.parse(bytes.toString('utf8'));
  } catch { return reply(401, 'Invalid webhook signature.'); }
  if (!event || typeof event !== 'object') return reply(400, 'Invalid event.');
  const status = statuses[event.type];
  if (!status || event.data?.tags?.category !== 'sage_itinerary') {
    return Response.json({ ignored: true }, { headers });
  }
  const data = event.data;
  if (typeof data.email_id !== 'string' || !/^[a-zA-Z0-9_-]{1,128}$/.test(data.email_id) ||
      !/^[a-f0-9]{64}$/.test(data.tags.plan_version_id) ||
      !Array.isArray(data.to) || data.to.length !== 1 || typeof data.to[0] !== 'string' ||
      data.to[0].length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.to[0]) ||
      typeof event.created_at !== 'string' || !Number.isFinite(Date.parse(event.created_at))) {
    return reply(400, 'Invalid delivery event.');
  }

  // Configure only after a receiver durably stores/deduplicates eventId and messageId.
  // A failed receiver must cause a non-2xx response so Resend retries the event.
  const sink = process.env.ITINERARY_EVENT_SINK_URL;
  const token = process.env.ITINERARY_EVENT_SINK_TOKEN;
  const authMode = process.env.ITINERARY_EVENT_SINK_AUTH_MODE || 'bearer';
  let sinkUrl: URL;
  try {
    sinkUrl = new URL(sink || '');
    if (sinkUrl.protocol !== 'https:' || sinkUrl.username || sinkUrl.password || !token || token.length < 32 ||
        !['bearer', 'make-api-key'].includes(authMode)) throw new Error();
  } catch { return reply(503, 'Delivery event storage is not configured.'); }
  try {
    const result = await fetch(sinkUrl, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(10_000),
      headers: {
        'Content-Type': 'application/json', 'Idempotency-Key': eventId,
        ...(authMode === 'make-api-key' ? { 'x-make-apikey': token } : { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        schemaVersion: 1, source: 'sage_resend', eventId,
        event: status === 'delivered' ? 'itinerary_email_delivered' : `itinerary_email_${status}`,
        occurredAt: event.created_at, messageId: data.email_id,
        planVersionId: data.tags.plan_version_id, recipient: data.to[0].toLowerCase(), status,
        // This event must never grant marketing permission or subscribe a recipient.
        purpose: 'transactional_itinerary',
      }),
    });
    if (!result.ok) return reply(502, 'Delivery event could not be stored.');
    // Make's default 200 "Accepted" only means queued, not committed to the event ledger.
    const receipt = await result.json();
    if (receipt?.recorded !== true || receipt.eventId !== eventId) return reply(502, 'Delivery event storage was not confirmed.');
  } catch { return reply(502, 'Delivery event could not be stored.'); }
  return Response.json({ recorded: true }, { headers });
}
