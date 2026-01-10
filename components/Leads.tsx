
import React, { useState } from 'react';
import { ExplorerWish, AdventureCategory } from '../types';
// Fixed missing icon imports: Users and ChevronRight
import { Compass, Sparkles, MapPin, User, Search, Footprints, Plane, Heart, Star, Tent, Users, ChevronRight } from 'lucide-react';

interface ExplorerHubProps {
  explorers: ExplorerWish[];
}

const Leads: React.FC<ExplorerHubProps> = ({ explorers: initialExplorers }) => {
  const [explorers, setExplorers] = useState(initialExplorers);
  const [isGathering, setIsGathering] = useState(false);

  const handleGatherInput = async () => {
    setIsGathering(true);
    // Simulate gathering input from the Central Hub sync
    setTimeout(() => setIsGathering(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center space-x-2 text-brand-500 mb-2">
                <Users className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Group Directory</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Adventure Explorers</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Family and friends who have shared their wishes for the journey.</p>
        </div>
        <button 
            onClick={handleGatherInput}
            disabled={isGathering}
            className="flex items-center px-8 py-4 bg-brand-600 text-white rounded-2xl text-sm font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 active:scale-[0.98]"
        >
            <Sparkles className={`w-4 h-4 mr-2 ${isGathering ? 'animate-spin' : ''}`} />
            {isGathering ? 'Gathering Wishes...' : 'Gather Group Input'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {explorers.map((explorer) => (
            <div key={explorer.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium hover:shadow-premium-hover border border-white dark:border-slate-800 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                    <Tent className="w-32 h-32 text-brand-500 rotate-12" />
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-slate-100 shadow-inner group-hover:scale-105 transition-transform">
                            <User className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="font-black text-xl text-slate-900 dark:text-slate-100 tracking-tight">{explorer.name}</h4>
                            <div className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                <Compass className="w-3 h-3 mr-1.5" />
                                {explorer.source}
                            </div>
                        </div>
                    </div>
                    <StatusBadge status={explorer.status} />
                </div>

                <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800/50 italic text-slate-600 dark:text-slate-200 text-base leading-relaxed">
                    "{explorer.dream}"
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                    {explorer.vibe?.map(v => (
                        <span key={v} className="px-4 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-full text-[11px] font-black uppercase tracking-wider">
                            {v}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                    <CategoryTag category={explorer.category} />
                    <button className="text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center transition-colors group/btn">
                        Map Itinerary
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        ))}
        
        <button className="border-3 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-12 flex flex-col items-center justify-center group hover:border-brand-300 hover:bg-brand-50/50 dark:hover:bg-brand-900/5 transition-all text-slate-400 hover:text-brand-500">
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-base font-black uppercase tracking-widest">Invite New Explorer</p>
        </button>
      </div>
    </div>
  );
};

const CategoryTag = ({ category }: { category?: AdventureCategory }) => {
    switch (category) {
        case 'Family Trip': return <div className="flex items-center text-xs font-bold text-slate-500"><Heart className="w-4 h-4 mr-2 text-rose-500" /> Family</div>;
        case 'Group Expedition': return <div className="flex items-center text-xs font-bold text-slate-500"><Footprints className="w-4 h-4 mr-2 text-emerald-500" /> Group</div>;
        case 'Luxury Stay': return <div className="flex items-center text-xs font-bold text-slate-500"><Star className="w-4 h-4 mr-2 text-amber-500 fill-current" /> Luxury</div>;
        default: return <div className="flex items-center text-xs font-bold text-slate-500"><Plane className="w-4 h-4 mr-2 text-blue-500" /> Journey</div>;
    }
}

const StatusBadge = ({ status }: { status: ExplorerWish['status'] }) => {
    const colors = {
        'Ready': 'bg-emerald-500',
        'Mapping': 'bg-brand-500 animate-pulse',
        'Dreaming': 'bg-slate-300'
    }
    return (
        <div className="flex flex-col items-end">
             <div className={`w-3 h-3 rounded-full shadow-lg ${colors[status]}`} />
             <span className="text-[9px] font-black uppercase tracking-tighter mt-1 text-slate-400">{status}</span>
        </div>
    );
}

export default Leads;
