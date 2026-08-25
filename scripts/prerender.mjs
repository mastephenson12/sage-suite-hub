import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://sage.healthandtravels.com';
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const startHerePath = 'start-here';
const spanishArizonaPath = 'es/arizona';
const spanishPlanBySituationPath = 'es/arizona/planificar-por-situacion';
const spanishHikesWithKidsPath = 'es/arizona/caminatas-con-ninos';
const spanishWeekendTripsPath = 'es/arizona/escapadas-fin-de-semana-con-ninos';
const spanishSedonaPath = 'es/arizona/sedona-con-ninos';
const spanishFlagstaffPath = 'es/arizona/flagstaff-con-ninos';
const russianArizonaPath = 'ru';
const russianPlanBySituationPath = 'ru/arizona/plan-by-situation';
const russianSedonaPath = 'ru/arizona/sedona-with-kids';
const spanishPhoenixHeatPath = 'es/archive/phoenix-con-ninos-cuando-hace-calor';
const legacySpanishPhoenixHeatPath =
  'es/archive/phoenix-things-to-do-with-kids-when-hot';
const germanDayTripsPath = 'de/arizona/tagesausfluege-ab-phoenix';
const englishArizonaPath = 'arizona';
const englishPlanBySituationPath = 'arizona/plan-by-situation';
const englishPhoenixHeatPath =
  'archive/phoenix-things-to-do-with-kids-when-hot';

const destinations = [
  ['sedona', 'Sedona'],
  ['flagstaff', 'Flagstaff'],
  ['payson', 'Payson'],
  ['prescott', 'Prescott'],
  ['cave-creek', 'Cave Creek'],
  ['page', 'Page'],
  ['tucson', 'Tucson'],
  ['grand-canyon', 'Grand Canyon'],
  ['show-low', 'Show Low'],
  ['pinetop-lakeside', 'Pinetop-Lakeside'],
  ['bisbee', 'Bisbee'],
  ['williams', 'Williams'],
  ['cottonwood', 'Cottonwood'],
  ['jerome', 'Jerome'],
  ['lake-havasu', 'Lake Havasu'],
  ['yuma', 'Yuma'],
].map(([slug, name]) => ({
  slug,
  name,
  faqs: [
    {
      question: `Is ${name} good for a family Arizona adventure?`,
      answer: `Yes. ${name} can work well for families when you match the plan to the season, trail difficulty, heat, and group energy level.`,
    },
    {
      question: `How should families plan a trip to ${name}?`,
      answer: `Start with one outdoor activity, add a nearby food stop, choose realistic lodging, and check safety notes before you go.`,
    },
  ],
}));

const startHereFaqs = [
  {
    question: 'How should I start planning an Arizona family adventure?',
    answer:
      'Start with your real situation: little kids, heat, visitors, half-day timing, bathrooms, shade, water, or a weekend trip. Then choose one outdoor anchor, one reset stop, and one backup plan.',
  },
  {
    question: 'Can Sage help parents and groups choose the right Arizona trip?',
    answer:
      'Yes. Sage points parents, visitors, and groups of friends toward Arizona guides and planner paths based on age, weather, drive time, shade, bathrooms, food, and group energy.',
  },
  {
    question: 'What is the fastest way to use Sage?',
    answer:
      'Use the Start Here chooser, pick the situation that fits your day, and then open the suggested guide or pre-filled trip builder path.',
  },
];

const exploreFaqs = [
  {
    question: 'What can I find in the Sage Explore Directory?',
    answer:
      'The Sage Explore Directory links to Arizona family adventure hubs, destination guides, trail guides, archive itineraries, and companion Health and Travels articles.',
  },
  {
    question: 'Is this page useful for planning Arizona trips?',
    answer:
      'Yes. It is built as a simple starting point for families who want to compare Arizona destinations, hikes, seasonal ideas, safety notes, and ready-made itineraries.',
  },
];

const arizonaFaqs = [
  {
    question: 'What is the best way to plan an Arizona family adventure?',
    answer:
      'Start with the destination, choose outdoor activities first, add food and lodging nearby, and check heat, elevation, and trail difficulty before you go.',
  },
  {
    question: 'Can Sage help me choose beginner-friendly Arizona hikes?',
    answer:
      'Yes. Sage is built to help families and beginner adventurers compare destinations, easy trails, timing, food stops, and safety notes.',
  },
  {
    question: 'Which Arizona destinations are good for families?',
    answer:
      'Sedona, Flagstaff, Payson, Prescott, Cave Creek, Page, Tucson, Grand Canyon, Show Low, Pinetop-Lakeside, Bisbee, Williams, Cottonwood, Jerome, Lake Havasu, and Yuma can all work well when the plan matches the season and hiking level.',
  },
];

const planBySituationFaqs = [
  {
    question: 'How do I choose the best Arizona family trip for my situation?',
    answer:
      'Start with the real constraint: heat, kid ages, drive time, bathrooms, shade, visitors, or weekend length. Then choose one outdoor anchor, one food stop, and one backup plan.',
  },
  {
    question: 'What should families do in Arizona when it is too hot?',
    answer:
      'On very hot days, avoid exposed midday trails and use early starts, indoor anchors, pools, splash pads, shaded parks, lakes, or higher-elevation destinations.',
  },
  {
    question: 'What Arizona trips work well with toddlers?',
    answer:
      'Toddlers usually do best with short walks, bathrooms nearby, shade, snacks, stroller-friendly or easy-exit paths, and a realistic schedule.',
  },
];

const spanishArizonaFaqs = [
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
];

const spanishPlanBySituationFaqs = [
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
];

const spanishHikesWithKidsFaqs = [
  {
    question: 'Cuales son buenas caminatas en Arizona con ninos?',
    answer:
      'Buenas caminatas con ninos son cortas, faciles de abandonar, adecuadas para la temporada y cercanas a banos, comida, sombra o agua.',
  },
  {
    question: 'Cuanto debe durar una caminata familiar en Arizona?',
    answer:
      'Para muchas familias, lo mejor es empezar con caminatas de menos de 2 millas, especialmente con ninos pequenos, visitantes o calor.',
  },
  {
    question: 'A que hora es mejor caminar con ninos en Arizona?',
    answer:
      'La manana suele ser la mejor opcion. En verano, las familias deben elegir elevacion, sombra, agua, salidas muy temprano y un plan B.',
  },
];

const spanishFlagstaffFaqs = [
  {
    question: '¿Flagstaff es un buen destino para viajar con niños?',
    answer:
      'Sí. Flagstaff combina bosque de pinos, clima más fresco que Phoenix, parques, caminatas, astronomía y opciones bajo techo. Una aventura principal y tiempo para comida y descanso suelen producir el mejor día familiar.',
  },
  {
    question: '¿Cuál es la mejor época para visitar Flagstaff con niños?',
    answer:
      'El verano funciona bien para escapar del calor del desierto; el otoño trae clima fresco; y el invierno puede incluir nieve, hielo y cierres. Revisen tormentas durante el monzón y carreteras durante el invierno.',
  },
  {
    question: '¿Se puede visitar Flagstaff en un solo día desde Phoenix?',
    answer:
      'Sí, pero es un día largo. Escojan una sola actividad principal y salgan temprano. Dormir una noche permite combinar bosque y Lowell Observatory sin manejar cansados.',
  },
];

const spanishSedonaFaqs = [
  {
    question: '¿Sedona es un buen destino para viajar con niños?',
    answer:
      'Sí. Sedona ofrece vistas de roca roja, caminatas de distintas dificultades, parques y recorridos panorámicos. El mejor plan familiar combina una sola aventura principal, una comida sencilla y tiempo flexible.',
  },
  {
    question: '¿Cómo funciona el Sedona Shuttle?',
    answer:
      'El servicio a trailheads es gratuito, no requiere reservación y normalmente opera de jueves a domingo durante todo el año, con servicio ampliado en algunas temporadas. Revisen siempre el calendario oficial.',
  },
  {
    question: '¿Cuál es la mejor hora para caminar en Sedona con niños?',
    answer:
      'La mañana suele ser la mejor opción. En meses calurosos, salgan temprano y eviten roca expuesta al mediodía. Durante el monzón, revisen el pronóstico y estén preparados para tormentas y crecidas repentinas.',
  },
];

const russianArizonaFaqs = [
  {
    question: 'Что такое Sage на русском языке?',
    answer:
      'Sage помогает семьям планировать поездки по Аризоне: выбирать маршруты, учитывать жару, воду, тень, возраст детей, время в дороге и запасной план.',
  },
  {
    question: 'Подходит ли Sage для поездок с детьми?',
    answer:
      'Да. Sage делает упор на семейные поездки, короткие прогулки, понятную логистику, безопасность и реалистичный темп без перегруженного расписания.',
  },
  {
    question: 'Можно ли задать Sage вопрос на русском?',
    answer:
      'Да. Перейдите в планировщик и опишите поездку по-русски: кто едет, откуда вы выезжаете, сколько есть времени и что нравится вашей семье.',
  },
];

const russianSedonaFaqs = [
  {
    question: 'Подходит ли Седона для поездки с детьми?',
    answer:
      'Да. В Седоне есть красные скалы, маршруты разной сложности, парки и живописные дороги. Для семьи лучше выбрать одну главную прогулку, простую остановку на еду и оставить время на отдых.',
  },
  {
    question: 'Как работает Sedona Shuttle?',
    answer:
      'Трансфер к популярным тропам бесплатный, бронирование не требуется. Обычно он работает круглый год с четверга по воскресенье, а в некоторые праздники и сезоны — чаще. Перед поездкой проверьте официальный календарь.',
  },
  {
    question: 'Когда лучше гулять по Седоне с детьми?',
    answer:
      'Обычно лучше выходить утром. В жаркие месяцы начинайте очень рано и избегайте открытых скал в середине дня. В сезон муссонов следите за прогнозом, грозами и риском внезапных паводков.',
  },
];

const russianPlanBySituationFaqs = [
  {
    question: 'Как выбрать лучшую семейную поездку по Аризоне?',
    answer:
      'Начните с реальной ситуации: жара, возраст детей, время в дороге, туалеты, тень, вода, гости или длина поездки. Затем выберите одну главную активность, место для еды и запасной план.',
  },
  {
    question: 'Что делать в Аризоне, когда слишком жарко?',
    answer:
      'В сильную жару избегайте открытых маршрутов в середине дня. Используйте раннее утро, музеи, бассейны, splash pads, тень, озёра или более прохладные места на высоте.',
  },
  {
    question: 'Какие поездки подходят с маленькими детьми?',
    answer:
      'Маленьким детям обычно лучше подходят короткие прогулки, туалеты рядом, тень, перекусы, простой выход с маршрута и реалистичный темп.',
  },
];

const germanDayTripFaqs = [
  {
    question: 'Welche Tagesausflüge ab Phoenix eignen sich für Familien?',
    answer:
      'Für kurze Tage eignen sich Papago Park und Cave Creek. Payson und Prescott bieten oft kühlere Luft. Sedona, Flagstaff und Tucson passen zu einem längeren Tag mit nur einem Hauptziel.',
  },
  {
    question: 'Wohin kann man der Hitze von Phoenix entkommen?',
    answer:
      'Payson, Prescott und Flagstaff liegen höher und sind häufig kühler. Prüfen Sie am Reisetag trotzdem Wetter, Feuer, Rauch, Gewitter und Straßensperrungen.',
  },
  {
    question: 'Wie viel Fahrzeit ist mit Kindern sinnvoll?',
    answer:
      'Für viele Familien sind bis zu zwei Stunden pro Strecke ein guter Höchstwert. Planen Sie nur ein Hauptabenteuer, eine einfache Mahlzeit und einen Plan B.',
  },
];

const phoenixDayTripFaqs = [
  {
    question: 'What are the best family day trips from Phoenix?',
    answer:
      'Good family day trips from Phoenix include Cave Creek, Prescott, Payson, Sedona, Tucson, Flagstaff, and Cottonwood when the drive time, season, heat, and group energy match the plan.',
  },
  {
    question: 'Where can families escape the Phoenix heat for a day?',
    answer:
      'For summer heat relief, families should look toward higher elevation and shade, including Flagstaff, Prescott, Payson, Show Low, and Pinetop-Lakeside when the drive time works.',
  },
  {
    question: 'What is an easy Arizona day trip from Phoenix with visitors?',
    answer:
      'Sedona, Cave Creek, Prescott, and Tucson can be strong visitor-friendly choices because they offer memorable scenery, food stops, and flexible ways to keep the day simple.',
  },
];

const weekendTripsFaqs = [
  {
    question: 'What are the best Arizona weekend trips for families?',
    answer:
      'Strong Arizona weekend trips for families include Flagstaff, Payson, Prescott, Sedona, Tucson, Williams, Grand Canyon, Show Low, and Pinetop-Lakeside when the plan matches the season, drive time, and kid energy level.',
  },
  {
    question: 'What are the best Arizona weekend trips for groups of friends?',
    answer:
      'Groups of friends usually do well with Sedona, Flagstaff, Prescott, Cottonwood and Jerome, Page, Tucson, or a Grand Canyon weekend because these places combine scenery, food, flexible activities, and easy shared lodging options.',
  },
  {
    question: 'Where should Phoenix families go for a cooler weekend?',
    answer:
      'For cooler summer weekends from Phoenix, families should look first at Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside, and the Mogollon Rim because higher elevation and shade make the trip easier to enjoy.',
  },
];

const seasonalFamilyAdventureFaqs = [
  {
    question: 'What is the best season for family adventures in Arizona?',
    answer:
      'Spring and fall are usually the easiest seasons for Arizona family adventures because temperatures are more forgiving, trails are more comfortable, and road trips are easier to pace.',
  },
  {
    question: 'Where should families go in Arizona during summer?',
    answer:
      'In summer, families should prioritize higher elevation, shade, water, and early starts. Flagstaff, Prescott, Payson, Show Low, and Pinetop-Lakeside are usually better choices than exposed desert hikes.',
  },
  {
    question: 'Can families hike in Arizona during winter?',
    answer:
      'Yes. Winter is one of the best times for lower desert destinations like Tucson, Cave Creek, Yuma, and Phoenix-area trails, while higher-elevation trips need weather and road checks.',
  },
];

const hikesWithKidsFaqs = [
  {
    question: 'What are the best Arizona hikes with kids?',
    answer:
      'The best Arizona hikes with kids are short, easy to exit, close to bathrooms or food, and matched to the season. Good starter areas include Cave Creek, Prescott, Payson, Sedona, Tucson, Flagstaff, and Phoenix-area preserves when heat and trail difficulty are reasonable.',
  },
  {
    question: 'How long should a family hike be in Arizona?',
    answer:
      'Most families do best starting with hikes under 2 miles, especially with younger kids, visitors, or summer conditions. Older kids and confident hikers can build up gradually when weather, shade, water, and footing are safe.',
  },
  {
    question: 'When is the safest time to hike with kids in Arizona?',
    answer:
      'Morning is usually safest, especially in warm desert areas. In summer, families should prioritize higher elevation destinations, shade, early starts, and backup plans that do not depend on exposed desert trails.',
  },
];

const safetyFaqs = [
  {
    question: 'How much water should I bring for an Arizona desert hike?',
    answer:
      'For warm desert hiking, plan around 1 liter of water per adult per hour, then add emergency backup water. Turn around when half your water is gone.',
  },
  {
    question: 'What are common signs of heat exhaustion while hiking?',
    answer:
      'Warning signs can include headache, nausea, dizziness, weakness, thirst, heavy sweating, elevated body temperature, and decreased urine output.',
  },
  {
    question: 'When should hikers call 911 for heat illness?',
    answer:
      'Call 911 right away for confusion, slurred speech, fainting, seizures, very high body temperature, or any severe or worsening heat-related symptoms.',
  },
  {
    question: 'What should families pack for a desert hike in Arizona?',
    answer:
      'Bring water, electrolytes or salty snacks, sun protection, offline maps, a charged phone, first-aid basics, a headlamp, and extra supplies for kids.',
  },
];

const spanishPhoenixHeatFaqs = [
  {
    question: 'Que hacer en Phoenix con ninos cuando hace demasiado calor?',
    answer:
      'Lo mejor es salir muy temprano, usar actividades bajo techo durante el mediodia, planear alberca o descanso en la tarde, y dejar caminatas expuestas para otro dia.',
  },
  {
    question: 'Es seguro caminar con ninos en Phoenix durante calor extremo?',
    answer:
      'No. En calor extremo, las familias deben evitar caminatas expuestas y elegir actividades bajo techo, agua, sombra o salidas muy cortas temprano.',
  },
];

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function buildSchema({ title, description, url, faqs }) {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      url,
      description,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Sage Health and Travels',
        url: `${siteUrl}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Health and Travels',
        url: 'https://healthandtravels.com/',
      },
    },
  ];

  if (faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return schemas
    .map(
      (schema) =>
        `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n');
}

function stripExistingRouteSchema(html) {
  return html.replace(
    /\n\s*<!-- Prerendered Route Schema -->[\s\S]*?\n\s*<!-- End Prerendered Route Schema -->/,
    ''
  );
}

function applySeo(html, { title, description, url, faqs }) {
  let output = stripExistingRouteSchema(html);
  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(description);
  const safeUrl = escapeAttribute(url);

  output = output.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  output = output.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${safeDescription}" />`
  );
  output = output.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/,
    `<link rel="canonical" href="${safeUrl}" />`
  );
  output = output.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  output = output.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:description" content="${safeDescription}" />`
  );
  output = output.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:url" content="${safeUrl}" />`
  );
  output = output.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  output = output.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="twitter:description" content="${safeDescription}" />`
  );

  const routeSchema = `\n    <!-- Prerendered Route Schema -->\n${buildSchema({
    title,
    description,
    url,
    faqs,
  })}\n    <!-- End Prerendered Route Schema -->`;

  return output.replace('</head>', `${routeSchema}\n  </head>`);
}

function addLanguageAlternates(html, language, alternates) {
  return html
    .replace('<html lang="en">', `<html lang="${language}">`)
    .replace(
      '</head>',
      [
        ...alternates.map(
          (alternate) =>
            `    <link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`
        ),
        '  </head>',
      ].join('\n')
    );
}

async function writeRoute(routePath, html) {
  const routeDir = path.join(distDir, routePath);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

const baseHtml = await readFile(indexPath, 'utf8');

const startHereHtml = applySeo(baseHtml, {
  title: 'Start Here: Choose Your Arizona Family Adventure | Sage',
  description:
    'Choose the best Sage Arizona family travel path by situation: little kids, heat, visitors, half-day plans, bathrooms, shade, water, weekend trips, and friend groups.',
  url: `${siteUrl}/${startHerePath}`,
  faqs: startHereFaqs,
});
await writeRoute(startHerePath, startHereHtml);

const exploreHtml = applySeo(baseHtml, {
  title: 'Explore Arizona Family Travel Guides | Sage Directory',
  description:
    'Browse every major Sage Arizona family travel hub, destination guide, trail guide, archive itinerary, and related Health and Travels article from one directory.',
  url: `${siteUrl}/explore`,
  faqs: exploreFaqs,
});
await writeRoute('explore', exploreHtml);

const arizonaHtml = applySeo(baseHtml, {
  title: 'Arizona Family Adventure Guides | Sage Health and Travels',
  description:
    'Explore Arizona family adventure guides for Sedona, Flagstaff, Payson, Prescott, Cave Creek, Page, Tucson, Grand Canyon, Show Low, Pinetop-Lakeside, Bisbee, Williams, Cottonwood, Jerome, Lake Havasu, and Yuma with trails, food, stays, and safety tips.',
  url: `${siteUrl}/arizona`,
  faqs: arizonaFaqs,
});
await writeRoute('arizona', arizonaHtml);

const planBySituationHtml = applySeo(baseHtml, {
  title: 'Plan Arizona Family Trips by Situation | Sage',
  description:
    'Choose the right Arizona family trip by situation: toddlers, extreme heat, visitors, half-day plans, weekend trips, bathrooms, shade, water, and friend groups.',
  url: `${siteUrl}/arizona/plan-by-situation`,
  faqs: planBySituationFaqs,
});
await writeRoute('arizona/plan-by-situation', planBySituationHtml);

const spanishArizonaHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Guias de Arizona en espanol para familias | Sage',
    description:
      'Punto de entrada en espanol para planear viajes familiares por Arizona: Phoenix, Sedona, Flagstaff, Payson, Grand Canyon, caminatas con ninos, calor y fines de semana.',
    url: `${siteUrl}/${spanishArizonaPath}`,
    faqs: spanishArizonaFaqs,
  }),
  'es',
  [
    { hreflang: 'es', href: `${siteUrl}/${spanishArizonaPath}` },
    { hreflang: 'en', href: `${siteUrl}/${englishArizonaPath}` },
    { hreflang: 'x-default', href: `${siteUrl}/${englishArizonaPath}` },
  ]
);
await writeRoute(spanishArizonaPath, spanishArizonaHtml);

const spanishPlanBySituationHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Planificar viajes por Arizona por situacion | Sage',
    description:
      'Guia en espanol para escoger un viaje familiar por Arizona segun ninos pequenos, calor extremo, visitantes, medio dia, fines de semana, banos, sombra, agua o grupos de amigos.',
    url: `${siteUrl}/${spanishPlanBySituationPath}`,
    faqs: spanishPlanBySituationFaqs,
  }),
  'es',
  [
    { hreflang: 'es', href: `${siteUrl}/${spanishPlanBySituationPath}` },
    { hreflang: 'en', href: `${siteUrl}/${englishPlanBySituationPath}` },
    { hreflang: 'x-default', href: `${siteUrl}/${englishPlanBySituationPath}` },
  ]
);
await writeRoute(spanishPlanBySituationPath, spanishPlanBySituationHtml);

const spanishHikesWithKidsHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Caminatas en Arizona con ninos | Guia familiar | Sage',
    description:
      'Guia en espanol para escoger caminatas en Arizona con ninos por edad, temporada, calor, sombra, banos, agua, distancia y plan familiar realista.',
    url: `${siteUrl}/${spanishHikesWithKidsPath}`,
    faqs: spanishHikesWithKidsFaqs,
  }),
  'es',
  [
    { hreflang: 'es', href: `${siteUrl}/${spanishHikesWithKidsPath}` },
    { hreflang: 'en', href: `${siteUrl}/arizona/hikes-with-kids` },
    { hreflang: 'x-default', href: `${siteUrl}/arizona/hikes-with-kids` },
  ]
);
await writeRoute(spanishHikesWithKidsPath, spanishHikesWithKidsHtml);

const spanishSedonaHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Sedona con niños | Guía familiar de caminatas y shuttle | Sage',
    description:
      'Guía en español para visitar Sedona con niños: caminatas familiares, shuttle gratuito, estacionamiento, calor, monzón, pases, seguridad y un plan realista.',
    url: `${siteUrl}/${spanishSedonaPath}`,
    faqs: spanishSedonaFaqs,
  }),
  'es',
  [
    { hreflang: 'es', href: `${siteUrl}/${spanishSedonaPath}` },
    { hreflang: 'en', href: `${siteUrl}/arizona/sedona` },
    { hreflang: 'x-default', href: `${siteUrl}/arizona/sedona` },
  ]
);
await writeRoute(spanishSedonaPath, spanishSedonaHtml);

const spanishFlagstaffHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Flagstaff con niños | Guía familiar de bosque y estrellas | Sage',
    description:
      'Guía en español para visitar Flagstaff con niños: bosque, Buffalo Park, Lowell Observatory, clima, monzón, nieve, seguridad y planes familiares realistas.',
    url: `${siteUrl}/${spanishFlagstaffPath}`,
    faqs: spanishFlagstaffFaqs,
  }),
  'es',
  [
    { hreflang: 'es', href: `${siteUrl}/${spanishFlagstaffPath}` },
    { hreflang: 'en', href: `${siteUrl}/arizona/flagstaff` },
    { hreflang: 'x-default', href: `${siteUrl}/arizona/flagstaff` },
  ]
);
await writeRoute(spanishFlagstaffPath, spanishFlagstaffHtml);

const russianArizonaHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Путешествия по Аризоне на русском языке | Sage',
    description:
      'Планируйте семейные поездки по Аризоне на русском языке: маршруты, жара, безопасность, поездки с детьми, Седона, Флагстафф, Пейсон и другие направления.',
    url: `${siteUrl}/${russianArizonaPath}`,
    faqs: russianArizonaFaqs,
  }),
  'ru',
  [
    { hreflang: 'ru', href: `${siteUrl}/${russianArizonaPath}` },
    { hreflang: 'en', href: `${siteUrl}/${englishArizonaPath}` },
    { hreflang: 'x-default', href: `${siteUrl}/${englishArizonaPath}` },
  ]
);
await writeRoute(russianArizonaPath, russianArizonaHtml);

const russianPlanBySituationHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'План поездки по Аризоне по ситуации | Sage',
    description:
      'Русская страница Sage для выбора семейной поездки по Аризоне: маленькие дети, жара, гости, полдня, выходные, туалеты, тень, вода и группы друзей.',
    url: `${siteUrl}/${russianPlanBySituationPath}`,
    faqs: russianPlanBySituationFaqs,
  }),
  'ru',
  [
    { hreflang: 'ru', href: `${siteUrl}/${russianPlanBySituationPath}` },
    { hreflang: 'en', href: `${siteUrl}/${englishPlanBySituationPath}` },
    { hreflang: 'x-default', href: `${siteUrl}/${englishPlanBySituationPath}` },
  ]
);
await writeRoute(russianPlanBySituationPath, russianPlanBySituationHtml);

const russianSedonaHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Седона с детьми | Семейные маршруты и shuttle | Sage',
    description:
      'Русскоязычный гид по Седоне с детьми: семейные маршруты, бесплатный shuttle, парковка, жара, муссоны, пропуска, безопасность и простой план поездки.',
    url: `${siteUrl}/${russianSedonaPath}`,
    faqs: russianSedonaFaqs,
  }),
  'ru',
  [
    { hreflang: 'ru', href: `${siteUrl}/${russianSedonaPath}` },
    { hreflang: 'es', href: `${siteUrl}/es/arizona/sedona-con-ninos` },
    { hreflang: 'en', href: `${siteUrl}/arizona/sedona` },
    { hreflang: 'x-default', href: `${siteUrl}/arizona/sedona` },
  ]
);
await writeRoute(russianSedonaPath, russianSedonaHtml);

const phoenixDayTripsHtml = applySeo(baseHtml, {
  title: 'Best Arizona Day Trips from Phoenix | Sage',
  description:
    'Find family-friendly Arizona day trips from Phoenix by drive time, season, heat, kids, visitors, easy hikes, food stops, and weekend range.',
  url: `${siteUrl}/arizona/day-trips-from-phoenix`,
  faqs: phoenixDayTripFaqs,
});
await writeRoute('arizona/day-trips-from-phoenix', phoenixDayTripsHtml);

const germanDayTripsHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Familienausflüge ab Phoenix | Sage',
    description:
      'Deutschsprachiger Sage-Planer für Tagesausflüge ab Phoenix: Fahrzeit, Wetter, Kinder, Essen, Toiletten, Schatten und Plan B.',
    url: `${siteUrl}/${germanDayTripsPath}`,
    faqs: germanDayTripFaqs,
  }),
  'de',
  [
    { hreflang: 'de', href: `${siteUrl}/${germanDayTripsPath}` },
    { hreflang: 'en', href: `${siteUrl}/arizona/day-trips-from-phoenix` },
    { hreflang: 'es', href: `${siteUrl}/es/arizona/viajes-de-un-dia-desde-phoenix` },
    { hreflang: 'ru', href: `${siteUrl}/ru/arizona/day-trips-from-phoenix` },
    { hreflang: 'x-default', href: `${siteUrl}/arizona/day-trips-from-phoenix` },
  ]
);
await writeRoute(germanDayTripsPath, germanDayTripsHtml);

const weekendTripsHtml = applySeo(baseHtml, {
  title: 'Arizona Weekend Trips for Families and Friends | Sage',
  description:
    'Find Arizona weekend trips for families, parents, and groups of friends by drive time, season, heat, scenery, food stops, cabins, easy hikes, and low-stress planning.',
  url: `${siteUrl}/arizona/weekend-trips`,
  faqs: weekendTripsFaqs,
});
await writeRoute('arizona/weekend-trips', weekendTripsHtml);

const spanishWeekendTripsHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Escapadas de fin de semana en Arizona con ninos | Sage',
    description:
      'Guia en espanol para elegir escapadas de fin de semana en Arizona con ninos, familia o amigos por clima, manejo, comida, hospedaje, seguridad y plan B.',
    url: `${siteUrl}/${spanishWeekendTripsPath}`,
    faqs: weekendTripsFaqs,
  }),
  'es',
  [
    { hreflang: 'es', href: `${siteUrl}/${spanishWeekendTripsPath}` },
    { hreflang: 'en', href: `${siteUrl}/arizona/weekend-trips` },
    { hreflang: 'x-default', href: `${siteUrl}/arizona/weekend-trips` },
  ]
);
await writeRoute(spanishWeekendTripsPath, spanishWeekendTripsHtml);

const seasonalFamilyAdventureHtml = applySeo(baseHtml, {
  title: 'Best Arizona Family Adventures by Season | Sage',
  description:
    'Find the best Arizona family adventures by season, including spring red rock trips, summer cool-weather escapes, fall weekend bases, and winter desert hikes.',
  url: `${siteUrl}/arizona/family-adventures-by-season`,
  faqs: seasonalFamilyAdventureFaqs,
});
await writeRoute(
  'arizona/family-adventures-by-season',
  seasonalFamilyAdventureHtml
);

const hikesWithKidsHtml = applySeo(baseHtml, {
  title: 'Best Arizona Hikes With Kids | Family Trail Guide | Sage',
  description:
    'Find family-friendly Arizona hikes with kids by age, season, heat, shade, bathrooms, drive time, and easy trip planning help from Sage.',
  url: `${siteUrl}/arizona/hikes-with-kids`,
  faqs: hikesWithKidsFaqs,
});
await writeRoute('arizona/hikes-with-kids', hikesWithKidsHtml);

const safetyHtml = applySeo(baseHtml, {
  title: 'Arizona Desert Hiking Safety Guide | Hydration, Heat & Gear',
  description:
    'Learn how to hike Arizona deserts safely with hydration math, heat exhaustion and heat stroke signs, smart timing, essential gear, and family-friendly safety tips.',
  url: `${siteUrl}/arizona/desert-hiking-safety`,
  faqs: safetyFaqs,
});
await writeRoute('arizona/desert-hiking-safety', safetyHtml);

const spanishPhoenixHeatHtml = addLanguageAlternates(
  applySeo(baseHtml, {
    title: 'Que hacer en Phoenix con ninos cuando hace demasiado calor | Sage',
    description:
      'Guia familiar en espanol para planear Phoenix con ninos durante calor extremo: actividades bajo techo, alberca, splash pads, comida, sombra y salidas tempranas.',
    url: `${siteUrl}/${spanishPhoenixHeatPath}`,
    faqs: spanishPhoenixHeatFaqs,
  }),
  'es',
  [
    { hreflang: 'es', href: `${siteUrl}/${spanishPhoenixHeatPath}` },
    { hreflang: 'en', href: `${siteUrl}/${englishPhoenixHeatPath}` },
    { hreflang: 'x-default', href: `${siteUrl}/${englishPhoenixHeatPath}` },
  ]
);
await writeRoute(spanishPhoenixHeatPath, spanishPhoenixHeatHtml);
await writeRoute(legacySpanishPhoenixHeatPath, spanishPhoenixHeatHtml);

for (const destination of destinations) {
  const title = `${destination.name} Family Adventure Guide | Sage Health and Travels`;
  const description = `Plan a family-friendly ${destination.name}, Arizona adventure with outdoor activities, easy trails, food ideas, places to stay, safety tips, and Sage trip planning help.`;
  const url = `${siteUrl}/arizona/${destination.slug}`;
  const html = applySeo(baseHtml, {
    title,
    description,
    url,
    faqs: destination.faqs,
  });

  await writeRoute(`arizona/${destination.slug}`, html);
}

console.log(`Prerendered ${destinations.length + 17} Arizona SEO pages.`);
