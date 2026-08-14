import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Compass,
  Droplets,
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

const spanishUrl = 'https://sage.healthandtravels.com/es/arizona';
const englishUrl = 'https://sage.healthandtravels.com/arizona';

const spanishFaqs = [
  {
    question: 'Que es Sage Arizona en espanol?',
    answer:
      'Es una guia familiar para planear viajes por Arizona con ninos, amigos o familia: destinos, caminatas faciles, calor, comida, agua, sombra y planes realistas.',
  },
  {
    question: 'Cuales son buenos destinos de Arizona para familias?',
    answer:
      'Sedona, Flagstaff, Payson, Prescott, Grand Canyon, Tucson, Show Low, Pinetop-Lakeside y Phoenix pueden funcionar bien si el plan respeta la temporada, el calor y la edad de los ninos.',
  },
  {
    question: 'Como usar esta pagina?',
    answer:
      'Empieza por la temporada o el tipo de viaje: escapar del calor, caminar con ninos, salir desde Phoenix, hacer fin de semana o buscar un plan bajo techo.',
  },
  {
    question: 'Sage tiene paginas en espanol y en ingles?',
    answer:
      'Si. Algunas guias ya estan en espanol y otras estan en ingles mientras se traducen. Esta pagina sera el punto de entrada para las nuevas guias en espanol.',
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

const featuredSpanishGuides = [
  {
    title: 'Flagstaff con niños',
    description:
      'Bosque, Buffalo Park, Lowell Observatory, altura, monzón, nieve y planes familiares realistas para un día o fin de semana.',
    to: '/es/arizona/flagstaff-con-ninos',
    label: 'Flagstaff',
    icon: Trees,
  },
  {
    title: 'Sedona con niños',
    description:
      'Caminatas familiares, shuttle gratuito, estacionamiento, calor, monzón, pases y un plan realista entre las rocas rojas.',
    to: '/es/arizona/sedona-con-ninos',
    label: 'Sedona',
    icon: Mountain,
  },
  {
    title: 'Primer viaje a Arizona con ninos',
    description:
      'Una guia para familias y grupos que visitan Arizona por primera vez: ruta, temporada, calor, comida, banos, manejo y plan B.',
    to: '/es/arizona/primer-viaje-a-arizona-con-ninos',
    label: 'Primera vez',
    icon: Sparkles,
  },
  {
    title: 'Planificar viajes por Arizona por situacion',
    description:
      'Empieza con lo que realmente cambia el dia: ninos pequenos, calor extremo, visitantes, medio dia, banos, sombra, agua o grupos de amigos.',
    to: '/es/arizona/planificar-por-situacion',
    label: 'Empezar aqui',
    icon: Compass,
  },
  {
    title: 'Viajes frescos de verano en Arizona con ninos',
    description:
      'Payson, Flagstaff, Prescott, Show Low, Pinetop y planes con sombra, agua o aire acondicionado para escapar del calor.',
    to: '/es/arizona/viajes-frescos-verano-con-ninos',
    label: 'Verano',
    icon: Trees,
  },
  {
    title: 'Caminatas en Arizona con ninos',
    description:
      'Escoge senderos familiares por edad, temporada, calor, sombra, banos, agua y energia real del grupo.',
    to: '/es/arizona/caminatas-con-ninos',
    label: 'Caminatas',
    icon: Mountain,
  },
  {
    title: 'Viajes de un dia desde Phoenix con ninos',
    description:
      'Escoge salidas familiares por tiempo de manejo, temporada, calor, comida, banos, sombra y energia real del grupo.',
    to: '/es/arizona/viajes-de-un-dia-desde-phoenix',
    label: 'Desde Phoenix',
    icon: MapPin,
  },
  {
    title: 'Payson y Mogollon Rim con ninos',
    description:
      'Una escapada familiar desde Phoenix con pinos, lago, miradores, comida facil, monzones y ritmo realista.',
    to: '/es/arizona/payson-y-mogollon-rim-con-ninos',
    label: 'Pinos',
    icon: Trees,
  },
  {
    title: 'Escapadas de fin de semana en Arizona',
    description:
      'Elige destino por clima, manejo, comida, hospedaje, una aventura principal y plan B para familias o grupos de amigos.',
    to: '/es/arizona/escapadas-fin-de-semana-con-ninos',
    label: 'Fin de semana',
    icon: CalendarDays,
  },
  {
    title: 'Phoenix con ninos cuando hace demasiado calor',
    description:
      'Una guia para dias de calor fuerte: salir temprano, usar museos, agua, comida facil y descansos bajo techo.',
    to: '/es/archive/phoenix-con-ninos-cuando-hace-calor',
    label: 'Phoenix',
    icon: Sun,
  },
];

const planningPaths = [
  {
    title: 'Planificar por situacion',
    text:
      'Elige segun tu realidad: ninos pequenos, calor, visitantes, medio dia, fin de semana, banos, sombra, agua o grupo grande.',
    to: '/es/arizona/planificar-por-situacion',
    icon: Sparkles,
  },
  {
    title: 'Escapar del calor de Phoenix',
    text:
      'Busca elevacion, pinos, lagos, sombra y planes bajo techo. Perfecto para junio, julio, agosto y septiembre.',
    to: '/es/arizona/viajes-frescos-verano-con-ninos',
    icon: Droplets,
  },
  {
    title: 'Caminatas con ninos',
    text:
      'Empieza con caminatas cortas, banos cercanos, agua, snacks, salida temprano y una opcion de retirada facil.',
    to: '/es/arizona/caminatas-con-ninos',
    icon: Users,
  },
  {
    title: 'Viajes desde Phoenix',
    text:
      'Compara tiempo de manejo, clima, comida, estacionamiento y si el viaje funciona como ida y vuelta o fin de semana.',
    to: '/es/arizona/viajes-de-un-dia-desde-phoenix',
    icon: MapPin,
  },
  {
    title: 'Fines de semana familiares',
    text:
      'Para grupos y familias, menos paradas suele ser mejor: una aventura principal, una buena comida y una noche tranquila.',
    to: '/es/arizona/escapadas-fin-de-semana-con-ninos',
    icon: CalendarDays,
  },
];

const destinations = [
  {
    name: 'Sedona',
    bestFor: 'Rocas rojas, vistas, caminatas cortas y fotos familiares',
    note: 'En verano salgan muy temprano y eviten roca expuesta al mediodia.',
    to: '/es/arizona/sedona-con-ninos',
  },
  {
    name: 'Flagstaff',
    bestFor: 'Aire fresco, bosque, Lowell Observatory y escapada de verano',
    note: 'Ideal para dormir una noche si vienen desde Phoenix.',
    to: '/es/arizona/flagstaff-con-ninos',
  },
  {
    name: 'Payson y Mogollon Rim',
    bestFor: 'Pinos, lagos, miradores y descanso del calor',
    note: 'Revisen monzones y caminos forestales antes de salir.',
    to: '/es/arizona/payson-y-mogollon-rim-con-ninos',
  },
  {
    name: 'Prescott',
    bestFor: 'Lagos, plaza, comida facil y ritmo mas tranquilo',
    note: 'Buena opcion para familias que no quieren manejar tan lejos.',
    to: '/arizona/prescott',
  },
  {
    name: 'Grand Canyon',
    bestFor: 'Viaje grande, miradores, amanecer, atardecer y memoria familiar',
    note: 'Planeen capas, agua, tiempos de traslado y seguridad cerca del borde.',
    to: '/arizona/grand-canyon',
  },
  {
    name: 'Tucson',
    bestFor: 'Desierto Sonorense, Saguaro, museos y comida',
    note: 'Funciona mejor en meses frescos o con planes interiores en verano.',
    to: '/arizona/tucson',
  },
];

const quickPlanText = [
  'Plan familiar para explorar Arizona:',
  '',
  '1. Elegimos destino y temporada.',
  '2. Ponemos la actividad exterior temprano.',
  '3. Confirmamos agua, banos, sombra y comida facil.',
  '4. Agregamos una opcion bajo techo o una salida sencilla.',
  '5. Dejamos la tarde flexible para que el viaje siga siendo divertido.',
  '',
  'Empezar aqui: https://sage.healthandtravels.com/es/arizona',
].join('\n');

const voteText = [
  'Que tipo de viaje por Arizona hacemos?',
  '',
  '1. Escapar del calor hacia pinos o lago',
  '2. Sedona con caminata corta y comida',
  '3. Flagstaff de fin de semana',
  '4. Payson / Mogollon Rim',
  '5. Phoenix bajo techo cuando hace calor',
  '',
  'Respondan con un numero y armamos el plan.',
  'Guia: https://sage.healthandtravels.com/es/arizona',
].join('\n');

export default function SpanishArizonaHub() {
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
        title="Guias de Arizona en espanol para familias | Sage"
        description="Punto de entrada en espanol para planear viajes familiares por Arizona: Phoenix, Sedona, Flagstaff, Payson, Grand Canyon, caminatas con ninos, calor y fines de semana."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en espanol', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Vista de pinos y montanas en Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              English
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Espanol
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Sage Arizona en espanol
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Guias de Arizona para familias, ninos y grupos de amigos
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            Empieza aqui si quieres explorar Arizona sin sentir que tienes que
            revisar veinte paginas distintas. Elige temporada, destino, nivel de
            energia y seguridad; Sage te ayuda a convertirlo en un plan real.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Planear mi viaje
            </Link>
            <Link
              to="/es/arizona/viajes-frescos-verano-con-ninos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Mountain className="h-4 w-4" aria-hidden="true" />
              Viajes frescos
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Sparkles, label: 'Idioma', value: 'Guias en espanol' },
            { icon: Users, label: 'Para quien', value: 'Familias y grupos' },
            { icon: ShieldCheck, label: 'Prioridad', value: 'Calor y seguridad' },
            { icon: MapPin, label: 'Zona', value: 'Arizona completo' },
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
            Guias en espanol
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Empieza con estas paginas
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Estas son las primeras guias completas en espanol. Cada nueva pagina en espanol debe volver aqui para que sea facil seguir explorando.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredSpanishGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.to}
                to={guide.to}
                className="group rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800">
                    {guide.label}
                  </span>
                  <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-zinc-950">{guide.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-emerald-800">
                  Abrir guia <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
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
              Que necesitas planear?
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Escoge el camino mas facil
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {planningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.to}
                  to={path.to}
                  className="rounded-lg border border-zinc-100 bg-white p-5 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                  <h3 className="text-xl font-black tracking-tight text-zinc-950">{path.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{path.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Destinos populares
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Donde ir primero en Arizona
          </h2>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
          {destinations.map((destination) => (
            <Link
              key={destination.name}
              to={destination.to}
              className="grid gap-3 border-b border-zinc-100 p-5 transition last:border-b-0 hover:bg-emerald-50 md:grid-cols-[0.7fr_1.1fr_1fr]"
            >
              <p className="text-lg font-black text-zinc-950">{destination.name}</p>
              <p className="text-sm leading-6 text-zinc-600">{destination.bestFor}</p>
              <p className="text-sm leading-6 text-zinc-500">{destination.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-emerald-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-200">
              Regla local
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              En Arizona, el clima decide el plan
            </h2>
            <p className="mt-4 text-sm leading-7 text-emerald-50">
              Un viaje familiar bueno no solo pregunta que lugar se ve bonito. Pregunta a que hora, con cuanta agua, que tan lejos, donde estan los banos y cual es el plan B.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-5">
            <ShieldCheck className="mb-4 h-6 w-6 text-emerald-200" aria-hidden="true" />
            <ul className="space-y-3 text-sm leading-7 text-emerald-50">
              <li>Si hace mucho calor, lo exterior va temprano.</li>
              <li>Si hay ninos pequenos, el plan necesita banos y comida facil.</li>
              <li>Si van a montana o lago, revisen monzones antes de manejar.</li>
              <li>Si el grupo es grande, elijan una actividad principal y dejen espacio.</li>
            </ul>
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Compartir una idea de viaje por Arizona"
        description="Copia un plan simple o manda una votacion para que la familia o el grupo elija el siguiente destino."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="spanish_arizona_hub"
        locale="es"
      />

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            FAQ
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Preguntas sobre explorar Arizona en espanol
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
