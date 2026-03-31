import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { trails, Trail } from '../data/trails';
import { MapPin, Star, Clock, Mountain, Sparkles } from 'lucide-react';
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

const buildTrailScoutPrompt = (trail: Trail) => {
  return `Help me plan a trip around this Arizona trail: ${trail.name} in ${trail.location}. Include best timing, family-friendliness, parking, what to pack, and nearby places to eat or stay.`;
};

const TrailGuides: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <header className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1.5">
          <Mountain className="w-4 h-4 text-brand-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Trail Intelligence
          </span>
        </div>

        <h1 className="mb-3 text-4xl font-black uppercase tracking-tighter text-zinc-950 md:text-5xl">
          Trail Guides
        </h1>

        <p className="mx-auto max-w-xl text-sm italic font-serif text-zinc-500 md:text-base">
          Verified routes, elevation data, and family-ready Arizona hiking ideas.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {trails.map((trail) => (
          <div
            key={trail.id}
            className="group overflow-hidden rounded-[28px] border border-zinc-100 bg-white transition-all hover:border-brand-primary/20 hover:shadow-xl hover:shadow-zinc-100/50"
          >
            <Link to={`/trail-guides/${trail.id}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                <TrailCardImage trail={trail} />

                <div className="absolute left-4 top-4 flex gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow ${difficultyClasses[trail.difficulty]}`}
                  >
                    {trail.difficulty}
                  </span>

                  <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 shadow backdrop-blur">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {trail.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="p-5">
              <div className="mb-3 flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {trail.location}
                </span>
              </div>

              <Link to={`/trail-guides/${trail.id}`} className="block">
                <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-zinc-950 transition-colors group-hover:text-brand-primary md:text-2xl">
                  {trail.name}
                </h3>
              </Link>

              <div className="border-t border-zinc-100 pt-4">
                <div className="flex items-center justify-between">
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

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    to={`/trail-guides/${trail.id}`}
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-300 transition-colors hover:text-black"
                  >
                    Read Trail Guide →
                  </Link>

                  <Link
                    to={`/chat?prompt=${encodeURIComponent(
                      buildTrailScoutPrompt(trail)
                    )}`}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 hover:text-black"
                  >
                    <Sparkles className="h-3 w-3" />
                    Ask Scout about this trail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailGuides;
