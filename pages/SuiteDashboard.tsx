
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ReviewEngine } from '../components/ReviewEngine.tsx';
import { LeadQualifier } from '../components/LeadQualifier.tsx';
import { MediaLabView } from '../components/MediaLabView.tsx';
import { SearchHubView } from '../components/SearchHubView.tsx';
import { ChatView } from '../components/ChatView.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { LiveVoiceView } from '../components/LiveVoiceView.tsx';
import { BookingView } from '../components/BookingView.tsx';
import { geminiService } from '../services/geminiService.ts';

// Summary component for the main dashboard view
const WelcomeOverview: React.FC = () => {
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchBrief = async () => {
      try {
        const prompt = "Briefing: Arizona Scouting Data Today. 1. Critical weather/monsoon hazards. 2. Specific Sedona/PHX trail status. 3. One recovery practitioner recommendation. Bulleted, authoritative journal style.";
        const res = await geminiService.sendMessage([], prompt);
        if (active) setBrief(res.text);
      } catch (e) {
        if (active) setBrief("Satellite link unstable. Please rely on local trail protocols (Sedona Shuttles active). Check official NWS nodes for PHX heat alerts.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchBrief();
    return () => { active = false; };
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="px-3 py-1 bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest rounded-sm">Node_01 Active</div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Operations Center</p>
        </div>
        <h1 className="text-7xl md:text-[120px] font-black tracking-tighter mb-8 leading-[0.8] uppercase">
          Situation <br/><span className="text-zinc-200 italic font-serif normal-case">Room.</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* AI Intelligence Briefing Panel */}
          <section className="bg-zinc-950 p-12 md:p-16 rounded-[64px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-10">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em]">Intel Briefing</h3>
               </div>
               
               {loading ? (
                 <div className="space-y-4 animate-pulse">
                   <div className="h-4 bg-white/10 rounded w-3/4"></div>
                   <div className="h-4 bg-white/10 rounded w-1/2"></div>
                   <div className="h-4 bg-white/10 rounded w-5/6"></div>
                 </div>
               ) : (
                 <div className="prose prose-invert max-w-none">
                    <div className="text-xl md:text-2xl font-serif italic text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {brief}
                    </div>
                 </div>
               )}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link to="/suite/chat" className="group bg-white p-10 rounded-[48px] border border-zinc-100 hover:border-black transition-all shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">Node_02</p>
              <h4 className="text-2xl font-black uppercase mb-4">Chat Intelligence</h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">Access Scout portal for real-time trail data and wellness directory sync.</p>
              <span className="text-[10px] font-black uppercase border-b-2 border-black pb-1 group-hover:text-blue-600 group-hover:border-blue-600">Open Interface</span>
            </Link>
            <Link to="/suite/booking" className="group bg-white p-10 rounded-[48px] border border-zinc-100 hover:border-black transition-all shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">Node_03</p>
              <h4 className="text-2xl font-black uppercase mb-4">Adventure Builder</h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">Construct multi-day Arizona itineraries with precision grounding.</p>
              <span className="text-[10px] font-black uppercase border-b-2 border-black pb-1 group-hover:text-blue-600 group-hover:border-blue-600">Launch Protocol</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <section className="bg-zinc-50 p-10 rounded-[48px] border border-zinc-100 h-full">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-10 border-b border-zinc-200 pb-4">System Status</h3>
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">Satellite Link</span>
                 <span className="text-[10px] font-black text-green-500 uppercase">Synchronized</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">Imaging Engine</span>
                 <span className="text-[10px] font-black text-green-500 uppercase">Ready</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">Search Grounding</span>
                 <span className="text-[10px] font-black text-green-500 uppercase">Active</span>
               </div>
               <div className="pt-8 mt-8 border-t border-zinc-200">
                  <p className="text-[10px] font-black uppercase text-zinc-400 mb-4">Recent Node Traffic</p>
                  <LeadQualifier />
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Main layout component for the /suite section of the app
const SuiteDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-16 bg-white">
        <Routes>
          <Route path="/" element={<WelcomeOverview />} />
          <Route path="/chat" element={<ChatView />} />
          <Route path="/reviews" element={<ReviewEngine />} />
          <Route path="/media" element={<MediaLabView />} />
          <Route path="/search" element={<SearchHubView />} />
          <Route path="/voice" element={<LiveVoiceView />} />
          <Route path="/booking" element={<BookingView />} />
        </Routes>
      </main>
    </div>
  );
};

export default SuiteDashboard;
