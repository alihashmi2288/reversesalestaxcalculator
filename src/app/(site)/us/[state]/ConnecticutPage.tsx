import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { StateRate } from '@/data/stateTaxRates';
import StateCalculatorClient from './StateCalculatorClient';

interface Props {
  stateData: StateRate;
}

export default function ConnecticutPage({ stateData }: Props) {
  const faqs = [
    {
      question: 'What is sales tax in Connecticut?',
      answer: "Connecticut's general sales tax rate is 6.35%. The state does not allow local jurisdictions to add sales taxes on top of this, so 6.35% applies statewide for most purchases.",
    },
    {
      question: 'How do you calculate CT sales tax?',
      answer: 'To calculate how much tax was included in a price, divide the total by 1.0635 to find the pre-tax amount, then subtract to find the tax. Example: $106.35 / 1.0635 = $100.00 pre-tax. Tax paid: $6.35.',
    },
    {
      question: "What is CT's sales tax rate?",
      answer: 'The standard Connecticut sales tax rate is 6.35%. Special rates apply to specific categories: 7.35% for meals, 7.75% for certain luxury goods, and 9.35% for short-term vehicle rentals.',
    },
    {
      question: 'What items are exempt from sales tax in CT?',
      answer: 'Common exemptions include unprepared groceries, prescription medications, and certain medical equipment. Clothing and footwear are generally taxable at 6.35%. Items priced more than $1,000 per piece are taxed at the higher 7.75% luxury rate. Prepared foods and restaurant meals are not exempt.',
    },
    {
      question: 'Who is exempt from paying sales tax in Connecticut?',
      answer: 'Qualifying organizations such as 501(c)(3) nonprofits, state and federal government entities, and qualifying medical or educational organizations holding a valid DRS exemption permit may purchase goods tax-free. Individual consumers are generally not exempt except through product-category exemptions.',
    },
    {
      question: 'What is 7.75% sales tax in CT?',
      answer: "Connecticut's 7.75% rate applies to clothing, footwear, handbags, luggage, umbrellas, wallets, and watches priced more than $1,000 per item, and to most motor vehicles priced more than $50,000. This rate does not apply to standard retail purchases.",
    },
    {
      question: 'How to use a CT sales tax calculator for small business?',
      answer: 'Enter your gross sales total including tax into the calculator and divide by 1.0635. The result is your net pre-tax revenue. The difference is the tax collected. This works for daily sales reconciliation, expense separation, and receipt verification.',
    },
    {
      question: 'CT sales tax calculator for retail purchases?',
      answer: 'For standard retail purchases in Connecticut, enter the total paid and leave the rate at 6.35%. The calculator gives you the pre-tax price and tax amount instantly.',
    },
    {
      question: 'Did CT raise sales tax?',
      answer: 'The standard Connecticut sales tax rate has been 6.35% since July 1, 2011 and has not changed since. The luxury rate for high-value items increased from 7% to 7.75% on July 1, 2015, but the general rate remains 6.35%.',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'Connecticut', item: 'https://salestaxreversecalculator.com/us/connecticut' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CT Sales Tax Calculator',
    url: 'https://salestaxreversecalculator.com/us/connecticut',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: 'Free CT sales tax calculator with all 2026 Connecticut rates. Find your pre-tax price instantly. No signup needed. Covers standard and special rates.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    areaServed: {
      '@type': 'State',
      name: 'Connecticut',
      containedInPlace: {
        '@type': 'Country',
        name: 'United States',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reverse Sales Tax Calculator',
      alternateName: 'PreTaxPrice',
      url: 'https://salestaxreversecalculator.com',
    },
    screenshot: 'https://salestaxreversecalculator.com/og-image.png',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const specialRates = [
    { rate: '6.35%', label: 'Standard Rate', applies: 'Most retail goods and services' },
    { rate: '1%', label: 'Reduced Rate', applies: 'Computer and data-processing services, certain business software' },
    { rate: '2.99%', label: 'Marine Rate', applies: 'Qualifying vessels, vessel motors, vessel trailers, certain marine fuel' },
    { rate: '4.5%', label: 'Military Rate', applies: 'Qualifying sales to certain nonresident military personnel' },
    { rate: '7.35%', label: 'Meals & Beverages', applies: 'Meals and certain beverages' },
    { rate: '7.75%', label: 'Luxury Goods', applies: 'High-value motor vehicles, jewelry, clothing, footwear, handbags, luggage, umbrellas, wallets, and watches above the statutory threshold' },
    { rate: '9.35%', label: 'Vehicle Rentals', applies: 'Passenger motor vehicle rentals for 30 consecutive days or less' },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>🗺️</span> CT · Standard Statewide Rate: 6.35%
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            CT Sales Tax Calculator
          </h1>

          {/* E-E-A-T Trust Signals Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ Written by <strong>Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Reviewed by <strong>CPA Tax Editorial</strong></span>
            <span>•</span>
            <span>📅 Last reviewed: <strong>2026</strong></span>
          </div>

          <div style={{ maxWidth: 720, margin: '0 auto', fontSize: 16, color: 'var(--mint-100)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p>
              Connecticut has one of the simplest sales tax structures in the United States. The standard rate is 6.35% and it applies statewide with no city or county additions. Whether you are shopping in Hartford, New Haven, Stamford, or anywhere else in Connecticut, you pay the same base rate.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 880, width: '100%' }}>
          
          <nav aria-label="Breadcrumbs" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <Link href="/tax-rates" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Tax Rates</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <span style={{ color: 'var(--ink)' }}>Connecticut</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>6.35%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>State Base Rate</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Standard statewide rate</div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', fontFamily: 'monospace' }}>None</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Local Add-On</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>No city or county taxes</div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>6.35%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Effective Total</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Pre-loaded checkout rate</div>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div style={{ marginBottom: 48 }}>
            <StateCalculatorClient stateData={stateData} rateNote="Standard statewide rate: 6.35%" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

            {/* Section 1: Connecticut Sales Tax Rate in 2026 */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">State Tax Schedule</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                Connecticut Sales Tax Rate in 2026
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  The standard Connecticut sales tax rate is <strong>6.35%</strong>.
                </p>
                <p>
                  Connecticut does not allow cities, counties, or local jurisdictions to add their own sales taxes on top of the state rate. This means the rate you pay is always 6.35% for standard purchases, no matter where in Connecticut the purchase is made.
                </p>

                {/* Rate Table */}
                <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 12, marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em', width: '130px' }}>Rate</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Applies To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specialRates.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === specialRates.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                          <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace', fontSize: 16 }}>
                            {row.rate}
                          </td>
                          <td style={{ padding: '14px 20px', color: 'var(--ink)', fontSize: 14, lineHeight: 1.5 }}>
                            <strong>{row.label}:</strong> {row.applies}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  Source: Connecticut Department of Revenue Services, last updated July 6, 2026.{' '}
                  <a
                    href="https://portal.ct.gov/drs/sales-tax/tax-information"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    portal.ct.gov/drs/sales-tax/tax-information
                  </a>
                </p>

                <p>
                  For a full comparison, see our{' '}
                  <Link href="/tax-rates" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    sales tax rates by state
                  </Link>{' '}
                  reference page.
                </p>
              </div>
            </section>

            {/* Section 2: How to Use This CT Sales Tax Calculator */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">User Guide</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                How to Use This CT Sales Tax Calculator
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  This tool works backwards from what you paid to find what you should have paid before tax.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, margin: '8px 0' }}>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 20 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 800, fontSize: 14, marginBottom: 8 }}>STEP 1</div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)' }}>
                      Enter the total amount on your Connecticut receipt including tax.
                    </p>
                  </div>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 20 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 800, fontSize: 14, marginBottom: 8 }}>STEP 2</div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)' }}>
                      The rate field shows 6.35% by default. This is the correct standard Connecticut rate. Change it only if your purchase falls under a special rate category such as meals (7.35%) or vehicle rental (9.35%).
                    </p>
                  </div>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 20 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 800, fontSize: 14, marginBottom: 8 }}>STEP 3</div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)' }}>
                      Your pre-tax price and the exact tax amount appear instantly.
                    </p>
                  </div>
                </div>
                <p>
                  For the reverse calculation formula and step-by-step math, see our{' '}
                  <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    reverse sales tax calculator
                  </Link>{' '}
                  on the main page.
                </p>
              </div>
            </section>

            {/* Section 3: Connecticut Special Tax Rates */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Special Tax Categories</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 16px' }}>
                Connecticut Special Tax Rates
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--body)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Most purchases in Connecticut use the 6.35% standard rate. But certain categories have different rates. Here is what to know before using the calculator.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      Meals and beverages (7.35%)
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Restaurant meals, food sold at a heated temperature, and certain beverages are taxed at 7.35%, not 6.35%. If you are calculating the pre-tax price of a restaurant bill, change the rate to 7.35%.
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      Luxury goods (7.75%)
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Clothing, footwear, handbags, luggage, umbrellas, wallets, and watches above the statutory price threshold are taxed at 7.75%. Clothing, footwear, handbags, luggage, umbrellas, wallets, and watches priced more than $1,000 per item are taxed at 7.75%. Most motor vehicles priced more than $50,000 are also taxed at 7.75%.
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      Vehicle rentals (9.35%)
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Short-term passenger vehicle rentals of 30 days or less are taxed at 9.35%.
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      Computer services (1%)
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Certain computer and data-processing services and qualifying electronically accessed business software are taxed at 1%.
                    </p>
                  </div>
                </div>

                <p>
                  When using this calculator for these categories, manually enter the correct rate instead of the default 6.35%.
                </p>

                <p>
                  If you make purchases across state lines, our{' '}
                  <Link href="/us/new-york" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    NY sales tax calculator
                  </Link>{' '}
                  covers New York&apos;s 8.875% NYC rate and all upstate county variations.
                </p>
              </div>
            </section>

            {/* Section 4: What Is Exempt from Sales Tax in CT? */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Exemptions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                What Is Exempt from Sales Tax in CT?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Connecticut exempts several categories of purchases from the standard 6.35% sales tax.
                </p>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, margin: 0 }}>
                  <li>
                    <strong>Groceries:</strong> Most unprepared food items sold for home consumption are exempt. Prepared foods, meals, and heated items are taxable at 7.35%.
                  </li>
                  <li>
                    <strong>Prescription medications:</strong> Prescription drugs and insulin are fully exempt from Connecticut sales tax.
                  </li>
                  <li>
                    <strong>Clothing and footwear:</strong> Most clothing and footwear are taxable at the standard 6.35% rate. A former exemption for items under $50 was repealed in July 2011 and has not been restored. Items priced more than $1,000 per piece are taxed at the higher 7.75% luxury rate instead.
                  </li>
                  <li>
                    <strong>Certain medical equipment:</strong> Qualifying medical equipment, prosthetics, oxygen, and mobility aids are exempt from Connecticut sales tax.
                  </li>
                  <li>
                    <strong>Residential utilities:</strong> Qualifying residential electricity, natural gas, and heating fuels are exempt.
                  </li>
                </ul>
                <p>
                  If your purchase falls into an exempt category, a reverse sales tax calculation should not be needed since no tax was applied. If tax was charged on an item you believe is exempt, contact the Connecticut Department of Revenue Services at{' '}
                  <a
                    href="https://portal.ct.gov/drs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    portal.ct.gov/drs
                  </a>.
                </p>
              </div>
            </section>

            {/* Section 5: How to Calculate CT Sales Tax Backwards */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Math & Examples</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                How to Calculate CT Sales Tax Backwards
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  The reverse sales tax formula for Connecticut is straightforward because there is only one standard rate.
                </p>

                <div style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius)', padding: 18, fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--primary-deep)' }}>
                  <strong>Formula:</strong> Pre-tax price = Total paid ÷ 1.0635
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, margin: '8px 0' }}>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      Example 1 (Standard Purchase)
                    </h3>
                    <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--body)' }}>You paid $89.50 at a Connecticut retailer.</p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>$89.50 ÷ 1.0635 = $84.15 pre-tax price</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#b91c1c' }}>Tax paid: $5.35</p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      Example 2 (Restaurant Meal at 7.35%)
                    </h3>
                    <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--body)' }}>You paid $54.40 at a Connecticut restaurant.</p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>$54.40 ÷ 1.0735 = $50.67 pre-tax price</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#b91c1c' }}>Tax paid: $3.73</p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      Example 3 (Vehicle Rental at 9.35%)
                    </h3>
                    <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--body)' }}>You paid $218.70 for a two-day car rental.</p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>$218.70 ÷ 1.0935 = $200.00 pre-tax price</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#b91c1c' }}>Tax paid: $18.70</p>
                  </div>
                </div>

                <p style={{ color: 'var(--body)' }}>
                  Use the calculator above to skip the manual math. Enter your total and select the correct rate for your purchase type.
                </p>
              </div>
            </section>

            {/* Section 6: Connecticut Sales Tax for Small Businesses */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Business Applications</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 16px' }}>
                Connecticut Sales Tax for Small Businesses
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--body)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Small business owners and freelancers in Connecticut use this calculator for several practical tasks:
                </p>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12, margin: 0 }}>
                  <li>
                    <strong>Separating tax from daily sales totals:</strong> If you run a retail business in Connecticut and your point of sale system reports gross totals including tax, divide your daily total by 1.0635 to find your net sales revenue. The difference is the tax you collected and owe to the Connecticut DRS.
                  </li>
                  <li>
                    <strong>Expense report reconciliation:</strong> When recording business purchases, the pre-tax amount is what belongs in your expense report. Enter your receipt total into the CT sales tax calculator to find the deductible pre-tax figure instantly.
                  </li>
                  <li>
                    <strong>Verifying customer receipts:</strong> If a customer disputes a tax charge, enter their total into the calculator to confirm the correct tax amount was applied at 6.35%.
                  </li>
                  <li>
                    <strong>Meals and entertainment expenses:</strong> For business meals taxed at 7.35%, change the rate in the calculator to get the correct pre-tax breakdown.
                  </li>
                </ul>
                <p>
                  Connecticut businesses that collect sales tax must file returns with the Connecticut Department of Revenue Services. Visit{' '}
                  <a
                    href="https://portal.ct.gov/drs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    portal.ct.gov/drs
                  </a>{' '}
                  for filing schedules and requirements.
                </p>
              </div>
            </section>

            {/* Section 7: Frequently Asked Questions */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">FAQ</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 24px' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {faqs.map((faq, idx) => (
                  <details key={idx} className="faq-item" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)' }}>
                    <summary className="faq-trigger" style={{ outline: 'none' }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{faq.question}</span>
                      <span style={{ color: 'var(--primary)', fontSize: 22 }}>+</span>
                    </summary>
                    <p className="faq-content" style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--body)' }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Disclaimer & Trust Methodology */}
            <section style={{ maxWidth: 860, borderTop: '2px dashed var(--border)', paddingTop: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
                Disclaimer & Transparency
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <p>
                  This calculator and the information on this page are provided for general informational purposes only. Tax rates and exemption rules can change. Always verify current rates and rules with the Connecticut Department of Revenue Services at{' '}
                  <a
                    href="https://portal.ct.gov/drs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    portal.ct.gov/drs
                  </a>{' '}
                  before making financial or business decisions based on this content.
                </p>
                <p>
                  <strong>Methodology Note:</strong> This calculator uses the standard inverse tax formula <code>Pre-Tax Price = Total / (1 + Rate)</code>, with rates and special schedules sourced directly from the Connecticut Department of Revenue Services (DRS).
                </p>
                <p>
                  <strong>Correction Mechanism:</strong> Notice a regulatory or rate update? Please contact our team at{' '}
                  <a href="mailto:contact@salestaxreversecalculator.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                    contact@salestaxreversecalculator.com
                  </a>{' '}
                  for prompt verification and review.
                </p>
              </div>
            </section>

            <div style={{ marginTop: 12, marginBottom: 48 }}>
              <AdSlot slot="connecticut-rectangle" size="rectangle" />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
