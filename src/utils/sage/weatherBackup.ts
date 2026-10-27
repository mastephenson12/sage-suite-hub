// Use the same fallback in generated, saved, shared and emailed plans. A named
// outdoor attraction is not a verified alternative when weather stops the hike.
export const WEATHER_BACKUP = 'If heat or storms make outdoor activities unsuitable, postpone the outing or choose a confirmed-open indoor, air-conditioned stop once travel is safe. Another outdoor attraction, shaded trail, or water stop is not a heat or storm backup. Check opening hours and access before changing plans.';

export function applyWeatherBackup<T extends { backupPlan: string }>(plan: T): T {
  return { ...plan, backupPlan: WEATHER_BACKUP };
}
