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

export default function FightVsPayRoiCalculator() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [mphOver, setMphOver] = useState(13);
  const [annualPremium, setAnnualPremium] = useState(2600);
  const [attorneyFee, setAttorneyFee] = useState(295);
  const [dismissalProb, setDismissalProb] = useState(45);
  const [trafficSchoolCost, setTrafficSchoolCost] = useState(95);

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["CA"];
  const isMajor = mphOver >= 15;

  const model = useMemo(() => {
    const courtFine = Math.round((isMajor ? st.baseFineMajor[0] : st.baseFineMinor[0]) * st.assessmentMultiplier);
    const years = Math.round(st.lookbackMonths / 12);
    const hikePct = isMajor ? st.majorHikePct : st.minorHikePct;
    const insurance3Yr = Math.round(((annualPremium * hikePct) / 100) * years);
    const stateSurcharge = st.abbr === "NY" && isMajor ? st.stateSurchargeAmount3Yr : st.abbr === "NJ" ? st.stateSurchargeAmount3Yr : 0;

    // Path A: Pay Fine Outright
    const payTotalCost = courtFine + insurance3Yr + stateSurcharge;

    // Path B: Traffic School / Statutory Masking
    const schoolTotalCost = st.trafficSchoolEligible ? courtFine + trafficSchoolCost : null;

    // Path C: Written Declaration (Self-Represented)
    const pWin = dismissalProb / 100;
    const writtenExpectedCost = Math.round((1 - pWin) * (st.trafficSchoolEligible ? courtFine + trafficSchoolCost : payTotalCost));

    // Path D: Local Traffic Counsel
    const counselWin = Math.min(0.92, pWin + 0.35);
    const counselExpectedCost = Math.round(attorneyFee + (1 - counselWin) * payTotalCost + counselWin * (courtFine * 0.4));

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
      payTotalCost,
      schoolTotalCost,
      writtenExpectedCost,
      counselExpectedCost,
      bestSavings,
      recommended,
    };
  }, [st, isMajor, annualPremium, attorneyFee, dismissalProb, trafficSchoolCost]);

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
      <div className="flex flex-wrap items-center gap-2 no-print">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 no-print">
          <h2 className="text-base font-bold text-[#0f2747] border-b border-slate-100 pb-3">
            Decision &amp; Probability Inputs
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">MPH Over Limit</label>
              <input
                type="number"
                min={1}
                max={40}
                value={mphOver}
                onChange={(e) => setMphOver(Number(e.target.value) || 1)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Traffic School Fee ($)</label>
              <input
                type="number"
                min={0}
                max={500}
                value={trafficSchoolCost}
                onChange={(e) => setTrafficSchoolCost(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Local Counsel ($)</label>
              <input
                type="number"
                min={0}
                max={2500}
                value={attorneyFee}
                onChange={(e) => setAttorneyFee(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
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

        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  3-Year Expected Value Comparison
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  Fight vs. Traffic School vs. Pay ({st.abbr})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#0f2747] text-white text-xs font-bold cursor-pointer no-print"
              >
                Print ROI Brief
              </button>
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
        desc="Download editable Word declarations, prosecutor plea-by-mail letters, and the 51-state ROI workbook."
        dynamicAmount={`$${model.bestSavings.toLocaleString()} Savings`}
        features={[
          "Written Declaration & Affidavit Templates",
          "Prosecutor 0-Point Plea-by-Mail Letters",
          "51-State Traffic School Cooldown Tracker",
          "3-Year Insurance ROI Excel Workbook",
        ]}
      />
    </div>
  );
}
