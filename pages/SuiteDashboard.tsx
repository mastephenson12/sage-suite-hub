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
        <div className="max-w-6xl mx-auto p-8 md:p-12 h-full flex flex-col">
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
        const prompt = "Act as 'Scout'. Provide a high-density intelligence briefing for Arizona explorers TODAY. 1. Critical Weather hazards (heat/monsoon). 2. Specific Trail Status (Soldier Pass parking, Camelback Echo Canyon, Sedona Shuttles). 3. One elite wellness recovery recommendation. Keep it bulleted, professional, and dense.";
        const res = await geminiService.sendMessage([], prompt);
        setBrief(res.text);
      } catch (e) {
        setBrief("Satellite link unstable. Please verify trail status via official Forest Service channels.");
      } finally {
        setLoading(false);
      }
    };
    fetchBrief();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Operations Center</p>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
          Situation <br/><span className="text-zinc-200 italic font-serif normal-case">Room.</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Live Briefing */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-zinc-950 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 flex items-center gap-2">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 Live Satellite Briefing
               </h3>
               {loading ? (
                 <div className="space-y-4">
                   <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse"></div>
                   <div className="h-20 bg-white/5 rounded w-full animate-pulse"></div>
                 </div>
               ) : (
                 <div className="prose prose-invert prose-sm max-w-none text-zinc-300 font-serif italic text-xl leading-relaxed whitespace-pre-wrap">
                   {brief}
                 </div>
               )}
            </div>
          </section>

          {/* Quick-Access Expert Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-zinc-100 rounded-[32px] bg-white hover:border-black transition-all group">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Vetted Regional Brief</p>
              <h4 className="text-lg font-black uppercase mb-4 tracking-tighter">Arizona High Desert</h4>
              <ul className="text-xs text-zinc-500 space-y-2 font-medium">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Red Rock Pass required for Sedona.</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Hydration: 1L per hour minimum.</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Snake season: Stay centered on trails.</li>
              </ul>
            </div>
            <div className="p-8 border border-zinc-100 rounded-[32px] bg-zinc-50 hover:bg-white hover:border-black transition-all group">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Pro Gear Check</p>
              <div className="flex flex-wrap gap-2">
                {['UV-50 Layer', '3L Bladder', 'Satellite SOS', 'Salt Tabs'].map(item => (
                  <span key={item} className="px-3 py-1 bg-white border border-zinc-200 rounded-lg text-[9px] font-black uppercase tracking-widest">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Intel */}
        <div className="space-y-6">
          <div className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-800 mb-6">Active Sync Nodes</h4>
            <div className="space-y-6">
              {[
                { label: 'Flightsage', val: '4 Active Bookings' },
                { label: 'Travelsage', val: '12 Vetted Paths' },
                { label: 'Campsage', val: '8 Inspections' }
              ].map(brand => (
                <div key={brand.label}>
                  <p className="text-[8px] font-black text-blue-600/50 uppercase tracking-widest mb-1">{brand.label}</p>
                  <p className="text-xs font-black text-blue-900 uppercase tracking-tight">{brand.val}</p>
                  <div className="mt-2 w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border border-zinc-100 rounded-[32px] flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Linked Scout</p>
              <p className="text-sm font-black uppercase">Gemini 3 Pro</p>
            </div>
            <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center text-white text-xs font-black">
              S3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuiteDashboard;
