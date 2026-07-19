import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  Clock3,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from 'lucide-react';

type StartChoice = {
  title: string;
  description: string;
  label: string;
  to: string;
  icon: LucideIcon;
};

const primaryChoices: StartChoice[] = [
  {
    title: 'I have little kids',
    description: 'Short exits, bathrooms, shade, snacks, and plans that do not depend on perfect behavior.',
    label: 'Toddler-friendly',
    to: '/arizona/plan-by-situation',
    icon: Baby,
  },
  {
    title: 'It is too hot',
    description: 'Early outdoor stops, indoor midday anchors, water resets, and cooler elevation ideas.',
    label: 'Heat-safe',
    to: '/arizona/cool-summer-trips-with-kids',
    icon: Sun,
  },
  {
    title: 'We have visitors',
    description: 'Memorable Arizona views, easy parking, food nearby, and flexible energy levels.',
    label: 'Guest-ready',
    to: '/arizona/day-trips-from-phoenix',
    icon: Users,
  },
  {
    title: 'We need a weekend',
    description: 'Compare cabins, cooler air, red rocks, food towns, lakes, and drive time before booking.',
    label: '2-3 days',
    to: '/arizona/weekend-trips',
    icon: CalendarDays,
  },
];

const quickNeeds: StartChoice[] = [
  {
    title: 'Half-day plan',
    description: 'One anchor, one food stop, and a simple backup.',
    label: 'Quick win',
    to: '/trip-builder?plan=ready&location=phoenix&length=half-day&kids=yes&pace=easy&food=nearby',
    icon: Clock3,
  },
  {
    title: 'Bathrooms and shade',
    description: 'Put logistics first so the trip feels easy.',
    label: 'Low-stress',
    to: '/trip-builder?plan=ready&location=arizona&kids=yes&bathrooms=true&shade=true&food=nearby&pace=low-stress',
    icon: ShieldCheck,
  },
  {
    title: 'Water or pine trees',
    description: 'Lakes, creeks, Rim Country, and cooler forest resets.',
    label: 'Cooler feel',
    to: '/arizona/payson-rim-country-with-kids',
    icon: Trees,
  },
  {
    title: 'Friend group',
    description: 'Scenery, food, flexible stops, and plans that work for mixed energy.',
    label: 'Group trip',
    to: '/arizona/adventure-finder',
    icon: Sparkles,
  },
];

const ChoiceCard: React.FC<StartChoice & { compact?: boolean }> = ({
  title,
  description,
  label,
  to,
  icon: Icon,
  compact = false,
}) => (
  <Link
    to={to}
    className={`group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md ${
      compact ? 'p-5' : 'p-6'
    }`}
  >
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </span>
    </div>

    <h3 className="text-lg font-black tracking-tight text-zinc-950 md:text-xl">{title}</h3>
    <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600">{description}</p>
    <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
      Start here <Compass className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </span>
  </Link>
);

const StartHere: React.FC = () => {
  return (
    <section className="bg-zinc-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
              Start Here
            </p>

            <h2 className="text-4xl font-black tracking-tight text-zinc-950 md:text-5xl">
              What kind of Arizona day are you trying to plan?
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
              Pick the situation that sounds closest to your family, visitors, or friends. Sage will send you to the strongest guide or pre-filled planner path first.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                to="/start-here"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-700"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                Open full chooser
              </Link>
              <Link
                to="/trip-builder"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:border-zinc-950"
              >
                Build custom trip
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {primaryChoices.map((choice) => (
              <ChoiceCard key={choice.title} {...choice} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickNeeds.map((choice) => (
            <ChoiceCard key={choice.title} {...choice} compact />
          ))}
        </div>

        <div className="mt-8 grid gap-3 rounded-2xl border border-emerald-100 bg-white p-5 md:grid-cols-3">
          {[
            { icon: MapPin, text: 'Choose one outdoor anchor.' },
            { icon: Droplets, text: 'Add one food, water, or bathroom reset.' },
            { icon: CloudSun, text: 'Keep one backup for heat, weather, or tired kids.' },
          ].map((rule) => {
            const Icon = rule.icon;
            return (
              <div key={rule.text} className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                <Icon className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                <span>{rule.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StartHere;
