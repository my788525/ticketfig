import type { Metadata } from "next";
import Link from "next/link";
import LicensePointsCalculator from "@/components/calculators/LicensePointsCalculator";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "DMV License Points & State Surcharge Trigger Tracker (2026)",
  description:
    "Track state DMV point accumulation, suspension thresholds, New York 6-point Driver Responsibility Assessment ($300+), New Jersey MVC surcharges, and NC SDIP triggers.",
  alternates: {
    canonical: "/calculators/license-points-calculator/",
  },
};

const FAQS = [
  {
    question: "How many points trigger the New York Driver Responsibility Assessment (DRA)?",
    answer:
      "Accumulating 6 or more NYS DMV points within an 18-month period triggers a mandatory $300 Driver Responsibility Assessment ($100/year for 3 years), plus $75 ($25/year for 3 years) for each additional point.",
  },
  {
    question: "Did Texas repeal DMV driver license points?",
    answer:
      "Yes. Texas repealed the Driver Responsibility Program (DRP) points and annual state surcharges in 2019 (HB 2048). However, auto insurers still surcharge un-dismissed Texas speeding convictions by 20% to 35% for 36 months.",
  },
];

export default function LicensePointsCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "DMV License Points & State Surcharge Trigger Tracker",
            description:
              "Tracks DMV license points, suspension cliffs, and state-level assessments across all 51 U.S. jurisdictions.",
            url: "https://ticketfig.com/calculators/license-points-calculator/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "License Points Tracker", url: "https://ticketfig.com/calculators/license-points-calculator/" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> / Calculators / License Points Tracker
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          DMV License Points &amp; Surcharge Trigger Tracker (2026)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Audit your active DMV points against state suspension thresholds and statutory surcharge
          cliffs (NY 6-pt DRA, NJ 6-pt MVC Surcharge, CA NOTS, and NC SDIP).
        </p>
      </div>

      <LicensePointsCalculator />

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
