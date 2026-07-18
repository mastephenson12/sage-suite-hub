import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  Clock3,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/planificar-por-situacion';
const englishUrl = 'https://sage.healthandtravels.com/arizona/plan-by-situation';

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

const situationFaqs = [
  {
    question: 'Como elegir el mejor viaje familiar por Arizona?',
    answer:
      'Empieza con la situacion real: calor, edades de los ninos, tiempo de manejo, banos, sombra, visitantes o duracion del viaje. Despues elige una actividad principal, una parada de comida y un plan B.',
  },
  {
    question: 'Que hacer en Arizona cuando hace demasiado calor?',
    answer:
      'En dias de mucho calor, evita caminatas expuestas al mediodia. Usa salidas temprano, museos, albercas, splash pads, sombra, lagos o destinos de mas elevacion.',
  },
  {
    question: 'Que viajes funcionan con ninos pequenos?',
    answer:
      'Los ninos pequenos suelen disfrutar mas planes con caminatas cortas, banos cercanos, sombra, snacks, salidas faciles y un horario realista.',
  },
  {
    question: 'Como planear Arizona con un grupo de amigos?',
    answer:
      'Elige una aventura principal, una comida facil, un punto de reunion claro y una opcion flexible para quienes quieran descansar, tomar fotos o hacer algo menos intenso.',
  },
];

type SituationCard = {
  title: string;
  need: string;
  plan: string;
  to: string;
  cta: string;
  icon: LucideIcon;
};

const situations: SituationCard[] = [
  {
    title: 'Tengo ninos pequenos',
    need: 'Banos, sombra, snacks, distancia corta y salida facil si alguien se cansa.',
    plan:
      'Busca caminatas cortas, parques con servicios, museos pequenos, agua cerca o un plan que no dependa de terminar una ruta larga.',
    to: '/trip-builder?plan=ready&location=arizona&kids=yes&ages=toddlers&bathrooms=true&shade=true&stroller=true&pace=easy&language=es',
    cta: 'Crear plan facil',
    icon: Baby,
  },
  {
    title: 'Hace demasiado calor en Phoenix',
    need: 'Salir temprano, evitar roca expuesta al mediodia y tener aire acondicionado cerca.',
    plan:
      'Usa actividades exteriores antes de las 9 AM, despues cambia a museo, alberca, splash pad, comida bajo techo o una escapada a pinos.',
    to: '/es/arizona/viajes-frescos-verano-con-ninos',
    cta: 'Ver viajes frescos',
    icon: Sun,
  },
  {
    title: 'Vienen familiares o amigos de visita',
    need: 'Algo que se sienta memorable sin convertir el dia en una carrera.',
    plan:
      'Elige una vista, una comida local, una caminata corta o mirador, y deja una opcion tranquila para fotos, cafes o helado.',
    to: '/arizona/day-trips-from-phoenix',
    cta: 'Ver viajes desde Phoenix',
    icon: Users,
  },
  {
    title: 'Solo tenemos medio dia',
    need: 'Poco manejo, poca friccion, estacionamiento simple y una actividad principal.',
    plan:
      'Escoge un solo destino, sal temprano, come cerca y no metas tres paradas grandes en cuatro horas.',
    to: '/trip-builder?plan=ready&location=phoenix&length=half-day&kids=yes&drive=45&pace=easy&food=nearby&language=es',
    cta: 'Armar medio dia',
    icon: Clock3,
  },
  {
    title: 'Queremos un fin de semana',
    need: 'Buen lugar base, comida facil, una aventura fuerte y una manana lenta.',
    plan:
      'Flagstaff, Payson, Prescott, Sedona o Grand Canyon funcionan mejor cuando el plan respira y no cada hora esta llena.',
    to: '/arizona/weekend-trips',
    cta: 'Ver fines de semana',
    icon: CalendarDays,
  },
  {
    title: 'Necesitamos banos, sombra y comida cerca',
    need: 'Un plan realista para ninos, abuelos, visitantes o grupos mixtos.',
    plan:
      'Prioriza parques, jardines, areas con centro de visitantes, rutas cortas y destinos donde el plan B esta a pocos minutos.',
    to: '/trip-builder?plan=ready&location=arizona&kids=yes&bathrooms=true&shade=true&food=nearby&pace=low-stress&language=es',
    cta: 'Crear plan comodo',
    icon: ShieldCheck,
  },
  {
    title: 'Queremos agua o pinos',
    need: 'Menos calor, mas sombra y una sensacion de escape desde Phoenix.',
    plan:
      'Payson, Mogollon Rim, Woods Canyon Lake, Flagstaff, Prescott y Pinetop pueden funcionar muy bien en verano.',
    to: '/arizona/payson-rim-country-with-kids',
    cta: 'Ir a pinos y lagos',
    icon: Trees,
  },
  {
    title: 'Vamos con un grupo de amigos',
    need: 'Opciones flexibles para distintas energias, presupuestos y horarios.',
    plan:
      'Usa una base facil, una actividad principal, comida compartida y una opcion extra para quien quiera mas aventura.',
    to: '/arizona/adventure-finder',
    cta: 'Comparar opciones',
    icon: Sparkles,
  },
];

const quickAnswers = [
  {
    title: 'Mejor para verano',
    answer: 'Payson, Flagstaff, Prescott, Show Low, Pinetop o planes bajo techo en Phoenix.',
    to: '/es/arizona/viajes-frescos-verano-con-ninos',
    icon: Droplets,
  },
  {
    title: 'Mejor para caminatas faciles',
    answer: 'Empieza con rutas cortas, sombra, banos cercanos y salida temprano.',
    to: '/arizona/hikes-with-kids',
    icon: Compass,
  },
  {
    title: 'Mejor desde Phoenix',
    answer: 'Cave Creek, Prescott, Payson, Sedona, Tucson o Flagstaff segun el tiempo de manejo.',
    to: '/arizona/day-trips-from-phoenix',
    icon: Car,
  },
  {
    title: 'Mejor para clima cambiante',
    answer: 'Ten un plan B: museo, comida, centro de visitantes, alberca o mirador corto.',
    to: '/es/arizona',
    icon: CloudSun,
  },
];

export default function SpanishPlanBySituation() {
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
        title="Planificar viajes por Arizona por situacion | Sage"
        description="Guia en espanol para escoger un viaje familiar por Arizona segun ninos pequenos, calor extremo, visitantes, medio dia, fines de semana, banos, sombra, agua o grupos de amigos."
        url={spanishUrl}
        faqs={situationFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en espanol', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Planificar por situacion', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-45">
          <img
            src="/images/payson-family-pine-forest.avif"
            alt="Familia explorando un bosque de pinos en Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/88 to-zinc-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/plan-by-situation"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-zinc-950"
            >
              English
            </Link>
            <span className="rounded-full bg-white px-4 py-2 text-zinc-950">
              Espanol
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Atajo para planear Arizona
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Planifica por situacion, no por adivinanza
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-100 md:text-xl">
            El mejor viaje por Arizona cambia segun el calor, la edad de los ninos, el tiempo de manejo, los banos, la sombra, el agua y si vienen familiares o amigos. Empieza con tu situacion real y Sage te ayuda a elegir mejor.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-emerald-200"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Crear mi plan
            </Link>
            <Link
              to="/es/arizona"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Guias en espanol
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickAnswers.map((answer) => {
            const Icon = answer.icon;
            return (
              <Link
                key={answer.title}
                to={answer.to}
                className="rounded-lg border border-emerald-100 bg-white p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {answer.title}
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-zinc-700">{answer.answer}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Escoge tu situacion
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            La respuesta depende de quien viene contigo
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Esta pagina funciona como un menu rapido para padres, familias, visitantes y grupos de amigos que quieren explorar Arizona sin sobreplanear.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {situations.map((situation) => {
            const Icon = situation.icon;
            return (
              <Link
                key={situation.title}
                to={situation.to}
                className="group rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 transition group-hover:bg-emerald-100 group-hover:text-emerald-800">
                    {situation.cta}
                  </span>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-zinc-950">{situation.title}</h3>
                <p className="mt-3 text-sm font-black uppercase leading-6 tracking-[0.12em] text-zinc-500">
                  {situation.need}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{situation.plan}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Regla simple
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Primero seguridad, despues aventura
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600">
              Una aventura increible no tiene que ser complicada. En Arizona, la mejor experiencia suele venir de elegir el horario correcto, llevar agua, saber donde estan los banos y tener una salida facil si el grupo se cansa.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-100 bg-white p-5">
            <ShieldCheck className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
            <ul className="space-y-3 text-sm leading-7 text-zinc-600">
              <li>Con calor fuerte, lo exterior va temprano o se cambia por interior.</li>
              <li>Con ninos pequenos, reduce distancia y aumenta descansos.</li>
              <li>Con visitantes, elige una vista memorable y comida facil.</li>
              <li>Con grupos grandes, deja opciones para distintos niveles de energia.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
          FAQ
        </p>
        <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Preguntas rapidas
        </h2>
        <div className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-100 bg-white">
          {situationFaqs.map((faq) => (
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
