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

const WelcomeOverview: React.FC = () => {
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrief = async () => {
      try {
        const prompt = "Provide a high-density intelligence briefing for Arizona explorers TODAY. 1. Critical Weather hazards. 2. Specific Trail Status (Sedona focusing on shuttles). 3. One recovery business recommendation. Keep it bulleted and authoritative.";
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Satellite Briefing */}
          <section className="bg-zinc-950 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
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

          {/* Expert Intel Nodes (Static, Instant) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-zinc-100 rounded-[32px] bg-white hover:border-black transition-all group">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Regional Node: Sedona</p>
              <h4 className="text-xl font-black uppercase mb-4 tracking-tighter">Red Rock Protocol</h4>
              <ul className="text-[11px] text-zinc-500 space-y-3 font-medium uppercase tracking-widest">
                <li className="flex items-start gap-3"><span className="w-1 h-1 bg-black rounded-full mt-1.5 shrink-0"></span> Red Rock Pass required for all trailheads.</li>
                <li className="flex items-start gap-3"><span className="w-1 h-1 bg-black rounded-full mt-1.5 shrink-0"></span> Shuttle Mandatory: Thurs-Sun (Soldier Pass/Cathedral).</li>
                <li className="flex items-start gap-3"><span className="w-1 h-1 bg-black rounded-full mt-1.5 shrink-0"></span> High-vibe Recovery: Visit "Sedona Salt Room" post-trek.</li>
              </ul>
            </div>
            <div className="p-8 border border-zinc-100 rounded-[32px] bg-zinc-50 hover:bg-white hover:border-black transition-all group">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Expert Gear Check</p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['UV-50 Layer', '3L Bladder', 'Salt Tabs', 'Offline Maps'].map(item => (
                    <span key={item} className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-600 shadow-sm">{item}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-zinc-200">
                  <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Scout Recommends</p>
                  <p className="text-xs font-bold uppercase tracking-tight leading-tight">Always scale your hydration +30% for high-desert summer trekking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Stats */}
        <div className="space-y-6">
          <div className="bg-blue-50/50 p-8 rounded-[40px] border border-blue-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-800 mb-8">Active Data Streams</h4>
            <div className="space-y-8">
              {[
                { label: 'Flightsage', val: '4 Confirmed' },
                { label: 'Travelsage', val: '12 Active Paths' },
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

          <div className="p-8 border border-zinc-100 rounded-[32px] flex items-center justify-between bg-white shadow-sm hover:border-black transition-all cursor-default">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Active Scout</p>
              <p className="text-sm font-black uppercase text-black">Gemini 3 Pro</p>
            </div>
            <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-lg shadow-zinc-200">
              S3
            </div>
          </div>

          <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[32px]">
             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">Satellite Signal</p>
             <div className="flex items-center gap-3">
               <div className="flex gap-1.5">
                 {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-4 rounded-full ${i <= 4 ? 'bg-blue-500' : 'bg-zinc-200'}`}></div>)}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">84% Strength</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default SuiteDashboard;
