import React from 'react';
import { LayoutGrid, Search, Mic, Video, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    name: 'Trip Planner',
    icon: LayoutGrid,
    desc: 'Plan full trips with Sage',
    to: '/chat',
  },
  {
    name: 'Flight Finder',
    icon: Search,
    desc: 'Find better flights faster',
    to: '/chat',
  },
  {
    name: 'Camping Planner',
    icon: Mic,
    desc: 'Find campsites and parks',
    to: '/chat',
  },
  {
    name: 'Stay Finder',
    icon: ImageIcon,
    desc: 'Hotels, cabins, and rentals',
    to: '/chat',
  },
];

const SuiteDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Sage Tools
          </h1>

          <p className="text-zinc-600 max-w-2xl">
            Use Sage to plan trips, explore Arizona, and build better travel experiences without the clutter.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              to={tool.to}
              className="group border border-zinc-200 p-8 rounded-3xl hover:border-brand-primary/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <tool.icon className="w-6 h-6" />
              </div>

              <h3 className="text-sm font-black uppercase tracking-widest mb-2">
                {tool.name}
              </h3>

              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuiteDashboard;
