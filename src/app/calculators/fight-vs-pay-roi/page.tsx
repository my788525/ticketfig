import type { Metadata } from "next";
import Link from "next/link";
import FightVsPayRoiCalculator from "@/components/calculators/FightVsPayRoiCalculator";
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Fight vs. Pay Ticket 3-Year ROI Simulator",
  description:
    "Compare paying a speeding ticket vs. traffic school vs. Trial by Written Declaration vs. hiring a traffic lawyer on a 3-year net expected value basis.",
  alternates: {
    canonical: "/calculators/fight-vs-pay-roi/",
  },
};

const FAQS = [
  {
    question: "Is it worth fighting a speeding ticket if I can just take traffic school?",
    answer:
      "In states like California (CVC § 40902), you can contest by Written Declaration first with zero court appearance and preserve traffic school as a fallback—giving you a chance at $0 fine and keeping your 18-month traffic school cooldown intact.",
  },
  {
    question: "When should I hire a local traffic attorney instead of fighting by mail?",
    answer:
      "In states without mail-in written trials—especially North Carolina (SDIP points), New York (6+ pt DRA), and Virginia (Reckless Driving at 20+ mph over)—retaining local counsel for $195–$350 routinely yields a 0-point amendment or PJC that saves $1,800–$3,200.",
  },
];

export default function FightVsPayRoiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "Fight vs. Pay Speeding Ticket 3-Year ROI Simulator",
            description:
              "Simulates 3-year expected cost across paying outright, traffic school masking, self-filed written declaration, and local counsel representation.",
            url: "https://ticketfig.com/calculators/fight-vs-pay-roi/",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "Fight vs. Pay ROI", url: "https://ticketfig.com/calculators/fight-vs-pay-roi/" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> / Calculators / Fight vs. Pay ROI
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          Fight vs. Pay Speeding Ticket 3-Year ROI Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Quantify the expected 3-year financial return of contesting via Written Declaration,
          electing statutory Traffic School, or retaining local counsel vs. paying the citation.
        </p>
      </div>

      <FightVsPayRoiCalculator />

      {/* Statutory Formula & 36-Month Insurance Surcharge Math Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 no-print">
        <div className="space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0f2747]/10 text-[#0f2747] text-[11px] font-bold uppercase tracking-wider">
            Actuarial &amp; Statutory Methodology
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Statutory Expected-Value Formula &amp; 36-Month Insurance Surcharge Table
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
            Paying a traffic citation is never just the face-value fine. Under state court penalty-assessment
            statutes and ISO/CLUE auto insurance rating rules, an unmasked moving conviction triggers
            three consecutive 12-month policy surcharges. Our simulator models the exact 3-year Expected Value
            (EV) of each legal path:
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto">
          <div className="text-[#c8a24a] font-bold mb-1">3-Year Expected Cost Formula:</div>
          <div>
            EV(Path) = [P(Conviction) × (Base_Fine × State_Multiplier + 36_Mo_Ins_Hike + State_Surcharge)] + Defense_Cost
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-[#0f2747] bg-slate-50">
                <th className="py-3 px-3 font-bold">Jurisdiction &amp; Governing Statute</th>
                <th className="py-3 px-3 font-bold">Court Fine + Assessment</th>
                <th className="py-3 px-3 font-bold">Avg. 36-Mo Insurance Hike</th>
                <th className="py-3 px-3 font-bold">Total 3-Yr Pay Cost</th>
                <th className="py-3 px-3 font-bold">Best Contest / Mitigation Lever</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">California (CVC § 40902 / § 42005)</td>
                <td className="py-3 px-3">$238–$490 (1.0x–4.9x add-ons)</td>
                <td className="py-3 px-3">+$1,380–$1,950 (loss of 20% Good Driver)</td>
                <td className="py-3 px-3 font-bold text-rose-700">$1,618–$2,440</td>
                <td className="py-3 px-3">Trial by Written Declaration (TR-205) + Traffic School fallback</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">North Carolina (G.S. § 58-36-65 SDIP)</td>
                <td className="py-3 px-3">$213–$263 (incl. $190 court costs)</td>
                <td className="py-3 px-3">+$1,680–$3,120 (+30% to +80% SDIP)</td>
                <td className="py-3 px-3 font-bold text-rose-700">$1,893–$3,383</td>
                <td className="py-3 px-3">Improper Equipment (G.S. § 20-122) or 3-yr PJC</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">New York (VTL § 1180 / § 1199 DRA)</td>
                <td className="py-3 px-3">$188–$393 + $300 DRA (at 6+ pts)</td>
                <td className="py-3 px-3">+$1,440–$2,280 (+22%–35%/yr)</td>
                <td className="py-3 px-3 font-bold text-rose-700">$1,928–$2,973</td>
                <td className="py-3 px-3">Prosecutor reduction to 0-pt VTL § 1201(a) parking</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">Texas (CCP Art. 45.0511 / HB 2048)</td>
                <td className="py-3 px-3">$210–$334 (municipal + state costs)</td>
                <td className="py-3 px-3">+$1,260–$1,890 (+20%–32%/yr)</td>
                <td className="py-3 px-3 font-bold text-rose-700">$1,470–$2,224</td>
                <td className="py-3 px-3">DSC / Deferred Disposition (no conviction reported)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-[#0f2747]">Virginia (Va. Code § 46.2-862)</td>
                <td className="py-3 px-3">$250–$1,000+ (Class 1 Misdemeanor)</td>
                <td className="py-3 px-3">+$2,100–$3,600 (6-pt major conviction)</td>
                <td className="py-3 px-3 font-bold text-rose-700">$2,350–$4,600</td>
                <td className="py-3 px-3">Speedometer calibration + counsel reduction to § 46.2-870</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Real-Case Math Walkthrough & Court/Prosecutor Rebuttal Script */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 no-print">
        <div className="space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#059669] text-[11px] font-bold uppercase tracking-wider">
            Worked Example &amp; Statutory Rebuttals
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Real-Case Math Walkthrough &amp; Court / Prosecutor Rebuttal Script
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Consider a driver paying <strong>$1,900/year</strong> for auto insurance who receives a{" "}
            <strong>16 mph over the limit</strong> citation ($290 total court bail) where a conviction adds{" "}
            <strong>+26% per year</strong> ($494/yr × 3 years = <strong>$1,482</strong> insurance surcharge):
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <div className="font-bold text-rose-800">1. Pay Outright</div>
            <div className="text-lg font-extrabold text-rose-700">-$1,772</div>
            <p className="text-rose-700/90">$290 fine + $1,482 36-mo insurance hike. 100% conviction certainty.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="font-bold text-amber-900">2. Traffic School</div>
            <div className="text-lg font-extrabold text-amber-800">-$394</div>
            <p className="text-amber-800/90">$290 bail + $64 court admin + $40 course. Saves $1,378, burns 18-mo cooldown.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0f2747] text-white border border-slate-800 space-y-1">
            <div className="font-bold text-[#c8a24a]">3. Written Contest (55% Win)</div>
            <div className="text-lg font-extrabold text-white">-$177 EV</div>
            <p className="text-slate-300">55% chance of $0 total cost; 45% fallback to Traffic School ($394). Best net ROI.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-[#0f2747]">4. Local Counsel ($275)</div>
            <div className="text-lg font-extrabold text-[#059669]">-$325 EV</div>
            <p className="text-slate-600">$275 flat fee + minor court costs on 0-pt plea. Highest ROI where mail trial is barred.</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-[#0f2747]">
            Court &amp; Prosecutor Rebuttal Matrix: &ldquo;When Clerk/Officer Claims X &rarr; Cite Statute Y&rdquo;
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Clerk Claims: &ldquo;You must appear in person before requesting traffic school or contesting.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Statute:</strong>{" "}
                <strong>Cal. Veh. Code § 40902</strong> (or <strong>ORS § 153.080</strong> /{" "}
                <strong>Fla. R. Traf. Ct. 6.330</strong>) grants a statutory right to Trial by Written Declaration
                (Form TR-205) by mail, and <strong>CVC § 40902(d)</strong> preserves Trial De Novo if denied.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Officer Claims: &ldquo;Radar/LiDAR was checked at shift start, so speed is conclusive.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Statute:</strong>{" "}
                Demand foundational proof under <strong>CVC §§ 40802–40805</strong> (current 5–7 yr Engineering
                &amp; Traffic Survey), NIST-traceable tuning-fork/lidar calibration logs, and{" "}
                <strong>Brady v. Maryland</strong> / state discovery rules (e.g. <strong>Cal. Penal Code § 1054.1</strong>).
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Prosecutor Claims: &ldquo;A 1–10 mph reduction still carries the same state fine.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Statute:</strong>{" "}
                Counter-offer a zero-point non-moving amendment such as{" "}
                <strong>NC Improper Equipment (G.S. § 20-122)</strong> or{" "}
                <strong>NY Parking on Pavement (VTL § 1201(a))</strong>—because insurer SDIP/CLUE surcharges
                trigger on moving points, not the base fine.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-rose-700">
                When Insurer/Agent Claims: &ldquo;One minor ticket only raises your rate a few dollars.&rdquo;
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-[#059669]">Cite Rule:</strong>{" "}
                Under <strong>Cal. Ins. Code § 1861.025</strong> (Prop 103 Good Driver Discount), a single
                unmasked moving point forfeits the mandatory <strong>20% Good Driver Discount</strong> for 36
                months—costing $1,300–$2,000+ regardless of the base fine.
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
              Free ROI Estimate vs. Pro Written Defense &amp; Discovery Kit
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Compare what the free simulator gives you vs. the turnkey $24.99 defense packet (56x–128x 3-year ROI).
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
            Unlock Pro Defense Kit ($24.99) &rarr;
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 text-[#0f2747]">
                <th className="py-3 px-3 font-bold">Deliverable / Leverage Factor</th>
                <th className="py-3 px-3 font-bold">Free ROI Simulator ($0)</th>
                <th className="py-3 px-3 font-bold text-[#059669]">Pro Written Defense &amp; Discovery Kit ($24.99)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold">3-Year Insurance &amp; Fine EV Comparison</td>
                <td className="py-2.5 px-3">✓ Full 4-path calculation</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Included + .xlsx 3-Year ROI Audit Ledger</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Trial by Written Declaration (TR-205 / ORS § 153.080)</td>
                <td className="py-2.5 px-3">Summary plea snippet only</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Editable .docx statutory declaration templates</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Radar / LiDAR / ETS Calibration Discovery Motion</td>
                <td className="py-2.5 px-3">&mdash; Not included</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Formal .docx discovery &amp; subpoena requests</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">3-Year ROI Leverage ($24.99 vs. $1,400–$3,200 risk)</td>
                <td className="py-2.5 px-3">Diagnostic only</td>
                <td className="py-2.5 px-3 font-extrabold text-[#059669]">56x–128x Net Financial Leverage + All-Access Pass</td>
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
