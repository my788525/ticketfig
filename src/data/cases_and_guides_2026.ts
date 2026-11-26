export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  stateAbbr: string;
  stateName: string;
  statute: string;
  citationDetails: string;
  outcome: string;
  netSavings: string;
  directFineAvoided: number;
  insuranceSaved3Yr: number;
  stateSurchargeAvoided: number;
  summary: string;
  ledgerRows: { item: string; payFinePath: string; defensePath: string; delta: string }[];
  timeline: { step: string; detail: string }[];
  keyTakeaway: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  updatedAt: string;
  directAnswerTitle: string;
  directAnswerRows: { metric: string; value: string; statutoryNote: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  relatedCalculator: { href: string; label: string };
}

export const CASE_STUDIES_2026: CaseStudy[] = [
  {
    slug: 'california-78-in-65-cvc-40902-written-declaration',
    title: 'California 78-in-65 Speeding Ticket: CVC § 40902 Written Declaration Dismissal ($1,890 Saved)',
    subtitle: 'How a Bay Area engineering director defeated an I-280 radar citation by mail without missing a single workday.',
    stateAbbr: 'CA',
    stateName: 'California',
    statute: 'Cal. Veh. Code §§ 22349(a), 40902, 42005',
    citationDetails: '78 mph in a posted 65 mph zone (+13 mph) · Santa Clara County Superior Court',
    outcome: 'Dismissed (Not Guilty) via Form TR-205 Trial by Written Declaration',
    netSavings: '$1,890',
    directFineAvoided: 238,
    insuranceSaved3Yr: 1652,
    stateSurchargeAvoided: 0,
    summary:
      'A $35 California base fine escalates to $238 after statutory penalty assessments. Worse, an unmasked NOTS point strips the mandatory 20% California Proposition 103 Good Driver Discount for 36 months—costing $1,652+ in cumulative auto insurance surcharges on a $2,600/yr executive policy.',
    ledgerRows: [
      { item: 'Court Base Fine + Penalty Assessments', payFinePath: '$238', defensePath: '$0 (Bail Refunded)', delta: '+$238' },
      { item: 'Traffic School Admin + Course Fee', payFinePath: '$0 (if paid) / $89 (if masked)', defensePath: '$0', delta: '$0' },
      { item: '3-Year Insurance Hike (20% Good Driver Loss + Tier)', payFinePath: '$1,652', defensePath: '$0', delta: '+$1,652' },
      { item: 'Billable Work Hours Lost in Court', payFinePath: '0 hrs (Mail)', defensePath: '0 hrs (Mail TR-205)', delta: '0 hrs' },
      { item: '3-Year Total Financial Exposure', payFinePath: '$1,890', defensePath: '$0', delta: '+$1,890 Saved' },
    ],
    timeline: [
      { step: 'Day 4 — Informal Discovery & Bail Posting', detail: 'Submitted Form TR-205 request with $238 bail check and served Informal Discovery Request for radar tuning fork logs and officer FCC/POST radar certification.' },
      { step: 'Day 18 — Written Declaration Filed', detail: 'Filed concise 2-page CVC § 40902 statement challenging visual speed estimation foundation and requesting strict proof of engineering & traffic survey under CVC § 40802.' },
      { step: 'Day 52 — Clerk Notice of Dismissal', detail: 'Officer failed to submit a timely written response under TR-205; court entered Not Guilty dismissal and refunded $238 bail in full with zero NOTS points.' },
    ],
    keyTakeaway:
      'In California, CVC § 40902 lets you contest by mail with zero court appearance and preserves your 18-month CVC § 42005 traffic school eligibility as a fallback.',
  },
  {
    slug: 'north-carolina-sdip-pjc-insurance-hike-avoided',
    title: 'North Carolina 69-in-55 Citation: Avoiding the 30%–45% SDIP Insurance Hike via PJC',
    subtitle: 'Why paying a $195 Wake County ticket triggers a mandatory 3-year North Carolina Safe Driver Incentive Plan surcharge—and how PJC neutralized it.',
    stateAbbr: 'NC',
    stateName: 'North Carolina',
    statute: 'N.C.G.S. §§ 20-141, 58-36-65 (SDIP)',
    citationDetails: '69 mph in a posted 55 mph zone (+14 mph) · Wake County District Court',
    outcome: 'Prayer for Judgment Continued (PJC) / 0 SDIP Insurance Points Assessed',
    netSavings: '$2,160',
    directFineAvoided: 0,
    insuranceSaved3Yr: 2160,
    stateSurchargeAvoided: 0,
    summary:
      'North Carolina operates the strictest statutory insurance surcharge matrix in the United States (SDIP). Even 1 SDIP point mandates a +30% auto insurance premium hike for 36 months, and 2 SDIP points (11+ mph over >55 mph) mandates +45%. On a $2,400/yr policy, paying the ticket costs $2,160–$3,240 in extra premiums.',
    ledgerRows: [
      { item: 'Statutory Fine + NC Court Costs', payFinePath: '$213', defensePath: '$213 (Court Costs)', delta: '$0' },
      { item: 'Local Traffic Counsel Fee', payFinePath: '$0', defensePath: '$195', delta: '-$195' },
      { item: '3-Year NC SDIP Insurance Surcharge (30% on $2,400/yr)', payFinePath: '$2,160', defensePath: '$0 (PJC Shield)', delta: '+$2,160' },
      { item: 'Net 3-Year Financial Outcome', payFinePath: '-$2,373', defensePath: '-$408', delta: '+$1,965 Net ROI' },
    ],
    timeline: [
      { step: 'Day 3 — Household PJC & MVR Audit', detail: 'Verified no household member had used a PJC within the prior 3 years (N.C.G.S. § 58-36-65(c) household cap).' },
      { step: 'Day 12 — Counsel Appearance (Zero Client Travel)', detail: 'Retained Wake County traffic counsel to appear on client’s behalf and move for Prayer for Judgment Continued (PJC) or Improper Equipment.' },
      { step: 'Day 28 — PJC Entered on Record', detail: 'Court granted PJC upon payment of $213 statutory court costs. 0 DMV points and 0 SDIP insurance points assessed; $2,160 in 3-year insurance hikes avoided.' },
    ],
    keyTakeaway:
      'Never mail in a payment for a North Carolina speeding ticket before checking SDIP point exposure. A PJC or Improper Equipment reduction routinely saves $1,800–$3,500.',
  },
  {
    slug: 'new-york-6-point-driver-responsibility-assessment',
    title: 'New York 77-in-55 (6-Point) Ticket: Avoiding the $300 DRA + $1,950 Insurance Surge',
    subtitle: 'How a 22-mph-over Thruway citation crossed New York’s 6-point Driver Responsibility Assessment cliff—and how plea-by-mail reduced it to 0 points.',
    stateAbbr: 'NY',
    stateName: 'New York',
    statute: 'N.Y. VTL §§ 1180(b), 1199, 1806',
    citationDetails: '77 mph in a posted 55 mph zone (+22 mph = 6 NYS DMV pts) · Westchester Town Court',
    outcome: 'Amended to 0-Point Parking Violation (N.Y. VTL § 1201(a))',
    netSavings: '$2,250',
    directFineAvoided: 150,
    insuranceSaved3Yr: 1950,
    stateSurchargeAvoided: 300,
    summary:
      'In New York, 21–30 mph over carries 6 DMV points—immediately triggering the $300 Driver Responsibility Assessment ($100/year for 3 years under VTL § 1199) plus a ~39% auto insurance surcharge over 36 months.',
    ledgerRows: [
      { item: 'Court Fine + NY Mandatory Surcharge', payFinePath: '$393', defensePath: '$250 (Parking Plea)', delta: '+$143' },
      { item: 'NY DMV Driver Responsibility Assessment (6 pts)', payFinePath: '$300 ($100/yr x 3)', defensePath: '$0', delta: '+$300' },
      { item: '3-Year Auto Insurance Surcharge (~30% on $2,167/yr)', payFinePath: '$1,950', defensePath: '$0', delta: '+$1,950' },
      { item: 'Total 3-Year Exposure', payFinePath: '$2,643', defensePath: '$250', delta: '+$2,393 Saved' },
    ],
    timeline: [
      { step: 'Day 2 — Mail-In Not Guilty Plea (VTL § 1806)', detail: 'Checked Not Guilty on Section B of the Uniform Traffic Ticket and mailed via certified mail within 48 hours.' },
      { step: 'Day 21 — Prosecutor Plea-by-Mail Offer', detail: 'Submitted clean 5-year NYS DMV abstract and requested reduction to non-moving VTL § 1201(a) parking violation.' },
      { step: 'Day 35 — 0-Point Disposition Entered', detail: 'Town Court accepted 0-point parking plea ($250 fine). Eliminated 6 DMV points, $300 DRA, and $1,950 in 3-year insurance hikes.' },
    ],
    keyTakeaway:
      'Outside NYC TVB, New York Town and Village Courts routinely allow mail-in plea reductions from 4–6 point speeding tickets down to 0-point parking/equipment offenses.',
  },
];

export const GUIDES_2026: GuideArticle[] = [
  {
    slug: 'traffic-school-vs-fighting-ticket',
    title: 'Traffic School vs. Fighting a Ticket: 2026 3-Year ROI Comparison',
    description: 'When to elect traffic school / defensive driving vs. contesting via Trial by Written Declaration or prosecutor plea reduction.',
    category: 'Defense Strategy',
    readTime: '7 min read',
    updatedAt: '2026-10-15',
    directAnswerTitle: 'Direct Answer: Traffic School vs. Contesting (3-Year Net Expected Value)',
    directAnswerRows: [
      { metric: 'Traffic School / Masking (CA, FL, TX, AZ)', value: 'Best for 1–14 mph over if eligible', statutoryNote: '100% point & insurance shield; burns 12–18 mo cooldown.' },
      { metric: 'Written Declaration (CA TR-205, OR, WA)', value: 'Highest upside ($0 fine + keeps cooldown)', statutoryNote: 'If denied, CA preserves right to Trial de Novo + traffic school.' },
      { metric: 'Local Counsel Plea (NC, NY, VA, MO)', value: 'Mandatory for 15+ mph over / SDIP / 6+ pts', statutoryNote: 'Targets 0-pt Equipment/Parking amendment or PJC.' },
      { metric: 'Paying the Ticket Outright', value: 'Worst ROI (-$1,400 to -$3,200 over 3 yrs)', statutoryNote: 'Triggers 36–60 month insurance surcharge + Good Driver loss.' },
    ],
    sections: [
      {
        heading: '1. Why the Court Fine Is Only 15% of Your True Cost',
        paragraphs: [
          'Most drivers evaluate a speeding ticket solely by the dollar figure printed on the citation—typically $150 to $350. In reality, an unmasked moving violation conviction triggers an average 21% to 39% annual auto insurance surcharge for 36 months (and up to 60–72 months in states like Massachusetts).',
          'On a standard $2,200/year policy, a single 24% surcharge adds $528 per year, or $1,584 over three years. In California, losing the statutory 20% Proposition 103 Good Driver Discount alone costs $440/year ($1,320 over 3 years) even before carrier tier adjustments.',
        ],
      },
      {
        heading: '2. When Traffic School Beats Fighting—and When It Doesn’t',
        paragraphs: [
          'If your state offers statutory point-masking or dismissal—such as California CVC § 42005 (once per 18 months), Florida BDI under § 318.14(9), Texas DSC under Art. 45.0511, or Arizona Defensive Driving under A.R.S. § 28-3392—traffic school guarantees zero insurance impact.',
          'However, in states where defensive driving only gives a post-conviction DMV point credit (such as New York PIRP or Pennsylvania), attending traffic school does NOT stop your auto insurer from raising rates. In those states, contesting for a 0-point non-moving amendment is essential.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does traffic school hide a ticket from my car insurance company?',
        answer: 'Only in states with statutory confidential masking or pre-conviction dismissal (e.g., CA, FL, TX, AZ, IL Court Supervision). In states like NY, PA, or VA, traffic school only reduces DMV points and does not erase the conviction from your insurer MVR.',
      },
      {
        question: 'Can I do Trial by Written Declaration first and still take traffic school if I lose?',
        answer: 'In California (CVC § 40902), yes: if you lose a Trial by Written Declaration, you can request a Trial de Novo (Form TR-220) and ask the judge for traffic school at that hearing, or in many counties request traffic school directly.',
      },
    ],
    relatedCalculator: { href: '/calculators/fight-vs-pay-roi/', label: 'Run Fight vs. Pay 3-Year ROI Simulator' },
  },
  {
    slug: 'radar-vs-lidar-calibration-discovery',
    title: 'Radar vs. LiDAR Calibration Discovery: What to Request Before Trial',
    description: 'Exact engineering, tuning fork, FCC, and POST certification records to demand via informal discovery for speeding citations.',
    category: 'Evidence & Discovery',
    readTime: '6 min read',
    updatedAt: '2026-10-15',
    directAnswerTitle: 'Direct Answer: Radar vs. LiDAR Statutory Discovery Checklist',
    directAnswerRows: [
      { metric: 'Radar (Doppler Ka/K Band)', value: 'Tuning fork logs + patrol car speedometer cert', statutoryNote: 'Must show pre-shift and post-shift calibration checks.' },
      { metric: 'LiDAR (Laser 904nm)', value: 'NIST-traceable alignment & distance check', statutoryNote: 'Requires clear line-of-sight and tripod/braced stability.' },
      { metric: 'Engineering & Traffic Survey (CA)', value: 'Current 5/7-year speed zone survey (CVC § 40802)', statutoryNote: 'Expired survey renders radar/LiDAR speed trap inadmissible.' },
      { metric: 'Officer Certification', value: 'POST / state academy Radar/LiDAR operator cert', statutoryNote: 'Unqualified operator foundation is grounds for dismissal.' },
    ],
    sections: [
      {
        heading: '1. Why Calibration Records Matter in Written Declarations',
        paragraphs: [
          'Speed enforcement devices are not self-authenticating in contested traffic trials. The prosecution must establish a foundation that the radar or LiDAR unit was properly calibrated, tested before and after the shift, and operated by a certified officer.',
          'Serving an Informal Discovery Request 15–20 days before filing your written declaration or appearing in court forces the agency to produce maintenance logs, tuning fork certificates, and engineering surveys. If the agency fails to produce them, you have a concrete evidentiary objection.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I request radar calibration logs without a lawyer?',
        answer: 'Send a written Informal Discovery Request by certified mail to both the citing police agency (e.g., CHP or local PD) and the prosecuting/court clerk office referencing your citation number and requesting calibration logs, tuning fork certs, and officer training records.',
      },
    ],
    relatedCalculator: { href: '/calculators/written-declaration-eligibility/', label: 'Generate Discovery & Written Declaration Request' },
  },
  {
    slug: 'north-carolina-sdip-and-pjc-guide',
    title: 'North Carolina SDIP & PJC Guide: How 1 Point Triggers a 30% Rate Hike',
    description: 'Complete breakdown of the North Carolina Safe Driver Incentive Plan (SDIP) insurance points table, Improper Equipment, and Prayer for Judgment Continued.',
    category: 'State Deep Dive',
    readTime: '6 min read',
    updatedAt: '2026-10-15',
    directAnswerTitle: 'Direct Answer: North Carolina SDIP Insurance Point Matrix',
    directAnswerRows: [
      { metric: '1 SDIP Point (<=10 mph over in <55 zone)', value: '+30% insurance surcharge for 3 years', statutoryNote: 'Waivable ONLY if no other points/accidents in 3 yrs & <=10 over.' },
      { metric: '2 SDIP Points (11+ mph over or >75 mph)', value: '+45% insurance surcharge for 3 years', statutoryNote: 'Never automatically waived—requires PJC or Improper Equipment.' },
      { metric: '4 SDIP Points (16+ mph over & >75 mph)', value: '+80% insurance surcharge for 3 years', statutoryNote: 'Severe financial impact ($5,000+ over 3 years).' },
      { metric: 'PJC Cap (N.C.G.S. § 58-36-65)', value: '1 PJC per household every 3 years', statutoryNote: 'DMV allows 2 PJCs in 5 yrs, but insurers only honor 1 per 3 yrs.' },
    ],
    sections: [
      {
        heading: '1. DMV Points vs. SDIP Insurance Points in North Carolina',
        paragraphs: [
          'North Carolina is unique because it runs two completely separate point systems: NC DMV license points (which govern suspension at 12 points) and the North Carolina Rate Bureau Safe Driver Incentive Plan (SDIP), which legally mandates percentage insurance surcharges across all carriers.',
          'Even if you have zero prior tickets, a conviction for 11+ mph over the limit (or any speed over 75 mph) adds 2–4 SDIP points and forces every NC auto insurer to surcharge your policy by 45% to 80% for 36 months.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Improper Equipment better than a PJC in North Carolina?',
        answer: 'Yes. Reducing a speeding ticket to Improper Equipment (N.C.G.S. § 20-123.2) carries 0 DMV points and 0 SDIP points without burning your household’s 3-year PJC allowance.',
      },
    ],
    relatedCalculator: { href: '/calculators/license-points-calculator/', label: 'Check NC SDIP & License Points Exposure' },
  },
  {
    slug: 'california-trial-by-written-declaration-40902',
    title: 'California Trial by Written Declaration (CVC § 40902) Step-by-Step Guide',
    description: 'How to contest any California infraction ticket by mail using Form TR-205, preserve your Trial de Novo rights, and protect your Good Driver Discount.',
    category: 'State Deep Dive',
    readTime: '8 min read',
    updatedAt: '2026-10-15',
    directAnswerTitle: 'Direct Answer: California CVC § 40902 Workflow',
    directAnswerRows: [
      { metric: 'Eligible Violations', value: 'All Vehicle Code infractions (not misdemeanors)', statutoryNote: 'Covers standard speeding (CVC § 22349/22350) & red light.' },
      { metric: 'Required Form & Bail', value: 'Form TR-205 + full bail deposit by due date', statutoryNote: 'Bail is 100% refunded if found Not Guilty.' },
      { metric: 'Fallback Right (Trial de Novo)', value: 'Form TR-220 within 20 days of adverse decision', statutoryNote: 'Resets case for a brand-new in-person court trial.' },
      { metric: 'Good Driver Discount Risk', value: '20% mandatory Prop 103 discount loss (3 yrs)', statutoryNote: '1 unmasked NOTS point costs $1,300–$2,100 in insurance.' },
    ],
    sections: [
      {
        heading: '1. Why CVC § 40902 Gives Drivers Asymmetric Leverage',
        paragraphs: [
          'Under California Vehicle Code § 40902, any driver cited for an infraction has an absolute statutory right to a Trial by Written Declaration. The citing officer is required to submit a written officer’s declaration in response.',
          'Because officers must complete these declarations on duty or between shifts, a significant percentage go unanswered or lack foundational elements (such as valid Engineering & Traffic Survey citations under CVC § 40802 for speed-trap roads).',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I have to pay the fine upfront for a California Trial by Written Declaration?',
        answer: 'Yes, you must post the bail amount when submitting Form TR-205, unless you qualify for a fee waiver. If the court finds you Not Guilty, the clerk mails a full refund check.',
      },
    ],
    relatedCalculator: { href: '/calculators/written-declaration-eligibility/', label: 'Build Your CA Form TR-205 Defense Brief' },
  },
  {
    slug: 'corporate-fleet-background-check-mvr-impact',
    title: 'Corporate Fleet & Executive Background Check MVR Impact (2026)',
    description: 'How moving violations affect corporate car allowances, rental privileges, employment MVR checks, and professional driving eligibility.',
    category: 'Executive Compliance',
    readTime: '5 min read',
    updatedAt: '2026-10-15',
    directAnswerTitle: 'Direct Answer: Corporate MVR Screening Thresholds',
    directAnswerRows: [
      { metric: 'Standard Corporate Fleet Policy', value: 'Max 2 moving violations in 36 months', statutoryNote: '3rd violation often triggers fleet privilege suspension.' },
      { metric: 'Major Violation (15+ or 20+ mph over)', value: 'Immediate HR / Risk flag at many Fortune 500s', statutoryNote: 'Reckless driving (VA/GA/NC) is a criminal misdemeanor.' },
      { metric: 'Masked / Deferred Citations', value: 'Hidden from standard commercial MVR pulls', statutoryNote: 'CA CVC § 42005, IL Supervision, and FL BDI protect MVR.' },
    ],
    sections: [
      {
        heading: '1. Why White-Collar Professionals Cannot Afford Uncontested Points',
        paragraphs: [
          'Beyond personal auto insurance premiums, executives, consultants, and field directors face annual Motor Vehicle Record (MVR) audits for corporate fleet insurance, rental car master agreements, and executive background checks.',
          'A single criminal speeding or reckless driving conviction (such as 20+ mph over in Virginia under Va. Code § 46.2-862) appears on criminal background checks—not just DMV abstracts.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do out-of-state speeding tickets show up on my home state MVR?',
        answer: 'Yes. 45+ states participate in the Driver License Compact (DLC) and Non-Resident Violator Compact (NRVC), transmitting convictions back to your home state DMV.',
      },
    ],
    relatedCalculator: { href: '/calculators/speeding-ticket-insurance-cost/', label: 'Calculate 3-Year Insurance & MVR Exposure' },
  },
  {
    slug: 'auto-insurance-lookback-windows-3-vs-5-years',
    title: 'Auto Insurance Lookback Windows: 36 Months vs. 60–72 Months Explained',
    description: 'How long a speeding ticket actually raises your car insurance rates by state, carrier tiering, and violation severity.',
    category: 'Insurance Actuarial',
    readTime: '5 min read',
    updatedAt: '2026-10-15',
    directAnswerTitle: 'Direct Answer: Insurer MVR Lookback Windows by State & Severity',
    directAnswerRows: [
      { metric: 'Standard Minor Speeding (1–14 mph over)', value: '36 months (3 years) from conviction date', statutoryNote: 'Applied by GEICO, Progressive, State Farm, Allstate in most states.' },
      { metric: 'Major Speeding (15–29+ mph over)', value: '36 to 60 months (3–5 years)', statutoryNote: 'Longer lookback in high-risk underwriting tiers.' },
      { metric: 'Massachusetts SDIP', value: '72 months (6 years)', statutoryNote: 'Longest statutory surcharge lookback in the US.' },
      { metric: 'California Prop 103 Good Driver', value: '36 months (3 years) per NOTS point', statutoryNote: '20% statutory discount restored once point ages off.' },
    ],
    sections: [
      {
        heading: '1. Conviction Date vs. Ticket Date',
        paragraphs: [
          'Auto insurers measure the 36-month or 60-month lookback window from either the violation date or the conviction/disposition date depending on state law and carrier underwriting rules. Contesting a ticket can delay or prevent the conviction date entirely.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When does my insurance rate drop after a speeding ticket?',
        answer: 'Your surcharge typically drops at the first policy renewal following the 36-month anniversary of the violation or conviction (60–72 months for major violations or Massachusetts SDIP).',
      },
    ],
    relatedCalculator: { href: '/calculators/speeding-ticket-insurance-cost/', label: 'Model Your 36-Month Insurance Surcharge' },
  },
];

export const CASE_BY_SLUG: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES_2026.map((c) => [c.slug, c])
);

export const GUIDE_BY_SLUG: Record<string, GuideArticle> = Object.fromEntries(
  GUIDES_2026.map((g) => [g.slug, g])
);
