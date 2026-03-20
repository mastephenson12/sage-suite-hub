import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Send,
  User,
  Bot,
  Loader2,
  Map,
  Shield,
  Zap,
  Sparkles,
  Compass,
  Tent,
  Plane,
  Hotel,
} from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  content: string;
}

type PlanDepth = 'quick' | 'detailed';

type TripField =
  | 'destination'
  | 'dates'
  | 'travelers'
  | 'budget'
  | 'tripStyle'
  | 'complete';

interface TripDetails {
  destination: string;
  dates: string;
  travelers: string;
  budget: string;
  tripStyle: string;
}

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
  planDepth?: PlanDepth;
  starterPrompt?: string;
}

const STORAGE_KEY = 'sage-chat-state-v3';

const STARTER_PROMPTS = [
  'Plan a weekend in Sedona with kids',
  '3-day Grand Canyon itinerary',
  'Find cheap flights from Phoenix in April',
  'Best camping spots in Arizona right now',
];

const QUICK_PROMPTS = [
  {
    label: 'Arizona Weekend Trip',
    prompt: 'Plan a 2-night Arizona weekend trip for a family with kids.',
    icon: Map,
  },
  {
    label: 'Cheap Flights',
    prompt: 'Help me find the best strategy for cheap flights from Arizona.',
    icon: Plane,
  },
  {
    label: 'Family Camping Trip',
    prompt: 'Plan a family camping trip in Arizona with easy logistics.',
    icon: Tent,
  },
  {
    label: 'Hotel + Activities',
    prompt: 'Build me a hotel and activity plan for an Arizona getaway.',
    icon: Hotel,
  },
];

const FIELD_ORDER: TripField[] = [
  'destination',
  'dates',
  'travelers',
  'budget',
  'tripStyle',
  'complete',
];

const FIELD_QUESTIONS: Record<Exclude<TripField, 'complete'>, string> = {
  destination:
    'Great — where are you going? You can say Arizona, Sedona, the Grand Canyon, or anywhere else.',
  dates:
    'What dates are you traveling, or what month or season are you aiming for?',
  travelers:
    'Who is going? Tell me how many adults, kids, or if it’s a couples or solo trip.',
  budget:
    'What budget range do you want me to plan around?',
  tripStyle:
    'What kind of trip do you want — hotel, camping, road trip, luxury, budget, family adventure, outdoor, or a mix?',
};

const DEFAULT_INITIAL_MESSAGE = `Hi, I’m Sage — your travel planning concierge.

I can help you plan an Arizona adventure or a trip anywhere else.

To build a useful plan fast, I’ll guide you through 5 quick things:
1. Destination
2. Dates
3. Travelers
4. Budget
5. Trip style

You can tap a starter prompt below or answer the first question:
Where are you thinking about going?`;

function getEmptyTripDetails(): TripDetails {
  return {
    destination: '',
    dates: '',
    travelers: '',
    budget: '',
    tripStyle: '',
  };
}

function getNextMissingField(details: TripDetails): TripField {
  if (!details.destination.trim()) return 'destination';
  if (!details.dates.trim()) return 'dates';
  if (!details.travelers.trim()) return 'travelers';
  if (!details.budget.trim()) return 'budget';
  if (!details.tripStyle.trim()) return 'tripStyle';
  return 'complete';
}

function buildStructuredPrompt(details: TripDetails, planDepth: PlanDepth) {
  return `
You are creating a ${planDepth === 'quick' ? 'quick' : 'detailed'} travel plan.

Traveler request:
- Destination: ${details.destination}
- Dates: ${details.dates}
- Travelers: ${details.travelers}
- Budget: ${details.budget}
- Trip style: ${details.tripStyle}

Instructions:
- Prioritize Arizona expertise when relevant.
- Be practical, specific, and booking-oriented.
- Reduce decision fatigue.
- Include clear next steps.
- Suggest real categories of things the traveler should book.

Return your answer in this exact structure:
1. Trip Summary
2. Best Area to Stay
3. Recommended Hotels or Camping Style
4. Top Activities
5. Food Stops
6. Booking Game Plan
7. Packing or Prep Notes

If quick mode, keep it concise and skimmable.
If detailed mode, include a simple day-by-day itinerary.
`.trim();
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  initialMessage = DEFAULT_INITIAL_MESSAGE,
  planDepth = 'quick',
  starterPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tripDetails, setTripDetails] = useState<TripDetails>(getEmptyTripDetails);
  const [currentStep, setCurrentStep] = useState<TripField>('destination');
  const [hasHydrated, setHasHydrated] = useState(false);
  const [lastStarterPrompt, setLastStarterPrompt] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const appendUserMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: 'user', content }]);
  };

  const appendModelMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: 'model', content }]);
  };

  const saveStepAnswer = (step: TripField, value: string) => {
    if (step === 'complete') return;

    const trimmed = value.trim();

    setTripDetails((prev) => {
      const next = {
        ...prev,
        [step]: trimmed,
      };

      setCurrentStep(getNextMissingField(next));
      return next;
    });
  };

  const runGuidedReply = async (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed || isLoading) return;

    appendUserMessage(trimmed);
    setInput('');

    const activeStep = getNextMissingField(tripDetails);

    if (activeStep !== 'complete') {
      saveStepAnswer(activeStep, trimmed);

      const updatedDetails: TripDetails = {
        ...tripDetails,
        [activeStep]: trimmed,
      };

      const nextStep = getNextMissingField(updatedDetails);

      if (nextStep !== 'complete') {
        appendModelMessage(FIELD_QUESTIONS[nextStep as Exclude<TripField, 'complete'>]);
        return;
      }

      setIsLoading(true);

      try {
        const structuredPrompt = buildStructuredPrompt(updatedDetails, planDepth);

        const history = [
          ...messages,
          { role: 'user' as const, content: trimmed },
        ].map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        }));

        const modelResponse = await chatWithGemini(structuredPrompt, history);

        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content:
              `Perfect — I’ve got what I need.\n\n` +
              `Here’s your ${planDepth === 'quick' ? 'quick trip plan' : 'full itinerary'}:\n\n` +
              modelResponse,
          },
        ]);
      } catch (error) {
        console.error('Chat error:', error);
        appendModelMessage(
          'I’m having trouble connecting right now. Please try again in a moment.'
        );
      } finally {
        setIsLoading(false);
      }

      return;
    }

    setIsLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const contextualPrompt = `
The user already provided these trip details:
- Destination: ${tripDetails.destination}
- Dates: ${tripDetails.dates}
- Travelers: ${tripDetails.travelers}
- Budget: ${tripDetails.budget}
- Trip style: ${tripDetails.tripStyle}

Current request:
${trimmed}

Respond as a practical travel concierge.
Keep helping them move toward booking decisions.
Suggest next-step booking actions whenever helpful.
`.trim();

      const modelResponse = await chatWithGemini(contextualPrompt, history);
      appendModelMessage(modelResponse);
    } catch (error) {
      console.error('Chat error:', error);
      appendModelMessage(
        'I’m having trouble connecting right now. Please try again in a moment.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterPrompt = async (prompt: string) => {
    if (isLoading) return;

    const emptyDetails = getEmptyTripDetails();
    setTripDetails(emptyDetails);
    setCurrentStep('destination');
    setInput('');
    setMessages([{ role: 'model', content: initialMessage }]);

    window.setTimeout(() => {
      runGuidedReply(prompt);
    }, 0);
  };

  const handleReset = () => {
    const emptyDetails = getEmptyTripDetails();
    setTripDetails(emptyDetails);
    setCurrentStep('destination');
    setInput('');
    setMessages([{ role: 'model', content: initialMessage }]);
    setLastStarterPrompt('');

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear chat state:', error);
    }
  };

  const handleSend = async () => {
    await runGuidedReply(input);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as {
          messages?: Message[];
          tripDetails?: TripDetails;
          currentStep?: TripField;
        };

        if (parsed.messages?.length) {
          setMessages(parsed.messages);
        } else {
          setMessages([{ role: 'model', content: initialMessage }]);
        }

        if (parsed.tripDetails) {
          setTripDetails(parsed.tripDetails);
        }

        if (parsed.currentStep) {
          setCurrentStep(parsed.currentStep);
        } else if (parsed.tripDetails) {
          setCurrentStep(getNextMissingField(parsed.tripDetails));
        }
      } else {
        setMessages([{ role: 'model', content: initialMessage }]);
      }
    } catch (error) {
      console.error('Failed to load saved chat state:', error);
      setMessages([{ role: 'model', content: initialMessage }]);
    } finally {
      setHasHydrated(true);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (!hasHydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          messages,
          tripDetails,
          currentStep,
        })
      );
    } catch (error) {
      console.error('Failed to save chat state:', error);
    }
  }, [messages, tripDetails, currentStep, hasHydrated]);

  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    if (container.scrollHeight > container.clientHeight) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!starterPrompt || starterPrompt === lastStarterPrompt || isLoading) return;

    setLastStarterPrompt(starterPrompt);
    handleStarterPrompt(starterPrompt);
  }, [starterPrompt, lastStarterPrompt, isLoading]);

  const isIntakeComplete = useMemo(
    () => getNextMissingField(tripDetails) === 'complete',
    [tripDetails]
  );

  const placeholder = useMemo(() => {
    switch (currentStep) {
      case 'destination':
        return 'Example: Sedona, Arizona or Maui, Hawaii';
      case 'dates':
        return 'Example: April 12–15 or late June';
      case 'travelers':
        return 'Example: 2 adults and 2 kids';
      case 'budget':
        return 'Example: under $1,500 total';
      case 'tripStyle':
        return 'Example: family adventure with hotel and easy hikes';
      default:
        return 'Ask Sage to refine your itinerary, stays, activities, or booking plan';
    }
  }, [currentStep]);

  return (
    <div className={`flex h-full min-h-0 flex-col overflow-hidden bg-white ${className}`}>
      <div className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white px-6 py-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <Sparkles className="h-3 w-3" />
              {planDepth === 'quick' ? 'Quick Plan Mode' : 'Full Itinerary Mode'}
            </span>

            {!isIntakeComplete && (
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
                <Compass className="h-3 w-3" />
                Step {Math.max(1, FIELD_ORDER.indexOf(currentStep) + 1)} of 5
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-black text-zinc-950">
              Start with a travel prompt
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Give people a fast way to start instead of making them guess what to type.
            </p>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {QUICK_PROMPTS.map(({ label, prompt, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleStarterPrompt(prompt)}
                disabled={isLoading}
                className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900">{label}</div>
                  <div className="text-xs text-zinc-500">{prompt}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleStarterPrompt(prompt)}
                disabled={isLoading}
                className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-zinc-100 bg-white p-6">
        <div className="mb-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                Current trip intake
              </div>
              <div className="mt-2 text-sm text-zinc-700">
                <span className="font-semibold text-zinc-900">Destination:</span>{' '}
                {tripDetails.destination || '—'}
                {'  '}•{'  '}
                <span className="font-semibold text-zinc-900">Dates:</span>{' '}
                {tripDetails.dates || '—'}
                {'  '}•{'  '}
                <span className="font-semibold text-zinc-900">Travelers:</span>{' '}
                {tripDetails.travelers || '—'}
              </div>
              <div className="mt-1 text-sm text-zinc-700">
                <span className="font-semibold text-zinc-900">Budget:</span>{' '}
                {tripDetails.budget || '—'}
                {'  '}•{'  '}
                <span className="font-semibold text-zinc-900">Style:</span>{' '}
                {tripDetails.tripStyle || '—'}
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-600 transition hover:bg-zinc-50"
            >
              Start Over
            </button>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-zinc-100 bg-zinc-50 py-4 pl-6 pr-16 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
          />

          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-zinc-950 text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <Map className="h-3 w-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">
              Family Trip Planning
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">
              Arizona Expertise
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">
              Flights • Camping • Hotels
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-6 pt-4 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[90%] gap-4 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl shadow-sm ${
                  msg.role === 'user' ? 'bg-zinc-100' : 'bg-zinc-950'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="h-5 w-5 text-zinc-500" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>

              <div
                className={`whitespace-pre-wrap rounded-[24px] p-5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-tr-none bg-brand-primary text-white'
                    : 'rounded-tl-none border border-zinc-100 bg-zinc-50 text-zinc-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[90%] gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 shadow-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>

              <div className="flex items-center gap-3 rounded-[24px] rounded-tl-none border border-zinc-100 bg-zinc-50 p-5">
                <Loader2 className="h-4 w-4 animate-spin text-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Building your travel plan...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
