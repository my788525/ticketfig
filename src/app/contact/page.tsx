import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact & Statutory Corrections",
  description: "Report a statutory update, court fee schedule change, or editorial inquiry to TicketFig.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Contact", url: "https://ticketfig.com/contact/" },
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Contact &amp; Statutory Corrections</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700">
        <p>
          Notice a state DMV point schedule update, county court fee adjustment, or statute
          amendment? Reach our statutory research desk at:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-[#0f2747]">
          editorial@ticketfig.com
        </div>
        <p className="text-xs text-slate-500">
          Note: TicketFig is an educational and actuarial research platform and cannot provide
          individualized legal representation.
        </p>
      </div>
    </div>
  );
}
