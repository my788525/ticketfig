import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About TicketFig.com",
  description:
    "TicketFig is an institutional-grade U.S. traffic citation actuarial and statutory defense reference platform covering all 50 states + DC.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "About", url: "https://ticketfig.com/about/" },
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">About TicketFig.com</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          <strong>TicketFig.com</strong> was built for North American professionals who treat a
          traffic citation as a 3-to-5-year financial risk event rather than a one-time fine.
        </p>
        <p>
          Every state DMV point schedule, statutory penalty assessment multiplier, insurance
          surcharge benchmark, and Written Declaration statute on TicketFig is cross-checked against
          official <code>.gov</code> vehicle codes and rate bureau filings. All calculations run
          100% locally in your browser with zero personal data uploaded.
        </p>
      </div>
    </div>
  );
}
