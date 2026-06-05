import React from 'react';
import { Link } from 'react-router-dom';

export default function FreedomBridge() {
  return (
    <section className="bg-gradient-to-b from-white to-zinc-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-orange-100 bg-white p-8 shadow-sm md:p-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">
              Arizona Hikers Association
            </p>

            <h2 className="mb-6 text-4xl font-black uppercase tracking-tight text-zinc-900 md:text-6xl">
              Never Wonder Where to Hike Next
            </h2>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
              Sage helps you plan the adventure. Arizona Hikers Association helps
              you keep going with beginner-friendly ideas, local tips, community,
              and monthly Arizona inspiration.
            </p>

            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
              Join monthly, or go annual and get the shirt bonus. Because if we
              are going to touch grass, we may as well dress for the occasion.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/community"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-600"
              >
                Join Arizona Hikers
              </Link>

              <Link
                to="/trip-builder"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-zinc-800 transition-colors duration-200 hover:border-zinc-900 hover:text-zinc-900"
              >
                Build a Trip First
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
