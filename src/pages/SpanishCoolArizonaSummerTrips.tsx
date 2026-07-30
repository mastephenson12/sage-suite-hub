import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Car,
  CloudSun,
  Compass,
  Droplets,
  Mountain,
  ShieldCheck,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/viajes-frescos-verano-con-ninos';
const englishUrl =
  'https://sage.healthandtravels.com/arizona/cool-summer-trips-with-kids';

const spanishFaqs = [
  {
    question: 'A donde ir en Arizona en verano con ninos para escapar del calor?',
    answer:
      'Buenas opciones desde Phoenix incluyen Payson y Mogollon Rim, Flagstaff, Prescott, Show Low, Pinetop-Lakeside y planes con lago, bosque, sombra o actividades bajo techo.',
  },
  {
    question: 'Cuales son viajes frescos de verano cerca de Phoenix?',
    answer:
      'Payson, Prescott y Flagstaff son opciones fuertes para familias. El mejor plan tiene una actividad principal temprano, comida facil, sombra o agua, y un plan bajo techo si cambia el clima.',
  },
  {
    question: 'Sedona funciona en verano con ninos?',
    answer:
      'Sedona puede funcionar si salen muy temprano, hacen caminatas cortas, evitan rocas expuestas al mediodia y tienen agua, comida y sombra listas. No es ideal para caminatas largas con calor fuerte.',
  },
  {
    question: 'Como planear un viaje seguro en Arizona durante el verano?',
    answer:
      'Hagan lo exterior temprano, eviten el mediodia expuesto, lleven mas agua de la que creen, revisen monzones y humo, confirmen banos y sombra, y tengan un plan B antes de salir.',
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
    title: 'Fin de semana en montana',
    icon: Mountain,
    text:
      'La mejor opcion cuando la familia necesita aire mas fresco de verdad. Piensen en Flagstaff, Payson, Show Low, Pinetop o Prescott.',
    links: [
      ['Flagstaff', '/arizona/flagstaff'],
      ['Payson y Rim Country', '/arizona/payson-rim-country-with-kids'],
      ['Fines de semana', '/arizona/weekend-trips'],
    ],
  },
  {
    title: 'Lago, pinos y agua',
    icon: Droplets,
    text:
      'Bueno para ninos que necesitan moverse sin sentir que todo es una caminata. Usen agua, sombra y snacks como el centro del plan.',
    links: [
      ['Pinetop-Lakeside', '/arizona/pinetop-lakeside'],
      ['Show Low', '/arizona/show-low'],
      ['Payson', '/arizona/payson'],
    ],
  },
  {
    title: 'Salida temprano, interior despues',
    icon: CloudSun,
    text:
      'Ideal para Phoenix o Sedona cuando quieren aventura sin pelear contra el calor. Lo exterior va temprano; museo, comida o descanso va despues.',
    links: [
      ['Phoenix con calor', '/es/archive/phoenix-con-ninos-cuando-hace-calor'],
      ['Seguridad en el desierto', '/arizona/desert-hiking-safety'],
      ['Caminatas con ninos', '/arizona/hikes-with-kids'],
    ],
  },
  {
    title: 'Viaje con familia o amigos',
    icon: Users,
    text:
      'Funciona cuando hay edades y energias mezcladas. Una vista, una comida simple, una actividad flexible y menos presion.',
    links: [
      ['Prescott', '/arizona/prescott'],
      ['Trip Builder', '/trip-builder'],
      ['Arizona por temporada', '/arizona/family-adventures-by-season'],
    ],
  },
];

const destinationRows = [
  {
    place: 'Payson / Mogollon Rim',
    bestFor: 'Pinos, lagos, vistas del rim y manejo razonable desde Phoenix',
    caution: 'Revisen monzones, caminos forestales y multitudes de fin de semana',
    to: '/arizona/payson-rim-country-with-kids',
  },
  {
    place: 'Flagstaff',
    bestFor: 'Aire mas fresco, centro caminable, Lowell Observatory y bosque',
    caution: 'Queda mas lejos para un solo dia; revisen altura y tormentas',
    to: '/arizona/flagstaff',
  },
  {
    place: 'Prescott',
    bestFor: 'Lagos, plaza, comida facil y ritmo tranquilo',
    caution: 'Todavia puede estar caliente en la tarde; busquen sombra',
    to: '/arizona/prescott',
  },
  {
    place: 'Show Low / Pinetop-Lakeside',
    bestFor: 'Fin de semana en bosque, lagos y energia de cabana',
    caution: 'Mejor para dormir una noche que para ida y vuelta rapida',
    to: '/arizona/show-low',
  },
  {
    place: 'Sedona',
    bestFor: 'Vistas rojas, ruta escenica y paradas cortas temprano',
    caution: 'Las rocas guardan calor; eviten caminatas expuestas al mediodia',
    to: '/arizona/sedona',
  },
  {
    place: 'Phoenix bajo techo + agua',
    bestFor: 'Cuando no pueden salir de la ciudad pero necesitan un plan familiar',
    caution: 'Lo exterior debe ser muy temprano, con sombra o agua',
    to: '/es/archive/phoenix-con-ninos-cuando-hace-calor',
  },
];

const safetyRules = [
  'Pongan la actividad exterior principal antes de las 10 AM si hace mucho calor.',
  'Elijan una parada principal en lugar de llenar el dia con muchas caminatas.',
  'Busquen comida con aire acondicionado, banos faciles o sombra real.',
  'Revisen monzones antes de lagos, miradores, caminos forestales y senderos expuestos.',
  'Lleven agua aunque el destino sea mas fresco que Phoenix.',
  'Digan el plan B antes de salir de casa para que todos sepan que hay salida facil.',
];

const quickPlanText = [
  'Idea para un viaje fresco en Arizona:',
  'Elegimos un destino con menos calor, una actividad principal, una comida facil y un plan B.',
  '',
  'Opciones:',
  '- Payson / Mogollon Rim para pinos, lago y vistas',
  '- Flagstaff para el aire mas fresco y plan de pueblo',
  '- Prescott para lago, plaza y ritmo facil',
  '- Show Low / Pinetop para fin de semana en bosque',
  '- Phoenix bajo techo + agua si no podemos salir de la ciudad',
  '',
  'Regla: exterior temprano, interior o sombra al mediodia, tarde flexible.',
  'Guia: https://sage.healthandtravels.com/es/arizona/viajes-frescos-verano-con-ninos',
].join('\n');

const voteText = [
  'Que viaje fresco de verano en Arizona hacemos?',
  '',
  '1. Payson / Mogollon Rim',
  '2. Flagstaff',
  '3. Prescott',
  '4. Show Low / Pinetop',
  '5. Phoenix bajo techo + agua',
  '',
  'Responde con un numero y armamos el plan.',
  'Guia: https://sage.healthandtravels.com/es/arizona/viajes-frescos-verano-con-ninos',
].join('\n');

export default function SpanishCoolArizonaSummerTrips() {
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
    <article className="min-h-screen bg-white pb-20 text-zinc-900">
      <SEOJsonLd
        title="Viajes frescos de verano en Arizona con ninos | Sage"
        description="Guia en espanol para familias que buscan viajes frescos de verano en Arizona: Payson, Flagstaff, Prescott, Show Low, Pinetop, Sedona temprano y Phoenix bajo techo."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Guias en espanol', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-sky-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Vista de pinos y montanas en Rim Country cerca de Payson"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/85 to-sky-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/cool-summer-trips-with-kids"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-sky-950"
            >
              English
            </Link>
            <span className="rounded-full bg-cyan-300 px-4 py-2 text-sky-950">
              Espanol
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">
            Guia familiar de verano en Arizona
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Viajes frescos de verano en Arizona con ninos
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl">
            Cuando Phoenix se siente demasiado caliente, la meta no es hacer mas.
            La meta es escoger mejor: subir de elevacion, salir temprano, buscar
            agua o usar un plan bajo techo sin culpa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=cool-summer&length=weekend&season=summer&ages=mixed&shade=true&bathrooms=true&drive=180&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-sky-950 transition hover:bg-cyan-200"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Planear viaje fresco
            </Link>
            <Link
              to="/arizona/payson-rim-country-with-kids"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Trees className="h-4 w-4" aria-hidden="true" />
              Empezar con Payson
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-sky-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Car, label: 'Punto de salida', value: 'Familias desde Phoenix' },
            { icon: Mountain, label: 'Mejor estrategia', value: 'Subir de elevacion' },
            { icon: Droplets, label: 'Reset para ninos', value: 'Agua, sombra, snacks' },
            { icon: CalendarDays, label: 'Ritmo ideal', value: 'Temprano afuera, tarde flexible' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-lg border border-sky-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-sky-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
            Regla simple
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Subir, salir temprano o estar bajo techo
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Si el plan no hace una de esas tres cosas, probablemente no es el mejor plan para un dia fuerte de verano en Arizona.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {tripTypes.map((type) => {
            const Icon = type.icon;
            return (
              <article key={type.title} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
                <Icon className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-tight text-zinc-950">{type.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{type.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {type.links.map(([label, to]) => (
                    <Link
                      key={to}
                      to={to}
                      className="rounded-full bg-sky-50 px-3 py-2 text-[11px] font-black uppercase tracking-wide text-sky-800 transition hover:bg-sky-100"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Comparar destinos
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Donde ir cuando Phoenix esta demasiado caliente
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            {destinationRows.map((row) => (
              <Link
                key={row.place}
                to={row.to}
                className="grid gap-3 border-b border-zinc-100 p-5 transition last:border-b-0 hover:bg-sky-50 md:grid-cols-[0.8fr_1.2fr_1fr]"
              >
                <p className="text-lg font-black text-zinc-950">{row.place}</p>
                <p className="text-sm leading-6 text-zinc-600">{row.bestFor}</p>
                <p className="text-sm leading-6 text-zinc-500">{row.caution}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
            Seguridad de verano
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Reglas que mantienen el dia tranquilo
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Un destino mas fresco ayuda, pero no reemplaza revisar clima, agua, banos, sombra y tiempos realistas.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
          <ShieldCheck className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
          <ul className="space-y-3">
            {safetyRules.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm leading-7 text-zinc-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-700" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SharePlanPanel
        title="Mandar una votacion de viaje fresco"
        description="Copia un plan simple o manda una votacion al grupo para convertir la idea en un viaje real."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="spanish_cool_arizona_summer_trips_with_kids"
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Seguir planeando
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Guias relacionadas
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['Version en ingles', '/arizona/cool-summer-trips-with-kids'],
              ['Payson y Rim Country con ninos', '/arizona/payson-rim-country-with-kids'],
              ['Phoenix con ninos cuando hace calor', '/es/archive/phoenix-con-ninos-cuando-hace-calor'],
              ['Fines de semana en Arizona', '/arizona/weekend-trips'],
              ['Viajes desde Phoenix', '/arizona/day-trips-from-phoenix'],
              ['Seguridad en el desierto', '/arizona/desert-hiking-safety'],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black uppercase tracking-wide text-zinc-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
            FAQ
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Preguntas sobre viajes frescos en Arizona
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
    </article>
  );
}
