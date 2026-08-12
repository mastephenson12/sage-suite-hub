import React from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Car,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  Mountain,
  ShieldCheck,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import CloudinaryImage from '../components/CloudinaryImage';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/payson-y-mogollon-rim-con-ninos';
const englishUrl =
  'https://sage.healthandtravels.com/arizona/payson-rim-country-with-kids';

const spanishFaqs = [
  {
    question: 'Payson es bueno para un viaje familiar desde Phoenix?',
    answer:
      'Si. Payson y Mogollon Rim funcionan muy bien para familias porque el manejo desde Phoenix es razonable, hay mas elevacion, pinos, lagos, miradores y planes faciles para bajar el ritmo.',
  },
  {
    question: 'Que hacer en Payson con ninos?',
    answer:
      'Buenas ideas incluyen Woods Canyon Lake, Green Valley Park, miradores del Mogollon Rim, picnic entre pinos, caminatas cortas, Water Wheel area cuando las condiciones son seguras y tiempo flexible para comer o descansar.',
  },
  {
    question: 'Payson es mas fresco que Phoenix en verano?',
    answer:
      'Normalmente si por la elevacion, pero no es magia. Revisen el clima, monzones, humo, caminos forestales y lleven agua suficiente aunque se sienta mas fresco que Phoenix.',
  },
  {
    question: 'Payson funciona como viaje de un dia o fin de semana?',
    answer:
      'Puede funcionar de las dos formas. Para un dia, elijan una aventura principal y una comida. Para fin de semana, agreguen lago, miradores, descanso y un plan B si entra tormenta.',
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
  { icon: Car, label: 'Manejo desde Phoenix', value: 'Aprox. 1.5 a 2 horas' },
  { icon: Trees, label: 'Mejor sensacion', value: 'Pinos, lago y aire de montana' },
  { icon: Users, label: 'Ideal para', value: 'Familias, visitas y grupos de amigos' },
  { icon: CloudSun, label: 'Ojo con', value: 'Monzones, calor y caminos forestales' },
];

const tripModes = [
  {
    title: 'Viaje facil de un dia',
    bestFor: 'Ninos pequenos, primera visita, poco estres',
    plan:
      'Escoge un solo lugar principal: Green Valley Park, un mirador del Rim o Woods Canyon Lake. Agrega comida sencilla y vuelve antes de que el grupo este agotado.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=relax&length=full-day&season=summer&shade=true&bathrooms=true&language=es',
  },
  {
    title: 'Fin de semana en Rim Country',
    bestFor: 'Calor de Phoenix, pinos, lago y descanso',
    plan:
      'Usa Payson como base. Haz lago o mirador temprano, deja la tarde flexible para tormentas, comida, siesta o tiempo tranquilo.',
    to: '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim',
  },
  {
    title: 'Plan para amigos o varias familias',
    bestFor: 'Diferentes edades y niveles de energia',
    plan:
      'Construye el dia alrededor de una vista grande, una caminata corta o lago, y una comida compartida. Menos paradas casi siempre mejora la experiencia.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=friends&activity=explore&length=weekend&season=summer&shade=true&bathrooms=true&language=es',
  },
];

const anchorStops = [
  {
    title: 'Woods Canyon Lake',
    icon: Droplets,
    text:
      'La opcion mas clara para sentir agua, pinos y aire mas fresco. Lleguen temprano en fines de semana y revisen estacionamiento.',
  },
  {
    title: 'Miradores del Mogollon Rim',
    icon: Mountain,
    text:
      'Perfectos para el momento de foto y asombro sin exigir una caminata larga. Mantengan a los ninos lejos de bordes expuestos.',
  },
  {
    title: 'Green Valley Park',
    icon: Trees,
    text:
      'Un descanso facil en Payson con espacio para caminar, comer algo y resetear al grupo antes de volver a la carretera.',
  },
  {
    title: 'Water Wheel area',
    icon: Compass,
    text:
      'Mas aventurero y muy dependiente de condiciones. Revisen agua, footing, clima y seguridad antes de convertirlo en el plan principal.',
  },
];

const safetyChecks = [
  'Salgan temprano, especialmente en verano o fines de semana.',
  'Revisen monzones, humo, cierres y caminos forestales antes de subir.',
  'Lleven mas agua de la que creen necesitar, aunque esten entre pinos.',
  'Tengan comida simple, banos ubicados y una parada de descanso.',
  'Elijan un plan B: parque, comida bajo techo, regreso temprano o pausa en Payson.',
];

const photoChecklist = [
  'Una foto hero con pinos, lago o vista del Rim.',
  'Una foto familiar caminando, comiendo o mirando el paisaje.',
  'Una foto de senal: Woods Canyon Lake, Payson, Rim Road o trailhead.',
  'Una foto de detalles: agua, nubes, pinos, piedras, picnic o botas.',
];

const quickPlanText = [
  'Plan familiar para Payson y Mogollon Rim:',
  '',
  '1. Salir temprano desde Phoenix',
  '2. Elegir una aventura principal: Woods Canyon Lake, mirador del Rim, Green Valley Park o Water Wheel area',
  '3. Agregar comida facil y banos',
  '4. Mantener la tarde flexible por monzon, cansancio o trafico',
  '',
  'Regla Sage: una aventura principal, una comida, un plan B.',
  `Guia: ${spanishUrl}`,
].join('\n');

const voteText = [
  'Que plan hacemos en Payson / Mogollon Rim?',
  '',
  '1. Woods Canyon Lake',
  '2. Miradores del Mogollon Rim',
  '3. Green Valley Park y comida facil',
  '4. Water Wheel area si las condiciones estan bien',
  '',
  'Respondan con un numero y armamos el plan.',
  `Guia: ${spanishUrl}`,
].join('\n');

export default function SpanishPaysonRimCountryWithKids() {
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
        title="Payson y Mogollon Rim con ninos | Guia familiar en Arizona | Sage"
        description="Guia en espanol para planear Payson y Mogollon Rim con ninos desde Phoenix: Woods Canyon Lake, miradores, pinos, picnic, seguridad, monzones y ritmo familiar."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en espanol', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Payson y Mogollon Rim con ninos', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-40">
          <CloudinaryImage
            src="/images/payson-rim-overlook.avif"
            alt="Vista de pinos y montanas cerca de Payson y Mogollon Rim"
            className="h-full w-full object-cover"
            widthHint={1600}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/payson-rim-country-with-kids"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              English
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Espanol
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Guia familiar desde Phoenix
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Payson y Mogollon Rim con ninos
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            Una escapada de montana para familias que quieren pinos, agua, vistas
            y menos calor sin convertir el dia en una carrera de paradas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&shade=true&bathrooms=true&language=es"
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
              Ver viajes frescos
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-zinc-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-lg border border-zinc-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">
                  {stat.value}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Escoge el ritmo
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Dia, fin de semana o grupo
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              Payson funciona mejor cuando el plan tiene una prioridad clara.
              Dejen que el lugar respire y no intenten meter todo en una sola salida.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {tripModes.map((mode) => (
              <Link
                key={mode.title}
                to={mode.to}
                className="flex h-full flex-col rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <h3 className="text-xl font-black tracking-tight text-zinc-950">
                  {mode.title}
                </h3>
                <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs font-black uppercase tracking-wide text-emerald-800">
                  {mode.bestFor}
                </p>
                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">
                  {mode.plan}
                </p>
                <span className="mt-5 inline-flex text-xs font-black uppercase tracking-widest text-emerald-700">
                  Abrir idea
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-emerald-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Lugares base
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Construye el plan alrededor de uno
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {anchorStops.map((stop) => {
              const Icon = stop.icon;
              return (
                <article key={stop.title} className="rounded-lg border border-emerald-100 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                  <h3 className="text-xl font-black tracking-tight">{stop.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{stop.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Seguridad local
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Lo que revisaria antes de salir
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              El plan ganador para Rim Country no es complicado. Es temprano,
              flexible y honesto con el clima.
            </p>
          </div>
          <div className="grid gap-3">
            {safetyChecks.map((check) => (
              <div key={check} className="flex gap-3 rounded-lg border border-zinc-100 bg-white p-4">
                <ShieldCheck className="mt-1 h-5 w-5 flex-none text-emerald-700" aria-hidden="true" />
                <p className="text-sm leading-7 text-zinc-700">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Camera className="mb-4 h-8 w-8 text-emerald-300" aria-hidden="true" />
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Fotos que hacen la pagina mas util
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Para esta guia, las mejores fotos no son solo bonitas. Deben ayudar
              a una familia a imaginar el camino, el clima, el terreno y el ritmo.
            </p>
          </div>
          <div className="grid gap-3">
            {photoChecklist.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-7 text-zinc-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <SharePlanPanel
            title="Compartir este plan de Payson"
            description="Manda una version corta al grupo para votar antes de salir."
            quickPlanText={quickPlanText}
            voteText={voteText}
            eventContext="spanish_payson_rim_country"
            locale="es"
          />
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Siguientes guias utiles
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ['Viajes de un dia desde Phoenix', '/es/arizona/viajes-de-un-dia-desde-phoenix'],
              ['Viajes frescos de verano', '/es/arizona/viajes-frescos-verano-con-ninos'],
              ['Caminatas con ninos', '/es/arizona/caminatas-con-ninos'],
              ['Planificar por situacion', '/es/arizona/planificar-por-situacion'],
              ['Guia de Payson en ingles', '/arizona/payson-rim-country-with-kids'],
              ['Crear plan en Sage', '/trip-builder?language=es'],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black text-zinc-800 transition hover:border-emerald-200 hover:text-emerald-700"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
