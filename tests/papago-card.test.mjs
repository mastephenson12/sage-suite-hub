import test from 'node:test';
import assert from 'node:assert/strict';
import { papagoReadyToGo, buildReadyToGoDocument } from '../src/data/readyToGo.ts';

test('offline card retains selected checks and all essential facts without network dependencies', () => {
  const html = buildReadyToGoDocument(papagoReadyToGo, [true, false, true]);
  assert.equal((html.match(/type="checkbox" checked/g) || []).length, 2);
  for (const [, fact] of papagoReadyToGo.facts) assert.ok(html.includes(fact.replaceAll('&', '&amp;')));
  for (const link of papagoReadyToGo.links) assert.ok(html.includes(link.url.replaceAll('&', '&amp;')));
  assert.match(html, /not your full personalized Sage itinerary/);
  assert.match(html, /does not contain offline maps/);
  assert.match(html, /November 15, 2026/);
  assert.doesNotMatch(html, /<script|<link|<img|@import|url\(/);
});

test('download escapes content and preserves unchecked defaults', () => {
  const html = buildReadyToGoDocument({...papagoReadyToGo, title:'<script>alert("x")</script>', checklist:['<unsafe> & "quoted"']});
  assert.doesNotMatch(html, /<script>|<unsafe>|type="checkbox" checked/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&amp; &quot;quoted&quot;/);
});
