import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';

const AffiliateDisclosure: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <SEOJsonLd
        title="Affiliate Disclosure | Sage Health and Travels"
        description="Read how Health and Travels and Sage may use affiliate links while keeping Arizona family travel recommendations practical and reader-first."
        url="https://sage.healthandtravels.com/affiliate-disclosure"
        breadcrumbs={[
          { name: 'Home', url: 'https://sage.healthandtravels.com/' },
          {
            name: 'Affiliate Disclosure',
            url: 'https://sage.healthandtravels.com/affiliate-disclosure',
          },
        ]}
      />

      <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary">
        Affiliate Disclosure
      </p>
      <h1 className="mb-10 text-5xl font-black uppercase tracking-tighter text-zinc-950 md:text-6xl">
        How affiliate links work on Sage.
      </h1>

      <div className="prose prose-lg max-w-none text-zinc-600">
        <p>
          Some Health & Travels and Sage pages may include affiliate links. If
          you click one of those links and make a purchase or booking, Health &
          Travels may earn a commission at no extra cost to you.
        </p>

        <h2>How we choose placements</h2>
        <p>
          Affiliate links should support the trip a reader is already planning:
          lodging near a destination, family-friendly activities, gear that fits
          the outing, or services that make the day easier. We do not want links
          to distract from the practical guide.
        </p>

        <h2>Editorial independence</h2>
        <p>
          Affiliate relationships do not decide whether a place is useful for
          families. We still prioritize safety, timing, drive time, food,
          bathrooms, weather, and realistic family logistics.
        </p>

        <h2>Reader reminder</h2>
        <p>
          Prices, hours, rules, availability, and policies can change. Always
          check the official destination, booking partner, or product page before
          you make a final decision.
        </p>
      </div>

      <div className="mt-12 rounded-lg bg-zinc-50 p-8">
        <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-zinc-950">
          Want the full editorial approach?
        </h2>
        <p className="mb-6 text-sm leading-7 text-zinc-600">
          The editorial standards page explains how Sage handles source checks,
          AI assistance, family safety notes, and updates.
        </p>
        <Link
          to="/editorial-standards"
          className="inline-block rounded-lg bg-zinc-950 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white"
        >
          Read Editorial Standards
        </Link>
      </div>
    </div>
  );
};

export default AffiliateDisclosure;
