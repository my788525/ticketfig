import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import ContactMessageForm from "@/components/ContactMessageForm";

export const metadata: Metadata = {
  title: "Contact & Statutory Corrections Desk",
  description:
    "Report a statutory update, court fee schedule change, DMV point amendment, or editorial inquiry to TicketFig.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Contact", url: "https://ticketfig.com/contact/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          Contact &amp; Statutory Corrections Desk
        </h1>
        <p className="text-sm text-slate-600">
          Submit 2026 vehicle code updates, county bail schedule revisions, insurance rating
          bulletins, or general editorial inquiries.
        </p>
      </div>

      <ContactMessageForm />

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">Direct Editorial &amp; Research Email</h2>
          <p>
            State traffic statutes, Judicial Council penalty assessment multipliers, and state DMV
            point schedules change throughout the legislative year. If you are a driver, traffic
            attorney, court administrator, or actuary who has spotted a legislative amendment,
            updated fine multiplier, or broken official <code>.gov</code> citation link, please
            contact our statutory research desk directly:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm font-bold text-[#0f2747] flex flex-wrap items-center justify-between gap-2">
            <span>editorial@ticketfig.com</span>
            <span className="text-[11px] font-sans font-semibold text-[#059669]">
              Target Response: 2–5 Business Days
            </span>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            What to Include in a Statutory Correction Report
          </h2>
          <p>
            To help our verification team audit and deploy updates rapidly across all 51
            jurisdiction dossiers, please include the following details in your message:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>
              <strong>Jurisdiction &amp; Statute Citation:</strong> The state or D.C. dossier URL
              and the controlling vehicle code section (e.g., <code>CVC § 40902</code>,{" "}
              <code>N.C.G.S. § 58-36-65</code>, or <code>VTL § 1180</code>).
            </li>
            <li>
              <strong>Primary Government Source:</strong> A link to the official <code>.gov</code>{" "}
              legislature bill, state DMV point schedule, or Judicial Council uniform bail schedule
              reflecting the updated rule.
            </li>
            <li>
              <strong>Effective Date:</strong> The statutory effective date of the fee, point
              threshold, or traffic school cooldown change so we can document it in our{" "}
              <Link href="/changelog/" className="text-[#059669] font-semibold hover:underline">
                2026 Statutory Changelog
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            Digital Kit Support &amp; Pass Key Assistance
          </h2>
          <p>
            If you purchased an All-Access Matrix Pass or downloadable defense packet via Dodo
            Payments and need assistance retrieving your pass key or downloading your{" "}
            <code>.docx</code> / <code>.xlsx</code> templates, email{" "}
            <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              editorial@ticketfig.com
            </span>{" "}
            with your checkout receipt ID. Every digital kit is backed by our 30-day money-back
            guarantee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">Important Legal Representation Notice</h2>
          <p>
            TicketFig.com is an educational and actuarial research platform. We are not a law firm
            and cannot provide individualized legal advice, review your specific traffic citation
            for representation, or enter court appearances on your behalf. For individualized legal
            counsel—particularly for criminal traffic charges such as reckless driving, DUI, or
            suspended-license citations—please consult a licensed attorney in your jurisdiction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            Press, Actuarial Partnerships &amp; Data Licensing Inquiries
          </h2>
          <p>
            Journalists, consumer-finance writers, and academic researchers covering auto insurance
            inflation, municipal traffic-fine dependency, or state DMV point reform are welcome to
            cite TicketFig&apos;s 51-jurisdiction dataset with attribution to{" "}
            <code>TicketFig.com</code>. For media commentary, custom state-by-state surcharge
            tabulations, or institutional API/data inquiries, please include &ldquo;Media / Data
            Inquiry&rdquo; in the subject line when emailing{" "}
            <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              editorial@ticketfig.com
            </span>
            .
          </p>
          <p>
            We also welcome feedback on accessibility, browser compatibility, and calculator edge
            cases. Every bug report or statutory update submitted by our readers is logged by our
            editorial engineering team and audited during our quarterly 51-state verification
            cycle. Before writing in about a specific state&apos;s point threshold or written
            declaration eligibility, we recommend checking our{" "}
            <Link href="/statutes/" className="text-[#059669] font-semibold hover:underline">
              Primary Statutes Compendium
            </Link>{" "}
            and{" "}
            <Link href="/methodology/" className="text-[#059669] font-semibold hover:underline">
              Actuarial Methodology
            </Link>{" "}
            to see the exact vehicle code section and rate-bureau formula currently in production.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold">
          <Link href="/editorial-policy/" className="text-[#0f2747] hover:underline">
            Read Editorial Policy →
          </Link>
          <Link href="/disclaimer/" className="text-[#059669] hover:underline">
            Legal Disclaimer →
          </Link>
          <Link href="/privacy/" className="text-slate-600 hover:underline">
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
