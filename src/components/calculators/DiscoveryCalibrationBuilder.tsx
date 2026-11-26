"use client";

import { useMemo, useState } from "react";
import { TICKET_STATUTES_2026, TICKET_STATUTE_BY_ABBR } from "@/data/ticket_statutes_2026";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import CopyBriefBox from "@/components/CopyBriefBox";
import IcsDeadlineButton from "@/components/IcsDeadlineButton";

type SpeedDevice =
  | "Stalker DSR 2X Radar"
  | "ProLaser 4 LiDAR"
  | "MPH Bee III"
  | "Pacing / Speedometer";

type IssuingAgency =
  | "State Highway Patrol / CHP"
  | "County Sheriff"
  | "Municipal Police";

export default function DiscoveryCalibrationBuilder() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [courtName, setCourtName] = useState(
    "Superior Court of California, County of Los Angeles — Traffic Division"
  );
  const [citationNumber, setCitationNumber] = useState("TF-2026-849201");
  const [device, setDevice] = useState<SpeedDevice>("Stalker DSR 2X Radar");
  const [agency, setAgency] = useState<IssuingAgency>("State Highway Patrol / CHP");
  const [deadlineDate, setDeadlineDate] = useState("");

  const st = TICKET_STATUTE_BY_ABBR[stateAbbr] || TICKET_STATUTE_BY_ABBR["CA"];

  const checklist = useMemo(() => {
    const isLidar = device === "ProLaser 4 LiDAR";
    const isPacing = device === "Pacing / Speedometer";

    return [
      {
        title: "Tuning Fork Calibration Log",
        detail: isPacing
          ? `Certified patrol vehicle speedometer calibration certificate (90-day / 6-month interval) for ${agency} unit.`
          : isLidar
          ? `Factory & 90-day NIST-traceable distance/alignment calibration log for ${device} (including daily self-test & HUD alignment logs).`
          : `Pre-shift and post-shift tuning fork calibration logs and annual bench certification for ${device} (serial-number matched).`,
      },
      {
        title: "FCC Station License",
        detail: isPacing || isLidar
          ? `Device type-acceptance / IACP Conforming Product List (CPL) authorization and ${agency} equipment assignment log.`
          : `Active FCC Station License / Part 90 frequency authorization held by ${agency} for ${device} Doppler radar operation.`,
      },
      {
        title: "Officer POST Radar Cert",
        detail: `Citing officer's current POST / state-mandated Radar/LiDAR operator training certificate and recertification records.`,
      },
      {
        title: "Engineering & Traffic Survey",
        detail: `Current, certified Engineering & Traffic Survey (ETS) for the cited roadway segment justifying the posted speed limit under ${st.statuteRef}.`,
      },
      {
        title: "Dashcam/Bodycam Retention Notice",
        detail: `Immediate litigation-hold / preservation notice to ${agency} for all patrol dashcam, body-worn camera (BWC), and audio recordings of the stop.`,
      },
    ];
  }, [agency, device, st.statuteRef]);

  const formalDiscoveryPreview = useMemo(() => {
    const cleanCourt = courtName.trim() || `[${st.name} Traffic Court]`;
    const cleanCitation = citationNumber.trim() || "[CITATION #]";
    return `INFORMAL PRE-TRIAL DISCOVERY & EVIDENCE PRESERVATION REQUEST — Re: Citation No. ${cleanCitation} (${cleanCourt}, ${st.name}): Pursuant to applicable state traffic discovery rules and due process under ${st.statuteRef}, Defendant respectfully requests copies of (1) the 90-day maintenance and Tuning Fork / calibration logs for the ${device} unit used by ${agency}, (2) the agency's active FCC Station License / IACP Conforming Product List authorization, (3) the citing officer's current POST Radar/LiDAR operator certification, (4) the current certified Engineering & Traffic Survey (ETS) for the cited roadway, and (5) immediate preservation of all patrol dashcam and body-worn camera recordings relating to Citation No. ${cleanCitation}.`;
  }, [agency, citationNumber, courtName, device, st.name, st.statuteRef]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 no-print">
          <h2 className="text-base font-bold text-[#0f2747] border-b border-slate-100 pb-3">
            Case, Device &amp; Agency Details
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
            <label className="block text-xs font-bold text-slate-700">Court Name</label>
            <input
              type="text"
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
              placeholder="e.g., Superior Court of California, County of Orange"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Citation Number</label>
            <input
              type="text"
              value={citationNumber}
              onChange={(e) => setCitationNumber(e.target.value)}
              placeholder="e.g., TF-2026-849201"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-mono font-semibold text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Speed Measurement Device</label>
            <select
              value={device}
              onChange={(e) => setDevice(e.target.value as SpeedDevice)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900"
            >
              <option value="Stalker DSR 2X Radar">Stalker DSR 2X Radar</option>
              <option value="ProLaser 4 LiDAR">ProLaser 4 LiDAR</option>
              <option value="MPH Bee III">MPH Bee III</option>
              <option value="Pacing / Speedometer">Pacing / Speedometer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Issuing Agency</label>
            <select
              value={agency}
              onChange={(e) => setAgency(e.target.value as IssuingAgency)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900"
            >
              <option value="State Highway Patrol / CHP">State Highway Patrol / CHP</option>
              <option value="County Sheriff">County Sheriff</option>
              <option value="Municipal Police">Municipal Police</option>
            </select>
          </div>

          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">
              Discovery / Court Deadline Date (Optional for .ics)
            </label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
            />
          </div>
        </div>

        {/* Right Outputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 print-brief">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8a24a]">
                  Pre-Trial FOIA &amp; Calibration Discovery Brief
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f2747] mt-1">
                  Free Pre-Trial Informal Discovery Checklist
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {st.name} ({st.abbr}) · {device} · {agency} · Citation {citationNumber || "N/A"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 no-print">
                <IcsDeadlineButton
                  title={`Discovery & Court Deadline: ${citationNumber || st.name}`}
                  description={`Serve Informal Discovery Request on ${agency} / ${courtName} for ${device} calibration & ETS records (${st.statuteRef}).`}
                  daysFromNow={14}
                  targetDate={deadlineDate || undefined}
                  url="https://ticketfig.com/calculators/discovery-calibration-builder/"
                  filename={`ticketfig-discovery-deadline-${st.abbr.toLowerCase()}.ics`}
                />
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition"
                >
                  Print Discovery Brief
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {checklist.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0f2747] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#0f2747]">{item.title}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
              <div className="font-bold text-emerald-900">
                Controlling Written Contest / Discovery Statute ({st.name})
              </div>
              <p className="text-emerald-800 leading-relaxed">
                {st.writtenDeclarationStatute}: {st.writtenDeclarationRule}
              </p>
            </div>
          </div>

          <CopyBriefBox
            title="Free 1-Paragraph Formal Discovery Request Preview"
            subtitle="Copy and paste into your Informal Discovery Demand letter or FOIA/Public Records request"
            text={formalDiscoveryPreview}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="2026 Radar / LiDAR Discovery & Written Declaration Suite"
        title="Unlock Complete FOIA, Subpoena & TR-205 Filing Package"
        desc="Download ready-to-serve .docx Informal Discovery Demands, Certified Mail Proof-of-Service Forms, and Device-Specific Calibration Cross-Exam Packets."
        price="$39.99"
        pid="pdt_0NsmwwK4lKGumexh2H00t"
        dynamicAmount={device}
        docType="Formal Discovery & Calibration Subpoena Kit"
        features={[
          "Editable .docx Informal Discovery & FOIA Letters",
          "Stalker DSR 2X / ProLaser 4 / Bee III Spec Sheets",
          "Certified Mail Service & Motion to Compel Templates",
          "All-Access Matrix Pass (Unlocks All Tools)",
        ]}
        sampleLines={[
          { label: "Jurisdiction", value: `${st.name} (${st.statuteRef})` },
          { label: "Court", value: courtName || "Traffic Division" },
          { label: "Speed Device", value: device },
          { label: "Issuing Agency", value: agency },
        ]}
      />
    </div>
  );
}
