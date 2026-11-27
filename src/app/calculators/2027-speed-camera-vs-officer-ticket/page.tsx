import type { Metadata } from "next";
import SpeedCameraAuditCalc from "@/components/calculators/SpeedCameraAuditCalc";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";
import StatutoryAuditStamp from "@/components/StatutoryAuditStamp";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "2027 Speed Camera vs. Officer Audit",
  description:
    "Compare 2027 automated speed camera civil notices (CA AB 645, NY VTL 1180-b, FL, WA) against officer-issued moving violations for DMV points and 3-year insurance impact.",
  alternates: { canonical: "/calculators/2027-speed-camera-vs-officer-ticket/" },
};

const FAQS = [
  {
    question: "Do 2027 automated speed camera tickets add DMV points or raise insurance?",
    answer:
      "In major statutory programs including California AB 645 (Cal. Veh. Code § 22425), New York VTL § 1180-b, Florida § 316.1896, and Washington RCW § 46.63.170, automated speed-camera notices are civil penalties carrying 0 DMV points and cannot be reported to auto insurers.",
  },
  {
    question: "How can an automated speed camera ticket be dismissed?",
    answer:
      "Common statutory defenses include missing advance warning signage, lack of recent speed-device calibration logs, blurry driver/plate photos, or submitting a timely non-driver affidavit if someone else was driving.",
  },
  {
    question: "Why is an officer-issued ticket so much more expensive?",
    answer:
      "An officer-issued moving violation triggers DMV points and a 20%–45% auto insurance surcharge lasting 36 months—often costing $1,600 to $3,200+ beyond the base court fine.",
  },
];

export default function SpeedCamera2027Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "2027 Speed Camera Audit", url: "https://ticketfig.com/calculators/2027-speed-camera-vs-officer-ticket/" },
          ]),
          webApplicationJsonLd({
            name: "2027 Speed Camera vs. Officer Ticket Audit",
            description: "Compare 2027 automated speed camera civil notices against officer moving violations.",
            url: "https://ticketfig.com/calculators/2027-speed-camera-vs-officer-ticket/",
          }),
          faqJsonLd(FAQS),
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6 no-print">
        <div className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          2027 ENFORCEMENT TRACKER · CA AB 645 / NY / FL / WA
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b1120] tracking-tight">
          2027 Speed Camera vs. Officer Ticket Audit
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Verify whether your 2027 citation is a zero-point civil speed-camera notice or a point-bearing moving violation that triggers a 3-year auto insurance surcharge.
        </p>
        <StatutoryAuditStamp />
      </div>

      <SpeedCameraAuditCalc />

      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0b1120]">2027 Automated Speed Camera FAQs</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.question} className="border border-slate-200 rounded-xl p-4">
              <summary className="font-bold text-sm text-[#0b1120] cursor-pointer">{f.question}</summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ToolPaywallDossier
        badge="2027 Written Defense & Discovery Kit"
        title="Unlock Written Declaration & Calibration Discovery Templates"
        desc="Download editable .DOCX Written Declaration (TR-205) and radar/LiDAR/camera calibration discovery motions."
        features={[
          "Editable .DOCX Written Declaration Templates",
          "Speed Camera & Radar Calibration Discovery",
          "3-Year Insurance ROI Excel Ledger",
          "51-State DMV Point Compendium",
        ]}
      />
    </div>
  );
}
