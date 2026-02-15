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
        const res = await geminiService.sendMessage([], "Provide a brief 3-point scouting report for Arizona trails TODAY. Focus on weather hazards, fire restrictions, and one 'recommended trail of the day' for Phoenix/Sedona area.");
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
      <header className="mb-20">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-6">Adventure Command Center</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">Daily <br/><span className="text-zinc-300">Scout Brief.</span></h1>
        
        {loading ? (
          <div className="flex items-center gap-4 text-zinc-400 animate-pulse">
            <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-400 rounded-full animate-spin"></div>
            <p className="text-sm font-bold uppercase tracking-widest">Grounding Real-time Intel...</p>
          </div>
        ) : (
          <div className="bg-zinc-950 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Live Satellite Data</p>
               </div>
               <div className="prose prose-invert prose-sm max-w-none text-zinc-300 serif-text italic text-lg leading-relaxed whitespace-pre-wrap">
                 {brief}
               </div>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Flightsage', stat: '4 Active Bookings' },
          { label: 'Travelsage', stat: '12 Vetted Itineraries' },
          { label: 'Campsage', stat: '8 Site Inspections' }
        ].map(brand => (
          <div key={brand.label} className="p-10 border border-zinc-100 rounded-sm hover:border-black transition-all group bg-white hover:shadow-xl hover:shadow-black/5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">{brand.label}</p>
            <h4 className="text-xl font-black mb-8 uppercase">{brand.stat}</h4>
            <div className="pt-8 border-t border-zinc-50 flex items-center text-[9px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black transition-colors">
              Synchronize Data 
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuiteDashboard;
