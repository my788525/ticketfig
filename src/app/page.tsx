import Link from "next/link";
import type { Metadata } from "next";
import { TICKET_STATUTES_2026 } from "@/data/ticket_statutes_2026";
import { CASE_STUDIES_2026, GUIDES_2026 } from "@/data/cases_and_guides_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import HiddenTrapsCallout from "@/components/HiddenTrapsCallout";

export const metadata: Metadata = {
  title: "TicketFig — 2026 US Traffic Ticket, 3-Year Insurance Surcharge & Written Defense Platform",
  description:
    "Institutional-grade 51-jurisdiction traffic ticket actuarial workbench. Calculate 3-year auto insurance surcharges, Fight vs. Pay ROI, DMV points, and Trial by Written Declaration eligibility.",
};

const CALCULATORS = [
  {
    href: "/calculators/speeding-ticket-insurance-cost/",
    badge: "Primary Workbench",
    title: "3-Year Insurance Surcharge Calculator",
    desc: "Models court fine + statutory penalty assessments + 36-to-72 month auto insurance premium hikes across all 51 jurisdictions.",
  },
  {
    href: "/calculators/fight-vs-pay-roi/",
    badge: "Decision Engine",
    title: "Fight vs. Pay 3-Year ROI Simulator",
    desc: "Compares paying outright vs. Traffic School vs. Written Declaration vs. local counsel on an expected-value basis.",
  },
  {
    href: "/calculators/license-points-calculator/",
    badge: "DMV Risk Audit",
    title: "License Points & Surcharge Tracker",
    desc: "Tracks state DMV point accumulation, suspension cliffs, NY 6-pt DRA ($300+), NJ surcharges, and NC SDIP triggers.",
  },
  {
    href: "/calculators/written-declaration-eligibility/",
    badge: "Defense Generator",
    title: "Written Declaration & Discovery Tool",
    desc: "Verifies mail-in contest eligibility (CVC § 40902, ORS § 153.080) and generates Radar/LiDAR calibration discovery briefs.",
  },
  {
    href: "/calculators/ticket-error-forensics/",
    badge: "Forensic Audit",
    title: "Ticket & Speed-Trap Forensics Auditor",
    desc: "Scores dismissal leverage (0–100), flags Cal. Veh. Code § 40802 speed traps & expired ETS surveys, and builds a courtroom defense outline.",
  },
  {
    href: "/calculators/discovery-calibration-builder/",
    badge: "FOIA & Radar Discovery",
    title: "Written Declaration & Radar/FOIA Discovery Builder",
    desc: "Generates a 5-point pre-trial discovery checklist (Tuning Fork, FCC, POST, ETS, Dashcam) and copyable formal discovery request.",
  },
];

export default function HomePage() {
  const featuredStates = TICKET_STATUTES_2026.filter((s) =>
    ["CA", "NY", "NC", "TX", "FL", "VA", "IL", "NJ"].includes(s.abbr)
  );

  return (
    <div className="space-y-14 sm:space-y-16 pb-12">
      {/* Executive Legal-Brief Hero */}
      <section className="bg-[#0f2747] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#c8a24a]/50 text-[#c8a24a] text-[11px] sm:text-xs font-bold uppercase tracking-wider max-w-full">
              51 U.S. Jurisdictions · 2026 Statutory Schedules
            </div>
            <h1 className="mt-6 text-[28px] sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Never Pay a Traffic Ticket Before Auditing Your{" "}
              <span className="text-[#c8a24a]">3-Year Insurance Exposure</span>.
            </h1>
            <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              A $238 citation routinely triggers $1,650 to $3,200+ in 36-month auto insurance
              surcharges, Good Driver Discount losses, and state DMV assessments. Audit your exact
              state statutes and generate Written Declaration &amp; Calibration Discovery briefs in
              seconds.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3.5">
              <Link
                href="/wizard/"
                className="px-6 py-3.5 rounded-xl bg-[#c8a24a] hover:bg-amber-400 text-slate-950 font-extrabold text-sm text-center transition shadow-lg"
              >
                Start 4-Step Defense Wizard →
              </Link>
              <Link
                href="/calculators/speeding-ticket-insurance-cost/"
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm text-center transition"
              >
                Calculate 3-Year Ticket Cost
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#c8a24a]">
                2026 Statutory Snapshot
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 shrink-0">Verified .gov Data</span>
            </div>
            <div className="space-y-3.5 text-xs tabular-nums">
              <div className="flex justify-between items-center gap-3 py-1.5 border-b border-slate-800/70">
                <span className="text-slate-300 min-w-0">CA 78-in-65 (CVC § 40902)</span>
                <span className="font-bold text-white shrink-0">$1,890 3-Yr Exposure</span>
              </div>
              <div className="flex justify-between items-center gap-3 py-1.5 border-b border-slate-800/70">
                <span className="text-slate-300 min-w-0">NC SDIP +1pt / +2pt Hike</span>
                <span className="font-bold text-rose-400 shrink-0">+30% to +45% Mandatory</span>
              </div>
              <div className="flex justify-between items-center gap-3 py-1.5 border-b border-slate-800/70">
                <span className="text-slate-300 min-w-0">NY 6-Pt DRA Cliff (VTL § 1199)</span>
                <span className="font-bold text-[#c8a24a] shrink-0">$300+ State Assessment</span>
              </div>
              <div className="flex justify-between items-center gap-3 py-1.5">
                <span className="text-slate-300 min-w-0">TX HB 2048 Points Repealed</span>
                <span className="font-bold text-emerald-400 shrink-0">DSC / Art. 45.0511 Shield</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Executive Calculators */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2747]">
              Executive Defense &amp; Actuarial Workbenches
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              100% browser-based · Realistic pre-fills · Printable Briefs &amp; Copyable Discovery Requests
            </p>
          </div>
        </div>

        <Link
          href="/wizard/"
          className="group block bg-[#0f2747] text-white border border-slate-800 hover:border-[#c8a24a] rounded-2xl p-6 shadow-md transition"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#c8a24a] text-slate-950">
                Flagship Guided Flow
              </span>
              <h3 className="text-xl font-extrabold text-white group-hover:text-[#c8a24a] transition">
                4-Step Ticket Defense &amp; 3-Year Insurance Decision Wizard
              </h3>
              <p className="text-sm text-slate-300 max-w-3xl">
                Answer 4 guided questions to generate a free printable 3-Year Insurance Exposure
                Brief and match your exact Traffic School, Written Declaration, or Plea Reduction kit.
              </p>
            </div>
            <div className="shrink-0 px-5 py-3 rounded-xl bg-[#c8a24a] text-slate-950 text-xs font-extrabold text-center">
              Launch Wizard →
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CALCULATORS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#0f2747]">
                  {c.badge}
                </span>
                <h3 className="text-xl font-extrabold text-[#0f2747] group-hover:text-[#059669] transition">
                  {c.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
              <div className="text-xs font-bold text-[#059669]">Launch Workbench →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contextual 3-Trap Survival Check + Inline Offer @ ~35-40% Scroll Depth */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-8">
        <HiddenTrapsCallout />
        <ToolPaywallDossier
          badge="2026 Written Defense & Discovery Kit"
          title="Unlock the Complete 51-State Traffic Defense & Discovery Suite"
          desc="Download editable .docx Written Declarations (TR-205 / ORS § 153.080), Radar & LiDAR Calibration Discovery Requests, and our .xlsx 3-Year ROI Ledger."
          features={[
            "Editable .docx Written Declaration Templates",
            "Radar & LiDAR Calibration Discovery Requests",
            ".xlsx 51-State DMV Point & 3-Yr ROI Ledger",
            "All-Access Matrix Pass (Unlocks All Tools)",
          ]}
        />
      </div>

      {/* Featured State Dossiers */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2747]">
              51-Jurisdiction Statutory Point &amp; Insurance Dossiers
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Every state DMV point schedule, suspension threshold, traffic school cooldown, and official .gov link.
            </p>
          </div>
          <Link href="/states/" className="text-sm font-bold text-[#059669] hover:underline">
            View All 51 States + DC →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredStates.map((s) => (
            <Link
              key={s.abbr}
              href={`/states/${s.slug}/`}
              className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-xl p-4 shadow-xs transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#0f2747]">{s.name}</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {s.abbr}
                </span>
              </div>
              <div className="text-xs text-slate-600 tabular-nums">
                Minor Hike: <strong className="text-rose-700">+{s.minorHikePct}%/yr</strong> · Major:{" "}
                <strong className="text-rose-700">+{s.majorHikePct}%/yr</strong>
              </div>
              <div className="text-[11px] text-slate-500 truncate">{s.pointSystemName}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Real-Ledger Case Studies */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2747]">Real-Ledger Case Studies</h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Line-by-line 3-year financial ledgers across California, North Carolina, and New York.
            </p>
          </div>
          <Link href="/cases/" className="text-sm font-bold text-[#059669] hover:underline">
            All Case Studies →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {CASE_STUDIES_2026.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}/`}
              className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-2xl p-6 shadow-xs transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#c8a24a] uppercase">{c.stateName}</span>
                  <span className="font-extrabold text-[#059669] tabular-nums">{c.netSavings} Saved</span>
                </div>
                <h3 className="text-base font-bold text-[#0f2747] leading-snug">{c.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3">{c.summary}</p>
              </div>
              <div className="text-xs font-bold text-[#0f2747]">Inspect Full Ledger →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deep Guides */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2747]">
              Statutory Defense &amp; Actuarial Guides
            </h2>
          </div>
          <Link href="/guides/" className="text-sm font-bold text-[#059669] hover:underline">
            All 6 Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GUIDES_2026.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              className="bg-white border border-slate-200 hover:border-[#0f2747] rounded-xl p-5 transition space-y-2"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#c8a24a]">
                {g.category} · {g.readTime}
              </div>
              <h3 className="text-base font-bold text-[#0f2747] leading-snug">{g.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
