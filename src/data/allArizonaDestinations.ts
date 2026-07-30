import { arizonaDestinations } from './arizonaDestinations';
import { extraArizonaDestinations } from './extraArizonaDestinations';

export const allArizonaDestinations = [
  ...arizonaDestinations,
  ...extraArizonaDestinations,
];

export function getAllArizonaDestination(slug: string | undefined) {
  return allArizonaDestinations.find((destination) => destination.slug === slug);
}
