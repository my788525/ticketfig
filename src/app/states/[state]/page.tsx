import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TICKET_STATUTES_2026, TICKET_STATUTE_BY_SLUG } from "@/data/ticket_statutes_2026";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

export function generateStaticParams() {
  return TICKET_STATUTES_2026.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const st = TICKET_STATUTE_BY_SLUG[state];
  if (!st) return { title: "State Not Found" };
  return {
    title: `${st.name} Speeding Ticket Points, Insurance Surcharge & Defense Rules (2026)`,
    description: `${st.name} (${st.abbr}) DMV point schedule (${st.pointSystemName}), ${st.minorHikePct}%–${st.majorHikePct}% insurance surcharge benchmarks, traffic school eligibility, and ${st.writtenDeclarationStatute} defense rules.`,
  };
}

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const st = TICKET_STATUTE_BY_SLUG[state];
  if (!st) notFound();

  const faqs = [
    {
      question: `How many points is a speeding ticket in ${st.name}?`,
      answer: st.hasPoints
        ? `Under ${st.pointSystemName} (${st.statuteRef}), a minor speeding ticket (1–14 mph over) typically carries ${st.minorPoints} points, while a major speeding ticket (15–29+ mph over) carries ${st.majorPoints} points. Suspension threshold: ${st.suspensionThreshold}.`
        : `${st.name} does not use a numeric DMV point scale (${st.pointSystemName}), though convictions still appear on your MVR and trigger ${st.minorHikePct}%–${st.majorHikePct}% auto insurance surcharges.`,
    },
    {
      question: `Can I contest a ${st.name} traffic ticket by mail (Written Declaration)?`,
      answer: `${st.writtenDeclarationAvailable ? "Yes." : "Generally no."} ${st.writtenDeclarationRule} (Controlling rule: ${st.writtenDeclarationStatute}).`,
    },
  ];

  const avg3YrMinor = Math.round(2400 * (st.minorHikePct / 100) * (st.lookbackMonths / 12));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "51 States", url: "https://ticketfig.com/states/" },
            { name: st.name, url: `https://ticketfig.com/states/${st.slug}/` },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> /{" "}
          <Link href="/states/" className="hover:text-[#0f2747]">51 States</Link> / {st.name}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
            {st.name} ({st.abbr}) Traffic Ticket &amp; Insurance Surcharge Dossier
          </h1>
          <a
            href={st.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0f2747] text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            Official {st.abbr} DMV / Court (.gov) →
          </a>
        </div>
        <p className="text-sm text-slate-600">{st.statuteRef} · {st.authorityName}</p>
        {/* Quick-Jump Anchor Pills */}
        <nav aria-label="Quick jump" className="flex flex-wrap gap-2 pt-2">
          <a href="#direct-answer" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            Direct Statutory Answer
          </a>
          <a href="#benchmark-table" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            {st.abbr} Benchmark Table
          </a>
          <a href="#defense-kit" className="px-3 py-1 rounded-full bg-amber-100 hover:bg-[#c8a24a] text-xs font-bold text-[#0f2747] transition">
            Written Defense Kit
          </a>
          <a href="#statutory-rules" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            Statutory Rules
          </a>
          <a href="#faq" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            FAQs
          </a>
        </nav>
      </div>

      {/* Above-the-Fold Direct Statutory Answer Box */}
      <div id="direct-answer" className="bg-white border-2 border-[#0f2747] rounded-2xl p-5 sm:p-6 shadow-sm space-y-2">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#c8a24a]">
          Direct Statutory Answer · {st.name} ({st.abbr})
        </div>
        <p className="text-sm text-slate-800 leading-relaxed">
          Under <strong>{st.statuteRef}</strong>, a {st.name} speeding conviction adds{" "}
          <strong>{st.hasPoints ? `${st.minorPoints}–${st.majorPoints} DMV points` : "0 numeric DMV points"}</strong>{" "}
          ({st.pointSystemName}) and triggers an average <strong>+{st.minorHikePct}% to +{st.majorHikePct}%</strong>{" "}
          annual auto insurance surcharge over a <strong>{st.lookbackMonths}-month</strong> lookback (~$
          {avg3YrMinor.toLocaleString()} on a $2,400/yr policy).{" "}
          {st.trafficSchoolEligible
            ? `Statutory traffic school / deferral is available (${st.trafficSchoolRule}).`
            : `Traffic school does not automatically mask insurer surcharges (${st.trafficSchoolRule}).`}{" "}
          {st.writtenDeclarationAvailable
            ? `Mail-in Written Declaration is permitted under ${st.writtenDeclarationStatute}.`
            : `Contestation requires court appearance or local counsel (${st.writtenDeclarationStatute}).`}
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 tabular-nums">
        <div className="bg-[#0f2747] text-white rounded-2xl p-4">
          <div className="text-[11px] uppercase text-slate-300">Minor / Major Points</div>
          <div className="text-2xl font-extrabold text-[#c8a24a] mt-1">
            {st.hasPoints ? `${st.minorPoints} / ${st.majorPoints} pts` : "0 pts*"}
          </div>
          <div className="text-[11px] text-slate-300 mt-1">{st.pointSystemName}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-[11px] uppercase text-slate-500 font-bold">Insurance Hike</div>
          <div className="text-2xl font-extrabold text-rose-700 mt-1">
            +{st.minorHikePct}% to +{st.majorHikePct}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">~${avg3YrMinor.toLocaleString()} on $2,400/yr</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-[11px] uppercase text-slate-500 font-bold">Lookback Window</div>
          <div className="text-2xl font-extrabold text-[#0f2747] mt-1">
            {st.lookbackMonths} Months
          </div>
          <div className="text-[11px] text-slate-500 mt-1">{st.lookbackMonths / 12} years standard</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-[11px] uppercase text-slate-500 font-bold">Written Contest</div>
          <div className="text-lg font-extrabold text-[#059669] mt-1">
            {st.writtenDeclarationAvailable ? "Mail-In Eligible ✓" : "Court / Counsel"}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">{st.writtenDeclarationStatute}</div>
        </div>
      </div>

      {/* HTML Benchmark Table */}
      <div id="benchmark-table" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#0f2747]">
          {st.name} ({st.abbr}) 2026 Speeding Exposure Benchmark Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse tabular-nums">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <th className="py-2 pr-4">Violation Tier</th>
                <th className="py-2 px-3">Base Fine Range</th>
                <th className="py-2 px-3">DMV Points</th>
                <th className="py-2 px-3">Annual Insurance Hike</th>
                <th className="py-2 pl-3 text-right">3-Yr Surcharge ($2,400/yr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Minor Speeding (1–14 mph over)</td>
                <td className="py-3 px-3 text-slate-700">${st.baseFineMinor[0]}–${st.baseFineMinor[1]} (×{st.assessmentMultiplier}x)</td>
                <td className="py-3 px-3 font-semibold text-slate-800">{st.hasPoints ? `${st.minorPoints} pts` : "0 pts*"}</td>
                <td className="py-3 px-3 font-semibold text-rose-700">+{st.minorHikePct}%/yr</td>
                <td className="py-3 pl-3 text-right font-extrabold text-rose-700">+${avg3YrMinor.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Major Speeding (15+ mph over)</td>
                <td className="py-3 px-3 text-slate-700">${st.baseFineMajor[0]}–${st.baseFineMajor[1]} (×{st.assessmentMultiplier}x)</td>
                <td className="py-3 px-3 font-semibold text-slate-800">{st.hasPoints ? `${st.majorPoints} pts` : "0 pts*"}</td>
                <td className="py-3 px-3 font-semibold text-rose-700">+{st.majorHikePct}%/yr</td>
                <td className="py-3 pl-3 text-right font-extrabold text-rose-700">
                  +${Math.round(2400 * (st.majorHikePct / 100) * (st.lookbackMonths / 12)).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="py-3 pr-4 font-bold text-emerald-900">Traffic School / Written Dismissal</td>
                <td className="py-3 px-3 text-emerald-800">{st.writtenDeclarationStatute}</td>
                <td className="py-3 px-3 font-bold text-emerald-800">0 pts</td>
                <td className="py-3 px-3 font-bold text-emerald-800">0%</td>
                <td className="py-3 pl-3 text-right font-extrabold text-emerald-800">$0 Surcharge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Offer @ ~35-40% Scroll Depth */}
      <div id="defense-kit">
        <ToolPaywallDossier
          badge={`${st.abbr} 2026 Defense Kit`}
          title={`Export ${st.name} Written Defense & Discovery Packet`}
          desc={`Includes ${st.name}-specific .docx discovery request templates, .xlsx 3-year insurance surcharge workbook, and 51-state statutory reference.`}
          features={[
            `${st.name} .docx Statutory Defense Templates`,
            "Radar & LiDAR Calibration Discovery Request",
            ".xlsx 3-Year Insurance Surcharge Ledger",
            "All-Access Matrix Pass Included",
          ]}
        />
      </div>

      {/* Statutory Breakdown */}
      <div id="statutory-rules" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
        <h2 className="text-xl font-bold text-[#0f2747]">2026 Statutory &amp; Defense Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-[#0f2747]">Suspension Threshold</div>
            <p className="text-xs text-slate-700">{st.suspensionThreshold}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-[#0f2747]">State Surcharge / Assessment Rule</div>
            <p className="text-xs text-slate-700">{st.stateSurchargeRule}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="font-bold text-emerald-900">Traffic School / Deferral Rule</div>
            <p className="text-xs text-emerald-800">{st.trafficSchoolRule}</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="font-bold text-amber-900">Written Declaration / Contestation</div>
            <p className="text-xs text-amber-800">{st.writtenDeclarationRule}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs leading-relaxed">
          <strong className="text-[#c8a24a] uppercase mr-1.5">Key {st.abbr} Nuance:</strong>
          {st.notes}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/calculators/speeding-ticket-insurance-cost/"
          className="px-5 py-3 rounded-xl bg-[#0f2747] text-white text-xs font-bold hover:bg-slate-800 transition"
        >
          Model {st.name} 3-Year Insurance Cost →
        </Link>
        <Link
          href="/calculators/written-declaration-eligibility/"
          className="px-5 py-3 rounded-xl bg-[#059669] text-white text-xs font-bold hover:bg-emerald-600 transition"
        >
          Generate {st.abbr} Discovery / Written Defense Brief →
        </Link>
      </div>

      <section id="faq" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0f2747]">{st.name} Traffic Ticket FAQs</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.question} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="text-sm font-bold text-[#0f2747]">{f.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
