import React from 'react';
import { Link } from 'react-router-dom';

const StartHere: React.FC = () => {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-zinc-400">
          Start Here
        </p>

        <h2 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
          Plan Your First Arizona Trip in 5 Minutes
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-base text-zinc-600 md:text-lg">
          Pick the path that fits you best. We made this simple because people are busy,
          tired, and deeply unwilling to decode mysterious websites.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            to="/archive"
            className="rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-3xl">🥾</div>
            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              Done-for-you trips
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Explore ready-made Arizona adventure ideas with trails, food, and places to stay.
            </p>
          </Link>

          <Link
            to="/trip-builder"
            className="rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-3xl">🧭</div>
            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              Build your own trip
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Use Sage to help plan an Arizona trip that fits your family, time, and budget.
            </p>
          </Link>

          <a
            href="https://healthandtravels.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-3xl">📬</div>
            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              Get the best spots
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Join the newsletter for family-friendly Arizona towns, hikes, healthy eats, and stays.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StartHere;
