import type { Metadata } from "next";
import Link from "next/link";
import TicketErrorForensics from "@/components/calculators/TicketErrorForensics";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Ticket & Speed-Trap Forensics Auditor (2026)",
  description:
    "Audit traffic citations for speed-trap violations (Cal. Veh. Code § 40802), expired Engineering & Traffic Surveys (ETS), Radar/LiDAR occlusion, and procedural defects across all 51 jurisdictions.",
  alternates: {
    canonical: "/calculators/ticket-error-forensics/",
  },
};

const FAQS = [
  {
    question: "What is California's Speed Trap Law (Cal. Veh. Code § 40802)?",
    answer:
      "Under Cal. Veh. Code §§ 40802–40805, radar or laser speed evidence on a non-local street is inadmissible if the jurisdiction has not conducted a valid Engineering & Traffic Survey (ETS) within the statutory 5-to-7-year window.",
  },
  {
    question: "Which speed measurement method is easiest to challenge?",
    answer:
      "Visual estimation and pacing carry the highest foundational vulnerability because they depend on officer perception, constant-distance tracking, and patrol speedometer certification without independent electronic calibration logs.",
  },
];

export default function TicketErrorForensicsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "Ticket & Speed-Trap Forensics Auditor",
            description:
              "Scores traffic ticket dismissal leverage (0-100) across 51 jurisdictions, speed measurement methods, and 6 forensic citation/roadway defects.",
            url: "https://ticketfig.com/calculators/ticket-error-forensics/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            {
              name: "Ticket & Speed-Trap Forensics Auditor",
              url: "https://ticketfig.com/calculators/ticket-error-forensics/",
            },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">
            Home
          </Link>{" "}
          / Calculators / Ticket &amp; Speed-Trap Forensics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Ticket &amp; Speed-Trap Forensics Auditor
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Audit your citation for speed-trap statutes (e.g., Cal. Veh. Code § 40802), expired
          Engineering &amp; Traffic Surveys, Radar/LiDAR occlusion, and facial citation defects to
          generate a printable Courtroom / Written Declaration Defense Outline.
        </p>
      </div>

      <TicketErrorForensics />

      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 no-print">
        <h2 className="text-lg font-bold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div
              key={f.question}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
            >
              <h3 className="text-sm font-bold text-[#0f2747]">{f.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
