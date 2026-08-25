import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock, Compass, Droplets, MapPin, ShieldCheck, Sun, Trees } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

const germanUrl = 'https://sage.healthandtravels.com/de/arizona/tagesausfluege-ab-phoenix';
const englishUrl = 'https://sage.healthandtravels.com/arizona/day-trips-from-phoenix';
const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/viajes-de-un-dia-desde-phoenix';
const russianUrl = 'https://sage.healthandtravels.com/ru/arizona/day-trips-from-phoenix';

const faqs = [
  { question: 'Welche Tagesausflüge ab Phoenix eignen sich für Familien?', answer: 'Für kurze Tage eignen sich Papago Park und Cave Creek. Payson und Prescott bieten oft kühlere Luft. Sedona, Flagstaff und Tucson passen zu einem längeren Tag mit nur einem Hauptziel.' },
  { question: 'Wohin kann man der Hitze von Phoenix entkommen?', answer: 'Payson, Prescott und Flagstaff liegen höher und sind häufig kühler. Prüfen Sie am Reisetag trotzdem Wetter, Feuer, Rauch, Gewitter und Straßensperrungen.' },
  { question: 'Wie viel Fahrzeit ist mit Kindern sinnvoll?', answer: 'Für viele Familien sind bis zu zwei Stunden pro Strecke ein guter Höchstwert. Planen Sie nur ein Hauptabenteuer, eine einfache Mahlzeit und einen Plan B.' },
];

function setAlternate(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
}

const driveBands = [
  { label: 'Unter 1 Stunde', icon: Clock, title: 'Kurzer Ausflug', places: 'Papago Park · Cave Creek · Scottsdale', note: 'Gut für kleine Kinder, Besucher und einen freien Vormittag.' },
  { label: '1–2 Stunden', icon: Trees, title: 'Der familienfreundliche Bereich', places: 'Payson · Prescott · Cottonwood', note: 'Natur und spürbares Reisegefühl, ohne dass die Fahrt den ganzen Tag übernimmt.' },
  { label: '2–3 Stunden', icon: MapPin, title: 'Große Landschaft, einfacher Plan', places: 'Sedona · Flagstaff · Tucson', note: 'Wählen Sie ein Hauptziel und eine unkomplizierte Essenspause.' },
  { label: 'Besser mit Übernachtung', icon: Car, title: 'Mehr Zeit, weniger Druck', places: 'Grand Canyon · Page · Show Low · Pinetop', note: 'Hin und zurück ist teilweise möglich, aber eine Nacht ist meist entspannter.' },
];

const seasons = [
  { name: 'Winter', icon: Sun, text: 'Phoenix, Cave Creek, Scottsdale und Tucson sind oft angenehm. Für Flagstaff und Grand Canyon Schnee und Straßen prüfen.' },
  { name: 'Frühling', icon: MapPin, text: 'Sedona, Tucson, Prescott und Cave Creek sind beliebt. Am Wochenende früh losfahren.' },
  { name: 'Sommer', icon: Droplets, text: 'Höhe, Pinien, Wasser und Schatten wählen: Payson, Flagstaff oder Prescott. In Phoenix nur sehr früh nach draußen.' },
  { name: 'Herbst', icon: Trees, text: 'Prescott, Sedona, Payson, Cottonwood und Tucson funktionieren oft gut für Familien.' },
];

export default function GermanDayTripsFromPhoenix() {
  React.useEffect(() => {
    document.documentElement.lang = 'de';
    setAlternate('de', germanUrl);
    setAlternate('en', englishUrl);
    setAlternate('es', spanishUrl);
    setAlternate('ru', russianUrl);
    setAlternate('x-default', englishUrl);
    return () => { document.documentElement.lang = 'en'; };
  }, []);

  return <main className="min-h-screen bg-white text-zinc-900">
    <SEOJsonLd
      title="Familienausflüge ab Phoenix | Sage"
      description="Deutschsprachiger Sage-Planer für Tagesausflüge ab Phoenix: Fahrzeit, Wetter, Kinder, Essen, Toiletten, Schatten und Plan B."
      url={germanUrl}
      faqs={faqs}
      breadcrumbs={[
        { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
        { name: 'Arizona auf Deutsch', url: germanUrl },
        { name: 'Tagesausflüge ab Phoenix', url: germanUrl },
      ]}
    />

    <section className="relative overflow-hidden bg-sky-950 px-6 py-16 text-white md:py-24">
      <div className="absolute inset-0 opacity-40"><img src="/images/payson-rim-overlook.avif" alt="Pinien und Berglandschaft in Arizona für einen Familienausflug ab Phoenix" className="h-full w-full object-cover" fetchPriority="high" /></div>
      <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/90 to-sky-950/35" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
          <Link to="/arizona/day-trips-from-phoenix" className="rounded-full border border-white/30 px-4 py-2 text-white/80">English</Link>
          <Link to="/es/arizona/viajes-de-un-dia-desde-phoenix" className="rounded-full border border-white/30 px-4 py-2 text-white/80">Español</Link>
          <Link to="/ru/arizona/day-trips-from-phoenix" className="rounded-full border border-white/30 px-4 py-2 text-white/80">Русский</Link>
          <span className="rounded-full bg-sky-200 px-4 py-2 text-sky-950">Deutsch</span>
        </div>
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-sky-200">Guide ab Phoenix</p>
        <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Familienausflüge ab Phoenix</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-50 md:text-xl">Der beste Familientag beginnt nicht mit dem berühmtesten Ort, sondern mit der richtigen Fahrzeit, dem Wetter, Toiletten, Essen und der Energie Ihrer Gruppe.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true" className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-sky-950"><Compass className="h-4 w-4" />Planer auf Englisch öffnen</Link>
          <a href="https://healthandtravels.com/de/familienausfluege-ab-phoenix?utm_source=sage&utm_medium=companion&utm_campaign=phoenix_day_trips_de" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white">Ausführlichen Guide lesen</a>
        </div>
      </div>
    </section>

    <section className="border-b border-zinc-100 bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">Fahrzeit wählen</p>
        <h2 className="mb-8 text-3xl font-black uppercase tracking-tight md:text-4xl">Der einfachste Filter ist die Entfernung</h2>
        <div className="grid gap-4 lg:grid-cols-4">{driveBands.map((band) => { const Icon=band.icon; return <article key={band.label} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm"><Icon className="mb-4 h-6 w-6 text-sky-700" /><p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{band.label}</p><h3 className="mt-2 text-lg font-black">{band.title}</h3><p className="mt-3 text-xs font-black uppercase tracking-wide text-sky-800">{band.places}</p><p className="mt-4 text-sm leading-7 text-zinc-600">{band.note}</p></article>; })}</div>
      </div>
    </section>

    <section className="px-6 py-14"><div className="mx-auto max-w-6xl">
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">Jahreszeit</p>
      <h2 className="mb-8 text-3xl font-black uppercase tracking-tight md:text-4xl">Dasselbe Ziel kann leicht oder anstrengend sein</h2>
      <div className="grid gap-4 md:grid-cols-2">{seasons.map((season) => { const Icon=season.icon; return <article key={season.name} className="rounded-lg border border-zinc-100 p-5"><Icon className="mb-4 h-6 w-6 text-sky-700" /><h3 className="text-xl font-black">{season.name}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{season.text}</p></article>; })}</div>
    </div></section>

    <section className="border-y border-zinc-100 bg-amber-50 px-6 py-14"><div className="mx-auto max-w-6xl">
      <ShieldCheck className="h-8 w-8 text-amber-700" />
      <h2 className="mt-4 text-3xl font-black uppercase tracking-tight">Sicherheitscheck vor der Abfahrt</h2>
      <ul className="mt-6 grid gap-3 text-sm leading-7 text-zinc-700 md:grid-cols-2">
        <li>Wetter, Hitze, Gewitter, Rauch, Feuer und Straßensperrungen prüfen.</li>
        <li>Outdoor-Aktivität früh am Tag einplanen.</li>
        <li>Toiletten, Wasser und Essensmöglichkeiten vorher bestätigen.</li>
        <li>Ein Hauptziel statt fünf kleiner Stopps wählen.</li>
        <li>Plan B bereithalten: Schatten, Innenraum, kürzere Route oder frühe Rückfahrt.</li>
      </ul>
    </div></section>

    <section className="px-6 py-14"><div className="mx-auto max-w-4xl">
      <h2 className="text-3xl font-black uppercase tracking-tight">Häufig gestellte Fragen</h2>
      <div className="mt-8 space-y-6">{faqs.map((faq)=><article key={faq.question}><h3 className="text-lg font-black">{faq.question}</h3><p className="mt-2 leading-7 text-zinc-600">{faq.answer}</p></article>)}</div>
      <div className="mt-10 rounded-xl bg-sky-950 p-8 text-white"><h2 className="text-2xl font-black uppercase">Jetzt den Tagesausflug zusammenstellen</h2><p className="mt-3 text-sky-100">Sage übernimmt Startort, Kinder, Fahrzeit, Schatten und Toiletten. Der interaktive Planer ist derzeit auf Englisch.</p><Link to="/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true" className="mt-6 inline-flex rounded-full bg-sky-200 px-6 py-3 text-sm font-black uppercase text-sky-950">Englischen Sage-Planer öffnen</Link></div>
    </div></section>
  </main>;
}