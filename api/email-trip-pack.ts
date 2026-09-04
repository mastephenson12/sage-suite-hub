const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

type TripPackRequest = {
  email: string;
  destination: string;
  subject: string;
  planText: string;
  tripUrl: string;
};

function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;

  try {
    const hostname = new URL(origin).hostname;
    return hostname === 'sage.healthandtravels.com' || hostname.endsWith('.vercel.app') || hostname === 'localhost';
  } catch {
    return false;
  }
}

function isRateLimited(req: Request): boolean {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const bucket = requestBuckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    requestBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

function parseRequest(value: unknown): TripPackRequest | null {
  if (!value || typeof value !== 'object') return null;
  const body = value as Record<string, unknown>;
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const destination = typeof body.destination === 'string' ? body.destination.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const planText = typeof body.planText === 'string' ? body.planText.trim() : '';
  const tripUrl = typeof body.tripUrl === 'string' ? body.tripUrl.trim() : '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return null;
  if (!destination || destination.length > 120 || !subject || subject.length > 160) return null;
  if (!planText || planText.length > 12_000) return null;

  try {
    const url = new URL(tripUrl);
    if (url.hostname !== 'sage.healthandtravels.com' && !url.hostname.endsWith('.vercel.app') && url.hostname !== 'localhost') return null;
  } catch {
    return null;
  }

  return { email, destination, subject, planText, tripUrl };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[character] || character);
}

export async function GET() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) return Response.json({ error: 'Origin not allowed' }, { status: 403 });
  if (isRateLimited(req)) return Response.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });

  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 15_000) return Response.json({ error: 'Request is too large' }, { status: 413 });

  const tripPack = parseRequest(await req.json().catch(() => null));
  if (!tripPack) return Response.json({ error: 'Please enter a valid email and trip plan.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.TRIP_PACK_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: 'Trip-pack email delivery is not configured yet.' }, { status: 503 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [tripPack.email],
      subject: tripPack.subject,
      text: tripPack.planText,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#18181b"><h1>${escapeHtml(tripPack.destination)} family trip pack</h1><p style="white-space:pre-line;line-height:1.6">${escapeHtml(tripPack.planText)}</p><p><a href="${escapeHtml(tripPack.tripUrl)}">Open your live Sage plan</a></p><hr><p style="font-size:13px;color:#52525b">Sent by Sage, the Arizona family trip planner from Health & Travels.</p></div>`,
    }),
  });

  if (!response.ok) {
    console.error('Trip-pack delivery failed', response.status, await response.text());
    return Response.json({ error: 'We could not send the trip pack right now.' }, { status: 502 });
  }

  return Response.json({ sent: true }, { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
