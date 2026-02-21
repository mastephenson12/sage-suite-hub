import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Source } from '../types';

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
      const prompt = `Act as 'Scout'. Build a professional field guide and itinerary for Arizona exploration.
      Target Group: ${selections.group}. 
      Duration: ${selections.duration}. 
      Pace: ${selections.intensity}. 
      Priority: ${selections.focus}.
      
      STRUCTURE YOUR RESPONSE:
      1. TITLE: Give it a professional scouting mission name.
      2. THE TREK: Provide 1-3 specific Arizona trail names. Include parking lot details and permit requirements.
      3. THE RECOVERY: Suggest one specific local wellness business (Name & City) for post-hike recovery.
      4. SCOUT NOTES: Provide 3 high-density pro tips specifically for ${selections.group}.
      
      MANDATORY: Use googleSearch to check for current weather and closures.`;

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
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Adventure Command</p>
        <h2 className="text-4xl font-black tracking-tighter uppercase">Adventure Builder</h2>
      </header>

      {!plan && (
        <div className="bg-zinc-50 p-12 rounded-[40px] border border-zinc-100 flex-grow flex flex-col justify-center items-center text-center shadow-inner overflow-y-auto">
          {step === 'group' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-10 tracking-tighter uppercase">Who is exploring?</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Family with Kids', 'Group of Friends', 'Solo / Couple'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('group', opt, 'duration')}
                    className="px-8 py-7 bg-white border-2 border-transparent hover:border-black rounded-[24px] font-black uppercase tracking-widest text-[11px] transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'duration' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-10 tracking-tighter uppercase">Timeframe?</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Single Day Trip', 'Weekend (3 Days)', 'Full Week Adventure'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('duration', opt, 'intensity')}
                    className="px-8 py-7 bg-white border-2 border-transparent hover:border-black rounded-[24px] font-black uppercase tracking-widest text-[11px] transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'intensity' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-10 tracking-tighter uppercase">Set the Pace</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Leisurely (Scenic)', 'Moderate (Active)', 'Strenuous (Extreme)'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('intensity', opt, 'focus')}
                    className="px-8 py-7 bg-white border-2 border-transparent hover:border-black rounded-[24px] font-black uppercase tracking-widest text-[11px] transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'focus' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-4xl font-black mb-10 tracking-tighter uppercase">Main Priority</h3>
              <div className="grid grid-cols-1 gap-4 mb-10">
                {['Hidden Trails', 'Wellness & Spas', 'Photography Nodes'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelections(prev => ({ ...prev, focus: opt }))}
                    className={`px-8 py-7 rounded-[24px] font-black uppercase tracking-widest text-[11px] transition-all shadow-sm active:scale-95 ${selections.focus === opt ? 'bg-black text-white border-black' : 'bg-white border-2 border-transparent hover:border-zinc-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button 
                onClick={generateAdventure}
                disabled={!selections.focus}
                className="w-full bg-blue-700 text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-blue-800 transition-all disabled:opacity-20"
              >
                Assemble Field Guide
              </button>
            </div>
          )}

          {step === 'finalizing' && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-zinc-100 border-t-blue-700 rounded-full animate-spin mb-8"></div>
              <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Grounding Arizona Data...</h3>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Syncing with Sentinel-2 Satellite & Local News Nodes</p>
            </div>
          )}
        </div>
      )}

      {plan && (
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-12">
          <div className="flex justify-between items-center bg-zinc-950 p-8 rounded-[40px] text-white">
            <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Vetted Scouting Protocol</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{selections.group} • {selections.duration}</p>
                </div>
            </div>
            <button 
              onClick={resetBuilder}
              className="text-[9px] font-black uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Start New Protocol
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white p-12 border border-zinc-100 rounded-[48px] shadow-2xl shadow-blue-900/5">
                <div className="text-xl text-zinc-800 leading-relaxed font-serif italic whitespace-pre-wrap">
                  {plan.text}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
               <div className="bg-zinc-50 p-8 rounded-[32px] border border-zinc-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 border-b border-zinc-200 pb-2">Scout Log</p>
                 <div className="space-y-6">
                   <div>
                     <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Target Group</p>
                     <p className="text-[11px] font-black text-black uppercase">{selections.group}</p>
                   </div>
                   <div>
                     <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Pace Node</p>
                     <p className="text-[11px] font-black text-black uppercase">{selections.intensity}</p>
                   </div>
                 </div>
               </div>

               {plan.sources.length > 0 && (
                <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Grounding Links</p>
                  <div className="space-y-3">
                    {plan.sources.map((source, i) => (
                      <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="block p-4 bg-zinc-50 border border-zinc-100 rounded-2xl hover:border-black transition-all group overflow-hidden">
                        <p className="text-[10px] font-black uppercase tracking-tight truncate group-hover:text-blue-700 mb-1">{source.title}</p>
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
      )}
    </div>
  );
};
