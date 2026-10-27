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

test('Jerome keeps half-day pacing and Spanish Flagstaff retains translated content and planner preferences', async () => {
  const jerome = JSON.parse(await readFile(new URL('../src/data/jeromeFamilyGuide.json', import.meta.url), 'utf8'));
  const spanish = JSON.parse(await readFile(new URL('../src/data/spanishFlagstaffDetails.json', import.meta.url), 'utf8'));
  assert.ok(renderFamilyGuide(jerome, 'jerome', { length: 'half-day' }).includes('location=jerome&amp;length=half-day'));
  const html = renderFamilyGuide(spanish, 'flagstaff', { locale: 'es' });
  assert.ok(html.includes('Qué hacer en Flagstaff con niños'));
  assert.ok(html.includes('planificador en inglés'));
  assert.ok(html.includes('location=flagstaff&amp;length=weekend'));
  assert.ok(!html.includes('plan=ready'));
  for (const faq of spanish.faqs) assert.ok(html.includes(faq.question));
});
