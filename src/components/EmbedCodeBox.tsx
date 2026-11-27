'use client';

import React, { useState } from 'react';

export default function EmbedCodeBox({
  siteName,
  siteUrl,
  embedUrl,
  accentClass
}: {
  siteName: string;
  siteUrl: string;
  embedUrl: string;
  accentClass: string;
}) {
  const [copied, setCopied] = useState(false);
  const snippet = `<iframe src="${embedUrl}" width="100%" height="520" style="border:1px solid #cbd5e1;border-radius:14px;" loading="lazy" title="${siteName} Statutory Calculator"></iframe>\n<p style="font-size:12px;color:#475569;margin-top:6px;">Powered by <a href="${siteUrl}" target="_blank" rel="noopener">${siteName}</a> — Free 51-State Statutory Audit</p>`;

  const copySnippet = () => {
    navigator.clipboard?.writeText(snippet).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3 border border-slate-800 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
          EMBED THIS CALCULATOR ON YOUR SITE OR BLOG
        </div>
        <button
          type="button"
          onClick={copySnippet}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs cursor-pointer transition ${accentClass}`}
        >
          {copied ? '✓ Copied Embed HTML' : 'Copy Embed Code →'}
        </button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
        {snippet}
      </pre>
    </div>
  );
}
