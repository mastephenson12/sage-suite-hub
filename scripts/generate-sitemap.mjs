import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://sage.healthandtravels.com';
const TODAY = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/trip-builder', priority: '0.9', changefreq: 'weekly' },
  { path: '/chat', priority: '0.8', changefreq: 'weekly' },
  { path: '/arizona', priority: '0.9', changefreq: 'weekly' },
  { path: '/arizona/desert-hiking-safety', priority: '0.9', changefreq: 'monthly' },
  { path: '/arizona/sedona', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/flagstaff', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/payson', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/prescott', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/cave-creek', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/page', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/tucson', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/grand-canyon', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/show-low', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/pinetop-lakeside', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/bisbee', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/williams', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/cottonwood', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/jerome', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/lake-havasu', priority: '0.8', changefreq: 'monthly' },
  { path: '/arizona/yuma', priority: '0.8', changefreq: 'monthly' },
  { path: '/trail-guides', priority: '0.8', changefreq: 'weekly' },
  { path: '/archive', priority: '0.8', changefreq: 'weekly' },
  { path: '/community', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), xml);
console.log(`Generated sitemap with ${routes.length} URLs for ${SITE_URL}`);
