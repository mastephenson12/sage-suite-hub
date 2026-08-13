import { GoogleGenAI } from '@google/genai';

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

type TripPlanRequest = {
  destination: string;
  group: string;
  activity: string;
  length: string;
  season: string;
  kidAgeGroup: string;
  wantsShade: boolean;
  needsBathrooms: boolean;
  needsStrollerAccess: boolean;
  maxDriveMinutes: number;
};

function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;

  try {
    const hostname = new URL(origin).hostname;
    return (
      hostname === 'healthandtravels.com' ||
      hostname === 'www.healthandtravels.com' ||
      hostname === 'sage.healthandtravels.com' ||
      hostname.endsWith('.vercel.app') ||
      hostname === 'localhost'
    );
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

function cleanString(value: unknown, maxLength = 120): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return cleaned && cleaned.length <= maxLength ? cleaned : null;
}

function parseRequest(value: unknown): TripPlanRequest | null {
  if (!value || typeof value !== 'object') return null;
  const body = value as Record<string, unknown>;
  const destination = cleanString(body.destination, 100);
  const group = cleanString(body.group, 60);
  const activity = cleanString(body.activity, 40);
  const length = cleanString(body.length, 40);
  const season = cleanString(body.season, 30);
  const kidAgeGroup = cleanString(body.kidAgeGroup, 40);
  const maxDriveMinutes = Number(body.maxDriveMinutes);

  if (
    !destination ||
    !group ||
    !activity ||
    !length ||
    !season ||
    !kidAgeGroup ||
    !Number.isFinite(maxDriveMinutes) ||
    maxDriveMinutes < 15 ||
    maxDriveMinutes > 600
  ) {
    return null;
  }

  return {
    destination,
    group,
    activity,
    length,
    season,
    kidAgeGroup,
    wantsShade: body.wantsShade === true,
    needsBathrooms: body.needsBathrooms === true,
    needsStrollerAccess: body.needsStrollerAccess === true,
    maxDriveMinutes,
  };
}

function stringValue(value: unknown, maxLength = 600): string | null {
  return cleanString(value, maxLength);
}

function parsePlan(value: unknown) {
  if (!value || typeof value !== 'object') return null;
  const plan = value as Record<string, unknown>;
  const anchor = plan.outdoorAnchor as Record<string, unknown> | undefined;
  const food = plan.foodStop as Record<string, unknown> | undefined;
  const facilities = plan.facilities as Record<string, unknown> | undefined;
  const coordinates = anchor?.coordinates as Record<string, unknown> | null | undefined;
  const latitude = Number(coordinates?.latitude);
  const longitude = Number(coordinates?.longitude);
  const cautions = Array.isArray(plan.cautions)
    ? plan.cautions.map((item) => stringValue(item, 240)).filter((item): item is string => Boolean(item)).slice(0, 5)
    : [];

  const result = {
    title: stringValue(plan.title, 140),
    summary: stringValue(plan.summary),
    outdoorAnchor: {
      name: stringValue(anchor?.name, 160),
      description: stringValue(anchor?.description),
      coordinates:
        Number.isFinite(latitude) && Number.isFinite(longitude) &&
        latitude >= 31 && latitude <= 38 && longitude >= -115 && longitude <= -108
          ? { latitude, longitude }
          : null,
    },
    driveFromPhoenix: stringValue(plan.driveFromPhoenix, 240),
    foodStop: {
      name: stringValue(food?.name, 160),
      description: stringValue(food?.description),
    },
    facilities: {
      restrooms: stringValue(facilities?.restrooms, 300),
      shade: stringValue(facilities?.shade, 300),
    },
    backupPlan: stringValue(plan.backupPlan),
    cautions,
    verificationNote: stringValue(plan.verificationNote, 300),
  };

  if (
    !result.title || !result.summary || !result.outdoorAnchor.name ||
    !result.outdoorAnchor.description || !result.driveFromPhoenix ||
    !result.foodStop.name || !result.foodStop.description ||
    !result.facilities.restrooms || !result.facilities.shade ||
    !result.backupPlan || !result.verificationNote
  ) return null;

  return result;
}

export async function GET() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return Response.json({ error: 'Origin not allowed' }, { status: 403 });
  }
  if (isRateLimited(req)) {
    return Response.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 10_000) {
    return Response.json({ error: 'Request is too large' }, { status: 413 });
  }

  const request = parseRequest(await req.json().catch(() => null));
  if (!request) {
    return Response.json({ error: 'Please provide a valid Arizona trip request.' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Trip planning is not configured.' }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        responseMimeType: 'application/json',
        systemInstruction: `You are Sage, a careful Arizona family trip planner. Return only JSON matching the requested shape. Recommend one real, well-known outdoor anchor appropriate to the request. Never invent operating hours, fees, restroom availability, shade, drive times, restaurant details, or coordinates. Qualify anything that may change and tell the traveler to verify current conditions. Drive time is an estimate from central Phoenix, not live navigation. Food recommendations should be practical and kid-friendly, but avoid claiming current opening status. Arizona plans must address heat, hydration, weather, seasonal access, and a realistic backup.`,
      },
      contents: `Create a practical trip plan for this request:\n${JSON.stringify(request)}\n\nReturn this exact JSON shape with no markdown:\n{"title":"","summary":"","outdoorAnchor":{"name":"","description":"","coordinates":{"latitude":0,"longitude":0}},"driveFromPhoenix":"","foodStop":{"name":"","description":""},"facilities":{"restrooms":"","shade":""},"backupPlan":"","cautions":[""],"verificationNote":""}`,
    });

    const parsed = JSON.parse(response.text || '{}');
    const plan = parsePlan(parsed);
    if (!plan) throw new Error('Gemini returned an invalid trip plan');

    return Response.json(
      { plan },
      { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } }
    );
  } catch (error) {
    console.error('Structured trip planning failed', error);
    return Response.json(
      { error: 'Sage could not personalize this plan right now. Your local starter plan is still available.' },
      { status: 502 }
    );
  }
}

