import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Car,
  Clock,
  Compass,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/escapadas-fin-de-semana-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/arizona/weekend-trips';

const spanishFaqs = [
  {
    question: 'Cuales son buenas escapadas de fin de semana en Arizona con ninos?',
    answer:
      'Buenas escapadas de fin de semana en Arizona con ninos incluyen Flagstaff, Payson, Prescott, Sedona, Grand Canyon, Tucson, Williams, Show Low y Pinetop-Lakeside cuando el clima, el manejo y la energia del grupo encajan.',
  },
  {
    question: 'Donde escapar del calor de Phoenix un fin de semana?',
    answer:
      'Para escapar del calor de Phoenix un fin de semana, miren primero Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside y Mogollon Rim porque tienen mas elevacion, pinos, sombra y noches mas frescas.',
  },
  {
    question: 'Que destino de Arizona conviene para amigos o varias familias?',
    answer:
      'Sedona, Prescott, Flagstaff, Cottonwood, Jerome y Tucson suelen funcionar bien para amigos o varias familias porque combinan comida, hospedaje, vistas, caminatas faciles y planes alternativos.',
  },
  {
    question: 'Como planear un fin de semana en Arizona sin cansar a todos?',
    answer:
      'Elige una actividad principal, una comida facil, un descanso claro y un plan B. En Arizona, el mejor fin de semana no es el que tiene mas paradas, sino el que respeta calor, manejo, banos, agua y energia real.',
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

const quickChoices = [
  {
    icon: Trees,
    title: 'Fin de semana mas fresco',
    bestFor: 'Familias que salen de Phoenix en verano',
    places: 'Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside',
  },
  {
    icon: Mountain,
    title: 'Fin de semana de rocas rojas',
    bestFor: 'Visitantes, fotos, comida y vistas',
    places: 'Sedona, Cottonwood, Jerome',
  },
  {
    icon: Sparkles,
    title: 'Fin de semana de gran recuerdo',
    bestFor: 'Primer viaje a Arizona o ocasion especial',
    places: 'Grand Canyon, Page, Williams',
  },
  {
    icon: Clock,
    title: 'Fin de semana tranquilo',
    bestFor: 'Ninos pequenos, grupos mixtos y bajo estres',
    places: 'Prescott, Payson, Cave Creek, Tucson',
  },
];

const tripIdeas = [
  {
    title: 'Flagstaff',
    drive: 'Aproximadamente 2 a 2.5 horas desde Phoenix',
    season: 'Muy fuerte para verano, otono, nieve de invierno y primavera',
    why:
      'Flagstaff es una de las respuestas mas faciles cuando Phoenix esta demasiado caliente. Tiene pinos, aire de montana, comida casual y suficientes opciones para ninos, adolescentes, abuelos o amigos.',
    anchors: ['Lowell Observatory', 'Fort Tuthill', 'centro de Flagstaff', 'Walnut Canyon', 'caminatas faciles en bosque'],
    link: '/archive/flagstaff-family-escape',
    linkLabel: 'Abrir itinerario de Flagstaff',
  },
  {
    title: 'Payson y Mogollon Rim',
    drive: 'Aproximadamente 1.5 a 2 horas desde Phoenix',
    season: 'Ideal para sombra de verano, primavera tardia y principios de otono',
    why:
      'Payson da una sensacion de escapada sin manejar demasiado. Funciona bien con lagos, pinos, miradores, picnic, cabana sencilla o hotel y una tarde mas lenta.',
    anchors: ['Woods Canyon Lake', 'Mogollon Rim', 'Water Wheel', 'Green Valley Park', 'paradas faciles para picnic'],
    link: '/es/arizona/payson-y-mogollon-rim-con-ninos',
    linkLabel: 'Abrir guia de Payson',
  },
  {
    title: 'Prescott',
    drive: 'Aproximadamente 1.75 a 2 horas desde Phoenix',
    season: 'Bueno en primavera, verano, otono y fines de semana tranquilos',
    why:
      'Prescott funciona cuando quieres una escapada real, pero sin complicar demasiado el plan. Tiene lagos, centro historico, comida, paseos cortos y ambiente relajado.',
    anchors: ['Watson Lake', 'centro de Prescott', 'Thumb Butte', 'Lynx Lake', 'comidas faciles'],
    link: '/arizona/prescott',
    linkLabel: 'Abrir guia de Prescott',
  },
  {
    title: 'Sedona, Cottonwood y Jerome',
    drive: 'Aproximadamente 2 a 2.5 horas desde Phoenix',
    season: 'Mejor en primavera, otono, invierno y mananas tempranas de verano',
    why:
      'Es la escapada clasica de vistas rojas. Para que no sea agotadora, elige una caminata o mirador principal y usa Cottonwood o Jerome para comida, paseo y descanso.',
    anchors: ['miradores de Sedona', 'caminatas cortas', 'Tlaquepaque', 'Old Town Cottonwood', 'vistas de Jerome'],
    link: '/archive/sedona-family-adventure',
    linkLabel: 'Abrir itinerario de Sedona',
  },
  {
    title: 'Grand Canyon y Williams',
    drive: 'Aproximadamente 3.5 a 4 horas desde Phoenix',
    season: 'Mejor en primavera, otono y verano con hospedaje reservado',
    why:
      'Grand Canyon es el viaje de gran recuerdo. Williams puede ser una base sencilla para comida, hospedaje y una entrada mas suave antes o despues del South Rim.',
    anchors: ['miradores del South Rim', 'Desert View Drive', 'Williams', 'amanecer o atardecer', 'picnic sencillo'],
    link: '/archive/grand-canyon-family-adventure',
    linkLabel: 'Abrir itinerario de Grand Canyon',
  },
  {
    title: 'Tucson',
    drive: 'Aproximadamente 1.75 a 2 horas desde Phoenix',
    season: 'Mejor en invierno, primavera y otono',
    why:
      'Tucson es fuerte para familias y grupos que quieren desierto bonito, museos, comida y flexibilidad sin hacer que todo el fin de semana dependa de una caminata.',
    anchors: ['Arizona-Sonora Desert Museum', 'Saguaro National Park', 'comida en el centro', 'Sabino Canyon', 'Mission San Xavier del Bac'],
    link: '/arizona/tucson',
    linkLabel: 'Abrir guia de Tucson',
  },
];

const groupMatrix = [
  {
    group: 'Ninos pequenos',
    bestFits: 'Payson, Prescott, Flagstaff',
    reason:
      'Importan mas los trayectos razonables, sombra, banos, comida facil y poder cambiar el plan sin drama.',
  },
  {
    group: 'Adolescentes',
    bestFits: 'Sedona, Flagstaff, Page, Grand Canyon',
    reason:
      'Dales una actividad memorable, vistas para fotos, comida buena y espacio para descansar.',
  },
  {
    group: 'Amigos o varias familias',
    bestFits: 'Sedona, Prescott, Tucson, Cottonwood y Jerome',
    reason:
      'Funcionan bien con hospedaje compartido, comida caminable, vistas y opciones para distintos ritmos.',
  },
  {
    group: 'Abuelos o movilidad mixta',
    bestFits: 'Prescott, Cottonwood, Tucson, Williams',
    reason:
      'Busca miradores, paseos cortos, restaurantes, estacionamiento sencillo y menos cambios de lugar.',
  },
  {
    group: 'Escapar del calor',
    bestFits: 'Flagstaff, Payson, Show Low, Pinetop-Lakeside',
    reason:
      'La elevacion, los pinos y las tardes mas frescas hacen que el fin de semana sea mas amable.',
  },
];

const weekendFormula = [
  {
    title: 'Viernes: llegar sin correr',
    body:
      'No llenes el viernes de actividades. Manejen, lleguen, coman algo sencillo y dejen que todos aterricen.',
  },
  {
    title: 'Sabado: una aventura principal',
    body:
      'Pon la actividad exterior temprano si hace calor. Despues protege la tarde con comida, agua, sombra, alberca, museo o descanso.',
  },
  {
    title: 'Domingo: una parada corta y regreso',
    body:
      'Elige un mirador, desayuno, paseo corto, lago o visitor center. Salgan antes de que todos esten completamente cansados.',
  },
];

const safetyChecks = [
  'Revisa clima, cierres, monzones, nieve o avisos de calor antes de salir.',
  'No pongas caminatas expuestas al mediodia en verano.',
  'Confirma banos, estacionamiento, agua y comida cerca de la actividad principal.',
  'Reserva hospedaje temprano para Sedona, Flagstaff, Grand Canyon y fines de semana festivos.',
  'Deja una opcion de respaldo: museo, lago, restaurante, piscina, mirador corto o regreso temprano.',
];

const relatedLinks = [
  ['Arizona en espanol', '/es/arizona'],
  ['Primer viaje a Arizona con ninos', '/es/arizona/primer-viaje-a-arizona-con-ninos'],
  ['Planificar por situacion', '/es/arizona/planificar-por-situacion'],
  ['Viajes frescos de verano', '/es/arizona/viajes-frescos-verano-con-ninos'],
  ['Viajes de un dia desde Phoenix', '/es/arizona/viajes-de-un-dia-desde-phoenix'],
  ['Caminatas con ninos', '/es/arizona/caminatas-con-ninos'],
];

const quickPlanText = [
  'Idea para un fin de semana en Arizona:',
  '',
  '1. Elegimos el destino segun clima y tiempo de manejo.',
  '2. Ponemos una sola aventura principal el sabado.',
  '3. Confirmamos banos, agua, sombra, comida y estacionamiento.',
  '4. Dejamos una opcion de respaldo por calor, tormenta o cansancio.',
  '5. El domingo hacemos una parada corta y regresamos sin apurar a todos.',
  '',
  `Guia: ${spanishUrl}`,
].join('\n');

const voteText = [
  'Que escapada de fin de semana en Arizona hacemos?',
  '',
  '1. Flagstaff: pinos, aire fresco y Lowell Observatory',
  '2. Payson / Mogollon Rim: lago, bosque y miradores',
  '3. Sedona / Cottonwood: rocas rojas, comida y paseo',
  '4. Prescott: lago, plaza y ritmo tranquilo',
  '5. Grand Canyon / Williams: viaje de gran recuerdo',
  '',
  'Respondan con un numero y armamos el plan.',
  `Guia: ${spanishUrl}`,
].join('\n');

export default function SpanishArizonaWeekendTrips() {
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
        title="Escapadas de fin de semana en Arizona con ninos | Sage"
        description="Guia en espanol para elegir escapadas de fin de semana en Arizona con ninos, familia o amigos por clima, manejo, comida, hospedaje, seguridad y plan B."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en espanol', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Escapadas de fin de semana', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Vista de pinos y montanas para una escapada de fin de semana en Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/35" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
              <Link
                to={englishUrl.replace('https://sage.healthandtravels.com', '')}
                className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950"
              >
                English
              </Link>
              <span className="rounded-full bg-orange-300 px-4 py-2 text-slate-950">
                Espanol
              </span>
            </div>

            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">
              Arizona en espanol
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
              Escapadas de fin de semana en Arizona con ninos
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
              Una guia practica para escoger destino, manejar sin agotarse, cuidar el calor, encontrar comida facil y hacer que el viaje funcione para familias, visitantes o grupos de amigos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&length=weekend&language=es"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-orange-200"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                Planear mi fin de semana
              </Link>
              <Link
                to="/es/arizona"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Ver guias en espanol
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/10 p-5">
            <CalendarDays className="mb-4 h-7 w-7 text-orange-300" aria-hidden="true" />
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-300">
              Regla sencilla
            </p>
            <p className="mt-3 text-2xl font-black tracking-tight">
              Un lugar base, una aventura principal y un plan B.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              Si intentas hacer demasiado, Arizona se siente pesada. Si eliges bien el clima, el manejo y una actividad fuerte, el fin de semana se siente como descanso.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-orange-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickChoices.map((choice) => {
            const Icon = choice.icon;
            return (
              <article key={choice.title} className="rounded-lg border border-orange-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-orange-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {choice.bestFor}
                </p>
                <h2 className="mt-2 text-lg font-black tracking-tight text-zinc-950">
                  {choice.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{choice.places}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">
            Destinos que funcionan
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Donde ir segun el fin de semana
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            La mejor opcion depende de temporada, edades, tiempo de manejo y si el grupo quiere bosque, agua, rocas rojas, comida o una gran memoria.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {tripIdeas.map((trip) => (
            <article key={trip.title} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                <span className="rounded-full bg-zinc-100 px-3 py-1">{trip.drive}</span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800">{trip.season}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-950">{trip.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{trip.why}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {trip.anchors.map((anchor) => (
                  <span
                    key={anchor}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-bold text-zinc-700"
                  >
                    {anchor}
                  </span>
                ))}
              </div>
              <Link
                to={trip.link}
                className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-orange-800"
              >
                {trip.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">
              Para quien va el viaje?
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Ajusta el destino al grupo real
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            {groupMatrix.map((item) => (
              <div
                key={item.group}
                className="grid gap-3 border-b border-zinc-100 p-5 last:border-b-0 md:grid-cols-[0.55fr_0.8fr_1.2fr]"
              >
                <p className="font-black text-zinc-950">{item.group}</p>
                <p className="text-sm font-bold leading-6 text-orange-800">{item.bestFits}</p>
                <p className="text-sm leading-6 text-zinc-600">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">
            Formula simple
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Como armar el fin de semana
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {weekendFormula.map((step) => (
            <article key={step.title} className="rounded-lg border border-zinc-100 bg-white p-5">
              <Car className="mb-4 h-6 w-6 text-orange-700" aria-hidden="true" />
              <h3 className="text-xl font-black tracking-tight text-zinc-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-slate-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ShieldCheck className="mb-4 h-7 w-7 text-orange-300" aria-hidden="true" />
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-300">
              Chequeo antes de salir
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Haz que el plan sobreviva al clima
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Arizona puede cambiar mucho por elevacion, temporada y hora del dia. Un pequeno chequeo evita que una buena idea se convierta en un dia pesado.
            </p>
          </div>

          <ul className="space-y-3 rounded-lg border border-white/10 bg-white/10 p-5 text-sm leading-7 text-slate-100">
            {safetyChecks.map((check) => (
              <li key={check} className="flex gap-3">
                <Sun className="mt-1 h-4 w-4 flex-none text-orange-300" aria-hidden="true" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SharePlanPanel
        title="Compartir una escapada de fin de semana"
        description="Copia una idea simple o manda una votacion para que la familia o el grupo escoja el destino sin perderse en veinte opciones."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="spanish_arizona_weekend_trips"
        locale="es"
      />

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">
              Siguiente paso
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Seguir explorando en espanol
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {relatedLinks.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black text-zinc-950 transition hover:border-orange-200 hover:bg-orange-50"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">
            FAQ
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Preguntas sobre escapadas de fin de semana
          </h2>
          <div className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-100 bg-white">
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
