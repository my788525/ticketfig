"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { TICKET_STATUTES_2026, StateTicketStatute } from "@/data/ticket_statutes_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import IcsDeadlineButton from "@/components/IcsDeadlineButton";

type ViolationCategory =
  | "speeding_1_14"
  | "speeding_15_24"
  | "major_25"
  | "red_light";

interface ViolationOption {
  id: ViolationCategory;
  label: string;
  shortLabel: string;
  desc: string;
  severity: "minor" | "moderate" | "major";
}

const VIOLATION_OPTIONS: ViolationOption[] = [
  {
    id: "speeding_1_14",
    label: "Speeding 1–14 mph Over",
    shortLabel: "1–14 mph Over",
    desc: "Standard minor moving violation. Often eligible for traffic school masking or Trial by Written Declaration.",
    severity: "minor",
  },
  {
    id: "speeding_15_24",
    label: "Speeding 15–24 mph Over",
    shortLabel: "15–24 mph Over",
    desc: "Elevated tier in many states with steeper point assessments and insurer surcharges.",
    severity: "moderate",
  },
  {
    id: "major_25",
    label: "Major Speeding 25+ mph",
    shortLabel: "25+ mph Over",
    desc: "High-risk / criminal-adjacent tier. Often ineligible for standard traffic school; requires plea reduction or calibration defense.",
    severity: "major",
  },
  {
    id: "red_light",
    label: "Red Light / Stop Sign",
    shortLabel: "Red Light / Stop Sign",
    desc: "Intersection moving violation (officer-observed or camera). Carries standard moving points and 3-year insurance hikes.",
    severity: "minor",
  },
];

interface DodoTier {
  id: "mitigation" | "written" | "plea";
  pid: string;
  price: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
}

const DODO_TIERS: DodoTier[] = [
  {
    id: "mitigation",
    pid: "pdt_0NsmwvJQ7pEkoshCRJ4IE",
    price: "$19.99",
    badge: "Traffic School & PJC Mitigation",
    title: "Traffic School, PJC & Insurance Surcharge Mitigation Pack",
    subtitle: "Best for eligible minor tickets & clean-record deferrals",
    desc: "Step-by-step state traffic school masking checklist, Prayer for Judgment Continued (PJC) / deferral request scripts, and insurer Good Driver Discount preservation guide.",
    features: [
      "State-Specific Traffic School & Deferral Scripts",
      "PJC / Clean-Record Mitigation Request Templates",
      "3-Year Insurance Renewal Audit Checklist",
      "DMV Point-Masking Verification Protocol",
    ],
  },
  {
    id: "written",
    pid: "pdt_0NsmklI8rw00LaBQM8xhq",
    price: "$24.99",
    badge: "Written Defense & Discovery",
    title: "50-State Traffic Ticket Written Defense & 3-Year Insurance Shield VIP Suite",
    subtitle: "Best for Trial by Written Declaration & Radar/LiDAR contests",
    desc: "Editable .docx Trial by Written Declaration templates (TR-205 / ORS § 153.080), Radar & LiDAR calibration discovery requests, and our .xlsx 3-Year ROI Ledger.",
    features: [
      "Editable .docx Written Declaration Templates",
      "Radar & LiDAR Calibration Discovery Requests",
      ".xlsx 51-State DMV Point & 3-Yr ROI Ledger",
      "All-Access Matrix Pass (Unlocks All Tools)",
    ],
  },
  {
    id: "plea",
    pid: "pdt_0NsmwwK4lKGumexh2H00t",
    price: "$39.99",
    badge: "High-Risk 25+ mph / Near-Suspension",
    title: "Prosecutor Plea Reduction & Calibration Subpoena Kit",
    subtitle: "Best for 25+ mph citations, work zones & point-cliff exposure",
    desc: "Prosecutor pre-trial reduction negotiation packets (zero-point non-moving amendments), formal speed-device calibration subpoena templates, and license-suspension defense.",
    features: [
      "Prosecutor Zero-Point Plea Reduction Briefs",
      "Formal Radar/LiDAR Calibration Subpoena Templates",
      "Work-Zone & High-Speed Mitigation Motions",
      "Suspension-Cliff & DMV Hearing Prep Checklist",
    ],
  },
];

const STEP_TITLES = [
  "State & Citation",
  "Insurance & Points",
  "Evidence & Factors",
  "Strategy Brief",
];

export default function TicketDefenseWizard() {
  const [step, setStep] = useState<number>(1);

  // Step 1
  const [stateAbbr, setStateAbbr] = useState<string>("CA");
  const [violation, setViolation] = useState<ViolationCategory>("speeding_1_14");

  // Step 2
  const [annualPremium, setAnnualPremium] = useState<number>(2200);
  const [existingPoints, setExistingPoints] = useState<number>(0);
  const [trafficSchoolUsedRecently, setTrafficSchoolUsedRecently] = useState<boolean>(false);

  // Step 3
  const [radarLidarCited, setRadarLidarCited] = useState<boolean>(true);
  const [writtenDeclEligible, setWrittenDeclEligible] = useState<boolean>(true);
  const [schoolOrConstructionZone, setSchoolOrConstructionZone] = useState<boolean>(false);
  const [cleanRecordPjcEligible, setCleanRecordPjcEligible] = useState<boolean>(true);

  // Step 4 UI state
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const selectedState: StateTicketStatute = useMemo(() => {
    return (
      TICKET_STATUTES_2026.find((s) => s.abbr === stateAbbr) ||
      TICKET_STATUTES_2026[0]
    );
  }, [stateAbbr]);

  const handleStateChange = (abbr: string) => {
    setStateAbbr(abbr);
    const nextState = TICKET_STATUTES_2026.find((s) => s.abbr === abbr);
    if (nextState) {
      setWrittenDeclEligible(nextState.writtenDeclarationAvailable);
    }
  };

  const selectedViolation = useMemo(() => {
    return (
      VIOLATION_OPTIONS.find((v) => v.id === violation) || VIOLATION_OPTIONS[0]
    );
  }, [violation]);

  const analysis = useMemo(() => {
    const isMajor = violation === "major_25" || violation === "speeding_15_24";
    const baseRange = isMajor
      ? selectedState.baseFineMajor
      : selectedState.baseFineMinor;
    const baseMid = Math.round((baseRange[0] + baseRange[1]) / 2);
    const zoneMultiplier = schoolOrConstructionZone ? 2 : 1;
    const estimatedCourtTotal = Math.round(
      baseMid * selectedState.assessmentMultiplier * zoneMultiplier
    );

    const pointsAdded = !selectedState.hasPoints
      ? 0
      : violation === "speeding_1_14" || violation === "red_light"
      ? selectedState.minorPoints
      : selectedState.majorPoints;

    const totalProjectedPoints = existingPoints + pointsAdded;

    let annualHikePct = selectedState.minorHikePct;
    if (violation === "red_light") {
      annualHikePct = Math.round(selectedState.minorHikePct * 1.1);
    } else if (violation === "speeding_15_24") {
      annualHikePct = selectedState.majorHikePct;
    } else if (violation === "major_25") {
      annualHikePct = Math.round(selectedState.majorHikePct * 1.25);
    }

    const safePremium = Math.max(400, annualPremium || 0);
    const annualInsuranceHike = Math.round(safePremium * (annualHikePct / 100));
    const threeYearInsuranceHike = annualInsuranceHike * 3;

    const stateSurcharge =
      totalProjectedPoints >= 6 || violation === "major_25"
        ? selectedState.stateSurchargeAmount3Yr
        : 0;

    const totalThreeYearExposure =
      estimatedCourtTotal + threeYearInsuranceHike + stateSurcharge;
    const protectableExposure = threeYearInsuranceHike + stateSurcharge;

    // Tier matching logic
    const nearSuspensionRisk =
      (selectedState.hasPoints && totalProjectedPoints >= 6) ||
      (schoolOrConstructionZone && existingPoints >= 3) ||
      (violation === "major_25");

    let matchedTierId: DodoTier["id"] = "mitigation";
    let branchReason = "";

    if (nearSuspensionRisk) {
      matchedTierId = "plea";
      branchReason =
        violation === "major_25"
          ? "Major 25+ mph citations frequently disqualify standard traffic school and trigger steep insurer surcharges. A prosecutor plea reduction or calibration subpoena is the highest-leverage defense."
          : `With ${totalProjectedPoints} projected DMV/insurance points${
              schoolOrConstructionZone ? " and a school/construction zone enhancement" : ""
            }, you are approaching a suspension or state surcharge cliff. A formal plea-reduction & subpoena strategy protects your license.`;
    } else if (
      writtenDeclEligible ||
      radarLidarCited ||
      trafficSchoolUsedRecently ||
      !selectedState.trafficSchoolEligible ||
      violation === "speeding_15_24"
    ) {
      matchedTierId = "written";
      branchReason = writtenDeclEligible
        ? `${selectedState.name} permits written/mail-in contest (${selectedState.writtenDeclarationStatute}), allowing you to challenge the citation and request Radar/LiDAR calibration discovery without an initial courtroom appearance.`
        : trafficSchoolUsedRecently || !selectedState.trafficSchoolEligible
        ? `Because traffic school masking is unavailable or recently used, contesting the citation via formal written defense and Radar/LiDAR calibration discovery is your strongest path to avoid the +${annualHikePct}%/yr insurance surcharge.`
        : `With Radar/LiDAR speed evidence cited on a ${selectedViolation.shortLabel} ticket, pairing a formal discovery request with a structured written defense maximizes dismissal leverage.`;
    } else {
      matchedTierId = "mitigation";
      branchReason = `${selectedState.name} allows traffic school / clean-record mitigation (${
        cleanRecordPjcEligible ? "PJC / deferral eligible" : "point masking"
      }), making a structured mitigation & insurance-shield workflow the fastest, lowest-cost way to save ~$${protectableExposure.toLocaleString()} over 36 months.`;
    }

    const matchedTier =
      DODO_TIERS.find((t) => t.id === matchedTierId) || DODO_TIERS[1];

    return {
      estimatedCourtTotal,
      pointsAdded,
      totalProjectedPoints,
      annualHikePct,
      annualInsuranceHike,
      threeYearInsuranceHike,
      stateSurcharge,
      totalThreeYearExposure,
      protectableExposure,
      matchedTier,
      branchReason,
    };
  }, [
    selectedState,
    violation,
    selectedViolation,
    annualPremium,
    existingPoints,
    trafficSchoolUsedRecently,
    radarLidarCited,
    writtenDeclEligible,
    schoolOrConstructionZone,
    cleanRecordPjcEligible,
  ]);

  const summaryText = useMemo(() => {
    return [
      `TICKETFIG 2026 — 3-YEAR INSURANCE EXPOSURE & DEFENSE STRATEGY BRIEF`,
      `==================================================================`,
      `Jurisdiction: ${selectedState.name} (${selectedState.abbr})`,
      `Governing Statute: ${selectedState.statuteRef}`,
      `Citation Category: ${selectedViolation.label}${
        schoolOrConstructionZone ? " [School / Construction Zone]" : ""
      }`,
      `Current Annual Auto Premium: $${annualPremium.toLocaleString()}`,
      `Existing Points: ${existingPoints} | Projected Citation Points: +${analysis.pointsAdded} (Total: ${analysis.totalProjectedPoints})`,
      ``,
      `3-YEAR FINANCIAL EXPOSURE PROJECTION`,
      `- Est. Court Fine & Statutory Assessments: $${analysis.estimatedCourtTotal.toLocaleString()}`,
      `- Projected Annual Insurance Hike (+${analysis.annualHikePct}%/yr): +$${analysis.annualInsuranceHike.toLocaleString()}/yr`,
      `- 36-Month Cumulative Insurance Surcharge: $${analysis.threeYearInsuranceHike.toLocaleString()}`,
      `- State DMV Surcharge Exposure: $${analysis.stateSurcharge.toLocaleString()}`,
      `- TOTAL 3-YEAR EXPOSURE: $${analysis.totalThreeYearExposure.toLocaleString()}`,
      ``,
      `STATE POINT & PROCEDURAL RULES`,
      `- Point System: ${selectedState.pointSystemName}`,
      `- Suspension Cliff: ${selectedState.suspensionThreshold}`,
      `- Traffic School Rule: ${selectedState.trafficSchoolRule}`,
      `- Written Declaration: ${selectedState.writtenDeclarationRule} (${selectedState.writtenDeclarationStatute})`,
      `- State Surcharge Rule: ${selectedState.stateSurchargeRule}`,
      ``,
      `RECOMMENDED DEFENSE STRATEGY: ${analysis.matchedTier.title} (${analysis.matchedTier.price})`,
      `Rationale: ${analysis.branchReason}`,
      ``,
      `Official Authority: ${selectedState.authorityName} (${selectedState.officialUrl})`,
      `Generated via https://ticketfig.com/wizard/ (Educational & actuarial estimate; not legal advice.)`,
    ].join("\n");
  }, [
    selectedState,
    selectedViolation,
    schoolOrConstructionZone,
    annualPremium,
    existingPoints,
    analysis,
  ]);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback ignored
    }
  };

  const handleDirectCheckout = (pid: string) => {
    try {
      fetch("https://send.lianu.com/api/vip/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "ticketfig.com",
          product_id: pid,
          source: "wizard_tier_card",
        }),
      }).catch(() => {});
    } catch {
      // Ignore telemetry error
    }
    window.open(
      `https://checkout.dodopayments.com/buy/${encodeURIComponent(pid)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const progressPct = Math.round((step / 4) * 100);

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f2747] text-[#c8a24a] text-xs font-bold uppercase tracking-wider">
            Step {step} of 4 · {STEP_TITLES[step - 1]}
          </span>
          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            {progressPct}% Complete
          </span>
        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#059669] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
          {STEP_TITLES.map((label, idx) => {
            const num = idx + 1;
            const isActive = step === num;
            const isDone = step > num;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setStep(num)}
                className={`text-left px-2.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-[#0f2747] text-white border-[#0f2747]"
                    : isDone
                    ? "bg-emerald-50 text-[#059669] border-emerald-200 hover:bg-emerald-100/70"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="block text-[10px] uppercase tracking-wider opacity-80">
                  Step {num}
                </span>
                <span className="truncate block">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 1: State & Citation Type */}
      {step === 1 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
              1. Select Your Jurisdiction &amp; Citation Type
            </h2>
            <p className="text-sm text-slate-600">
              We load 2026 statutory point schedules, court assessment multipliers, and written
              defense rules for all 50 states + DC.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="wizard-state"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              State / Jurisdiction (51 Covered)
            </label>
            <select
              id="wizard-state"
              value={stateAbbr}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[#0f2747] focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            >
              {TICKET_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr}) — {s.statuteRef}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              {selectedState.pointSystemName} · Minor hike benchmark: +{selectedState.minorHikePct}%/yr
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Violation Category
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {VIOLATION_OPTIONS.map((opt) => {
                const active = violation === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setViolation(opt.id)}
                    className={`text-left p-4 rounded-xl border-2 transition cursor-pointer space-y-1.5 ${
                      active
                        ? "border-[#0f2747] bg-slate-50 shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-[#0f2747]">
                        {opt.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          opt.severity === "major"
                            ? "bg-rose-100 text-rose-700"
                            : opt.severity === "moderate"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {opt.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white font-bold text-sm transition cursor-pointer"
            >
              Next: Insurance &amp; Points →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Insurance & Points Exposure */}
      {step === 2 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
              2. Auto Insurance &amp; Prior Points Exposure
            </h2>
            <p className="text-sm text-slate-600">
              Insurers apply percentage surcharges over a 36-month lookback window. Enter your
              current baseline to model your exact 3-year dollar risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <label
                htmlFor="wizard-premium"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                Current Annual Auto Insurance Premium ($)
              </label>
              <input
                id="wizard-premium"
                type="number"
                min={400}
                max={15000}
                step={50}
                value={annualPremium}
                onChange={(e) => setAnnualPremium(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-[#0f2747] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
              />
              <div className="flex flex-wrap gap-2">
                {[1400, 2200, 3000, 4200].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAnnualPremium(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                      annualPremium === preset
                        ? "bg-[#0f2747] text-white border-[#0f2747]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    ${preset.toLocaleString()}/yr
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="wizard-points"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                Existing DMV / Insurance Points on Record
              </label>
              <input
                id="wizard-points"
                type="number"
                min={0}
                max={20}
                value={existingPoints}
                onChange={(e) =>
                  setExistingPoints(Math.max(0, Number(e.target.value) || 0))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-[#0f2747] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
              />
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 4, 6].map((pts) => (
                  <button
                    key={pts}
                    type="button"
                    onClick={() => setExistingPoints(pts)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                      existingPoints === pts
                        ? "bg-[#0f2747] text-white border-[#0f2747]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {pts} pts
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Have you used Traffic School / Defensive Driving in the last 18–36 months?
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setTrafficSchoolUsedRecently(false)}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition cursor-pointer ${
                  !trafficSchoolUsedRecently
                    ? "border-[#0f2747] bg-slate-50 text-[#0f2747]"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                No (Clean / Eligible)
              </button>
              <button
                type="button"
                onClick={() => setTrafficSchoolUsedRecently(true)}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition cursor-pointer ${
                  trafficSchoolUsedRecently
                    ? "border-[#0f2747] bg-slate-50 text-[#0f2747]"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                Yes (Cooldown Active)
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm transition cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white font-bold text-sm transition cursor-pointer"
            >
              Next: Evidence &amp; Factors →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Evidence & Procedural Factors */}
      {step === 3 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
              3. Evidence &amp; Procedural Defense Factors
            </h2>
            <p className="text-sm text-slate-600">
              Check all factors that apply to your citation. These determine whether your optimal
              branch is Traffic School/PJC, Written Declaration, or Plea Reduction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#0f2747] bg-slate-50/50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={radarLidarCited}
                onChange={(e) => setRadarLidarCited(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#0f2747]"
              />
              <div className="space-y-0.5">
                <span className="block text-sm font-bold text-[#0f2747]">
                  Radar / LiDAR Cited on Ticket
                </span>
                <span className="block text-xs text-slate-600">
                  Enables calibration log, tuning fork, and operator certification discovery requests.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#0f2747] bg-slate-50/50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={writtenDeclEligible}
                onChange={(e) => setWrittenDeclEligible(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#0f2747]"
              />
              <div className="space-y-0.5">
                <span className="block text-sm font-bold text-[#0f2747]">
                  Trial by Written Declaration Eligible
                </span>
                <span className="block text-xs text-slate-600">
                  {selectedState.writtenDeclarationAvailable
                    ? `${selectedState.name} supports written contest (${selectedState.writtenDeclarationStatute}).`
                    : `${selectedState.name} generally requires in-person/attorney appearance unless court allows written mitigation.`}
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#0f2747] bg-slate-50/50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={schoolOrConstructionZone}
                onChange={(e) => setSchoolOrConstructionZone(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#0f2747]"
              />
              <div className="space-y-0.5">
                <span className="block text-sm font-bold text-[#0f2747]">
                  School or Construction Zone
                </span>
                <span className="block text-xs text-slate-600">
                  Typically doubles statutory base fines and may restrict standard traffic school deferral.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#0f2747] bg-slate-50/50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={cleanRecordPjcEligible}
                onChange={(e) => setCleanRecordPjcEligible(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#0f2747]"
              />
              <div className="space-y-0.5">
                <span className="block text-sm font-bold text-[#0f2747]">
                  Clean 3-Year Driving Record / PJC Eligible
                </span>
                <span className="block text-xs text-slate-600">
                  Strengthens Prayer for Judgment Continued (PJC), deferred adjudication, or good-driver mitigation.
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm transition cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-xl bg-[#059669] hover:bg-emerald-600 text-white font-extrabold text-sm transition cursor-pointer shadow-sm"
            >
              Generate Strategy Brief &amp; Match Kit →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Printable Brief + Tiered Digital Product Match */}
      {step === 4 && (
        <div className="space-y-8">
          {/* Free Printable Brief */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0f2747] text-[11px] font-bold uppercase tracking-wider">
                  Free Printable Statutory &amp; Actuarial Brief
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
                  《3-Year Insurance Exposure &amp; Defense Strategy Brief》
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedState.name} ({selectedState.abbr}) · {selectedState.statuteRef} ·{" "}
                  {selectedViolation.label}
                  {schoolOrConstructionZone ? " · School/Work Zone" : ""}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 no-print">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    copiedSummary
                      ? "bg-[#059669] text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-[#0f2747] border border-slate-300"
                  }`}
                >
                  {copiedSummary
                    ? "Copied Summary ✓"
                    : "Copy Free Statutory & Points Summary"}
                </button>
                <IcsDeadlineButton
                  title={`Court / Contest Deadline: ${selectedState.name} Citation`}
                  description={`TicketFig 4-Step Defense Wizard (${selectedState.statuteRef}). Est. 3-Yr Exposure: $${analysis.totalThreeYearExposure.toLocaleString()}.`}
                  daysFromNow={21}
                  url="https://ticketfig.com/wizard/"
                  filename={`ticketfig-deadline-${selectedState.abbr.toLowerCase()}.ics`}
                />
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  Print Brief / Save PDF
                </button>
              </div>
            </div>

            {/* 4 Key Exposure Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Est. Court Total
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  ${analysis.estimatedCourtTotal.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {selectedState.assessmentMultiplier}x assessment mult.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                  3-Yr Insurance Hike
                </div>
                <div className="text-2xl font-extrabold text-rose-700 mt-1">
                  +${analysis.threeYearInsuranceHike.toLocaleString()}
                </div>
                <div className="text-[11px] text-rose-600 mt-0.5">
                  +{analysis.annualHikePct}%/yr for 36 mos
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Projected Points
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  +{analysis.pointsAdded} pts
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Total on record: {analysis.totalProjectedPoints} pts
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0f2747] text-white border border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#c8a24a]">
                  Total 3-Yr Exposure
                </div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  ${analysis.totalThreeYearExposure.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Protectable: ~${analysis.protectableExposure.toLocaleString()}
                </div>
              </div>
            </div>

            {/* State Point Rules & Recommended Branch */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-sm font-extrabold text-[#0f2747] uppercase tracking-wider">
                  {selectedState.name} Statutory Point &amp; Court Rules
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  <li>
                    <strong>Point System:</strong> {selectedState.pointSystemName}
                  </li>
                  <li>
                    <strong>Suspension Threshold:</strong>{" "}
                    {selectedState.suspensionThreshold}
                  </li>
                  <li>
                    <strong>Traffic School Rule:</strong>{" "}
                    {selectedState.trafficSchoolRule}
                  </li>
                  <li>
                    <strong>Written Contest Rule:</strong>{" "}
                    {selectedState.writtenDeclarationRule} (
                    {selectedState.writtenDeclarationStatute})
                  </li>
                  <li>
                    <strong>State Surcharge Rule:</strong>{" "}
                    {selectedState.stateSurchargeRule}
                  </li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  Official Authority:{" "}
                  <a
                    href={selectedState.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#059669] font-semibold hover:underline"
                  >
                    {selectedState.authorityName} ↗
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#059669] text-white text-[10px] font-bold uppercase tracking-wider">
                  Matched Defense Branch
                </div>
                <h3 className="text-base font-extrabold text-[#0f2747]">
                  {analysis.matchedTier.title} ({analysis.matchedTier.price})
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {analysis.branchReason}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 no-print">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-[#0f2747] hover:bg-slate-50 transition cursor-pointer"
                  >
                    ← Edit Inputs
                  </button>
                  <Link
                    href={`/states/${selectedState.slug}/`}
                    className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-[#059669] hover:bg-slate-50 transition"
                  >
                    View {selectedState.name} Full Dossier →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Matched Dodo Product via ToolPaywallDossier */}
          <ToolPaywallDossier
            badge={`Matched Defense Kit · ${analysis.matchedTier.badge}`}
            title={analysis.matchedTier.title}
            desc={analysis.matchedTier.desc}
            price={analysis.matchedTier.price}
            pid={analysis.matchedTier.pid}
            features={analysis.matchedTier.features}
            dynamicAmount={`~$${analysis.protectableExposure.toLocaleString()}`}
            docType={analysis.matchedTier.title}
            sampleLines={[
              {
                label: "Jurisdiction & Statute",
                value: `${selectedState.name} (${selectedState.statuteRef})`,
              },
              {
                label: "3-Yr Insurance Exposure",
                value: `+$${analysis.threeYearInsuranceHike.toLocaleString()} (+${analysis.annualHikePct}%/yr)`,
              },
              {
                label: "Projected Points",
                value: `+${analysis.pointsAdded} pts (Total: ${analysis.totalProjectedPoints})`,
              },
              {
                label: "Recommended Tier",
                value: `${analysis.matchedTier.badge} (${analysis.matchedTier.price})`,
              },
            ]}
          />

          {/* 3-Tier Kit Comparison Cards */}
          <section className="space-y-4 no-print">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#0f2747]">
                Compare All 3 TicketFig Defense Kits
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Choose your matched tier above or select any defense pack directly below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {DODO_TIERS.map((tier) => {
                const isMatched = tier.id === analysis.matchedTier.id;
                return (
                  <div
                    key={tier.pid}
                    className={`rounded-2xl p-6 flex flex-col justify-between space-y-5 transition ${
                      isMatched
                        ? "bg-[#0f2747] text-white border-2 border-[#c8a24a] shadow-lg"
                        : "bg-white text-[#0f2747] border border-slate-200 shadow-xs"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isMatched
                              ? "bg-[#c8a24a] text-slate-950"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {isMatched ? "Recommended Match" : tier.badge}
                        </span>
                        <span
                          className={`text-xl font-extrabold tabular-nums ${
                            isMatched ? "text-[#c8a24a]" : "text-[#0f2747]"
                          }`}
                        >
                          {tier.price}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-extrabold leading-snug">
                          {tier.title}
                        </h4>
                        <p
                          className={`text-xs mt-1 ${
                            isMatched ? "text-slate-300" : "text-slate-500"
                          }`}
                        >
                          {tier.subtitle}
                        </p>
                      </div>

                      <ul className="space-y-1.5 text-xs">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <span className="text-[#059669] font-bold">✓</span>
                            <span
                              className={
                                isMatched ? "text-slate-200" : "text-slate-700"
                              }
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDirectCheckout(tier.pid)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                        isMatched
                          ? "bg-[#c8a24a] hover:bg-amber-400 text-slate-950"
                          : "bg-[#0f2747] hover:bg-slate-800 text-white"
                      }`}
                    >
                      Get This Kit ({tier.price}) →
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
