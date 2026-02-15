import React, { useState } from 'react';
import { geminiService } from '../services/geminiService.ts';
import { Source } from '../types.ts';

type Step = 'group' | 'duration' | 'intensity' | 'focus' | 'finalizing';

export const BookingView: React.FC = () => {
  const [step, setStep] = useState<Step>('group');
  const [selections, setSelections] = useState({
    group: '',
    duration: '',
    intensity: '',
    focus: ''
  });
  const [plan, setPlan] = useState<{ text: string; sources: Source[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const updateSelection = (key: keyof typeof selections, value: string, nextStep: Step | null) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    if (nextStep) setStep(nextStep);
  };

  const generateAdventure = async () => {
    setIsSearching(true);
    setStep('finalizing');
    try {
      const prompt = `Build a custom Arizona adventure for ${selections.group}. 
      Duration: ${selections.duration}. 
      Intensity Level: ${selections.intensity}. 
      Main Focus: ${selections.focus}.
      
      REQUIREMENTS:
      1. Provide a titled itinerary with clear Day 1, Day 2, etc headers.
      2. Include exact trail names and parking requirements.
      3. MANDATORY: Suggest one specific local wellness business (name and city) for recovery for each day.
      4. Note any current permit or shuttle requirements you find in your search.
      5. Format it like an elite traveler's field guide.`;

      const response = await geminiService.sendMessage([], prompt);
      setPlan({
        text: response.text,
        sources: response.sources || []
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const resetBuilder = () => {
    setPlan(null);
    setStep('group');
    setSelections({ group: '', duration: '', intensity: '', focus: '' });
  };

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col">
      <header className="mb-12">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Health & Travels Lab</p>
        <h2 className="text-3xl font-black tracking-tighter uppercase">Adventure Builder</h2>
      </header>

      {!plan && (
        <div className="bg-zinc-50 p-12 rounded-[40px] border border-zinc-100 flex-grow flex flex-col justify-center items-center text-center shadow-inner overflow-y-auto">
          {step === 'group' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-8 tracking-tighter uppercase">Who is exploring?</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Family & Kids', 'Group of Friends', 'Solo / Couple'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('group', opt, 'duration')}
                    className="px-8 py-6 bg-white border border-zinc-200 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'duration' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-8 tracking-tighter uppercase">How long is the trek?</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Single Day', 'Weekend (3 Days)', 'Full Week'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('duration', opt, 'intensity')}
                    className="px-8 py-6 bg-white border border-zinc-200 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'intensity' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-8 tracking-tighter uppercase">Select Intensity</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Leisurely (Scenic)', 'Moderate (Active)', 'Strenuous (Pro)'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('intensity', opt, 'focus')}
                    className="px-8 py-6 bg-white border border-zinc-200 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'focus' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-8 tracking-tighter uppercase">What is the focus?</h3>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {['Hidden Trails', 'Wellness/Recovery', 'Family Bonding'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelections(prev => ({ ...prev, focus: opt }))}
                    className={`px-8 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-sm active:scale-95 ${selections.focus === opt ? 'bg-black text-white' : 'bg-white border border-zinc-200 hover:bg-zinc-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button 
                onClick={generateAdventure}
                disabled={!selections.focus}
                className="w-full bg-[#0d47a1] text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 transition-all disabled:opacity-30"
              >
                Synthesize Field Guide
              </button>
            </div>
          )}

          {step === 'finalizing' && (
            <div className="animate-pulse">
              <div className="w-16 h-16 border-4 border-zinc-200 border-t-black rounded-full animate-spin mx-auto mb-8"></div>
              <h3 className="text-2xl font-black uppercase tracking-widest">Scout Intel Mapping...</h3>
              <p className="text-zinc-400 text-xs font-bold uppercase mt-4 tracking-widest">Grounding Arizona Nodes via Gemini 3</p>
            </div>
          )}
        </div>
      )}

      {plan && (
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex justify-between items-center bg-zinc-950 p-6 rounded-3xl text-white mb-8">
            <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-black uppercase tracking-widest">Satellite Verified Protocol</p>
            </div>
            <button 
              onClick={resetBuilder}
              className="text-[9px] font-black uppercase border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Start New Protocol
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white p-12 border border-zinc-100 rounded-[48px] shadow-2xl shadow-blue-900/5 prose prose-zinc max-w-none">
                <div className="text-lg text-zinc-800 leading-relaxed font-serif italic whitespace-pre-wrap">
                  {plan.text}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
               <div className="bg-zinc-50 p-8 rounded-[32px] border border-zinc-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Discovery Log</p>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-zinc-500 uppercase">Group</span>
                     <span className="text-[10px] font-black text-black uppercase">{selections.group}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-zinc-500 uppercase">Duration</span>
                     <span className="text-[10px] font-black text-black uppercase">{selections.duration}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-zinc-500 uppercase">Intensity</span>
                     <span className="text-[10px] font-black text-black uppercase">{selections.intensity}</span>
                   </div>
                 </div>
               </div>

               {plan.sources.length > 0 && (
                <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Grounding Nodes</p>
                  <div className="space-y-3">
                    {plan.sources.slice(0, 4).map((source, i) => (
                      <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="block p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:border-black transition-all group overflow-hidden">
                        <p className="text-[10px] font-black uppercase tracking-tight truncate group-hover:text-blue-700">{source.title}</p>
                        <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest truncate">{new URL(source.uri).hostname}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
