import test from 'node:test';
import assert from 'node:assert/strict';
import { readSavedTrips, saveSharedTripCopy, updateSavedTrip } from '../src/utils/savedTrips.ts';

test('re-saving a shared snapshot preserves the recipient checklist and existing record', () => {
  const originalWindow = globalThis.window;
  const data = new Map();
  let writes = 0;
  globalThis.window = {
    localStorage: { getItem: key => data.get(key) ?? null, setItem: (key, value) => { writes++; data.set(key, value); } },
    dispatchEvent() {},
  };
  try {
    const input = { destination: 'Papago Park', season: 'Fall', tripLength: 'Half Day', groupLabel: 'Family', confidenceScore: 0, wantsShade: true, needsBathrooms: true, tripUrl: 'https://sage.healthandtravels.com/shared-trip#plan=1.example', offlineText: 'Original schedule', itinerary: [{ title: 'Morning', description: 'Walk' }], packingItems: [{ id: 'shared-0', label: 'Water', helper: '', packed: false }] };
    const first = saveSharedTripCopy(input);
    updateSavedTrip({ ...first, packingItems: [{ ...first.packingItems[0], packed: true }] });
    const before = readSavedTrips()[0];
    const writesBefore = writes;
    const again = saveSharedTripCopy(input);
    assert.deepEqual(again, before);
    assert.equal(again.packingItems[0].packed, true);
    assert.equal(again.id, first.id);
    assert.equal(writes, writesBefore);
    assert.equal(readSavedTrips().length, 1);
    const different = saveSharedTripCopy({ ...input, tripUrl: input.tripUrl + '-new' });
    assert.notEqual(different.id, first.id);
    assert.equal(different.packingItems[0].packed, false);
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
