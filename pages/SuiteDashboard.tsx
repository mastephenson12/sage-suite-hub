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
        <div className="max-w-6xl mx-auto p-6 md:p-12 h-full flex flex-col">
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
        const prompt = "Provide a high-density intelligence briefing for Arizona explorers TODAY. 1. Critical Weather hazards (heat/wind). 2. Specific Trail Status (Soldier Pass, Camelback, Sedona shuttles). 3. One elite wellness recovery recommendation. Keep it bulleted and efficient.";
        const res = await geminiService.sendMessage([], prompt);
        setBrief(res.text);
      } catch (e) {
        setBrief("Satellite link unstable. Please check official Forest Service alerts for fire and weather updates.");
      } finally {
        setLoading(false);
      }
    };
    fetchBrief();
  }, []);

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Operations Center</p>
        </div>
        <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-8 leading-[0.85] uppercase">
          Situation <br/><span className="text-zinc-200 italic font-serif normal-case">Room.</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Briefing Node */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-zinc-950 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                 <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Live Satellite Briefing</h3>
               </div>
               {loading ? (
                 <div className="space-y-4">
                   <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse"></div>
                   <div className="h-24 bg-white/5 rounded w-full animate-pulse"></div>
                 </div>
               ) : (
                 <div className="prose prose-invert prose-sm max-w-none text-zinc-300 font-serif italic text-2xl leading-relaxed whitespace-pre-wrap">
                   {brief}
                 </div>
               )}
            </div>
          </section>

          {/* Expert Intel Nodes (Immediate Information) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-zinc-100 rounded-[32px] bg-white hover:border-black transition-all group">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Regional Node: Sedona</p>
              <h4 className="text-xl font-black uppercase mb-4 tracking-tighter">Red Rock Protocol</h4>
              <ul className="text-[11px] text-zinc-500 space-y-3 font-medium uppercase tracking-widest">
                <li className="flex items-start gap-3"><span className="w-1 h-1 bg-black rounded-full mt-1.5 shrink-0"></span> Red Rock Pass required for all trailheads.</li>
                <li className="flex items-start gap-3"><span className="w-1 h-1 bg-black rounded-full mt-1.5 shrink-0"></span> Shuttle Mandatory: Thurs-Sun for Cathedral/Soldier Pass.</li>
                <li className="flex items-start gap-3"><span className="w-1 h-1 bg-black rounded-full mt-1.5 shrink-0"></span> High-vibe Recovery: Visit "Sedona Salt Room" post-hike.</li>
              </ul>
            </div>
            <div className="p-8 border border-zinc-100 rounded-[32px] bg-zinc-50 hover:bg-white hover:border-black transition-all group">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Field Prep: Hydration</p>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Safety Margin</p>
                  <p className="text-xs font-black">1.5L / Hour</p>
                </div>
                <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-3/4"></div>
                </div>
                <p className="text-[10px] text-zinc-500 font-medium leading-relaxed italic">"The desert doesn't offer second chances on water. Scale your bladder +30% for canyon treks."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Streams */}
        <div className="space-y-6">
          <div className="bg-blue-50/30 p-8 rounded-[40px] border border-blue-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-800 mb-8">Active Data Streams</h4>
            <div className="space-y-8">
              {[
                { label: 'Flightsage', val: '4 Active Bookings' },
                { label: 'Travelsage', val: '12 Vetted Paths' },
                { label: 'Campsage', val: '8 Inspections' }
              ].map(brand => (
                <div key={brand.label}>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[9px] font-black text-blue-600/50 uppercase tracking-widest">{brand.label}</p>
                    <p className="text-[10px] font-black text-blue-900 uppercase tracking-tight">{brand.val}</p>
                  </div>
                  <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-2/3 transition-all duration-1000"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border border-zinc-100 rounded-[32px] flex items-center justify-between bg-white shadow-sm">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Active Scout</p>
              <p className="text-sm font-black uppercase text-black">Gemini 3 Pro</p>
            </div>
            <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-xl shadow-zinc-200">
              S3
            </div>
          </div>

          <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[32px]">
             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">Satellite Signal</p>
             <div className="flex items-center gap-3">
               <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-4 rounded-full ${i <= 4 ? 'bg-blue-500' : 'bg-zinc-200'}`}></div>)}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">High Strength</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuiteDashboard;
