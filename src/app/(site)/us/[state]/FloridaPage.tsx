import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { StateRate } from '@/data/stateTaxRates';
import StateCalculatorClient from './StateCalculatorClient';

interface Props {
  stateData: StateRate;
}

export default function FloridaPage({ stateData }: Props) {
  const faqs = [
    {
      question: 'What is the sales tax rate in Florida?',
      answer:
        'Florida has a statewide base sales tax rate of 6.00%. In addition, counties may levy a local discretionary sales surtax ranging from 0.50% to 1.50%. This makes the combined sales tax rate 7.00% in Miami-Dade, Broward, and Palm Beach, 7.50% in Hillsborough (Tampa) and Duval (Jacksonville), and 6.50% in Orange County (Orlando).',
    },
    {
      question: 'What is the Florida $5,000 discretionary sales surtax cap?',
      answer:
        'Under Florida Statute Section 212.054(2)(b), the county discretionary sales surtax applies only to the first $5,000 of the purchase price on any single item of tangible personal property. The state 6.00% rate applies to the full purchase price. For example, on a $10,000 boat engine in a 7% county, the full $10,000 pays 6% ($600), while only the first $5,000 pays the 1% county surtax ($50), totaling $650 in tax rather than $700.',
    },
    {
      question: 'How do I calculate reverse sales tax from a Florida receipt?',
      answer:
        'To calculate the pre-tax price from a Florida receipt, convert your county combined rate into a decimal divisor (1 + rate/100) and divide the final receipt total. For a 7.00% receipt in Miami or Fort Lauderdale, divide the total by 1.07. For a $107.00 total, $107.00 ÷ 1.07 = $100.00 pre-tax price.',
    },
    {
      question: 'Are groceries and clothing taxable in Florida?',
      answer:
        'General unprepared groceries and food products for home preparation are exempt from Florida sales tax. However, clothing is fully taxable in Florida at the standard combined rate (6.5% to 7.5%), with the exception of temporary annual Florida Back-to-School Sales Tax Holidays.',
    },
    {
      question: 'Does Florida charge sales tax on commercial rent?',
      answer:
        'Yes. Uniquely among US states, Florida imposes sales tax on the total rent paid for the lease or license to use commercial real property (Florida Statute Section 212.031). The state rate on commercial rent was lowered to 2.0% plus any applicable county discretionary surtax.',
    },
    {
      question: 'How do businesses file sales tax with the Florida Department of Revenue?',
      answer:
        'Florida registered businesses report and remit sales tax via Florida Form DR-15 (Sales and Use Tax Return) through the Florida Department of Revenue online portal. Businesses that bake tax into shelf prices must reverse calculate taxable gross receipts to ensure compliance.',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com/' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'Florida', item: 'https://salestaxreversecalculator.com/us/florida' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Florida Reverse Sales Tax Calculator',
    alternateName: 'PreTaxPrice',
    url: 'https://salestaxreversecalculator.com/us/florida',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Sales Tax Calculation & Accounting',
    softwareVersion: '2.4.0',
    inLanguage: 'en',
    operatingSystem: 'All modern browsers (Desktop & Mobile)',
    description: 'Free Florida reverse sales tax calculator pre-loaded with FDOR 2026 rates. Back out sales tax from Miami (7.0%), Tampa (7.5%), Orlando (6.5%), and all FL counties.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    areaServed: {
      '@type': 'State',
      name: 'Florida',
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

  const flCounties = [
    { county: 'Miami-Dade County', city: 'Miami / Miami Beach', state: '6.00%', surtax: '1.00%', combined: '7.00%' },
    { county: 'Broward County', city: 'Fort Lauderdale / Hollywood', state: '6.00%', surtax: '1.00%', combined: '7.00%' },
    { county: 'Palm Beach County', city: 'West Palm Beach / Boca Raton', state: '6.00%', surtax: '1.00%', combined: '7.00%' },
    { county: 'Hillsborough County', city: 'Tampa', state: '6.00%', surtax: '1.50%', combined: '7.50%' },
    { county: 'Orange County', city: 'Orlando', state: '6.00%', surtax: '0.50%', combined: '6.50%' },
    { county: 'Duval County', city: 'Jacksonville', state: '6.00%', surtax: '1.50%', combined: '7.50%' },
    { county: 'Pinellas County', city: 'St. Petersburg / Clearwater', state: '6.00%', surtax: '1.00%', combined: '7.00%' },
    { county: 'Lee County', city: 'Fort Myers / Cape Coral', state: '6.00%', surtax: '0.50%', combined: '6.50%' },
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
            <span>🗺️</span> FL · State Base: 6.00% · County Surtax: 0.5%–1.5% · Combined: 6.5%–7.5%
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            Florida Reverse Sales Tax Calculator
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ Written by <strong>Florida Tax Compliance Analysts</strong></span>
            <span>•</span>
            <span>🔍 Verified for <strong>2026 FDOR County Surtaxes</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>Florida Dept of Revenue</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 720, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate original pre-tax amounts from any Florida receipt total.
            Pre-loaded with Florida&apos;s {stateData.rate}% average rate and adjustable for Miami (7.0%), Tampa (7.5%), Orlando (6.5%), and Jacksonville (7.5%).
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
            <span style={{ color: 'var(--ink)' }}>Florida</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'State Base Rate', value: '6.00%', color: 'var(--ink)', desc: 'Florida statewide base rate' },
              { label: 'Discretionary Surtax', value: '0.50% - 1.50%', color: 'var(--ink)', desc: 'County-level surtax addition' },
              { label: 'Combined Typical', value: `${stateData.rate}%`, color: 'var(--primary)', desc: 'State average combined rate' },
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
            <StateCalculatorClient stateData={stateData} rateNote="Florida state rate is 6.00% plus your county discretionary surtax (e.g., 7.00% in Miami, 7.50% in Tampa, 6.50% in Orlando)." />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* Florida County Surtax Architecture */}
            <section>
              <span className="section-label">State Tax System</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                How Florida Sales Tax Works: Discretionary Surtaxes
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Florida utilizes a two-tier sales tax structure. The state imposes a <strong>6.00% general sales tax</strong> under Florida Statutes Chapter 212.
                  In addition, Florida counties are authorized under Section 212.055 to levy a <strong>Discretionary Sales Surtax</strong> (often called local option county taxes) for voter-approved projects:
                </p>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                    Key Florida Surtax Rules:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                    <li><strong>Voter-Approved Additions:</strong> Surtaxes fund local school capital, transportation initiatives, healthcare, and emergency infrastructure.</li>
                    <li><strong>The $5,000 Surtax Limitation:</strong> On any single transaction involving an item of tangible personal property, the county surtax applies only to the first $5,000 of the sales price. The 6% state rate applies to the entirety.</li>
                    <li><strong>Destination Sourcing:</strong> Surtax is determined by the county where the item is delivered or where the motor vehicle is registered, not where the retailer is situated.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* County Surtax Table */}
            <section>
              <span className="section-label">County Rates</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                Sales Tax Rates in Top Florida Counties (2026)
              </h2>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>County / Principal Cities</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>State Rate</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>County Surtax</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Combined Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flCounties.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: idx === flCounties.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                        <td style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 600 }}>
                          {c.county}
                          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 400 }}>{c.city}</div>
                        </td>
                        <td style={{ padding: '14px 20px', color: 'var(--body)', fontSize: 14 }}>{c.state}</td>
                        <td style={{ padding: '14px 20px', color: 'var(--body)', fontSize: 14 }}>{c.surtax}</td>
                        <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{c.combined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Worked Reverse Calculation */}
            <section>
              <span className="section-label">Worked Calculation</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Worked Example: Reverse Calculating 7.00% Miami Sales Tax
              </h2>
              <div className="card" style={{ padding: 28 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  Suppose you purchase an electronic tablet in Miami-Dade County (7.00% rate) with a receipt total of <strong>$535.00</strong>.
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'monospace', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><span style={{ color: 'var(--muted)' }}>1. Compute Decimal Factor:</span> <span style={{ color: 'var(--primary-deep)', fontWeight: 700 }}>1 + (7.00 / 100) = 1.07</span></div>
                  <div><span style={{ color: 'var(--muted)' }}>2. Compute Pre-Tax Amount:</span> <span style={{ color: 'var(--ink)' }}>$535.00 ÷ 1.07 = </span><strong style={{ color: 'var(--primary-deep)' }}>$500.00</strong></div>
                  <div><span style={{ color: 'var(--muted)' }}>3. Extract Total Tax:</span> <span style={{ color: 'var(--ink)' }}>$535.00 - $500.00 = </span><strong style={{ color: '#b91c1c' }}>$35.00</strong></div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 14, margin: '14px 0 0' }}>
                  Of that $35.00 tax: $30.00 (6%) goes to Florida General Fund, and $5.00 (1%) goes to Miami-Dade County transit infrastructure.
                </p>
              </div>
            </section>

            {/* Florida Exemptions */}
            <section>
              <span className="section-label">Florida Statutory Rules</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px' }}>
                Florida Exemption Guidelines
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>🥗 Unprepared Groceries (0%)</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Food products sold for human consumption (meat, poultry, fish, bread, milk, vegetables, produce) are statutory exempt. Candy, soda, and prepared deli foods are fully taxable.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>💊 Prescription Drugs (0%)</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Prescription medicines, prosthetic devices, prescription glasses, and orthopedic appliances are statutory exempt from Florida sales and use tax.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>🏢 Commercial Lease Tax</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Unlike most states, Florida levies tax on commercial real estate rent. The statewide rate is reduced to 2.0% plus the applicable county discretionary surtax.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Agency Links */}
            <section>
              <div className="card" style={{ padding: 24, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>
                  Official Florida Department of Revenue
                </h3>
                <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  Verify annual county surtax changes or file Form DR-15 sales and use tax returns online:
                </p>
                <a
                  href="https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx"
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
                  🏛️ Visit Florida Department of Revenue Portal →
                </a>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <span className="section-label">FAQ</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px' }}>
                Florida Sales Tax Frequently Asked Questions
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
