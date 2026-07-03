import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://sage.healthandtravels.com';
const distDir = path.resolve('dist');

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/arizona', priority: '0.95', changefreq: 'weekly' },
  { path: '/trip-builder', priority: '0.9', changefreq: 'weekly' },
  { path: '/chat', priority: '0.85', changefreq: 'weekly' },
  { path: '/trail-guides', priority: '0.85', changefreq: 'weekly' },
  { path: '/arizona/day-trips-from-phoenix', priority: '0.9', changefreq: 'monthly' },
  { path: '/arizona/family-adventures-by-season', priority: '0.9', changefreq: 'monthly' },
  { path: '/arizona/desert-hiking-safety', priority: '0.9', changefreq: 'monthly' },
  { path: '/community', priority: '0.65', changefreq: 'monthly' },
  { path: '/about', priority: '0.55', changefreq: 'monthly' },
  { path: '/archive', priority: '0.7', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.2', changefreq: 'yearly' },
  ...[
    'sedona',
    'flagstaff',
    'payson',
    'prescott',
    'cave-creek',
    'page',
    'tucson',
    'grand-canyon',
    'show-low',
    'pinetop-lakeside',
    'bisbee',
    'williams',
    'cottonwood',
    'jerome',
    'lake-havasu',
    'yuma',
  ].map((slug) => ({
    path: `/arizona/${slug}`,
    priority: '0.85',
    changefreq: 'monthly',
  })),
];

function xmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${xmlEscape(`${siteUrl}${route.path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8');

console.log(`Generated sitemap.xml and robots.txt for ${routes.length} routes.`);
