import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy — GDPR, CCPA & AdSense (2026)",
  description:
    "TicketFig executes all traffic ticket and insurance calculations 100% in your browser. Includes Google AdSense, DART cookie, GDPR, and CCPA privacy disclosures.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://ticketfig.com/" },
          { name: "Privacy Policy", url: "https://ticketfig.com/privacy/" },
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Privacy Policy</h1>
        <p className="text-sm text-slate-600">
          Last Updated: November 26, 2026 · Covers client-side calculator privacy, Google AdSense
          advertising cookies, GDPR, and CCPA rights.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            1. Zero Server-Side Citation Storage (100% Client-Side Execution)
          </h2>
          <p>
            All TicketFig calculators, 4-step defense wizards, Written Declaration generators, and
            Radar/LiDAR discovery builders execute 100% locally inside your web browser. We do not
            collect, transmit, or store your citation numbers, driver&apos;s license status, DMV
            point history, or auto insurance policy premiums on our servers. When you print or
            export a statutory brief, that document is generated directly in your browser.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            2. Cookies, Local Storage &amp; Privacy-Preserving Analytics
          </h2>
          <p>
            TicketFig uses browser <code>localStorage</code> solely to remember your cookie consent
            preference and, if you purchase an All-Access Matrix Pass, to store your pass key
            locally so you can export unwatermarked briefs without re-entering your key. We also
            use privacy-preserving aggregate analytics to measure page performance, tool usage, and
            checkout referrals without building personal behavioral profiles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            3. Google AdSense &amp; Third-Party Advertising Cookies (DART Cookie)
          </h2>
          <p>
            To keep our 51-state calculators and statutory reference guides free to the public,
            TicketFig.com partners with third-party advertising networks, including{" "}
            <strong>Google AdSense</strong>. Third-party vendors, including Google, use cookies
            (including the DoubleClick DART cookie) to serve ads based on a user&apos;s prior
            visits to TicketFig.com or other websites on the internet.
          </p>
          <p>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to
            visitors based on their visit to this site and/or other sites on the internet. You may
            opt out of personalized advertising at any time by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#059669] font-semibold hover:underline"
            >
              Google Ads Settings
            </a>{" "}
            or by visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#059669] font-semibold hover:underline"
            >
              aboutads.info/choices
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            4. GDPR Rights (European Economic Area &amp; UK Visitors)
          </h2>
          <p>
            If you are visiting from the European Economic Area (EEA) or the United Kingdom, you
            have the right under the General Data Protection Regulation (GDPR) to access, rectify,
            or erase personal data, restrict or object to processing, and withdraw cookie consent
            at any time. You can decline non-essential cookies using our Cookie Consent banner or
            via your browser settings. Because TicketFig does not store citation inputs on our
            servers, no server-side personal citation records exist to delete.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            5. CCPA / CPRA Rights (California Residents)
          </h2>
          <p>
            Under the California Consumer Privacy Act (CCPA/CPRA), California residents have the
            right to know what personal information is collected, the right to request deletion of
            personal information, and the right to opt out of the &ldquo;sale&rdquo; or
            &ldquo;sharing&rdquo; of personal information for cross-context behavioral advertising.
            TicketFig does not sell personal citation data. To opt out of personalized third-party
            advertising cookies, select &ldquo;Essential Only&rdquo; in our Cookie Consent banner
            or adjust your Google Ads Settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0f2747]">
            6. Payment Processing &amp; Contact
          </h2>
          <p>
            Optional digital kit purchases are processed securely by our merchant of record,{" "}
            <strong>Dodo Payments</strong>, under their independent privacy policy and PCI-DSS
            compliance controls. TicketFig never sees or stores your credit card number. For
            privacy inquiries, contact{" "}
            <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              editorial@ticketfig.com
            </span>
            .
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold">
          <Link href="/terms/" className="text-[#0f2747] hover:underline">
            Terms of Use →
          </Link>
          <Link href="/disclaimer/" className="text-[#059669] hover:underline">
            Legal Disclaimer →
          </Link>
        </div>
      </div>
    </div>
  );
}
