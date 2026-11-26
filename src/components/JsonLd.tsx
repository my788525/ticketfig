export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

export function webApplicationJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any (browser-based)',
    browserRequirements: 'Modern browser with JavaScript',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: opts.featureList || [
      '51-jurisdiction statutory DMV point & surcharge data',
      '3-year cumulative auto insurance surcharge modeling',
      'Written declaration & calibration discovery generator',
      '100% in-browser — zero data uploaded',
    ],
    publisher: { '@type': 'Organization', name: 'TicketFig' },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TicketFig',
    url: 'https://ticketfig.com',
    logo: 'https://ticketfig.com/favicon.svg',
    description:
      'Institutional-grade US traffic ticket, 3-year auto insurance surcharge, and written declaration defense platform covering all 50 states + DC.',
  };
}
