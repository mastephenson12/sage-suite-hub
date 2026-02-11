import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_NAME, LOGO_DATA_URL } from '../constants.ts';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { label: 'Command', path: '/suite' },
    { label: 'Chat Intel', path: '/suite/chat' },
    { label: 'Booking', path: '/suite/booking' },
    { label: 'Factual Search', path: '/suite/search' },
    { label: 'Media Lab', path: '/suite/media' },
    { label: 'Review Engine', path: '/suite/reviews' },
    { label: 'Live Voice', path: '/suite/voice' },
  ];

  return (
    <div className="w-64 border-r border-zinc-100 flex flex-col bg-white h-full shrink-0 ue-sidebar-container">
      <div className="p-8 border-b border-zinc-100">
        <Link to="/" className="flex items-center space-x-3 mb-4 group">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm overflow-hidden group-hover:scale-110 transition-transform">
            <img src={LOGO_DATA_URL} alt={BRAND_NAME} className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{BRAND_NAME} Hub</span>
        </Link>
        <div className="flex items-center gap-1.5 mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Node Secure</span>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-6">Operations</p>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
              ? 'bg-zinc-950 text-white shadow-xl shadow-zinc-900/10 font-bold' 
              : 'text-zinc-400 hover:bg-zinc-50 hover:text-black'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-zinc-50">
        <div className="bg-zinc-50 p-4 rounded-xl">
           <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Satellite Link</p>
           <p className="text-[9px] font-bold text-zinc-800 uppercase tracking-tight">Gemini 3 Pro Active</p>
        </div>
      </div>
    </div>
  );
};
