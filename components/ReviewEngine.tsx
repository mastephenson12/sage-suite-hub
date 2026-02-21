import React, { useState } from 'react';
import { GMBReview } from '../types';
import { geminiService } from '../services/geminiService';

export const ReviewEngine: React.FC = () => {
  const [reviews] = useState<GMBReview[]>([
    { id: '1', brand: 'Campsage', author: 'Mark T.', rating: 5, text: 'Perfectly kept sites.', status: 'pending' },
    { id: '2', brand: 'Flightsage', author: 'Sarah L.', rating: 2, text: 'Delay was frustrating.', status: 'pending' }
  ]);
  const [analysis, setAnalysis] = useState<Record<string, string>>({});

  const handleAnalyze = async (id: string, text: string) => {
    const ai = geminiService.getClient();
    if (!ai) return;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a professional brand reply for this review: "${text}"`
    });
    setAnalysis(prev => ({ ...prev, [id]: response.text || "" }));
  };

  return (
    <div className="animate-in fade-in duration-700">
      <h2 className="text-3xl font-black tracking-tighter mb-12 uppercase">AI Review Engine</h2>
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="p-8 border border-zinc-100 rounded-sm bg-white shadow-sm">
            <div className="flex justify-between mb-4">
              <p className="text-[10px] font-black uppercase text-zinc-400">{review.brand}</p>
              <div className="text-black">{'★'.repeat(review.rating)}</div>
            </div>
            <p className="text-sm italic mb-6">"{review.text}"</p>
            {analysis[review.id] ? (
              <div className="bg-zinc-50 p-6 border border-zinc-100 text-xs leading-relaxed">
                {analysis[review.id]}
              </div>
            ) : (
              <button 
                onClick={() => handleAnalyze(review.id, review.text)}
                className="text-[10px] font-black uppercase border border-black px-6 py-2 hover:bg-black hover:text-white transition-all"
              >
                Generate Reply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
