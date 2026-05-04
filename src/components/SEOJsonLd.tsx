type FAQItem = {
  question: string;
  answer: string;
};

type SEOJsonLdProps = {
  title?: string;
  description?: string;
  url?: string;
  faqs?: FAQItem[];
};

export default function SEOJsonLd({
  title = "Sage | Family Trip Planning for Arizona and Beyond",
  description = "Sage helps families and friends plan Arizona adventures, discover beginner-friendly hikes, explore road trip ideas, and build healthier travel memories together.",
  url = "https://sage.healthandtravels.com/",
  faqs = [],
}: SEOJsonLdProps) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sage Health and Travels",
    url: "https://sage.healthandtravels.com/",
    description,
    publisher: {
      "@type": "Organization",
      name: "Health and Travels",
      url: "https://healthandtravels.com/",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    description,
    isPartOf: {
      "@type": "WebSite",
      name: "Sage Health and Travels",
      url: "https://sage.healthandtravels.com/",
    },
    about: [
      {
        "@type": "Thing",
        name: "Arizona family travel",
      },
      {
        "@type": "Thing",
        name: "family hiking",
      },
      {
        "@type": "Thing",
        name: "Arizona road trips",
      },
      {
        "@type": "Thing",
        name: "healthy travel planning",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Health and Travels",
    url: "https://healthandtravels.com/",
    sameAs: ["https://sage.healthandtravels.com/"],
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const schemas = faqSchema
    ? [websiteSchema, webPageSchema, organizationSchema, faqSchema]
    : [websiteSchema, webPageSchema, organizationSchema];

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
