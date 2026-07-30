import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CalendarDays,
  Car,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  Mountain,
  Share2,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const summerFaqs = [
  {
    question: 'Where can families go in Arizona to escape the Phoenix summer heat?',
    answer:
      'Good Arizona summer heat escapes from Phoenix include Payson and the Mogollon Rim, Flagstaff, Prescott, Show Low, Pinetop-Lakeside, and higher-elevation lake or forest stops. Families should still check weather, wildfire conditions, and monsoon forecasts before leaving.',
  },
  {
    question: 'What are the best cool summer day trips from Phoenix with kids?',
    answer:
      'Payson, Prescott, Flagstaff, and higher-elevation forest or lake stops are strong summer day trip ideas from Phoenix. The best day trips keep the plan simple: one outdoor anchor, one meal or picnic stop, and one indoor or shaded backup.',
  },
  {
    question: 'Is Sedona a good summer trip with kids?',
    answer:
      'Sedona can work in summer if families start early, avoid exposed midday hikes, build in shade or water, and keep indoor or food backups ready. It is usually not the best choice for a long exposed hike in the middle of a hot day.',
  },
  {
    question: 'How should families plan Arizona summer trips safely?',
    answer:
      'Plan outdoor time early, avoid exposed midday activities, bring more water than you think you need, watch for monsoon storms, confirm bathrooms and shade, and choose a backup plan before the trip starts.',
  },
];

const escapeTypes = [
  {
    title: 'Cool-air mountain weekends',
    icon: Mountain,
    text:
      'Best for families who need a real break from Phoenix heat. Think Flagstaff, Payson, Show Low, Pinetop, and Prescott.',
    links: [
      ['Flagstaff guide', '/arizona/flagstaff'],
      ['Payson guide', '/arizona/payson-rim-country-with-kids'],
      ['Weekend trips', '/arizona/weekend-trips'],
    ],
  },
  {
    title: 'Lake and water resets',
    icon: Droplets,
    text:
      'Best when kids need something simple and memorable. Use water as the anchor, then keep food and shade easy.',
    links: [
      ['Payson itinerary', '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim'],
      ['Pinetop-Lakeside guide', '/arizona/pinetop-lakeside'],
      ['Show Low guide', '/arizona/show-low'],
    ],
  },
  {
    title: 'Early hike, indoor afternoon',
    icon: CloudSun,
    text:
      'Best for Phoenix or Sedona days when you still want adventure. Trails happen early; museums, food, or shaded stops happen later.',
    links: [
      ['Phoenix heat page', '/archive/phoenix-things-to-do-with-kids-when-hot'],
      ['Desert hiking safety', '/arizona/desert-hiking-safety'],
      ['Hikes with kids', '/arizona/hikes-with-kids'],
    ],
  },
  {
    title: 'Friend group cabin reset',
    icon: Users,
    text:
      'Best for mixed ages and mixed energy. One view, one shared meal, one flexible activity, and a lot less pressure.',
    links: [
      ['Arizona weekend trips', '/arizona/weekend-trips'],
      ['Prescott guide', '/arizona/prescott'],
      ['Trip builder', '/trip-builder'],
    ],
  },
];

const destinationRows = [
  {
    place: 'Payson / Mogollon Rim',
    bestFor: 'Pines, lake stops, rim views, manageable Phoenix drive',
    caution: 'Monsoon storms, weekend crowds, forest-road timing',
    to: '/arizona/payson-rim-country-with-kids',
  },
  {
    place: 'Flagstaff',
    bestFor: 'Coolest air, downtown food, Lowell Observatory, forest time',
    caution: 'Longer day trip, altitude, afternoon storm checks',
    to: '/arizona/flagstaff',
  },
  {
    place: 'Prescott',
    bestFor: 'Courthouse plaza, lakes, easier town pacing',
    caution: 'Still warm in summer afternoons; shade matters',
    to: '/arizona/prescott',
  },
  {
    place: 'Show Low / Pinetop-Lakeside',
    bestFor: 'Longer weekend, forests, lakes, cabin energy',
    caution: 'Better as overnight than quick day trip from Phoenix',
    to: '/arizona/show-low',
  },
  {
    place: 'Sedona',
    bestFor: 'Red rocks, scenic drives, early starts, short trail moments',
    caution: 'Exposed rock gets hot; avoid ambitious midday hikes',
    to: '/arizona/sedona',
  },
  {
    place: 'Phoenix indoor + water day',
    bestFor: 'When you cannot leave town but need a sane plan',
    caution: 'Outdoor time should be early or water/shade-based',
    to: '/archive/phoenix-things-to-do-with-kids-when-hot',
  },
];

const rules = [
  'Put the main outdoor activity before 10 AM when heat is serious.',
  'Pick one hero stop instead of stacking three hikes into one day.',
  'Choose a lunch plan with shade, air-conditioning, or easy bathrooms.',
  'Check monsoon timing before viewpoints, lakes, forest roads, and exposed trails.',
  'Bring water even when the destination feels cooler than Phoenix.',
  'Tell the group the backup plan before you leave the driveway.',
];

const quickPlanText = [
  'Cool Arizona summer trip idea:',
  'Pick one heat-escape destination, one outdoor anchor, one food plan, and one weather backup.',
  '',
  'Best choices from Phoenix:',
  '- Payson / Mogollon Rim for pines, lake stops, and rim views',
  '- Flagstaff for the coolest air and family-friendly town time',
  '- Prescott for lakes, plaza time, and easier pacing',
  '- Show Low / Pinetop for a longer forest weekend',
  '- Phoenix indoor + water plan when leaving town is not realistic',
  '',
  'Rule: outdoor early, indoor/shaded midday, flexible afternoon.',
  'Guide: https://sage.healthandtravels.com/arizona/cool-summer-trips-with-kids',
].join('\n');

const voteText = [
  'Which cool Arizona summer trip should we do?',
  '',
  '1. Payson / Mogollon Rim day trip',
  '2. Flagstaff weekend',
  '3. Prescott lake and town day',
  '4. Show Low / Pinetop forest weekend',
  '5. Phoenix indoor + water day',
  '',
  'Reply with a number and I will build the plan.',
  'Guide: https://sage.healthandtravels.com/arizona/cool-summer-trips-with-kids',
].join('\n');

const CoolArizonaSummerTripsWithKids: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Cool Arizona Summer Trips With Kids | Family Heat Escape Guide | Sage"
        description="Find cooler Arizona summer trips with kids from Phoenix, including Payson, Flagstaff, Prescott, Show Low, Pinetop, Sedona early-start ideas, lake days, and indoor heat backups."
        url="https://sage.healthandtravels.com/arizona/cool-summer-trips-with-kids"
        faqs={summerFaqs}
      />

      <section className="bg-sky-950 px-6 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">
              Arizona Summer Heat Escape Guide
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
              Cool Arizona summer trips with kids
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-sky-100 md:text-lg">
              When Phoenix is too hot for a normal family day, use this guide to choose cooler air, water, shade, indoor backups, and realistic pacing across Arizona.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=cool-summer&length=weekend&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=180"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-sky-950 transition hover:bg-cyan-200"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                Build a cool-air plan
              </Link>
              <Link
                to="/arizona/payson-rim-country-with-kids"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                <Trees className="h-4 w-4" aria-hidden="true" />
                Start with Payson
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">
              Simple Summer Rule
            </p>
            <p className="mt-3 text-2xl font-black tracking-tight">
              Go higher, go earlier, or go indoors.
            </p>
            <p className="mt-3 text-sm leading-7 text-sky-100">
              That one rule solves most Arizona summer trip planning problems. If a plan does not fit one of those, rethink it.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-sky-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Car, label: 'Best starting point', value: 'Phoenix summer heat escape' },
            { icon: Mountain, label: 'Best strategy', value: 'Higher elevation first' },
            { icon: Droplets, label: 'Best kid reset', value: 'Water, shade, snacks' },
            { icon: CalendarDays, label: 'Best timing', value: 'Early outdoor, flexible afternoon' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-lg border border-sky-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-sky-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Pick The Right Escape
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Four summer trip types that actually work
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              Start with the kind of relief your family needs, then choose the destination. It makes the whole plan calmer.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {escapeTypes.map((type) => {
              const Icon = type.icon;
              return (
                <article key={type.title} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
                  <Icon className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950">{type.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{type.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {type.links.map(([label, to]) => (
                      <Link
                        key={to}
                        to={to}
                        className="rounded-full bg-sky-50 px-3 py-2 text-[11px] font-black uppercase tracking-wide text-sky-800 transition hover:bg-sky-100"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Destination Match
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Where to go when Phoenix is too hot
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            {destinationRows.map((row) => (
              <Link
                key={row.place}
                to={row.to}
                className="grid gap-3 border-b border-zinc-100 p-5 transition last:border-b-0 hover:bg-sky-50 md:grid-cols-[0.8fr_1.2fr_1fr]"
              >
                <div>
                  <p className="text-lg font-black text-zinc-950">{row.place}</p>
                </div>
                <p className="text-sm leading-6 text-zinc-600">{row.bestFor}</p>
                <p className="text-sm leading-6 text-zinc-500">{row.caution}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Summer Safety Rhythm
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              The rules that keep the day from melting down
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Cooler does not mean careless. Arizona summer trips work best when the safety plan is simple and visible to the whole group.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
            <ShieldCheck className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
            <ul className="space-y-3">
              {rules.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-7 text-zinc-700">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-sky-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <article className="rounded-lg border border-white/10 bg-white/5 p-5">
            <Trees className="mb-4 h-5 w-5 text-cyan-200" aria-hidden="true" />
            <h3 className="font-black">Best quick win</h3>
            <p className="mt-2 text-sm leading-7 text-sky-100">
              Payson or Prescott when you want a same-day reset without committing to a long mountain weekend.
            </p>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/5 p-5">
            <Mountain className="mb-4 h-5 w-5 text-cyan-200" aria-hidden="true" />
            <h3 className="font-black">Best true escape</h3>
            <p className="mt-2 text-sm leading-7 text-sky-100">
              Flagstaff, Show Low, or Pinetop when your group needs cooler nights and a real break from the desert.
            </p>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/5 p-5">
            <Building2 className="mb-4 h-5 w-5 text-cyan-200" aria-hidden="true" />
            <h3 className="font-black">Best backup</h3>
            <p className="mt-2 text-sm leading-7 text-sky-100">
              Museums, indoor food stops, shaded splash pads, libraries, and hotel pools keep the plan alive when heat or storms shift the day.
            </p>
          </article>
        </div>
      </section>

      <SharePlanPanel
        title="Send a cool Arizona trip vote"
        description="Copy a simple summer trip plan or send your group a quick vote so the heat-escape idea turns into an actual plan."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="cool_arizona_summer_trips_with_kids"
      />

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Keep Planning
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Related heat-safe Arizona guides
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['Payson and Rim Country with kids', '/arizona/payson-rim-country-with-kids'],
              ['Phoenix with kids when it is too hot', '/archive/phoenix-things-to-do-with-kids-when-hot'],
              ['Arizona weekend trips', '/arizona/weekend-trips'],
              ['Arizona day trips from Phoenix', '/arizona/day-trips-from-phoenix'],
              ['Arizona adventures by season', '/arizona/family-adventures-by-season'],
              ['Desert hiking safety', '/arizona/desert-hiking-safety'],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black uppercase tracking-wide text-zinc-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
            FAQ
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Cool Arizona summer trip questions
          </h2>
          <div className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-100">
            {summerFaqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="cursor-pointer text-base font-black text-zinc-950">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoolArizonaSummerTripsWithKids;
