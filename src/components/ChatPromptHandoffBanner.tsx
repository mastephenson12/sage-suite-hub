import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

interface ChatPromptHandoffBannerProps {
  prompt: string;
  tripSlug?: string;
}

const ChatPromptHandoffBanner: React.FC<ChatPromptHandoffBannerProps> = ({
  prompt,
  tripSlug,
}) => {
  const cleanPrompt = prompt.trim();

  if (!cleanPrompt) return null;

  const returnUrl = tripSlug
    ? `/trip-builder?plan=ready&location=${encodeURIComponent(tripSlug)}`
    : '/trip-builder';

  return (
    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" />
          <div>
            <p className="text-sm font-black text-emerald-950">
              Selected request queued
            </p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-950/80">
              {cleanPrompt}
            </p>
          </div>
        </div>

        <Link
          to={returnUrl}
          className="inline-flex flex-shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-800 transition hover:bg-emerald-100"
        >
          Back to trip result
        </Link>
      </div>
    </div>
  );
};

export default ChatPromptHandoffBanner;
