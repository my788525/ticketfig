"use client";

import { useState, useMemo } from "react";
import { TICKET_STATUTES_2026, TICKET_STATUTE_BY_ABBR } from "@/data/ticket_statutes_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import CopyBriefBox from "@/components/CopyBriefBox";

const PRESETS = [
  { label: "NY 6-Pt DRA Cliff", state: "NY", existingPoints: 2, newSeverity: "major" as const },
  { label: "CA NOTS 4-Pt Warning", state: "CA", existingPoints: 3, newSeverity: "minor" as const },
  { label: "NJ 6-Pt MVC Surcharge", state: "NJ", existingPoints: 4, newSeverity: "minor" as const },
];

export default function LicensePointsCalculator() {
  const [stateAbbr, setStateAbbr] = useState("NY");
  const [existingPoints, setExistingPoints] = useState(2);
  const [newSeverity, setNewSeverity] = useState<"minor" | "major">("major");

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["NY"];

  const summary = useMemo(() => {
    const added = newSeverity === "major" ? st.majorPoints : st.minorPoints;
    const total = existingPoints + added;
    const triggersNyDra = st.abbr === "NY" && total >= 6;
    const triggersNjSurcharge = st.abbr === "NJ" && total >= 6;
    const surchargeTriggered = triggersNyDra || triggersNjSurcharge;
    const surchargeAmount = triggersNyDra
      ? 300 + Math.max(0, total - 6) * 75
      : triggersNjSurcharge
      ? 450 + Math.max(0, total - 6) * 75
      : 0;

    return { added, total, surchargeTriggered, surchargeAmount };
  }, [st, existingPoints, newSeverity]);

  const hearingRequest = `REQUEST FOR ADMINISTRATIVE POINT REDUCTION / TRAFFIC SCHOOL CREDIT
Jurisdiction: ${st.name} (${st.authorityName})
Point System: ${st.pointSystemName}
Current Active Points: ${existingPoints} | Pending Citation: +${summary.added} pts (Projected Total: ${summary.total} pts)

To: Driver Licensing & Court Records Division
Applicant respectfully requests eligibility confirmation for ${st.trafficSchoolRule} to prevent exceeding the statutory threshold (${st.suspensionThreshold}).`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
          Threshold Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setStateAbbr(p.state);
              setExistingPoints(p.existingPoints);
              setNewSeverity(p.newSeverity);
            }}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] transition cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 no-print">
          <h2 className="text-base font-bold text-[#0f2747] border-b border-slate-100 pb-3">
            DMV Point Accumulation Inputs
          </h2>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">State / Jurisdiction</label>
            <select
              value={stateAbbr}
              onChange={(e) => setStateAbbr(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900"
            >
              {TICKET_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Existing Active DMV Points (Last 18–36 Months)
            </label>
            <input
              type="number"
              min={0}
              max={30}
              value={existingPoints}
              onChange={(e) => setExistingPoints(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold tabular-nums"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Pending Citation Severity</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNewSeverity("minor")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  newSeverity === "minor"
                    ? "bg-[#0f2747] text-white border-[#0f2747]"
                    : "bg-slate-50 text-slate-700 border-slate-300"
                }`}
              >
                Minor (1–14 mph over)
              </button>
              <button
                type="button"
                onClick={() => setNewSeverity("major")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  newSeverity === "major"
                    ? "bg-[#0f2747] text-white border-[#0f2747]"
                    : "bg-slate-50 text-slate-700 border-slate-300"
                }`}
              >
                Major (15–29+ mph over)
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  DMV Suspension &amp; Statutory Surcharge Audit
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  {st.name}: {st.pointSystemName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#0f2747] text-white text-xs font-bold cursor-pointer no-print"
              >
                Print Points Audit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
              <div className="p-4 rounded-xl bg-[#0f2747] text-white">
                <div className="text-[11px] uppercase text-slate-300">Projected Total</div>
                <div className="text-3xl font-extrabold text-[#c8a24a] mt-1">
                  {st.hasPoints ? `${summary.total} pts` : "No Numeric Scale"}
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  +{summary.added} pts from pending ticket
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] uppercase text-slate-500 font-bold">Suspension Trigger</div>
                <div className="text-xs font-bold text-[#0f2747] mt-1 leading-snug">
                  {st.suspensionThreshold}
                </div>
              </div>
              <div
                className={`p-4 rounded-xl border ${
                  summary.surchargeTriggered
                    ? "bg-rose-50 border-rose-300 text-rose-900"
                    : "bg-emerald-50 border-emerald-200 text-emerald-900"
                }`}
              >
                <div className="text-[11px] uppercase font-bold">State Point Surcharge</div>
                <div className="text-xl font-extrabold mt-1">
                  {summary.surchargeTriggered ? `$${summary.surchargeAmount} Triggered` : "$0 State Fee"}
                </div>
                <div className="text-[11px] mt-1">
                  {summary.surchargeTriggered ? "6+ pt statutory assessment active" : "Below state surcharge cliff"}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-[#0f2747]">State Surcharge &amp; SDIP Rule</div>
              <p className="text-slate-700">{st.stateSurchargeRule}</p>
              <div className="pt-1">
                <a
                  href={st.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#059669] font-bold hover:underline"
                >
                  Verify at Official {st.authorityName} (.gov) →
                </a>
              </div>
            </div>
          </div>

          <CopyBriefBox
            title="Copyable Point Reduction / Deferral Request"
            subtitle="Customize with your driver license number and citation ID"
            text={hearingRequest}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="2026 Written Defense & Discovery Kit"
        title="Protect Your License & Avoid State Point Surcharges"
        desc="Get the complete 51-state point & SDIP defense kit, including NY DRA avoidance plea letters and NC PJC / Improper Equipment checklists."
        features={[
          "NY DRA & NJ Surcharge Avoidance Templates",
          "NC SDIP + PJC Household Eligibility Matrix",
          "51-State Official DMV Point Schedules",
          "Radar & LiDAR Discovery Request Forms",
        ]}
      />
    </div>
  );
}
