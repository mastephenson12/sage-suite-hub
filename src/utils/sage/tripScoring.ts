import { SafetyLevel } from './heatSafety';

export type TripScoreInput = {
  safetyLevel: SafetyLevel;
  hasKids: boolean;
  tripLength: 'half-day' | 'full-day' | 'weekend';
  activity: 'hike' | 'relax' | 'explore';
};

export type TripScoreResult = {
  score: number;
  label: string;
  message: string;
};

export function getTripScore(input: TripScoreInput): TripScoreResult {
  let score = 85;

  if (input.safetyLevel === 'danger') score -= 35;
  if (input.safetyLevel === 'warning') score -= 20;
  if (input.safetyLevel === 'caution') score -= 10;

  if (input.hasKids && input.activity === 'hike') score -= 5;
  if (input.tripLength === 'weekend') score += 5;
  if (input.activity === 'relax') score += 5;

  const finalScore = Math.max(0, Math.min(100, score));

  if (finalScore >= 85) {
    return {
      score: finalScore,
      label: 'Strong Family Fit',
      message: 'This looks like a strong, realistic Arizona trip plan.',
    };
  }

  if (finalScore >= 70) {
    return {
      score: finalScore,
      label: 'Good With Planning',
      message: 'This can work well with a little timing and flexibility.',
    };
  }

  if (finalScore >= 50) {
    return {
      score: finalScore,
      label: 'Use Caution',
      message:
        'This trip may need a shorter route, cooler timing, or a backup plan.',
    };
  }

  return {
    score: finalScore,
    label: 'Not Ideal',
    message:
      'This may not be the best fit without major changes to timing, activity, or location.',
  };
}
