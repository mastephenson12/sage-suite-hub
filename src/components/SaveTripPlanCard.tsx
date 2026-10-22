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
  confidenceScore?: number;
  personalizing?: boolean;
  wantsShade: boolean;
  needsBathrooms: boolean;
  dietaryNeeds?: string;
  tripUrl: string;
  itinerary?: SavedTripSection[];
  packingItems?: SavedTripPackingItem[];
}

const SaveTripPlanCard: React.FC<SaveTripPlanCardProps> = ({
  destination,
  season,
  tripLength,
  groupLabel,
  confidenceScore = 0,
  personalizing = false,
  wantsShade,
  needsBathrooms,
  dietaryNeeds = 'No special request',
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
    ...(confidenceScore > 0 ? [`Sage confidence: ${confidenceScore}%`] : []),
    wantsShade ? 'Shade: prioritized' : 'Shade: flexible',
    needsBathrooms ? 'Bathrooms: prioritized' : 'Bathrooms: optional',
    `Food needs: ${dietaryNeeds}`,
    ...itineraryBody,
    ...packingBody,
    '',
    "DON'T RUIN THE DAY:",
    '- Start earlier when Arizona temperatures are high.',
    '- Confirm parking, closures, weather, and road conditions before leaving.',
    '- Bring more water and snacks than the minimum.',
    '- Screenshot or save this plan before cell service gets questionable.',
    dietaryNeeds !== 'No special request'
      ? `- For ${dietaryNeeds} food, confirm current ingredients, substitutions, shared equipment, and cross-contact directly with the restaurant.`
      : '- Confirm current menu details directly with the restaurant before leaving.',
    '',
    'PLAN B:',
    '- If heat, storms, parking, or kid energy changes the day, shorten the outdoor anchor and use an easier scenic, shaded, or indoor stop nearby.',
    '- Do not force the original plan just because everyone already got in the car.',
    '',
    `Open your live plan again: ${tripUrl}`,
    '',
    'More Arizona family adventures: https://healthandtravels.com/',
  ].join('\n');

  React.useEffect(() => {
    setSavedOffline(false);
  }, [planBody, packingItems.map(item => `${item.id}:${item.packed}`).join('|')]);

  const handleSavePlan = async (event: React.FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setEmailStatus('sending');
    setEmailError('');
    trackEvent('itinerary_email_requested', { location: 'save_trip_plan_card' });

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

      const result = (await response.json().catch(() => ({}))) as { error?: string; accepted?: boolean };
      if (!response.ok) throw new Error(result.error || 'We could not email the trip pack.');
      if (!result.accepted) throw new Error('We could not confirm the email request. Check your inbox before trying again.');

      setEmailStatus('sent');
      trackEvent('itinerary_email_accepted', {
        destination,
        location: 'save_trip_plan_card',
        offer: 'complete_adventure_plan',
      });
      trackEvent('adventure_funnel_step', {
        funnel_name: 'adventure_to_email',
        funnel_step: 4,
        funnel_step_name: 'email_accepted',
        destination,
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
    trackEvent('itinerary_save', { method: 'browser', location: 'save_trip_plan_card' });
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

  return (
    <article id="keep-trip-plan" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-7">
      <p className="journey-eyebrow !mt-0">Keep your plan</p>
      <h3 className="mt-2">Take your {destination} plan with you</h3>
      <p className="mt-2 text-slate-600">Save it here before you leave. No account needed.</p>
      <button type="button" onClick={handleSaveOffline} className="journey-primary mt-5 gap-2">
        {savedOffline ? <CheckCircle2 className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        {savedOffline ? 'Saved in My Trips' : 'Save My Plan on This Device'}
      </button>
      <p className="mt-2 text-xs text-slate-500">Stored in this browser. Clearing site data removes saved trips.</p>
      {personalizing && <p role="status" className="mt-3 text-sm text-slate-600">Sage is still adding details. Save again once personalization finishes to include them.</p>}
      <form id="email-trip-pack" onSubmit={handleSavePlan} aria-busy={emailStatus === 'sending'} className="mt-6 border-t border-slate-200 pt-5">
        <label htmlFor="trip-pack-email" className="block font-bold">Or email this plan to yourself</label>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input id="trip-pack-email" type="email" value={email} onChange={event => {setEmail(event.target.value);if(emailStatus !== 'idle')setEmailStatus('idle');setEmailError('');}} placeholder="you@example.com" autoComplete="email" inputMode="email" aria-label="Email address for your complete adventure plan" required className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base" />
          <button type="submit" disabled={emailStatus === 'sending'} className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-900 disabled:opacity-60">{emailStatus === 'sending' ? 'Sending…' : emailStatus === 'sent' ? 'Email Requested' : 'Email My Plan'}</button>
        </div>
        {emailStatus === 'sent' && <p role="status" className="mt-3 text-sm font-bold text-emerald-800">Your adventure plan is on its way.</p>}
        {emailStatus === 'error' && <p role="alert" className="mt-3 text-sm font-bold text-red-800">{emailError} You can still save or copy the plan.</p>}
        <p className="mt-3 text-xs text-slate-500">Used only to deliver this plan. Newsletter signup stays separate.</p>
      </form>
      <details className="mt-5 border-t border-slate-200 pt-4"><summary className="cursor-pointer py-2 font-bold text-blue-900">More ways to keep or share</summary>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold text-blue-900">
          <button type="button" onClick={handleShareToPhone} className="rounded-xl border bg-white px-4 py-3">{shared ? 'Shared' : 'Share'}</button>
          <button type="button" onClick={handleCopyPass} className="rounded-xl border bg-white px-4 py-3">{copied ? 'Copied' : 'Copy Plan'}</button>
          <a href={smsHref} className="rounded-xl border bg-white px-4 py-3">Text It</a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-xl border bg-white px-4 py-3">WhatsApp</a>
          <button type="button" onClick={() => window.print()} className="rounded-xl border bg-white px-4 py-3">Print or Save PDF</button>
        </div>
      </details>
    </article>
  );
};
export default SaveTripPlanCard;
