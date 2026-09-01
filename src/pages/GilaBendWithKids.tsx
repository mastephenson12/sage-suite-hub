import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Clock, Compass, MapPin, ShieldCheck, Sun, Users } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const faqs = [
  {
    question: 'Is Gila Bend good for a family weekend?',
    answer: 'Gila Bend works well as a simple cooler-season road trip built around Painted Rock Petroglyph Site, desert scenery, and relaxed family time. It is better as a one-night discovery trip than an attraction-packed weekend.',
  },
  {
    question: 'When should families visit Gila Bend?',
    answer: 'Plan for comfortable cooler-season weather and check the exact forecast before leaving. Exposed desert activities should be postponed during dangerous heat, flooding, severe storms, or poor air quality.',
  },
  {
    question: 'Is Painted Rock Petroglyph Site good for children?',
    answer: 'Yes. The Bureau of Land Management highlights interpretive trails and panels for families. Children should stay on established paths and never touch, trace, climb on, or mark rock art.',
  },
];

const modes = [
  {
    title: 'One-night family reset',
    bestFor: 'Young kids, first visits, simple pacing',
    plan: 'Arrive with daylight left, eat and settle in, then visit Painted Rock early the next morning before returning home.',
    to: '/trip-builder?plan=ready&location=gila-bend&kids=yes&group=family&activity=explore&length=weekend&season=winter&ages=mixed&shade=false&bathrooms=true&stroller=false&drive=120',
  },
  {
    title: 'Painted Rock day trip',
    bestFor: 'School-age explorers and cooler weather',
    plan: 'Make the cultural site the only major outdoor anchor, add a meal in town, and preserve time for the drive home.',
    to: '/trip-builder?plan=ready&location=gila-bend&kids=yes&group=family&activity=explore&length=full-day&season=winter&ages=older-kids&shade=false&bathrooms=true&stroller=false&drive=120',
  },
  {
    title: 'Gateway to Ajo and Organ Pipe',
    bestFor: 'Two-night trips and families comfortable with longer drives',
    plan: 'Use Gila Bend as the turn south, but give Organ Pipe its own day. Do not stack a full park visit behind Painted Rock.',
    to: '/trip-builder?plan=ready&location=gila-bend&kids=yes&group=family&activity=road-trip&length=weekend&season=winter&ages=mixed&shade=false&bathrooms=true&stroller=false&drive=240',
  },
];

const rules = [
  'Visit only when the forecast supports comfortable desert exploration.',
  'Carry water for everyone plus a separate emergency reserve in the vehicle.',
  'Fuel before leaving town and download directions for offline use.',
  'At Painted Rock: look, learn, photograph, and leave every surface untouched.',
  'Make one outdoor site the win; do not turn the weekend into a mileage contest.',
  'Verify current roads, site conditions, fees, facilities, and business hours.',
];

const planText = [
  'Gila Bend family plan:',
  '',
  'Day 1: arrive with daylight left, eat, settle in, and prepare water and offline directions.',
  'Day 2: visit Painted Rock Petroglyph Site early, keep the cultural stop respectful and unhurried, then return to town for food before driving home.',
  '',
  'Rules: cooler weather only; one main outdoor anchor; extra water and fuel; never touch or climb on rock art.',
  'Planner: https://sage.healthandtravels.com/arizona/gila-bend-with-kids',
].join('\n');

const voteText = [
  'Which Gila Bend family plan should we choose?',
  '',
  '1. One-night family reset',
  '2. Painted Rock day trip',
  '3. Two-night gateway to Ajo and Organ Pipe',
  '',
  'Planner: https://sage.healthandtravels.com/arizona/gila-bend-with-kids',
].join('\n');

export default function GilaBendWithKids() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Gila Bend With Kids | Family Weekend Planner | Sage"
        description="Plan Gila Bend with kids: Painted Rock Petroglyph Site, cooler-season timing, respectful desert exploration, realistic family pacing, and a ready-made trip plan."
        url="https://sage.healthandtravels.com/arizona/gila-bend-with-kids"
        faqs={faqs}
      />

      <section className="bg-amber-950 px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-amber-300">Southwest Arizona Family Planner</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Gila Bend with kids</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-amber-50/80 md:text-xl">Build a small-town desert road trip around Painted Rock, cooler weather, one good meal, and enough empty space for the family to actually enjoy being together.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={modes[0].to} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-4 text-sm font-black uppercase tracking-widest text-amber-950 transition hover:bg-white"><Compass className="h-4 w-4" /> Build My Plan</Link>
            <a href="https://healthandtravels.com/gila-bend-family-weekend-guide?utm_source=sage&amp;utm_medium=planner&amp;utm_campaign=gila_bend_with_kids" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-amber-950">Read the Full Guide <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section className="px-6 py-14"><div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [Car, 'Trip shape', 'Day trip or one night'],
          [Clock, 'Best pace', 'One outdoor anchor'],
          [Users, 'Best for', 'Curious families'],
          [Sun, 'Non-negotiable', 'Comfortable weather'],
        ].map(([Icon, label, value]) => {
          const StatIcon = Icon as React.ComponentType<{ className?: string }>;
          return <div key={label as string} className="rounded-2xl border border-zinc-200 p-5"><StatIcon className="h-5 w-5 text-amber-700" /><p className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">{label as string}</p><p className="mt-1 font-black">{value as string}</p></div>;
        })}
      </div></section>

      <section className="bg-zinc-50 px-6 py-16"><div className="mx-auto max-w-6xl">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-700">Choose Your Version</p>
        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl">Match the trip to your real energy</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">{modes.map(mode => <article key={mode.title} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-black">{mode.title}</h3><p className="mt-2 text-xs font-black uppercase tracking-widest text-amber-700">Best for: {mode.bestFor}</p><p className="mt-4 flex-1 leading-7 text-zinc-600">{mode.plan}</p><Link to={mode.to} className="mt-6 inline-flex items-center gap-2 font-black text-amber-800">Use this plan <ArrowRight className="h-4 w-4" /></Link></article>)}</div>
      </div></section>

      <section className="px-6 py-16"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-700">The Main Experience</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight">Painted Rock: observation, not interaction</h2>
          <p className="mt-5 leading-8 text-zinc-600">The BLM identifies Painted Rock as a historic and cultural site with interpretive features, day use, photography, hiking, wildlife viewing, and camping. Give children a mission: find shapes, notice desert life, ask questions, and protect the place by leaving it exactly as they found it.</p>
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-amber-800" /><h3 className="text-lg font-black">Family protection promise</h3></div><p className="mt-3 leading-7 text-zinc-700">Stay on established routes. Never touch, trace, chalk, wet, climb on, or add marks to petroglyphs. Parents set the tone before anyone leaves the vehicle.</p></div>
        </div>
        <aside className="rounded-2xl bg-zinc-950 p-7 text-white"><h2 className="text-2xl font-black">Six rules for the weekend</h2><ul className="mt-5 space-y-4">{rules.map(rule => <li key={rule} className="flex gap-3 text-sm leading-6 text-zinc-300"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />{rule}</li>)}</ul></aside>
      </div></section>

      <section className="bg-amber-950 px-6 py-16 text-white"><div className="mx-auto max-w-4xl text-center">
        <MapPin className="mx-auto h-8 w-8 text-amber-300" />
        <h2 className="mt-4 text-3xl font-black uppercase tracking-tight">Want the deeper story and safety details?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-amber-50/75">Health &amp; Travels has the complete weekend itinerary, cultural-site guidance, official verification links, packing notes, and parent-first safety rules.</p>
        <a href="https://healthandtravels.com/gila-bend-family-weekend-guide?utm_source=sage&amp;utm_medium=planner&amp;utm_campaign=gila_bend_with_kids" className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-4 text-sm font-black uppercase tracking-widest text-amber-950">Open the Full Guide <ArrowRight className="h-4 w-4" /></a>
      </div></section>

      <section className="px-6 py-16"><div className="mx-auto max-w-5xl"><SharePlanPanel title="Share the Gila Bend plan" description="Copy the ready-made itinerary, send a three-option family vote, or share the planner link." quickPlanText={planText} voteText={voteText} eventContext="gila_bend_with_kids" /></div></section>

      <section className="bg-zinc-50 px-6 py-16"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black uppercase tracking-tight">Frequently asked questions</h2><div className="mt-8 space-y-5">{faqs.map(faq => <article key={faq.question} className="rounded-2xl border border-zinc-200 bg-white p-6"><h3 className="font-black">{faq.question}</h3><p className="mt-3 leading-7 text-zinc-600">{faq.answer}</p></article>)}</div></div></section>
    </main>
  );
}
