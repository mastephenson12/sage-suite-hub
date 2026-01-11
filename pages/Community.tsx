import React from 'react';
import { SAGESUITE_URL, SAGESUITE_APPLY, BRAND_NAME } from '../constants';

const Community: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-20 bg-zinc-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(13,71,161,0.2),transparent_70%)]"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-7xl font-black tracking-tighter uppercase mb-6">The High Desert <br/>Network</h1>
          <p className="text-xl text-zinc-400 serif-text italic max-w-2xl mx-auto mb-10">
            More than just a journal. A private space for Arizona's wellness practitioners, trail scouts, and enthusiasts to connect.
          </p>
          <div className="flex justify-center gap-4">
            <a href={SAGESUITE_URL} className="bg-[#0d47a1] hover:bg-[#0a3a85] px-8 py-4 rounded-lg font-black uppercase tracking-widest text-sm transition-all">
              Enter Community
            </a>
            <a href={SAGESUITE_APPLY} className="bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-4 rounded-lg font-black uppercase tracking-widest text-sm transition-all">
              Join as Professional
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-zinc-50 rounded-3xl border border-zinc-100">
            <div className="w-12 h-12 bg-[#0d47a1] rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Vetted Directory</h3>
            <p className="text-zinc-600 font-medium leading-relaxed">Access our private database of AZ practitioners. From sports massage to nutritionists who hike.</p>
          </div>
          <div className="p-10 bg-zinc-50 rounded-3xl border border-zinc-100">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Real-time Advice</h3>
            <p className="text-zinc-600 font-medium leading-relaxed">In-app group chats for trail conditions, gear swaps, and local wellness meetups in Phoenix and Sedona.</p>
          </div>
          <div className="p-10 bg-zinc-50 rounded-3xl border border-zinc-100">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Exclusive Content</h3>
            <p className="text-zinc-600 font-medium leading-relaxed">Member-only deep dives into biohacking for high-altitude performance and desert recovery techniques.</p>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-[#0d47a1] text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
            Powered by GoHighLevel Communities
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 uppercase">A modern ecosystem for <br/>the modern explorer.</h2>
          <p className="text-lg text-zinc-500 serif-text italic mb-12 max-w-2xl mx-auto">
            Log in once, access everything. Your trail journal, your wellness network, and your local community discussions all in one streamlined portal.
          </p>
          <a href={SAGESUITE_URL} className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#0d47a1] transition-all">
            Join the SageSuite Community
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Community;
  );
};

export default Community;
