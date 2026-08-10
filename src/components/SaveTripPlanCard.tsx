import React from 'react';
import {
  CheckCircle2,
  Copy,
  Mail,
  MessageCircle,
  Phone,
  Printer,
  Send,
  WifiOff,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { SavedTripPackingItem, SavedTripSection, saveTrip } from '../utils/savedTrips';

interface SaveTripPlanCardProps {
  destination: string;
  season: string;
  tripLength: string;
  groupLabel: string;
  confidenceScore: number;
  wantsShade: boolean;
  needsBathrooms: boolean;
  tripUrl: string;
  itinerary?: SavedTripSection[];
  packingItems?: SavedTripPackingItem[];
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
  itinerary = [],
  packingItems = [],
}) => {
  const [email, setEmail] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [savedOffline, setSavedOffline] = React.useState(false);

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
    '- Start earlier when temperatures are high.',
    '- Bring extra water and snacks.',
    '- Screenshot the plan before leaving.',
    '- Keep a backup stop ready if parking, heat, or kid energy gets weird.',
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

  const handleCopyPass = async () => {
    await navigator.clipboard.writeText(planBody);
    setCopied(true);
    trackEvent('save_trip_plan_click', {
      label: 'Copy Offline Trip Pass',
      destination,
      location: 'save_trip_plan_card',
    });
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSaveOffline = () => {
    const savedTrip = saveTrip({ destination, season, tripLength, groupLabel, confidenceScore, wantsShade, needsBathrooms, tripUrl, offlineText: planBody, itinerary, packingItems });
    setSavedOffline(true);
    trackEvent('save_trip_plan_click', { label: 'Save Offline on This Phone', destination, location: 'save_trip_plan_card', saved_trip_id: savedTrip.id });
  };

  const handleShareToPhone = async () => {
    const shareData = {
      title: `${destination} Sage trip pass`,
      text: planBody,
      url: tripUrl,
    };

    trackEvent('save_trip_plan_click', {
      label: 'Share To Phone',
      destination,
      location: 'save_trip_plan_card',
    });

    if (navigator.share) {
      await navigator.share(shareData);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
      return;
    }

    await navigator.clipboard.writeText(planBody);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const smsHref = `sms:?&body=${encodeURIComponent(planBody)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(planBody)}`;

  return (
    <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-zinc-950">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
            Save to phone
          </p>
          <h3 className="text-xl font-black">Keep an offline trip pass handy</h3>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-emerald-950/80">
        Copy, text, WhatsApp, email, or print the plan before leaving. This works now
        without Apple Wallet or Google Wallet credentials, and it gives families a
        practical backup when signal gets spotty.
      </p>

      <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
          Offline pass preview
        </p>
        <div className="space-y-1 text-sm leading-relaxed text-zinc-700">
          <p className="font-black text-zinc-950">{destination} family adventure plan</p>
          <p>Timing: {season}</p>
          <p>Trip style: {tripLength}</p>
          <p>Group: {groupLabel}</p>
          <p>Confidence score: {confidenceScore}%</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={handleSaveOffline} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-emerald-900 sm:col-span-2">
          {savedOffline ? <CheckCircle2 className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          {savedOffline ? 'Saved in My Trips' : 'Save Offline on This Phone'}
        </button>

        <button
          type="button"
          onClick={handleShareToPhone}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-zinc-800"
        >
          {shared ? <CheckCircle2 className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
          {shared ? 'Shared' : 'Share to Phone'}
        </button>

        <button
          type="button"
          onClick={handleCopyPass}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-emerald-900 transition hover:border-emerald-500"
        >
          {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy Pass'}
        </button>

        <a
          href={smsHref}
          onClick={() =>
            trackEvent('save_trip_plan_click', {
              label: 'Text Trip Pass',
              destination,
              location: 'save_trip_plan_card',
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-emerald-900 transition hover:border-emerald-500"
        >
          <MessageCircle className="h-4 w-4" />
          Text It
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('save_trip_plan_click', {
              label: 'WhatsApp Trip Pass',
              destination,
              location: 'save_trip_plan_card',
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-emerald-900 transition hover:border-emerald-500"
        >
          <Send className="h-4 w-4" />
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => {
            trackEvent('save_trip_plan_click', {
              label: 'Print Trip Pass',
              destination,
              location: 'save_trip_plan_card',
            });
            window.print();
          }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-emerald-900 transition hover:border-emerald-500 sm:col-span-2"
        >
          <Printer className="h-4 w-4" />
          Print or Save PDF
        </button>
      </div>

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
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
          {saved ? 'Ready to Send' : 'Email It'}
        </button>
      </form>

      <p className="mt-3 text-xs leading-relaxed text-emerald-950/70">
        This uses built-in phone sharing for now. Later, we can add true Apple Wallet
        and Google Wallet passes after the certificates and Google Wallet issuer setup are ready.
      </p>
    </article>
  );
};

export default SaveTripPlanCard;
