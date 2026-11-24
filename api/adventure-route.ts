import { sharedRateLimited } from './_lib/shared-rate-limit.mjs';
import { readJsonRequest, createLimiter } from './_lib/request-security.mjs';

const limited = createLimiter(5, 60000);
const destinations: Record<string,string> = {sedona:'Sedona, Arizona, USA',flagstaff:'Flagstaff, Arizona, USA',payson:'Payson, Arizona, USA','grand-canyon':'Grand Canyon Village, Arizona, USA'};
const origins: Record<string,string> = {phoenix:'Phoenix, Arizona, USA',avondale:'Avondale, Arizona, USA',tucson:'Tucson, Arizona, USA',flagstaff:'Flagstaff, Arizona, USA'};
const allowed = new Set(['https://healthandtravels.com','https://www.healthandtravels.com','https://sage.healthandtravels.com']);
function headers(req: Request) {
 const origin = req.headers.get('origin') || '';
 return {'Cache-Control':'no-store','Vary':'Origin',...(allowed.has(origin)?{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}:{})};
}
export async function OPTIONS(req: Request) {
 return new Response(null,{status: allowed.has(req.headers.get('origin') || '') ? 204 : 403, headers:headers(req)});
}
export async function POST(req: Request) {
 const reply = (data: unknown,status=200) => Response.json(data,{status,headers:headers(req)});
 if (!allowed.has(req.headers.get('origin') || '')) return reply({error:'Origin not allowed'},403);
 let body;
 try {body=await readJsonRequest(req, 1024);} catch {return reply({error:'Invalid request'},400);}
 if (typeof body?.origin !== 'string' || typeof body?.destination !== 'string' || !Object.hasOwn(origins,body.origin) || !Object.hasOwn(destinations,body.destination)) return reply({error:'Choose a supported origin and destination'},400);
 const key=process.env.GOOGLE_ROUTES_API_KEY;
 if (!key) return reply({error:'Route estimates are not configured yet'},503);
 try {
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
 if(await sharedRateLimited('adventure-route',ip,5,60000,limited)) return reply({error:'Please try again in a minute'},429);
 const response=await fetch('https://routes.googleapis.com/directions/v2:computeRoutes',{method:'POST',headers:{'Content-Type':'application/json','X-Goog-Api-Key':key,'X-Goog-FieldMask':'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline'},body:JSON.stringify({origin:{address:origins[body.origin]},destination:{address:destinations[body.destination]},travelMode:'DRIVE',routingPreference:'TRAFFIC_UNAWARE'}),signal:AbortSignal.timeout(10000)});
 if(!response.ok) return reply({error:'Route estimate unavailable'},502);
 const data=await response.json(); const route=data.routes?.[0];
 if(!route || typeof route.distanceMeters !== 'number' || typeof route.duration !== 'string' || !/^\d+(\.\d+)?s$/.test(route.duration) || typeof route.polyline?.encodedPolyline !== 'string') return reply({error:'No route available'},502);
 return reply({miles:Math.round(route.distanceMeters/1609.344*10)/10,minutes:Math.round(parseFloat(route.duration)/60),encodedPolyline:route.polyline.encodedPolyline,provider:'Google Maps'});
 } catch {return reply({error:'Route estimate temporarily unavailable'},503);}
}
