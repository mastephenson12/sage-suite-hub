import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Clock,
  CloudSun,
  MapPinned,
  ShieldCheck,
  Soup,
  Trees,
  Waves,
} from 'lucide-react';

const confidenceChecks = [
  {
    icon: Trees,
    title: 'Shade reality check',
    description:
      'See whether a plan is likely to feel exposed, partly shaded, or more comfortable for kids.',
  },
  {
    icon: Waves,
    title: 'Bathroom sanity filter',
    description:
      'Prioritize stops where families are less likely to conduct desperate restroom diplomacy.',
  },
  {
    icon: Clock,
    title: 'Best time to go',
    description:
      'Get timing guidance so desert heat does not turn a sweet outing into a survival documentary.',
  },
  {
    icon: Car,
    title: 'Drive-time fit',
    description:
      'Match ideas to realistic travel windows from Phoenix and nearby Arizona family hubs.',
  },
  {
    icon: Soup,
    title: 'Food nearby',
    description:
      'Build plans around places to eat, because hungry families are basically tiny governments collapsing.',
  },
  {
    icon: ShieldCheck,
    title: 'Backup safety plan',
    description:
      'Get indoor, easier, or lower-stress alternatives when weather, energy, or kid patience falls apart.',
  },
];

const quickStarts = [
  'Easy trail before breakfast',
  'Cooler weekend escape',
  'Stroller-friendly outing',
  'Low-stress first hike',
];

const FamilyConfidencePanel: React.FC = () => {
  return (
    <section className="border-b border-zinc-100 bg-zinc-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
              Family confidence layer
            </p>

            <h2 className="text-3xl font-black tracking-tight text-black md:text-5xl">
              Sage helps answer the questions parents actually ask.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-zinc-600">
              Most travel sites tell you a place is “beautiful.” Great. So is a cactus,
              until your kid grabs it. Sage focuses on the practical stuff families
              need before they commit to the drive.
            </p>

            <div className="mt-7 rounded-3xl border border-orange-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <MapPinned className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-black text-zinc-900">
                  Not sure where to go?
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-zinc-600">
                Start with a goal, not a destination. Sage can help families choose
                a practical Arizona outing based on time, heat, bathrooms, and kid energy.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {quickStarts.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                to="/trip-builder"
                className="mt-5 inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-zinc-800"
              >
                Open Trip Builder
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {confidenceChecks.map((check) => {
              const Icon = check.icon;

              return (
                <article
                  key={check.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-zinc-100 p-3 text-zinc-900">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mb-2 text-lg font-black text-zinc-900">
                    {check.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-600">
                    {check.description}
                  </p>
                </article>
              );
            })}

            <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:col-span-2">
              <div className="mb-3 flex items-center gap-3">
                <CloudSun className="h-5 w-5 text-emerald-700" />
                <h3 className="text-lg font-black text-emerald-950">
                  Built for Arizona conditions
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-emerald-950/80">
                Arizona family planning changes by season, elevation, and time of day.
                A lovely noon trail in January can become a tiny oven with scenery in June.
                Sage keeps that context front and center.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyConfidencePanel;
