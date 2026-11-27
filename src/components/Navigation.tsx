"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CALCULATOR_LINKS = [
  { href: "/calculators/speeding-ticket-insurance-cost/", label: "Insurance Cost", desc: "3-year premium & surcharge model" },
  { href: "/calculators/fight-vs-pay-roi/", label: "Fight vs. Pay ROI", desc: "Expected-value contest simulator" },
  { href: "/calculators/license-points-calculator/", label: "Points Tracker", desc: "DMV point & suspension audit" },
  { href: "/calculators/written-declaration-eligibility/", label: "Written Defense", desc: "Mail-in eligibility & brief generator" },
  { href: "/calculators/ticket-error-forensics/", label: "Ticket Forensics", desc: "Dismissal leverage & speed-trap audit" },
  { href: "/calculators/discovery-calibration-builder/", label: "Discovery Builder", desc: "Radar/LiDAR & FOIA discovery request" },
];

const RESEARCH_LINKS = [
  { href: "/cases/", label: "Case Studies", desc: "Real-ledger 3-year financial audits" },
  { href: "/guides/", label: "Defense Guides", desc: "Statutory & courtroom playbooks" },
  { href: "/statutes/", label: "Statute Index", desc: "51-jurisdiction vehicle code reference" },
  { href: "/methodology/", label: "Methodology", desc: "Actuarial & surcharge benchmarks" },
];

const MOBILE_PRIMARY_LINKS = [
  { href: "/wizard/", label: "Defense Wizard" },
  { href: "/toolkits/", label: "Toolkits" },
  ...CALCULATOR_LINKS.map(({ href, label }) => ({ href, label })),
];

const MOBILE_REFERENCE_LINKS = [
  { href: "/states/", label: "51 States" },
  { href: "/pitfalls/", label: "Pitfalls & Traps" },
  ...RESEARCH_LINKS.map(({ href, label }) => ({ href, label })),
  { href: "/changelog/", label: "Changelog" },
];

function TicketFigCrest({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nav-crest-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="nav-crest-gold" x1="6" y1="5" x2="30" y2="31" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#c8a24a" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="8" fill="url(#nav-crest-bg)" />
      <path
        d="M18 4L28.5 8.2V17.2C28.5 24.3 24 29.7 18 32C12 29.7 7.5 24.3 7.5 17.2V8.2L18 4Z"
        fill="#0b1120"
        stroke="url(#nav-crest-gold)"
        strokeWidth="1.5"
      />
      <path
        d="M11.6 22.2A8.1 8.1 0 1 1 24.4 22.2"
        stroke="#eab308"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.3 20A5.6 5.6 0 0 1 22.7 20"
        stroke="#c8a24a"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeDasharray="1.5 2"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="19.8"
        x2="23.4"
        y2="13.2"
        stroke="#fbbf24"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="18" cy="19.8" r="2" fill="#eab308" />
      <circle cx="18" cy="19.8" r="0.8" fill="#0b1120" />
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"calculators" | "research" | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isWizardActive = pathname?.startsWith("/wizard");
  const isToolkitsActive = pathname?.startsWith("/toolkits");
  const isCalcActive = pathname?.startsWith("/calculators");
  const isStatesActive = pathname?.startsWith("/states");
  const isPitfallsActive = pathname?.startsWith("/pitfalls");
  const isResearchActive =
    pathname?.startsWith("/cases") ||
    pathname?.startsWith("/guides") ||
    pathname?.startsWith("/statutes") ||
    pathname?.startsWith("/methodology");

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 bg-gradient-to-r from-[#0b1120] via-[#111827] to-[#18181b] text-white border-b border-zinc-800/90 shadow-md no-print"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => {
            setOpen(false);
            setActiveMenu(null);
          }}
          className="flex items-center gap-3 shrink-0 whitespace-nowrap group"
        >
          <TicketFigCrest className="w-9 h-9 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <div className="leading-tight">
            <span className="font-extrabold tracking-tight text-white text-[17px] block whitespace-nowrap">
              TicketFig
            </span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-semibold block whitespace-nowrap">
              2026 Statutory Defense
            </span>
          </div>
        </Link>

        {/* Desktop 5-Item Single-Row Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          <Link
            href="/wizard/"
            className={`whitespace-nowrap px-2.5 py-2 rounded-lg text-[13px] font-semibold transition ${
              isWizardActive
                ? "text-amber-400 bg-zinc-800/70"
                : "text-zinc-200 hover:text-amber-400 hover:bg-zinc-800/40"
            }`}
          >
            Defense Wizard
          </Link>

          {/* Calculators Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("calculators")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              onClick={() =>
                setActiveMenu(activeMenu === "calculators" ? null : "calculators")
              }
              aria-expanded={activeMenu === "calculators"}
              className={`whitespace-nowrap px-2.5 py-2 rounded-lg text-[13px] font-semibold transition inline-flex items-center gap-1 ${
                isCalcActive || activeMenu === "calculators"
                  ? "text-amber-400 bg-zinc-800/70"
                  : "text-zinc-200 hover:text-amber-400 hover:bg-zinc-800/40"
              }`}
            >
              <span>Calculators</span>
              <span className="text-[10px] opacity-80" aria-hidden="true">▾</span>
            </button>

            {activeMenu === "calculators" && (
              <div className="absolute left-0 top-full pt-2 w-72 z-50">
                <div className="rounded-xl bg-[#111827] border border-zinc-800 shadow-2xl p-2 space-y-0.5">
                  {CALCULATOR_LINKS.map((item) => {
                    const active = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className={`block px-3 py-2.5 rounded-lg transition ${
                          active
                            ? "bg-zinc-800/90 text-amber-400"
                            : "text-zinc-200 hover:bg-zinc-800/70 hover:text-white"
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/states/"
            className={`whitespace-nowrap px-2.5 py-2 rounded-lg text-[13px] font-semibold transition ${
              isStatesActive
                ? "text-amber-400 bg-zinc-800/70"
                : "text-zinc-200 hover:text-amber-400 hover:bg-zinc-800/40"
            }`}
          >
            51 States
          </Link>

          <Link
            href="/pitfalls/"
            className={`whitespace-nowrap px-2.5 py-2 rounded-lg text-[13px] font-semibold transition ${
              isPitfallsActive
                ? "text-amber-400 bg-zinc-800/70"
                : "text-zinc-200 hover:text-amber-400 hover:bg-zinc-800/40"
            }`}
          >
            Pitfalls &amp; Traps
          </Link>

          {/* Research Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("research")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              onClick={() =>
                setActiveMenu(activeMenu === "research" ? null : "research")
              }
              aria-expanded={activeMenu === "research"}
              className={`whitespace-nowrap px-2.5 py-2 rounded-lg text-[13px] font-semibold transition inline-flex items-center gap-1 ${
                isResearchActive || activeMenu === "research"
                  ? "text-amber-400 bg-zinc-800/70"
                  : "text-zinc-200 hover:text-amber-400 hover:bg-zinc-800/40"
              }`}
            >
              <span>Research</span>
              <span className="text-[10px] opacity-80" aria-hidden="true">▾</span>
            </button>

            {activeMenu === "research" && (
              <div className="absolute right-0 top-full pt-2 w-64 z-50">
                <div className="rounded-xl bg-[#111827] border border-zinc-800 shadow-2xl p-2 space-y-0.5">
                  {RESEARCH_LINKS.map((item) => {
                    const active = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className={`block px-3 py-2.5 rounded-lg transition ${
                          active
                            ? "bg-zinc-800/90 text-amber-400"
                            : "text-zinc-200 hover:bg-zinc-800/70 hover:text-white"
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <Link
            href="/toolkits/"
            className={`whitespace-nowrap px-2.5 py-2 rounded-lg text-[13px] font-semibold transition ${
              isToolkitsActive
                ? "text-amber-400 bg-zinc-800/70"
                : "text-zinc-200 hover:text-amber-400 hover:bg-zinc-800/40"
            }`}
          >
            Toolkits
          </Link>
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <Link
            href="/wizard/"
            className="whitespace-nowrap shrink-0 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-extrabold tracking-tight transition shadow-sm shadow-amber-500/20"
          >
            Audit Ticket →
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-100 text-lg leading-none transition"
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0b1120] border-t border-zinc-800 px-5 py-5 space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto shadow-xl">
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Calculators &amp; Wizard
            </div>
            {MOBILE_PRIMARY_LINKS.map((l) => {
              const active = pathname === l.href || pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 rounded-xl text-sm font-semibold transition ${
                    active
                      ? "bg-zinc-800 text-amber-400"
                      : "text-zinc-100 hover:bg-zinc-800/80"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-zinc-800 pt-3 space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Reference &amp; Research
            </div>
            {MOBILE_REFERENCE_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 rounded-xl text-sm font-medium transition ${
                    active
                      ? "bg-zinc-800 text-amber-400"
                      : "text-zinc-200 hover:bg-zinc-800/80"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <Link
              href="/wizard/"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-extrabold transition shadow-md"
            >
              Audit Ticket →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
