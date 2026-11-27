export default function StatutoryAuditStamp() {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2 text-xs text-slate-700 no-print"
      aria-label="Statutory Audit Verification"
    >
      <span className="inline-flex items-center gap-1.5 font-bold text-emerald-900">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
        Statutory Audit Stamp
      </span>
      <span className="text-slate-400" aria-hidden="true">·</span>
      <span>
        Verified against State Vehicle Codes (e.g. CA CVC §40902, NY VTL, NC SDIP) &amp; NHTSA Calibration Standards · Audited Nov 2026
      </span>
      <span className="text-slate-400" aria-hidden="true">·</span>
      <span className="inline-flex flex-wrap items-center gap-2 font-semibold">
        <a
          href="https://leginfo.legislature.ca.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0f2747] underline decoration-emerald-500/60 underline-offset-2 hover:text-emerald-800"
        >
          CA LegInfo (.gov)
        </a>
        <span className="text-slate-400" aria-hidden="true">/</span>
        <a
          href="https://www.nhtsa.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0f2747] underline decoration-emerald-500/60 underline-offset-2 hover:text-emerald-800"
        >
          NHTSA (.gov)
        </a>
      </span>
    </div>
  );
}
