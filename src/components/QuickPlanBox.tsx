import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  Clock3,
  CloudSun,
  MapPin,
  ShieldCheck,
  Sparkles,
  Utensils,
  type LucideIcon,
} from 'lucide-react';

type QuickPlanItem = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

type QuickPlanBoxProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bestFor: string[];
  bestTime: string;
  driveTime?: string;
  firstMove: string;
  heatNote: string;
  bathroomShadeFood?: string;
  tripBuilderTo: string;
  secondaryTo?: string;
  secondaryLabel?: string;
};

const iconMap: Record<string, LucideIcon> = {
  'Best for': Baby,
  'Best time': Clock3,
  'Drive time': Car,
  'Do first': MapPin,
  'Heat note': CloudSun,
  'Bathrooms / shade / food': Utensils,
};

const QuickPlanBox: React.FC<QuickPlanBoxProps> = ({
  eyebrow = 'Quick Plan',
  title,
  subtitle,
  bestFor,
  bestTime,
  driveTime,
  firstMove,
  heatNote,
  bathroomShadeFood,
  tripBuilderTo,
  secondaryTo,
  secondaryLabel = 'Explore more',
}) => {
  const items: QuickPlanItem[] = [
    { label: 'Best time', value: bestTime },
    ...(driveTime ? [{ label: 'Drive time', value: driveTime }] : []),
    { label: 'Do first', value: firstMove },
    { label: 'Heat note', value: heatNote },
    ...(bathroomShadeFood
      ? [{ label: 'Bathrooms / shade / food', value: bathroomShadeFood }]
      : []),
  ];

  return (
    <section className="border-y border-emerald-100 bg-emerald-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
              {eyebrow}
            </p>
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 md:text-3xl">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-sm leading-7 text-zinc-700">{subtitle}</p>}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to={tripBuilderTo}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-emerald-700"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Build this trip
            </Link>
            {secondaryTo && (
              <Link
                to={secondaryTo}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {bestFor.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-800"
            >
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon ?? iconMap[item.label] ?? ShieldCheck;

            return (
              <article key={item.label} className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                    {item.label}
                  </p>
                </div>
                <p className="text-sm font-bold leading-6 text-zinc-800">{item.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickPlanBox;
