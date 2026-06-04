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
      'The standard Value Added Tax (VAT) rate in the United Kingdom is 20%. UK pricing in retail settings is almost always displayed inclusive of VAT, meaning the price you see on the shelf or tag is the final amount you pay.',
      'For UK businesses and sole traders, separating input VAT from expense totals is a daily bookkeeping task required for filing VAT returns to HM Revenue and Customs (HMRC). Reversing the 20% UK VAT involves dividing the total price by 1.20.',
      'Certain items in the UK carry a reduced VAT rate of 5% (like domestic fuel and electricity) or are zero-rated (like children\'s clothes, books, and most food).'
    ],
    cities: [
      { name: 'London', rate: 20 },
      { name: 'Birmingham', rate: 20 },
      { name: 'Manchester', rate: 20 },
      { name: 'Glasgow', rate: 20 }
    ],
    useCases: [
      {
        title: 'HMRC VAT Return prep',
        description: 'Sole traders and VAT-registered UK businesses use this calculator to quickly back out the 20% VAT portion from invoice receipts, ensuring their quarterly returns are mathematically correct.'
      }
    ],
    faqs: [
      {
        question: 'How do I remove 20% UK VAT from a price?',
        answer: 'To remove the standard UK VAT, divide the total inclusive price by 1.20. For example: £240.00 total paid / 1.20 equals £200.00 ex-VAT price. The VAT component is exactly £40.00.'
      },
      {
        question: 'What is the VAT rate in London?',
        answer: 'The standard VAT rate is 20% throughout the entire United Kingdom. There are no additional regional, county, or municipal sales taxes in London, Edinburgh, Belfast, or Cardiff.'
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
      'Germany charges standard Value Added Tax (known as Mehrwertsteuer - MwSt or Umsatzsteuer - USt) at a rate of 19%. A reduced rate of 7% applies to basic foodstuffs, books, public transport, and hotel stays.',
      'Reversing the German MwSt at 19% requires dividing the total price by 1.19. This isolates the net price from the tax component, which is vital for German businesses preparing their monthly or quarterly VAT declarations (Umsatzsteuervoranmeldung).',
      'The MwSt rate is federal and uniform across all German states and cities including Berlin, Munich, Hamburg, and Frankfurt.'
    ],
    cities: [
      { name: 'Berlin', rate: 19 },
      { name: 'Munich', rate: 19 },
      { name: 'Hamburg', rate: 19 },
      { name: 'Frankfurt', rate: 19 }
    ],
    useCases: [
      {
        title: 'MwSt Auditing',
        description: 'German businesses use this calculator to verify MwSt calculations on vendor bills and to accurately record net expenses in their accounting systems.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate net price from gross MwSt in Germany?',
        answer: 'To find the net price before 19% MwSt in Germany, divide the gross total price by 1.19. For example, a gross total of €119.00 divided by 1.19 equals €100.00 net price. The MwSt is €19.00.'
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
  },
  {
    name: 'India',
    slug: 'india',
    code: 'IN',
    currency: 'INR',
    symbol: '₹',
    rate: 18,
    type: 'GST',
    aboutText: [
      'India uses a Goods and Services Tax (GST) system with multiple slabs. The standard tax rate for services and most consumer goods is 18%. Other slabs are 5%, 12%, and 28%.',
      'Our India reverse tax page is pre-loaded with the 18% standard rate. Reversing 18% GST requires dividing the final price by 1.18.'
    ],
    cities: [
      { name: 'Mumbai', rate: 18 },
      { name: 'Delhi', rate: 18 },
      { name: 'Bangalore', rate: 18 }
    ],
    useCases: [
      {
        title: 'GST Input Tax Credit',
        description: 'Indian businesses calculate net purchase prices to claim Input Tax Credit (ITC) on GSTR returns.'
      }
    ],
    faqs: [
      {
        question: 'How do I remove 18% GST in India?',
        answer: 'Divide the final invoice price by 1.18. A gross total of ₹118.00 / 1.18 is ₹100.00 pre-tax. The GST paid is ₹18.00.'
      }
    ]
  }
];

export function getVatCountryBySlug(slug: string): CountryVatRate | undefined {
  return VAT_COUNTRY_RATES.find((c) => c.slug === slug.toLowerCase());
}
