import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import CalculatorCard from '@/components/calculator/CalculatorCard';
import HowItWorks from '@/components/HowItWorks';
import FAQSection from '@/components/FAQSection';
import StateTable from '@/components/StateTable';

export const metadata: Metadata = {
  title: 'Reverse Sales Tax Calculator — Calculate Original Price Before Tax | Free',
  alternates: { 
    canonical: 'https://salestaxreversecalculator.com',
    languages: {
      'en-US': 'https://salestaxreversecalculator.com',
      'en-CA': 'https://salestaxreversecalculator.com/canada',
      'en-GB': 'https://salestaxreversecalculator.com/vat-calculator',
    },
  },
  openGraph: {
    images: [{ url: 'https://salestaxreversecalculator.com/api/og?title=Reverse%20Sales%20Tax%20Calculator&rate=7.53', alt: 'Reverse Sales Tax Calculator Tool Home' }],
  },
};const USE_CASES = [
  'Verifying itemized receipts match advertised prices',
  'Reconciling business expense reports',
  'Calculating pre-tax amounts for insurance claims',
  'Accounting for sales tax on corporate purchases',
  'Comparing prices across states with different tax rates',
  'Converting VAT-inclusive prices to net amounts',
  'Preparing tax returns that require pre-tax amounts',
  'Auditing vendor invoices for correct tax charges',
];export default function HomePage() {
  const SITE_URL = 'https://salestaxreversecalculator.com';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        "@type": "Question",
        "name": "What is a reverse sales tax calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A reverse sales tax calculator works backwards from the total price you paid (including tax) to find the original pre-tax price. Instead of adding tax onto a price, it removes the tax to reveal what the item actually cost before tax was applied."
        }
      },
      {
        "@type": "Question",
        "name": "What is the formula for reverse sales tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The formula is: Original Price = Final Price ÷ (1 + Tax Rate / 100). For example, if you paid $107.50 and the tax rate is 7.5%, the calculation is: $107.50 ÷ 1.075 = $100.00. The tax amount paid was $7.50."
        }
      },
      {
        "@type": "Question",
        "name": "Which US states have no sales tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Five US states have no state-level general sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate the original price before tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Step 1: Convert your tax rate to a decimal by dividing by 100 (e.g., 8.5% → 0.085). Step 2: Add 1 to that decimal (1 + 0.085 = 1.085). Step 3: Divide your total price by that number ($115.13 ÷ 1.085 = $106.11 pre-tax price)."
        }
      },
      {
        "@type": "Question",
        "name": "Why do you divide instead of just subtracting the tax percentage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because sales tax is applied to the pre-tax price, not the final total. If you incorrectly subtract 7.5% from $107.50, you get $99.44 (wrong). The correct method divides: $107.50 ÷ 1.075 = $100.00."
        }
      },
      {
        "@type": "Question",
        "name": "Which state has the highest combined sales tax rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Louisiana and Tennessee have among the highest combined average sales tax rates, followed closely by Arkansas, Alabama, and Oklahoma. These high rates are driven by significant local district taxes added on top of the state base rate."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this calculator for UK VAT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The UK standard VAT rate is 20%. Divide your VAT-inclusive price by 1.20 to find the ex-VAT (net) price."
        }
      },
      {
        "@type": "Question",
        "name": "How do I remove GST from a price in Alberta, Canada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alberta only charges the federal 5% GST with no provincial tax. Divide your total by 1.05. Example: $105.00 ÷ 1.05 = $100.00 pre-tax price."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free, forever. There is no account registration required, no trial period, and no premium tier. All calculations run entirely in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average US combined sales tax rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average combined US sales tax rate (state base + average local) is approximately 7.53% as of 2026, according to the Tax Foundation. This varies from 0% in tax-free states to over 9.5% in high-tax states."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Reverse Sales Tax",
    "description": "Step-by-step guide to finding the original pre-tax price from a total price inclusive of sales tax.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Identify the total price and tax rate",
        "text": "Look at your receipt or price tag to find the total amount paid and the applicable sales tax rate (e.g., 8.5%).",
        "url": "https://salestaxreversecalculator.com/#calculator"
      },
      {
        "@type": "HowToStep",
        "name": "Convert tax rate to decimal",
        "text": "Divide the tax rate by 100. For example, 8.5 / 100 = 0.085."
      },
      {
        "@type": "HowToStep",
        "name": "Add 1 to the decimal",
        "text": "Add 1 to the result from the previous step. For example, 1 + 0.085 = 1.085."
      },
      {
        "@type": "HowToStep",
        "name": "Divide total price by the divisor",
        "text": "Divide the final total price by the divisor you calculated. For example, $108.50 / 1.085 = $100.00."
      }
    ],
    "totalTime": "PT1M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Total price paid"
      },
      {
        "@type": "HowToSupply",
        "name": "Sales tax rate"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Reverse Sales Tax Calculator"
      }
    ]
  };


  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="calculator" style={{ padding: '80px 0 100px', position: 'relative', borderBottom: '2px solid var(--border)' }}>
        <div className="container-main" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary)', border: '2px solid #000', borderRadius: 'var(--radius)', padding: '6px 16px', marginBottom: 24, boxShadow: '4px 4px 0px 0px rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Free · No signup · Instant results</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 8vw, 84px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Reverse Sales Tax<br />
            <span style={{ color: 'var(--primary)', textShadow: '4px 4px 0px #000' }}>
              Calculator
            </span>
          </h1>

          <p className="hero-tagline" style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', color: 'var(--text-secondary)', maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>
            Enter any total price. Get the original pre-tax amount instantly.<br />
            Works for all 50 US states, Canada, UK, EU, and worldwide.
          </p>

          {/* Trust Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { text: 'all 50 US states' },
              { text: 'Canada GST/HST' },
              { text: 'EU VAT' },
              { text: 'Client-side secure' },
            ].map(({ text }) => (
              <div key={text} className="trust-badge">
                <span>✓</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* CALCULATOR MOVED HERE */}
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <CalculatorCard />
          </div>
        </div>
      </section>

      {/* ── Additional Info ───────── */}
      <div className="container-main" style={{ marginTop: 64, marginBottom: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }} className="calc-layout">
          <div>
            <div style={{ marginBottom: 24 }}>
              <AdSlot slot="results-rectangle" size="rectangle" />
            </div>

            <div style={{ maxWidth: 860 }}>
              <span className="section-label">About</span>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                What Is a Reverse Sales Tax Calculator?
              </h2>
              <div style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>
                  A <strong>reverse sales tax calculator</strong> is a financial tool that works backwards from a tax-inclusive
                  price to reveal the original pre-tax amount. Unlike a standard sales tax calculator that adds tax to a price,
                  our tool removes the tax — answering the question: <em>"How much did this item actually cost before tax?"</em>
                </p>
                <p>
                  This is particularly useful when you receive a receipt, invoice, or price tag that already includes tax, and you
                  need to know the base price. The math isn't as simple as just subtracting the tax percentage — because the tax
                  was calculated on the pre-tax price, not the total. That's why the correct formula divides by <code>(1 + rate/100)</code>.
                </p>
                <p>
                  Our calculator supports all 50 US states plus DC with their current combined average tax rates (state + local),
                  Canadian provincial taxes (GST, HST, PST/QST), and European VAT rates. All calculations happen instantly in
                  your browser — no data is sent to any server, and no account is required.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 80 }} className="sidebar">

            {/* Quick Tips Card */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>💡 Quick Tips</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Formula: Price ÷ (1 + rate/100)',
                  'Use the state dropdown for local rates',
                  'Quick-rate buttons for common rates',
                  'Batch mode for multiple receipts',
                ].map((tip) => (
                  <li key={tip} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Links */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>🔗 Related Tools</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { href: '/vat-calculator', label: 'VAT Calculator (EU)' },
                  { href: '/canada', label: 'Canada GST/HST' },
                  { href: '/us/california', label: 'California Tax Calc' },
                  { href: '/us/texas', label: 'Texas Tax Calc' },
                  { href: '/us/new-york', label: 'New York Tax Calc' },
                  { href: '/tax-rates', label: 'All State Rates' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                      {label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calc-layout { grid-template-columns: 1fr !important; }
          .sidebar { position: static !important; }
        }
      `}</style>

      {/* ── How It Works ─────────────────────────────────────── */}
      <div style={{ background: 'var(--card-bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '80px 0' }}>
        <div className="container-main">
          <HowItWorks />
        </div>
      </div>

      {/* ── Formula Box ──────────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <div className="formula-box">
          <div style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: 16 }}>
            The Reverse Tax Formula
          </div>
          <div className="formula-text">Original Price = Final Price ÷ (1 + Tax Rate / 100)</div>
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, opacity: 0.85 }}>
            <div style={{ background: 'var(--bg)', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: 14 }}>
              <div style={{ fontSize: 12, marginBottom: 4, opacity: 0.7 }}>EXAMPLE</div>
              <div style={{ fontSize: 14 }}>$107.50 ÷ (1 + 7.5/100)</div>
              <div style={{ fontSize: 14 }}>= $107.50 ÷ 1.075</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>= $100.00 ✓</div>
            </div>
            <div style={{ background: 'var(--bg)', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: 14 }}>
              <div style={{ fontSize: 12, marginBottom: 4, opacity: 0.7 }}>TAX AMOUNT</div>
              <div style={{ fontSize: 14 }}>$107.50 − $100.00</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>= $7.50 tax paid</div>
            </div>
          </div>
        </div>
      </div>


      <div className="container-main" style={{ marginTop: 48 }}>
        <AdSlot slot="in-article-1" size="in-article" />
      </div>

      {/* ── Why You Might Need This ──────────────────────────── */}
      <div style={{ background: 'var(--bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', marginTop: 64, padding: '64px 0' }}>
        <div className="container-main">
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <span className="section-label">Use Cases</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 32px' }}>
              Why Use a Reverse Sales Tax Calculator?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
              {USE_CASES.map((uc, i) => (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{uc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── State Rates Table ─────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <StateTable />
      </div>


      <div className="container-main" style={{ marginTop: 48 }}>
        <AdSlot slot="in-article-2" size="in-article" />
      </div>

      {/* ── Business Use Section ──────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 48 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <span className="section-label">Business Use</span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
            How Businesses Use Reverse Tax Calculations
          </h2>
          <div style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              For businesses, reverse sales tax calculation is a daily necessity. Accounting departments regularly receive
              invoices and receipts with tax-inclusive totals and must extract the pre-tax base for proper bookkeeping,
              expense categorization, and financial reporting.
            </p>
            <p>
              <strong>Expense Reporting:</strong> When employees submit expense reports with tax-inclusive receipts, accountants
              need the pre-tax amount to correctly categorize expenses and claim input tax credits where applicable. Our batch
              mode lets you process an entire month&apos;s receipts in seconds.
            </p>
            <p>
              <strong>Vendor Invoice Verification:</strong> Businesses frequently need to verify that a vendor charged the
              correct tax amount on an invoice. By calculating the expected pre-tax price from the total, you can quickly
              spot discrepancies and potential billing errors.
            </p>
            <p>
              <strong>Cross-State Operations:</strong> Companies operating across multiple US states must account for different
              tax rates in each jurisdiction. Our state-specific calculators and filterable rate table make it easy to handle
              transactions from any state without manual lookup.
            </p>
            <p>
              <strong>Retail & E-Commerce:</strong> Online retailers selling to customers in multiple states need to verify
              sales tax collection accuracy. Reverse calculations help audit whether the correct amounts were charged during
              checkout and collected for remittance to state authorities.
            </p>
          </div>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <FAQSection />
      </div>

      {/* ── References & Sources ──────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <span className="section-label">Sources</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 8px' }}>
            References &amp; Official Sources
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
            All tax rates and information on this site are derived from official government publications and recognized tax research organizations. We recommend verifying current rates directly with these authoritative sources before use in official filings.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              {
                title: 'IRS — Sales Tax Deduction',
                desc: 'Official IRS guidance on deducting state and local general sales taxes.',
                href: 'https://www.irs.gov/taxtopics/tc503',
                badge: 'IRS.gov',
              },
              {
                title: 'Tax Foundation — State Sales Tax Rates',
                desc: 'Annual data and analysis of all 50 state combined sales tax rates, updated each year.',
                href: 'https://taxfoundation.org/data/all/state/2024-sales-taxes/',
                badge: 'taxfoundation.org',
              },
              {
                title: 'Sales Tax Institute',
                desc: 'Comprehensive database of US state, county, and city sales tax rates and nexus rules.',
                href: 'https://www.salestaxinstitute.com/resources/rates',
                badge: 'salestaxinstitute.com',
              },
              {
                title: 'Canada Revenue Agency — GST/HST',
                desc: 'Official CRA guidance on Canadian GST/HST rates, registration, and filing requirements.',
                href: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html',
                badge: 'canada.ca',
              },
              {
                title: 'OECD — Consumption Tax Trends',
                desc: 'International VAT/GST rates and consumption tax policy data across 38 member countries.',
                href: 'https://www.oecd.org/en/publications/consumption-tax-trends_ctpa-2024-en.html',
                badge: 'oecd.org',
              },
              {
                title: 'Tax Policy Center — State & Local Tax Data',
                desc: 'Research briefs and data on US state and local government tax revenue and policy.',
                href: 'https://www.taxpolicycenter.org/statistics/state-and-local-general-sales-and-gross-receipts-tax-revenue',
                badge: 'taxpolicycenter.org',
              },
            ].map(({ title, desc, href, badge }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div className="card" style={{ height: '100%', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'inline-block', background: 'var(--primary)', color: '#000', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 4, marginBottom: 10 }}>
                    {badge}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Related Tools ─────────────────────────────────────── */}
      <div style={{ background: 'var(--card-bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', marginTop: 64, padding: '64px 0' }}>
        <div className="container-main">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label">Related Tools</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0' }}>
              More Free Tax Calculators
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {/* Related Tools List */}
            { [
                { href: '/vat-calculator', icon: '🇪🇺', title: 'VAT Calculator', desc: 'Remove VAT from prices for UK, EU, and Australia', alt: 'European Union flag icon' },
                { href: '/canada', icon: '🇨🇦', title: 'Canada Tax Calculator', desc: 'GST, HST, PST and Quebec QST reverse calculations', alt: 'Canada flag icon' },
                { href: '/us/california', icon: '🌴', title: 'California Calculator', desc: "Pre-filled with California's 9.06% combined rate", alt: 'California palm tree icon' },
                { href: '/us/texas', icon: '⭐', title: 'Texas Calculator', desc: "Pre-filled with Texas's 8.19% combined rate", alt: 'Texas star icon' },
                { href: '/us/new-york', icon: '🗽', title: 'New York Calculator', desc: "Pre-filled with New York's 8.54% combined rate", alt: 'Statue of Liberty icon' },
                { href: '/tax-rates', icon: '📊', title: 'All State Tax Rates', desc: 'Complete table of all 50 state combined tax rates', alt: 'Chart icon' },
              ].map(({ href, icon, title, desc, alt }) => (
                <Link key={href} href={href} className="tool-card">
                  <div role="img" aria-label={alt} style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
                </Link>
              ))}

          </div>
        </div>
      </div>
    </main>
  );
}
