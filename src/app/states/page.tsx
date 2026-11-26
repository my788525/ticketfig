import Link from "next/link";
import type { Metadata } from "next";
import { TICKET_STATUTES_2026 } from "@/data/ticket_statutes_2026";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "51-State Ticket, DMV & Insurance Schedules",
  description:
    "Compare DMV point systems, 3-year auto insurance surcharge benchmarks, traffic school masking rules, and Written Declaration eligibility across all 50 states + DC.",
  alternates: {
    canonical: "/states/",
  },
};

export default function StatesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "51 State Dossiers", url: "https://ticketfig.com/states/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          2026 State Traffic Ticket &amp; DMV Point Schedules (51 Jurisdictions)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Select any state or Washington, D.C. to inspect its statutory point system, 3-year
          insurance surcharge benchmarks, traffic school masking rules, written declaration
          statutes, and official .gov DMV link.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#0f2747] text-white uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Jurisdiction</th>
              <th className="py-3 px-3">Point System</th>
              <th className="py-3 px-3">Minor / Major Hike</th>
              <th className="py-3 px-3">Traffic School</th>
              <th className="py-3 px-3">Written Contest</th>
              <th className="py-3 px-4 text-right">Dossier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 tabular-nums">
            {TICKET_STATUTES_2026.map((s) => (
              <tr key={s.abbr} className="hover:bg-slate-50 transition">
                <td className="py-3 px-4 font-bold text-[#0f2747]">
                  <Link href={`/states/${s.slug}/`} className="hover:underline">
                    {s.name} ({s.abbr})
                  </Link>
                </td>
                <td className="py-3 px-3 text-slate-600">
                  {s.hasPoints ? `${s.minorPoints} / ${s.majorPoints} pts` : "No Numeric Scale"}
                </td>
                <td className="py-3 px-3 font-semibold text-rose-700">
                  +{s.minorHikePct}% / +{s.majorHikePct}%
                </td>
                <td className="py-3 px-3">
                  {s.trafficSchoolEligible ? (
                    <span className="text-[#059669] font-bold">Eligible</span>
                  ) : (
                    <span className="text-slate-400">Limited / No</span>
                  )}
                </td>
                <td className="py-3 px-3">
                  {s.writtenDeclarationAvailable ? (
                    <span className="text-[#0f2747] font-bold">Yes ({s.writtenDeclarationStatute})</span>
                  ) : (
                    <span className="text-slate-500">Appearance / Counsel</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/states/${s.slug}/`}
                    className="font-bold text-[#059669] hover:underline"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
