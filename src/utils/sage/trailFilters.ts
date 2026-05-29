import { getArizonaRegion } from './azRegions';
import { SafetyResult } from './heatSafety';

export function parseNumberFromText(value?: string | number): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;

  const match = value.replace(/,/g, '').match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
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
        'This route may be a poor fit during warm parts of the day, especially for families or newer hikers.',
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
        'The trail profile looks more forgiving and may be a better fit for families.',
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
      'Bring water, sun protection, snacks, and a flexible attitude.',
  };
}
