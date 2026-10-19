import React from 'react';
import { trackEvent } from '../utils/analytics';
import { buildCrossSiteUrl } from '../utils/crossSiteLinks';

export default function BrandNetworkBar() {
  return <div className="journey-network"><div className="journey-network-inner">
    <span>Health &amp; Travels Network</span>
    <nav aria-label="Health and Travels network">
      <a href="https://healthandtravels.com/arizona">Explore Arizona</a>
      <a href="/plan" onClick={() => trackEvent('cross_site_sage_click', { location: 'brand_network_bar' })}>Plan with Sage</a>
      <a href={buildCrossSiteUrl({ destination: 'newsletter', medium: 'navigation', content: 'brand_bar_newsletter' })} onClick={() => trackEvent('sage_to_newsletter', { location: 'brand_network_bar' })}>Newsletter</a>
      <a href="https://join.arizonahikersassociation.org/join">Join AHA</a>
    </nav>
  </div></div>;
}
