import React from 'react';
import { Link } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';

const spanishFaqs = [
  {
    question: 'Que hacer en Phoenix con ninos cuando hace demasiado calor?',
    answer:
      'Lo mejor es salir muy temprano, usar actividades bajo techo durante el mediodia, planear alberca o descanso en la tarde, y dejar cualquier caminata expuesta para otro dia.',
  },
  {
    question: 'Es seguro caminar con ninos en Phoenix durante calor extremo?',
    answer:
      'No es buena idea hacer caminatas expuestas durante calor extremo. Si la familia sale, debe ser muy temprano, con agua, sombra, gorra, protector solar y un plan corto para regresar rapido.',
  },
  {
    question: 'Cual es un buen plan familiar para un dia caluroso en Phoenix?',
    answer:
      'Hagan una parada exterior corta temprano, luego un museo o actividad bajo techo, comida en interior, descanso o alberca en la tarde, y una salida suave al atardecer si todos tienen energia.',
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

export default function SpanishPhoenixHeatPage() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;

    document.documentElement.lang = 'es';
    setAlternateLink(
      'es',
      'https://sage.healthandtravels.com/es/archive/phoenix-things-to-do-with-kids-when-hot'
    );
    setAlternateLink(
      'en',
      'https://sage.healthandtravels.com/archive/phoenix-things-to-do-with-kids-when-hot'
    );
    setAlternateLink(
      'x-default',
      'https://sage.healthandtravels.com/archive/phoenix-things-to-do-with-kids-when-hot'
    );

    return () => {
      document.documentElement.lang = previousLang || 'en';
    };
  }, []);

  return (
    <article className="min-h-screen bg-white pb-20 text-zinc-900">
      <SEOJsonLd
        title="Que hacer en Phoenix con ninos cuando hace demasiado calor | Sage"
        description="Guia familiar en espanol para planear Phoenix con ninos durante calor extremo: actividades bajo techo, alberca, splash pads, comida, sombra y salidas tempranas."
        url="https://sage.healthandtravels.com/es/archive/phoenix-things-to-do-with-kids-when-hot"
        faqs={spanishFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Archivo en espanol', url: 'https://sage.healthandtravels.com/es/archive/phoenix-things-to-do-with-kids-when-hot' },
        ]}
      />

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/phoenix-sunset-hike.avif"
            alt="Paisaje del desierto de Phoenix al atardecer"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/archive/phoenix-things-to-do-with-kids-when-hot"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-zinc-950"
            >
              English
            </Link>
            <span className="rounded-full bg-orange-500 px-4 py-2 text-white">
              Espanol
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">
            Guia familiar de Phoenix
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Que hacer en Phoenix con ninos cuando hace demasiado calor
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 md:text-xl">
            Phoenix todavia puede funcionar con ninos en verano, pero el plan
            tiene que respetar el calor: salir temprano, estar bajo techo al
            mediodia, usar agua o descanso en la tarde, y evitar cualquier cosa
            heroica.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pt-12">
        <section className="rounded-[2rem] border border-orange-200 bg-orange-50 p-6 md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-700">
            Respuesta rapida
          </p>
          <h2 className="text-3xl font-black tracking-tight">
            El mejor ritmo para un dia caluroso con ninos
          </h2>
          <ul className="mt-5 space-y-3 text-base leading-8 text-zinc-700">
            <li>
              <strong>6:00-8:30 AM:</strong> parada corta afuera, parque con sombra,
              zoologico temprano o vista facil del desierto.
            </li>
            <li>
              <strong>9:30-11:30 AM:</strong> museo, acuario, juego bajo techo,
              biblioteca, desayuno o brunch.
            </li>
            <li>
              <strong>12:00-4:30 PM:</strong> aire acondicionado, alberca, siesta,
              cine, centro comercial o descanso en el hotel.
            </li>
            <li>
              <strong>5:30 PM o despues:</strong> cena, splash pad, paseo al
              atardecer o caminata muy corta con sombra.
            </li>
          </ul>
        </section>

        <section className="prose prose-zinc prose-lg mt-12 max-w-none">
          <h2>Mejores paradas temprano al aire libre</h2>
          <h3>Papago Park</h3>
          <p>
            Papago funciona mejor al amanecer o muy temprano. Mantengan la visita
            corta: Hole-in-the-Rock, unas fotos, agua, y salida antes de que las
            rocas empiecen a guardar demasiado calor.
          </p>

          <h3>Phoenix Zoo o Desert Botanical Garden</h3>
          <p>
            Pueden funcionar si llegan temprano y aceptan que sombra no es lo
            mismo que aire acondicionado. Salgan cuando todos todavia se sienten
            bien.
          </p>

          <h3>Parques de vecindario</h3>
          <p>
            Con ninos pequenos, elijan banos, sombra, estacionamiento y una salida
            facil antes que una vista famosa. Un parque simple puede ganar contra
            una caminata en el desierto cuando hace mucho calor.
          </p>

          <h2>Mejores actividades bajo techo en Phoenix</h2>
          <p>Usen una actividad bajo techo como ancla del mediodia:</p>
          <ul>
            <li>Arizona Science Center para energia practica y curiosa.</li>
            <li>Children's Museum of Phoenix para ninos pequenos.</li>
            <li>Heard Museum para arte, cultura y un ritmo mas tranquilo.</li>
            <li>OdySea Aquarium o actividades bajo techo en Scottsdale.</li>
            <li>Biblioteca, cine, area de juegos bajo techo o centro comercial.</li>
          </ul>

          <h2>Splash pads, albercas y descansos con agua</h2>
          <p>
            En Phoenix, el agua no es un extra. Muchas veces es el plan. Lleven
            sandalias, ropa seca, snacks y una toalla aunque la parada parezca
            casual.
          </p>

          <h2>Estrategia de comida</h2>
          <p>
            Escojan la comida antes de salir. Calor mas ninos con hambre es donde
            los planes familiares se complican rapido.
          </p>
          <ul>
            <li>Estacionamiento facil.</li>
            <li>Mesas bajo techo.</li>
            <li>Menu amigable para ninos.</li>
            <li>Opciones sin gluten si su familia las necesita.</li>
            <li>Ubicacion cerca del proximo descanso, no al otro lado de la ciudad.</li>
          </ul>

          <h2>Reglas de calor que Sage usa</h2>
          <ul>
            <li>Caminatas antes de las 9:00 AM cuando el calor es peligroso.</li>
            <li>No caminatas expuestas al mediodia.</li>
            <li>Actividades bajo techo desde media manana hasta la tarde.</li>
            <li>Agua, sombra, gorras, protector solar y tiempos realistas.</li>
            <li>Un plan B que no dependa de que todos sean fuertes.</li>
          </ul>

          <h2>Un itinerario facil para un dia de calor en Phoenix</h2>
          <p>
            <strong>Manana:</strong> Papago Park o una parada corta con sombra.
            <br />
            <strong>Media manana:</strong> Arizona Science Center, Children's
            Museum, Heard Museum u OdySea Aquarium.
            <br />
            <strong>Comida:</strong> restaurante bajo techo elegido antes de salir.
            <br />
            <strong>Tarde:</strong> alberca, siesta, cine, centro comercial o hotel.
            <br />
            <strong>Noche:</strong> splash pad, cena facil o paseo al atardecer.
          </p>

          <h2>Guias relacionadas</h2>
          <ul>
            <li>
              <Link to="/archive/phoenix-things-to-do-with-kids-when-hot">
                English version: Phoenix with kids when it is too hot
              </Link>
            </li>
            <li>
              <Link to="/archive/phoenix-toddler-friendly-parks">
                Parques faciles para ninos pequenos en Phoenix
              </Link>
            </li>
            <li>
              <Link to="/trail-guides/papago-park">Guia familiar de Papago Park</Link>
            </li>
            <li>
              <Link to="/arizona/hikes-with-kids">Caminatas en Arizona con ninos</Link>
            </li>
          </ul>
        </section>

        <div className="mt-12 rounded-[2rem] bg-zinc-950 p-6 text-white md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-300">
            Planear con Sage
          </p>
          <h2 className="text-3xl font-black tracking-tight">
            Construye un dia familiar seguro para el calor
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
            Usa Sage para ajustar el plan por edad, sombra, banos, distancia en
            carro y nivel de calor.
          </p>
          <Link
            to="/trip-builder?plan=ready&location=phoenix&kids=yes&activity=indoor-outdoor&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&stroller=true&drive=60&heat=extreme"
            className="mt-6 inline-flex rounded-2xl bg-orange-500 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
          >
            Planear mi dia en Phoenix
          </Link>
        </div>
      </div>
    </article>
  );
}
