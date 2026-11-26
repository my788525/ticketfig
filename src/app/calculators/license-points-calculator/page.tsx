import type { Metadata } from "next";
import Link from "next/link";
import LicensePointsCalculator from "@/components/calculators/LicensePointsCalculator";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "DMV License Points & Surcharge Tracker (2026)",
  description:
    "Track state DMV point accumulation, suspension thresholds, New York 6-point Driver Responsibility Assessment ($300+), New Jersey MVC surcharges, and NC SDIP triggers.",
  alternates: {
    canonical: "/calculators/license-points-calculator/",
  },
};

const FAQS = [
  {
    question: "How many points trigger the New York Driver Responsibility Assessment (DRA)?",
    answer:
      "Accumulating 6 or more NYS DMV points within an 18-month period triggers a mandatory $300 Driver Responsibility Assessment ($100/year for 3 years), plus $75 ($25/year for 3 years) for each additional point.",
  },
  {
    question: "Did Texas repeal DMV driver license points?",
    answer:
      "Yes. Texas repealed the Driver Responsibility Program (DRP) points and annual state surcharges in 2019 (HB 2048). However, auto insurers still surcharge un-dismissed Texas speeding convictions by 20% to 35% for 36 months.",
  },
];

export default function LicensePointsCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "DMV License Points & State Surcharge Trigger Tracker",
            description:
              "Tracks DMV license points, suspension cliffs, and state-level assessments across all 51 U.S. jurisdictions.",
            url: "https://ticketfig.com/calculators/license-points-calculator/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "License Points Tracker", url: "https://ticketfig.com/calculators/license-points-calculator/" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> / Calculators / License Points Tracker
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          DMV License Points &amp; Surcharge Trigger Tracker (2026)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Audit your active DMV points against state suspension thresholds and statutory surcharge
          cliffs (NY 6-pt DRA, NJ 6-pt MVC Surcharge, CA NOTS, and NC SDIP).
        </p>
      </div>

      <LicensePointsCalculator />

      {/* Statutory Formula & 36-Month Insurance Surcharge Math Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 no-print">
        <div className="space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0f2747]/10 text-[#0f2747] text-[11px] font-bold uppercase tracking-wider">
            DMV Point &amp; Surcharge Statutes
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Statutory Point-Cliff Formula &amp; 36-Month Insurance Surcharge Math Table
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
            DMV license points and auto insurance rating points operate on separate statutory clocks.
            Crossing a 6-point or 12-point threshold triggers mandatory state assessments (separate from
            court fines) while locking in a 36-month CLUE/ISO insurance surcharge:
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto">
          <div className="text-[#c8a24a] font-bold mb-1">36-Month Point Exposure Formula:</div>
          <div>
            Total_Point_Exposure = Court_Fine + State_Assessment_3Yr(Points &ge; Cliff) + (Annual_Premium &times; Insurer_Surcharge_% &times; 3 yrs)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-[#0f2747] bg-slate-50">
                <th className="py-3 px-3 font-bold">State &amp; Point Statute</th>
                <th className="py-3 px-3 font-bold">Suspension / Surcharge Cliff</th>
                <th className="py-3 px-3 font-bold">Mandatory State Assessment</th>
                <th className="py-3 px-3 font-bold">36-Mo Insurance Hike</th>
                <th className="py-3 px-3 font-bold">Statutory Masking / Relief</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">New York (VTL § 503(4) / § 1199)</td>
                <td className="py-3 px-3">6 pts in 18 mos (DRA); 11 pts (Suspension)</td>
                <td className="py-3 px-3 font-bold text-rose-700">$300 + $75/pt over 6 (3 yrs)</td>
                <td className="py-3 px-3">+$1,440–$2,400</td>
                <td className="py-3 px-3">PIRP 4-pt reduction + 0-pt VTL § 1201(a) plea</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">New Jersey (N.J.S.A. 17:29A-35)</td>
                <td className="py-3 px-3">6 pts in 3 yrs (MVC); 12 pts (Suspension)</td>
                <td className="py-3 px-3 font-bold text-rose-700">$450 + $75/pt over 6 ($150/yr &times; 3)</td>
                <td className="py-3 px-3">+$1,560–$2,550</td>
                <td className="py-3 px-3">Unsafe Driving N.J.S.A. 39:4-97.2 (0 pts)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">California (CVC § 12810.5 NOTS)</td>
                <td className="py-3 px-3">4 pts/12 mo, 6 pts/24 mo, 8 pts/36 mo</td>
                <td className="py-3 px-3">$0 state surcharge (NOTS suspension)</td>
                <td className="py-3 px-3 font-bold text-rose-700">+$1,380–$2,100 (Prop 103 loss)</td>
                <td className="py-3 px-3">Traffic School (CVC § 42005) once per 18 mos</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">North Carolina (G.S. § 58-36-65 SDIP)</td>
                <td className="py-3 px-3">12 DMV pts/3 yrs; 1+ SDIP insurance pt</td>
                <td className="py-3 px-3">Statutory SDIP +30% (1 pt) to +80% (4 pts)</td>
                <td className="py-3 px-3 font-bold text-rose-700">+$1,680–$3,360</td>
                <td className="py-3 px-3">PJC (1/household/3 yrs) or G.S. § 20-122</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">Florida (F.S. § 322.27)</td>
                <td className="py-3 px-3">12 pts/12 mo (30d), 18/18 mo (3m), 24/36 mo (1y)</td>
                <td className="py-3 px-3">Reinstatement &amp; FR-44/SR-22 fees</td>
                <td className="py-3 px-3">+$1,350–$2,250</td>
                <td className="py-3 px-3">BDI Election (F.S. § 318.14(9), max 5 lifetime)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">Texas (HB 2048 Repeal / Art. 45.0511)</td>
                <td className="py-3 px-3">0 DMV pts (DRP repealed 2019); 4+ conv/12 mo</td>
                <td className="py-3 px-3">$0 state DRP surcharge</td>
                <td className="py-3 px-3 font-bold text-rose-700">+$1,260–$1,920 (CLUE record)</td>
                <td className="py-3 px-3">DSC or Deferred Disposition prevents CLUE hit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Real-Case Math Walkthrough & Court/Prosecutor Rebuttal Script */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 no-print">
        <div className="space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#059669] text-[11px] font-bold uppercase tracking-wider">
            Worked Cliff Walkthrough &amp; Rebuttals
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Real-Case Point-Cliff Math &amp; Court / DMV Rebuttal Script
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Suppose a New York driver with <strong>2 existing DMV points</strong> (and a $2,000/yr policy)
            is cited for <strong>21 mph over the limit (6 points under VTL § 1180)</strong>. Pleading guilty
            pushes the 18-month total to <strong>8 points</strong>, crossing the 6-point DRA cliff:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <div className="font-bold text-rose-800">Plead Guilty to 6-Pt Speeding</div>
            <div className="text-lg font-extrabold text-rose-700">$2,693 Total 3-Yr Hit</div>
            <p className="text-rose-700/90">$393 court fine + $450 NY DRA ($300 base + $75&times;2 extra pts) + $1,850 36-mo insurance hike.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="font-bold text-amber-900">PIRP Course Only (Post-Conviction)</div>
            <div className="text-lg font-extrabold text-amber-800">$2,468 Total 3-Yr Hit</div>
            <p className="text-amber-800/90">PIRP masks up to 4 pts for suspension, but <strong>does NOT waive the $450 DRA</strong> or insurer conviction record.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0f2747] text-white border border-slate-800 space-y-1">
            <div className="font-bold text-[#c8a24a]">0-Pt Plea Reduction (VTL § 1201(a))</div>
            <div className="text-lg font-extrabold text-white">$225 Total · Saves $2,468</div>
            <p className="text-slate-300">Amends charge to 0-point non-moving parking/equipment violation: $0 DRA, $0 insurance hike, 99x ROI on $24.99 kit.</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-[#0f2747]">
            Court &amp; DMV Rebuttal Matrix: &ldquo;When Clerk/Officer Claims X &rarr; Cite Statute Y&rdquo;
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Clerk Claims: &ldquo;Taking the 6-hour defensive driving course erases your DRA fee.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Statute:</strong>{" "}
                Under <strong>NYS VTL § 1199</strong> and DMV Commissioner&rsquo;s Regulations Part 138,
                PIRP only credits up to 4 points toward suspension thresholds—it never reduces the 6-point
                Driver Responsibility Assessment calculation. You must reduce the charge pre-conviction.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Clerk Claims: &ldquo;Texas has no points anymore, so paying the ticket won&rsquo;t hurt you.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Statute:</strong>{" "}
                While <strong>Tex. HB 2048 (2019)</strong> repealed state DRP surcharges, an un-deferred
                conviction still posts to your Tex. DPS driving record and LexisNexis CLUE report—triggering
                20%–35% insurer rate hikes unless dismissed via <strong>CCP Art. 45.0511</strong>.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Prosecutor Claims: &ldquo;You can just use a PJC next time if your rates go up.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Statute:</strong>{" "}
                Under <strong>N.C.G.S. § 58-36-65</strong>, a Prayer for Judgment Continued (PJC) only
                waives SDIP insurance points once per household every 3 years (and never for 25+ mph over).
                Request an <strong>Improper Equipment (G.S. § 20-122)</strong> amendment first to preserve PJC.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Officer Claims: &ldquo;Out-of-state tickets don&rsquo;t add points at home.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Compact:</strong>{" "}
                45+ states belong to the <strong>Driver License Compact (DLC)</strong> and{" "}
                <strong>Non-Resident Violator Compact (NRVC)</strong>; home-state DMVs (e.g., NJ, PA, VA, CA)
                reciprocally assess home-equivalent points or license holds upon conviction notice.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Estimate vs. Pro Written Defense & Discovery Kit */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[#0f2747]">
              Free Point Audit vs. Pro Written Defense &amp; Discovery Kit
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Protect against $1,500–$3,400 in 3-year point surcharges with turnkey .docx plea &amp; discovery filings ($24.99 = 60x–136x ROI).
            </p>
          </div>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NsmklI8rw00LaBQM8xhq"
            target="_blank"
            rel="noopener noreferrer"
            data-matrix-offer="1"
            data-offer-slot="inline"
            data-offer-id="pdt_0NsmklI8rw00LaBQM8xhq"
            className="px-4 py-2.5 rounded-xl bg-[#c8a24a] hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition"
          >
            Unlock Pro Point-Defense Kit ($24.99) &rarr;
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 text-[#0f2747]">
                <th className="py-3 px-3 font-bold">Feature / Statutory Protection</th>
                <th className="py-3 px-3 font-bold">Free Point Tracker ($0)</th>
                <th className="py-3 px-3 font-bold text-[#059669]">Pro Written Defense &amp; Discovery Kit ($24.99)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold">51-Jurisdiction Point &amp; Cliff Audit</td>
                <td className="py-2.5 px-3">✓ Instant point &amp; threshold check</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Full .xlsx 51-State DMV &amp; SDIP Matrix</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">NY DRA / NJ Surcharge / NC PJC Avoidance Pleas</td>
                <td className="py-2.5 px-3">Basic 1-paragraph draft</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Editable .docx Prosecutor Reduction &amp; Written Defense</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Radar / LiDAR / Calibration Discovery Motion</td>
                <td className="py-2.5 px-3">&mdash; Not included</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Formal .docx Discovery Request Templates</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">3-Year ROI Leverage ($24.99 vs. $1,500–$3,400 risk)</td>
                <td className="py-2.5 px-3">Diagnostic only</td>
                <td className="py-2.5 px-3 font-extrabold text-[#059669]">60x–136x Net Financial Leverage + All-Access Pass</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 no-print">
        <h2 className="text-lg font-bold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div key={f.question} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="text-sm font-bold text-[#0f2747]">{f.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
