import { getArizonaRegion } from './azRegions';

export type ActivityType = 'hike' | 'relax' | 'explore';
export type TripSeason = 'spring' | 'summer' | 'fall' | 'winter';
export type SafetyLevel = 'good' | 'caution' | 'warning' | 'danger';

export type SafetyResult = {
  level: SafetyLevel;
  badge: string;
  title: string;
  message: string;
  suggestion: string;
};

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
        'Desert hiking in Arizona summer can turn dangerous quickly, especially for families.',
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
        'Arizona can have warm desert weather and snowy mountain conditions on the same day.',
      suggestion:
        'Check road conditions, bring layers, and avoid assuming every trail is dry just because Phoenix feels warm.',
    };
  }

  return {
    level: 'good',
    badge: 'Good Planning Flow',
    title: 'This looks like a flexible Arizona day.',
    message:
      'This plan gives you room to explore without making the day too packed.',
    suggestion:
      'Pick one main stop, one food stop, and one flexible bonus stop.',
  };
}

export function getSafetyCardClasses(level: SafetyLevel): string {
  if (level === 'danger') return 'border-red-200 bg-red-50 text-red-950';
  if (level === 'warning') return 'border-orange-200 bg-orange-50 text-orange-950';
  if (level === 'caution') return 'border-amber-200 bg-amber-50 text-amber-950';

  return 'border-emerald-200 bg-emerald-50 text-emerald-950';
}

export function getSafetyBadgeClasses(level: SafetyLevel): string {
  if (level === 'danger') return 'bg-red-600 text-white';
  if (level === 'warning') return 'bg-orange-500 text-white';
  if (level === 'caution') return 'bg-amber-500 text-white';

  return 'bg-emerald-600 text-white';
}
