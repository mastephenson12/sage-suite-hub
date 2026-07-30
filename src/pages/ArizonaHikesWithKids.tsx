import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, Clock, Droplets, Map, Mountain, ShieldCheck, Sun, Trees } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const hikesWithKidsFaqs = [
  {
    question: 'What are the best Arizona hikes with kids?',
    answer:
      'The best Arizona hikes with kids are short, easy to exit, close to bathrooms or food, and matched to the season. Good starter areas include Cave Creek, Prescott, Payson, Sedona, Tucson, Flagstaff, and Phoenix-area preserves when heat and trail difficulty are reasonable.',
  },
  {
    question: 'How long should a family hike be in Arizona?',
    answer:
      'Most families do best starting with hikes under 2 miles, especially with younger kids, visitors, or summer conditions. Older kids and confident hikers can build up gradually when weather, shade, water, and footing are safe.',
  },
  {
    question: 'When is the safest time to hike with kids in Arizona?',
    answer:
      'Morning is usually safest, especially in warm desert areas. In summer, families should prioritize higher elevation destinations, shade, early starts, and backup plans that do not depend on exposed desert trails.',
  },
  {
    question: 'What should families pack for Arizona hikes with kids?',
    answer:
      'Bring water, salty snacks or electrolytes, sun hats, sunscreen, offline maps, a charged phone, a small first-aid kit, layers for high elevation, and an easy turnaround rule before anyone gets overheated or exhausted.',
  },
];

const ageBands = [
  {
    label: 'Toddlers and preschoolers',
    icon: Baby,
    bestFor: 'Short loops, paved paths, nature centers, shaded picnic stops',
    plan:
      'Think tiny adventure, not conquest. Choose a route where turning around still feels like a win and bathrooms are not a myth whispered about in the distance.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&stroller=true&drive=60',
  },
  {
    label: 'Elementary-age kids',
    icon: Trees,
    bestFor: 'Creeks, rocks, overlooks, short trails with a clear payoff',
    plan:
      'Give the hike a mission: find the bridge, reach the viewpoint, spot the creek, earn the snack. Kids like purpose. Adults pretend they are above this, then also need snacks.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
  {
    label: 'Tweens and teens',
    icon: Mountain,
    bestFor: 'Moderate trails, bigger views, photo stops, challenge with guardrails',
    plan:
      'Let them help choose the route and the food stop. Keep the trail challenging enough to feel real without turning family bonding into a rescue subplot.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=challenge&length=full-day&season=fall&ages=teens&shade=true&bathrooms=false&stroller=false&drive=180',
  },
];

const seasonalPicks = [
  {
    season: 'Spring',
    icon: Sun,
    destinations: 'Sedona, Tucson, Cave Creek, Prescott',
    why:
      'Comfortable weather, wildflower potential, and more forgiving trail windows make spring one of the easiest seasons for family hiking.',
  },
  {
    season: 'Summer',
    icon: Trees,
    destinations: 'Flagstaff, Payson, Show Low, Pinetop-Lakeside, Prescott',
    why:
      'Higher elevation, shade, lakes, creeks, and early starts matter more than ambition. Desert heat does not care about your itinerary, because heat is rude like that.',
  },
  {
    season: 'Fall',
    icon: Map,
    destinations: 'Prescott, Sedona, Payson, Tucson, Cottonwood',
    why:
      'Fall is great for flexible weekend hikes, town-and-trail combos, and families who want outdoor time without summer-level strategy meetings.',
  },
  {
    season: 'Winter',
    icon: ShieldCheck,
    destinations: 'Phoenix preserves, Cave Creek, Tucson, Yuma, lower Sedona trails',
    why:
      'Lower desert trails become more comfortable, while higher elevation trips need weather, snow, ice, and road checks before you load the car.',
  },
];

const safetyRules = [
  'Start earlier than you think you need to, especially in desert areas.',
  'Pick a turnaround point before the hike starts, not after everyone is cranky.',
  'Carry more water than the plan requires and keep backup water in the car.',
  'Choose shade, bathrooms, and food access when hiking with younger kids.',
  'Use offline maps because cell service likes to disappear exactly when humans become confident.',
  'Skip exposed desert hikes when heat risk is high or anyone in the group is already tired.',
];

const starterRoutes = [
  {
    title: 'Easy desert morning',
    bestFor: 'Young kids, visitors, short schedules',
    route: 'Phoenix preserve or Cave Creek',
    steps: ['Sunrise or early morning start', 'Short scenic walk', 'Breakfast, lunch, or playground reset nearby'],
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&stroller=false&drive=60',
  },
  {
    title: 'Cooler creek or pine day',
    bestFor: 'Summer heat escape, elementary-age kids',
    route: 'Payson, Prescott, or Flagstaff',
    steps: ['Drive to higher elevation', 'Choose one creek, lake, forest, or easy trail', 'Use food as the reset before heading home'],
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
  {
    title: 'Red rock reward hike',
    bestFor: 'Older kids, photo-friendly family trips',
    route: 'Sedona or Cottonwood base',
    steps: ['Pick one clear scenic payoff', 'Avoid stacking multiple hard stops', 'Finish with food before the drive back'],
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&ages=older-kids&shade=true&bathrooms=false&stroller=false&drive=180',
  },
];

const shareText = [
  'Arizona hikes with kids idea from Sage:',
  '',
  'Start with the youngest or least flexible person in the group.',
  'Pick one short trail, one food/reset stop, and one backup plan.',
  '',
  'Best seasonal picks:',
  '- Spring: Sedona, Tucson, Cave Creek, Prescott',
  '- Summer: Flagstaff, Payson, Show Low, Pinetop-Lakeside',
  '- Fall: Prescott, Sedona, Payson, Cottonwood',
  '- Winter: Phoenix preserves, Cave Creek, Tucson, Yuma',
  '',
  'Guide: https://sage.healthandtravels.com/arizona/hikes-with-kids',
].join('\n');

const voteText = [
  'Which Arizona family hike plan should we choose?',
  '',
  '1. Easy desert morning: short Phoenix or Cave Creek walk plus food nearby.',
  '2. Cooler creek or pine day: Payson, Prescott, or Flagstaff for shade and elevation.',
  '3. Red rock reward hike: Sedona or Cottonwood with one scenic payoff.',
  '',
  'Sage guide: https://sage.healthandtravels.com/arizona/hikes-with-kids',
].join('\n');

export default function ArizonaHikesWithKids() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Best Arizona Hikes With Kids | Family Trail Guide | Sage"
        description="Find family-friendly Arizona hikes with kids by age, season, heat, shade, bathrooms, drive time, and easy trip planning help from Sage."
        url="https://sage.healthandtravels.com/arizona/hikes-with-kids"
        faqs={hikesWithKidsFaqs}
      />

      <section className="bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300">
            Family hiking guide
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Best Arizona hikes with kids
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            The best family hike is not always the famous one. It is the one
            your actual people can enjoy safely, with the right season, shade,
            snacks, bathrooms, and a merciful exit plan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=90"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-600"
            >
              Build a Kid-Friendly Hike
            </Link>
            <Link
              to="/arizona/desert-hiking-safety"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-zinc-950"
            >
              Check Desert Safety
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
              Choose by age
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Match the hike to the kid, not the Instagram reel
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {ageBands.map((band) => {
              const Icon = band.icon;

              return (
                <Link
                  key={band.label}
                  to={band.to}
                  className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <Icon className="mb-5 h-7 w-7 text-emerald-600" />
                  <h3 className="text-2xl font-black tracking-tight">{band.label}</h3>
                  <p className="mt-3 rounded-2xl bg-emerald-50 p-4 text-sm font-black leading-6 text-emerald-800">
                    {band.bestFor}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">{band.plan}</p>
                  <span className="mt-5 inline-flex text-xs font-black uppercase tracking-widest text-emerald-700">
                    Build this hike
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
              Choose by season
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Arizona kid hikes change with the weather
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Arizona is not one hiking climate. Desert, pine forest, red rock,
              high country, and canyon country all behave differently. Build the
              plan around the season first, then choose the trail.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {seasonalPicks.map((pick) => {
              const Icon = pick.icon;

              return (
                <article
                  key={pick.season}
                  className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                        {pick.season}
                      </p>
                      <h3 className="text-xl font-black tracking-tight">
                        {pick.destinations}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-zinc-600">{pick.why}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-emerald-50 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
              Safety filter
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              The non-negotiables before hiking with kids
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">
              A kid-friendly hike needs more than a pretty trail name. It needs
              timing, shade, water, realistic mileage, and enough humility to
              turn around before the family group chat becomes evidence.
            </p>
          </div>

          <div className="grid gap-3">
            {safetyRules.map((rule, index) => (
              <div
                key={rule}
                className="flex gap-4 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-7 text-zinc-700">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
              Starter plans
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Simple Arizona family hiking plans
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {starterRoutes.map((plan) => (
              <article
                key={plan.title}
                className="flex flex-col rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-6 shadow-sm"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                  {plan.route}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{plan.title}</h3>
                <p className="mt-3 rounded-2xl bg-white p-4 text-sm font-black leading-6 text-zinc-700">
                  {plan.bestFor}
                </p>
                <ol className="mt-5 flex-1 space-y-3">
                  {plan.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-7 text-zinc-700">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-black text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <Link
                  to={plan.to}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-emerald-600"
                >
                  Build This Family Hike
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
              Use Sage
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Turn the kid-friendly hike idea into a real plan
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-300">
              Sage can help you choose by age, drive time, shade, bathrooms,
              season, and group energy, because apparently families enjoy having
              more variables than a NASA launch.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=90"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-600"
            >
              Build My Hike
            </Link>
            <Link
              to="/arizona/day-trips-from-phoenix"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-zinc-950"
            >
              Phoenix Day Trips
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <SharePlanPanel
            title="Share this Arizona hikes with kids guide"
            description="Send this to the parent who wants a real hike, not a family mutiny with trail dust."
            quickPlanText={shareText}
            voteText={voteText}
            eventContext="arizona_hikes_with_kids"
          />
        </div>
      </section>
    </main>
  );
}
