import React from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { buildCrossSiteUrl } from '../utils/crossSiteLinks';

export default function BrandNetworkBar() {
  const spanish = useLocation().pathname === '/es/arizona/flagstaff-con-ninos';
  return <div className="journey-network"><div className="journey-network-inner">
    <span>Health &amp; Travels Network</span>
    <nav aria-label="Health and Travels network">
      <a href={spanish ? "/es/arizona" : "https://healthandtravels.com/arizona"}>{spanish ? "Guías de Arizona" : "Explore Arizona"}</a>
      <a href={spanish ? "#plan-familiar" : "/plan"} onClick={() => trackEvent('cross_site_sage_click', { location: 'brand_network_bar' })}>{spanish ? "Crear mi plan" : "Plan with Sage"}</a>
      <a href={buildCrossSiteUrl({ destination: 'newsletter', medium: 'navigation', content: 'brand_bar_newsletter' })} onClick={() => trackEvent('sage_to_newsletter', { location: 'brand_network_bar' })}>{spanish ? "Boletín (inglés)" : "Newsletter"}</a>
      <a href="https://join.arizonahikersassociation.org/join">{spanish ? "Únete a AHA (inglés)" : "Join AHA"}</a>
    </nav>
  </div></div>;
}
