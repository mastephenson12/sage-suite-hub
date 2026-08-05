import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  Car,
  Clock3,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

type GroupScenario = {
  title: string;
  bestRule: string;
  avoid: string;
  to: string;
  icon: LucideIcon;
};

const groupScenarios: GroupScenario[] = [
  {
    title: 'Toddlers or preschoolers',
    bestRule: 'Keep the first outdoor stop short, obvious, and close to bathrooms.',
    avoid: 'Long exposed trails, far parking, and plans that require everyone to be brave at the same time.',
    to: '/trip-builder?plan=ready&location=arizona&kids=yes&ages=toddlers&bathrooms=true&stroller=true&shade=true&length=half-day',
    icon: Baby,
  },
  {
    title: 'Friends with mixed energy',
    bestRule: 'Pick one scenic anchor, one food reset, and one optional add-on for the motivated people.',
    avoid: 'A plan where the fastest person secretly designs the day for everyone else.',
    to: '/trip-builder?plan=ready&location=arizona&group=friends&activity=scenic&food=nearby&backup=yes&length=full-day',
    icon: Sparkles,
  },
  {
    title: 'Out-of-town visitors',
    bestRule: 'Choose big Arizona scenery with simple parking, clear timing, and a comfortable meal nearby.',
    avoid: 'Making the first Arizona day an endurance test with souvenirs.',
    to: '/arizona/day-trips-from-phoenix',
    icon: MapPin,
  },
  {
    title: 'Multi-age family group',
    bestRule: 'Plan for the slowest legs, the earliest hunger, and the person least excited about heat.',
    avoid: 'Assuming one trail difficulty means the same thing to every age in the group.',
    to: '/trip-builder?plan=ready&location=arizona&kids=yes&ages=mixed&shade=true&bathrooms=true&food=nearby&length=half-day',
    icon: Users,
  },
];

const quickRules = [
  { icon: Clock3, text: 'Start earlier than the group thinks is necessary.' },
  { icon: Car, text: 'Keep drive time honest, especially with kids or visitors.' },
  { icon: ShieldCheck, text: 'Choose the backup before anyone gets tired.' },
];

const GroupRealityCheckPanel: React.FC = () => {
  return (
    <section className="border-b border-zinc-100 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-9 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-sky-700">
              Group reality check
            </p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 md:text-5xl">
              Make the Arizona plan fit the people, not just the place.
            </h2>
          </div>
          <p className="text-base leading-8 text-zinc-600 md:text-lg">
            A beautiful trail can still be the wrong choice if the group has toddlers,
            visitors, mixed energy, heat sensitivity, or a tight food window. Sage helps
            turn that into a smarter starting point.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {groupScenarios.map((scenario) => {
            const Icon = scenario.icon;

            return (
              <Link
                key={scenario.title}
                to={scenario.to}
                className="group flex h-full flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sky-700 shadow-sm transition group-hover:bg-sky-700 group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-black tracking-tight text-zinc-950">
                  {scenario.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-zinc-700">
                  {scenario.bestRule}
                </p>
                <p className="mt-3 flex-grow text-xs font-bold leading-5 text-zinc-500">
                  Avoid: {scenario.avoid}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-700">
                  Start here
                  <MessageSquare className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 rounded-lg border border-sky-100 bg-sky-50 p-5 md:grid-cols-3">
          {quickRules.map((rule) => {
            const Icon = rule.icon;

            return (
              <div key={rule.text} className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sky-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-sm font-bold leading-6 text-sky-950">{rule.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GroupRealityCheckPanel;
