import React, { useState } from 'react';
import { geminiService } from '../services/gemini.ts';

interface SearchResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export const SearchHubView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || isSearching) return;
    setIsSearching(true);
    try {
      const ai = geminiService.getClient();
      if (!ai) throw new Error("Satellite Link Down");

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || '#'
      })) || [];

      setResult({
        text: response.text || '',
        sources: sources
      });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-12">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Intelligence Engine</p>
        <h2 className="text-3xl font-black tracking-tighter">Factual Grounding</h2>
      </header>

      <div className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ask about recent events, facts, or news..."
          className="w-full border-b-2 border-zinc-100 py-6 text-2xl font-medium focus:outline-none focus:border-black transition-colors placeholder-zinc-200"
        />
        <button 
          onClick={handleSearch}
          disabled={isSearching}
          className="absolute right-0 bottom-6 text-[10px] font-black uppercase tracking-widest bg-black text-white px-8 py-3 hover:opacity-80 transition-opacity disabled:opacity-20"
        >
          {isSearching ? 'Searching' : 'Search'}
        </button>
      </div>

      {result ? (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Sage Analysis</p>
            <div className="text-zinc-800 text-lg leading-relaxed whitespace-pre-wrap max-w-3xl">
              {result.text}
            </div>
          </div>

          {result.sources.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Grounding Sources</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.sources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-6 border border-zinc-100 rounded-sm hover:border-black transition-all flex items-center justify-between group"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-xs font-bold text-black truncate mb-1">{source.title}</p>
                      <p className="text-[10px] text-zinc-400 truncate tracking-tight">{source.uri}</p>
                    </div>
                    <svg className="w-4 h-4 text-zinc-300 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-24 border-2 border-dashed border-zinc-50 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-zinc-300 uppercase tracking-widest font-black mb-2">Awaiting Inquiry</p>
          <p className="text-xs text-zinc-200 uppercase tracking-widest">Global Factual Search Active</p>
        </div>
      )}
    </div>
  );
};
