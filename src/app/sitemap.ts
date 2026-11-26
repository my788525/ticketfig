import type { MetadataRoute } from 'next';
import { TICKET_STATUTES_2026 } from '@/data/ticket_statutes_2026';
import { CASE_STUDIES_2026, GUIDES_2026 } from '@/data/cases_and_guides_2026';

export const dynamic = 'force-static';

const BASE = 'https://ticketfig.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/wizard/',
    '/calculators/speeding-ticket-insurance-cost/',
    '/calculators/fight-vs-pay-roi/',
    '/calculators/license-points-calculator/',
    '/calculators/written-declaration-eligibility/',
    '/states/',
    '/cases/',
    '/guides/',
    '/statutes/',
    '/methodology/',
    '/changelog/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/',
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: BASE + r,
    lastModified: '2026-10-23',
    changeFrequency: r === '' ? 'daily' : r === '/wizard/' || r.startsWith('/calculators/') ? 'weekly' : 'monthly',
    priority: r === '' ? 1.0 : r === '/wizard/' || r.startsWith('/calculators/') ? 0.95 : 0.8,
  }));

  const flagshipToolRoutes: MetadataRoute.Sitemap = [
    '/pitfalls/',
    '/calculators/ticket-error-forensics/',
    '/calculators/discovery-calibration-builder/',
  ].map((r) => ({
    url: BASE + r,
    lastModified: '2026-11-26',
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const stateRoutes: MetadataRoute.Sitemap = TICKET_STATUTES_2026.map((s) => ({
    url: `${BASE}/states/${s.slug}/`,
    lastModified: '2026-10-23',
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const caseRoutes: MetadataRoute.Sitemap = CASE_STUDIES_2026.map((c) => ({
    url: `${BASE}/cases/${c.slug}/`,
    lastModified: '2026-10-23',
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES_2026.map((g) => ({
    url: `${BASE}/guides/${g.slug}/`,
    lastModified: g.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...routes, ...flagshipToolRoutes, ...stateRoutes, ...caseRoutes, ...guideRoutes];
}
