import React from 'react';
import { Users, MessageCircle, Award } from 'lucide-react';

type ActivityItem = {
  name: string;
  time: string;
  post: string;
  initials: string;
};

const activities: ActivityItem[] = [
  {
    name: 'Sedona Family Crew',
    time: '2h ago',
    post: 'Just finished Siphon Draw. Dry conditions, windy at the top. Start early if you can.',
    initials: 'SF',
  },
  {
    name: 'Mesa Trail Parents',
    time: '5h ago',
    post: 'Did an easy morning walk before it got hot. Great spot for kids and plenty of room to explore.',
    initials: 'MP',
  },
  {
    name: 'Flagstaff Weekend Hikers',
    time: '1d ago',
    post: 'Cooler weather up north made this one worth the drive. Packed snacks, layers, and had a great day.',
    initials: 'FW',
  },
];

const avatarGradients = [
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
  'from-sky-400 to-blue-500',
];

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-black text-white text-center text-xs py-3 px-4">
        Arizona Hikers Association is now our main community home
        <a
          href="https://arizonahikersassociation.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline ml-2 font-bold"
        >
          Join here
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-20 text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-4">
            Health & Travels Community
          </p>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Arizona Hikers Association
          </h1>

          <p className="text-zinc-500 italic font-serif text-xl max-w-2xl mx-auto leading-relaxed">
            Find better trails. Make better memories.
          </p>

          <p className="text-zinc-400 text-sm max-w-2xl mx-auto mt-6 leading-relaxed">
            Use Sage to plan your next Arizona adventure, then join the Arizona Hikers
            Association to connect with real hikers, share trail tips, and discover new
            places across Arizona.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://arizonahikersassociation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:opacity-90 transition-opacity"
            >
              Join the Community
            </a>

            <a
              href="/#/chat"
              className="inline-block px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Plan with Sage
            </a>
          </div>
        </header>

        {/* How It Works */}
        <section className="mb-24 text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">
            How Sage + Arizona Hikers Association Work Together
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 shadow-sm">
