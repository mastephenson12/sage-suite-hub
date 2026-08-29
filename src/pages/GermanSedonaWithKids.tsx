import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bus,
  Car,
  CloudRain,
  Compass,
  Droplets,
  MapPin,
  Mountain,
  ShieldCheck,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const germanUrl = 'https://sage.healthandtravels.com/de/arizona/sedona-mit-kindern';
const englishUrl = 'https://sage.healthandtravels.com/arizona/sedona';
const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/sedona-con-ninos';
const russianUrl = 'https://sage.healthandtravels.com/ru/arizona/sedona-with-kids';

const germanFaqs = [
  {
    question: 'Ist Sedona ein gutes Reiseziel mit Kindern?',
    answer:
      'Ja. Sedona bietet rote Felsen, flexible Wanderungen, Aussichtspunkte und familienfreundliche Tagespläne. Am besten funktioniert meist ein Hauptabenteuer, eine einfache Mahlzeit und ein flexibler Plan B.',
  },
  {
    question: 'Welche Wanderungen in Sedona eignen sich für Familien?',
    answer:
      'Bell Rock Pathway lässt sich leicht verkürzen, Little Horse bietet große Ausblicke ohne Gipfelzwang und ein kurzer Abschnitt von Soldier Pass kann für ältere Kinder passen. Schwierige Kletterstellen sind nicht nötig, um Sedona zu erleben.',
  },
  {
    question: 'Wie funktioniert der Sedona Shuttle?',
    answer:
      'Der Trailhead-Shuttle ist kostenlos und verbindet an Betriebstagen Park-and-Ride-Flächen mit mehreren beliebten Trailheads. Fahrplan, Routen und Parkregeln sollten kurz vor der Abfahrt offiziell geprüft werden.',
  },
  {
    question: 'Wann sollte eine Familie in Sedona wandern?',
    answer:
      'Früh am Morgen ist oft die beste Wahl. Im Sommer reduziert ein früher Start Hitze und Menschenmengen. Während des Monsuns müssen Gewitter, Blitzschlag und plötzlich steigendes Wasser berücksichtigt werden.',
  },
];

function setAlternateLink(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  );
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

const quickStats = [
  { icon: Car, label: 'Ab Phoenix', value: 'Etwa 2 Stunden, bei Verkehr länger' },
  { icon: Users, label: 'Gut für', value: 'Familien, Besucher und kleine Gruppen' },
  { icon: Bus, label: 'Shuttle', value: 'Kostenlos; Fahrplan vorher prüfen' },
  { icon: CloudRain, label: 'Achten auf', value: 'Hitze, Monsun, Menschenmengen und Kanten' },
];

const familyPlans = [
  {
    title: 'Erster Besuch ohne Stress',
    bestFor: 'Kleine Kinder, Großeltern oder wenig Wandererfahrung',
    plan:
      'Früh mit Bell Rock Pathway oder einem Aussichtspunkt beginnen, rechtzeitig essen und den Nachmittag für Tlaquepaque, einen Park oder Ruhe offenlassen.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=de',
  },
  {
    title: 'Shuttle und rote Felsen',
    bestFor: 'Familien mit älteren Kindern, die gern wandern',
    plan:
      'Am passenden Park & Ride parken und den Shuttle zu Little Horse oder Soldier Pass nutzen. Vor dem Start die letzte Rückfahrt und die Umkehrzeit festlegen.',
    to: 'https://sedonashuttle.com/trailhead-shuttles/',
    external: true,
  },
  {
    title: 'Familienwochenende',
    bestFor: 'Weniger Eile und mehr Spielraum für Wetter',
    plan:
      'Tag eins: kurze Wanderung und Essen. Tag zwei: Panoramafahrt, Stadt, Park oder zweite frühe Outdoor-Runde. Nicht jede Stunde verplanen.',
    to: '/arizona/weekend-trips',
  },
];

const outingIdeas = [
  {
    title: 'Bell Rock Pathway',
    icon: Mountain,
    level: 'Flexibel',
    text: 'Große Ausblicke erscheinen schnell. Die Familie kann jederzeit umdrehen, ohne auf steilen Fels klettern zu müssen.',
  },
  {
    title: 'Little Horse',
    icon: MapPin,
    level: 'Aktive Familien',
    text: 'Weite Aussicht und anpassbare Distanz. Früh starten und Shuttle bzw. Trailhead-Zugang prüfen.',
  },
  {
    title: 'Soldier Pass, kurzer Abschnitt',
    icon: Compass,
    level: 'Ältere Kinder',
    text: 'Ein Teilstück kann interessante Ziele bieten, ohne die gesamte Route zu laufen. Verkehr und Shuttle-Regeln vorher klären.',
  },
  {
    title: 'Oak Creek und Schatten',
    icon: Droplets,
    level: 'Ruhiger Plan',
    text: 'Picknick- oder Bachbereiche können das Tempo senken. Gebühren, Parkplatz, Wasserbedingungen und Hochwasserrisiko prüfen.',
  },
];

const safetyChecks = [
  'Wetter, Waldsperrungen, Rauch und Straßenlage vor der Abfahrt prüfen.',
  'Früh starten; offene rote Felsen werden heiß und bieten wenig Schatten.',
  'Für jede Person Wasser, Snacks und Sonnenschutz einplanen.',
  'Kinder nicht an Kanten, steilen Slickrock-Passagen oder Absturzstellen rennen lassen.',
  'Bei Monsungewitter Bachbetten verlassen und bei steigendem Wasser höheres Gelände aufsuchen.',
  'Karte offline speichern und die letzte Shuttle-Rückfahrt kennen.',
];

const quickPlanText = [
  'Einfacher Familienplan für Sedona:',
  '',
  '1. Wetter, Shuttle und Parkplatz prüfen',
  '2. Früh ein einziges Hauptabenteuer starten',
  '3. Wasser, Snacks und Sonnenschutz mitnehmen',
  '4. Essen und Pause planen, bevor alle erschöpft sind',
  '5. Plan B bereithalten: Aussichtspunkt, Stadt, Park oder früher zurück',
  '',
  'Sage-Regel: ein Abenteuer, eine Mahlzeit und ein Plan B.',
  `Guide: ${germanUrl}`,
].join('\n');

export default function GermanSedonaWithKids() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;
    document.documentElement.lang = 'de';
    setAlternateLink('de', germanUrl);
    setAlternateLink('en', englishUrl);
    setAlternateLink('es', spanishUrl);
    setAlternateLink('ru', russianUrl);
    setAlternateLink('x-default', englishUrl);
    return () => {
      document.documentElement.lang = previousLang || 'en';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Sedona mit Kindern | Familienguide für Wanderungen und Shuttle | Sage"
        description="Deutschsprachiger Sedona-Guide für Familien: Wanderungen, Shuttle, Parken, Hitze, Monsun, Sicherheit, Essen und ein realistischer Tagesplan."
        url={germanUrl}
        faqs={germanFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona auf Deutsch', url: 'https://sage.healthandtravels.com/de/arizona/tagesausfluege-ab-phoenix' },
          { name: 'Sedona mit Kindern', url: germanUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-55">
          <img
            src="/images/sedona-family.avif"
            alt="Familie vor den roten Felsformationen von Sedona, Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/25" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link to="/arizona/sedona" className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950">English</Link>
            <Link to="/es/arizona/sedona-con-ninos" className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950">Español</Link>
            <span className="rounded-full bg-teal-100 px-4 py-2 text-teal-950">Deutsch</span>
          </div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-teal-200">Familienguide für rote Felsen</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Sedona mit Kindern</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">Wanderungen, Shuttle, Parken und Sicherheit so planen, dass die Familie die roten Felsen genießt, ohne aus dem Tag einen Ausdauerwettkampf zu machen.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=de" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-800"><Compass className="h-4 w-4" aria-hidden="true" />Meinen Plan erstellen</Link>
            <a href="https://sedonashuttle.com/trailhead-shuttles/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"><Bus className="h-4 w-4" aria-hidden="true" />Shuttle prüfen</a>
          </div>
        </div>
      </section>

      <section className="border-b border-teal-100 bg-teal-50/60 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return <article key={stat.label} className="rounded-xl border border-teal-100 bg-white p-4"><Icon className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" /><p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p><p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p></article>;
          })}
        </div>
      </section>

      <section className="px-6 py-14"><div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-teal-700">Zuerst draußen</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black uppercase tracking-tight md:text-5xl">Ein Hauptabenteuer reicht</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">Wählen Sie den Trail nach dem langsamsten Wanderer, der Hitze und der verfügbaren Zeit. Ein flexibler Rückweg ist für Familien oft wertvoller als ein berühmter Gipfel.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">{outingIdeas.map((idea) => { const Icon = idea.icon; return <article key={idea.title} className="rounded-2xl border border-zinc-200 p-6"><Icon className="h-6 w-6 text-teal-700" aria-hidden="true" /><p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-teal-700">{idea.level}</p><h3 className="mt-2 text-xl font-black">{idea.title}</h3><p className="mt-3 leading-7 text-zinc-600">{idea.text}</p></article>; })}</div>
      </div></section>

      <section className="bg-zinc-50 px-6 py-14"><div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-teal-700">Plan wählen</p>
        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">Welcher Sedona-Tag passt?</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">{familyPlans.map((item) => <article key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-6"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{item.bestFor}</p><h3 className="mt-3 text-xl font-black">{item.title}</h3><p className="mt-3 leading-7 text-zinc-600">{item.plan}</p>{item.external ? <a href={item.to} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-black text-blue-700">Offizielle Infos →</a> : <Link to={item.to} className="mt-5 inline-flex font-black text-blue-700">Diesen Plan öffnen →</Link>}</article>)}</div>
      </div></section>

      <section className="px-6 py-14"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_.85fr]">
        <div><p className="text-[11px] font-black uppercase tracking-[0.25em] text-teal-700">Sicherheit</p><h2 className="mt-3 text-3xl font-black uppercase tracking-tight">Hitze, Monsun und Kanten ernst nehmen</h2><div className="mt-6 space-y-3">{safetyChecks.map((check) => <div key={check} className="flex gap-3 rounded-xl border border-zinc-200 p-4"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" /><p className="leading-7 text-zinc-700">{check}</p></div>)}</div></div>
        <aside className="rounded-2xl bg-slate-950 p-7 text-white"><h2 className="text-2xl font-black uppercase tracking-tight">Sage-Familienregel</h2><p className="mt-4 leading-7 text-slate-200">Ein Abenteuer, eine Mahlzeit und ein Plan B. Wenn die Familie noch Energie hat, kann immer etwas dazukommen. Andersherum funktioniert es erstaunlich schlechter.</p><Link to="/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&language=de" className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-black uppercase tracking-wide text-white">Sedona-Plan bauen</Link></aside>
      </div></section>

      <section className="bg-teal-50/60 px-6 py-14"><div className="mx-auto max-w-6xl"><SharePlanPanel
          title="Sedona-Plan mit der Familie teilen"
          description="Kopieren Sie den Kurzplan, starten Sie eine einfache Familienabstimmung oder senden Sie den direkten Link."
          quickPlanText={quickPlanText}
          voteText="Sedona-Familienplan: Was passt besser? 1) Frühe kurze Wanderung und Mittagessen, 2) Shuttle und rote Felsen oder 3) Aussichtspunkt, Stadt und Park als ruhiger Plan?"
          eventContext="german_sedona_with_kids"
          locale="de"
        /></div></section>
    </main>
  );
}