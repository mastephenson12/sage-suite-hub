import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articles } from '../data/articles';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Intel Not Found</h1>
        <p className="text-zinc-500 mb-8">The requested archive record does not exist or has been declassified.</p>
        <Link to="/archive" className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">
          Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-zinc-100">
        <img 
          src={article.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'} 
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
            target.parentElement!.innerHTML = `<div class="text-zinc-300 text-xs font-black uppercase tracking-[0.4em]">Archive Visual Missing</div>`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/archive" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Archive</span>
            </Link>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                <Tag className="w-3 h-3" /> {article.category}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/20">
                <Calendar className="w-3 h-3" /> {article.date}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Info */}
          <aside className="md:w-64 flex-shrink-0 space-y-8">
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Intelligence Source</h3>
              <p className="text-xs font-bold text-black uppercase tracking-widest leading-relaxed">
                Health & Travels <br/>
                Adventure Command <br/>
                Node 3.1
              </p>
            </div>
            
            <button className="w-full flex items-center justify-center gap-3 p-4 border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors">
              <Share2 className="w-4 h-4" /> Share Intel
            </button>
          </aside>

          {/* Article Body */}
          <article className="flex-grow">
            <div className="markdown-body prose prose-lg prose-zinc max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
            </div>
            
            <div className="mt-16 pt-16 border-t border-zinc-100">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 text-center">End of Report</h4>
              <div className="flex justify-center">
                <Link to="/archive" className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-brand-primary transition-all shadow-xl shadow-zinc-200">
                  Return to Archive
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
