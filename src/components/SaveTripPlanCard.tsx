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

async function copyText(text: string) {
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
  const [copied, setCopied] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [savedOffline, setSavedOffline] = React.useState(false);
  const [emailStatus, setEmailStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailError, setEmailError] = React.useState('');

  const itineraryBody = itinerary.length
    ? ['', 'YOUR DAY:', ...itinerary.map((item) => `- ${item.title}: ${item.description}`)]
    : [];
  const packingBody = packingItems.length
    ? ['', 'PACK BEFORE YOU GO:', ...packingItems.map((item) => `- ${item.label}: ${item.helper}`)]
    : [];

  const planBody = [
    `${destination} FAMILY ADVENTURE PLAN`,
    '',
    `Timing: ${season}`,
    `Trip style: ${tripLength}`,
    `Group: ${groupLabel}`,
    `Sage confidence: ${confidenceScore}%`,
    wantsShade ? 'Shade: prioritized' : 'Shade: flexible',
    needsBathrooms ? 'Bathrooms: prioritized' : 'Bathrooms: optional',
    ...itineraryBody,
    ...packingBody,
    '',
    "DON'T RUIN THE DAY:",
    '- Start earlier when Arizona temperatures are high.',
    '- Confirm parking, closures, weather, and road conditions before leaving.',
    '- Bring more water and snacks than the minimum.',
    '- Screenshot or save this plan before cell service gets questionable.',
    '',
    'PLAN B:',
    '- If heat, storms, parking, or kid energy changes the day, shorten the outdoor anchor and use an easier scenic, shaded, or indoor stop nearby.',
    '- Do not force the original plan just because everyone already got in the car.',
    '',
    `Open your live plan again: ${tripUrl}`,
    '',
    'More Arizona family adventures: https://healthandtravels.com/',
  ].join('\n');

  const handleSavePlan = async (event: React.FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setEmailStatus('sending');
    setEmailError('');

    try {
      const response = await fetch('/api/email-trip-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          destination,
          subject: `Your ${destination} family adventure plan is ready`,
          planText: planBody,
          tripUrl,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || 'We could not email the trip pack.');

      setEmailStatus('sent');
      trackEvent('trip_pack_emailed', {
        destination,
        location: 'save_trip_plan_card',
        offer: 'complete_adventure_plan',
      });
    } catch (error) {
      setEmailStatus('error');
      setEmailError(error instanceof Error ? error.message : 'We could not email the trip pack.');
      trackEvent('trip_pack_email_failed', {
        destination,
        location: 'save_trip_plan_card',
      });
    }
  };

  const handleCopyPass = async () => {
    await copyText(planBody);
    setCopied(true);
    trackEvent('save_trip_plan_click', { label: 'Copy Adventure Plan', destination, location: 'save_trip_plan_card' });
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSaveOffline = () => {
    const savedTrip = saveTrip({ destination, season, tripLength, groupLabel, confidenceScore, wantsShade, needsBathrooms, tripUrl, offlineText: planBody, itinerary, packingItems });
    setSavedOffline(true);
    trackEvent('save_trip_plan_click', { label: 'Save Offline on This Phone', destination, location: 'save_trip_plan_card', saved_trip_id: savedTrip.id });
  };

  const handleShareToPhone = async () => {
    const shareData = { title: `${destination} Sage adventure plan`, text: planBody, url: tripUrl };
    trackEvent('save_trip_plan_click', { label: 'Share Adventure Plan', destination, location: 'save_trip_plan_card' });

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        window.setTimeout(() => setShared(false), 1800);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    await copyText(planBody);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const smsHref = `sms:?&body=${encodeURIComponent(planBody)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(planBody)}`;

  const includedItems = [
    'Simple day flow',
    'Kid-fit + family reality check',
    'Parking, bathroom + shade priorities',
    'Packing checklist',
    "Don't Ruin the Day safety notes",
    'Plan B when weather, parking, or kid energy changes',
  ];

  return (
    <article className="overflow-hidden rounded-3xl border-2 border-emerald-300 bg-emerald-50 text-zinc-950 shadow-lg">
      <div className="bg-emerald-950 p-6 text-white md:p-7">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Your plan is worth keeping</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Your {destination} day is basically planned.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-50/85 md:text-base">
          Send the complete adventure plan to your inbox so it is there when everyone is in the car asking, “Where are we going again?”
        </p>
      </div>

      <div className="p-5 md:p-6">
        <div className="grid gap-2 sm:grid-cols-2">
          {includedItems.map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-2xl bg-white p-3 text-sm font-bold text-zinc-800">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <form id="email-trip-pack" onSubmit={handleSavePlan} aria-busy={emailStatus === 'sending'} className="mt-5 rounded-3xl border border-emerald-200 bg-white p-4 shadow-sm md:p-5">
          <label htmlFor="trip-pack-email" className="block text-sm font-black text-zinc-950">Email my complete adventure plan</label>
          <p className="mt-1 text-xs leading-relaxed text-zinc-600">One email address. No account required. We send the useful version, not another planning chore.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              id="trip-pack-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (emailStatus !== 'idle') setEmailStatus('idle');
                if (emailError) setEmailError('');
              }}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              aria-label="Email address for your complete adventure plan"
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              required
            />
            <button type="submit" disabled={emailStatus === 'sending'} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-70">
              {emailStatus === 'sent' ? <CheckCircle2 className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              {emailStatus === 'sending' ? 'Sending…' : emailStatus === 'sent' ? 'Plan Sent' : 'Send My Adventure Plan'}
            </button>
          </div>

          {emailStatus === 'sent' && (
            <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-800" role="status">Your adventure plan is on its way. Keep the email for trip morning.</p>
          )}
          {emailStatus === 'error' && (
            <p className="mt-3 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-800" role="alert">{emailError} You can still save or copy the plan below.</p>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">We use this address to deliver this trip plan. Newsletter signup stays separate.</p>
        </form>

        <div className="mt-5 border-t border-emerald-200 pt-5">
          <div className="mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-800" />
            <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-900">Also keep it on your phone</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={handleSaveOffline} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-white transition hover:bg-emerald-900 sm:col-span-2">
              {savedOffline ? <CheckCircle2 className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              {savedOffline ? 'Saved in My Trips' : 'Save Offline on This Phone'}
            </button>
            <button type="button" onClick={handleShareToPhone} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-emerald-950">
              {shared ? <CheckCircle2 className="h-4 w-4" /> : <Phone className="h-4 w-4" />}{shared ? 'Shared' : 'Share'}
            </button>
            <button type="button" onClick={handleCopyPass} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-emerald-950">
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? 'Copied' : 'Copy Plan'}
            </button>
            <a href={smsHref} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-emerald-950"><MessageCircle className="h-4 w-4" />Text It</a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-emerald-950"><Send className="h-4 w-4" />WhatsApp</a>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-emerald-950 sm:col-span-2"><Printer className="h-4 w-4" />Print or Save PDF</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SaveTripPlanCard;
