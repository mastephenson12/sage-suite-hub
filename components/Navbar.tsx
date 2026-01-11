import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_DATA_URL, BRAND_NAME, SAGESUITE_URL } from '../constants';

const Navbar: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = LOGO_DATA_URL || 'logo.png';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group text-decoration-none">
            {!imgError ? (
              <img 
                src={logoSrc} 
                alt={BRAND_NAME} 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-10 h-10 bg-[#0d47a1] text-white rounded flex items-center justify-center text-[11px] font-black">HT</div>
            )}
            <span className="text-xl font-[900] tracking-tighter uppercase text-black">
              {BRAND_NAME}
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">
            <Link to="/archive" className="hover:text-black transition-colors">Archive</Link>
            <Link to="/trail-guides" className="hover:text-black transition-colors">Trail Guides</Link>
            <Link to="/community" className="hover:text-[#0d47a1] transition-colors flex items-center gap-1.5">
              Community
              <span className="bg-[#0d47a1] text-white text-[8px] px-1.5 py-0.5 rounded animate-pulse font-black">LIVE</span>
            </Link>
            <Link to="/about" className="hover:text-black transition-colors">About</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href={`${SAGESUITE_URL}/login`} className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest hover:text-black hidden sm:block">Sign In</a>
          <a 
            href="https://healthandtravels.com/subscribe" 
            className="bg-[#0d47a1] hover:bg-[#0a3a85] text-white px-6 py-2.5 rounded-md text-[13px] font-black uppercase tracking-wider transition-all shadow-sm"
          >
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
