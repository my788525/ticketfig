import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2026 Statutory & Platform Changelog",
  description:
    "Release history, 51-jurisdiction dataset audits, and statutory verification log for TicketFig.com.",
  alternates: {
    canonical: "/changelog/",
  },
};

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Changelog", url: "https://ticketfig.com/changelog/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">2026 Statutory Changelog</h1>
        <p className="text-sm text-slate-600">
          Verified dataset updates, new actuarial workbenches, and compliance releases for
          TicketFig.com.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-l-4 border-[#c8a24a] pl-4 space-y-1.5">
          <div className="text-xs font-bold text-[#c8a24a]">
            2026-11-26 · v1.2.0 Compliance, Canonicals &amp; Governance Release
          </div>
          <h2 className="text-base font-bold text-[#0f2747]">
            Full-Site Canonical Architecture, Privacy Consent &amp; Long-Form Trust Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Deployed explicit canonical link coverage across all 80+ static and dynamic routes,
            launched dedicated{" "}
            <Link href="/disclaimer/" className="text-[#059669] font-semibold hover:underline">
              Legal Disclaimer
            </Link>{" "}
            and{" "}
            <Link
              href="/editorial-policy/"
              className="text-[#059669] font-semibold hover:underline"
            >
              Editorial Policy
            </Link>{" "}
            pages, added GDPR/CCPA Cookie &amp; AdSense disclosures to the Privacy Policy, and
            mounted a non-intrusive client-side Cookie Consent banner.
          </p>
        </div>

        <div className="border-l-4 border-[#0f2747] pl-4 space-y-1.5">
          <div className="text-xs font-bold text-[#0f2747]">
            2026-11-12 · v1.1.0 Forensics &amp; Discovery Workbenches
          </div>
          <h2 className="text-base font-bold text-[#0f2747]">
            Ticket Error Forensics Auditor, Calibration Discovery Builder &amp; Pitfalls Playbook
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Added the{" "}
            <Link
              href="/calculators/ticket-error-forensics/"
              className="text-[#059669] font-semibold hover:underline"
            >
              Ticket &amp; Speed-Trap Forensics Auditor
            </Link>{" "}
            (covering Cal. Veh. Code § 40802 ETS windows and Radar/LiDAR occlusion defects), the{" "}
            <Link
              href="/calculators/discovery-calibration-builder/"
              className="text-[#059669] font-semibold hover:underline"
            >
              Radar/FOIA Discovery Builder
            </Link>{" "}
            for Stalker DSR 2X and ProLaser 4 citations, and the{" "}
            <Link href="/pitfalls/" className="text-[#059669] font-semibold hover:underline">
              Pitfalls &amp; Traps Survival Playbook
            </Link>
            .
          </p>
        </div>

        <div className="border-l-4 border-[#059669] pl-4 space-y-1.5">
          <div className="text-xs font-bold text-[#059669]">
            2026-10-23 · v1.0.0 Institutional Launch
          </div>
          <h2 className="text-base font-bold text-[#0f2747]">
            Full 51-Jurisdiction Statutory Dataset &amp; 4 Executive Workbenches
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Launched verified 2026 DMV point schedules across all 50 states + D.C., 3-year auto
            insurance surcharge benchmarks, NY DRA / NJ MVC / NC SDIP statutory triggers, CA CVC §
            40902 Written Declaration eligibility generator, 3 Real-Ledger Case Studies, and 6 deep
            actuarial defense guides.
          </p>
        </div>

        <section className="pt-4 border-t border-slate-100 space-y-3 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-bold text-[#0f2747]">
            How TicketFig Audits &amp; Versions Statutory Updates
          </h2>
          <p>
            Traffic enforcement statutes, court penalty assessment multipliers, and DMV point
            thresholds evolve continuously across 51 U.S. jurisdictions. Every release in this
            changelog reflects a documented verification pass against primary state vehicle codes,
            Judicial Council bail schedules, and state Department of Insurance rating circulars.
          </p>
          <p>
            Major legislative shifts—such as updates to California&apos;s Engineering &amp; Traffic
            Survey (ETS) speed-trap rules under CVC § 40802, North Carolina Safe Driver Incentive
            Plan (SDIP) point tiers under N.C.G.S. § 58-36-65, or New York&apos;s Driver
            Responsibility Assessment (DRA) thresholds—are prioritized in our quarterly review
            cycle and published with an explicit effective date.
          </p>
          <p>
            If you observe a newly enacted state bill, local court fee schedule revision, or DMV
            traffic school cooldown change not yet reflected in our calculators, please submit the
            primary <code>.gov</code> citation to{" "}
            <Link href="/contact/" className="text-[#059669] font-semibold hover:underline">
              editorial@ticketfig.com
            </Link>{" "}
            for rapid verification and inclusion in the next release.
          </p>
          <p>
            In addition to statutory point and surcharge tables, our changelog tracks updates to
            browser-side actuarial formulas, Expected Value (EV) fallback modeling, and JSON-LD
            structured data schemas. Each release is tested against all 51 jurisdiction dossiers
            and all six specialized calculators—including the 3-Year Insurance Surcharge
            Calculator, Fight vs. Pay ROI Simulator, License Points Tracker, Written Declaration
            Generator, Ticket Error Forensics Auditor, and Discovery Calibration Builder—to ensure
            zero regressions in statutory math or client-side privacy guarantees.
          </p>
          <p>
            We also maintain backward-compatible archival notes for major multi-year regulatory
            transitions, such as Texas&apos;s repeal of the Driver Responsibility Program (HB
            2048) and periodic updates to California&apos;s Judicial Council Uniform Bail and
            Penalty Schedules, so drivers and researchers can trace why historical and 2026
            projections differ.
          </p>
        </section>
      </div>
    </div>
  );
}
