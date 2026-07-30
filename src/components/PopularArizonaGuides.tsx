import React from 'react';
import { Link } from 'react-router-dom';
import { allArizonaDestinations } from '../data/allArizonaDestinations';

type PopularArizonaGuidesProps = {
  compact?: boolean;
};

export default function PopularArizonaGuides({ compact = false }: PopularArizonaGuidesProps) {
  return (
    <section className={compact ? 'py-10' : 'bg-white py-16 md:py-20'}>
      <div className={compact ? '' : 'mx-auto max-w-6xl px-6'}>
        <div className={compact ? 'mb-5' : 'mb-8 max-w-3xl'}>
          <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">
            Arizona Guide Trailheads
          </p>
          <h2 className={compact ? 'text-2xl font-black tracking-tight' : 'text-3xl font-black tracking-tight md:text-5xl'}>
            Popular Arizona Adventure Guides
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
            Pick a destination first, then let Sage help you turn it into a real
            family trip plan with trails, food, stays, and safety notes. Wild idea:
            a website that points people somewhere useful.
          </p>
        </div>

        <div className={compact ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
          {allArizonaDestinations.map((destination) => (
            <Link
              key={destination.slug}
              to={`/arizona/${destination.slug}`}
              className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                {destination.bestFor[0]}
              </p>
              <h3 className="mb-2 text-xl font-black tracking-tight text-zinc-950">
                {destination.name}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm leading-6 text-zinc-600">
                {destination.tagline}
              </p>
              <span className="text-xs font-black uppercase tracking-widest text-zinc-900 transition group-hover:text-orange-600">
                View Guide →
              </span>
            </Link>
          ))}
        </div>

        {!compact && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/arizona"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-6 py-3 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Explore All Arizona Guides
            </Link>
            <Link
              to="/trip-builder"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Build My Trip
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
