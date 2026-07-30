import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  Clock,
  CloudSun,
  Compass,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const firstTripFaqs = [
  {
    question: 'Where should first-time Arizona visitors go?',
    answer:
      'First-time Arizona visitors usually do well with Phoenix, Sedona, Flagstaff, Grand Canyon, Tucson, Prescott, or Payson depending on season, drive time, heat, and whether the group wants desert scenery, red rocks, pines, food, or a major landmark.',
  },
  {
    question: 'What is the easiest Arizona trip for families with kids?',
    answer:
      'The easiest Arizona family trip is usually one with one outdoor anchor, nearby food, bathrooms, shade or indoor backup, and a drive time that matches the youngest traveler.',
  },
  {
    question: 'How many places should I visit on a first Arizona trip?',
    answer:
      'Most families and groups should choose one strong base for a short trip, two bases for a long weekend, and three bases only if they have a full week and are comfortable with longer drives.',
  },
  {
    question: 'When is the best time to visit Arizona?',
    answer:
      'Spring and fall are the easiest broad Arizona travel seasons. Summer works better at higher elevations like Flagstaff, Payson, Prescott, Show Low, and Pinetop-Lakeside. Winter can be excellent in Phoenix, Tucson, Yuma, and lower desert areas, with snow checks needed in northern Arizona.',
  },
];

const firstTripTypes = [
  {
    icon: Baby,
    title: 'Families with little kids',
    bestBase: 'Phoenix, Prescott, Payson, or Flagstaff',
    why:
      'Shorter drive windows, flexible food stops, bathrooms, and easy exits matter more than chasing the most famous view.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=toddlers&shade=true&bathrooms=true&stroller=true&food=nearby&drive=60',
  },
  {
    icon: Users,
    title: 'Families with bigger kids',
    bestBase: 'Sedona, Flagstaff, Grand Canyon, or Payson',
    why:
      'Older kids can handle stronger scenery days, but the plan still needs snacks, water, a realistic hike, and a backup.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=hike&length=full-day&season=spring&ages=kids&shade=true&bathrooms=true&stroller=false&food=nearby&drive=180',
  },
  {
    icon: Sparkles,
    title: 'Friends visiting Arizona',
    bestBase: 'Sedona, Tucson, Prescott, Cottonwood, or Jerome',
    why:
      'Friend groups usually want views, food, photos, and flexibility more than a tightly packed family itinerary.',
    to: '/trip-builder?plan=ready&location=sedona&kids=no&group=friends&activity=explore&length=weekend&season=spring&ages=adults&shade=true&bathrooms=true&stroller=false&food=nearby&drive=180',
  },
  {
    icon: ShieldCheck,
    title: 'Summer heat escape',
    bestBase: 'Flagstaff, Payson, Prescott, Show Low, or Pinetop-Lakeside',
    why:
      'In summer, comfort and safety improve fast when you go higher, start earlier, and build the trip around shade or water.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=water&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&food=flexible&drive=120',
  },
];

const destinationLanes = [
  {
    lane: 'Classic first Arizona trip',
    icon: Mountain,
    route: 'Phoenix + Sedona + Grand Canyon',
    bestFor: 'First-time visitors, photos, iconic scenery',
    days: '4 to 6 days',
    plan:
      'Use Phoenix as the arrival base, Sedona for red rocks, and Grand Canyon for the big-memory stop. Keep one slower day between major drives if kids are coming.',
    links: [
      ['Sedona guide', '/arizona/sedona'],
      ['Grand Canyon itinerary', '/archive/grand-canyon-family-adventure'],
      ['Day trips from Phoenix', '/arizona/day-trips-from-phoenix'],
    ],
  },
  {
    lane: 'Easy family starter trip',
    icon: Car,
    route: 'Phoenix + Prescott or Payson',
    bestFor: 'Younger kids, grandparents, first low-stress weekend',
    days: '2 to 3 days',
    plan:
      'Choose a shorter drive, one outdoor stop, one food area, and a place where the day still works if the group skips the hike.',
    links: [
      ['Payson guide', '/arizona/payson-rim-country-with-kids'],
      ['Prescott guide', '/arizona/prescott'],
      ['Plan by situation', '/arizona/plan-by-situation'],
    ],
  },
  {
    lane: 'Cooler summer route',
    icon: Trees,
    route: 'Flagstaff + Payson + Rim Country',
    bestFor: 'Phoenix heat escape, summer families, pine-country weekends',
    days: '2 to 5 days',
    plan:
      'Aim for higher elevation, lakes, pines, shaded walks, and flexible food stops. Avoid turning a heat escape into a long exposed trail day.',
    links: [
      ['Cool summer trips', '/arizona/cool-summer-trips-with-kids'],
      ['Flagstaff itinerary', '/archive/flagstaff-family-escape'],
      ['Payson archive', '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim'],
    ],
  },
  {
    lane: 'Food, history, and easy wandering',
    icon: MapPin,
    route: 'Tucson + Cottonwood + Jerome or Bisbee',
    bestFor: 'Adults, friends, mixed mobility, food-first travelers',
    days: '3 to 5 days',
    plan:
      'Pick walkable bases with restaurants, scenic streets, short nature stops, and enough flexibility for people with different energy levels.',
    links: [
      ['Tucson guide', '/arizona/tucson'],
      ['Cottonwood guide', '/arizona/cottonwood'],
      ['Bisbee guide', '/arizona/bisbee'],
    ],
  },
];

const seasonCards = [
  {
    season: 'Spring',
    icon: CloudSun,
    bestFor: 'Sedona, Phoenix, Tucson, Prescott, Grand Canyon',
    watch:
      'Crowds, spring break pricing, full trailheads, and groups trying to do too much in one day.',
  },
  {
    season: 'Summer',
    icon: Sun,
    bestFor: 'Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside',
    watch:
      'Exposed desert hikes, afternoon storms in higher country, water needs, and overheated parking lots.',
  },
  {
    season: 'Fall',
    icon: Trees,
    bestFor: 'Sedona, Flagstaff, Grand Canyon, Prescott, Tucson',
    watch:
      'Popular weekends, changing temperatures, shorter daylight, and northern Arizona cold snaps.',
  },
  {
    season: 'Winter',
    icon: CalendarDays,
    bestFor: 'Phoenix, Tucson, Yuma, lower desert trails, Sedona with layers',
    watch:
      'Snow and ice in Flagstaff, Grand Canyon, Williams, and other higher-elevation routes.',
  },
];

const mistakeRows = [
  {
    mistake: 'Planning by famous names only',
    fix: 'Plan by season, drive time, group energy, bathrooms, food, and shade before choosing the landmark.',
  },
  {
    mistake: 'Stacking too many places',
    fix: 'Use one base for a weekend, two bases for four to five days, and protect downtime between big drives.',
  },
  {
    mistake: 'Treating Arizona like one climate',
    fix: 'Check elevation. Phoenix, Sedona, Flagstaff, Grand Canyon, Payson, and Tucson can feel like different trips.',
  },
  {
    mistake: 'Doing exposed hikes too late',
    fix: 'Start desert hikes early, especially in warm months, and move midday into food, shade, water, or indoor resets.',
  },
  {
    mistake: 'Forgetting the least flexible traveler',
    fix: 'Build the day around toddlers, grandparents, heat-sensitive travelers, or the person least excited to hike.',
  },
];

const firstTripShareText = [
  'First Arizona trip idea from Sage:',
  '',
  'Choose the route by group and season:',
  '- Classic first visit: Phoenix + Sedona + Grand Canyon',
  '- Easy family weekend: Phoenix + Prescott or Payson',
  '- Summer heat escape: Flagstaff, Payson, Prescott, Show Low, or Pinetop-Lakeside',
  '- Friends/food/history: Tucson, Cottonwood, Jerome, or Bisbee',
  '',
  'Rule: one outdoor anchor, one food/reset stop, and one backup.',
  '',
  'Guide: https://sage.healthandtravels.com/arizona/first-trip',
].join('\n');

const firstTripVoteText = [
  'What kind of Arizona trip should we build?',
  '',
  '1. Classic first visit: Phoenix + Sedona + Grand Canyon',
  '2. Easy family weekend: Prescott or Payson',
  '3. Cooler summer escape: Flagstaff or Rim Country',
  '4. Friends/food/history: Tucson, Cottonwood, Jerome, or Bisbee',
  '',
  'Reply with 1, 2, 3, or 4 and Sage can build the plan.',
  '',
  'https://sage.healthandtravels.com/arizona/first-trip',
].join('\n');

export default function ArizonaFirstTripGuide() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="First Arizona Trip Guide for Families and Friends | Sage"
        description="Plan a first Arizona trip with kids, friends, or visitors. Compare Phoenix, Sedona, Flagstaff, Grand Canyon, Tucson, Payson, Prescott, and cooler summer routes by season and drive time."
        url="https://sage.healthandtravels.com/arizona/first-trip"
        faqs={firstTripFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona Guides', url: 'https://sage.healthandtravels.com/arizona' },
          {
            name: 'First Arizona Trip Guide',
            url: 'https://sage.healthandtravels.com/arizona/first-trip',
          },
        ]}
      />

      <section className="border-b border-zinc-100 bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">
              First Arizona Trip Guide
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
              Where should you go first in Arizona?
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
              Build a first Arizona trip that fits the real group: kids,
              friends, visitors, grandparents, heat tolerance, food stops, and
              how much driving everyone can handle.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=explore&length=weekend&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&food=nearby&drive=180"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                Build My First Trip
              </Link>
              <Link
                to="/arizona"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-zinc-950"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Browse Arizona Guides
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <Clock className="mb-5 h-8 w-8 text-orange-300" aria-hidden="true" />
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-300">
              Sage rule
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Choose by season first.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Arizona changes dramatically by elevation. A perfect winter Phoenix
              plan can be a bad July idea, while Flagstaff or Payson may be
              exactly what you need in summer.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Start With Your People
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              The best first Arizona trip depends on who is coming
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {firstTripTypes.map((type) => {
              const Icon = type.icon;

              return (
                <Link
                  key={type.title}
                  to={type.to}
                  className="flex h-full flex-col rounded-[1.5rem] border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
                >
                  <Icon className="mb-4 h-6 w-6 text-orange-600" aria-hidden="true" />
                  <h3 className="text-xl font-black tracking-tight">{type.title}</h3>
                  <p className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-zinc-500">
                    {type.bestBase}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-7 text-zinc-600">
                    {type.why}
                  </p>
                  <span className="mt-5 text-xs font-black uppercase tracking-widest text-orange-700">
                    Build this version
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Best Starter Routes
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Four first-trip paths that make Arizona easier
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Pick the lane that fits the group. Then open the linked guide or
              have Sage turn it into a custom day-by-day plan.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {destinationLanes.map((lane) => {
              const Icon = lane.icon;

              return (
                <article
                  key={lane.lane}
                  className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                        {lane.lane}
                      </p>
                      <h3 className="mt-2 text-2xl font-black tracking-tight">
                        {lane.route}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-5 grid gap-3 rounded-2xl bg-zinc-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                        Best for
                      </p>
                      <p className="mt-1 text-sm font-bold leading-6 text-zinc-700">
                        {lane.bestFor}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                        Time needed
                      </p>
                      <p className="mt-1 text-sm font-bold leading-6 text-zinc-700">
                        {lane.days}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-zinc-600">{lane.plan}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {lane.links.map(([label, to]) => (
                      <Link
                        key={to}
                        to={to}
                        className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-orange-700 transition hover:bg-white"
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

      <section className="border-y border-zinc-200 bg-orange-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-700">
              Arizona By Season
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Where Arizona feels easiest by season
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {seasonCards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.season} className="rounded-2xl border border-orange-200 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-orange-600" aria-hidden="true" />
                  <h3 className="text-xl font-black tracking-tight">{card.season}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-zinc-800">
                    {card.bestFor}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {card.watch}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Avoid The Usual Mistakes
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Small planning fixes that save the whole trip
            </h2>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50">
            {mistakeRows.map((row) => (
              <article
                key={row.mistake}
                className="grid gap-3 border-b border-zinc-200 p-5 last:border-b-0 md:grid-cols-[0.8fr_1.2fr] md:items-start"
              >
                <h3 className="text-base font-black tracking-tight text-zinc-950">
                  {row.mistake}
                </h3>
                <p className="text-sm leading-7 text-zinc-600">{row.fix}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Send this first-trip guide to your group"
        description="Copy a clean Arizona starter plan or send a quick vote so the group can pick the right lane before everyone starts texting random famous places."
        quickPlanText={firstTripShareText}
        voteText={firstTripVoteText}
        eventContext="arizona_first_trip"
      />

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 md:grid-cols-[1fr_0.8fr] md:p-8">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Next Best Step
            </p>
            <h2 className="text-3xl font-black tracking-tight">
              Let Sage turn your first Arizona idea into a plan
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Choose the group, heat, time, activity style, food needs, and
              drive limit. Sage will build a plan that fits the people actually
              going, not a perfect internet version of them.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <Compass className="mb-4 h-7 w-7 text-orange-600" aria-hidden="true" />
            <h3 className="text-2xl font-black">Build your first trip</h3>
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=explore&length=weekend&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&food=nearby&drive=180"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Open Trip Builder
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-7">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              FAQ
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              First Arizona trip questions
            </h2>
          </div>

          <div className="space-y-3">
            {firstTripFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4"
              >
                <summary className="cursor-pointer list-none text-base font-black tracking-tight text-zinc-950">
                  {faq.question}
                  <span className="float-right text-zinc-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
