import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';
import { allArizonaDestinations } from '../data/allArizonaDestinations';

const arizonaFaqs = [
  {
    question: 'What is the best way to plan an Arizona family adventure?',
    answer:
      'Start with the destination, choose outdoor activities first, add food and lodging nearby, and check heat, elevation, and trail difficulty before you go.',
  },
  {
    question: 'Can Sage help me choose beginner-friendly Arizona hikes?',
    answer:
      'Yes. Sage is built to help families and beginner adventurers compare destinations, easy trails, timing, food stops, and safety notes.',
  },
  {
    question: 'Which Arizona destinations are good for families?',
    answer:
      'Sedona, Flagstaff, Payson, Prescott, Cave Creek, Page, Tucson, Grand Canyon, Show Low, Pinetop-Lakeside, Bisbee, Williams, Cottonwood, Jerome, Lake Havasu, and Yuma can all work well when the plan matches the season and hiking level.',
  },
];

const Arizona: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Arizona Family Adventure Guides | Sage Health and Travels"
        description="Explore Arizona family adventure guides for Sedona, Flagstaff, Payson, Prescott, Cave Creek, Page, Tucson, Grand Canyon, Show Low, Pinetop-Lakeside, Bisbee, Williams, Cottonwood, Jerome, Lake Havasu, and Yuma."
        url="https://sage.healthandtravels.com/arizona"
        faqs={arizonaFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          {
            name: 'Arizona Adventure Guides',
            url: 'https://sage.healthandtravels.com/arizona',
          },
        ]}
      />

      <section className="bg-gradient-to-b from-orange-50 to-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-orange-600">
            Arizona Adventure Guide Hub
          </p>

          <h1 className="mb-6 max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Choose Your Arizona Trailhead
          </h1>

          <p className="mb-8 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">
            Start with a destination, then let Sage help you build the day: outdoor
            activities first, food nearby, places to stay, and safety notes for
            real families who do not want their weekend trip to become a cautionary
            tale in cargo shorts.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Build a Custom Trip
            </Link>
            <Link
              to="/arizona/first-trip"
              className="inline-flex items-center justify-center rounded-2xl border border-orange-300 bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-orange-700 transition hover:border-orange-500 hover:bg-orange-50"
            >
              First Arizona Trip
            </Link>
            <Link
              to="/arizona/plan-by-situation"
              className="inline-flex items-center justify-center rounded-2xl border border-emerald-300 bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-emerald-700 transition hover:border-emerald-500 hover:bg-emerald-50"
            >
              Plan by Situation
            </Link>
            <Link
              to="/chat?mode=arizona"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-7 py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Ask Sage AI
            </Link>
            <Link
              to="/arizona/day-trips-from-phoenix"
              className="inline-flex items-center justify-center rounded-2xl border border-emerald-300 bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-emerald-700 transition hover:border-emerald-500 hover:bg-emerald-50"
            >
              From Phoenix
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Destination Landing Pages
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Arizona places to explore first
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allArizonaDestinations.map((destination) => (
            <Link
              key={destination.slug}
              to={`/arizona/${destination.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
            >
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
                {destination.bestFor[0]}
              </p>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-zinc-950">
                {destination.name}
              </h3>
              <p className="mb-5 flex-grow text-sm leading-7 text-zinc-600">
                {destination.tagline}
              </p>
              <span className="inline-flex text-sm font-black uppercase tracking-widest text-zinc-900 transition group-hover:text-orange-600">
                Open Guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 text-center shadow-sm md:p-12">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Keep Going
          </p>
          <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
            Want monthly Arizona ideas and a community nudge?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-zinc-600">
            Join Arizona Hikers Association for beginner-friendly ideas, local
            inspiration, and more reasons to get outside instead of letting another
            weekend disappear into chores and screen sludge.
          </p>
          <a
            href="https://join.arizonahikersassociation.org/join"
                target="_blank"
                rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-700"
          >
                Join Arizona Hikers
              </a>
        </div>
      </section>
    </main>
  );
};

export default Arizona;