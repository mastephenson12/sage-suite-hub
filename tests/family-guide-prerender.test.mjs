import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderFamilyGuide } from '../scripts/render-family-guide.mjs';

test('initial HTML includes useful guide content, FAQs, sources and destination-specific planner links', async () => {
  const guides = JSON.parse(await readFile(new URL('../src/data/familyGuideDetails.json', import.meta.url), 'utf8'));
  for (const [slug, guide] of Object.entries(guides)) {
    const html = renderFamilyGuide(guide, slug);
    assert.equal((html.match(/<h1>/g) ?? []).length, 1);
    assert.ok(html.includes(`/trip-builder?location=${slug}`));
    for (const source of guide.sources) assert.ok(html.includes(source.url));
    for (const faq of guide.faqs) assert.ok(html.includes(faq.question));
    assert.ok(html.includes(guide.sections[0].heading));
  }
});

test('prerendered content escapes text and attribute delimiters', () => {
  const guide = {
    heading: '<unsafe>', intro: 'A & B', sections: [], faqs: [],
    sources: [{ url: 'https://example.com/?a="x"&b=2', label: '<source>' }], related: [],
  };
  const html = renderFamilyGuide(guide, 'test');
  assert.ok(!html.includes('<unsafe>'));
  assert.ok(html.includes('&lt;unsafe&gt;'));
  assert.ok(html.includes('A &amp; B'));
  assert.ok(html.includes('a=&quot;x&quot;&amp;b=2'));
});
