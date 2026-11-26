"use client";

import { useState, useMemo } from "react";
import { TICKET_STATUTES_2026, TICKET_STATUTE_BY_ABBR } from "@/data/ticket_statutes_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import CopyBriefBox from "@/components/CopyBriefBox";

const PRESETS = [
  {
    label: "CA 78-in-65 (I-280)",
    state: "CA",
    mphOver: 13,
    annualPremium: 2600,
    baseFine: 35,
    priorTickets: 0,
  },
  {
    label: "NC 69-in-55 (SDIP +1pt)",
    state: "NC",
    mphOver: 14,
    annualPremium: 2400,
    baseFine: 50,
    priorTickets: 0,
  },
  {
    label: "NY 77-in-55 (6-pt DRA)",
    state: "NY",
    mphOver: 22,
    annualPremium: 2200,
    baseFine: 180,
    priorTickets: 0,
  },
];

export default function SpeedingTicketCostCalculator() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [mphOver, setMphOver] = useState(13);
  const [annualPremium, setAnnualPremium] = useState(2600);
  const [baseFineOverride, setBaseFineOverride] = useState<number | null>(null);
  const [priorTickets, setPriorTickets] = useState(0);

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["CA"];
  const isMajor = mphOver >= 15;
  const defaultBaseFine = isMajor ? st.baseFineMajor[0] : st.baseFineMinor[0];
  const baseFine = baseFineOverride ?? defaultBaseFine;

  const calc = useMemo(() => {
    const courtTotal = Math.round(baseFine * st.assessmentMultiplier);
    const hikePct = isMajor ? st.majorHikePct : st.minorHikePct;
    const priorMultiplier = priorTickets > 0 ? 1 + priorTickets * 0.25 : 1;
    const effectiveHikePct = Math.round(hikePct * priorMultiplier);
    const annualInsuranceHike = Math.round((annualPremium * effectiveHikePct) / 100);
    const years = Math.round(st.lookbackMonths / 12);
    const insurance3Yr = annualInsuranceHike * years;
    const stateSurcharge =
      (st.abbr === "NY" && isMajor) || st.abbr === "NJ" || st.abbr === "GA"
        ? st.stateSurchargeAmount3Yr
        : 0;
    const totalExposure = courtTotal + insurance3Yr + stateSurcharge;
    const pointsAdded = isMajor ? st.majorPoints : st.minorPoints;

    return {
      courtTotal,
      effectiveHikePct,
      annualInsuranceHike,
      years,
      insurance3Yr,
      stateSurcharge,
      totalExposure,
      pointsAdded,
    };
  }, [baseFine, st, isMajor, priorTickets, annualPremium]);

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setStateAbbr(p.state);
    setMphOver(p.mphOver);
    setAnnualPremium(p.annualPremium);
    setBaseFineOverride(p.baseFine);
    setPriorTickets(p.priorTickets);
  };

  const discoveryText = `INFORMAL DISCOVERY & CALIBRATION REQUEST
Re: Speeding Citation (${st.name} — ${st.statuteRef})
Alleged Speed: +${mphOver} mph over posted limit

To: Citing Law Enforcement Agency & Traffic Court Clerk
Pursuant to applicable state discovery rules, Defendant respectfully requests copies of:
1. Speed-measuring device (Radar/LiDAR) maintenance, calibration, and tuning-fork logs for the 90 days preceding and 30 days following the citation date.
2. Citing officer's current Radar/LiDAR operator certification and training records.
3. Current Engineering & Traffic Survey (ETS) for the cited roadway segment (where required by statute, e.g., ${st.statuteRef}).

Submitted without waiver of right to contest or elect ${st.trafficSchoolEligible ? "statutory traffic school / deferral" : "judicial mitigation"}.`;

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2 no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
          Executive Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] transition cursor-pointer shadow-xs"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 2-Column Precision Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 no-print">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#0f2747]">Citation &amp; Policy Parameters</h2>
            <p className="text-xs text-slate-500">All 51 U.S. jurisdictions · 2026 statutory schedules</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Jurisdiction (State / DC)</label>
            <select
              value={stateAbbr}
              onChange={(e) => {
                setStateAbbr(e.target.value);
                setBaseFineOverride(null);
              }}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            >
              {TICKET_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Speed Over Limit</span>
              <span className="tabular-nums text-[#0f2747]">
                +{mphOver} mph ({isMajor ? "Major 15+" : "Minor 1–14"})
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={35}
              value={mphOver}
              onChange={(e) => {
                setMphOver(Number(e.target.value));
                setBaseFineOverride(null);
              }}
              className="w-full accent-[#0f2747]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Current Annual Auto Insurance Premium ($)
            </label>
            <input
              type="number"
              min={400}
              max={15000}
              step={100}
              value={annualPremium}
              onChange={(e) => setAnnualPremium(Math.max(400, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Base Fine ($)</label>
              <input
                type="number"
                min={10}
                max={2500}
                value={baseFine}
                onChange={(e) => setBaseFineOverride(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums text-slate-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Prior Tickets (3 Yr)</label>
              <select
                value={priorTickets}
                onChange={(e) => setPriorTickets(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900"
              >
                <option value={0}>0 (Clean Record)</option>
                <option value={1}>1 Prior Violation</option>
                <option value={2}>2+ Prior Violations</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-[#0f2747]">Statutory Assessment Multiplier: {st.assessmentMultiplier}x</div>
            <p className="text-slate-600">{st.notes}</p>
          </div>
        </div>

        {/* Right: Live Exposure Ledger & Printable Brief */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  3-Year Financial Exposure &amp; Defense Brief
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  {st.name} (+{mphOver} mph Over Limit)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{st.statuteRef}</p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer no-print"
              >
                Print / Save Brief PDF
              </button>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0f2747] text-white">
                <div className="text-[11px] uppercase tracking-wider text-slate-300">
                  Total {calc.years}-Yr Exposure
                </div>
                <div className="text-3xl font-extrabold tabular-nums mt-1 text-[#c8a24a]">
                  ${calc.totalExposure.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-300 mt-1">If paid uncontested</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  {calc.years}-Yr Insurance Hike
                </div>
                <div className="text-2xl font-extrabold tabular-nums text-rose-700 mt-1">
                  +${calc.insurance3Yr.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  +{calc.effectiveHikePct}%/yr (${calc.annualInsuranceHike}/yr)
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  DMV Points / Court Total
                </div>
                <div className="text-2xl font-extrabold tabular-nums text-[#0f2747] mt-1">
                  {st.hasPoints ? `${calc.pointsAdded} pts` : "0 pts*"} · ${calc.courtTotal}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{st.pointSystemName}</div>
              </div>
            </div>

            {/* Line-item Ledger */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <th className="py-2 pr-4">Cost Component</th>
                    <th className="py-2 px-3">Statutory / Actuarial Basis</th>
                    <th className="py-2 pl-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums">
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-800">Base Fine + Court Assessments</td>
                    <td className="py-2.5 px-3 text-slate-500">${baseFine} base × {st.assessmentMultiplier}x</td>
                    <td className="py-2.5 pl-3 text-right font-bold text-slate-900">${calc.courtTotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-800">Cumulative Auto Insurance Surcharge</td>
                    <td className="py-2.5 px-3 text-slate-500">{calc.effectiveHikePct}% × ${annualPremium.toLocaleString()}/yr × {calc.years} yrs</td>
                    <td className="py-2.5 pl-3 text-right font-bold text-rose-700">${calc.insurance3Yr.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-800">State DMV / Super Speeder Surcharge</td>
                    <td className="py-2.5 px-3 text-slate-500">{st.stateSurchargeRule}</td>
                    <td className="py-2.5 pl-3 text-right font-bold text-slate-900">${calc.stateSurcharge.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Defense Pathways */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="font-bold text-emerald-900">
                  Traffic School: {st.trafficSchoolEligible ? "Available" : "Not Statutory"}
                </div>
                <p className="text-emerald-800 mt-1">{st.trafficSchoolRule}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                <div className="font-bold text-amber-900">
                  Written Declaration: {st.writtenDeclarationAvailable ? st.writtenDeclarationStatute : "Appearance / Counsel"}
                </div>
                <p className="text-amber-800 mt-1">{st.writtenDeclarationRule}</p>
              </div>
            </div>
          </div>

          <CopyBriefBox
            title="Copyable Informal Discovery & Calibration Request"
            subtitle="Send via certified mail to citing agency & court clerk before your response deadline"
            text={discoveryText}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="2026 Written Defense & Discovery Kit"
        title="Export Complete 3-Year Defense & Discovery Packet"
        desc="Includes editable Word templates for Trial by Written Declaration (TR-205 / ORS § 153.080), Radar/LiDAR Calibration Discovery Motions, and the 51-State Statutory Insurance Matrix."
        dynamicAmount={`$${calc.totalExposure.toLocaleString()}`}
        storageKey="speeding_insurance_cost"
        sampleLines={[
          { label: "Jurisdiction", value: `${st.name} (${st.abbr})` },
          { label: "Insurance Surcharge", value: `+$${calc.insurance3Yr.toLocaleString()} (${calc.years} yrs)` },
          { label: "Written Defense", value: st.writtenDeclarationAvailable ? st.writtenDeclarationStatute : "Counsel Plea" },
        ]}
        features={[
          "Editable Word Written Declaration Templates",
          "Radar & LiDAR Calibration Discovery Motion",
          "51-State DMV Point & SDIP Matrix (Excel)",
          "Trial de Novo & Traffic School Fallback Guide",
        ]}
      />
    </div>
  );
}
