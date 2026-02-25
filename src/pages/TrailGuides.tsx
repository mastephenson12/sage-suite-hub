import React from 'react';
import { MapPin, Star, Clock, Zap } from 'lucide-react';

const TrailGuides: React.FC = () => {
  const guides = [
    { name: 'Devil\'s Bridge', location: 'Sedona, AZ', rating: 4.8, time: '2.5h', difficulty: 'Moderate', img: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&w=800&q=80' },
    { name: 'Camelback Mountain', location: 'Phoenix, AZ', rating: 4.9, time: '3h', difficulty: 'Hard', img: 'https://images.unsplash.com/photo-1599408162410-67634289324e?auto=format&fit=crop&w=800&q=80' },
    { name: 'Humphreys Peak', location: 'Flagstaff, AZ', rating: 4.7, time: '8h', difficulty: 'Expert', img: 'https://images.unsplash.com/photo-1605197548411-502230b96626?auto=format&fit=crop&w=800&q=80' },
    { name: 'Flatiron via Siphon Draw', location: 'Apache Junction, AZ', rating: 4.9, time: '5h', difficulty: 'Hard', img: 'https://images.unsplash.com/photo-1597167237494-21139050cd55?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
          <Zap className="w-3 h-3" /> Live Trail Status: Clear
        </div>
        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6">Trail Guides</h1>
        <p className="text-zinc-500 italic font-serif text-xl max-w-2xl mx-auto">GPS-verified intelligence for Arizona's most challenging and rewarding terrain.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide, i) => (
          <div key={i} className="group bg-white border border-zinc-100 rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all">
            <div className="h-64 overflow-hidden relative">
              <img src={guide.img} alt={guide.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                {guide.difficulty}
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{guide.location}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{guide.name}</h3>
                </div>
                <div className="flex items-center gap-1 bg-zinc-50 px-3 py-1.5 rounded-lg">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-black">{guide.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 pt-6 border-t border-zinc-50">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-300" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">{guide.time}</span>
                </div>
                <button className="ml-auto bg-zinc-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-colors">
                  View Intel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailGuides;
