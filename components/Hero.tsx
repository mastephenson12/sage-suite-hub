
import React, { useState } from 'react';
import { LOGO_DATA_URL, BRAND_NAME } from '../constants';

const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = LOGO_DATA_URL || 'logo.png';

  return (
    <div className="bg-white pt-24 pb-24 border-b border-gray-100 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-10 rounded-full"></div>
            {!imgError ? (
              <img 
                src={logoSrc} 
                alt={BRAND_NAME} 
                className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 animate-in fade-in zoom-in duration-700"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-900 rounded-3xl flex items-center justify-center relative z-10">
                <span className="text-zinc-700 font-black text-4xl">LOGO</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-blue-50 border border-blue-100 text-[#0d47a1] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-10">
          <span className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-pulse"></span>
          Fresh Trail Reports Every Tuesday
        </div>
        
        <h1 className="text-6xl md:text-[84px] font-[900] text-black mb-10 leading-[0.9] tracking-tighter">
          Health, Trails, and <br/>Arizona Skies.
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 serif-text max-w-2xl mx-auto leading-relaxed mb-14 font-medium italic">
          Exploring the High Desert’s most breathtaking trails and hidden wellness retreats with family and friends.
        </p>
        
        <div className="max-w-xl mx-auto">
          <form 
            className="flex flex-col sm:flex-row gap-3 p-1.5 bg-zinc-50 border border-zinc-200 rounded-xl"
            onSubmit={(e) => { e.preventDefault(); window.location.href = 'https://healthandtravels.com/subscribe'; }}
          >
            <input 
              type="email" 
              placeholder="Type your email..." 
              className="flex-1 px-5 py-4 bg-transparent outline-none text-black font-semibold text-base placeholder:text-zinc-400"
              required
            />
            <button className="bg-[#0d47a1] hover:bg-[#0a3a85] text-white px-10 py-4 rounded-lg font-black text-sm uppercase tracking-widest transition-all">
              Subscribe
            </button>
          </form>
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
              Join <span className="text-black">5,241+</span> explorers finding their path.
            </p>
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden shadow-sm">
                   <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
