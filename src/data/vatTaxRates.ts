export interface CountryVatRate {
  name: string;
  slug: string;
  code: string;
  currency: string;
  symbol: string;
  rate: number; // standard rate %
  type: 'VAT' | 'GST';
  aboutText: string[];
  cities: { name: string; rate: number }[];
  useCases: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const VAT_COUNTRY_RATES: CountryVatRate[] = [
  {
    name: 'United Kingdom',
    slug: 'united-kingdom',
    code: 'GB',
    currency: 'GBP',
    symbol: '£',
    rate: 20,
    type: 'VAT',
    aboutText: [
      'The standard Value Added Tax (VAT) rate in the United Kingdom is 20%. Governed by the Value Added Tax Act 1994 (VATA 1994) and administered by HM Revenue and Customs (HMRC), retail pricing in the UK is statutory required to be displayed inclusive of VAT, meaning the shelf price is the final amount payable.',
      'To extract the VAT component from a gross UK receipt, businesses use the statutory "VAT Fraction." For the standard 20% rate, the VAT fraction is 1/6 (20/120). Multiplying any gross total by 1/6 isolates the exact VAT amount, while dividing by 1.20 determines the net price before tax. For the 5% reduced rate, the VAT fraction is 1/21 (5/105).',
      'For VAT-registered UK businesses and sole traders filing quarterly returns on HMRC Making Tax Digital (MTD), separating input tax (VAT paid on business purchases, claimed in Box 4) from output tax (VAT charged on sales, recorded in Box 1) is mandatory to establish net VAT due (Box 5).',
      'Under the UK Domestic Reverse Charge (DRC) for construction services (VATA 1994 Section 55A), standard B2B construction subcontractors do not charge VAT to VAT-registered contractors; instead, the customer accounts for the VAT directly on their own HMRC return to combat missing-trader fraud.'
    ],
    cities: [
      { name: 'London', rate: 20 },
      { name: 'Birmingham', rate: 20 },
      { name: 'Manchester', rate: 20 },
      { name: 'Glasgow', rate: 20 },
      { name: 'Edinburgh', rate: 20 },
      { name: 'Belfast', rate: 20 }
    ],
    useCases: [
      {
        title: 'HMRC VAT Return Preparation',
        description: 'Sole traders and VAT-registered UK businesses use this calculator to quickly back out the 20% VAT portion from expense receipts and supplier invoices, ensuring quarterly Making Tax Digital (MTD) returns are mathematically accurate.'
      },
      {
        title: 'Input Tax Reclaims (Box 4)',
        description: 'Easily calculate deductible input VAT on fuel, office equipment, software subscriptions, and commercial purchases.'
      }
    ],
    faqs: [
      {
        question: 'How do I remove 20% UK VAT from a price?',
        answer: 'To remove the standard 20% UK VAT, divide the total inclusive price by 1.20. For example: £240.00 total paid ÷ 1.20 equals £200.00 ex-VAT price. The VAT component is exactly £40.00 (or calculated directly via the statutory VAT fraction: £240.00 × 1/6 = £40.00).'
      },
      {
        question: 'What is the VAT fraction for 20% in the UK?',
        answer: 'The UK VAT fraction for the standard 20% rate is 1/6 (derived from 20 / (100 + 20) = 20/120 = 1/6). To find the VAT included in any gross price, simply divide the gross amount by 6. For example, £60 gross ÷ 6 = £10 VAT, leaving £50 net.'
      },
      {
        question: 'What is the UK Domestic Reverse Charge (DRC)?',
        answer: 'The Domestic Reverse Charge (Section 55A VATA 1994) applies to specified supplies of construction services reported under the Construction Industry Scheme (CIS). Under the DRC, the customer—rather than the supplier—accounts for the VAT directly on their HMRC VAT return, eliminating the risk of subcontractor supply-chain fraud.'
      },
      {
        question: 'What items are zero-rated or exempt from UK VAT?',
        answer: 'Under UK law, most staple groceries, books, newspapers, children\'s clothing and footwear, and public passenger transport are zero-rated (0% VAT). Domestic electricity and gas, child car seats, and mobility aids carry a reduced 5% rate. Financial services, postal services, and residential property rentals are statutory exempt.'
      },
      {
        question: 'What is the VAT rate in London and regional cities?',
        answer: 'The standard VAT rate is 20% uniformly throughout the entire United Kingdom. There are no additional regional, county, or municipal sales taxes in London, Manchester, Edinburgh, Cardiff, or Belfast.'
      }
    ]
  },
  {
    name: 'Germany',
    slug: 'germany',
    code: 'DE',
    currency: 'EUR',
    symbol: '€',
    rate: 19,
    type: 'VAT',
    aboutText: [
      'Germany charges standard Value Added Tax (known as Mehrwertsteuer - MwSt or Umsatzsteuer - USt) at a rate of 19% under § 12 Abs. 1 of the German VAT Act (Umsatzsteuergesetz - UStG). A reduced rate of 7% under § 12 Abs. 2 UStG applies to basic groceries, books, periodicals, public passenger transit, and hotel accommodations.',
      'Reversing the German MwSt at 19% requires dividing the gross invoice price by 1.19. This isolates the net price (Nettobetrag) from the tax component (Steuerbetrag), which is essential for German businesses filing advance VAT returns (Umsatzsteuer-Voranmeldung) via the ELSTER portal.',
      'Under the German reverse-charge procedure (§ 13b UStG - Steuerschuldnerschaft des Leistungsempfängers), liability for VAT shifts from the seller to the recipient for specific domestic transactions (such as construction services and scrap metal) and cross-border B2B supplies under EU Directive 2006/112/EC.',
      'The MwSt rate is federal and completely uniform across all 16 German federal states (Bundesländer) and cities including Berlin, Munich, Hamburg, and Frankfurt, with zero municipal surcharges.'
    ],
    cities: [
      { name: 'Berlin', rate: 19 },
      { name: 'Munich', rate: 19 },
      { name: 'Hamburg', rate: 19 },
      { name: 'Frankfurt', rate: 19 },
      { name: 'Cologne', rate: 19 },
      { name: 'Stuttgart', rate: 19 }
    ],
    useCases: [
      {
        title: 'Umsatzsteuer-Voranmeldung Preparation',
        description: 'German businesses and freelancers (Freiberufler) use this calculator to separate input tax (Vorsteuer) from gross expenses to accurately claim tax credits on monthly and quarterly ELSTER declarations.'
      },
      {
        title: 'Vendor Invoice Auditing',
        description: 'Verify statutory § 14 UStG invoice requirements by recalculating net amounts from gross receipts received from suppliers.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate net price from gross MwSt in Germany?',
        answer: 'To find the net price before 19% MwSt in Germany, divide the gross total price by 1.19. For example, a gross total of €119.00 divided by 1.19 equals €100.00 net price. The MwSt is €19.00.'
      },
      {
        question: 'How do I calculate net price for 7% reduced MwSt in Germany?',
        answer: 'For goods taxed at the 7% reduced rate (groceries, books, hotels), divide the gross total by 1.07. For example: €107.00 gross ÷ 1.07 = €100.00 net price, with €7.00 MwSt.'
      },
      {
        question: 'What is the § 13b UStG reverse-charge procedure in Germany?',
        answer: 'Section 13b of the Umsatzsteuergesetz (UStG) governs the reverse-charge mechanism in Germany. When a foreign company performs B2B services in Germany, or when domestic construction companies bill other builders, the tax liability shifts to the corporate buyer. The recipient declares both the output tax and the corresponding input tax (Vorsteuerabzug) simultaneously.'
      },
      {
        question: 'What is the German Kleinunternehmer exemption?',
        answer: 'Under § 19 UStG (Kleinunternehmerregelung), small businesses with prior-year revenues below €22,000 (raised to €25,000) and current-year projected revenues below €50,000 (raised to €100,000) can elect not to charge MwSt on invoices. However, they cannot reclaim input tax (Vorsteuer).'
      }
    ]
  },
  {
    name: 'France',
    slug: 'france',
    code: 'FR',
    currency: 'EUR',
    symbol: '€',
    rate: 20,
    type: 'VAT',
    aboutText: [
      'France charges standard Value Added Tax (Taxe sur la valeur ajoutée - TVA) at a rate of 20%. Reduced TVA rates of 10%, 5.5%, and 2.1% apply to specific categories like restaurant food, books, medicines, and essential groceries.',
      'In France, consumer prices are displayed TVA-inclusive (TTC - Toutes taxes comprises). Businesses deduct TVA using the reverse tax formula to find the net price (HT - Hors taxe) and recover input TVA (TVA déductible).',
      'French TVA is uniform across Paris, Lyon, Marseille, and all other mainland regions.'
    ],
    cities: [
      { name: 'Paris', rate: 20 },
      { name: 'Marseille', rate: 20 },
      { name: 'Lyon', rate: 20 }
    ],
    useCases: [
      {
        title: 'HT Price Finder',
        description: 'Separate French TVA from TTC receipts to isolate the HT base price, allowing proper accounting for business expenditure lines.'
      }
    ],
    faqs: [
      {
        question: 'How do I convert TTC to HT in France?',
        answer: 'To convert TTC (inclusive price) to HT (pre-tax price) under the standard 20% TVA rate, divide the TTC amount by 1.20. For example: €120.00 TTC / 1.20 equals €100.00 HT. The TVA is €20.00.'
      }
    ]
  },
  {
    name: 'Italy',
    slug: 'italy',
    code: 'IT',
    currency: 'EUR',
    symbol: '€',
    rate: 22,
    type: 'VAT',
    aboutText: [
      'Italy charges standard Value Added Tax (Imposta sul Valore Aggiunto - IVA) at a rate of 22%. Reduced rates of 10%, 5%, and 4% apply to tourism services, specific agricultural products, and basic foodstuffs.',
      'To reverse calculate the 22% Italian IVA, divide the gross total price by 1.22. This is essential for Italian businesses submitting quarterly IVA statements.'
    ],
    cities: [
      { name: 'Rome', rate: 22 },
      { name: 'Milan', rate: 22 },
      { name: 'Naples', rate: 22 }
    ],
    useCases: [
      {
        title: 'Italian IVA Reclaims',
        description: 'Isolate the 22% IVA paid on business expenses from receipt totals to claim deductions in corporate tax records.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate ex-IVA price in Italy?',
        answer: 'Divide the gross total price by 1.22. A total of €244.00 divided by 1.22 equals €200.00 net price before IVA. The tax component is €44.00.'
      }
    ]
  },
  {
    name: 'Spain',
    slug: 'spain',
    code: 'ES',
    currency: 'EUR',
    symbol: '€',
    rate: 21,
    type: 'VAT',
    aboutText: [
      'Spain charges standard Value Added Tax (Impuesto sobre el Valor Añadido - IVA) at a rate of 21%. Reduced IVA rates of 10% and 4% apply to transport, hotel rooms, and basic groceries.',
      'Spain\'s IVA is uniform across Madrid, Barcelona, Valencia, and the mainland regions. Canary Islands are an exception, charging a local IGIC tax instead.'
    ],
    cities: [
      { name: 'Madrid', rate: 21 },
      { name: 'Barcelona', rate: 21 },
      { name: 'Valencia', rate: 21 }
    ],
    useCases: [
      {
        title: 'Spanish IVA auditing',
        description: 'Isolate the 21% IVA from invoice totals to check billing accuracy and submit declarations to the Spanish Tax Agency (AEAT).'
      }
    ],
    faqs: [
      {
        question: 'How do I remove 21% IVA in Spain?',
        answer: 'Divide the gross price by 1.21. For example, €121.00 divided by 1.21 is €100.00 net base. The IVA amount is exactly €21.00.'
      }
    ]
  },
  {
    name: 'Australia',
    slug: 'australia',
    code: 'AU',
    currency: 'AUD',
    symbol: '$',
    rate: 10,
    type: 'GST',
    aboutText: [
      'Australia charges a Goods and Services Tax (GST) at a flat rate of 10%. In Australia, retail pricing displays inclusive of GST.',
      'For Australian businesses, isolating the 10% GST paid on purchases is required to prepare Business Activity Statements (BAS) and claim input tax credits.'
    ],
    cities: [
      { name: 'Sydney', rate: 10 },
      { name: 'Melbourne', rate: 10 },
      { name: 'Brisbane', rate: 10 },
      { name: 'Perth', rate: 10 }
    ],
    useCases: [
      {
        title: 'BAS Preparation',
        description: 'Australian entities use the 10% reverse calculator to separate GST paid from totals, facilitating fast BAS filings to the ATO.'
      }
    ],
    faqs: [
      {
        question: 'How do I reverse calculate GST in Australia?',
        answer: 'Divide the total GST-inclusive price by 1.10. For example: $110.00 total paid divided by 1.10 equals $100.00 pre-tax. The GST paid is $10.00.'
      }
    ]
  },
  {
    name: 'New Zealand',
    slug: 'new-zealand',
    code: 'NZ',
    currency: 'NZD',
    symbol: '$',
    rate: 15,
    type: 'GST',
    aboutText: [
      'New Zealand charges a Goods and Services Tax (GST) of 15% on almost all purchases. Prices are displayed inclusive of GST.',
      'To reverse calculate the 15% NZ GST, divide the total by 1.15. This separates the pre-GST cost from the tax for Inland Revenue (IRD) returns.'
    ],
    cities: [
      { name: 'Auckland', rate: 15 },
      { name: 'Wellington', rate: 15 },
      { name: 'Christchurch', rate: 15 }
    ],
    useCases: [
      {
        title: 'NZ GST bookkeeping',
        description: 'Extract the 15% GST component from invoice totals to reconcile company expense claims.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate NZ price before GST?',
        answer: 'Divide the total paid by 1.15. A gross total of $115.00 divided by 1.15 is $100.00 base price. The GST component is $15.00.'
      }
    ]
  }
];

export function getVatCountryBySlug(slug: string): CountryVatRate | undefined {
  return VAT_COUNTRY_RATES.find((c) => c.slug === slug.toLowerCase());
}
