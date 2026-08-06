import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { ARIZONA_DESTINATIONS } from '../data/viatorLinks';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  Calendar,
  Tag,
  Clock,
  Share2,
  ExternalLink,
} from 'lucide-react';
import CloudinaryImage from '../components/CloudinaryImage';

const ArticleHeroImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  const fallback =
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80';

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100">
        <div className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300">
          Image Unavailable
        </div>
      </div>
    );
  }

  return (
    <CloudinaryImage
      src={src || fallback}
      alt={alt}
      className="h-full w-full object-cover"
      sizes="100vw"
      widthHint={1600}
      loading="eager"
      fetchPriority="high"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

type AffiliateData = {
  title: string;
  description: string;
  url: string;
  buttonText: string;
};

const getAffiliateForArticle = (
  article: (typeof articles)[number]
): AffiliateData | null => {
  // If article has custom affiliate, use it
  if (article.affiliate) return article.affiliate;

  // Pull from centralized Viator file
  if (article.id === 'sedona-family-adventure') {
    const sedona = ARIZONA_DESTINATIONS.sedona;

    return {
      title: sedona.label || 'Best Sedona Tours',
      description:
        'Skip the guesswork and book a top-rated Sedona experience. This helps you plug a proven adventure straight into your trip.',
      url: sedona.tours,
      buttonText: 'View Tour',
    };
  }

  return null;
};

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="mb-4 text-4xl font-black uppercase">Article Not Found</h1>
        <p className="mb-8 text-zinc-500">
          The article you’re looking for could not be found.
        </p>
        <Link
          to="/archive"
          className="rounded-2xl bg-brand-primary px-8 py-4 text-xs font-black uppercase tracking-widest text-white"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  const affiliate = getAffiliateForArticle(article);

  return (
    <article className="min-h-screen bg-white pb-24">
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-zinc-100">
        <ArticleHeroImage src={article.image} alt={article.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/archive"
              className="group mb-6 inline-flex items-center gap-2 text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Back to Archive
              </span>
            </Link>

            <span className="mb-4 inline-block rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
              {article.category}
            </span>

            <h1 className="text-4xl font-black tracking-tighter text-white uppercase md:text-6xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-16">
        <div className="mb-12 flex flex-wrap items-center gap-8 border-b border-zinc-100 pb-12 text-zinc-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              {article.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              6 Min Read
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Travel Guide
            </span>
          </div>

          <button
            type="button"
            className="ml-auto p-2 hover:text-black"
            aria-label="Share article"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <div className="prose prose-zinc prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => (
                <CloudinaryImage
                  src={typeof src === 'string' ? src : ''}
                  alt={alt || ''}
                  className="h-auto w-full rounded-2xl"
                  sizes="(min-width: 896px) 896px, 100vw"
                  widthHint={1280}
                  crop="limit"
                />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {affiliate && (
          <div className="mt-14 rounded-[32px] border border-amber-200 bg-amber-50/70 p-8 md:p-10">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-amber-700">
              Make It Easy
            </p>

            <h3 className="text-2xl font-black text-zinc-900">
              {affiliate.title}
            </h3>

            <p className="mt-3 text-sm text-zinc-700 md:text-base">
              {affiliate.description}
            </p>

            <a
              href={affiliate.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-black"
            >
              {affiliate.buttonText}
              <ExternalLink className="h-4 w-4" />
            </a>

            <p className="mt-4 text-xs text-zinc-500">
              This page may include affiliate links that help support Health and Travels.
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/chat"
            className="inline-flex rounded-2xl bg-brand-primary px-8 py-4 text-xs font-black uppercase tracking-widest text-white"
          >
            Plan My Trip With Sage
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
