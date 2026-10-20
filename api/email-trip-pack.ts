import { readJsonRequest, requestErrorResponse, createLimiter, isTrustedTripUrl } from './_lib/request-security.mjs';
const limited = createLimiter(5, 60_000);
const recipientLimited = createLimiter(2, 600_000);

type TripPackRequest = {
  email: string;
  destination: string;
  subject: string;
  planText: string;
  tripUrl: string;
};

function parseRequest(value: unknown): TripPackRequest | null {
  if (!value || typeof value !== 'object') return null;
  const body = value as Record<string, unknown>;
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const destination = typeof body.destination === 'string' ? body.destination.trim() : '';
  const subject = `Your ${destination} family adventure plan`;
  const planText = typeof body.planText === 'string' ? body.planText.trim() : '';
  const tripUrl = typeof body.tripUrl === 'string' ? body.tripUrl.trim() : '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return null;
  if (!destination || /[\r\n]/.test(destination) || destination.length > 120 || !subject || subject.length > 160) return null;
  if (!planText || planText.length > 12_000) return null;

  if (!isTrustedTripUrl(tripUrl)) return null;

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
  let body;
  try { body = await readJsonRequest(req, 18000); }
  catch (error) { return requestErrorResponse(error); }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return Response.json({error: 'Too many requests. Please try again shortly.'}, {status: 429, headers: {'Retry-After':'60','Cache-Control':'no-store'}});

  const tripPack = parseRequest(body);
  if (!tripPack) return Response.json({ error: 'Please enter a valid email and trip plan.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.TRIP_PACK_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: 'Trip-pack email delivery is not configured yet.' }, { status: 503 });
  }

  if (recipientLimited(tripPack.email)) return Response.json({error: 'Please wait before emailing this address again.'}, {status: 429, headers: {'Retry-After':'600'}});
  let response;
  try { response = await fetch('https://api.resend.com/emails', {
    signal: AbortSignal.timeout(10_000),
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

  } catch { return Response.json({error: 'We could not send the trip pack right now.'}, {status: 502}); }

  if (!response.ok) {
    console.error('Trip-pack delivery failed', response.status);
    return Response.json({ error: 'We could not send the trip pack right now.' }, { status: 502 });
  }

  return Response.json({ sent: true }, { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
