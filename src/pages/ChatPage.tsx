import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const ArchiveCardImage: React.FC<{
  src?: string;
  alt: string;
}> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  const fallbackSrc =
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90';

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100">
        <div className="px-2 text-center text-[10px] font-black uppercase tracking-widest text-zinc-300">
          Visual Missing
        </div>
      </div>
    );
  }

  return (
    <img
      src={src || fallbackSrc}
      alt={alt}
      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

const Archive: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-950 md:text-5xl">
          Archive
        </h1>

        <p className="mt-3 max-w-3xl text-base italic font-serif text-zinc-500 md:text-lg">
          Explore our growing collection of Arizona travel guides, trail notes,
          and family adventure ideas.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/archive/${article.id}`}
            className="group block overflow-hidden rounded-[28px] border border-zinc-100 bg-white transition-all hover:border-brand-primary/20 hover:shadow-xl hover:shadow-zinc-100/50"
          >
            <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
              <ArchiveCardImage src={article.image} alt={article.title} />
            </div>

            <div className="p-5">
              <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                {article.category}
              </span>

              <h3 className="mb-3 text-lg font-black uppercase tracking-tight text-zinc-950 transition-colors group-hover:text-brand-primary md:text-xl">
                {article.title}
              </h3>

              <div className="mb-4 flex items-center gap-2 text-zinc-400">
                <Calendar className="h-3 w-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {article.date}
                </span>
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 transition-colors group-hover:text-black">
                Read Guide →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Archive;
