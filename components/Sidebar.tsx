import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ViewType } from '../types';
import { BRAND_NAME } from '../constants';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { id: ViewType.OVERVIEW, label: 'Command', path: '/suite', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
    )},
    { id: ViewType.CHAT, label: 'Chat Assistant', path: '/suite/chat', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    )},
    { id: ViewType.SEARCH, label: 'Intelligence', path: '/suite/search', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    )},
    { id: ViewType.MEDIA, label: 'Media Lab', path: '/suite/media', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    )},
    { id: ViewType.REVIEWS, label: 'Reviews', path: '/suite/reviews', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
    )},
    { id: ViewType.LEADS, label: 'Leads', path: '/suite/leads', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    )},
    { id: ViewType.VOICE, label: 'Voice Sage', path: '/chat', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
    )},
  ];

  return (
    <div className="w-64 border-r border-zinc-100 flex flex-col bg-white h-full shrink-0">
      <div className="p-8 border-b border-zinc-100">
        <Link to="/" className="flex items-center space-x-3 mb-8 group">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm group-hover:rotate-90 transition-transform">
            <span className="text-white text-[10px] font-black">S</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{BRAND_NAME} Hub</span>
        </Link>
        
        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
          <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">System Engine</p>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-black uppercase tracking-wider">Gemini 3 Active</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-md transition-all ${
              location.pathname === item.path 
              ? 'bg-zinc-100 text-black shadow-sm font-bold' 
              : 'text-zinc-400 hover:bg-zinc-50 hover:text-black'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-8 border-t border-zinc-100">
        <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em]">Version 2.5.0-PRO</p>
      </div>
    </div>
  );
};
