import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Clock,
  MapPin,
  Mountain,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

const phoenixDayTripFaqs = [
  {
    question: 'What are the best family day trips from Phoenix?',
    answer:
      'Good family day trips from Phoenix include Cave Creek, Prescott, Payson, Sedona, Tucson, Flagstaff, and Cottonwood when the drive time, season, heat, and group energy match the plan.',
  },
  {
    question: 'Where can families escape the Phoenix heat for a day?',
    answer:
      'For summer heat relief, families should look toward higher elevation and shade, including Flagstaff, Prescott, Payson, Show Low, and Pinetop-Lakeside when the drive time works.',
  },
  {
    question: 'What is an easy Arizona day trip from Phoenix with visitors?',
    answer:
      'Sedona, Cave Creek, Prescott, and Tucson can be strong visitor-friendly choices because they offer memorable scenery, food stops, and flexible ways to keep the day simple.',
  },
];

const driveBands = [
  {
    label: 'Under 1 hour',
    icon: Clock,
    headline: 'Quick desert resets without a big drive',
    bestFor: 'Short mornings, visitors, kids with limited patience',
    destinations: [
      ['Cave Creek', '/arizona/cave-creek'],
      [
        'Phoenix area preserves',
        '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=60',
      ],
    ],
    plan:
      'Pick a sunrise walk, a scenic lunch stop, and an easy backup. This is the best range when your group wants Arizona scenery without turning the day into a road marathon.',
  },
  {
    label: '1 to 2 hours',
    icon: Trees,
    headline: 'The sweet spot for easy family day trips',
    bestFor: 'Payson, Prescott, Cottonwood, relaxed friend groups',
    destinations: [
      ['Payson', '/arizona/payson'],
      ['Prescott', '/arizona/prescott'],
      ['Cottonwood', '/arizona/cottonwood'],
    ],
    plan:
      'Use this range for cooler air, lake or creek stops, downtown wandering, and plans where food and bathrooms stay close enough to keep the group cheerful.',
  },
  {
    label: '2 to 3 hours',
    icon: Mountain,
    headline: 'Bigger scenery when the group has more stamina',
    bestFor: 'Sedona, Flagstaff, Tucson, full-day visitors',
    destinations: [
      ['Sedona', '/arizona/sedona'],
      ['Flagstaff', '/arizona/flagstaff'],
      ['Tucson', '/arizona/tucson'],
    ],
    plan:
      'Choose one main adventure and one reward stop. This range is worth it for red rocks, pine country, iconic views, or a visiting-family showpiece day.',
  },
  {
    label: 'Weekend range',
    icon: Car,
    headline: 'When the destination deserves an overnight',
    bestFor: 'Grand Canyon, Page, Show Low, Pinetop-Lakeside',
    destinations: [
      ['Grand Canyon', '/arizona/grand-canyon'],
      ['Page', '/arizona/page'],
      ['Show Low', '/arizona/show-low'],
      ['Pinetop-Lakeside', '/arizona/pinetop-lakeside'],
    ],
    plan:
      'Treat these as overnight or weekend ideas unless your group truly likes long drive days. The trip gets better when nobody is racing daylight back to Phoenix.',
  },
];

const groupStyles = [
  {
    title: 'Families with kids',
    icon: Users,
    text:
      'Choose shorter outdoor windows, nearby bathrooms, simple food stops, and one easy backup if the first plan melts down.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=90',
  },
  {
    title: 'Friends visiting Arizona',
    icon: MapPin,
    text:
      'Prioritize memorable scenery, a great lunch stop, and routes that do not require everyone to be an expert hiker.',
    to: '/trip-builder?plan=ready&location=sedona&kids=no&group=visitors&activity=explore&length=full-day&season=spring&ages=adults&shade=true&bathrooms=true&stroller=false&drive=180',
  },
  {
    title: 'Summer heat escape',
    icon: Sun,
    text:
      'Go higher, start early, keep shade or water in the plan, and avoid exposed desert hikes after the morning window.',
    to: '/trip-builder?plan=ready&location=flagstaff&kids=yes&group=family&activity=explore&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=180',
  },
];

export default function ArizonaDayTripsFromPhoenix() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Best Arizona Day Trips from Phoenix | Sage"
        description="Find family-friendly Arizona day trips from Phoenix by drive time, season, heat, kids, visitors, easy hikes, food stops, and weekend range."
        url="https://sage.healthandtravels.com/arizona/day-trips-from-phoenix"
        faqs={phoenixDayTripFaqs}
      />

      <section className="bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">
            Phoenix starting point guide
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Best Arizona day trips from Phoenix
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Start with the drive time, then match the plan to your people:
            kids, friends, visitors, heat tolerance, food needs, and how much
            energy everyone actually has.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=full-day&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Build From Phoenix
            </Link>
            <Link
              to="/arizona/family-adventures-by-season"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-zinc-950"
            >
              Compare By Season
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Choose by drive time
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Where to go from Phoenix when your group needs a real answer
            </h2>
          </div>

          <div className="grid gap-5">
            {driveBands.map((band) => {
              const Icon = band.icon;

              return (
                <article
                  key={band.label}
                  className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm md:p-6"
                >
                  <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                            {band.label}
                          </p>
                          <h3 className="text-2xl font-black tracking-tight">
                            {band.headline}
                          </h3>
                        </div>
                      </div>

                      <p className="rounded-2xl bg-zinc-50 p-4 text-sm font-semibold leading-6 text-zinc-700">
                        {band.bestFor}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm leading-7 text-zinc-600">
                        {band.plan}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {band.destinations.map(([label, to]) => (
                          <Link
                            key={to}
                            to={to}
                            className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-orange-700 transition hover:border-orange-300 hover:bg-white"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-orange-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Match the group
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              The best Phoenix day trip depends on who is in the car
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {groupStyles.map((style) => {
              const Icon = style.icon;

              return (
                <Link
                  key={style.title}
                  to={style.to}
                  className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
                >
                  <Icon className="mb-4 h-6 w-6 text-orange-600" />
                  <h3 className="text-xl font-black tracking-tight">
                    {style.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {style.text}
                  </p>
                  <span className="mt-5 inline-flex text-xs font-black uppercase tracking-widest text-orange-700">
                    Build this plan
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 md:grid-cols-[1fr_0.8fr] md:p-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Quick Phoenix day-trip rule
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              If the drive is longer than the outdoor activity, make the day
              about the whole route: coffee, scenery, one anchor adventure,
              lunch, and a backup stop. That is how a small group trip stays
              fun instead of feeling like an errand with views.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <Trees className="mb-4 h-7 w-7 text-emerald-600" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Next best click
            </p>
            <h3 className="mt-2 text-2xl font-black">Build your day</h3>
            <Link
              to="/trip-builder"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Open Trip Builder
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
