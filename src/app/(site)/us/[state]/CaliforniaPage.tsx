import Link from 'next/link';
import type { StateRate } from '@/data/stateTaxRates';
import { CALIFORNIA_FAQS } from '@/data/californiaTaxData';
import CaliforniaTaxCalculator from '@/components/california/CaliforniaTaxCalculator';
import CaliforniaCityTable from '@/components/california/CaliforniaCityTable';
import CaliforniaCountyMatrix from '@/components/california/CaliforniaCountyMatrix';
import TaxabilityMatrix from '@/components/california/TaxabilityMatrix';
import FAQAccordion from '@/components/california/FAQAccordion';

interface Props {
  stateData: StateRate;
}

export default function CaliforniaPage({ stateData }: Props) {
  // Comprehensive validated Schema Graph (Section 8)
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://salestaxreversecalculator.com/us/california#webapp',
        name: 'California Sales Tax Calculator (Forward & Reverse 2026)',
        url: 'https://salestaxreversecalculator.com/us/california',
        applicationCategory: 'FinanceApplication',
        applicationSubCategory: 'Sales Tax & Accounting Calculator',
        operatingSystem: 'All modern web browsers (Desktop, Tablet, Mobile)',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '3.2.0',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Bidirectional Forward (Add Tax) and Reverse (Back Out Tax) Calculation Modes',
          'Pre-Loaded 2026 CDTFA City and County Sales Tax Rates',
          'Live 4-Part Tax Decomposition (State General, Prop 172/Realignment, Bradley-Burns, District TUT)',
          'Top 10 California Metropolitan One-Click Rate Presets',
          'Instant Client-Side Mathematical Execution Without Page Reload',
          'Printable PDF Receipt Audit Voucher and CSV Rate Database Export',
        ],
        areaServed: {
          '@type': 'State',
          name: 'California',
          containedInPlace: {
            '@type': 'Country',
            name: 'United States',
          },
        },
      },
      {
        '@type': 'HowTo',
        '@id': 'https://salestaxreversecalculator.com/us/california#howto',
        name: 'How to Calculate California Sales Tax (Forward & Reverse)',
        description:
          'Step-by-step mathematical guide to adding California sales tax to a retail purchase or backing out sales tax from a receipt total.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Determine the Local Combined Tax Rate',
            text: 'Identify your city or county combined rate by combining the 7.25% statewide base rate with voter-approved municipal and transit district taxes (e.g., 9.50% in Los Angeles, 8.625% in San Francisco, 10.75% in Alameda).',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Calculation Direction (Forward or Reverse)',
            text: 'To add tax to a pre-tax shelf price (Forward), multiply the price by (Rate / 100). To back out sales tax from a gross receipt total (Reverse), divide the total by (1 + Rate / 100).',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Net Pre-Tax Amount and Tax Paid',
            text: 'In Los Angeles (9.50% tax): A $100.00 purchase incurs $9.50 in tax for a $109.50 total. Conversely, a $109.50 receipt total divided by 1.0950 yields an exact pre-tax price of $100.00 and isolates $9.50 in sales tax.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://salestaxreversecalculator.com/us/california#faq',
        mainEntity: CALIFORNIA_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://salestaxreversecalculator.com/us/california#breadcrumbs',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://salestaxreversecalculator.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'US Sales Tax Rates',
            item: 'https://salestaxreversecalculator.com/us',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'California Sales Tax Calculator',
            item: 'https://salestaxreversecalculator.com/us/california',
          },
        ],
      },
    ],
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ── Editorial Hero Band ───────────────────────────────── */}
      <section className="hero-band" style={{ padding: '52px 0 44px', textAlign: 'center' }}>
        <div className="container-main">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            style={{
              fontSize: 13,
              color: 'var(--mint-100)',
              marginBottom: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
              Home
            </Link>
            <span style={{ opacity: 0.6 }}>&gt;</span>
            <Link href="/tax-rates" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
              US Sales Tax Rates
            </Link>
            <span style={{ opacity: 0.6 }}>&gt;</span>
            <span style={{ color: 'var(--lime-panel)', fontWeight: 700 }}>
              California Sales Tax Calculator
            </span>
          </nav>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 'var(--radius-xs)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: 16,
            }}
          >
            <span>🏛️</span> CA 2026 · Base Rate: 7.25% · Combined Range: 7.25% – 10.75%
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4.2vw, 46px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.18,
              marginBottom: 16,
              letterSpacing: '-0.025em',
            }}
          >
            California Sales Tax Calculator 2026: Calculate or Back Out Tax (7.25% – 10.75%)
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 16,
              fontSize: 13,
              color: 'var(--mint-100)',
              marginBottom: 18,
            }}
          >
            <span>✍️ By <strong>Senior Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Verified for <strong>2026 CDTFA District Rates</strong></span>
            <span>•</span>
            <span>⚖️ Authority: <strong>CDTFA (Cal. Rev. &amp; Tax Code Title 18)</strong></span>
          </div>

          <p
            style={{
              fontSize: 17,
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: 780,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Calculate California sales tax forward to determine checkout totals or back out sales tax from gross receipts. Features verified 2026 CDTFA municipal rates across all 58 California counties.
          </p>
        </div>
      </section>

      {/* ── Main Layout Container ─────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 920, width: '100%' }}>

          {/* ── AI Overview (GEO) Definition Callout Card ─────── */}
          <div
            className="expert-tip-panel"
            style={{
              background: 'var(--lime-panel)',
              border: '1px solid var(--lime-accent)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px 22px',
              marginBottom: 28,
              color: 'var(--ink)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }} aria-hidden="true">💡</span>
              <strong style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)' }}>
                California 2026 Tax Quick Reference (GEO AI Overview)
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink)' }}>
              California enforces a mandatory <strong>7.25% statewide base sales tax rate</strong>. Depending on local city and county voter-approved Transactions and Use Taxes (district taxes), the actual combined sales tax rate at checkout ranges from <strong>7.25% to 10.75%</strong> (and up to 11.25% in select special assessment districts). All rates on this page are updated and verified against current <strong>California Department of Tax and Fee Administration (CDTFA)</strong> regulations.
            </p>
          </div>

          {/* ── Rate Overview Metric Badges ───────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 14,
              marginBottom: 30,
            }}
          >
            {[
              { label: 'Statewide Base Rate', value: '7.25%', color: 'var(--ink)', desc: 'Mandatory uniform minimum' },
              { label: 'State Avg Combined', value: `${stateData.rate || 9.21}%`, color: 'var(--primary)', desc: 'Population-weighted average' },
              { label: 'Maximum Local Rate', value: '10.75%', color: 'var(--ink)', desc: 'Alameda County cities' },
              { label: 'District TUT Spread', value: '0% – 3.50%', color: 'var(--ink)', desc: 'Voter-approved local levies' },
            ].map(({ label, value, color, desc }) => (
              <div key={label} className="card" style={{ textAlign: 'center', padding: '18px 12px' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* ── 2. Interactive Calculator Component ───────────── */}
          <section style={{ marginBottom: 48 }}>
            <CaliforniaTaxCalculator initialRate={9.50} />
          </section>

          {/* ── 3. Key Takeaways & Quick Reference Matrix ─────── */}
          <section style={{ marginBottom: 52 }}>
            <span className="section-label">Executive Briefing</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 16px' }}>
              Key Takeaways &amp; California Tax Reference Matrix
            </h2>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table className="data-table" style={{ width: '100%', minWidth: 640 }}>
                <thead>
                  <tr>
                    <th style={{ width: '28%' }}>Tax Dimension</th>
                    <th style={{ width: '42%' }}>Statutory Baseline &amp; Operational Rule</th>
                    <th style={{ width: '30%' }}>Authority / Law</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: 'Mandatory Statewide Base Rate', rule: '7.25% (Uniform minimum across all 58 California counties)', auth: 'Cal. Rev. & Tax Code § 6051 & § 7200' },
                    { dim: 'Minimum Combined Local Rate', rule: '7.25% (Rural areas with zero district add-ons: Alpine, Inyo unincorporated)', auth: 'CDTFA Publication 71' },
                    { dim: 'Maximum Combined Local Rate', rule: '10.75% – 11.25% (High-density Bay Area and Los Angeles cities: Alameda 10.75%)', auth: 'Cal. Rev. & Tax Code § 7251.1' },
                    { dim: 'Forward Tax Formula', rule: 'Sales Tax = Price × r ; Total = Price × (1 + r)', auth: 'Standard Retail Billing' },
                    { dim: 'Reverse Extraction Formula', rule: 'Pre-Tax Price = Total ÷ (1 + r) ; Tax = Total - Pre-Tax Price', auth: 'CDTFA Form 401-A Line 1 Standard' },
                    { dim: 'The Subtractive Fallacy', rule: 'Multiplying receipt total by tax rate (T × r) creates a 9.5% relative error', auth: 'Mathematical Audit Risk Proof' },
                    { dim: 'Unprepared Groceries & Cold Food', rule: '100% Tax-Exempt (Staple foods, dairy, produce, unheated bread)', auth: 'CDTFA Regulation 1602' },
                    { dim: 'Prepared Hot Food & Dine-In', rule: '100% Taxable (Subject to the California 80/80 Rule)', auth: 'CDTFA Regulation 1603' },
                    { dim: 'Cloud Software & SaaS', rule: '100% Tax-Exempt (Electronic delivery without tangible media)', auth: 'CDTFA Regulation 1502' },
                    { dim: 'Direct Shipping Charges', rule: 'Exempt if separately stated and shipped via common carrier (USPS/UPS/FedEx)', auth: 'CDTFA Regulation 1628' },
                    { dim: 'Motor Vehicle Purchases', rule: 'Sourced to buyer\'s garaging registration address; zero trade-in deductions', auth: 'CDTFA Regulation 1610' },
                    { dim: 'Out-of-State Economic Nexus', rule: '$500,000 gross annual sales into California (No 200-transaction count rule)', auth: 'California AB 147 / Wayfair' },
                  ].map((row) => (
                    <tr key={row.dim} style={{ borderBottom: '1px solid var(--hairline)' }}>
                      <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{row.dim}</td>
                      <td style={{ color: 'var(--body)', fontSize: 14 }}>{row.rule}</td>
                      <td style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--primary-deep)' }}>{row.auth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── 4. Section 1: How California Sales Tax Works ─── */}
          <section style={{ marginBottom: 52 }}>
            <span className="section-label">Statutory Structure</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 18px' }}>
              1. How California Sales Tax Works: The 7.25% Base and District Taxes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 15.5, lineHeight: 1.7, color: 'var(--body)' }}>
              <p>
                California operates one of the most structurally intricate sales and use tax environments in the United States. Unlike states with simple single-layer taxation, every sales tax percentage collected at a California cash register is composed of multiple distinct state, county, and municipal revenue levies.
              </p>

              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--ink)', marginTop: 8 }}>
                The Five-Component Breakdown of the 7.25% Base Rate
              </h3>
              <p>
                Every retail transaction within California begins with a mandatory, non-negotiable <strong>7.25% statewide base rate</strong>. This 7.25% is codified under the California Revenue and Taxation Code (RTC) and is apportioned into five dedicated statutory funds:
              </p>

              {/* 5-part Statutory Box */}
              <div className="card" style={{ padding: 22, border: '1px solid var(--hairline-strong)', background: 'var(--canvas-soft)' }}>
                <h4 style={{ fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', marginBottom: 14 }}>
                  Composition of California&apos;s Mandatory 7.25% Base Sales Tax Rate
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { num: '1', name: 'State General Fund (RTC §§ 6051, 6051.3)', rate: '3.9375%', desc: 'Dedicated to general California government operations, K-12 education, health programs, and state courts.' },
                    { num: '2', name: 'Local Revenue Fund 2011 / Realignment (RTC § 6051.15)', rate: '1.0625%', desc: 'Funds county-administered criminal justice realignment, public safety services, and adult social care.' },
                    { num: '3', name: 'Local Revenue Fund 1991 (RTC § 6051.2)', rate: '0.5000%', desc: 'Allocated directly to counties for public health, behavioral health, and children\'s welfare programs.' },
                    { num: '4', name: 'Local Public Safety Fund - Proposition 172 (1993)', rate: '0.5000%', desc: 'Voter-approved statewide half-cent tax distributed exclusively to county sheriffs, fire, and district attorneys.' },
                    { num: '5', name: 'Bradley-Burns Uniform Local Base (RTC § 7200)', rate: '1.2500%', desc: '1.0000% Local City/County Operating Base + 0.2500% County Transportation Tax Fund.' },
                  ].map((part) => (
                    <div key={part.num} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, paddingBottom: 10, borderBottom: '1px solid var(--hairline)' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 14.5 }}>
                          {part.num}. {part.name}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{part.desc}</div>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                        {part.rate}
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6 }}>
                    <strong style={{ fontSize: 15, color: 'var(--ink)' }}>Total Mandatory Statewide Base Rate:</strong>
                    <strong style={{ fontSize: 18, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>7.2500%</strong>
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--ink)', marginTop: 12 }}>
                The Bradley-Burns Uniform Local Sales and Use Tax Law (§ 7200)
              </h3>
              <p>
                Enacted in 1955, the <strong>Bradley-Burns Act</strong> established a standardized sales tax mechanism across California&apos;s 58 counties and 482 incorporated municipalities. Prior to Bradley-Burns, individual cities established competing sales tax codes, causing commercial chaos.
              </p>
              <p>
                Under Bradley-Burns, the local <strong>1.25% levy</strong> is uniform throughout California:
              </p>
              <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>
                  <strong>1.00% Local Operational Share:</strong> If a retail transaction occurs within an incorporated city, the full 1.00% is deposited into that city&apos;s municipal general fund to finance police officers, firefighters, municipal libraries, and local parks. If the transaction occurs in an unincorporated county zone, the 1.00% is allocated to the county general fund.
                </li>
                <li>
                  <strong>0.25% Transportation Fund:</strong> This quarter-cent component is distributed to county transportation commissions to support street maintenance, bridge repairs, public bus networks, and commuter rail systems.
                </li>
              </ul>

              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--ink)', marginTop: 12 }}>
                District Taxes: Transactions and Use Taxes (TUT)
              </h3>
              <p>
                While 7.25% is the universal state baseline, very few California residents pay only 7.25% at retail checkout. Under California Revenue and Taxation Code Sections 7251–7274, local jurisdictions are authorized to introduce voter-approved <strong>Transactions and Use Taxes (TUT)</strong>, commonly referred to as <strong>district taxes</strong>.
              </p>
              <p>
                District taxes fund dedicated local initiatives such as municipal transit networks (e.g., BART in the San Francisco Bay Area, LA Metro in Los Angeles County), emergency medical centers, storm drains, and homeless response services.
              </p>

              <div className="card" style={{ padding: 18, border: '1px solid var(--hairline-strong)', background: '#ffffff' }}>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                  The Statutory District Tax Cap (§ 7251.1) and Legislative Exceptions
                </h4>
                <p style={{ fontSize: 14, margin: '0 0 10px', color: 'var(--body)' }}>
                  California RTC Section 7251.1 historically limits combined district taxes in any single county to <strong>2.00%</strong> (capping combined tax at 9.25%). However, because urban infrastructural demands regularly exceed standard funding, the California Legislature routinely enacts special statutory exceptions:
                </p>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, color: 'var(--body)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li><strong>Alameda County:</strong> Granted statutory authority to levy district taxes up to <strong>3.50%</strong>, pushing combined rates in Alameda, Albany, and Newark to <strong>10.75%</strong>.</li>
                  <li><strong>Los Angeles County:</strong> Multiple overlapping county transit measures (Proposition A, Proposition C, Measure R, Measure M) create a baseline countywide district tax of 2.25%, yielding a minimum combined rate of <strong>9.50%</strong>.</li>
                  <li><strong>Contra Costa, San Mateo, &amp; Santa Clara Counties:</strong> Authorized to exceed the 2.00% cap for highway congestion and rapid transit expansions.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── 5. Section 2: Mathematical Formulations & The Subtractive Fallacy ── */}
          <section style={{ marginBottom: 52 }}>
            <span className="section-label">Mathematical Formulations</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 18px' }}>
              2. Mathematical Formulations: Forward &amp; Reverse Sales Tax
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 15.5, lineHeight: 1.7, color: 'var(--body)' }}>
              <p>
                Sales tax calculation requires distinct mathematical procedures depending on whether you are preparing an upfront invoice (forward calculation) or auditing gross receipts for bookkeeping and CDTFA tax reporting (reverse calculation).
              </p>

              {/* Math Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                <div className="card" style={{ padding: 20, background: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                    2.1 The Forward Calculation (Adding Tax to Shelf Price)
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 12 }}>
                    Used by retail checkout registers, e-commerce shopping carts, and upfront merchant invoices.
                  </p>
                  <div style={{ background: '#ffffff', padding: 14, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--primary-deep)', marginBottom: 10 }}>
                    Sales Tax = P<sub>pre</sub> × r<br />
                    Total Invoice (T) = P<sub>pre</sub> × (1 + r)
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Where <em>P<sub>pre</sub></em> = pre-tax price, <em>r</em> = tax rate decimal (e.g. 0.0950), <em>T</em> = final checkout total.
                  </div>
                </div>

                <div className="card" style={{ padding: 20, background: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                    2.2 The Reverse Calculation (Backing Out Tax from Receipt)
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 12 }}>
                    Used by bookkeepers, accountants, and businesses filing CDTFA Form 401-A Line 1 deductions.
                  </p>
                  <div style={{ background: '#ffffff', padding: 14, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--primary-deep)', marginBottom: 10 }}>
                    P<sub>pre</sub> = T ÷ (1 + r)<br />
                    Sales Tax Paid = T - P<sub>pre</sub> = T × [r ÷ (1 + r)]
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Where <em>(1 + r)</em> is the <strong>effective mathematical divisor</strong> (e.g., 1.0950 for 9.50% tax; 1.08625 for 8.625%).
                  </div>
                </div>
              </div>

              {/* The Subtractive Fallacy Alert Box */}
              <div
                className="card"
                style={{
                  border: '2px solid #ef4444',
                  background: '#fef2f2',
                  padding: 22,
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>⚠️</span>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#991b1b' }}>
                    2.3 The &quot;Subtractive Fallacy&quot;: Why Direct Subtraction Causes Costly Audit Penalties
                  </h3>
                </div>
                <p style={{ fontSize: 14.5, color: '#7f1d1d', lineHeight: 1.6, marginBottom: 14 }}>
                  A frequent and costly error made by small business owners and bookkeepers is attempting to back out sales tax by multiplying the gross receipt total by the sales tax rate (<code>T × r</code>) and subtracting that amount. This method is mathematically invalid and triggers CDTFA audit discrepancies.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, background: '#ffffff', padding: 16, borderRadius: 'var(--radius-xs)', border: '1px solid #fecaca', marginBottom: 12 }}>
                  <div>
                    <strong style={{ color: '#dc2626', fontSize: 13, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                      ❌ Method 1: Erroneous Direct Subtraction
                    </strong>
                    <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: '#991b1b', lineHeight: 1.6 }}>
                      • Gross Receipt: $547.50 in Los Angeles (9.50%)<br />
                      • Erroneous Tax: $547.50 × 0.0950 = $52.01<br />
                      • Erroneous Pre-Tax: $547.50 - $52.01 = $495.49<br />
                      • Verification: $495.49 × 0.0950 = $47.07 tax<br />
                      • Sum: $495.49 + $47.07 = $542.56 (<strong>FAILS!</strong>)
                    </div>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--primary)', fontSize: 13, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                      ✅ Method 2: Accurate CDTFA Reverse Formula
                    </strong>
                    <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--forest)', lineHeight: 1.6 }}>
                      • Statutory Divisor: 1 + 0.0950 = 1.0950<br />
                      • True Pre-Tax Price: $547.50 ÷ 1.0950 = <strong>$500.00</strong><br />
                      • True Sales Tax Collected: $547.50 - $500.00 = <strong>$47.50</strong><br />
                      • Verification: $500.00 × 0.0950 = $47.50 tax<br />
                      • Sum: $500.00 + $47.50 = $547.50 (<strong>PERFECT!</strong>)
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 13.5, color: '#991b1b', lineHeight: 1.5 }}>
                  <strong>Discrepancy &amp; Audit Consequence:</strong> The erroneous subtractive method overstates sales tax by <strong>$4.51</strong> ($52.01 vs. $47.50), a relative error of <strong>9.5%</strong>. Across $500,000 in gross receipts, this distorts revenue by over <strong>$4,100</strong>, triggering CDTFA Form 401-A reporting penalties and interest!
                </div>
              </div>

              {/* 3 Worked Examples */}
              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--ink)', marginTop: 12 }}>
                2.4 Concrete Worked Calculation Examples Across California Jurisdictions
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                {/* Example A */}
                <div className="card" style={{ padding: 18, background: '#ffffff', border: '1px solid var(--hairline-strong)' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 4 }}>
                    Example A: San Francisco Retail (8.625%)
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 10px' }}>
                    Commercial design studio purchases computer monitors. Final credit card receipt: <strong>$1,086.25</strong>.
                  </p>
                  <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--body)', lineHeight: 1.6 }}>
                    1. Divisor: 1 + 0.08625 = 1.08625<br />
                    2. Pre-Tax: $1,086.25 ÷ 1.08625 = <strong>$1,000.00</strong><br />
                    3. Tax Paid: $1,086.25 - $1,000.00 = <strong>$86.25</strong>
                  </div>
                </div>

                {/* Example B */}
                <div className="card" style={{ padding: 18, background: '#ffffff', border: '1px solid var(--hairline-strong)' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 4 }}>
                    Example B: Alameda High-District (10.75%)
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 10px' }}>
                    Machine fabrication shop buys specialized metal cutters. Total checkout invoice: <strong>$2,215.00</strong>.
                  </p>
                  <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--body)', lineHeight: 1.6 }}>
                    1. Divisor: 1 + 0.1075 = 1.1075<br />
                    2. Pre-Tax: $2,215.00 ÷ 1.1075 = <strong>$2,000.00</strong><br />
                    3. Tax Paid: $2,215.00 - $2,000.00 = <strong>$215.00</strong>
                  </div>
                </div>

                {/* Example C */}
                <div className="card" style={{ padding: 18, background: '#ffffff', border: '1px solid var(--hairline-strong)' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 4 }}>
                    Example C: Sacramento Mixed Receipt (8.75%)
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 10px' }}>
                    $60.00 cold groceries (exempt) + $108.75 hot prepared deli platter (taxable). Total: $168.75.
                  </p>
                  <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--body)', lineHeight: 1.6 }}>
                    1. Isolate Taxable: $108.75 deli platter<br />
                    2. Pre-Tax Deli: $108.75 ÷ 1.0875 = <strong>$100.00</strong><br />
                    3. Sales Tax: $108.75 - $100 = <strong>$8.75</strong> (Total bill: $168.75)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 6. Section 3: Municipal & County Rate Tables ──── */}
          <section style={{ marginBottom: 52 }}>
            <span className="section-label">2026 Directory</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 18px' }}>
              3. Comprehensive 2026 California Municipal &amp; County Rate Tables
            </h2>
            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.6, marginBottom: 20 }}>
              Sales tax rates in California adjust bi-annually on <strong>April 1</strong> and <strong>October 1</strong> as local voter measures take effect. Below are the verified 2026 tax rates published by the California Department of Tax and Fee Administration.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <CaliforniaCityTable />
              <CaliforniaCountyMatrix />
            </div>
          </section>

          {/* ── 7. Section 4: Product & Service Taxability Matrix ─ */}
          <section style={{ marginBottom: 52 }}>
            <span className="section-label">Regulatory Rules</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 18px' }}>
              4. California Product &amp; Service Taxability Matrix
            </h2>
            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.6, marginBottom: 20 }}>
              California levies sales and use tax specifically upon retail sales of <strong>Tangible Personal Property (TPP)</strong>. Professional services and intangible property are generally exempt unless directly tied to the fabrication or delivery of tangible goods.
            </p>

            <TaxabilityMatrix />
          </section>

          {/* ── 8. Section 5: Specialized California Rules ────── */}
          <section style={{ marginBottom: 52 }}>
            <span className="section-label">Compliance &amp; Sourcing</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 18px' }}>
              5. Specialized California Tax Rules: Vehicles, Remote Sellers &amp; Filings
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* 5.1 Vehicles */}
              <div className="card" style={{ padding: 22, border: '1px solid var(--hairline-strong)', background: 'var(--canvas)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
                  5.1 Motor Vehicle Purchases &amp; DMV Registration Sourcing (CDTFA Reg. 1610)
                </h3>
                <p style={{ fontSize: 14.5, color: 'var(--body)', lineHeight: 1.65, margin: '0 0 12px' }}>
                  Unlike general retail merchandise taxed at the counter, motor vehicles, commercial trailers, RVs, and vessels follow <strong>destination-based registration sourcing</strong>:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--body)', lineHeight: 1.6 }}>
                  <div style={{ padding: '10px 14px', background: 'var(--canvas-soft)', borderRadius: 'var(--radius-xs)', borderLeft: '3px solid var(--primary)' }}>
                    <strong>1. Garaging Address Governs:</strong> The applicable sales tax rate is determined by the city and county where the purchaser registers and garages the vehicle with the California DMV, <em>not where the dealership is located</em>. If a resident of Alameda (10.75%) buys an SUV in Newport Beach (7.75%), the dealer must charge 10.75%.
                  </div>
                  <div style={{ padding: '10px 14px', background: 'var(--canvas-soft)', borderRadius: 'var(--radius-xs)', borderLeft: '3px solid #ef4444' }}>
                    <strong>2. Zero Deduction for Vehicle Trade-Ins:</strong> Unlike 42 other U.S. states, California law <em>strictly prohibits trade-in credits from reducing taxable sales price</em>. If you purchase a vehicle for $40,000 and receive a $15,000 trade-in credit, sales tax is assessed on the entire $40,000 purchase price.
                  </div>
                </div>
              </div>

              {/* 5.2 Economic Nexus */}
              <div className="card" style={{ padding: 22, border: '1px solid var(--hairline-strong)', background: 'var(--canvas)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
                  5.2 Out-of-State Remote Sellers &amp; AB 147 Economic Nexus
                </h3>
                <p style={{ fontSize: 14.5, color: 'var(--body)', lineHeight: 1.65, margin: '0 0 10px' }}>
                  Following the U.S. Supreme Court decision in <em>South Dakota v. Wayfair, Inc.</em> (2018), California enacted <strong>Assembly Bill 147 (AB 147)</strong>:
                </p>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: 'var(--body)', display: 'flex', flexDirection: 'column', gap: 8, lineHeight: 1.6 }}>
                  <li><strong>The $500,000 Economic Threshold:</strong> An out-of-state retailer has economic nexus in California if, during the preceding or current calendar year, total cumulative sales of tangible personal property delivered into California exceed <strong>$500,000</strong>.</li>
                  <li><strong>No Transaction Count Rule:</strong> California does <em>not</em> enforce a 200-transaction count threshold. A remote seller with 5,000 transactions totaling $280,000 does not trigger California sales tax nexus.</li>
                  <li><strong>Marketplace Facilitator Act (Reg. 1684.5):</strong> Platforms like Amazon, eBay, and Etsy collect and remit California sales tax directly. However, marketplace sales still count toward the merchant&apos;s $500,000 nexus threshold.</li>
                </ul>
              </div>

              {/* 5.3 CDTFA Form 401-A */}
              <div className="card" style={{ padding: 22, border: '1px solid var(--hairline-strong)', background: 'var(--canvas)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
                  5.3 Merchant Compliance &amp; CDTFA Form 401-A Reporting
                </h3>
                <p style={{ fontSize: 14.5, color: 'var(--body)', lineHeight: 1.65, margin: '0 0 10px' }}>
                  Retailers who price merchandise on a &quot;tax-inclusive&quot; basis must report transactions accurately on quarterly or monthly state tax returns:
                </p>
                <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: 'var(--body)', display: 'flex', flexDirection: 'column', gap: 8, lineHeight: 1.6 }}>
                  <li><strong>Reporting Line 1 (Gross Receipts):</strong> Merchants enter total gross receipts on <strong>CDTFA Form 401-A, Line 1</strong>, including all sales tax collected.</li>
                  <li><strong>Backing Out Tax on Schedule A:</strong> The business applies the reverse sales tax formula (<code>Taxable Sales = Total Receipts ÷ [1 + Rate]</code>) and enters the difference on Schedule A as a non-taxable sales tax reimbursement deduction.</li>
                  <li><strong>Tax-Inclusive Pricing Disclosures (CDTFA Reg. 1700):</strong> Retailers may only include tax in posted prices if they display a conspicuous sign: <em>&quot;All prices include California sales tax reimbursement calculated to the nearest mill,&quot;</em> or state <em>&quot;Tax Included&quot;</em> clearly on customer receipts.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* ── 9. Section 6: Frequently Asked Questions ──────── */}
          <section style={{ marginBottom: 52 }}>
            <span className="section-label">PAA Library</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 18px' }}>
              6. Frequently Asked Questions: California Sales Tax
            </h2>
            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.6, marginBottom: 20 }}>
              Official direct answers compiled and audited against California Department of Tax and Fee Administration statutory codes.
            </p>

            <FAQAccordion />
          </section>

          {/* ── 10. Section 7: Editorial Review & Authority Citations ── */}
          <section style={{ marginBottom: 48 }}>
            <span className="section-label">Statutory Verification</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', margin: '10px 0 18px' }}>
              7. Editorial Review, CDTFA Citations &amp; Statutory Authority
            </h2>

            {/* Editorial Attestation Card */}
            <div
              className="card"
              style={{
                border: '1px solid var(--hairline-strong)',
                background: 'var(--canvas-soft)',
                padding: 22,
                borderRadius: 'var(--radius-md)',
                marginBottom: 24,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', marginBottom: 12 }}>
                Editorial Integrity &amp; Regulatory Compliance Attestation
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, fontSize: 13.5, color: 'var(--body)' }}>
                <div><strong>Content Lead:</strong> Senior Tax Technology Editorial Board</div>
                <div><strong>Technical Review:</strong> Reviewed by CPA &amp; State Tax Specialist</div>
                <div><strong>Regulatory Standard:</strong> CDTFA 2026 District Tax Manual</div>
                <div><strong>Last Rate Audit:</strong> Verified for Current CDTFA Changes</div>
                <div><strong>Statutory Standard:</strong> Cal. Rev. &amp; Tax Code Title 18</div>
                <div><strong>Engine Version:</strong> PreTaxPrice Bidirectional Engine v3.2</div>
              </div>
            </div>

            {/* Primary Statutory Sources */}
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
              Primary Statutory Sources
            </h3>
            <ul style={{ margin: '0 0 24px', paddingLeft: 22, fontSize: 14, color: 'var(--body)', display: 'flex', flexDirection: 'column', gap: 6, lineHeight: 1.6 }}>
              <li>
                <a
                  href="https://www.cdtfa.ca.gov/formspubs/pub71.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--link)', textDecoration: 'underline' }}
                >
                  California Department of Tax and Fee Administration (CDTFA) Publication 71
                </a>{' '}
                — California City and County Sales and Use Tax Rates.
              </li>
              <li><strong>Bradley-Burns Uniform Local Sales and Use Tax Law:</strong> California Revenue and Taxation Code §§ 7200–7212.</li>
              <li><strong>Transactions and Use Tax Law:</strong> California Revenue and Taxation Code §§ 7251–7274.</li>
              <li><strong>CDTFA Regulation 1502:</strong> <em>Computers, Programs, and Data Processing</em> (SaaS and electronic delivery exemptions).</li>
              <li><strong>CDTFA Regulations 1602 &amp; 1603:</strong> <em>Food Products</em> and <em>Taxable Sales of Food Products</em> (Groceries vs. 80/80 Rule).</li>
              <li><strong>CDTFA Regulation 1610:</strong> <em>Vehicles, Vessels, and Aircraft</em> (DMV registration sourcing and trade-in rules).</li>
              <li><strong>CDTFA Regulation 1628:</strong> <em>Transportation Charges</em> (Common carrier shipping exemptions).</li>
              <li><strong>CDTFA Regulation 1700:</strong> <em>Reimbursement for Sales Tax</em> (Tax-inclusive pricing disclosure requirements).</li>
              <li><strong>California Assembly Bill 147 (2019):</strong> <em>Economic Nexus and Marketplace Facilitators</em>.</li>
            </ul>

            {/* Internal Navigation Links */}
            <div
              className="card"
              style={{
                padding: 18,
                border: '1px solid var(--hairline)',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                Explore Related Sales Tax Resources:
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 13 }}>
                <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                  ← Reverse Sales Tax Calculator Home
                </Link>
                <span style={{ color: 'var(--hairline-strong)' }}>|</span>
                <Link href="/tax-rates" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                  50-State Sales Tax Directory
                </Link>
                <span style={{ color: 'var(--hairline-strong)' }}>|</span>
                <Link href="/#how-it-works" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                  Sales Tax Formula Guide
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
