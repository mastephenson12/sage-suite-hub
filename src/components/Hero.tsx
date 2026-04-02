import React from 'react';
import { Link } from 'react-router-dom';

const arizonaCards = [
  {
    title: 'Sedona',
    description: 'Red rock hikes, jeep tours, and family adventures.',
    image: '/images/sedona-family.avif',
    to: '/archive/sedona-family-adventure',
    cta: 'View Sedona Guide',
  },
  {
    title: 'Grand Canyon',
    description: 'Scenic overlooks, rim walks, and unforgettable family views.',
    image: '/images/grand-canyon.avif',
    to: '/archive/grand-canyon-family-adventure',
    cta: 'View Grand Canyon Guide',
  },
  {
    title: 'Flagstaff',
    description: 'Pine forests, lava caves, scenic drives, and cool mountain air.',
    image: '/images/flagstaff-family-adventure.avif',
    to: '/archive/flagstaff-family-escape',
    cta: 'View Flagstaff Guide',
  },
];

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[72vh] overflow-hidden border-b border-zinc-100 bg-white pt-16 pb-12 flex items-start">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
          alt="Arizona desert road"
          className="h-full w-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 animate-fade-in">
        
        {/* Hero Text */}
        <div className="mb-10 max-w-3xl">
          <h1 className="mb-4 max-w-4xl text-3xl font-black uppercase leading-[0.95] tracking-tight text-black md:text-5xl">
            Plan Your Next Arizona Adventure in Minutes
          </h1>

          <p className="mb-6 max-w-2xl text-base italic leading-relaxed text-zinc-500 font-medium font-serif md:text-lg">
            Skip the endless searching. Tell Sage what you want and get a simple
            plan built for your family.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/trip-builder"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-primary hover:bg-brand-dark px-8 py-4 text-lg font-semibold text-white transition-all shadow-lg shadow-brand-primary/10 active:scale-95"
            >
              Build My Trip
            </Link>

            <Link
              to="/arizona"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-8 py-4 text-lg font-semibold text-zinc-900 transition hover:bg-zinc-50"
            >
              Explore Arizona
            </Link>
          </div>
        </div>

        {/* Cards */}
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
                  <h2 className="mb-2 text-2xl font-black text-white">
                    {card.title}
                  </h2>

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
  );
};
