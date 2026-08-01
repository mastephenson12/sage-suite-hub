import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Car,
  Clock,
  CloudSun,
  Compass,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/primer-viaje-a-arizona-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/arizona/first-trip';

const spanishFaqs = [
  {
    question: '¿Cuál es el mejor primer viaje a Arizona con niños?',
    answer:
      'Para muchas familias, el mejor primer viaje a Arizona combina una base fácil, una aventura principal por día, comida cercana, baños, agua, sombra y un plan B. Phoenix, Sedona, Flagstaff, Payson, Prescott, Tucson y Grand Canyon pueden funcionar según la temporada.',
  },
  {
    question: '¿Cuántos días necesito para un primer viaje a Arizona?',
    answer:
      'Para un fin de semana, conviene elegir una sola base. Para cuatro o cinco días, dos bases suelen funcionar bien. Para tres bases o más, es mejor tener una semana completa y aceptar más tiempo de manejo.',
  },
  {
    question: '¿Dónde conviene ir en verano en Arizona?',
    answer:
      'En verano, muchas familias disfrutan más Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside y zonas con más altura, pinos, lagos o sombra. Las caminatas expuestas en Phoenix y Sedona deben hacerse muy temprano o cambiarse por planes bajo techo.',
  },
  {
    question: '¿Cómo hago que el viaje sea más fácil para todos?',
    answer:
      'Elige el plan pensando en la persona menos flexible del grupo: niños pequeños, abuelos, visitantes cansados, personas sensibles al calor o alguien que no quiere caminar mucho. Eso normalmente mejora el viaje para todos.',
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

const tripTypes = [
  {
    icon: Baby,
    title: 'Familias con niños pequeños',
    base: 'Phoenix, Prescott, Payson o Flagstaff',
    text:
      'Lo más importante es reducir fricción: baños, comida fácil, trayectos razonables, sombra y una salida sencilla si todos se cansan.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=toddlers&shade=true&bathrooms=true&stroller=true&food=nearby&drive=60&language=es',
  },
  {
    icon: Users,
    title: 'Familias con niños grandes',
    base: 'Sedona, Flagstaff, Payson o Grand Canyon',
    text:
      'Puedes añadir paisajes más fuertes o caminatas más largas, pero el día todavía necesita agua, snacks, horarios realistas y descanso.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=hike&length=full-day&season=spring&ages=kids&shade=true&bathrooms=true&food=nearby&drive=180&language=es',
  },
  {
    icon: Sparkles,
    title: 'Grupos de amigos',
    base: 'Sedona, Tucson, Prescott, Cottonwood o Jerome',
    text:
      'Normalmente funciona mejor mezclar vistas, comida, fotos y flexibilidad en lugar de llenar el día con demasiadas paradas.',
    to: '/trip-builder?plan=ready&location=sedona&kids=no&group=friends&activity=explore&length=weekend&season=spring&shade=true&bathrooms=true&food=nearby&drive=180&language=es',
  },
  {
    icon: ShieldCheck,
    title: 'Escapar del calor',
    base: 'Flagstaff, Payson, Prescott, Show Low o Pinetop',
    text:
      'En los meses calientes, la mejor decisión suele ser subir de altura, buscar pinos, agua, sombra y empezar temprano.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=water&length=full-day&season=summer&shade=true&bathrooms=true&food=flexible&drive=120&language=es',
  },
];

const starterRoutes = [
  {
    title: 'Primer viaje clásico',
    icon: Mountain,
    route: 'Phoenix + Sedona + Grand Canyon',
    bestFor: 'Visitantes por primera vez, fotos, paisajes icónicos',
    days: '4 a 6 días',
    plan:
      'Usa Phoenix para llegar, Sedona para las rocas rojas y Grand Canyon para el recuerdo grande. Si van niños, deja un día más tranquilo entre los manejos fuertes.',
    links: [
      ['Guía de Sedona', '/arizona/sedona'],
      ['Grand Canyon', '/archive/grand-canyon-family-adventure'],
      ['Viajes desde Phoenix', '/es/arizona/viajes-de-un-dia-desde-phoenix'],
    ],
  },
  {
    title: 'Fin de semana familiar fácil',
    icon: Car,
    route: 'Phoenix + Prescott o Payson',
    bestFor: 'Niños pequeños, abuelos, primera escapada sin estrés',
    days: '2 a 3 días',
    plan:
      'Elige un manejo más corto, una actividad principal, una comida sencilla y un destino que todavía funcione si el grupo decide caminar menos.',
    links: [
      ['Payson en español', '/es/arizona/payson-y-mogollon-rim-con-ninos'],
      ['Prescott', '/arizona/prescott'],
      ['Planificar por situación', '/es/arizona/planificar-por-situacion'],
    ],
  },
  {
    title: 'Ruta más fresca de verano',
    icon: Trees,
    route: 'Flagstaff + Payson + Rim Country',
    bestFor: 'Escapar del calor de Phoenix, pinos, lagos y sombra',
    days: '2 a 5 días',
    plan:
      'Busca más altura, lagos, bosque, caminatas con sombra y comida flexible. No conviertas una escapada fresca en un día largo de sol expuesto.',
    links: [
      ['Viajes frescos', '/es/arizona/viajes-frescos-verano-con-ninos'],
      ['Flagstaff', '/archive/flagstaff-family-escape'],
      ['Payson', '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim'],
    ],
  },
  {
    title: 'Comida, historia y paseo tranquilo',
    icon: MapPin,
    route: 'Tucson + Cottonwood + Jerome o Bisbee',
    bestFor: 'Amigos, adultos, visitantes y grupos mixtos',
    days: '3 a 5 días',
    plan:
      'Elige bases caminables con restaurantes, calles bonitas, paradas cortas al aire libre y suficiente flexibilidad para diferentes niveles de energía.',
    links: [
      ['Tucson', '/arizona/tucson'],
      ['Cottonwood', '/arizona/cottonwood'],
      ['Bisbee', '/arizona/bisbee'],
    ],
  },
];

const seasonCards = [
  {
    season: 'Primavera',
    icon: CloudSun,
    best: 'Sedona, Phoenix, Tucson, Prescott y Grand Canyon',
    watch: 'Spring break, estacionamientos llenos y planes con demasiadas paradas.',
  },
  {
    season: 'Verano',
    icon: Sun,
    best: 'Flagstaff, Payson, Prescott, Show Low y Pinetop-Lakeside',
    watch: 'Calor extremo en el desierto, tormentas de monzón y necesidad de más agua.',
  },
  {
    season: 'Otoño',
    icon: Trees,
    best: 'Sedona, Flagstaff, Grand Canyon, Prescott y Tucson',
    watch: 'Días más cortos, noches frías en el norte y fines de semana populares.',
  },
  {
    season: 'Invierno',
    icon: CalendarDays,
    best: 'Phoenix, Tucson, Yuma, senderos bajos y Sedona con capas',
    watch: 'Nieve, hielo o cierres en Flagstaff, Williams y Grand Canyon.',
  },
];

const mistakes = [
  {
    title: 'Planear solo por lugares famosos',
    fix: 'Primero filtra por temporada, manejo, baños, comida, sombra y energía del grupo.',
  },
  {
    title: 'Querer verlo todo',
    fix: 'Un fin de semana funciona mejor con una base. Cuatro o cinco días funcionan mejor con dos bases.',
  },
  {
    title: 'Pensar que Arizona tiene un solo clima',
    fix: 'Phoenix, Sedona, Payson, Flagstaff, Tucson y Grand Canyon pueden sentirse como viajes distintos.',
  },
  {
    title: 'Hacer caminatas expuestas demasiado tarde',
    fix: 'En meses cálidos, lo exterior va temprano y el mediodía necesita sombra, agua, comida o interior.',
  },
  {
    title: 'Olvidar al viajero menos flexible',
    fix: 'Si el plan funciona para niños pequeños, abuelos o personas sensibles al calor, suele funcionar mejor para todos.',
  },
];

const quickPlanText = [
  'Idea para un primer viaje a Arizona:',
  '',
  'Elegimos la ruta por temporada y grupo:',
  '- Clásico: Phoenix + Sedona + Grand Canyon',
  '- Fácil con niños: Phoenix + Prescott o Payson',
  '- Verano más fresco: Flagstaff, Payson o Rim Country',
  '- Amigos/comida/historia: Tucson, Cottonwood, Jerome o Bisbee',
  '',
  'Regla Sage: una aventura principal, una comida fácil y un plan B.',
  '',
  'Guía: https://sage.healthandtravels.com/es/arizona/primer-viaje-a-arizona-con-ninos',
].join('\n');

const voteText = [
  '¿Qué tipo de primer viaje a Arizona hacemos?',
  '',
  '1. Clásico: Phoenix + Sedona + Grand Canyon',
  '2. Fácil con niños: Prescott o Payson',
  '3. Más fresco en verano: Flagstaff o Rim Country',
  '4. Amigos, comida e historia: Tucson, Cottonwood, Jerome o Bisbee',
  '',
  'Respondan con 1, 2, 3 o 4 y armamos el plan.',
  '',
  'https://sage.healthandtravels.com/es/arizona/primer-viaje-a-arizona-con-ninos',
].join('\n');

export default function SpanishFirstArizonaTripGuide() {
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
        title="Primer viaje a Arizona con niños | Guía familiar | Sage"
        description="Guía en español para planear un primer viaje a Arizona con niños, familia o amigos: Phoenix, Sedona, Flagstaff, Grand Canyon, Payson, Prescott, Tucson, calor, comida, baños y rutas fáciles."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en español', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Primer viaje a Arizona', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/sedona-family.avif"
            alt="Familia explorando rocas rojas en Sedona, Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/first-trip"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              Inglés
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Español
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Guía para empezar
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Primer viaje a Arizona con niños
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            La primera vez no tiene que incluir todo Arizona. Funciona mejor
            cuando eliges una base, una aventura principal por día, comida
            fácil y un plan B para calor, cansancio o cambios de clima.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=explore&length=weekend&season=spring&ages=mixed&shade=true&bathrooms=true&food=nearby&drive=180&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Crear mi primer plan
            </Link>
            <Link
              to="/es/arizona/planificar-por-situacion"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Planificar por situación
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Clock, label: 'Regla', value: 'Una base primero' },
            { icon: Users, label: 'Para', value: 'Familias y amigos' },
            { icon: Sun, label: 'Filtro', value: 'Temporada y calor' },
            { icon: ShieldCheck, label: 'Plan', value: 'Comida, agua y B' },
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
            Empieza con tu grupo
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            El mejor primer viaje depende de quién viene
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tripTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.title}
                to={type.to}
                className="group flex h-full flex-col rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="text-xl font-black tracking-tight">{type.title}</h3>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                  {type.base}
                </p>
                <p className="mt-3 flex-1 text-sm leading-7 text-zinc-600">{type.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-800">
                  Crear esta versión
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Rutas iniciales
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Cuatro caminos fáciles para la primera visita
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {starterRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <article key={route.title} className="rounded-lg border border-zinc-100 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                        {route.title}
                      </p>
                      <h3 className="mt-2 text-2xl font-black tracking-tight">{route.route}</h3>
                    </div>
                  </div>

                  <div className="mb-5 grid gap-3 rounded-lg bg-zinc-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                        Ideal para
                      </p>
                      <p className="mt-1 text-sm font-bold leading-6 text-zinc-700">
                        {route.bestFor}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                        Tiempo
                      </p>
                      <p className="mt-1 text-sm font-bold leading-6 text-zinc-700">
                        {route.days}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-zinc-600">{route.plan}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {route.links.map(([label, to]) => (
                      <Link
                        key={to}
                        to={to}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-800 transition hover:bg-white"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Arizona por temporada
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            El clima decide mucho del plan
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {seasonCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.season} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
                <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="text-xl font-black tracking-tight">{card.season}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-zinc-800">{card.best}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{card.watch}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-emerald-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
              Evita errores comunes
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Pequeños cambios que salvan el viaje
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
            {mistakes.map((row) => (
              <article
                key={row.title}
                className="grid gap-3 border-b border-white/10 p-5 last:border-b-0 md:grid-cols-[0.8fr_1.2fr]"
              >
                <h3 className="text-base font-black tracking-tight text-white">
                  {row.title}
                </h3>
                <p className="text-sm leading-7 text-emerald-50">{row.fix}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Manda esta guía al grupo"
        description="Copia un resumen sencillo o una votación rápida para que la familia o los amigos elijan una ruta antes de que todos empiecen a mandar ideas sueltas."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="spanish_first_arizona_trip"
        locale="es"
      />

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
          Preguntas frecuentes
        </p>
        <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Dudas del primer viaje a Arizona
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
      </section>
    </main>
  );
}
