import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://sage.healthandtravels.com';
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

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

async function writeRoute(routePath, html) {
  const routeDir = path.join(distDir, routePath);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

const baseHtml = await readFile(indexPath, 'utf8');

const arizonaHtml = applySeo(baseHtml, {
  title: 'Arizona Family Adventure Guides | Sage Health and Travels',
  description:
    'Explore Arizona family adventure guides for Sedona, Flagstaff, Payson, Prescott, Cave Creek, Page, Tucson, Grand Canyon, Show Low, Pinetop-Lakeside, Bisbee, Williams, Cottonwood, Jerome, Lake Havasu, and Yuma with trails, food, stays, and safety tips.',
  url: `${siteUrl}/arizona`,
  faqs: arizonaFaqs,
});
await writeRoute('arizona', arizonaHtml);

const safetyHtml = applySeo(baseHtml, {
  title: 'Arizona Desert Hiking Safety Guide | Hydration, Heat & Gear',
  description:
    'Learn how to hike Arizona deserts safely with hydration math, heat exhaustion and heat stroke signs, smart timing, essential gear, and family-friendly safety tips.',
  url: `${siteUrl}/arizona/desert-hiking-safety`,
  faqs: safetyFaqs,
});
await writeRoute('arizona/desert-hiking-safety', safetyHtml);

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

console.log(`Prerendered ${destinations.length + 2} Arizona SEO pages.`);
