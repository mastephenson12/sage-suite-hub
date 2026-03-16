import React from 'react';
import { Link } from 'react-router-dom';

const arizonaCards = [
  {
    title: 'Sedona',
    description: 'Red rock hikes, jeep tours, and family adventures.',
    image:
      '/images/sedona-family.avif',
    to: '/archive/sedona-family-adventure',
    cta: 'View Sedona Guide',
  },
  {
    title: 'Grand Canyon',
    description: 'Scenic overlooks, rim walks, and unforgettable family views.',
    image:
      '/images/grand-canyon.avif',
    to: '/archive/grand-canyon-family-adventure',
    cta: 'View Grand Canyon Guide',
  },
  {
    title: 'Flagstaff',
    description: 'Pine forests, lava caves, scenic drives, and cool mountain air.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    to: '/archive/flagstaff-family-escape',
    cta: 'View Flagstaff Guide',
  },
];

export const Hero: React.FC = () => {
  return (
    <div className="bg-white pt-20 pb-14 border-b border-zinc-100 overflow-hidden relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
          alt="Arizona"
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-left relative z-10 animate-fade-in w-full">
        <div className="mb-8">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3">
            Arizona Adventures
          </p>

          <h1 className="text-3xl md:text-5xl font-black text-black mb-4 leading-[0.92] tracking-tight uppercase max-w-4xl">
            Health, Trails, and <br /> Arizona Skies.
          </h1>

          <p className="text-base md:text-lg text-zinc-500 italic max-w-2xl leading-relaxed font-medium font-serif">
            Exploring the High Desert’s most breathtaking trails and hidden
            wellness retreats for the modern explorer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-black text-2xl text-white mb-2">
                    {card.title}
                  </h2>
                  <p className="text-sm text-white/90 mb-4 max-w-xs leading-relaxed">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center justify-center bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-black text-[11px] uppercase tracking-[0.15em] border border-white/20">
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
