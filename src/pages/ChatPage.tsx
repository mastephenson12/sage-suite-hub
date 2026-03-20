import React, { useEffect, useMemo, useState } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { ArrowLeft, Plane, Tent, Hotel, MapPin, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

type Mode = 'general' | 'flights' | 'camping' | 'lodging' | 'arizona';
type PlanDepth = 'quick' | 'detailed';

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

const ChatPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>('general');
  const [planDepth, setPlanDepth] = useState<PlanDepth>('quick');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const trip = searchParams.get('trip');

    if (trip === 'sedona') {
      setMode('arizona');
      setPlanDepth('detailed');
    }
  }, [searchParams]);

  const initialMessages: Record<Mode, string> = {
    general:
      "Hi, I’m Sage — your travel planning concierge. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona.",
    flights:
      "Welcome to FlightSage. I’ll help you plan flights faster with fewer tabs and clearer next steps.",
    camping:
      "Welcome to CampSage. I can help with camping, RV parks, cabins, glamping, and park trip planning.",
    lodging:
      "Welcome to TravelSage. I can help you narrow down hotels, vacation rentals, resorts, and family-friendly stays.",
    arizona:
      "Welcome to ArizonaSage. I specialize in Arizona family adventures, scenic drives, trails, small towns, and seasonal planning."
  };

  const pageHeadline = useMemo(() => {
    if (mode === 'arizona') return 'Plan Your Arizona Adventure Fast';
    if (mode === 'flights') return 'Find Flights Faster with Sage';
    if (mode === 'camping') return 'Plan Your Camping Trip Faster';
    if (mode === 'lodging') return 'Find the Right Stay Faster';
    return 'Plan Your Next Trip Fast';
  }, [mode]);

  const pageSubtext = useMemo(() => {
    if (mode === 'arizona') {
      return 'Tell Sage where you want to go, when, your budget, and who’s going. Get a practical Arizona plan without opening a hundred tabs.';
    }

    return 'Tell Sage where you want to go, when, your budget, and who’s going. Get a practical plan with clear next steps.';
  }, [mode]);

  const activeModeCardClasses = (targetMode: Mode) =>
    `rounded-2xl border p-4 text-left transition-all ${
      mode === targetMode
        ? 'border-brand-primary bg-brand-primary/5 shadow-sm'
        : 'border-zinc-200 bg-white hover:border-brand-primary hover:bg-zinc-50'
    }`;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 md:px-6">
        <div className="mb-3 flex-shrink-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Health & Travels
          </Link>
        </div>

        <section className="mb-4 flex-shrink-0 rounded-[28px] border border-zinc-200 bg-white p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <Sparkles className="h-3 w-3" />
                {mode === 'arizona' ? 'Arizona Family Adventure Mode' : 'Travel Concierge'}
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
                {pageHeadline}
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">
                {pageSubtext}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPlanDepth('quick')}
                className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
                  planDepth === 'quick'
                    ? 'bg-zinc-950 text-white'
                    : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                Quick Plan
              </button>

              <button
                type="button"
                onClick={() => setPlanDepth('detailed')}
                className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
                  planDepth === 'detailed'
                    ? 'bg-zinc-950 text-white'
                    : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                Full Itinerary
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <button
              type="button"
              onClick={() => setMode('flights')}
              className={activeModeCardClasses('flights')}
            >
              <Plane className="mb-2 h-5 w-5 text-brand-primary" />
              <div className="mb-1 font-black">FlightSage</div>
              <div className="text-xs text-zinc-500">Flights and routing</div>
            </button>

            <button
              type="button"
              onClick={() => setMode('camping')}
              className={activeModeCardClasses('camping')}
            >
              <Tent className="mb-2 h-5 w-5 text-brand-primary" />
              <div className="mb-1 font-black">CampSage</div>
              <div className="text-xs text-zinc-500">Camping and parks</div>
            </button>

            <button
              type="button"
              onClick={() => setMode('lodging')}
              className={activeModeCardClasses('lodging')}
            >
              <Hotel className="mb-2 h-5 w-5 text-brand-primary" />
              <div className="mb-1 font-black">TravelSage</div>
              <div className="text-xs text-zinc-500">Hotels and rentals</div>
            </button>

            <button
              type="button"
              onClick={() => setMode('arizona')}
              className={activeModeCardClasses('arizona')}
            >
              <MapPin className="mb-2 h-5 w-5 text-brand-primary" />
              <div className="mb-1 font-black">ArizonaSage</div>
              <div className="text-xs text-zinc-500">Local Arizona planning</div>
            </button>
          </div>
        </section>

        <div className="min-h-0 flex-1 rounded-3xl border border-zinc-200 bg-white shadow-sm overflow-hidden h-[calc(100vh-230px)] min-h-[620px]">
          <ChatInterface
            className="h-full"
            initialMessage={searchParams.get('trip') === 'sedona' ? SEDONA_PROMPT : initialMessages[mode]}
            planDepth={planDepth}
            starterPrompt={searchParams.get('starter') || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
