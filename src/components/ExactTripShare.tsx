import React from 'react';
import { createTripShareLink, type TripSnapshotInput } from '../utils/sharedTrips';
import { trackEvent } from '../utils/analytics';

export default function ExactTripShare({ trip, disabled = false }: { trip: TripSnapshotInput; disabled?: boolean }) {
  const [review, setReview] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const contentKey = JSON.stringify(trip);
  const currentKey = React.useRef(contentKey);
  currentKey.current = contentKey;
  React.useEffect(() => { setLink(''); setMessage(''); setReview(false); }, [contentKey]);

  const create = async () => {
    setBusy(true); setMessage('');
    try {
      const next = await createTripShareLink(trip, window.location.origin);
      if (currentKey.current !== contentKey) return;
      setLink(next);
      trackEvent('trip_share_link_created', { location: 'exact_trip_share', page_search: '', page_location: window.location.origin + window.location.pathname });
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not create the link. Copy the plan text instead.'); }
    finally { setBusy(false); }
  };

  return <section className="mt-5 rounded-2xl border border-blue-200 bg-white p-5" aria-label="Share this exact plan">
    <h3 className="text-xl font-bold">Share this exact plan</h3>
    <p className="mt-2 text-sm leading-6 text-slate-600">Send the same itinerary and packing list, with no account needed to open it. Anyone with the link can read and forward the included details. The link does not expire and cannot be revoked.</p>
    <button type="button" disabled={disabled} onClick={() => setReview(!review)} className="mt-3 min-h-11 font-bold text-blue-900 underline disabled:opacity-50" aria-expanded={review}>Review what the link includes</button>
    {review && <div className="mt-3">
      <p className="text-sm text-slate-600">Review any group, food, location or personal details in this copy before sharing. The delivery email field and packing checkmarks are not included. Later edits will not change this copy.</p>
      <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm [overflow-wrap:anywhere]">{trip.offlineText}</pre>
      <button type="button" disabled={disabled || busy} onClick={create} className="journey-primary mt-4 disabled:opacity-50">{busy ? 'Creating link…' : 'Create link for this copy'}</button>
    </div>}
    {link && <div className="mt-4">
      <label className="block text-sm font-bold" htmlFor="exact-trip-link">Your plan link</label>
      <input id="exact-trip-link" readOnly value={link} className="mt-2 w-full rounded-xl border p-3 text-sm" onFocus={event => event.currentTarget.select()} />
      <button type="button" className="journey-primary mt-3" onClick={async () => {
        try { await navigator.clipboard.writeText(link); setMessage('Link copied. Share it with the people you choose.'); trackEvent('trip_share_link_copied', { location: 'exact_trip_share', page_search: '', page_location: window.location.origin + window.location.pathname }); }
        catch { setMessage('Select and copy the link above.'); }
      }}>Copy plan link</button>
    </div>}
    {message && <p role="status" className="mt-3 text-sm font-semibold text-blue-900">{message}</p>}
  </section>;
}
