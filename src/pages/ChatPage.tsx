import React, { useEffect, useMemo, useState } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

type Mode = 'general' | 'flights' | 'camping' | 'lodging' | 'arizona';

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

const MODES: { key: Mode; label: string }[] = [
  { key: 'general', label: 'Trips' },
  { key: 'flights', label: 'Flights' },
  { key: 'camping', label: 'Camping' },
  { key: 'lodging', label: 'Stays' },
  { key: 'arizona', label: 'Arizona' },
];

const ChatPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>('general');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('trip') === 'sedona') {
      setMode('arizona');
    }
  }, [searchParams]);

  const initialMessages: Record<Mode, string> = {
    general: "Hi, I’m Sage. I help plan trips anywhere, with extra Arizona expertise.",
    flights: "Welcome to FlightSage. I’ll help you narrow down flights and next steps.",
    camping: "Welcome to CampSage. I can help with camping, cabins, RV trips, and parks.",
    lodging: "Welcome to TravelSage. I can help with hotels, rentals, and family-friendly stays.",
    arizona: "Welcome to ArizonaSage. I specialize in Arizona family adventures and road trips.",
  };

  const headline = useMemo(() => {
    if (mode === 'arizona') return 'Plan Your Arizona Adventure';
    if (mode === 'flights') return 'Find Better Flights Faster';
    if (mode === 'camping') return 'Plan Your Camping Trip';
    if (mode === 'lodging') return 'Find the Right Stay';
    return 'Plan Your Next Trip';
  }, [mode]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-3 md:px-5">
        <div className="mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Health & Travels
          </Link>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <ChatInterface
            key={`${mode}-${searchParams.get('trip') || 'default'}`}
            className="h-[60vh] md:h-[65vh]"
            initialMessage={
              searchParams.get('trip') === 'sedona'
                ? SEDONA_PROMPT
                : initialMessages[mode]
            }
          />
        </div>

        <section className="mt-4 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {MODES.map((item) => (
              <button
                key={item.key}
                onClick={() => setMode(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  mode === item.key
                    ? 'border border-brand-primary/20 bg-brand-primary/10 text-brand-primary'
                    : 'border border-zinc-200 bg-white text-zinc-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatPage;
