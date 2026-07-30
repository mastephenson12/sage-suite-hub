import React from 'react';
import { CheckCircle2, Copy, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

type SharePlanPanelProps = {
  title: string;
  description: string;
  quickPlanText: string;
  voteText: string;
  eventContext: string;
};

function getCurrentUrl() {
  if (typeof window === 'undefined') return 'https://sage.healthandtravels.com/';

  return window.location.href;
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function SharePlanPanel({
  title,
  description,
  quickPlanText,
  voteText,
  eventContext,
}: SharePlanPanelProps) {
  const [copiedAction, setCopiedAction] = React.useState<
    'plan' | 'vote' | 'link' | null
  >(null);

  const handleCopy = async (
    action: 'plan' | 'vote' | 'link',
    text: string
  ) => {
    await copyToClipboard(text);
    setCopiedAction(action);
    trackEvent('share_plan_panel_copy', {
      action,
      context: eventContext,
    });
    window.setTimeout(() => setCopiedAction(null), 2200);
  };

  const pageLink = getCurrentUrl();

  const actions = [
    {
      id: 'plan' as const,
      icon: Copy,
      label: copiedAction === 'plan' ? 'Plan copied' : 'Copy quick plan',
      text:
        'A ready-to-send summary with the best reason to go, timing, food, and backup reminders.',
      value: quickPlanText,
    },
    {
      id: 'vote' as const,
      icon: CheckCircle2,
      label: copiedAction === 'vote' ? 'Vote copied' : 'Copy group vote',
      text:
        'A short message that lets family or friends choose between the easiest options.',
      value: voteText,
    },
    {
      id: 'link' as const,
      icon: LinkIcon,
      label: copiedAction === 'link' ? 'Link copied' : 'Copy page link',
      text: 'Send the exact Sage page so everyone can look at the same plan.',
      value: pageLink,
    },
  ];

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-orange-200 bg-orange-50 p-5 md:p-7">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-orange-700">
              Send this to your group
            </p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700 md:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                type="button"
                onClick={() => handleCopy(action.id, action.value)}
                className="rounded-2xl border border-orange-200 bg-white p-4 text-left transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-sm"
              >
                <Icon className="mb-3 h-5 w-5 text-orange-600" aria-hidden="true" />
                <span className="block font-black text-zinc-950">
                  {action.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-zinc-600">
                  {action.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
