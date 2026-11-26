import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES_2026 } from "@/data/cases_and_guides_2026";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2026 Traffic Ticket Defense & Insurance Actuarial Guides",
  description:
    "Deep statutory guides with Direct Answer tables: Traffic School vs. Fighting, Radar vs. LiDAR Calibration Discovery, NC SDIP & PJC, CA CVC § 40902, Corporate MVR Impact, and Insurance Lookback Windows.",
  alternates: {
    canonical: "/guides/",
  },
};

export default function GuidesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Guides", url: "https://ticketfig.com/guides/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          2026 Traffic Defense &amp; Insurance Actuarial Guides
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Source-verified playbooks covering written declarations, Radar/LiDAR calibration discovery,
          North Carolina SDIP points, corporate MVR audits, and insurer lookback windows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES_2026.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 shadow-xs transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#c8a24a]">
                {g.category} · {g.readTime}
              </div>
              <h2 className="text-lg font-extrabold text-[#0f2747] leading-snug">{g.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>
            </div>
            <div className="text-xs font-bold text-[#059669]">Read Guide →</div>
          </Link>
        ))}
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          How to Use TicketFig&apos;s Statutory Defense Guides
        </h2>
        <p>
          Every guide in our 2026 library is engineered around a single principle: a traffic
          citation is a multi-year financial liability, not a simple administrative fee. Before you
          choose between paying bail, enrolling in traffic school, filing a Trial by Written
          Declaration, or retaining local traffic counsel, you need to understand both the
          controlling state vehicle code and the downstream insurance underwriting mechanics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0f2747]">
              1. Procedural &amp; Written Defense Playbooks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              In jurisdictions such as California (CVC § 40902), Oregon (ORS § 153.080), and
              Washington (IRLJ 3.5), drivers can contest infractions by mail without stepping foot
              in a courtroom. Our written-defense and Radar/LiDAR discovery guides walk through
              exact statutory timelines, Form TR-205 structures, 90-day tuning-fork calibration
              demands, and Engineering &amp; Traffic Survey (ETS) speed-trap challenges under CVC
              § 40802.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0f2747]">
              2. Insurance Surcharge &amp; MVR Mitigation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Even in states without mail-in trials—such as North Carolina, New York, and
              Virginia—understanding state-specific mitigation tools can save thousands of dollars.
              Our actuarial guides detail North Carolina&apos;s Safe Driver Incentive Plan (SDIP)
              and Prayer for Judgment Continued (PJC) household limits, corporate Motor Vehicle
              Record (MVR) fleet risk thresholds, and 36-to-72 month carrier lookback windows.
            </p>
          </div>
        </div>
        <p>
          Pair these guides with our{" "}
          <Link href="/wizard/" className="text-[#059669] font-semibold hover:underline">
            4-Step Ticket Defense Wizard
          </Link>{" "}
          or{" "}
          <Link
            href="/calculators/fight-vs-pay-roi/"
            className="text-[#059669] font-semibold hover:underline"
          >
            Fight vs. Pay 3-Year ROI Simulator
          </Link>{" "}
          to benchmark your exact citation against all 51 U.S. jurisdictions.
        </p>
      </section>
    </div>
  );
}
