import React from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface SaveTripPlanCardProps {
  destination: string;
  season: string;
  tripLength: string;
  groupLabel: string;
  confidenceScore: number;
  wantsShade: boolean;
  needsBathrooms: boolean;
  tripUrl: string;
}

const SaveTripPlanCard: React.FC<SaveTripPlanCardProps> = ({
  destination,
  season,
  tripLength,
  groupLabel,
  confidenceScore,
  wantsShade,
  needsBathrooms,
  tripUrl,
}) => {
  const [email, setEmail] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  const planBody = [
    `${destination} family adventure plan`,
    '',
    `Timing: ${season}`,
    `Trip style: ${tripLength}`,
    `Group: ${groupLabel}`,
    `Confidence score: ${confidenceScore}%`,
    wantsShade ? 'Shade: prioritized' : 'Shade: flexible',
    needsBathrooms ? 'Bathrooms: prioritized' : 'Bathrooms: optional',
    '',
    'Key reminders:',
    '• Start earlier when temperatures are high.',
    '• Bring extra water and snacks.',
    '• Screenshot the plan before leaving.',
    '• Keep a backup stop ready if parking, heat, or kid energy gets weird.',
    '',
    `Open the plan again: ${tripUrl}`,
    '',
    'More Arizona family trip ideas: https://healthandtravels.com/',
  ].join('\n');

  const handleSavePlan = (event: React.FormEvent) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    trackEvent('health_travels_ideas_click', {
      label: 'Send Me This Plan',
      destination,
      location: 'save_trip_plan_card',
    });

    const subject = encodeURIComponent(`Your ${destination} family trip plan`);
    const body = encodeURIComponent(planBody);

    window.location.href = `mailto:${cleanEmail}?subject=${subject}&body=${body}`;
    setSaved(true);
  };

  return (
    <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-zinc-950">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
            Save this plan
          </p>
          <h3 className="text-xl font-black">Send this Arizona family plan to your inbox</h3>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-emerald-950/80">
        Keep the timing notes, safety reminders, and trip link handy so this plan does not disappear into the same digital swamp where old browser tabs go to become myths.
      </p>

      <form onSubmit={handleSavePlan} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-emerald-800"
        >
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          {saved ? 'Ready to Send' : 'Send Me This Plan'}
        </button>
      </form>

      <p className="mt-3 text-xs leading-relaxed text-emerald-950/70">
        This uses your device email app for now. Later, we can wire it into Beehiiv or GoHighLevel so it saves leads automatically, because apparently software is never done, it merely changes costumes.
      </p>
    </article>
  );
};

export default SaveTripPlanCard;
