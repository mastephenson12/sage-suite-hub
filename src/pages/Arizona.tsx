import React from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    title: 'Sedona',
    description: 'Red rock hikes, jeep tours, and family adventures.',
    to: '/archive/sedona-family-adventure',
    cta: 'View Sedona Guide',
  },
  {
    title: 'Grand Canyon',
    description: 'Scenic overlooks, rim walks, and unforgettable family views.',
    to: '/archive/grand-canyon-family-adventure',
    cta: 'View Grand Canyon Guide',
  },
  {
    title: 'Flagstaff',
    description: 'Pine forests, lava caves, scenic drives, and cool mountain air.',
    to: '/archive/flagstaff-family-escape',
    cta: 'View Flagstaff Guide',
  },
];

const Arizona: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">
          Arizona Adventures
        </p>

        <h1 className="mb-6 text-4xl font-black uppercase tracking-tight md:text-6xl">
          Explore Arizona
        </h1>

        <p className="mb-12 max-w-2xl text-lg text-zinc-500">
          Choose a destination and let Sage help you plan the perfect trip.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((destination) => (
            <div key={destination.title} className="rounded-3xl border p-6">
              <h2 className="mb-3 text-xl font-black">{destination.title}</h2>

              <p className="mb-4 text-sm text-zinc-500">
                {destination.description}
              </p>

              <Link
                to={destination.to}
                className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-xs font-black uppercase text-white"
              >
                {destination.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arizona;
