import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Legal Disclaimer & Actuarial Scope Limitations (2026)",
  description:
    "Important legal disclaimer, statutory accuracy scope, insurance rate modeling assumptions, and non-attorney notice for TicketFig.com.",
  alternates: {
    canonical: "/disclaimer/",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Disclaimer", url: "https://ticketfig.com/disclaimer/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          Legal Disclaimer &amp; Actuarial Scope
        </h1>
        <p className="text-sm text-slate-600">
          Effective Date: January 1, 2026 · Applies to all calculators, statutory dossiers, and
          downloadable templates on TicketFig.com.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            1. Educational &amp; Actuarial Reference Only — Not Legal Advice
          </h2>
          <p>
            TicketFig.com is an independent legal-tech and actuarial research publication. None of
            the calculators, state DMV point schedules, expected-value simulators, Written
            Declaration templates, or Radar/LiDAR discovery checklists published on this website
            constitute formal legal advice, and your use of TicketFig.com does not create an
            attorney-client relationship with TicketFig, its contributors, or its editorial staff.
          </p>
          <p>
            Traffic law is jurisdiction-specific and frequently turns on local court rules,
            prosecutorial discretion, and the exact factual circumstances of a stop. If your
            citation involves a criminal traffic offense (including reckless driving, DUI/DWI,
            driving on a suspended license, hit-and-run, or excessive speed misdemeanors), a
            commercial driver&apos;s license (CDL), or an imminent license suspension, you should
            consult a licensed traffic defense attorney in the county where the citation was
            issued.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            2. No Guarantee of Dismissal or Insurance Outcome
          </h2>
          <p>
            While our 4-Step Defense Wizard, Trial by Written Declaration templates (such as
            California Form TR-205 under Cal. Veh. Code § 40902), and pre-trial informal discovery
            letters are modeled on established statutory procedures, TicketFig cannot guarantee any
            specific court disposition, fine reduction, point masking, or dismissal. Judges,
            commissioners, and hearing officers retain full discretion over evidentiary rulings and
            sentencing.
          </p>
          <p>
            Similarly, all 3-year and 6-year auto insurance surcharge projections are actuarial
            benchmarks derived from state rating bureau filings (such as the North Carolina Safe
            Driver Incentive Plan under N.C.G.S. § 58-36-65) and industry underwriting averages.
            Your actual renewal premium depends on your carrier&apos;s proprietary rating tier,
            claims history, household drivers, multi-policy discounts, and state-specific
            good-driver rules (such as California Proposition 103).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            3. Verification of Deadlines, Bail &amp; Local Court Rules
          </h2>
          <p>
            Court appearance deadlines, bail deposit requirements, traffic school eligibility
            cooldowns, and electronic filing procedures vary by county and municipal court. You are
            solely responsible for verifying your citation&apos;s response deadline, mandatory
            appearance status, and exact bail amount directly with the issuing court clerk or
            official state DMV portal before submitting any plea, declaration, or payment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            4. Limitation of Liability &amp; External Links
          </h2>
          <p>
            To the maximum extent permitted by applicable law, TicketFig.com and its operators shall
            not be liable for any direct, indirect, incidental, or consequential damages resulting
            from reliance on any calculation, statutory summary, or template provided on this site,
            including missed court deadlines, license points, or insurance premium increases. Links
            to official <code>.gov</code> vehicle codes and court portals are provided for
            convenience and verification; TicketFig does not control external government websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            5. Commercial Driver&apos;s Licenses (CDL) &amp; Out-of-State Reciprocity
          </h2>
          <p>
            Commercial Driver&apos;s License (CDL) holders are governed by stricter federal FMCSA
            disqualification rules and are generally ineligible for traffic school point masking
            even when driving a personal passenger vehicle. Furthermore, most U.S. states
            participate in the Driver License Compact (DLC) and Non-Resident Violator Compact
            (NRVC), meaning an out-of-state conviction is routinely reported back to your home
            DMV. Always verify CDL and interstate reciprocity consequences with a licensed
            attorney before entering a plea.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold">
          <Link href="/terms/" className="text-[#0f2747] hover:underline">
            Read Terms of Use →
          </Link>
          <Link href="/editorial-policy/" className="text-[#059669] hover:underline">
            Editorial &amp; Verification Policy →
          </Link>
          <Link href="/contact/" className="text-slate-600 hover:underline">
            Report a Statutory Correction →
          </Link>
        </div>
      </div>
    </div>
  );
}
