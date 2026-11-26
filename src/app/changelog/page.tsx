import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2026 Statutory & Platform Changelog",
  description: "Release history and statutory verification log for TicketFig.com.",
};

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Changelog", url: "https://ticketfig.com/changelog/" },
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">2026 Statutory Changelog</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="border-l-4 border-[#059669] pl-4 space-y-1">
          <div className="text-xs font-bold text-[#059669]">2026-10-23 · v1.0.0 Institutional Launch</div>
          <h2 className="text-base font-bold text-[#0f2747]">
            Full 51-Jurisdiction Statutory Dataset &amp; 4 Executive Workbenches
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Launched verified 2026 DMV point schedules, 3-year auto insurance surcharge benchmarks,
            NY DRA / NJ MVC / NC SDIP triggers, CA CVC § 40902 Written Declaration generator, 3
            Real-Ledger Case Studies, and 6 deep SEO guides.
          </p>
        </div>
      </div>
    </div>
  );
}
