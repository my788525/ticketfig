import Link from "next/link";

interface HiddenTrapsCalloutProps {
  compact?: boolean;
}

const THREE_TRAPS = [
  {
    num: "01",
    title: 'The "$150 Click-to-Pay" Plea',
    detail:
      "Paying online enters an instant guilty plea, stripping Good Driver discounts and triggering a 24% / $1,650+ 3-year insurance spike.",
  },
  {
    num: "02",
    title: "Traffic School Cooldown & CDL Bans",
    detail:
      "18/36-month state cooldowns and federal CDL anti-masking (49 C.F.R. § 384.226) can void your mask after you already paid.",
  },
  {
    num: "03",
    title: "20-Day Trial de Novo & Discovery Cliffs",
    detail:
      "Missing CA's 20-day TR-220 window or showing up without Radar/ETS discovery locks in points and bail.",
  },
];

export default function HiddenTrapsCallout({ compact = false }: HiddenTrapsCalloutProps) {
  return (
    <section
      aria-label="Before You Pay or Plead: 3 Hidden Traps"
      className={`rounded-2xl border border-amber-300/80 bg-amber-50/70 ${
        compact ? "p-5" : "p-6 sm:p-8"
      } shadow-xs no-print`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/90 pb-4">
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0f2747] text-[#c8a24a]">
            Real-Case Survival Check
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2747]">
            Before You Pay or Plead: 3 Hidden Traps
          </h3>
        </div>
        <Link
          href="/pitfalls/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white text-xs font-bold transition shrink-0"
        >
          Read All 6 Real-Case Traps →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {THREE_TRAPS.map((t) => (
          <div
            key={t.num}
            className="bg-white/95 border border-amber-200/80 rounded-xl p-4 space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-extrabold text-[#c8a24a] bg-[#0f2747] px-2 py-0.5 rounded">
                #{t.num}
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-[#0f2747] leading-snug">
                {t.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{t.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
