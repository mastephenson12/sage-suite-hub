import React from 'react';
import { ExternalLink } from 'lucide-react';

type AffiliateRecommendationProps = {
  title: string;
  description: string;
  url: string;
  provider: string;
  bestFor: string;
  placement: string;
};

const AffiliateRecommendation: React.FC<AffiliateRecommendationProps> = ({
  title,
  description,
  url,
  provider,
  bestFor,
  placement,
}) => {
  const handleClick = () => {
    const analyticsWindow = window as Window & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: Array<Record<string, unknown>>;
    };

    const eventPayload = {
      affiliate_provider: provider,
      affiliate_offer: title,
      page_path: window.location.pathname,
      placement,
    };

    analyticsWindow.gtag?.('event', 'affiliate_click', eventPayload);
    analyticsWindow.dataLayer?.push({
      event: 'affiliate_click',
      ...eventPayload,
    });
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
        {provider} experience
      </p>
      <h3 className="mt-2 text-lg font-black leading-6 text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
      <p className="mt-3 text-xs font-bold leading-5 text-zinc-500">
        Best for: {bestFor}
      </p>
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        onClick={handleClick}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
      >
        Check availability
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
};

export default AffiliateRecommendation;
