export interface ITCGuide {
  eligibleTax: string;
  craForm: string;
  taxRecoveryRate: string;
  rules: string[];
  mathExample: string;
}

export interface ProvinceRate {
  name: string;
  slug: string;
  abbr: string;
  gst: number;
  pst: number;
  hst: number;
  rate: number; // combined rate %
  type: 'GST' | 'HST' | 'GST+PST' | 'GST+QST';
  aboutText: string[];
  cities: { name: string; rate: number }[];
  useCases: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  itcGuide: ITCGuide;
}

export function getITCGuide(prov: Omit<ProvinceRate, 'itcGuide'>): ITCGuide {
  if (prov.type === 'HST') {
    return {
      eligibleTax: `${prov.rate}% Harmonized Sales Tax (HST)`,
      craForm: 'CRA Form GST34-2 (Line 106 / Line 108 Input Tax Credits)',
      taxRecoveryRate: `100% of the ${prov.rate}% HST paid is eligible for commercial ITC recovery`,
      rules: [
        `Under CRA statutory guidelines, GST/HST-registered businesses in ${prov.name} can recover 100% of the ${prov.rate}% HST paid on eligible commercial purchases and operating expenses.`,
        `Statutory Reverse Formula: Pre-Tax Amount = Total Paid ÷ ${(1 + prov.rate / 100).toFixed(2)}. Claimable ITC = Total Paid - Pre-Tax Amount.`,
        `CRA Documentary Requirements: Invoices exceeding $30 must clearly state the supplier's 9-digit Business Number (BN / GST/HST registration number), transaction date, and total paid. Invoices over $150 require the buyer's business name and itemized tax breakdown.`,
        `Time Limit: Eligible ITCs can generally be claimed within 4 years from the due date of the return for the reporting period in which the purchase was made.`,
      ],
      mathExample: `For a $${(100 * (1 + prov.rate / 100)).toFixed(2)} tax-inclusive receipt in ${prov.name}: Divide $${(100 * (1 + prov.rate / 100)).toFixed(2)} by ${(1 + prov.rate / 100).toFixed(2)} to find your $100.00 pre-tax operating expense. The remaining $${prov.rate.toFixed(2)} is your exact claimable Input Tax Credit entered on CRA Line 106.`,
    };
  }

  if (prov.type === 'GST+QST') {
    return {
      eligibleTax: '5% Federal GST + 9.975% Quebec Sales Tax (QST / TVQ)',
      craForm: 'Dual Filing: CRA Form GST34 (Line 106) for GST & Revenu Québec Form VD-358 (Line 207) for QST ITR',
      taxRecoveryRate: '5% GST recovered via CRA ITC; 9.975% QST recovered via Revenu Québec Input Tax Refund (ITR)',
      rules: [
        'Businesses registered with Revenu Québec must separately track and report the 5% federal GST and 9.975% provincial QST components.',
        'Statutory Reverse Formula: Pre-Tax Amount = Total Paid ÷ 1.14975. Federal GST ITC = Pre-Tax × 0.05. Provincial QST ITR = Pre-Tax × 0.09975.',
        'Documentary Requirements: Invoices must display the supplier’s 9-digit federal Business Number and the 10-digit Revenu Québec QST identification number (TQ followed by numbers).',
        'Large Business Restrictions: Large businesses in Quebec are subject to specific ITR recapture rules on certain road vehicles and telecommunications.',
      ],
      mathExample: 'For a $114.98 receipt in Quebec: Divide by 1.14975 to isolate the $100.00 net business expense. You claim $5.00 GST on CRA Line 106 and $9.98 QST on Revenu Québec Line 207 as an Input Tax Refund.',
    };
  }

  if (prov.type === 'GST+PST') {
    return {
      eligibleTax: `5% Federal GST component only (${prov.pst}% provincial PST is expensed)`,
      craForm: 'CRA Form GST34 (Line 106 / Line 108 Input Tax Credits)',
      taxRecoveryRate: '5% Federal GST is 100% ITC recoverable; provincial PST is expensed on corporate tax filings',
      rules: [
        `In ${prov.name}, only the 5% federal GST portion qualifies for CRA Input Tax Credits. The ${prov.pst}% provincial PST does not qualify for an ITC because PST is a single-incident consumer tax.`,
        `Accounting Treatment: The ${prov.pst}% PST paid on business inputs must be capitalized or expensed as an operating cost on your financial statements (T2 or T2125), rather than claimed as an input tax credit.`,
        `Statutory Reverse Formula: Pre-Tax Base = Total Paid ÷ ${(1 + prov.rate / 100).toFixed(2)}. Claimable Federal GST ITC = Pre-Tax Base × 0.05. PST Expense = Pre-Tax Base × ${(prov.pst / 100).toFixed(2)}.`,
        'Documentary Requirements: Vendor receipts must display their 9-digit GST registration number and show either the GST amount separately or state that GST is included.',
      ],
      mathExample: `For a $${(100 * (1 + prov.rate / 100)).toFixed(2)} tax-inclusive receipt in ${prov.name}: Divide by ${(1 + prov.rate / 100).toFixed(2)} to find the $100.00 pre-tax cost. Claim $5.00 federal GST as an ITC on Line 106. The remaining $${prov.pst.toFixed(2)} is recorded as provincial tax expense.`,
    };
  }

  // GST only (Alberta, NWT, Nunavut, Yukon)
  return {
    eligibleTax: '5% Federal Goods and Services Tax (GST)',
    craForm: 'CRA Form GST34 (Line 106 / Line 108 Input Tax Credits)',
    taxRecoveryRate: '100% of the 5% GST paid is eligible for commercial ITC recovery',
    rules: [
      `Because ${prov.name} levies no provincial sales tax, 100% of the sales tax charged on business purchases is the 5% federal GST.`,
      'Statutory Reverse Formula: Pre-Tax Base = Total Paid ÷ 1.05. Claimable GST ITC = Total Paid - Pre-Tax Base (or Total Paid × 5/105).',
      'CRA Documentary Requirements: Retain receipts with the supplier’s 9-digit Business Number (BN) and transaction date to substantiate your ITC claims during CRA compliance audits.',
      'Small Supplier Exemption: Businesses with annual taxable worldwide sales below $30,000 are not required to register for GST, but registering voluntarily allows claiming ITCs on all startup and operating costs.',
    ],
    mathExample: `For a $105.00 receipt in ${prov.name}: Divide $105.00 by 1.05 = $100.00 net business expense. The remaining $5.00 is claimed as an Input Tax Credit on CRA Line 106.`,
  };
}

const RAW_PROV_TAX_RATES: Omit<ProvinceRate, 'itcGuide'>[] = [
  {
    name: 'Ontario',
    slug: 'ontario',
    abbr: 'ON',
    gst: 0,
    pst: 0,
    hst: 13,
    rate: 13,
    type: 'HST',
    aboutText: [
      'Ontario uses the Harmonized Sales Tax (HST) at a rate of 13%. This single blended rate combines the federal Goods and Services Tax (GST) of 5% and a provincial sales tax component of 8%. The HST is administered by the Canada Revenue Agency (CRA).',
      'Because Ontario uses a harmonized tax system, the rate is uniform across the entire province. Unlike the United States, there are no city-level or county-level sales taxes in Ontario. Whether you buy an item in Toronto, Ottawa, Mississauga, or Hamilton, you pay the same 13% HST rate.',
      'Reversing the 13% Ontario HST requires dividing the total price by 1.13. This isolates the pre-tax price from the tax paid, which is essential for businesses claiming Input Tax Credits (ITCs) on their corporate tax returns.'
    ],
    cities: [
      { name: 'Toronto', rate: 13 },
      { name: 'Ottawa', rate: 13 },
      { name: 'Mississauga', rate: 13 },
      { name: 'Hamilton', rate: 13 },
      { name: 'Brampton', rate: 13 }
    ],
    useCases: [
      {
        title: 'Business Expense Reclaims',
        description: 'Under CRA guidelines, Ontario businesses can claim an Input Tax Credit (ITC) for the 13% HST paid on eligible operational expenditures. The calculator helps you extract the exact HST component from transaction totals.'
      },
      {
        title: 'Contractor Billing',
        description: 'Ontario independent contractors and freelancers frequently quote flat, tax-inclusive prices to clients. Use this calculator to separate your actual service income from the collected tax that must be remitted.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate price before 13% HST in Ontario?',
        answer: 'To find the pre-tax price in Ontario, divide the gross tax-inclusive price by 1.13. For example: $226.00 total paid divided by 1.13 equals $200.00 base price. The HST paid is $26.00.'
      },
      {
        question: 'Are there local city sales taxes in Toronto or Ottawa?',
        answer: 'No. Canadian sales taxes are levied strictly at the federal and provincial levels. There are no additional municipality, county, or city sales taxes in Toronto, Ottawa, or any other city in Ontario.'
      }
    ]
  },
  {
    name: 'Quebec',
    slug: 'quebec',
    abbr: 'QC',
    gst: 5,
    pst: 9.975,
    hst: 0,
    rate: 14.975,
    type: 'GST+QST',
    aboutText: [
      'Quebec charges the federal GST of 5% and a provincial tax known as QST (Quebec Sales Tax or TVQ - Taxe de vente du Québec) at a rate of 9.975%. The combined effective sales tax rate in Quebec is 14.975%.',
      'The QST is administered by Revenu Québec on behalf of both the provincial and federal governments. Unlike other provinces, QST is calculated on the pre-tax base price, and then the GST is also calculated on the base price, bringing the combined total multiplier to exactly 1.14975.',
      'There are no municipal sales taxes in Montreal, Quebec City, or Laval. The rate is uniform across the entire province.'
    ],
    cities: [
      { name: 'Montreal', rate: 14.975 },
      { name: 'Quebec City', rate: 14.975 },
      { name: 'Laval', rate: 14.975 },
      { name: 'Gatineau', rate: 14.975 }
    ],
    useCases: [
      {
        title: 'Revenu Québec Reconciliations',
        description: 'Businesses operating in Quebec must report QST (TVQ) and GST separately. If you have only all-inclusive receipt totals, our tool splits the two tax items with exact precision.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate reverse sales tax in Quebec?',
        answer: 'To remove Quebec sales tax, divide your total paid by 1.14975. For example, if you paid $114.98 total: $114.98 / 1.14975 equals $100.00 pre-tax price. The tax paid consists of $5.00 GST and $9.98 QST.'
      },
      {
        question: 'What is the TVQ rate in Quebec?',
        answer: 'TVQ (Taxe de vente du Québec) is the French term for QST. The rate is 9.975% and it applies to most goods and services alongside the 5% federal GST.'
      }
    ]
  },
  {
    name: 'British Columbia',
    slug: 'british-columbia',
    abbr: 'BC',
    gst: 5,
    pst: 7,
    hst: 0,
    rate: 12,
    type: 'GST+PST',
    aboutText: [
      'British Columbia charges a combined sales tax rate of 12%. This consists of the 5% federal GST (Goods and Services Tax) and a separate 7% Provincial Sales Tax (PST).',
      'BC briefly used the harmonized HST system but reverted to the separate GST and PST model. PST and GST are calculated independently on the base price. The combined multiplier is 1.12.',
      'There are no city sales taxes in Vancouver, Victoria, or Kelowna. The combined rate is 12% province-wide, though certain items like passenger vehicles and accommodation can carry custom PST surcharges.'
    ],
    cities: [
      { name: 'Vancouver', rate: 12 },
      { name: 'Victoria', rate: 12 },
      { name: 'Surrey', rate: 12 },
      { name: 'Burnaby', rate: 12 }
    ],
    useCases: [
      {
        title: 'PST Auditing',
        description: 'Unlike GST, PST is not generally claimable as an input tax credit for most businesses in BC. Accountants use our tool to separate the deductible GST component from the non-deductible provincial PST.'
      }
    ],
    faqs: [
      {
        question: 'How do I reverse calculate GST and PST in British Columbia?',
        answer: 'To remove the combined tax in BC, divide the total paid by 1.12. For example, if your checkout total is $112.00: $112.00 / 1.12 equals $100.00 base. The tax consists of $5.00 GST (federal) and $7.00 PST (provincial).'
      }
    ]
  },
  {
    name: 'Alberta',
    slug: 'alberta',
    abbr: 'AB',
    gst: 5,
    pst: 0,
    hst: 0,
    rate: 5,
    type: 'GST',
    aboutText: [
      'Alberta is unique among Canadian provinces as it does not charge a provincial sales tax (PST). Shoppers and businesses in Alberta only pay the federal Goods and Services Tax (GST) of 5%.',
      'As a result, the combined tax rate is 5% in Calgary, Edmonton, Red Deer, and throughout the province. Reversing Alberta sales tax is as simple as dividing the total by 1.05.'
    ],
    cities: [
      { name: 'Calgary', rate: 5 },
      { name: 'Edmonton', rate: 5 },
      { name: 'Red Deer', rate: 5 }
    ],
    useCases: [
      {
        title: 'GST-Only bookkeeping',
        description: 'Alberta operations are straightforward. Bookkeepers easily isolate the 5% GST component to claim Input Tax Credits from the federal government.'
      }
    ],
    faqs: [
      {
        question: 'How do I remove GST in Alberta?',
        answer: 'To find the price before GST in Alberta, divide your final price by 1.05. For example, a receipt total of $105.00 divided by 1.05 is $100.00. The GST component is exactly $5.00.'
      }
    ]
  },
  {
    name: 'Manitoba',
    slug: 'manitoba',
    abbr: 'MB',
    gst: 5,
    pst: 7,
    hst: 0,
    rate: 12,
    type: 'GST+PST',
    aboutText: [
      'Manitoba levies a combined sales tax rate of 12%, which includes the federal GST of 5% and a provincial tax known as Retail Sales Tax (RST) at 7%.',
      'The Retail Sales Tax is administered by Manitoba Finance. Both taxes are calculated on the pre-tax price. The rate is uniform across Winnipeg, Brandon, and all other municipalities.'
    ],
    cities: [
      { name: 'Winnipeg', rate: 12 },
      { name: 'Brandon', rate: 12 }
    ],
    useCases: [
      {
        title: 'Manitoba RST reporting',
        description: 'Businesses must separate the 7% RST from the 5% GST. GST can be recovered as an Input Tax Credit, while RST is recorded as an operational expense.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate price before tax in Manitoba?',
        answer: 'Divide the total paid by 1.12. For example, a total of $224.00 divided by 1.12 equals $200.00 pre-tax. The GST paid is $10.00 and the RST paid is $14.00.'
      }
    ]
  },
  {
    name: 'Saskatchewan',
    slug: 'saskatchewan',
    abbr: 'SK',
    gst: 5,
    pst: 6,
    hst: 0,
    rate: 11,
    type: 'GST+PST',
    aboutText: [
      'Saskatchewan levies a combined rate of 11%, consisting of the 5% federal GST and a 6% Provincial Sales Tax (PST).',
      'The provincial PST is managed by the Saskatchewan Ministry of Finance. The tax rate is uniform across Regina, Saskatoon, and Prince Albert.'
    ],
    cities: [
      { name: 'Saskatoon', rate: 11 },
      { name: 'Regina', rate: 11 }
    ],
    useCases: [
      {
        title: 'Saskatchewan PST audits',
        description: 'Businesses use the calculator to extract the 6% PST component from vendor invoices, facilitating proper recording of Saskatchewan provincial tax.'
      }
    ],
    faqs: [
      {
        question: 'How do I remove sales tax in Saskatchewan?',
        answer: 'Divide the gross total by 1.11. For example, a receipt total of $111.00 divided by 1.11 is $100.00. The sales tax paid includes $5.00 GST and $6.00 PST.'
      }
    ]
  },
  {
    name: 'Nova Scotia',
    slug: 'nova-scotia',
    abbr: 'NS',
    gst: 0,
    pst: 0,
    hst: 15,
    rate: 15,
    type: 'HST',
    aboutText: [
      'Nova Scotia has a Harmonized Sales Tax (HST) rate of 15%. This rate combines the 5% federal GST with a 10% provincial component.',
      'The 15% rate is uniform across Halifax, Sydney, Truro, and all areas of the province. No local municipality taxes exist.'
    ],
    cities: [
      { name: 'Halifax', rate: 15 },
      { name: 'Sydney', rate: 15 }
    ],
    useCases: [
      {
        title: 'HST input credits',
        description: 'Nova Scotia businesses recover the full 15% HST on business expense totals by using the reverse calculation formula.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate price before HST in Nova Scotia?',
        answer: 'To remove the 15% HST in Nova Scotia, divide your total by 1.15. For example: $345.00 divided by 1.15 is $300.00. The HST paid is $45.00.'
      }
    ]
  },
  {
    name: 'New Brunswick',
    slug: 'new-brunswick',
    abbr: 'NB',
    gst: 0,
    pst: 0,
    hst: 15,
    rate: 15,
    type: 'HST',
    aboutText: [
      'New Brunswick charges a Harmonized Sales Tax (HST) rate of 15%. This is a combined federal-provincial tax (5% federal + 10% provincial).',
      'The rate is uniform across Moncton, Saint John, Fredericton, and the rest of the province.'
    ],
    cities: [
      { name: 'Moncton', rate: 15 },
      { name: 'Saint John', rate: 15 },
      { name: 'Fredericton', rate: 15 }
    ],
    useCases: [
      {
        title: 'New Brunswick expense claims',
        description: 'Quickly back out the 15% HST paid from receipt totals when filing monthly corporate expense forms.'
      }
    ],
    faqs: [
      {
        question: 'How do I remove 15% HST in New Brunswick?',
        answer: 'Divide the total by 1.15. A transaction total of $115.00 divided by 1.15 is $100.00. The HST component is $15.00.'
      }
    ]
  },
  {
    name: 'Newfoundland',
    slug: 'newfoundland',
    abbr: 'NL',
    gst: 0,
    pst: 0,
    hst: 15,
    rate: 15,
    type: 'HST',
    aboutText: [
      'Newfoundland and Labrador levies a Harmonized Sales Tax (HST) rate of 15% (combining 5% GST and 10% provincial tax).',
      'The rate applies to St. John&apos;s, Mount Pearl, Corner Brook, and all municipalities across the province.'
    ],
    cities: [
      { name: 'St. John\'s', rate: 15 },
      { name: 'Mount Pearl', rate: 15 }
    ],
    useCases: [
      {
        title: 'NL ledger audits',
        description: 'Separate the harmonized tax component from total invoice amounts to file accurate quarterly returns.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate ex-HST price in Newfoundland?',
        answer: 'Divide the gross price by 1.15. A checkout total of $230.00 divided by 1.15 equals $200.00 base price. The tax paid is $30.00.'
      }
    ]
  },
  {
    name: 'PEI',
    slug: 'pei',
    abbr: 'PE',
    gst: 0,
    pst: 0,
    hst: 15,
    rate: 15,
    type: 'HST',
    aboutText: [
      'Prince Edward Island (PEI) levies a Harmonized Sales Tax (HST) rate of 15%. This rate is pre-loaded into the PEI calculator.',
      'The rate applies uniformly across Charlottetown, Summerside, and the entire island province.'
    ],
    cities: [
      { name: 'Charlottetown', rate: 15 },
      { name: 'Summerside', rate: 15 }
    ],
    useCases: [
      {
        title: 'Island expense reconciliations',
        description: 'Accountants reconcile island transactions by backing out the 15% harmonized tax from the total paid.'
      }
    ],
    faqs: [
      {
        question: 'How do I remove HST in Prince Edward Island?',
        answer: 'Divide the final price by 1.15. For example, $57.50 / 1.15 is $50.00 pre-tax. The HST portion is $7.50.'
      }
    ]
  },
  {
    name: 'Northwest Territories',
    slug: 'northwest-territories',
    abbr: 'NT',
    gst: 5,
    pst: 0,
    hst: 0,
    rate: 5,
    type: 'GST',
    aboutText: [
      'The Northwest Territories charges only the 5% federal Goods and Services Tax (GST). There is no territorial sales tax.',
      'The combined rate is 5% in Yellowknife and across the territory.'
    ],
    cities: [
      { name: 'Yellowknife', rate: 5 }
    ],
    useCases: [
      {
        title: 'Territorial bookkeeping',
        description: 'Easily separate the 5% GST from all invoice totals to claim ITCs on business operations.'
      }
    ],
    faqs: [
      {
        question: 'What is the tax rate in Yellowknife?',
        answer: 'The tax rate in Yellowknife is 5%. This is the federal GST, as there is no territorial sales tax in the Northwest Territories.'
      }
    ]
  },
  {
    name: 'Nunavut',
    slug: 'nunavut',
    abbr: 'NU',
    gst: 5,
    pst: 0,
    hst: 0,
    rate: 5,
    type: 'GST',
    aboutText: [
      'Nunavut does not levy a territorial sales tax. Only the 5% federal GST is charged on taxable goods and services.',
      'The rate is 5% in Iqaluit and all communities in the territory.'
    ],
    cities: [
      { name: 'Iqaluit', rate: 5 }
    ],
    useCases: [
      {
        title: 'GST reclaims in Nunavut',
        description: 'Isolate the 5% GST component from invoices for bookkeeping and tax reclaims.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate tax in Nunavut?',
        answer: 'Divide the total paid by 1.05. A total of $105.00 / 1.05 equals $100.00 pre-tax. The GST paid is $5.00.'
      }
    ]
  },
  {
    name: 'Yukon',
    slug: 'yukon',
    abbr: 'YT',
    gst: 5,
    pst: 0,
    hst: 0,
    rate: 5,
    type: 'GST',
    aboutText: [
      'Yukon charges only the federal Goods and Services Tax (GST) of 5%. There is no territorial sales tax in Yukon.',
      'The rate is 5% in Whitehorse and across the territory.'
    ],
    cities: [
      { name: 'Whitehorse', rate: 5 }
    ],
    useCases: [
      {
        title: 'Yukon ledger accounting',
        description: 'Reconcile purchases by backing out the 5% federal GST component from Yukon transaction totals.'
      }
    ],
    faqs: [
      {
        question: 'What is the tax rate in Whitehorse?',
        answer: 'The tax rate in Whitehorse is 5%. It consists of the federal GST only, with no territorial sales tax charged in Yukon.'
      }
    ]
  }
];

export const CANADA_PROV_TAX_RATES: ProvinceRate[] = RAW_PROV_TAX_RATES.map((p) => ({
  ...p,
  itcGuide: getITCGuide(p),
}));

export function getProvinceBySlug(slug: string): ProvinceRate | undefined {
  return CANADA_PROV_TAX_RATES.find((p) => p.slug === slug.toLowerCase());
}
