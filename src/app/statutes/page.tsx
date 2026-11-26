import Link from "next/link";
import type { Metadata } from "next";
import { TICKET_STATUTES_2026 } from "@/data/ticket_statutes_2026";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Primary U.S. Traffic Statutes & .gov DMV Authorities (2026)",
  description:
    "Complete 51-jurisdiction index of controlling state vehicle code sections, written declaration statutes, and official .gov DMV / court URLs.",
  alternates: {
    canonical: "/statutes/",
  },
};

export default function StatutesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Statutes Compendium", url: "https://ticketfig.com/statutes/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          2026 Primary Traffic Statutes &amp; Official .gov Sources
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Every calculator and state dossier on TicketFig.com is anchored to the primary state
          vehicle codes and official DMV/court authorities listed below.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#0f2747] text-white uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-3">Primary Statute Citations</th>
              <th className="py-3 px-3">Written Contest Statute</th>
              <th className="py-3 px-4">Official .gov Authority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TICKET_STATUTES_2026.map((s) => (
              <tr key={s.abbr} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-[#0f2747]">
                  <Link href={`/states/${s.slug}/`} className="hover:underline">
                    {s.name} ({s.abbr})
                  </Link>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-slate-700">{s.statuteRef}</td>
                <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                  {s.writtenDeclarationStatute}
                </td>
                <td className="py-3 px-4">
                  <a
                    href={s.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#059669] font-semibold hover:underline"
                  >
                    {s.authorityName} ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
