import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import CloudinaryImage from './CloudinaryImage';

const arizonaCards = [
  {
    title: 'Sedona',
    description: 'Red rock hikes, scenic stops, and family-friendly day plans.',
    image: '/images/sedona-family.avif',
    to: '/archive/sedona-family-adventure',
    cta: 'View Sedona Guide',
  },
  {
    title: 'Grand Canyon',
    description: 'Simple rim walks, overlook strategy, and safer family timing.',
    image: '/images/grand-canyon.avif',
    to: '/archive/grand-canyon-family-adventure',
    cta: 'View Grand Canyon Guide',
  },
  {
    title: 'Flagstaff',
    description: 'Cool mountain air, pine forests, lava caves, and weekend ideas.',
    image: '/images/flagstaff-family-adventure.avif',
    to: '/archive/flagstaff-family-escape',
    cta: 'View Flagstaff Guide',
  },
];

const destinationOptions = [
  { label: 'Sedona', value: 'sedona', activity: 'explore', season: 'spring' },
  { label: 'Flagstaff', value: 'flagstaff', activity: 'hike', season: 'summer' },
  { label: 'Payson', value: 'payson', activity: 'explore', season: 'summer' },
  { label: 'Phoenix', value: 'phoenix', activity: 'relax', season: 'winter' },
  { label: 'Tucson', value: 'tucson', activity: 'explore', season: 'winter' },
  { label: 'Not sure yet', value: '', activity: 'explore', season: 'spring' },
];

const groupOptions = [
  { label: 'Toddlers / preschoolers', value: 'toddlers' },
  { label: 'Elementary-age kids', value: 'elementary' },
  { label: 'Mixed family group', value: 'mixed' },
  { label: 'Tweens / teens', value: 'teens' },
  { label: 'Adults only', value: 'adults' },
];

const priorityOptions = [
  { label: 'Easy trail + bathrooms', value: 'bathrooms', shade: true, bathrooms: true, stroller: false, length: 'half-day' },
  { label: 'Shade + low stress', value: 'shade', shade: true, bathrooms: true, stroller: false, length: 'full-day' },
  { label: 'Stroller-friendly', value: 'stroller', shade: true, bathrooms: true, stroller: true, length: 'half-day' },
  { label: 'Cool-weather escape', value: 'cool', shade: true, bathrooms: false, stroller: false, length: 'full-day' },
  { label: 'Weekend adventure', value: 'weekend', shade: true, bathrooms: true, stroller: false, length: 'weekend' },
];

function getHealthAndTravelsContext() {
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source');
  const campaign = params.get('utm_campaign') || '';
  const requestedDestination = params.get('destination') || params.get('location') || '';

  const isHealthAndTravelsReferral = source === 'healthandtravels';
  const destinationValue = requestedDestination || (campaign.includes('payson') ? 'payson' : '');
  const matchedDestination = destinationOptions.find((option) => option.value === destinationValue);

  return {
    isHealthAndTravelsReferral,
    campaign,
    matchedDestination,
  };
}

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [referralContext] = useState(getHealthAndTravelsContext);
  const [destination, setDestination] = useState(
    referralContext.matchedDestination || destinationOptions[0]
  );
  const [group, setGroup] = useState(groupOptions[1]);
  const [priority, setPriority] = useState(priorityOptions[0]);

  const handleQuickPlan = (event: React.FormEvent) => {
    event.preventDefault();

    trackEvent('homepage_quick_plan_submit', {
      destination: destination.label,
      group: group.label,
      priority: priority.label,
      source: referralContext.isHealthAndTravelsReferral ? 'healthandtravels' : 'direct',
      campaign: referralContext.campaign || 'none',
    });

    const params = new URLSearchParams();
    params.set('plan', 'ready');
    if (destination.value) params.set('location', destination.value);
    params.set('kids', group.value === 'adults' ? 'no' : 'yes');
    params.set('activity', destination.activity);
    params.set('length', priority.length);
    params.set('season', destination.season);
    params.set('ages', group.value === 'adults' ? 'mixed' : group.value);
    params.set('shade', String(priority.shade));
    params.set('bathrooms', String(priority.bathrooms));
    params.set('stroller', String(priority.stroller));
    params.set('drive', destination.value === 'flagstaff' || destination.value === 'tucson' ? '180' : '120');
    if (referralContext.isHealthAndTravelsReferral) {
      params.set('source', 'healthandtravels');
      if (referralContext.campaign) params.set('campaign', referralContext.campaign);
    }

    navigate(`/trip-builder?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden border-b border-zinc-100 bg-white">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
          alt="Arizona desert road"
          className="h-full w-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-14 md:pb-20 md:pt-20">
        {referralContext.isHealthAndTravelsReferral && (
          <div className="mb-7 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-950">
            <strong className="font-black">Coming from Health &amp; Travels?</strong>{' '}
            {referralContext.matchedDestination
              ? `I carried ${referralContext.matchedDestination.label} into the planner for you. Adjust the family and priorities below, then build your starter plan.`
              : 'Turn the guide you were reading into a practical starter plan. Pick the destination, family fit, and what matters most below.'}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
              Sage Arizona Trip Planner
            </p>

            <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-black md:text-6xl">
              Plan a Safer Arizona Family Adventure in Minutes
            </h1>

            <p className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-zinc-600 md:text-xl">
              Pick where you want to go, who is coming, and what matters most.
              Sage turns that into a starter plan with outdoor ideas, food stops,
              lodging direction, bathroom notes, shade warnings, and timing help,
              because family trips should not require 47 tabs and a tactical binder.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#quick-plan"
                onClick={() =>
                  trackEvent('homepage_plan_trip_click', {
                    label: 'Plan My Arizona Trip',
                    location: 'hero_primary_cta',
                  })
                }
                className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-brand-primary/10 transition-all hover:bg-brand-dark active:scale-95"
              >
                Plan My Arizona Trip
              </a>

              <Link
                to="/arizona"
                onClick={() =>
                  trackEvent('arizona_guides_click', {
                    label: 'Explore Family Guides',
                    location: 'hero_secondary_cta',
                  })
                }
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-8 py-4 text-lg font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
              >
                Explore Family Guides
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-zinc-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                ✅ Kid-fit trail ideas
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                🚻 Bathroom + shade notes
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                🍽️ Food and backup plans
              </div>
            </div>
          </div>

          <form
            id="quick-plan"
            onSubmit={handleQuickPlan}
            className="rounded-[2rem] border border-zinc-200 bg-white/95 p-6 shadow-sm backdrop-blur md:p-8"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
              Start here
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-black md:text-3xl">
              Get a starter plan in 3 quick choices.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              This sends you to the full Sage Trip Builder with your answers already
              loaded. Fancy? No. Useful? Tragically, yes.
            </p>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-black text-zinc-900">
                  1. Where are you headed?
                </span>
                <select
                  value={destination.value}
                  onChange={(event) => {
                    const nextDestination = destinationOptions.find(
                      (option) => option.value === event.target.value
                    );
                    if (nextDestination) setDestination(nextDestination);
                  }}
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-orange-200"
                >
                  {destinationOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black text-zinc-900">
                  2. Who is coming?
                </span>
                <select
                  value={group.value}
                  onChange={(event) => {
                    const nextGroup = groupOptions.find(
                      (option) => option.value === event.target.value
                    );
                    if (nextGroup) setGroup(nextGroup);
                  }}
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-orange-200"
                >
                  {groupOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black text-zinc-900">
                  3. What matters most?
                </span>
                <select
                  value={priority.value}
                  onChange={(event) => {
                    const nextPriority = priorityOptions.find(
                      (option) => option.value === event.target.value
                    );
                    if (nextPriority) setPriority(nextPriority);
                  }}
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-orange-200"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-8 py-4 text-base font-black uppercase tracking-[0.12em] text-white transition hover:bg-zinc-800 active:scale-[0.99]"
              >
                Build My Starter Plan
              </button>
            </div>

            <div className="mt-6 grid gap-2 text-xs font-bold text-zinc-600 sm:grid-cols-2">
              <span className="rounded-full bg-zinc-100 px-3 py-2">🌤 Best time notes</span>
              <span className="rounded-full bg-zinc-100 px-3 py-2">🚗 Drive fit</span>
              <span className="rounded-full bg-zinc-100 px-3 py-2">🥪 Food nearby</span>
              <span className="rounded-full bg-zinc-100 px-3 py-2">🧯 Safety reminders</span>
            </div>
          </form>
        </div>

        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                Start with a proven favorite
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-black md:text-3xl">
                Popular Arizona family trips
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {arizonaCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                onClick={() =>
                  trackEvent('popular_trip_card_click', {
                    label: card.cta,
                    destination: card.title,
                    location: 'homepage_popular_trips',
                  })
                }
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-[320px] overflow-hidden">
                  <CloudinaryImage
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    widthHint={960}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 text-2xl font-black text-white">
                      {card.title}
                    </h3>

                    <p className="mb-4 max-w-xs text-sm leading-relaxed text-white/90">
                      {card.description}
                    </p>

                    <span className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      {card.cta}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};