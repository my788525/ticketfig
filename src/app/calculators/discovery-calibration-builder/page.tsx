import type { Metadata } from "next";
import Link from "next/link";
import DiscoveryCalibrationBuilder from "@/components/calculators/DiscoveryCalibrationBuilder";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Written Declaration & Radar/FOIA Discovery Builder (2026) | TicketFig",
  description:
    "Generate a 5-point Pre-Trial Informal Discovery Checklist and Formal Discovery Request for Stalker DSR 2X Radar, ProLaser 4 LiDAR, MPH Bee III, and Pacing citations.",
  alternates: {
    canonical: "/calculators/discovery-calibration-builder/",
  },
};

const FAQS = [
  {
    question: "What 5 records should I demand in Radar/LiDAR pre-trial discovery?",
    answer:
      "Always request (1) Tuning Fork / calibration logs, (2) the agency's FCC Station License, (3) the officer's POST Radar/LiDAR certification, (4) the current Engineering & Traffic Survey (ETS), and (5) a dashcam/bodycam retention notice.",
  },
  {
    question: "When should I serve an Informal Discovery Request before my court date?",
    answer:
      "Serve your written discovery request at least 15 to 21 days before your arraignment, written declaration deadline, or trial date via certified mail or agency records portal so you can document any failure to produce.",
  },
];

export default function DiscoveryCalibrationBuilderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "Written Declaration & Radar/FOIA Discovery Builder",
            description:
              "Builds a 5-point Pre-Trial Informal Discovery Checklist, copyable Formal Discovery Request, and .ics statutory deadline reminder for Radar, LiDAR, and Pacing citations.",
            url: "https://ticketfig.com/calculators/discovery-calibration-builder/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            {
              name: "Discovery & Calibration Builder",
              url: "https://ticketfig.com/calculators/discovery-calibration-builder/",
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
          / Calculators / Discovery &amp; Calibration Builder
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Written Declaration &amp; Radar/FOIA Discovery Builder
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Build a customized 5-point Pre-Trial Informal Discovery Checklist and Formal Discovery
          Request tailored to your state, court, citation number, speed device, and issuing agency.
        </p>
      </div>

      <DiscoveryCalibrationBuilder />

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
