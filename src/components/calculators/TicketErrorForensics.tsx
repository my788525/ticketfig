"use client";

import { useMemo, useState } from "react";
import { TICKET_STATUTES_2026, TICKET_STATUTE_BY_ABBR } from "@/data/ticket_statutes_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import CopyBriefBox from "@/components/CopyBriefBox";
import IcsDeadlineButton from "@/components/IcsDeadlineButton";

type SpeedMethod = "Pacing" | "Visual Estimation" | "Radar" | "LiDAR" | "Aircraft / VASCAR";

interface DefectOption {
  id: string;
  label: string;
  points: number;
  defenseTitle: string;
  defenseSummary: string;
}

const METHOD_BASE_LEVERAGE: Record<SpeedMethod, { base: number; rule: string }> = {
  "Visual Estimation": {
    base: 28,
    rule: "Visual speed estimation alone lacks objective electronic corroboration; cross-examination focuses on distance judgment, angle of observation, and lack of certified speed-measuring instrumentation.",
  },
  Pacing: {
    base: 22,
    rule: "Pacing requires proof of a recently calibrated patrol speedometer, constant-distance pacing over a sufficient roadway interval, and zero acceleration lag.",
  },
  "Aircraft / VASCAR": {
    base: 20,
    rule: "Aerial/VASCAR timing is vulnerable to human stopwatch reaction-time variance, parallax error from altitude/angle, and unverified ground-marker survey distances.",
  },
  Radar: {
    base: 14,
    rule: "Doppler Radar requires pre- and post-shift tuning fork calibration logs, active FCC station authorization, officer POST/state certification, and single-target isolation within beam width.",
  },
  LiDAR: {
    base: 12,
    rule: "Laser/LiDAR requires NIST-traceable alignment/distance verification, stationary braced operation to prevent sweep/panning error, and unobstructed line-of-sight.",
  },
};

const DEFECT_OPTIONS: DefectOption[] = [
  {
    id: "missing_sig_date",
    label: "Missing/illegible officer signature or court date",
    points: 16,
    defenseTitle: "Facial / Jurisdictional Citation Defect",
    defenseSummary:
      "A citation lacking a legible officer attestation, signature, or valid appearance/response date fails statutory notice requirements and supports a motion to dismiss or quash.",
  },
  {
    id: "speed_trap_ets",
    label: "Potential Speed Trap / Expired Engineering & Traffic Survey (ETS)",
    points: 22,
    defenseTitle: "Speed Trap & Expired ETS Bar (e.g., Cal. Veh. Code § 40802)",
    defenseSummary:
      "Under speed-trap statutes such as Cal. Veh. Code §§ 40802–40805, radar/laser speed evidence is inadmissible and the court lacks jurisdiction if the roadway lacks a current, certified Engineering & Traffic Survey (typically 5–7 years).",
  },
  {
    id: "traffic_occlusion",
    label: "Heavy traffic / multi-lane vehicle occlusion",
    points: 15,
    defenseTitle: "Target Ambiguity & Multi-Vehicle Beam Intrusion",
    defenseSummary:
      "In dense multi-lane traffic, Doppler radar reflects the strongest return (often a larger adjacent vehicle) rather than the nearest vehicle, defeating single-target certainty beyond a reasonable doubt.",
  },
  {
    id: "weather_visibility",
    label: "Weather / night visibility interference",
    points: 12,
    defenseTitle: "Environmental Attenuation & Identification Doubt",
    defenseSummary:
      "Heavy rain, fog, glare, or darkness degrades visual tracking history, vehicle identification continuity, and LiDAR optical beam return integrity.",
  },
  {
    id: "no_calibration_log",
    label: "Calibration log not provided on citation",
    points: 14,
    defenseTitle: "Evidentiary Foundation & Calibration Gap",
    defenseSummary:
      "Without documented pre-shift/post-shift tuning fork checks and periodic bench calibration logs produced in discovery, electronic speed readings lack foundational admissibility.",
  },
  {
    id: "obstructed_sign",
    label: "Obstructed or missing speed limit sign",
    points: 18,
    defenseTitle: "Lack of Statutory Prima Facie Notice",
    defenseSummary:
      "Enforceability of a reduced or non-standard speed zone requires legible, MUTCD-compliant posted signage; foliage, construction, or missing signs negate fair statutory notice.",
  },
];

const PRESETS = [
  {
    label: "CA Radar + Speed Trap (CVC § 40802)",
    state: "CA",
    method: "Radar" as SpeedMethod,
    defects: ["speed_trap_ets", "traffic_occlusion", "no_calibration_log"],
  },
  {
    label: "NY Visual / Pacing Audit",
    state: "NY",
    method: "Visual Estimation" as SpeedMethod,
    defects: ["weather_visibility", "obstructed_sign"],
  },
  {
    label: "TX LiDAR + Citation Defect",
    state: "TX",
    method: "LiDAR" as SpeedMethod,
    defects: ["missing_sig_date", "no_calibration_log"],
  },
];

export default function TicketErrorForensics() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [method, setMethod] = useState<SpeedMethod>("Radar");
  const [selectedDefects, setSelectedDefects] = useState<string[]>([
    "speed_trap_ets",
    "no_calibration_log",
  ]);
  const [deadlineDate, setDeadlineDate] = useState("");

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["CA"];

  const toggleDefect = (id: string) => {
    setSelectedDefects((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const analysis = useMemo(() => {
    const methodInfo = METHOD_BASE_LEVERAGE[method];
    const activeDefects = DEFECT_OPTIONS.filter((d) => selectedDefects.includes(d.id));
    const defectScore = activeDefects.reduce((sum, d) => {
      const caBoost = stateAbbr === "CA" && d.id === "speed_trap_ets" ? 4 : 0;
      return sum + d.points + caBoost;
    }, 0);
    const writtenBonus = st.writtenDeclarationAvailable ? 6 : 0;
    const score = Math.min(100, Math.max(0, methodInfo.base + defectScore + writtenBonus));

    const tier =
      score >= 70
        ? {
            label: "High Dismissal Leverage",
            badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
            barClass: "bg-[#059669]",
          }
        : score >= 45
        ? {
            label: "Moderate-to-Strong Leverage",
            badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
            barClass: "bg-[#c8a24a]",
          }
        : {
            label: "Baseline Procedural Leverage",
            badgeClass: "bg-slate-100 text-slate-800 border-slate-300",
            barClass: "bg-[#0f2747]",
          };

    const statutoryDefenses: { title: string; detail: string }[] = [
      {
        title: `${st.name} Controlling Statute (${st.statuteRef})`,
        detail: `Prosecution bears the burden of proving every element of the alleged speed violation beyond a reasonable doubt (or statutory preponderance standard) under ${st.statuteRef}.`,
      },
    ];

    if (stateAbbr === "CA" || selectedDefects.includes("speed_trap_ets")) {
      statutoryDefenses.push({
        title: "Cal. Veh. Code § 40802 Speed Trap Law & ETS Mandate",
        detail:
          stateAbbr === "CA"
            ? "Under Cal. Veh. Code §§ 40802–40805, if speed is measured by radar/laser on a non-local street without an Engineering & Traffic Survey (ETS) conducted within 5–7 years, the enforcement constitutes an unlawful speed trap and officer testimony is inadmissible."
            : "Most jurisdictions require a valid Engineering & Traffic Survey (ETS) and MUTCD-compliant speed zoning to sustain prima facie speed-limit presumptions when contested.",
      });
    }

    if (st.writtenDeclarationAvailable) {
      statutoryDefenses.push({
        title: `Mail-In Written Contest (${st.writtenDeclarationStatute})`,
        detail: st.writtenDeclarationRule,
      });
    }

    statutoryDefenses.push({
      title: `${method} Evidentiary Foundation`,
      detail: methodInfo.rule,
    });

    for (const d of activeDefects) {
      statutoryDefenses.push({
        title: d.defenseTitle,
        detail: d.defenseSummary,
      });
    }

    const outlineText = `《COURTROOM / WRITTEN DECLARATION DEFENSE OUTLINE》
Jurisdiction: ${st.name} (${st.abbr}) — ${st.statuteRef}
Enforcement Method: ${method}
Dismissal Leverage Score: ${score}/100 (${tier.label})
${st.writtenDeclarationAvailable ? `Written Contest Authority: ${st.writtenDeclarationStatute}` : `Contest Forum: In-Person / Counsel Appearance (${st.writtenDeclarationStatute})`}

I. THRESHOLD & PROCEDURAL OBJECTIONS
- Enter plea of Not Guilty and demand strict proof of all statutory elements under ${st.statuteRef}.
- ${methodInfo.rule}

II. MATCHED FORENSIC DEFECTS & STATUTORY BARS (${activeDefects.length} Identified)
${
  activeDefects.length > 0
    ? activeDefects.map((d, idx) => `${idx + 1}. ${d.defenseTitle}: ${d.defenseSummary}`).join("\n")
    : "1. Demand full foundational proof of calibration, officer certification, and traffic survey compliance."
}

III. FALLBACK & MITIGATION PRESERVATION
- If an adverse finding is entered, Defendant respectfully requests ${
      st.trafficSchoolEligible
        ? `statutory Traffic School / Defensive Driving masking (${st.trafficSchoolRule})`
        : "0-point non-moving amendment or judicial mitigation"
    } and preservation of Trial de Novo / appeal rights.`;

    return {
      score,
      tier,
      activeDefects,
      statutoryDefenses,
      outlineText,
    };
  }, [method, selectedDefects, st, stateAbbr]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
          Forensic Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setStateAbbr(p.state);
              setMethod(p.method);
              setSelectedDefects(p.defects);
            }}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#0f2747] text-xs font-semibold text-[#0f2747] transition cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Control Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 no-print">
          <h2 className="text-base font-bold text-[#0f2747] border-b border-slate-100 pb-3">
            Citation Forensics &amp; Defect Audit
          </h2>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              State / Jurisdiction (51 Statutory Schedules)
            </label>
            <select
              value={stateAbbr}
              onChange={(e) => setStateAbbr(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900"
            >
              {TICKET_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr}) {s.writtenDeclarationAvailable ? "✓ Written Contest" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Speed Measurement Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["Pacing", "Visual Estimation", "Radar", "LiDAR", "Aircraft / VASCAR"] as const).map(
                (m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                      method === m
                        ? "bg-[#0f2747] text-white border-[#0f2747]"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400"
                    } ${m === "Aircraft / VASCAR" ? "col-span-2" : ""}`}
                  >
                    {m}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Forensic &amp; Procedural Defects Observed ({selectedDefects.length}/6)
            </label>
            <div className="space-y-2">
              {DEFECT_OPTIONS.map((d) => {
                const checked = selectedDefects.includes(d.id);
                return (
                  <label
                    key={d.id}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition ${
                      checked
                        ? "bg-emerald-50/70 border-emerald-300 text-[#0f2747]"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDefect(d.id)}
                      className="mt-0.5 rounded border-slate-300 text-[#059669] focus:ring-[#059669]"
                    />
                    <span className="font-medium leading-snug">{d.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">
              Court / Contest Deadline Date (Optional for .ics)
            </label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
            />
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  2026 Forensic Citation Audit
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  《Courtroom / Written Declaration Defense Outline》
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {st.name} ({st.abbr}) · {st.statuteRef} · Method: {method}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 no-print">
                <IcsDeadlineButton
                  title={`Court / Contest Deadline: ${st.name} Citation`}
                  description={`TicketFig Forensic Defense Outline (${st.statuteRef}). Method: ${method}. Dismissal Leverage: ${analysis.score}/100.`}
                  daysFromNow={21}
                  targetDate={deadlineDate || undefined}
                  url="https://ticketfig.com/calculators/ticket-error-forensics/"
                  filename={`ticketfig-deadline-${st.abbr.toLowerCase()}.ics`}
                />
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition"
                >
                  Print Defense Outline
                </button>
              </div>
            </div>

            {/* Dismissal Leverage Score */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Dismissal Leverage Score
                  </div>
                  <div className="text-4xl font-extrabold text-[#0f2747] tabular-nums mt-0.5">
                    {analysis.score}
                    <span className="text-lg font-bold text-slate-400"> / 100</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${analysis.tier.badgeClass}`}
                >
                  {analysis.tier.label}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${analysis.tier.barClass}`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reflects evidentiary burden of <strong>{method}</strong>,{" "}
                <strong>{analysis.activeDefects.length}</strong> identified citation/roadway defects,
                and {st.name} procedural contest rules ({st.writtenDeclarationStatute}).
              </p>
            </div>

            {/* Matched Statutory & Procedural Defenses */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-[#0f2747] uppercase tracking-wider">
                Matched Statutory &amp; Procedural Defenses
              </h3>
              <div className="space-y-2.5">
                {analysis.statutoryDefenses.map((def) => (
                  <div
                    key={def.title}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1"
                  >
                    <div className="text-xs font-bold text-[#0f2747]">{def.title}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{def.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CopyBriefBox
            title="Copyable 《Courtroom / Written Declaration Defense Outline》"
            subtitle="Paste into your Written Declaration (e.g., Form TR-205) or courtroom cross-examination notes"
            text={analysis.outlineText}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="2026 Forensic Defense & Speed-Trap Kit"
        title="Download Full Speed-Trap Motion & Cross-Examination Pack"
        desc="Unlock editable .docx Speed-Trap Dismissal Motions (Cal. Veh. Code § 40802), ETS Subpoena Templates, and Officer Cross-Examination Scripts."
        price="$24.99"
        pid="pdt_0NsmklI8rw00LaBQM8xhq"
        dynamicAmount={`${analysis.score}/100 Leverage`}
        docType="Speed-Trap & Citation Forensics Pack"
        features={[
          "Editable .docx Speed-Trap & ETS Motions",
          "Radar / LiDAR / Pacing Cross-Exam Scripts",
          "51-State Written Contest & Trial de Novo Guide",
          "All-Access Matrix Pass (Unlocks All Tools)",
        ]}
        sampleLines={[
          { label: "Jurisdiction", value: `${st.name} (${st.statuteRef})` },
          { label: "Enforcement Method", value: method },
          { label: "Dismissal Leverage", value: `${analysis.score}/100 (${analysis.tier.label})` },
          { label: "Forensic Defects", value: `${analysis.activeDefects.length} matched` },
        ]}
      />
    </div>
  );
}
