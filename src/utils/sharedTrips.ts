import type { SavedTrip } from './savedTrips';

export type TripSnapshot = Pick<SavedTrip, 'destination' | 'season' | 'tripLength' | 'groupLabel' | 'confidenceScore' | 'wantsShade' | 'needsBathrooms' | 'offlineText' | 'itinerary' | 'packingItems'> & { version: 1 };
export type TripSnapshotInput = Omit<TripSnapshot, 'version'>;
const MAX_BYTES = 96_000;
const MAX_LINK_DATA = 24_000;

function text(value: unknown, max: number): string {
  if (typeof value !== 'string' || value.length > max) throw new Error('This plan has invalid or oversized details.');
  return value;
}

// Reconstruct an allowlisted snapshot; never include email, local IDs, URLs or device timestamps.
export function tripSnapshot(input: unknown): TripSnapshot {
  if (!input || typeof input !== 'object') throw new Error('This shared plan is not valid.');
  const p = input as Record<string, unknown>;
  if (p.version !== undefined && p.version !== 1) throw new Error('This shared plan version is not supported.');
  if (!Array.isArray(p.itinerary) || p.itinerary.length < 1 || p.itinerary.length > 40 || !Array.isArray(p.packingItems) || p.packingItems.length > 60) throw new Error('This shared plan has invalid sections.');
  if (typeof p.wantsShade !== 'boolean' || typeof p.needsBathrooms !== 'boolean' || typeof p.confidenceScore !== 'number' || !Number.isFinite(p.confidenceScore) || p.confidenceScore < 0 || p.confidenceScore > 100) throw new Error('This shared plan has invalid preferences.');
  return {
    version: 1,
    destination: text(p.destination, 200), season: text(p.season, 100), tripLength: text(p.tripLength, 100), groupLabel: text(p.groupLabel, 300),
    confidenceScore: p.confidenceScore, wantsShade: p.wantsShade, needsBathrooms: p.needsBathrooms,
    offlineText: text(p.offlineText, 70_000),
    itinerary: p.itinerary.map((s: unknown) => {
      if (!s || typeof s !== 'object') throw new Error('Invalid itinerary section.');
      const section = s as Record<string, unknown>;
      return { title: text(section.title, 300), description: text(section.description, 16_000) };
    }),
    packingItems: p.packingItems.map((s: unknown, i: number) => {
      if (!s || typeof s !== 'object') throw new Error('Invalid packing item.');
      const item = s as Record<string, unknown>;
      return { id: `shared-${i}`, label: text(item.label, 500), helper: text(item.helper, 2_000), packed: false };
    }),
  };
}

async function readBounded(stream: ReadableStream<Uint8Array>, limit: number): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new Error('This plan is too large for a share link. Use the text backup instead.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}

export async function createTripShareLink(input: TripSnapshotInput, origin: string): Promise<string> {
  const snapshot = tripSnapshot(input);
  const bytes = new TextEncoder().encode(JSON.stringify(snapshot));
  if (bytes.byteLength > MAX_BYTES) throw new Error('This plan is too large for a share link. Use the text backup instead.');
  if (typeof CompressionStream === 'undefined') throw new Error('This browser cannot create a plan link. Use Copy Plan or download the text backup.');
  const zipped = await readBounded(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip')), MAX_BYTES);
  if (zipped.byteLength > MAX_LINK_DATA * 3 / 4) throw new Error('This plan is too large for a share link. Use the text backup instead.');
  const data = btoa(String.fromCharCode(...zipped)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
  if (data.length > MAX_LINK_DATA) throw new Error('This plan is too large for a share link. Use the text backup instead.');
  return `${new URL(origin).origin}/shared-trip#plan=1.${data}`;
}

export async function openTripShareLink(fragment: string): Promise<TripSnapshot> {
  if (fragment.length > MAX_LINK_DATA + 20 || !/^#plan=1\.[A-Za-z0-9_-]+$/.test(fragment)) throw new Error('This link is incomplete or not supported. Ask the sender for a new link or a text copy.');
  if (typeof DecompressionStream === 'undefined') throw new Error('Open this link in a newer browser, or ask the sender for a text copy.');
  try {
    const encoded = fragment.slice('#plan=1.'.length);
    const raw = atob(encoded.replaceAll('-', '+').replaceAll('_', '/'));
    const bytes = Uint8Array.from(raw, c => c.charCodeAt(0));
    const decoded = await readBounded(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')), MAX_BYTES);
    const snapshot = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(decoded));
    if (snapshot.version !== 1) throw new Error('Invalid version');
    return tripSnapshot(snapshot);
  } catch {
    throw new Error('This link is damaged or too large. Ask the sender for a new link or a text copy.');
  }
}
