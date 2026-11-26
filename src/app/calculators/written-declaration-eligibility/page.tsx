import type { Metadata } from "next";
import Link from "next/link";
import WrittenDeclarationGenerator from "@/components/calculators/WrittenDeclarationGenerator";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Trial by Written Declaration & Calibration Discovery Generator (2026)",
  description:
    "Check state Trial by Written Declaration eligibility (Cal. Veh. Code § 40902, ORS § 153.080, WA IRLJ 3.5) and generate Radar/LiDAR calibration discovery requests.",
};

const FAQS = [
  {
    question: "Which states allow a full Trial by Written Declaration by mail?",
    answer:
      "California (Cal. Veh. Code § 40902, Form TR-205), Oregon (ORS § 153.080), Washington (IRLJ 3.5), Hawaii (HRS § 291D-6), DC, and Florida (Rule 6.340 Affidavit of Defense) provide statutory written-statement contest procedures. Several other states allow mail-in plea bargaining (e.g., NY outside TVB, CT, NJ).",
  },
  {
    question: "What records should I request in Radar/LiDAR informal discovery?",
    answer:
      "Request 90-day device maintenance and tuning fork calibration logs, the citing officer's POST/state Radar or LiDAR operator certification, and the current Engineering & Traffic Survey (ETS) for the cited roadway.",
  },
];

export default function WrittenDeclarationEligibilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "Trial by Written Declaration & Calibration Discovery Generator",
            description:
              "Checks state written declaration eligibility and generates copyable Radar/LiDAR calibration discovery requests.",
            url: "https://ticketfig.com/calculators/written-declaration-eligibility/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "Written Declaration Generator", url: "https://ticketfig.com/calculators/written-declaration-eligibility/" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> / Calculators / Written Declaration &amp; Discovery
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Written Declaration &amp; Calibration Discovery Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Verify whether your jurisdiction supports mail-in Trial by Written Declaration (e.g.,
          California CVC § 40902) and generate a customized Radar/LiDAR discovery brief.
        </p>
      </div>

      <WrittenDeclarationGenerator />

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
