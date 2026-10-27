// The initial HTML and the React page use the same guide content and FAQs.
export function renderFamilyGuide(guide, slug, { locale = 'en', length = 'weekend' } = {}) {
  const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const sections = guide.sections.map((section) => `<section><h2>${escape(section.heading)}</h2><ul>${section.items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul></section>`).join('');
  const faqs = guide.faqs.map((faq) => `<h3>${escape(faq.question)}</h3><p>${escape(faq.answer)}</p>`).join('');
  const sources = guide.sources.map((source) => `<li><a href="${escape(source.url)}">${escape(source.label)}</a></li>`).join('');
  const related = guide.related.map((link) => `<li><a href="${escape(link.path)}">${escape(link.label)}</a></li>`).join('');
  const es = locale === 'es';
  return `<main class="mx-auto max-w-6xl px-6 py-14 text-zinc-900"><nav><a href="${es ? '/es/arizona' : '/explore'}">${es ? 'Guías de Arizona en español' : 'Explore Arizona family guides'}</a></nav><h1>${escape(guide.heading)}</h1><p>${escape(guide.intro)}</p><p><a href="/trip-builder?location=${escape(slug)}&amp;length=${escape(length)}">${es ? 'Crear mi plan (planificador en inglés)' : 'Build this family trip'}</a></p>${sections}<section><h2>${es ? 'Preguntas para planear la visita' : 'Planning questions'}</h2>${faqs}</section><section><h2>${es ? 'Consultar antes de salir' : 'Check details before you go'}</h2><ul>${sources}</ul></section><nav aria-label="${es ? 'Guías relacionadas' : 'Related guides'}"><ul>${related}</ul></nav></main>`;
}
