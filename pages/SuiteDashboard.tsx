import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReviewEngine from '../components/ReviewEngine';
import LeadQualifier from '../components/LeadQualifier';
import { MediaLabView } from '../components/MediaLabView';
import { SearchHubView } from '../components/SearchHubView';
import { ChatView } from '../components/ChatView';
import { Sidebar } from '../components/Sidebar';
import { geminiService } from '../services/gemini';

const SuiteDashboard: React.FC = () => {
  const isSatelliteLinked = !!geminiService.getClient();

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        {!isSatelliteLinked && (
          <div className="bg-orange-50 border-b border-orange-100 px-12 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-white px-2 py-0.5 rounded shadow-sm border border-orange-200">Local Mode</span>
              <p className="text-[11px] font-bold text-orange-800 uppercase tracking-tight">API Satellite Link Not Configured.</p>
            </div>
            <a href="https://aistudio.google.com/" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-orange-600 underline hover:text-orange-800">Get Key</a>
          </div>
        )}
        <div className="max-w-6xl mx-auto p-12 h-full flex flex-col">
          <Routes>
            <Route path="/" element={<WelcomeOverview />} />
            <Route path="/chat" element={<ChatView />} />
            <Route path="/reviews" element={<ReviewEngine />} />
            <Route path="/leads" element={<LeadQualifier />} />
            <Route path="/media" element={<MediaLabView />} />
            <Route path="/search" element={<SearchHubView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const WelcomeOverview = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <header className="mb-20">
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-6">Adventure Command Center</p>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">Empire <br/><span className="text-zinc-300">Synchronized.</span></h1>
      <p className="text-lg text-zinc-500 max-w-xl leading-relaxed">
        Bridge the gap between customer reputation and lead management. Manage Flightsage, Travelsage, and Campsage from a single, AI-enhanced hub.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: 'Flightsage', desc: 'Global reunions and airfare management.' },
        { name: 'Travelsage', desc: 'Luxury stays and permanent residence booking.' },
        { name: 'Campsage', desc: 'Primitive sites and wilderness memories.' }
      ].map(brand => (
        <div key={brand.name} className="p-10 border border-zinc-100 rounded-sm hover:border-black transition-all group cursor-pointer bg-white hover:shadow-xl hover:shadow-black/5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 group-hover:text-black transition-colors">{brand.name}</p>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">{brand.desc}</p>
          <div className="mt-8 pt-8 border-t border-zinc-50 flex items-center text-[9px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black transition-colors">
            Manage Brand 
            <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SuiteDashboard;
