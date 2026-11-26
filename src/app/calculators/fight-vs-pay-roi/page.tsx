import type { Metadata } from "next";
import Link from "next/link";
import FightVsPayRoiCalculator from "@/components/calculators/FightVsPayRoiCalculator";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Fight vs. Pay Ticket 3-Year ROI Simulator",
  description:
    "Compare paying a speeding ticket vs. traffic school vs. Trial by Written Declaration vs. hiring a traffic lawyer on a 3-year net expected value basis.",
  alternates: {
    canonical: "/calculators/fight-vs-pay-roi/",
  },
};

const FAQS = [
  {
    question: "Is it worth fighting a speeding ticket if I can just take traffic school?",
    answer:
      "In states like California (CVC § 40902), you can contest by Written Declaration first with zero court appearance and preserve traffic school as a fallback—giving you a chance at $0 fine and keeping your 18-month traffic school cooldown intact.",
  },
  {
    question: "When should I hire a local traffic attorney instead of fighting by mail?",
    answer:
      "In states without mail-in written trials—especially North Carolina (SDIP points), New York (6+ pt DRA), and Virginia (Reckless Driving at 20+ mph over)—retaining local counsel for $195–$350 routinely yields a 0-point amendment or PJC that saves $1,800–$3,200.",
  },
];

export default function FightVsPayRoiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "Fight vs. Pay Speeding Ticket 3-Year ROI Simulator",
            description:
              "Simulates 3-year expected cost across paying outright, traffic school masking, self-filed written declaration, and local counsel representation.",
            url: "https://ticketfig.com/calculators/fight-vs-pay-roi/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "Fight vs. Pay ROI", url: "https://ticketfig.com/calculators/fight-vs-pay-roi/" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> / Calculators / Fight vs. Pay ROI
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Fight vs. Pay Speeding Ticket 3-Year ROI Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Quantify the expected 3-year financial return of contesting via Written Declaration,
          electing statutory Traffic School, or retaining local counsel vs. paying the citation.
        </p>
      </div>

      <FightVsPayRoiCalculator />

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
