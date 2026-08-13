import { ActivityType, TripSeason } from './heatSafety';
import { TripLength } from './familyTripRules';
import { arizonaFamilyDestinations } from '../../data/sage/arizonaFamilyDestinations';

export type KidAgeGroup = 'toddlers' | 'elementary' | 'mixed' | 'teens';

export type FamilyAdventureInput = {
  location: string;
  hasKids: boolean;
  activity: ActivityType;
  length: TripLength;
  season: TripSeason;
  kidAgeGroup: KidAgeGroup;
  wantsShade: boolean;
  needsBathrooms: boolean;
  needsStrollerAccess: boolean;
  maxDriveMinutes: number;
};

export type SageDestination = {
  name: string;
  slug: string;
  region: string;
  driveMinutesFromPhoenix: number;
  shadeScore: number;
  bathroomScore: number;
  strollerScore: number;
  kidDifficultyScore: number;
  heatRiskScore: number;
  foodNearbyScore: number;
  lodgingNearbyScore: number;
  backupPlanScore: number;
  bestFor: string[];
  activityTypes: ActivityType[];
  idealLengths: TripLength[];
  bestSeasons: TripSeason[];
  caution: string;
  nearbyFood: string[];
  backupPlans: string[];
  parentTip: string;
};

export type SageDestinationMatch = SageDestination & {
  score: number;
  fitLabel: string;
  reasons: string[];
};

function includesLoose(source: string, term: string): boolean {
  return source.toLowerCase().includes(term.toLowerCase());
}

function getLocationBoost(location: string, destination: SageDestination): number {
  const cleanLocation = location.trim();

  if (!cleanLocation) return 0;

  if (includesLoose(destination.name, cleanLocation)) return 18;
  if (includesLoose(destination.region, cleanLocation)) return 10;
  if (destination.bestFor.some((item) => includesLoose(item, cleanLocation))) return 5;

  return 0;
}

function getKidAgeAdjustment(input: FamilyAdventureInput, destination: SageDestination): number {
  if (!input.hasKids) return 0;

  if (input.kidAgeGroup === 'toddlers') {
    return destination.strollerScore + destination.bathroomScore - destination.kidDifficultyScore;
  }

  if (input.kidAgeGroup === 'elementary') {
    return destination.kidDifficultyScore + Math.round(destination.backupPlanScore / 2);
  }

  if (input.kidAgeGroup === 'teens') {
    return destination.kidDifficultyScore + (destination.activityTypes.includes('hike') ? 4 : 0);
  }

  return Math.round((destination.kidDifficultyScore + destination.bathroomScore + destination.backupPlanScore) / 2);
}

function getFitLabel(score: number): string {
  if (score >= 86) return 'Strong family match';
  if (score >= 72) return 'Good family fit';
  if (score >= 58) return 'Works with planning';
  return 'Use caution';
}

function getMatchReasons(input: FamilyAdventureInput, destination: SageDestination): string[] {
  const reasons: string[] = [];

  if (getLocationBoost(input.location, destination) >= 10) {
    reasons.push(`Located in the ${input.location.trim()} area you selected.`);
  }

  if (destination.activityTypes.includes(input.activity)) {
    reasons.push(`Fits your ${input.activity === 'hike' ? 'hiking' : input.activity === 'relax' ? 'easy scenic' : 'mixed adventure'} plan.`);
  }

  if (input.wantsShade && destination.shadeScore >= 7) {
    reasons.push('Better shade potential than many Arizona stops.');
  }

  if (input.needsBathrooms && destination.bathroomScore >= 7) {
    reasons.push('Bathroom access is stronger than typical trail-only options.');
  }

  if (input.needsStrollerAccess && destination.strollerScore >= 7) {
    reasons.push('More stroller-friendly than rough desert trails.');
  }

  if (destination.foodNearbyScore >= 7) {
    reasons.push('Easy to pair with food nearby, which prevents the ancient family tragedy known as hanger.');
  }

  if (destination.backupPlanScore >= 7) {
    reasons.push('Has backup-plan potential if weather, naps, or tiny dictators change the schedule.');
  }

  if (input.season === 'summer' && destination.heatRiskScore <= 5) {
    reasons.push('Lower summer heat risk than exposed desert hikes.');
  }

  if (destination.driveMinutesFromPhoenix <= input.maxDriveMinutes) {
    reasons.push(`Within your ${input.maxDriveMinutes}-minute drive target from Phoenix.`);
  }

  return reasons.slice(0, 4);
}

export function scoreFamilyAdventure(
  input: FamilyAdventureInput,
  destination: SageDestination
): SageDestinationMatch {
  let score = 45;

  score += getLocationBoost(input.location, destination);
  score += destination.kidDifficultyScore;
  score += Math.round(destination.foodNearbyScore / 2);
  score += Math.round(destination.backupPlanScore / 2);
  score += getKidAgeAdjustment(input, destination);

  if (destination.activityTypes.includes(input.activity)) score += 8;
  if (destination.idealLengths.includes(input.length)) score += 5;
  if (destination.bestSeasons.includes(input.season)) score += 5;

  if (input.wantsShade) score += destination.shadeScore;
  if (input.needsBathrooms) score += destination.bathroomScore;
  if (input.needsStrollerAccess) score += destination.strollerScore * 2;

  if (destination.driveMinutesFromPhoenix > input.maxDriveMinutes) {
    score -= Math.min(18, Math.ceil((destination.driveMinutesFromPhoenix - input.maxDriveMinutes) / 15));
  }

  if (input.season === 'summer') {
    score -= destination.heatRiskScore * 2;
  }

  if (input.hasKids && input.activity === 'hike' && destination.heatRiskScore >= 8 && input.season === 'summer') {
    score -= 12;
  }

  const finalScore = Math.max(0, Math.min(100, score));

  return {
    ...destination,
    score: finalScore,
    fitLabel: getFitLabel(finalScore),
    reasons: getMatchReasons(input, destination),
  };
}

export function getFamilyAdventureMatches(input: FamilyAdventureInput): SageDestinationMatch[] {
  return arizonaFamilyDestinations
    .map((destination) => scoreFamilyAdventure(input, destination))
    .sort((a, b) => {
      const locationDifference =
        getLocationBoost(input.location, b) - getLocationBoost(input.location, a);

      return locationDifference || b.score - a.score;
    })
    .slice(0, 3);
}
