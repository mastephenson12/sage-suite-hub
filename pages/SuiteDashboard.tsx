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
    let active = true;
    const fetchBrief = async () => {
      try {
        const prompt = "Briefing: Arizona Scouting Data Today. 1. Critical weather/monsoon hazards. 2. Specific Sedona/PHX trail status. 3. One recovery practitioner recommendation. Bulleted, authoritative journal style.";
        const res = await geminiService.sendMessage([], prompt);
        if (active) setBrief(res.text);
      } catch (e) {
        if (active) setBrief("Satellite link unstable. Please rely on local trail protocols. Sedona Shuttles are currently active for Soldier Pass and Dry Creek. Check official NWS nodes for Phoenix heat alerts.");
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
          <div className="px-3 py-1 bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest rounded-sm shadow-lg shadow-blue-900/20">Node_01 Active</div>
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
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Live Satellite Intelligence</h3>
               </div>
               
               {loading ? (
                 <div className="space-y-6">
                   <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse"></div>
                   <div className="h-32 bg-white/5 rounded w-full animate-pulse"></div>
                 </div>
               ) : (
                 <div className="prose prose-invert max-w-none">
                    <div className="text-xl md:text-3xl font-serif italic text-zinc-300 leading-[1.3] whitespace-pre-wrap">
                      {brief}
                    </div>
                 </div>
               )}
            </div>
          </section>

          {/* Hardcoded Value Cards (Instant Load - High Utility) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-zinc-100 rounded-[48px] bg-white hover:border-black transition-all group shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Node: Sedona Red Rocks</p>
              <h4 className="text-2xl font-black uppercase mb-6 tracking-tighter leading-none">Scouting Protocol</h4>
              <ul className="text-[11px] text-zinc-500 space-y-4 font-bold uppercase tracking-widest leading-relaxed">
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
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Scout Note</p>
                  <p className="text-[11px] font-bold uppercase tracking-tight leading-tight text-zinc-900">Increase hydration by 25% if scouting above 5,000ft elevation today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Status Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-zinc-50 p-10 rounded-[48px] border border-zinc-100">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-10 border-b border-zinc-200 pb-4">System Status</h3>
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">Satellite Link</span>
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[10px] font-black text-zinc-900 uppercase">Synchronized</span>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">Imaging Engine</span>
                 <span className="text-[10px] font-black text-green-600 uppercase">Standby</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">Search Grounding</span>
                 <span className="text-[10px] font-black text-zinc-900 uppercase">Active</span>
               </div>
            </div>
          </section>

          <Link to="/suite/chat" className="block group">
            <div className="p-10 bg-white border border-zinc-100 rounded-[48px] hover:border-black transition-all shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Linked Intel</p>
                <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
              <p className="text-2xl font-black uppercase tracking-tighter">Portal Scout 3.0</p>
              <p className="text-xs text-zinc-500 font-medium mt-2">Tap to issue direct trail commands.</p>
            </div>
          </Link>

          <div className="p-10 bg-blue-50/50 rounded-[48px] border border-blue-100">
             <p className="text-[10px] font-black uppercase tracking-widest text-blue-900/40 mb-6">Recent Node Traffic</p>
             <div className="space-y-4">
                <div className="h-8 bg-blue-100/50 rounded-xl w-full"></div>
                <div className="h-8 bg-blue-100/50 rounded-xl w-2/3"></div>
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
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div className="max-w-6xl mx-auto p-8 md:p-16">
          <Routes>
            <Route path="/" element={<WelcomeOverview />} />
            <Route path="/chat" element={<ChatView />} />
            <Route path="/reviews" element={<ReviewEngine />} />
            <Route path="/media" element={<MediaLabView />} />
            <Route path="/search" element={<SearchHubView />} />
            <Route path="/voice" element={<LiveVoiceView />} />
            <Route path="/booking" element={<BookingView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default SuiteDashboard;
