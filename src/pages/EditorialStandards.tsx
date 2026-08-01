import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';

const reviewSteps = [
  {
    title: 'Family-first fit',
    body: 'We look at whether a guide helps a real group make a better decision: drive time, age range, heat, shade, bathrooms, food, water, and a backup plan.',
  },
  {
    title: 'Local context',
    body: 'Arizona guides are written with desert heat, monsoon timing, elevation changes, parking stress, and kid energy in mind.',
  },
  {
    title: 'Clear source trail',
    body: 'When a recommendation depends on changing details like hours, fees, closures, or rules, we encourage readers to verify with the official destination before leaving.',
  },
  {
    title: 'Useful AI support',
    body: 'Sage may use AI to organize trip ideas and draft planning flows, but pages are shaped around the Health & Travels family travel point of view and practical editorial standards.',
  },
];

const promises = [
  'We do not recommend risky heat-window hikes as casual family outings.',
  'We separate inspiration from logistics so readers know what still needs checking.',
  'We disclose affiliate relationships and keep recommendations useful first.',
  'We update pages as better local photos, firsthand notes, or corrections become available.',
];

const EditorialStandards: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOJsonLd
        title="Editorial Standards | Sage Health and Travels"
        description="Read how Sage Health and Travels reviews Arizona family travel guides, safety notes, affiliate placements, AI assistance, and source checks."
        url="https://sage.healthandtravels.com/editorial-standards"
        breadcrumbs={[
          { name: 'Home', url: 'https://sage.healthandtravels.com/' },
          {
            name: 'Editorial Standards',
            url: 'https://sage.healthandtravels.com/editorial-standards',
          },
        ]}
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary">
          Editorial Standards
        </p>
        <h1 className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-zinc-950 md:text-6xl">
          How Sage turns Arizona ideas into practical family plans.
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-600">
          Health & Travels and Sage are built for parents, families, and groups
          who need more than a scenic photo. Our guides are designed to answer
          the practical questions that decide whether a trip actually works.
        </p>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
          {reviewSteps.map((step) => (
            <article key={step.title} className="rounded-lg bg-white p-7 shadow-sm">
              <h2 className="mb-4 text-lg font-black uppercase tracking-tight text-zinc-950">
                {step.title}
              </h2>
              <p className="text-sm leading-7 text-zinc-600">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="mb-5 text-3xl font-black uppercase tracking-tighter text-zinc-950">
            Our reader promise
          </h2>
          <p className="text-base leading-8 text-zinc-600">
            Sage should make trip planning calmer. If a page does not help a
            family decide when to go, what to bring, what to avoid, or what to do
            instead, it needs more work.
          </p>
        </div>

        <div className="grid gap-3">
          {promises.map((promise) => (
            <div
              key={promise}
              className="rounded-lg border border-zinc-100 bg-white px-5 py-4 text-sm font-bold leading-6 text-zinc-700"
            >
              {promise}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-lg bg-zinc-950 p-8 text-white md:p-10">
          <h2 className="mb-4 text-2xl font-black uppercase tracking-tight">
            Corrections and updates
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-zinc-300">
            If you spot an outdated closure, incorrect family detail, broken
            link, or local note that would help another family, please send it
            through the Health & Travels channels. We treat practical corrections
            as part of the guide, not as an afterthought.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="rounded-lg bg-white px-5 py-3 text-[11px] font-black uppercase tracking-widest text-zinc-950"
            >
              About Health & Travels
            </Link>
            <Link
              to="/affiliate-disclosure"
              className="rounded-lg border border-white/20 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white"
            >
              Affiliate Disclosure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditorialStandards;
