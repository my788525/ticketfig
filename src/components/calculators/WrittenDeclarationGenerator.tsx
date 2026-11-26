"use client";

import { useState } from "react";
import { TICKET_STATUTES_2026, TICKET_STATUTE_BY_ABBR } from "@/data/ticket_statutes_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import CopyBriefBox from "@/components/CopyBriefBox";

const PRESETS = [
  { label: "CA CVC § 40902 (TR-205)", state: "CA", method: "Radar" as const, speedZone: 65, allegedSpeed: 78 },
  { label: "OR ORS § 153.080 Affidavit", state: "OR", method: "LiDAR" as const, speedZone: 55, allegedSpeed: 69 },
  { label: "WA IRLJ 3.5 Written Statement", state: "WA", method: "Radar" as const, speedZone: 60, allegedSpeed: 73 },
];

export default function WrittenDeclarationGenerator() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [method, setMethod] = useState<"Radar" | "LiDAR" | "Pace">("Radar");
  const [speedZone, setSpeedZone] = useState(65);
  const [allegedSpeed, setAllegedSpeed] = useState(78);

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["CA"];

  const declarationBrief = `${
    st.writtenDeclarationAvailable
      ? `TRIAL BY WRITTEN DECLARATION / AFFIDAVIT (${st.writtenDeclarationStatute})`
      : `PRE-TRIAL INFORMAL DISCOVERY & PLEA REDUCTION BRIEF (${st.statuteRef})`
  }
Jurisdiction: ${st.name} (${st.authorityName})
Alleged Violation: ${allegedSpeed} mph in a posted ${speedZone} mph zone (+${Math.max(1, allegedSpeed - speedZone)} mph)
Enforcement Method: ${method}

STATEMENT OF FACTS & EVIDENTIARY OBJECTIONS:
1. I respectfully plead Not Guilty and request strict proof of every element of the alleged violation under ${st.statuteRef}.
2. ${
    method === "Radar"
      ? "Radar Foundation: Prosecution must establish pre-shift and post-shift tuning fork calibration checks, patrol vehicle speedometer certification, and officer FCC/POST radar operator certification."
      : method === "LiDAR"
      ? "LiDAR Foundation: Prosecution must establish NIST-traceable distance/alignment verification, unobstructed line-of-sight, and stable mounting/bracing during target acquisition."
      : "Pace Foundation: Prosecution must establish certified patrol vehicle speedometer calibration and constant-distance pacing over a sufficient distance."
  }
3. Engineering & Traffic Survey: Where required by statute (e.g., speed-trap prohibitions), prosecution must produce a current, certified Engineering & Traffic Survey justifying the ${speedZone} mph prima facie limit.
4. Fallback Request: If the Court enters an adverse finding, Defendant respectfully requests preservation of statutory ${
    st.trafficSchoolEligible ? "Traffic School / Defensive Driving" : "judicial mitigation"
  } eligibility and/or Trial de Novo rights.`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
          Statutory Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setStateAbbr(p.state);
              setMethod(p.method);
              setSpeedZone(p.speedZone);
              setAllegedSpeed(p.allegedSpeed);
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
            Citation &amp; Enforcement Method
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
                  {s.name} ({s.abbr}) {s.writtenDeclarationAvailable ? "✓ Mail-In Eligible" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Speed Measurement Method</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Radar", "LiDAR", "Pace"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    method === m
                      ? "bg-[#0f2747] text-white border-[#0f2747]"
                      : "bg-slate-50 text-slate-700 border-slate-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Posted Limit (mph)</label>
              <input
                type="number"
                min={15}
                max={85}
                value={speedZone}
                onChange={(e) => setSpeedZone(Number(e.target.value) || 55)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Cited Speed (mph)</label>
              <input
                type="number"
                min={20}
                max={120}
                value={allegedSpeed}
                onChange={(e) => setAllegedSpeed(Number(e.target.value) || 68)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold tabular-nums"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  Written Declaration &amp; Discovery Eligibility
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  {st.name}: {st.writtenDeclarationAvailable ? "Eligible for Mail-In Contest ✓" : "Court / Counsel Appearance Required"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#0f2747] text-white text-xs font-bold cursor-pointer no-print"
              >
                Print Defense Checklist
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#0f2747]">Controlling Statute</div>
                <div className="text-slate-700 mt-1">{st.writtenDeclarationStatute}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#0f2747]">Statutory Rule</div>
                <div className="text-slate-700 mt-1">{st.writtenDeclarationRule}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
              <div className="font-bold text-emerald-900">
                {method} Calibration Discovery Checklist
              </div>
              <ul className="list-disc pl-5 text-emerald-800 space-y-1">
                <li>90-day device maintenance &amp; calibration certificate</li>
                <li>Officer current {method} operator training &amp; POST/state certification</li>
                <li>Engineering &amp; Traffic Survey (ETS) for {speedZone} mph zone</li>
                <li>Patrol vehicle speedometer calibration log (if moving/pace)</li>
              </ul>
            </div>
          </div>

          <CopyBriefBox
            title="Copyable Written Declaration & Discovery Statement"
            subtitle="Adapt with your citation number, court name, and date of violation"
            text={declarationBrief}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="2026 Written Defense & Discovery Kit"
        title="Download Full TR-205 & Discovery Word Templates"
        desc="Includes ready-to-file Word templates for California CVC § 40902, Oregon ORS § 153.080, Washington IRLJ 3.5, plus Certified Mail Discovery Motions."
        features={[
          "Form TR-205 & Trial de Novo (TR-220) Guide",
          "Radar, LiDAR & Pace Discovery Word Motions",
          "51-State Written Contest Eligibility Matrix",
          "Officer Cross-Examination & ETS Checklist",
        ]}
      />
    </div>
  );
}
