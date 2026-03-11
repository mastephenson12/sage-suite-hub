import React, { useState } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { ArrowLeft, Plane, Tent, Hotel, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const [mode, setMode] = useState<'general' | 'flights' | 'camping' | 'lodging' | 'arizona'>('general');

  const initialMessages = {
    general:
      "Hi, I’m Sage. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona. Tell me where you want to go, your dates, how many adults and kids are traveling, and your budget.",
    flights:
      "Welcome to FlightSage. I can help you plan flights for your family or group. Tell me your departure city, destination, dates, number of travelers, and your budget.",
    camping:
      "Welcome to CampSage. I can help with campsites, RV parks, national parks, and state parks. Tell me where you want to camp, your dates, group size, and whether you want tent camping, RV, cabins, or glamping.",
    lodging:
      "Welcome to TravelSage. I can help find hotels, vacation rentals, resorts, and family-friendly lodging. Tell me your destination, dates, number of adults and kids, and your price range.",
    arizona:
      "Welcome to ArizonaSage. I specialize in Arizona family adventures, trails, scenic drives, small towns, and seasonal tips. Tell me what part of Arizona interests you, who is traveling, and what kind of adventure you want."
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-6 h-full flex flex-col min-h-0">
        <div className="mb-4 flex-shrink-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Health & Travels
          </Link>
        </div>

        <header className="mb-6 text-center flex-shrink-0">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Plan Your Trip with Sage
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-3xl mx-auto">
            Flights, camping, hotels, and Arizona adventure planning in one place.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 flex-shrink-0">
          <button
            onClick={() => setMode('flights')}
            className="p-4 rounded-2xl border border-zinc-200 hover:border-brand-primary hover:bg-zinc-50 text-left transition-all"
          >
            <Plane className="w-5 h-5 mb-2 text-brand-primary" />
            <div className="font-black mb-1">FlightSage</div>
            <div className="text-xs text-zinc-500">Plan flights and routing</div>
          </button>

          <button
            onClick={() => setMode('camping')}
            className="p-4 rounded-2xl border border-zinc-200 hover:border-brand-primary hover:bg-zinc-50 text-left transition-all"
          >
            <Tent className="w-5 h-5 mb-2 text-brand-primary" />
            <div className="font-black mb-1">CampSage</div>
            <div className="text-xs text-zinc-500">Camping, parks, and RV stays</div>
          </button>

          <button
            onClick={() => setMode('lodging')}
            className="p-4 rounded-2xl border border-zinc-200 hover:border-brand-primary hover:bg-zinc-50 text-left transition-all"
          >
            <Hotel className="w-5 h-5 mb-2 text-brand-primary" />
            <div className="font-black mb-1">TravelSage</div>
            <div className="text-xs text-zinc-500">Hotels and vacation rentals</div>
          </button>

          <button
            onClick={() => setMode('arizona')}
            className="p-4 rounded-2xl border border-zinc-200 hover:border-brand-primary hover:bg-zinc-50 text-left transition-all"
          >
            <MapPin className="w-5 h-5 mb-2 text-brand-primary" />
            <div className="font-black mb-1">ArizonaSage</div>
            <div className="text-xs text-zinc-500">Arizona-first local expertise</div>
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-200 overflow-hidden bg-white shadow-sm flex-1 min-h-0">
          <ChatInterface
            className="h-full"
            initialMessage={initialMessages[mode]}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
