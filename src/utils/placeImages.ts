// src/utils/placeImages.ts
import type { Trail } from '../data/trails';

/**
 * Uses Unsplash Source to return a relevant image for a place query.
 * NOTE: This returns a random "featured" image for that query over time.
 * If you want a fixed image forever, store a static URL instead.
 */
export function getTrailCardImageUrl(trail: Trail): string {
  // Prefer an explicit image if you want to lock it in.
  if (trail.image && trail.image.trim().length > 0) return trail.image;

  const query = encodeURIComponent(`${trail.name} ${trail.location} Arizona`);
  return `https://source.unsplash.com/1200x800/?${query}`;
}
