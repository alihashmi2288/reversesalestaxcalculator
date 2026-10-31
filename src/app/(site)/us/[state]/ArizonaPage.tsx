import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { StateRate } from '@/data/stateTaxRates';
import StateCalculatorClient from './StateCalculatorClient';

interface Props {
  stateData: StateRate;
}

export default function ArizonaPage({ stateData }: Props) {
  const faqs = [
    {
      question: 'What is the sales tax rate in Arizona?',
      answer:
        'Arizona does not have a traditional retail sales tax; instead, it levies a Transaction Privilege Tax (TPT) on businesses for the privilege of operating in the state. The statutory state base TPT rate is 5.60%. However, Arizona counties add excise taxes (0.28% to 1.30%) and incorporated cities levy municipal privilege taxes (1.50% to 2.90%). In major cities like Phoenix (8.60%), Tucson (8.70%), and Mesa (8.30%), the combined TPT rate typically ranges between 7.80% and 9.20%.',
    },
    {
      question: 'How do I calculate reverse sales tax from an Arizona receipt?',
      answer:
        'To calculate the pre-tax price from an Arizona receipt, divide the total amount paid by 1 plus the combined TPT rate as a decimal (1 + Rate / 100). For example, in Phoenix with an 8.60% combined rate, divide a $108.60 receipt total by 1.086 to determine the original pre-tax price of $100.00. The TPT amount passed to the buyer is $8.60.',
    },
    {
      question: 'What is the difference between Arizona TPT and standard sales tax?',
      answer:
        'A standard retail sales tax is a direct tax on the consumer collected by the vendor as a fiduciary. Arizona\'s Transaction Privilege Tax (TPT) is an excise tax legally imposed on the vendor for the privilege of conducting business in Arizona (A.R.S. Title 42, Chapter 5). Although businesses are legally authorized to pass the tax cost along to customers on receipts, the vendor remains strictly liable to the Arizona Department of Revenue (ADOR) for remitting the tax.',
    },
    {
      question: 'Does Arizona permit tax-inclusive pricing ("factoring")?',
      answer:
        'Yes. The Arizona Department of Revenue (ADOR) explicitly allows businesses to include TPT in the marked sales price, commonly known as "factoring." Under ADOR rules and Form TPT-2 filing instructions, vendors back out the tax by dividing total gross collections by 1 + the combined tax rate to report taxable gross receipts and calculate tax liability.',
    },
    {
      question: 'Are groceries and prescription drugs exempt from Arizona sales tax?',
      answer:
        'Under Arizona Revised Statutes § 42-5102, unprepared food products intended for home consumption (groceries) and prescription medications are exempt from the state 5.60% TPT and county excise taxes. However, Arizona cities have statutory authority under the Model City Tax Code to tax retail food for home consumption; some municipalities levy a 1% to 2.5% local tax on groceries, while others grant a full exemption.',
    },
    {
      question: 'How do businesses report factored sales on Arizona Form TPT-2?',
      answer:
        'Businesses registered with ADOR file their Transaction Privilege Tax returns online via AZTaxes.gov. On Form TPT-2, vendors record gross receipts. If prices include TPT, the business uses the reverse calculation formula (Total ÷ (1 + Combined Rate)) to separate gross receipts from TPT collections, enters the factored gross amount on Schedule A, and claims any statutory exemptions on Schedule B.',
    },
    {
      question: 'What is the TPT rate for prime contracting in Arizona?',
      answer:
        'Prime contracting in Arizona (construction, remodeling, repairs) has a unique TPT tax base under A.R.S. § 42-5075. Contractors are taxed on 65% of the total contract price (a statutory 35% standard deduction representing materials and non-labor costs), multiplied by the applicable state, county, and municipal tax rates.',
    },
    {
      question: 'What are the highest and lowest combined tax rates in Arizona?',
      answer:
        'The highest combined rates in Arizona reach 10.60% to 11.20% in certain smaller municipalities and resort areas with dedicated hospitality taxes (such as Sedona or select mining towns with overlapping special district levies). The lowest combined rates occur in unincorporated rural county areas without municipal additions, where only the 5.60% state rate and minimal county excise tax apply (typically 6.10% to 6.60%).',
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: 'Arizona', item: 'https://salestaxreversecalculator.com/us/arizona' },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Arizona Reverse Sales Tax Calculator',
    alternateName: 'PreTaxPrice Arizona TPT Calculator',
    url: 'https://salestaxreversecalculator.com/us/arizona',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Sales Tax & Transaction Privilege Tax Calculation',
    softwareVersion: '2.4.0',
    inLanguage: 'en',
    operatingSystem: 'All modern browsers (Desktop & Mobile)',
    description:
      'Free Arizona reverse sales tax calculator pre-loaded with ADOR 2026 Transaction Privilege Tax (TPT) rates. Back out TPT from Phoenix (8.6%), Tucson (8.7%), Mesa (8.3%), and Scottsdale receipts.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    areaServed: {
      '@type': 'State',
      name: 'Arizona',
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
    name: 'How to Reverse Calculate Arizona Transaction Privilege Tax (TPT)',
    description:
      'Step-by-step formula and process for backing out Arizona state, county, and municipal TPT from tax-inclusive retail receipts.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Identify the combined TPT rate',
        text: 'Determine the combined rate by adding the 5.60% state TPT, the county excise tax (e.g., 0.70% Maricopa County), and the city privilege tax (e.g., 2.30% City of Phoenix) for a combined 8.60%.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Convert the combined rate to a decimal divisor',
        text: 'Divide the combined percentage by 100 and add 1. For an 8.60% rate: 8.60 / 100 = 0.086; 1 + 0.086 = 1.086.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Divide the total receipt amount by the divisor',
        text: 'Divide the final receipt total by 1.086 to extract the pre-tax price. For a $543.00 receipt: $543.00 ÷ 1.086 = $500.00 pre-tax.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Subtract pre-tax price from the receipt total to isolate TPT',
        text: 'Subtract the calculated pre-tax price ($500.00) from the total ($543.00) to verify the exact TPT paid: $543.00 - $500.00 = $43.00.',
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

  const azCities = [
    { name: 'Phoenix', stateRate: '5.60%', countyRate: '0.70% (Maricopa)', cityRate: '2.30%', combined: '8.60%', note: 'Capital & largest retail market' },
    { name: 'Tucson', stateRate: '5.60%', countyRate: '0.50% (Pima)', cityRate: '2.60%', combined: '8.70%', note: 'Pima County seat' },
    { name: 'Mesa', stateRate: '5.60%', countyRate: '0.70% (Maricopa)', cityRate: '2.00%', combined: '8.30%', note: 'East Valley commercial center' },
    { name: 'Chandler', stateRate: '5.60%', countyRate: '0.70% (Maricopa)', cityRate: '1.50%', combined: '7.80%', note: 'Tech corridor hub' },
    { name: 'Scottsdale', stateRate: '5.60%', countyRate: '0.70% (Maricopa)', cityRate: '1.75%', combined: '8.05%', note: 'Luxury retail & hospitality' },
    { name: 'Glendale', stateRate: '5.60%', countyRate: '0.70% (Maricopa)', cityRate: '2.90%', combined: '9.20%', note: 'Sports & entertainment district' },
    { name: 'Tempe', stateRate: '5.60%', countyRate: '0.70% (Maricopa)', cityRate: '1.80%', combined: '8.10%', note: 'ASU university market' },
    { name: 'Flagstaff', stateRate: '5.60%', countyRate: '1.30% (Coconino)', cityRate: '2.281%', combined: '9.181%', note: 'Northern AZ tourism center' },
    { name: 'Yuma', stateRate: '5.60%', countyRate: '1.112% (Yuma)', cityRate: '1.70%', combined: '8.412%', note: 'Agricultural & border commerce' },
    { name: 'Unincorporated Maricopa', stateRate: '5.60%', countyRate: '0.70% (Maricopa)', cityRate: '0.00%', combined: '6.30%', note: 'County islands without city tax' },
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
            <span>🌵</span> AZ · State TPT: 5.60% · Avg Combined: 8.51% · ADOR Factoring Certified
          </div>

          <h1
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            Arizona Reverse Sales Tax Calculator
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>✍️ By <strong>Arizona Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Updated for <strong>2026 ADOR TPT Rates</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>Arizona Department of Revenue (A.R.S. Title 42)</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 740, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate original pre-tax prices and back out Arizona Transaction Privilege Tax (TPT) from any receipt or invoice.
            Pre-loaded with Arizona&apos;s 5.60% state base, Maricopa and Pima county excise taxes, and municipal rates for Phoenix, Tucson, Mesa, and Scottsdale.
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
            <span style={{ color: 'var(--ink)' }}>Arizona</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'State Base TPT', value: '5.60%', color: 'var(--ink)', desc: 'Statutory state rate (A.R.S. § 42-5010)' },
              { label: 'Avg Combined Rate', value: `${stateData.rate}%`, color: 'var(--primary)', desc: 'Population-weighted state average' },
              { label: 'Phoenix Metro Combined', value: '8.60%', color: 'var(--ink)', desc: '5.60% State + 0.70% County + 2.30% City' },
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
            <StateCalculatorClient stateData={stateData} rateNote="Arizona state base TPT is 5.60%. Enter your specific city rate (e.g., 8.60% for Phoenix, 8.70% for Tucson, 8.05% for Scottsdale) to back out exact tax." />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* Arizona TPT Legal Distinction */}
            <section>
              <span className="section-label">Tax Law & Statutory Basis</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                How Arizona TPT Differs from Traditional Sales Tax
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Most consumers refer to the tax added at Arizona cash registers as &quot;sales tax,&quot; but under Arizona law, it is technically the <strong>Transaction Privilege Tax (TPT)</strong>. Governed by <strong>Arizona Revised Statutes (A.R.S.) Title 42, Chapter 5</strong>, TPT is not a direct tax on the consumer. Instead, it is an excise tax levied on the vendor for the legal privilege of conducting retail business within the State of Arizona.
                </p>
                <div className="card" style={{ padding: 22, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                    Key Distinctions of Arizona TPT:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                    <li><strong>Legal Liability on Seller:</strong> The seller owes TPT to the Arizona Department of Revenue (ADOR) regardless of whether they collect reimbursement from the buyer.</li>
                    <li><strong>Reimbursement Authorized:</strong> Sellers are permitted under A.R.S. § 42-5002 to itemize and pass the tax burden to the customer as an added surcharge.</li>
                    <li><strong>Factoring Permitted:</strong> If a merchant displays a single &quot;tax included&quot; price, ADOR permits the merchant to back out the tax mathematically using the standard reverse tax formula.</li>
                    <li><strong>Unified Administration:</strong> Since the municipal tax reform, ADOR serves as the single clearinghouse for state, county, and all municipal tax collections via AZTaxes.gov.</li>
                  </ul>
                </div>
                <p>
                  Because TPT is structured around the seller&apos;s gross receipts, reverse calculation is a daily operational necessity for thousands of Arizona businesses who absorb tax or quote all-inclusive prices.
                </p>
              </div>
            </section>

            {/* Major Arizona Municipalities Table */}
            <section>
              <span className="section-label">Municipal Rates</span>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                Arizona TPT Rates by City & County (2026)
              </h2>
              <p style={{ color: 'var(--body)', fontSize: 15, marginBottom: 16 }}>
                Arizona combined rates consist of three distinct tiers: the <strong>5.60% State TPT</strong>, the <strong>County Excise Tax</strong>, and the <strong>City Privilege Tax</strong>. The table below details rates for key economic centers:
              </p>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>City / Jurisdiction</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>State</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>County</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>City</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Combined Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {azCities.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: idx === azCities.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                        <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>{c.name}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 14 }}>{c.stateRate}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 14 }}>{c.countyRate}</td>
                        <td style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 14 }}>{c.cityRate}</td>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{c.combined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reverse Tax Mathematical Proof */}
            <section>
              <span className="section-label">Mathematical Proof & Factoring</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                How to Back Out Arizona TPT: Worked Examples
              </h2>
              <div className="card" style={{ padding: 28 }}>
                <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
                  Suppose a catering company or boutique in <strong>Phoenix, Arizona</strong> sells items for a flat, tax-inclusive price of <strong>$108.60</strong>. Phoenix applies the 5.60% state TPT, 0.70% Maricopa County tax, and 2.30% city privilege tax, creating an <strong>8.60% combined rate</strong>.
                </p>
                <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-xs)', border: '1px solid var(--hairline)', fontFamily: 'monospace', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><span style={{ color: 'var(--muted)' }}>Step 1 — Decimal Divisor:</span> <span style={{ color: 'var(--primary-deep)', fontWeight: 700 }}>1 + (8.60 / 100) = 1.0860</span></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 2 — Extract Pre-Tax Base:</span> <span style={{ color: 'var(--ink)' }}>$108.60 ÷ 1.0860 = </span><strong style={{ color: 'var(--primary-deep)' }}>$100.00</strong></div>
                  <div><span style={{ color: 'var(--muted)' }}>Step 3 — Extract Implied TPT:</span> <span style={{ color: 'var(--ink)' }}>$108.60 - $100.00 = </span><strong style={{ color: '#b91c1c' }}>$8.60</strong></div>
                </div>

                <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--hairline)', fontSize: 14, color: 'var(--body)', lineHeight: 1.7 }}>
                  <p>
                    <strong>Why Subtraction Fails:</strong> If you simply subtract 8.60% from $108.60 ($108.60 × 0.0860 = $9.34; $108.60 - $9.34 = $99.26), you understate your true sales revenue by $0.74 per hundred dollars and overpay tax to the Department of Revenue. Division by the combined multiplier is the only mathematically and legally valid method.
                  </p>
                </div>
              </div>
            </section>

            {/* ADOR Form TPT-2 Filing Guide */}
            <section>
              <span className="section-label">Tax Compliance</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Reporting Tax-Inclusive Sales on ADOR Form TPT-2
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Arizona businesses that price products inclusive of TPT must separate revenue when preparing monthly or quarterly filings on <strong>AZTaxes.gov</strong>. Follow these reporting guidelines:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>1. Gross Receipts (Col A)</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Enter your calculated pre-tax revenue (not the total collected with tax). If your POS collected $10,860, enter $10,000 as your true gross taxable receipts.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>2. Statutory Deductions (Col B)</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Deduct exempt sales including wholesale transactions, out-of-state shipments, and statutory exemptions under A.R.S. § 42-5061.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', textTransform: 'uppercase', marginBottom: 6 }}>3. Tax Due Calculation</div>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      The AZTaxes system multiplies net taxable receipts by the regional business code rate (e.g., Business Code 017 for retail) to generate total tax due.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Arizona Statutory Exemptions */}
            <section>
              <span className="section-label">Statutory Exemptions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                Exemptions and Special Rules in Arizona
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                <p>
                  Arizona provides clear statutory exemptions from Transaction Privilege Tax. When auditing receipts or calculating reverse tax, verify whether items fall into exempt categories:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>🍎 Food for Home Consumption</h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Unprepared groceries are 100% exempt from the 5.60% state TPT and all county excise taxes. However, certain cities (e.g., Prescott, Globe) levy local grocery tax under the Model City Tax Code.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>💊 Prescription Drugs & Medical Devices</h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Prescription medications, durable medical equipment, hearing aids, and prosthetics are fully exempt from state and local TPT under A.R.S. § 42-5102.
                    </p>
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>🚜 Manufacturing & Ag Machinery</h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                      Machinery and equipment used directly in manufacturing, mining, and commercial farming are exempt from retail classification TPT to prevent tax cascading.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <span className="section-label">Frequently Asked Questions</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 24px', letterSpacing: '-0.02em' }}>
                Arizona Sales Tax & TPT FAQ
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
                Need to calculate pre-tax amounts for surrounding states or explore nationwide rates? Try our specialized tools:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="/" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  National Reverse Tax Calculator
                </Link>
                <Link href="/us/california" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  California Reverse Sales Tax
                </Link>
                <Link href="/us/texas" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Texas Sales Tax Calculator
                </Link>
                <Link href="/us/nevada" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  Nevada Reverse Sales Tax
                </Link>
                <Link href="/tax-rates" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                  All 50 US State Tax Rates
                </Link>
              </div>
            </section>

            <AdSlot slot="az-bottom-slot" size="rectangle" />
          </div>
        </div>
      </div>
    </main>
  );
}
