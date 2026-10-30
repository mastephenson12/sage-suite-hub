// Accept complete descriptive text rather than rejecting a usable plan at a
// presentation-length limit. Keep a hard bound, never truncate safety advice.
function text(value, max = 4000) {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean && clean.length <= max ? clean : null;
}
function object(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
export function parsePlan(value) {
  const plan = object(value);
  const anchor = object(plan.outdoorAnchor);
  const food = object(plan.foodStop);
  const facilities = object(plan.facilities);
  const coordinates = object(anchor.coordinates);
  const {latitude, longitude} = coordinates;
  const cautions = Array.isArray(plan.cautions) && plan.cautions.length <= 10
    ? plan.cautions.map(item => text(item)) : null;
  const result = {
    title: text(plan.title, 400), summary: text(plan.summary),
    outdoorAnchor: {
      name: text(anchor.name, 400), description: text(anchor.description),
      coordinates: typeof latitude === 'number' && typeof longitude === 'number' &&
        Number.isFinite(latitude) && Number.isFinite(longitude) &&
        latitude >= 31 && latitude <= 38 && longitude >= -115 && longitude <= -108
        ? {latitude, longitude} : null,
    },
    driveFromOrigin: text(plan.driveFromOrigin),
    foodStop: {name: text(food.name, 400), description: text(food.description)},
    facilities: {restrooms: text(facilities.restrooms), shade: text(facilities.shade)},
    backupPlan: text(plan.backupPlan), cautions,
    verificationNote: text(plan.verificationNote),
  };
  if (!result.title || !result.summary || !result.outdoorAnchor.name || !result.outdoorAnchor.description ||
    !result.driveFromOrigin || !result.foodStop.name || !result.foodStop.description ||
    !result.facilities.restrooms || !result.facilities.shade || !result.backupPlan ||
    !result.verificationNote || !cautions || cautions.some(item => !item)) return null;
  return result;
}
const string = {type:'STRING'};
const objectSchema = properties => ({type:'OBJECT', properties, required:Object.keys(properties)});
// JSON MIME alone guarantees neither property names nor required nested fields.
export const tripPlanSchema = objectSchema({
  title:string, summary:string,
  outdoorAnchor:objectSchema({name:string, description:string,
    coordinates:{type:'OBJECT', nullable:true, properties:{latitude:{type:'NUMBER'},longitude:{type:'NUMBER'}},required:['latitude','longitude']}}),
  driveFromOrigin:string,
  foodStop:objectSchema({name:string,description:string}),
  facilities:objectSchema({restrooms:string,shade:string}),
  backupPlan:string, cautions:{type:'ARRAY',items:string,maxItems:5}, verificationNote:string,
});
