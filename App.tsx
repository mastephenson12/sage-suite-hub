
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Reviews from './components/Reviews';
import Leads from './components/Leads';
import Settings from './components/Settings';
import VoiceConcierge from './components/VoiceConcierge';
import { AppView, Review, BrandProfile } from './types';
import { BRANDS, MOCK_DATA } from './constants';
import { Bell, Search, UserCircle, Compass, Radio } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [currentBrand, setCurrentBrand] = useState<BrandProfile>(BRANDS[0]);
  
  const [reviews, setReviews] = useState<Review[]>(MOCK_DATA[currentBrand.id].reviews);
  const [explorers, setExplorers] = useState(MOCK_DATA[currentBrand.id].explorers);
  const [stats, setStats] = useState(MOCK_DATA[currentBrand.id].stats);
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const brandData = MOCK_DATA[currentBrand.id];
    setReviews(brandData.reviews);
    setExplorers(brandData.explorers);
  }, [currentBrand]);

  useEffect(() => {
    const total = reviews.length;
    const currentTotalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = total > 0 ? currentTotalRating / total : MOCK_DATA[currentBrand.id].stats.avgRating;
    const pending = reviews.filter(r => r.status === 'pending').length;
    
    setStats({
        totalReviews: total,
        avgRating: avg,
        activePlanners: MOCK_DATA[currentBrand.id].stats.activePlanners,
        conciergeTasks: pending
    });
  }, [reviews, currentBrand.id]);

  const handleUpdateReview = (updatedReview: Review) => {
    setReviews(prev => prev.map(r => r.id === updatedReview.id ? updatedReview : r));
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard stats={stats} currentBrand={currentBrand} />;
      case AppView.REVIEWS:
        return <Reviews reviews={reviews} onUpdateReview={handleUpdateReview} />;
      case AppView.EXPLORERS:
        return <Leads explorers={explorers} />;
      case AppView.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard stats={stats} currentBrand={currentBrand} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans transition-all duration-500 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        currentBrand={currentBrand}
        onChangeBrand={setCurrentBrand}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 glass dark:glass border-b border-slate-200/60 dark:border-slate-800/60 sticky top-0 z-40 px-8 flex items-center justify-between transition-all">
            <div className="flex items-center space-x-6">
                 <div>
                    <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight capitalize flex items-center">
                        <Compass className="w-5 h-5 mr-2 text-brand-500" />
                        {currentView.toLowerCase().replace('_', ' ')}
                    </h1>
                    <div className="flex items-center mt-0.5 space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {currentBrand.name} Guide • Sage Engine Active
                        </span>
                    </div>
                 </div>
            </div>
           
            <div className="flex items-center space-x-5">
                <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-2.5 w-64 focus-within:w-80 transition-all group shadow-sm">
                    <Search className="w-4 h-4 text-slate-400 mr-3" />
                    <input type="text" placeholder="Find an Explorer..." className="bg-transparent border-none focus:ring-0 text-sm font-bold placeholder-slate-400 w-full" />
                </div>

                <div className="flex items-center space-x-2">
                    <button className="relative p-2.5 text-slate-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/10 rounded-xl transition-all">
                        <Bell className="w-5 h-5" />
                        {stats.conciergeTasks > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
                        )}
                    </button>
                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
                    <button className="flex items-center space-x-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Alex Explorer</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Master Guide</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-indigo-500 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-brand-500/20">
                            AX
                        </div>
                    </button>
                </div>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full">
                {renderView()}
            </div>
        </div>
      </main>

      {/* Premium Voice Widget */}
      <VoiceConcierge />
    </div>
  );
};

export default App;
