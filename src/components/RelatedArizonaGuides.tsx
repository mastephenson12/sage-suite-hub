import React from 'react';
import { Link } from 'react-router-dom';
import { allArizonaDestinations } from '../data/allArizonaDestinations';

const relatedGuideClusters: Record<string, string[]> = {
  sedona: ['cottonwood', 'jerome', 'prescott', 'flagstaff'],
  cottonwood: ['sedona', 'jerome', 'prescott', 'flagstaff'],
  jerome: ['cottonwood', 'sedona', 'prescott', 'williams'],
  prescott: ['jerome', 'cottonwood', 'sedona', 'flagstaff'],

  flagstaff: ['williams', 'grand-canyon', 'sedona', 'show-low'],
  williams: ['grand-canyon', 'flagstaff', 'jerome', 'prescott'],
  'grand-canyon': ['williams', 'flagstaff', 'page', 'sedona'],
  page: ['grand-canyon', 'flagstaff', 'sedona', 'lake-havasu'],

  'show-low': ['pinetop-lakeside', 'payson', 'flagstaff', 'tucson'],
  'pinetop-lakeside': ['show-low', 'payson', 'flagstaff', 'tucson'],
  payson: ['show-low', 'pinetop-lakeside', 'prescott', 'cave-creek'],

  'cave-creek': ['payson', 'prescott', 'tucson', 'sedona'],
  tucson: ['bisbee', 'yuma', 'cave-creek', 'show-low'],
  bisbee: ['tucson', 'yuma', 'cottonwood', 'jerome'],
  yuma: ['lake-havasu', 'tucson', 'bisbee', 'page'],
  'lake-havasu': ['yuma', 'page', 'williams', 'grand-canyon'],
};

type RelatedArizonaGuidesProps = {
  currentSlug: string;
};

export default function RelatedArizonaGuides({ currentSlug }: RelatedArizonaGuidesProps) {
  const relatedSlugs = relatedGuideClusters[currentSlug] ?? [];
  const relatedDestinations = relatedSlugs
    .map((slug) => allArizonaDestinations.find((destination) => destination.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  if (!relatedDestinations.length) return null;

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Related Arizona Guides
          </p>
          <h2 className="text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
            Build this into a bigger Arizona trip
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-600">
            These nearby or related destinations connect naturally with this guide,
            which is much better than making travelers bounce back to Google like
            we learned nothing from the internet’s crimes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {relatedDestinations.map((destination) => {
            if (!destination) return null;

            return (
              <Link
                key={destination.slug}
                to={`/arizona/${destination.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg"
              >
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                  {destination.bestFor[0]}
                </p>
                <h3 className="mb-3 text-xl font-black tracking-tight text-zinc-950">
                  {destination.name}
                </h3>
                <p className="mb-5 flex-grow text-sm leading-6 text-zinc-600">
                  {destination.tagline}
                </p>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-900 transition group-hover:text-orange-600">
                  Open Related Guide →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
