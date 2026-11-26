"use client";

import { useState, useMemo } from "react";
import { TICKET_STATUTES_2026, TICKET_STATUTE_BY_ABBR } from "@/data/ticket_statutes_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import CopyBriefBox from "@/components/CopyBriefBox";

const PRESETS = [
  { label: "CA 78-in-65 (TR-205)", state: "CA", mphOver: 13, annualPremium: 2600, attorneyFee: 295, dismissalProb: 45 },
  { label: "NC 69-in-55 (PJC Counsel)", state: "NC", mphOver: 14, annualPremium: 2400, attorneyFee: 195, dismissalProb: 85 },
  { label: "TX 80-in-65 (DSC Dismissal)", state: "TX", mphOver: 15, annualPremium: 2300, attorneyFee: 0, dismissalProb: 95 },
];

const POLICY_PROFILES = [
  { id: "standard", label: "Standard Adult (1.0x)", factor: 1.0 },
  { id: "multipolicy", label: "Multi-Policy Bundle (0.85x)", factor: 0.85 },
  { id: "teen", label: "Teen / Young Driver (1.45x)", factor: 1.45 },
] as const;

export default function FightVsPayRoiCalculator() {
  const [mode, setMode] = useState<"quick" | "pro">("quick");
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [mphOver, setMphOver] = useState(13);
  const [baseFineOverride, setBaseFineOverride] = useState<number | null>(null);
  const [annualPremium, setAnnualPremium] = useState(2600);
  const [policyProfile, setPolicyProfile] = useState<"standard" | "multipolicy" | "teen">("standard");
  const [attorneyFee, setAttorneyFee] = useState(295);
  const [dismissalProb, setDismissalProb] = useState(45);
  const [trafficSchoolCost, setTrafficSchoolCost] = useState(95);
  const [timeCostUsd, setTimeCostUsd] = useState(100);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["CA"];
  const isMajor = mphOver >= 15;
  const defaultBaseFine = isMajor ? st.baseFineMajor[0] : st.baseFineMinor[0];
  const baseFine = baseFineOverride ?? defaultBaseFine;

  const model = useMemo(() => {
    const courtFine = Math.round(baseFine * st.assessmentMultiplier);
    const years = Math.round(st.lookbackMonths / 12);
    const baseHikePct = isMajor ? st.majorHikePct : st.minorHikePct;
    const profileFactor =
      mode === "quick"
        ? 1.0
        : POLICY_PROFILES.find((p) => p.id === policyProfile)?.factor ?? 1.0;
    const effectivePremium = mode === "quick" ? 2400 : annualPremium;
    const effectiveHikePct = Math.round(baseHikePct * profileFactor);
    const insurance3Yr = Math.round(((effectivePremium * effectiveHikePct) / 100) * years);
    const stateSurcharge =
      (st.abbr === "NY" && isMajor) || st.abbr === "NJ" || st.abbr === "GA"
        ? st.stateSurchargeAmount3Yr
        : 0;
    const effectiveSchoolCost = mode === "quick" ? 95 : trafficSchoolCost + timeCostUsd;

    // Path A: Pay Fine Outright
    const payTotalCost = courtFine + insurance3Yr + stateSurcharge;

    // Path B: Traffic School / Statutory Masking
    const schoolTotalCost = st.trafficSchoolEligible ? courtFine + effectiveSchoolCost : null;

    // Path C: Written Declaration (Self-Represented)
    const pWin = dismissalProb / 100;
    const writtenExpectedCost = Math.round(
      (1 - pWin) * (st.trafficSchoolEligible ? courtFine + effectiveSchoolCost : payTotalCost)
    );

    // Path D: Local Traffic Counsel
    const counselWin = Math.min(0.92, pWin + 0.35);
    const counselExpectedCost = Math.round(
      attorneyFee + (1 - counselWin) * payTotalCost + counselWin * (courtFine * 0.4)
    );

    const bestSavings = Math.max(
      payTotalCost - writtenExpectedCost,
      payTotalCost - (schoolTotalCost ?? payTotalCost),
      payTotalCost - counselExpectedCost
    );

    const recommended =
      st.writtenDeclarationAvailable
        ? "Contest via Written Declaration first (zero appearance), keeping Traffic School as fallback."
        : st.trafficSchoolEligible
        ? "Elect Statutory Traffic School / Deferral to guarantee 0% insurance surcharge."
        : "Retain Local Traffic Counsel for a 0-point non-moving amendment or PJC.";

    return {
      courtFine,
      insurance3Yr,
      stateSurcharge,
      payTotalCost,
      schoolTotalCost,
      writtenExpectedCost,
      counselExpectedCost,
      bestSavings,
      recommended,
      effectiveHikePct,
      effectivePremium,
      years,
    };
  }, [
    st,
    baseFine,
    isMajor,
    mode,
    policyProfile,
    annualPremium,
    attorneyFee,
    dismissalProb,
    trafficSchoolCost,
    timeCostUsd,
  ]);

  const statutorySummaryText = `3-YEAR FINANCIAL EXPOSURE & FIGHT VS. PAY BRIEF — ${st.name.toUpperCase()} (${st.abbr})
Statute: ${st.statuteRef} · Speed: +${mphOver} mph (${isMajor ? "Major 15+" : "Minor 1–14"})
DMV Points: ${st.hasPoints ? `${isMajor ? st.majorPoints : st.minorPoints} pts (${st.pointSystemName})` : `0 numeric pts (${st.pointSystemName})`}
1. Pay Ticket Outright: $${model.payTotalCost.toLocaleString()} ($${model.courtFine} fine + $${model.insurance3Yr.toLocaleString()} 3-yr insurance + $${model.stateSurcharge} state surcharge)
2. Traffic School / Deferral: ${model.schoolTotalCost !== null ? `$${model.schoolTotalCost.toLocaleString()}` : "Not Statutory"}
3. Written Declaration (${dismissalProb}% dismissal EV): $${model.writtenExpectedCost.toLocaleString()}
4. Local Traffic Counsel ($${attorneyFee} fee EV): $${model.counselExpectedCost.toLocaleString()}
Optimal Strategy: ${model.recommended} (Projected savings up to $${model.bestSavings.toLocaleString()})`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(statutorySummaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback
    }
  };

  const pleaLetter = `REQUEST FOR 0-POINT NON-MOVING AMENDMENT / DEFERRAL
Jurisdiction: ${st.name} (${st.statuteRef})
Citation Speed: +${mphOver} mph over posted limit

Dear Prosecutor / Traffic Court Clerk:
I hold a clean driving record and am writing to respectfully request consideration for ${
    st.trafficSchoolEligible
      ? "statutory Defensive Driving / Deferred Disposition"
      : "a non-moving 0-point amendment (e.g., defective equipment or parking)"
  }. I am prepared to pay the full statutory court costs and complete any required driver safety course promptly.

Thank you for your time and consideration.`;

  return (
    <div className="space-y-8">
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
            ROI Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setStateAbbr(p.state);
                setMphOver(p.mphOver);
                setBaseFineOverride(null);
                setAnnualPremium(p.annualPremium);
                setAttorneyFee(p.attorneyFee);
                setDismissalProb(p.dismissalProb);
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] transition cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 no-print">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0f2747]">
                {mode === "quick" ? "Quick 3-Input ROI Verdict" : "Forensic Pro ROI Inputs"}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === "quick"
                  ? "State, Base Fine & Speed Over Limit"
                  : "Policy factor, state surcharges, time cost & win probability"}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold uppercase text-[#0f2747]">
              {mode === "quick" ? "30s Quick" : "Pro Audit"}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">1. State / Jurisdiction</label>
            <select
              value={stateAbbr}
              onChange={(e) => {
                setStateAbbr(e.target.value);
                setBaseFineOverride(null);
              }}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900"
            >
              {TICKET_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">2. Base Fine ($)</label>
              <input
                type="number"
                min={10}
                max={2500}
                value={baseFine}
                onChange={(e) => setBaseFineOverride(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">3. MPH Over Limit</label>
              <input
                type="number"
                min={1}
                max={40}
                value={mphOver}
                onChange={(e) => {
                  setMphOver(Number(e.target.value) || 1);
                  setBaseFineOverride(null);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
              />
            </div>
          </div>

          {mode === "pro" && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Annual Premium ($)</label>
                  <input
                    type="number"
                    min={500}
                    max={15000}
                    step={100}
                    value={annualPremium}
                    onChange={(e) => setAnnualPremium(Number(e.target.value) || 500)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Policy Risk Factor</label>
                  <select
                    value={policyProfile}
                    onChange={(e) => setPolicyProfile(e.target.value as typeof policyProfile)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    {POLICY_PROFILES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">School Fee ($)</label>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={trafficSchoolCost}
                    onChange={(e) => setTrafficSchoolCost(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-semibold tabular-nums"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">Time Cost ($)</label>
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    value={timeCostUsd}
                    onChange={(e) => setTimeCostUsd(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-semibold tabular-nums"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">Counsel ($)</label>
                  <input
                    type="number"
                    min={0}
                    max={2500}
                    value={attorneyFee}
                    onChange={(e) => setAttorneyFee(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-semibold tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Written Contest Dismissal Probability</span>
                  <span className="tabular-nums text-[#059669]">{dismissalProb}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={95}
                  value={dismissalProb}
                  onChange={(e) => setDismissalProb(Number(e.target.value))}
                  className="w-full accent-[#059669]"
                />
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  3-Year Financial Exposure Brief · Fight vs. Pay ROI
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  Fight vs. Traffic School vs. Pay ({st.abbr})
                </h2>
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
                  className="px-4 py-2 rounded-xl bg-[#0f2747] text-white text-xs font-bold cursor-pointer"
                >
                  Print ROI Brief
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <span className="font-extrabold uppercase tracking-wider mr-1.5">Optimal Strategy:</span>
              {model.recommended} (Projected savings up to{" "}
              <strong className="tabular-nums">${model.bestSavings.toLocaleString()}</strong> over 3 years)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 tabular-nums">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                <div className="text-xs font-bold text-rose-900">1. Pay Ticket Outright</div>
                <div className="text-2xl font-extrabold text-rose-700 mt-1">
                  -${model.payTotalCost.toLocaleString()}
                </div>
                <div className="text-[11px] text-rose-800 mt-1">
                  ${model.courtFine} fine + ${model.insurance3Yr.toLocaleString()} insurance hike
                  {model.stateSurcharge > 0 ? ` + $${model.stateSurcharge} state surcharge` : ""}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-800">2. Statutory Traffic School / Deferral</div>
                <div className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  {model.schoolTotalCost !== null ? `-$${model.schoolTotalCost.toLocaleString()}` : "Not Statutory"}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  {st.trafficSchoolEligible ? "0% insurance surcharge; uses cooldown" : "Does not mask from insurers"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0f2747] text-white">
                <div className="text-xs font-bold text-[#c8a24a]">3. Written Declaration (Self-Filed)</div>
                <div className="text-2xl font-extrabold mt-1">
                  -${model.writtenExpectedCost.toLocaleString()} EV
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  At {dismissalProb}% dismissal rate · $0 if dismissed
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-800">4. Local Traffic Counsel</div>
                <div className="text-2xl font-extrabold text-[#059669] mt-1">
                  -${model.counselExpectedCost.toLocaleString()} EV
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  ${attorneyFee} flat fee · zero court appearance
                </div>
              </div>
            </div>
          </div>

          <CopyBriefBox
            title="Copyable Prosecutor Plea / Deferral Letter"
            subtitle="Use for mail-in or pretrial conference negotiation"
            text={pleaLetter}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="2026 Written Defense & Discovery Kit"
        title="Unlock Complete Fight vs. Pay Legal Templates"
        desc="Download editable .docx declarations, Radar/LiDAR calibration discovery requests, and the .xlsx 3-Year ROI Ledger."
        dynamicAmount={`$${model.bestSavings.toLocaleString()} Savings`}
        features={[
          ".docx Trial-by-Written-Declaration Templates",
          "Radar & LiDAR Calibration Discovery Request",
          ".xlsx 3-Year Insurance ROI Ledger",
          "51-State Traffic School Cooldown Tracker",
        ]}
      />
    </div>
  );
}
