import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES_2026, GUIDE_BY_SLUG } from "@/data/cases_and_guides_2026";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

export function generateStaticParams() {
  return GUIDES_2026.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDE_BY_SLUG[slug];
  if (!g) return { title: "Guide Not Found" };
  return {
    title: g.title,
    description: g.description,
    alternates: {
      canonical: `/guides/${g.slug}/`,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = GUIDE_BY_SLUG[slug];
  if (!g) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "https://ticketfig.com/" },
            { name: "Guides", url: "https://ticketfig.com/guides/" },
            { name: g.title, url: `https://ticketfig.com/guides/${g.slug}/` },
          ]),
          faqJsonLd(g.faqs),
        ]}
      />

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link> /{" "}
          <Link href="/guides/" className="hover:text-[#0f2747]">Guides</Link> / {g.category}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          {g.title}
        </h1>
        <p className="text-base text-slate-600">{g.description}</p>
        <div className="text-xs text-slate-500">
          Updated {g.updatedAt} · {g.readTime}
        </div>
        {/* Quick-Jump Anchor Pills */}
        <nav aria-label="Quick jump" className="flex flex-wrap gap-2 pt-2">
          <a href="#direct-answer" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            Direct Statutory Answer
          </a>
          <a href="#benchmark-table" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            Benchmark Table
          </a>
          <a href="#defense-kit" className="px-3 py-1 rounded-full bg-amber-100 hover:bg-[#c8a24a] text-xs font-bold text-[#0f2747] transition">
            Written Defense Kit
          </a>
          <a href="#guide-sections" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            Statutory Analysis
          </a>
          <a href="#faq" className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#0f2747] hover:text-white text-xs font-bold text-[#0f2747] transition">
            FAQs
          </a>
        </nav>
      </div>

      {/* Above-the-Fold Direct Statutory Answer Box */}
      <div id="direct-answer" className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm space-y-2 border border-slate-800">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#c8a24a]">
          Direct Statutory Answer
        </div>
        <p className="text-sm text-slate-100 leading-relaxed">
          <strong>{g.directAnswerTitle}:</strong> {g.description}{" "}
          {g.directAnswerRows[0] && (
            <>
              Key benchmark: <strong>{g.directAnswerRows[0].metric}</strong> →{" "}
              <span className="text-emerald-400 font-semibold">{g.directAnswerRows[0].value}</span> (
              {g.directAnswerRows[0].statutoryNote}).
            </>
          )}
        </p>
      </div>

      {/* Direct Answer Table */}
      <div id="benchmark-table" className="bg-white border-2 border-[#0f2747] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="text-xs font-extrabold uppercase tracking-wider text-[#c8a24a]">
          Executive Summary
        </div>
        <h2 className="text-lg font-bold text-[#0f2747]">{g.directAnswerTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <th className="py-2 pr-4">Scenario / Metric</th>
                <th className="py-2 px-3">Benchmark / Outcome</th>
                <th className="py-2 pl-3">Statutory Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {g.directAnswerRows.map((r) => (
                <tr key={r.metric}>
                  <td className="py-3 pr-4 font-bold text-[#0f2747]">{r.metric}</td>
                  <td className="py-3 px-3 font-semibold text-[#059669]">{r.value}</td>
                  <td className="py-3 pl-3 text-slate-600">{r.statutoryNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Offer @ ~35-40% Scroll Depth */}
      <div id="defense-kit">
        <ToolPaywallDossier
          badge="2026 Written Defense & Discovery Kit"
          title="Download Full Legal Templates & 51-State Matrix"
          desc="Get editable .docx Written Declarations, Radar/LiDAR Calibration Discovery Requests, and our .xlsx 3-Year ROI Ledger."
          features={[
            "Editable .docx Written Declaration Templates",
            "Radar & LiDAR Discovery Request Forms",
            ".xlsx 51-State DMV Point & ROI Ledger",
            "All-Access Matrix Pass Included",
          ]}
        />
      </div>

      {/* Article Sections */}
      <div id="guide-sections" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        {g.sections.map((s) => (
          <section key={s.heading} className="space-y-2.5">
            <h2 className="text-xl font-bold text-[#0f2747]">{s.heading}</h2>
            {s.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="pt-2">
          <Link
            href={g.relatedCalculator.href}
            className="inline-block px-5 py-3 rounded-xl bg-[#0f2747] text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            {g.relatedCalculator.label} →
          </Link>
        </div>
      </div>

      {/* FAQs */}
      <section id="faq" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {g.faqs.map((f) => (
            <div key={f.question} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="text-sm font-bold text-[#0f2747]">{f.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
