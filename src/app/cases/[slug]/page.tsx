import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES_2026, CASE_BY_SLUG } from "@/data/cases_and_guides_2026";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

export function generateStaticParams() {
  return CASE_STUDIES_2026.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_BY_SLUG[slug];
  if (!cs) return { title: "Case Not Found" };
  return {
    title: cs.title,
    description: cs.subtitle,
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_BY_SLUG[slug];
  if (!cs) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Case Studies", url: "https://ticketfig.com/cases/" },
          { name: cs.stateName, url: `https://ticketfig.com/cases/${cs.slug}/` },
        ])}
      />

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> /{" "}
          <Link href="/cases/" className="hover:text-[#0f2747]">Case Studies</Link> / {cs.stateName}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          {cs.title}
        </h1>
        <p className="text-base text-slate-600">{cs.subtitle}</p>
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-[#0f2747] text-white font-bold">{cs.statute}</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold">
            Outcome: {cs.outcome}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold tabular-nums">
            Net Savings: {cs.netSavings}
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#0f2747]">3-Year Financial Comparison Ledger</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <th className="py-2 pr-4">Line Item</th>
                <th className="py-2 px-3">Pay Fine Outright</th>
                <th className="py-2 px-3">Statutory Defense Path</th>
                <th className="py-2 pl-3 text-right">Net Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 tabular-nums">
              {cs.ledgerRows.map((r) => (
                <tr key={r.item}>
                  <td className="py-3 pr-4 font-semibold text-slate-800">{r.item}</td>
                  <td className="py-3 px-3 text-rose-700 font-medium">{r.payFinePath}</td>
                  <td className="py-3 px-3 text-[#059669] font-bold">{r.defensePath}</td>
                  <td className="py-3 pl-3 text-right font-extrabold text-[#0f2747]">{r.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Offer @ ~35-40% Scroll Depth */}
      <ToolPaywallDossier
        badge="2026 Written Defense & Discovery Kit"
        title={`Replicate This ${cs.stateName} Defense Workflow`}
        desc="Download editable .docx templates, Radar/LiDAR discovery motions, and the .xlsx 3-Year ROI Ledger."
        dynamicAmount={cs.netSavings}
        features={[
          "Editable .docx Written Declaration & Plea Templates",
          "Radar & LiDAR Calibration Discovery Request",
          ".xlsx 3-Year Insurance Surcharge Ledger",
          "51-State Statutory Reference Manual",
        ]}
      />

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#0f2747]">Execution Timeline</h2>
        <div className="space-y-3">
          {cs.timeline.map((t) => (
            <div key={t.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-extrabold text-[#0f2747]">{t.step}</div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">{t.detail}</p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
          <strong>Key Takeaway:</strong> {cs.keyTakeaway}
        </div>
      </div>
    </div>
  );
}
