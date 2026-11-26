import Link from "next/link";
import type { Metadata } from "next";
import { PITFALLS_2026, PITFALLS_FAQS, type PitfallVignette } from "@/data/pitfalls_2026";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

export const metadata: Metadata = {
  title: "Traffic Ticket Pitfalls & Survival Playbook",
  description:
    "6 real-case traffic ticket traps—from the $150 Click-to-Pay 24% insurance spike to California's 20-day Trial de Novo cliff, NC household PJC limits, and DLC reporting.",
  alternates: {
    canonical: "https://ticketfig.com/pitfalls/",
  },
};

function PitfallCard({ item }: { item: PitfallVignette }) {
  return (
    <article
      id={item.id}
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-24"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#0f2747] text-[#c8a24a] text-xs font-mono font-extrabold">
              TRAP #{item.number}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold uppercase tracking-wider">
              {item.badge}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747] leading-snug">
            {item.title}
          </h2>
        </div>

        <div className="bg-rose-50/80 border border-rose-200 rounded-xl px-4 py-2.5 text-right shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
            Unchecked Exposure
          </div>
          <div className="text-sm font-extrabold text-rose-900 tabular-nums">
            {item.financialImpact}
          </div>
        </div>
      </div>

      {/* Key Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {item.keyNumbers.map((k) => (
          <div
            key={k.label}
            className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 flex items-center justify-between gap-2"
          >
            <span className="text-[11px] font-semibold text-slate-500">{k.label}</span>
            <span className="text-xs font-extrabold text-[#0f2747] tabular-nums">{k.value}</span>
          </div>
        ))}
      </div>

      {/* 4-Stage Real-Case Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0f2747]">
            1. Real-World Case Scenario
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {item.realCaseScenario}
          </p>
        </div>

        <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-rose-800">
            2. The Hidden Black Hole
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {item.hiddenBlackHole}
          </p>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669]">
            3. Exact Survival Move
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {item.exactSurvivalMove}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="text-xs text-slate-600">
          <strong className="text-[#0f2747]">4. Applicable Statute:</strong>{" "}
          <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-800">
            {item.statute}
          </span>
        </div>
        <Link
          href={item.actionHref}
          className="text-xs font-extrabold text-[#059669] hover:text-emerald-700 hover:underline shrink-0"
        >
          {item.actionLabel}
        </Link>
      </div>
    </article>
  );
}

export default function PitfallsPlaybookPage() {
  const firstBatch = PITFALLS_2026.slice(0, 2);
  const secondBatch = PITFALLS_2026.slice(2);

  return (
    <div className="space-y-12 pb-16">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "Pitfalls & Survival Playbook", url: "https://ticketfig.com/pitfalls/" },
          ]),
          faqJsonLd(PITFALLS_FAQS),
        ]}
      />

      {/* Executive Hero */}
      <section className="bg-[#0f2747] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#c8a24a]/50 text-[#c8a24a] text-xs font-bold uppercase tracking-wider">
            Real-Case Survival Playbook · 2026 Statutory Audit
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl">
            Traffic Ticket Pitfalls, Black Holes &amp;{" "}
            <span className="text-[#c8a24a]">3-Year Insurance Survival Moves</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Most drivers lose $1,650 to $3,200+ not from the citation fine itself, but from six
            procedural traps—paying online without checking insurance exposure, missing 20-day
            Trial de Novo deadlines, violating traffic school cooldowns, or triggering household
            PJC spikes.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/wizard/"
              className="px-5 py-3 rounded-xl bg-[#c8a24a] hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition"
            >
              Launch 4-Step Defense Wizard →
            </Link>
            <Link
              href="/calculators/speeding-ticket-insurance-cost/"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs sm:text-sm transition"
            >
              Calculate 3-Year Surcharge
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-10">
        {/* Quick Jump Index */}
        <nav
          aria-label="Pitfalls Table of Contents"
          className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
        >
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#0f2747] mb-3">
            Jump to Any Real-Case Trap
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {PITFALLS_2026.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="flex items-center gap-2.5 bg-white border border-slate-200 hover:border-[#0f2747] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f2747] transition"
              >
                <span className="font-mono text-[#c8a24a] bg-[#0f2747] px-1.5 py-0.5 rounded text-[10px]">
                  {p.number}
                </span>
                <span className="truncate">{p.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Vignettes 1-2 */}
        <div className="space-y-8">
          {firstBatch.map((item) => (
            <PitfallCard key={item.id} item={item} />
          ))}
        </div>

        {/* Inline Conversion Offer @ ~35-40% Scroll Depth */}
        <ToolPaywallDossier
          badge="2026 Written Defense & Discovery Kit"
          title="Avoid Every Black Hole: Download the Complete 51-State Defense & Discovery Kit"
          desc="Get editable .docx Trial by Written Declaration (TR-205 / ORS § 153.080) briefs, formal Radar/LiDAR & ETS Discovery Requests, and our 51-state .xlsx 3-Year ROI Ledger before you miss a statutory deadline."
          price="$24.99"
          pid="pdt_0NsmklI8rw00LaBQM8xhq"
          features={[
            "Editable .docx Written Declaration & Trial de Novo Templates",
            "Radar/LiDAR Tuning-Fork & ETS Speed-Trap Discovery Requests",
            "51-State Traffic School Cooldown & CDL Anti-Masking Reference",
            "All-Access Matrix Pass (Unlocks Every TicketFig Workbench)",
          ]}
          dynamicAmount="$1,650–$3,200+"
          docType="2026 Written Defense & Discovery Brief"
          sampleLines={[
            { label: "Click-to-Pay 3-Yr Hike", value: "+$1,650 to $2,400+" },
            { label: "CA Trial de Novo Cutoff", value: "20 Days (TR-220)" },
            { label: "NC Household PJC Cap", value: "1 per 36 Months" },
            { label: "Kit Price (One-Time)", value: "$24.99 All-Access" },
          ]}
        />

        {/* Vignettes 3-6 */}
        <div className="space-y-8">
          {secondBatch.map((item) => (
            <PitfallCard key={item.id} item={item} />
          ))}
        </div>

        {/* FAQ Section */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-[#0f2747]">
              Frequently Asked Questions: Traffic Ticket Traps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified against 2026 state vehicle codes, NC SDIP rules, and federal CDL regulations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PITFALLS_FAQS.map((f) => (
              <div key={f.question} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
                <h3 className="text-sm font-extrabold text-[#0f2747]">{f.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
