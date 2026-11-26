"use client";

import React, { useState, useEffect } from "react";

interface ToolPaywallDossierProps {
  badge?: string;
  title: string;
  desc: string;
  price?: string;
  pid?: string;
  site?: string;
  features: string[];
  dynamicAmount?: string;
  docType?: string;
  storageKey?: string;
  sampleLines?: { label: string; value: string }[];
}

export default function ToolPaywallDossier({
  badge = "2026 Written Defense & Discovery Kit",
  title,
  desc,
  price = "$24.99",
  pid = "pdt_0NsmklI8rw00LaBQM8xhq",
  site = "ticketfig.com",
  features,
  dynamicAmount,
  docType = "3-Year Exposure & Written Defense Brief",
  storageKey,
  sampleLines,
}: ToolPaywallDossierProps) {
  const [showQr, setShowQr] = useState(false);
  const [previewTab, setPreviewTab] = useState<"docx" | "xlsx">("docx");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [hasActivePass, setHasActivePass] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [passError, setPassError] = useState("");
  const [verifyingPass, setVerifyingPass] = useState(false);

  const checkoutUrl = `https://checkout.dodopayments.com/buy/${encodeURIComponent(pid)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(checkoutUrl)}`;

  const handleCheckout = () => {
    try {
      fetch("https://send.lianu.com/api/vip/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, product_id: pid, source: "dossier_v2" }),
      }).catch(() => {});
    } catch {
      // Ignore telemetry error
    }
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("status") === "success") {
        setPaymentSuccess(true);
      }
      try {
        const savedKey = localStorage.getItem("matrix_all_access_key");
        if (savedKey && savedKey.startsWith("PASS-")) {
          setHasActivePass(true);
        }
      } catch {}
    }
  }, [storageKey]);

  const handleVerifyPass = async () => {
    const clean = inputKey.trim().toUpperCase();
    if (!clean) return;
    setVerifyingPass(true);
    setPassError("");
    try {
      const res = await fetch("https://send.lianu.com/api/vip/verify-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: clean }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        localStorage.setItem("matrix_all_access_key", clean);
        setHasActivePass(true);
        setShowPassModal(false);
      } else {
        setPassError(data.message || "Invalid or expired key. Format: PASS-XXXX-XXXX-XXXX-XXXX");
      }
    } catch {
      setPassError("Network error checking key. Please try again.");
    } finally {
      setVerifyingPass(false);
    }
  };

  return (
    <div
      className="my-8 bg-[#0f2747] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden no-print"
      data-matrix-offer="1"
      data-offer-slot="inline"
      data-offer-id={pid}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c8a24a]/10 rounded-full blur-3xl pointer-events-none" />

      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0f2747] border-2 border-[#059669] rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 bg-[#059669]/20 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h4 className="text-2xl font-bold text-white">All-Access Pass Confirmed</h4>
            <p className="text-sm text-slate-300">
              Your unwatermarked 3-Year Financial Exposure &amp; Written Defense Brief is ready to print or save as PDF.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full bg-[#059669] hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition cursor-pointer"
            >
              Print / Save Certified Brief PDF
            </button>
            <button
              type="button"
              onClick={() => setPaymentSuccess(false)}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Return to Workbench
            </button>
          </div>
        </div>
      )}

      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h4 className="text-lg font-bold text-white">Activate Matrix All-Access Pass</h4>
            <p className="text-xs text-slate-300">
              Enter your 16-character pass key (<code className="text-[#c8a24a] font-mono">PASS-XXXX-XXXX-XXXX-XXXX</code>).
            </p>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value.toUpperCase())}
              placeholder="PASS-ABCD-EFGH-JKMN-PQRT"
              className="w-full font-mono bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#c8a24a]"
            />
            {passError && <div className="text-xs text-rose-400 font-medium">{passError}</div>}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={verifyingPass}
                onClick={handleVerifyPass}
                className="flex-1 bg-[#c8a24a] hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                {verifyingPass ? "Verifying..." : "Activate Pass"}
              </button>
              <button
                type="button"
                onClick={() => setShowPassModal(false)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Legal Brief Dossier Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[330px] bg-slate-950 border border-slate-700/80 rounded-xl p-5 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  TICKETFIG · 2026 STATUTORY BRIEF
                </div>
                <div className="text-xs font-bold text-white uppercase mt-0.5">{docType}</div>
              </div>
              <div className="w-7 h-7 rounded-full border border-[#c8a24a]/60 bg-[#c8a24a]/10 flex items-center justify-center text-[11px] text-[#c8a24a] font-bold">
                §
              </div>
            </div>

            <div className="my-4 space-y-2 text-[11px] font-mono tabular-nums">
              {dynamicAmount && (
                <div className="flex justify-between text-amber-300 bg-[#c8a24a]/10 p-2 rounded border border-[#c8a24a]/30">
                  <span className="font-bold">Audited 3-Yr Exposure:</span>
                  <span className="font-black">{dynamicAmount}</span>
                </div>
              )}
              {sampleLines ? (
                sampleLines.map((s, i) => (
                  <div key={i} className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{s.label}:</span>
                    <span className="font-semibold text-white">{s.value}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Statutory Basis:</span>
                    <span className="text-emerald-400 font-semibold">51-Jurisdiction Verified</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Defense Packet:</span>
                    <span className="text-white font-semibold">TR-205 + Discovery</span>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-1 text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-3">
              <div className="flex justify-between"><span>├── 01_Written_Declaration_Templates.docx</span><span className="text-[#c8a24a]">Word</span></div>
              <div className="flex justify-between"><span>├── 02_Radar_LiDAR_Discovery_Motion.docx</span><span className="text-[#c8a24a]">Word</span></div>
              <div className="flex justify-between"><span>├── 03_3Yr_Insurance_ROI_Ledger.xlsx</span><span className="text-emerald-400">Excel</span></div>
              <div className="flex justify-between"><span>└── 04_51_State_Statutes_Compendium.pdf</span><span className="text-slate-300">PDF</span></div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                <span className="text-[#c8a24a] font-bold">LIVE KIT PREVIEW</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewTab("docx")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${previewTab === "docx" ? "bg-[#c8a24a] text-slate-950 font-bold" : "bg-slate-800 text-slate-300"}`}
                  >
                    .DOCX
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab("xlsx")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${previewTab === "xlsx" ? "bg-emerald-600 text-white font-bold" : "bg-slate-800 text-slate-300"}`}
                  >
                    .XLSX
                  </button>
                </div>
              </div>
              {previewTab === "docx" ? (
                <div className="bg-white/95 text-slate-900 rounded-lg p-2.5 text-[10px] leading-snug space-y-1 font-serif">
                  <div className="font-bold text-[#0b1120] uppercase tracking-wider text-[9px] font-mono">
                    TRIAL BY WRITTEN DECLARATION · DISCOVERY
                  </div>
                  <div className="font-bold">Re: Request for Calibration &amp; Officer Logs</div>
                  <div className="h-1.5 w-4/5 bg-slate-200 rounded" />
                  <div className="text-[9px] text-slate-600">
                    Defendant requests tuning-fork / LiDAR certification &amp; engineering speed survey...
                  </div>
                  <div className="h-1.5 w-3/5 bg-slate-200 rounded" />
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-[9px] font-mono text-slate-300 space-y-1">
                  <div className="grid grid-cols-3 text-amber-400 font-bold border-b border-slate-800 pb-0.5">
                    <span>Option</span><span>3-Yr Cost</span><span>Points</span>
                  </div>
                  <div className="grid grid-cols-3"><span>Pay Ticket</span><span className="text-rose-400">$2,140</span><span>+2 pts</span></div>
                  <div className="grid grid-cols-3"><span>Contest</span><span className="text-emerald-400">$24.99</span><span>0 pts</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Offer & Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#c8a24a]/20 text-[#c8a24a] border border-[#c8a24a]/40">
              {badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/90 text-emerald-300 border border-[#059669]/40">
              100% In-Browser · Zero Data Uploaded
            </span>
            {hasActivePass && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-950 text-sky-300 border border-sky-500/40">
                All-Access Matrix Pass Active
              </span>
            )}
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {dynamicAmount ? `Defend Against ${dynamicAmount} in 3-Year Exposure` : title}
          </h3>
          <div className="rounded-xl bg-slate-950/80 border border-slate-700/80 px-3.5 py-2.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong className="text-emerald-400">Free Brief Included:</strong> Full 3-Year Exposure Printout &amp; Statutory Summary
            </span>
            <span className="text-[#c8a24a] font-semibold">
              Upgrade → Turnkey .docx Filings + .xlsx ROI Ledger
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
            {features.map((f, i) => (
              <div key={i} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {hasActivePass ? (
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-[#059669] hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition cursor-pointer"
              >
                Pass Active: Print / Export Brief PDF
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckout}
                data-offer-action="buy"
                data-offer-id={pid}
                className="flex-1 bg-[#c8a24a] hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                Unlock All-Access Matrix Pass ({price})
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              {showQr ? "Hide Mobile QR" : "Pay via Phone"}
            </button>
          </div>

          {showQr && (
            <div className="p-4 bg-slate-950 border border-slate-700 rounded-xl flex items-center space-x-4">
              <img
                src={qrImageUrl}
                alt="Scan to checkout on mobile"
                className="w-20 h-20 rounded-lg bg-white p-1 shrink-0"
              />
              <div className="text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white">Apple Pay / Google Pay Mobile Checkout</div>
                <p className="text-slate-400 text-[11px]">
                  Corporate firewall blocking checkout? Scan with your phone camera to unlock instantly.
                </p>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>Benchmark: 1-Hr Traffic Attorney ($350+) · 30-Day Money-Back Guarantee</span>
            <button
              type="button"
              onClick={() => setShowPassModal(true)}
              className="text-[#c8a24a] hover:underline font-semibold cursor-pointer"
            >
              Enter Pass Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
