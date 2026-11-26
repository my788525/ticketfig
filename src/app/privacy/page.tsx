import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy — 100% Client-Side Execution",
  description: "TicketFig executes all traffic ticket and insurance calculations 100% in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Privacy Policy", url: "https://ticketfig.com/privacy/" },
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Privacy Policy</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          <strong>Zero Server-Side Citation Storage:</strong> All TicketFig calculators, written
          declaration generators, and discovery briefs execute 100% client-side inside your web
          browser. We do not collect, transmit, or store your citation numbers, driving record, or
          insurance policy details on our servers.
        </p>
        <p>
          We use privacy-preserving aggregate analytics to measure page performance and improve
          statutory coverage. Digital kit purchases are processed securely via Dodo Payments.
        </p>
      </div>
    </div>
  );
}
