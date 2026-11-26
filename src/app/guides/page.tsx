import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES_2026 } from "@/data/cases_and_guides_2026";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2026 Traffic Ticket Defense & Insurance Actuarial Guides",
  description:
    "Deep statutory guides with Direct Answer tables: Traffic School vs. Fighting, Radar vs. LiDAR Calibration Discovery, NC SDIP & PJC, CA CVC § 40902, Corporate MVR Impact, and Insurance Lookback Windows.",
};

export default function GuidesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
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
    </div>
  );
}
