import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Use & Legal Disclaimer",
  description: "Educational and actuarial reference terms for TicketFig.com.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Terms & Disclaimer", url: "https://ticketfig.com/terms/" },
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Terms of Use &amp; Legal Disclaimer</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          <strong>Not Legal Advice:</strong> TicketFig.com provides statutory summaries, actuarial
          insurance surcharge estimates, and self-help document templates for educational and
          informational purposes only. Nothing on this site constitutes formal legal advice or
          creates an attorney-client relationship.
        </p>
        <p>
          Always verify deadlines, bail amounts, and local court rules directly with the issuing
          court or your state DMV. For misdemeanor or criminal traffic charges (such as reckless
          driving or DUI), consult a licensed traffic attorney in your jurisdiction.
        </p>
      </div>
    </div>
  );
}
