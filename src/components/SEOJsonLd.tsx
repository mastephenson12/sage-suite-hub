import { useEffect } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

type SEOJsonLdProps = {
  title?: string;
  description?: string;
  url?: string;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
};

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function setPropertyMetaTag(property: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`
  );

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

export default function SEOJsonLd({
  title = 'Sage | Family Trip Planning for Arizona and Beyond',
  description = 'Sage helps families and friends plan Arizona adventures, discover beginner-friendly hikes, explore road trip ideas, and build healthier travel memories together.',
  url = 'https://sage.healthandtravels.com/',
  faqs = [],
  breadcrumbs = [],
}: SEOJsonLdProps) {
  useEffect(() => {
    document.title = title;
    setMetaTag('description', description);
    setCanonical(url);

    setPropertyMetaTag('og:title', title);
    setPropertyMetaTag('og:description', description);
    setPropertyMetaTag('og:url', url);
    setPropertyMetaTag('og:type', 'website');

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
  }, [title, description, url]);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sage Health and Travels',
    url: 'https://sage.healthandtravels.com/',
    description,
    publisher: {
      '@type': 'Organization',
      name: 'Health and Travels',
      url: 'https://healthandtravels.com/',
    },
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url,
    description,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Sage Health and Travels',
      url: 'https://sage.healthandtravels.com/',
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Arizona family travel',
      },
      {
        '@type': 'Thing',
        name: 'family hiking',
      },
      {
        '@type': 'Thing',
        name: 'Arizona road trips',
      },
      {
        '@type': 'Thing',
        name: 'healthy travel planning',
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Health and Travels',
    url: 'https://healthandtravels.com/',
    sameAs: ['https://sage.healthandtravels.com/'],
  };

  const faqSchema =
    faqs.length > 0
      ? {
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
        }
      : null;

  const breadcrumbSchema =
    breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((breadcrumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.name,
            item: breadcrumb.url,
          })),
        }
      : null;

  const schemas = [
    websiteSchema,
    webPageSchema,
    organizationSchema,
    faqSchema,
    breadcrumbSchema,
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
