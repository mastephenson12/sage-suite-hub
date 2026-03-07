// src/utils/getTrailImage.ts
import { Trail } from '../data/trails';

export function getTrailImage(trail: Trail) {
  if (trail.image) return trail.image;

  return `https://source.unsplash.com/featured/?${encodeURIComponent(
    `${trail.name} ${trail.location} Arizona`
  )}`;
}
