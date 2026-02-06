import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_NAME } from '../constants';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { label: 'Command', path: '/suite' },
    { label: 'Chat', path: '/suite/chat' },
    { label: 'Booking', path: '/suite/booking' },
    { label: 'Search', path: '/suite/search' },
    { label: 'Media Lab', path: '/suite/media' },
    { label: 'Reviews', path: '/suite/reviews' },
    { label: 'Voice', path: '/suite/voice' },
  ];

  return (
    <div className="w-64 border-r border-zinc-100 flex flex-col bg-white h-full shrink-0">
      <div className="p-8 border-b border-zinc-100">
        <Link to="/" className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
            <span className="text-white text-[10px] font-black">S</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{BRAND_NAME} Hub</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-md transition-all ${
              location.pathname === item.path 
              ? 'bg-zinc-100 text-black shadow-sm font-bold' 
              : 'text-zinc-400 hover:bg-zinc-50 hover:text-black'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
