import React, { useEffect, useRef, useState } from 'react';
import { Send, User, Bot, Loader2, Sparkles, RotateCcw } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
}

const STARTER_PROMPTS = [
  'Sedona in April, 2 adults and 2 kids, hotel, moderate budget',
  'Scottsdale girls trip in May, spa + restaurants, luxury budget',
  'Grand Canyon weekend, family-friendly hikes, one night',
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  initialMessage = `Hi, I’m Sage. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona.

Tell me where you want to go, your dates, how many adults and kids are traveling, and your budget.`,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setMessages([{ role: 'model', content: initialMessage }]);
    setInput('');
    setIsLoading(false);
  }, [initialMessage]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const shouldScroll =
      container.scrollHeight > container.clientHeight || messages.length <= 2;

    if (shouldScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
  }, [input]);

  const resetTrip = () => {
    setMessages([{ role: 'model', content: initialMessage }]);
    setInput('');
    setIsLoading(false);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];

    setInput('');
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data: { text?: string; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content:
            data.text?.trim() ||
            data.error ||
            'I need a little more information to help. Tell me your destination, dates, number of travelers, kids’ ages, and budget.',
        },
      ]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content:
            error?.message ||
            'I’m having trouble connecting right now. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const applyStarterPrompt = (prompt: string): void => {
    setInput(prompt);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto flex h-full min-h-[60vh] w-full flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        <div className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white px-5 py-5 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-zinc-500">
                  Sage Trip Builder
                </p>
                <h2 className="mt-1 text-xl font-black tracking-tight text-zinc-950 md:text-2xl">
                  Tell Sage what kind of trip you want to build
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 md:text-base">
                  Start with your destination, dates, travelers, budget, and trip
                  style. Sage will ask follow-up questions and help shape the
                  itinerary with you.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetTrip}
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <RotateCcw className="h-4 w-4" />
              Start New Trip
            </button>
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-1 space-y-4 overflow-y-auto bg-white px-4 py-5 md:px-8 md:py-6"
        >
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={`${msg.role}-${i}`}
                className={`flex items-start gap-3 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!isUser && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm md:max-w-[75%] md:px-5 md:py-4 md:text-[15px] ${
                    isUser
                      ? 'bg-zinc-950 text-white'
                      : 'border border-zinc-200 bg-zinc-50 text-zinc-900'
                  }`}
                >
                  <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                    {isUser ? 'You' : 'Sage'}
                  </div>
                  <div className="whitespace-pre-wrap break-words">
                    {msg.content}
                  </div>
                </div>

                {isUser && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                <Bot className="h-4 w-4" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sage is building your trip...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-zinc-100 bg-white px-4 py-4 md:px-8 md:py-6">
          <label
            htmlFor="trip-builder-input"
            className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-zinc-900"
          >
            Start here
          </label>

          <p className="mb-3 text-sm text-zinc-600">
            Paste or type your trip details below. The more you include, the
            better Sage can help.
          </p>

          <div className="mb-3 flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => applyStarterPrompt(prompt)}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              ref={textareaRef}
              id="trip-builder-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={5}
              placeholder="Example: We want a 4-day Sedona trip in June for 2 adults and 2 kids, budget under $2,500, easy hikes, a pool, and one special dinner."
              className="max-h-[220px] min-h-[140px] w-full resize-none rounded-[1.75rem] border border-zinc-200 bg-zinc-50 px-5 py-4 pr-20 text-base leading-6 text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-zinc-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="mt-2 flex flex-col gap-1 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
            <span>
              Include destination, dates, travelers, budget, and preferences.
            </span>
            <span>Press Ctrl+Enter or Cmd+Enter to send.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
