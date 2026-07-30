import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    eyebrow: 'Step 1',
    title: 'Choose your trip style',
    description:
      'Pick the kind of Arizona adventure you want, from family hikes to scenic towns and easy weekend escapes.',
  },
  {
    eyebrow: 'Step 2',
    title: 'Get a simple starter plan',
    description:
      'Use the Sage Trip Planner to build a practical trip outline without wasting hours bouncing between tabs.',
  },
  {
    eyebrow: 'Step 3',
    title: 'Refine it with Sage AI',
    description:
      'Want more detail? Open the full Sage AI Planner for deeper trip ideas, next steps, and booking help.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="border-b border-zinc-100 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
            How it works
          </p>

          <h2 className="text-3xl font-black tracking-tight text-black md:text-5xl">
            Plan a better Arizona trip without overcomplicating it
          </h2>

          <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">
            Health & Travels helps busy families find better Arizona adventures
            with less stress, less research, and a clearer next step.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-brand-primary">
                {step.eyebrow}
              </p>

              <h3 className="text-2xl font-black tracking-tight text-black">
                {step.title}
              </h3>

              <p className="mt-3 leading-relaxed text-zinc-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/trip-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
          >
            Start Planning
          </Link>

          <Link
            to="/chat"
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-6 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Open Sage AI Planner
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
