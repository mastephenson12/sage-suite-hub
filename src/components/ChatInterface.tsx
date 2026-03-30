import React, { useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'model';
  content: string;
};

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
}

const DEFAULT_INITIAL_MESSAGE = `Hi, I’m Sage. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona.

Tell me where you want to go, your dates, how many adults and kids are traveling, and your budget.`;

const QUICK_PROMPTS = [
  'Sedona family trip',
  'Grand Canyon weekend',
  'Scottsdale couples getaway',
  'Flagstaff cabin trip',
  'Easy Arizona hikes with kids',
  'Best Arizona road trip',
];

function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium underline underline-offset-2"
        >
          {part}
        </a>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  initialMessage = DEFAULT_INITIAL_MESSAGE,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([{ role: 'model', content: initialMessage }]);
  }, [initialMessage]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, isLoading]);

  const transcript = useMemo(() => {
    return messages
      .map((msg) => `${msg.role === 'user' ? 'You' : 'Sage'}:\n${msg.content}`)
      .join('\n\n');
  }, [messages]);

  const showEmailCapture =
    messages.filter((msg) => msg.role === 'model').length > 1;

  const applyPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, email: email.trim() || undefined }),
      });

      const rawText = await response.text();

      let data: { text?: string; error?: string } = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        throw new Error(`Server returned non-JSON: ${rawText || '(empty response)'}`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      const reply =
        data.text?.trim() ||
        'I received a response, but it did not include usable text.';

      const modelMessage: Message = {
        role: 'model',
        content: reply,
      };

      setMessages([...nextMessages, modelMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'model',
        content:
          error?.message ||
          'I’m having trouble connecting right now. Please try again in a moment.',
      };

      setMessages([...nextMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPlan = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      alert('Please enter your email first.');
      return;
    }

    const subject = encodeURIComponent('Your Sage Trip Plan');
    const body = encodeURIComponent(`Here is your trip plan from Sage:\n\n${transcript}`);

    window.location.href = `mailto:${cleanEmail}?subject=${subject}&body=${body}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto grid h-[62vh] min-h-[500px] max-h-[640px] w-full grid-cols-1 gap-3 md:grid-cols-3">
        <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg md:col-span-2">
          <div className="border-b border-zinc-200 px-4 py-3">
            <h2 className="text-lg font-bold text-zinc-900 md:text-xl">
              Sage Trip Builder
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Ask Sage to help plan your next trip.
            </p>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto bg-zinc-50 px-3 py-2"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-zinc-900 text-white'
                        : 'border border-zinc-200 bg-white text-zinc-900'
                    }`}
                  >
                    <div className="mb-1 text-xs font-bold uppercase tracking-wide opacity-60">
                      {msg.role === 'user' ? 'You' : 'Sage'}
                    </div>
                    <div className="whitespace-pre-wrap break-words">
                      {linkifyText(msg.content)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wide opacity-60">
                      Sage
                    </div>
                    <div>Thinking...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col rounded-3xl border border-zinc-200 bg-white p-3 shadow-lg">
          <div>
            <h3 className="text-base font-bold text-zinc-900 md:text-lg">
              Your message
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Example: Plan a Sedona trip in April for 2 adults and 2 kids with a moderate budget.
            </p>
          </div>

          <div className="mt-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Quick ideas
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => applyPrompt(prompt)}
                  className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-1 flex-col gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              placeholder="Type your trip request..."
              className="w-full resize-none rounded-xl border-2 border-zinc-300 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
            />

            <p className="text-xs text-zinc-500">
              Press Enter to send. Shift+Enter for a new line.
            </p>

            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="rounded-xl bg-black px-5 py-3 font-bold text-white disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>

            {showEmailCapture && (
              <div className="mt-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                <p className="text-sm font-semibold text-zinc-900">
                  Like this plan?
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Email it to yourself so you don’t lose it.
                </p>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-3 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleEmailPlan}
                  disabled={messages.length < 2}
                  className="mt-3 w-full rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-bold text-zinc-900 disabled:opacity-50"
                >
                  Email me this plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
