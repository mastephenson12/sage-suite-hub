import React, { useState, useRef, useEffect } from 'react';
import { AppView, BrandProfile } from '../types';
import { LayoutDashboard, Heart, Users, Settings as SettingsIcon, Zap, Moon, Sun, ChevronsUpDown, Check, ChevronRight } from 'lucide-react';
import { BRANDS } from '../constants';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentBrand: BrandProfile;
  onChangeBrand: (brand: BrandProfile) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isDarkMode, toggleDarkMode, currentBrand, onChangeBrand }) => {
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.REVIEWS, label: 'Stories', icon: Heart },
    { id: AppView.EXPLORERS, label: 'Explorers', icon: Users },
    { id: AppView.SETTINGS, label: 'Settings', icon: SettingsIcon },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrandMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-20 lg:w-72 bg-slate-950 text-slate-400 flex flex-col h-screen sticky top-0 transition-all duration-500 z-50 border-r border-slate-900">
      {/* Brand Switcher Area */}
      <div className="p-6">
         <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsBrandMenuOpen(!isBrandMenuOpen)}
                className="w-full flex items-center p-2.5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 transition-all border border-slate-800/50 group"
            >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${currentBrand.color} flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/40 text-white font-extrabold text-lg`}>
                   {currentBrand.initials}
                </div>
                <div className="hidden lg:block ml-3.5 text-left flex-1">
                    <h2 className="text-[15px] font-bold text-slate-100 tracking-tight leading-tight group-hover:text-brand-400">{currentBrand.name}</h2>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">{currentBrand.plan}</p>
                </div>
                <ChevronsUpDown className="hidden lg:block w-4 h-4 text-slate-600 group-hover:text-slate-400" />
            </button>

            {/* Premium Dropdown */}
            {isBrandMenuOpen && (
                <div className="absolute top-full left-0 w-72 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mt-3 animate-in fade-in slide-in-from-top-2 duration-300 z-[100]">
                    <div className="p-3 space-y-1.5">
                        <div className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Select Journey</div>
                        {BRANDS.map(brand => (
                            <button
                                key={brand.id}
                                onClick={() => {
                                    onChangeBrand(brand);
                                    setIsBrandMenuOpen(false);
                                }}
                                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${brand.id === currentBrand.id ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}
                            >
                                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${brand.color} flex items-center justify-center text-[10px] font-extrabold text-white mr-3.5 shadow-sm`}>
                                    {brand.initials}
                                </div>
                                <span className="flex-1 text-left">{brand.name}</span>
                                {brand.id === currentBrand.id && <Check className="w-4 h-4 text-brand-400" />}
                            </button>
                        ))}
                    </div>
                    <div className="border-t border-slate-800 p-3 bg-slate-950/50">
                         <button className="w-full flex items-center px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                            <Zap className="w-3.5 h-3.5 mr-2.5 text-amber-500" />
                            Global Adventure Settings
                         </button>
                    </div>
                </div>
            )}
         </div>
      </div>

      <div className="px-6 py-4">
        <div className="text-[10px] font-extrabold text-slate-600 uppercase tracking-[0.2em] mb-4 ml-2">Exploration</div>
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/30' 
                    : 'hover:bg-slate-900 hover:text-slate-100'
                  }`}
              >
                <item.icon className={`w-[18px] h-[18px] lg:mr-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className={`hidden lg:block text-[14px] font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}`}>
                  {item.label}
                </span>
                {isActive && <ChevronRight className="hidden lg:block ml-auto w-3.5 h-3.5 opacity-50" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800/50 hidden lg:block">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-[10px] font-bold text-brand-400">Ready</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full w-[82%]" />
            </div>
        </div>
        
        <button 
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all group"
        >
            <div className="p-1.5 bg-slate-900 rounded-lg mr-3 group-hover:bg-slate-800 transition-colors">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </div>
            <span className="hidden lg:block text-xs font-bold tracking-wider uppercase">{isDarkMode ? 'Day' : 'Night'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
