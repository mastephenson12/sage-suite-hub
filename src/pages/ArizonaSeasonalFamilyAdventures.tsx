import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  CloudSun,
  Mountain,
  Snowflake,
  Sun,
  Trees,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const seasonalFaqs = [
  {
    question: 'What is the best season for family adventures in Arizona?',
    answer:
      'Spring and fall are usually the easiest seasons for Arizona family adventures because temperatures are more forgiving, trails are more comfortable, and road trips are easier to pace.',
  },
  {
    question: 'Where should families go in Arizona during summer?',
    answer:
      'In summer, families should prioritize higher elevation, shade, water, and early starts. Flagstaff, Prescott, Payson, Show Low, and Pinetop-Lakeside are usually better choices than exposed desert hikes.',
  },
  {
    question: 'Can families hike in Arizona during winter?',
    answer:
      'Yes. Winter is one of the best times for lower desert destinations like Tucson, Cave Creek, Yuma, and Phoenix-area trails, while higher-elevation trips need weather and road checks.',
  },
];

const seasons = [
  {
    id: 'spring',
    label: 'Spring',
    icon: CloudSun,
    headline: 'Wildflower weather, red rocks, and desert mornings',
    bestFor: 'Sedona, Tucson, Cave Creek, Payson, Prescott',
    timing: 'Start early, but you usually have more forgiveness than summer.',
    plan:
      'Use spring for red rock walks, desert trails, creek stops, and first-time Arizona visitor days.',
    guides: [
      ['Sedona', '/arizona/sedona'],
      ['Tucson', '/arizona/tucson'],
      ['Cave Creek', '/arizona/cave-creek'],
    ],
    tripTo:
      '/trip-builder?plan=ready&kids=yes&group=family&activity=explore&length=full-day&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
  {
    id: 'summer',
    label: 'Summer',
    icon: Trees,
    headline: 'Cooler air, pine country, lakes, and shaded resets',
    bestFor: 'Flagstaff, Show Low, Pinetop-Lakeside, Prescott, Payson',
    timing: 'Go higher, start earlier, and keep exposed desert hiking off the menu.',
    plan:
      'Summer works best when the plan is built around elevation, water, shade, and indoor or easy-exit backups.',
    guides: [
      ['Flagstaff', '/arizona/flagstaff'],
      ['Show Low', '/arizona/show-low'],
      ['Pinetop-Lakeside', '/arizona/pinetop-lakeside'],
    ],
    tripTo:
      '/trip-builder?plan=ready&kids=yes&group=family&activity=explore&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=180',
  },
  {
    id: 'fall',
    label: 'Fall',
    icon: Mountain,
    headline: 'Road trips, weekend bases, and easier group energy',
    bestFor: 'Prescott, Cottonwood, Jerome, Williams, Sedona',
    timing: 'Use the cooler air for longer wandering, but still check daylight.',
    plan:
      'Fall is a strong season for friend groups, visiting family, food stops, and weekend bases.',
    guides: [
      ['Prescott', '/arizona/prescott'],
      ['Cottonwood', '/arizona/cottonwood'],
      ['Williams', '/arizona/williams'],
    ],
    tripTo:
      '/trip-builder?plan=ready&kids=yes&group=visitors&activity=explore&length=weekend&season=fall&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=180',
  },
  {
    id: 'winter',
    label: 'Winter',
    icon: Snowflake,
    headline: 'Desert hiking, southern Arizona, and sunny easy walks',
    bestFor: 'Tucson, Yuma, Cave Creek, Lake Havasu, Bisbee',
    timing: 'Lower deserts shine, while Flagstaff and the rim need weather checks.',
    plan:
      'Winter is the season for easier desert walks, visitor-friendly sunshine, and lower-elevation family plans.',
    guides: [
      ['Tucson', '/arizona/tucson'],
      ['Yuma', '/arizona/yuma'],
      ['Bisbee', '/arizona/bisbee'],
    ],
    tripTo:
      '/trip-builder?plan=ready&kids=yes&group=family&activity=hike&length=half-day&season=winter&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=180',
  },
];

const quickRules = [
  {
    title: 'Heat changes the plan first',
    text: 'If the forecast is hot, choose elevation, shade, water, or a shorter morning plan before choosing a famous trail.',
  },
  {
    title: 'Food is part of the route',
    text: 'The best family plan has one outdoor anchor, one reset stop, and one backup. Lunch is not a side quest.',
  },
  {
    title: 'Visitors need simple wins',
    text: 'For guests, choose memorable scenery and easy logistics before chasing the hardest hike in the region.',
  },
];

const seasonalQuickPlanText = [
  'Arizona seasonal trip idea from Sage:',
  '',
  'Best timing:',
  '- Spring: Sedona, Tucson, Cave Creek, Payson, or Prescott',
  '- Summer: Flagstaff, Show Low, Pinetop-Lakeside, Prescott, or Payson',
  '- Fall: Prescott, Cottonwood, Jerome, Williams, or Sedona',
  '- Winter: Tucson, Yuma, Cave Creek, Lake Havasu, or Bisbee',
  '',
  'Simple rule:',
  'Match the adventure to heat, elevation, daylight, and group energy before choosing the trail.',
  '',
  'Sage guide: https://sage.healthandtravels.com/arizona/family-adventures-by-season',
].join('\n');

const seasonalVoteText = [
  'Which Arizona season plan should we do?',
  '',
  '1. Spring red rocks or desert trails',
  '2. Summer cooler-air escape',
  '3. Fall road trip or friend weekend',
  '4. Winter desert hiking or sunny easy walk',
  '',
  'Reply with 1, 2, 3, or 4 and I will build the plan.',
  '',
  'Sage guide: https://sage.healthandtravels.com/arizona/family-adventures-by-season',
].join('\n');

export default function ArizonaSeasonalFamilyAdventures() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Best Arizona Family Adventures by Season | Sage"
        description="Find the best Arizona family adventures by season, including spring red rock trips, summer cool-weather escapes, fall weekend bases, and winter desert hikes."
        url="https://sage.healthandtravels.com/arizona/family-adventures-by-season"
        faqs={seasonalFaqs}
      />

      <section className="bg-orange-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-orange-600">
            Arizona family adventure guide
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-zinc-950 md:text-6xl">
            Best Arizona family adventures by season
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 md:text-xl">
            Arizona is not one-size-fits-all. The best family trip changes with
            heat, elevation, daylight, storms, school breaks, and how much
            patience your group has left in the tank.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/arizona"
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Browse Arizona Guides
            </Link>
            <Link
              to="/trip-builder?plan=ready&kids=yes&group=family&activity=explore&length=full-day&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Build a Seasonal Plan
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {quickRules.map((rule) => (
            <article
              key={rule.title}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
            >
              <CalendarDays className="mb-4 h-5 w-5 text-orange-600" />
              <h2 className="text-lg font-black tracking-tight">
                {rule.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Seasonal picks
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Where to go in Arizona with family, season by season
            </h2>
          </div>

          <div className="grid gap-5">
            {seasons.map((season) => {
              const Icon = season.icon;

              return (
                <article
                  key={season.id}
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
                            {season.label}
                          </p>
                          <h3 className="text-2xl font-black tracking-tight">
                            {season.headline}
                          </h3>
                        </div>
                      </div>

                      <p className="rounded-2xl bg-zinc-50 p-4 text-sm font-semibold leading-6 text-zinc-700">
                        {season.timing}
                      </p>
                    </div>

                    <div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                          <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                            Best for
                          </p>
                          <p className="text-sm font-bold leading-6 text-zinc-800">
                            {season.bestFor}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                          <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                            Simple plan
                          </p>
                          <p className="text-sm font-bold leading-6 text-zinc-800">
                            {season.plan}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {season.guides.map(([label, to]) => (
                          <Link
                            key={to}
                            to={to}
                            className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-orange-700 transition hover:border-orange-300 hover:bg-white"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>

                      <Link
                        to={season.tripTo}
                        className="mt-4 inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
                      >
                        Build {season.label} Plan
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Help everyone pick the season"
        description="Copy a seasonal summary, send a quick group vote, or share this guide before the text thread turns into twelve half-plans."
        quickPlanText={seasonalQuickPlanText}
        voteText={seasonalVoteText}
        eventContext="seasonal_family_adventures"
      />

      <section className="bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <Sun className="mb-5 h-8 w-8 text-orange-300" />
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Match the adventure to the season before you choose the trail
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-300">
              Sage can turn the season, your group, and your drive tolerance
              into a practical Arizona plan with timing, food, safety, and
              backup ideas built in.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">
              Next step
            </p>
            <h3 className="text-2xl font-black">Build a real plan</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-300">
              Choose the season, group style, and drive time, then send the plan
              to your family or friends.
            </p>
            <Link
              to="/trip-builder"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-950 transition hover:bg-orange-100"
            >
              Open Trip Builder
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
