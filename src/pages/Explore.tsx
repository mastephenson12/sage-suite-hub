import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { arizonaDestinations } from '../data/arizonaDestinations';
import { trails } from '../data/trails';
import SEOJsonLd from '../components/SEOJsonLd';

const hubLinks = [
  {
    title: 'Arizona Family Adventure Hub',
    description: 'Start here for family-friendly Arizona destinations, easy trails, food ideas, lodging notes, and safety planning.',
    to: '/arizona',
  },
  {
    title: 'Best Arizona Hikes With Kids',
    description: 'Compare beginner-friendly hikes by season, shade, bathrooms, drive time, and family energy level.',
    to: '/arizona/hikes-with-kids',
  },
  {
    title: 'Arizona Day Trips From Phoenix',
    description: 'Find practical family day trips from Phoenix by drive time, weather, elevation, and easy stops.',
    to: '/arizona/day-trips-from-phoenix',
  },
  {
    title: 'Arizona Family Adventures By Season',
    description: 'Choose better trips for spring, summer, monsoon, fall, and winter conditions.',
    to: '/arizona/family-adventures-by-season',
  },
  {
    title: 'Arizona Desert Hiking Safety',
    description: 'Hydration, heat, timing, gear, and safety notes for families hiking in the desert.',
    to: '/arizona/desert-hiking-safety',
  },
  {
    title: 'Phoenix With Kids When It Is Too Hot',
    description: 'A heat-safe Phoenix plan with early outdoor stops, indoor midday anchors, water resets, and realistic pacing.',
    to: '/archive/phoenix-things-to-do-with-kids-when-hot',
  },
  {
    title: 'Phoenix con ninos cuando hace demasiado calor',
    description: 'Guia familiar en espanol con actividades bajo techo, agua, sombra, comida y salidas tempranas para dias de calor.',
    to: '/es/archive/phoenix-con-ninos-cuando-hace-calor',
  },
];

const companionReads = [
  {
    title: 'Flagstaff: The Fix-Your-Family\'s-Mood Mountain Weekend',
    href: 'https://healthandtravels.com/p/flagstaff',
  },
  {
    title: 'Sedona In April: The 3-Day Family Reset',
    href: 'https://healthandtravels.com/p/sedona-in-april',
  },
  {
    title: 'Phoenix, Arizona: Your Family\'s Perfect Desert Escape',
    href: 'https://healthandtravels.com/p/phoenix-arizona-adventure',
  },
];

const LinkList: React.FC<{
  title: string;
  intro: string;
  children: React.ReactNode;
}> = ({ title, intro, children }) => (
  <section className="border-t border-zinc-100 py-10">
    <div className="mb-6 max-w-3xl">
      <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 md:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-500 md:text-base">{intro}</p>
    </div>
    <div className="grid gap-3 md:grid-cols-2">{children}</div>
  </section>
);

const InternalDirectoryLink: React.FC<{
  to: string;
  title: string;
  description?: string;
  label?: string;
}> = ({ to, title, description, label }) => (
  <Link
    to={to}
    className="group rounded-lg border border-zinc-100 bg-white p-4 transition hover:border-brand-primary/30 hover:bg-zinc-50"
  >
    {label && (
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-brand-primary">
        {label}
      </p>
    )}
    <h3 className="text-sm font-black uppercase tracking-tight text-zinc-950 transition group-hover:text-brand-primary md:text-base">
      {title}
    </h3>
    {description && <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>}
  </Link>
);

const Explore: React.FC = () => {
  const directoryFaqs = [
    {
      question: 'What can I find in the Sage Explore Directory?',
      answer:
        'The Sage Explore Directory links to Arizona family adventure hubs, destination guides, trail guides, archive itineraries, and companion Health and Travels articles.',
    },
    {
      question: 'Is this page useful for planning Arizona trips?',
      answer:
        'Yes. It is built as a simple starting point for families who want to compare Arizona destinations, hikes, seasonal ideas, safety notes, and ready-made itineraries.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <SEOJsonLd
        title="Explore Arizona Family Travel Guides | Sage Directory"
        description="Browse every major Sage Arizona family travel hub, destination guide, trail guide, archive itinerary, and related Health and Travels article from one directory."
        url="https://sage.healthandtravels.com/explore"
        faqs={directoryFaqs}
      />

      <header className="pb-10">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">
          Explore Directory
        </p>
        <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tighter text-zinc-950 md:text-6xl">
          Arizona family travel guides, trails, and trip ideas
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 md:text-lg">
          A simple directory for families who want to browse Sage guides by destination, trail, season, safety need, or ready-made itinerary.
        </p>
      </header>

      <LinkList
        title="Start Here"
        intro="These are the strongest planning hubs for families exploring Arizona."
      >
        {hubLinks.map((link) => (
          <InternalDirectoryLink
            key={link.to}
            to={link.to}
            title={link.title}
            description={link.description}
            label="Hub"
          />
        ))}
      </LinkList>

      <LinkList
        title="Destination Guides"
        intro="Browse Arizona places by family fit, easy trails, food stops, lodging ideas, and safety notes."
      >
        {arizonaDestinations.map((destination) => (
          <InternalDirectoryLink
            key={destination.slug}
            to={`/arizona/${destination.slug}`}
            title={`${destination.name} Family Adventure Guide`}
            description={destination.tagline}
            label="Destination"
          />
        ))}
      </LinkList>

      <LinkList
        title="Trail Guides"
        intro="Use these when you want more detail on a specific hike or outdoor stop."
      >
        {trails.map((trail) => (
          <InternalDirectoryLink
            key={trail.id}
            to={`/trail-guides/${trail.id}`}
            title={`${trail.name} Trail Guide`}
            description={`${trail.location} - ${trail.difficulty} - ${trail.distance}`}
            label="Trail"
          />
        ))}
      </LinkList>

      <LinkList
        title="Archive Itineraries"
        intro="Ready-made trip ideas and deeper family travel guides from the Sage archive."
      >
        {articles.map((article) => (
          <InternalDirectoryLink
            key={article.id}
            to={`/archive/${article.id}`}
            title={article.title}
            description={`${article.category} guide published ${article.date}`}
            label="Archive"
          />
        ))}
      </LinkList>

      <section className="border-t border-zinc-100 py-10">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 md:text-3xl">
            Health and Travels Companion Reads
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500 md:text-base">
            These articles live on the main Health and Travels site and pair well with the Sage planning pages.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {companionReads.map((read) => (
            <a
              key={read.href}
              href={read.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-100 bg-white p-4 transition hover:border-brand-primary/30 hover:bg-zinc-50"
            >
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-brand-primary">
                Health and Travels
              </p>
              <h3 className="text-sm font-black uppercase tracking-tight text-zinc-950 md:text-base">
                {read.title}
              </h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
