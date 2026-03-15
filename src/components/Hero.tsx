import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_DATA_URL, BRAND_NAME } from '../constants';
import { ArrowRight, Map, Shield, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = LOGO_DATA_URL || 'logo.png';

  return (
    <div className="bg-white pt-24 pb-24 border-b border-zinc-100 overflow-hidden relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80" 
          alt="Arizona" 
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-left relative z-10 animate-fade-in">
        
        <h1 className="text-6xl md:text-[88px] font-[900] text-black mb-12 leading-[0.85] tracking-tighter uppercase">
          Health, Trails, and <br/>Arizona Skies.
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 italic max-w-2xl mx-auto leading-relaxed mb-16 font-medium font-serif">
          Exploring the High Desert’s most breathtaking trails and hidden wellness retreats for the modern explorer.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/chat" 
            className="bg-brand-primary hover:bg-brand-dark text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl shadow-brand-primary/20 active:scale-95 flex items-center justify-center gap-2"
          >
            Ask Portal Scout <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/trail-guides" 
            className="bg-zinc-100 hover:bg-zinc-200 text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all active:scale-95"
          >
            Browse Trail Intel
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-brand-primary/20 transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Map className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-3">Trail Mapping</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Advanced GPS-verified routes through Sedona, Flagstaff, and the Superstition Wilderness.</p>
          </div>
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-brand-primary/20 transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-3">Wellness Protocols</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Curated recovery and performance guides tailored for high-altitude desert environments.</p>
          </div>
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-brand-primary/20 transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-3">Real-time Intel</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Live weather, trail conditions, and scout reports delivered directly to your command center.</p>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center gap-4">
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.4em]">
            Join <span className="text-black">5,241+</span> Pioneers
          </p>
          <div className="flex -space-x-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shadow-md">
                 <img 
                  src={`https://i.pravatar.cc/100?u=${i+10}`} 
                  alt="explorer" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
