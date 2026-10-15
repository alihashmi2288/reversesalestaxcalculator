import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { StateRate } from '@/data/stateTaxRates';
import NYCalculatorClient from './NYCalculatorClient';

interface Props {
  stateData: StateRate;
}

export default function NewYorkPage({ stateData }: Props) {
  const faqs = [
    {
      question: 'How much is sales tax in New York City?',
      answer:
        'The combined sales tax rate in New York City is 8.875%. This includes the 4% New York State base rate, the 4.5% New York City local rate, and the 0.375% Metropolitan Commuter Transportation District (MCTD) surcharge. This rate applies uniformly across all five boroughs: Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.',
    },
    {
      question: 'How do I calculate sales tax for New York City?',
      answer:
        'To calculate forward sales tax in NYC, multiply the pre-tax price by 0.08875 to get the tax amount, then add it to the price. For example, a $100 purchase has $8.88 in sales tax for a total of $108.88. To reverse calculate from a receipt, divide the total paid by 1.08875 to uncover the pre-tax price ($108.88 / 1.08875 = $100.00).',
    },
    {
      question: 'Is New York sales tax 8%?',
      answer:
        'No. The New York State base rate is 4%. Local county and city taxes range from 0% to 4.875%, plus a 0.375% MCTD surcharge in the 12-county downstate commuter zone. While several upstate counties have combined rates near 8% (such as Rochester at 8.00%), New York City is 8.875% and long island counties are 8.625% to 8.75%. There is no uniform 8% rate across the state.',
    },
    {
      question: 'How do you add sales tax to a price in New York?',
      answer:
        'Multiply the pre-tax price by the combined tax rate as a decimal (for example, 0.08875 for NYC or 0.0866 for the state average). Add the resulting tax amount to your pre-tax price: Total = Price × (1 + Rate). Always apply the combined rate for the specific delivery or pickup location rather than an estimated rate.',
    },
    {
      question: 'Are there legitimate ways to reduce New York sales tax?',
      answer:
        'New York provides specific statutory exemptions for essential consumer categories. Most unprepared groceries, prescription and nonprescription drugs, and clothing or footwear priced under $110 per item (in NYC and participating counties) are legally exempt from sales tax. Beyond statutory product exemptions, all taxable transactions must comply with state and local tax laws.',
    },
    {
      question: 'What is the sales tax rate in New York State?',
      answer:
        'The New York State statutory base rate is 4.00%. When local county, city, and special district taxes are added, combined rates range from 4.00% to 8.875%. The statewide combined average is approximately 8.54% to 8.66% depending on local population weighting.',
    },
    {
      question: 'How much is sales tax in New York?',
      answer:
        'The total sales tax depends on the destination municipality. The state base rate is 4%, local additions range between 0% and 4.875%, and downstate jurisdictions levy a 0.375% MCTD surcharge. Combined rates span 4% to 8.875%. For exact address lookups, consult the New York State Department of Taxation and Finance rate portal.',
    },
    {
      question: 'What is my sales tax rate in NY?',
      answer:
        'Under New York\'s destination sourcing rules, your sales tax rate is determined by where the taxable item or service is delivered or picked up, not where the business or buyer lives. You can verify the exact rate by entering the delivery ZIP code or address into the New York State Department of Taxation and Finance jurisdiction lookup tool.',
    },
    {
      question: 'How do I use a zip code sales tax calculator for New York?',
      answer:
        'Identify the 5-digit ZIP code where your purchase will be delivered or picked up, enter the corresponding local combined rate into the calculator (e.g., 8.875% for 10001 in NYC or 8.75% for Suffolk County), and enter either the sticker price (to add tax) or receipt total (to remove tax).',
    },
  ];

  const nycBreakdown = [
    { component: 'New York State base rate', rate: '4.000%', desc: 'Statutory statewide base rate' },
    { component: 'New York City local rate', rate: '4.500%', desc: 'Local municipal sales tax' },
    { component: 'MCTD transit surcharge', rate: '0.375%', desc: 'Dedicated MTA transit district funding' },
    { component: 'NYC Combined Rate', rate: '8.875%', desc: 'Total sales tax in all 5 NYC boroughs' },
  ];

  const countyExamples = [
    { area: 'New York City (5 Boroughs)', state: '4.000%', local: '4.500%', mctd: '0.375%', combined: '8.875%' },
    { area: 'Suffolk County (Long Island)', state: '4.000%', local: '4.375%', mctd: '0.375%', combined: '8.750%' },
    { area: 'Nassau County (Long Island)', state: '4.000%', local: '4.250%', mctd: '0.375%', combined: '8.625%' },
    { area: 'Westchester County (Yonkers)', state: '4.000%', local: '4.500%', mctd: '0.375%', combined: '8.875%' },
    { area: 'Erie County (Buffalo)', state: '4.000%', local: '4.750%', mctd: 'None', combined: '8.750%' },
    { area: 'Monroe County (Rochester)', state: '4.000%', local: '4.000%', mctd: 'None', combined: '8.000%' },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com/' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'New York', item: 'https://salestaxreversecalculator.com/us/new-york' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'New York Sales Tax Calculator',
    url: 'https://salestaxreversecalculator.com/us/new-york',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Sales Tax & Reverse Tax Calculation',
    softwareVersion: '2.4.0',
    inLanguage: 'en',
    operatingSystem: 'All modern browsers (Desktop & Mobile)',
    description:
      'Unlock the true cost of your purchases in New York City with our reverse sales tax calculator. Get started now and take control of your spending!',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    areaServed: {
      '@type': 'State',
      name: 'New York',
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

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>🗺️</span> NY · NYC Combined Rate: 8.875% · State Base: 4.00%
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            New York Reverse Sales Tax Calculator
          </h1>

          {/* E-E-A-T Trust Signals Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ Written by <strong>Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Reviewed for <strong>2026 Statutory Rates</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>NYS Dept of Taxation and Finance</strong></span>
          </div>

          <div style={{ maxWidth: 720, margin: '0 auto', fontSize: 16, color: 'var(--mint-100)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p>
              New York sales tax calculator helps you add or remove sales tax for any New York location. Enter a price or total and the combined rate. The calculator shows the tax amount and the other value. New York has a 4% state base rate. Local rates add to that.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 880, width: '100%' }}>
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <Link href="/tax-rates" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Tax Rates</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <span style={{ color: 'var(--ink)' }}>New York</span>
          </nav>

          {/* Rate Info Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 32 }}>
            <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', fontFamily: 'monospace' }}>4.00%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>State Base Rate</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Standard statewide base</div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>8.875%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>NYC Combined Rate</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>All 5 NYC Boroughs</div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', fontFamily: 'monospace' }}>0.375%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>MCTD Surcharge</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>NYC + 7 Downstate Counties</div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>8.66%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>NY Combined Avg</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Statewide benchmark</div>
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div style={{ marginBottom: 48 }}>
            <NYCalculatorClient stateData={stateData} />
          </div>

          {/* Structured Content Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

            {/* ── Section 1: How Do You Use the New York Sales Tax Calculator? ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">User Guide</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                How Do You Use the New York Sales Tax Calculator?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  The New York sales tax calculator works in two directions. Use the forward mode to add tax to a pretax price. Use the reverse mode to remove tax from a total price. Enter the combined rate for the applicable jurisdiction. The calculator then shows the sales tax amount and the pre-tax or total price. For an exact location-based rate, use a ZIP code or address lookup from the New York State Department of Taxation and Finance.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, margin: '12px 0' }}>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 20 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 800, fontSize: 13, marginBottom: 8 }}>
                      FORWARD CALCULATION (ADD TAX TO A PRICE)
                    </div>
                    <ol style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--ink)' }}>
                      <li>Enter the pre-tax price.</li>
                      <li>Enter the combined sales tax rate for the location where the item is delivered or picked up (e.g., 8.875% in NYC).</li>
                      <li>The calculator shows the tax amount and the total checkout price.</li>
                    </ol>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 20 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 800, fontSize: 13, marginBottom: 8 }}>
                      REVERSE CALCULATION (REMOVE TAX FROM A TOTAL)
                    </div>
                    <ol style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--ink)' }}>
                      <li>Enter the total price you paid from your receipt or statement.</li>
                      <li>Enter the combined sales tax rate for the location.</li>
                      <li>The calculator shows the pre-tax price and the tax amount paid.</li>
                    </ol>
                  </div>
                </div>

                <p>
                  If you do not know the exact local rate, use the average combined rate shown (8.66%). For an exact rate, check the New York State Department of Taxation and Finance rate lookup.
                </p>
              </div>
            </section>

            {/* ── Section 2: How New York Sales Tax Works ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Tax Structure</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                How New York Sales Tax Works
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  New York sales tax has three distinct parts that combine into the final rate charged at the register:
                </p>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, margin: 0 }}>
                  <li>
                    <strong>State base rate:</strong> 4% applies uniformly across all 62 counties in New York State.
                  </li>
                  <li>
                    <strong>Local rate:</strong> Counties and cities add their own rates. Local rates range from 0% to 4.875%.
                  </li>
                  <li>
                    <strong>Special district rate:</strong> The Metropolitan Commuter Transportation District (MCTD) adds an extra 0.375% in certain downstate jurisdictions to fund regional transit.
                  </li>
                </ul>
                <p>
                  The combined rate is the state rate plus the local rate plus any special district rate. Combined rates in New York range from <strong>4.00% to 8.875%</strong>.
                </p>
                <p>
                  The rate you pay depends on where the taxable item or service is delivered or picked up. It does not depend on where you live or where the business is registered. This is New York&apos;s <strong>destination rule</strong>, and it applies to most taxable retail transactions and online deliveries throughout the state.
                </p>
              </div>
            </section>

            {/* ── Section 3: New York State vs. New York City Sales Tax ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">State vs NYC Comparison</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                New York State vs. New York City Sales Tax
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  The New York State base rate is 4%. This applies everywhere in the state before local taxes are added.
                </p>
                <p>
                  New York City has the highest combined rate in the state at <strong>8.875%</strong>. This breaks down as follows:
                </p>

                {/* NYC Breakdown Table */}
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', marginTop: 8, marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Component</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)', width: '120px' }}>Rate</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nycBreakdown.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === nycBreakdown.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx === nycBreakdown.length - 1 ? 'var(--mint-50)' : 'transparent' }}>
                          <td style={{ padding: '14px 20px', fontWeight: idx === nycBreakdown.length - 1 ? 800 : 600, color: 'var(--ink)', fontSize: 14 }}>
                            {row.component}
                          </td>
                          <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 16 }}>
                            {row.rate}
                          </td>
                          <td style={{ padding: '14px 20px', color: 'var(--body)', fontSize: 13 }}>
                            {row.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p>
                  The MCTD surcharge applies in New York City (Manhattan, Brooklyn, Queens, Bronx, Staten Island) and seven surrounding counties: Dutchess, Nassau, Orange, Putnam, Rockland, Suffolk, and Westchester. It directly funds the Metropolitan Transportation Authority (MTA).
                </p>

                <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginTop: 12, marginBottom: 8 }}>
                  Key County & Regional Rate Comparisons
                </h3>
                <p>
                  Outside NYC, combined rates vary depending on county elections and special tax districts:
                </p>

                {/* County Table */}
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', marginTop: 8, marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                        <th style={{ padding: '12px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Jurisdiction</th>
                        <th style={{ padding: '12px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>State</th>
                        <th style={{ padding: '12px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Local</th>
                        <th style={{ padding: '12px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>MCTD</th>
                        <th style={{ padding: '12px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Combined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countyExamples.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === countyExamples.length - 1 ? 'none' : '1px solid var(--hairline)' }}>
                          <td style={{ padding: '12px 18px', fontWeight: 700, color: 'var(--ink)', fontSize: 13 }}>{item.area}</td>
                          <td style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--body)' }}>{item.state}</td>
                          <td style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--body)' }}>{item.local}</td>
                          <td style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--body)' }}>{item.mctd}</td>
                          <td style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: 'var(--primary)' }}>{item.combined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  Note: Suffolk County increased its local sales tax to 4.375% effective March 1, 2025, bringing its combined rate to 8.750%. Nassau County remains 8.625%.
                </p>
              </div>
            </section>

            {/* ── Section 4: How to Calculate Sales Tax in New York ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Forward Calculation</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                How to Calculate Sales Tax in New York
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  To add New York sales tax to a pre-tax sticker price, apply the standard forward calculation formula:
                </p>

                <div style={{ background: 'var(--card-bg)', border: '2px solid var(--primary)', borderRadius: 'var(--radius)', padding: 18, fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--primary)' }}>
                  <div><strong>Tax Amount = Pre-Tax Price × Combined Rate</strong></div>
                  <div style={{ marginTop: 6 }}><strong>Total Price = Pre-Tax Price + Tax Amount</strong></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '8px 0' }}>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      Example 1: $200 Purchase in NYC (8.875%)
                    </h3>
                    <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--body)' }}>You buy a $200 taxable retail item in New York City:</p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>
                      1. Combined rate: 8.875% (0.08875 decimal)
                    </p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>
                      2. Tax amount: $200 × 0.08875 = $17.75
                    </p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                      3. Total price: $200 + $17.75 = $217.75
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      Example 2: $75 Purchase at 7% Combined Rate
                    </h3>
                    <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--body)' }}>You buy a $75 item in an upstate 7.00% jurisdiction:</p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>
                      1. Combined rate: 7.00% (0.0700 decimal)
                    </p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>
                      2. Tax amount: $75 × 0.07 = $5.25
                    </p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                      3. Total price: $75 + $5.25 = $80.25
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 5: Reverse Sales Tax Calculation ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Reverse Calculation</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                Reverse Sales Tax Calculation
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  When you have a final receipt total or bank charge and need to extract the original pre-tax price and the tax paid, use the reverse calculation formulas:
                </p>

                <div style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius)', padding: 18, fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--primary-deep)' }}>
                  <div><strong>Pre-Tax Price = Total Price ÷ (1 + Combined Rate)</strong></div>
                  <div style={{ marginTop: 6 }}><strong>Tax Amount = Total Price – Pre-Tax Price</strong></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '8px 0' }}>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      Example 1: NYC Receipt of $217.75
                    </h3>
                    <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--body)' }}>You paid $217.75 in NYC and need the pre-tax price for accounting:</p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>
                      1. Combined rate: 8.875% → Divisor: 1.08875
                    </p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>
                      2. Pre-tax price: $217.75 ÷ 1.08875 = $200.00
                    </p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#b91c1c' }}>
                      3. Tax amount: $217.75 – $200.00 = $17.75
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                      Example 2: Receipt of $54.00 at 6.25% Rate
                    </h3>
                    <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--body)' }}>You paid $54.00 in a 6.25% jurisdiction:</p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)', fontWeight: 700 }}>
                      1. Combined rate: 6.25% → Divisor: 1.0625
                    </p>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                      2. Pre-tax price: $54.00 ÷ 1.0625 = $50.82
                    </p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                      3. Tax amount: $54.00 – $50.82 = $3.18
                    </p>
                  </div>
                </div>

                <p>
                  For multi-state calculations or custom invoicing workflows, see our main{' '}
                  <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    reverse sales tax calculator
                  </Link>.
                </p>
              </div>
            </section>

            {/* ── Section 6: New York Sales Tax Rates Summary ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Rate Summary</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                New York Sales Tax Rates
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, margin: 0 }}>
                  <li><strong>State base rate:</strong> 4.00%</li>
                  <li><strong>Local rate range:</strong> 0% to 4.875%</li>
                  <li><strong>MCTD surcharge:</strong> 0.375% in downstate jurisdictions</li>
                  <li><strong>Combined rate range:</strong> 4.00% to 8.875%</li>
                  <li><strong>Average combined rate:</strong> Approximately 8.54% (Tax Foundation 2026) to 8.66%</li>
                  <li><strong>Highest combined rate:</strong> 8.875% in New York City and Yonkers</li>
                </ul>
                <p>
                  Rates are officially established by the New York State Department of Taxation and Finance alongside local county and municipal boards. Verify the current rate for your specific delivery address before completing any major commercial purchase.
                </p>
                <p>
                  If you make purchases across state lines, use our{' '}
                  <Link href="/us/california" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    CA sales tax calculator
                  </Link>{' '}
                  for California transactions, or our dedicated{' '}
                  <Link href="/us/connecticut" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                    sales tax in CT calculator
                  </Link>{' '}
                  for Connecticut purchases.
                </p>
              </div>
            </section>

            {/* ── Section 7: What Is Exempt from New York Sales Tax? ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Statutory Exemptions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                What Is Exempt from New York Sales Tax?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  New York exempts several major categories of essential consumer goods from sales tax. These exemptions apply at the state level and are adopted by qualifying local jurisdictions:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      🥦 Groceries & Unprepared Food
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Most food items sold for home consumption are fully exempt from New York State and local sales taxes. This covers fresh produce, dairy, bakery items, meat, and pantry goods. However, restaurant meals, hot prepared foods, candy, soda/soft drinks, and alcoholic beverages are fully taxable at the standard combined rate.
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      👗 Clothing and Footwear Under $110
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Articles of clothing and footwear sold for <strong>less than $110 per individual item or pair</strong> are exempt from the 4% New York State sales tax. <strong>New York City has also elected this exemption</strong>, meaning clothing and footwear under $110 in NYC is <strong>100% tax-free (0% sales tax)</strong>. Items priced at $110 or more per item are subject to the full combined rate on the entire amount. Note that some upstate counties do not exempt clothing from their local taxes.
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      💊 Prescription and Over-the-Counter Medicines
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Prescription drugs, qualifying nonprescription (over-the-counter) medications, insulin, medical equipment, and prosthetics are exempt from New York State and local sales taxes.
                    </p>
                  </div>

                  <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                      ☕ Prepared Food & Dining
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--body)' }}>
                      Prepared food is taxable at the full combined rate (8.875% in NYC). This applies to heated meals, restaurant dining, take-out hot meals, catering services, and fountain drinks.
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  For an exhaustive list of exemptions and local tax elections, refer to the{' '}
                  <a
                    href="https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/quick_reference_guide_for_taxable_and_exempt_property_and_services.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    New York State Department of Taxation and Finance Quick Reference Guide (Publication 718)
                  </a>.
                </p>
              </div>
            </section>

            {/* ── Section 8: New York City Sales Tax Calculator ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">NYC Focus</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                New York City Sales Tax Calculator
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  For purchases in New York City, use the <strong>8.875% combined rate</strong>. This rate applies uniformly across all five NYC boroughs:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '4px 0' }}>
                  {['Bronx (Bronx County)', 'Brooklyn (Kings County)', 'Manhattan (New York County)', 'Queens (Queens County)', 'Staten Island (Richmond County)'].map((borough) => (
                    <span
                      key={borough}
                      style={{
                        padding: '6px 12px',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      ✓ {borough}
                    </span>
                  ))}
                </div>
                <p>
                  If you need to calculate NYC sales tax, simply enter your pre-tax price and select the <strong>8.875%</strong> preset button. The calculator displays the exact tax amount and total.
                </p>
                <p>
                  <strong>NYC Restaurant Tax:</strong> Restaurant dining and prepared meals in New York City also carry the 8.875% rate. For example, a $50 restaurant bill incurs $4.44 in sales tax, bringing the subtotal to $54.44 before gratuity.
                </p>
              </div>
            </section>

            {/* ── Section 9: County and Local Rate Considerations ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">County Jurisdictions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
                County and Local Rate Considerations
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  New York is divided into 62 counties, each with authority to enact local sales tax rates within statutory parameters. Select cities (such as Yonkers and White Plains) enact local city surcharges in addition to county taxes.
                </p>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, margin: 0 }}>
                  <li>
                    <strong>Long Island (Nassau & Suffolk):</strong> Nassau County has an 8.625% combined rate. Suffolk County raised its local portion in March 2025, bringing the combined rate to 8.75%.
                  </li>
                  <li>
                    <strong>Car & Motor Vehicle Purchases:</strong> Under New York Department of Motor Vehicles regulations, vehicle sales tax is calculated based on the <strong>county of residence where the vehicle is registered</strong>, not where the dealership is located. Use the destination county&apos;s combined rate for car sales tax calculations.
                  </li>
                  <li>
                    <strong>Food & Grocery Distinction:</strong> Unprepared grocery staples are exempt; heated meals and restaurant dining are taxed at the full local rate.
                  </li>
                  <li>
                    <strong>Clothing Purchases:</strong> Remember to check whether the item is below the $110 threshold and whether the county has opted into the local tax exemption.
                  </li>
                </ul>
              </div>
            </section>

            {/* ── Section 10: Frequently Asked Questions ── */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">FAQ</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 24px' }}>
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

            {/* ── Section 11: About This Calculator & Methodology ── */}
            <section style={{ maxWidth: 860, borderTop: '2px dashed var(--border)', paddingTop: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
                About This Calculator & Methodology
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <p>
                  This calculator executes mathematical calculations based on the standard formulas defined above. The default rate options include New York City&apos;s statutory 8.875% rate and New York State&apos;s combined benchmark average of 8.66% (with Tax Foundation 2026 data reporting 8.54%). Rates and jurisdictional classifications are verified against official publications from the New York State Department of Taxation and Finance.
                </p>
                <p>
                  <strong>Methodology:</strong> Forward calculations multiply the pre-tax price by the decimal rate (<code>Price × Rate</code>), while reverse calculations divide by the rate factor (<code>Total ÷ (1 + Rate)</code>). Rounding follows standard half-up two-decimal currency formatting.
                </p>
                <p>
                  <strong>Limitations:</strong> This tool performs calculations on a single user-specified rate. It does not automatically cross-reference specific product categories (such as clothing under $110 or exempt grocery items) without manual rate adjustment. For address-level tax verification, refer to the{' '}
                  <a
                    href="https://www.tax.ny.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    NYS DTF Online Services
                  </a>.
                </p>
                <p>
                  <strong>Last Reviewed:</strong> 2026 Statutory Rate Verification by CPA Tax Editorial Team.
                </p>
              </div>
            </section>

            {/* ── Section 12: Related State Calculators (Internal Links) ── */}
            <section style={{ maxWidth: 860, borderTop: '1px solid var(--hairline)', paddingTop: 32 }}>
              <span className="section-label">Internal Directory</span>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 16px' }}>
                Related Sales Tax Calculators
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <Link
                  href="/"
                  className="card"
                  style={{ textDecoration: 'none', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18, transition: 'border-color 0.2s' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary-deep)', marginBottom: 4 }}>
                    Reverse Sales Tax Calculator →
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--body)' }}>
                    Universal reverse tax calculator for any US state or international purchase.
                  </p>
                </Link>

                <Link
                  href="/us/connecticut"
                  className="card"
                  style={{ textDecoration: 'none', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18, transition: 'border-color 0.2s' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary-deep)', marginBottom: 4 }}>
                    Connecticut Sales Tax Calculator →
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--body)' }}>
                    Calculate sales tax in CT using the flat 6.35% statewide rate and meals tax.
                  </p>
                </Link>

                <Link
                  href="/us/california"
                  className="card"
                  style={{ textDecoration: 'none', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18, transition: 'border-color 0.2s' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary-deep)', marginBottom: 4 }}>
                    California Sales Tax Calculator →
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--body)' }}>
                    Estimate tax across California&apos;s 7.25% state base rate and district taxes.
                  </p>
                </Link>

                <Link
                  href="/us/new-jersey"
                  className="card"
                  style={{ textDecoration: 'none', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18, transition: 'border-color 0.2s' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary-deep)', marginBottom: 4 }}>
                    New Jersey Sales Tax Calculator →
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--body)' }}>
                    Calculate tax with New Jersey&apos;s 6.625% statewide rate and UEZ exemptions.
                  </p>
                </Link>

                <Link
                  href="/us/pennsylvania"
                  className="card"
                  style={{ textDecoration: 'none', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18, transition: 'border-color 0.2s' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary-deep)', marginBottom: 4 }}>
                    Pennsylvania Sales Tax Calculator →
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--body)' }}>
                    Calculate tax for PA&apos;s 6.00% base rate, Allegheny (7%), and Philadelphia (8%).
                  </p>
                </Link>

                <Link
                  href="/tax-rates"
                  className="card"
                  style={{ textDecoration: 'none', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', background: 'var(--canvas)', padding: 18, transition: 'border-color 0.2s' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary-deep)', marginBottom: 4 }}>
                    All 50 US State Tax Rates →
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--body)' }}>
                    Complete 2026 table of state base rates, local averages, and combined totals.
                  </p>
                </Link>
              </div>
            </section>

            {/* AdSlot */}
            <div style={{ marginTop: 12, marginBottom: 48 }}>
              <AdSlot slot="new-york-rectangle" size="rectangle" />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
