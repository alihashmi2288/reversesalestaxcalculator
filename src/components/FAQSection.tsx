'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'What is a reverse sales tax calculator?',
    a: 'A reverse sales tax calculator works backwards from the total price you paid (including tax) to find the original pre-tax price. Instead of adding tax to a price, it removes the tax to reveal what the item cost before tax was applied.',
  },
  {
    q: 'How do I calculate the original price before tax?',
    a: 'Use the formula: Original Price = Final Price ÷ (1 + Tax Rate/100). For example, if you paid $107.50 with a 7.5% tax rate: $107.50 ÷ 1.075 = $100.00 original price.',
  },
  {
    q: 'What is the difference between sales tax and VAT?',
    a: 'Sales tax is added at the point of sale in the US and is only paid by the final consumer. VAT (Value Added Tax) is collected at every stage of production and is common in Europe and other countries. Both can be reversed using similar formulas.',
  },
  {
    q: 'Which US states have no sales tax?',
    a: 'Five US states have no state-level sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, some localities within Alaska do charge local sales taxes.',
  },
  {
    q: 'Which state has the highest combined sales tax rate?',
    a: 'Louisiana and Tennessee are tied for the highest combined average sales tax rate at 9.55%, followed by Arkansas at 9.49%, Alabama at 9.29%, and Oklahoma at 8.99%.',
  },
  {
    q: 'Can I use this calculator for VAT (European taxes)?',
    a: 'Yes! VAT is calculated the same way as sales tax in reverse. Simply enter the VAT-inclusive price and the VAT rate (e.g., 20% for UK standard rate) to find the ex-VAT price.',
  },
  {
    q: 'How is sales tax calculated in the US?',
    a: 'In the US, sales tax = pre-tax price × (tax rate / 100). The total price = pre-tax price + sales tax. Rates vary by state, county, and city, so the combined rate can differ significantly from the state base rate.',
  },
  {
    q: 'What is the average sales tax rate in the US?',
    a: 'The average combined US sales tax rate (state + local) is approximately 7.12% as of 2024. Rates range from 0% in tax-free states to over 9.5% in Louisiana and Tennessee.',
  },
  {
    q: 'Is this calculator accurate for business accounting?',
    a: 'Our calculator provides mathematically accurate results based on the rates you enter. For official accounting or tax filings, always verify rates with your state\'s department of revenue, as rates can change and specific products may have different tax treatments.',
  },
  {
    q: 'How do I find the tax rate for my city or county?',
    a: 'Our state dropdown shows average combined rates (state + average local). For your exact local rate, visit your state\'s department of revenue website or check the Sales Tax Institute database, as city and county rates vary widely.',
  },
  {
    q: 'Can I use this for Canadian GST/HST?',
    a: 'Yes! Visit our Canada calculator page for a dedicated tool with current GST (5%), HST rates by province, and Quebec\'s QST. The math is identical — you\'re simply removing the tax from the total price.',
  },
  {
    q: 'Why does the formula divide instead of subtract?',
    a: 'Because tax is calculated on the pre-tax price, not the total. If you subtract 7.5% from the total, you get the wrong answer. Example: $107.50 × 0.075 = $8.0625 (wrong). But $107.50 ÷ 1.075 = $100.00, then $100.00 × 0.075 = $7.50 (correct). Division undoes the multiplication correctly.',
  },
  {
    q: 'Does sales tax apply to services?',
    a: 'It depends on the state. Most states tax tangible goods but have different rules for services. Some states (like Hawaii and New Mexico) tax nearly all services, while others tax very few. Always check your specific state\'s rules for service taxation.',
  },
  {
    q: 'What is a combined sales tax rate?',
    a: 'A combined sales tax rate includes both the state-level rate and any local (city, county) rates added on top. For example, California\'s state rate is 7.25%, but with local add-ons, the average combined rate is 9.06%. Our calculator uses combined average rates for each state.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="section-label">FAQ</span>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
          Everything you need to know about reverse sales tax calculations.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 860, margin: '0 auto' }}>
        {FAQS.map((faq, i) => (
          <div key={i} className="faq-item">
            <button
              className="faq-trigger"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span>{faq.q}</span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"
                style={{ flexShrink: 0, transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              >
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </button>
            {openIndex === i && (
              <div className="faq-content">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export { FAQS };
