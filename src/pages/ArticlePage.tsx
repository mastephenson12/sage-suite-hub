import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Tag, Clock, Share2 } from 'lucide-react';

const ArticleHeroImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  const fallback =
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80';

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100">
        <div className="text-zinc-300 text-xs font-black uppercase tracking-[0.4em]">
          Image Unavailable
        </div>
      </div>
    );
  }

  return (
    <img
      src={src || fallback}
      alt={alt}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Article Not Found</h1>
        <p className="text-zinc-500 mb-8">
          The article you’re looking for could not be found.
        </p>
        <Link
          to="/archive"
          className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white pb-24">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-zinc-100">
        <ArticleHeroImage src={article.image} alt={article.title} />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Back to Archive
              </span>
            </Link>

            <span className="inline-block px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-4">
              {article.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="flex flex-wrap items-center gap-8 pb-12 border-b border-zinc-100 mb-12 text-zinc-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              {article.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              6 Min Read
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Travel Guide
            </span>
          </div>

          {/* Optional: remove or wire up later */}
          <button className="ml-auto p-2 hover:text-black transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="markdown-body prose prose-lg prose-zinc max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>

        {/* CTA */}
        <div className="mt-16 p-10 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl text-center">
          <h3 className="text-lg md:text-xl font-black uppercase tracking-wider mb-4">
            Let Sage Plan This Trip For You
          </h3>

          <p className="text-zinc-600 mb-6 max-w-xl mx-auto">
            Sage can build a complete adventure itinerary including hikes,
            restaurants, scenic viewpoints, and local hidden spots.
          </p>

          <Link
            to="/chat"
            className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
          >
            Plan My Trip With Sage
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-24 p-12 bg-zinc-50 rounded-[48px] border border-zinc-100 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4">
              Helpful Note
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic font-serif">
              Travel information can change with weather, seasonal conditions,
              closures, and local updates. Always double-check details before
              your trip.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
