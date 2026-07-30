import React, { useState } from 'react';
import { Calendar, Sparkles, ExternalLink } from 'lucide-react';
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

const buildScoutPrompt = (title: string, category?: string) => {
  return `Help me plan a trip based on this ${category?.toLowerCase() || 'guide'}: ${title}`;
};

const getViatorLink = (articleId: string) => {
  if (articleId === 'sedona-family-adventure') {
    return 'https://www.viator.com/tours/Sedona/Antelope-Canyon-and-Horseshoe-Bend-Tour/d750-3272P13?pid=P00292684&mcid=42383&medium=link&medium_version=selector&campaign=antelope-canyon-horseshoe-bend-sedona';
  }

  return null;
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
        {articles.map((article) => {
          const viatorLink = getViatorLink(article.id);

          return (
            <div
              key={article.id}
              className="group overflow-hidden rounded-[28px] border border-zinc-100 bg-white transition-all hover:border-brand-primary/20 hover:shadow-xl hover:shadow-zinc-100/50"
            >
              <Link to={`/archive/${article.id}`} className="block">
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <ArchiveCardImage src={article.image} alt={article.title} />
                </div>
              </Link>

              <div className="p-5">
                <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                  {article.category}
                </span>

                <Link to={`/archive/${article.id}`} className="block">
                  <h3 className="mb-3 text-lg font-black uppercase tracking-tight text-zinc-950 transition-colors group-hover:text-brand-primary md:text-xl">
                    {article.title}
                  </h3>
                </Link>

                <div className="mb-4 flex items-center gap-2 text-zinc-400">
                  <Calendar className="h-3 w-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {article.date}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link
                      to={`/archive/${article.id}`}
                      className="text-[10px] font-black uppercase tracking-widest text-zinc-300 transition-colors hover:text-black"
                    >
                      Read Guide →
                    </Link>

                    <Link
                      to={`/chat?prompt=${encodeURIComponent(
                        buildScoutPrompt(article.title, article.category)
                      )}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 hover:text-black"
                    >
                      <Sparkles className="h-3 w-3" />
                      Ask Scout about this trip
                    </Link>

                    {viatorLink && (
                      <a
                        href={viatorLink}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary bg-brand-primary px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:opacity-90"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Book This Tour
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Archive;
