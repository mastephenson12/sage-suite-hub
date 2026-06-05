import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://sage.healthandtravels.com';
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

const destinations = [
  {
    slug: 'sedona',
    name: 'Sedona',
    faqs: [
      {
        question: 'Is Sedona good for beginner family hikes?',
        answer:
          'Yes. Choose shorter trails, start early, and avoid trying to cram three famous hikes into one day like a tourist with a clipboard.',
      },
      {
        question: 'What is the easiest way to plan Sedona with kids?',
        answer:
          'Pick one morning trail, one food stop, one scenic stop, and leave space for creek time or rest.',
      },
    ],
  },
  {
    slug: 'flagstaff',
    name: 'Flagstaff',
    faqs: [
      {
        question: 'Is Flagstaff good for summer family trips?',
        answer:
          'Yes. It is one of Arizona’s best summer escapes because the elevation brings cooler weather and pine forest options.',
      },
      {
        question: 'Can Flagstaff work for a weekend trip?',
        answer:
          'Absolutely. Build one forest day, one food-and-town day, and one scenic side trip if your family still has battery life.',
      },
    ],
  },
  {
    slug: 'payson',
    name: 'Payson',
    faqs: [
      {
        question: 'Is Payson good for kids?',
        answer:
          'Yes. Keep the plan simple: one creek stop, one scenic area, one meal, and enough room for tired humans.',
      },
      {
        question: 'Is Payson a good Phoenix day trip?',
        answer:
          'Yes, especially when you want cooler air and a nature reset without committing to a huge drive.',
      },
    ],
  },
  {
    slug: 'prescott',
    name: 'Prescott',
    faqs: [
      {
        question: 'Is Prescott good for a family weekend?',
        answer:
          'Yes. It has outdoor variety, a useful downtown, and enough easy options for mixed-age groups.',
      },
      {
        question: 'What is a simple Prescott plan?',
        answer:
          'Start with Watson Lake or Lynx Lake, eat downtown, then add a short scenic stop before heading back.',
      },
    ],
  },
  {
    slug: 'cave-creek',
    name: 'Cave Creek',
    faqs: [
      {
        question: 'Is Cave Creek good for beginner hikers?',
        answer:
          'Yes, especially if you pick shorter park trails and avoid the hottest part of the day.',
      },
      {
        question: 'Can Cave Creek be a half-day trip?',
        answer:
          'Yes. A short morning hike plus lunch or dinner in town is a simple, useful plan.',
      },
    ],
  },
  {
    slug: 'page',
    name: 'Page',
    faqs: [
      {
        question: 'Is Page good for families?',
        answer:
          'Yes, if you plan around heat, cliff safety, reservations, and realistic pacing.',
      },
      {
        question: 'What is the easiest Page stop?',
        answer:
          'Horseshoe Bend is a classic short walk, but it is exposed, so go prepared and avoid peak heat.',
      },
    ],
  },
  {
    slug: 'tucson',
    name: 'Tucson',
    faqs: [
      {
        question: 'Is Tucson good for winter hiking?',
        answer:
          'Yes. Tucson is one of Arizona’s best winter hiking bases, especially for families who want desert scenery.',
      },
      {
        question: 'What should families do first in Tucson?',
        answer:
          'Start with a short Saguaro National Park walk, add food, then choose either Sabino Canyon or a Mount Lemmon drive.',
      },
    ],
  },
  {
    slug: 'grand-canyon',
    name: 'Grand Canyon',
    faqs: [
      {
        question: 'Is Grand Canyon good with kids?',
        answer:
          'Yes, if you stick to rim walks, viewpoints, shuttle stops, and clear edge safety rules.',
      },
      {
        question: 'Should beginners hike into the Grand Canyon?',
        answer:
          'Not casually. Most families should start with rim walks and viewpoints before considering below-rim trails.',
      },
    ],
  },
  {
    slug: 'show-low',
    name: 'Show Low',
    faqs: [
      {
        question: 'Is Show Low good for a family summer trip?',
        answer:
          'Yes. Show Low is a good summer escape because it offers cooler mountain air, lakes, and pine-country activities.',
      },
      {
        question: 'What is a simple Show Low family plan?',
        answer:
          'Start with a lake or forest walk, add lunch in town, then keep the afternoon flexible for weather and tired humans.',
      },
    ],
  },
  {
    slug: 'pinetop-lakeside',
    name: 'Pinetop-Lakeside',
    faqs: [
      {
        question: 'Is Pinetop-Lakeside good for kids?',
        answer:
          'Yes. It is especially useful for easy lake days, cabin stays, short walks, and cooler family weekends.',
      },
      {
        question: 'What should families do first in Pinetop-Lakeside?',
        answer:
          'Start with Woodland Lake Park or an easy forest walk, then build the day around food, rest, and weather.',
      },
    ],
  },
  {
    slug: 'bisbee',
    name: 'Bisbee',
    faqs: [
      {
        question: 'Is Bisbee good for a family weekend?',
        answer:
          'Yes, especially for families who like walkable towns, history, cafes, and quirky Arizona scenery.',
      },
      {
        question: 'Is Bisbee more hiking or town exploring?',
        answer:
          'Bisbee is mostly town exploring, stairs, overlooks, and historic wandering rather than a classic trail-focused destination.',
      },
    ],
  },
  {
    slug: 'williams',
    name: 'Williams',
    faqs: [
      {
        question: 'Is Williams a good place to stay for Grand Canyon trips?',
        answer:
          'Yes. Williams is a practical family base for Grand Canyon visits, especially if lodging near the rim is limited or expensive.',
      },
      {
        question: 'What can families do in Williams besides Grand Canyon?',
        answer:
          'Families can explore Route 66, forest areas, short walks, casual restaurants, and scenic drives around town.',
      },
    ],
  },
  {
    slug: 'cottonwood',
    name: 'Cottonwood',
    faqs: [
      {
        question: 'Is Cottonwood a good base for Sedona?',
        answer:
          'Yes. Cottonwood can be a practical base for families who want Verde Valley lodging, food, and easier access to several nearby towns.',
      },
      {
        question: 'What should families do first in Cottonwood?',
        answer:
          'Start with Dead Horse Ranch State Park or a Verde River area, then visit Old Town for food and an easy walk.',
      },
    ],
  },
  {
    slug: 'jerome',
    name: 'Jerome',
    faqs: [
      {
        question: 'Is Jerome good for families?',
        answer:
          'Yes, if your family likes historic towns, views, shops, and short walks more than long hikes.',
      },
      {
        question: 'How long should families spend in Jerome?',
        answer:
          'A half-day works well for most families, especially when paired with Cottonwood or another Verde Valley stop.',
      },
    ],
  },
  {
    slug: 'lake-havasu',
    name: 'Lake Havasu',
    faqs: [
      {
        question: 'Is Lake Havasu good for a family trip?',
        answer:
          'Yes, especially for families who want lake time, water activities, parks, and warm-weather fun with careful heat planning.',
      },
      {
        question: 'What is the easiest Lake Havasu family activity?',
        answer:
          'A waterfront walk near London Bridge plus park time or a simple lake activity is an easy starter plan.',
      },
    ],
  },
  {
    slug: 'yuma',
    name: 'Yuma',
    faqs: [
      {
        question: 'Is Yuma good for beginner outdoor trips?',
        answer:
          'Yes, especially in cooler months when families can enjoy riverfront walks, parks, and short desert outings.',
      },
      {
        question: 'When is the best time for a family trip to Yuma?',
        answer:
          'Fall, winter, and spring are usually better for outdoor family plans because summer heat can be intense.',
      },
    ],
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

console.log(`Prerendered ${destinations.length + 1} Arizona SEO pages.`);
