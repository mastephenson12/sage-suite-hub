import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Car,
  Clock,
  Compass,
  Droplets,
  MapPin,
  Mountain,
  ShieldCheck,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/viajes-de-un-dia-desde-phoenix';
const englishUrl = 'https://sage.healthandtravels.com/arizona/day-trips-from-phoenix';

const spanishFaqs = [
  {
    question: '¿Cuáles son buenos viajes de un día desde Phoenix con niños?',
    answer:
      'Buenos viajes de un día desde Phoenix con niños incluyen Cave Creek, Prescott, Payson, Cottonwood, Sedona, Tucson y Flagstaff cuando el tiempo de manejo, el clima, los baños, la comida y la energía del grupo encajan.',
  },
  {
    question: '¿Dónde escapar del calor de Phoenix por un día?',
    answer:
      'Para escapar del calor de Phoenix, busquen más elevación, pinos, lagos, sombra o agua. Payson, Prescott, Flagstaff, Show Low y Pinetop-Lakeside suelen funcionar mejor que senderos expuestos del desierto en verano.',
  },
  {
    question: '¿Cuánto manejar para un viaje familiar de un día?',
    answer:
      'La mayoría de las familias disfruta más si el manejo queda por debajo de dos horas por tramo. Sedona, Flagstaff y Tucson pueden funcionar, pero conviene mantener el día simple y escoger una sola aventura principal.',
  },
  {
    question: '¿Cómo planear un viaje de un día sin estresar al grupo?',
    answer:
      'Elijan un destino principal, una comida fácil, baños cercanos, suficiente agua y una opción de respaldo. Menos paradas suele crear una mejor experiencia para familias y grupos de amigos.',
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

const driveBands = [
  {
    label: 'Menos de 1 hora',
    icon: Clock,
    title: 'Salida corta sin convertirlo en maraton',
    bestFor: 'Ninos pequenos, visitantes, manana libre',
    destinations: ['Cave Creek', 'Papago Park', 'Desert Botanical Garden', 'Scottsdale'],
    note:
      'Perfecto cuando quieres vistas, desayuno o almuerzo cerca y volver antes de que el calor o las siestas manden.',
  },
  {
    label: '1 a 2 horas',
    icon: Trees,
    title: 'El punto dulce para muchas familias',
    bestFor: 'Pinos, lagos, pueblos faciles y comida',
    destinations: ['Payson', 'Prescott', 'Cottonwood', 'Tonto Natural Bridge'],
    note:
      'Esta distancia suele dar una aventura real sin que el manejo se coma todo el dia.',
  },
  {
    label: '2 a 3 horas',
    icon: Mountain,
    title: 'Paisaje grande con agenda sencilla',
    bestFor: 'Visitantes, fotos, adolescentes, grupos con energia',
    destinations: ['Sedona', 'Flagstaff', 'Tucson'],
    note:
      'Vale la pena si eliges una sola atraccion principal y una comida o descanso claro antes del regreso.',
  },
  {
    label: 'Mejor como noche',
    icon: Car,
    title: 'Cuando el destino merece mas aire',
    bestFor: 'Grand Canyon, Page, Show Low, Pinetop-Lakeside',
    destinations: ['Grand Canyon', 'Page', 'Show Low', 'Pinetop-Lakeside'],
    note:
      'Se puede hacer largo, pero casi siempre mejora si duermen una noche y no manejan cansados de regreso.',
  },
];

const seasonalRules = [
  {
    season: 'Invierno',
    icon: Sun,
    text:
      'Phoenix, Cave Creek, Scottsdale, Tucson y senderos bajos son mas comodos. Revisen nieve si suben a Flagstaff o Grand Canyon.',
  },
  {
    season: 'Primavera',
    icon: MapPin,
    text:
      'Sedona, Tucson, Prescott, Cave Creek y Cottonwood son fuertes. Salgan temprano porque los fines de semana se llenan rapido.',
  },
  {
    season: 'Verano',
    icon: Droplets,
    text:
      'Vayan a Payson, Flagstaff, Prescott, Show Low o Pinetop. Eviten caminatas expuestas al mediodia en Phoenix y Sedona.',
  },
  {
    season: 'Otono',
    icon: Trees,
    text:
      'Prescott, Sedona, Payson, Cottonwood y Tucson suelen funcionar bien con grupos, comida y caminatas ligeras.',
  },
];

const starterPlans = [
  {
    title: 'Manana corta con visitantes',
    route: 'Papago Park, Scottsdale o Cave Creek',
    bestFor: 'Poco tiempo, ninos pequenos, primera visita',
    steps: ['Salir temprano', 'Hacer una caminata corta o vista facil', 'Terminar con desayuno o almuerzo'],
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=visitors&activity=relax&length=half-day&season=winter&shade=true&bathrooms=true&language=es',
  },
  {
    title: 'Dia fresco en Payson',
    route: 'Payson, Mogollon Rim o Woods Canyon Lake',
    bestFor: 'Verano, calor de Phoenix, ninos que necesitan moverse',
    steps: ['Subir de elevacion', 'Elegir lago, bosque o mirador', 'Usar comida como descanso antes de regresar'],
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&shade=true&bathrooms=true&language=es',
  },
  {
    title: 'Sedona sin sobrecargar el dia',
    route: 'Una vista, una caminata corta y comida',
    bestFor: 'Fotos, familiares de visita, ninos mayores',
    steps: ['Llegar temprano', 'Escoger una sola ruta principal', 'Guardar energia para comida y regreso'],
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=es',
  },
];

const safetyChecks = [
  'Confirma el clima antes de salir, especialmente calor, viento, monzon o nieve.',
  'Pon la actividad exterior temprano y deja la tarde flexible.',
  'Busca banos, comida y agua antes de prometer el plan al grupo.',
  'No llenes el dia con cinco paradas. Una buena aventura y una buena comida suelen ganar.',
  'Ten un plan B bajo techo, con sombra o mas corto.',
];

const quickPlanText = [
  'Viaje de un dia desde Phoenix:',
  '',
  'Elegimos por tiempo de manejo:',
  '- Menos de 1 hora: Cave Creek, Papago Park, Scottsdale',
  '- 1 a 2 horas: Payson, Prescott, Cottonwood',
  '- 2 a 3 horas: Sedona, Flagstaff, Tucson',
  '',
  'Regla Sage: una aventura principal, una comida facil y un plan B.',
  'Guia: https://sage.healthandtravels.com/es/arizona/viajes-de-un-dia-desde-phoenix',
].join('\n');

const voteText = [
  'Que viaje de un dia hacemos desde Phoenix?',
  '',
  '1. Corto y facil: Cave Creek, Papago Park o Scottsdale',
  '2. Mas fresco: Payson, Prescott o Flagstaff',
  '3. Fotos grandes: Sedona o Tucson',
  '',
  'Respondan con un numero y armamos el plan.',
  'Guia: https://sage.healthandtravels.com/es/arizona/viajes-de-un-dia-desde-phoenix',
].join('\n');

export default function SpanishDayTripsFromPhoenix() {
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
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Viajes de un día desde Phoenix con niños | Sage"
        description="Guía en español para escoger viajes familiares de un día desde Phoenix por tiempo de manejo, edades, energía, calor, comida, baños, sombra y plan B."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en español', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Viajes de un día desde Phoenix', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Bosque y montanas cerca de Payson para un viaje familiar desde Phoenix"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/day-trips-from-phoenix"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              English
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Espanol
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Guia desde Phoenix
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Viajes de un dia desde Phoenix con ninos
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            El mejor viaje de un dia no es el mas famoso. Es el que encaja con
            el calor, el manejo, la edad de los ninos, la comida y el nivel real
            de energia del grupo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Crear plan
            </Link>
            <Link
              to="/es/arizona/viajes-frescos-verano-con-ninos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Droplets className="h-4 w-4" aria-hidden="true" />
              Escapar del calor
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Car, label: 'Salida', value: 'Desde Phoenix' },
            { icon: Users, label: 'Para', value: 'Familias y amigos' },
            { icon: Sun, label: 'Clave', value: 'Calor y horario' },
            { icon: ShieldCheck, label: 'Regla', value: 'Un plan B' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-lg border border-emerald-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Escoge por manejo
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            El filtro mas importante desde Phoenix
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {driveBands.map((band) => {
            const Icon = band.icon;
            return (
              <article key={band.label} className="rounded-lg border border-zinc-100 bg-white p-6 shadow-sm">
                <Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">
                  {band.label}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{band.title}</h3>
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-zinc-500">{band.bestFor}</p>
                <p className="mt-4 leading-7 text-zinc-600">{band.note}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {band.destinations.map((destination) => (
                    <span key={destination} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-700">
                      {destination}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Filtro familiar
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Ajusta el plan a las edades y la energía
            </h2>
            <p className="mt-4 leading-7 text-zinc-600">
              Antes de elegir un destino, decide cuánto tiempo puede estar cada niño en el auto,
              cuándo necesita comer o dormir y cuánta energía quedará para el regreso.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Bebés y niños pequeños',
                plan: 'Menos de una hora, baños fáciles, sombra y regreso antes de la siesta.',
                backup: 'Museo, acuario, biblioteca o comida cerca de Phoenix.',
              },
              {
                title: 'Edad escolar',
                plan: 'Una aventura corta con agua, bocadillos y una pausa real a mitad del día.',
                backup: 'Mirador, picnic o centro de visitantes en lugar de otra caminata.',
              },
              {
                title: 'Adolescentes',
                plan: 'Pueden tolerar más manejo, pero deben participar en la elección y guardar energía para volver.',
                backup: 'Una sola parada fotográfica y una comida sentados.',
              },
            ].map((option) => (
              <article key={option.title} className="rounded-lg border border-emerald-100 bg-emerald-50 p-6">
                <h3 className="text-xl font-black">{option.title}</h3>
                <p className="mt-3 leading-7 text-zinc-700">{option.plan}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-600"><strong>Plan B:</strong> {option.backup}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Temporada
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Que cambia segun el mes
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {seasonalRules.map((rule) => {
              const Icon = rule.icon;
              return (
                <article key={rule.season} className="rounded-lg border border-zinc-100 bg-white p-5">
                  <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black">{rule.season}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{rule.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Planes listos
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Tres formas faciles de empezar
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {starterPlans.map((plan) => (
            <Link
              key={plan.title}
              to={plan.to}
              className="group rounded-lg border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">
                {plan.route}
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">{plan.title}</h3>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide text-zinc-500">{plan.bestFor}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-600">
                {plan.steps.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-emerald-800">
                Crear este plan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-emerald-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
              Antes de salir
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Cinco detalles que salvan el dia
            </h2>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {safetyChecks.map((check) => (
              <div key={check} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-6 text-emerald-50">
                {check}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">Antes de decidir</p>
            <h2 className="mt-2 text-2xl font-black">Descubre las opciones y luego vuelve a planear</h2>
            <p className="mt-2 max-w-2xl leading-7 text-zinc-600">Health &amp; Travels reúne las aventuras, la comida y cuándo vale la pena pasar la noche.</p>
          </div>
          <a
            href="https://healthandtravels.com/es/excursiones-familiares-desde-phoenix?utm_source=sage&utm_medium=referral&utm_campaign=phoenix_day_trips_es"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-emerald-800"
          >
            Ver la guía <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <SharePlanPanel
        title="Manda el plan al grupo"
        description="Copia una version corta para familia, amigos o visitantes antes de escoger el destino final."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="spanish_day_trips_from_phoenix"
        locale="es"
      />

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-3xl font-black uppercase tracking-tight">Preguntas frecuentes</h2>
        <div className="mt-7 space-y-4">
          {spanishFaqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-zinc-100 p-6">
              <h3 className="text-lg font-black">{faq.question}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
