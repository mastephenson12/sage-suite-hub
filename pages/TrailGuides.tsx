import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { geminiService } from '../services/gemini.ts';

interface Trail {
  name: string;
  loc: string;
  diff: string;
  length: string;
  tags: string[];
  description: string;
}

const TrailGuides: React.FC = () => {
  const [trailImages, setTrailImages] = useState<Record<string, string>>({});
  const [loadingTrail, setLoadingTrail] = useState<string | null>(null);
  const navigate = useNavigate();

  const trails: Trail[] = [
    { name: "Devil's Bridge", loc: "Sedona, AZ", diff: "Moderate", length: "4.2 mi", tags: ["Photography", "Busy"], description: "Natural sandstone arch with sweeping red rock views." },
    { name: "Flatiron via Siphon Draw", loc: "Apache Junction, AZ", diff: "Strenuous", length: "6.2 mi", tags: ["Scrambling", "Elevation"], description: "Steep granite rock scrambles leading to a massive cliff-top plateau." },
    { name: "West Fork Trail", loc: "Oak Creek Canyon", diff: "Easy", length: "7.2 mi", tags: ["Family", "Water"], description: "Lush riparian canyon with multiple stream crossings and towering cliffs." },
    { name: "Tom's Thumb", loc: "Scottsdale, AZ", diff: "Moderate", length: "4.0 mi", tags: ["Granite", "Views"], description: "Distinctive granite spire overlooking the McDowell Sonoran Preserve." },
    { name: "Camelback Echo Canyon", loc: "Phoenix, AZ", diff: "Hard", length: "2.4 mi", tags: ["Iconic", "Urban"], description: "High-intensity urban summit with panoramic Phoenix city views." },
    { name: "Horton Creek", loc: "Payson, AZ", diff: "Easy", length: "8.6 mi", tags: ["Forest", "Shade"], description: "Cool mountain stream trail through Ponderosa pine forests." }
  ];

  const handleGenerateImage = async (trail: Trail) => {
    if (loadingTrail) return;
    setLoadingTrail(trail.name);
    try {
      const imageUrl = await geminiService.generateTrailImage(trail.name, trail.description, trail.diff);
      setTrailImages(prev => ({ ...prev, [trail.name]: imageUrl }));
    } catch (error) {
      console.error("Failed to generate trail vista:", error);
    } finally {
      setLoadingTrail(null);
    }
  };

  const handleAccessIntel = (trailName: string) => {
    // Navigate to chat and pre-populate with the trail query
    navigate(`/chat`, { state: { initialQuery: `Tell me more about the ${trailName} trail including current conditions and parking intel.` } });
  };

  return (
    <div className="pt-24 pb-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 text-[#0d47a1] font-black text-[10px] uppercase tracking-[0.3em] mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m6 13l5.447-2.724A1 1 0 0021 17.618V6.818a1 1 0 00-1.447-.894L15 8m-6-1l6 2m0 0v10m-6-10V7" />
             </svg>
             Explore Arizona
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">Find Your <br/>Next Path.</h1>
          <p className="text-xl text-zinc-500 serif-text italic max-w-xl leading-relaxed">
            Vetted trail reports from the Health & Travels team. Use our AI Scout to visualize the terrain before you trek.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {trails.map((trail, idx) => (
            <div key={idx} className="flex flex-col border border-zinc-100 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all group bg-white">
              {/* AI Image Section */}
              <div className="aspect-video bg-zinc-50 relative overflow-hidden group/img">
                {trailImages[trail.name] ? (
                  <img 
                    src={trailImages[trail.name]} 
                    alt={trail.name} 
                    className="w-full h-full object-cover animate-in fade-in duration-1000" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-zinc-300 ${loadingTrail === trail.name ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Visualization Data Locked</p>
                      <button 
                        onClick={() => handleGenerateImage(trail)}
                        disabled={loadingTrail !== null}
                        className="text-[#0d47a1] font-bold text-xs uppercase tracking-widest hover:text-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loadingTrail === trail.name ? "Scouting..." : "Reveal Scout View"}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Overlay Difficulty */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                    trail.diff === 'Strenuous' || trail.diff === 'Hard' ? 'bg-red-500/90 text-white' : 
                    trail.diff === 'Moderate' ? 'bg-[#0d47a1]/90 text-white' : 'bg-green-500/90 text-white'
                  }`}>
                    {trail.diff}
                  </span>
                </div>

                {trailImages[trail.name] && (
                   <button 
                      onClick={() => handleGenerateImage(trail)}
                      className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all opacity-0 group-hover/img:opacity-100"
                   >
                     Re-scout
                   </button>
                )}
              </div>

              {/* Content Section */}
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-3xl font-black tracking-tighter text-black group-hover:text-[#0d47a1] transition-colors">{trail.name}</h3>
                  <span className="text-xs font-bold text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">{trail.length}</span>
                </div>
                <p className="text-[#0d47a1] uppercase text-[10px] font-black tracking-[0.2em] mb-6">{trail.loc}</p>
                
                <p className="text-zinc-600 serif-text italic text-lg leading-relaxed mb-8 flex-grow">
                  "{trail.description}"
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {trail.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-400 border border-zinc-100 bg-zinc-50/50 px-3 py-1 rounded-lg uppercase tracking-wider">{tag}</span>
                  ))}
                </div>

                <button 
                  onClick={() => handleAccessIntel(trail.name)}
                  className="w-full py-5 bg-zinc-950 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#0d47a1] transition-all active:scale-[0.98] shadow-2xl shadow-zinc-900/20"
                >
                  Access Full Intel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailGuides;
