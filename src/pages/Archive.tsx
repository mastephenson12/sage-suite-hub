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
    <div className="max-w-6xl mx-auto px-6 py-24">
      <header className="mb-20">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-6">
          Archive
        </h1>

        <p className="max-w-3xl text-xl italic font-serif text-zinc-500">
          Explore our growing collection of Arizona travel guides, trail notes,
          and family adventure ideas.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <Link
           
