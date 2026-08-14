import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  CloudRain,
  Compass,
  ExternalLink,
  MapPin,
  MoonStar,
  Mountain,
  ShieldCheck,
  Snowflake,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/flagstaff-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/arizona/flagstaff';

const spanishFaqs = [
  {
    question: '¿Flagstaff es un buen destino para viajar con niños?',
    answer:
      'Sí. Flagstaff combina bosque de pinos, clima más fresco que Phoenix, parques, caminatas, astronomía y opciones bajo techo. Una familia suele disfrutar más el viaje al escoger una aventura principal y dejar tiempo para comida y descanso.',
  },
  {
    question: '¿Cuál es la mejor época para visitar Flagstaff con niños?',
    answer:
      'El verano funciona bien para escapar del calor del desierto; el otoño trae clima fresco; y el invierno puede incluir nieve, hielo y cierres. En temporada de monzón revisen tormentas y rayos, y en invierno revisen carreteras antes de salir.',
  },
  {
    question: '¿Qué se puede hacer en Flagstaff con niños?',
    answer:
      'Las opciones familiares incluyen Buffalo Park, paseos cortos en el bosque, el centro histórico, Lowell Observatory y actividades interiores. Confirmen horarios, entradas, clima y condiciones del bosque antes del viaje.',
  },
  {
    question: '¿Se puede visitar Flagstaff en un solo día desde Phoenix?',
    answer:
      'Sí, pero es un día largo. Para una excursión, escojan una sola actividad principal y salgan temprano. Dormir una noche permite visitar el bosque durante el día y Lowell Observatory por la tarde o noche sin manejar cansados.',
  },
  {
    question: '¿Qué riesgos deben considerar las familias en Flagstaff?',
    answer:
      'La altura, el sol, la deshidratación, los rayos del monzón, el humo, las restricciones de fuego, la nieve y el hielo pueden cambiar el plan. Revisen el pronóstico, las alertas del bosque y las carreteras antes de salir.',
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
  { icon: MapPin, label: 'Desde Phoenix', value: 'Aprox. 2–2.5 horas sin paradas' },
  { icon: Mountain, label: 'Altura', value: 'Cerca de 7,000 pies; tomen el día con calma' },
  { icon: Users, label: 'Ideal para', value: 'Familias, visitantes y fines de semana' },
  { icon: CloudRain, label: 'Revisar', value: 'Monzón, nieve, humo y caminos forestales' },
];

const familyPlans = [
  {
    title: 'Día sencillo desde Phoenix',
    bestFor: 'Primera visita o poco tiempo',
    plan:
      'Salgan temprano, caminen a su ritmo en Buffalo Park, coman cerca del centro y regresen antes de que el cansancio convierta el manejo en la parte difícil.',
  },
  {
    title: 'Bosque y estrellas',
    bestFor: 'Familias que pueden dormir una noche',
    plan:
      'Hagan una actividad corta en el bosque, descansen y visiten Lowell Observatory por la tarde o noche. Revisen horario, entradas y clima antes de salir.',
  },
  {
    title: 'Fin de semana flexible',
    bestFor: 'Niños pequeños o clima cambiante',
    plan:
      'Día uno: parque, bosque y comida. Día dos: observatorio, museo o centro histórico. Mantengan una opción interior para lluvia, rayos, humo o nieve.',
  },
];

const outingIdeas = [
  {
    title: 'Buffalo Park',
    icon: Trees,
    label: 'Fácil de ajustar',
    text:
      'Un espacio abierto con vistas a los San Francisco Peaks. Caminen solo la distancia que funcione para el grupo y recuerden que hay poca sombra en partes del recorrido.',
  },
  {
    title: 'Lowell Observatory',
    icon: MoonStar,
    label: 'Ciencia y estrellas',
    text:
      'Una opción familiar fuerte para combinar exhibiciones y astronomía. La observación depende del clima; revisen el calendario y compren entradas con anticipación cuando sea necesario.',
  },
  {
    title: 'Bosque Nacional Coconino',
    icon: Mountain,
    label: 'Aventura al aire libre',
    text:
      'Hay senderos, áreas de picnic y caminos forestales, pero el acceso cambia por nieve, lodo, incendios y cierres. Confirmen el lugar exacto antes de manejar.',
  },
  {
    title: 'Centro histórico',
    icon: Compass,
    label: 'Plan tranquilo',
    text:
      'Funciona bien para comer, caminar un poco y bajar el ritmo. Úsenlo como plan principal con niños cansados o como plan B cuando el clima cierre la montaña.',
  },
];

const safetyChecks = [
  'Revisen el pronóstico de NWS Flagstaff antes de salir de Phoenix.',
  'Tomen agua aunque el aire se sienta fresco; la altura y el sol pueden cansar más rápido.',
  'Durante el monzón, salgan del terreno alto y expuesto si escuchan truenos.',
  'En invierno, revisen carreteras, nieve, hielo y equipo necesario antes de manejar.',
  'Consulten alertas, humo, cierres y restricciones de fuego del Bosque Nacional Coconino.',
  'No llenen el día: una aventura, una buena comida y un plan B suelen ser suficientes.',
];

const quickPlanText = [
  'Plan familiar sencillo para Flagstaff:',
  '',
  '1. Revisar clima, carreteras y alertas del bosque',
  '2. Salir temprano para una sola aventura principal',
  '3. Llevar agua, capas de ropa, snacks y protección solar',
  '4. Comer y descansar antes de la actividad de la tarde',
  '5. Mantener un plan B bajo techo',
  '',
  'Regla Sage: bosque, comida, descanso y estrellas.',
  `Guía: ${spanishUrl}`,
].join('\n');

const voteText = [
  '¿Qué hacemos en Flagstaff?',
  '',
  '1. Buffalo Park y comida en el centro',
  '2. Bosque y picnic',
  '3. Lowell Observatory y estrellas',
  '4. Fin de semana con un plan flexible',
  '',
  'Respondan con un número y armamos el viaje.',
  `Guía: ${spanishUrl}`,
].join('\n');

export default function SpanishFlagstaffWithKids() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;

    document.documentElement.lang = 'es';
    setAlternateLink('es', spanishUrl);
    setAlternateLink('en', englishUrl);
    setAlternateLink('x-default', englishUrl);

    return () => {
      document.documentElement.lang = previousLang || 'en';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Flagstaff con niños | Guía familiar de bosque y estrellas | Sage"
        description="Guía en español para visitar Flagstaff con niños: bosque, Buffalo Park, Lowell Observatory, clima, monzón, nieve, seguridad y planes familiares realistas."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en español', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Flagstaff con niños', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-45">
          <img
            src="/images/flagstaff-ponderosa-pines-family.avif"
            alt="Familia explorando un bosque de pinos ponderosa cerca de Flagstaff, Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/30" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/flagstaff"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950"
            >
              English
            </Link>
            <span className="rounded-full bg-teal-100 px-4 py-2 text-teal-950">Español</span>
          </div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-teal-200">
            Bosque, clima fresco y cielo oscuro
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Flagstaff con niños
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
            Un plan familiar realista para disfrutar pinos, senderos y estrellas sin olvidar
            la altura, el clima cambiante ni el viaje de regreso.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=flagstaff&kids=yes&group=family&activity=explore&length=weekend&shade=true&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-800"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Crear mi plan
            </Link>
            <a
              href="https://www.flagstaffarizona.org/things-to-do/family-fun/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Guía oficial de Flagstaff
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-teal-100 bg-teal-50/60 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-xl border border-teal-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">Elige el ritmo</p>
        <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Tres planes que sí caben en el día</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {familyPlans.map((item) => (
            <article key={item.title} className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
              <CalendarDays className="mb-4 h-6 w-6 text-teal-700" aria-hidden="true" />
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-2 text-xs font-black uppercase tracking-wide text-teal-700">{item.bestFor}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{item.plan}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">Ideas familiares</p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Aventura primero, luego comida y descanso</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {outingIdeas.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-zinc-200 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-teal-700" aria-hidden="true" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-700">{item.label}</p>
                  <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheck className="mb-4 h-7 w-7 text-teal-200" aria-hidden="true" />
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">El clima decide el plan</h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Flagstaff es más fresco que Phoenix, pero no es un viaje sin riesgos. La altura,
              los rayos, el humo, la nieve y los cierres pueden cambiar el día.
            </p>
          </div>
          <ul className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-100">
            {safetyChecks.map((check) => (
              <li key={check} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-200" />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Revisen antes de manejar</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['Clima y monzón', 'https://www.weather.gov/fgz/', CloudRain],
            ['Bosque y cierres', 'https://www.fs.usda.gov/r03/coconino/conditions', Trees],
            ['Lowell Observatory', 'https://lowell.edu/visit/', MoonStar],
          ].map(([label, href, Icon]) => (
            <a
              key={String(label)}
              href={String(href)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-zinc-200 p-5 font-black transition hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="flex items-center gap-3">
                {React.createElement(Icon as React.ElementType, { className: 'h-5 w-5 text-teal-700', 'aria-hidden': true })}
                {String(label)}
              </span>
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <SharePlanPanel
        title="Compartir un plan para Flagstaff"
        description="Copia el plan sencillo o manda una votación para que la familia elija la aventura."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="spanish_flagstaff_with_kids"
        locale="es"
      />

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">FAQ</p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Preguntas sobre Flagstaff con niños</h2>
          <div className="mt-6 divide-y divide-zinc-100 rounded-xl border border-zinc-100">
            {spanishFaqs.map((faq) => (
              <article key={faq.question} className="p-5">
                <h3 className="text-lg font-black">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 bg-teal-50 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-700">Sigue explorando</p>
            <h2 className="mt-2 text-2xl font-black">Más guías de Arizona en español</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/es/arizona" className="inline-flex items-center gap-2 rounded-full bg-teal-800 px-5 py-3 text-sm font-black text-white">
              Arizona en español <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/es/arizona/sedona-con-ninos" className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-white px-5 py-3 text-sm font-black text-teal-900">
              Sedona con niños
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
