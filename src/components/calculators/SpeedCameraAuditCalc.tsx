'use client';

import React, { useMemo, useState } from 'react';
import IcsDeadlineButton from '@/components/IcsDeadlineButton';

export default function SpeedCameraAuditCalc() {
  const [citationType, setCitationType] = useState<'camera' | 'officer'>('camera');
  const [jurisdiction, setJurisdiction] = useState<'CA' | 'NY' | 'FL' | 'WA' | 'OTHER'>('CA');
  const [fineAmount, setFineAmount] = useState(125);
  const [annualPremium, setAnnualPremium] = useState(2100);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const isCamera = citationType === 'camera';
    const dmvPoints = isCamera ? 0 : 2;
    const insuranceHike3Yr = isCamera ? 0 : Math.round(annualPremium * 0.24 * 3);
    const totalExposure = fineAmount + insuranceHike3Yr;
    const statute =
      jurisdiction === 'CA'
        ? isCamera
          ? 'California AB 645 (Cal. Veh. Code § 22425) — Civil Speed Camera (0 DMV Points)'
          : 'California CVC § 40902 — Trial by Written Declaration + 1+ DMV Point'
        : jurisdiction === 'NY'
          ? isCamera
            ? 'N.Y. VTL § 1180-b — School Zone Speed Camera ($50 Civil Liability, 0 Points)'
            : 'N.Y. VTL § 1180 + § 1199 Driver Responsibility Assessment'
          : jurisdiction === 'FL'
            ? isCamera
              ? 'Fla. Stat. § 316.1896 — School Zone Speed Detection (Civil Notice, 0 Points)'
              : 'Fla. Stat. § 322.27 — Moving Violation Points & Insurance Impact'
            : jurisdiction === 'WA'
              ? isCamera
                ? 'RCW § 46.63.170 — Automated Traffic Safety Camera (0 Points, Non-Moving)'
                : 'RCW § 46.61.400 — Moving Violation & 3-Yr Insurance Surcharge'
              : isCamera
                ? 'Municipal Automated Civil Citation (Verify Zero-Point Civil Status)'
                : 'State Moving Violation Points & 36-Month Insurance Rating';

    const brief = `2027 CITATION CLASSIFICATION & INSURANCE AUDIT\nType: ${isCamera ? 'Automated Speed Camera (Civil)' : 'Officer-Issued Moving Violation'}\nStatute: ${statute}\nFine: $${fineAmount} | DMV Points: ${dmvPoints} | Est. 3-Yr Insurance Surcharge: $${insuranceHike3Yr.toLocaleString()}\nTotal 3-Year Exposure: $${totalExposure.toLocaleString()}\nNext Step: ${
      isCamera
        ? 'Verify signage distance, calibration certificate, and registered-owner non-driver affidavit before paying.'
        : 'Do NOT simply pay—request Trial by Written Declaration or calibration discovery to avoid the 3-year insurance surcharge.'
    }`;

    return { isCamera, dmvPoints, insuranceHike3Yr, totalExposure, statute, brief };
  }, [citationType, jurisdiction, fineAmount, annualPremium]);

  const copyBrief = () => {
    navigator.clipboard?.writeText(result.brief).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm no-print">
        <div className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">
          2027 CAMERA VS. OFFICER INPUTS
        </div>
        <label className="block text-xs font-bold text-[#0b1120]">
          Citation Source
          <select
            value={citationType}
            onChange={(e) => setCitationType(e.target.value as 'camera' | 'officer')}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white"
          >
            <option value="camera">Automated Speed / School-Zone Camera (Mail Notice)</option>
            <option value="officer">Officer-Issued Moving Violation (Pulled Over)</option>
          </select>
        </label>
        <label className="block text-xs font-bold text-[#0b1120]">
          State Program
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value as 'CA' | 'NY' | 'FL' | 'WA' | 'OTHER')}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white"
          >
            <option value="CA">California (AB 645 Speed Camera Pilot / CVC)</option>
            <option value="NY">New York (VTL § 1180-b School Camera)</option>
            <option value="FL">Florida (Fla. Stat. § 316.1896)</option>
            <option value="WA">Washington (RCW § 46.63.170)</option>
            <option value="OTHER">Other U.S. State</option>
          </select>
        </label>
        <label className="block text-xs font-bold text-[#0b1120]">
          Ticket Fine ($)
          <input
            type="number"
            min={0}
            value={fineAmount}
            onChange={(e) => setFineAmount(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-[#0b1120]">
          Current Annual Auto Insurance Premium ($)
          <input
            type="number"
            min={0}
            value={annualPremium}
            onChange={(e) => setAnnualPremium(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
      </div>

      <div className="lg:col-span-7 bg-[#0b1120] text-white border border-amber-500/40 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              2027 INSURANCE &amp; POINT VERDICT
            </div>
            <h2 className="text-xl font-extrabold">
              {result.isCamera ? 'Civil Camera Ticket (0 DMV Points)' : 'Moving Violation (High Insurance Risk)'}
            </h2>
          </div>
          <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl px-4 py-2 text-right">
            <div className="text-[10px] font-mono text-amber-300">3-YEAR TOTAL EXPOSURE</div>
            <div className="text-2xl font-black text-amber-400 tabular-nums">
              ${result.totalExposure.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="text-xs text-zinc-300 space-y-1.5">
          <div><strong className="text-white">Governing Statute:</strong> {result.statute}</div>
          <div><strong className="text-white">Projected DMV Points:</strong> {result.dmvPoints} pts · <strong className="text-white">3-Yr Insurance Surcharge:</strong> ${result.insuranceHike3Yr.toLocaleString()}</div>
        </div>

        <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-[11px] font-mono text-zinc-200 whitespace-pre-wrap leading-relaxed">
          {result.brief}
        </pre>

        <div className="flex flex-wrap gap-3 no-print">
          <button
            type="button"
            onClick={copyBrief}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs cursor-pointer transition"
          >
            {copied ? '✓ Copied Brief' : 'Copy Free Classification Brief'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs cursor-pointer transition"
          >
            Print Brief
          </button>
          <IcsDeadlineButton
            title="TicketFig 2027 Citation Contest Deadline"
            description={result.statute}
            daysFromNow={21}
            url="https://ticketfig.com/calculators/2027-speed-camera-vs-officer-ticket/"
            label="Add 21-Day Deadline (.ics)"
          />
        </div>
      </div>
    </div>
  );
}
