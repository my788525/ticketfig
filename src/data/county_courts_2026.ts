export interface CountyCourtGuide {
  slug: string;
  courtName: string;
  county: string;
  stateAbbr: string;
  stateName: string;
  statute: string;
  writtenContestMethod: string;
  typicalFineRange: string;
  threeYrInsuranceImpact: string;
  localProcedureTip: string;
  portalUrl: string;
  faqs: { q: string; a: string }[];
}

export const COUNTY_COURTS_2026: CountyCourtGuide[] = [
  {
    slug: 'los-angeles-county-ca',
    courtName: 'Los Angeles County Superior Court (Traffic Division)',
    county: 'Los Angeles County',
    stateAbbr: 'CA',
    stateName: 'California',
    statute: 'Cal. Veh. Code § 40902 (Form TR-205)',
    writtenContestMethod: 'Trial by Written Declaration (Mail / e-File via LA Court Portal)',
    typicalFineRange: '$238 – $490+',
    threeYrInsuranceImpact: '$1,650 – $2,850 (Loss of 20% CA Good Driver Discount)',
    localProcedureTip:
      'Post full bail when submitting Form TR-205. If the citing LAPD or CHP officer fails to file a timely Officer Declaration, the court enters an automatic dismissal and refunds 100% of bail.',
    portalUrl: 'https://www.lacourt.org/division/traffic/traffic.aspx',
    faqs: [
      {
        q: 'Can I contest a Los Angeles County speeding ticket by mail?',
        a: 'Yes. Under Cal. Veh. Code § 40902, eligible infraction citations in LA County can be contested via Form TR-205 (Trial by Written Declaration) without appearing in court.'
      },
      {
        q: 'Does an LA County speeding point cost me my Good Driver Discount?',
        a: 'Yes. Under California Prop 103, a single moving-violation point removes your mandatory 20% Good Driver Discount for 36 months unless dismissed or masked via Traffic School.'
      }
    ]
  },
  {
    slug: 'orange-county-ca',
    courtName: 'Orange County Superior Court (Central / Harbor / North)',
    county: 'Orange County',
    stateAbbr: 'CA',
    stateName: 'California',
    statute: 'Cal. Veh. Code § 40902 & § 40802 (Speed Trap Law)',
    writtenContestMethod: 'Trial by Written Declaration (TR-205) + Speed Survey Discovery',
    typicalFineRange: '$238 – $480+',
    threeYrInsuranceImpact: '$1,600 – $2,750 (36-Month Insurer Surcharge)',
    localProcedureTip:
      'On Orange County arterial roads (Irvine, Newport Beach, Costa Mesa), request the city’s Engineering & Traffic Survey (ETS) under CVC § 40802—expired surveys (>5–7 yrs) bar radar evidence.',
    portalUrl: 'https://www.occourts.org/self-help/traffic/',
    faqs: [
      {
        q: 'What is the California Speed Trap defense in Orange County?',
        a: 'Under CVC § 40802, radar/LiDAR speed enforcement on non-freeway arterials requires a valid Engineering & Traffic Survey within 5 to 7 years. Missing or expired surveys render the radar evidence inadmissible.'
      },
      {
        q: 'If I lose TR-205 in Orange County, can I still request Traffic School?',
        a: 'Yes, you may request a Trial de Novo within 20 days of an adverse TR-205 ruling and ask the judge for Traffic School if eligible.'
      }
    ]
  },
  {
    slug: 'harris-county-houston-tx',
    courtName: 'Houston Municipal & Harris County Justice Courts',
    county: 'Harris County',
    stateAbbr: 'TX',
    stateName: 'Texas',
    statute: 'Tex. Code Crim. Proc. Art. 45.0511 (DSC) & Art. 45.051 (Deferred)',
    writtenContestMethod: 'Driving Safety Course (DSC) or Deferred Disposition Request',
    typicalFineRange: '$185 – $330',
    threeYrInsuranceImpact: '$1,250 – $2,200 (Avoided via DSC / Deferred Dismissal)',
    localProcedureTip:
      'Even though Texas repealed Driver Responsibility surcharges, insurers still rate moving-violation convictions. Always elect Art. 45.0511 DSC or Deferred Disposition before your plea deadline.',
    portalUrl: 'https://www.houstontx.gov/courts/',
    faqs: [
      {
        q: 'Does paying a Houston speeding ticket raise my Texas auto insurance?',
        a: 'Yes. Paying the ticket enters a conviction on your DPS record, which insurers use to apply 15%–28% surcharges for 36 months. Completing DSC or Deferred Disposition keeps it off your record.'
      },
      {
        q: 'When am I ineligible for Texas DSC in Harris County?',
        a: 'Drivers cited for 25+ mph over the limit, 95+ mph total, construction-zone violations with workers present, or CDL holders are barred from Art. 45.0511 DSC.'
      }
    ]
  },
  {
    slug: 'miami-dade-county-fl',
    courtName: 'Miami-Dade County Clerk of Courts (Traffic Division)',
    county: 'Miami-Dade County',
    stateAbbr: 'FL',
    stateName: 'Florida',
    statute: 'Fla. Stat. § 318.14(9) (Traffic School) & § 318.14(10) (Withhold)',
    writtenContestMethod: '30-Day Not-Guilty Election / Basic Driver Improvement (BDI)',
    typicalFineRange: '$166 – $356',
    threeYrInsuranceImpact: '$1,550 – $2,700 (Florida 3-4 Pt Surcharge)',
    localProcedureTip:
      'You must elect Traffic School (BDI) or contest within 30 calendar days of citation issuance. Paying without electing BDI assesses 3–4 DHSMV points automatically.',
    portalUrl: 'https://www.miamidadeclerk.gov/clerk/traffic-citations.page',
    faqs: [
      {
        q: 'How many days do I have to respond to a Miami-Dade traffic ticket?',
        a: 'Under Fla. Stat. § 318.14, you have 30 calendar days from the citation date to pay, elect Basic Driver Improvement (BDI), or request a hearing.'
      },
      {
        q: 'Can I get points withheld without Traffic School in Miami-Dade?',
        a: 'A hearing officer or judge may grant a "Withhold of Adjudication" (0 points) in court, saving your 1-in-12-months / 5-lifetime BDI election.'
      }
    ]
  },
  {
    slug: 'wake-mecklenburg-nc',
    courtName: 'Wake & Mecklenburg County District Courts (Traffic)',
    county: 'Wake & Mecklenburg Counties',
    stateAbbr: 'NC',
    stateName: 'North Carolina',
    statute: 'N.C.G.S. § 58-36-65 (SDIP) & § 20-141',
    writtenContestMethod: 'Prayer for Judgment Continued (PJC) or Improper Equipment Reduction',
    typicalFineRange: '$210 – $315',
    threeYrInsuranceImpact: '$1,900 – $3,400 (+30% to +45% Mandatory NC SDIP Hike)',
    localProcedureTip:
      'North Carolina’s SDIP triggers a mandatory +30% insurance hike for 1 point and +45% for 2 points! Never pay online—seek a reduction to Improper Equipment (§ 20-141) or use a household PJC.',
    portalUrl: 'https://www.nccourts.gov/help-topics/traffic-and-vehicles',
    faqs: [
      {
        q: 'Why should I never pay a Wake or Mecklenburg County speeding ticket online?',
        a: 'Paying online pleads guilty and triggers North Carolina’s mandatory Safe Driver Incentive Plan (SDIP) surcharge (+30% to +45% for 36 months). Reducing to Improper Equipment (0 SDIP points) avoids the hike.'
      },
      {
        q: 'How often can my household use a PJC in North Carolina?',
        a: 'For insurance purposes under N.C.G.S. § 58-36-65, only one PJC per household every 3 years avoids SDIP points; a second PJC in the same 3-year window triggers full points.'
      }
    ]
  }
];
