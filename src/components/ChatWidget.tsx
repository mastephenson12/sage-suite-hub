import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUICK_PROMPTS = [
  'Sedona family trip',
  'Grand Canyon weekend',
  'Arizona road trip',
];

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ className = '' }) => {
  const [prompt, setPrompt] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openPlanner = (value?: string) => {
    const finalPrompt = (value ?? prompt).trim();

    if (finalPrompt) {
      navigate(`/chat?prompt=${encodeURIComponent(finalPrompt)}`);
    } else {
      navigate('/chat');
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      
      {/* CLOSED STATE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-white shadow-lg shadow-brand-primary/30 transition hover:scale-105 active:scale-95"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-bold">Plan a Trip</span>
        </button>
      )}

      {/* OPEN STATE */}
      {isOpen && (
        <div className="w-[300px] md:w-[320px] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">
          
          {/* HEADER */}
          <div className="bg-brand-primary px-4 py-3 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/80">
                  Sage AI
                </p>
                <h3 className="mt-1 text-base font-black">
                  Plan your next trip
                </h3>
                <p className="mt-1 text-xs text-white/80">
                  Quick ideas or build a full plan
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="space-y-3 p-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                Quick ideas
              </p>

              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((item) => (
                  <button
                    key={item}
                    onClick={() => openPlanner(item)}
                    className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Ask Sage anything..."
              className="w-full resize-none rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-brand-primary focus:outline-none"
            />

            <button
              onClick={() => openPlanner()}
              className="w-full rounded-2xl bg-brand-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              Open full planner
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
