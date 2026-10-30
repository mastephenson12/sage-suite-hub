import React from 'react';
import { createRoot } from 'react-dom/client';
import { openTripShareLink, type TripSnapshot } from './utils/sharedTrips';
import { findSavedTripByUrl, saveSharedTripCopy } from './utils/savedTrips';
import './shared-trip.css';

function SharedTrip() {
  const [trip, setTrip] = React.useState<TripSnapshot | null>(null);
  const [error, setError] = React.useState('');
  const [saved, setSaved] = React.useState('');
  const [saveError, setSaveError] = React.useState('');
  React.useEffect(() => {
    let active = true;
    let loadId = 0;
    const load = () => {
      const id = ++loadId;
      setTrip(null); setError(''); setSaved(''); setSaveError('');
      openTripShareLink(window.location.hash).then(value => {
        if (!active || id !== loadId) return;
        const existing = findSavedTripByUrl(window.location.href);
        setTrip(existing ? { ...value, packingItems: existing.packingItems } : value);
        setSaved(existing?.id ?? '');
      }).catch(e => { if (active && id === loadId) setError(e instanceof Error ? e.message : 'Could not open this plan.'); });
    };
    load(); window.addEventListener('hashchange', load);
    return () => { active = false; window.removeEventListener('hashchange', load); };
  }, []);

  return <main className="shared-plan">
    <header><a href="/">Health &amp; Travels · Sage</a><p>Shared family trip · No account needed</p></header>
    {error ? <section role="alert"><h1>We could not open this plan</h1><p>{error}</p><a href="/trip-builder">Build a new trip</a></section> : !trip ? <p role="status">Opening your shared plan…</p> : <>
      <h1>{trip.destination}</h1>
      <p>{trip.tripLength} · {trip.season} · {trip.groupLabel}</p>
      <p className="notice">This fixed copy will not change when the sender edits their plan. Check current weather, access and opening hours. Anyone with this link can read or forward its details.</p>
      <div className="actions">
        {!saved && <button type="button" onClick={() => {
          try {
            const copy = saveSharedTripCopy({ ...trip, tripUrl: window.location.href });
            setSaved(copy.id);
            setSaveError('');
          } catch { setSaveError('This browser could not save the plan. Use Print or Save PDF instead.'); }
        }}>Save this copy on my device</button>}
        <button type="button" onClick={() => window.print()}>Print or Save PDF</button>
      </div>
      {saved && <p role="status">Saved in this browser. <a href={`/my-trips/${encodeURIComponent(saved)}`}>Open your saved copy</a>. Clearing site data removes it.</p>}
      {saveError && <p role="alert">{saveError}</p>}
      <section><h2>The itinerary and trip notes</h2><pre>{trip.offlineText}</pre></section>
      <section><h2>Packing checklist</h2>{saved && <p>Open your saved copy above to update your checklist.</p>}<ul>{trip.packingItems.map(item => <li key={item.id}><label><input type="checkbox" disabled={Boolean(saved)} checked={item.packed} onChange={() => setTrip({ ...trip, packingItems: trip.packingItems.map(candidate => candidate.id === item.id ? { ...candidate, packed: !candidate.packed } : candidate) })} /> {item.label}</label>{item.helper && <p>{item.helper}</p>}</li>)}</ul></section>
      <p className="actions"><a href="/trip-builder">Build your own trip</a></p>
    </>}
  </main>;
}

createRoot(document.getElementById('root')!).render(<SharedTrip />);
