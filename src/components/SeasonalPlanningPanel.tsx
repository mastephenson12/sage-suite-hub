import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CalendarDays, Droplets, MountainSnow, Sunrise } from 'lucide-react';

const seasonalCards = [
  {
    season: 'Summer',
    icon: Sunrise,
    badge: 'Beat the heat',
    title: 'Start early or go high elevation',
    description:
      'Aim for sunrise walks, shaded nature centers, water stops, caves, museums, or mountain towns when desert temperatures climb.',
    to: '/trip-builder?season=summer&activity=explore&shade=true&drive=120',
    accent: 'bg-orange-500',
  },
  {
    season: 'Monsoon',
    icon: Droplets,
    badge: 'Storm-aware plans',
    title: 'Build a flexible backup stop',
    description:
      'Keep washes, slot canyons, exposed ridges, and long dirt roads off the plan when storms are building nearby.',
    to: '/trip-builder?season=summer&activity=relax&shade=true&bathrooms=true',
    accent: 'bg-sky-500',
  },
  {
    season: 'Fall / Spring',
    icon: CalendarDays,
    badge: 'Best hiking flow',
    title: 'Choose one main trail and one reward stop',
    description:
      'Cooler mornings and longer comfortable windows make these seasons ideal for Sedona, Phoenix-area preserves, and family day hikes.',
    to: '/trip-builder?season=spring&activity=hike&length=full-day&kids=yes',
    accent: 'bg-emerald-500',
  },
  {
    season: 'Winter',
    icon: MountainSnow,
    badge: 'Layer check',
    title: 'Match the region to the weather',
    description:
      'Desert trails can be perfect while Flagstaff, the Mogollon Rim, and Grand Canyon roads may need snow and ice checks.',
    to: '/trip-builder?season=winter&activity=explore&length=weekend&kids=yes',
    accent: 'bg-indigo-500',
  },
];

const quickChecks = [
  'Pick one must-do stop, not five maybes.',
  'Confirm bathrooms, shade, and parking before leaving.',
  'Move exposed hikes to sunrise in warm months.',
  'Bring backup food and water when kids are coming.',
];

const SeasonalPlanningPanel: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
              Arizona changes by season
            </p>

            <h2 className="text-4xl font-black tracking-tight text-zinc-950 md:text-5xl">
              Plan around heat, storms, snow, and kid energy.
            </h2>

            <p className="mt-5 text-base leading-7 text-zinc-600 md:text-lg">
              The same Arizona trip can be perfect in March, risky in July, and
              icy in January. Sage now gives families a season-first shortcut so
              the plan starts with the conditions that matter most.
            </p>

            <Link
              to="/arizona/family-adventures-by-season"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              See Best Seasons
            </Link>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                  <AlertTriangle size={20} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-zinc-950">
                  Before you go, check:
                </h3>
              </div>

              <ul className="space-y-3 text-sm leading-6 text-zinc-600">
                {quickChecks.map((check) => (
                  <li key={check} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {seasonalCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.season}
                  to={card.to}
                  className="group flex min-h-[300px] flex-col rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.accent} text-white shadow-lg shadow-zinc-900/10`}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </span>

                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                      {card.badge}
                    </span>
                  </div>

                  <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
                    {card.season}
                  </p>

                  <h3 className="text-2xl font-black tracking-tight text-zinc-950">
                    {card.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-6 text-zinc-600">
                    {card.description}
                  </p>

                  <span className="mt-6 text-sm font-black uppercase tracking-[0.14em] text-orange-600 transition group-hover:text-orange-700">
                    Build this plan →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalPlanningPanel;
