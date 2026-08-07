import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bus,
  Camera,
  Car,
  CloudRain,
  Compass,
  Droplets,
  ExternalLink,
  MapPin,
  Mountain,
  ShieldCheck,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/sedona-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/arizona/sedona';

const spanishFaqs = [
  {
    question: '¿Sedona es un buen destino para viajar con niños?',
    answer:
      'Sí. Sedona ofrece vistas de roca roja, caminatas de distintas dificultades, parques y recorridos panorámicos. El mejor plan familiar combina una sola aventura principal, una comida sencilla y tiempo flexible.',
  },
  {
    question: '¿Qué caminatas de Sedona funcionan mejor con niños?',
    answer:
      'Depende de la edad, experiencia y clima. Bell Rock Pathway permite ajustar la distancia; Little Horse ofrece vistas sin exigir una cumbre; y Soldier Pass puede hacerse como una caminata parcial. Cathedral Rock y Devil’s Bridge requieren más cuidado, condición y control cerca de zonas expuestas.',
  },
  {
    question: '¿Cómo funciona el Sedona Shuttle?',
    answer:
      'El servicio a trailheads es gratuito, no requiere reservación y normalmente opera de jueves a domingo durante todo el año, con servicio ampliado en algunas temporadas y días festivos. Atiende Cathedral Rock, Little Horse, Soldier Pass, Dry Creek Vista y Mescal. Siempre revisen el calendario oficial antes de salir.',
  },
  {
    question: '¿Se necesita un Red Rock Pass para visitar Sedona?',
    answer:
      'Algunos sitios recreativos y trailheads administrados por el Bosque Nacional requieren un pase, mientras otros lugares tienen tarifas distintas o aceptan otros pases. Confirmen el sitio exacto antes del viaje; no asuman que un solo pase funciona en todas partes.',
  },
  {
    question: '¿Cuál es la mejor hora para caminar en Sedona con niños?',
    answer:
      'La mañana suele ser la opción más segura y tranquila. En meses calurosos, salgan temprano y eviten roca expuesta al mediodía. Durante el monzón, revisen el pronóstico y estén preparados para tormentas, rayos y crecidas repentinas.',
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
  { icon: Car, label: 'Desde Phoenix', value: 'Aprox. 2 horas, más con tráfico' },
  { icon: Users, label: 'Ideal para', value: 'Familias, visitas y grupos pequeños' },
  { icon: Bus, label: 'Shuttle', value: 'Gratis; revisen días y rutas oficiales' },
  { icon: CloudRain, label: 'Ojo con', value: 'Calor, monzón, multitudes y bordes' },
];

const familyPlans = [
  {
    title: 'Primera visita sin complicaciones',
    bestFor: 'Niños pequeños, abuelos o poca experiencia',
    plan:
      'Empiecen temprano con Bell Rock Pathway o una parada panorámica, coman antes de la hora fuerte y dejen la tarde para Tlaquepaque, un parque o descanso.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=es',
  },
  {
    title: 'Día de shuttle y roca roja',
    bestFor: 'Familias con niños mayores que caminan bien',
    plan:
      'Estacionen en el Park & Ride correcto y usen el shuttle para Little Horse, Soldier Pass o una ruta apropiada para su grupo. Confirmen el último regreso antes de caminar.',
    to: 'https://sedonashuttle.com/trailhead-shuttles/',
    external: true,
  },
  {
    title: 'Fin de semana familiar',
    bestFor: 'Menos prisa y más margen para clima o tráfico',
    plan:
      'Día uno: caminata corta y comida. Día dos: recorrido panorámico, pueblo, parque o segunda salida temprana. Eviten llenar cada hora con una parada.',
    to: '/es/arizona/escapadas-fin-de-semana-con-ninos',
  },
];

const outingIdeas = [
  {
    title: 'Bell Rock Pathway',
    icon: Mountain,
    level: 'Flexible',
    text:
      'Buena opción para caminar solo la distancia que funcione para el grupo. No hace falta subir por roca empinada para disfrutar las vistas.',
  },
  {
    title: 'Little Horse',
    icon: MapPin,
    level: 'Familias activas',
    text:
      'Acceso por shuttle en días de servicio y vistas grandes. Den la vuelta antes de que el calor o el cansancio mande.',
  },
  {
    title: 'Soldier Pass parcial',
    icon: Compass,
    level: 'Niños mayores',
    text:
      'La ruta permite visitar puntos como Devil’s Kitchen y Seven Sacred Pools sin completar todo el recorrido. Usen shuttle cuando corresponda.',
  },
  {
    title: 'Oak Creek y sombra',
    icon: Droplets,
    level: 'Plan de descanso',
    text:
      'Una zona de picnic o agua puede bajar el ritmo, pero verifiquen tarifas, estacionamiento, corrientes, calidad del agua y riesgo de crecida.',
  },
];

const safetyChecks = [
  'Revisen el pronóstico oficial, cierres y humo antes de salir.',
  'Empiecen temprano; la roca expuesta se calienta y ofrece poca sombra.',
  'Cada persona debe llevar agua. Agreguen snacks salados y protección solar.',
  'No permitan que los niños corran cerca de bordes, slickrock o zonas de caída.',
  'Durante el monzón, aléjense de cauces y suban a terreno alto si el agua empieza a crecer.',
  'Guarden una captura del mapa y sepan cuál es el último shuttle de regreso.',
];

const quickPlanText = [
  'Plan familiar sencillo para Sedona:',
  '',
  '1. Revisar clima, shuttle y estacionamiento',
  '2. Salir temprano para una sola aventura principal',
  '3. Llevar agua, snacks y protección solar',
  '4. Comer y descansar antes de que todos se agoten',
  '5. Mantener un plan B: parque, pueblo, recorrido panorámico o regreso temprano',
  '',
  'Regla Sage: una aventura, una comida y un plan B.',
  `Guía: ${spanishUrl}`,
].join('\n');

const voteText = [
  '¿Qué hacemos en Sedona?',
  '',
  '1. Bell Rock a nuestro propio ritmo',
  '2. Little Horse usando el shuttle',
  '3. Soldier Pass parcial con niños mayores',
  '4. Vistas, comida y un plan tranquilo',
  '',
  'Respondan con un número y armamos el día.',
  `Guía: ${spanishUrl}`,
].join('\n');

export default function SpanishSedonaWithKids() {
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
        title="Sedona con niños | Guía familiar de caminatas y shuttle | Sage"
        description="Guía en español para visitar Sedona con niños: caminatas familiares, shuttle gratuito, estacionamiento, calor, monzón, pases, seguridad y un plan realista."
        url={spanishUrl}
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Arizona en español', url: 'https://sage.healthandtravels.com/es/arizona' },
          { name: 'Sedona con niños', url: spanishUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-55">
          <img
            src="/images/sedona-family.avif"
            alt="Familia contemplando las formaciones de roca roja de Sedona, Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/25" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/sedona"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950"
            >
              English
            </Link>
            <span className="rounded-full bg-teal-100 px-4 py-2 text-teal-950">Español</span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-teal-200">
            Guía familiar de roca roja
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Sedona con niños
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
            Caminatas, shuttle, estacionamiento y seguridad explicados para que la familia
            disfrute las vistas sin convertir el día en una carrera agotadora.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=es"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-800"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Crear mi plan
            </Link>
            <a
              href="https://sedonashuttle.com/trailhead-shuttles/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Bus className="h-4 w-4" aria-hidden="true" />
              Revisar el shuttle
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
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">Escoge el ritmo</p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Tres formas de hacer Sedona</h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              La mejor versión de Sedona no es la que incluye más paradas. Es la que coincide
              con la edad, energía y experiencia real de su grupo.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {familyPlans.map((mode) => {
              const content = (
                <>
                  <h3 className="text-xl font-black tracking-tight text-zinc-950">{mode.title}</h3>
                  <p className="mt-3 rounded-lg bg-teal-50 p-3 text-xs font-black uppercase tracking-wide text-teal-800">{mode.bestFor}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{mode.plan}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700">
                    Abrir idea {mode.external && <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
                  </span>
                </>
              );

              return mode.external ? (
                <a key={mode.title} href={mode.to} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">{content}</a>
              ) : (
                <Link key={mode.title} to={mode.to} className="flex h-full flex-col rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">{content}</Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-teal-100 bg-teal-50/60 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">Ideas familiares</p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Elijan una aventura principal</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {outingIdeas.map((outing) => {
              const Icon = outing.icon;
              return (
                <article key={outing.title} className="rounded-xl border border-teal-100 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-teal-700" aria-hidden="true" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-black tracking-tight">{outing.title}</h3>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-teal-800">{outing.level}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{outing.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">Seguridad local</p>
            <h2 className="text-3xl font-black uppercase tracking-tight">Antes de bajar del auto</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Sedona parece fácil porque la ciudad está cerca. El terreno sigue siendo desierto,
              roca expuesta y clima de montaña.
            </p>
          </div>
          <div className="grid gap-3">
            {safetyChecks.map((check) => (
              <div key={check} className="flex gap-3 rounded-xl border border-zinc-100 bg-white p-4">
                <ShieldCheck className="mt-1 h-5 w-5 flex-none text-teal-700" aria-hidden="true" />
                <p className="text-sm leading-7 text-zinc-700">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-slate-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Camera className="mb-4 h-8 w-8 text-teal-200" aria-hidden="true" />
            <h2 className="text-3xl font-black uppercase tracking-tight">Logística que evita problemas</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              En días de shuttle, algunos trailheads tienen restricciones de estacionamiento.
              No dependan de encontrar un lugar al llegar.
            </p>
          </div>
          <div className="space-y-4 text-sm leading-7 text-zinc-200">
            <p>El shuttle oficial es gratuito y no necesita reservación. Verifiquen el Park &amp; Ride, la ruta, el calendario y el último regreso.</p>
            <p>Cathedral Rock, Little Horse, Soldier Pass, Dry Creek Vista y Mescal están entre los trailheads atendidos.</p>
            <p>Las tarifas y pases cambian según el sitio. Confirmen cada destino directamente antes de manejar.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://sedonashuttle.com/how-to-ride/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-700 px-5 py-2.5 font-black text-white transition hover:bg-blue-800">Cómo usar el shuttle</a>
              <a href="https://www.fs.usda.gov/r03/coconino/recreation/trails" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-5 py-2.5 font-black text-white transition hover:bg-white/10">Bosque Nacional</a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <SharePlanPanel
            title="Compartir este plan de Sedona"
            description="Manda una versión corta al grupo para escoger el ritmo antes de salir."
            quickPlanText={quickPlanText}
            voteText={voteText}
            eventContext="spanish_sedona_with_kids"
            locale="es"
          />
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black uppercase tracking-tight">Siguientes guías útiles</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ['Arizona en español', '/es/arizona'],
              ['Caminatas con niños', '/es/arizona/caminatas-con-ninos'],
              ['Viajes desde Phoenix', '/es/arizona/viajes-de-un-dia-desde-phoenix'],
              ['Fines de semana familiares', '/es/arizona/escapadas-fin-de-semana-con-ninos'],
              ['Guía de Sedona en inglés', '/arizona/sedona'],
              ['Crear plan en Sage', '/trip-builder?language=es&location=sedona'],
            ].map(([label, to]) => (
              <Link key={to} to={to} className="rounded-xl border border-zinc-100 bg-white p-4 text-sm font-black text-zinc-800 transition hover:border-teal-200 hover:text-teal-700">{label}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
