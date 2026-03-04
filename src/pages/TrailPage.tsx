import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trails } from '../data/trails';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, MapPin, Star, Clock, Mountain, Ruler, Share2, Info } from 'lucide-react';

const TrailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const trail = trails.find(t => t.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!trail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Trail Missing</h1>
        <p className="text-zinc-500 mb-8">The requested trail intelligence could not be found.</p>
        <Link to="/trail-guides" className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">
          Return to Guides
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-zinc-100">
        <img 
          src={trail.image} 
          alt={trail.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
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
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                trail.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                trail.difficulty === 'Moderate' ? 'bg-amber-500 text-white' :
                trail.difficulty === 'Hard' ? 'bg-orange-500 text-white' :
                'bg-red-600 text-white'
              }`}>
                {trail.difficulty}
              </span>
              <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center gap-2">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{trail.rating} Rating</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
              {trail.name}
            </h1>
            
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">{trail.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <Ruler className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Distance</span>
                <span className="text-sm font-black uppercase tracking-widest">{trail.distance}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <Mountain className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Elevation Gain</span>
                <span className="text-sm font-black uppercase tracking-widest">{trail.elevationGain}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Est. Time</span>
                <span className="text-sm font-black uppercase tracking-widest">{trail.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <Share2 className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Share Intel</span>
                <span className="text-sm font-black uppercase tracking-widest">Copy Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <section className="mb-16">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300 mb-8">Trail Description</h2>
              <p className="text-xl text-zinc-600 leading-relaxed font-serif italic">
                {trail.description}
              </p>
            </section>

            <section className="markdown-body prose prose-lg prose-zinc max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{trail.intel}</ReactMarkdown>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="p-8 bg-zinc-950 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Info className="w-5 h-5 text-brand-accent" />
                    <h3 className="text-xs font-black uppercase tracking-[0.3em]">Scout Advisory</h3>
                  </div>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wider font-bold">Mandatory: 3L water per person minimum.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wider font-bold">Cell coverage is intermittent in canyons.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wider font-bold">Leave no trace. Pack out all waste.</p>
                    </li>
                  </ul>
                  <button className="w-full mt-12 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors">
                    Download Offline Intel
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailPage;
