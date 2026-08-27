import React from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, Campfire, CloudSun, Compass, Droplets, Fish, MapPin, ShieldCheck, Trees, Users } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import CloudinaryImage from '../components/CloudinaryImage';

const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/woods-canyon-lake-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/arizona/woods-canyon-lake-family-adventure';

const faqs = [
  { question: 'Woods Canyon Lake es bueno para ir con niños?', answer: 'Sí. Funciona bien para familias que quieren pinos, agua, picnic, pesca y caminatas cortas sin necesitar una ruta larga. El mejor plan depende de edades, clima y energía del grupo.' },
  { question: 'Conviene ir por un día o acampar?', answer: 'Las dos opciones funcionan. Un viaje de un día reduce logística. Acampar permite disfrutar la tarde y la mañana entre pinos. También pueden usar Payson como base si prefieren cama, restaurantes y más flexibilidad.' },
  { question: 'Hay baños y sombra?', answer: 'Las áreas recreativas desarrolladas normalmente tienen baños y sombra de pinos, pero los servicios pueden ser estacionales. Confirmen condiciones actuales antes de salir.' },
  { question: 'Qué clima esperar en verano?', answer: 'La elevación suele ser más fresca que Phoenix, pero las tardes pueden traer monzones, rayos, granizo, viento y cambios rápidos de temperatura.' },
];

function setAlternateLink(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

const modes = [
  { icon: Droplets, title: 'Viaje de un día', best: 'Niños pequeños o primera visita', text: 'Lleguen temprano, hagan lago + picnic + una caminata corta y regresen antes de que el cansancio o el clima compliquen la tarde.', to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=water&length=full-day&season=summer&shade=true&bathrooms=true&language=es' },
  { icon: Campfire, title: 'Fin de semana de camping', best: 'Familias que disfrutan campamento', text: 'Dejen tiempo para montar campamento, cocinar, descansar y disfrutar el bosque. Revisen restricciones de fuego y reglas del área antes de salir.', to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=camping&length=weekend&season=summer&shade=true&bathrooms=true&language=es' },
  { icon: BedDouble, title: 'Payson como base', best: 'Más comodidad y plan B fácil', text: 'Duerman en Payson y usen las mejores horas del día para el lago y Mogollon Rim. Es buena opción si no quieren cargar con toda la logística de camping.', to: '/es/arizona/payson-y-mogollon-rim-con-ninos' },
];

const checks = [
  'Revisar clima por hora y riesgo de monzón.',
  'Confirmar cierres, Forest Road 300 y restricciones de fuego.',
  'Llevar agua, capas, protector solar y snacks.',
  'Guardar la ruta sin conexión antes de entrar al bosque.',
  'Ubicar baños y decidir un punto de regreso para los niños.',
  'Mantener supervisión constante cerca del agua y miradores.',
];

export default function SpanishWoodsCanyonLakeFamilyAdventure() {
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
        title="Woods Canyon Lake con niños | Plan familiar en Arizona | Sage"
        description="Planea Woods Canyon Lake con niños en español: viaje de un día, camping, pesca, baños, sombra, clima, qué llevar y un itinerario familiar cerca de Payson."
        url={spanishUrl}
        faqs={faqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en español', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Woods Canyon Lake con niños', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-45">
          <CloudinaryImage src="/images/payson-lake-through-pines.avif" alt="Woods Canyon Lake entre pinos cerca de Payson, Arizona" className="h-full w-full object-cover" widthHint={1600} sizes="100vw" loading="eager" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/40" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link to="/arizona/woods-canyon-lake-family-adventure" className="rounded-full border border-white/30 px-4 py-2 text-white/80 hover:bg-white hover:text-emerald-950">English</Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">Español</span>
          </div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">Plan familiar en Rim Country</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Woods Canyon Lake con niños</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">Elige entre un viaje de un día, camping o usar Payson como base. Sage te ayuda a ajustar el plan según edades, clima, baños, sombra y energía familiar.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=water&length=full-day&season=summer&shade=true&bathrooms=true&language=es" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 hover:bg-emerald-100"><Compass className="h-4 w-4" /> Crear mi plan</Link>
            <a href="https://healthandtravels.com/es/woods-canyon-lake-con-ninos" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white hover:bg-white/10"><MapPin className="h-4 w-4" /> Leer guía completa</a>
          </div>
        </div>
      </section>

      <section className="px-6 py-14"><div className="mx-auto max-w-6xl"><div className="mb-8 max-w-3xl"><p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">Escoge tu versión</p><h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Día, camping o Payson como base</h2><p className="mt-3 text-base leading-7 text-zinc-600">No existe una versión universal. La mejor es la que deja energía suficiente para disfrutar el lago sin convertir la salida en una prueba de resistencia.</p></div><div className="grid gap-4 lg:grid-cols-3">{modes.map((mode) => { const Icon = mode.icon; return <Link key={mode.title} to={mode.to} className="flex h-full flex-col rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"><Icon className="mb-4 h-6 w-6 text-emerald-700" /><h3 className="text-xl font-black tracking-tight">{mode.title}</h3><p className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs font-black uppercase tracking-wide text-emerald-800">{mode.best}</p><p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{mode.text}</p></Link>; })}</div></div></section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">Antes de salir</p><h2 className="text-3xl font-black uppercase tracking-tight">Chequeo familiar</h2><ul className="mt-6 space-y-3">{checks.map((item) => <li key={item} className="flex gap-3 rounded-lg border border-zinc-100 bg-white p-4 text-sm leading-6 text-zinc-700"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />{item}</li>)}</ul></div><div className="rounded-xl bg-emerald-950 p-7 text-white"><CloudSun className="h-8 w-8 text-emerald-200" /><h2 className="mt-5 text-2xl font-black">El clima manda</h2><p className="mt-4 leading-7 text-emerald-50">La elevación ayuda con el calor, pero las tardes de verano pueden traer rayos, viento, granizo y lluvia. El mejor plan tiene una hora clara para reevaluar y un regreso fácil a Payson si cambia el clima.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-white/10 p-4"><Trees className="mb-2 h-5 w-5 text-emerald-200" /><strong>Más sombra</strong><p className="mt-2 text-sm text-emerald-50">Los pinos ayudan, pero no sustituyen agua ni protección solar.</p></div><div className="rounded-lg bg-white/10 p-4"><Fish className="mb-2 h-5 w-5 text-emerald-200" /><strong>Pesca</strong><p className="mt-2 text-sm text-emerald-50">Revisen licencias y reglas actuales antes del viaje.</p></div></div></div></div></section>

      <section className="px-6 py-14"><div className="mx-auto max-w-6xl"><div className="grid gap-6 md:grid-cols-3"><article className="rounded-lg border border-zinc-100 p-5"><Users className="mb-3 h-6 w-6 text-emerald-700" /><h3 className="font-black">Con niños pequeños</h3><p className="mt-3 text-sm leading-7 text-zinc-600">Mantengan la distancia corta, ubiquen baños al llegar y hagan del picnic parte del plan, no una emergencia de último minuto.</p></article><article className="rounded-lg border border-zinc-100 p-5"><Droplets className="mb-3 h-6 w-6 text-emerald-700" /><h3 className="font-black">Cerca del agua</h3><p className="mt-3 text-sm leading-7 text-zinc-600">Supervisión constante. No toda la orilla es plana o fácil de acceder, y el terreno puede cambiar rápidamente.</p></article><article className="rounded-lg border border-zinc-100 p-5"><Campfire className="mb-3 h-6 w-6 text-emerald-700" /><h3 className="font-black">Si acampan</h3><p className="mt-3 text-sm leading-7 text-zinc-600">Verifiquen restricciones de fuego, temperaturas nocturnas y reglas del área. Dejen tiempo para montar campamento antes de oscurecer.</p></article></div></div></section>

      <section className="bg-emerald-950 px-6 py-14 text-white"><div className="mx-auto max-w-4xl text-center"><h2 className="text-3xl font-black uppercase tracking-tight">Convierte la idea en un plan</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">Empieza con Woods Canyon Lake y ajusta duración, edades, baños, sombra y ritmo familiar en el Trip Builder.</p><Link to="/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=water&length=full-day&season=summer&shade=true&bathrooms=true&language=es" className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-200 px-7 py-3 text-sm font-black uppercase tracking-wide text-emerald-950"><Compass className="h-4 w-4" /> Abrir Trip Builder</Link></div></section>
    </main>
  );
}
