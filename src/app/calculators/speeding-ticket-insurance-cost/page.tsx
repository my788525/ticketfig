import type { Metadata } from "next";
import Link from "next/link";
import SpeedingTicketCostCalculator from "@/components/calculators/SpeedingTicketCostCalculator";
import StatutoryAuditStamp from "@/components/StatutoryAuditStamp";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Speeding Ticket Insurance Cost Calculator",
  description:
    "Calculate your true speeding ticket cost across all 50 states + DC: base court fine, statutory penalty assessments, DMV points, and 3-year cumulative auto insurance surcharge.",
  alternates: {
    canonical: "/calculators/speeding-ticket-insurance-cost/",
  },
};

const FAQS = [
  {
    question: "How much does a speeding ticket raise car insurance over 3 years?",
    answer:
      "Across U.S. carriers, a single unmasked minor speeding ticket (1–14 mph over) raises auto insurance premiums by 18% to 30% per year for 36 months, totaling $1,200 to $2,400+ on a standard policy. Major violations (15+ mph over) or North Carolina SDIP points can trigger 35% to 80% hikes.",
  },
  {
    question: "Why is a $35 California speeding ticket $238 at checkout?",
    answer:
      "California adds mandatory state and county penalty assessments under the Penal Code and Government Code that multiply a $35 base fine by ~4.5x, plus an unmasked NOTS point strips the statutory 20% Proposition 103 Good Driver Discount.",
  },
];

export default function SpeedingTicketInsuranceCostPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "Speeding Ticket & 3-Year Insurance Cost Calculator",
            description:
              "Models court fines, statutory penalty assessments, and 3-year cumulative auto insurance premium surcharges across all 51 U.S. jurisdictions.",
            url: "https://ticketfig.com/calculators/speeding-ticket-insurance-cost/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "Insurance Cost Calculator", url: "https://ticketfig.com/calculators/speeding-ticket-insurance-cost/" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> / Calculators / 3-Year Insurance Surcharge
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Speeding Ticket &amp; 3-Year Insurance Cost Calculator (2026)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          The printed fine is only the tip of the iceberg. Audit your statutory court assessments,
          state DMV surcharges, and 36-to-60 month auto insurance premium exposure before you pay.
        </p>
        <StatutoryAuditStamp />
      </div>

      <SpeedingTicketCostCalculator />

      {/* Worked Verification Math Example */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 no-print">
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#059669] text-[11px] font-bold uppercase tracking-wider">
            Worked Verification Math Example
          </span>
          <h2 className="text-xl font-extrabold text-[#0f2747]">
            36-Month Surcharge + Expected Value (EV) Walkthrough
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
            Example: A California driver paying <strong>$2,400/yr</strong> for auto insurance receives a
            minor speeding citation (+13 mph, <strong>CVC § 22349</strong>) with a <strong>$35</strong> base fine:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <div className="font-bold text-rose-900">1. Court Fine + 36-Mo Surcharge</div>
            <div className="text-lg font-extrabold text-rose-700">$1,894 Total Exposure</div>
            <p className="text-rose-800/90 leading-relaxed">
              Court bail: $35 × 6.8x = <strong>$238</strong>. Insurance hike (+23%/yr for 36 mos):
              $2,400 × 23% × 3 yrs = <strong>$1,656</strong>. Total if paid = <strong>$1,894</strong>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="font-bold text-amber-900">2. Traffic School Fallback (CVC § 42005)</div>
            <div className="text-lg font-extrabold text-amber-800">$423 Total Cost</div>
            <p className="text-amber-900/90 leading-relaxed">
              $238 court bail + $65 school fee + $120 time cost = <strong>$423</strong> (masks 1 NOTS
              point, saving <strong>$1,471</strong> vs. paying outright).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#0f2747] text-white border border-slate-800 space-y-1">
            <div className="font-bold text-[#c8a24a]">3. Written Declaration EV (45% Win)</div>
            <div className="text-lg font-extrabold text-white">$233 Expected Cost</div>
            <p className="text-slate-300 leading-relaxed">
              EV = (1 − 0.45) × $423 = <strong>$233</strong> (45% chance of $0; 55% fallback to traffic
              school). Net expected savings: <strong>$1,661</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 no-print">
        <h2 className="text-lg font-bold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div key={f.question} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="text-sm font-bold text-[#0f2747]">{f.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
