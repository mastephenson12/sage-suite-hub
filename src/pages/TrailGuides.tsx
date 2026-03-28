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
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full mb-8">
          <Mountain className="w-4 h-4 text-brand-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Verified Trail Intelligence
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85]">
          Trail Guides
        </h1>

        <p className="text-xl text-zinc-500 italic font-serif max-w-2xl mx-auto">
          GPS-verified routes, elevation data, and strategic field intel for
          Arizona&apos;s most iconic peaks.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trails.map((trail) => (
          <Link
            key={trail.id}
            to={`/trail-guides/${trail.id}`}
            className="group block overflow-hidden rounded-[48px] border border-zinc-100 bg-white transition-all hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-zinc-100/50"
          >
            <div className="relative h-80 overflow-hidden bg-zinc-100">
              <TrailCardImage trail={trail} />

              <div className="absolute top-6 left-6 flex gap-2">
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${difficultyClasses[trail.difficulty]}`}
                >
                  {trail.difficulty}
                </span>

                <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {trail.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-10">
              <div className="flex items-center gap-2 text-zinc-400 mb-4">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {trail.location}
                </span>
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tight mb-6 transition-colors group-hover:text-brand-primary">
                {trail.name}
              </h3>

              <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                <div className="flex items-center gap-6">
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
