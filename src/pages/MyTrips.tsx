import React from 'react';
import { ArrowLeft, Check, Download, MapPin, PackageCheck, Share2, Trash2, Wifi, WifiOff } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  SAVED_TRIPS_CHANGED_EVENT,
  SavedTrip,
  deleteSavedTrip,
  downloadTextFile,
  findSavedTrip,
  readSavedTrips,
  slugifyTrip,
  updateSavedTrip,
} from '../utils/savedTrips';

function useOnlineStatus() {
  const [online, setOnline] = React.useState(() => navigator.onLine);
  React.useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);
  return online;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(value)
  );
}

function MyTripDetail({ trip }: { trip: SavedTrip }) {
  const navigate = useNavigate();
  const online = useOnlineStatus();
  const [current, setCurrent] = React.useState(trip);
  const packedCount = current.packingItems.filter((item) => item.packed).length;

  const togglePacked = (id: string) => {
    const updated = {
      ...current,
      packingItems: current.packingItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      ),
    };
    setCurrent(updated);
    updateSavedTrip(updated);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${current.destination} Sage trip`, text: current.offlineText });
      return;
    }
    await navigator.clipboard.writeText(current.offlineText);
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-10 text-zinc-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/my-trips" className="inline-flex items-center gap-2 text-sm font-black text-emerald-800">
            <ArrowLeft className="h-4 w-4" /> My Trips
          </Link>
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${online ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
            {online ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            {online ? 'Online' : 'Offline copy'}
          </span>
        </div>

        <section className="rounded-[2rem] bg-zinc-950 p-6 text-white md:p-9">
          <p className="text-[11px] font-black uppercase tracking-[.2em] text-emerald-300">Saved on this device</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">{current.destination}</h1>
          <p className="mt-4 text-zinc-300">{current.tripLength} Â· {current.season} Â· {current.groupLabel}</p>
          <p className="mt-2 text-xs text-zinc-400">Saved {formatDate(current.savedAt)} Â· Updated {formatDate(current.updatedAt)}</p>
        </section>

        {!online && (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            Weather, air quality, fire restrictions, road conditions and closures are not live while offline. Refresh those details when a connection returns.
          </div>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          {current.itinerary.map((item) => (
            <article key={item.title} className="rounded-3xl border border-zinc-200 bg-white p-5">
              <h2 className="font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-700">Works offline</p><h2 className="text-2xl font-black">Packing checklist</h2></div>
            <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-800">{packedCount}/{current.packingItems.length} packed</span>
          </div>
          <div className="mt-5 space-y-3">
            {current.packingItems.map((item) => (
              <button key={item.id} type="button" onClick={() => togglePacked(item.id)} className="flex w-full items-start gap-3 rounded-2xl border border-zinc-200 p-4 text-left transition hover:border-emerald-400">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${item.packed ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-zinc-300'}`}>{item.packed && <Check className="h-4 w-4" />}</span>
                <span><strong className={item.packed ? 'text-zinc-400 line-through' : ''}>{item.label}</strong><span className="mt-1 block text-sm text-zinc-500">{item.helper}</span></span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={handleShare} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1047a2] px-5 py-4 font-black text-white"><Share2 className="h-4 w-4" /> Share trip</button>
          <button type="button" onClick={() => downloadTextFile(`${slugifyTrip(current.destination)}-sage-trip.txt`, current.offlineText)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 py-4 font-black"><Download className="h-4 w-4" /> Download text backup</button>
          {online && <a href={current.tripUrl} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4 font-black text-emerald-900"><MapPin className="h-4 w-4" /> Open live plan</a>}
          <button type="button" onClick={() => { if (window.confirm(`Delete the saved ${current.destination} trip from this phone?`)) { deleteSavedTrip(current.id); navigate('/my-trips'); } }} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-4 font-black text-red-700"><Trash2 className="h-4 w-4" /> Delete from phone</button>
        </section>
      </div>
    </main>
  );
}

export default function MyTrips() {
  const { tripId } = useParams();
  const online = useOnlineStatus();
  const [trips, setTrips] = React.useState<SavedTrip[]>(readSavedTrips);
  React.useEffect(() => {
    const refresh = () => setTrips(readSavedTrips());
    window.addEventListener('storage', refresh);
    window.addEventListener(SAVED_TRIPS_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener(SAVED_TRIPS_CHANGED_EVENT, refresh);
    };
  }, []);

  if (tripId) {
    const trip = findSavedTrip(tripId);
    if (trip) return <MyTripDetail trip={trip} />;
    return <main className="mx-auto max-w-2xl px-6 py-20 text-center"><h1 className="text-4xl font-black">Trip not found on this device</h1><p className="mt-4 text-zinc-600">Saved trips stay in the browser and device where they were created.</p><Link to="/my-trips" className="mt-6 inline-block font-black text-emerald-800">Return to My Trips</Link></main>;
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-12 text-zinc-950">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="text-[11px] font-black uppercase tracking-[.22em] text-emerald-700">Private Â· Stored on this device</p><h1 className="mt-3 text-5xl font-black md:text-7xl">My Arizona Trips</h1><p className="mt-4 max-w-2xl text-lg text-zinc-600">Open your saved plans, packing lists and trip notes even when cell service disappears.</p></div>
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${online ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{online ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}{online ? 'Online' : 'Offline mode'}</span>
        </div>

        {trips.length === 0 ? (
          <section className="mt-10 rounded-[2rem] border border-dashed border-zinc-300 bg-white p-8 text-center md:p-12"><PackageCheck className="mx-auto h-10 w-10 text-emerald-700" /><h2 className="mt-4 text-2xl font-black">No offline trips saved yet</h2><p className="mx-auto mt-3 max-w-xl text-zinc-600">Build a Sage trip, then select â€œSave Offline on This Phone.â€ No account is required.</p><Link to="/trip-builder" className="mt-6 inline-flex rounded-2xl bg-zinc-950 px-6 py-4 font-black text-white">Build a trip</Link></section>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {trips.map((trip) => (
              <article key={trip.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-700">Offline trip pass</p><h2 className="mt-2 text-3xl font-black">{trip.destination}</h2><p className="mt-2 text-sm text-zinc-600">{trip.tripLength} Â· {trip.season} Â· {trip.groupLabel}</p><p className="mt-5 text-xs text-zinc-400">Updated {formatDate(trip.updatedAt)}</p><Link to={`/my-trips/${trip.id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#1047a2] px-5 py-3 font-black text-white">Open offline trip</Link></article>
            ))}
          </div>
        )}

        {trips.length > 0 && <button type="button" onClick={() => downloadTextFile('sage-saved-trips.json', JSON.stringify(trips, null, 2), 'application/json')} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-zinc-700"><Download className="h-4 w-4" /> Export all saved trips</button>}
        <p className="mt-10 rounded-2xl bg-white p-4 text-sm leading-relaxed text-zinc-500">Saved trips remain only in this browser on this device. Clearing browser storage removes them. Export a backup before clearing site data or changing phones.</p>
      </div>
    </main>
  );
}


