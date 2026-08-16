import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://sage.healthandtravels.com';
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function stripRouteSchema(html) {
  return html.replace(
    /\n\s*<!-- Additional Prerendered Route Schema -->[\s\S]*?\n\s*<!-- End Additional Prerendered Route Schema -->/,
    ''
  );
}

function buildSchema({ title, description, url, breadcrumbs = [] }) {
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
    },
  ];

  if (breadcrumbs.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
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

function applySeo(html, { title, description, routePath, language = 'en', alternates = [], breadcrumbs = [] }) {
  const url = routePath ? `${siteUrl}/${routePath}` : `${siteUrl}/`;
  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(description);
  const safeUrl = escapeAttribute(url);
  let output = stripRouteSchema(html);

  output = output.replace(/<html lang="[^"]+">/, `<html lang="${language}">`);
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

  const alternateTags = alternates
    .map(
      (alternate) =>
        `    <link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`
    )
    .join('\n');

  const routeSchema = [
    '    <!-- Additional Prerendered Route Schema -->',
    buildSchema({ title, description, url, breadcrumbs }),
    alternateTags,
    '    <!-- End Additional Prerendered Route Schema -->',
  ]
    .filter(Boolean)
    .join('\n');

  return output.replace('</head>', `${routeSchema}\n  </head>`);
}

async function writeRoute(routePath, html) {
  const routeDir = path.join(distDir, routePath);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

function extractObjects(source, requiredKeys) {
  const blocks = source.match(/\{[\s\S]*?\n\s*\},?/g) || [];
  return blocks
    .map((block) => {
      const result = {};
      for (const key of requiredKeys) {
        const match = block.match(new RegExp(`${key}:\\s*['\"]([^'\"]+)['\"]`));
        if (!match) return null;
        result[key] = match[1];
      }
      return result;
    })
    .filter(Boolean);
}

const publicPages = [
  {
    routePath: 'trip-builder',
    title: 'Arizona Family Trip Builder | Sage Health and Travels',
    description: 'Build a practical Arizona family trip by season, drive time, kid ages, shade, bathrooms, activity level, food stops, and group needs.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Trip Builder', url: `${siteUrl}/trip-builder` },
    ],
  },
  {
    routePath: 'arizona/adventure-finder',
    title: 'Arizona Family Adventure Finder | Sage',
    description: 'Find an Arizona family adventure based on weather, kid ages, drive time, shade, bathrooms, scenery, and the kind of day your group can realistically handle.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Arizona', url: `${siteUrl}/arizona` },
      { name: 'Adventure Finder', url: `${siteUrl}/arizona/adventure-finder` },
    ],
  },
  {
    routePath: 'arizona/easy-family-hikes',
    title: 'Easy Family Hikes in Arizona | Beginner-Friendly Guide | Sage',
    description: 'Find easy family hikes in Arizona by season, region, distance, shade, bathrooms, kid needs, and drive time. Build a safer family hiking plan with Sage.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Arizona', url: `${siteUrl}/arizona` },
      { name: 'Easy Family Hikes', url: `${siteUrl}/arizona/easy-family-hikes` },
    ],
  },
  {
    routePath: 'arizona/cool-summer-trips-with-kids',
    title: 'Cool Arizona Summer Trips With Kids | Sage',
    description: 'Plan cooler Arizona summer trips with kids using higher elevation, shade, water, early starts, family-friendly stops, food, lodging, and realistic drive times.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Arizona', url: `${siteUrl}/arizona` },
      { name: 'Cool Summer Trips', url: `${siteUrl}/arizona/cool-summer-trips-with-kids` },
    ],
  },
  {
    routePath: 'arizona/payson-rim-country-with-kids',
    title: 'Payson and Rim Country With Kids | Family Guide | Sage',
    description: 'Plan a family trip to Payson and Arizona Rim Country with kid-friendly outdoor activities, lakes, forest stops, food, lodging, safety, and seasonal guidance.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Arizona', url: `${siteUrl}/arizona` },
      { name: 'Payson and Rim Country With Kids', url: `${siteUrl}/arizona/payson-rim-country-with-kids` },
    ],
  },
  {
    routePath: 'archive',
    title: 'Arizona Family Travel Articles and Itineraries | Sage Archive',
    description: 'Browse Sage Arizona family travel articles, hiking ideas, seasonal itineraries, outdoor safety guides, food stops, lodging ideas, and practical trip-planning resources.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Archive', url: `${siteUrl}/archive` },
    ],
  },
  {
    routePath: 'trail-guides',
    title: 'Arizona Trail Guides | Family and Beginner Hiking | Sage',
    description: 'Browse Arizona trail guides with distance, difficulty, elevation, timing, family considerations, safety notes, and practical trip-planning help.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Trail Guides', url: `${siteUrl}/trail-guides` },
    ],
  },
  {
    routePath: 'community',
    title: 'Arizona Outdoor Community | Sage Health and Travels',
    description: 'Connect with Arizona families and outdoor explorers through Sage and the Arizona Hikers Association community.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Community', url: `${siteUrl}/community` },
    ],
  },
  {
    routePath: 'about',
    title: 'About Sage Health and Travels | Arizona Family Trip Planning',
    description: 'Learn how Sage Health and Travels helps families plan safer, simpler Arizona adventures with outdoor ideas, food stops, lodging, and practical safety guidance.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'About', url: `${siteUrl}/about` },
    ],
  },
  {
    routePath: 'editorial-standards',
    title: 'Editorial Standards | Sage Health and Travels',
    description: 'Read how Sage Health and Travels reviews Arizona family travel guides, safety notes, affiliate placements, AI assistance, and source checks.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Editorial Standards', url: `${siteUrl}/editorial-standards` },
    ],
  },
  {
    routePath: 'author/mark-stephenson',
    title: 'Mark Stephenson | Health and Travels Author Profile',
    description: 'Meet Mark Stephenson, founder and editor of Health and Travels and the family travel voice behind Sage Arizona trip planning.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'About', url: `${siteUrl}/about` },
      { name: 'Mark Stephenson', url: `${siteUrl}/author/mark-stephenson` },
    ],
  },
  {
    routePath: 'affiliate-disclosure',
    title: 'Affiliate Disclosure | Sage Health and Travels',
    description: 'Read how Health and Travels and Sage may use affiliate links while keeping Arizona family travel recommendations practical and reader-first.',
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Affiliate Disclosure', url: `${siteUrl}/affiliate-disclosure` },
    ],
  },
  {
    routePath: 'privacy-policy',
    title: 'Privacy Policy | Sage Health and Travels',
    description: 'Read the Sage Health and Travels privacy policy, including how site usage, analytics, forms, and third-party services may handle information.',
  },
  {
    routePath: 'terms-of-service',
    title: 'Terms of Service | Sage Health and Travels',
    description: 'Read the terms governing use of Sage Health and Travels, its trip-planning tools, travel information, external links, and related services.',
  },
  {
    routePath: 'es/arizona/primer-viaje-a-arizona-con-ninos',
    language: 'es',
    title: 'Primer viaje a Arizona con niños | Guía familiar | Sage',
    description: 'Guía en español para planear un primer viaje a Arizona con niños, familia o amigos: Phoenix, Sedona, Flagstaff, Grand Canyon, Payson, Prescott, Tucson, calor, comida, baños y rutas fáciles.',
    alternates: [
      { hreflang: 'es', href: `${siteUrl}/es/arizona/primer-viaje-a-arizona-con-ninos` },
      { hreflang: 'en', href: `${siteUrl}/arizona/first-trip` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/first-trip` },
    ],
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Arizona en español', url: `${siteUrl}/es/arizona` },
      { name: 'Primer viaje a Arizona', url: `${siteUrl}/es/arizona/primer-viaje-a-arizona-con-ninos` },
    ],
  },
  {
    routePath: 'es/arizona/viajes-frescos-verano-con-ninos',
    language: 'es',
    title: 'Viajes frescos por Arizona en verano con niños | Sage',
    description: 'Planea viajes familiares más frescos por Arizona durante el verano con altura, sombra, agua, salidas temprano, comida, alojamiento y tiempos de manejo realistas.',
    alternates: [
      { hreflang: 'es', href: `${siteUrl}/es/arizona/viajes-frescos-verano-con-ninos` },
      { hreflang: 'en', href: `${siteUrl}/arizona/cool-summer-trips-with-kids` },
      { hreflang: 'ru', href: `${siteUrl}/ru/arizona/cool-summer-trips-with-kids` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/cool-summer-trips-with-kids` },
    ],
  },
  {
    routePath: 'es/arizona/viajes-de-un-dia-desde-phoenix',
    language: 'es',
    title: 'Viajes de un dia desde Phoenix con ninos | Sage',
    description: 'Guia en espanol para escoger viajes familiares de un dia desde Phoenix por tiempo de manejo, temporada, calor, comida, banos, sombra y energia del grupo.',
    alternates: [
      { hreflang: 'es', href: `${siteUrl}/es/arizona/viajes-de-un-dia-desde-phoenix` },
      { hreflang: 'en', href: `${siteUrl}/arizona/day-trips-from-phoenix` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/day-trips-from-phoenix` },
    ],
  },
  {
    routePath: 'es/arizona/payson-y-mogollon-rim-con-ninos',
    language: 'es',
    title: 'Payson y Mogollon Rim con ninos | Guia familiar en Arizona | Sage',
    description: 'Guia en espanol para planear Payson y Mogollon Rim con ninos desde Phoenix: Woods Canyon Lake, miradores, pinos, picnic, seguridad, monzones y ritmo familiar.',
    alternates: [
      { hreflang: 'es', href: `${siteUrl}/es/arizona/payson-y-mogollon-rim-con-ninos` },
      { hreflang: 'en', href: `${siteUrl}/arizona/payson-rim-country-with-kids` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/payson-rim-country-with-kids` },
    ],
  },
  {
    routePath: 'es/arizona/escapadas-fin-de-semana-con-ninos',
    language: 'es',
    title: 'Escapadas de fin de semana en Arizona con ninos | Sage',
    description: 'Guia en espanol para elegir escapadas de fin de semana en Arizona con ninos, familia o amigos por clima, manejo, comida, hospedaje, seguridad y plan B.',
    alternates: [
      { hreflang: 'es', href: `${siteUrl}/es/arizona/escapadas-fin-de-semana-con-ninos` },
      { hreflang: 'en', href: `${siteUrl}/arizona/weekend-trips` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/weekend-trips` },
    ],
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Arizona en espanol', url: `${siteUrl}/es/arizona` },
      { name: 'Escapadas de fin de semana', url: `${siteUrl}/es/arizona/escapadas-fin-de-semana-con-ninos` },
    ],
  },
  {
    routePath: 'ru/arizona/day-trips-from-phoenix',
    language: 'ru',
    title: 'Поездки на один день из Phoenix с детьми | Sage',
    description: 'Русская страница Sage для семейных поездок на один день из Phoenix: Payson, Sedona, Flagstaff, Prescott, Tucson, жара, дорога, еда, туалеты и запасной план.',
    alternates: [
      { hreflang: 'ru', href: `${siteUrl}/ru/arizona/day-trips-from-phoenix` },
      { hreflang: 'en', href: `${siteUrl}/arizona/day-trips-from-phoenix` },
      { hreflang: 'es', href: `${siteUrl}/es/arizona/viajes-de-un-dia-desde-phoenix` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/day-trips-from-phoenix` },
    ],
  },
  {
    routePath: 'ru/arizona/first-trip-with-kids',
    language: 'ru',
    title: 'Первая поездка в Аризону с детьми | Семейный гид | Sage',
    description: 'Русскоязычный гид Sage для первой поездки по Аризоне с детьми, семьей или друзьями: Phoenix, Sedona, Flagstaff, Grand Canyon, Payson, Prescott, Tucson, жара, еда, туалеты и простой план.',
    alternates: [
      { hreflang: 'ru', href: `${siteUrl}/ru/arizona/first-trip-with-kids` },
      { hreflang: 'en', href: `${siteUrl}/arizona/first-trip` },
      { hreflang: 'es', href: `${siteUrl}/es/arizona/primer-viaje-a-arizona-con-ninos` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/first-trip` },
    ],
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Аризона на русском', url: `${siteUrl}/ru` },
      { name: 'Первая поездка в Аризону', url: `${siteUrl}/ru/arizona/first-trip-with-kids` },
    ],
  },
  {
    routePath: 'ru/arizona/hikes-with-kids',
    language: 'ru',
    title: 'Походы по Аризоне с детьми | Sage',
    description: 'Русский гид по семейным походам в Аризоне: возраст детей, сезон, жара, тень, туалеты, вода, расстояние, еда и запасной план.',
    alternates: [
      { hreflang: 'ru', href: `${siteUrl}/ru/arizona/hikes-with-kids` },
      { hreflang: 'en', href: `${siteUrl}/arizona/hikes-with-kids` },
      { hreflang: 'es', href: `${siteUrl}/es/arizona/caminatas-con-ninos` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/hikes-with-kids` },
    ],
  },
  {
    routePath: 'ru/arizona/cool-summer-trips-with-kids',
    language: 'ru',
    title: 'Прохладные летние поездки по Аризоне с детьми | Sage',
    description: 'Планируйте более прохладные летние поездки по Аризоне с детьми: высота, тень, вода, ранний старт, еда, жильё и реалистичное время в дороге.',
    alternates: [
      { hreflang: 'ru', href: `${siteUrl}/ru/arizona/cool-summer-trips-with-kids` },
      { hreflang: 'en', href: `${siteUrl}/arizona/cool-summer-trips-with-kids` },
      { hreflang: 'es', href: `${siteUrl}/es/arizona/viajes-frescos-verano-con-ninos` },
      { hreflang: 'x-default', href: `${siteUrl}/arizona/cool-summer-trips-with-kids` },
    ],
  },
  {
    routePath: 'ru/arizona/grand-canyon-with-kids',
    language: 'ru',
    title: 'Гранд-Каньон с детьми | Семейный план South Rim | Sage',
    description: 'Русский гид Sage по Южному краю Гранд-Каньона с детьми: виды, Rim Trail, shuttle, еда, жильё, безопасность и готовый маршрут.',
    alternates: [
      { hreflang: 'ru', href: `${siteUrl}/ru/arizona/grand-canyon-with-kids` },
      { hreflang: 'x-default', href: `${siteUrl}/ru/arizona/grand-canyon-with-kids` },
    ],
    breadcrumbs: [
      { name: 'Sage', url: `${siteUrl}/` },
      { name: 'Аризона на русском', url: `${siteUrl}/ru` },
      { name: 'Гранд-Каньон с детьми', url: `${siteUrl}/ru/arizona/grand-canyon-with-kids` },
    ],
  },
];

const baseHtml = await readFile(indexPath, 'utf8');
let written = 0;

for (const page of publicPages) {
  const html = applySeo(baseHtml, page);
  await writeRoute(page.routePath, html);
  written += 1;
}

const trailsSource = await readFile('src/data/trails.ts', 'utf8');
const trails = extractObjects(trailsSource, ['id', 'name', 'location', 'description']);
for (const trail of trails) {
  const routePath = `trail-guides/${trail.id}`;
  const html = applySeo(baseHtml, {
    routePath,
    title: `${trail.name} Trail Guide | ${trail.location} | Sage`,
    description: trail.description,
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Trail Guides', url: `${siteUrl}/trail-guides` },
      { name: trail.name, url: `${siteUrl}/${routePath}` },
    ],
  });
  await writeRoute(routePath, html);
  written += 1;
}

const articlesSource = await readFile('src/data/articles.ts', 'utf8');
const articles = extractObjects(articlesSource, ['id', 'title']);
for (const article of articles) {
  const routePath = `archive/${article.id}`;
  const html = applySeo(baseHtml, {
    routePath,
    title: `${article.title} | Sage Health and Travels`,
    description: `Read ${article.title}, a Sage Health and Travels guide with practical ideas for healthier Arizona adventures, family travel, outdoor planning, and safer trips.`,
    breadcrumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      { name: 'Archive', url: `${siteUrl}/archive` },
      { name: article.title, url: `${siteUrl}/${routePath}` },
    ],
  });
  await writeRoute(routePath, html);
  written += 1;
}

console.log(`Prerendered ${written} additional public pages with route-specific SEO.`);
