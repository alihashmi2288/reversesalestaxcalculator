import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { StateRate } from '@/data/stateTaxRates';
import StateCalculatorClient from './StateCalculatorClient';

interface Props {
  stateData: StateRate;
}

export default function TexasPage({ stateData }: Props) {
  const faqs = [
    {
      question: 'What is the sales tax rate in Texas?',
      answer:
        'Texas imposes a statewide base sales tax rate of 6.25%. Local taxing jurisdictions—including cities, transit authorities (MTAs), counties, and special purpose districts—can add up to 2.00% in local taxes. Because almost all major metropolitan areas levy the full 2.00% local addition, the combined sales tax rate across Houston, Dallas, Austin, San Antonio, and Fort Worth is 8.25%.',
    },
    {
      question: 'Can Texas sales tax ever exceed 8.25%?',
      answer:
        'No. Under Texas Tax Code Section 321.101 and Section 323.101, the statutory maximum combined state and local sales and use tax rate in Texas is strictly capped at 8.25%. No city, county, or district can legally impose a tax that causes the combined rate to exceed 8.25%.',
    },
    {
      question: 'How do I calculate reverse sales tax from a Texas receipt?',
      answer:
        'To calculate the pre-tax price from a Texas receipt with the standard 8.25% rate, divide the total paid by 1.0825. For example, a receipt total of $108.25 divided by 1.0825 gives an original pre-tax price of $100.00. The sales tax paid is $8.25.',
    },
    {
      question: 'What items are exempt from sales tax in Texas?',
      answer:
        'Under Texas Tax Code Chapter 151, general unprepared groceries (bread, produce, meat, milk), prescription medications, over-the-counter drugs with an FDA Drug Facts label, and residential utilities (gas and electricity) are statutory exempt from Texas sales tax. Prepared hot food, soda, candy, and general retail goods are fully taxable.',
    },
    {
      question: 'How do businesses report sales tax to the Texas Comptroller?',
      answer:
        'Texas businesses file Form 01-114 (Texas Sales and Use Tax Return) with the Texas Comptroller of Public Accounts. If your pricing includes sales tax, back out the tax by dividing total gross sales by 1.0825 (or your local rate) to report accurate taxable sales and sales tax collected.',
    },
    {
      question: 'What is the Texas Sales Tax Holiday?',
      answer:
        'Texas holds an annual Sales Tax Holiday in August where most clothing, footwear, school supplies, and backpacks priced under $100 per item are exempt from both state and local sales taxes.',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com/' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'Texas', item: 'https://salestaxreversecalculator.com/us/texas' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Texas Reverse Sales Tax Calculator',
    alternateName: 'PreTaxPrice',
    url: 'https://salestaxreversecalculator.com/us/texas',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Sales Tax Calculation & Accounting',
    softwareVersion: '2.4.0',
    inLanguage: 'en',
    operatingSystem: 'All modern browsers (Desktop & Mobile)',
    description: 'Free Texas reverse sales tax calculator pre-loaded with the 8.25% Texas combined rate. Remove sales tax from receipts in Houston, Dallas, Austin, and San Antonio.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    areaServed: {
      '@type': 'State',
      name: 'Texas',
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

  const txCities = [
    { name: 'Houston', stateRate: '6.25%', cityRate: '1.00%', mtaRate: '1.00% (METRO)', combined: '8.25%' },
    { name: 'Dallas', stateRate: '6.25%', cityRate: '1.00%', mtaRate: '1.00% (DART)', combined: '8.25%' },
    { name: 'Austin', stateRate: '6.25%', cityRate: '1.00%', mtaRate: '1.00% (CapMetro)', combined: '8.25%' },
    { name: 'San Antonio', stateRate: '6.25%', cityRate: '1.25%', mtaRate: '0.75% (VIA)', combined: '8.25%' },
    { name: 'Fort Worth', stateRate: '6.25%', cityRate: '1.50%', mtaRate: '0.50% (Trinity)', combined: '8.25%' },
    { name: 'El Paso', stateRate: '6.25%', cityRate: '2.00%', mtaRate: 'None', combined: '8.25%' },
    { name: 'Arlington', stateRate: '6.25%', cityRate: '1.75%', mtaRate: '0.25%', combined: '8.25%' },
    { name: 'Unincorporated Areas', stateRate: '6.25%', cityRate: '0.00%', mtaRate: 'Varies (0-1.5%)', combined: '6.25% - 7.75%' },
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
            <span>🗺️</span> TX · State Base: 6.25% · Local Cap: 2.00% · Max: 8.25%
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            Texas Reverse Sales Tax Calculator
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ Written by <strong>Texas Tax Compliance Research</strong></span>
            <span>•</span>
            <span>🔍 Verified for <strong>2026 Comptroller Tax Code</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>Texas Comptroller</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 720, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate the original pre-tax price from any Texas sales receipt.
            Pre-loaded with Texas&apos;s standard 8.25% combined rate applicable across Houston, Dallas, Austin, San Antonio, and Fort Worth.
          </p>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 880, width: '100%' }}>
          
          <nav style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <Link href="/tax-rates" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Tax Rates</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <span style={{ color: 'var(--ink)' }}>Texas</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'State Base Rate', value: '6.25%', color: 'var(--ink)', desc: 'Texas statewide statutory rate' },
              { label: 'Max Local Addition', value: '2.00%', color: 'var(--ink)', desc: 'Maximum city + MTA + county cap' },
              { label: 'Standard Metro Rate', value: '8.25%', color: 'var(--primary)', desc: 'Houston, Dallas, Austin combined' },
            ].map(({ label, value, color, desc }) => (
              <div key={label} className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'monospace' }}>{value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Calculator Card */}
          <div style={{ marginBottom: 64 }}>
            <StateCalculatorClient stateData={stateData} rateNote="Texas state rate is 6.25% and all major cities add 2.00% local tax, making 8.25% the standard receipt rate." />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* The 8.25% Cap Breakdown */}
            <section>
              <span className="section-label">Texas Tax Law</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                The Texas 8.25% Sales Tax Cap Explained
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  In Texas, sales tax law is anchored by a constitutional cap: <strong>no purchase in Texas can be taxed at more than 8.25%</strong>.
                  The state government retains <strong>6.25%</strong> of every taxable retail dollar. Local taxing jurisdictions share a maximum pool of <strong>2.00%</strong>:
                </p>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                    How the 2.00% Local Allocation is Divided:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                    <li><strong>City / Municipality:</strong> Typically 1.00% to 1.50% to fund police, fire, streets, and economic development.</li>
                    <li><strong>Transit Authorities (MTA / CTD):</strong> Up to 1.00% to fund public transit like Houston METRO, Dallas DART, Austin CapMetro, or San Antonio VIA.</li>
                    <li><strong>Counties:</strong> Up to 1.50% in areas without city taxes (subject to the 2% aggregate ceiling).</li>
                    <li><strong>Special Purpose Districts (SPD):</strong> Emergency services (ESD), hospital districts, or library districts.</li>
                  </ul>
                </div>
                <p>
                  Because major cities take 1.00% and transit agencies take 1.00%, virtually every urban and suburban receipt in Texas will carry an exact <strong>8.25%</strong> tax rate.
                </p>
              </div>
            </section>

            {/* Texas Major Metro Rates Table */}
            <section>
              <span className="section-label">Metro Rates</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                Sales Tax Breakdown Across Major Texas Cities
              </h2>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Jurisdiction</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>State Rate</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>City Local</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Transit / SPD</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Combined Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txCities.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: idx === txCities.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                        <td style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 600 }}>{c.name}</td>
                        <td style={{ padding: '14px 20px', color: 'var(--body)', fontSize: 14 }}>{c.stateRate}</td>
                        <td style={{ padding: '14px 20px', color: 'var(--body)', fontSize: 14 }}>{c.cityRate}</td>
                        <td style={{ padding: '14px 20px', color: 'var(--body)', fontSize: 14 }}>{c.mtaRate}</td>
                        <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{c.combined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Worked Reverse Calculation Example */}
            <section>
              <span className="section-label">Worked Example</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Mathematical Proof: Backing Out 8.25% Texas Sales Tax
              </h2>
              <div className="card" style={{ padding: 28 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  Suppose your business receives a receipt from a Texas supplier for office furniture totaling <strong>$1,082.50</strong> with tax included.
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'monospace', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><span style={{ color: 'var(--muted)' }}>1. Compute Divisor:</span> <span style={{ color: 'var(--primary-deep)', fontWeight: 700 }}>1 + (8.25 ÷ 100) = 1.0825</span></div>
                  <div><span style={{ color: 'var(--muted)' }}>2. Compute Pre-Tax Amount:</span> <span style={{ color: 'var(--ink)' }}>$1,082.50 ÷ 1.0825 = </span><strong style={{ color: 'var(--primary-deep)' }}>$1,000.00</strong></div>
                  <div><span style={{ color: 'var(--muted)' }}>3. Determine Sales Tax Paid:</span> <span style={{ color: 'var(--ink)' }}>$1,082.50 - $1,000.00 = </span><strong style={{ color: '#b91c1c' }}>$82.50</strong></div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 14, margin: '14px 0 0' }}>
                  If you had incorrectly subtracted 8.25% from $1,082.50, you would get $993.19 ($6.81 error). Accurate division protects your tax deduction legitimacy with the IRS and Comptroller.
                </p>
              </div>
            </section>

            {/* Texas Exemptions */}
            <section>
              <span className="section-label">Exemptions</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                Texas Tax Code Chapter 151 Exemptions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>🍎 Groceries & Food Items</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Flour, sugar, bread, milk, eggs, fresh produce, and unheated food items purchased for home consumption are non-taxable. Ready-to-eat hot restaurant meals and bakery goods served with utensils are taxable at 8.25%.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>💊 Medicine & First Aid</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Prescription drugs, insulin, hypodermic needles, and over-the-counter drugs with an FDA-required Drug Facts label (e.g. pain relievers, cold medications) are exempt from Texas sales tax.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>📦 Texas Resale Certificates</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Businesses purchasing tangible items to resell can provide Texas Resale Certificate (Form 01-339) to vendors to buy without paying sales tax.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Agency Links */}
            <section>
              <div className="card" style={{ padding: 24, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>
                  Official Texas Comptroller of Public Accounts
                </h3>
                <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  For address-level tax jurisdiction verification or filing sales tax reports, access the Texas Comptroller official portal:
                </p>
                <a
                  href="https://comptroller.texas.gov/taxes/sales/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#ffffff',
                    background: 'var(--primary)',
                    border: '1px solid var(--primary-deep)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  🏛️ Visit Texas Comptroller Sales Tax Portal →
                </a>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <span className="section-label">FAQ</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px' }}>
                Texas Sales Tax Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7, margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div style={{ marginTop: 48 }}>
            <AdSlot slot="state-bottom" size="rectangle" />
          </div>

        </div>
      </div>
    </main>
  );
}
