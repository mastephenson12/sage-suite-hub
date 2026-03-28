import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12">
        About the Mission
      </h1>

      <div className="prose prose-xl font-serif italic text-zinc-600 leading-relaxed mb-16">
        <p>
          {BRAND_NAME} was built around a simple belief:
          getting outside and exploring with your family is one of the most
          powerful ways to create real memories, real health, and real connection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-6">
            The Vision
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            We help families discover incredible places, especially across
            Arizona, and make those adventures simple, safe, and unforgettable.
            Less confusion, more time outside.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-6">
            The Tool
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Sage is your personal trip builder. It helps you plan hikes, find
            family-friendly spots, and build real itineraries without spending
            hours researching.
          </p>
        </div>
      </div>

      <div className="mb-24 p-10 bg-zinc-50 rounded-[32px] border border-zinc-100 text-center">
        <h3 className="text-lg font-black uppercase tracking-wide text-zinc-900 mb-4">
          Built for Real Families
        </h3>
        <p className="text-sm text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Whether you're planning a quick weekend hike or a full Arizona road
          trip, everything here is designed to make it easier to get outside
          and actually enjoy the experience.
        </p>
      </div>

      <div className="bg-zinc-950 rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e1b4b,transparent)] opacity-50"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
            Start Your Next Adventure
          </h2>

          <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto font-medium">
            Tell Sage where you want to go and get a personalized trip plan in minutes.
          </p>

          <Link
            to="/chat"
            className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-zinc-200 transition-all"
          >
            Plan My Trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
