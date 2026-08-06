import {
  HEALTH_TRAVELS_URL,
  NEWSLETTER_URL,
  SAGESUITE_URL,
  SUBSCRIBE_URL,
} from '../constants';

export type BrandDestination = 'health-and-travels' | 'sage' | 'newsletter' | 'subscribe';

const DESTINATIONS: Record<BrandDestination, string> = {
  'health-and-travels': HEALTH_TRAVELS_URL,
  sage: SAGESUITE_URL,
  newsletter: NEWSLETTER_URL,
  subscribe: SUBSCRIBE_URL,
};

type CrossSiteLinkOptions = {
  destination: BrandDestination;
  campaign?: string;
  content?: string;
  medium?: 'referral' | 'cta' | 'navigation' | 'email';
  path?: string;
  source?: 'sage' | 'healthandtravels' | 'newsletter';
  prompt?: string;
};

export function buildCrossSiteUrl({
  destination,
  campaign = 'brand_ecosystem',
  content,
  medium = 'referral',
  path = '',
  source = 'sage',
  prompt,
}: CrossSiteLinkOptions): string {
  const url = new URL(path, DESTINATIONS[destination]);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  if (content) url.searchParams.set('utm_content', content);
  if (prompt) url.searchParams.set('prompt', prompt);
  return url.toString();
}
