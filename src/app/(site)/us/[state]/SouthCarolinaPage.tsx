import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { StateRate } from '@/data/stateTaxRates';
import NeighborStateComparison from '@/components/NeighborStateComparison';
import StateCalculatorClient from './StateCalculatorClient';

interface Props {
  stateData: StateRate;
}

export default function SouthCarolinaPage({ stateData }: Props) {
  const faqs = [
    {
      question: 'What is the sales tax rate in South Carolina?',
      answer:
        'South Carolina levies a statewide base sales tax rate of 6.00%. Counties are permitted to enact local option sales taxes—including Local Option Sales Tax (LOST), Capital Projects Sales Tax, and Transportation Sales Tax—ranging from 1.00% to 3.00%. Consequently, combined rates across South Carolina range from 6.00% in counties like Greenville to 9.00% in Charleston County, with a statewide population-weighted average of approximately 7.51%.',
    },
    {
      question: 'How do I calculate reverse sales tax from a South Carolina receipt?',
      answer:
        'To calculate the pre-tax price from a South Carolina receipt, divide the total paid by 1 plus the applicable local tax rate expressed as a decimal (1 + Rate / 100). For example, in Charleston where the combined rate is 9.00%, divide a $109.00 receipt total by 1.090 to determine the original pre-tax price of $100.00. The sales tax paid is $9.00.',
    },
    {
      question: 'What is South Carolina\'s $500 maximum tax rule on vehicles?',
      answer:
        'Under South Carolina Code Section 12-36-2110 and the South Carolina Department of Motor Vehicles (SCDMV) Infrastructure Maintenance Fee (IMF) statutes, sales tax on the purchase or lease of motor vehicles, motorcycles, boats, and aircraft is strictly capped at a maximum of $500 (calculated as 5.00% of the purchase price up to a $10,000 ceiling). Purchases above $10,000 pay the flat $500 maximum regardless of the total transaction amount.',
    },
    {
      question: 'Are groceries exempt from sales tax in South Carolina?',
      answer:
        'Yes. Under S.C. Code Ann. § 12-36-2120(75), unprepared food items eligible for purchase under the federal Supplemental Nutrition Assistance Program (SNAP)—including fresh meat, produce, bread, milk, and canned goods—are 100% exempt from the state 6.00% sales tax and all local option taxes. Prepared meals, restaurant foods, and vending machine items remain fully taxable.',
    },
    {
      question: 'What is the sales tax rate in Charleston, Columbia, and Greenville?',
      answer:
        'Charleston County has a 9.00% combined rate (6.00% state + 1.00% LOST + 1.00% Transportation + 1.00% Education/Capital). Richland County (Columbia) has an 8.00% combined rate (6.00% state + 1.00% LOST + 1.00% Transportation). Greenville County levies only the 6.00% state rate with no local additions.',
    },
    {
      question: 'How do businesses file and report sales tax to the SCDOR?',
      answer:
        'South Carolina businesses report sales and use taxes online via MyDORWAY (mydorway.dor.sc.gov) using Form ST-3 (State Sales and Use Tax Return). Businesses that charge tax-inclusive pricing reverse calculate their gross sales (Gross Collections ÷ (1 + Rate)) before entering figures on Line 1 (Gross Proceeds of Sales).',
    },
    {
      question: 'Does South Carolina hold an annual Sales Tax Holiday?',
      answer:
        'Yes. South Carolina holds a statutory 72-hour Sales Tax Holiday beginning on the first Friday in August. Eligible back-to-school items—including clothing, footwear, school supplies, computers, and bed and bath linens—are exempt from both the 6.00% state sales tax and all local option taxes.',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'South Carolina', item: 'https://salestaxreversecalculator.com/us/south-carolina' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'South Carolina Sales Tax Calculator (Forward & Reverse 2026)',
    alternateName: 'PreTaxPrice SC Tax Calculator',
    url: 'https://salestaxreversecalculator.com/us/south-carolina',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Sales Tax Calculation & Accounting',
    softwareVersion: '2.4.0',
    inLanguage: 'en',
    operatingSystem: 'All modern browsers (Desktop & Mobile)',
    description:
      'Free South Carolina sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from Charleston, Columbia, and Myrtle Beach receipts with local surtaxes.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    areaServed: {
      '@type': 'State',
      name: 'South Carolina',
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
    name: 'How to Reverse Calculate South Carolina Sales Tax',
    description:
      'Step-by-step mathematical guide to extract pre-tax prices and sales tax paid from South Carolina receipts and invoices.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Determine the applicable county combined rate',
        text: 'Add the 6.00% state rate to any local option sales taxes (e.g., Charleston County: 6.00% State + 3.00% Local = 9.00%).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Convert the percentage into a decimal factor',
        text: 'Divide the tax percentage by 100 and add 1. For a 9.00% rate: 9.00 / 100 = 0.09; 1 + 0.09 = 1.090.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Divide the receipt total by the factor',
        text: 'Divide the grand total by 1.090 to reveal the base pre-tax price. For example, $545.00 ÷ 1.090 = $500.00 pre-tax.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Subtract the pre-tax price to confirm sales tax paid',
        text: 'Subtract $500.00 from $545.00 to determine that exactly $45.00 was paid in South Carolina state and local sales tax.',
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

  const scCounties = [
    { county: 'Charleston County', stateRate: '6.00%', localRate: '3.00%', combined: '9.00%', note: 'State + LOST + Transportation + School Capital' },
    { county: 'Richland County (Columbia)', stateRate: '6.00%', localRate: '2.00%', combined: '8.00%', note: 'State + LOST + Transportation' },
    { county: 'Horry County (Myrtle Beach)', stateRate: '6.00%', localRate: '2.00%', combined: '8.00%', note: 'State + LOST + RIDE road improvement' },
    { county: 'Beaufort County (Hilton Head)', stateRate: '6.00%', localRate: '1.00%', combined: '7.00%', note: 'State + Local Option Tax' },
    { county: 'York County (Rock Hill)', stateRate: '6.00%', localRate: '1.00%', combined: '7.00%', note: 'State + Pennies for Progress capital tax' },
    { county: 'Lexington County', stateRate: '6.00%', localRate: '1.00%', combined: '7.00%', note: 'State + Capital Projects Tax' },
    { county: 'Greenville County', stateRate: '6.00%', localRate: '0.00%', combined: '6.00%', note: 'State base rate only (no local sales tax)' },
    { county: 'Spartanburg County', stateRate: '6.00%', localRate: '0.00%', combined: '6.00%', note: 'State base rate only' },
    { county: 'Anderson County', stateRate: '6.00%', localRate: '1.00%', combined: '7.00%', note: 'State + Education Capital Projects' },
    { county: 'Florence County', stateRate: '6.00%', localRate: '2.00%', combined: '8.00%', note: 'State + LOST + Capital Projects' },
  ];

  const southCarolinaPresets = [
    { label: 'Charleston (9.00%)', rate: 9.00 },
    { label: 'Columbia / Richland (8.00%)', rate: 8.00 },
    { label: 'Myrtle Beach / Horry (8.00%)', rate: 8.00 },
    { label: 'Greenville (6.00%)', rate: 6.00 },
    { label: 'South Carolina Base (6.00%)', rate: 6.00 },
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
            <span>🌴</span> SC · State Base: 6.00% · Avg Combined: 7.51% · $500 Max Vehicle Cap
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            South Carolina Reverse Sales Tax Calculator (7.51%)
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ By <strong>South Carolina Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Verified for <strong>2026 SCDOR County Surtaxes</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>South Carolina Department of Revenue (SCDOR)</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 740, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate the original pre-tax price from any South Carolina receipt or invoice total.
            Pre-loaded with South Carolina&apos;s 6.00% state base, county local option rates (Charleston 9.0%, Columbia 8.0%, Myrtle Beach 8.0%), and vehicle tax cap rules.
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
            <span style={{ color: 'var(--ink)' }}>South Carolina</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'State Base Rate', value: '6.00%', color: 'var(--ink)', desc: 'Mandatory statewide sales tax' },
              { label: 'Avg Combined Rate', value: `${stateData.rate}%`, color: 'var(--primary)', desc: 'Population-weighted average' },
              { label: 'Max County Rate', value: '9.00%', color: 'var(--ink)', desc: 'Charleston County combined' },
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
              presetRates={southCarolinaPresets}
              rateNote="South Carolina state rate is 6.00%. Enter your specific county rate (e.g., 9.00% for Charleston, 8.00% for Columbia or Myrtle Beach, 6.00% for Greenville) to back out exact tax."
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* South Carolina Tax Structure Breakdown */}
            <section>
              <span className="section-label">State Tax Structure</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                How South Carolina Sales Tax Works: SCDOR Rules
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  South Carolina imposes a <strong>6.00% statewide sales tax</strong> on the gross proceeds of retail sales of tangible personal property under <strong>South Carolina Code Title 12, Chapter 36</strong>. However, total sales tax at checkout depends heavily on county-level referendums.
                </p>
                <div className="card" style={{ padding: 22, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                    Types of Local Option Taxes in South Carolina:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                    <li><strong>Local Option Sales Tax (LOST):</strong> A 1.00% tax levied by participating counties to reduce municipal and county property taxes.</li>
                    <li><strong>Capital Projects Sales Tax (CPST):</strong> A 1.00% voter-approved tax dedicated to specific road, courthouse, water, and park infrastructure projects.</li>
                    <li><strong>Transportation Sales Tax:</strong> A dedicated 1.00% surtax for mass transit and highway construction (e.g., Charleston and Richland counties).</li>
                    <li><strong>School District / Education Capital Improvement Tax:</strong> An additional 1.00% tax in select counties dedicated to school construction and technology.</li>
                  </ul>
                </div>
                <p>
                  Because these county additions vary from 0% in upstate manufacturing centers like Greenville to 3.00% in coastal tourism centers like Charleston, using the exact county rate is vital for accurate reverse calculations.
                </p>
              </div>
            </section>

            {/* South Carolina County Breakdown Table */}
            <section>
              <span className="section-label">County Rates</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                South Carolina Sales Tax Rates by County (2026)
              </h2>
              <p style={{ color: 'var(--body)', fontSize: 15, marginBottom: 16 }}>
                South Carolina sales tax rates reflect the state 6.00% baseline plus applicable local option taxes. The table below outlines major counties:
              </p>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>County / Metro Area</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>State</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Local Option</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Combined Rate</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Key Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scCounties.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: idx === scCounties.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                        <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>{c.county}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 14 }}>{c.stateRate}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 14 }}>{c.localRate}</td>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{c.combined}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--muted)', fontSize: 13 }}>{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Special Rule: $500 Maximum Vehicle Tax */}
            <section>
              <span className="section-label">Statutory Maximum Rule</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                South Carolina&apos;s $500 Maximum Tax on Motor Vehicles
              </h2>
              <div className="card" style={{ padding: 26 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  One of the most distinctive aspects of South Carolina tax law is the <strong>$500 maximum tax cap</strong> under <strong>S.C. Code § 12-36-2110</strong> and the Infrastructure Maintenance Fee (IMF) on qualifying motor vehicles, motorcycles, boats, and recreational vehicles.
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--ink)' }}>
                  <div><strong>How the $500 Cap Operates:</strong></div>
                  <div>• Qualifying motor vehicles are assessed a 5.00% fee, but the total tax is capped at exactly <strong>$500.00</strong>.</div>
                  <div>• For vehicles priced at $10,000 or less, the tax is 5% (e.g., $8,000 car = $400 tax).</div>
                  <div>• For any vehicle priced over $10,000 (e.g., $35,000, $50,000, or $100,000), the total tax paid is exactly <strong>$500.00</strong>.</div>
                  <div>• <em>Reverse Tax Calculation Impact:</em> If you buy a vehicle in SC for $35,500 total, you do NOT divide by 1.06 or 1.09; you simply subtract the $500 statutory fee to arrive at the $35,000 pre-tax purchase price.</div>
                </div>
              </div>
            </section>

            {/* Step-by-Step Calculation */}
            <section>
              <span className="section-label">Mathematical Proof</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Worked Example: Backing Out 9.00% Charleston Sales Tax
              </h2>
              <div className="card" style={{ padding: 28 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  Suppose you purchase furniture or electronics in <strong>Charleston, South Carolina</strong>, and the final receipt total is <strong>$545.00</strong> (inclusive of the 9.00% combined rate).
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'monospace', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><span style={{ color: 'var(--muted)' }}>Step 1 — Combined Divisor:</span> <span style={{ color: 'var(--primary-deep)', fontWeight: 700 }}>1 + (9.00 / 100) = 1.0900</span></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 2 — Calculate Pre-Tax Price:</span> <span style={{ color: 'var(--ink)' }}>$545.00 ÷ 1.0900 = </span><strong style={{ color: 'var(--primary-deep)' }}>$500.00</strong></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 3 — Extract Sales Tax Paid:</span> <span style={{ color: 'var(--ink)' }}>$545.00 - $500.00 = </span><strong style={{ color: '#b91c1c' }}>$45.00</strong></div>
                </div>

                <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--hairline)', fontSize: 14, color: 'var(--body)', lineHeight: 1.7 }}>
                  <p>
                    <strong>Avoid the Subtraction Error:</strong> Multiplying $545.00 by 9% gives $49.05, which leads to an erroneous pre-tax estimate of $495.95 ($4.05 lower than actual). Dividing by the multiplier 1.09 accurately accounts for the fact that the 9% was originally calculated on the $500 base.
                  </p>
                </div>
              </div>
            </section>

            {/* SCDOR Form ST-3 Filing Guide */}
            <section>
              <span className="section-label">Merchant Compliance</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Filing Form ST-3 with the South Carolina Department of Revenue
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  South Carolina merchants registered on <strong>MyDORWAY</strong> must file Form ST-3. When reporting sales that include tax:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Line 1: Gross Proceeds</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Enter calculated pre-tax retail sales. Reverse calculate from gross drawer totals so you do not pay sales tax on collected sales tax.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Line 2: Allowable Deductions</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Deduct exempt sales (unprepared food, resale certificates, out-of-state shipments) claimed on Schedule A.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>Schedule B: Local Taxes</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Break down taxable proceeds by county code to ensure local option taxes (LOST/CPST) are remitted to the correct jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Exemptions */}
            <section>
              <span className="section-label">Statutory Exemptions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                What is Exempt from South Carolina Sales Tax?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  South Carolina Code § 12-36-2120 grants specific exemptions from both state and local sales taxes:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>🥗 Unprepared Groceries</h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Food products eligible under SNAP (groceries, produce, meat, dairy) are 100% exempt from state and local sales taxes. Prepared food and alcohol remain taxable.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>💊 Prescription Medicines</h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Prescription drugs, prosthetic devices, insulin, and diabetic supplies prescribed by a licensed healthcare practitioner are fully tax-exempt.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>⚡ Manufacturing Utilities</h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Electricity, natural gas, fuel, and manufacturing equipment used directly in industrial production are exempt from sales tax to promote job growth.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <span className="section-label">Frequently Asked Questions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 24px', letterSpacing: '-0.02em' }}>
                South Carolina Sales Tax FAQ
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} className="card" style={{ padding: '24px 28px' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.4 }}>
                      {faq.question}
                    </h3>
                    <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
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
                Compare South Carolina rates with neighboring states or calculate across the entire country:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="/" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Reverse Sales Tax Calculator (Home)
                </Link>
                <Link href="/us/north-carolina" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  North Carolina Sales Tax
                </Link>
                <Link href="/us/georgia" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Georgia Sales Tax Calculator
                </Link>
                <Link href="/us/florida" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Florida Reverse Sales Tax
                </Link>
                <Link href="/tax-rates" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  All 50 US State Tax Rates
                </Link>
              </div>
            </section>

            {/* Lateral Border-State Cross-Linking Comparison */}
            <div style={{ marginTop: 8 }}>
              <NeighborStateComparison currentState={stateData} />
            </div>

            <AdSlot slot="sc-bottom-slot" size="rectangle" />
          </div>
        </div>
      </div>
    </main>
  );
}
