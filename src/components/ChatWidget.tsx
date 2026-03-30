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
  const navigate = useNavigate();

  const openScoutPortal = (value?: string) => {
    const finalPrompt = (value ?? prompt).trim();

    if (finalPrompt) {
      navigate(`/chat?prompt=${encodeURIComponent(finalPrompt)}`);
      return;
    }

    navigate('/chat');
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] ${className}`}>
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">
        <div className="border-b border-zinc-100 bg-zinc-950 px-4 py-3 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-300">
            Scout
          </p>
          <h3 className="mt-1 text-lg font-black">Need help planning a trip?</h3>
          <p className="mt-1 text-sm text-zinc-300">
            Start here, then open the full Scout portal.
          </p>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Quick ideas
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => openScoutPortal(item)}
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
            placeholder="Ask Scout anything..."
            className="w-full resize-none rounded-2xl border-2 border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => openScoutPortal()}
            className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-black"
          >
            Open full Scout portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
