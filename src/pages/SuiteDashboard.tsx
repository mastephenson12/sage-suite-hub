import React from 'react';
import { LayoutGrid, Search, Mic, Video, Image as ImageIcon, Settings, LogOut, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuiteDashboard: React.FC = () => {
  const tools = [
    { name: 'Search Grounding', icon: Search, color: 'bg-blue-500', desc: 'Real-time web verification' },
    { name: 'Voice Concierge', icon: Mic, color: 'bg-emerald-500', desc: 'Natural language processing' },
    { name: 'Media Lab', icon: Video, color: 'bg-purple-500', desc: 'Video & image generation' },
    { name: 'Review Engine', icon: LayoutGrid, color: 'bg-orange-500', desc: 'Automated content analysis' },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-brand-primary rounded-lg"></div>
          <span className="font-black uppercase tracking-widest text-xs">Sage Suite</span>
        </div>

        <nav className="flex-grow space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest">
            <LayoutGrid className="w-4 h-4" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
            <Search className="w-4 h-4" /> Intelligence
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
            <ImageIcon className="w-4 h-4" /> Assets
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
            <Settings className="w-4 h-4" /> Config
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
            <LogOut className="w-4 h-4" /> Exit Suite
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Command Center</h1>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">System Status: Operational • Node 3.1</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest">Admin Explorer</p>
                <p className="text-[8px] text-zinc-500 font-medium uppercase tracking-wider">Level 4 Clearance</p>
              </div>
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-zinc-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Sessions', val: '12' },
            { label: 'API Calls (24h)', val: '1,242' },
            { label: 'Storage Used', val: '4.2GB' },
            { label: 'Uptime', val: '99.9%' },
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-2xl font-black">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">Intelligence Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <button key={i} className="group bg-zinc-900 border border-zinc-800 p-8 rounded-[32px] text-left hover:border-brand-primary/50 transition-all hover:bg-zinc-800/50">
              <div className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-2">{tool.name}</h3>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider leading-relaxed">{tool.desc}</p>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">Recent Operations</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] overflow-hidden">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="px-8 py-6 border-b border-zinc-800 last:border-0 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Image Generation Complete</p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-1">Prompt: "Arizona sunset over Sedona red rocks..."</p>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">2m ago</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuiteDashboard;
