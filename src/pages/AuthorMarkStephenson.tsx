import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';

const focusAreas = [
  'Arizona family hikes and outdoor day trips',
  'Heat-aware desert planning',
  'Healthy travel routines for real families',
  'Kid-friendly logistics: bathrooms, food, shade, parking, and backups',
];

const AuthorMarkStephenson: React.FC = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mark Stephenson',
    url: 'https://sage.healthandtravels.com/author/mark-stephenson',
    affiliation: {
      '@type': 'Organization',
      name: 'Health and Travels',
      url: 'https://healthandtravels.com/',
    },
    sameAs: [
      'https://www.facebook.com/HealthandTravels',
      'https://www.instagram.com/heal_thandtravels',
    ],
    knowsAbout: [
      'Arizona family travel',
      'Family hiking',
      'Healthy travel planning',
      'Arizona outdoor safety',
    ],
  };

  return (
    <div className="bg-white">
      <SEOJsonLd
        title="Mark Stephenson | Health and Travels Author Profile"
        description="Meet Mark Stephenson, founder and editor of Health and Travels and the family travel voice behind Sage Arizona trip planning."
        url="https://sage.healthandtravels.com/author/mark-stephenson"
        breadcrumbs={[
          { name: 'Home', url: 'https://sage.healthandtravels.com/' },
          { name: 'About', url: 'https://sage.healthandtravels.com/about' },
          {
            name: 'Mark Stephenson',
            url: 'https://sage.healthandtravels.com/author/mark-stephenson',
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary">
          Author Profile
        </p>
        <h1 className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-zinc-950 md:text-6xl">
          Mark Stephenson
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-600">
          Mark Stephenson is the founder and editor behind Health & Travels and
          the family planning voice behind Sage. The work focuses on helping
          families explore Arizona with more confidence, better timing, and less
          last-minute guessing.
        </p>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-2xl font-black uppercase tracking-tight text-zinc-950">
              Editorial lens
            </h2>
            <p className="text-sm leading-7 text-zinc-600">
              Health & Travels guides are written for the part of travel that
              gets real fast: tired kids, hot afternoons, parking stress, food
              needs, bathroom checks, safety tradeoffs, and the relief of having
              a backup plan before the day gets away from you.
            </p>
          </div>

          <div className="grid gap-3">
            {focusAreas.map((area) => (
              <div
                key={area}
                className="rounded-lg border border-zinc-100 bg-white px-5 py-4 text-sm font-bold text-zinc-700 shadow-sm"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-lg bg-zinc-950 p-8 text-white md:p-10">
          <h2 className="mb-4 text-2xl font-black uppercase tracking-tight">
            Where to start
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-zinc-300">
            If you are new to Arizona family travel, start with the Arizona hub,
            then use Sage to turn the idea into a day that matches your group.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/arizona"
              className="rounded-lg bg-white px-5 py-3 text-[11px] font-black uppercase tracking-widest text-zinc-950"
            >
              Arizona Guides
            </Link>
            <Link
              to="/trip-builder"
              className="rounded-lg border border-white/20 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white"
            >
              Build My Trip
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthorMarkStephenson;
