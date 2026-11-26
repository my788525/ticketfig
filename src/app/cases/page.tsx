import Link from "next/link";
import type { Metadata } from "next";
import { CASE_STUDIES_2026 } from "@/data/cases_and_guides_2026";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Real-Ledger Traffic Ticket Defense Case Studies (2026)",
  description:
    "Verified line-by-line 3-year financial ledgers showing how California CVC § 40902, North Carolina PJC, and New York plea-by-mail saved $1,890 to $2,393.",
};

export default function CasesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Case Studies", url: "https://ticketfig.com/cases/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Real-Ledger Traffic Defense Case Studies (2026)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Side-by-side 3-year actuarial comparisons between paying a citation outright vs. executing
          a statutory defense in California, North Carolina, and New York.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h2 className="text-lg font-extrabold text-[#0f2747] leading-snug">{c.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{c.summary}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs font-bold text-[#0f2747]">
              Read Full Case Ledger →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
