import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTY_COURTS_2026 } from '@/data/county_courts_2026';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Top U.S. County Traffic Court Guides',
  description:
    'County-level traffic court defense rules for Los Angeles, Orange County, Harris County (Houston), Miami-Dade, and Wake/Mecklenburg NC.',
  alternates: { canonical: '/courts/' }
};

export default function CourtsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: 'https://ticketfig.com/' },
          { name: 'County Courts', url: 'https://ticketfig.com/courts/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          MICRO-LOCAL COURT RULES · 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b1120] tracking-tight">
          High-Volume County Traffic Court Defense Guides
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Local written-declaration deadlines, speed-survey discovery tactics, and 3-year insurance surcharge traps across America’s busiest traffic courts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {COUNTY_COURTS_2026.map((c) => (
          <Link
            key={c.slug}
            href={`/courts/${c.slug}/`}
            className="bg-white border border-slate-200 hover:border-amber-500 rounded-2xl p-6 space-y-3 shadow-sm transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 text-[11px] font-bold uppercase">
                {c.stateAbbr} · {c.county}
              </span>
              <h2 className="text-lg font-extrabold text-[#0b1120]">{c.courtName}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{c.localProcedureTip}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs font-bold text-[#0b1120]">
              <span>3-Yr Risk: {c.threeYrInsuranceImpact.split('(')[0].trim()}</span>
              <span className="text-amber-600">Open Court Guide →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
