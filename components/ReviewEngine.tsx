import React, { useState } from 'react';
import { Type } from "@google/genai";
import { GMBReview } from '../types.ts';
import { geminiService } from '../services/gemini.ts';

export const ReviewEngine: React.FC = () => {
  const [reviews, setReviews] = useState<GMBReview[]>([
    { id: '1', brand: 'Campsage', author: 'Mark T.', rating: 5, text: 'The wilderness sites were primitive but perfectly kept. Unforgettable memories.', status: 'pending' },
    { id: '2', brand: 'Flightsage', author: 'Sarah L.', rating: 2, text: 'Flight was delayed 6 hours and no one helped with the reunion booking.', status: 'pending' }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);

  const analyzeReview = async (review: GMBReview) => {
    setIsAnalyzing(review.id);
    try {
      const ai = geminiService.getClient();
      if (!ai) throw new Error("Connection failed");

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this review for ${review.brand} and provide a suggested brand-aligned reply. Review: "${review.text}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sentiment: { type: Type.STRING },
              reply: { type: Type.STRING }
            },
            required: ['sentiment', 'reply']
          }
        }
      });

      const data = JSON.parse(response.text);
      setReviews(prev => prev.map(r => r.id === review.id ? { 
        ...r, 
        sentiment: data.sentiment as any, 
        suggestedReply: data.reply 
      } : r));
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(null);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-12">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">GMB Integration</p>
        <h2 className="text-3xl font-black tracking-tighter">AI Review Engine</h2>
      </header>
      <div className="space-y-8">
        {reviews.map(review => (
          <div key={review.id} className="p-10 border border-zinc-100 rounded-sm bg-white hover:border-zinc-200 transition-colors">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{review.brand}</p>
                <h3 className="text-xl font-black">{review.author}</h3>
                <div className="flex space-x-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? "text-black" : "text-zinc-100"}>★</span>
                  ))}
                </div>
              </div>
              {review.sentiment && (
                <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] rounded-sm ${
                  review.sentiment === 'Positive' ? 'bg-zinc-50 text-black border border-zinc-100' : 
                  review.sentiment === 'Negative' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-zinc-50 text-zinc-500'
                }`}>
                  {review.sentiment}
                </span>
              )}
            </div>
            <p className="text-zinc-600 mb-10 text-sm leading-relaxed italic border-l-2 border-zinc-100 pl-6">"{review.text}"</p>
            {review.suggestedReply ? (
              <div className="bg-zinc-50/50 p-8 border border-zinc-100 rounded-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">AI Suggested Response</p>
                <p className="text-sm text-zinc-800 leading-relaxed font-medium mb-8">{review.suggestedReply}</p>
                <div className="flex space-x-4">
                  <button className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-8 py-3 hover:opacity-80 transition-opacity">Sync to GMB</button>
                  <button className="text-[10px] font-black uppercase tracking-widest border border-zinc-200 text-zinc-400 px-8 py-3 hover:text-black hover:border-black transition-all">Edit Draft</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => analyzeReview(review)}
                disabled={isAnalyzing === review.id}
                className="text-[10px] font-black uppercase tracking-widest border border-zinc-200 px-10 py-4 hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30"
              >
                {isAnalyzing === review.id ? 'Analyzing Content...' : 'Generate Brand Reply'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
