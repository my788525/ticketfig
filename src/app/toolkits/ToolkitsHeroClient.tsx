"use client";

import { useState } from "react";

const US_STATES = [
  "California",
  "Texas",
  "Florida",
  "New York",
  "Pennsylvania",
  "Illinois",
  "Ohio",
  "Georgia",
  "North Carolina",
  "Michigan",
  "New Jersey",
  "Virginia",
  "Washington",
  "Arizona",
  "Massachusetts",
  "Other US State",
];

interface ToolkitsHeroClientProps {
  checkoutUrl: string;
}

export default function ToolkitsHeroClient({ checkoutUrl }: ToolkitsHeroClientProps) {
  const [selectedState, setSelectedState] = useState("California");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"docx" | "xlsx">("docx");

  return (
    <div className="space-y-3 pt-1">
      {/* 1-Second State Confirm Selector */}
      <div className="rounded-xl bg-slate-950/90 border border-emerald-500/40 p-3.5 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label
            htmlFor="ticketfig-state-confirm"
            className="text-xs font-bold text-slate-200 uppercase tracking-wider"
          >
            Confirm Your State (50 States + DC):
          </label>
          <select
            id="ticketfig-state-confirm"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#c8a24a]"
          >
            {US_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs font-semibold text-emerald-400">
          ✓ Includes {selectedState} written defense / radar discovery request &amp; 3-year insurance surcharge ROI ledger
        </div>
      </div>

      {/* Primary CTA + Sample Preview Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#c8a24a] hover:bg-amber-400 text-slate-950 font-extrabold px-7 py-4 rounded-xl text-sm sm:text-base transition shadow-lg shadow-amber-500/20"
        >
          <span>Instant Buy VIP Suite — $24.99</span>
          <span aria-hidden="true">→</span>
        </a>

        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600 text-xs sm:text-sm font-bold transition cursor-pointer"
        >
          <span>Preview Sample Page (.DOCX / .XLSX)</span>
        </button>
      </div>

      {/* 3 Zero-Risk Purchase Badges */}
      <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5">
        <span className="font-semibold text-emerald-400">✓ Instant ZIP Download (.DOCX + .XLSX)</span>
        <span className="font-semibold text-slate-200">✓ One-Time Payment (No Subscription)</span>
        <span className="font-semibold text-amber-300">✓ Updated for 2026–2027 Statutes</span>
      </div>

      {/* Sample Preview Modal */}
      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TicketFig Sample Document Preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 bg-[#0f2747] text-white">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#c8a24a] font-bold">
                  Verified Sample Excerpt · {selectedState}
                </div>
                <h3 className="text-base font-extrabold">
                  What&apos;s Inside Your $24.99 VIP Suite
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("docx")}
                className={`px-4 py-2 text-xs font-bold rounded-t-lg border border-b-0 cursor-pointer ${
                  activeTab === "docx"
                    ? "bg-white text-[#0f2747] border-slate-200"
                    : "bg-transparent text-slate-500 border-transparent hover:text-slate-800"
                }`}
              >
                .DOCX Written Defense &amp; Discovery
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("xlsx")}
                className={`px-4 py-2 text-xs font-bold rounded-t-lg border border-b-0 cursor-pointer ${
                  activeTab === "xlsx"
                    ? "bg-white text-[#0f2747] border-slate-200"
                    : "bg-transparent text-slate-500 border-transparent hover:text-slate-800"
                }`}
              >
                .XLSX 3-Year ROI Ledger
              </button>
            </div>

            <div className="p-5 space-y-4">
              {activeTab === "docx" ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-serif text-xs sm:text-sm text-slate-800 space-y-2.5 leading-relaxed">
                  <div className="font-mono text-[11px] font-bold text-slate-500">
                    FILE: TicketFig_Written_Defense_Suite_2026.docx (Page 1 Preview)
                  </div>
                  <p className="font-bold text-[#0f2747]">
                    REQUEST FOR TRIAL BY WRITTEN DECLARATION &amp; INFORMAL DISCOVERY ({selectedState.toUpperCase()})
                  </p>
                  <p>
                    1. <strong>Statutory Foundation:</strong> Pursuant to applicable state vehicle code
                    written-declaration procedures (e.g., Cal. Veh. Code § 40902 / ORS § 153.080) and
                    evidentiary foundation rules, Defendant enters a plea of Not Guilty and demands strict
                    proof of each element of the alleged violation.
                  </p>
                  <p>
                    2. <strong>Radar / LiDAR Calibration &amp; ETS Discovery:</strong> Defendant formally
                    requests (a) current tuning-fork / laser calibration certificates within statutory
                    intervals, (b) officer certification logs, and (c) the current Engineering &amp;
                    Traffic Survey (ETS) justifying the posted prima facie speed limit...
                  </p>
                  <div className="text-[11px] italic text-slate-500 border-t border-slate-200 pt-2">
                    [Redacted — Full 14-page editable .DOCX includes Good Driver mitigation brief,
                    speed-trap challenge, and state-by-state filing checklist]
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-2.5">
                  <div className="font-mono text-[11px] font-bold text-slate-500">
                    FILE: TicketFig_3Yr_ROI_Ledger_2026.xlsx (Sheet: 3Yr_Surcharge_Model)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-[11px]">
                      <thead>
                        <tr className="bg-slate-200 text-slate-800">
                          <th className="p-2 border border-slate-300">Strategy</th>
                          <th className="p-2 border border-slate-300">Upfront Fine/Fee</th>
                          <th className="p-2 border border-slate-300">36-Mo Insurance Hike</th>
                          <th className="p-2 border border-slate-300">Net 3-Yr Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="p-2 border border-slate-200 font-bold">Pay Fine + Admit</td>
                          <td className="p-2 border border-slate-200">$285</td>
                          <td className="p-2 border border-slate-200 text-rose-600">+$2,160</td>
                          <td className="p-2 border border-slate-200 text-rose-700 font-bold">-$2,445</td>
                        </tr>
                        <tr className="bg-emerald-50">
                          <td className="p-2 border border-slate-200 font-bold">Written Defense + Discovery</td>
                          <td className="p-2 border border-slate-200">$24.99 kit</td>
                          <td className="p-2 border border-slate-200 text-emerald-700">$0 if dismissed</td>
                          <td className="p-2 border border-slate-200 text-emerald-700 font-bold">Save ~$2,420</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="text-xs text-slate-600">
                  Instant ZIP download · One-time $24.99 · No subscription
                </span>
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center bg-[#059669] hover:bg-emerald-600 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition"
                >
                  Unlock Full {selectedState} Suite ($24.99) →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
