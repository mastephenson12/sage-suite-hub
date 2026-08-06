import React from 'react';
import { BookOpen, Mail, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { buildCrossSiteUrl } from '../utils/crossSiteLinks';

const links = [
  {
    label: 'Read Health & Travels',
    shortLabel: 'Stories',
    destination: 'health-and-travels' as const,
    content: 'brand_bar_stories',
    icon: BookOpen,
    event: 'cross_site_health_click' as const,
  },
  {
    label: 'Plan with Sage',
    shortLabel: 'Plan',
    destination: 'sage' as const,
    content: 'brand_bar_sage',
    icon: Sparkles,
    event: 'cross_site_sage_click' as const,
  },
  {
    label: 'Weekly Newsletter',
    shortLabel: 'Newsletter',
    destination: 'newsletter' as const,
    content: 'brand_bar_newsletter',
    icon: Mail,
    event: 'sage_to_newsletter' as const,
  },
];

const BrandNetworkBar: React.FC = () => (
  <div className="border-b border-zinc-800 bg-zinc-950 text-white">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
      <p className="hidden text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 sm:block">
        Health & Travels Network
      </p>
      <div className="flex w-full items-center justify-center gap-1 sm:w-auto sm:justify-end sm:gap-2">
        {links.map(({ label, shortLabel, destination, content, icon: Icon, event }) => {
          const isCurrent = destination === 'sage';
          return (
            <a
              key={destination}
              href={buildCrossSiteUrl({ destination, medium: 'navigation', content })}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() =>
                trackEvent(event, {
                  destination,
                  location: 'brand_network_bar',
                })
              }
              className={`inline-flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[10px] font-black uppercase tracking-wider transition sm:flex-none sm:px-3 ${
                isCurrent
                  ? 'bg-white text-zinc-950'
                  : 'text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{label}</span>
            </a>
          );
        })}
      </div>
    </div>
  </div>
);

export default BrandNetworkBar;
