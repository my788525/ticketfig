import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { JsonLd, organizationJsonLd } from '@/components/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = 'https://ticketfig.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: './',
  },
  title: {
    default: 'TicketFig — 2026 US Traffic Ticket, 3-Year Insurance Surcharge & Written Defense Platform',
    template: '%s | TicketFig',
  },
  description:
    'Calculate your true 3-year auto insurance surcharge, DMV license points, and Fight vs. Pay ROI across all 50 states + DC. Generate statutory Trial by Written Declaration (CVC § 40902) and radar/LiDAR calibration discovery briefs.',
  keywords: [
    'speeding ticket insurance cost calculator',
    'fight vs pay speeding ticket ROI',
    'DMV license points calculator',
    'trial by written declaration CVC 40902',
    'North Carolina SDIP insurance points',
    'New York driver responsibility assessment',
    'radar lidar calibration discovery request',
    'traffic school vs fighting ticket',
  ],
  authors: [{ name: 'TicketFig Legal & Actuarial Research' }],
  creator: 'TicketFig',
  publisher: 'TicketFig',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TicketFig',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM RAG Stream" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <JsonLd data={organizationJsonLd()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Dataset',
              name: 'US Traffic Ticket Statutes, DMV Points & 3-Year Insurance Surcharge Dataset 2026',
              description:
                'Comprehensive 51-jurisdiction U.S. traffic citation dataset covering DMV point systems, suspension thresholds, state surcharges (NY DRA, NJ MVC, NC SDIP), 3-year auto insurance surcharge benchmarks, traffic school masking rules, and written declaration statutes.',
              url: 'https://ticketfig.com/statutes/',
              identifier: 'us-traffic-statutes-2026',
              datePublished: '2026-01-01',
              dateModified: '2026-10-23',
              creator: { '@type': 'Organization', name: 'TicketFig' },
              publisher: { '@type': 'Organization', name: 'TicketFig', url: 'https://ticketfig.com' },
              spatialCoverage: { '@type': 'Place', name: 'United States' },
              temporalCoverage: '2026',
            }),
          }}
        />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Script src="https://mail.lianu.com/matrix-analytics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
