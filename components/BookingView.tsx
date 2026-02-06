import React, { useState } from 'react';
import { geminiService } from '../services/gemini';
import { Source } from '../types';

export const BookingView: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [suggestions, setSuggestions] = useState<{ text: string; sources: Source[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handlePlan = async () => {
    if (!goal.trim() || isSearching) return;
    setIsSearching(true);
    try {
      const response = await geminiService.sendMessage([], `Plan a 3-day wellness and adventure trip in Arizona for someone interested in: ${goal}. Focus on booking flights, high-end retreats, and specific health-focused trails. Provide links where possible.`);
      setSuggestions({
        text: response.text,
        sources: response.sources || []
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col">
      <header className="mb-12">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Travel Intelligence</p>
        <h2 className="text-3xl font-black tracking-tighter uppercase">Booking Engine</h2>
      </header>

      <div className="bg-zinc-50 p-12 rounded-[32px] mb-12 border border-zinc-100">
        <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Define Your Protocol</h3>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., Altitude training in Flagstaff with spa recovery, or Sedona red rock healing with boutique hotel stay..."
          className="w-full bg-transparent text-2xl font-medium text-black placeholder-zinc-300 border-b border-zinc-200 focus:border-black focus:outline-none resize-none h-32 mb-8 leading-snug"
        />
        <button
          onClick={handlePlan}
          disabled={!goal.trim() || isSearching}
          className="bg-black text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-brand-primary transition-all disabled:opacity-20"
        >
          {isSearching ? 'Synchronizing Itinerary...' : 'Generate Itinerary'}
        </button>
      </div>

      {suggestions && (
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-6">Sage Recommended Route</p>
            <div className="text-lg text-zinc-800 leading-relaxed font-serif italic whitespace-pre-wrap bg-white p-10 border border-zinc-100 rounded-[32px] shadow-sm">
              {suggestions.text}
            </div>
          </div>

          {suggestions.sources.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Vetted Booking Nodes</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestions.sources.map((source, i) => (
                  <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="p-6 bg-zinc-50 border border-zinc-100 rounded-xl hover:border-black transition-all group flex justify-between items-center">
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight truncate max-w-[200px]">{source.title}</p>
                      <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest truncate max-w-[200px]">{new URL(source.uri).hostname}</p>
                    </div>
                    <svg className="w-4 h-4 text-zinc-300 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!suggestions && !isSearching && (
        <div className="flex-1 flex flex-col items-center justify-center opacity-20 py-20 border-2 border-dashed border-zinc-100 rounded-[32px]">
          <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Travel Query</p>
        </div>
      )}
    </div>
  );
};
