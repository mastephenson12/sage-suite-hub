import {
  ActivityType,
  TripSeason,
  getSeasonalSafety,
} from './heatSafety';
import { getArizonaRegion } from './azRegions';
import { getTripScore } from './tripScoring';

export type TripLength = 'half-day' | 'full-day' | 'weekend';

export type TripPlan = {
  title: string;
  intro: string;
  morning: string;
  midday: string;
  afternoon: string;
  extras: string[];
  safety: ReturnType<typeof getSeasonalSafety>;
  region: string;
  score: ReturnType<typeof getTripScore>;
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
  const score = getTripScore({
    safetyLevel: safety.level,
    hasKids: hasKids === 'yes',
    tripLength: length,
    activity,
  });

  const baseTitle =
    activity === 'hike'
      ? `A simple hiking plan for ${cleanLocation}`
      : activity === 'relax'
        ? `An easy scenic plan for ${cleanLocation}`
        : `A balanced explore day for ${cleanLocation}`;

  const intro = `Here is a simple ${tripLengthLabels[
    length
  ].toLowerCase()} plan for ${audience} near ${cleanLocation}. Sage places this in the ${region} region and gives it a ${score.label.toLowerCase()} rating.`;

  if (activity === 'hike') {
    return {
      title: baseTitle,
      intro,
      region,
      safety,
      score,
      morning:
        safety.level === 'danger' || safety.level === 'warning'
          ? `Start extremely early near ${cleanLocation}. Pick a short, realistic trail or swap the hike for a cooler scenic stop if the weather looks rough.`
          : `Start early and pick one family-friendly trail or scenic walking area near ${cleanLocation}.`,
      midday:
        safety.level === 'danger' || safety.level === 'warning'
          ? `Use midday for lunch, shade, indoor stops, visitor centers, local shops, or a water-based option.`
          : `Plan a relaxed lunch break after the hike. Look for a casual local food stop, shady picnic area, or place where everyone can reset.`,
      afternoon:
        length === 'weekend'
          ? `Keep the afternoon lighter and save one bigger stop for tomorrow.`
          : `After lunch, choose one light extra stop like a scenic overlook, visitor center, small downtown walk, or easy nature area.`,
      extras: [
        'Bring more water than you think you need',
        hasKids === 'yes'
          ? 'Pack simple snacks and a backup change of clothes for kids'
          : 'Wear comfortable shoes and keep the pace realistic',
        safety.suggestion,
        length === 'weekend'
          ? 'Save one major activity for the next morning'
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
      score,
      morning: `Start with a scenic drive, overlook, lake area, peaceful outdoor stop, or easy walking area near ${cleanLocation}.`,
      midday: `Pick a lunch spot with easy parking and a relaxed atmosphere.`,
      afternoon:
        safety.level === 'warning' || safety.level === 'danger'
          ? `Keep the afternoon mostly shaded, indoor, or water-friendly.`
          : `Keep the afternoon light with one simple stop like a short walk, downtown browsing, coffee stop, or scenic sunset spot.`,
      extras: [
        'Think comfort first, not maximum productivity',
        hasKids === 'yes'
          ? 'Choose easy stops with bathrooms and snack options nearby'
          : 'Leave room for a slower meal or scenic pause',
        safety.suggestion,
        length === 'weekend'
          ? 'Book lodging close to your main activity'
          : 'End earlier than you think you need to',
      ],
    };
  }

  return {
    title: baseTitle,
    intro,
    region,
    safety,
    score,
    morning: `Start with one anchor stop near ${cleanLocation}, like a downtown walk, outdoor attraction, trail, or family activity.`,
    midday:
      safety.level === 'warning' || safety.level === 'danger'
        ? `Build lunch around comfort: shade, easy parking, bathrooms, and air conditioning if possible.`
        : `Build in a lunch stop and one second activity that fits the energy of the group.`,
    afternoon: `Wrap up with something easy and memorable, like dessert, a scenic stop, a short walk, or a local attraction.`,
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
