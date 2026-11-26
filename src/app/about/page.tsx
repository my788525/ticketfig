import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About TicketFig.com — 51-Jurisdiction Traffic Citation Actuarial Platform",
  description:
    "TicketFig is an institutional-grade U.S. traffic citation actuarial and statutory defense reference platform covering all 50 states + DC.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "About", url: "https://ticketfig.com/about/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">About TicketFig.com</h1>
        <p className="text-sm text-slate-600">
          Institutional-grade traffic citation actuarial modeling and statutory defense intelligence
          across all 50 U.S. states and Washington, D.C.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            Why We Built TicketFig: Beyond the Face Value of a Ticket
          </h2>
          <p>
            <strong>TicketFig.com</strong> was built for North American drivers and risk-conscious
            professionals who treat a traffic citation as a 3-to-6-year financial risk event rather
            than a one-time court fine. Most drivers look only at the bail amount printed on a
            citation—often $150 to $350—and pay it immediately to avoid a court appearance. In
            reality, paying an unmasked moving violation triggers a multi-year cascade of hidden
            costs: state penalty assessment multipliers, DMV point accumulation, loss of
            good-driver discounts (such as California&apos;s 20% Proposition 103 discount),
            mandatory state surcharges (such as New York&apos;s $300+ Driver Responsibility
            Assessment or New Jersey&apos;s MVC annual point fees), and 36-to-72 months of
            elevated auto insurance premiums.
          </p>
          <p>
            On a standard $2,400/year policy, a single unmasked speeding conviction routinely costs
            $1,400 to $3,200+ in cumulative surcharges over three years. TicketFig quantifies that
            exact exposure before you enter a plea, giving you an objective, math-first view of
            your options.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            51-Jurisdiction Statutory &amp; Actuarial Architecture
          </h2>
          <p>
            Every state DMV point schedule, statutory penalty assessment multiplier, insurance
            surcharge benchmark, traffic school masking rule, and Trial by Written Declaration
            statute on TicketFig is cross-checked against official <code>.gov</code> vehicle codes,
            Judicial Council bail schedules, and state rate bureau filings. We cover all 50 U.S.
            states plus Washington, D.C., including unique statutory regimes like North
            Carolina&apos;s Safe Driver Incentive Plan (SDIP) and Prayer for Judgment Continued
            (PJC), California&apos;s Trial by Written Declaration (CVC § 40902) and Speed Trap
            Law (CVC § 40802), Oregon&apos;s ORS § 153.080 written testimony procedure, and
            Washington&apos;s IRLJ 3.5 mitigation-by-mail framework.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            100% Client-Side Privacy &amp; Independent Research
          </h2>
          <p>
            All TicketFig calculators, decision wizards, forensic auditors, and discovery builders
            execute 100% locally inside your web browser. We never require account registration to
            run a calculation, and zero citation numbers, driving records, or insurance policy
            details are transmitted to or stored on our servers.
          </p>
          <p>
            TicketFig is an independent research publication—not a traffic ticket mill, lead
            broker, or law firm. Our expected-value comparisons are governed strictly by
            transparent statutory formulas documented in our{" "}
            <Link href="/methodology/" className="text-[#059669] font-semibold hover:underline">
              Actuarial Methodology
            </Link>{" "}
            and{" "}
            <Link href="/editorial-policy/" className="text-[#059669] font-semibold hover:underline">
              Editorial Policy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            Who Uses TicketFig &amp; How Our Workbenches Help
          </h2>
          <p>
            Our platform serves three core audiences across North America: (1) everyday commuters
            who receive an unexpected speeding or red-light citation and want to know whether
            traffic school, a written declaration, or local counsel produces the lowest 3-year
            total cost; (2) commercial and corporate fleet drivers whose Motor Vehicle Record
            (MVR) must remain clean to preserve employment eligibility and fleet insurance tiers;
            and (3) paralegals, researchers, and consumer advocates who need rapid access to
            state-by-state DMV point thresholds, suspension rules, and Radar/LiDAR discovery
            frameworks.
          </p>
          <p>
            Whether you are evaluating a 1-point California infraction under CVC § 40902, a
            North Carolina speeding ticket under N.C.G.S. § 58-36-65, or a 6-point New York Driver
            Responsibility Assessment, TicketFig gives you the exact statutory citations and
            3-year financial ledger needed to make an informed decision.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold">
          <Link href="/wizard/" className="text-[#0f2747] hover:underline">
            Launch 4-Step Defense Wizard →
          </Link>
          <Link href="/states/" className="text-[#059669] hover:underline">
            Browse All 51 State Schedules →
          </Link>
          <Link href="/contact/" className="text-slate-600 hover:underline">
            Contact Editorial Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}
