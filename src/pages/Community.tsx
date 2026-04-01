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
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          Community
        </h1>

        <p className="text-zinc-500 italic font-serif text-xl max-w-2xl mx-auto leading-relaxed">
          Connect with other families exploring Arizona and planning their next adventure.
        </p>
      </header>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center shadow-sm">
          <Users className="w-8 h-8 text-brand-primary mx-auto mb-6" />
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">
            Growing Community
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Families & Explorers
          </p>
        </div>

        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center shadow-sm">
          <MessageCircle className="w-8 h-8 text-emerald-500 mx-auto mb-6" />
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">
            Shared Experiences
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Tips, Trails & Trips
          </p>
        </div>

        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center shadow-sm">
          <Award className="w-8 h-8 text-purple-500 mx-auto mb-6" />
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">
            Real Adventures
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Family Journeys
          </p>
        </div>
      </div>

      {/* Feed + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">
            Recent Activity
          </h2>

          {activities.map((item, i) => (
            <div
              key={item.name}
              className="p-8 bg-white border border-zinc-100 rounded-[32px] flex gap-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex-shrink-0 flex items-center justify-center text-white font-black text-sm shadow-sm`}
                aria-hidden="true"
              >
                {item.initials}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-sm font-black uppercase tracking-tight text-zinc-900">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">
                    {item.time}
                  </span>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.post}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-primary rounded-[48px] p-12 text-white text-center shadow-lg">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
            Join the Community
          </h2>

          <p className="text-white/85 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Share your trips, learn from other Arizona explorers, and get better ideas
            for your next family adventure.
          </p>

          <a
            href="#"
            className="inline-block w-full py-4 bg-white text-brand-primary rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-100 transition-colors"
          >
            Join Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Community;
