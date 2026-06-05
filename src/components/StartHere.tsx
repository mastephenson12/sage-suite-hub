import React from 'react';
import { Link } from 'react-router-dom';

const StartHere: React.FC = () => {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
          Start Here
        </p>

        <h2 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
          Choose the Fastest Way to Plan Your Arizona Adventure
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-base text-zinc-600 md:text-lg">
          Pick the path that fits your family, your time, and your tolerance for
          planning chaos. Sage keeps it simple because nobody needs another
          website pretending to be a maze.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            to="/trip-builder"
            className="rounded-3xl border-2 border-orange-300 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-3xl">🧭</div>
            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              Build your own trip
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Answer a few questions and get a simple Arizona starter plan with
              outdoor flow, food timing, safety notes, and next steps.
            </p>
          </Link>

          <Link
            to="/chat"
            className="rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-3xl">✨</div>
            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              Ask Sage AI
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Tell Scout your destination, season, kids’ ages, hiking level, and
              budget. Get help refining the plan without drowning in tabs.
            </p>
          </Link>

          <Link
            to="/archive"
            className="rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-3xl">🥾</div>
            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              Browse ready-made guides
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Explore Arizona destination ideas with outdoor activities, nearby
              food, places to stay, and family-friendly planning notes.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartHere;
