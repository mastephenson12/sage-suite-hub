import React from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const Archive: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-6">
          Archive
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <p className="text-zinc-500 italic font-serif text-xl">
            A complete record of desert intelligence and wellness protocols.
          </p>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search Intel..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
              />
            </div>

            <button className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-400 hover:text-black transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/archive/${article.id}`}
            className="group block overflow-hidden rounded-[32px] border border-zinc-100 bg-white hover:border-brand-primary/20 hover:shadow-xl hover:shadow-zinc-100/50 transition-all"
          >
            <div className="aspect-[16/9] overflow-hidden bg-zinc-100">
              <img
                src={
                  article.image ||
                  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90'
                }
                alt={article.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add(
                    'flex',
                    'items-center',
                    'justify-center'
                  );
                  if (target.parentElement) {
                    target.parentElement.innerHTML =
                      '<div class="text-zinc-300 text-[10px] font-black uppercase tracking-widest text-center px-2">Visual Missing</div>';
                  }
                }}
              />
            </div>

            <div className="p-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-3 block">
                {article.category}
              </span>

              <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-brand-primary transition-colors mb-3">
                {article.title}
              </h3>

              <div className="flex items-center gap-2 text-zinc-400 mb-4">
                <Calendar className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {article.date}
                </span>
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black transition-colors">
                Read Intel →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Archive;
