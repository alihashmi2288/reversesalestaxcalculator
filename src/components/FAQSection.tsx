'use client';
import { useState } from 'react';

const FAQ_CATEGORIES = [
  {
    label: 'Basics & How It Works',
    faqs: [
      {
        q: 'What is a reverse sales tax calculator?',
        a: 'A reverse sales tax calculator works backwards from the total price you paid (including tax) to find the original pre-tax price. Instead of adding tax onto a price, it removes the tax to reveal what the item actually cost before tax was applied. This is the exact opposite of a standard sales tax calculator.',
      },
      {
        q: 'What is the formula for reverse sales tax?',
        a: 'The formula is: Original Price = Final Price ÷ (1 + Tax Rate / 100). For example, if you paid $107.50 and the tax rate is 7.5%, the calculation is: $107.50 ÷ 1.075 = $100.00. The tax amount paid was $7.50.',
      },
      {
        q: 'Why do you divide instead of just subtracting the tax percentage?',
        a: "Because sales tax is applied to the pre-tax price, not the final total. If you incorrectly subtract 7.5% from $107.50, you get $107.50 × 0.925 = $99.44 (wrong). The correct method divides: $107.50 ÷ 1.075 = $100.00, then $100.00 × 0.075 = $7.50 tax. Division is the mathematical inverse of multiplication, which is what the original tax calculation performed.",
      },
      {
        q: 'How do I calculate the original price before tax?',
        a: "Step 1: Convert your tax rate to a decimal by dividing by 100 (e.g., 8.5% → 0.085). Step 2: Add 1 to that decimal (1 + 0.085 = 1.085). Step 3: Divide your total price by that number ($115.13 ÷ 1.085 = $106.11 pre-tax price). Or just use our calculator — it does all three steps instantly.",
      },
      {
        q: 'What is the difference between sales tax and VAT?',
        a: "Sales tax in the US is collected only at the final point of sale and paid only by the end consumer. VAT (Value Added Tax), used in Europe and many other countries, is collected at each stage of the supply chain — from manufacturer to wholesaler to retailer. Despite this structural difference, the reverse calculation formula is identical: Price ÷ (1 + rate/100).",
      },
      {
        q: 'Is this calculator free to use?',
        a: 'Yes, completely free, forever. There is no account registration required, no trial period, and no premium tier. All calculations run entirely in your browser — no data is sent to our servers.',
      },
      {
        q: 'Does this calculator work on mobile?',
        a: 'Yes. The calculator is fully responsive and optimized for mobile, tablet, and desktop use. The interface automatically adapts to your screen size.',
      },
    ],
  },
  {
    label: 'US State Sales Tax',
    faqs: [
      {
        q: 'Which US states have no sales tax?',
        a: "Five US states have no state-level general sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Note that some localities within Alaska do charge their own local sales taxes, giving Alaska a small average combined rate of about 1.76%. Delaware, Montana, New Hampshire, and Oregon have 0% at both state and local levels.",
      },
      {
        q: 'Which state has the highest combined sales tax rate?',
        a: 'Louisiana and Tennessee are tied for the highest combined average sales tax rate at 9.55%, followed closely by Arkansas (9.49%), Alabama (9.29%), and Oklahoma (8.99%). These high rates are primarily driven by significant local district taxes added on top of the state base rate.',
      },
      {
        q: 'What is the average US combined sales tax rate?',
        a: 'The average combined US sales tax rate (state base + average local) is approximately 7.53% as of 2026, according to the Tax Foundation. However, this average masks significant variation — from 0% in tax-free states to over 9.5% in high-tax states.',
      },
      {
        q: 'What is a combined sales tax rate?',
        a: "A combined sales tax rate adds the state-level rate and any local (city, county, district) rates together. For example, California's state rate is 7.25%, but local districts add an average of 1.81%, bringing the combined average to 9.06%. Our state calculators use these combined average rates.",
      },
      {
        q: 'Why does my city have a different tax rate than my state?',
        a: "Most US states allow counties and cities to levy their own sales taxes on top of the state rate. For example, while Texas has a 6.25% state rate, Dallas adds local taxes for a combined rate of about 8.25%. The state page rates we show are statewide averages — your specific zip code may differ.",
      },
      {
        q: 'How do I find the exact sales tax rate for my zip code?',
        a: "Our state pages show the average combined rate for each state. For your precise local rate down to the zip code level, visit your state's Department of Revenue website, or use the Sales Tax Institute's lookup tool. Many states also publish rate tables updated quarterly.",
      },
      {
        q: 'Does sales tax apply to online purchases?',
        a: 'After the 2018 Supreme Court ruling in South Dakota v. Wayfair, online retailers are required to collect sales tax if they meet certain economic nexus thresholds in a state — typically $100,000 in annual sales or 200 transactions. As a result, most large online purchases are now subject to your local sales tax rate.',
      },
      {
        q: 'Does sales tax apply to food and groceries?',
        a: "It depends on the state. Most states exempt unprepared groceries from sales tax entirely. However, some states (like Alabama, Mississippi, and South Dakota) tax groceries at the full rate or a reduced rate. Prepared hot foods, restaurant meals, and candy are typically taxable even in states that exempt grocery staples. Always check your specific state's Department of Revenue for current rules.",
      },
      {
        q: 'Is shipping taxable in the US?',
        a: 'This varies by state. Some states (like California) generally exempt separately stated shipping charges. Others (like Texas) tax shipping when it is part of a taxable sale. The safest rule: if the underlying goods are taxable and shipping is bundled with the sale price, assume it is taxable in most states.',
      },
      {
        q: 'Are services subject to sales tax?',
        a: "Generally, US sales taxes apply to the sale of tangible personal property, not services. However, this varies significantly. Hawaii and New Mexico tax almost all services. Washington taxes many B2B services. Most other states have a narrow list of specifically enumerated taxable services. Always verify with the specific state's revenue department.",
      },
    ],
  },
  {
    label: 'Business & Accounting Use',
    faqs: [
      {
        q: 'How do businesses use reverse sales tax calculations?',
        a: 'Businesses use reverse tax calculations constantly for expense reporting (extracting pre-tax costs from receipts), vendor invoice verification (confirming the correct tax was charged), financial statement preparation, input tax credit claims, and sales tax audit support. It is a foundational accounting task.',
      },
      {
        q: 'Can I use this for claiming input tax credits?',
        a: 'Yes. To claim an input tax credit or deduction, you need the pre-tax amount paid, not the total. Our calculator extracts the exact pre-tax cost from any receipt total, making ITC and expense deduction calculations straightforward. For Canadian GST/HST input tax credits specifically, use our dedicated Canada page.',
      },
      {
        q: 'What is the difference between pre-tax and post-tax price?',
        a: "The pre-tax price (also called the 'net price' or 'base price') is what an item costs before any sales tax is added. The post-tax price (or 'gross price') is the final amount you actually pay, including all applicable taxes. Our reverse calculator converts post-tax amounts back to their pre-tax equivalents.",
      },
      {
        q: 'How accurate is this calculator for official tax filings?',
        a: 'Our calculator is mathematically precise — it uses the exact formula required for reverse sales tax calculation. However, for official tax returns, audits, or financial statements, always verify the applicable rate with your state Department of Revenue at the time of filing, as rates can and do change. This tool is for estimation and daily accounting use.',
      },
      {
        q: 'How do e-commerce businesses use reverse tax calculations?',
        a: "E-commerce sellers use reverse tax calculations to audit their sales tax collection systems, verify that customers were charged the correct rate for their location, reconcile marketplace tax withholdings (e.g., Amazon's Marketplace Tax Collection), and prepare state tax remittance reports. If your platform collected $1,092.90 for a product, was that 9.29% on a $1,000 item? Our calculator confirms it instantly.",
      },
      {
        q: 'How do I verify a vendor invoice for correct tax?',
        a: 'Take the total on the invoice, divide it by (1 + expected tax rate/100), and compare the result to the pre-tax line item on the invoice. If they match, the tax was calculated correctly. If not, the vendor may have applied the wrong rate — a common error for out-of-state purchases.',
      },
      {
        q: 'Can I process multiple receipts at once?',
        a: 'Yes — use the Batch/CSV mode available in our main calculator. You can paste or upload a list of total prices (with an associated tax rate), and the tool will calculate the pre-tax price and tax amount for every row simultaneously, saving hours compared to manual calculations.',
      },
    ],
  },
  {
    label: 'Canada (GST, HST, PST, QST)',
    faqs: [
      {
        q: 'What is the difference between GST, HST, PST, and QST in Canada?',
        a: "GST (Goods and Services Tax) is the federal Canadian tax at 5%, applicable everywhere. HST (Harmonized Sales Tax) combines the federal GST and provincial tax into a single rate, used in Ontario (13%), New Brunswick (15%), Nova Scotia (15%), Newfoundland (15%), and Prince Edward Island (15%). PST (Provincial Sales Tax) is a separate provincial tax charged alongside GST in British Columbia (7%), Saskatchewan (6%), and Manitoba (7%). QST (Quebec Sales Tax) is Quebec's unique provincial tax at 9.975%, applied alongside the federal GST.",
      },
      {
        q: 'How do I calculate the price before HST in Ontario?',
        a: "Ontario's HST rate is 13%. Divide the final total by 1.13. Example: $226.00 ÷ 1.13 = $200.00 pre-tax price. The HST amount paid was $26.00.",
      },
      {
        q: 'How do I remove GST from a price in Alberta?',
        a: "Alberta only charges the federal 5% GST with no provincial tax. Divide your total by 1.05. Example: $105.00 ÷ 1.05 = $100.00 pre-tax price.",
      },
      {
        q: 'What is the combined tax rate in Quebec?',
        a: 'Quebec charges the 5% federal GST plus the 9.975% QST. These are not simply added — they are calculated separately and in sequence in Quebec. The effective combined rate is approximately 14.975%, but the precise calculation is: pre-tax price × 1.05 × 1.09975. Our Canada calculator handles this correctly.',
      },
    ],
  },
  {
    label: 'VAT & International',
    faqs: [
      {
        q: 'Can I use this calculator for UK VAT?',
        a: "Yes. The UK standard VAT rate is 20%. Divide your VAT-inclusive price by 1.20 to find the ex-VAT (net) price. Our VAT Calculator page includes specific tools for the UK, EU countries, and Australia's GST.",
      },
      {
        q: 'What is the VAT rate in Germany, France, and other EU countries?',
        a: 'Most EU countries use a standard VAT rate of 19–25%. Germany: 19%. France: 20%. Italy: 22%. Spain: 21%. Sweden: 25%. Reduced rates exist for essential goods like food and books. Our VAT calculator page includes current rates for major EU economies.',
      },
      {
        q: 'How is VAT different from US sales tax for reverse calculations?',
        a: 'The reverse calculation formula is identical regardless of whether it is called sales tax or VAT: Pre-tax price = Total ÷ (1 + rate/100). The math does not change. The only difference is in how the tax is collected and remitted, not in how you reverse it from a final price.',
      },
      {
        q: "What is Australia's GST rate?",
        a: "Australia's Goods and Services Tax (GST) rate is 10%. To find the pre-GST price, divide the total by 1.10. Example: $110.00 ÷ 1.10 = $100.00 pre-tax price.",
      },
    ],
  },
  {
    label: 'Math & Technical Questions',
    faqs: [
      {
        q: 'What is the mathematical proof that division is correct for reverse tax?',
        a: "Forward tax: Post-tax = Pre-tax × (1 + rate/100). To reverse this algebraically: Pre-tax = Post-tax ÷ (1 + rate/100). This is basic algebra — dividing both sides by (1 + rate/100). There is no rounding or approximation involved; division is the exact mathematical inverse of the forward multiplication.",
      },
      {
        q: 'Does the order of rounding matter in tax calculations?',
        a: 'Yes, it can matter by a few cents on large transactions. Tax agencies specify rounding rules (e.g., round to the nearest cent after the final calculation, not after each step). Our calculator applies rounding only at the final display stage to maintain maximum precision throughout the computation.',
      },
      {
        q: 'What if I have multiple tax rates applied (state + city + county)?',
        a: 'Add all applicable rates together first, then divide by (1 + combined rate/100). For example, if state = 6%, county = 1%, city = 0.5%, the combined rate is 7.5%. Divide your total by 1.075. This works because all rates are applied to the same pre-tax base price simultaneously.',
      },
      {
        q: 'Can I calculate sales tax if I only know the tax amount and the total?',
        a: "Yes. If you know the tax amount and the total, the pre-tax price is simply: Total − Tax Amount. The implied tax rate can then be found: Rate = (Tax Amount ÷ Pre-Tax Price) × 100. For example, if total = $107.50 and tax = $7.50, then pre-tax = $100.00 and rate = 7.5%.",
      },
      {
        q: 'Is this calculator accurate for very large amounts (e.g., $1,000,000)?',
        a: 'Yes. The formula scales linearly — the percentage relationship is identical regardless of the amount. $1,000,000 ÷ 1.0906 = $916,559.76 pre-tax, and $916,559.76 × 0.0906 = $83,440.24 tax. Our calculator handles arbitrarily large numbers without precision loss.',
      },
    ],
  },
];

export default function FAQSection() {
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="section-label">FAQ</span>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
          Reverse Sales Tax Calculator FAQ
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto' }}>
          Everything you need to know about reverse sales tax — from the formula to business accounting, US states, Canada, and international VAT.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
        {FAQ_CATEGORIES.map((category, ci) => (
          <div key={ci}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--primary)',
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: '2px solid var(--border)',
            }}>
              {category.label}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {category.faqs.map((faq, fi) => {
                const key = `${ci}-${fi}`;
                const isOpen = openKey === key;
                return (
                  <div key={fi} className="faq-item">
                    <button
                      suppressHydrationWarning
                      className="faq-trigger"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <svg
                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"
                        style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                      >
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                    <div
                      className="faq-content"
                      style={{
                        display: isOpen ? 'block' : 'none',
                        marginTop: 16,
                        paddingTop: 16,
                        borderTop: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.75,
                        fontSize: 15,
                      }}
                      aria-hidden={!isOpen}
                    >
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { FAQ_CATEGORIES };
