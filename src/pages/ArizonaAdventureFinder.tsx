import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  CloudSun,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
  type LucideIcon,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import QuickPlanBox from '../components/QuickPlanBox';

const finderFaqs = [
  {
    question: 'How do I choose the best Arizona adventure for my family?',
    answer:
      'Start with drive time, weather, kid age, bathrooms, shade, and how much energy your group has. Then choose one outdoor anchor, one food stop, and one backup plan.',
  },
  {
    question: 'Where should Phoenix families go when it is hot?',
    answer:
      'For hot Phoenix days, look toward higher elevation places like Payson, the Mogollon Rim, Flagstaff, Prescott, and shaded water stops. Keep desert hikes very early and use indoor midday plans.',
  },
  {
    question: 'What Arizona trips work well for groups of friends?',
    answer:
      'Sedona, Flagstaff, Prescott, Payson, Cottonwood, Jerome, and the Grand Canyon can all work for friend groups when the plan balances scenery, food, flexible stops, and realistic drive times.',
  },
];

const driveTimeGroups = [
  {
    title: 'Under 45 minutes',
    text: 'Best for quick Phoenix-area wins: desert gardens, short trails, early starts, and easy food nearby.',
    to: '/arizona/day-trips-from-phoenix',
    icon: MapPin,
    picks: ['Papago-style mornings', 'Cave Creek', 'Phoenix indoor backups'],
  },
  {
    title: '1 to 2 hours',
    text: 'Good for a bigger reset without making the day feel like a road trip marathon.',
    to: '/arizona/payson-rim-country-with-kids',
    icon: Car,
    picks: ['Payson', 'Prescott', 'Lake or forest stops'],
  },
  {
    title: '2 to 3 hours',
    text: 'Better for a full day or overnight when you want red rocks, pine forests, or cooler air.',
    to: '/arizona/weekend-trips',
    icon: CalendarDays,
    picks: ['Sedona', 'Flagstaff', 'Grand Canyon base trips'],
  },
];

const groupTypes = [
  {
    title: 'Toddlers and little kids',
    text: 'Short stops, bathrooms, snacks, shade, and a fast exit if the day turns sideways.',
    to: '/archive/phoenix-things-to-do-with-kids-when-hot',
    icon: Baby,
  },
  {
    title: 'Elementary age kids',
    text: 'Easy hikes, photo moments, water breaks, small challenges, and room to wander.',
    to: '/arizona/hikes-with-kids',
    icon: Trees,
  },
  {
    title: 'Teens and friend groups',
    text: 'Scenic payoff, food stops, flexibility, and enough freedom for the trip to feel memorable.',
    to: '/arizona/weekend-trips',
    icon: Users,
  },
  {
    title: 'Visitors and grandparents',
    text: 'Overlooks, gentle walks, comfortable weather, easy parking, and no forced suffering.',
    to: '/arizona/day-trips-from-phoenix',
    icon: Compass,
  },
];

const weatherModes = [
  {
    title: 'Extreme heat day',
    text: 'Skip exposed midday trails. Choose early starts, indoor anchors, pools, lakes, or higher elevation.',
    to: '/arizona/cool-summer-trips-with-kids',
    icon: CloudSun,
  },
  {
    title: 'Spring or fall sweet spot',
    text: 'Use desert hikes, red rocks, patio meals, scenic drives, and longer outdoor windows.',
    to: '/arizona/family-adventures-by-season',
    icon: Sparkles,
  },
  {
    title: 'Safety check needed',
    text: 'Use this before desert hikes, steep trails, monsoon days, or trips with mixed fitness levels.',
    to: '/arizona/desert-hiking-safety',
    icon: ShieldCheck,
  },
];

const firstPicks = [
  {
    title: 'Sedona Family Adventure',
    text: 'Red rocks, easy views, creek stops, and strong weekend energy.',
    to: '/arizona/sedona',
    image: '/images/sedona-canyon.avif',
  },
  {
    title: 'Flagstaff With Kids',
    text: 'Cool air, Lowell Observatory, forest time, and mountain-town food stops.',
    to: '/arizona/flagstaff',
    image: '/images/flagstaff-family-adventure.avif',
  },
  {
    title: 'Payson and Rim Country',
    text: 'Pines, lakes, Mogollon Rim views, and a strong Phoenix heat escape.',
    to: '/arizona/payson-rim-country-with-kids',
    image: '/images/payson-rim-country.avif',
  },
  {
    title: 'Grand Canyon Family Vacation',
    text: 'Big views, road-trip pacing, visitor logistics, and memory-making stops.',
    to: '/arizona/grand-canyon',
    image: '/images/grand-canyon.avif',
  },
];

const FinderCard: React.FC<{
  title: string;
  text: string;
  to: string;
  icon: LucideIcon;
  picks?: string[];
}> = ({ title, text, to, icon: Icon, picks }) => (
  <Link
    to={to}
    className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
  >
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-black tracking-tight text-zinc-950">{title}</h3>
    <p className="mt-3 flex-grow text-sm leading-7 text-zinc-600">{text}</p>
    {picks && (
      <div className="mt-5 flex flex-wrap gap-2">
        {picks.map((pick) => (
          <span
            key={pick}
            className="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500"
          >
            {pick}
          </span>
        ))}
      </div>
    )}
    <span className="mt-6 text-sm font-black uppercase tracking-widest text-emerald-700">
      See best guide
    </span>
  </Link>
);

const ArizonaAdventureFinder: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Arizona Adventure Finder for Families and Friend Groups | Sage"
        description="Choose Arizona hikes, day trips, cool-weather escapes, weekend bases, and kid-friendly plans by drive time, heat, ages, and group style."
        url="https://sage.healthandtravels.com/arizona/adventure-finder"
        faqs={finderFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona Guides', url: 'https://sage.healthandtravels.com/arizona' },
          {
            name: 'Arizona Adventure Finder',
            url: 'https://sage.healthandtravels.com/arizona/adventure-finder',
          },
        ]}
      />

      <section className="bg-zinc-950 px-6 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300">
              Arizona Adventure Finder
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
              Find the right Arizona trip for your actual group
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 md:text-xl">
              Choose by drive time, heat, kid age, group energy, and how much effort everyone really has today.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trip-builder"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-7 py-4 text-sm font-black uppercase tracking-widest text-zinc-950 transition hover:bg-emerald-300"
              >
                Build My Trip
              </Link>
              <Link
                to="/start-here"
                className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-white/10 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-zinc-950"
              >
                Start Here
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
            <img
              src="/images/sedona-canyon.avif"
              alt="Sedona red rock scenery for choosing an Arizona family adventure"
              className="h-full max-h-[430px] w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <QuickPlanBox
        eyebrow="Fast Answer"
        title="Use Adventure Finder when the group does not know what kind of Arizona day it wants yet"
        subtitle="This page is the decision doorway: pick by drive time, people, weather, then jump to the guide that fits."
        bestFor={['Parents', 'Friend groups', 'Visitors', 'Hot-weather planning']}
        bestTime="Use it before choosing a destination, especially when heat, mixed ages, or limited drive time could make the wrong trip harder."
        driveTime="Start with under 45 minutes, 1 to 2 hours, or 2 to 3 hours so the plan matches the real day you have."
        firstMove="Choose the drive-time box first, then narrow by who is coming and what the weather allows."
        heatNote="If Phoenix is extremely hot, prioritize higher elevation, water, indoor midday anchors, or very early desert stops."
        bathroomShadeFood="The best plan is one outdoor anchor, one food or bathroom reset, and one backup if the group fades."
        tripBuilderTo="/trip-builder"
        secondaryTo="/explore"
        secondaryLabel="Browse all guides"
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Drive Time
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            How far do you want to go?
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {driveTimeGroups.map((group) => (
            <FinderCard key={group.title} {...group} />
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
              People
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Who is coming with you?
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {groupTypes.map((group) => (
              <FinderCard key={group.title} {...group} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Weather
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Match the plan to Arizona conditions
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {weatherModes.map((mode) => (
            <FinderCard key={mode.title} {...mode} />
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
              Best First Picks
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Four Arizona trips that usually work
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {firstPicks.map((pick) => (
              <Link
                key={pick.to}
                to={pick.to}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black tracking-tight">{pick.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{pick.text}</p>
                  <span className="mt-5 inline-block text-xs font-black uppercase tracking-widest text-emerald-300">
                    Open guide
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
              Want Sage to choose?
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-zinc-950 md:text-3xl">
              Build a custom Arizona plan in a couple minutes.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700">
              Tell Sage who is going, where you are starting, and how much heat or hiking your group can handle.
            </p>
          </div>
          <Link
            to="/trip-builder"
            className="mt-6 inline-flex shrink-0 items-center justify-center rounded-xl bg-zinc-950 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-700 md:mt-0"
          >
            Use Trip Builder
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ArizonaAdventureFinder;
