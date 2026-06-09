export type AffiliateCategory =
  | 'tours'
  | 'stays'
  | 'gear'
  | 'food'
  | 'insurance'
  | 'apps'
  | 'wellness'
  | 'general';

export type AffiliateLink = {
  id: string;
  label: string;
  url: string;
  category: AffiliateCategory;
  destinations?: string[];
  articleTags?: string[];
  placementIdeas?: string[];
  disclosure?: string;
  active: boolean;
};

export const defaultAffiliateDisclosure =
  'Some links may be affiliate links, which means Health & Travels may earn a small commission at no extra cost to you.';

export const affiliateLibrary: AffiliateLink[] = [
  {
    id: 'viator-sedona-antelope-horseshoe',
    label: 'Antelope Canyon and Horseshoe Bend Tour from Sedona',
    url: 'https://www.viator.com/tours/Sedona/Antelope-Canyon-and-Horseshoe-Bend-Tour/d750-3272P13?pid=P00292684&mcid=42383&medium=link&medium_version=selector&campaign=antelope-canyon-horseshoe-bend-sedona',
    category: 'tours',
    destinations: ['sedona', 'antelope-canyon', 'horseshoe-bend', 'page'],
    articleTags: ['sedona', 'northern-arizona', 'family-adventure', 'tour'],
    placementIdeas: [
      'Sedona itinerary articles',
      'Northern Arizona road trip articles',
      'Family tour recommendation sections',
    ],
    disclosure: defaultAffiliateDisclosure,
    active: true,
  },
];

export function getAffiliateLinksByDestination(destinationSlug: string): AffiliateLink[] {
  return affiliateLibrary.filter(
    (link) => link.active && link.destinations?.includes(destinationSlug)
  );
}

export function getAffiliateLinksByTag(tag: string): AffiliateLink[] {
  return affiliateLibrary.filter(
    (link) => link.active && link.articleTags?.includes(tag)
  );
}

export function getAffiliateLinksByCategory(category: AffiliateCategory): AffiliateLink[] {
  return affiliateLibrary.filter(
    (link) => link.active && link.category === category
  );
}
