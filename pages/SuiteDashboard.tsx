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

const WelcomeOverview: React.FC = () => {
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrief = async () => {
      try {
        const prompt = "Briefing: AZ Today. Critical weather, trail hazards, one recovery business. High density, bulleted, authoritative.";
        const res = await geminiService.sendMessage([], prompt);
        setBrief(res.text);
      } catch (e) {
        setBrief("Satellite link unstable. Please check official Forest Service nodes for active fire/weather updates. Local trail protocols (Sedona Shuttles) remain active.");
      } finally {
        setLoading(false);
      }
    };
    fetchBrief();
  }, []);

  return (
    <div className="animate-in fade-in duration-1000 pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Operations Center / Node 01</p>
        </div>
        <h1 className="text-6xl md:text-[110px] font-black tracking-tighter mb-8 leading-[0.8] uppercase">
          Situation <br/><span className="text-zinc-200 italic font-serif normal-case">Room.</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* AI Intelligence Briefing Panel */}
          <section className="bg-zinc-950 p-10 md:p-14 rounded-[56px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-10">
                 <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Live Satellite Intelligence</h3>
               </div>
               {loading ? (
                 <div className="space-y-6">
                   <div className="h-5 bg-white/5 rounded w-3/4 animate-pulse"></div>
                   <div className="h-5 bg-white/5 rounded w-1/2 animate-pulse"></div>
                   <div className="h-32 bg-white/5 rounded w-full animate-pulse"></div>
                 </div>
               ) : (
                 <div className="prose prose-invert prose-sm max-w-none text-zinc-300 font-serif italic text-3xl md:text-4xl leading-[1.2] whitespace-pre-wrap">
                   {brief}
                 </div>
               )}
            </div>
          </section>

          {/* Instant Tactical Nodes (Hardcoded Value) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-zinc-100 rounded-[48px] bg-white hover:border-black transition-all group shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Node: Sedona Red Rocks</p>
              <h4 className="text-2xl font-black uppercase mb-6 tracking-tighter leading-none">Scouting Protocol</h4>
              <ul className="text-xs text-zinc-500 space-y-4 font-medium uppercase tracking-widest leading-relaxed">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 shrink-0"></span>
                  Shuttle Alert: Soldier Pass lot is closed. Shuttle required (Thurs-Sun).
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 shrink-0"></span>
                  Recovery: Visit Sedona Salt Room for post-trek hydration therapy.
                </li>
              </ul>
            </div>
            
            <div className="p-10 border border-zinc-100 rounded-[48px] bg-zinc-50 hover:bg-white hover:border-black transition-all group shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">System: Gear Check</p>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {['3L Bladder', 'Salt Tabs', 'UV Shield', 'GPS Node'].map(item => (
                    <span key={item} className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-600 shadow-sm">{item}</span>
                  ))}
                </div>
                <div className="pt-6 border-t border-zinc-200">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Pro Recommendation</p>
                  <p className="text-sm font-bold uppercase tracking-tight leading-tight">Increase hydration by 25% if scouting above 5,000ft elevation today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Status Sidebar */}
        <div className="space-y-8">
          <div className="bg-blue-50/50 p-10 rounded-[50px] border border-blue-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-800 mb-10">Data Stream Status</h4>
            <div className="space-y-10">
              {[
                { label: 'Flightsage', val: '4 Confirmed' },
                { label: 'Travelsage', val: '12 Active' },
                { label: 'Campsage', val: '8 Inspected' }
              ].map(brand => (
                <div key={brand.label}>
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest">{brand.label}</p>
                    <p className="text-[11px] font-black text-blue-900 uppercase tracking-tight">{brand.val}</p>
                  </div>
                  <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-2/3 transition-all duration-1000"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/suite/chat" className="p-10 border border-zinc-100 rounded-[48px] flex items-center justify-between bg-white shadow-sm hover:border-black transition-all group">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Linked Intel</p>
              <p className="text-xl font-black uppercase text-black">Gemini 3 Pro</p>
            </div>
            <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </Link>

          <div className="p-10 bg-zinc-50 border border-zinc-100 rounded-[48px]">
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Signal Strength</p>
             <div className="flex items-center gap-4">
               <div className="flex gap-1.5 items-end h-8">
                 {[1,2,3,4,5].map(i => <div key={i} className={`w-2 rounded-full ${i <= 4 ? 'bg-blue-500 h-' + (i*2+2) : 'bg-zinc-200 h-2'}`}></div>)}
               </div>
               <span className="text-[11px] font-black uppercase tracking-widest text-zinc-900">84% Sync</span>
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
        <div className="max-w-6xl mx-auto p-8 md:p-16 h-full flex flex-col">
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
