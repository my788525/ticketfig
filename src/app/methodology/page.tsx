import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Actuarial & Statutory Methodology (2026)",
  description:
    "How TicketFig models 3-year cumulative auto insurance surcharges, statutory court penalty assessments, and Expected Value ROI across 51 U.S. jurisdictions.",
  alternates: {
    canonical: "/methodology/",
  },
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Methodology", url: "https://ticketfig.com/methodology/" },
        ])}
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          Actuarial &amp; Statutory Methodology (2026)
        </h1>
        <p className="text-sm text-slate-600">
          Transparent formulas behind TicketFig&apos;s 3-year insurance surcharge, DMV point
          threshold, and Fight vs. Pay expected-value ROI models.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            1. Statutory Court Assessment Multipliers
          </h2>
          <p>
            A common mistake drivers make is assuming the base fine listed in a state vehicle code
            equals the total checkout bail. Many states impose mandatory penalty assessments,
            state/county court construction surcharges, emergency medical services funds, and
            conviction fees on top of the base statutory fine. For example, California&apos;s base
            $35 speeding fine scales by roughly 4.5x to $238 after Penal Code and Government Code
            penalty assessments. TicketFig applies state-specific assessment multipliers verified
            against 2026 uniform bail and penalty schedules so your upfront cash outlay is modeled
            accurately from day one.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            2. 36-to-72 Month Insurance Lookback &amp; Rate-Bureau Modeling
          </h2>
          <p>
            Most U.S. auto insurance carriers rate moving violations for 36 months (3 years) from
            the conviction or violation date, while Massachusetts Safe Driver Insurance Plan (SDIP)
            rates for 72 months (6 years). In addition, certain states impose statutory rating rules
            that override carrier discretion:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>North Carolina SDIP (N.C.G.S. § 58-36-65):</strong> Mandates fixed statutory
              insurance surcharge percentages (+30% for 1 SDIP point, +45% for 2 points, and +80%
              for 4 points) unless the driver qualifies for a Prayer for Judgment Continued (PJC) or
              a 0-point non-moving amendment.
            </li>
            <li>
              <strong>California Proposition 103 Good Driver Discount:</strong> An unmasked NOTS
              point disqualifies a driver from the mandatory 20% Good Driver Discount for 36 months,
              creating a dual-layer premium spike on top of carrier violation tiers.
            </li>
            <li>
              <strong>State Administrative Assessments:</strong> New York imposes a mandatory $300+
              Driver Responsibility Assessment (DRA) at 6+ points in 18 months, while New Jersey
              MVC imposes annual statutory surcharges at 6+ points.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            3. Expected Value (EV) Defense Comparison
          </h2>
          <p>
            Our Fight vs. Pay ROI simulator computes Expected Cost as{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">
              EV = Legal_Cost + (1 - P_dismissal) * Fallback_Cost
            </code>
            , accounting for whether a state preserves Traffic School masking (e.g., California
            CVC § 40902 + § 42005) as a post-declaration fallback. In jurisdictions with
            statutorily preserved traffic school fallback, contesting by Written Declaration has an
            asymmetric payoff: you gain a meaningful probability of $0 fine and 0 points while
            retaining your right to mask the point if the declaration is denied.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            4. Data Verification &amp; Update Cadence
          </h2>
          <p>
            Every parameter in our 51-jurisdiction dataset is audited quarterly against official{" "}
            <code>.gov</code> vehicle codes and state insurance department filings. Because
            individual carrier underwriting tiers vary by ZIP code, credit tier (where permitted),
            and household driving history, TicketFig expresses surcharge outputs as calibrated
            statewide benchmarks rather than binding carrier quotes.
          </p>
          <p>
            Where a state uses non-numeric point tracking (such as Texas after the 2019 repeal of
            the Driver Responsibility Program under HB 2048, or Oregon&apos;s violation-count
            system), our models still capture the 36-month carrier surcharge triggered by a moving
            violation conviction on your Motor Vehicle Record (MVR). This ensures drivers in
            &ldquo;no-point&rdquo; states do not underestimate the true 3-year cost of pleading
            guilty without traffic school or deferred disposition.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold">
          <Link href="/statutes/" className="text-[#059669] hover:underline">
            Inspect All 51 Jurisdiction Statutes →
          </Link>
          <Link href="/editorial-policy/" className="text-[#0f2747] hover:underline">
            Editorial &amp; Verification Policy →
          </Link>
          <Link href="/calculators/fight-vs-pay-roi/" className="text-slate-600 hover:underline">
            Run Fight vs. Pay ROI Simulator →
          </Link>
        </div>
      </div>
    </div>
  );
}
