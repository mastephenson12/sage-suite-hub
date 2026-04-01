import React, { useEffect, useMemo, useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

type Mode = 'general' | 'flights' | 'camping' | 'lodging' | 'arizona';

type AffiliateSet = {
  tours: string;
  stays?: string;
  gear?: string;
  label?: string;
};

/* ---------------------------
   DESTINATION-BASED LINKS
   --------------------------- */

const ARIZONA_DESTINATIONS: Record<string, AffiliateSet> = {
  sedona: {
    tours:
      'https://www.viator.com/Sedona/d750-ttd?pid=P00292684&mcid=42383&medium=link&medium_version=selector&campaign=arizona-adventure',
    label: 'Best Sedona Tours',
  },

  // future expansion (just drop links in later)
  // 'grand-canyon': { tours: 'YOUR_LINK', label: 'Grand Canyon Tours' },
  // 'williams': { tours: 'YOUR_LINK', label: 'Williams Experiences' },
  // 'tombstone': { tours: 'YOUR_LINK', label: 'Tombstone Experiences' },
};

/* ---------------------------
   MODES + MESSAGES
   --------------------------- */

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

const AFFILIATE_LINKS: Record<Mode, AffiliateSet> = {
  general: {
    tours: 'YOUR_GENERAL_TOURS_LINK',
  },
  flights: {
    tours: 'YOUR_FLIGHT_TOURS_LINK',
  },
  camping: {
    tours: 'YOUR_OUTDOOR_TOURS_LINK',
  },
  lodging: {
    tours: 'YOUR_LOCAL_TOURS_LINK',
  },
  arizona: {
    tours: 'YOUR_ARIZONA_GENERAL_LINK',
  },
};

/* ---------------------------
   SEDONA PROMPT
   --------------------------- */

const SEDONA_PROMPT = `Create a 3-day Sedona Arizona family adventure itinerary.

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

Finish with a short packing list.`;

/* ---------------------------
   COMPONENT
   --------------------------- */

const ChatPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>('general');
  const [searchParams] = useSearchParams();

  const trip = searchParams.get('trip') || '';
  const modeFromQuery = searchParams.get('mode');

  const destinationAffiliate = ARIZONA_DESTINATIONS[trip];

  useEffect(() => {
    if (destinationAffiliate) {
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
  }, [destinationAffiliate, modeFromQuery]);

  const headline = useMemo(() => {
    if (destinationAffiliate) return `Plan Your ${trip.replace('-', ' ')} Adventure`;

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
  }, [mode, destinationAffiliate, trip]);

  const initialMessage = destinationAffiliate
    ? SEDONA_PROMPT
    : INITIAL_MESSAGES[mode];

  const currentLinks = destinationAffiliate || AFFILIATE_LINKS[mode];

  const bookingTitle =
    destinationAffiliate?.label || 'Top Tours & Experiences';

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

        {/* HEADER */}
        <section className="mb-4 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <Sparkles className="h-3 w-3" />
              Travel Concierge
            </div>

            <h1 className="mt-2 text-2xl font-black text-zinc-950 md:text-3xl">
              {headline}
            </h1>

            <p className="mt-1 text-sm text-zinc-600">
              Fast trip planning without the clutter.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {MODES.map((item) => (
              <button
                key={item.key}
                onClick={() => setMode(item.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  mode === item.key
                    ? 'border-brand-primary/20 bg-brand-primary/10 text-brand-primary'
                    : 'border-zinc-200 bg-white text-zinc-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* CHAT */}
        <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <ChatInterface
            key={`${mode}-${trip}`}
            className="min-h-[500px]"
            initialMessage={initialMessage}
          />
        </div>

        {/* MONETIZATION (THE PART THAT PAYS YOU) */}
        <section className="mt-4 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5">
          <h2 className="text-lg font-black text-zinc-900">
            {bookingTitle}
          </h2>

          <p className="mt-1 text-sm text-zinc-600">
            Book tours, experiences, and activities for your trip.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-1">
            <a
              href={currentLinks.tours}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-200 p-5 hover:shadow-md transition"
            >
              <h3 className="font-bold text-zinc-900">
                {bookingTitle}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Explore top-rated tours, family-friendly activities, and local experiences.
              </p>
              <span className="mt-2 inline-block text-xs font-bold text-brand-primary">
                Browse Experiences →
              </span>
            </a>
          </div>
        </section>

        {/* LEGAL */}
        <section className="mt-4 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5">
          <div className="text-xs text-zinc-500">
            By using Sage, you agree to our{' '}
            <Link to="/privacy-policy" className="font-semibold">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/terms-of-service" className="font-semibold">
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
