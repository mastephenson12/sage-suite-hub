import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock3, Compass, Droplets, MapPin, ShieldCheck, Sun, Users } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/papago-park-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/trail-guides/papago-park';

const faqs = [
  { question: '¿Papago Park es una buena salida con niños?', answer: 'Sí, cuando la familia lo trata como una visita corta y expuesta al desierto. Hole-in-the-Rock ofrece una vista rápida, pero requiere supervisión cercana por la roca irregular, las zonas expuestas y la poca sombra.' },
  { question: '¿Cuál es la mejor hora para ir?', answer: 'La mañana temprano suele ofrecer temperaturas más cómodas y una llegada más tranquila. Revisen el pronóstico por hora y los avisos actuales del parque antes de salir.' },
  { question: '¿Hay baños y estacionamiento?', answer: 'Hay estacionamiento y servicios en el área de Papago Park, pero no conviene asumir que un baño estará junto al punto exacto donde empiezan a caminar. Ubiquen los servicios al llegar.' },
  { question: '¿Se puede visitar Phoenix Zoo el mismo día?', answer: 'Sí, pero es mejor que Hole-in-the-Rock o Phoenix Zoo sea la actividad principal. Dejen la segunda parada como opcional según el clima y la energía familiar.' },
];

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

const versions = [
  { icon: Users, title: 'Visita muy corta', best: 'Niños pequeños o primera salida', text: 'Fotos, un paseo breve y regreso antes de que el calor o la roca irregular compliquen el momento.', to: '/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=half-day&shade=false&bathrooms=true&language=es' },
  { icon: Compass, title: 'Hole-in-the-Rock', best: 'Familias cómodas en terreno irregular', text: 'Caminen juntos hasta la abertura solo si el clima, la pisada y la supervisión funcionan para todo el grupo.', to: '/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=hike&length=half-day&shade=false&bathrooms=true&language=es' },
  { icon: MapPin, title: 'Papago + otra parada', best: 'Mañana fresca y energía suficiente', text: 'Refresquen a la familia en el vehículo y después decidan entre Phoenix Zoo, comida, jardín o un plan bajo techo.', to: '/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=full-day&shade=false&bathrooms=true&language=es' },
];

const checks = [
  'Revisar el pronóstico por hora y los avisos del parque.',
  'Llegar temprano y guardar la ubicación del vehículo.',
  'Llevar agua, protección solar y un snack familiar.',
  'Ubicar baños antes de empezar a caminar.',
  'Mantener a un adulto junto a cada niño en la roca.',
  'Definir una hora o señal clara para regresar.',
];

export default function SpanishPapagoParkWithKids() {
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
      <SEOJsonLd title="Papago Park con niños | Plan familiar en Phoenix | Sage" description="Planea Papago Park con niños en español: Hole-in-the-Rock, calor, estacionamiento, baños, Phoenix Zoo, supervisión y un itinerario familiar sencillo." url={spanishUrl} faqs={faqs} breadcrumbs={[{ name: 'Sage', url: 'https://sage.healthandtravels.com/' }, { name: 'Arizona en español', url: 'https://sage.healthandtravels.com/es/arizona' }, { name: 'Papago Park con niños', url: spanishUrl }]} />

      <section className="relative overflow-hidden bg-orange-950 px-6 py-16 text-white md:py-24">
        <img src="/images/papago-hole-in-the-rock-family-trail.avif" alt="Familias visitando Hole-in-the-Rock en Papago Park" className="absolute inset-0 h-full w-full object-cover opacity-45" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950 via-orange-950/90 to-orange-950/35" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex gap-3 text-[11px] font-black uppercase tracking-[0.22em]"><Link to="/trail-guides/papago-park" className="rounded-full border border-white/30 px-4 py-2 text-white/80 hover:bg-white hover:text-orange-950">English</Link><span className="rounded-full bg-amber-200 px-4 py-2 text-orange-950">Español</span></div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-amber-200">Plan familiar en Phoenix</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Papago Park con niños</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-orange-50 md:text-xl">Elige una visita corta, Hole-in-the-Rock o una mañana con una segunda parada opcional. Sage ajusta el plan según edades, calor, baños y energía real.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=half-day&shade=false&bathrooms=true&language=es" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-orange-950 hover:bg-amber-100"><Compass className="h-4 w-4" /> Crear mi plan</Link><a href="https://healthandtravels.com/es/papago-park-con-ninos?utm_source=sage&utm_medium=cta&utm_campaign=papago_es" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide text-white hover:bg-white/10"><MapPin className="h-4 w-4" /> Leer la guía completa</a></div>
        </div>
      </section>

      <section className="border-b border-amber-100 bg-amber-50 px-6 py-10"><div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">{[
        [Clock3, 'Duración', '60–90 minutos para una visita sencilla'],
        [Sun, 'Sombra', 'Muy limitada en la ruta y la roca'],
        [Car, 'Llegada', 'Temprano para menos calor y presión'],
        [Droplets, 'Agua', 'Llevarla desde el vehículo'],
      ].map(([Icon, label, value]) => { const StatIcon = Icon as typeof Clock3; return <article key={label as string} className="rounded-xl border border-amber-100 bg-white p-4"><StatIcon className="mb-3 h-5 w-5 text-orange-700" /><p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{label as string}</p><p className="mt-2 text-sm font-black leading-6">{value as string}</p></article>; })}</div></section>

      <section className="px-6 py-14"><div className="mx-auto max-w-6xl"><p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">Escoge tu versión</p><h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Una salida que encaje con tu familia</h2><div className="mt-8 grid gap-4 lg:grid-cols-3">{versions.map((version) => { const Icon = version.icon; return <Link key={version.title} to={version.to} className="flex h-full flex-col rounded-xl border border-zinc-100 p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"><Icon className="mb-4 h-6 w-6 text-orange-700" /><h3 className="text-xl font-black">{version.title}</h3><p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs font-black uppercase tracking-wide text-orange-800">{version.best}</p><p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{version.text}</p></Link>; })}</div></div></section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">Antes de caminar</p><h2 className="text-3xl font-black uppercase tracking-tight">Chequeo familiar</h2><ul className="mt-6 space-y-3">{checks.map((item) => <li key={item} className="flex gap-3 rounded-lg border border-zinc-100 bg-white p-4 text-sm leading-6 text-zinc-700"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />{item}</li>)}</ul></div><div className="rounded-xl bg-orange-950 p-7 text-white"><Sun className="h-8 w-8 text-amber-200" /><h2 className="mt-5 text-2xl font-black">El calor manda</h2><p className="mt-4 leading-7 text-orange-50">La poca distancia no elimina el riesgo. La roca y el estacionamiento reflejan calor, hay poca sombra y una visita corta puede dejar de ser apropiada rápidamente.</p><p className="mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-orange-50"><strong>Regla Sage:</strong> si alguien siente mareo, náusea, dolor de cabeza, debilidad inusual, confusión o mala coordinación, terminen la salida y busquen ayuda apropiada.</p></div></div></section>

      <section className="px-6 py-14"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black uppercase tracking-tight">Preguntas frecuentes</h2><div className="mt-7 space-y-4">{faqs.map((faq) => <article key={faq.question} className="rounded-xl border border-zinc-100 p-5"><h3 className="font-black">{faq.question}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p></article>)}</div></div></section>

      <section className="bg-orange-950 px-6 py-14 text-white"><div className="mx-auto max-w-4xl text-center"><h2 className="text-3xl font-black uppercase tracking-tight">Convierte la idea en un plan</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-orange-50">Empieza con Papago Park y ajusta duración, edades, baños, calor y ritmo familiar en el Trip Builder.</p><Link to="/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=half-day&shade=false&bathrooms=true&language=es" className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-200 px-7 py-3 text-sm font-black uppercase tracking-wide text-orange-950"><Compass className="h-4 w-4" /> Abrir Trip Builder</Link></div></section>
    </main>
  );
}
