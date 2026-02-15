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
      1. Provide a titled, professional itinerary.
      2. For families: focus on accessibility and safety. For groups: focus on scenic intensity and dining proximity.
      3. Include exact trail names and parking requirements.
      4. MANDATORY: Suggest one local wellness recovery center (e.g. sauna, massage) for each major trek.
      5. Format it like a premium travel journal entry.`;

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
              <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase">Who is exploring?</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Family with Kids', 'Group of Friends', 'Solo / Couple'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('group', opt, 'duration')}
                    className="px-8 py-6 bg-white border border-zinc-200 rounded-3xl font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'duration' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase">How long is the trek?</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Single Day', 'Weekend (3 Days)', 'Full Week Adventure'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('duration', opt, 'intensity')}
                    className="px-8 py-6 bg-white border border-zinc-200 rounded-3xl font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'intensity' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase">Intensity Level</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Leisurely (Scenic)', 'Moderate (Active)', 'Strenuous (Pro)'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateSelection('intensity', opt, 'focus')}
                    className="px-8 py-6 bg-white border border-zinc-200 rounded-3xl font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'focus' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md w-full">
              <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase">Adventure Focus</h3>
              <div className="grid grid-cols-1 gap-4 mb-10">
                {['Hidden Trails', 'Wellness & Recovery', 'Photo Ops & Vistas'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelections(prev => ({ ...prev, focus: opt }))}
                    className={`px-8 py-6 rounded-3xl font-black uppercase tracking-widest text-[11px] transition-all shadow-sm active:scale-95 ${selections.focus === opt ? 'bg-black text-white' : 'bg-white border border-zinc-200 hover:bg-zinc-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button 
                onClick={generateAdventure}
                disabled={!selections.focus}
                className="w-full bg-[#0d47a1] text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 transition-all disabled:opacity-30"
              >
                Synthesize Itinerary
              </button>
            </div>
          )}

          {step === 'finalizing' && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-zinc-100 border-t-blue-600 rounded-full animate-spin mb-8"></div>
              <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Scout Mapping Active...</h3>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Grounding Arizona trail nodes via satellite link</p>
            </div>
          )}
        </div>
      )}

      {plan && (
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex justify-between items-center bg-zinc-950 p-8 rounded-[40px] text-white">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Custom Protocol Verified</p>
              </div>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Adventure for: {selections.group} • {selections.duration}</p>
            </div>
            <button 
              onClick={resetBuilder}
              className="text-[9px] font-black uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Start New Builder
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
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 underline decoration-blue-500/30 underline-offset-4">Builder Log</p>
                 <div className="space-y-6">
                   <div>
                     <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Explorer Group</p>
                     <p className="text-[11px] font-black text-black uppercase">{selections.group}</p>
                   </div>
                   <div>
                     <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Duration</p>
                     <p className="text-[11px] font-black text-black uppercase">{selections.duration}</p>
                   </div>
                   <div>
                     <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Pace</p>
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
