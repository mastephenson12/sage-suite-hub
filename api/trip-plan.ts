import { readJsonRequest, requestErrorResponse, createLimiter } from './_lib/request-security.mjs';
import { readOrigin, originLabel, origins, type Origin } from '../src/utils/sage/tripOrigins.js';
import { getFamilyTripFacts, formatFamilyTripFacts } from '../src/data/familyTripFacts.js';
import { GoogleGenAI } from '@google/genai';
import { tripPlanFailureDetails } from './_lib/trip-plan-diagnostics.mjs';

const limited = createLimiter(8, 60_000);

type TripPlanRequest = {
  origin: Origin;
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
  if (body.origin !== undefined && !origins.some(option => option.value === body.origin)) return null;

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
    origin: readOrigin(body.origin),
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
    driveFromOrigin: stringValue(plan.driveFromOrigin, 240),
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
    !result.outdoorAnchor.description || !result.driveFromOrigin ||
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
  let body;
  try { body = await readJsonRequest(req, 10000); }
  catch (error) { return requestErrorResponse(error); }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return Response.json({error: 'Too many requests. Please try again shortly.'}, {status: 429, headers: {'Retry-After':'60','Cache-Control':'no-store'}});

  const request = parseRequest(body);
  if (!request) {
    return Response.json({ error: 'Please provide a valid Arizona trip request.' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Structured trip planning failed', tripPlanFailureDetails('configuration'));
    return Response.json({ error: 'Trip planning is not configured.' }, { status: 500 });
  }

  let stage = 'provider';
  let providerResponse;
  try {
    const destinationFacts = getFamilyTripFacts(request.destination);
    const factContext = destinationFacts ? formatFamilyTripFacts(destinationFacts) : 'No reviewed destination snapshot is available.';
    const ai = new GoogleGenAI({ apiKey, httpOptions: { timeout: 25_000 } });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: 'application/json',
        systemInstruction: `You are Sage, a careful Arizona family trip planner. Return only JSON matching the requested shape. Recommend one real, well-known outdoor anchor appropriate to the request. Never invent operating hours, fees, restroom availability, shade, drive times, restaurant details, or coordinates. Qualify anything that may change and tell the traveler to verify current conditions. Drive time is an estimate from ${originLabel(request.origin)}, the requested starting area, not live navigation. Never substitute Phoenix for another requested starting area. Food recommendations should be practical and kid-friendly, but avoid claiming current opening status. Arizona plans must address heat, hydration, weather, seasonal access, and a realistic backup. Use the supplied reviewed destination snapshot for factual constraints. Preserve its uncertainty and review date. Do not recommend facilities listed closed, assume a reopening, or replace unknown facts with guesses. If the group needs a facility or access the snapshot cannot support, recommend an alternative plan. The snapshot is not a live conditions feed.`,
      },
      contents: `Create a practical trip plan for this request:\n${JSON.stringify(request)}\n\nReviewed destination snapshot:\n${factContext}\n\nReturn this exact JSON shape with no markdown:\n{"title":"","summary":"","outdoorAnchor":{"name":"","description":"","coordinates":{"latitude":0,"longitude":0}},"driveFromOrigin":"","foodStop":{"name":"","description":""},"facilities":{"restrooms":"","shade":""},"backupPlan":"","cautions":[""],"verificationNote":""}`,
    });

    providerResponse = response;
    stage = 'empty_response';
    const text = response.text;
    if (!text?.trim()) throw new Error('Empty trip plan');
    stage = 'json';
    const parsed = JSON.parse(text);
    stage = 'validation';
    const plan = parsePlan(parsed);
    if (!plan) throw new Error('Gemini returned an invalid trip plan');

    return Response.json(
      { plan: { ...plan, ...(request.origin === 'phoenix' ? { driveFromPhoenix: plan.driveFromOrigin } : {}) } },
      { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } }
    );
  } catch (error) {
    console.error('Structured trip planning failed', tripPlanFailureDetails(stage, error, providerResponse));
    return Response.json(
      { error: 'Sage could not personalize this plan right now. Your local starter plan is still available.' },
      { status: 502 }
    );
  }
}

