import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Clock, Zap, Info, TrendingUp, Map as MapIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { trails } from '../data/trails';

const TrailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const trail = trails.find(t => t.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!trail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Trail Intel Missing</h1>
        <p className="text-zinc-500 mb-8">The requested trail coordinates are not in our database.</p>
        <Link to="/trail-guides" className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">
          Return to Guides
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-zinc-100">
        <img 
          src={trail.image} 
          alt={trail.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
            target.parentElement!.innerHTML = `<div class="text-zinc-300 text-xs font-black uppercase tracking-[0.4em]">Intelligence Asset Unavailable</div>`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-6xl mx-auto">
            <Link to="/trail-guides" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Guides</span>
            </Link>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                <Zap className="w-3 h-3" /> {trail.difficulty}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/20">
                <MapPin className="w-3 h-3" /> {trail.location}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
              {trail.name}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Distance</p>
                <p className="text-xl font-black text-white">{trail.distance}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Elevation Gain</p>
                <p className="text-xl font-black text-white">{trail.elevationGain}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Est. Time</p>
                <p className="text-xl font-black text-white">{trail.time}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <p className="text-xl font-black text-white">{trail.rating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-brand-primary mb-6 flex items-center gap-2">
                <Info className="w-4 h-4" /> Mission Briefing
              </h2>
              <p className="text-2xl font-serif italic text-zinc-600 leading-relaxed">
                {trail.description}
              </p>
            </div>

            <div className="markdown-body prose prose-lg prose-zinc max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{trail.intel}</ReactMarkdown>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Live Status
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Trail Condition</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Optimal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Traffic Level</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Moderate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Weather Node</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">72°F Clear</span>
                </div>
              </div>
              <button className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-colors flex items-center justify-center gap-2">
                <MapIcon className="w-4 h-4" /> Download GPS Map
              </button>
            </div>

            <div className="p-8 bg-brand-primary rounded-[32px] text-white">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4">Scout Note</h3>
              <p className="text-sm leading-relaxed opacity-80 mb-6">
                "This trail requires high-clearance vehicles for trailhead access. Do not attempt in a sedan."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Scout_Alpha</p>
                  <p className="text-[8px] font-medium uppercase tracking-widest opacity-50">Lead Explorer</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TrailPage;
