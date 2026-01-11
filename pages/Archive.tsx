import React from 'react';
import { BRAND_NAME } from '../constants';

const Archive: React.FC = () => {
  const issues = [
    { title: "The Vortexes of Sedona", date: "Oct 24, 2023", category: "Wellness", readTime: "8 min" },
    { title: "Family Hikes in Cave Creek", date: "Oct 17, 2023", category: "Guides", readTime: "5 min" },
    { title: "Hydration Science for Desert Runners", date: "Oct 10, 2023", category: "Health", readTime: "12 min" },
    { title: "Hidden Pools of the Superstitions", date: "Oct 03, 2023", category: "Guides", readTime: "10 min" },
    { title: "Mindful Walking: A Desert Meditations", date: "Sep 26, 2023", category: "Wellness", readTime: "6 min" },
    { title: "The Best Sunrise Hikes in Phoenix", date: "Sep 19, 2023", category: "Guides", readTime: "4 min" }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-20 text-center">
          <h1 className="text-6xl font-black tracking-tighter mb-6 uppercase">The Journal Archive</h1>
          <p className="text-xl text-zinc-500 serif-text italic max-w-2xl mx-auto">
            A complete collection of every Tuesday dispatch. From the deepest canyons to the highest wellness peaks.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {issues.map((issue, idx) => (
            <article key={idx} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-zinc-100 rounded-2xl mb-6 overflow-hidden border border-zinc-200 transition-all group-hover:border-[#0d47a1]/20 group-hover:shadow-xl group-hover:shadow-blue-900/5">
                <div className="w-full h-full bg-gradient-to-br from-zinc-50 to-zinc-200 p-8 flex flex-col justify-between">
                   <div className="text-[10px] font-black uppercase tracking-widest text-[#0d47a1] bg-white px-2 py-1 rounded-sm w-fit">Issue #{150 - idx}</div>
                   <div className="h-px w-12 bg-zinc-300"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span>{issue.date}</span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                  <span>{issue.category}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-black group-hover:text-[#0d47a1] transition-colors leading-tight">
                  {issue.title}
                </h3>
                <p className="text-sm text-zinc-500 font-medium">{issue.readTime} read</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archive;
