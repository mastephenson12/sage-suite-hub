import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Car,
  Clock,
  Compass,
  MapPin,
  Mountain,
  Sparkles,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const weekendTripFaqs = [
  {
    question: 'What are the best Arizona weekend trips for families?',
    answer:
      'Strong Arizona weekend trips for families include Flagstaff, Payson, Prescott, Sedona, Tucson, Williams, Grand Canyon, Show Low, and Pinetop-Lakeside when the plan matches the season, drive time, and kid energy level.',
  },
  {
    question: 'What are the best Arizona weekend trips for groups of friends?',
    answer:
      'Groups of friends usually do well with Sedona, Flagstaff, Prescott, Cottonwood and Jerome, Page, Tucson, or a Grand Canyon weekend because these places combine scenery, food, flexible activities, and easy shared lodging options.',
  },
  {
    question: 'Where should Phoenix families go for a cooler weekend?',
    answer:
      'For cooler summer weekends from Phoenix, families should look first at Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside, and the Mogollon Rim because higher elevation and shade make the trip easier to enjoy.',
  },
  {
    question: 'How should families choose an Arizona weekend destination?',
    answer:
      'Choose by season first, then drive time, then one main activity. A simple weekend works best with one outdoor anchor, one flexible food stop, and one backup plan for heat, storms, tired kids, or traffic.',
  },
];

const quickChoices = [
  {
    icon: Trees,
    title: 'Cooler Air Weekend',
    bestFor: 'Phoenix families escaping heat',
    places: 'Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside',
  },
  {
    icon: Mountain,
    title: 'Red Rock Weekend',
    bestFor: 'Visitors, photos, food, and scenery',
    places: 'Sedona, Cottonwood, Jerome',
  },
  {
    icon: Sparkles,
    title: 'Big Memory Weekend',
    bestFor: 'Milestone trips and first Arizona adventures',
    places: 'Grand Canyon, Page, Williams',
  },
  {
    icon: Clock,
    title: 'Easy Low-Stress Weekend',
    bestFor: 'Young kids, mixed energy, and simple planning',
    places: 'Prescott, Payson, Cave Creek, Tucson',
  },
];

const tripIdeas = [
  {
    title: 'Flagstaff Weekend',
    drive: 'About 2 to 2.5 hours from Phoenix',
    season: 'Best for summer cooling, fall color, winter snow checks, and spring weekends',
    why:
      'Flagstaff is the easiest answer when Phoenix is too hot and the group needs pines, mountain air, casual food, and enough options to keep kids and friends happy.',
    anchors: ['Lowell Observatory', 'Fort Tuthill', 'downtown Flagstaff', 'Walnut Canyon', 'easy forest walks'],
    link: '/archive/flagstaff-family-escape',
    linkLabel: 'Open Flagstaff itinerary',
  },
  {
    title: 'Payson and Mogollon Rim Weekend',
    drive: 'About 1.5 to 2 hours from Phoenix',
    season: 'Best for summer shade, late spring, early fall, and quick mountain resets',
    why:
      'Payson gives families and friend groups a cooler-air reset without committing to a long drive. Build the weekend around lakes, pine forest, rim views, and a cabin or simple hotel base.',
    anchors: ['Woods Canyon Lake', 'Mogollon Rim views', 'Water Wheel area', 'Green Valley Park', 'easy picnic stops'],
    link: '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim',
    linkLabel: 'Open Payson guide',
  },
  {
    title: 'Prescott Weekend',
    drive: 'About 1.75 to 2 hours from Phoenix',
    season: 'Best for spring, summer, fall, and low-stress group weekends',
    why:
      'Prescott works when the group wants a real weekend away but nobody wants a complicated plan. It has lakes, historic downtown, food, walkable areas, and easy scenic stops.',
    anchors: ['Watson Lake', 'downtown Prescott', 'Thumb Butte area', 'Lynx Lake', 'easy patio meals'],
    link: '/arizona/prescott',
    linkLabel: 'Open Prescott guide',
  },
  {
    title: 'Sedona, Cottonwood, and Jerome Weekend',
    drive: 'About 2 to 2.5 hours from Phoenix',
    season: 'Best for spring, fall, winter, and early morning summer plans',
    why:
      'This is the classic scenery weekend. Keep it sane by choosing one red rock hike or viewpoint, then use Cottonwood or Jerome for food, wandering, and a slower second half of the day.',
    anchors: ['Sedona viewpoints', 'easy red rock trails', 'Tlaquepaque', 'Old Town Cottonwood', 'Jerome views'],
    link: '/archive/sedona-family-adventure',
    linkLabel: 'Open Sedona itinerary',
  },
  {
    title: 'Grand Canyon and Williams Weekend',
    drive: 'About 3.5 to 4 hours from Phoenix',
    season: 'Best for spring, fall, and summer with lodging planned early',
    why:
      'The Grand Canyon is the big memory trip. Williams makes a helpful base when families want food, easier lodging, and a softer landing before or after the South Rim.',
    anchors: ['South Rim viewpoints', 'Desert View Drive', 'Williams', 'sunrise or sunset viewing', 'simple picnic stops'],
    link: '/archive/grand-canyon-family-adventure',
    linkLabel: 'Open Grand Canyon itinerary',
  },
  {
    title: 'Tucson Weekend',
    drive: 'About 1.75 to 2 hours from Phoenix',
    season: 'Best for winter, spring, and fall desert weekends',
    why:
      'Tucson is great for families and groups who want desert beauty, museums, food, and flexible plans without making the entire weekend about hiking.',
    anchors: ['Arizona-Sonora Desert Museum', 'Saguaro National Park', 'downtown food stops', 'Sabino Canyon', 'Mission San Xavier del Bac'],
    link: '/arizona/tucson',
    linkLabel: 'Open Tucson guide',
  },
  {
    title: 'Page Weekend',
    drive: 'About 4.5 hours from Phoenix',
    season: 'Best for older kids, friend groups, and big scenery trips',
    why:
      'Page is a longer push, but it can feel huge in the best way. Make it a two-night trip, book the main experience ahead, and leave space for weather and road time.',
    anchors: ['Horseshoe Bend', 'Lake Powell views', 'guided slot canyon tours', 'Glen Canyon Dam area', 'sunset viewpoints'],
    link: '/arizona/page',
    linkLabel: 'Open Page guide',
  },
  {
    title: 'Show Low and Pinetop-Lakeside Weekend',
    drive: 'About 3 to 3.5 hours from Phoenix',
    season: 'Best for summer, fall, and longer cool-weather escapes',
    why:
      'This is a strong pick when the group wants forest, slower mornings, cabin energy, and a real break from desert heat. It is better as two nights than a rushed one-night trip.',
    anchors: ['lakeside walks', 'forest roads', 'family cabin time', 'cooler evenings', 'simple food stops'],
    link: '/arizona/pinetop-lakeside',
    linkLabel: 'Open Pinetop-Lakeside guide',
  },
];

const groupMatrix = [
  {
    group: 'Young kids',
    bestFits: 'Payson, Prescott, Flagstaff',
    reason: 'Shorter drives, flexible stops, shade, bathrooms, and easy exits matter more than famous hikes.',
  },
  {
    group: 'Teenagers',
    bestFits: 'Sedona, Flagstaff, Page, Grand Canyon',
    reason: 'Give them one memorable anchor, then leave room for food, photos, downtime, and a second option.',
  },
  {
    group: 'Groups of friends',
    bestFits: 'Sedona, Prescott, Tucson, Cottonwood and Jerome',
    reason: 'These weekends work well with shared lodging, walkable food, scenery, and different energy levels.',
  },
  {
    group: 'Grandparents or mixed mobility',
    bestFits: 'Prescott, Cottonwood, Tucson, Williams',
    reason: 'Choose places with scenic drives, short walks, restaurants, and good fallback plans.',
  },
  {
    group: 'Summer heat escape',
    bestFits: 'Flagstaff, Payson, Show Low, Pinetop-Lakeside',
    reason: 'Higher elevation, shade, and cooler evenings make the whole weekend more forgiving.',
  },
];

const weekendFormula = [
  {
    title: 'Friday: arrive easy',
    body:
      'Do not overplan Friday. Drive, check in, eat somewhere simple, and let everyone settle before the real adventure starts.',
  },
  {
    title: 'Saturday: one strong anchor',
    body:
      'Pick one main outdoor activity or scenic stop. Put it early if it is warm, then protect the afternoon with food, shade, water, or indoor time.',
  },
  {
    title: 'Sunday: short stop, then home',
    body:
      'Choose one easy viewpoint, breakfast spot, lake walk, or visitor center. Leave before everyone is fully drained.',
  },
];

const relatedLinks = [
  ['Arizona Day Trips From Phoenix', '/arizona/day-trips-from-phoenix'],
  ['Arizona Family Adventures By Season', '/arizona/family-adventures-by-season'],
  ['Best Arizona Hikes With Kids', '/arizona/hikes-with-kids'],
  ['Payson With Kids Guide', '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim'],
  ['Flagstaff Family Escape', '/archive/flagstaff-family-escape'],
  ['Sedona Family Adventure', '/archive/sedona-family-adventure'],
  ['Grand Canyon Family Adventure', '/archive/grand-canyon-family-adventure'],
];

const ArizonaWeekendTrips: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOJsonLd
        title="Arizona Weekend Trips for Families and Friends | Sage"
        description="Find Arizona weekend trips for families, parents, and groups of friends by drive time, season, heat, scenery, food stops, cabins, easy hikes, and low-stress planning."
        url="https://sage.healthandtravels.com/arizona/weekend-trips"
        faqs={weekendTripFaqs}
      />

      <header className="border-b border-zinc-100 bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-orange-300">
              Arizona Weekend Trips
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
              Arizona weekend trips for families and friends
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              Pick the right Arizona weekend by season, drive time, group energy, food stops, shade, scenery, and one strong anchor activity. This guide is built for parents, visitors, and groups of friends who want a trip that actually works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/trip-builder"
                className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-orange-300"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                Build my weekend
              </Link>
              <Link
                to="/arizona/family-adventures-by-season"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                <Sun className="h-4 w-4" aria-hidden="true" />
                Choose by season
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-300">
              Quick Rule
            </p>
            <p className="mt-3 text-2xl font-black tracking-tight">
              One anchor, one food plan, one backup.
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              The best Arizona weekends are not packed from sunrise to bedtime. They have one memorable moment and enough room for heat, traffic, tired kids, and slow mornings.
            </p>
          </aside>
        </div>
      </header>

      <main>
        <section className="px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-600">
                Start With The Mood
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 md:text-4xl">
                Choose the weekend type first
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                Before picking a hotel or trail, decide what the group really needs. Cooler air, red rocks, a big memory, or an easy reset will point you toward the right Arizona base.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickChoices.map((choice) => {
                const Icon = choice.icon;

                return (
                  <article
                    key={choice.title}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-5"
                  >
                    <Icon className="mb-4 h-6 w-6 text-orange-600" aria-hidden="true" />
                    <h3 className="text-lg font-black tracking-tight text-zinc-950">
                      {choice.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-zinc-700">{choice.bestFor}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-500">{choice.places}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-600">
                Weekend Ideas
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 md:text-4xl">
                Best Arizona weekend trips by destination
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {tripIdeas.map((trip) => (
                <article key={trip.title} className="rounded-lg border border-zinc-100 bg-white p-5">
                  <div className="mb-4 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      <Car className="h-3 w-3" aria-hidden="true" />
                      {trip.drive}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                      <CalendarDays className="h-3 w-3" aria-hidden="true" />
                      {trip.season}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-zinc-950">{trip.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{trip.why}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {trip.anchors.map((anchor) => (
                      <span
                        key={anchor}
                        className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-bold text-zinc-600"
                      >
                        {anchor}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={trip.link}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-orange-700 transition hover:text-orange-900"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {trip.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-600">
                Group Fit
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 md:text-4xl">
                Match the trip to the people going
              </h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-100">
              {groupMatrix.map((row) => (
                <div
                  key={row.group}
                  className="grid gap-3 border-b border-zinc-100 p-4 last:border-b-0 md:grid-cols-[0.8fr_1fr_1.4fr] md:items-center"
                >
                  <p className="flex items-center gap-2 font-black text-zinc-950">
                    <Users className="h-4 w-4 text-orange-600" aria-hidden="true" />
                    {row.group}
                  </p>
                  <p className="text-sm font-bold text-zinc-700">{row.bestFits}</p>
                  <p className="text-sm leading-6 text-zinc-500">{row.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-100 bg-orange-50 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">
                Simple Formula
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 md:text-4xl">
                The low-stress weekend rhythm
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {weekendFormula.map((step) => (
                <article key={step.title} className="rounded-lg border border-orange-200 bg-white p-5">
                  <h3 className="text-lg font-black tracking-tight text-zinc-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SharePlanPanel
          title="Send an Arizona weekend plan to your group"
          description="Copy a simple message that helps everyone choose the right kind of weekend before the planning gets messy."
          quickPlanText="Arizona weekend idea: choose one main anchor activity, one easy food stop, and one backup plan. Cooler air: Flagstaff, Payson, Prescott, Show Low, or Pinetop-Lakeside. Red rocks: Sedona, Cottonwood, or Jerome. Big memory trip: Grand Canyon, Williams, or Page. Full guide: https://sage.healthandtravels.com/arizona/weekend-trips"
          voteText="Which Arizona weekend sounds best? 1. Cooler air in Flagstaff/Payson/Prescott. 2. Red rocks in Sedona/Cottonwood/Jerome. 3. Big memory trip to Grand Canyon/Page. 4. Easy low-stress weekend with food, short walks, and flexible timing."
          eventContext="arizona_weekend_trips"
        />

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-600">
                Keep Exploring
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 md:text-4xl">
                Related Arizona planning guides
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                These pages help families and groups narrow the weekend by drive time, season, safety, and ready-made itineraries.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {relatedLinks.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black uppercase tracking-wide text-zinc-800 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-800"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-600">
              FAQ
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 md:text-4xl">
              Arizona weekend trip questions
            </h2>
            <div className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-100">
              {weekendTripFaqs.map((faq) => (
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
    </div>
  );
};

export default ArizonaWeekendTrips;
