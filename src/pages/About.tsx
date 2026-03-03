import React from 'react';
import { BRAND_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">About the Mission</h1>
      
      <div className="prose prose-xl font-serif italic text-zinc-600 leading-relaxed mb-16">
        <p>
          {BRAND_NAME} was founded on a single principle: that the intersection of physical exploration and mental wellness is where true human potential is unlocked.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-6">The Vision</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            We believe the desert is more than just a landscape—it's a laboratory for resilience. Our mission is to provide the intelligence, tools, and community needed to navigate this environment with precision and purpose.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-6">The Technology</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Through the Sage Suite, we leverage advanced AI to synthesize trail data, weather patterns, and wellness research into actionable protocols for our community of pioneers.
          </p>
        </div>
      </div>

      <div className="mb-24 p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 font-mono">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          Deployment Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Node Location</p>
            <p className="text-xs font-bold text-black uppercase">Washington, D.C. (iad1)</p>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Core Configuration</p>
            <p className="text-xs font-bold text-black uppercase">2 Cores / 8 GB RAM</p>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Latest Build</p>
            <p className="text-xs font-bold text-black uppercase">Commit: da880a7 (main)</p>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Dependency Matrix</p>
            <p className="text-xs font-bold text-black uppercase">302 Packages Synced</p>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Build Engine</p>
            <p className="text-xs font-bold text-black uppercase">Vite / Vercel Build</p>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Status</p>
            <p className="text-xs font-bold text-emerald-600 uppercase">Operational</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e1b4b,transparent)] opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">Join the Expedition</h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto font-medium">We are always looking for scouts, researchers, and explorers to join our ranks.</p>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-zinc-200 transition-all">
            Apply for Clearance
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
