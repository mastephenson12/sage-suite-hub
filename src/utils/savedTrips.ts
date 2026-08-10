export const SAVED_TRIPS_STORAGE_KEY = 'sage.saved-trips.v1';
export const SAVED_TRIPS_CHANGED_EVENT = 'sage:saved-trips-changed';

export type SavedTripSection = {
  title: string;
  description: string;
};

export type SavedTripPackingItem = {
  id: string;
  label: string;
  helper: string;
  packed: boolean;
};

export type SavedTrip = {
  version: 1;
  id: string;
  destination: string;
  season: string;
  tripLength: string;
  groupLabel: string;
  confidenceScore: number;
  wantsShade: boolean;
  needsBathrooms: boolean;
  tripUrl: string;
  offlineText: string;
  itinerary: SavedTripSection[];
  packingItems: SavedTripPackingItem[];
  savedAt: string;
  updatedAt: string;
};

function isSavedTrip(value: unknown): value is SavedTrip {
  if (!value || typeof value !== 'object') return false;
  const trip = value as Partial<SavedTrip>;
  return (
    trip.version === 1 &&
    typeof trip.id === 'string' &&
    typeof trip.destination === 'string' &&
    typeof trip.savedAt === 'string' &&
    Array.isArray(trip.itinerary) &&
    Array.isArray(trip.packingItems)
  );
}

export function readSavedTrips(): SavedTrip[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SAVED_TRIPS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedTrip).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

function writeSavedTrips(trips: SavedTrip[]): void {
  window.localStorage.setItem(SAVED_TRIPS_STORAGE_KEY, JSON.stringify(trips));
  window.dispatchEvent(new CustomEvent(SAVED_TRIPS_CHANGED_EVENT));
}

export function saveTrip(input: Omit<SavedTrip, 'version' | 'id' | 'savedAt' | 'updatedAt'>): SavedTrip {
  const trips = readSavedTrips();
  const now = new Date().toISOString();
  const existing = trips.find((trip) => trip.tripUrl === input.tripUrl);
  const savedTrip: SavedTrip = {
    ...input,
    version: 1,
    id: existing?.id ?? globalThis.crypto?.randomUUID?.() ?? `trip-${Date.now()}`,
    savedAt: existing?.savedAt ?? now,
    updatedAt: now,
  };
  writeSavedTrips([savedTrip, ...trips.filter((trip) => trip.id !== savedTrip.id)]);
  return savedTrip;
}

export function updateSavedTrip(trip: SavedTrip): void {
  const trips = readSavedTrips();
  writeSavedTrips(
    trips.map((candidate) =>
      candidate.id === trip.id ? { ...trip, updatedAt: new Date().toISOString() } : candidate
    )
  );
}

export function deleteSavedTrip(id: string): void {
  writeSavedTrips(readSavedTrips().filter((trip) => trip.id !== id));
}

export function findSavedTrip(id: string): SavedTrip | undefined {
  return readSavedTrips().find((trip) => trip.id === id);
}

export function downloadTextFile(filename: string, content: string, type = 'text/plain'): void {
  const blob = new Blob([content], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function slugifyTrip(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}


