import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createTripShareLink, openTripShareLink } from '../src/utils/sharedTrips.ts';

const trip = {
  destination: 'Flagstaff · niños', season: 'Fall', tripLength: 'Weekend', groupLabel: 'Family', confidenceScore: 75,
  wantsShade: true, needsBathrooms: true,
  offlineText: 'Exact plan: observatory at 10:00\nFood: bring our own lunch.\n' + 'A detailed safety and weather note. '.repeat(300),
  itinerary: [{ title: '10:00 · Observatory', description: 'Use the indoor exhibits. Keep our lunch and weather backup.' }],
  packingItems: [{ id: 'water', label: 'Water', helper: 'Bring bottles', packed: true }],
};

test('a shared snapshot reopens exact text and sections on another device without a generation or storage lookup', async () => {
  const link = await createTripShareLink({ ...trip, email: 'private@example.com', id: 'device-secret', tripUrl: 'https://private.example/' }, 'https://sage.healthandtravels.com');
  assert.ok(link.startsWith('https://sage.healthandtravels.com/shared-trip#plan=1.'));
  assert.equal(new URL(link).search, '');
  const decoded = await openTripShareLink(new URL(link).hash);
  assert.equal(decoded.offlineText, trip.offlineText);
  assert.deepEqual(decoded.itinerary, trip.itinerary);
  assert.equal(decoded.destination, trip.destination);
  assert.deepEqual(decoded.packingItems, [{ id: 'shared-0', label: 'Water', helper: 'Bring bottles', packed: false }]);
  assert.equal('email' in decoded, false); assert.equal('id' in decoded, false); assert.equal('tripUrl' in decoded, false);
});

test('new sender edits do not change a previously created link', async () => {
  const link = await createTripShareLink(trip, 'https://sage.healthandtravels.com');
  const changed = { ...trip, offlineText: 'A different itinerary' };
  const second = await createTripShareLink(changed, 'https://sage.healthandtravels.com');
  assert.notEqual(link, second);
  assert.equal((await openTripShareLink(new URL(link).hash)).offlineText, trip.offlineText);
});

test('damaged, unsupported and excessive payloads fail closed', async () => {
  for (const hash of ['', '#plan=2.abc', '#plan=1.<script>', '#plan=1.abc', '#plan=1.' + 'a'.repeat(24_100)]) {
    await assert.rejects(openTripShareLink(hash));
  }
  await assert.rejects(createTripShareLink({ ...trip, offlineText: 'x'.repeat(70_001) }, 'https://sage.healthandtravels.com'));
  const bytes = new TextEncoder().encode('x'.repeat(110_000));
  const compressed = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());
  const bomb = '#plan=1.' + Buffer.from(compressed).toString('base64url');
  await assert.rejects(openTripShareLink(bomb));
  await assert.rejects(createTripShareLink({ ...trip, confidenceScore: NaN }, 'https://sage.healthandtravels.com'));
});

test('the receiving entry point has no tracking or advertising scripts and is excluded from indexing', async () => {
  const html = await readFile(new URL('../shared-trip.html', import.meta.url), 'utf8');
  assert.ok(html.includes('noindex, nofollow, noarchive'));
  assert.ok(html.includes('name="referrer" content="no-referrer"'));
  assert.ok(!/googletagmanager|adsbygoogle|stay22/i.test(html));
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(config.rewrites[0].destination, '/shared-trip.html');
  for (const path of ['/shared-trip', '/shared-trip.html']) assert.ok(config.headers.some(r => r.source === path && r.headers.some(h => h.key === 'X-Robots-Tag' && h.value.includes('noindex'))));
});

test('an offline shared-plan navigation never falls back to the regular app shell', async () => {
  const source = await readFile(new URL('../public/service-worker.js', import.meta.url), 'utf8');
  const handlers = {};
  vm.runInNewContext(source, {
    self: { location: { origin: 'https://sage.healthandtravels.com' }, addEventListener: (name, fn) => { handlers[name] = fn; } },
    caches: { match: async key => key === '/' ? new Response('REGULAR APP SHELL') : undefined },
    fetch: async () => { throw new Error('offline'); }, Response, URL,
  });
  for (const route of ['/shared-trip', '/shared-trip.html']) {
    let response;
    handlers.fetch({ request: { method: 'GET', mode: 'navigate', url: 'https://sage.healthandtravels.com' + route }, respondWith: promise => { response = promise; } });
    const result = await response;
    assert.equal(result.status, 503);
    const html = await result.text();
    assert.ok(html.includes('Reconnect to open this shared plan'));
    assert.ok(!html.includes('REGULAR APP SHELL'));
  }
});
