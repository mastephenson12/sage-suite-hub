import React from 'react';
import { Link } from 'react-router-dom';

const arizonaCards = [
  {
    title: 'Sedona',
    description: 'Red rock hikes, scenic stops, and family-friendly day plans.',
    image: '/images/sedona-family.avif',
    to: '/archive/sedona-family-adventure',
    cta: 'View Sedona Guide',
  },
  {
    title: 'Grand Canyon',
    description: 'Simple rim walks, overlook strategy, and safer family timing.',
    image: '/images/grand-canyon.avif',
    to: '/archive/grand-canyon-family-adventure',
    cta: 'View Grand Canyon Guide',
  },
  {
    title: 'Flagstaff',
    description: 'Cool mountain air, pine forests, lava caves, and weekend ideas.',
    image: '/images/flagstaff-family-adventure.avif',
    to: '/archive/flagstaff-family-escape',
    cta: 'View Flagstaff Guide',
  },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-zinc-100 bg-white">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
          alt="Arizona desert road"
          className="h-full w-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
              Sage Arizona Trip Planner
            </p>

            <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-black md:text-6xl">
              Plan a Safer, Easier Arizona Adventure With Your Family
            </h1>

            <p className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-zinc-600 md:text-xl">
              Tell Sage where you want to go, who is coming, and how adventurous
              you feel. Sage helps you choose trails, towns, food stops, lodging
              ideas, and safety tips without making you open 47 tabs like a
              doomed vacation detective.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/trip-builder"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-brand-primary/10 transition-all hover:bg-brand-dark active:scale-95"
              >
                Build My Trip
              </Link>

              <Link
                to="/chat"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-8 py-4 text-lg font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
              >
                Ask Sage AI
              </Link>

              <Link
                to="/arizona"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-8 py-4 text-lg font-semibold text-zinc-900 transition hover:bg-zinc-50"
              >
                Explore Guides
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-zinc-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                Family-friendly trail ideas
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                Food, lodging, and timing
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                Heat and safety reminders
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
              Start with one simple flow
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-black md:text-3xl">
              Your Arizona plan should answer the basics first.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-600">
              <p>
                Where are we going? What can the kids handle? When is it too hot?
                Where do we eat? Where should we stay?
              </p>
              <p>
                Sage turns those normal questions into a starter plan instead of a
                research spiral, because apparently family trips should not require
                a project manager and three weather apps.
              </p>
            </div>

            <Link
              to="/trip-builder"
              className="mt-6 inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Build My Trip
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Start with a proven favorite
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-black md:text-3xl">
                Popular Arizona family trips
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {arizonaCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-[320px] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 text-2xl font-black text-white">
                      {card.title}
                    </h3>

                    <p className="mb-4 max-w-xs text-sm leading-relaxed text-white/90">
                      {card.description}
                    </p>

                    <span className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      {card.cta}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
