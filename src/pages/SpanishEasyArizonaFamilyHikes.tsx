import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, CheckCircle2, Compass, Droplets, MapPin, Mountain, ShieldCheck, Sun, Trees, Users } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/caminatas-faciles-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/arizona/easy-family-hikes';

const faqs = [
  { question: '¿Qué hace que una caminata sea fácil para niños?', answer: 'Una caminata familiar fácil combina poca distancia, poco desnivel, navegación sencilla, un regreso claro y condiciones apropiadas para la temporada. Sombra, baños y comida cercana pueden importar tanto como el kilometraje.' },
  { question: '¿Dónde empezar cerca de Phoenix?', answer: 'Papago Park y White Tank Mountain Regional Park ofrecen opciones cortas y fáciles de ajustar. El calor sigue siendo el factor principal para decidir la hora y la temporada.' },
  { question: '¿Qué conviene en verano?', answer: 'En verano suele ser mejor buscar mayor elevación, pinos y horarios tempranos en lugares como Payson, Mogollon Rim, Prescott o Flagstaff, además de revisar tormentas y alertas.' },
  { question: '¿Debemos terminar toda la ruta?', answer: 'No. Para muchas familias, regresar mientras todos todavía están bien es una mejor victoria que completar una distancia arbitraria.' },
];

const filters = [
  { icon: Baby, label: 'Niños pequeños', value: 'Ruta corta + regreso fácil' },
  { icon: Sun, label: 'Calor', value: 'Temporada y horario primero' },
  { icon: Trees, label: 'Comodidad', value: 'Sombra cuando sea posible' },
  { icon: Droplets, label: 'Logística', value: 'Agua, baños y snacks' },
];

const picks = [
  { place: 'Papago Park', area: 'Phoenix', best: 'Primera salida muy corta', text: 'Varias rutas breves permiten probar el senderismo del desierto sin comprometerse con una subida larga.', to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=hike&length=half-day&ages=young-kids&shade=false&bathrooms=true&language=es' },
  { place: 'White Tank Mountain', area: 'West Valley', best: 'Familias que quieren una ruta fácil de recortar', text: 'Waterfall Trail y Black Rock dan opciones cortas. El objetivo puede ser caminar una parte y regresar antes de que cambie el ánimo o el clima.', to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=hike&length=half-day&ages=mixed&shade=false&bathrooms=true&language=es' },
  { place: 'Payson y Mogollon Rim', area: 'Rim Country', best: 'Meses cálidos', text: 'Mayor elevación, pinos, lagos y caminatas exploratorias crean más margen cuando Phoenix está demasiado caliente.', to: '/es/arizona/payson-y-mogollon-rim-con-ninos' },
  { place: 'Sedona', area: 'Verde Valley', best: 'Paisaje con ruta flexible', text: 'Escoge un tramo sencillo y usa una hora de regreso en vez de convertir el punto final en una obligación.', to: '/es/arizona/sedona-con-ninos' },
];

const checklist = [
  '¿La distancia incluye el regreso completo?',
  '¿El desnivel es razonable para el niño más pequeño?',
  '¿La superficie es estable para el grupo?',
  '¿Hay suficiente sombra para la temporada?',
  '¿Sabemos dónde están los baños?',
  '¿Podemos regresar en cualquier momento?',
  '¿Tenemos agua, snacks y un plan B?',
];

const quickPlanText = [
  'Plan para una caminata fácil en Arizona con niños:',
  '',
  '1. Elegir por el niño más pequeño o menos flexible.',
  '2. Mantener la ruta corta y fácil de abandonar.',
  '3. Revisar calor, sombra, baños y agua.',
  '4. Fijar una hora de regreso antes de empezar.',
  '5. Tener un plan B cerca.',
  '',
  spanishUrl,
].join('\n');

const voteText = [
  '¿Qué tipo de caminata fácil hacemos?',
  '',
  '1. Muy corta en Papago Park',
  '2. White Tank Mountain en el West Valley',
  '3. Día más fresco en Payson / Mogollon Rim',
  '4. Rocas rojas en Sedona',
  '',
  spanishUrl,
].join('\n');

function setAlternateLink(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function SpanishEasyArizonaFamilyHikes() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;
    document.documentElement.lang = 'es';
    setAlternateLink('es', spanishUrl);
    setAlternateLink('en', englishUrl);
    setAlternateLink('x-default', englishUrl);
    return () => { document.documentElement.lang = previousLang || 'en'; };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Caminatas fáciles en Arizona con niños | Sage"
        description="Encuentra caminatas fáciles en Arizona para familias con niños por distancia, temporada, calor, sombra, baños, superficie y facilidad para regresar."
        url={spanishUrl}
        faqs={faqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en español', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Caminatas fáciles con niños', url: spanishUrl },
        ]}
      />

      <section className="bg-emerald-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[.2em]">
            <Link to="/arizona/easy-family-hikes" className="rounded-full border border-white/30 px-4 py-2">English</Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">Español</span>
          </div>
          <p className="text-[11px] font-black uppercase tracking-[.3em] text-emerald-200">Menos distancia · mejor día</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Caminatas fáciles en Arizona con niños</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50">Elige por la familia real: edades, calor, sombra, baños, superficie y qué tan fácil es regresar antes de que alguien pase de “esto está padre” a “cárgame”.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=hike&length=half-day&ages=mixed&shade=true&bathrooms=true&language=es" className="rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase text-emerald-950">Crear mi plan</Link>
            <a href="https://healthandtravels.com/es/caminatas-faciles-arizona-con-ninos?utm_source=sage&utm_medium=cta&utm_campaign=easy_hikes_es" className="rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase">Leer la guía completa</a>
          </div>
        </div>
      </section>

      <section className="border-b border-emerald-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {filters.map((item) => { const Icon = item.icon; return <article key={item.label} className="rounded-xl border border-emerald-100 bg-white p-4"><Icon className="mb-3 h-5 w-5 text-emerald-700"/><p className="text-[10px] font-black uppercase tracking-[.2em] text-zinc-400">{item.label}</p><p className="mt-2 text-sm font-black">{item.value}</p></article>; })}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-black uppercase tracking-[.25em] text-emerald-700">Puntos de partida</p>
          <h2 className="mt-3 text-3xl font-black uppercase md:text-4xl">Cuatro formas de mantenerlo fácil</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {picks.map((pick) => <Link key={pick.place} to={pick.to} className="rounded-xl border border-zinc-100 p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200"><div className="flex items-center gap-2 text-emerald-700"><MapPin className="h-5 w-5"/><span className="text-xs font-black uppercase tracking-wide">{pick.area}</span></div><h3 className="mt-3 text-xl font-black">{pick.place}</h3><p className="mt-2 text-xs font-black uppercase text-zinc-400">Mejor para: {pick.best}</p><p className="mt-3 text-sm leading-7 text-zinc-600">{pick.text}</p></Link>)}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div><Compass className="h-8 w-8 text-emerald-700"/><h2 className="mt-4 text-3xl font-black uppercase">La lista antes de escoger</h2><p className="mt-4 leading-7 text-zinc-600">Una ruta puede decir “easy” y todavía ser una pésima idea para tu familia ese día. Revisa esto primero.</p></div>
          <div className="grid gap-3">{checklist.map(item => <div key={item} className="flex gap-3 rounded-xl border border-zinc-100 bg-white p-4"><CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-700"/><p className="text-sm leading-7">{item}</p></div>)}</div>
        </div>
      </section>

      <section className="px-6 py-14"><div className="mx-auto max-w-6xl rounded-2xl bg-amber-50 p-6 md:p-8"><div className="flex gap-4"><ShieldCheck className="mt-1 h-7 w-7 flex-none text-amber-700"/><div><h2 className="text-2xl font-black">Fácil no significa seguro con calor extremo</h2><p className="mt-3 leading-7 text-zinc-700">Si hace demasiado calor, cambia la hora, sube de elevación o cambia de actividad. Una ruta corta no elimina el riesgo de calor.</p><Link to="/es/arizona/viajes-frescos-verano-con-ninos" className="mt-5 inline-flex items-center gap-2 font-black text-amber-800"><Mountain className="h-4 w-4"/>Ver opciones más frescas</Link></div></div></div></section>

      <section className="bg-emerald-950 px-6 py-14 text-white"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><Users className="h-8 w-8 text-emerald-200"/><h2 className="mt-4 text-3xl font-black uppercase">¿Quieres más opciones de caminatas?</h2><p className="mt-4 leading-7 text-emerald-50">Esta página se concentra en rutas fáciles. Para una guía más amplia por edad, temporada y región, usa nuestra página general de caminatas con niños.</p><Link to="/es/arizona/caminatas-con-ninos" className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-black uppercase text-emerald-950">Ver todas las caminatas</Link></div><div><SharePlanPanel title="Compartir con la familia" description="Copia un plan corto o una votación antes de escoger la ruta." quickPlanText={quickPlanText} voteText={voteText} eventContext="spanish_easy_family_hikes" locale="es" /></div></div></section>

      <section className="px-6 py-14"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black uppercase">Preguntas frecuentes</h2><div className="mt-6 space-y-4">{faqs.map(faq => <details key={faq.question} className="rounded-xl border border-zinc-100 p-5"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p></details>)}</div></div></section>
    </main>
  );
}
