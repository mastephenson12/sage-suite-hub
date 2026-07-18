import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  Clock3,
  CloudSun,
  Compass,
  Droplets,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

const situationFaqs = [
  {
    question: 'How do I choose the best Arizona family trip for my situation?',
    answer:
      'Start with your real constraint: heat, kid ages, drive time, bathrooms, shade, visitors, or weekend length. Then choose one outdoor anchor, one food stop, and one backup plan.',
  },
  {
    question: 'What should families do in Arizona when it is too hot?',
    answer:
      'On very hot days, avoid exposed midday trails. Use early outdoor stops, indoor museums, splash pads, pools, shaded parks, lakes, or higher-elevation places like Payson, Prescott, and Flagstaff.',
  },
  {
    question: 'What Arizona trips work well with toddlers?',
    answer:
      'Toddlers usually do best with short walks, bathrooms nearby, shade, snacks, stroller-friendly or easy-exit paths, and no overloaded schedule.',
  },
  {
    question: 'Can Sage help groups of friends plan Arizona trips?',
    answer:
      'Yes. Sage can help friend groups compare drive time, scenery, food stops, lodging, heat, and flexible activity options so the plan works for different energy levels.',
  },
];

type SituationCard = {
  title: string;
  description: string;
  bestFor: string;
  to: string;
  cta: string;
  icon: LucideIcon;
  color: string;
};

const situations: SituationCard[] = [
  {
    title: 'I have toddlers or little kids',
    description:
      'Use short walks, bathrooms, shade, snacks, and fast exits. Keep the plan simple enough that nobody has to prove anything.',
    bestFor: 'Ages 2-6, grandparents, stroller questions',
    to: '/trip-builder?plan=ready&location=arizona&kids=yes&ages=toddlers&bathrooms=true&shade=true&stroller=true&pace=easy',
    cta: 'Build toddler plan',
    icon: Baby,
    color: 'bg-rose-50 text-rose-700 border-rose-100',
  },
  {
    title: 'It is too hot in Phoenix',
    description:
      'Shift the day toward early starts, indoor anchors, pools, splash pads, lakes, shade, or higher elevation escapes.',
    bestFor: 'Summer, high UV, afternoon backups',
    to: '/arizona/cool-summer-trips-with-kids',
    cta: 'Find cooler trips',
    icon: Sun,
    color: 'bg-orange-50 text-orange-700 border-orange-100',
  },
  {
    title: 'We have visitors in town',
    description:
      'Choose memorable views without punishing logistics: overlooks, easy walks, food stops, and a backup if energy drops.',
    bestFor: 'Out-of-town guests, grandparents, mixed ages',
    to: '/arizona/day-trips-from-phoenix',
    cta: 'See visitor day trips',
    icon: Users,
    color: 'bg-sky-50 text-sky-700 border-sky-100',
  },
  {
    title: 'We only have half a day',
    description:
      'Stay close, pick one anchor, and avoid stacking too many stops. A good half-day trip should still feel finished.',
    bestFor: 'Busy weekends, school days, quick wins',
    to: '/trip-builder?plan=ready&location=phoenix&length=half-day&kids=yes&drive=45&pace=easy&food=nearby',
    cta: 'Build half-day plan',
    icon: Clock3,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    title: 'We want a weekend trip',
    description:
      'Compare cooler air, red rocks, cabin towns, food stops, and drive time before you choose where to sleep.',
    bestFor: 'Families, couples, friend groups',
    to: '/arizona/weekend-trips',
    cta: 'Compare weekends',
    icon: CalendarDays,
    color: 'bg-violet-50 text-violet-700 border-violet-100',
  },
  {
    title: 'We need bathrooms, shade, and food nearby',
    description:
      'Prioritize places where logistics are part of the plan, not a desperate search after everyone is already tired.',
    bestFor: 'Younger kids, visitors, cautious planners',
    to: '/trip-builder?plan=ready&location=arizona&kids=yes&bathrooms=true&shade=true&food=nearby&pace=low-stress',
    cta: 'Plan around logistics',
    icon: ShieldCheck,
    color: 'bg-teal-50 text-teal-700 border-teal-100',
  },
  {
    title: 'We want water or pine trees',
    description:
      'Look toward Payson, the Mogollon Rim, Flagstaff, Prescott, lakes, creeks, and higher-elevation resets.',
    bestFor: 'Heat escapes, summer breaks, nature resets',
    to: '/arizona/payson-rim-country-with-kids',
    cta: 'Open Rim Country',
    icon: Trees,
    color: 'bg-lime-50 text-lime-700 border-lime-100',
  },
  {
    title: 'We are a group of friends',
    description:
      'Balance photo-worthy scenery, food, flexible stops, and lodging so different energy levels can still enjoy the same trip.',
    bestFor: 'Friend groups, birthdays, casual road trips',
    to: '/arizona/adventure-finder',
    cta: 'Use Adventure Finder',
    icon: Sparkles,
    color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
  },
];

const fastAnswers = [
  {
    question: 'Best first choice for summer?',
    answer: 'Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside, or a water/shade plan.',
    to: '/arizona/cool-summer-trips-with-kids',
    icon: CloudSun,
  },
  {
    question: 'Best first choice for easy hikes?',
    answer: 'Start with the kids hikes guide, then filter by bathrooms, shade, distance, and drive time.',
    to: '/arizona/hikes-with-kids',
    icon: MapPin,
  },
  {
    question: 'Best first choice from Phoenix?',
    answer: 'Use drive time first: under 45 minutes, 1-2 hours, or a full weekend range.',
    to: '/arizona/day-trips-from-phoenix',
    icon: Car,
  },
  {
    question: 'Best first choice in Spanish?',
    answer: 'Use the Spanish Arizona hub for family trip planning, heat, and kid-friendly ideas.',
    to: '/es/arizona',
    icon: Languages,
  },
];

const SituationTile: React.FC<SituationCard> = ({
  title,
  description,
  bestFor,
  to,
  cta,
  icon: Icon,
  color,
}) => (
  <Link
    to={to}
    className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
  >
    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${color}`}>
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400">
      {bestFor}
    </p>
    <h2 className="text-xl font-black tracking-tight text-zinc-950">{title}</h2>
    <p className="mt-3 flex-grow text-sm leading-7 text-zinc-600">{description}</p>
    <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-700">
      {cta} <Compass className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </span>
  </Link>
);

export default function ArizonaPlanBySituation() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Plan Arizona Family Trips by Situation | Sage"
        description="Choose the right Arizona family trip by situation: toddlers, extreme heat, visitors, half-day plans, weekend trips, bathrooms, shade, water, and friend groups."
        url="https://sage.healthandtravels.com/arizona/plan-by-situation"
        faqs={situationFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona Guides', url: 'https://sage.healthandtravels.com/arizona' },
          {
            name: 'Plan by Situation',
            url: 'https://sage.healthandtravels.com/arizona/plan-by-situation',
          },
        ]}
      />

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-45">
          <img
            src="/images/payson-family-pine-forest.avif"
            alt="Family exploring pine forest in Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300">
            Arizona trip shortcut
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Plan by situation, not by guesswork
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-100 md:text-xl">
            Start with what is actually shaping your day: toddlers, heat, visitors,
            bathrooms, shade, a half-day window, or a group that needs options.
            Sage points you to the guide or planner path that fits first.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&pace=low-stress"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-emerald-200"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Build my plan
            </Link>
            <Link
              to="/arizona/adventure-finder"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Compare options
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {fastAnswers.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.question}
                to={item.to}
                className="rounded-xl border border-emerald-100 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-sm"
              >
                <Icon className="mb-4 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h2 className="text-sm font-black tracking-tight text-zinc-950">{item.question}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.answer}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Choose your real constraint
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            What kind of Arizona day are you trying to save?
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Pick the card that sounds most like your group. Each one opens the
            guide or pre-filled planner path that should help fastest.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {situations.map((situation) => (
            <SituationTile key={situation.title} {...situation} />
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-600">
                Simple rule
              </p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Build the day around one anchor
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-600">
                The easiest Arizona plans usually have one main outdoor stop, one
                food or rest stop, and one backup. That gives families and groups
                room to enjoy the place instead of sprinting through a checklist.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: '1 outdoor anchor', text: 'Trail, lake, overlook, creek, park, or museum garden.', icon: MapPin },
                { title: '1 reset stop', text: 'Food, bathrooms, shade, picnic, coffee, or hotel break.', icon: Droplets },
                { title: '1 backup', text: 'Indoor option, shorter route, pool time, or scenic drive.', icon: ShieldCheck },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="rounded-2xl border border-zinc-200 bg-white p-5">
                    <Icon className="mb-4 h-5 w-5 text-emerald-700" aria-hidden="true" />
                    <h3 className="font-black tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-3xl font-black tracking-tight">Common planning questions</h2>
        <div className="mt-7 space-y-4">
          {situationFaqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-zinc-100 p-6">
              <h3 className="text-lg font-black">{faq.question}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
