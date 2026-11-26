"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/calculators/speeding-ticket-insurance-cost/", label: "Insurance Cost" },
  { href: "/calculators/fight-vs-pay-roi/", label: "Fight vs. Pay ROI" },
  { href: "/calculators/license-points-calculator/", label: "Points Tracker" },
  { href: "/calculators/written-declaration-eligibility/", label: "Written Defense" },
  { href: "/states/", label: "51 States" },
  { href: "/cases/", label: "Cases" },
  { href: "/guides/", label: "Guides" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0f2747] text-white border-b border-slate-800/80 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-slate-900 border border-[#c8a24a]/60 flex items-center justify-center font-serif font-bold text-[#c8a24a] text-lg">
            T
          </span>
          <div className="leading-tight">
            <span className="font-extrabold tracking-tight text-white text-base block">
              TicketFig
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-300 block">
              2026 Statutory Defense
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  active
                    ? "bg-slate-800 text-[#c8a24a]"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/statutes/"
            className="text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            Statutes
          </Link>
          <Link
            href="/calculators/speeding-ticket-insurance-cost/"
            className="px-3.5 py-2 rounded-lg bg-[#c8a24a] hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition"
          >
            Audit Ticket
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="lg:hidden px-3 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/statutes/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Statutes &amp; Methodology
          </Link>
        </div>
      )}
    </header>
  );
}
