import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Compass, MapPin } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

export default function NotFound() {
  const location = useLocation();
  const requestedUrl = `https://sage.healthandtravels.com${location.pathname}`;

  return (
    <main className="min-h-[70vh] bg-zinc-50 px-6 py-20 text-zinc-900">
      <SEOJsonLd
        title="Page Not Found | Sage Health and Travels"
        description="The requested Sage page could not be found. Browse Arizona family guides or build a new trip plan."
        url={requestedUrl}
        robots="noindex, follow"
        includeSiteSchema={false}
      />

      <div className="mx-auto max-w-3xl rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-sm md:p-12">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-orange-700">
          <MapPin className="h-8 w-8" aria-hidden="true" />
        </span>

        <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
          404 · Trail not found
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          This page wandered off the map
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-zinc-600">
          The address may be outdated, mistyped, or removed. The desert has enough
          mysterious disappearances without broken links joining the hobby.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/arizona"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
          >
            <Compass className="h-4 w-4" />
            Browse Arizona Guides
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-800 transition hover:border-zinc-950 hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
