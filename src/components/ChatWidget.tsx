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
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-[calc(100vw-1.5rem)] ${className}`}
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-lg transition hover:shadow-xl"
          aria-label="Open Sage AI planner"
        >
          <span className="flex h-3 w-3 rounded-full bg-brand-primary" />
          <span className="text-sm font-bold text-zinc-900">Plan a Trip</span>
        </button>
      ) : (
        <div className="w-[300px] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl md:w-[320px]">
          <div className="border-b border-zinc-100 bg-zinc-950 px-4 py-3 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-300">
                  Sage AI Planner
                </p>
                <h3 className="mt-1 text-base font-black">
                  Need help planning a trip?
                </h3>
                <p className="mt-1 text-xs text-zinc-300">
                  Start here, then open the full planner.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full px-2 py-1 text-sm font-bold text-zinc-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close trip planner widget"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-3 p-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                Quick ideas
              </p>

              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((item) => (
                  <button
                    key={item}
                    type="button"
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
              className="w-full resize-none rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
            />

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => openPlanner()}
                className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-black"
              >
                Open full planner
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Minimize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
