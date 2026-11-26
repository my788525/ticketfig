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

const POLICY_PROFILES = [
  { id: "standard", label: "Standard Adult (1.0x)", factor: 1.0 },
  { id: "multipolicy", label: "Multi-Policy Bundle (0.85x)", factor: 0.85 },
  { id: "teen", label: "Teen / Young Driver (1.45x)", factor: 1.45 },
] as const;

export default function SpeedingTicketCostCalculator() {
  const [mode, setMode] = useState<"quick" | "pro">("quick");
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [mphOver, setMphOver] = useState(13);
  const [annualPremium, setAnnualPremium] = useState(2600);
  const [baseFineOverride, setBaseFineOverride] = useState<number | null>(null);
  const [priorTickets, setPriorTickets] = useState(0);
  const [policyProfile, setPolicyProfile] = useState<"standard" | "multipolicy" | "teen">("standard");
  const [trafficSchoolFee, setTrafficSchoolFee] = useState(65);
  const [timeCostUsd, setTimeCostUsd] = useState(120);
  const [dismissalProb, setDismissalProb] = useState(45);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["CA"];
  const isMajor = mphOver >= 15;
  const defaultBaseFine = isMajor ? st.baseFineMajor[0] : st.baseFineMinor[0];
  const baseFine = baseFineOverride ?? defaultBaseFine;

  const calc = useMemo(() => {
    const courtTotal = Math.round(baseFine * st.assessmentMultiplier);
    const hikePct = isMajor ? st.majorHikePct : st.minorHikePct;
    const effectivePriorTickets = mode === "quick" ? 0 : priorTickets;
    const profileFactor =
      mode === "quick"
        ? 1.0
        : POLICY_PROFILES.find((p) => p.id === policyProfile)?.factor ?? 1.0;
    const effectivePremium = mode === "quick" ? 2400 : annualPremium;

    const priorMultiplier = effectivePriorTickets > 0 ? 1 + effectivePriorTickets * 0.25 : 1;
    const effectiveHikePct = Math.round(hikePct * priorMultiplier * profileFactor);
    const annualInsuranceHike = Math.round((effectivePremium * effectiveHikePct) / 100);
    const years = Math.round(st.lookbackMonths / 12);
    const insurance3Yr = annualInsuranceHike * years;
    const stateSurcharge =
      (st.abbr === "NY" && isMajor) || st.abbr === "NJ" || st.abbr === "GA"
        ? st.stateSurchargeAmount3Yr
        : 0;
    const totalExposure = courtTotal + insurance3Yr + stateSurcharge;
    const pointsAdded = isMajor ? st.majorPoints : st.minorPoints;

    const schoolTotal = st.trafficSchoolEligible ? courtTotal + trafficSchoolFee + timeCostUsd : null;
    const pWin = dismissalProb / 100;
    const writtenDeclEv = Math.round((1 - pWin) * (schoolTotal ?? totalExposure));
    const projectedSavings = Math.max(
      totalExposure - writtenDeclEv,
      schoolTotal !== null ? totalExposure - schoolTotal : 0
    );

    return {
      courtTotal,
      effectiveHikePct,
      annualInsuranceHike,
      years,
      insurance3Yr,
      stateSurcharge,
      totalExposure,
      pointsAdded,
      effectivePremium,
      schoolTotal,
      writtenDeclEv,
      projectedSavings,
    };
  }, [
    baseFine,
    st,
    isMajor,
    mode,
    priorTickets,
    policyProfile,
    annualPremium,
    trafficSchoolFee,
    timeCostUsd,
    dismissalProb,
  ]);

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setStateAbbr(p.state);
    setMphOver(p.mphOver);
    setAnnualPremium(p.annualPremium);
    setBaseFineOverride(p.baseFine);
    setPriorTickets(p.priorTickets);
  };

  const statutorySummaryText = `3-YEAR FINANCIAL EXPOSURE BRIEF — ${st.name.toUpperCase()} (${st.abbr})
Statute: ${st.statuteRef} · Authority: ${st.authorityName}
Citation: +${mphOver} mph over limit (${isMajor ? "Major 15+" : "Minor 1–14"})
DMV Points: ${st.hasPoints ? `${calc.pointsAdded} pts (${st.pointSystemName})` : `0 numeric pts (${st.pointSystemName})`}
Court Fine + Assessments: $${calc.courtTotal.toLocaleString()} ($${baseFine} base × ${st.assessmentMultiplier}x)
${calc.years}-Yr Insurance Surcharge: +$${calc.insurance3Yr.toLocaleString()} (+${calc.effectiveHikePct}%/yr on $${calc.effectivePremium.toLocaleString()}/yr)
State DMV / Super Speeder Surcharge: $${calc.stateSurcharge.toLocaleString()} (${st.stateSurchargeRule})
TOTAL ${calc.years}-YEAR EXPOSURE IF PAID: $${calc.totalExposure.toLocaleString()}
Traffic School: ${st.trafficSchoolEligible ? `Eligible — ${st.trafficSchoolRule}` : `Not Statutory — ${st.trafficSchoolRule}`}
Written Declaration: ${st.writtenDeclarationAvailable ? `Available (${st.writtenDeclarationStatute})` : `Appearance / Counsel (${st.writtenDeclarationStatute})`}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(statutorySummaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback
    }
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
      {/* Mode Toggle + Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <div
          className="inline-flex rounded-xl bg-slate-200/80 p-1 border border-slate-300"
          role="tablist"
          aria-label="Calculator Mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "quick"}
            onClick={() => setMode("quick")}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              mode === "quick"
                ? "bg-[#0f2747] text-white shadow-sm"
                : "text-slate-700 hover:text-[#0f2747]"
            }`}
          >
            Quick Check (30s)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "pro"}
            onClick={() => setMode("pro")}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              mode === "pro"
                ? "bg-[#0f2747] text-white shadow-sm"
                : "text-slate-700 hover:text-[#0f2747]"
            }`}
          >
            Forensic Pro Audit
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
      </div>

      {/* 2-Column Precision Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 no-print">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0f2747]">
                {mode === "quick" ? "Quick 3-Input Exposure Check" : "Forensic Pro Audit Parameters"}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === "quick"
                  ? "State, Base Fine & Speed Over Limit · $2,400/yr baseline"
                  : "Multi-factor policy, prior points & defense ROI modeling"}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold uppercase text-[#0f2747]">
              {mode === "quick" ? "30s Quick" : "Pro Audit"}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">1. Jurisdiction (State / DC)</label>
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
            <label className="block text-xs font-bold text-slate-700">2. Base Fine ($)</label>
            <input
              type="number"
              min={10}
              max={2500}
              value={baseFine}
              onChange={(e) => setBaseFineOverride(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>3. Speed Over Limit / Ticket Type</span>
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
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Minor (1–14 mph)</span>
              <span>Major (15+ mph)</span>
            </div>
          </div>

          {mode === "pro" && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Baseline Annual Auto Insurance Premium ($)
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
                  <label className="block text-xs font-bold text-slate-700">Policy / Driver Factor</label>
                  <select
                    value={policyProfile}
                    onChange={(e) => setPolicyProfile(e.target.value as typeof policyProfile)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    {POLICY_PROFILES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Prior Tickets (3 Yr)</label>
                  <select
                    value={priorTickets}
                    onChange={(e) => setPriorTickets(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    <option value={0}>0 (Clean Record)</option>
                    <option value={1}>1 Prior Violation (+25%)</option>
                    <option value={2}>2+ Prior Violations (+50%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Traffic School Fee ($)</label>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={trafficSchoolFee}
                    onChange={(e) => setTrafficSchoolFee(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold tabular-nums text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Time Cost ($)</label>
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    value={timeCostUsd}
                    onChange={(e) => setTimeCostUsd(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold tabular-nums text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Written Declaration Dismissal Prob.</span>
                  <span className="tabular-nums text-[#059669]">{dismissalProb}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={dismissalProb}
                  onChange={(e) => setDismissalProb(Number(e.target.value))}
                  className="w-full accent-[#059669]"
                />
              </div>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-[#0f2747]">
              Statutory Assessment Multiplier: {st.assessmentMultiplier}x
            </div>
            <p className="text-slate-600">{st.notes}</p>
          </div>
        </div>

        {/* Right: Live Exposure Ledger & Printable Brief */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  3-Year Financial Exposure Brief
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  {st.name} (+{mphOver} mph Over Limit)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{st.statuteRef}</p>
              </div>
              <div className="flex flex-wrap gap-2 no-print">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    copiedSummary
                      ? "bg-[#059669] text-white border-[#059669]"
                      : "bg-slate-50 hover:bg-slate-100 text-[#0f2747] border-slate-300"
                  }`}
                >
                  {copiedSummary ? "Copied Summary ✓" : "Copy Statutory & Points Summary"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  Print / Save Brief PDF
                </button>
              </div>
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
                    <td className="py-2.5 px-3 text-slate-500">
                      {calc.effectiveHikePct}% × ${calc.effectivePremium.toLocaleString()}/yr × {calc.years} yrs
                    </td>
                    <td className="py-2.5 pl-3 text-right font-bold text-rose-700">${calc.insurance3Yr.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-800">State DMV / Super Speeder Surcharge</td>
                    <td className="py-2.5 px-3 text-slate-500">{st.stateSurchargeRule}</td>
                    <td className="py-2.5 pl-3 text-right font-bold text-slate-900">${calc.stateSurcharge.toLocaleString()}</td>
                  </tr>
                  {mode === "pro" && (
                    <tr className="bg-emerald-50/60">
                      <td className="py-2.5 pr-4 font-semibold text-emerald-900">
                        Written Declaration Expected Value ({dismissalProb}% dismissal)
                      </td>
                      <td className="py-2.5 px-3 text-emerald-800">
                        Traffic school fallback: ${trafficSchoolFee} fee + ${timeCostUsd} time
                      </td>
                      <td className="py-2.5 pl-3 text-right font-extrabold text-emerald-900">
                        ${calc.writtenDeclEv.toLocaleString()} EV (Save ${calc.projectedSavings.toLocaleString()})
                      </td>
                    </tr>
                  )}
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
        desc="Includes editable .docx Trial by Written Declaration templates (TR-205 / ORS § 153.080), Radar/LiDAR Calibration Discovery Requests, and the .xlsx 3-Year ROI Ledger."
        dynamicAmount={`$${calc.totalExposure.toLocaleString()}`}
        storageKey="speeding_insurance_cost"
        sampleLines={[
          { label: "Jurisdiction", value: `${st.name} (${st.abbr})` },
          { label: "Insurance Surcharge", value: `+$${calc.insurance3Yr.toLocaleString()} (${calc.years} yrs)` },
          { label: "Written Defense", value: st.writtenDeclarationAvailable ? st.writtenDeclarationStatute : "Counsel Plea" },
        ]}
        features={[
          "Editable .docx Written Declaration Templates",
          "Radar & LiDAR Calibration Discovery Request",
          ".xlsx 3-Year Insurance & ROI Ledger",
          "Trial de Novo & Traffic School Fallback Guide",
        ]}
      />
    </div>
  );
}
