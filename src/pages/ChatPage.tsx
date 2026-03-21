import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, User, Bot, Loader2, Sparkles, Compass, RotateCcw } from 'lucide-react';
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

const STORAGE_KEY = 'sage-chat-state-v4';

const STARTER_PROMPTS = [
  'Weekend in Sedona with kids',
  'Grand Canyon 3-day plan',
  'Cheap flights from Phoenix',
];

const DEFAULT_INITIAL_MESSAGE = `Hi, I’m Sage.

I’ll help you plan your trip step by step:
destination, dates, travelers, budget, and trip style.

Where are you thinking about going?`;

const FIELD_ORDER: TripField[] = [
  'destination',
  'dates',
  'travelers',
  'budget',
  'tripStyle',
  'complete',
];

const FIELD_QUESTIONS: Record<Exclude<TripField, 'complete'>, string> = {
  destination: 'Where are you thinking about going?',
  dates: 'What dates or month are you planning for?',
  travelers: 'How many adults and kids are traveling?',
  budget: 'What budget range should I plan around?',
  tripStyle: 'Do you want hotel, camping, road trip, adventure, or something else?',
};

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
You are Sage, a practical travel concierge.

Trip details:
- Destination: ${details.destination}
- Dates: ${details.dates}
- Travelers: ${details.travelers}
- Budget: ${details.budget}
- Trip style: ${details.tripStyle}

Instructions:
- Be practical and concise.
- Help the user move toward booking decisions.
- Prioritize Arizona expertise when relevant.

Return:
1. Trip Summary
2. Best Area to Stay
3. Top Activities
4. Food Stops
5. Booking Game Plan
6. Packing Notes

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
      const next = { ...prev, [step]: trimmed };
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
        const history = [
          ...messages,
          { role: 'user' as const, content: trimmed },
        ].map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        }));

        const modelResponse = await chatWithGemini(
          buildStructuredPrompt(updatedDetails, planDepth),
          history
        );

        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content:
              `Perfect — here’s your ${
                planDepth === 'quick' ? 'quick trip plan' : 'full itinerary'
              }:\n\n${modelResponse}`,
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
The user already provided:
- Destination: ${tripDetails.destination}
- Dates: ${tripDetails.dates}
- Travelers: ${tripDetails.travelers}
- Budget: ${tripDetails.budget}
- Trip style: ${tripDetails.tripStyle}

User request:
${trimmed}

Respond as a practical travel concierge and help them move toward booking decisions.
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

    setTripDetails(getEmptyTripDetails());
    setCurrentStep('destination');
    setInput('');
    setMessages([{ role: 'model', content: initialMessage }]);

    window.setTimeout(() => {
      runGuidedReply(prompt);
    }, 0);
  };

  const handleReset = () => {
    setTripDetails(getEmptyTripDetails());
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as {
          messages?: Message[];
          tripDetails?: TripDetails;
          currentStep?: TripField;
        };

        setMessages(parsed.messages?.length ? parsed.messages : [{ role: 'model', content: initialMessage }]);
        if (parsed.tripDetails) setTripDetails(parsed.tripDetails);
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const compactSummary = useMemo(() => {
    const parts = [
      tripDetails.destination,
      tripDetails.dates,
      tripDetails.travelers,
      tripDetails.budget,
      tripDetails.tripStyle,
    ].filter(Boolean);

    return parts.length ? parts.join(' • ') : 'No trip details yet';
  }, [tripDetails]);

  const placeholder = useMemo(() => {
    switch (currentStep) {
      case 'destination':
        return 'Where do you want to go?';
      case 'dates':
        return 'When are you traveling?';
      case 'travelers':
        return 'How many adults and kids?';
      case 'budget':
        return 'What budget do you want?';
      case 'tripStyle':
        return 'Hotel, camping, road trip, family adventure...';
      default:
        return 'Ask Sage to refine your trip';
    }
  }, [currentStep]);

  return (
    <div className={`flex h-full min-h-0 flex-col overflow-hidden bg-white ${className}`}>
      <div className="sticky top-0 z-10 border-b border-zinc-100 bg-white">
        <div className="px-4 py-3 md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <Sparkles className="h-3 w-3" />
                {planDepth === 'quick' ? 'Quick Plan' : 'Full Itinerary'}
              </span>

              {!isIntakeComplete && (
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
                  <Compass className="h-3 w-3" />
                  Step {Math.max(1, FIELD_ORDER.indexOf(currentStep) + 1)} of 5
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-zinc-600 transition hover:bg-zinc-50"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="mt-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-2">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    runGuidedReply(input);
                  }
                }}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-zinc-100 bg-white py-3 pl-4 pr-14 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-brand-primary/10"
              />

              <button
                onClick={() => runGuidedReply(input)}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-zinc-950 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleStarterPrompt(prompt)}
                  disabled={isLoading}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-2 text-[11px] text-zinc-500">
              {compactSummary}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 md:px-5">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[90%] gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                    msg.role === 'user' ? 'bg-zinc-100' : 'bg-zinc-950'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="h-4 w-4 text-zinc-500" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                <div
                  className={`whitespace-pre-wrap rounded-[20px] p-4 text-sm leading-relaxed ${
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
              <div className="flex max-w-[90%] gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950">
                  <Bot className="h-4 w-4 text-white" />
                </div>

                <div className="flex items-center gap-3 rounded-[20px] rounded-tl-none border border-zinc-100 bg-zinc-50 p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Building your plan...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};
