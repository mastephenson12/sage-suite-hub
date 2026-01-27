
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_DATA_URL, BRAND_NAME } from '../constants.ts';

// Fix: Using named export to resolve "no default export" error in App.tsx
export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = LOGO_DATA_URL || 'logo.png';

  return (
    <div className="bg-white pt-24 pb-24 border-b border-zinc-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 rounded-full animate-pulse"></div>
            {!imgError ? (
              <img 
                src={logoSrc} 
                alt={BRAND_NAME} 
                className="w-36 h-36 md:w-44 md:h-44 object-contain relative z-10 animate-in fade-in zoom-in duration-1000"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-36 h-36 md:w-44 md:h-44 bg-zinc-950 rounded-[40px] flex items-center justify-center relative z-10 shadow-2xl">
                <span className="text-white font-black text-4xl">H&T</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-100 text-[#0d47a1] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-12 shadow-sm">
          <span className="w-2 h-2 bg-[#0d47a1] rounded-full animate-pulse"></span>
          Fresh Trail Intel Dispatched Tuesday
        </div>
        
        <h1 className="text-6xl md:text-[88px] font-[900] text-black mb-12 leading-[0.85] tracking-tighter uppercase">
          Health, Trails, and <br/>Arizona Skies.
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 italic max-w-2xl mx-auto leading-relaxed mb-16 font-medium font-serif">
          Exploring the High Desert’s most breathtaking trails and hidden wellness retreats for the modern explorer.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/chat" 
            className="bg-[#0d47a1] hover:bg-[#0a3a85] text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
          >
            Ask Portal Scout
          </Link>
          <Link 
            to="/trail-guides" 
            className="bg-zinc-100 hover:bg-zinc-200 text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all active:scale-95"
          >
            Browse Trail Intel
          </Link>
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.4em]">
            Join <span className="text-black">5,241+</span> Pioneers
          </p>
          <div className="flex -space-x-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shadow-md">
                 <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="explorer" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
