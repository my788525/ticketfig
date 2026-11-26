import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Editorial Policy & Verification Standards",
  description:
    "How TicketFig researches, verifies, and updates 51-jurisdiction DMV point schedules, court assessment multipliers, and insurance surcharge benchmarks.",
  alternates: {
    canonical: "/editorial-policy/",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Editorial Policy", url: "https://ticketfig.com/editorial-policy/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          Editorial Policy &amp; Statutory Verification Standards
        </h1>
        <p className="text-sm text-slate-600">
          How TicketFig Legal &amp; Actuarial Research maintains institutional accuracy across all 50
          U.S. states and Washington, D.C.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            1. Primary-Source Statutory Citation Standard
          </h2>
          <p>
            Every jurisdiction dossier, calculator parameter, and defense guide on TicketFig.com is
            anchored to primary statutory text and official government publications. Our research
            desk relies directly on state vehicle codes (for example, California Vehicle Code §§
            40802, 40902, and 42005; New York Vehicle &amp; Traffic Law § 1180; North Carolina
            General Statutes § 58-36-65), state DMV point schedules, Judicial Council uniform bail
            and penalty schedules, and state Department of Insurance rate bureau filings.
          </p>
          <p>
            We do not copy unverified fine tables or generic legal-blog averages. Where a state
            imposes statutory surcharges on top of base fines—such as California&apos;s ~4.5x
            penalty assessment multiplier, New York&apos;s 6-point Driver Responsibility Assessment
            ($300+), or New Jersey&apos;s MVC annual point surcharges—we model those exact
            statutory formulas explicitly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            2. Actuarial Modeling &amp; Conflict-of-Interest Independence
          </h2>
          <p>
            TicketFig.com does not sell leads to auto insurance carriers, traffic schools, or law
            firms, and no insurer or legal marketing network influences our Fight vs. Pay expected
            value calculations. When a calculator recommends paying a ticket, attending traffic
            school, filing a Trial by Written Declaration, or retaining local counsel, that
            recommendation is driven solely by transparent mathematical expected value and state
            eligibility rules.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            3. Quarterly Review Cycle &amp; Rapid Correction Protocol
          </h2>
          <p>
            State legislatures and state DMVs regularly update speeding thresholds, traffic school
            cooldown windows, and statutory court fees. TicketFig conducts a full 51-jurisdiction
            dataset audit each quarter and logs every statutory or algorithmic update in our{" "}
            <Link href="/changelog/" className="text-[#059669] font-semibold hover:underline">
              2026 Statutory Changelog
            </Link>
            .
          </p>
          <p>
            Readers, attorneys, and court clerks who identify a legislative amendment, local court
            rule change, or citation discrepancy can submit a correction directly to{" "}
            <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              editorial@ticketfig.com
            </span>
            . Verified statutory updates are prioritized and published within five business days
            with an updated verification timestamp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            4. Advertising &amp; Editorial Separation
          </h2>
          <p>
            To keep our 51-state calculators and statutory reference guides free to the public,
            TicketFig may display third-party advertising (including Google AdSense) and offer
            optional downloadable document kits. Advertising placements are clearly separated from
            editorial content and never alter statutory data, DMV point counts, or ROI outputs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            5. Human Review, AI Assistance Disclosure &amp; Citation Hygiene
          </h2>
          <p>
            TicketFig&apos;s statutory tables and actuarial calculators are authored and reviewed
            against primary <code>.gov</code> legislative text, state DMV manuals, and Judicial
            Council schedules. Where software automation assists with formatting or cross-checking
            large 51-state datasets, every statutory citation, point threshold, and surcharge formula
            undergoes human editorial verification prior to publication. We never publish
            fabricated case citations, unverified fine multipliers, or synthetic court outcomes.
          </p>
          <p>
            All Real-Ledger Case Studies and Direct Answer tables are clearly labeled with their
            controlling statutory authority and effective verification year so readers can audit
            every assumption independently. Whenever a statutory amendment or Judicial Council fee
            update takes effect, our editorial team updates the affected state dossier, refreshes
            the verification timestamp, and logs the change in our public changelog.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold">
          <Link href="/methodology/" className="text-[#0f2747] hover:underline">
            Read Actuarial Methodology →
          </Link>
          <Link href="/statutes/" className="text-[#059669] hover:underline">
            Inspect 51-State Statutes →
          </Link>
          <Link href="/disclaimer/" className="text-slate-600 hover:underline">
            Legal Disclaimer →
          </Link>
        </div>
      </div>
    </div>
  );
}
