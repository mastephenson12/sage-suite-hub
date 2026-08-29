import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  CloudRain,
  Compass,
  ExternalLink,
  MapPin,
  MoonStar,
  Mountain,
  ShieldCheck,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const pageUrl = 'https://sage.healthandtravels.com/arizona/flagstaff-with-kids';

const faqs = [
  {
    question: 'Is Flagstaff a good family trip from Phoenix?',
    answer:
      'Yes. Flagstaff offers cooler high-country weather, pine forest, parks, science attractions, and flexible indoor backups. Families should allow for the elevation and check weather and road conditions before leaving.',
  },
  {
    question: 'Can we visit Flagstaff in one day?',
    answer:
      'Yes, but it is a long day from Phoenix. Choose one major activity, leave early, and keep enough energy for the drive home. One overnight creates a more comfortable forest-and-stars trip.',
  },
  {
    question: 'What can families do in Flagstaff with kids?',
    answer:
      'Flexible choices include Buffalo Park, Walnut Canyon National Monument, Lowell Observatory, a confirmed Coconino National Forest outing, downtown Flagstaff, and local museums. Verify hours, fees, weather, roads, and closures before the trip.',
  },
  {
    question: 'What risks should families consider?',
    answer:
      'Elevation, sun, dehydration, lightning, smoke, snow, ice, and forest closures can change the plan. Use current official information and choose a lower-commitment backup when conditions or family energy change.',
  },
];

const quickStats = [
  { icon: MapPin, label: 'From Phoenix', value: 'Roughly 2–2.5 hours without stops' },
  { icon: Mountain, label: 'Elevation', value: 'About 7,000 feet; start more slowly' },
  { icon: Users, label: 'Works for', value: 'Day trips, overnights, and family weekends' },
  { icon: CloudRain, label: 'Check first', value: 'Weather, roads, smoke, snow, and closures' },
];

const familyPlans = [
  {
    title: 'Simple day trip',
    bestFor: 'First visits and limited time',
    plan:
      'Leave early, choose Buffalo Park or one confirmed attraction, eat before the group is depleted, and protect enough energy for the return drive.',
    to: '/trip-builder?plan=ready&location=flagstaff&kids=yes&group=family&activity=explore&length=day&shade=true',
  },
  {
    title: 'Forest and stars',
    bestFor: 'Families staying one night',
    plan:
      'Use the morning for one short forest or park outing, rest after lunch, then choose Lowell Observatory if the schedule, weather, and group energy cooperate.',
    to: '/trip-builder?plan=ready&location=flagstaff&kids=yes&group=family&activity=explore&length=overnight&shade=true',
  },
  {
    title: 'Flexible weekend',
    bestFor: 'Mixed ages and changeable weather',
    plan:
      'Give each day one anchor. Pair an outdoor morning with a museum, visitor center, downtown break, or real downtime instead of filling every hour.',
    to: '/trip-builder?plan=ready&location=flagstaff&kids=yes&group=family&activity=explore&length=weekend&shade=true',
  },
];

const anchors = [
  {
    title: 'Buffalo Park',
    icon: Trees,
    label: 'Adjustable outdoor walk',
    text:
      'Use a time-based turnaround and enjoy open views without making the whole loop mandatory. Carry water, sun protection, and layers.',
  },
  {
    title: 'Walnut Canyon',
    icon: Mountain,
    label: 'History and canyon views',
    text:
      'The visitor center and Rim Trail offer a lower-commitment visit. The Island Trail includes substantial stairs and requires an honest family-fit decision.',
  },
  {
    title: 'Lowell Observatory',
    icon: MoonStar,
    label: 'Science and evening option',
    text:
      'Build the visit around current programs and exhibits. Telescope viewing depends on conditions, so do not make clear skies the only definition of success.',
  },
  {
    title: 'Coconino National Forest',
    icon: Compass,
    label: 'Conditions-dependent adventure',
    text:
      'Choose an exact developed site or maintained route, confirm current access, download the map, and avoid treating an unverified forest road as the plan.',
  },
];

const checks = [
  'Check the National Weather Service Flagstaff forecast before leaving.',
  'Review Arizona 511 when snow, ice, storms, construction, or heavy travel may affect roads.',
  'Confirm Coconino National Forest alerts, closures, restrictions, and exact site access.',
  'Carry water and layers even when the mountain air feels comfortable.',
  'Move away from exposed terrain when thunder or lightning changes the risk.',
  'Keep an indoor or in-town backup that still feels like a successful day.',
];

const quickPlanText = [
  'Flexible Flagstaff family plan:',
  '',
  '1. Check weather, roads, smoke, and closures',
  '2. Choose one outdoor or cultural anchor',
  '3. Carry water, layers, snacks, and necessary medicines',
  '4. Schedule food and real downtime',
  '5. Use the backup when conditions or energy change',
  '',
  'Sage rule: one anchor, one meal, one backup.',
  pageUrl,
].join('\n');

const voteText = [
  'Which Flagstaff day fits us?',
  '',
  '1. Buffalo Park and downtown food',
  '2. Walnut Canyon and an easy afternoon',
  '3. Short forest outing and picnic',
  '4. Museum or downtown plus Lowell Observatory',
  '',
  'Reply with a number and we will build around it.',
  pageUrl,
].join('\n');

export default function FlagstaffWithKids() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Flagstaff With Kids | Flexible Family Trip Planner | Sage"
        description="Build a realistic Flagstaff family trip with parks, forest, Walnut Canyon, Lowell Observatory, weather backups, elevation pacing, and prefilled Sage plans."
        url={pageUrl}
        faqs={faqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona', url: 'https://sage.healthandtravels.com/arizona' },
          { name: 'Flagstaff with kids', url: pageUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Ponderosa pine landscape representing northern Arizona high country"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/35" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-950">English</span>
            <Link
              to="/es/arizona/flagstaff-con-ninos"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950"
            >
              Español
            </Link>
          </div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Pine forest, science, and dark skies
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Flagstaff with kids—without overpacking the weekend
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
            Choose one anchor, add food and real rest, then keep a weather-ready backup for elevation,
            lightning, smoke, snow, or tired travelers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=flagstaff&kids=yes&group=family&activity=explore&length=weekend&shade=true"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-emerald-400"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Build my Flagstaff plan
            </Link>
            <a
              href="https://healthandtravels.com/flagstaff-with-kids-family-weekend-guide?utm_source=sage&utm_medium=guide&utm_campaign=flagstaff_family_planner"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Read the full family guide
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-emerald-100 bg-emerald-50/60 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-xl border border-emerald-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">Choose the rhythm</p>
        <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Three plans that fit real family energy</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {familyPlans.map((item) => (
            <Link key={item.title} to={item.to} className="group rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
              <CalendarDays className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-2 text-xs font-black uppercase tracking-wide text-emerald-700">{item.bestFor}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{item.plan}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
                Build this version <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">Pick one anchor</p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Adventure first, then food and rest</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {anchors.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-zinc-200 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">{item.label}</p>
                  <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheck className="mb-4 h-7 w-7 text-emerald-200" aria-hidden="true" />
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Conditions choose the final plan</h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Flagstaff is cooler than Phoenix, but elevation, sun, lightning, smoke, snow, ice, and closures still matter.
            </p>
          </div>
          <ul className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-100">
            {checks.map((check) => (
              <li key={check} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-200" />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Verify before driving</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Weather', 'https://www.weather.gov/fgz/', CloudRain],
            ['Roads', 'https://www.az511.com/', MapPin],
            ['Forest alerts', 'https://www.fs.usda.gov/r03/coconino/conditions', Trees],
            ['Walnut Canyon', 'https://www.nps.gov/waca/planyourvisit/basicinfo.htm', Mountain],
          ].map(([label, href, Icon]) => (
            <a key={String(label)} href={String(href)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-zinc-200 p-5 font-black transition hover:border-emerald-300 hover:bg-emerald-50">
              <span className="flex items-center gap-3">
                {React.createElement(Icon as React.ElementType, { className: 'h-5 w-5 text-emerald-700', 'aria-hidden': true })}
                {String(label)}
              </span>
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <SharePlanPanel
        title="Send a Flagstaff plan to your family"
        description="Copy the flexible plan or send a quick vote before everyone starts building a different weekend."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="flagstaff_with_kids"
      />

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">FAQ</p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Flagstaff family questions</h2>
          <div className="mt-6 divide-y divide-zinc-100 rounded-xl border border-zinc-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="p-5">
                <summary className="cursor-pointer text-lg font-black">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 bg-emerald-50 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Keep exploring</p>
            <h2 className="mt-2 text-2xl font-black">Related Arizona family plans</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/arizona/payson-rim-country-with-kids" className="rounded-full bg-emerald-800 px-5 py-3 text-sm font-black text-white">Payson &amp; the Rim</Link>
            <Link to="/arizona/sedona" className="rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-black text-emerald-900">Sedona</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
