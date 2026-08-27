import React from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, Bus, Compass, MapPin, ShieldCheck, Sunrise, Users, Utensils } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const url = 'https://sage.healthandtravels.com/de/arizona/grand-canyon-mit-kindern';
const en = 'https://sage.healthandtravels.com/arizona/grand-canyon';
const es = 'https://sage.healthandtravels.com/es/arizona/gran-canon-con-ninos';
const ru = 'https://sage.healthandtravels.com/ru/arizona/grand-canyon-with-kids';

const faqs = [
  { question: 'Eignet sich der South Rim für Kinder?', answer: 'Ja. Mather Point, ein passender Abschnitt des Rim Trail, das Yavapai Geology Museum und häufige Pausen ergeben einen guten ersten Familientag.' },
  { question: 'Müssen wir in den Canyon hinabwandern?', answer: 'Nein. Die Ausblicke vom Rand bieten bereits ein vollständiges Erlebnis. Jeder Abstieg ist freiwillig, und der Rückweg bergauf ist immer anstrengender.' },
  { question: 'Ist der Shuttle kostenlos?', answer: 'Ja. Routen und Fahrpläne ändern sich saisonal. Prüfen Sie die offizielle NPS-Website am Besuchstag.' },
  { question: 'Wo sollten Familien übernachten?', answer: 'Grand Canyon Village verkürzt Wege, Tusayan liegt am Südeingang und Williams oder Flagstaff passen zu längeren Rundreisen.' },
];

const plans = [
  { title: 'Ruhiger erster Besuch', group: 'Kleine Kinder oder ältere Erwachsene', text: 'Visitor Center → Mather Point → frühes Essen → Junior Ranger. Nur einen weiteren Stopp einplanen, wenn alle noch Energie haben.' },
  { title: 'Spaziergang am Rand', group: 'Kinder im Schulalter', text: 'Mather Point → geeigneter Abschnitt des Rim Trail → Yavapai Geology Museum → Rückfahrt mit dem Shuttle.' },
  { title: 'Große Aussicht, wenig Fahren', group: 'Familien mit gemischtem Alter', text: 'Einmal parken, den Shuttle nutzen und jeden weiteren Stopp nach der Person mit der geringsten Energie entscheiden.' },
];

const stops = [
  { title: 'Mather Point', icon: Sunrise, text: 'Der erste große Ausblick nahe dem Visitor Center. Früh ankommen reduziert Menschenmengen und Stress.' },
  { title: 'Yavapai Point', icon: MapPin, text: 'Panorama und Geologiemuseum verbinden Naturerlebnis mit einer Pause drinnen.' },
  { title: 'Rim Trail', icon: Compass, text: 'Einen ausgebauten Abschnitt wählen und vor der Erschöpfung umkehren. Nicht überall gibt es Geländer.' },
  { title: 'Park-Shuttle', icon: Bus, text: 'Kostenloser Transport zwischen wichtigen Bereichen mit saisonalen Routen und Fahrplänen.' },
];

const safety = [
  'Ein Erwachsener steht immer zwischen einem kleinen Kind und dem Rand.',
  'Für Fotos niemals rückwärts gehen und in der Nähe des Abgrunds nicht rennen.',
  'Vor der Abfahrt Wetter, Straßen, Blitzgefahr, Schnee und Warnungen prüfen.',
  'Im Sommer anstrengende Wege unterhalb des Randes zwischen 10 und 16 Uhr vermeiden.',
  'Wasser, vertraute Snacks, Sonnenschutz und eine zusätzliche Kleidungsschicht mitnehmen.',
];

const share = ['Grand Canyon mit Kindern – einfacher Plan:', '1. Früh am Visitor Center ankommen', '2. Mather Point', '3. Kurzer Rim Trail bis Yavapai', '4. Essen und Junior Ranger', '5. Ein Shuttle-Stopp oder Pause', '', 'Regel: ein Ausblick, ein Spaziergang, eine Pause.', url].join('\n');
const vote = ['Welchen Grand-Canyon-Plan bevorzugt die Familie?', '1. Aussichtspunkte und Junior Ranger', '2. Kurzer Rim Trail und Geologiemuseum', '3. Shuttle und wenige Spaziergänge', '4. Übernachten und alles ruhiger erleben', url].join('\n');

function alternate(lang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
  if (!link) { link = document.createElement('link'); link.rel = 'alternate'; link.hreflang = lang; document.head.appendChild(link); }
  link.href = href;
}

export default function GermanGrandCanyonWithKids() {
  React.useEffect(() => {
    const old = document.documentElement.lang;
    document.documentElement.lang = 'de';
    alternate('de', url); alternate('en', en); alternate('es', es); alternate('ru', ru); alternate('x-default', en);
    return () => { document.documentElement.lang = old || 'en'; };
  }, []);

  return <main className="min-h-screen bg-white text-zinc-950">
    <SEOJsonLd title="Grand Canyon mit Kindern | Familienplan für den South Rim | Sage" description="Deutschsprachiger Familienplan für den Grand Canyon South Rim: Aussichtspunkte, Rim Trail, Shuttle, Essen, Unterkunft und Sicherheit." url={url} faqs={faqs} breadcrumbs={[{ name: 'Sage', url: 'https://sage.healthandtravels.com/' }, { name: 'Arizona auf Deutsch', url }, { name: 'Grand Canyon mit Kindern', url }]} />
    <section className="bg-slate-950 px-6 py-20 text-white"><div className="mx-auto max-w-6xl"><div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[.2em]"><Link to="/arizona/grand-canyon" className="rounded-full border border-white/30 px-4 py-2">English</Link><Link to="/es/arizona/gran-canon-con-ninos" className="rounded-full border border-white/30 px-4 py-2">Español</Link><Link to="/ru/arizona/grand-canyon-with-kids" className="rounded-full border border-white/30 px-4 py-2">Русский</Link><span className="rounded-full bg-teal-100 px-4 py-2 text-teal-950">Deutsch</span></div><p className="text-[11px] font-black uppercase tracking-[.3em] text-teal-200">Große Aussicht · einfacher Familientag</p><h1 className="mt-4 max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Grand Canyon mit Kindern</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Wählen Sie einen Spaziergang, nutzen Sie den Shuttle und sparen Sie genug Energie für einen sicheren Rückweg, statt alles an einem Tag sehen zu wollen.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/trip-builder?plan=ready&location=grand-canyon&kids=yes&group=family&activity=views&length=full-day&language=de" className="rounded-full bg-blue-700 px-6 py-3 text-sm font-black uppercase">Meinen Plan erstellen</Link><a href="https://www.nps.gov/grca/planyourvisit/shuttle-buses.htm" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase">Shuttle prüfen</a></div></div></section>
    <section className="border-b border-teal-100 bg-teal-50/60 px-6 py-10"><div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">{[[Users, 'Tempo', 'Die langsamste Person'], [Bus, 'Transport', 'Kostenloser Shuttle'], [Utensils, 'Pause', 'Essen vor der Müdigkeit'], [BedDouble, 'Basis', 'Village oder Tusayan']].map(([Icon, label, value]: any) => <article key={label} className="rounded-xl border border-teal-100 bg-white p-4"><Icon className="mb-3 h-5 w-5 text-teal-700"/><p className="text-[10px] font-black uppercase tracking-[.2em] text-zinc-400">{label}</p><p className="mt-2 text-sm font-black">{value}</p></article>)}</div></section>
    <section className="px-6 py-14"><div className="mx-auto max-w-6xl"><p className="text-[10px] font-black uppercase tracking-[.25em] text-teal-700">Tempo wählen</p><h2 className="mt-3 text-3xl font-black uppercase md:text-4xl">Drei realistische Pläne</h2><div className="mt-8 grid gap-4 lg:grid-cols-3">{plans.map(plan => <article key={plan.title} className="rounded-xl border border-zinc-100 p-5 shadow-sm"><h3 className="text-xl font-black">{plan.title}</h3><p className="mt-3 rounded-lg bg-teal-50 p-3 text-xs font-black uppercase text-teal-800">{plan.group}</p><p className="mt-4 text-sm leading-7 text-zinc-600">{plan.text}</p></article>)}</div></div></section>
    <section className="border-y border-teal-100 bg-teal-50/60 px-6 py-14"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black uppercase md:text-4xl">Vier hilfreiche Stopps</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{stops.map(stop => { const Icon = stop.icon; return <article key={stop.title} className="rounded-xl border border-teal-100 bg-white p-5"><Icon className="mb-4 h-6 w-6 text-teal-700"/><h3 className="text-xl font-black">{stop.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{stop.text}</p></article>; })}</div></div></section>
    <section className="px-6 py-14"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.85fr_1.15fr]"><div><ShieldCheck className="h-8 w-8 text-teal-700"/><h2 className="mt-4 text-3xl font-black uppercase">Sicherheit vor dem Foto</h2><p className="mt-4 leading-7 text-zinc-600">Rand, Höhe, Hitze, Schnee und Blitzgefahr sind wichtiger als eine vollständige Liste.</p></div><div className="grid gap-3">{safety.map(item => <div key={item} className="flex gap-3 rounded-xl border border-zinc-100 p-4"><ShieldCheck className="mt-1 h-5 w-5 flex-none text-teal-700"/><p className="text-sm leading-7">{item}</p></div>)}</div></div></section>
    <section className="bg-slate-950 px-6 py-14 text-white"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><h2 className="text-3xl font-black uppercase">Den vollständigen Guide lesen</h2><p className="mt-4 leading-7 text-zinc-300">Essen, Unterkünfte, Jahreszeiten, Tagesablauf und offizielle Quellen finden Sie bei Health & Travels.</p><a href="https://healthandtravels.com/de/grand-canyon-mit-kindern?utm_source=sage&utm_medium=cta&utm_campaign=grand_canyon_de" className="mt-6 inline-block rounded-full bg-teal-100 px-6 py-3 text-sm font-black uppercase text-teal-950">Guide öffnen</a></div><div><h2 className="text-3xl font-black uppercase">Plan teilen</h2><SharePlanPanel title="An Ihre Familie senden" description="Kopieren Sie den Plan oder senden Sie eine kurze Abstimmung, bevor Sie das Tempo wählen." quickPlanText={share} voteText={vote} eventContext="german_grand_canyon_with_kids" locale="de" /></div></div></section>
    <section className="px-6 py-14"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black uppercase">Häufige Fragen</h2><div className="mt-6 space-y-4">{faqs.map(faq => <details key={faq.question} className="rounded-xl border border-zinc-100 p-5"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p></details>)}</div></div></section>
  </main>;
}
