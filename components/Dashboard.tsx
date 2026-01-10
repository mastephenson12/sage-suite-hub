
import React from 'react';
import { Stats, BrandProfile } from '../types';
import { Compass, Heart, Users, Calendar, Sparkles, Map, ArrowRight, Mountain, Sunrise, Tent, Camera, Plane, Building2, Ticket, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  stats: Stats;
  currentBrand: BrandProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, currentBrand }) => {
  // Brand specific context
  const getContextInfo = () => {
    switch(currentBrand.id) {
        case 'campsage': return { unit: 'Campsites', focus: 'Park Fees & Sites', icon: <Tent className="w-5 h-5" /> };
        case 'travelsage': return { unit: 'Residences', focus: 'Stays & Lodging', icon: <Building2 className="w-5 h-5" /> };
        case 'flightsage': return { unit: 'Routes', focus: 'Reunions & Airfare', icon: <Plane className="w-5 h-5" /> };
        default: return { unit: 'Journeys', focus: 'Travel Planning', icon: <Compass className="w-5 h-5" /> };
    }
  };

  const context = getContextInfo();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero Experience Section */}
      <div className="relative h-[320px] rounded-[3rem] overflow-hidden shadow-2xl group">
         <img 
            src={currentBrand.heroImage} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt="Adventure Hero" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
         <div className="absolute bottom-0 left-0 p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
                <div className="flex items-center space-x-2 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-[11px] font-extrabold uppercase tracking-[0.2em] border border-white/30">
                        {currentBrand.name} {context.focus}
                    </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight drop-shadow-md">
                    {currentBrand.tagline}
                </h2>
                <p className="text-slate-100 mt-4 text-xl font-medium opacity-95 max-w-lg leading-relaxed">
                    Managing <span className="text-white font-bold">{stats.activePlanners} {context.unit}</span> for your travelers this week.
                </p>
            </div>
            <button className="px-10 py-5 bg-white text-slate-950 rounded-[2rem] font-black text-sm shadow-2xl hover:scale-105 transition-all flex items-center group/btn active:scale-95">
                Manage {context.unit}
                <Compass className="ml-3 w-5 h-5 transition-transform group-hover/btn:rotate-45 text-brand-500" />
            </button>
         </div>
      </div>

      {/* Journey Momentum */}
      <div className="bg-white dark:bg-slate-900/40 p-10 rounded-[3rem] shadow-premium border border-white dark:border-slate-800 overflow-hidden relative">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{currentBrand.name} Momentum</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">Operational flow for {context.focus.toLowerCase()}</p>
            </div>
            <div className="flex space-x-2">
                <div className="px-4 py-2 rounded-2xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-widest">Global Engine</div>
            </div>
          </div>

          <div className="relative py-12 px-4">
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-400 via-indigo-500 to-rose-400 w-[75%] shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
              </div>

              <div className="relative flex justify-between items-center">
                  <PathNode icon={context.icon} label="Inquiry" active={true} />
                  <PathNode icon={<Ticket className="w-5 h-5" />} label="Booking" active={true} />
                  <PathNode icon={<Building2 className="w-5 h-5" />} label="Check-In" active={true} />
                  <PathNode icon={<Heart className="w-5 h-5" />} label="Success" active={true} />
                  <PathNode icon={<Camera className="w-5 h-5" />} label="Review" active={false} />
              </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Inventory Alert</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {currentBrand.id === 'campsage' ? 'Peak season fees applied to all primitive sites.' : 
                     currentBrand.id === 'flightsage' ? 'High demand for family reunion routes this weekend.' : 
                     'Premium suite availability is currently at 95% occupancy.'}
                  </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Platform Sync</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">All {context.focus.toLowerCase()} data is synced with your Central Hub.</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">AI Insights</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Customers are asking for more {currentBrand.id === 'campsage' ? 'firewood' : currentBrand.id === 'flightsage' ? 'pet friendly' : 'early check-in'} options.</p>
              </div>
          </div>
      </div>

      {/* Experience Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Total Stories" 
          value={stats.totalReviews.toLocaleString()} 
          icon={<Heart className="w-6 h-6 text-rose-500 fill-current" />} 
          subtitle="Customer Experiences"
          color="rose"
        />
        <StatCard 
          title="Brand Trust" 
          value={stats.avgRating.toFixed(1)} 
          icon={<Sparkles className="w-6 h-6 text-amber-500" />} 
          subtitle="Global Star Rating"
          color="amber"
        />
        <StatCard 
          title="Active Planners" 
          value={stats.activePlanners.toLocaleString()} 
          icon={<Users className="w-6 h-6 text-brand-500" />} 
          subtitle={`Current ${context.unit}`}
          color="brand"
        />
        <StatCard 
          title="Central Tasks" 
          value={stats.conciergeTasks.toString()} 
          icon={<Calendar className="w-6 h-6 text-emerald-500" />} 
          subtitle="Pending Actions"
          color="emerald"
        />
      </div>

      {/* AI Concierge Card */}
      <div className="bg-gradient-to-br from-slate-900 to-brand-950 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group border border-white/5">
          <Sparkles className="absolute -top-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-1000" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                  <h3 className="text-3xl font-black tracking-tight mb-4">AI {currentBrand.name} Concierge</h3>
                  <p className="text-brand-100 text-lg font-medium opacity-80 leading-relaxed mb-8">
                      {currentBrand.id === 'campsage' ? '"Travelers are asking about off-grid park fees. I can help clarify these costs in your review replies."' : 
                       currentBrand.id === 'flightsage' ? '"Reunion flight season is starting. I have drafted templates for family group booking inquiries."' : 
                       '"I have analyzed the feedback for your permanent suites; guests love the new luxury linen options."'}
                  </p>
                  <div className="flex flex-wrap gap-4">
                      <div className="px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center">
                          <Ticket className="w-4 h-4 mr-3 text-brand-400" />
                          <span className="text-sm font-bold">Review Requests</span>
                      </div>
                      <div className="px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center">
                          <Heart className="w-4 h-4 mr-3 text-rose-400" />
                          <span className="text-sm font-bold">Manage Feedback</span>
                      </div>
                  </div>
              </div>
              <div className="relative w-full lg:w-72 h-72 flex items-center justify-center">
                  <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="w-48 h-48 bg-gradient-to-br from-brand-400 to-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10 animate-bounce-slow">
                      {currentBrand.id === 'flightsage' ? <Plane className="w-20 h-20 text-white" /> : 
                       currentBrand.id === 'travelsage' ? <Building2 className="w-20 h-20 text-white" /> : 
                       <Tent className="w-20 h-20 text-white" />}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const PathNode = ({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) => (
    <div className="flex flex-col items-center group">
        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 z-10 shadow-xl
            ${active 
                ? 'bg-white text-brand-600 scale-110 ring-4 ring-brand-500/20' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-80'}`}
        >
            {icon}
        </div>
        <span className={`mt-4 text-[11px] font-black uppercase tracking-widest transition-colors
            ${active ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
            {label}
        </span>
    </div>
);

const StatCard = ({ title, value, icon, subtitle, color }: { title: string; value: string; icon: React.ReactNode; subtitle: string; color: string }) => (
  <div className="bg-white dark:bg-slate-900/40 p-10 rounded-[2.5rem] shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all border border-white dark:border-slate-800 group">
    <div className="flex items-center space-x-5 mb-6">
        <div className={`p-4 bg-${color}-500/10 dark:bg-${color}-500/20 rounded-2xl group-hover:rotate-12 transition-all`}>
            {icon}
        </div>
        <p className="text-[13px] font-black text-slate-400 uppercase tracking-[0.15em]">{title}</p>
    </div>
    <div>
      <h3 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tightest leading-none mb-2">
        {value}
      </h3>
      <p className="text-xs font-bold text-slate-400 tracking-tight">{subtitle}</p>
    </div>
  </div>
);

export default Dashboard;
