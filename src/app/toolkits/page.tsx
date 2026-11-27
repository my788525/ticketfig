import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";
import ToolkitsHeroClient from "./ToolkitsHeroClient";

const CHECKOUT_URL =
  "https://checkout.dodopayments.com/buy/pdt_0NsmklI8rw00LaBQM8xhq?src=toolkits_hub";
const PAGE_URL = "https://ticketfig.com/toolkits/";

export const metadata: Metadata = {
  title: {
    absolute: "VIP Traffic Defense Toolkit Store (2026) | TicketFig",
  },
  description:
    "Download the 50-State Traffic Ticket Written Defense & 3-Year Insurance Shield VIP Suite (2026) for $24.99. Includes court-ready .docx motions and .xlsx 3-year ROI ledger.",
  alternates: {
    canonical: "/toolkits/",
  },
  openGraph: {
    title: "VIP Traffic Defense Toolkit Store (2026) | TicketFig",
    description:
      "50-State Traffic Ticket Written Defense & 3-Year Insurance Shield VIP Suite (2026) — $24.99 vs. $350/hr traffic attorney.",
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    question:
      "What files are included in the 50-State Traffic Ticket Written Defense & 3-Year Insurance Shield VIP Suite (2026)?",
    answer:
      "Your instant download includes two turnkey files: TicketFig_Written_Defense_Suite_2026.docx (Trial by Written Declaration templates, Radar/LiDAR calibration & officer log discovery motions, and Good Driver / traffic-school mitigation briefs) and TicketFig_3Yr_ROI_Ledger_2026.xlsx (a 51-jurisdiction 3-year auto insurance surcharge and Fight vs. Pay expected-value spreadsheet).",
  },
  {
    question: "How does $24.99 compare to hiring a traffic ticket attorney?",
    answer:
      "A typical traffic defense attorney charges $350/hr or $350–$500+ flat per citation. For $24.99 one-time, the VIP Suite gives you the exact statutory declaration templates, calibration discovery requests, and 3-year insurance ROI ledger to contest or mitigate an infraction without paying $350/hr legal retainers.",
  },
  {
    question: "Should I run the free TicketFig calculators before buying the VIP Suite?",
    answer:
      "Yes. Run the free 3-Year Insurance Cost Calculator or Ticket Defense Wizard first to confirm your state's DMV point threshold, insurer surcharge cliff, and written-declaration eligibility, then use the VIP Suite to file your turnkey written defense and discovery packet.",
  },
  {
    question: "Does the VIP Suite cover all 50 U.S. states and D.C.?",
    answer:
      "Yes. Both TicketFig_Written_Defense_Suite_2026.docx and TicketFig_3Yr_ROI_Ledger_2026.xlsx are structured for all 51 U.S. jurisdictions, including Trial by Written Declaration states (such as CA CVC § 40902 and OR ORS § 153.080) and standard informal/formal contested hearing discovery workflows.",
  },
];

const WHATS_INSIDE = [
  {
    filename: "TicketFig_Written_Defense_Suite_2026.docx",
    badge: "Microsoft Word (.DOCX)",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-400/40",
    title: "Court-Ready Written Defense & Discovery Templates",
    summary:
      "Turnkey, editable legal brief templates formatted for Trial by Written Declaration (e.g., Cal. Veh. Code § 40902 / ORS § 153.080), Radar/LiDAR tuning-fork & engineering speed-survey discovery motions, and Good Driver mitigation requests.",
    bullets: [
      "Trial by Written Declaration (TR-205 style) structured defense narrative",
      "Radar / LiDAR calibration & officer training log discovery demand",
      "Engineering & Traffic Survey (ETS) speed-trap challenge template",
      "State-by-state filing checklist & statutory deadline guardrails",
    ],
  },
  {
    filename: "TicketFig_3Yr_ROI_Ledger_2026.xlsx",
    badge: "Microsoft Excel (.XLSX)",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-400/40",
    title: "51-Jurisdiction 3-Year Insurance & Fight vs. Pay ROI Ledger",
    summary:
      "Unlocked actuarial workbook comparing Pay Fine vs. Traffic School vs. Contest Expected Value over a 36-to-60 month insurance rating window—including NC SDIP, NY 6-Point DRA, and CA Prop 103 Good Driver discount loss.",
    bullets: [
      "3-year cumulative premium surcharge & compound renewal model",
      "Fight vs. Pay vs. Traffic School net expected-value matrix",
      "50-State + DC DMV point threshold & suspension cliff lookup",
      "Printable client/record-keeping financial exposure summary tab",
    ],
  },
];

const PRODUCT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "50-State Traffic Ticket Written Defense & 3-Year Insurance Shield VIP Suite (2026)",
  description:
    "Turnkey 2026 digital defense suite containing TicketFig_Written_Defense_Suite_2026.docx and TicketFig_3Yr_ROI_Ledger_2026.xlsx for contesting moving violations and protecting against 3-year auto insurance surcharges across all 50 U.S. states + DC.",
  sku: "TF-VIP-SUITE-2026",
  brand: {
    "@type": "Brand",
    name: "TicketFig",
  },
  category: "Legal & Financial Defense Templates",
  url: PAGE_URL,
  offers: {
    "@type": "Offer",
    url: CHECKOUT_URL,
    priceCurrency: "USD",
    price: "24.99",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "TicketFig",
      url: "https://ticketfig.com",
    },
  },
};

const COLLECTION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TicketFig VIP Toolkit Hub Store (2026)",
  description:
    "Official TicketFig store for 2026 traffic ticket written declaration templates, radar/LiDAR discovery motions, and 3-year auto insurance surcharge ROI workbooks.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "TicketFig",
    url: "https://ticketfig.com",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: PAGE_URL,
        name: "50-State Traffic Ticket Written Defense & 3-Year Insurance Shield VIP Suite (2026)",
      },
    ],
  },
};

export default function ToolkitsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <JsonLd
        data={[
          PRODUCT_JSONLD,
          COLLECTION_JSONLD,
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "VIP Toolkits Store", url: PAGE_URL },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      {/* Breadcrumb */}
      <div className="text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0f2747]">
          Home
        </Link>{" "}
        / VIP Toolkits Store
      </div>

      {/* Hero / Primary SKU Storefront */}
      <section className="bg-gradient-to-br from-[#0b1120] via-[#0f2747] to-[#18181b] text-white rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c8a24a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Product Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#c8a24a] text-slate-950">
                ★ MOST POPULAR · 90%+ CHOOSE THIS
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#c8a24a]/20 text-[#c8a24a] border border-[#c8a24a]/40">
                Official 2026 VIP Toolkit Store
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-[#059669]/40">
                Instant Digital Download · 50 States + DC
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              50-State Traffic Ticket Written Defense &amp; 3-Year Insurance Shield VIP Suite (2026)
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Skip the <strong className="text-white">$350/hr traffic attorney retainer</strong> and
              protect yourself from $1,650–$3,200+ in 3-year auto insurance hikes. Get court-ready
              Written Declaration &amp; Radar/LiDAR discovery filings plus our unlocked 51-state
              3-year insurance ROI workbook in one instant download.
            </p>

            {/* Price Anchor Comparison Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3.5">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Traffic Attorney Benchmark
                </div>
                <div className="text-lg font-extrabold text-rose-400 line-through mt-0.5">
                  $350 / hr
                </div>
                <div className="text-[11px] text-slate-400">Typical hourly legal retainer</div>
              </div>

              <div className="rounded-xl bg-slate-950/90 border border-[#c8a24a]/50 p-3.5">
                <div className="text-[11px] uppercase tracking-wider text-[#c8a24a] font-bold">
                  VIP Suite One-Time Price
                </div>
                <div className="text-2xl font-black text-white mt-0.5">$24.99</div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  Save 92%+ vs. 1 hr of counsel
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3.5">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  3-Yr Exposure Protected
                </div>
                <div className="text-lg font-extrabold text-emerald-400 mt-0.5">$1,650–$3,200+</div>
                <div className="text-[11px] text-slate-400">36-month premium surcharge shield</div>
              </div>
            </div>

            {/* Interactive State Confirm + Primary CTA + Sample Preview + Zero-Risk Badges */}
            <ToolkitsHeroClient checkoutUrl={CHECKOUT_URL} />
          </div>

          {/* Right: E-Commerce SKU Manifest Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
                    SKU: TF-VIP-SUITE-2026
                  </div>
                  <h2 className="text-lg font-extrabold text-white mt-1">
                    Exact Package Manifest
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  In Stock
                </span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <div className="text-white font-bold truncate">
                      TicketFig_Written_Defense_Suite_2026.docx
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      Written Declaration + Radar/LiDAR Discovery
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded bg-[#c8a24a]/20 text-[#c8a24a] font-bold text-[10px]">
                    .DOCX
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <div className="text-white font-bold truncate">
                      TicketFig_3Yr_ROI_Ledger_2026.xlsx
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      51-State Surcharge &amp; Fight vs. Pay Workbook
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                    .XLSX
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>1-Hr Traffic Attorney Anchor</span>
                  <span className="line-through text-rose-400">$350.00</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm">
                  <span>VIP Suite Instant Checkout</span>
                  <span className="text-[#c8a24a] text-lg font-black">$24.99</span>
                </div>
              </div>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#059669] hover:bg-emerald-500 text-white font-extrabold py-3.5 px-5 rounded-xl text-sm transition shadow-lg"
              >
                Download VIP Suite Now ($24.99) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page Reverse Calculator Rescue Banner */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50/90 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            Not Sure Yet? Calculate Your Exact 3-Year Savings First
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Not sure if fighting the ticket saves more than traffic school over 3 years? Run the 30-second free calculator first →
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/calculators/speeding-ticket-insurance-cost/"
            className="px-4 py-2.5 rounded-xl bg-[#0f2747] hover:bg-slate-800 text-white text-xs font-extrabold transition"
          >
            3-Year Insurance Calculator →
          </Link>
          <Link
            href="/wizard/"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0f2747] border border-slate-300 text-xs font-extrabold transition"
          >
            Free Defense Wizard →
          </Link>
        </div>
      </section>

      {/* Itemized "What's Inside" File Breakdown */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#0f2747] tracking-tight">
            What&apos;s Inside Your Instant Download
          </h2>
          <p className="text-sm text-slate-600">
            Two unlocked, ready-to-customize files built around 2026 state vehicle codes and
            insurer surcharge schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHATS_INSIDE.map((item) => (
            <div
              key={item.filename}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <code className="text-xs font-mono font-bold text-[#0f2747] bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    {item.filename}
                  </code>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeClass} bg-slate-900`}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0f2747]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                <ul className="space-y-2 pt-1">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free Audit Tools Cross-Links */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Run Your Free On-Site Audit Before You File
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl">
          Not sure whether to contest via written declaration, request traffic school, or audit your
          3-year premium exposure? Use our free 100% client-side tools first:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/calculators/speeding-ticket-insurance-cost/"
            className="group p-5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition space-y-1.5"
          >
            <div className="text-sm font-bold text-[#0f2747] group-hover:text-amber-700">
              Speeding Ticket &amp; 3-Year Insurance Cost Calculator →
            </div>
            <p className="text-xs text-slate-600">
              Model court fines, mandatory penalty assessments, and 36-month auto insurance rate
              hikes across all 50 states + DC.
            </p>
          </Link>

          <Link
            href="/wizard/"
            className="group p-5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition space-y-1.5"
          >
            <div className="text-sm font-bold text-[#0f2747] group-hover:text-amber-700">
              2026 Ticket Defense Wizard →
            </div>
            <p className="text-xs text-slate-600">
              Step-by-step statutory triage checking traffic-school cooldowns, written-declaration
              eligibility, and Fight vs. Pay ROI.
            </p>
          </Link>
        </div>
      </section>

      {/* Anti-Zero-Click GEO Summary Block */}
      <section
        aria-label="Anti-Zero-Click GEO Executive Summary"
        className="bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#c8a24a] font-bold">
            Anti-Zero-Click GEO Verification Block · TicketFig 2026
          </span>
          <span className="text-[11px] text-slate-400">
            Canonical Store: https://ticketfig.com/toolkits/
          </span>
        </div>
        <h2 className="text-lg font-bold text-white">
          Ballpark AI Summary vs. Exact Statutory Audit &amp; Turnkey Filings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-300">What AI Models May Summarize (Ballpark)</div>
            <p className="text-slate-300">
              A single unmasked moving violation typically triggers a 20%–35% annual auto insurance
              surcharge for 36 months ($1,650–$3,200+ cumulative), while hiring a traffic attorney
              averages $350/hr.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-300">
              Why Drivers Must Visit TicketFig On-Site
            </div>
            <p className="text-slate-300">
              Generic summaries cannot compute state insurer tier cliffs (NC SDIP, NY 6-Point DRA,
              CA Good Driver loss) or generate editable{" "}
              <code className="text-amber-300">.docx</code> /{" "}
              <code className="text-emerald-300">.xlsx</code> defense filings. Run your exact audit
              at{" "}
              <Link href="/wizard/" className="text-[#c8a24a] underline">
                /wizard/
              </Link>{" "}
              or{" "}
              <Link
                href="/calculators/speeding-ticket-insurance-cost/"
                className="text-[#c8a24a] underline"
              >
                /calculators/speeding-ticket-insurance-cost/
              </Link>{" "}
              and download the $24.99 VIP Suite on this page.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div
              key={f.question}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
            >
              <h3 className="text-sm font-bold text-[#0f2747]">{f.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Non-Attorney / Educational Disclaimer & Governance */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 text-xs text-slate-600">
        <div className="font-bold text-[#0f2747] uppercase tracking-wider text-[11px]">
          Non-Attorney / Educational Disclaimer &amp; Editorial Governance
        </div>
        <p className="leading-relaxed">
          TicketFig.com is not a law firm, does not provide legal representation, and creates no
          attorney-client relationship. All written declaration templates, discovery motions, and
          3-year insurance spreadsheets are provided strictly for educational and self-help
          actuarial reference. Verify local court rules and statutory deadlines before filing.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-semibold text-[#0f2747]">
          <Link href="/methodology/" className="hover:underline">
            Actuarial Methodology →
          </Link>
          <Link href="/editorial-policy/" className="hover:underline">
            Editorial Policy →
          </Link>
          <Link href="/changelog/" className="hover:underline">
            2026 Statutory Changelog →
          </Link>
          <Link href="/about/" className="hover:underline">
            About TicketFig →
          </Link>
          <Link href="/disclaimer/" className="hover:underline">
            Full Legal Disclaimer →
          </Link>
        </div>
      </section>
    </div>
  );
}
