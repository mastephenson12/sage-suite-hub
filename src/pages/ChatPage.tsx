import React, { useEffect, useMemo, useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ARIZONA_DESTINATIONS, type AffiliateSet } from '../data/viatorLinks';
import { chatTripPrompts } from '../data/sage/chatTripPrompts';

type Mode = 'general' | 'flights' | 'camping' | 'lodging' | 'arizona';

const MODES: { key: Mode; label: string }[] = [
  { key: 'general', label: 'Trips' },
  { key: 'flights', label: 'Flights' },
  { key: 'camping', label: 'Camping' },
  { key: 'lodging', label: 'Stays' },
  { key: 'arizona', label: 'Arizona' },
];

const INITIAL_MESSAGES: Record<Mode, string> = {
  general:
    "Hi, I’m Sage. I help plan trips anywhere, with extra Arizona expertise.",
  flights:
    "Welcome to FlightSage. I’ll help you narrow down flights and next steps.",
  camping:
    "Welcome to CampSage. I can help with camping, cabins, RV trips, and parks.",
  lodging:
    "Welcome to TravelSage. I can help with hotels, rentals, and family-friendly stays.",
  arizona:
    "Welcome to ArizonaSage. I specialize in Arizona family adventures and road trips.",
};

const TRIP_PROMPTS: Record<string, string> = {
  sedona: `Create a 3-day Sedona Arizona family adventure itinerary.

The trip should work for:
• two adults
• a 9-year-old daughter
• a 5-year-old son

Include:
• kid friendly hikes
• scenic viewpoints
• a jeep tour
• a swimming spot
• family restaurants
• hotel suggestions

Organize the itinerary by day.

Finish with a short packing list.`,
};

const AFFILIATE_LINKS: Record<Mode, AffiliateSet> = {
  general: {
    tours: 'YOUR_GENERAL_TOURS_LINK',
    stays: 'YOUR_GENERAL_STAYS_LINK',
    gear: 'YOUR_GENERAL_GEAR_LINK',
    label: 'Top Tours & Experiences',
  },
  flights: {
    tours: 'YOUR_FLIGHT_DESTINATION_TOURS_LINK',
    stays: 'YOUR_AIRPORT_OR_DESTINATION_STAYS_LINK',
    gear: 'YOUR_TRAVEL_ACCESSORIES_LINK',
    label: 'Helpful Add-Ons for Your Flight Trip',
  },
  camping: {
    tours: 'YOUR_OUTDOOR_EXPERIENCES_LINK',
    stays: 'YOUR_CAMPGROUND_OR_CABIN_LINK',
    gear: 'YOUR_CAMPING_GEAR_LINK',
    label: 'Camping Trips & Outdoor Experiences',
  },
  lodging: {
    tours: 'YOUR_LOCAL_EXPERIENCES_LINK',
    stays: 'YOUR_HOTEL_OR_RENTAL_LINK',
    gear: 'YOUR_TRAVEL_GEAR_LINK',
    label: 'Stays & Nearby Experiences',
  },
  arizona: {
    tours: 'YOUR_ARIZONA_TOURS_LINK',
    stays: 'YOUR_ARIZONA_STAYS_LINK',
    gear: 'YOUR_ARIZONA_HIKING_GEAR_LINK',
    label: 'Arizona Tours & Experiences',
  },
};

function toTitleCaseFromSlug(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const ChatPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>('general');
  const [searchParams] = useSearchParams();

  const tripFromQuery = (searchParams.get('trip') || '').trim().toLowerCase();
  const modeFromQuery = (searchParams.get('mode') || '').trim().toLowerCase();

  const destinationAffiliate = tripFromQuery
    ? ARIZONA_DESTINATIONS[tripFromQuery]
    : undefined;

  const isArizonaDestinationTrip = Boolean(destinationAffiliate);

  useEffect(() => {
    if (isArizonaDestinationTrip) {
      setMode('arizona');
      return;
    }

    if (
      modeFromQuery === 'general' ||
      modeFromQuery === 'flights' ||
      modeFromQuery === 'camping' ||
      modeFromQuery === 'lodging' ||
      modeFromQuery === 'arizona'
    ) {
      setMode(modeFromQuery);
    }
  }, [isArizonaDestinationTrip, modeFromQuery]);

  const headline = useMemo(() => {
    if (tripFromQuery) {
      return `Plan Your ${toTitleCaseFromSlug(tripFromQuery)} Adventure`;
    }

    switch (mode) {
      case 'arizona':
        return 'Plan Your Arizona Adventure';
      case 'flights':
        return 'Find Better Flights Faster';
      case 'camping':
        return 'Plan Your Camping Trip';
      case 'lodging':
        return 'Find the Right Stay';
      default:
        return 'Plan Your Next Trip';
    }
  }, [mode, tripFromQuery]);

  const subheadline = useMemo(() => {
    if (tripFromQuery) {
      return `Smart trip planning for ${toTitleCaseFromSlug(
        tripFromQuery
      )}, with helpful booking links and destination-specific ideas.`;
    }

    switch (mode) {
      case 'arizona':
        return 'Arizona-focused planning with tours, stays, and family-friendly ideas.';
      case 'flights':
        return 'Narrow down routes, compare next steps, and plan the rest of the trip.';
      case 'camping':
        return 'Camping, cabins, RV trips, parks, and outdoor adventures made simpler.';
      case 'lodging':
        return 'Hotels, rentals, and family-friendly stays without the clutter.';
      default:
        return 'Fast trip planning without the clutter.';
    }
  }, [mode, tripFromQuery]);

  const currentInitialMessage =
    (tripFromQuery && (chatTripPrompts[tripFromQuery] || TRIP_PROMPTS[tripFromQuery])) ||
    INITIAL_MESSAGES[mode];

  const currentLinks = destinationAffiliate || AFFILIATE_LINKS[mode];

  const bookingTitle =
    currentLinks.label ||
    (tripFromQuery
      ? `${toTitleCaseFromSlug(tripFromQuery)} Tours & Experiences`
      : 'Book This Trip');

  const toursCardTitle = tripFromQuery
    ? `${toTitleCaseFromSlug(tripFromQuery)} Tours & Experiences`
    : 'Top Tours & Experiences';

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 md:px-5">
        <div className="mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Health & Travels
          </Link>
        </div>

        <section className="mb-4 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <Sparkles className="h-3 w-3" />
                Travel Concierge
              </div>

              <h1 className="mt-2 text-2xl font-black text-zinc-950 md:text-3xl">
                {headline}
              </h1>

              <p className="mt-1 text-sm text-zinc-600">{subheadline}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {MODES.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setMode(item.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  mode === item.key
                    ? 'border-brand-primary/20 bg-brand-primary/10 text-brand-primary'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <ChatInterface
            key={`${mode}-${tripFromQuery || 'default'}`}
            className="min-h-[500px]"
            initialMessage={currentInitialMessage}
          />
        </div>

        <section className="mt-4 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5">
          <h2 className="text-lg font-black text-zinc-900">{bookingTitle}</h2>

          <p className="mt-1 text-sm text-zinc-600">
            Ready to take the next step? Here are some options to help book the
            trip faster.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <a
              href={currentLinks.tours}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-200 p-4 transition hover:shadow-md"
            >
              <h3 className="font-bold text-zinc-900">{toursCardTitle}</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Find family-friendly tours, activities, and local experiences.
              </p>
              <span className="mt-2 inline-block text-xs font-bold text-brand-primary">
                Browse Tours →
              </span>
            </a>

            <a
              href={currentLinks.stays || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl border border-zinc-200 p-4 transition ${
                currentLinks.stays
                  ? 'hover:shadow-md'
                  : 'pointer-events-none opacity-50'
              }`}
              aria-disabled={!currentLinks.stays}
            >
              <h3 className="font-bold text-zinc-900">Find Places to Stay</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Hotels, rentals, cabins, and family-friendly stays.
              </p>
              <span className="mt-2 inline-block text-xs font-bold text-brand-primary">
                View Stays →
              </span>
            </a>

            <a
              href={currentLinks.gear || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl border border-zinc-200 p-4 transition ${
                currentLinks.gear
                  ? 'hover:shadow-md'
                  : 'pointer-events-none opacity-50'
              }`}
              aria-disabled={!currentLinks.gear}
            >
              <h3 className="font-bold text-zinc-900">Travel & Hiking Gear</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Essentials for your trip, from daypacks to family travel gear.
              </p>
              <span className="mt-2 inline-block text-xs font-bold text-brand-primary">
                See Gear →
              </span>
            </a>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5">
          <div className="border-t border-zinc-100 pt-1 text-xs text-zinc-500">
            By using Sage and submitting your information, you agree to our{' '}
            <Link
              to="/privacy-policy"
              className="font-semibold text-zinc-700 hover:text-black"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              to="/terms-of-service"
              className="font-semibold text-zinc-700 hover:text-black"
            >
              Terms of Service
            </Link>
            .
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatPage;
