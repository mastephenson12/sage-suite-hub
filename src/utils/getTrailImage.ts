import type { Trail } from '../data/trails';

export function getTrailImage(trail: Trail): string {
  if (trail.image && trail.image.trim().length > 0) {
    return trail.image;
  }

  return '/images/trail-fallback.png';
}
