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
import AffiliateRecommendation from './AffiliateRecommendation';

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

const sedonaAffiliateExperiences = [
  {
    title: 'Private Sedona Scenic Half-Day Tour',
    description:
      'A flexible private tour for families and first-time visitors who want major Sedona scenery without planning every stop themselves.',
    bestFor: 'families, first-time visitors, and small groups',
    url: 'https://www.viator.com/tours/Sedona/Sedona-Scenic-Tour-and-Helicopter/d750-109073P4?pid=P00292684&mcid=42383&medium=link&medium_version=selector&campaign=SedonaHalfDay',
  },
  {
    title: 'Private Customizable Sedona Vortex Jeep Tour',
    description:
      'A private Jeep experience that can be adjusted around your group and gives visitors a guided way to explore Sedona vortex areas.',
    bestFor: 'families with older children, couples, and friend groups',
    url: 'https://www.viator.com/tours/Sedona/The-Original-Sedona-Vortex-Tour/d750-25271P1?pid=P00292684&mcid=42383&medium=link&medium_version=selector&campaign=SedonaJeep',
  },
  {
    title: 'Sedona Red Rock Highlights E-Bike Tour',
    description:
      'A guided e-bike option for travelers who want to cover more ground and see red rock highlights without turning the day into a long hike.',
    bestFor: 'active adults, teens who meet operator requirements, and friend groups',
    url: 'https://www.viator.com/tours/Sedona/Sedona-Red-Rock-Highlights-E-Bike-Tour/d750-209615P359?pid=P00292684&mcid=42383&medium=link&medium_version=selector&campaign=SedonaEBike',
  },
];

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

  const showSedonaExperiences = tripBuilderTo.includes('location=sedona');

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

        {showSedonaExperiences && (
          <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-5 md:p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-700">
              Optional guided experiences
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
              Guided Sedona experiences worth considering
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-700">
              These are optional paid activities. Choose one only when it genuinely fits your group, schedule, mobility, and budget.
            </p>
            <p className="mt-2 text-xs leading-6 text-zinc-500">
              Affiliate disclosure: Sage Health and Travels may earn a commission if you book through these links, at no additional cost to you.
            </p>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {sedonaAffiliateExperiences.map((experience) => (
                <AffiliateRecommendation
                  key={experience.title}
                  title={experience.title}
                  description={experience.description}
                  url={experience.url}
                  provider="Viator"
                  bestFor={experience.bestFor}
                  placement="sedona_quick_plan"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickPlanBox;
