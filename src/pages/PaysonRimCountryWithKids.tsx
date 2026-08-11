import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Camera,
  Car,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  Mountain,
  Share2,
  ShieldCheck,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';
import CloudinaryImage from '../components/CloudinaryImage';

const paysonFaqs = [
  {
    question: 'Is Payson good for a family trip from Phoenix?',
    answer:
      'Yes. Payson and Rim Country are strong family choices from Phoenix because the drive is manageable, the elevation is cooler, and families can build plans around lakes, pine forest, picnic areas, viewpoints, and short outdoor stops.',
  },
  {
    question: 'What should families do in Payson with kids?',
    answer:
      'Good Payson family ideas include Woods Canyon Lake, Green Valley Park, Water Wheel area, Mogollon Rim viewpoints, short forest walks, picnic stops, and simple cabin or hotel downtime.',
  },
  {
    question: 'Is Payson cooler than Phoenix in summer?',
    answer:
      'Payson and the Mogollon Rim are usually cooler than Phoenix because of higher elevation, but families should still check the forecast, watch for monsoon storms, bring water, and avoid exposed midday plans.',
  },
  {
    question: 'Can Payson work as a day trip or weekend trip?',
    answer:
      'Payson can work as either. A day trip is best with one outdoor anchor and one food or park stop. A weekend gives families more room for Woods Canyon Lake, rim views, slow mornings, and flexible weather backups.',
  },
];

const quickStats = [
  { icon: Car, label: 'Drive from Phoenix', value: 'About 1.5 to 2 hours' },
  { icon: Trees, label: 'Best feel', value: 'Pines, lake air, rim views' },
  { icon: Users, label: 'Best for', value: 'Families, friend groups, heat escapes' },
  { icon: CloudSun, label: 'Watch for', value: 'Monsoon storms and road timing' },
];

const tripModes = [
  {
    title: 'Easy Payson day trip',
    bestFor: 'Young kids, first visit, lighter schedule',
    plan:
      'Pick one anchor like Green Valley Park, Water Wheel area, or a short forest stop. Add lunch, a snack reset, and leave before everyone is exhausted.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=relax&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120',
  },
  {
    title: 'Woods Canyon Lake weekend',
    bestFor: 'Summer shade, water views, slower family rhythm',
    plan:
      'Use Payson as the base, then spend the strongest outdoor window around Woods Canyon Lake or the Rim. Keep afternoons flexible for storms, naps, food, or cabin time.',
    to: '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim',
  },
  {
    title: 'Friend group mountain reset',
    bestFor: 'Groups who want scenery without a complicated hike',
    plan:
      'Build around one rim viewpoint, one easy walk or lake stop, and a shared meal. Let the trip feel like a reset instead of a checklist.',
    to: '/trip-builder?plan=ready&location=payson&kids=no&group=friends&activity=relax&length=weekend&season=summer&ages=adults&shade=true&bathrooms=true&stroller=false&drive=120',
  },
];

const anchorStops = [
  {
    title: 'Woods Canyon Lake',
    icon: Droplets,
    text:
      'Best for lake views, pine forest, picnic energy, and a cooler-feeling summer anchor. Go early on busy weekends and keep weather flexible.',
  },
  {
    title: 'Mogollon Rim viewpoints',
    icon: Mountain,
    text:
      'Best for big scenery with less hiking pressure. Use it as the memory moment, then keep the rest of the day simple.',
  },
  {
    title: 'Green Valley Park',
    icon: Trees,
    text:
      'Best for an easy in-town reset with water views, walking space, bathrooms nearby, and low-stress pacing for younger kids.',
  },
  {
    title: 'Water Wheel area',
    icon: Compass,
    text:
      'Best for a more adventurous creek-area feel. Check conditions, parking, footing, and water safety before making it the main plan.',
  },
];

const photoChecklist = [
  'Hero photo: lake, pine forest, or rim view that immediately says cooler Arizona.',
  'Family context: kids walking, picnic setup, trailhead, or scenic overlook.',
  'Wayfinding: signs for Woods Canyon Lake, Rim Road, Payson, or trail/park names.',
  'Texture shots: pine trees, water, clouds, rocks, cabins, or camp-style details.',
  'Safety context: storm clouds, shade, water bottles, trail footing, or parking realities.',
];

const relatedLinks = [
  ['Payson destination guide', '/arizona/payson'],
  ['Payson Woods Canyon Lake itinerary', '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim'],
  ['Arizona weekend trips', '/arizona/weekend-trips'],
  ['Arizona day trips from Phoenix', '/arizona/day-trips-from-phoenix'],
  ['Arizona family adventures by season', '/arizona/family-adventures-by-season'],
  ['Best Arizona hikes with kids', '/arizona/hikes-with-kids'],
];

const quickPlanText = [
  'Payson / Rim Country family plan idea:',
  'Drive from Phoenix to Payson or the Mogollon Rim, choose one outdoor anchor, and keep the rest flexible.',
  '',
  'Best anchors:',
  '- Woods Canyon Lake for water views and pines',
  '- Mogollon Rim viewpoints for the big scenery moment',
  '- Green Valley Park for an easy kid-friendly reset',
  '- Water Wheel area if conditions and footing are safe',
  '',
  'Simple rule: one main outdoor stop, one food or picnic plan, one backup for storms or tired kids.',
  'Guide: https://sage.healthandtravels.com/arizona/payson-rim-country-with-kids',
].join('\n');

const voteText = [
  'Which Payson / Rim Country plan should we do?',
  '',
  '1. Easy Payson day trip with park, food, and a short outdoor stop',
  '2. Woods Canyon Lake and Mogollon Rim weekend',
  '3. Friend group mountain reset with one viewpoint and one meal',
  '',
  'Reply 1, 2, or 3 and I will build the plan.',
  'Guide: https://sage.healthandtravels.com/arizona/payson-rim-country-with-kids',
].join('\n');

const PaysonRimCountryWithKids: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Payson and Rim Country With Kids | Arizona Family Guide | Sage"
        description="Plan Payson and Rim Country with kids from Phoenix: Woods Canyon Lake, Mogollon Rim views, picnic stops, weather backups, easy family pacing, and summer heat escape ideas."
        url="https://sage.healthandtravels.com/arizona/payson-rim-country-with-kids"
        faqs={paysonFaqs}
      />

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-45">
          <CloudinaryImage
            src="/images/payson-lake-through-pines.avif"
            alt="Woods Canyon Lake seen through pine trees near Payson, Arizona"
            className="h-full w-full object-cover"
            widthHint={1600}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/55" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-emerald-300">
              Payson / Rim Country Family Guide
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
              Payson and Rim Country with kids
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              A practical Arizona mountain reset for families and friend groups leaving Phoenix: pine forest, lake stops, rim views, simple food plans, and enough flexibility for heat, storms, and tired kids.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=weekend&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=false&drive=120"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-emerald-300"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                Build a Payson plan
              </Link>
              <Link
                to="/archive/payson-with-kids-woods-canyon-lake-mogollon-rim"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Open itinerary
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300">
              Gut Check
            </p>
            <p className="mt-3 text-2xl font-black tracking-tight">
              Payson works best when you do less, earlier.
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Choose one outdoor anchor, add one food or picnic plan, then keep a storm and tired-kid backup ready. That is the whole playbook.
            </p>
          </aside>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Woods Canyon in Real Life
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Pines, trail signs, and the Rim
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              These local photos show the landscape and wayfinding families can expect around Woods Canyon Lake and Rim Country.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <figure className="overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm">
              <CloudinaryImage
                src="/images/payson-woods-trail.avif"
                alt="Pine forest trail near Woods Canyon Lake in Arizona Rim Country"
                className="aspect-[4/3] w-full object-cover"
                widthHint={640}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <figcaption className="p-4 text-sm leading-6 text-zinc-600">
                Forest paths make the area feel cooler, but families should still watch footing and afternoon weather.
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm">
              <CloudinaryImage
                src="/images/payson-woods-canyon-road-sign.avif"
                alt="Woods Canyon Lake road sign among pine trees near Payson"
                className="aspect-[4/3] w-full object-cover"
                widthHint={640}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <figcaption className="p-4 text-sm leading-6 text-zinc-600">
                Watch for Woods Canyon Lake signs as you leave Payson and climb toward the Mogollon Rim.
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm">
              <CloudinaryImage
                src="/images/payson-family-rim-view.avif"
                alt="Wide Mogollon Rim view framed by pine trees near Payson, Arizona"
                className="aspect-[4/3] w-full object-cover"
                widthHint={640}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <figcaption className="p-4 text-sm leading-6 text-zinc-600">
                A Rim overlook can deliver the big scenery moment without adding another long hike.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-zinc-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-lg border border-zinc-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-emerald-600" aria-hidden="true" />
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
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Choose Your Version
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Day trip, weekend, or group reset
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              Payson can be a quick escape or a whole weekend. The best version depends on how much drive time, water time, and downtime your group can handle.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {tripModes.map((mode) => (
              <Link
                key={mode.title}
                to={mode.to}
                className="flex h-full flex-col rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <h3 className="text-xl font-black tracking-tight text-zinc-950">{mode.title}</h3>
                <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs font-black uppercase tracking-wide text-emerald-800">
                  {mode.bestFor}
                </p>
                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{mode.plan}</p>
                <span className="mt-5 inline-flex text-xs font-black uppercase tracking-widest text-emerald-700">
                  Build this version
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-emerald-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Anchor Stops
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              The places to build around first
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {anchorStops.map((stop) => {
              const Icon = stop.icon;
              return (
                <article key={stop.title} className="rounded-lg border border-emerald-100 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950">{stop.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{stop.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Real Photo Plan
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              What photos make this guide stronger
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Your real Payson photos are exactly the right direction. This page is built so we can keep swapping in better local images over time without rewriting the guide.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-5">
            <Camera className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
            <ul className="space-y-3">
              {photoChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-700">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
                Safety Rhythm
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
                The Rim is cooler, not consequence-free
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-lg border border-white/10 bg-white/5 p-5">
                <CalendarDays className="mb-4 h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="font-black">Start earlier than you think</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  Parking, crowds, afternoon storms, and kid energy all get easier when the main outdoor piece happens before the day gets heavy.
                </p>
              </article>
              <article className="rounded-lg border border-white/10 bg-white/5 p-5">
                <Share2 className="mb-4 h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="font-black">Tell the group the backup</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  A cafe, park, scenic drive, or cabin reset keeps the day from feeling ruined when weather or energy changes.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Send a Payson plan to your family or group"
        description="Copy a simple Payson / Rim Country plan or send a quick vote before everyone starts suggesting five different weekends."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="payson_rim_country_with_kids"
      />

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Keep Exploring
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Related Payson and Arizona guides
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedLinks.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black uppercase tracking-wide text-zinc-800 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            FAQ
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Payson family trip questions
          </h2>
          <div className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-100">
            {paysonFaqs.map((faq) => (
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

export default PaysonRimCountryWithKids;
