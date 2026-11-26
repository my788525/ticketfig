import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1d36] text-slate-300 border-t border-slate-800 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-slate-900 border border-[#c8a24a]/60 flex items-center justify-center font-serif font-bold text-[#c8a24a] text-sm">
              T
            </span>
            <span className="font-extrabold text-white text-base">TicketFig.com</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Institutional-grade U.S. traffic citation actuarial workbench. Every DMV point threshold,
            insurance surcharge benchmark, and written declaration statute is verified against 2026
            state vehicle codes.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Executive Calculators
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/calculators/speeding-ticket-insurance-cost/" className="hover:text-[#c8a24a]">
                3-Year Insurance Surcharge Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/fight-vs-pay-roi/" className="hover:text-[#c8a24a]">
                Fight vs. Pay 3-Year ROI Simulator
              </Link>
            </li>
            <li>
              <Link href="/calculators/license-points-calculator/" className="hover:text-[#c8a24a]">
                License Points &amp; Surcharge Tracker
              </Link>
            </li>
            <li>
              <Link href="/calculators/written-declaration-eligibility/" className="hover:text-[#c8a24a]">
                Written Declaration &amp; Discovery Generator
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Statutory Reference
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/pitfalls/" className="hover:text-[#c8a24a]">
                Pitfalls &amp; Traps Survival Playbook
              </Link>
            </li>
            <li>
              <Link href="/states/" className="hover:text-[#c8a24a]">
                All 51 State DMV Point Schedules
              </Link>
            </li>
            <li>
              <Link href="/cases/" className="hover:text-[#c8a24a]">
                Real-Ledger Case Studies
              </Link>
            </li>
            <li>
              <Link href="/guides/" className="hover:text-[#c8a24a]">
                Defense &amp; Discovery Guides
              </Link>
            </li>
            <li>
              <Link href="/statutes/" className="hover:text-[#c8a24a]">
                Primary Statutes Compendium
              </Link>
            </li>
            <li>
              <Link href="/methodology/" className="hover:text-[#c8a24a]">
                Actuarial Methodology
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Governance &amp; Legal
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/about/" className="hover:text-[#c8a24a]">
                About TicketFig
              </Link>
            </li>
            <li>
              <Link href="/changelog/" className="hover:text-[#c8a24a]">
                2026 Statutory Changelog
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-[#c8a24a]">
                Contact &amp; Corrections
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="hover:text-[#c8a24a]">
                Privacy Policy (100% Client-Side)
              </Link>
            </li>
            <li>
              <Link href="/terms/" className="hover:text-[#c8a24a]">
                Terms &amp; Legal Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-5 px-4 text-center text-[11px] text-slate-400">
        <p>
          © 2026 TicketFig.com · Educational &amp; Actuarial Reference Only — Not Formal Legal Advice.
          All calculations execute 100% locally in your browser.
        </p>
      </div>
    </footer>
  );
}
