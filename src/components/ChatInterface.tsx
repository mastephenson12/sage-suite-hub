import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Accessibility,
  CalendarDays,
  Dog,
  Footprints,
  Gem,
  IceCream,
  Map,
  PiggyBank,
  Snowflake,
  Utensils,
} from 'lucide-react';

type Message = {
  role: 'user' | 'model';
  content: string;
};

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
  initialPrompt?: string;
}

const DEFAULT_INITIAL_MESSAGE = `Hi, I’m Scout. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona.

Tell me where you want to go, your dates, how many adults and kids are traveling, and your budget.`;

const QUICK_PROMPTS = [
  'Sedona family trip',
  'Grand Canyon weekend',
  'Scottsdale couples getaway',
  'Flagstaff cabin trip',
  'Easy Arizona hikes with kids',
  'Best Arizona road trip',
];

const ARIZONA_STARTERS = [
  {
    label: 'Easy family hikes',
    description: 'Gentle trails that work for kids and beginners',
    prompt:
      'Help me find an easy family hike in Arizona. Ask me about our starting point, the kids’ ages, the season, and whether we need shade, bathrooms, or stroller access.',
    icon: Footprints,
  },
  {
    label: 'Cool off',
    description: 'Water, shade, and cooler high-country escapes',
    prompt:
      'Help me find places to cool off in Arizona. Ask where we are starting, who is going, how far we can drive, and whether we prefer water, indoor activities, or cooler mountain weather.',
    icon: Snowflake,
  },
  {
    label: 'Weekend trips',
    description: 'A realistic two- or three-day Arizona getaway',
    prompt:
      'Plan an Arizona weekend trip for us. Ask about our starting point, group, budget, dates, drive limit, and preferred mix of outdoor time, food, and relaxing.',
    icon: Map,
  },
  {
    label: 'Local food',
    description: 'Memorable stops to pair with an adventure',
    prompt:
      'Help me plan an Arizona adventure around great local food. Ask where we will be, who is going, our food preferences, budget, and what activities we want nearby.',
    icon: Utensils,
  },
  {
    label: 'Dog friendly',
    description: 'Trails, patios, stays, and stops for your pup',
    prompt:
      'Find a dog-friendly Arizona adventure. Ask about our location, dates, drive limit, dog’s size and trail experience, and whether we need pet-friendly food or lodging.',
    icon: Dog,
  },
  {
    label: 'Toddler friendly',
    description: 'Short outings with practical family details',
    prompt:
      'Find toddler-friendly activities in Arizona. Ask about our starting point, dates, drive limit, nap schedule, stroller needs, bathrooms, shade, and indoor backup options.',
    icon: IceCream,
  },
  {
    label: 'Accessible adventures',
    description: 'Options shaped around mobility and access needs',
    prompt:
      'Help me find an accessible Arizona adventure. Ask about our starting point, dates, drive limit, mobility needs, surface requirements, restrooms, parking, and other accommodations.',
    icon: Accessibility,
  },
  {
    label: 'Free things to do',
    description: 'Low-cost ideas with no admission required',
    prompt:
      'Find free things to do in Arizona. Ask where we are starting, who is going, when, how far we can drive, and whether we prefer nature, culture, or a mix.',
    icon: PiggyBank,
  },
  {
    label: 'Hidden gems',
    description: 'Quieter Arizona places beyond the obvious stops',
    prompt:
      'Show me hidden gems in Arizona. Ask about our starting point, group, dates, drive limit, interests, and comfort with dirt roads or less-developed places.',
    icon: Gem,
  },
  {
    label: 'This weekend',
    description: 'Timely ideas shaped around your group',
    prompt:
      'Help me choose the best Arizona activities for this weekend. Ask where we are starting, who is going, how far we can drive, our budget, and what kind of day we want.',
    icon: CalendarDays,
  },
] as const;

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
  initialPrompt = '',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: initialMessage },
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const hasAutoSentPrompt = useRef(false);

  useEffect(() => {
    setMessages([{ role: 'model', content: initialMessage }]);
  }, [initialMessage]);

  useEffect(() => {
    setInput(initialPrompt || '');
    hasAutoSentPrompt.current = false;
  }, [initialPrompt]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, isLoading]);

  const transcript = useMemo(() => {
    return messages
      .map((msg) => `${msg.role === 'user' ? 'You' : 'Scout'}:\n${msg.content}`)
      .join('\n\n');
  }, [messages]);

  const showEmailCapture =
    messages.filter((msg) => msg.role === 'model').length > 1;

  const applyPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed) return;

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

  useEffect(() => {
    if (!initialPrompt.trim()) return;
    if (hasAutoSentPrompt.current) return;
    if (isLoading) return;

    hasAutoSentPrompt.current = true;
    void sendMessage(initialPrompt);
  }, [initialPrompt, isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    await sendMessage(trimmed);
  };

  const handleEmailPlan = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      alert('Please enter your email first.');
      return;
    }

    const subject = encodeURIComponent('Your Scout Trip Plan');
    const body = encodeURIComponent(`Here is your trip plan from Scout:\n\n${transcript}`);

    window.location.href = `mailto:${cleanEmail}?subject=${subject}&body=${body}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <section
        aria-labelledby="arizona-starters-title"
        className="border-b border-zinc-200 bg-gradient-to-br from-amber-50 via-white to-emerald-50/70 px-4 py-6 md:px-6 md:py-7"
      >
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-primary">
              Start exploring Arizona
            </p>
            <h2
              id="arizona-starters-title"
              className="mt-2 text-2xl font-black tracking-tight text-zinc-950 md:text-3xl"
            >
              What kind of adventure are you looking for?
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 md:text-base">
              Choose a starting point and Sage will ask the right follow-up questions.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {ARIZONA_STARTERS.map(({ label, description, prompt, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => void sendMessage(prompt)}
                disabled={isLoading}
                aria-label={`${label}: ${description}`}
                className="group flex min-h-[104px] items-start gap-3 rounded-2xl border border-zinc-200/90 bg-white/90 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="block text-sm font-bold leading-5 text-zinc-900">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs leading-4 text-zinc-500">
                    {description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid h-[62vh] min-h-[500px] max-h-[640px] w-full grid-cols-1 gap-3 md:grid-cols-3">
        <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg md:col-span-2">
          <div className="border-b border-zinc-200 px-4 py-3">
            <h2 className="text-lg font-bold text-zinc-900 md:text-xl">
              Scout Portal
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Full trip planning for Arizona and beyond.
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
                      {msg.role === 'user' ? 'You' : 'Scout'}
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
                      Scout
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
              Ask Scout for a trip plan, route, stay ideas, or Arizona adventure.
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
              onClick={() => void handleSend()}
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
