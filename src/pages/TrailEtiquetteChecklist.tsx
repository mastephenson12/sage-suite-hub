import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';

const faqs = [
  {
    question: 'Who yields on an Arizona trail?',
    answer: 'Follow posted signs. On many shared trails, bicycles and motorized users yield to hikers and horses, while hikers yield to horses. Communicate clearly and move only to a safe, durable spot.',
  },
  {
    question: 'Should I remove graffiti from trail rocks?',
    answer: 'No. Cleaning can cause more damage. Photograph it from a safe position, record the location, and report it to the responsible land manager.',
  },
  {
    question: 'Can I leave a dog-waste bag to pick up later?',
    answer: 'No. Carry the sealed bag until you reach an appropriate trash container.',
  },
];

const checks = [
  ['Trash plan', 'One adult carries a sealable bag for wrappers, tissues, food scraps, micro-trash, and dog waste.'],
  ['Sound plan', 'Speakers stay home. Use earbuds safely and keep voices reasonable near other groups.'],
  ['Dog plan', 'Check the site’s pet rules, pack a leash and waste bags, and keep the dog close for every pass.'],
  ['Passing plan', 'Follow posted signs, communicate early, yield to horses, and give uphill hikers room when practical.'],
  ['Surface plan', 'Stay on the established route. Do not cut switchbacks, widen trails, or step on fragile desert soil.'],
  ['Leave-it plan', 'Rocks, plants, artifacts, wildlife, cairns, and signs stay exactly where they are.'],
];

export default function TrailEtiquetteChecklist() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Arizona Trail Etiquette Checklist | Sage"
        description="Use this 60-second Arizona trail-etiquette checklist for trash, dogs, music, yielding, graffiti, wildlife, and Leave No Trace family rules."
        url="https://sage.healthandtravels.com/arizona/trail-etiquette-checklist"
        faqs={faqs}
      />

      <section className="bg-gradient-to-b from-amber-950 to-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[.3em] text-orange-400">60-second family briefing</p>
          <h1 className="max-w-5xl text-4xl font-black uppercase leading-none md:text-7xl">Don’t Be That Hiker</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 md:text-xl">Take the photo. Take your trash. Control your people and pets. Leave the rocks, wildlife, quiet, and trail for everyone else.</p>
          <a href="#checklist" className="mt-8 inline-block rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-widest">Run the checklist</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <figure className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm">
          <img src="/images/arizona-trail-graffiti-etiquette.webp" width="1536" height="1152" alt="Graffiti painted on boulders beside an Arizona desert trail" className="aspect-[4/3] w-full object-cover" />
          <figcaption className="p-5 text-sm leading-7 text-zinc-600">Graffiti is not a trail souvenir. Do not add to it or try to scrub it off. Record the location and report it to the land manager. Photo by Mark Stephenson / Health &amp; Travels.</figcaption>
        </figure>
      </section>

      <section id="checklist" className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-orange-600">Before boots hit dirt</p>
          <h2 className="text-3xl font-black md:text-5xl">Six plans every group needs</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {checks.map(([title, detail], index) => (
              <div key={title} className="rounded-3xl border border-zinc-200 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-black text-orange-700">{index + 1}</div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-zinc-400">Say this to the kids</p>
          <h2 className="text-3xl font-black md:text-4xl">Look, photograph, and leave it</h2>
          <p className="mt-5 leading-8 text-zinc-700">Nothing living, natural, historic, or officially placed comes home or gets rearranged. No carving names, painting rocks, feeding wildlife, building decorative rock stacks, or moving trail markers.</p>
          <p className="mt-5 leading-8 text-zinc-700">Give children three jobs: spot safe litter, greet the people you pass, and protect living things by watching without touching. Adults handle anything sharp, contaminated, or unknown.</p>
        </div>
        <div className="rounded-3xl bg-amber-950 p-7 text-white">
          <p className="text-xs font-black uppercase tracking-[.25em] text-orange-300">One family rule</p>
          <p className="mt-5 text-2xl font-black leading-tight">Nobody should be able to tell we were here—except that we may have carried out a safe piece of litter.</p>
        </div>
      </section>

      <section className="bg-orange-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black md:text-4xl">The quick pass rule</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-orange-200 bg-white p-5"><strong className="block text-lg">Slow down</strong><p className="mt-2 text-sm leading-7 text-zinc-600">Do not force another person, child, dog, bike, or horse into a risky move.</p></div>
            <div className="rounded-2xl border border-orange-200 bg-white p-5"><strong className="block text-lg">Say hello</strong><p className="mt-2 text-sm leading-7 text-zinc-600">Communicate who will wait and where the pass can happen safely.</p></div>
            <div className="rounded-2xl border border-orange-200 bg-white p-5"><strong className="block text-lg">Protect the edge</strong><p className="mt-2 text-sm leading-7 text-zinc-600">Use a durable spot; do not trample plants or widen the trail just to be polite.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black">See damage or dangerous behavior?</h2>
        <p className="mt-5 max-w-4xl leading-8 text-zinc-700">Do not create a confrontation. From a safe distance, note the location and time and report graffiti, vandalism, or hazardous behavior to the park, forest, city, or other land manager. Call 911 for an immediate threat to life.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="https://healthandtravels.com/arizona-trail-etiquette" className="rounded-2xl bg-zinc-950 px-6 py-4 text-center text-sm font-black uppercase tracking-wider text-white">Read the complete trail guide</a>
          <Link to="/arizona/desert-hiking-safety" className="rounded-2xl border border-zinc-900 px-6 py-4 text-center text-sm font-black uppercase tracking-wider">Desert hiking safety</Link>
          <Link to="/trip-builder" className="rounded-2xl border border-zinc-900 px-6 py-4 text-center text-sm font-black uppercase tracking-wider">Build the trip</Link>
        </div>
      </section>
    </main>
  );
}
