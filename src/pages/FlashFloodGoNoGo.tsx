import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';

const faqs = [
  { question: 'Is it safe to cross shallow moving water?', answer: 'No. Six inches of fast-moving water can knock over an adult, and floodwater can hide holes, unstable footing, and debris. Turn around rather than entering it.' },
  { question: 'Can a flash flood happen under clear skies?', answer: 'Yes. Rain upstream can send water through a dry wash, creek, or canyon even when the storm is not visible overhead.' },
  { question: 'What should I do during a Flash Flood Warning?', answer: 'Move immediately to higher ground if you are near a wash, creek, canyon, drainage, or low-water crossing, and follow emergency instructions.' },
];

function Decision({ className, title, children }: { className: string; title: string; children: React.ReactNode }) {
  return <div className={`rounded-3xl border-2 p-6 ${className}`}><h3 className="mb-3 text-xl font-black">{title}</h3><div className="space-y-3 text-sm leading-7">{children}</div></div>;
}

export default function FlashFloodGoNoGo() {
  const signs = [
    'Water rises, accelerates, or changes from clear to muddy.',
    'You hear roaring water, moving rocks, breaking branches, or an unfamiliar rumble.',
    'Foam, sticks, mud, rocks, or vegetation begin moving downstream.',
    'Thunder, rain shafts, or dark clouds appear upstream or over higher ground.',
  ];
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd title="Arizona Flash-Flood Go/No-Go Guide | Sage" description="Make a safer Arizona monsoon decision before entering washes, canyons, creek crossings, or flooded roads. Never cross moving water." url="https://sage.healthandtravels.com/arizona/flash-flood-go-no-go" faqs={faqs} />

      <section className="bg-gradient-to-b from-sky-950 to-zinc-950 px-6 py-16 text-white md:py-24"><div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[.3em] text-orange-400">Monsoon decision guide</p>
        <h1 className="max-w-5xl text-4xl font-black uppercase leading-none md:text-7xl">Moving Water Means No</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 md:text-xl">Do not walk, wade, hike, or drive through floodwater. Turn around, move away from the drainage, and choose another route or another day.</p>
        <a href="#decision" className="mt-8 inline-block rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-widest">Make the Go/No-Go Call</a>
      </div></section>

      <section className="mx-auto max-w-6xl px-6 py-14"><div className="rounded-3xl border-2 border-red-700 bg-red-50 p-7">
        <p className="text-xs font-black uppercase tracking-[.25em] text-red-700">Non-negotiable rule</p>
        <h2 className="mt-3 text-3xl font-black text-red-950 md:text-4xl">If water crosses the route, the route is closed to you.</h2>
        <p className="mt-4 max-w-4xl leading-8 text-red-950">Another person crossing, a nearby destination, a reservation, or confidence in your vehicle does not change the answer. Floodwater can deepen in seconds and conceal washed-out ground.</p>
      </div></section>

      <section id="decision" className="bg-zinc-50 px-6 py-16"><div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-orange-600">60-second screen</p><h2 className="mb-8 text-3xl font-black md:text-5xl">Go, change, or leave now?</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          <Decision className="border-emerald-700 bg-emerald-50 text-emerald-950" title="GO—with an exit plan"><p>No flood watch or warning affects the route or upstream drainage.</p><p>The route avoids drainage traps, conditions are stable, and everyone knows the higher-ground exit.</p></Decision>
          <Decision className="border-amber-600 bg-amber-50 text-amber-950" title="CHANGE the plan"><p>A Flash Flood Watch is active, storms could affect upstream terrain, or the route enters a wash, creek, canyon, or low crossing.</p><p>Choose a developed, higher-ground alternative.</p></Decision>
          <Decision className="border-red-700 bg-red-50 text-red-950" title="LEAVE now"><p>A Flash Flood Warning is active nearby, water is rising or carrying debris, or you hear approaching water.</p><p>Move immediately to higher ground without crossing the channel.</p></Decision>
        </div>
      </div></section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <div><p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-zinc-400">Why guessing fails</p><h2 className="text-3xl font-black md:text-4xl">Six inches can take your feet out</h2>
          <p className="mt-5 leading-8 text-zinc-700">The National Weather Service warns that six inches of fast-moving water can knock over an adult. About 12 inches can carry away many cars, and about two feet can carry away SUVs and trucks. These are warnings—not safe crossing limits.</p>
          <p className="mt-5 leading-8 text-zinc-700">On August 29, 2026, destructive flooding in Bright Angel Canyon at Grand Canyon National Park killed two hikers, forced 62 evacuations, damaged infrastructure, and caused major closures. The park warns that flooding can arrive with little or no warning even when a storm is not visible overhead.</p>
          <p className="mt-5 text-sm italic leading-7 text-zinc-600">Always check current Grand Canyon conditions. Closures can change after publication.</p>
        </div>
        <div className="rounded-3xl bg-sky-950 p-7 text-white"><h3 className="text-2xl font-black">Watch and listen</h3><ul className="mt-5 space-y-4 text-sm leading-7 text-sky-50">{signs.map(sign => <li key={sign} className="flex gap-3"><strong className="text-orange-400">!</strong><span>{sign}</span></li>)}</ul></div>
      </section>

      <section className="bg-orange-50 px-6 py-16"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black md:text-4xl">The family plan before leaving</h2><ol className="mt-7 grid gap-4 md:grid-cols-2">
        {['Check alerts for the destination, upstream drainage, drive, and return time.','Identify washes, creek crossings, canyon bottoms, culverts, and low-water roads.','Choose a backup destination away from drainage terrain.','Teach children: moving water means stop, back up, and tell an adult.','Leave when clouds build; do not wait for the route to flood.','Share the route and return time with someone not on the trip.'].map((item,index)=><li key={item} className="rounded-2xl border border-orange-200 bg-white p-5 leading-7"><strong className="mr-2 text-orange-600">{index+1}.</strong>{item}</li>)}
      </ol></div></section>

      <section className="mx-auto max-w-6xl px-6 py-16"><h2 className="text-3xl font-black">Official checks</h2><div className="mt-6 grid gap-4 md:grid-cols-2">
        <a href="https://www.weather.gov/safety/flood-turn-around-dont-drown" rel="noopener noreferrer" className="rounded-2xl border p-5 font-bold">NWS Turn Around, Don’t Drown →</a>
        <a href="https://www.weather.gov/fgz/FlashFlood" rel="noopener noreferrer" className="rounded-2xl border p-5 font-bold">NWS Flagstaff flash-flood information →</a>
        <a href="https://www.nps.gov/grca/planyourvisit/conditions.htm" rel="noopener noreferrer" className="rounded-2xl border p-5 font-bold">Grand Canyon alerts and conditions →</a>
        <a href="https://www.nps.gov/grca/planyourvisit/key-messages.htm" rel="noopener noreferrer" className="rounded-2xl border p-5 font-bold">Grand Canyon key hiking messages →</a>
      </div><div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="https://healthandtravels.com/arizona-flash-flood-never-cross-water" className="rounded-2xl bg-zinc-950 px-6 py-4 text-center text-sm font-black uppercase tracking-wider text-white">Read the complete safety story</a><Link to="/arizona/desert-hiking-safety" className="rounded-2xl border border-zinc-900 px-6 py-4 text-center text-sm font-black uppercase tracking-wider">Desert hiking safety</Link><Link to="/trip-builder" className="rounded-2xl border border-zinc-900 px-6 py-4 text-center text-sm font-black uppercase tracking-wider">Build a safer trip</Link></div>
      <p className="mt-8 text-sm leading-7 text-zinc-500"><strong>Safety note:</strong> Current warnings, closures, and emergency instructions take priority. Call 911 in an emergency. Do not enter floodwater to attempt an untrained rescue.</p></section>
    </main>
  );
}
