import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CalendarDays,
  Car,
  CloudSun,
  Compass,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

const chooserFaqs = [
  {
    question: 'What is the best way to start planning an Arizona family trip?',
    answer:
      'Start with the situation you are in: escaping heat, traveling with toddlers, choosing an easy hike, planning a day trip from Phoenix, or finding a weekend base. Then pick one realistic outdoor anchor, one food stop, and one backup plan.',
  },
  {
    question: 'Can Sage help families choose Arizona adventures by age and weather?',
    answer:
      'Yes. Sage organizes Arizona travel ideas around real family needs like heat, shade, drive time, bathrooms, easy trails, toddlers, friend groups, and Spanish-language planning.',
  },
  {
    question: 'Is this page for parents, visitors, or groups of friends?',
    answer:
      'It is built for all three: parents planning with kids, visitors who want an easier Arizona introduction, and groups of friends who want a memorable but realistic trip.',
  },
];

const mainChoices = [
  {
    title: 'I need a cool-weather escape',
    eyebrow: 'Best summer start',
    description:
      'Higher elevation, shade, lake stops, pine forests, and realistic heat-safe pacing from Phoenix.',
    to: '/arizona/cool-summer-trips-with-kids',
    icon: CloudSun,
    bestFor: ['Phoenix families', 'Summer weekends', 'Heat breaks'],
  },
  {
    title: 'I want an easy hike with kids',
    eyebrow: 'Low-stress trails',
    description:
      'Compare beginner-friendly hikes by season, shade, bathrooms, drive time, and family energy level.',
    to: '/arizona/hikes-with-kids',
    icon: Trees,
    bestFor: ['First hikes', 'Kids', 'Visitors'],
  },
  {
    title: 'I need a one-day trip from Phoenix',
    eyebrow: 'No hotel needed',
    description:
      'Simple day trips by drive time, heat, elevation, food stops, and how much energy the group has.',
    to: '/arizona/day-trips-from-phoenix',
    icon: Car,
    bestFor: ['Day trips', 'Guests', 'Busy weekends'],
  },
  {
    title: 'I want a weekend trip',
    eyebrow: 'Families or friends',
    description:
      'Pick a better Arizona weekend base for cabins, scenery, food, easy hikes, and group flexibility.',
    to: '/arizona/weekend-trips',
    icon: CalendarDays,
    bestFor: ['Friend groups', 'Parents', 'Cabin trips'],
  },
  {
    title: 'I need indoor ideas because it is too hot',
    eyebrow: 'Phoenix heat mode',
    description:
      'Early outdoor moments, indoor midday anchors, water resets, and realistic Phoenix pacing.',
    to: '/archive/phoenix-things-to-do-with-kids-when-hot',
    icon: Building2,
    bestFor: ['Hot days', 'Toddlers', 'No travel day'],
  },
  {
    title: 'Quiero guias en espanol',
    eyebrow: 'Spanish start',
    description:
      'Guias familiares para explorar Arizona con ninos, calor, seguridad, fines de semana y planes realistas.',
    to: '/es/arizona',
    icon: Sparkles,
    bestFor: ['Espanol', 'Familias', 'Arizona'],
  },
];

const destinationShortcuts = [
  {
    name: 'Sedona',
    note: 'Red rocks, scenic drives, early hikes, and visitor-friendly views.',
    to: '/arizona/sedona',
  },
  {
    name: 'Flagstaff',
    note: 'Cool air, Lowell Observatory, forest time, and downtown food stops.',
    to: '/arizona/flagstaff',
  },
  {
    name: 'Payson / Rim Country',
    note: 'Pines, Woods Canyon Lake, Mogollon Rim views, and Phoenix heat relief.',
    to: '/arizona/payson-rim-country-with-kids',
  },
  {
    name: 'Grand Canyon',
    note: 'Big views, family pacing, visitor logistics, and road trip timing.',
    to: '/arizona/grand-canyon',
  },
  {
    name: 'Papago Park',
    note: 'Short desert stop, Hole-in-the-Rock, zoo, garden, and Phoenix add-ons.',
    to: '/archive/papago-park-family-guide',
  },
  {
    name: 'Piestewa Peak',
    note: 'Central Phoenix mountain energy with serious heat and effort checks.',
    to: '/archive/piestewa-peak-family-hike-guide',
  },
];

const planningFilters = [
  {
    title: 'Traveling with toddlers',
    text: 'Choose short exits, bathrooms, shade, snacks, stroller realism, and one main stop.',
    to: '/archive/phoenix-things-to-do-with-kids-when-hot',
    icon: Users,
  },
  {
    title: 'Bringing grandparents or visitors',
    text: 'Prioritize overlooks, food stops, short walks, comfortable weather, and easy parking.',
    to: '/arizona/day-trips-from-phoenix',
    icon: MapPin,
  },
  {
    title: 'Planning around heat and safety',
    text: 'Use early starts, water rules, indoor backups, elevation, and trail turnarounds.',
    to: '/arizona/desert-hiking-safety',
    icon: ShieldCheck,
  },
  {
    title: 'Choosing by season',
    text: 'Match spring, summer, monsoon, fall, and winter to the places that actually make sense.',
    to: '/arizona/family-adventures-by-season',
    icon: Mountain,
  },
];

const AdventureChooser: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Start Here: Choose Your Arizona Family Adventure | Sage"
        description="Choose the best Sage Arizona family travel guide by situation: cool-weather escapes, easy hikes with kids, Phoenix day trips, weekend trips, hot-day indoor ideas, Spanish guides, and destination shortcuts."
        url="https://sage.healthandtravels.com/start-here"
        faqs={chooserFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          {
            name: 'Start Here',
            url: 'https://sage.healthandtravels.com/start-here',
          },
        ]}
      />

      <section className="bg-gradient-to-b from-emerald-50 via-white to-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-700">
              Start Here
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-zinc-950 md:text-6xl">
              Choose your Arizona adventure without overthinking it
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">
              Pick the situation that sounds most like your family, visitors, or friend group. Sage will send you to the most useful Arizona guide first.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-700"
            >
              Build a Custom Trip
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-900 bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Browse Everything
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Pick Your Situation
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            The fastest path to a useful plan
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mainChoices.map((choice) => {
            const Icon = choice.icon;

            return (
              <Link
                key={choice.to}
                to={choice.to}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                    {choice.eyebrow}
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight text-zinc-950">
                  {choice.title}
                </h3>
                <p className="mt-3 flex-grow text-sm leading-7 text-zinc-600">
                  {choice.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {choice.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 text-sm font-black uppercase tracking-widest text-emerald-700">
                  Open best guide
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
              Popular Places
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Jump straight to a destination
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destinationShortcuts.map((destination) => (
              <Link
                key={destination.to}
                to={destination.to}
                className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3 text-emerald-700">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                  <h3 className="text-lg font-black tracking-tight text-zinc-950">
                    {destination.name}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-zinc-600">{destination.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Fine Tune
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Plan around the people coming with you
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {planningFilters.map((filter) => {
            const Icon = filter.icon;

            return (
              <Link
                key={filter.to}
                to={filter.to}
                className="flex gap-5 rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-300 hover:bg-emerald-50/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-zinc-950">
                    {filter.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">{filter.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default AdventureChooser;
