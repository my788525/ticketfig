import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COUNTY_COURTS_2026 } from '@/data/county_courts_2026';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

function fitTitle(text: string, maxLen = 48): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const idx = cut.lastIndexOf(' ');
  return idx > 20 ? cut.slice(0, idx) : cut;
}

export async function generateStaticParams() {
  return COUNTY_COURTS_2026.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const court = COUNTY_COURTS_2026.find((c) => c.slug === slug);
  if (!court) return {};
  return {
    title: fitTitle(`${court.county} ${court.stateAbbr} Traffic Court Guide`, 48),
    description: `${court.courtName} defense rules: ${court.statute}, ${court.writtenContestMethod}, and ${court.threeYrInsuranceImpact}.`,
    alternates: { canonical: `/courts/${court.slug}/` }
  };
}

export default async function CountyCourtDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const court = COUNTY_COURTS_2026.find((c) => c.slug === slug);
  if (!court) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: 'https://ticketfig.com/' },
            { name: 'County Courts', url: 'https://ticketfig.com/courts/' },
            { name: court.county, url: `https://ticketfig.com/courts/${court.slug}/` }
          ]),
          faqJsonLd(court.faqs.map((f) => ({ question: f.q, answer: f.a })))
        ]}
      />

      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          {court.stateName} · {court.county}
        </div>
        <h1 className="text-3xl font-extrabold text-[#0b1120] tracking-tight">{court.courtName}</h1>
        <p className="text-sm text-slate-600">
          Governing Statute: <strong className="text-[#0b1120]">{court.statute}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Contest Method</div>
          <div className="text-sm font-extrabold text-[#0b1120]">{court.writtenContestMethod}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 uppercase">Typical Fine</div>
          <div className="text-sm font-extrabold text-[#0b1120]">{court.typicalFineRange}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 uppercase">3-Yr Insurance Impact</div>
          <div className="text-sm font-extrabold text-rose-700">{court.threeYrInsuranceImpact}</div>
        </div>
      </div>

      <div className="bg-[#0b1120] text-white rounded-2xl p-6 space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
          LOCAL COURT PROCEDURE PLAYBOOK
        </div>
        <p className="text-sm text-zinc-200 leading-relaxed">{court.localProcedureTip}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/wizard/" className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs">
            Run 4-Step Defense Wizard →
          </Link>
          <a href={court.portalUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-xl border border-zinc-700 text-xs font-bold text-zinc-200 hover:bg-zinc-800">
            Official Court Portal (.gov/.org) ↗
          </a>
        </div>
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0b1120]">{court.county} Traffic Court FAQs</h2>
        <div className="space-y-3">
          {court.faqs.map((f) => (
            <details key={f.q} className="border border-slate-200 rounded-xl p-4">
              <summary className="font-bold text-sm text-[#0b1120] cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ToolPaywallDossier
        badge={`${court.stateAbbr} Court Defense Kit`}
        title={`Download ${court.county} Written Defense & Discovery Pack`}
        desc={`Get editable .DOCX contest templates and calibration discovery motions tailored for ${court.courtName}.`}
        features={[
          'Editable .DOCX Written Declaration / Motion',
          'Radar / LiDAR Calibration Discovery Request',
          '3-Year Insurance ROI Excel Ledger',
          '51-State DMV Point Matrix'
        ]}
      />
    </div>
  );
}
