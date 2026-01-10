import React, { useState } from 'react';
import { Review, ReplyTone } from '../types';
import { generateReviewReply } from '../services/geminiService';
import { Star, MessageCircle, Send, Wand2, CheckCircle2 } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
  onUpdateReview: (updatedReview: Review) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, onUpdateReview }) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [generatedReply, setGeneratedReply] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTone, setSelectedTone] = useState<ReplyTone>('Professional');

  const handleGenerateReply = async (review: Review) => {
    setIsGenerating(true);
    setGeneratedReply(''); 
    setSelectedReview(review); 
    
    try {
      const reply = await generateReviewReply(review, selectedTone);
      setGeneratedReply(reply);
    } catch (error) {
      console.error(error);
      setGeneratedReply("Error generating reply. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveReply = () => {
    if (!selectedReview) return;
    setIsSaving(true);
    setTimeout(() => {
        onUpdateReview({
            ...selectedReview,
            status: 'replied',
            reply: generatedReply
        });
        setIsSaving(false);
        setSelectedReview(null);
        setGeneratedReply('');
    }, 800);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-8">
      {/* List */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-colors">
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-xl text-slate-800 dark:text-slate-100">Inbox</h2>
          <span className="text-xs font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full">
            {reviews.filter(r => r.status === 'pending').length} Pending
          </span>
        </div>
        <div className="overflow-y-auto flex-1 p-3 space-y-1">
          {reviews.map((review) => (
            <div 
              key={review.id}
              onClick={() => {
                  setSelectedReview(review);
                  setGeneratedReply(review.reply || '');
              }}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedReview?.id === review.id 
                  ? 'bg-blue-50/80 dark:bg-blue-900/20' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-semibold text-sm ${selectedReview?.id === review.id ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-slate-100'}`}>
                    {review.author}
                  </h4>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 dark:text-slate-700'}`} 
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-2">{review.date}</span>
                  </div>
                </div>
                {review.status === 'replied' ? (
                   <CheckCircle2 className="w-4 h-4 text-green-500 opacity-50" />
                ) : (
                    <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30" />
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{review.content}</p>
              
              {review.sentiment && (
                  <div className="mt-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase
                        ${review.sentiment === 'Positive' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : 
                          review.sentiment === 'Negative' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'}`}>
                          {review.sentiment}
                      </span>
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail / Action */}
      <div className="lg:w-[28rem] bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex flex-col transition-colors">
        {selectedReview ? (
          <div className="flex flex-col h-full">
             <div className="p-6 border-b border-slate-50 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-lg shadow-inner">
                            {selectedReview.author[0]}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-slate-100">{selectedReview.author}</h3>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Google Review</p>
                        </div>
                     </div>
                     <div className="flex text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                        <span className="font-bold text-slate-800 dark:text-yellow-100 mr-1.5">{selectedReview.rating}</span>
                        <Star className="w-4 h-4 fill-current mt-0.5" />
                     </div>
                </div>
                <div className="relative">
                    <div className="absolute -left-3 top-4 w-6 h-6 bg-slate-50 dark:bg-slate-800 transform rotate-45" />
                    <p className="relative z-10 text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl rounded-tl-none">
                        "{selectedReview.content}"
                    </p>
                </div>
             </div>

             <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reply</label>
                    {selectedReview.status === 'pending' && (
                        <div className="flex items-center space-x-2">
                            <select 
                                value={selectedTone}
                                onChange={(e) => setSelectedTone(e.target.value as ReplyTone)}
                                className="text-xs font-medium border-none bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg px-3 py-1.5 cursor-pointer focus:ring-0 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                                <option value="Professional">Professional</option>
                                <option value="Friendly">Friendly</option>
                                <option value="Witty">Witty</option>
                            </select>
                            <button 
                                onClick={() => handleGenerateReply(selectedReview)}
                                disabled={isGenerating}
                                className="text-xs px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 font-bold transition-all disabled:opacity-50 flex items-center"
                            >
                                <Wand2 className={`w-3 h-3 mr-1.5 ${isGenerating ? 'animate-spin' : ''}`} />
                                {isGenerating ? 'Thinking...' : 'Auto-Draft'}
                            </button>
                        </div>
                    )}
                </div>
                <textarea 
                    className="flex-1 w-full p-4 border-0 bg-slate-50 dark:bg-slate-950/50 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/50 outline-none resize-none text-slate-700 dark:text-slate-300 placeholder-slate-400 transition-all"
                    placeholder="Write your reply..."
                    value={generatedReply}
                    onChange={(e) => setGeneratedReply(e.target.value)}
                    disabled={selectedReview.status === 'replied'}
                />
             </div>

             <div className="p-6 pt-0">
                {selectedReview.status === 'replied' ? (
                    <div className="w-full py-3 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-xl font-semibold text-sm flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Reply Sent
                    </div>
                ) : (
                    <button 
                        onClick={handleSaveReply}
                        disabled={!generatedReply || isSaving}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98]"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        ) : (
                            <Send className="w-4 h-4 mr-2" />
                        )}
                        Send Reply
                    </button>
                )}
             </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 p-8 text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                 <MessageCircle className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-sm font-medium">Select a review to start drafting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
