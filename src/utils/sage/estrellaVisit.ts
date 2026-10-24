export const ESTRELLA_REVIEWED = 'October 24, 2026';
export const ESTRELLA_ALERT = 'https://www.maricopacountyparks.net/estrella---temporary-playground-and-ramada-closures/';
export const ESTRELLA_DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=14805+W+Vineyard+Ave+Goodyear+AZ';

type VisitPreferences = {
  activity: 'hike' | 'explore' | 'relax';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  length: 'half-day' | 'full-day' | 'weekend';
  hasKids: boolean;
  kidAgeGroup: string;
  wantsShade: boolean;
  needsBathrooms: boolean;
  needsStrollerAccess: boolean;
  estimatedDriveMinutes: number | null;
  maxDriveMinutes: number;
};

export function buildEstrellaVisit(prefs: VisitPreferences) {
  const notes: string[] = [];
  if (prefs.length !== 'half-day') notes.push('This is a short park visit, not a full-day or weekend itinerary. Plan the rest of your time separately or choose another outing.');
  if (prefs.wantsShade) notes.push('Shade matters to you. These desert routes are exposed; an open ramada is not a guarantee of shade along your walk. Choose another outing if continuous shade is essential.');
  if (prefs.needsBathrooms) notes.push('Bathrooms matter to you. The current alert does not confirm which toilets are operating or accessible. Check the nearest open restroom with park staff before leaving.');
  if (prefs.needsStrollerAccess) notes.push('You selected stroller / step-free access. The one-mile pathway has reopened, but its current surface and the parking-to-path route have not been verified. Confirm them with staff before committing.');
  if (prefs.estimatedDriveMinutes === null) notes.push('Drive time from your starting area is not verified. Check the route before treating this as a match.');
  else if (prefs.estimatedDriveMinutes > prefs.maxDriveMinutes) notes.push(`The catalog estimates ${prefs.estimatedDriveMinutes} minutes one way, beyond your ${prefs.maxDriveMinutes}-minute limit. Choose a closer outing or deliberately change your drive limit.`);
  if (prefs.season === 'summer') notes.push('This exposed desert outing is not the summer plan. Choose a cooler or indoor alternative instead of using the morning schedule.');

  const usePath = prefs.needsStrollerAccess || prefs.activity === 'explore';
  const relaxed = prefs.activity === 'relax';
  const routeTitle = relaxed ? 'A brief scenic stop or picnic' : usePath ? 'A short outing on the reopened pathway' : 'Gila Trail: a short desert loop';
  const route = relaxed
    ? 'Choose a currently open picnic or scenic area after checking with staff. Keep the visit brief; hiking is optional. Avoid closed ramadas 7, 10 and 11.'
    : usePath
      ? 'Use a short out-and-back on the reopened one-mile pathway; completing the whole path is optional. Confirm the surface and access from parking, especially with a stroller or mobility aid.'
      : 'The county lists Gila as an easy 0.5-mile loop. Allow 30–45 minutes with breaks as a planning estimate. Confirm current access and turn back if heat or footing does not suit your group.';
  const pacing = relaxed
    ? 'Keep the stop comfortable for your group; no walk is required.'
    : prefs.hasKids && prefs.kidAgeGroup === 'toddlers'
    ? 'With toddlers or preschoolers, start with a brief out-and-back and turn around at the first signs of fatigue. Do not make completing a loop the goal.'
    : prefs.hasKids ? 'Let the youngest walker set the pace and turn back before the group is tired.' : 'Keep a comfortable pace and shorten the visit if conditions change.';
  const schedule = prefs.season === 'summer'
    ? [{ time: 'Before leaving', title: 'Choose a cooler or indoor alternative', description: 'Do not use this exposed desert schedule for a summer outing. Check the forecast and choose another destination or an indoor day.' }]
    : [
      { time: 'Before leaving', title: 'Check the details that matter to your group', description: `Read the dated park alert, check the forecast and confirm parking, toilets and route access with staff. ${notes.join(' ')}` },
      { time: '8:00 AM', title: 'Arrive and check the nearest open facilities', description: 'Use the park entrance at 14805 W. Vineyard Ave., Goodyear. Confirm your parking area and restroom before starting. Vehicle entry is listed at $10; check current fees. The county now lists the turf area, one-mile pathway and loop drive as reopened.' },
      { time: '8:30 AM', title: routeTitle, description: `${route} ${pacing}` },
      { time: '9:15 AM', title: 'Water, snacks and a check-in', description: 'Bring drinking water and snacks. Use the restroom location you confirmed on arrival. Skip the closed playground; Nature Center hours are limited through November 1, 2026.' },
      { time: '9:45 AM', title: 'Finish while the visit still feels easy', description: 'Head back before heat or tiredness changes the day. A shorter visit is a successful outing. Do not add a midday desert hike.' },
      { time: 'After the park', title: 'Lunch and your backup plan', description: 'Pack lunch to eat at home or your accommodation, or check a food stop in Goodyear before leaving. If access, weather or facilities do not fit your group, skip the park and use an indoor alternative.' },
    ];
  return {
    title: prefs.season === 'summer' ? 'Estrella Mountain: choose a summer alternative' : 'Estrella Mountain: a short park morning',
    intro: `A short ${relaxed ? 'scenic or picnic' : usePath ? 'pathway' : 'Gila Trail'} visit, adjusted to your choices. Park information checked ${ESTRELLA_REVIEWED}; verify access and weather before leaving.`,
    notes,
    schedule,
  };
}
