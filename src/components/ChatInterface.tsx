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
  Mail,
  CheckCircle2,
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
  leadEndpoint?: string;
}

type EmailCaptureStatus = 'idle' | 'submitting' | 'success' | 'error';

const STORAGE_KEY = 'sage-chat-state-v4';

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

function buildInitialPlanPrompt(details: TripDetails, planDepth: PlanDepth) {
  return `
You are Sage, a travel planning concierge.

Traveler request:
- Destination: ${details.destination}
- Dates: ${details.dates}
- Travelers: ${details.travelers}
- Budget: ${details.budget}
- Trip style: ${details.tripStyle}

Goal:
Give the traveler immediate starter value, but do NOT overwhelm them.
This is the initial preview they see before deciding whether they want more trip help by email.

Instructions:
- Prioritize Arizona expertise when relevant.
- Be practical, specific, and easy to skim.
- Reduce decision fatigue.
- Keep recommendations realistic for the stated budget and traveler type.
- Do not mention JSON or metadata.
- Do not ask for their email inside the plan.
- End with one short sentence that says you can give them a fuller version next.

Return your answer in this exact structure:
1. Trip Summary
2. Best Area to Stay
3. Stay Option Ideas
4. Top Activities
5. Food Stops
6. Booking Game Plan
7. One simple next step

${
  planDepth === 'quick'
    ? 'Keep the whole response concise and scannable.'
    : 'Make it richer, but still preview-level rather than a full deep-dive itinerary.'
}
`.trim();
}

function buildFollowupPrompt(details: TripDetails, request: string) {
  return `
The user already provided these trip details:
- Destination: ${details.destination}
- Dates: ${details.dates}
- Travelers: ${details.travelers}
- Budget: ${details.budget}
- Trip style: ${details.tripStyle}

Current request:
${request}

Respond as a practical travel concierge.
Keep helping them make booking decisions.
Suggest next-step booking actions whenever helpful.
`.trim();
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  initialMessage = DEFAULT_INITIAL_MESSAGE,
  planDepth = 'quick',
  starterPrompt,
  leadEndpoint = '/api/trip-leads',
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tripDetails, setTripDetails] = useState<TripDetails>(getEmptyTripDetails);
  const [currentStep, setCurrentStep] = useState<TripField>('destination');
  const [hasHydrated, setHasHydrated] = useState(false);
  const [lastStarterPrompt, setLastStarterPrompt] = useState('');

  const [previewPlan, setPreviewPlan] = useState('');
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadConsent, setLeadConsent] = useState(true);
  const [leadStatus, setLeadStatus] = useState<EmailCaptureStatus>('idle');
  const [leadError, setLeadError] = useState('');

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

  const submitLead = async () => {
    const email = leadEmail.trim();

    if (!email) {
      setLeadError('Please enter your email address.');
      setLeadStatus('error');
      return;
    }

    setLeadStatus('submitting');
    setLeadError('');

    try {
      const response = await fetch(leadEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          consent: leadConsent,
          source: 'trip-finder-chat',
          planDepth,
          tripDetails,
          previewPlan,
          messages,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Lead submit failed with status ${response.status}`);
      }

      setLeadStatus('success');
      appendModelMessage(
        `Perfect — I’ll send this trip starter to ${email} and save your preferences so we can follow up with more trip ideas and planning help.`
      );
    } catch (error) {
      console.error('Lead capture error:', error);
      setLeadStatus('error');
      setLeadError(
        'I could not save your email right now. Your trip preview is still here, and you can try again in a moment.'
      );
    }
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
        const structuredPrompt = buildInitialPlanPrompt(updatedDetails, planDepth);

        const history = [
          ...messages,
          { role: 'user' as const, content: trimmed },
        ].map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        }));

        const modelResponse = await chatWithGemini(structuredPrompt, history);

        setPreviewPlan(modelResponse);
        setShowLeadCapture(true);
        setLeadStatus('idle');
        setLeadError('');

        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content:
              `Perfect — I’ve got what I need.\n\n` +
              `Here’s your ${planDepth === 'quick' ? 'trip starter' : 'trip preview'}:\n\n` +
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

      const contextualPrompt = buildFollowupPrompt(tripDetails, trimmed);
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
    setPreviewPlan('');
    setShowLeadCapture(false);
    setLeadEmail('');
    setLeadConsent(true);
    setLeadStatus('idle');
    setLeadError('');
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
    setPreviewPlan('');
    setShowLeadCapture(false);
    setLeadEmail('');
    setLeadConsent(true);
    setLeadStatus('idle');
    setLeadError('');
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
          previewPlan?: string;
          showLeadCapture?: boolean;
          leadEmail?: string;
          leadConsent?: boolean;
          leadStatus?: EmailCaptureStatus;
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

        if (parsed.previewPlan) setPreviewPlan(parsed.previewPlan);
        if (typeof parsed.showLeadCapture === 'boolean') {
          setShowLeadCapture(parsed.showLeadCapture);
        }
        if (parsed.leadEmail) setLeadEmail(parsed.leadEmail);
        if (typeof parsed.leadConsent === 'boolean') {
          setLeadConsent(parsed.leadConsent);
        }
        if (parsed.leadStatus && parsed.leadStatus !== 'submitting') {
          setLeadStatus(parsed.leadStatus);
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
          previewPlan,
          showLeadCapture,
          leadEmail,
          leadConsent,
          leadStatus: leadStatus === 'submitting' ? 'idle' : leadStatus,
        })
      );
    } catch (error) {
      console.error('Failed to save chat state:', error);
    }
  }, [
    messages,
    tripDetails,
    currentStep,
    previewPlan,
    showLeadCapture,
    leadEmail,
    leadConsent,
    leadStatus,
    hasHydrated,
  ]);

  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    if (container.scrollHeight > container.clientHeight) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, showLeadCapture, leadStatus]);

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

            {showLeadCapture && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                <Mail className="h-3 w-3" />
                Ready to email trip info
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-black text-zinc-950">
              Start with a travel prompt
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Give people instant trip ideas first, then offer the full version by email.
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

      <div className="flex-1 min-h-0 space-y-6 overflow-y-auto p-6 pt-4 scrollbar-hide">
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

        {showLeadCapture && (
          <div className="flex justify-start">
            <div className="flex max-w-[90%] gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 shadow-sm">
                <Mail className="h-5 w-5 text-white" />
              </div>

              <div className="w-full rounded-[24px] rounded-tl-none border border-emerald-100 bg-emerald-50 p-5">
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                      Want more trip help?
                    </div>
                    <h4 className="mt-2 text-base font-black text-zinc-950">
                      Want this emailed to you?
                    </h4>
                    <p className="mt-1 text-sm text-zinc-600">
                      Get this starter plan in your inbox and save your trip preferences so we can send deeper trip ideas, itinerary help, and follow-up options.
                    </p>
                  </div>

                  {leadStatus === 'success' ? (
                    <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                        <div>
                          <div className="font-bold text-zinc-900">Saved successfully</div>
                          <div className="mt-1 text-sm text-zinc-600">
                            We saved the traveler details and email for follow-up.
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                        <input
                          type="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none ring-1 ring-emerald-100 transition focus:ring-2 focus:ring-emerald-300"
                        />

                        <button
                          type="button"
                          onClick={submitLead}
                          disabled={leadStatus === 'submitting'}
                          className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {leadStatus === 'submitting' ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Mail className="mr-2 h-4 w-4" />
                              Email this trip
                            </>
                          )}
                        </button>
                      </div>

                      <label className="flex items-start gap-3 text-sm text-zinc-600">
                        <input
                          type="checkbox"
                          checked={leadConsent}
                          onChange={(e) => setLeadConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-zinc-300"
                        />
                        <span>
                          Yes, save my trip preferences and send me more helpful travel planning information.
                        </span>
                      </label>

                      {leadStatus === 'error' && leadError && (
                        <div className="rounded-2xl border border-red-200 bg-white p-3 text-sm text-red-600">
                          {leadError}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

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
