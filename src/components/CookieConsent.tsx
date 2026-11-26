"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_STORAGE_KEY = "ticketfig_cookie_consent_v1";

const EU_UK_CH_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL",
  "PT", "RO", "SK", "SI", "ES", "SE", "CH", "GB", "UK",
]);

const US_PRIVACY_STATES = new Set([
  "CA", "VA", "CO", "CT", "UT", "TX", "OR", "MT", "FL", "IA", "IN", "TN",
  "DE", "NE", "NH", "NJ", "MN", "MD", "KY", "RI",
]);

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved) return;
    } catch {
      return;
    }

    const shouldShowForGeo = (country: string, regionCode: string) => {
      const c = country.trim().toUpperCase();
      const r = regionCode.trim().toUpperCase();
      return EU_UK_CH_COUNTRIES.has(c) || (c === "US" && US_PRIVACY_STATES.has(r));
    };

    const detectGeo = async () => {
      try {
        const res = await fetch("/api/geo", {
          cache: "no-store",
          signal: AbortSignal.timeout(2000),
        });
        if (res.ok) {
          const data = (await res.json()) as { country?: string; regionCode?: string };
          if (!cancelled && shouldShowForGeo(data.country || "", data.regionCode || "")) {
            setVisible(true);
          }
          return;
        }
      } catch {
        // Fallback to /cdn-cgi/trace below
      }

      try {
        const traceRes = await fetch("/cdn-cgi/trace", {
          cache: "no-store",
          signal: AbortSignal.timeout(2000),
        });
        if (traceRes.ok) {
          const text = await traceRes.text();
          const match = text.match(/^loc=([A-Z]{2})$/m);
          const loc = match ? match[1].toUpperCase() : "";
          if (!cancelled && EU_UK_CH_COUNTRIES.has(loc)) {
            setVisible(true);
          }
        }
      } catch {
        // Keep visible = false if geo detection fails
      }
    };

    void detectGeo();

    return () => {
      cancelled = true;
    };
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
