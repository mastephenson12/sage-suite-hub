import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Droplets,
  MapPin,
  Mountain,
  ShieldCheck,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const easyHikesFaqs = [
  {
    question: 'What makes an Arizona hike easy for families?',
    answer:
      'An easy Arizona family hike is usually short, has modest elevation gain, offers a simple turnaround, and matches the season. Shade, bathrooms, parking, clear footing, and nearby food can matter as much as mileage.',
  },
  {
    question: 'How long should an easy family hike be?',
    answer:
      'Many families should begin with a route under 2 miles or a walk that can be shortened easily. The right distance depends on the youngest hiker, weather, elevation, shade, and how far the family has already traveled.',
  },
  {
    question: 'Can families hike easy trails in Arizona during summer?',
    answer:
      'Yes, but summer plans should prioritize higher elevation, very early starts, shade, water, and easy exits. Exposed low-desert trails can become dangerous even when the mileage looks easy.',
  },
  {
    question: 'What should families bring on an easy Arizona hike?',
    answer:
      'Bring water, snacks, sun protection, sturdy footwear, a charged phone, an offline map, basic first aid, and extra layers for higher elevations. Easy does not mean risk-free, because Arizona enjoys making simple plans geographically dramatic.',
  },
];

const planningFilters = [
  {
    title: 'Under 2 miles',
    icon: Clock,
    text: 'A shorter route gives younger hikers, visitors, and tired adults a better chance of finishing happy.',
    to: '/trip-builder?plan=ready&kids=yes&group=family&activity=hike&length=half-day&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=90',
  },
  {
    title: 'Shade or cooler elevation',
    icon: Trees,
    text: 'Choose pine country, creek corridors, shaded parks, or cooler seasons before choosing scenery alone.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=hike&length=half-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
  {
    title: 'Bathrooms and food nearby',
    icon: MapPin,
    text: 'A practical trailhead and an easy reset stop can rescue the entire day. Civilization occasionally proves useful.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&stroller=true&drive=60',
  },
];

const regions = [
  {
    name: 'Phoenix and the Valley',
    season: 'Best in cooler months or very early mornings',
    description:
      'Look for short preserve loops, desert nature walks, paved park paths, and routes with a clear turnaround. Avoid treating summer desert mileage as harmless merely because the number is small.',
    links: [
      ['Phoenix guide', '/arizona/phoenix'],
      ['Cave Creek guide', '/arizona/cave-creek'],
      ['Phoenix day trips', '/arizona/day-trips-from-phoenix'],
    ],
  },
  {
    name: 'Sedona and Verde Valley',
    season: 'Strong in spring and fall; start early during warm weather',
    description:
      'Choose one scenic payoff, modest climbing, and a route that does not require the family to complete a heroic loop. Parking and crowds should be part of the plan, not a surprise ending.',
    links: [
      ['Sedona guide', '/arizona/sedona'],
      ['Cottonwood guide', '/arizona/cottonwood'],
      ['Seasonal guide', '/arizona/family-adventures-by-season'],
    ],
  },
  {
    name: 'Payson and Rim Country',
    season: 'Useful for warm-weather escapes and forest days',
    description:
      'Forest walks, lake stops, picnic areas, and short Rim Country outings work well when the goal is cooler air rather than maximum mileage.',
    links: [
      ['Payson guide', '/arizona/payson'],
      ['Rim Country with kids', '/arizona/payson-rim-country-with-kids'],
      ['Cool summer trips', '/arizona/cool-summer-trips-with-kids'],
    ],
  },
  {
    name: 'Flagstaff and northern Arizona',
    season: 'Excellent in summer; check snow, ice, and roads in winter',
    description:
      'Families can combine easy forest walks with parks, overlooks, downtown food, and weather backups. Higher elevation means cooler air, but also faster weather changes.',
    links: [
      ['Flagstaff guide', '/arizona/flagstaff'],
      ['Williams guide', '/arizona/williams'],
      ['Weekend trips', '/arizona/weekend-trips'],
    ],
  },
  {
    name: 'Tucson and southern Arizona',
    season: 'Best from fall through spring',
    description:
      'Desert gardens, short foothill walks, nature paths, and visitor-friendly scenic stops can create an easy outdoor day without committing everyone to a long exposed trail.',
    links: [
      ['Tucson guide', '/arizona/tucson'],
      ['Bisbee guide', '/arizona/bisbee'],
      ['Desert safety', '/arizona/desert-hiking-safety'],
    ],
  },
  {
    name: 'Prescott and central highlands',
    season: 'Flexible across much of the year with winter weather checks',
    description:
      'Lake loops, granite scenery, forest edges, and town-and-trail combinations make Prescott useful for families who want an easy outdoor anchor plus food and wandering nearby.',
    links: [
      ['Prescott guide', '/arizona/prescott'],
      ['Weekend trips', '/arizona/weekend-trips'],
      ['Hikes with kids', '/arizona/hikes-with-kids'],
    ],
  },
];

const familyRules = [
  'Plan for the youngest, least experienced, or least heat-tolerant person.',
  'Choose a turnaround time before starting, even on an out-and-back route.',
  'Carry more water than the published distance makes you think you need.',
  'Treat shade, bathrooms, parking, and nearby food as real trail features.',
  'Check current weather, closures, fees, and road conditions before leaving.',
  'Stop early when anyone becomes overheated, unusually tired, dizzy, confused, or unsteady.',
];

const examplePlans = [
  {
    title: 'Easy desert morning',
    bestFor: 'Phoenix-area families, visitors, younger kids',
    steps: ['Start shortly after sunrise', 'Walk a short loop or out-and-back', 'Finish with breakfast, a playground, or a shaded reset'],
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=hike&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&stroller=false&drive=60',
  },
  {
    title: 'Cool forest half-day',
    bestFor: 'Summer escape, mixed ages, low-stress wandering',
    steps: ['Drive to Payson, Prescott, or Flagstaff', 'Choose one short forest or lake walk', 'Use lunch as the reset before adding another stop'],
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=half-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
  {
    title: 'Red rock scenic win',
    bestFor: 'Older kids, visiting family, memorable views',
    steps: ['Arrive early', 'Pick one easy scenic route or overlook', 'Avoid stacking multiple demanding hikes into one day'],
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&ages=older-kids&shade=true&bathrooms=false&stroller=false&drive=180',
  },
];

const shareText = [
  'Easy Arizona family hike plan from Sage:',
  '',
  'Choose a short route with an easy turnaround, then match it to the weather.',
  'Prioritize shade, water, bathrooms, parking, and one nearby food or reset stop.',
  '',
  'Good starting regions:',
  '- Cooler months: Phoenix, Cave Creek, Tucson, Sedona',
  '- Warm months: Payson, Prescott, Flagstaff, Show Low, Pinetop-Lakeside',
  '',
  'Guide: https://sage.healthandtravels.com/arizona/easy-family-hikes',
].join('\n');

const voteText = [
  'Which easy Arizona family hike day should we build?',
  '',
  '1. Easy desert morning near Phoenix or Cave Creek',
  '2. Cool forest half-day near Payson, Prescott, or Flagstaff',
  '3. Red rock scenic day near Sedona or Cottonwood',
  '',
  'Guide: https://sage.healthandtravels.com/arizona/easy-family-hikes',
].join('\n');

export default function EasyArizonaFamilyHikes() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Easy Family Hikes in Arizona | Beginner-Friendly Guide | Sage"
        description="Find easy family hikes in Arizona by season, region, distance, shade, bathrooms, kid needs, and drive time. Build a safer family hiking plan with Sage."
        url="https://sage.healthandtravels.com/arizona/easy-family-hikes"
        faqs={easyHikesFaqs}
      />

      <section className="bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300">
            Beginner-friendly Arizona hiking
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Easy family hikes in Arizona
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/80 md:text-xl">
            Find a hike your family can actually enjoy, with practical choices for
            distance, heat, shade, bathrooms, drive time, and the sacred post-hike snack.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&kids=yes&group=family&activity=hike&length=half-day&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=90"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black uppercase tracking-widest text-emerald-950 transition hover:bg-white"
            >
              Build an Easy Hike
            </Link>
            <Link
              to="/arizona/hikes-with-kids"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-emerald-950"
            >
              Hiking With Kids Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
              Start with the right filter
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Easy is more than a mileage number
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              A one-mile exposed desert climb can be harder than a two-mile shaded walk.
              Choose the conditions first, then choose the trail.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {planningFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <Link
                  key={filter.title}
                  to={filter.to}
                  className="group rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                >
                  <Icon className="mb-5 h-7 w-7 text-emerald-700" />
                  <h3 className="text-2xl font-black tracking-tight">{filter.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{filter.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
                    Build this plan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
              Where to start
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Easy hiking regions across Arizona
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {regions.map((region) => (
              <article key={region.name} className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Mountain className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{region.name}</h3>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
                      {region.season}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{region.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {region.links.map(([label, to]) => (
                    <Link
                      key={to}
                      to={to}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-emerald-800 transition hover:bg-white"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <ShieldCheck className="mb-5 h-9 w-9 text-emerald-300" />
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
              Family safety rules
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Keep the easy hike easy
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-300">
              Trail conditions, closures, weather, fees, and access can change. Check current official information before leaving and turn around early when conditions stop matching the plan.
            </p>
            <Link
              to="/arizona/desert-hiking-safety"
              className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-300 hover:text-white"
            >
              Read the desert safety guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {familyRules.map((rule, index) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="mb-2 text-xs font-black text-emerald-300">0{index + 1}</p>
                <p className="text-sm leading-7 text-zinc-200">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
              Ready-to-build ideas
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Three low-stress family hike days
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {examplePlans.map((plan) => (
              <Link
                key={plan.title}
                to={plan.to}
                className="group flex h-full flex-col rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-6 transition hover:border-emerald-300 hover:bg-white hover:shadow-lg"
              >
                <Users className="mb-5 h-7 w-7 text-emerald-700" />
                <h3 className="text-2xl font-black tracking-tight">{plan.title}</h3>
                <p className="mt-3 rounded-2xl bg-white p-4 text-sm font-bold leading-6 text-zinc-700">
                  Best for: {plan.bestFor}
                </p>
                <ol className="mt-5 space-y-3 text-sm leading-7 text-zinc-600">
                  {plan.steps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-black text-emerald-700">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
                  Build this trip <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Share an easy hike idea"
        description="Copy a practical family hike plan or send a quick group vote before everyone proposes a different mountain range."
        quickPlanText={shareText}
        voteText={voteText}
        eventContext="easy_arizona_family_hikes"
      />

      <section className="bg-emerald-50 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <Droplets className="mb-5 h-8 w-8 text-emerald-700" />
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Build the hike around your real family
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
              Tell Sage who is going, how far you want to drive, what season you are hiking, and whether shade, bathrooms, or stroller access matter.
            </p>
          </div>
          <Link
            to="/trip-builder?plan=ready&kids=yes&group=family&activity=hike&length=half-day&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=90"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-800"
          >
            Plan My Easy Family Hike
          </Link>
        </div>
      </section>
    </main>
  );
}
