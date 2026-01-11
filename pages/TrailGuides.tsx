import React from 'react';

const TrailGuides: React.FC = () => {
  const trails = [
    { name: "Devils Bridge", loc: "Sedona, AZ", diff: "Moderate", length: "4.2 mi", tags: ["Photography", "Busy"] },
    { name: "Flatiron via Siphon Draw", loc: "Apache Junction, AZ", diff: "Strenuous", length: "6.2 mi", tags: ["Scrambling", "Elevation"] },
    { name: "West Fork Trail", loc: "Oak Creek Canyon", diff: "Easy", length: "7.2 mi", tags: ["Family", "Water"] },
    { name: "Tom's Thumb", loc: "Scottsdale, AZ", diff: "Moderate", length: "4.0 mi", tags: ["Granite", "Views"] },
    { name: "Camelback Echo Canyon", loc: "Phoenix, AZ", diff: "Hard", length: "2.4 mi", tags: ["Iconic", "Urban"] },
    { name: "Horton Creek", loc: "Payson, AZ", diff: "Easy", length: "8.6 mi", tags: ["Forest", "Shade"] }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m6 13l5.447-2.724A1 1 0 0021 17.618V6.818a1 1 0 00-1.447-.894L15 8m-6-1l6 2m0 0v10m-6-10V7" />
             </svg>
             Explore Arizona
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-6 leading-none">Find Your <br/>Next Path.</h1>
          <p className="text-xl text-zinc-500 serif-text italic max-w-xl">
            Vetted trail reports from the Health & Travels team. Every guide includes difficulty ratings, essential gear, and local wellness pairings.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trails.map((trail, idx) => (
            <div key={idx} className="p-8 border border-zinc-200 rounded-3xl hover:border-[#0d47a1] transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                    trail.diff === 'Strenuous' || trail.diff === 'Hard' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {trail.diff}
                  </span>
                  <span className="text-xs font-bold text-zinc-400">{trail.length}</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-2 group-hover:text-[#0d47a1] transition-colors">{trail.name}</h3>
                <p className="text-zinc-500 uppercase text-[10px] font-black tracking-widest mb-6">{trail.loc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {trail.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded uppercase">{tag}</span>
                  ))}
                </div>
              </div>
              <button className="w-full py-4 bg-zinc-50 group-hover:bg-[#0d47a1] group-hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                View Full Guide
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailGuides;
};

export default TrailGuides;
