import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReviewEngine from '../components/ReviewEngine';
import LeadQualifier from '../components/LeadQualifier';
import { MediaLabView } from '../components/MediaLabView';
import { SearchHubView } from '../components/SearchHubView';
import { ChatView } from '../components/ChatView';
import { Sidebar } from '../components/Sidebar';
import { LiveVoiceView } from '../components/LiveVoiceView';
import { BookingView } from '../components/BookingView';

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

const WelcomeOverview = () => (
  <div className="animate-in fade-in duration-700">
    <header className="mb-20">
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-6">Adventure Command Center</p>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">Empire <br/><span className="text-zinc-300">Synchronized.</span></h1>
      <p className="text-lg text-zinc-500 max-w-xl leading-relaxed">
        Bridge the gap between customer reputation and lead management across the SageSuite network.
      </p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {['Flightsage', 'Travelsage', 'Campsage'].map(brand => (
        <div key={brand} className="p-10 border border-zinc-100 rounded-sm hover:border-black transition-all group bg-white hover:shadow-xl hover:shadow-black/5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">{brand}</p>
          <div className="mt-8 pt-8 border-t border-zinc-50 flex items-center text-[9px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black">
            Manage Brand 
            <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SuiteDashboard;
