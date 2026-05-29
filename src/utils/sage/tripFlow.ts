export type ActivityType = 'hike' | 'relax' | 'explore';
export type TripLength = 'half-day' | 'full-day' | 'weekend';
export type TripSeason = 'spring' | 'summer' | 'fall' | 'winter';

export type SafetyLevel = 'good' | 'caution' | 'warning' | 'danger';

export type SafetyResult = {
  level: SafetyLevel;
  badge: string;
  title: string;
  message: string;
  suggestion: string;
};

export type TripPlan = {
  title: string;
  intro: string;
  morning: string;
  midday: string;
  afternoon: string;
  extras: string[];
  safety: SafetyResult;
  region: string;
};

export const activityLabels: Record<ActivityType, string> = {
  hike: 'Hiking adventure',
  explore: 'Explore a town / mixed day',
  relax: 'Easy scenic day',
};

export const tripLengthLabels: Record<TripLength, string> = {
  'half-day': 'Half day',
  'full-day': 'Full day',
  weekend: 'Weekend',
};

export const seasonLabels: Record<TripSeason, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

export function toTripSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function parseNumberFromText(value?: string | number): number {
  if (typeof value === 'number') return value;

  if (!value) return 0;

  const match = value.replace(/,/g, '').match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export function getArizonaRegion(location: string): string {
  const name = location.trim().toLowerCase();

  if (
    name.includes('sedona') ||
    name.includes('cottonwood') ||
    name.includes('jerome') ||
    name.includes('camp verde') ||
    name.includes('verde')
  ) {
    return 'Sedona / Verde Valley';
  }

  if (
    name.includes('flagstaff') ||
    name.includes('williams') ||
    name.includes('grand canyon') ||
    name.includes('humphreys')
  ) {
    return 'Flagstaff / High Country';
  }

  if (
    name.includes('payson') ||
    name.includes('pine') ||
    name.includes('strawberry') ||
    name.includes('mogollon') ||
    name.includes('rim')
  ) {
    return 'Mogollon Rim';
  }

  if (
    name.includes('pinetop') ||
    name.includes('show low') ||
    name.includes('greer') ||
    name.includes('white mountains')
  ) {
    return 'White Mountains';
  }

  if (
    name.includes('tucson') ||
    name.includes('bisbee') ||
    name.includes('sonoita') ||
    name.includes('sierra vista') ||
    name.includes('patagonia')
  ) {
    return 'Southern Arizona';
  }

  if (
    name.includes('yuma') ||
    name.includes('lake havasu') ||
    name.includes('parker') ||
    name.includes('page') ||
    name.includes('colorado river')
  ) {
    return 'Western / Northern Arizona';
  }

  if (
    name.includes('phoenix') ||
    name.includes('scottsdale') ||
    name.includes('mesa') ||
    name.includes('tempe') ||
    name.includes('chandler') ||
    name.includes('glendale') ||
    name.includes('avondale') ||
    name.includes('surprise') ||
    name.includes('camelback') ||
    name.includes('superstition')
  ) {
    return 'Valley of the Sun';
  }

  return 'Arizona';
}

export function getSeasonalSafety(
  location: string,
  activity: ActivityType,
  season: TripSeason
): SafetyResult {
  const region = getArizonaRegion(location);
  const isDesert =
    region === 'Valley of the Sun' ||
    region === 'Western / Northern Arizona' ||
    region === 'Southern Arizona';

  if (season === 'summer' && activity === 'hike' && isDesert) {
    return {
      level: 'danger',
      badge: 'Summer Heat Risk',
      title: 'This needs an early start or a cooler backup.',
      message:
        'Desert hiking in Arizona summer can turn from fun to foolish very quickly, because apparently the sun has a personal vendetta here.',
      suggestion:
        'Start before sunrise, choose a short route, bring serious water, or switch to higher elevation, water, museums, caves, visitor centers, or shaded stops.',
    };
  }

  if (season === 'summer' && isDesert) {
    return {
      level: 'warning',
      badge: 'Plan Around Heat',
      title: 'Keep the outdoor parts short and early.',
      message:
        'This can still work, but the day should be built around shade, water, easy parking, bathrooms, and indoor breaks.',
      suggestion:
        'Do outdoor stops early, save restaurants and indoor attractions for midday, and keep the afternoon flexible.',
    };
  }

  if (season === 'winter' && !isDesert) {
    return {
      level: 'caution',
      badge: 'Check Winter Conditions',
      title: 'Higher elevation may mean snow, ice, or closures.',
      message:
        'Arizona likes to confuse people by having desert heat and mountain snow in the same state. Charming little geography prank.',
      suggestion:
        'Check road conditions, bring layers, and avoid assuming every trail is dry just because Phoenix feels warm.',
    };
  }

  if (activity === 'hike') {
    return {
      level: 'good',
      badge: 'Good Hiking Flow',
      title: 'This looks like a reasonable outdoor plan.',
      message:
        'A hike can anchor the day well if you keep the route realistic and leave room for food, rest, and a backup stop.',
      suggestion:
        'Start with the trail, eat nearby afterward, then add one simple scenic or town stop.',
    };
  }

  return {
    level: 'good',
    badge: 'Easy Planning Flow',
    title: 'This looks like a flexible Arizona day.',
    message:
      'This plan gives you room to explore without turning the day into a military operation with snacks.',
    suggestion:
      'Pick one main stop, one food stop, and one flexible bonus stop.',
  };
}

export function getTrailPageSafety({
  trailName,
  location,
  difficulty,
  elevationGain,
}: {
  trailName: string;
  location: string;
  difficulty?: string;
  elevationGain?: string | number;
}): SafetyResult {
  const gain = parseNumberFromText(elevationGain);
  const region = getArizonaRegion(`${trailName} ${location}`);
  const normalizedDifficulty = difficulty?.toLowerCase() || '';

  if (
    region === 'Valley of the Sun' &&
    (normalizedDifficulty.includes('hard') || gain >= 1200)
  ) {
    return {
      level: 'warning',
      badge: 'Heat + Effort Warning',
      title: 'This trail deserves extra respect.',
      message:
        'This route may be a poor fit during warm parts of the day, especially for families, newer hikers, or anyone pretending Arizona heat is normal.',
      suggestion:
        'Start very early, bring more water than feels reasonable, and have a shorter backup plan.',
    };
  }

  if (normalizedDifficulty.includes('hard') || gain >= 1500) {
    return {
      level: 'caution',
      badge: 'Strenuous Trail',
      title: 'This is better for prepared hikers.',
      message:
        'The distance or elevation gain may be too much for casual family hiking unless everyone is ready for it.',
      suggestion:
        'Check the weather, start early, pack extra water, and consider a shorter nearby option for younger kids.',
    };
  }

  if (normalizedDifficulty.includes('easy') && gain <= 600) {
    return {
      level: 'good',
      badge: 'Family-Friendly Potential',
      title: 'This may work well for a simpler family outing.',
      message:
        'The trail profile looks more forgiving, which is lovely because not every adventure needs to become a survival documentary.',
      suggestion:
        'Still check heat, parking, bathrooms, and how tired the group is before adding extra stops.',
    };
  }

  return {
    level: 'good',
    badge: 'Standard Trail Prep',
    title: 'A little planning will make this smoother.',
    message:
      'This looks like a reasonable trail option if the weather, timing, and group energy all cooperate.',
    suggestion:
      'Bring water, sun protection, snacks, and a flexible attitude. Arizona rewards the prepared and humbles everyone else.',
  };
}

export function buildTripPlan(
  location: string,
  hasKids: string,
  activity: ActivityType,
  length: TripLength,
  season: TripSeason
): TripPlan {
  const cleanLocation = location.trim() || 'Arizona';
  const audience = hasKids === 'yes' ? 'a family with kids' : 'adults';
  const region = getArizonaRegion(cleanLocation);
  const safety = getSeasonalSafety(cleanLocation, activity, season);

  const baseTitle =
    activity === 'hike'
      ? `A simple hiking plan for ${cleanLocation}`
      : activity === 'relax'
        ? `An easy scenic plan for ${cleanLocation}`
        : `A balanced explore day for ${cleanLocation}`;

  const intro = `Here is a simple ${tripLengthLabels[
    length
  ].toLowerCase()} plan for ${audience} near ${cleanLocation}. Sage places this in the ${region} region and keeps the day realistic, useful, and not built like some travel influencer fantasy where nobody gets tired, hungry, sunburned, or cranky.`;

  if (activity === 'hike') {
    return {
      title: baseTitle,
      intro,
      region,
      safety,
      morning:
        safety.level === 'danger' || safety.level === 'warning'
          ? `Start extremely early near ${cleanLocation}. Pick a short, realistic trail or swap the hike for a cooler scenic stop if the weather looks rough.`
          : `Start early and pick one family-friendly trail or scenic walking area near ${cleanLocation}. Keep the first stop simple so the day starts with a win instead of stress.`,
      midday:
        safety.level === 'danger' || safety.level === 'warning'
          ? `Use midday for lunch, shade, indoor stops, visitor centers, local shops, or a water-based option. Do not make the hottest part of the day the main event, because that is how humans invent regret.`
          : `Plan a relaxed lunch break after the hike. Look for a casual local food stop, a shady picnic area, or a place where everyone can reset before the second half of the day.`,
      afternoon:
        length === 'weekend'
          ? `Keep the afternoon lighter and save one bigger stop for tomorrow. A good weekend trip should not feel like a punishment with hotel keys.`
          : `After lunch, choose one light extra stop like a scenic overlook, visitor center, small downtown walk, or easy nature area instead of trying to cram in too much.`,
      extras: [
        'Bring more water than you think you need',
        hasKids === 'yes'
          ? 'Pack simple snacks and a backup change of clothes for kids'
          : 'Wear comfortable shoes and keep the pace realistic',
        safety.suggestion,
        length === 'weekend'
          ? 'Save one major activity for the next morning instead of doing everything on day one'
          : 'Leave margin in the schedule so the day still feels fun',
      ],
    };
  }

  if (activity === 'relax') {
    return {
      title: baseTitle,
      intro,
      region,
      safety,
      morning: `Start with a scenic drive, overlook, lake area, peaceful outdoor stop, or easy walking area near ${cleanLocation}. The goal is a low-pressure beginning that still feels memorable.`,
      midday: `Pick a lunch spot with easy parking and a relaxed atmosphere. If kids are coming, bonus points if there is room to move around without everyone feeling trapped in a booth-based hostage situation.`,
      afternoon:
        safety.level === 'warning' || safety.level === 'danger'
          ? `Keep the afternoon mostly shaded, indoor, or water-friendly. This is the time for coffee, dessert, local shops, museums, visitor centers, or a scenic drive.`
          : `Keep the afternoon light with one simple stop like a short walk, downtown browsing, a coffee stop, or a scenic sunset spot instead of turning this into a marathon.`,
      extras: [
        'Think comfort first, not maximum productivity',
        hasKids === 'yes'
          ? 'Choose easy stops with bathrooms and snack options nearby'
          : 'Leave room for a slower meal or a scenic pause',
        safety.suggestion,
        length === 'weekend'
          ? 'Book lodging close to your main activity so driving stays easy'
          : 'End earlier than you think you need to',
      ],
    };
  }

  return {
    title: baseTitle,
    intro,
    region,
    safety,
    morning: `Start with one anchor stop near ${cleanLocation}, like a downtown walk, outdoor attraction, trail, or family activity that gives the day a clear beginning.`,
    midday:
      safety.level === 'warning' || safety.level === 'danger'
        ? `Build lunch around comfort: shade, easy parking, bathrooms, and air conditioning if possible. Arizona midday heat is not a personality test.`
        : `Build in a lunch stop and one second activity that fits the energy of the group. This keeps the day feeling full without turning into chaos.`,
    afternoon: `Wrap up with something easy and memorable, like dessert, a scenic stop, a short walk, or a local attraction that does not require a huge commitment.`,
    extras: [
      'Pick one must-do and let the rest stay flexible',
      hasKids === 'yes'
        ? 'Plan around attention span, not fantasy schedules'
        : 'Keep transitions simple so the day flows better',
      safety.suggestion,
      length === 'weekend'
        ? 'Split bigger experiences across two days'
        : 'Do less, but do it better',
    ],
  };
}

export function getSafetyCardClasses(level: SafetyLevel): string {
  if (level === 'danger') {
    return 'border-red-200 bg-red-50 text-red-950';
  }

  if (level === 'warning') {
    return 'border-orange-200 bg-orange-50 text-orange-950';
  }

  if (level === 'caution') {
    return 'border-amber-200 bg-amber-50 text-amber-950';
  }

  return 'border-emerald-200 bg-emerald-50 text-emerald-950';
}

export function getSafetyBadgeClasses(level: SafetyLevel): string {
  if (level === 'danger') {
    return 'bg-red-600 text-white';
  }

  if (level === 'warning') {
    return 'bg-orange-500 text-white';
  }

  if (level === 'caution') {
    return 'bg-amber-500 text-white';
  }

  return 'bg-emerald-600 text-white';
}
