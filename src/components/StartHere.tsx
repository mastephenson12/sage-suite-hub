import React from 'react';
import { Link } from 'react-router-dom';

const adventureTypes = [
  {
    emoji: '👨‍👩‍👧‍👦',
    title: 'Family-Friendly Hike',
    description: 'Easy trails, kid-aware planning, safety tips, and nearby food.',
    button: 'Find Family Hikes',
    to: '/trip-builder?activity=family-friendly-hike',
    featured: true,
  },
  {
    emoji: '🚗',
    title: 'Weekend Getaway',
    description: 'Small towns, scenic drives, places to eat, and places to stay.',
    button: 'Plan a Weekend Trip',
    to: '/trip-builder?activity=weekend-getaway',
  },
  {
    emoji: '🥾',
    title: 'Beginner Hiking Adventure',
    description: 'Simple trails, what to bring, when to go, and how to stay safe.',
    button: 'Start Easy',
    to: '/trip-builder?activity=beginner-hiking',
  },
  {
    emoji: '🎒',
    title: 'Rucking / Walking Route',
    description: 'Find places to walk, ruck, build strength, and enjoy Arizona outside.',
    button: 'Find a Ruck Route',
    to: '/trip-builder?activity=rucking-walking',
  },
  {
    emoji: '🌲',
    title: 'Cooler Weather Escape',
    description: 'Ideas for getting out of the desert heat and finding higher-elevation adventures.',
    button: 'Find Cooler Trips',
    to: '/trip-builder?activity=cooler-weather',
  },
  {
    emoji: '🙌',
    title: 'Friends Adventure',
    description: 'Group-friendly hikes, towns, food stops, and relaxed outdoor plans.',
    button: 'Plan with Friends',
    to: '/trip-builder?activity=friends-adventure',
  },
];

const StartHere: React.FC = () => {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
          Start Here
        </p>

        <h2 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
          What Kind of Arizona Adventure Are You Planning?
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-base text-zinc-600 md:text-lg">
          Choose the type of trip that fits your family, friends, or weekend plans.
          Sage will point you toward the right Arizona adventure without making you
          wrestle a dozen browser tabs like some cursed digital octopus.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adventureTypes.map((adventure) => (
            <Link
              key={adventure.title}
              to={adventure.to}
              className={`group flex h-full flex-col rounded-3xl bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                adventure.featured
                  ? 'border-2 border-orange-300'
                  : 'border border-zinc-200'
              }`}
            >
              <div className="mb-4 text-3xl" aria-hidden="true">
                {adventure.emoji}
              </div>

              <h3 className="mb-2 text-2xl font-black text-zinc-900">
                {adventure.title}
              </h3>

              <p className="mb-6 flex-1 text-sm leading-6 text-zinc-600">
                {adventure.description}
              </p>

              <span className="text-sm font-black uppercase tracking-wide text-orange-600 transition group-hover:text-orange-700">
                {adventure.button} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartHere;
