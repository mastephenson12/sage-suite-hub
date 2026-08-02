import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Clock3,
  CloudSun,
  Droplets,
  MapPin,
  ShieldCheck,
  Utensils,
  type LucideIcon,
} from 'lucide-react';

type BeforeYouGoItem = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

type BeforeYouGoPanelProps = {
  title?: string;
  subtitle?: string;
  context?: 'destination' | 'trail';
  plannerTo?: string;
};

const baseItems: BeforeYouGoItem[] = [
  {
    title: 'Best Time',
    detail: 'Start early for desert plans, then move shade, food, or indoor stops into the hottest part of the day.',
    icon: Clock3,
  },
  {
    title: 'Water',
    detail: 'Bring more than feels necessary, especially with kids, visitors, dogs, or exposed trails.',
    icon: Droplets,
  },
  {
    title: 'Bathrooms',
    detail: 'Know the restroom stop before the trailhead, park, lake, or scenic drive gets complicated.',
    icon: MapPin,
  },
  {
    title: 'Parking',
    detail: 'Check the main lot, overflow option, fees, and gates before the group is already committed.',
    icon: Car,
  },
  {
    title: 'Food Reset',
    detail: 'Pick the snack, lunch, or coffee stop early so tired people do not have to make big decisions.',
    icon: Utensils,
  },
  {
    title: 'Backup Plan',
    detail: 'Have one easier, cooler, or shorter option ready if weather, crowds, or energy changes.',
    icon: ShieldCheck,
  },
];

const trailItems: BeforeYouGoItem[] = [
  {
    title: 'Heat Window',
    detail: 'For hot Phoenix-area hikes, aim for sunrise starts and avoid exposed trail time in the middle of the day.',
    icon: CloudSun,
  },
  ...baseItems.slice(1),
];

const BeforeYouGoPanel: React.FC<BeforeYouGoPanelProps> = ({
  title = 'Before you go',
  subtitle = 'A quick reality check for Arizona families, visitors, and friend groups before the plan leaves the screen.',
  context = 'destination',
  plannerTo = '/trip-builder',
}) => {
  const items = context === 'trail' ? trailItems : baseItems;

  return (
    <section className="border-y border-sky-100 bg-sky-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-sky-700">
              Family planning check
            </p>
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 md:text-3xl">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-700">{subtitle}</p>
          </div>

          <Link
            to={plannerTo}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-sky-700"
          >
            Build safer plan
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm font-semibold leading-6 text-zinc-700">{item.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BeforeYouGoPanel;
