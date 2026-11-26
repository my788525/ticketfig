export interface PitfallVignette {
  id: string;
  number: string;
  title: string;
  badge: string;
  financialImpact: string;
  statute: string;
  realCaseScenario: string;
  hiddenBlackHole: string;
  exactSurvivalMove: string;
  keyNumbers: { label: string; value: string }[];
  actionHref: string;
  actionLabel: string;
}

export const PITFALLS_2026: PitfallVignette[] = [
  {
    id: "click-to-pay-trap",
    number: "01",
    title: 'The "$150 Click-to-Pay" Trap',
    badge: "Most Common Mistake",
    financialImpact: "$1,650–$2,400+ 3-Yr Surcharge",
    statute: "Cal. Ins. Code § 1861.025 (Prop 103) · State Merit Rating Plans",
    realCaseScenario:
      "A clean-record driver in Sacramento gets a $150–$238 ticket for 74 in a 65 mph zone. Thinking \"it's cheaper than taking a day off work,\" they scan the QR code on the citation, pay online in two minutes, and move on.",
    hiddenBlackHole:
      "Clicking \"Pay Fine\" enters an immediate guilty plea (bond forfeiture conviction) on your state DMV record. At your next auto policy renewal, your insurer strips your 20% Good Driver Discount and applies a 24%–28% minor-moving-violation surcharge for 36 consecutive months—turning a $150 fine into $1,650+ in extra premiums.",
    exactSurvivalMove:
      "Never pay a moving violation online before checking your 3-year insurance exposure and diversion eligibility. Request Traffic School masking, a Trial by Written Declaration, or a non-moving plea reduction before any guilty plea is entered.",
    keyNumbers: [
      { label: "Upfront Ticket", value: "$150–$238" },
      { label: "3-Yr Premium Spike", value: "+$1,650 to $2,400+" },
      { label: "Surcharge Window", value: "36 Months" },
    ],
    actionHref: "/calculators/speeding-ticket-insurance-cost/",
    actionLabel: "Audit Your 3-Year Insurance Exposure →",
  },
  {
    id: "ca-tbwd-trial-de-novo-trap",
    number: "02",
    title: "The California TBWD Bail & Trial de Novo Deadline Trap",
    badge: "Procedural Cliff",
    financialImpact: "Forfeits Right to In-Person Trial",
    statute: "Cal. Veh. Code § 40902 · Cal. Rules of Court 4.210 (TR-205 / TR-220)",
    realCaseScenario:
      "A Bay Area driver mails in a Trial by Written Declaration (Form TR-205) with full bail posted. Three weeks later, the court mails a Notice of Decision finding them guilty. The driver puts the letter on the kitchen counter, intending to request an in-person Trial de Novo next month.",
    hiddenBlackHole:
      "Under Cal. Veh. Code § 40902(d) and Rule 4.210, you have strictly 20 calendar days from the mailing date of the clerk's notice (25 days if mailed out-of-county/within CA) to file Form TR-220 requesting a Trial de Novo. Missing that 20-day cliff by even 24 hours makes the guilty verdict permanent, forfeits your bail, and blocks any traffic school request.",
    exactSurvivalMove:
      "Log the exact mailing postmark on your clerk's decision envelope immediately. File Form TR-220 (Request for New Trial) in person or via certified mail within 15 days—well ahead of the 20-day statutory cutoff—and request Traffic School in the alternative if needed.",
    keyNumbers: [
      { label: "Hard Filing Window", value: "20 Days (TR-220)" },
      { label: "Upfront Bail Required", value: "100% of Fine" },
      { label: "Late Penalty", value: "Final Conviction" },
    ],
    actionHref: "/calculators/written-declaration-eligibility/",
    actionLabel: "Check Written Declaration & Deadlines →",
  },
  {
    id: "traffic-school-cooldown-cdl-trap",
    number: "03",
    title: "The Traffic School Cooldown & CDL Disqualification Trap",
    badge: "Silent Point Leak",
    financialImpact: "Wasted Fee + Unmasked Point",
    statute: "Cal. Veh. Code § 42005 · Tex. Code Crim. Proc. Art. 45.0511 · 49 C.F.R. § 384.226",
    realCaseScenario:
      "A driver pays court admin fees plus $45 for an online Defensive Driving / Traffic Violator School course—or a Commercial Driver's License (CDL) holder takes traffic school for a personal-car weekend speeding ticket—assuming the point will automatically disappear.",
    hiddenBlackHole:
      "Every state enforces strict statutory cooldowns (18 months in California, 12 months in Texas, 5-time lifetime cap in Florida). If you completed a course within the cooldown window—or if you hold a CDL, where federal anti-masking law (49 C.F.R. § 384.226) prohibits masking convictions even in a personal vehicle—the DMV rejects the mask, keeps your money, and posts the point anyway.",
    exactSurvivalMove:
      "Verify your exact prior conviction date against your state's 12/18/36-month cooldown before paying traffic school admin fees. If you hold a CDL or are inside a cooldown window, contest on technical/calibration grounds or negotiate a zero-point non-moving amendment instead.",
    keyNumbers: [
      { label: "CA Cooldown", value: "18 Months" },
      { label: "TX / FL Limits", value: "12 Mo / 5x Cap" },
      { label: "CDL Masking", value: "Federally Barred" },
    ],
    actionHref: "/calculators/license-points-calculator/",
    actionLabel: "Check State Points & Cooldown Rules →",
  },
  {
    id: "nc-household-pjc-trap",
    number: "04",
    title: "The North Carolina Household PJC Limit Trap",
    badge: "Household Policy Shock",
    financialImpact: "+30% to +80% SDIP Rate Hike",
    statute: "N.C.G.S. § 15A-1331 · NC Rate Bureau SDIP Rules",
    realCaseScenario:
      "A Charlotte driver gets cited for 12 mph over the limit, shows up to district court, and asks the judge for a Prayer for Judgment Continued (PJC). The judge grants it, and the driver leaves relieved—unaware their spouse used a PJC 19 months earlier on a separate minor ticket.",
    hiddenBlackHole:
      "Under North Carolina's Safe Driver Incentive Plan (SDIP), insurers grant only ONE PJC per household (all drivers on the policy) every 3 years—not per person. When a second household PJC is entered within 36 months, the insurer counts BOTH violations retroactively, triggering a +30% to +80% SDIP surcharge across every car on the family policy.",
    exactSurvivalMove:
      "Audit your entire household's 36-month citation history before requesting a PJC. If any household member used a PJC in the last 3 years, ask the ADA for a reduction to Improper Equipment (N.C.G.S. § 20-123.2)—a non-moving violation carrying zero DMV and zero SDIP points.",
    keyNumbers: [
      { label: "Household PJC Cap", value: "1 per 3 Years" },
      { label: "2nd PJC Penalty", value: "Both Count (+30–80%)" },
      { label: "Safe Alternative", value: "Improper Equipment" },
    ],
    actionHref: "/states/north-carolina/",
    actionLabel: "Inspect North Carolina SDIP Dossier →",
  },
  {
    id: "show-up-without-discovery-trap",
    number: "05",
    title: 'The "Show Up Without Discovery" Trap',
    badge: "Courtroom Leverage Gap",
    financialImpact: "90%+ Loss Rate Unprepared",
    statute: "Cal. Veh. Code § 40802 (Speed Traps) · State Rules of Criminal Discovery",
    realCaseScenario:
      "A driver pleads not guilty and shows up to traffic court planning to tell the judge, \"I was keeping up with traffic and didn't think I was going that fast.\" The officer reads from a clipboard, states the Radar/LiDAR unit was tested, and the judge finds the driver guilty in 90 seconds.",
    hiddenBlackHole:
      "In traffic court, an officer's sworn testimony establishes a prima facie case unless you introduce objective statutory or foundational gaps. Without serving a pre-trial Informal Discovery Request for the officer's POST Radar/LiDAR certification, tuning-fork calibration logs, FCC license, and the road's Engineering & Traffic Survey (ETS), you have zero admissible evidence to challenge speed-trap validity.",
    exactSurvivalMove:
      "Serve a formal written Discovery Request to both the citing agency and prosecutor 20–30 days before trial. Demand the current 5-to-7-year Engineering & Traffic Survey (CVC § 40802), tuning-fork/internal calibration logs, and patrol dashcam/bodycam footage—if the ETS is expired or logs are missing, move to dismiss.",
    keyNumbers: [
      { label: "ETS Validity (CA)", value: "5–7 Years Max" },
      { label: "Serve Discovery", value: "20–30 Days Pre-Trial" },
      { label: "Key Exhibits", value: "ETS + Tuning Fork" },
    ],
    actionHref: "/calculators/discovery-calibration-builder/",
    actionLabel: "Generate Formal Discovery Request →",
  },
  {
    id: "out-of-state-dlc-myth",
    number: "06",
    title: "The Out-of-State Driver License Compact (DLC) Myth",
    badge: "Interstate Reporting",
    financialImpact: "Home-State Points + Surcharge",
    statute: "Driver License Compact (DLC) · Non-Resident Violator Compact (NRVC)",
    realCaseScenario:
      "A New Jersey or New York driver gets pulled over on I-95 in Virginia or Pennsylvania and decides to pay the out-of-state ticket by mail, assuming \"what happens in another state stays off my home DMV record.\"",
    hiddenBlackHole:
      "45+ U.S. states and D.C. belong to the Driver License Compact (DLC) and Non-Resident Violator Compact (NRVC). Under DLC Article III & IV, the citing state electronically transmits the conviction to your home DMV, which converts it to home-state points (e.g., NJ adds 2 points for most out-of-state moving violations) and exposes it to your insurer's CLUE/MVR pull.",
    exactSurvivalMove:
      "Treat an out-of-state citation as if it happened in your home county. Check how your home DMV maps out-of-state offenses (e.g., NY generally does not transfer points from most states except Ontario/Quebec, whereas NJ, PA, and NC do), and hire local traffic counsel or contest by written declaration where permitted.",
    keyNumbers: [
      { label: "Compact Members", value: "45+ States & DC" },
      { label: "MVR / CLUE Pull", value: "36–60 Months" },
      { label: "NJ Out-of-State", value: "+2 Home DMV Pts" },
    ],
    actionHref: "/calculators/fight-vs-pay-roi/",
    actionLabel: "Simulate Fight vs. Pay 3-Yr ROI →",
  },
];

export const PITFALLS_FAQS = [
  {
    question: "Why does paying a $150 speeding ticket online cost $1,650+ over 3 years?",
    answer:
      "Paying a moving violation online enters an immediate guilty plea on your state DMV record. Most U.S. auto insurers strip your Good Driver Discount (often 15%–20%) and apply a 20%–28% minor-moving-violation surcharge for 36 months, adding $1,650 to $2,400+ in cumulative premiums.",
  },
  {
    question: "What happens if I miss the 20-day Trial de Novo deadline in California?",
    answer:
      "Under Cal. Veh. Code § 40902(d) and California Rules of Court 4.210, you have 20 calendar days from the mailing of an adverse Trial by Written Declaration decision (25 days if out-of-county within CA) to file Form TR-220. Missing this window makes the conviction final and forfeits your posted bail.",
  },
  {
    question: "Can a CDL holder use traffic school to hide a personal-car speeding ticket?",
    answer:
      "No. Under federal anti-masking regulations (49 C.F.R. § 384.226), states are prohibited from masking or deferring traffic convictions for Commercial Driver's License (CDL) holders, even when the citation occurred in a private non-commercial vehicle.",
  },
  {
    question: "How does the North Carolina household PJC limit work?",
    answer:
      "Under North Carolina Rate Bureau SDIP rules, insurance companies allow only one Prayer for Judgment Continued (PJC) per household every 3 years. If a second household member uses a PJC within 36 months, insurers count both offenses and apply a 30%–80% SDIP premium increase.",
  },
  {
    question: "Do out-of-state speeding tickets show up on my home-state insurance?",
    answer:
      "Yes. Over 45 states and D.C. participate in the Driver License Compact (DLC) and Non-Resident Violator Compact (NRVC), transmitting out-of-state convictions to your home DMV and Motor Vehicle Record (MVR), which insurers pull at renewal.",
  },
];
