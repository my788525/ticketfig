import Link from "next/link";
import type { Metadata } from "next";
import { CASE_STUDIES_2026 } from "@/data/cases_and_guides_2026";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Real-Ledger Traffic Ticket Defense Case Studies (2026)",
  description:
    "Verified line-by-line 3-year financial ledgers showing how California CVC § 40902, North Carolina PJC, and New York plea-by-mail saved $1,890 to $2,393.",
  alternates: {
    canonical: "/cases/",
  },
};

export default function CasesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Case Studies", url: "https://ticketfig.com/cases/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Real-Ledger Traffic Defense Case Studies (2026)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Side-by-side 3-year actuarial comparisons between paying a citation outright vs. executing
          a statutory defense in California, North Carolina, and New York.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDIES_2026.map((c) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}/`}
            className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 shadow-xs transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#c8a24a] uppercase">{c.stateName}</span>
                <span className="font-extrabold text-[#059669] tabular-nums">{c.netSavings} Saved</span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0f2747] leading-snug">{c.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{c.summary}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs font-bold text-[#0f2747]">
              Read Full Case Ledger →
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Why Line-by-Line 3-Year Ledgers Matter More Than Bail Amounts
        </h2>
        <p>
          Generic traffic-ticket articles rarely show the full cash-flow math over a 36-month
          underwriting cycle. When a driver pleads guilty by mail to save an afternoon off work,
          they lock in three separate financial drains: (1) the court fine plus mandatory state
          penalty assessments, (2) any state-level point surcharge such as New York&apos;s Driver
          Responsibility Assessment, and (3) 36 months of auto insurance premium surcharges and lost
          good-driver discounts.
        </p>
        <p>
          Each TicketFig Real-Ledger Case Study audits these two paths side by side—<strong>Path A
          (Pay Outright)</strong> versus <strong>Path B (Statutory Defense or Mitigation)</strong>—using
          verified 2026 court schedules and state insurance rating rules:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
          <li>
            <strong>California (CVC § 40902):</strong> Demonstrates how contesting via Trial by
            Written Declaration with Form TR-205 and a Radar/ETS discovery demand preserves traffic
            school fallback while eliminating the 20% Proposition 103 Good Driver Discount loss.
          </li>
          <li>
            <strong>North Carolina (N.C.G.S. § 58-36-65):</strong> Quantifies the massive 3-year
            savings of securing a Prayer for Judgment Continued (PJC) or 0-point improper-equipment
            reduction to avoid a +30% to +80% mandatory SDIP insurance hike.
          </li>
          <li>
            <strong>New York (VTL § 1180 / DRA):</strong> Models how a mail-in plea reduction
            outside New York City&apos;s TVB prevents crossing the 6-point threshold that triggers
            the $300+ NYS Driver Responsibility Assessment.
          </li>
        </ul>
        <p>
          To run the same 3-year ledger calculation on your own citation, launch the{" "}
          <Link
            href="/calculators/speeding-ticket-insurance-cost/"
            className="text-[#059669] font-semibold hover:underline"
          >
            3-Year Insurance Surcharge Calculator
          </Link>{" "}
          or inspect your state&apos;s dossier in our{" "}
          <Link href="/states/" className="text-[#059669] font-semibold hover:underline">
            51-Jurisdiction Directory
          </Link>
          . Each case ledger also documents the exact court filing fees, traffic school tuition,
          and expected-value breakeven thresholds so you can verify every dollar before choosing a
          defense strategy.
        </p>
      </section>
    </div>
  );
}
