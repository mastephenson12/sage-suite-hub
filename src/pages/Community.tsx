import React from 'react';
import { Users, MessageCircle, Award } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20 text-center">
        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          Community
        </h1>

        <p className="text-zinc-500 italic font-serif text-xl max-w-2xl mx-auto">
          Connect with other families exploring Arizona and planning their next adventure.
        </p>
      </header>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center">
          <Users className="w-8 h-8 text-brand-primary mx-auto mb-6" />
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">
            Growing Community
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Families & Explorers
          </p>
        </div>

        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center">
          <MessageCircle className="w-8 h-8 text-emerald-500 mx-auto mb-6" />
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">
            Shared Experiences
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Tips, Trails & Trips
          </p>
        </div>

        <div className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 text-center">
          <Award className="w-8 h-8 text-purple-500 mx-auto mb-6" />
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">
            Real Adventures
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Family Journeys
          </p>
        </div>
      </div>

      {/* Sample Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">
            Recent Activity
          </h2>

          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-zinc-100 rounded-[32px] flex gap-6"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex-shrink-0 overflow-hidden">
                <img
                  src={`https://i.pravatar.cc/100?u=${i + 20}`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-black uppercase tracking-tight">
                    Explorer_{i + 100}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">
                    2h ago
                  </span>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  Just finished Siphon Draw. Dry conditions, windy at the top.
                  Start early if you can.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-primary rounded-[48px] p-12 text-white text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
            Join the Community
          </h2>

          <p className="text-white/80 text-sm leading-relaxed mb-8">
            Share your trips, learn from others, and get better ideas for your
            next adventure.
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
