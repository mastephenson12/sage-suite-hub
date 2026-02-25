import React from 'react';
import { Calendar, Search, Filter } from 'lucide-react';

const Archive: React.FC = () => {
  const posts = [
    { title: 'The Sedona Vortex Protocol', date: 'Feb 12, 2026', category: 'Wellness' },
    { title: 'Flagstaff Winter Survival Guide', date: 'Jan 28, 2026', category: 'Expedition' },
    { title: 'Superstition Mountain Hidden Springs', date: 'Jan 15, 2026', category: 'Trails' },
    { title: 'Desert Hydration: Advanced Science', date: 'Dec 20, 2025', category: 'Health' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-6">Archive</h1>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <p className="text-zinc-500 italic font-serif text-xl">A complete record of desert intelligence and wellness protocols.</p>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input type="text" placeholder="Search Intel..." className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-primary/10" />
            </div>
            <button className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-400 hover:text-black transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post, i) => (
          <div key={i} className="group flex items-center justify-between p-8 bg-white border border-zinc-100 rounded-[32px] hover:border-brand-primary/20 hover:shadow-xl hover:shadow-zinc-100/50 transition-all cursor-pointer">
            <div className="flex items-center gap-8">
              <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 bg-zinc-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                <Calendar className="w-5 h-5 text-zinc-400 group-hover:text-brand-primary transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-2 block">{post.category}</span>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-brand-primary transition-colors">{post.title}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{post.date}</p>
              <button className="mt-2 text-[10px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black transition-colors">Read Intel →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
