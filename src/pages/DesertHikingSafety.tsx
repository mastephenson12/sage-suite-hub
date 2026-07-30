import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';

const safetyFaqs = [
  {
    question: 'How much water should I bring for an Arizona desert hike?',
    answer:
      'For warm desert hiking, plan around 1 liter of water per adult per hour, then add emergency backup water. Turn around when half your water is gone.',
  },
  {
    question: 'What are common signs of heat exhaustion while hiking?',
    answer:
      'Warning signs can include headache, nausea, dizziness, weakness, thirst, heavy sweating, elevated body temperature, and decreased urine output.',
  },
  {
    question: 'When should hikers call 911 for heat illness?',
    answer:
      'Call 911 right away for confusion, slurred speech, fainting, seizures, very high body temperature, or any severe or worsening heat-related symptoms.',
  },
  {
    question: 'What should families pack for a desert hike in Arizona?',
    answer:
      'Bring water, electrolytes or salty snacks, sun protection, offline maps, a charged phone, first-aid basics, a headlamp, and extra supplies for kids.',
  },
];

const gearItems = [
  '2–3 liters of water per adult for short-to-moderate warm hikes, more for longer or hotter routes.',
  'Extra emergency water in the car and a clear turnaround rule when half the water is gone.',
  'Electrolytes, salty snacks, and easy kid snacks that can handle desert heat.',
  'Wide-brim hat, sunglasses, sunscreen, and lightweight long sleeves.',
  'Real hiking shoes or trail runners with grip.',
  'Offline map, charged phone, small power bank, and the route saved before leaving cell service.',
  'First-aid basics, whistle, headlamp, tweezers or comb for cactus spines, and a bandana or cooling towel.',
  'Medical info, ID, and a plan shared with someone who is not on the hike.',
];

const familyRules = [
  'The slowest person sets the pace.',
  'Start early and aim to finish before the worst heat of the day.',
  'Stop every 15–20 minutes for water, snacks, and a quick kid check.',
  'No climbing near cliff edges, wash drop-offs, or slick rock ledges.',
  'No touching cactus and no chasing wildlife.',
  'Turn around early if the trail feels hotter, harder, or longer than expected.',
];

function SafetyCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-2xl font-black tracking-tight text-zinc-950">{title}</h3>
      <div className="space-y-4 text-base leading-8 text-zinc-700">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-zinc-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DesertHikingSafety() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Arizona Desert Hiking Safety Guide | Hydration, Heat & Gear"
        description="Learn how to hike Arizona deserts safely with hydration math, heat exhaustion and heat stroke signs, smart timing, essential gear, and family-friendly safety tips."
        url="https://sage.healthandtravels.com/arizona/desert-hiking-safety"
        faqs={safetyFaqs}
      />

      <section className="bg-gradient-to-b from-orange-50 to-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-orange-600">
            Arizona Safety Guide
          </p>
          <h1 className="mb-6 max-w-4xl text-4xl font-black tracking-tight text-zinc-950 md:text-6xl">
            Arizona Desert Hiking Safety Guide
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-8 text-zinc-700 md:text-xl">
            Arizona trails can be beautiful, peaceful, and extremely unforgiving if
            heat, water, timing, and terrain are ignored. Use this guide to plan
            hydration, recognize heat illness warning signs, pack smarter gear, and
            keep family hikes safer.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Build a Safer Trip
            </Link>
            <Link
              to="/arizona"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-7 py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Browse Arizona Guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Start Here
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Why Arizona desert hiking is different
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-600">
            In the desert, a short trail can feel easy at the car and much harder
            an hour later. Heat, dry air, steep return climbs, limited shade,
            cactus, loose rock, and cliff edges can stack up quickly. The safest
            plan is simple: start early, bring more water than you think, take shade
            breaks, watch your group, and turn around before the hike becomes risky.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SafetyCard title="Hydration math for Arizona hikes">
            <p>
              Use this simple planning rule for family desert hikes. This is a
              practical starting point, not medical advice.
            </p>
            <div className="rounded-2xl bg-zinc-50 p-5 text-sm leading-7">
              <p><strong>Cool weather or easy hike:</strong> about 0.5 liter per adult per hour.</p>
              <p><strong>Hot Arizona desert hike:</strong> about 1 liter per adult per hour.</p>
              <p><strong>Kids:</strong> frequent sips every 10–15 minutes, with adults carrying backup water.</p>
              <p><strong>Emergency buffer:</strong> add at least 1 extra liter per person.</p>
            </div>
            <p>
              A simple rule: turn around when half your water is gone. Do not count
              on trail water unless an official source says it is available and safe.
            </p>
          </SafetyCard>

          <SafetyCard title="Example: 2 adults and 2 kids">
            <p>
              For a warm 2-hour desert hike, a safer family starting point is about
              8–10 liters total.
            </p>
            <div className="rounded-2xl bg-orange-50 p-5 text-sm leading-7 text-orange-950">
              <p><strong>Adults:</strong> 4 liters total.</p>
              <p><strong>Kids:</strong> 2 liters total minimum.</p>
              <p><strong>Backup:</strong> 2–4 extra liters split between packs and the car.</p>
            </div>
          </SafetyCard>

          <SafetyCard title="Heat exhaustion warning signs">
            <p>
              Watch for headache, nausea, dizziness, weakness, irritability, thirst,
              heavy sweating, elevated body temperature, and decreased urine output.
            </p>
            <p>
              Stop hiking, move to shade or a cooler area, rest, sip water if the
              person is alert and able to drink, and seek medical help if symptoms
              are severe, worsening, or not improving.
            </p>
          </SafetyCard>

          <SafetyCard title="Heat stroke warning signs">
            <p>
              Heat stroke can be life-threatening. Call 911 right away for confusion,
              slurred speech, fainting, seizures, very high body temperature, or any
              severe heat-related symptoms.
            </p>
            <p>
              While waiting for help, move the person out of the heat and follow
              emergency dispatcher instructions.
            </p>
          </SafetyCard>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Essential Gear
            </p>
            <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
              Pack for heat, sun, and slow humans
            </h2>
            <p className="text-base leading-8 text-zinc-600">
              Gear does not make you invincible. It gives you more margin when the
              trail is hotter, longer, windier, or weirder than expected. Arizona is
              beautiful, but it is not impressed by confidence.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <BulletList items={gearItems} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <SafetyCard title="When not to hike">
            <p>
              Avoid desert hiking when there is an excessive heat warning, the route
              is exposed, you cannot start early, you do not have enough water, or
              anyone already feels sick, dizzy, or overheated.
            </p>
            <p>
              The bravest Arizona hiking decision is often turning around early.
              Nobody gets a medal, but everyone gets home. Very annoying. Very useful.
            </p>
          </SafetyCard>

          <SafetyCard title="Best time of day">
            <p>
              In warm months, aim for sunrise starts and finish before late morning.
              During cooler months, you may have more flexibility, but sun exposure,
              elevation, and trail difficulty still matter.
            </p>
            <p>
              Shade breaks count as part of the plan. So does quitting when the day
              gets hotter than expected.
            </p>
          </SafetyCard>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Family Rules
          </p>
          <h2 className="mb-8 text-3xl font-black tracking-tight md:text-4xl">
            Simple rules for hiking Arizona with kids
          </h2>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <BulletList items={familyRules} />
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-sm md:p-12">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Plan Before You Go
          </p>
          <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
            Build a safer Arizona hike with Sage
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-zinc-600">
            Use Sage to choose a destination, build a simple family trip plan, and
            think through timing, food, water, lodging, and safety before you go.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/trip-builder"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Build a Safer Trip
            </Link>
            <Link
              to="/arizona"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-7 py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Explore Arizona Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
