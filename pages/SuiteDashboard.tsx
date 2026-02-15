import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ReviewEngine } from '../components/ReviewEngine.tsx';
import { LeadQualifier } from '../components/LeadQualifier.tsx';
import { MediaLabView } from '../components/MediaLabView.tsx';
import { SearchHubView } from '../components/SearchHubView.tsx';
import { ChatView } from '../components/ChatView.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { LiveVoiceView } from '../components/LiveVoiceView.tsx';
import { BookingView } from '../components/BookingView.tsx';
import { geminiService } from '../services/geminiService.ts';

const SuiteDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-6xl mx-auto p-12 h-full flex flex-col">
          <Routes>
            <Route path="/" element={<WelcomeOverview />} />
            <Route path="/chat" element={<ChatView />} />
            <Route path="/booking" element={<BookingView />} />
            <Route path="/reviews" element={<ReviewEngine />} />
            <Route path="/leads" element={<LeadQualifier />} />
            <Route path="/media" element={<MediaLabView />} />
            <Route path="/search" element={<SearchHubView />} />
            <Route path="/voice" element={<LiveVoiceView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const WelcomeOverview = () => {
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrief = async () => {
      try {
        const prompt = "Provide a high-density intelligence briefing for Arizona explorers TODAY. 1. Critical Weather hazards (heat, wind). 2. Trail Status (Soldier Pass, Camelback, Sedona shuttles). 3. One elite wellness recovery recommendation. Keep it authoritative and efficient.";
        const res = await geminiService.sendMessage([], prompt);
        setBrief(res.text);
      } catch (e) {
        setBrief("Satellite link unstable. Please check official forest service sites.");
      } finally {
        setLoading(false);
      }
    };
    fetchBrief();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-16">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-6">Adventure Command Center</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
          Situation <br/><span className="text-zinc-300">Room.</span>
        </h1>
        
        {loading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-4 bg-zinc-100 rounded w-1/2"></div>
            <div className="h-32 bg-zinc-50 rounded-3xl"></div>
          </div>
        ) : (
          <div className="bg-zinc-950 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Live Arizona Scout Briefing</p>
               </div>
               <div className="prose prose-invert prose-sm max-w-none text-zinc-300 serif-text italic text-xl leading-relaxed whitespace-pre-wrap">
                 {brief}
               </div>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { label: 'Active Protocols', stat: '12 Vetted Paths', desc: 'Syncing with local trail nodes.' },
          { label: 'Recovery Hub', stat: '8 Wellness Centers', desc: 'Vetted post-hike recovery specialists.' },
          { label: 'Cloud Buffer', stat: 'Synchronized', desc: 'Gemini 3 Satellite link established.' }
        ].map((item, i) => (
          <div key={i} className="p-10 border border-zinc-100 rounded-[32px] bg-white hover:border-black transition-all group cursor-default">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">{item.label}</p>
            <h4 className="text-2xl font-black mb-4 uppercase">{item.stat}</h4>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
            <div className="mt-8 pt-8 border-t border-zinc-50 flex items-center text-[9px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black transition-colors">
              Access Sub-system 
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuiteDashboard;
