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
        'Florida has a statewide base sales tax rate of 6.00%. In addition, counties may levy a local discretionary sales surtax ranging from 0.50% to 1.50%. This makes the combined sales tax rate 7.00% in Miami-Dade, Broward, and Palm Beach, 7.50% in Hillsborough (Tampa) and Duval (Jacksonville), and 6.50% in Orange County (Orlando). The statewide weighted average rate is approximately 7.13%.',
    },
    {
      question: 'What is the Florida $5,000 discretionary sales surtax cap?',
      answer:
        'Under Florida Statute Section 212.054(2)(b), the county discretionary sales surtax applies only to the first $5,000 of the purchase price on any single item of tangible personal property. The state 6.00% rate applies to the full purchase price. For example, on a $10,000 boat or vehicle in a 7% county, the full $10,000 pays 6% ($600), while only the first $5,000 pays the 1% county surtax ($50), totaling $650 in tax (effective 6.50% rate) rather than $700.',
    },
    {
      question: 'How do I calculate reverse sales tax from a Florida receipt?',
      answer:
        'To calculate the pre-tax price from a Florida receipt under $5,000, convert your county combined rate into a decimal divisor (1 + Rate / 100) and divide the final receipt total. For a 7.00% receipt in Miami, divide the total by 1.070 (e.g., $107.00 ÷ 1.07 = $100.00 pre-tax). For single items exceeding $5,000, subtract the capped county tax ($5,000 × County Surtax) and divide the remainder by 1.06.',
    },
    {
      question: 'Are groceries and clothing taxable in Florida?',
      answer:
        'General unprepared groceries and food products for home preparation are exempt from Florida sales tax under Rule 12A-1.011. However, clothing is fully taxable in Florida at the standard combined rate (6.5% to 7.5%), with the exception of items under statutory price caps during temporary annual Florida Back-to-School Sales Tax Holidays.',
    },
    {
      question: 'Does Florida charge sales tax on commercial rent?',
      answer:
        'Yes. Uniquely among US states, Florida imposes sales tax on the total rent paid for the lease or license to use commercial real property under Florida Statute Section 212.031. The state tax rate on commercial rent was lowered to a flat 2.0% statewide plus the applicable county discretionary sales surtax.',
    },
    {
      question: 'How do businesses file sales tax with the Florida Department of Revenue?',
      answer:
        'Florida registered businesses report and remit sales tax via Florida Form DR-15 (Sales and Use Tax Return) through the Florida Department of Revenue (FDOR) online portal. Businesses that bake tax into shelf prices must reverse calculate taxable gross receipts to ensure compliance on Line 1 (Gross Sales).',
    },
    {
      question: 'How many Florida counties levy a 0% discretionary surtax?',
      answer:
        'Only a small number of rural Florida counties (such as Citrus) levy a 0.0% local surtax, maintaining the pure 6.00% state rate. All major metropolitan counties levy between 0.50% and 1.50% local surtax.',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'Florida', item: 'https://salestaxreversecalculator.com/us/florida' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Florida Reverse Sales Tax Calculator',
    alternateName: 'PreTaxPrice Florida Tax Tool',
    url: 'https://salestaxreversecalculator.com/us/florida',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Sales Tax Calculation & Accounting',
    softwareVersion: '2.4.0',
    inLanguage: 'en',
    operatingSystem: 'All modern browsers (Desktop & Mobile)',
    description:
      'Free Florida reverse sales tax calculator pre-loaded with FDOR 2026 rates. Back out sales tax from Miami (7.0%), Tampa (7.5%), Orlando (6.5%), and Jacksonville receipts.',
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

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Reverse Calculate Florida Sales Tax',
    description:
      'Step-by-step mathematical guide to extract pre-tax prices and sales tax paid from Florida retail receipts and commercial invoices.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Determine county discretionary surtax rate',
        text: 'Identify your county combined rate (6.00% state rate + county surtax). Miami-Dade is 7.00%, Hillsborough/Tampa is 7.50%, Orange/Orlando is 6.50%.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Formulate the decimal divisor for items under $5,000',
        text: 'Divide the combined tax rate by 100 and add 1. For a 7.00% county: 7.00 / 100 = 0.07; 1 + 0.07 = 1.070.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Divide total receipt amount by the divisor',
        text: 'Divide your total checkout or receipt amount by 1.070. For example, $535.00 ÷ 1.070 = $500.00 pre-tax.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Subtract pre-tax amount to verify sales tax paid',
        text: 'Subtract $500.00 from $535.00 to determine that $35.00 was paid in Florida sales tax.',
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

  const flCounties = [
    { name: 'Miami-Dade County (Miami)', state: '6.00%', surtax: '1.00%', combined: '7.00%', note: 'Largest county & commercial center' },
    { name: 'Broward County (Ft. Lauderdale)', state: '6.00%', surtax: '1.00%', combined: '7.00%', note: 'Transportation surtax enacted' },
    { name: 'Palm Beach County (West Palm)', state: '6.00%', surtax: '1.00%', combined: '7.00%', note: 'Infrastructure surtax' },
    { name: 'Hillsborough County (Tampa)', state: '6.00%', surtax: '1.50%', combined: '7.50%', note: 'Highest combined rate in central FL' },
    { name: 'Orange County (Orlando)', state: '6.00%', surtax: '0.50%', combined: '6.50%', note: 'Tourism & entertainment hub' },
    { name: 'Duval County (Jacksonville)', state: '6.00%', surtax: '1.50%', combined: '7.50%', note: 'Northeast FL transportation surtax' },
    { name: 'Pinellas County (St. Petersburg)', state: '6.00%', surtax: '1.00%', combined: '7.00%', note: 'Penny for Pinellas infrastructure tax' },
    { name: 'Lee County (Fort Myers)', state: '6.00%', surtax: '0.50%', combined: '6.50%', note: 'School capital improvement surtax' },
    { name: 'Polk County (Lakeland)', state: '6.00%', surtax: '1.00%', combined: '7.00%', note: 'Distribution & logistics center' },
    { name: 'Brevard County (Melbourne/Space Coast)', state: '6.00%', surtax: '1.00%', combined: '7.00%', note: 'Indian River Lagoon restoration tax' },
  ];

  const floridaPresets = [
    { label: 'Miami / Broward / Palm Beach (7.00%)', rate: 7.00 },
    { label: 'Tampa / Hillsborough / Jacksonville (7.50%)', rate: 7.50 },
    { label: 'Orlando / Orange (6.50%)', rate: 6.50 },
    { label: 'Florida State Base (6.00%)', rate: 6.00 },
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
            <span>☀️</span> FL · State Base: 6.00% · County Surtax: 0.5%–1.5% · $5k Single Item Cap
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            Florida Reverse Sales Tax Calculator
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ By <strong>Florida Tax Compliance Team</strong></span>
            <span>•</span>
            <span>🔍 Verified for <strong>2026 FDOR County Surtaxes</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>Florida Department of Revenue (F.S. Ch. 212)</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 740, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate the original pre-tax price from any Florida receipt or invoice total.
            Pre-loaded with Florida&apos;s 6.00% state rate, county surtaxes for Miami (7.0%), Tampa (7.5%), Orlando (6.5%), and single item $5,000 limitation rules.
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
              { label: 'State Base Rate', value: '6.00%', color: 'var(--ink)', desc: 'Mandatory statewide sales tax' },
              { label: 'Avg Combined Rate', value: `${stateData.rate}%`, color: 'var(--primary)', desc: 'Population-weighted average' },
              { label: 'County Surtax Range', value: '0.5%–1.5%', color: 'var(--ink)', desc: 'Local discretionary surtaxes' },
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
            <StateCalculatorClient
              stateData={stateData}
              presetRates={floridaPresets}
              rateNote="Florida state rate is 6.00%. Enter your county rate (e.g., 7.00% for Miami-Dade or Broward, 7.50% for Tampa/Hillsborough, 6.50% for Orlando/Orange) to calculate from your receipt."
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* Florida Discretionary Surtax Structure */}
            <section>
              <span className="section-label">State Tax Anatomy</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                How Florida Sales Tax Works: FDOR Framework
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Florida sales tax is administered by the <strong>Florida Department of Revenue (FDOR)</strong> under <strong>Florida Statutes Chapter 212</strong>. Florida does not permit cities or municipalities to levy independent municipal sales taxes. Instead, all local additions are enacted at the county level as <strong>Discretionary Sales Surtaxes</strong>.
                </p>
                <div className="card" style={{ padding: 22, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                    How Florida Rates are Composed:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                    <li><strong>State Sales Tax (6.00%):</strong> Applies uniformly to all retail transactions of taxable tangible personal property and taxable services statewide.</li>
                    <li><strong>Discretionary County Surtax (0.50% to 1.50%):</strong> Enacted by county commissions or voters for dedicated purposes, such as transit infrastructure (Charter County Transportation Surtax), school capital improvements, or indigent healthcare.</li>
                    <li><strong>Destination Sourcing:</strong> In Florida, sales tax on delivered goods is sourced to the delivery address county, not the seller&apos;s warehouse location.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* County Breakdown Table */}
            <section>
              <span className="section-label">County Rates</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                Florida Sales Tax Rates by County (2026)
              </h2>
              <p style={{ color: 'var(--body)', fontSize: 15, marginBottom: 16 }}>
                Review combined rates across Florida&apos;s primary population and commerce centers:
              </p>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>County</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>State Rate</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>County Surtax</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Combined Rate</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Key Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flCounties.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: idx === flCounties.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                        <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>{c.name}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 14 }}>{c.state}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 14 }}>{c.surtax}</td>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{c.combined}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--muted)', fontSize: 13 }}>{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* The Famous $5,000 Surtax Limitation */}
            <section>
              <span className="section-label">High-Value Items</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                The Florida $5,000 Discretionary Surtax Limitation
              </h2>
              <div className="card" style={{ padding: 26 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  Under <strong>Florida Statutes § 212.054(2)(b)</strong>, Florida enforces a special statutory rule for high-value items: <strong>the county discretionary sales surtax applies only to the first $5,000 of the purchase price on any single item of tangible personal property</strong>.
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--ink)' }}>
                  <div><strong>How the $5,000 Cap Operates:</strong></div>
                  <div>• <strong>State Tax (6.00%):</strong> Applies to the entire purchase price without any cap.</div>
                  <div>• <strong>County Surtax (e.g., 1.00%):</strong> Applies only to the first $5,000 (maximum surtax = $50.00). Any amount above $5,000 incurs 0% county surtax.</div>
                  <div>• <strong>Worked Reverse Tax Example for Single Items &gt; $5,000:</strong></div>
                  <div style={{ paddingLeft: 12, fontFamily: 'monospace', color: 'var(--primary-deep)' }}>
                    Suppose you purchase an equipment item in Miami-Dade (1% surtax) and the tax-inclusive receipt is $10,650.00.<br />
                    1. Subtract capped surtax: $10,650.00 - ($5,000 × 0.01) = $10,650.00 - $50.00 = $10,600.00.<br />
                    2. Divide by state rate: $10,600.00 ÷ 1.060 = <strong>$10,000.00 Pre-Tax Price</strong>.<br />
                    3. Total Tax Paid: $600.00 state + $50.00 county = <strong>$650.00</strong> (effective rate: 6.50%).
                  </div>
                </div>
              </div>
            </section>

            {/* Standard Worked Calculation */}
            <section>
              <span className="section-label">Mathematical Proof</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Worked Example: Backing Out 7.00% Miami Sales Tax
              </h2>
              <div className="card" style={{ padding: 28 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  For general retail items under $5,000 purchased in <strong>Miami-Dade or Broward County (7.00% rate)</strong>:
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'monospace', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><span style={{ color: 'var(--muted)' }}>Step 1 — Decimal Divisor:</span> <span style={{ color: 'var(--primary-deep)', fontWeight: 700 }}>1 + (7.00 / 100) = 1.0700</span></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 2 — Calculate Pre-Tax Price:</span> <span style={{ color: 'var(--ink)' }}>$535.00 ÷ 1.0700 = </span><strong style={{ color: 'var(--primary-deep)' }}>$500.00</strong></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 3 — Extract Sales Tax Paid:</span> <span style={{ color: 'var(--ink)' }}>$535.00 - $500.00 = </span><strong style={{ color: '#b91c1c' }}>$35.00</strong></div>
                </div>
              </div>
            </section>

            {/* Commercial Rent Sales Tax Reduction */}
            <section>
              <span className="section-label">Commercial Real Estate</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Florida Commercial Rent Sales Tax Reduced to 2.0%
              </h2>
              <div className="card" style={{ padding: 24 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  Florida is one of the only states in the nation that taxes commercial real estate leases under <strong>F.S. § 212.031</strong>. The state tax rate on commercial rent has been reduced to a flat <strong>2.0% statewide</strong>, plus the applicable county surtax (e.g., 3.0% total in Miami-Dade). When reverse calculating commercial lease invoices, use the 2.0% state base rate rather than the standard 6.0% retail rate.
                </p>
              </div>
            </section>

            {/* FDOR Form DR-15 Reporting Guide */}
            <section>
              <span className="section-label">Merchant Compliance</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Filing Form DR-15 with the Florida Department of Revenue
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Florida registered dealers remit sales tax on <strong>Form DR-15</strong>. When pricing includes sales tax:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Line 1: Gross Sales</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Enter total pre-tax sales across all categories. Divide tax-inclusive register receipts by 1 + your combined rate before entering gross revenue.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Line 2: Exempt Sales</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Report sales of exempt groceries, prescription medicines, and sales accompanied by Florida Annual Resale Certificates (Form DR-13).
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Line 15: Surtax Due</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Calculate and report discretionary surtax amounts, applying the $5,000 threshold deduction on individual high-value transactions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Exemptions */}
            <section>
              <span className="section-label">Statutory Exemptions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Key Florida Sales Tax Exemptions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>🍎 Food & Groceries (Rule 12A-1.011)</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Unprepared food items for home consumption (vegetables, meat, fruit, dairy) are 100% exempt. Restaurant meals, alcohol, and candy are fully taxable.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>💊 Medical Supplies & Prosthetics</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Prescription drugs, medical devices, eyeglasses, hearing aids, and dental prosthetics are completely exempt from Florida sales tax.
                  </p>
                </div>
                <div className="card" style={{ padding: 20, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>⚡ Residential Utilities</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                    Electricity, natural gas, and water service sold to residential households are statutory exempt from state and county sales taxes.
                  </p>
                </div>
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

            {/* Contextual Internal Links Section */}
            <section className="card" style={{ padding: 28, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>
                Explore Other Reverse Sales Tax Calculators
              </h3>
              <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7, marginBottom: 16 }}>
                Compare Florida rates with nearby southeastern states or access our nationwide database:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="/" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Reverse Sales Tax Calculator (Home)
                </Link>
                <Link href="/us/georgia" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Georgia Sales Tax (Atlanta 8.9%)
                </Link>
                <Link href="/us/south-carolina" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  South Carolina Sales Tax (6%–9%)
                </Link>
                <Link href="/us/texas" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Texas Sales Tax (8.25% Standard)
                </Link>
                <Link href="/tax-rates" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Complete 50-State Tax Directory
                </Link>
              </div>
            </section>

            <AdSlot slot="fl-bottom-slot" size="rectangle" />
          </div>
        </div>
      </div>
    </main>
  );
}
