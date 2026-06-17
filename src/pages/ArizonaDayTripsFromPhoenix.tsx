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
import SharePlanPanel from '../components/SharePlanPanel';

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
  {
    question: 'What is the best Phoenix day trip for a small group?',
    answer:
      'For a small group, the best Phoenix day trip is usually the one with one clear outdoor anchor, one food or reset stop, and a shorter backup nearby. Cave Creek, Payson, Prescott, Cottonwood, Sedona, and Flagstaff all work well when matched to drive time and season.',
  },
  {
    question: 'How far should families drive for a Phoenix day trip?',
    answer:
      'Most families do best with a Phoenix day trip under two hours each way unless the destination is the main event. For longer drives to Sedona, Flagstaff, or Tucson, plan a full day and keep the schedule simple.',
  },
];

const quickChoosers = [
  {
    prompt: 'We only have a morning',
    pick: 'Cave Creek or a Phoenix-area preserve',
    reason:
      'Best when the group needs desert views, breakfast or lunch nearby, and a low-pressure return home.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=60',
  },
  {
    prompt: 'We want cooler air',
    pick: 'Payson, Prescott, or Flagstaff',
    reason:
      'Better for summer planning, tree shade, creek or lake energy, and groups that need a break from Phoenix heat.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
  {
    prompt: 'We have visitors in town',
    pick: 'Sedona, Tucson, or Prescott',
    reason:
      'Good showpiece choices with memorable scenery, easy food stops, and enough variety for mixed interests.',
    to: '/trip-builder?plan=ready&location=sedona&kids=no&group=visitors&activity=explore&length=full-day&season=spring&ages=adults&shade=true&bathrooms=true&stroller=false&drive=180',
  },
  {
    prompt: 'We need the easiest win',
    pick: 'Prescott or Cottonwood',
    reason:
      'A strong middle ground when you want a real Arizona day out without making the whole plan depend on a hard hike.',
    to: '/trip-builder?plan=ready&location=prescott&kids=yes&group=low-stress&activity=relax&length=full-day&season=fall&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
];

const starterItineraries = [
  {
    label: 'Easy morning',
    title: 'Desert views, breakfast, home before the heat',
    bestFor: 'Families with younger kids, visitors on a short schedule',
    route: 'Phoenix preserve or Cave Creek',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=60',
    steps: [
      'Start with a sunrise or early shaded walk.',
      'Keep the outdoor stop short enough that everyone leaves happy.',
      'Add breakfast, coffee, or an early lunch before heading home.',
    ],
    backup: 'Swap the walk for a scenic drive or patio meal if heat, naps, or timing gets tight.',
  },
  {
    label: 'Cooler full day',
    title: 'Higher elevation, one outdoor anchor, one easy reset',
    bestFor: 'Summer planning, mixed-age families, relaxed friend groups',
    route: 'Payson, Prescott, or Flagstaff',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
    steps: [
      'Leave after breakfast or earlier if summer heat is building.',
      'Choose one creek, lake, trail, downtown, or overlook as the main plan.',
      'Use lunch as the reset before deciding whether to add one more stop.',
    ],
    backup: 'If weather rolls in, shift to a town walk, visitor center, cafe, or scenic route home.',
  },
  {
    label: 'Visitor showpiece',
    title: 'Big Arizona scenery without overloading the day',
    bestFor: 'Out-of-town guests, adults, teens, photo-friendly plans',
    route: 'Sedona, Tucson, or Prescott',
    to: '/trip-builder?plan=ready&location=sedona&kids=no&group=visitors&activity=explore&length=full-day&season=spring&ages=adults&shade=true&bathrooms=true&stroller=false&drive=180',
    steps: [
      'Pick the one view, walk, museum, or scenic district that matters most.',
      'Build the day around that anchor instead of stacking too many stops.',
      'Add a memorable lunch or sunset-adjacent stop before the drive back.',
    ],
    backup: 'Keep a low-effort scenic pullout or walkable downtown ready if the group fades.',
  },
  {
    label: 'Low-stress group day',
    title: 'Walkable, flexible, and easy to keep together',
    bestFor: 'Friend groups, grandparents, mixed mobility, food-first days',
    route: 'Cottonwood or Prescott',
    to: '/trip-builder?plan=ready&location=prescott&kids=yes&group=low-stress&activity=relax&length=full-day&season=fall&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
    steps: [
      'Choose a walkable base where food, bathrooms, and shade are close.',
      'Plan one light outdoor stop before or after lunch.',
      'Let the group split between strolling, shopping, snacks, or a scenic pause.',
    ],
    backup: 'If the group gets divided, regroup around a food stop instead of forcing another activity.',
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
      ['Phoenix area preserves', '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=60'],
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

const phoenixQuickPlanText = [
  'Arizona day trip idea from Sage:',
  'Start from Phoenix and choose by drive time.',
  '',
  'Best easy options:',
  '- Under 1 hour: Cave Creek or a Phoenix-area preserve',
  '- 1 to 2 hours: Payson, Prescott, or Cottonwood',
  '- 2 to 3 hours: Sedona, Flagstaff, or Tucson',
  '',
  'Simple plan:',
  'Pick one outdoor anchor, one food/reset stop, and one backup if the group gets tired or the weather changes.',
  '',
  'Sage guide: https://sage.healthandtravels.com/arizona/day-trips-from-phoenix',
].join('\n');

const phoenixVoteText = [
  'Which Arizona day trip from Phoenix should we do?',
  '',
  '1. Cave Creek or Phoenix-area preserve - easiest short morning',
  '2. Payson or Prescott - cooler air and food nearby',
  '3. Sedona, Flagstaff, or Tucson - bigger full-day scenery',
  '',
  'Reply with 1, 2, or 3 and I will build the plan.',
  '',
  'Sage guide: https://sage.healthandtravels.com/arizona/day-trips-from-phoenix',
].join('\n');

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

      <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Quick chooser
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Start with the group mood, then pick the destination
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickChoosers.map((choice) => (
              <Link
                key={choice.prompt}
                to={choice.to}
                className="flex min-h-[250px] flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-orange-600">
                  {choice.prompt}
                </p>
                <h3 className="mt-3 text-xl font-black tracking-tight">
                  {choice.pick}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-zinc-600">
                  {choice.reason}
                </p>
                <span className="mt-5 text-xs font-black uppercase tracking-widest text-zinc-950">
                  Build this day
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Starter itineraries
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Phoenix day-trip plans your group can picture right away
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Use these as simple one-day itinerary frames. Pick the version
              that fits the group, then let Sage turn it into a fuller plan.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {starterItineraries.map((plan) => (
              <article
                key={plan.label}
                className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-5 shadow-sm md:p-6"
              >
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-600">
                      {plan.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">
                      {plan.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-orange-700">
                    {plan.route}
                  </span>
                </div>

                <p className="mb-5 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-zinc-700">
                  {plan.bestFor}
                </p>

                <ol className="space-y-3">
                  {plan.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-7 text-zinc-700">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-black text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                    Backup move
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {plan.backup}
                  </p>
                </div>

                <Link
                  to={plan.to}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
                >
                  Build This Itinerary
                </Link>
              </article>
            ))}
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

      <SharePlanPanel
        title="Make the group decision easier"
        description="Copy a clean Phoenix day-trip summary, send a quick vote, or share this guide so everyone can choose from the same realistic options."
        quickPlanText={phoenixQuickPlanText}
        voteText={phoenixVoteText}
        eventContext="phoenix_day_trips"
      />

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

      <section className="bg-white px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-7">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Phoenix day-trip FAQs
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Fast answers before you load the car
            </h2>
          </div>

          <div className="space-y-3">
            {phoenixDayTripFaqs.map((faq) => (
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
