import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Compass,
  Droplets,
  Map,
  Mountain,
  ShieldCheck,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/caminatas-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/arizona/hikes-with-kids';

const spanishFaqs = [
  {
    question: 'Cuales son buenas caminatas en Arizona con ninos?',
    answer:
      'Buenas caminatas con ninos son cortas, faciles de abandonar, adecuadas para la temporada y cercanas a banos, comida, sombra o agua. Cave Creek, Prescott, Payson, Sedona, Tucson, Flagstaff y algunos senderos de Phoenix pueden funcionar si el clima ayuda.',
  },
  {
    question: 'Cuanto debe durar una caminata familiar en Arizona?',
    answer:
      'Para muchas familias, lo mejor es empezar con caminatas de menos de 2 millas, especialmente con ninos pequenos, visitantes o calor. Ninos mayores pueden hacer rutas mas largas si hay agua, sombra, buen calzado y una regla clara para regresar.',
  },
  {
    question: 'A que hora es mejor caminar con ninos en Arizona?',
    answer:
      'La manana suele ser la mejor opcion. En verano, las familias deben elegir elevacion, sombra, agua, salidas muy temprano y un plan B que no dependa de senderos expuestos.',
  },
  {
    question: 'Que llevar para caminar con ninos en Arizona?',
    answer:
      'Lleven agua extra, snacks salados, protector solar, sombreros, mapas sin internet, telefono cargado, un botiquin pequeno, capas para zonas altas y una regla sencilla para regresar antes de que alguien se canse demasiado.',
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

const ageBands = [
  {
    label: 'Ninos pequenos',
    icon: Baby,
    bestFor: 'Caminatas cortas, banos cercanos, sombra y salida facil',
    plan:
      'El objetivo no es conquistar una montana. Es crear una pequena aventura que todos puedan terminar todavia felices.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&language=es',
  },
  {
    label: 'Ninos de primaria',
    icon: Trees,
    bestFor: 'Arroyos, rocas, miradores, pinos y una recompensa clara',
    plan:
      'Dales una mision: llegar al mirador, encontrar el arroyo, ver el puente o ganar el snack. La caminata funciona mejor cuando tiene una razon.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&language=es',
  },
  {
    label: 'Preadolescentes y adolescentes',
    icon: Mountain,
    bestFor: 'Vistas mas grandes, reto moderado, fotos y comida despues',
    plan:
      'Dejalos ayudar a escoger la ruta y la parada de comida. El plan debe sentirse real, pero no tan duro que arruine el dia.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=challenge&length=full-day&season=fall&ages=teens&shade=true&bathrooms=false&language=es',
  },
];

const seasonalPicks = [
  {
    season: 'Primavera',
    icon: Sun,
    destinations: 'Sedona, Tucson, Cave Creek, Prescott',
    why:
      'La primavera suele tener mejores temperaturas, flores y mas margen para caminar sin tanta estrategia de calor.',
  },
  {
    season: 'Verano',
    icon: Trees,
    destinations: 'Flagstaff, Payson, Show Low, Pinetop-Lakeside, Prescott',
    why:
      'Busquen elevacion, pinos, lagos, sombra y salidas temprano. El desierto expuesto al mediodia no es buena idea.',
  },
  {
    season: 'Otono',
    icon: Map,
    destinations: 'Prescott, Sedona, Payson, Tucson, Cottonwood',
    why:
      'El otono funciona bien para caminatas familiares, pueblos faciles y fines de semana con ritmo mas tranquilo.',
  },
  {
    season: 'Invierno',
    icon: ShieldCheck,
    destinations: 'Phoenix, Cave Creek, Tucson, Yuma, Sedona baja',
    why:
      'El desierto bajo se vuelve mas comodo. Las zonas altas necesitan revisar nieve, hielo, viento y caminos.',
  },
];

const starterPlans = [
  {
    title: 'Manana facil en el desierto',
    bestFor: 'Ninos pequenos, visitantes o poco tiempo',
    route: 'Phoenix, Scottsdale o Cave Creek',
    steps: ['Salir temprano', 'Hacer una ruta corta', 'Terminar con desayuno, parque o comida cerca'],
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&language=es',
  },
  {
    title: 'Dia fresco entre pinos',
    bestFor: 'Verano, familias activas y ninos que necesitan moverse',
    route: 'Payson, Prescott o Flagstaff',
    steps: ['Subir de elevacion', 'Elegir una caminata, lago o mirador', 'Usar comida como descanso antes de volver'],
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&language=es',
  },
  {
    title: 'Caminata de rocas rojas',
    bestFor: 'Fotos, ninos mayores y una recompensa visual',
    route: 'Sedona o Cottonwood',
    steps: ['Escoger una sola ruta principal', 'Evitar el calor fuerte', 'Terminar con comida antes del regreso'],
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&ages=older-kids&shade=true&bathrooms=false&language=es',
  },
];

const safetyRules = [
  'Salgan mas temprano de lo que creen necesario.',
  'Elijan un punto para regresar antes de empezar.',
  'Lleven mas agua de la que parece suficiente.',
  'Busquen sombra, banos y comida cercana con ninos pequenos.',
  'Descarguen mapas porque la senal puede desaparecer.',
  'Eviten senderos expuestos cuando el calor este fuerte.',
];

const quickPlanText = [
  'Idea de caminata en Arizona con ninos:',
  '',
  'Empezamos con la persona mas pequena o menos flexible del grupo.',
  'Elegimos una ruta corta, una parada de comida y un plan B.',
  '',
  'Mejores temporadas:',
  '- Primavera: Sedona, Tucson, Cave Creek, Prescott',
  '- Verano: Flagstaff, Payson, Show Low, Pinetop-Lakeside',
  '- Otono: Prescott, Sedona, Payson, Cottonwood',
  '- Invierno: Phoenix, Cave Creek, Tucson, Yuma',
  '',
  'Guia: https://sage.healthandtravels.com/es/arizona/caminatas-con-ninos',
].join('\n');

const voteText = [
  'Que caminata familiar en Arizona hacemos?',
  '',
  '1. Manana facil en Phoenix, Scottsdale o Cave Creek',
  '2. Dia fresco entre pinos en Payson, Prescott o Flagstaff',
  '3. Caminata de rocas rojas en Sedona o Cottonwood',
  '',
  'Respondan con un numero y armamos el plan.',
  'Guia: https://sage.healthandtravels.com/es/arizona/caminatas-con-ninos',
].join('\n');

export default function SpanishArizonaHikesWithKids() {
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
        title="Caminatas en Arizona con ninos | Guia familiar | Sage"
        description="Guia en espanol para escoger caminatas en Arizona con ninos por edad, temporada, calor, sombra, banos, agua, distancia y plan familiar realista."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en espanol', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Caminatas con ninos', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/payson-family-rim-view.avif"
            alt="Familia caminando en un sendero con sombra cerca de Flagstaff"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/hikes-with-kids"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              English
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Espanol
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Guia familiar de senderos
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Caminatas en Arizona con ninos
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            La mejor caminata no siempre es la famosa. Es la que tu familia
            puede disfrutar con buen horario, sombra, agua, banos, snacks y una
            salida facil si el dia cambia.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=hike&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Crear plan de caminata
            </Link>
            <Link
              to="/es/arizona/viajes-frescos-verano-con-ninos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Droplets className="h-4 w-4" aria-hidden="true" />
              Ver opciones frescas
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: 'Primera pregunta', value: 'Edad y energia' },
            { icon: Sun, label: 'Clima', value: 'Calor decide horario' },
            { icon: Droplets, label: 'Basico', value: 'Agua y snacks' },
            { icon: CalendarDays, label: 'Ritmo', value: 'Una ruta principal' },
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
            Escoger por edad
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            La caminata debe encajar con el nino real
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Si la ruta funciona para la persona mas pequena o cansada del grupo,
            normalmente funciona mejor para todos.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {ageBands.map((band) => {
            const Icon = band.icon;
            return (
              <Link
                key={band.label}
                to={band.to}
                className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-tight text-zinc-950">{band.label}</h3>
                <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm font-black leading-6 text-emerald-800">
                  {band.bestFor}
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{band.plan}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Escoger por temporada
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Arizona cambia mucho segun el mes
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {seasonalPicks.map((pick) => {
              const Icon = pick.icon;
              return (
                <article key={pick.season} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                        {pick.season}
                      </p>
                      <h3 className="text-xl font-black tracking-tight text-zinc-950">
                        {pick.destinations}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-zinc-600">{pick.why}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Planes sencillos
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Tres formas faciles de empezar
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {starterPlans.map((plan) => (
            <article key={plan.title} className="flex flex-col rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                {plan.route}
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">{plan.title}</h3>
              <p className="mt-3 rounded-lg bg-zinc-50 p-3 text-sm font-black leading-6 text-zinc-700">
                {plan.bestFor}
              </p>
              <ol className="mt-5 flex-1 space-y-3">
                {plan.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-7 text-zinc-700">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-[11px] font-black text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <Link
                to={plan.to}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-emerald-800"
              >
                Crear este plan
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-emerald-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-200">
              Seguridad
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Antes de salir al sendero
            </h2>
            <p className="mt-4 text-sm leading-7 text-emerald-50">
              Una caminata familiar necesita mas que una foto bonita. Necesita
              horario, agua, sombra, distancia realista y permiso para regresar.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-5">
            <ShieldCheck className="mb-4 h-6 w-6 text-emerald-200" aria-hidden="true" />
            <ul className="space-y-3">
              {safetyRules.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-7 text-emerald-50">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-200" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Compartir una idea de caminata"
        description="Copia un plan simple o manda una votacion para que la familia o el grupo elija una caminata realista."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="spanish_arizona_hikes_with_kids"
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Seguir planeando
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Guias relacionadas
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['Arizona en espanol', '/es/arizona'],
              ['Planificar por situacion', '/es/arizona/planificar-por-situacion'],
              ['Viajes frescos de verano', '/es/arizona/viajes-frescos-verano-con-ninos'],
              ['Seguridad en el desierto', '/arizona/desert-hiking-safety'],
              ['Payson y Rim Country', '/arizona/payson-rim-country-with-kids'],
              ['Version en ingles', '/arizona/hikes-with-kids'],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black uppercase tracking-wide text-zinc-800 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            FAQ
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Preguntas sobre caminatas con ninos en Arizona
          </h2>
          <div className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-100">
            {spanishFaqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="cursor-pointer text-base font-black text-zinc-950">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
