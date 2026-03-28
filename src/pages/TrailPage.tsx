import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trails } from '../data/trails';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Mountain,
  Ruler,
  Share2,
  Info,
} from 'lucide-react';

const TrailHeroImage: React.FC<{ src?: string; alt: string }> = ({
  src,
  alt,
}) => {
  const [hasError, setHasError] = useState(false);

  const fallback =
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80';

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100">
        <div className="text-zinc-300 text-xs font-black uppercase tracking-[0.4em]">
          Image Unavailable
        </div>
      </div>
    );
  }

  return (
    <img
      src={src || fallback}
      alt={alt}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

const TrailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const trail = trails.find((t) => t.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!trail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="mb-4 text-4xl font-black uppercase">Trail Missing</h1>
        <p className="mb-8 text-zinc-500">
          The requested trail guide could not be found.
        </p>
        <Link
          to="/trail-guides"
          className="rounded-2xl bg-brand-primary px-8 py-4 text-xs font-black uppercase tracking-widest text-white"
        >
          Return to Guides
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-zinc-100">
        <TrailHeroImage src={trail.image} alt={trail.name} />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/trail-guides"
              className="group mb-8 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Back to Guides
              </span>
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span
                className={`rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                  trail.difficulty === 'Easy'
                    ? 'bg-emerald-500 text-white'
                    : trail.difficulty === 'Moderate'
                      ? 'bg-amber-500 text-white'
                      : trail.difficulty === 'Hard'
                        ? 'bg-orange-500 text-white'
                        : 'bg-red-600 text-white'
                }`}
              >
                {trail.difficulty}
              </span>

              <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {trail.rating} Rating
                </span>
              </div>
            </div>

            <h1 className="mb-6 text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-8xl">
              {trail.name}
            </h1>

            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                {trail.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Ruler className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <span className="mb-1 block text-[8px] font-black uppercase tracking-widest text-zinc-400">
                  Distance
                </span>
                <span className="text-sm font-black uppercase tracking-widest">
                  {trail.distance}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Mountain className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <span className="mb-1 block text-[8px] font-black uppercase tracking-widest text-zinc-400">
                  Elevation Gain
                </span>
                <span className="text-sm font-black uppercase tracking-widest">
                  {trail.elevationGain}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Clock className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <span className="mb-1 block text-[8px] font-black uppercase tracking-widest text-zinc-400">
                  Est. Time
                </span>
                <span className="text-sm font-black uppercase tracking-widest">
                  {trail.time}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Share2 className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <span className="mb-1 block text-[8px] font-black uppercase tracking-widest text-zinc-400">
                  Share
                </span>
                <span className="text-sm font-black uppercase tracking-widest">
                  Copy Link
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section className="mb-16">
              <h2 className="mb-8 text-xs font-black uppercase tracking-[0.4em] text-zinc-300">
                Trail Description
              </h2>
              <p className="text-xl italic leading-relaxed text-zinc-600 font-serif">
                {trail.description}
              </p>
            </section>

            <section className="markdown-body prose prose-lg prose-zinc max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {trail.intel}
              </ReactMarkdown>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="relative overflow-hidden rounded-[40px] bg-zinc-950 p-8 text-white shadow-2xl">
                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-3">
                    <Info className="h-5 w-5 text-brand-accent" />
                    <h3 className="text-xs font-black uppercase tracking-[0.3em]">
                      Trail Tips
                    </h3>
                  </div>

                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent" />
                      <p className="text-xs font-bold uppercase leading-relaxed tracking-wider text-zinc-400">
                        Carry enough water for the conditions and season.
                      </p>
                    </li>

                    <li className="flex gap-4">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent" />
                      <p className="text-xs font-bold uppercase leading-relaxed tracking-wider text-zinc-400">
                        Cell coverage may be limited depending on terrain.
                      </p>
                    </li>

                    <li className="flex gap-4">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent" />
                      <p className="text-xs font-bold uppercase leading-relaxed tracking-wider text-zinc-400">
                        Leave no trace and pack out all trash.
                      </p>
                    </li>
                  </ul>

                  <button className="mt-12 w-full rounded-2xl bg-white py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black transition-colors hover:bg-zinc-200">
                    Save Trail Details
                  </button>
                </div>

                <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailPage;
