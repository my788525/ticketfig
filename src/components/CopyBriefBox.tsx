"use client";

import { useState } from "react";

export default function CopyBriefBox({
  title,
  subtitle,
  text,
}: {
  title: string;
  subtitle?: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 no-print">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-[#0f2747]">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            copied
              ? "bg-[#059669] text-white"
              : "bg-[#0f2747] hover:bg-slate-800 text-white"
          }`}
        >
          {copied ? "Copied to Clipboard ✓" : "Copy Request Text"}
        </button>
      </div>
      <pre className="bg-slate-950 text-slate-200 text-[11px] font-mono p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
        {text}
      </pre>
    </div>
  );
}
