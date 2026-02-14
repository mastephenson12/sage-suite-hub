import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, BEEHIIV_URL, LOGO_DATA_URL } from '../constants.ts';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 py-3">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden group-hover:scale-110 transition-transform">
              <img src={LOGO_DATA_URL} alt={BRAND_NAME} className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-[900] tracking-tighter uppercase text-black hidden sm:block">
              {BRAND_NAME}
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">
            <Link to="/archive" className="hover:text-black transition-colors">Archive</Link>
            <Link to="/trail-guides" className="hover:text-black transition-colors">Trail Guides</Link>
            <Link to="/community" className="hover:text-brand-primary transition-colors">Community</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/chat" className="hidden md:block bg-zinc-50 text-zinc-800 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border border-zinc-200 hover:bg-zinc-100 transition-colors">Portal Scout</Link>
          <a 
            href={BEEHIIV_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-primary hover:bg-brand-dark text-white px-6 py-2.5 rounded-lg text-[13px] font-black uppercase tracking-wider transition-all shadow-lg shadow-brand-primary/10 active:scale-95"
          >
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
