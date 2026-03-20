import React, { useEffect, useMemo, useState } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import {
  ArrowLeft,
  Plane,
  Tent,
  Hotel,
  MapPin,
  Sparkles,
  Clock3,
  Compass,
  Mail,
  Download,
  Trees,
  BedDouble,
  Utensils,
} from 'lucide-react';
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

const STARTER_PROMPTS = [
  'Plan a weekend in Sedona with kids',
  '3-day Grand Canyon itinerary',
  'Find cheap flights from Phoenix in April',
  'Best camping spots in Arizona right now',
];

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
      "Hi, I’m Sage — your travel planning concierge. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona. I’ll guide you step by step through destination, dates, travelers, budget, and trip style so we can build a plan fast.",
    flights:
      "Welcome to FlightSage. I’ll help you build a smart flight plan. We’ll quickly cover departure city, destination, dates, traveler count, and budget so I can suggest the best next booking steps.",
    camping:
      "Welcome to CampSage. I can help with camping, RV parks, cabins, glamping, and national or state park trip planning. I’ll guide you through where you want to go, dates, group size, budget, and camping style.",
    lodging:
      "Welcome to TravelSage. I can help you narrow down hotels, vacation rentals, resorts, and family-friendly stays. I’ll walk you through destination, dates, travelers, budget, and preferred stay style.",
    arizona:
      "Welcome to ArizonaSage. I specialize in Arizona family adventures, scenic drives, trails, small towns, and seasonal planning. I’ll guide you step by step so we can build a practical Arizona plan with places to stay, things to do, and booking-ready next steps."
  };

  const pageHeadline = useMemo(() => {
    if (mode === 'flights') return 'Find Flights Faster with Sage';
    if (mode === 'camping') return 'Plan Your Next Camping Trip with Sage';
    if (mode === 'lodging') return 'Find the Right Stay with Sage';
    if (mode === 'arizona') return 'Plan Your Next Arizona Adventure in 60 Seconds';
    return 'Plan Your Next Adventure in 60 Seconds';
  }, [mode]);

  const pageSubtext = useMemo(() => {
    if (mode === 'arizona') {
      return 'Tell Sage where, when, your budget, and who’s going — get a family-friendly Arizona plan with stay ideas, activities, and booking-ready next steps.';
    }

    return 'Tell Sage where, when, your budget, and who’s going — get a practical travel plan with hotels, camping, flights, activities, and next-step booking guidance.';
  }, [mode]);

  const activeModeCardClasses = (targetMode: Mode) =>
    `p-4 rounded-2xl border text-left transition-all ${
      mode === targetMode
        ? 'border-brand-primary bg-brand-primary/5 shadow-sm'
        : 'border-zinc-200 hover:border-brand-primary hover:bg-zinc-50'
    }`;

  const starterButtons = STARTER_PROMPTS.map((prompt) => (
    <button
      key={prompt}
      type="button"
      onClick={() => {
        const encoded = encodeURIComponent(prompt);
        window.location.hash = `#/chat?starter=${encoded}`;
      }}
      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
    >
      {prompt}
    </button>
  ));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Health & Travels
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-white p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white">
              <Sparkles className="w-3.5 h-3.5" />
              {mode === 'arizona' ? 'Arizona Family Adventure Mode' : 'Travel Concierge Mode'}
            </div>

            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight text-zinc-950">
              {pageHeadline}
            </h1>

            <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-zinc-600">
              {pageSubtext}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPlanDepth('quick')}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition ${
                  planDepth === 'quick'
                    ? 'bg-zinc-950 text-white'
                    : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <Clock3 className="w-4 h-4" />
                Quick Plan
              </button>

              <button
                type="button"
                onClick={() => setPlanDepth('detailed')}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition ${
                  planDepth === 'detailed'
                    ? 'bg-zinc-950 text-white'
                    : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <Compass className="w-4 h-4" />
                Full Itinerary
              </button>

              <button
                type="button"
                onClick={() => setMode('arizona')}
                className="inline-flex items-center gap-2 rounded-2xl border border-brand-primary bg-brand-primary/5 px-5 py-3 text-sm font-black text-brand-primary transition hover:bg-brand-primary/10"
              >
                <MapPin className="w-4 h-4" />
                Arizona Family Adventure
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setMode('flights')}
                className={activeModeCardClasses('flights')}
                type="button"
              >
                <Plane className="w-5 h-5 mb-2 text-brand-primary" />
                <div className="font-black mb-1">FlightSage</div>
                <div className="text-xs text-zinc-500">Plan flights and routing</div>
              </button>

              <button
                onClick={() => setMode('camping')}
                className={activeModeCardClasses('camping')}
                type="button"
              >
                <Tent className="w-5 h-5 mb-2 text-brand-primary" />
                <div className="font-black mb-1">CampSage</div>
                <div className="text-xs text-zinc-500">Camping, parks, and RV stays</div>
              </button>

              <button
                onClick={() => setMode('lodging')}
                className={activeModeCardClasses('lodging')}
                type="button"
              >
                <Hotel className="w-5 h-5 mb-2 text-brand-primary" />
                <div className="font-black mb-1">TravelSage</div>
                <div className="text-xs text-zinc-500">Hotels and vacation rentals</div>
              </button>

              <button
                onClick={() => setMode('arizona')}
                className={activeModeCardClasses('arizona')}
                type="button"
              >
                <MapPin className="w-5 h-5 mb-2 text-brand-primary" />
                <div className="font-black mb-1">ArizonaSage</div>
                <div className="text-xs text-zinc-500">Arizona-first local expertise</div>
              </button>
            </div>

            <div className="mt-8">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
                Tap to start
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {starterButtons}
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Fast
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-900">
                  Guided questions instead of blank-page chaos
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Useful
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-900">
                  Trips, stays, activities, and booking-ready next steps
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Local edge
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-900">
                  Arizona-first planning for families, weekends, and road trips
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-[32px] border border-zinc-200 bg-white p-6">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
                What Sage helps with
              </div>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <div className="font-black text-zinc-900">Weekend trips</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Arizona escapes, scenic routes, family itineraries, and easy planning.
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                  <div className="font-black text-zinc-900">Flights and stays</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Better trip structure before someone opens 47 tabs.
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                  <div className="font-black text-zinc-900">Camping and outdoors</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Family-friendly camping, parks, seasonal advice, and packing guidance.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
                Best use case
              </div>
              <div className="mt-3 text-2xl font-black">
                Turn this from “AI chat” into “instant travel concierge”
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Give people a path: destination, dates, budget, travelers, plan. Then move them toward stays, activities, and booking actions.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-3xl border border-zinc-200 overflow-hidden bg-white shadow-sm h-[760px]">
          <ChatInterface
            className="h-full"
            initialMessage={searchParams.get('trip') === 'sedona' ? SEDONA_PROMPT : initialMessages[mode]}
            planDepth={planDepth}
          />
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-zinc-200 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
                  Example trip results
                </div>
                <h2 className="mt-2 text-2xl font-black text-zinc-950">
                  Show visual booking-ready options under the chat
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="h-32 bg-zinc-100 flex items-center justify-center">
                  <BedDouble className="w-8 h-8 text-zinc-400" />
                </div>
                <div className="p-4">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    Hotels
                  </div>
                  <div className="mt-2 font-black text-zinc-900">Family-Friendly Stay</div>
                  <div className="mt-1 text-sm text-zinc-500">From $189/night</div>
                  <button className="mt-4 w-full rounded-xl bg-zinc-950 px-4 py-2 text-sm font-black text-white">
                    Book Now
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="h-32 bg-zinc-100 flex items-center justify-center">
                  <Plane className="w-8 h-8 text-zinc-400" />
                </div>
                <div className="p-4">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    Flights
                  </div>
                  <div className="mt-2 font-black text-zinc-900">Best Fare Window</div>
                  <div className="mt-1 text-sm text-zinc-500">Track + compare routes</div>
                  <button className="mt-4 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-black text-zinc-800">
                    View Deal
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="h-32 bg-zinc-100 flex items-center justify-center">
                  <Trees className="w-8 h-8 text-zinc-400" />
                </div>
                <div className="p-4">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    Activities
                  </div>
                  <div className="mt-2 font-black text-zinc-900">Jeep Tour + Hikes</div>
                  <div className="mt-1 text-sm text-zinc-500">Bookable family picks</div>
                  <button className="mt-4 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-black text-zinc-800">
                    Explore
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="h-32 bg-zinc-100 flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-zinc-400" />
                </div>
                <div className="p-4">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    Food
                  </div>
                  <div className="mt-2 font-black text-zinc-900">Family Food Stops</div>
                  <div className="mt-1 text-sm text-zinc-500">Easy options near your stay</div>
                  <button className="mt-4 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-black text-zinc-800">
                    See Picks
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6">
            <div className="text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
              Lead capture
            </div>
            <h2 className="mt-2 text-2xl font-black text-zinc-950">
              Save the trip plan and follow up later
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              This is where you capture the lead after Sage creates the itinerary.
            </p>

            <div className="mt-6 space-y-3">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Email address
                </span>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none focus:border-brand-primary"
                  />
                </div>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-black text-white"
                >
                  <Mail className="w-4 h-4" />
                  Send My Plan
                </button>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-black text-zinc-800"
                >
                  <Download className="w-4 h-4" />
                  Download Itinerary
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white p-4">
              <div className="text-sm font-semibold text-zinc-900">
                Next code step after this UI
              </div>
              <div className="mt-1 text-sm text-zinc-600">
                Wire these buttons to your email provider, CRM, Beehiiv, or itinerary PDF flow after the chat output is generated.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatPage;
