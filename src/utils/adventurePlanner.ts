import { origins, estimatedDrive, Origin } from './plannerOrigins';
import { arizonaFamilyDestinations } from '../data/sage/arizonaFamilyDestinations';
import { getFamilyTripFacts } from '../data/familyTripFacts';
import { ActivityType, KidAgeGroup, SageDestination, SageDestinationMatch, TripLength, TripSeason, scoreFamilyAdventure } from './sage';


type Group = 'mixed-family' | 'couple' | 'young-family' | 'older-family' | 'friends' | 'adults';
type Interest = 'hike' | 'water' | 'wildlife' | 'scenic' | 'town' | 'surprise';
type Priority = 'shade' | 'bathrooms' | 'easy' | 'cooler' | 'short-drive';

type PlannerAnswers = {
  origin: Origin;
  group: Group;
  length: TripLength;
  interest: Interest;
  priority: Priority;
  season: TripSeason;
  drive: number | null;
};

type PlannerMatch = SageDestinationMatch & {
  estimatedDriveMinutes: number;
};

const groups: Array<{ value: Group; label: string }> = [
  { value: 'young-family', label: 'Family with young kids' },
  { value: 'older-family', label: 'Family with older kids' },
  { value: 'mixed-family', label: 'Family with mixed ages' },
  { value: 'couple', label: 'Couple' },
  { value: 'friends', label: 'Friends / small group' },
  { value: 'adults', label: 'Adults or grandparents' },
];

const lengths: Array<{ value: TripLength; label: string; note: string }> = [
  { value: 'half-day', label: '2–4 hours', note: 'Keep it close and simple' },
  { value: 'full-day', label: 'Day trip', note: 'One strong Arizona day' },
  { value: 'weekend', label: 'Weekend', note: 'Room to explore and stay' },
];

const interests: Array<{ value: Interest; label: string }> = [
  { value: 'hike', label: 'Hiking' },
  { value: 'water', label: 'Water or lakes' },
  { value: 'wildlife', label: 'Nature & wildlife' },
  { value: 'scenic', label: 'Scenic views' },
  { value: 'town', label: 'Small towns' },
  { value: 'surprise', label: 'Surprise me' },
];

const priorities: Array<{ value: Priority; label: string }> = [
  { value: 'shade', label: 'Shade' },
  { value: 'bathrooms', label: 'Bathrooms' },
  { value: 'easy', label: 'Easy walking' },
  { value: 'cooler', label: 'Cooler weather' },
  { value: 'short-drive', label: 'Short drive' },
];

const guideLinks: Array<{ pattern: RegExp; href: string }> = [
  { pattern: /tonto natural bridge/i, href: 'https://healthandtravels.com/tonto-natural-bridge-with-kids' },
  { pattern: /buffalo park|flagstaff/i, href: 'https://healthandtravels.com/flagstaff-with-kids-family-weekend-guide' },
  { pattern: /sedona|red rock|bell rock|crescent moon/i, href: 'https://healthandtravels.com/sedona-with-kids-family-trip-guide' },
  { pattern: /payson/i, href: 'https://healthandtravels.com/payson-mogollon-rim-family-weekend-guide' },
  { pattern: /papago/i, href: 'https://healthandtravels.com/papago-park-with-kids' },
  { pattern: /estrella/i, href: 'https://healthandtravels.com/estrella-mountain-regional-park-family-guide' },
];

export const plannerFaqs = [
  {
    question: 'How does Sage choose my three Arizona adventure matches?',
    answer: 'Sage compares your starting point, group, available time, preferred activity, practical priority, current season, drive time, shade, bathrooms, difficulty, nearby food, and backup-plan quality.',
  },
  {
    question: 'Do I need an account to use the Arizona adventure planner?',
    answer: 'No. You can get three recommendations and continue into the detailed Sage trip builder without creating an account.',
  },
  {
    question: 'Are drive times and conditions guaranteed?',
    answer: 'No. Drive times are planning estimates. Weather, traffic, closures, wildfire restrictions, road access, fees, and facilities can change, so verify current conditions before leaving.',
  },
];

function currentSeason(): TripSeason {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

function groupSettings(group: Group): { hasKids: boolean; kidAgeGroup: KidAgeGroup } {
  if (group === 'mixed-family') return { hasKids: true, kidAgeGroup: 'mixed' };
  if (group === 'young-family') return { hasKids: true, kidAgeGroup: 'toddlers' };
  if (group === 'older-family') return { hasKids: true, kidAgeGroup: 'teens' };
  return { hasKids: false, kidAgeGroup: 'mixed' };
}

function activityForInterest(interest: Interest): ActivityType {
  if (interest === 'hike') return 'hike';
  if (interest === 'water') return 'relax';
  return 'explore';
}

function driveLimit(length: TripLength): number {
  if (length === 'half-day') return 60;
  if (length === 'full-day') return 120;
  return 240;
}

function interestBoost(interest: Interest, destination: SageDestination): number {
  if (interest === 'surprise') return 0;
  const searchable = `${destination.name} ${destination.region} ${destination.bestFor.join(' ')}`.toLowerCase();
  const patterns: Record<Exclude<Interest, 'surprise'>, RegExp> = {
    hike: /hike|trail|steps|petroglyph|mountain/,
    water: /lake|creek|water|picnic|bridge/,
    wildlife: /nature|park|forest|arboretum|lake|cavern/,
    scenic: /view|red rock|granite|rim|mountain|forest|canyon|lake/,
    town: /sedona|payson|prescott|flagstaff|pinetop|verrado|cave creek/,
  };
  return patterns[interest].test(searchable) ? 12 : 0;
}

function priorityBoost(priority: Priority, destination: SageDestination, driveMinutes: number): number {
  if (priority === 'shade') return destination.shadeScore * 1.4;
  if (priority === 'bathrooms') return destination.bathroomScore * 1.4;
  if (priority === 'easy') return destination.kidDifficultyScore * 1.4;
  if (priority === 'cooler') return (10 - destination.heatRiskScore) * 1.6;
  return Math.max(0, 14 - driveMinutes / 15);
}

function buildMatches(answers: PlannerAnswers): PlannerMatch[] {
  const group = groupSettings(answers.group);
  const maxDriveMinutes = Math.min(answers.drive ?? driveLimit(answers.length), driveLimit(answers.length));

  return arizonaFamilyDestinations
    .filter(destination => estimatedDrive(answers.origin, destination) <= maxDriveMinutes)
    .filter(destination => !(answers.season === 'summer' && answers.interest === 'hike' && destination.heatRiskScore >= 8))
    .map((destination) => {
      const base = scoreFamilyAdventure(
        {
          location: '',
          origin: answers.origin,
          hasKids: group.hasKids,
          activity: activityForInterest(answers.interest),
          length: answers.length,
          season: answers.season,
          kidAgeGroup: group.kidAgeGroup,
          wantsShade: answers.priority === 'shade',
          needsBathrooms: answers.priority === 'bathrooms',
          needsStrollerAccess: answers.priority === 'easy' && answers.group === 'young-family',
          maxDriveMinutes,
        },
        destination
      );
      const travelMinutes = estimatedDrive(answers.origin, destination);
      const overLimit = Math.max(0, travelMinutes - maxDriveMinutes);
      const adjustedScore = Math.max(
        0,
        Math.min(
          100,
          Math.round(base.score + interestBoost(answers.interest, destination) + priorityBoost(answers.priority, destination, travelMinutes) - Math.min(32, overLimit / 5))
        )
      );

      return {
        ...base,
        score: adjustedScore,
        reasons: base.reasons,
        estimatedDriveMinutes: travelMinutes,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function guideFor(destination: SageDestination): string {
  const facts = getFamilyTripFacts(destination.slug);
  if (facts) return facts.guide;
  const searchable = `${destination.name} ${destination.region}`;
  return guideLinks.find((guide) => guide.pattern.test(searchable))?.href ?? 'https://healthandtravels.com/arizona';
}

function builderHref(match: PlannerMatch, answers: PlannerAnswers): string {
  const group = groupSettings(answers.group);
  const params = new URLSearchParams({
    plan: 'ready',
    source: 'unified-adventure',
    origin: answers.origin,
    group: answers.group,
    interest: answers.interest,
    priority: answers.priority,
    location: match.slug,
    kids: group.hasKids ? 'yes' : 'no',
    activity: activityForInterest(answers.interest),
    length: answers.length,
    season: answers.season,
    ages: group.kidAgeGroup,
    shade: String(answers.priority === 'shade'),
    bathrooms: String(answers.priority === 'bathrooms'),
    stroller: String(answers.priority === 'easy' && answers.group === 'young-family'),
    drive: String(Math.min(answers.drive ?? driveLimit(answers.length), driveLimit(answers.length))),
    utm_source: 'sage',
    utm_medium: 'planner',
    utm_campaign: 'plan_my_arizona_adventure',
    utm_content: match.slug,
  });
  return `/trip-builder?${params.toString()}`;
}

function formatDrive(minutes: number): string {
  if (minutes < 60) return `About ${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `About ${hours} hr ${remainder} min` : `About ${hours} hr`;
}


export const driveOptions = [30, 60, 90, 120, 180, 240];
export const seasons = ['spring', 'summer', 'fall', 'winter'] as const;
export function parsePlannerAnswers(params: URLSearchParams): PlannerAnswers {
  function choice<T extends string>(key: string, items: Array<{value:T}>, fallback:T):T {
    return items.find(item => item.value === params.get(key))?.value ?? fallback;
  }
  const drive = Number(params.get('drive'));
  return {
    origin: choice('origin',origins,'phoenix'), group: choice('group',groups,'young-family'),
    length: choice('length',lengths,'full-day'), interest: choice('interest',interests,'scenic'),
    priority: choice('priority',priorities,'bathrooms'),
    season: choice('season',seasons.map(value => ({value})),currentSeason()),
    drive: driveOptions.includes(drive) ? drive : null,
  };
}
export function plannerSearch(answers: PlannerAnswers): string {
  return new URLSearchParams({ ...answers, drive: answers.drive === null ? 'auto' : String(answers.drive), results:'1' }).toString();
}
export { origins, groups, lengths, interests, priorities, buildMatches, builderHref, guideFor, formatDrive, currentSeason, driveLimit, estimatedDrive };
export type { PlannerAnswers, PlannerMatch, Origin };
