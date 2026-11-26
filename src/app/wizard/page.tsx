import type { Metadata } from "next";
import Link from "next/link";
import TicketDefenseWizard from "@/components/TicketDefenseWizard";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import {
  JsonLd,
  webApplicationJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "4-Step Ticket Defense & Insurance Wizard",
  description:
    "Guided 4-step traffic ticket defense wizard across all 51 U.S. jurisdictions. Audit your 3-year auto insurance surcharge, print a free statutory brief, and match the right defense kit.",
  alternates: {
    canonical: "/wizard/",
  },
};

const FAQS = [
  {
    question: "How does the 4-Step Ticket Defense Wizard determine my best strategy?",
    answer:
      "The wizard cross-references your state's 2026 DMV point schedule, traffic school cooldown rules, and Trial by Written Declaration statutes against your current auto insurance premium, existing points, and citation severity to calculate your 3-year financial exposure and recommend Traffic School/PJC mitigation, Written Defense, or Prosecutor Plea Reduction.",
  },
  {
    question: "What is included in the free printable 3-Year Insurance Exposure Brief?",
    answer:
      "Your free brief includes your state's governing statute, projected DMV/insurance points, suspension threshold, estimated court fine with statutory assessments, 36-month cumulative auto insurance surcharge projection, and a one-click Copy Free Statutory & Points Summary button.",
  },
  {
    question: "When should I use Written Declaration vs. Plea Reduction?",
    answer:
      "If your state supports mail-in contests (such as California CVC § 40902 or Oregon ORS § 153.080) and you are contesting a standard moving violation with Radar/LiDAR evidence, a Written Declaration + Discovery kit is ideal. For 25+ mph citations, work-zone enhancements, or drivers near a point-suspension cliff, a Prosecutor Plea Reduction & Calibration Subpoena kit provides stronger protection.",
  },
];

export default function TicketDefenseWizardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: "4-Step Ticket Defense & 3-Year Insurance Decision Wizard",
            description:
              "Guided 51-jurisdiction traffic ticket decision wizard that models 3-year auto insurance surcharges, generates a free printable statutory brief, and matches the optimal defense strategy.",
            url: "https://ticketfig.com/wizard/",
            featureList: [
              "51-jurisdiction statutory DMV point & surcharge rules",
              "4-step guided citation, insurance & evidence intake",
              "Free printable 3-Year Insurance Exposure & Defense Strategy Brief",
              "Tiered defense strategy matching (Mitigation, Written Defense, Plea Reduction)",
            ],
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "Defense Wizard", url: "https://ticketfig.com/wizard/" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 no-print">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">
            Home
          </Link>{" "}
          / Defense Wizard
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          4-Step Ticket Defense &amp; 3-Year Insurance Decision Wizard
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Answer 4 quick questions about your citation, insurance premium, and evidence to
          generate a free printable 3-year exposure brief and match your optimal defense path.
        </p>
        <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 max-w-3xl">
          <strong className="text-[#0f2747]">Ballpark vs. Exact Audit:</strong> Rule-of-thumb ticket estimates only give a rough range—exact 36-month insurance surcharges, NC SDIP / NY DRA cliffs, and Written Declaration eligibility must be calculated interactively on-site below.
        </p>
      </div>

      <TicketDefenseWizard />

      {/* Free 1-Page Summary vs. Pro Written Defense & Calibration Discovery Kit */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 no-print">
        <div className="space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0f2747]/10 text-[#0f2747] text-[11px] font-bold uppercase tracking-wider">
            Free Brief vs. Turnkey Defense Filing Kit
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Free 1-Page Summary vs. Pro Written Defense &amp; Calibration Discovery Kit
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl">
            Every wizard run generates a free 1-page printable statutory summary. When your 3-year
            insurance and fine exposure exceeds $1,400–$3,200, upgrading to the $24.99 Pro Kit
            delivers 56x–128x ROI with ready-to-file Word (.docx) declarations and calibration discovery motions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 text-[#0f2747]">
                <th className="py-3 px-3 font-bold">Deliverable / Defense Asset</th>
                <th className="py-3 px-3 font-bold">Free 1-Page Summary ($0)</th>
                <th className="py-3 px-3 font-bold text-[#059669]">
                  Pro Written Defense &amp; Calibration Discovery Kit ($24.99)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold">51-Jurisdiction DMV Point &amp; 3-Yr Insurance Audit</td>
                <td className="py-2.5 px-3">✓ 1-page printable browser brief</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Included + .xlsx 3-Year Insurance ROI Ledger</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Trial by Written Declaration (TR-205 / ORS § 153.080)</td>
                <td className="py-2.5 px-3">Statute reference only</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Editable .docx Written Declaration Templates</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Radar / LiDAR / ETS Calibration Discovery Motion</td>
                <td className="py-2.5 px-3">&mdash; Not included</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Formal .docx Calibration &amp; ETS Discovery Requests</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Prosecutor Plea Reduction &amp; PJC / Deferral Scripts</td>
                <td className="py-2.5 px-3">&mdash; Not included</td>
                <td className="py-2.5 px-3 font-semibold text-[#0f2747]">✓ Zero-Point Amendment &amp; Mitigation Letters</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">3-Year Financial Leverage ($24.99 vs. $1,400–$3,200)</td>
                <td className="py-2.5 px-3">Diagnostic baseline</td>
                <td className="py-2.5 px-3 font-extrabold text-[#059669]">56x–128x ROI + All-Access Matrix Pass</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <ToolPaywallDossier
        badge="2026 Written Defense & Discovery Kit"
        title="Unlock the Complete Written Defense & Calibration Discovery Kit"
        desc="Download editable .docx Trial by Written Declaration templates (CVC § 40902 / ORS § 153.080), Radar & LiDAR calibration discovery motions, and our .xlsx 3-Year Insurance ROI Ledger."
        price="$24.99"
        pid="pdt_0NsmklI8rw00LaBQM8xhq"
        docType="Written Defense & Calibration Discovery Kit"
        features={[
          "Editable .docx Trial by Written Declaration Templates",
          "Radar, LiDAR & ETS Calibration Discovery Motions",
          ".xlsx 51-State DMV Point & 3-Yr Insurance ROI Ledger",
          "All-Access Matrix Pass (Unlocks All 6 Calculators)",
        ]}
      />

      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 no-print">
        <h2 className="text-lg font-bold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  );
}
