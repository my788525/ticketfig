import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Actuarial & Statutory Methodology (2026)",
  description:
    "How TicketFig models 3-year cumulative auto insurance surcharges, statutory court penalty assessments, and Expected Value ROI across 51 U.S. jurisdictions.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Methodology", url: "https://ticketfig.com/methodology/" },
        ])}
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          Actuarial &amp; Statutory Methodology (2026)
        </h1>
        <p className="text-sm text-slate-600">
          Transparent formulas behind TicketFig’s 3-year insurance surcharge and Fight vs. Pay ROI models.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-1.5">
          <h2 className="text-lg font-bold text-[#0f2747]">1. Statutory Court Assessment Multipliers</h2>
          <p>
            Many states impose mandatory penalty assessments, victim funds, and court technology fees
            on top of the base statutory fine. For example, California’s base $35 speeding fine scales
            by ~4.5x to $238 after state/county penalty assessments. TicketFig applies state-specific
            multipliers verified against 2026 uniform bail and penalty schedules.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-lg font-bold text-[#0f2747]">2. 36-to-72 Month Insurance Lookback Modeling</h2>
          <p>
            Most U.S. carriers rate moving violations for 36 months (3 years) from conviction or
            violation date, while Massachusetts SDIP rates for 72 months (6 years). North Carolina
            mandates fixed statutory SDIP percentage surcharges (+30% for 1 pt, +45% for 2 pts, +80%
            for 4 pts) under N.C.G.S. § 58-36-65.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-lg font-bold text-[#0f2747]">3. Expected Value (EV) Defense Comparison</h2>
          <p>
            Our Fight vs. Pay ROI simulator computes Expected Cost as{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">
              EV = Legal_Cost + (1 - P_dismissal) * Fallback_Cost
            </code>
            , accounting for whether a state preserves Traffic School masking (e.g., CA CVC § 40902 +
            § 42005) as a post-declaration fallback.
          </p>
        </section>

        <div className="pt-2">
          <Link href="/statutes/" className="text-xs font-bold text-[#059669] hover:underline">
            Inspect All 51 Jurisdiction Statutes →
          </Link>
        </div>
      </div>
    </div>
  );
}
