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

      {/* Statutory Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
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

      <ToolPaywallDossier
        badge={`${st.abbr} 2026 Defense Kit`}
        title={`Export ${st.name} Written Defense & Discovery Packet`}
        desc={`Includes ${st.name}-specific discovery request templates, 3-year insurance surcharge workbook, and 51-state statutory reference.`}
        features={[
          `${st.name} Statutory Defense Templates`,
          "Radar & LiDAR Calibration Discovery Motion",
          "3-Year Insurance Surcharge Ledger (Excel)",
          "All-Access Matrix Pass Included",
        ]}
      />
    </div>
  );
}
