'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface WizardLeadEscalationProps {
  stateAbbr: string;
  stateName: string;
  exposureAmount: number;
  summaryText: string;
  statuteCitation: string;
}

export default function WizardLeadEscalation({
  stateAbbr,
  stateName,
  exposureAmount,
  summaryText,
  statuteCitation
}: WizardLeadEscalationProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const isHighStakes = exposureAmount >= 2200;

  const handleSaveBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setMsg('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    setMsg('');
    try {
      await fetch('https://mail.lianu.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'ticketfig.com',
          email: email.trim(),
          lead_type: 'wizard_brief_save',
          state: stateAbbr,
          lead_value: `$${exposureAmount.toLocaleString()}`,
          subject: `TicketFig Brief & Court Deadline Save (${stateAbbr})`,
          message: summaryText.slice(0, 1800),
          page_url: typeof window !== 'undefined' ? window.location.href : 'https://ticketfig.com/wizard/'
        })
      });
      const blob = new Blob([`${summaryText}\n\nSaved via TicketFig.com (${statuteCitation})`], {
        type: 'text/plain;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticketfig-${stateAbbr.toLowerCase()}-defense-brief.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus('done');
      setMsg('Saved! Your defense brief backup downloaded and court reminder is logged.');
      setEmail('');
    } catch {
      setStatus('error');
      setMsg('Could not save right now—please use the Print Brief button above.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 no-print">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600">
          FREE BACKUP &amp; APPEARANCE REMINDER
        </div>
        <h4 className="text-base font-extrabold text-[#0b1120]">
          Save Your {stateAbbr} Defense Brief &amp; Deadline
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Download a plain-text backup of your 3-year insurance math and log your email before your court appearance or TR-205 deadline.
        </p>
        <form onSubmit={handleSaveBrief} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0b1120]"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-4 py-2 rounded-xl bg-[#0b1120] hover:bg-zinc-800 text-white font-bold text-xs cursor-pointer transition shrink-0"
          >
            {status === 'sending' ? 'Saving...' : 'Save & Download →'}
          </button>
        </form>
        {msg && (
          <p className={`text-[11px] font-semibold ${status === 'done' ? 'text-emerald-700' : 'text-rose-700'}`}>
            {msg}
          </p>
        )}
      </div>

      <div
        className={`rounded-2xl p-5 border space-y-3 shadow-sm ${
          isHighStakes
            ? 'bg-amber-50/70 border-amber-400/70'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700">
          {isHighStakes ? 'HIGH-EXPOSURE ESCALATION ($2,200+ 3-YR)' : 'INSURANCE & TRAFFIC COUNSEL ESCALATION'}
        </div>
        <h4 className="text-base font-extrabold text-[#0b1120]">
          {isHighStakes
            ? `High 3-Year Surcharge Risk ($${exposureAmount.toLocaleString()})`
            : `Protect Your ${stateName} Driving Record`}
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed">
          {isHighStakes
            ? `If you face a 25+ mph enhancement, reckless charge, or point-suspension cliff under ${statuteCitation}, pair your Written Defense brief with a local traffic attorney consultation and shop competing auto insurance quotes before renewal.`
            : `If your citation is ineligible for traffic school or you hold a CDL, review ${stateName}'s point thresholds and prepare calibration discovery before entering a plea.`}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/license-points-calculator/"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-[#0b1120] hover:bg-slate-100"
          >
            Audit License Points →
          </Link>
          <Link
            href="/pitfalls/"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-amber-700 hover:bg-slate-100"
          >
            Avoid Guilty-Plea Traps →
          </Link>
        </div>
      </div>
    </div>
  );
}
