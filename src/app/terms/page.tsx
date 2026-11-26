import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Use & Legal Disclaimer (2026)",
  description:
    "Terms of use, educational scope, intellectual property, and legal disclaimer for TicketFig.com.",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Terms & Disclaimer", url: "https://ticketfig.com/terms/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Terms of Use &amp; Legal Disclaimer</h1>
        <p className="text-sm text-slate-600">
          Effective Date: January 1, 2026 · Governing access to TicketFig.com calculators,
          statutory guides, and digital defense templates.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            1. Acceptance of Terms &amp; Educational Purpose
          </h2>
          <p>
            By accessing or using TicketFig.com, you agree to be bound by these Terms of Use.
            TicketFig.com provides statutory summaries, actuarial auto insurance surcharge
            estimates, DMV point trackers, and self-help document templates for educational and
            informational purposes only. Nothing on this website constitutes formal legal advice,
            and use of our calculators or downloadable kits does not establish an attorney-client
            relationship.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            2. User Responsibility for Court Deadlines &amp; Criminal Charges
          </h2>
          <p>
            Traffic infraction procedures, bail deposit rules, and traffic school eligibility
            windows vary by state and county court. You are solely responsible for verifying your
            citation&apos;s due date, mandatory appearance status, and bail amount directly with
            the issuing court or state DMV. For misdemeanor or criminal traffic charges—such as
            reckless driving, DUI/DWI, excessive speed misdemeanors, or driving on a suspended
            license—you should consult a licensed traffic defense attorney in your jurisdiction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            3. Digital Kits, Licensing &amp; 30-Day Refund Policy
          </h2>
          <p>
            Optional downloadable kits (including <code>.docx</code> Written Declaration templates,
            Radar/LiDAR discovery motions, and <code>.xlsx</code> ROI ledgers) are licensed for
            personal, non-commercial use by the purchaser. Redistribution, resale, or automated
            scraping of TicketFig&apos;s proprietary 51-state datasets is prohibited. All digital
            kit purchases processed via Dodo Payments are covered by a 30-day money-back guarantee;
            contact{" "}
            <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              editorial@ticketfig.com
            </span>{" "}
            with your order ID for refund support.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            4. Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p>
            TicketFig.com and all statutory datasets are provided &ldquo;as is&rdquo; without
            warranties of any kind, express or implied, regarding court outcomes, fine reductions,
            or exact insurance renewal quotes. To the fullest extent permitted by law, TicketFig
            shall not be liable for any indirect, incidental, or consequential damages arising from
            your use of this website. See our dedicated{" "}
            <Link href="/disclaimer/" className="text-[#059669] font-semibold hover:underline">
              Legal Disclaimer
            </Link>{" "}
            for full scope limitations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            5. Intellectual Property, Third-Party Links &amp; Governing Law
          </h2>
          <p>
            All original actuarial models, calculator interfaces, statutory comparison tables, and
            written guide content on TicketFig.com are protected by U.S. copyright law. You may
            print or export individual calculation briefs for your personal, non-commercial use.
            TicketFig.com contains outbound links to official <code>.gov</code> court and DMV
            portals as well as third-party payment and advertising partners; we are not responsible
            for the content or availability of external websites.
          </p>
          <p>
            We reserve the right to update these Terms of Use at any time to reflect legislative
            changes or platform enhancements. Continued use of TicketFig.com after updated terms
            are posted constitutes acceptance of the revised terms. These Terms are governed by
            the laws of the United States without regard to conflict-of-law principles. If any
            provision of these Terms is held invalid or unenforceable by a court of competent
            jurisdiction, the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold">
          <Link href="/disclaimer/" className="text-[#0f2747] hover:underline">
            Full Legal Disclaimer →
          </Link>
          <Link href="/privacy/" className="text-[#059669] hover:underline">
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
