import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { trails, Trail } from '../data/trails';
import { MapPin, Star, Clock, Mountain } from 'lucide-react';
import { getTrailImage } from '../utils/getTrailImage';

const TrailCardImage: React.FC<{ trail: Trail }> = ({ trail }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100">
        <div className="text-zinc-300 text-xs font-black uppercase tracking-[0.4em]">
          Visual Missing
        </div>
      </div>
    );
  }

  return (
    <img
      src={getTrailImage(trail)}
      alt={trail.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

const difficultyClasses: Record<Trail['difficulty'], string> = {
  Easy: 'bg-emerald-500 text-white',
  Moderate: 'bg-amber-500 text-white',
  Hard: 'bg-orange-500 text-white',
  Extreme: 'bg-red-600 text-white',
};

const TrailGuides: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      {/* HEADER */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full mb-4">
          <Mountain className="w-4 h-4 text-brand-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Trail Intelligence
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3 text-zinc-950">
          Trail Guides
        </h1>

        <p className="text-sm md:text-base text-zinc-500 italic font-serif max-w-xl mx-auto">
          Verified routes, elevation data, and family-ready Arizona hiking ideas.
        </p>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {trails.map((trail) => (
          <Link
            key={trail.id}
            to={`/trail-guides/${trail.id}`}
            className="group block overflow-hidden rounded-[28px] border border-zinc-100 bg-white transition-all hover:border-brand-primary/20 hover:shadow-xl hover:shadow-zinc-100/50"
          >
            {/* IMAGE */}
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
              <TrailCardImage trail={trail} />

              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow ${difficultyClasses[trail.difficulty]}`}
                >
                  {trail.difficulty}
                </span>

                <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-full flex items-center gap-1 shadow">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {trail.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-zinc-400 mb-3">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {trail.location}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 transition-colors group-hover:text-brand-primary text-zinc-950">
                {trail.name}
              </h3>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-5">
                  <div className="flex flex-col">
                    <span className="mb-1 text-[8px] font-black uppercase tracking-widest text-zinc-300">
                      Distance
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest">
                      {trail.distance}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="mb-1 text-[8px] font-black uppercase tracking-widest text-zinc-300">
                      Elevation
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest">
                      {trail.elevationGain}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-brand-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {trail.time}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrailGuides;
