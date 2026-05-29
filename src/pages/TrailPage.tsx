import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  Clock,
  Info,
  MapPin,
  Mountain,
  Ruler,
  Share2,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { trails } from '../data/trails';
import {
  getSafetyBadgeClasses,
  getSafetyCardClasses,
  getTrailPageSafety,
  toTripSlug,
} from '../utils/sage';

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
        <div className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300">
          Image Unavailable
        </div>
      </div>
    );
  }

  return (
    <img
      src={src || fallback}
      alt={alt}
      className="h-full w-full object-cover"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

function getDifficultyClasses(difficulty?: string): string {
  if (difficulty === 'Easy') return 'bg-emerald-500 text-white';
  if (difficulty === 'Moderate') return 'bg-amber-500 text-white';
  if (difficulty === 'Hard') return 'bg-orange-500 text-white';

  return 'bg-red-600 text-white';
}

const TrailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  const trail = trails.find((t) => t.id === id);

  const safety = useMemo(() => {
    if (!trail) return null;

    return getTrailPageSafety({
      trailName: trail.name,
      location: trail.location,
      difficulty: trail.difficulty,
      elevationGain: trail.elevationGain,
    });
  }, [trail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  if (!trail) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
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

  const tripSlug = toTripSlug(trail.location || trail.name);

  return (
    <div className="min-h-screen bg-white pb-24">
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
                className={`rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${getDifficultyClasses(
                  trail.difficulty
                )}`}
              >
                {trail.difficulty}
              </span>

              <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {trail.rating} Rating
                </span>
              </div>

              {safety && (
                <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                  <ShieldCheck className="h-3 w-3 text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">
                    {safety.badge}
                  </span>
                </div>
              )}
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

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-4 text-left transition hover:opacity-80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Share2 className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <span className="mb-1 block text-[8px] font-black uppercase tracking-widest text-zinc-400">
                  Share
                </span>
                <span className="text-sm font-black uppercase tracking-widest">
                  {copied ? 'Copied' : 'Copy Link'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {safety && (
              <section
                className={`mb-12 rounded-[32px] border p-6 md:p-8 ${getSafetyCardClasses(
                  safety.level
                )}`}
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${getSafetyBadgeClasses(
                      safety.level
                    )}`}
                  >
                    {safety.badge}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                    Sage Safety Flow
                  </span>
                </div>

                <h2 className="mb-3 text-2xl font-black tracking-tight">
                  {safety.title}
                </h2>
                <p className="mb-3 leading-relaxed">{safety.message}</p>
                <p className="font-semibold leading-relaxed">
                  {safety.suggestion}
                </p>
              </section>
            )}

            <section className="mb-16">
              <h2 className="mb-8 text-xs font-black uppercase tracking-[0.4em] text-zinc-300">
                Trail Description
              </h2>
              <p className="font-serif text-xl italic leading-relaxed text-zinc-600">
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
            <div className="sticky top-32 space-y-6">
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

                    <li className="flex gap-4">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent" />
                      <p className="text-xs font-bold uppercase leading-relaxed tracking-wider text-zinc-400">
                        Check weather, parking, closures, and daylight before you go.
                      </p>
                    </li>
                  </ul>

                  <Link
                    to={
                      tripSlug
                        ? `/trip-builder?location=${tripSlug}`
                        : '/trip-builder'
                    }
                    className="mt-12 inline-flex w-full items-center justify-center rounded-2xl bg-white py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black transition-colors hover:bg-zinc-200"
                  >
                    Build A Trip Around This
                  </Link>
                </div>

                <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-3xl" />
              </div>

              <div className="rounded-[32px] border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-2 text-xl font-black tracking-tight text-zinc-950">
                  Want Sage to shape the full day?
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-zinc-700">
                  Turn this trail into a simple morning, food, and afternoon plan.
                  Because wandering around hungry is not a strategy, despite what
                  families keep trying.
                </p>

                <Link
                  to={`/chat?mode=arizona&trip=${tripSlug || 'trail'}`}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white transition hover:opacity-90"
                >
                  Refine With Sage AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailPage;
