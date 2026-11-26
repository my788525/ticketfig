"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_STORAGE_KEY = "ticketfig_cookie_consent_v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, []);

  const handleConsent = (status: "accepted" | "essential") => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ status, updatedAt: new Date().toISOString() })
      );
    } catch {
      // Ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#0f2747] text-slate-100 border border-slate-700 rounded-2xl p-5 shadow-2xl no-print"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#c8a24a]">
            Privacy &amp; Cookie Notice
          </span>
          <span className="text-[10px] font-mono text-slate-400">GDPR · CCPA</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          All TicketFig calculators run 100% locally in your browser with zero citation data
          uploaded. We use essential storage, privacy-preserving analytics, and Google AdSense
          cookies to keep this statutory workbench free. See our{" "}
          <Link href="/privacy/" className="text-[#c8a24a] underline hover:text-amber-300">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className="flex-1 bg-[#c8a24a] hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs py-2 px-3.5 rounded-xl transition cursor-pointer"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
