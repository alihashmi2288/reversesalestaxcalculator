import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { StateRate } from '@/data/stateTaxRates';
import StateCalculatorClient from './StateCalculatorClient';

interface Props {
  stateData: StateRate;
}

export default function CaliforniaPage({ stateData }: Props) {
  const faqs = [
    {
      question: 'What is the sales tax rate in California?',
      answer:
        'California has a statewide base sales tax rate of 7.25%. This base rate includes 6.00% for state funds and 1.25% for mandatory local county and city operational funds under the Bradley-Burns Uniform Local Sales and Use Tax Law. When voter-approved city and county special district taxes (transactions and use taxes) are added, actual combined rates range from 7.25% to 10.75% depending on the specific municipality.',
    },
    {
      question: 'How do I calculate reverse sales tax for a California receipt?',
      answer:
        'To reverse calculate California sales tax from a final receipt total, convert your local combined tax rate to a decimal divisor (1 + Rate / 100) and divide the total by that number. For example, in Los Angeles where the tax rate is 9.50%, a receipt total of $109.50 divided by 1.095 equals $100.00 pre-tax. The sales tax paid is $9.50.',
    },
    {
      question: 'Why does California have different sales tax rates by city and county?',
      answer:
        'Under the California Revenue and Taxation Code, local jurisdictions and voters can approve special district taxes (Transactions and Use Taxes) to fund regional mass transit, public safety, parks, or municipal services. These local voter initiatives add between 0.10% and 3.50% on top of the 7.25% base rate, creating rates like 9.50% in Los Angeles, 8.625% in San Francisco, and 10.75% in parts of Alameda County.',
    },
    {
      question: 'What is the California 80/80 rule for food sales tax?',
      answer:
        'Under CDTFA Regulation 1603, the "80/80 Rule" applies when more than 80% of a food retailer\'s gross receipts come from food sales, and more than 80% of those food sales are subject to tax (e.g., hot foods, dine-in meals, or alcoholic beverages). When both thresholds are met, the business must collect sales tax on all cold food products sold for takeout unless the merchant elects to maintain separate POS records of takeout food sales.',
    },
    {
      question: 'What items are exempt from sales tax in California?',
      answer:
        'Under California Department of Tax and Fee Administration (CDTFA) Regulation 1602, most unprepared food products for home consumption (groceries), prescription medicines, and prosthetic devices are exempt from sales tax. However, hot prepared food (like restaurant meals), alcoholic beverages, carbonated drinks, cannabis, and general retail goods are fully taxable.',
    },
    {
      question: 'How do small businesses back out sales tax for CDTFA tax returns?',
      answer:
        'California businesses that include sales tax in their marked prices must reverse calculate their gross taxable receipts before filing CDTFA Form 401-A. Divide gross collections by 1 + your district tax rate (e.g., 1.095 for 9.5%) to find the true taxable sales amount, then subtract that figure to report the exact sales tax collected.',
    },
    {
      question: 'What is the highest sales tax rate in California?',
      answer:
        'The highest combined sales tax rate in California reaches 10.75% in certain cities with multiple overlapping district taxes, such as Alameda, Albany, Newark, and South Gate. In these jurisdictions, divide receipt totals by 1.1075 to calculate the pre-tax price.',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'California', item: 'https://salestaxreversecalculator.com/us/california' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'California Reverse Sales Tax Calculator',
    alternateName: 'PreTaxPrice California Tax Tool',
    url: 'https://salestaxreversecalculator.com/us/california',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Sales Tax Calculation & Accounting',
    softwareVersion: '2.4.0',
    inLanguage: 'en',
    operatingSystem: 'All modern browsers (Desktop & Mobile)',
    description:
      'Free California reverse sales tax calculator pre-loaded with CDTFA 2026 rates. Back out sales tax from Los Angeles (9.5%), San Francisco (8.625%), and all CA cities.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    areaServed: {
      '@type': 'State',
      name: 'California',
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

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Reverse Calculate California District Sales Tax',
    description:
      'Step-by-step mathematical instructions to back out California statewide base and municipal district sales taxes from customer receipts.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Determine your California jurisdiction tax rate',
        text: 'Find your combined rate by adding the 7.25% statewide base rate to local district taxes (e.g., 9.50% in Los Angeles, 8.625% in San Francisco).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Formulate the decimal divisor',
        text: 'Divide the combined tax percentage by 100 and add 1. For Los Angeles (9.50%): 9.50 / 100 = 0.095; 1 + 0.095 = 1.095.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Divide the receipt total by the divisor',
        text: 'Divide the checkout total by 1.095. For a $547.50 receipt: $547.50 ÷ 1.095 = $500.00 pre-tax.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Subtract pre-tax amount from receipt total to isolate sales tax',
        text: 'Subtract $500.00 from $547.50 to isolate the exact $47.50 in CDTFA sales tax paid.',
      },
    ],
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

  const caCities = [
    { name: 'Los Angeles', rate: 9.50, county: 'Los Angeles County', note: 'Base 7.25% + LA County transit Measure M & R' },
    { name: 'San Francisco', rate: 8.625, county: 'San Francisco County', note: 'Combined city and county unified rate' },
    { name: 'San Diego', rate: 7.75, county: 'San Diego County', note: 'Base 7.25% + 0.50% TransNet transit fund' },
    { name: 'San Jose', rate: 9.375, county: 'Santa Clara County', note: 'Includes Santa Clara County transit taxes' },
    { name: 'Sacramento', rate: 8.75, county: 'Sacramento County', note: 'State base + local Measure U municipal tax' },
    { name: 'Oakland / Alameda', rate: 10.75, county: 'Alameda County', note: 'Highest combined district rate in California' },
    { name: 'Long Beach', rate: 10.25, county: 'Los Angeles County', note: 'Includes Long Beach Measure A/MA local taxes' },
    { name: 'Fresno', rate: 8.35, county: 'Fresno County', note: 'State base + Measure C transit improvement' },
    { name: 'Bakersfield', rate: 8.25, county: 'Kern County', note: 'State base + Kern County public safety' },
    { name: 'Anaheim / Orange Co.', rate: 7.75, county: 'Orange County', note: 'State base + Measure M transportation fund' },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>🗺️</span> CA · State Base: 7.25% · Avg Combined: 8.85% · Max: 10.75%
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            California Reverse Sales Tax Calculator
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ By <strong>California Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Verified for <strong>2026 CDTFA District Rates</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>CDTFA (Cal. Rev. & Tax Code)</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 740, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate the original pre-tax price from any California receipt or invoice total.
            Pre-loaded with California&apos;s {stateData.rate}% statewide average rate and adjustable for Los Angeles (9.50%), San Francisco (8.625%), and all municipal districts.
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
            <span style={{ color: 'var(--ink)' }}>California</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'State Base Rate', value: '7.25%', color: 'var(--ink)', desc: 'Mandatory statewide base rate' },
              { label: 'Avg Combined Rate', value: `${stateData.rate}%`, color: 'var(--primary)', desc: 'Population-weighted average' },
              { label: 'Max District Rate', value: '10.75%', color: 'var(--ink)', desc: 'Alameda County jurisdictions' },
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
            <StateCalculatorClient stateData={stateData} rateNote="California statewide rate is 7.25%. Enter your exact city or district rate (e.g., 9.50% for LA, 8.625% for SF, 10.75% for Alameda) to calculate from your receipt." />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* California Tax Structure Breakdown */}
            <section>
              <span className="section-label">State Tax Structure</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                How California Sales Tax Works: CDTFA Anatomy
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  California has one of the most layered sales tax frameworks in the United States. Governed by the <strong>California Department of Tax and Fee Administration (CDTFA)</strong>, every retail sale starts with a mandatory statewide base rate of <strong>7.25%</strong>, augmented by localized <strong>Transactions and Use Taxes (district taxes)</strong>.
                </p>
                <div className="card" style={{ padding: 22, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                    Components of California&apos;s 7.25% Base Rate:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                    <li><strong>3.9375%</strong> — State General Fund (operates public education, healthcare, and state services)</li>
                    <li><strong>0.50%</strong> — Local Public Safety Fund (Proposition 172)</li>
                    <li><strong>0.50%</strong> — Local Revenue Fund 1991 (health and social services realignment)</li>
                    <li><strong>1.0625%</strong> — Local Revenue Fund 2011 (local criminal justice realignment)</li>
                    <li><strong>1.25%</strong> — Bradley-Burns Uniform Local Sales and Use Tax (1.00% local city/county operational + 0.25% county transportation funds)</li>
                  </ul>
                </div>
                <p>
                  When city councils, county boards, or voters pass local ballot measures to fund specific projects (like BART, LA Metro, or community parks), additional district taxes of 0.10% to 3.50% are tacked on, bringing final checkout rates between <strong>7.25% and 10.75%</strong>.
                </p>
              </div>
            </section>

            {/* Major California Cities Table */}
            <section>
              <span className="section-label">Major Cities</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                Tax Rates in Major California Cities (2026)
              </h2>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>City / Jurisdiction</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>County</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Combined Rate</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Key Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caCities.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: idx === caCities.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                        <td style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 600 }}>{c.name}</td>
                        <td style={{ padding: '14px 20px', color: 'var(--body)', fontSize: 14 }}>{c.county}</td>
                        <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{c.rate.toFixed(3).replace(/\.?0+$/, '')}%</td>
                        <td style={{ padding: '14px 20px', color: 'var(--muted)', fontSize: 13 }}>{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Worked Calculation Example */}
            <section>
              <span className="section-label">Mathematical Proof</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Step-by-Step Calculation: Backing Out 9.50% Los Angeles Sales Tax
              </h2>
              <div className="card" style={{ padding: 28 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  Suppose you purchase computer hardware or office furniture in Los Angeles, California, and the final receipt total is <strong>$547.50</strong> (inclusive of the 9.50% LA combined tax).
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'monospace', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><span style={{ color: 'var(--muted)' }}>Step 1 — Identify Divisor:</span> <span style={{ color: 'var(--primary-deep)', fontWeight: 700 }}>1 + (9.50 / 100) = 1.0950</span></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 2 — Calculate Pre-Tax:</span> <span style={{ color: 'var(--ink)' }}>$547.50 ÷ 1.0950 = </span><strong style={{ color: 'var(--primary-deep)' }}>$500.00</strong></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 3 — Extract Sales Tax:</span> <span style={{ color: 'var(--ink)' }}>$547.50 - $500.00 = </span><strong style={{ color: '#b91c1c' }}>$47.50</strong></div>
                </div>

                <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--hairline)', fontSize: 14, color: 'var(--body)', lineHeight: 1.7 }}>
                  <p>
                    <strong>Why Subtraction Fails:</strong> Multiplying $547.50 by 9.50% produces $52.01, giving a false pre-tax price of $495.49. You would understate pre-tax expense by $4.51 and over-report tax. Division by 1.0950 reflects the true economic transaction.
                  </p>
                </div>
              </div>
            </section>

            {/* California 80/80 Food Tax Rule */}
            <section>
              <span className="section-label">Food & Beverage Tax Rules</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                CDTFA Regulation 1603: The 80/80 Rule for Food Products
              </h2>
              <div className="card" style={{ padding: 26 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  Under <strong>CDTFA Regulation 1603</strong>, California enforces the famous <strong>80/80 Rule</strong> to determine whether food retailers must collect sales tax on cold, unheated takeout food:
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--ink)' }}>
                  <div><strong>Condition 1:</strong> Over 80% of the seller&apos;s gross receipts come from the sale of food products.</div>
                  <div><strong>Condition 2:</strong> Over 80% of those food sales are taxable (e.g., hot food, alcoholic beverages, meals served for dining on premises).</div>
                  <div><strong>Result:</strong> If both conditions are satisfied, <em>all food sales</em>—including cold sandwiches and takeaway pastries—become taxable at the full district rate, unless the seller keeps segregated POS records of cold takeaway transactions.</div>
                </div>
              </div>
            </section>

            {/* CDTFA Form 401-A Guide */}
            <section>
              <span className="section-label">Merchant Compliance</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Reporting Tax-Inclusive Sales on CDTFA Form 401-A
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  California merchants who mark items with tax-inclusive pricing must follow CDTFA Regulation 1700(a)(2)(A). When filing Form 401-A:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Line 1: Total Sales</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Enter calculated pre-tax sales. Do not report tax reimbursement collected as part of taxable sales proceeds.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Line 2: Nontaxable Deductions</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Deduct exempt sales including cold grocery food (Reg 1602), prescription drugs (Reg 1591), and verified resale sales.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Schedule A: District Taxes</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Allocate taxable transactions by district code so regional voter measures receive appropriate allocations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Exemptions */}
            <section>
              <span className="section-label">Exemptions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Key California Sales Tax Exemptions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>🥗 Groceries (Regulation 1602)</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Food products for human consumption (produce, meat, milk, bread) are exempt from sales tax. Prepared hot food, alcoholic beverages, and dietary supplements are taxable.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>💊 Medicines (Regulation 1591)</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Prescription drugs dispensed by a licensed pharmacist, insulin, and prosthetic devices are fully exempt from California state and district sales tax.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>⚙️ Manufacturing & R&D Equipment</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Qualified manufacturers and biotech researchers receive a partial exemption of 3.9375% from the state general fund portion of sales tax on capital equipment.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <span className="section-label">FAQ</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px' }}>
                California Sales Tax Frequently Asked Questions
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

            {/* Contextual Internal Links Section */}
            <section className="card" style={{ padding: 28, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>
                Explore Other Reverse Sales Tax Calculators
              </h3>
              <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7, marginBottom: 16 }}>
                Compare California rates with neighboring western states or calculate across the nation:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="/" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Reverse Sales Tax Calculator (Home)
                </Link>
                <Link href="/us/arizona" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Arizona TPT Calculator
                </Link>
                <Link href="/us/nevada" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Nevada Sales Tax (Las Vegas 8.375%)
                </Link>
                <Link href="/us/washington" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Washington Sales Tax (Seattle 10.35%)
                </Link>
                <Link href="/tax-rates" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Complete 50-State Rates Table
                </Link>
              </div>
            </section>

            <AdSlot slot="ca-bottom-slot" size="rectangle" />
          </div>
        </div>
      </div>
    </main>
  );
}
