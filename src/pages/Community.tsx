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
              <p className="text-brand-primary font-black text-sm uppercase tracking-widest mb-3">
                1. Plan
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">
                Use Sage
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Discover trail ideas, family adventures, and Arizona trip inspiration
                faster.
              </p>
            </div>

            <div className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 shadow-sm">
              <p className="text-brand-primary font-black text-sm uppercase tracking-widest mb-3">
                2. Connect
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">
                Join the Community
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Meet Arizona hikers, families, and explorers who are actually out there
                doing it.
              </p>
            </div>

            <div className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 shadow-sm">
              <p className="text-brand-primary font-black text-sm uppercase tracking-widest mb-3">
                3. Explore
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">
                Share &amp; Discover
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Learn from real adventures, swap trail tips, and find your next outing
                faster.
              </p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center shadow-sm">
            <Users className="w-8 h-8 text-brand-primary mx-auto mb-6" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">
              Arizona Community
            </h3>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              Families, hikers &amp; explorers
            </p>
          </div>

          <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center shadow-sm">
            <MessageCircle className="w-8 h-8 text-emerald-500 mx-auto mb-6" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">
              Trail Tips
            </h3>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              Shared hikes, advice &amp; ideas
            </p>
          </div>

          <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center shadow-sm">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-6" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">
              Real Adventures
            </h3>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              Better memories outside
            </p>
          </div>
        </section>

        {/* Feed + CTA */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">
              Recent Community Activity
            </h2>

            {activities.map((item, i) => (
              <div
                key={`${item.name}-${item.time}`}
                className="p-8 bg-white border border-zinc-100 rounded-[32px] flex gap-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                    avatarGradients[i % avatarGradients.length]
                  } flex-shrink-0 flex items-center justify-center text-white font-black text-sm shadow-sm`}
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

          <div className="bg-brand-primary rounded-[48px] p-12 text-white text-center shadow-lg">
  <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
    Join Arizona Hikers Association
  </h2>

  <p className="text-white/85 text-sm leading-relaxed mb-8 max-w-md mx-auto">
    A premium community for Arizona hikers and families who want better trails,
    real guidance, and easier adventures without the guesswork.
  </p>

  <a
    href="https://arizonahikersassociation.org"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block w-full py-4 bg-white text-brand-primary rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-100 transition-colors"
  >
    Get Access
  </a>

  <p className="text-white/60 text-xs mt-4">
    Instant access • Guided hikes • Real community
  </p>
</div>
        </section>
      </div>
    </div>
  );
};

export default Community;
