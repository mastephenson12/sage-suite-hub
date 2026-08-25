import { readFile, writeFile } from 'node:fs/promises';

const siteUrl = 'https://sage.healthandtravels.com';
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/start-here', changefreq: 'weekly', priority: '0.95' },
  { path: '/explore', changefreq: 'weekly', priority: '0.9' },
  { path: '/trip-builder', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona/first-trip', changefreq: 'weekly', priority: '0.95' },
  { path: '/arizona/adventure-finder', changefreq: 'weekly', priority: '0.95' },
  { path: '/arizona/plan-by-situation', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona/primer-viaje-a-arizona-con-ninos', changefreq: 'weekly', priority: '0.95' },
  { path: '/es/arizona/planificar-por-situacion', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona/sedona-con-ninos', changefreq: 'weekly', priority: '0.95' },
  { path: '/es/arizona/flagstaff-con-ninos', changefreq: 'weekly', priority: '0.95' },
  { path: '/es/arizona/gran-canon-con-ninos', changefreq: 'weekly', priority: '0.95' },
  { path: '/ru', changefreq: 'weekly', priority: '0.8' },
  { path: '/ru/arizona/first-trip-with-kids', changefreq: 'weekly', priority: '0.95' },
  { path: '/ru/arizona/plan-by-situation', changefreq: 'weekly', priority: '0.9' },
  { path: '/ru/arizona/sedona-with-kids', changefreq: 'weekly', priority: '0.95' },
  { path: '/ru/arizona/grand-canyon-with-kids', changefreq: 'weekly', priority: '0.95' },
  { path: '/de/arizona/grand-canyon-mit-kindern', changefreq: 'weekly', priority: '0.95' },
  { path: '/arizona/cool-summer-trips-with-kids', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona/viajes-frescos-verano-con-ninos', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona/caminatas-con-ninos', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona/viajes-de-un-dia-desde-phoenix', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona/payson-y-mogollon-rim-con-ninos', changefreq: 'weekly', priority: '0.9' },
  { path: '/es/arizona/escapadas-fin-de-semana-con-ninos', changefreq: 'weekly', priority: '0.9' },
  { path: '/ru/arizona/cool-summer-trips-with-kids', changefreq: 'weekly', priority: '0.9' },
  { path: '/ru/arizona/hikes-with-kids', changefreq: 'weekly', priority: '0.9' },
  { path: '/ru/arizona/day-trips-from-phoenix', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona/day-trips-from-phoenix', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona/payson-rim-country-with-kids', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona/weekend-trips', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona/family-adventures-by-season', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona/hikes-with-kids', changefreq: 'weekly', priority: '0.9' },
  { path: '/arizona/easy-family-hikes', changefreq: 'weekly', priority: '0.95' },
  { path: '/arizona/desert-hiking-safety', changefreq: 'monthly', priority: '0.9' },
  { path: '/trail-guides', changefreq: 'weekly', priority: '0.8' },
  { path: '/archive', changefreq: 'weekly', priority: '0.8' },
  { path: '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim', changefreq: 'monthly', priority: '0.8' },
  { path: '/es/archive/phoenix-con-ninos-cuando-hace-calor', changefreq: 'monthly', priority: '0.8' },
  { path: '/es/archive/phoenix-things-to-do-with-kids-when-hot', changefreq: 'monthly', priority: '0.8' },
  { path: '/community', changefreq: 'monthly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/editorial-standards', changefreq: 'monthly', priority: '0.6' },
  { path: '/author/mark-stephenson', changefreq: 'monthly', priority: '0.6' },
  { path: '/affiliate-disclosure', changefreq: 'yearly', priority: '0.4' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

async function readSource(path) {
  return readFile(path, 'utf8');
}

function extractStringValues(source, propertyName) {
  const pattern = new RegExp(`${propertyName}:\\s*['\"]([^'\"]+)['\"]`, 'g');
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

function uniqueRoutes(routes) {
  const seen = new Set();

  return routes.filter((route) => {
    if (seen.has(route.path)) return false;
    seen.add(route.path);
    return true;
  });
}

function routeToXml(route) {
  const loc = route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`;

  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${route.lastmod || today}</lastmod>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const [articlesSource, destinationsSource, extraDestinationsSource, trailsSource] = await Promise.all([
  readSource('src/data/articles.ts'),
  readSource('src/data/arizonaDestinations.ts'),
  readSource('src/data/extraArizonaDestinations.ts'),
  readSource('src/data/trails.ts'),
]);

const destinationRoutes = [
  ...extractStringValues(destinationsSource, 'slug'),
  ...extractStringValues(extraDestinationsSource, 'slug'),
].map((slug) => ({
  path: `/arizona/${slug}`,
  changefreq: 'weekly',
  priority: '0.8',
}));

const trailRoutes = extractStringValues(trailsSource, 'id').map((id) => ({
  path: `/trail-guides/${id}`,
  changefreq: 'monthly',
  priority: '0.7',
}));

const archiveRoutes = extractStringValues(articlesSource, 'id').map((id) => ({
  path: `/archive/${id}`,
  changefreq: 'monthly',
  priority: id === 'phoenix-things-to-do-with-kids-when-hot' ? '0.8' : '0.7',
}));

const routes = uniqueRoutes([
  ...staticRoutes,
  ...destinationRoutes,
  ...trailRoutes,
  ...archiveRoutes,
]);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(routeToXml),
  '</urlset>',
  '',
].join('\n');

await writeFile('public/sitemap.xml', sitemap, 'utf8');

console.log(`Generated public/sitemap.xml with ${routes.length} URLs.`);
