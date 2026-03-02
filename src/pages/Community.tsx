import React from 'react';
import { Users, MessageCircle, Share2, Award } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20 text-center">
        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6">Community</h1>
        <p className="text-zinc-500 italic font-serif text-xl max-w-2xl mx-auto">Connect with a global network of desert explorers and wellness pioneers.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 mx-auto">
            <Users className="w-8 h-8 text-brand-primary" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">5,241+ Members</h3>
          <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-widest font-bold">Active Scouts</p>
        </div>
        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 mx-auto">
            <MessageCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">12.4k Messages</h3>
          <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-widest font-bold">Daily Intel Exchange</p>
        </div>
        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 mx-auto">
            <Award className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">842 Expeditions</h3>
          <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-widest font-bold">Verified Completions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Live Feed</h2>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[32px] flex gap-6">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex-shrink-0 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i+20}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-black uppercase tracking-tight">Explorer_{i+100}</span>
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">2h ago</span>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">Just finished the Siphon Draw trail. Conditions are dry but windy at the top. Highly recommend early start!</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand-primary transition-colors">
                    <MessageCircle className="w-3 h-3" /> 12
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand-primary transition-colors">
                    <Share2 className="w-3 h-3" /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-primary rounded-[48px] p-12 text-white">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Community Spotlight</h2>
          <div className="aspect-video bg-white/10 rounded-3xl mb-8 overflow-hidden relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80" alt="Spotlight" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-brand-primary border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">The 2026 Grand Canyon Crossing</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-8">Watch the documentary of our latest team expedition across the Bright Angel trail.</p>
          <button className="w-full py-4 bg-white text-brand-primary rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-100 transition-colors">
            Watch Intel Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
