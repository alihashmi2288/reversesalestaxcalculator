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
};

export default function HomePage() {
  const SITE_URL = 'https://salestaxreversecalculator.com';

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PreTaxPrice — Reverse Sales Tax Calculator",
    "url": SITE_URL,
    "description": "Free reverse sales tax calculator. Find the original pre-tax price from any receipt total. Works for all 50 US states, Canada GST/HST, and EU VAT.",
    "publisher": {
      "@type": "Organization",
      "name": "PreTaxPrice",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/og-image.png`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/tax-rates?s={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reverse Sales Tax Calculator",
    "url": SITE_URL,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "A free reverse sales tax calculator that works backwards from a tax-inclusive total to find the original pre-tax price. Supports all 50 US states, Canada GST/HST/PST/QST, and European VAT.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Reverse sales tax calculation for all 50 US states",
      "Canada GST, HST, PST and QST reverse calculation",
      "EU and UK VAT reverse calculation",
      "Batch/CSV mode for multiple receipts",
      "Find Tax Rate mode",
      "No signup required",
      "Client-side calculation — no data sent to servers"
    ],
    "screenshot": `${SITE_URL}/og-image.png`,
    "publisher": {
      "@type": "Organization",
      "name": "PreTaxPrice",
      "url": SITE_URL
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a reverse sales tax calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A reverse sales tax calculator works backwards from a tax-inclusive total price to find the original pre-tax amount. Instead of adding tax to a price, it removes the tax using the formula: Original Price = Final Price divided by (1 + Tax Rate / 100)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the formula for reverse sales tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The reverse sales tax formula is: Original Price = Final Price divided by (1 + Tax Rate / 100). For example, if you paid $107.50 at a 7.5% tax rate: $107.50 / 1.075 = $100.00 pre-tax price."
        }
      },
      {
        "@type": "Question",
        "name": "Why do you divide instead of subtract the tax percentage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because sales tax is applied to the pre-tax price, not the final total. Division is the exact mathematical inverse of the original multiplication. Subtracting the percentage from the total gives a slightly wrong answer because you would be calculating a percentage of the wrong base."
        }
      },
      {
        "@type": "Question",
        "name": "Which US states have no sales tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Five US states have no state-level general sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Note that some Alaska localities do charge local sales taxes, giving Alaska a small combined average rate of about 1.76%."
        }
      },
      {
        "@type": "Question",
        "name": "Does this calculator work for Canada and Europe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The calculator supports Canadian taxes including federal GST (5%), HST for applicable provinces (13-15%), provincial PST, and Quebec's QST (9.975%). It also supports EU and UK VAT at all standard rates. The reverse calculation formula is identical regardless of what the tax is called."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free with no account required. All calculations run entirely in your browser — no data is sent to any server."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Reverse Sales Tax Calculator",
        "item": SITE_URL
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section id="calculator" style={{ padding: 'clamp(40px, 6vw, 80px) 0', position: 'relative', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ top: '-10%', left: '-10%', width: 600, height: 600 }}></div>
        <div className="glow-blob" style={{ bottom: '-10%', right: '-10%', width: 500, height: 500 }}></div>
        <div className="container-main">
          
          {/* Centered Above-the-Fold Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(204, 255, 0, 0.08)', border: '1px solid rgba(204, 255, 0, 0.3)', borderRadius: 'var(--radius-sm)', padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Free · No signup · Instant calculations</span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px, 5vw, 68px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.05, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Reverse Sales Tax<br />
              <span style={{ color: 'var(--primary)', textShadow: '0 0 30px rgba(204, 255, 0, 0.25)' }}>
                Calculator
              </span>
            </h1>
            
            <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', color: 'var(--text-secondary)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
              Instantly find the original price before tax was added. Enter your total amount and tax rate — get a full breakdown in seconds. Free, accurate, and works for any tax rate worldwide.
            </p>
          </div>

          {/* Centered Calculator Container */}
          <div style={{ maxWidth: 800, margin: '0 auto 48px' }}>
            <CalculatorCard />
          </div>

          {/* Intro Text and Formula Columns below Calculator */}
          <div className="homepage-hero-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'stretch' }}>

            {/* ── Hero Left: Intro + Trust badges ── */}
            <div className="hero-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
                <p style={{ margin: 0 }}>
                  You paid <strong style={{ color: 'var(--text-primary)' }}>$113.85</strong> at checkout. The receipt shows <strong style={{ color: 'var(--text-primary)' }}>8.25%</strong> tax. But what did the item actually cost before tax? Find out in one step.
                </p>
                <p style={{ margin: 0 }}>
                  Works for all <strong style={{ color: 'var(--text-primary)' }}>50 US states</strong>, Canada GST/HST, UK VAT, EU VAT, and every other tax rate worldwide. Runs entirely in your browser — nothing leaves your device.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { text: 'All 50 US states' },
                  { text: 'Canada GST/HST/QST' },
                  { text: 'EU & UK VAT' },
                  { text: '100% Client-side secure' },
                ].map(({ text }) => (
                  <div key={text} className="trust-badge" style={{ borderRadius: 'var(--radius-sm)' }}>
                    <span>✓</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Hero Right: Formula Card ── */}
            <div className="hero-right" style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', padding: '24px 32px', background: 'rgba(204,255,0,0.02)', border: '1px solid rgba(204,255,0,0.15)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: 14, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>The Formula</span>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 16 }}>Original Price = Total ÷ (1 + Rate / 100)</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 12, lineHeight: 1.5, fontFamily: 'var(--font-sans)', textTransform: 'none' }}>
                  This is the standard reverse tax calculation formula used by accountants and bookkeeping software globally to isolate pre-tax subtotals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Main Layout: Content + Sidebars ── */}
      <div className="container-main" style={{ marginTop: 40, marginBottom: 40 }}>
        {/* 12-Column Dashboard Grid */}
        <div className="dashboard-grid">
          
          {/* Column 1: Popular States (3 cols) */}
          <div className="dashboard-col-3">
            <div className="sidebar-state-links" style={{ height: '100%' }}>
              <h3>🇺🇸 Popular States</h3>
              {[
                { href: '/us/california', name: 'California', rate: '9.06%' },
                { href: '/us/texas', name: 'Texas', rate: '8.19%' },
                { href: '/us/new-york', name: 'New York', rate: '8.54%' },
                { href: '/us/florida', name: 'Florida', rate: '7.01%' },
                { href: '/us/washington', name: 'Washington', rate: '9.23%' },
                { href: '/us/illinois', name: 'Illinois', rate: '8.86%' },
                { href: '/us/tennessee', name: 'Tennessee', rate: '9.55%' },
                { href: '/us/ohio', name: 'Ohio', rate: '7.23%' },
              ].map(({ href, name, rate }) => (
                <Link key={href} href={href} className="sidebar-state-link">
                  <span className="sidebar-state-name">{name}</span>
                  <span className="sidebar-state-rate">{rate}</span>
                </Link>
              ))}
              <div style={{ marginTop: 14 }}>
                <Link href="/tax-rates" style={{ fontSize: 12, color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  View All 50 States →
                </Link>
              </div>
              
              <div className="divider" style={{ margin: '16px 0', height: 1 }} />
              
              <h3 style={{ marginTop: 8 }}>🌍 International</h3>
              <Link href="/canada" className="sidebar-state-link">
                <span className="sidebar-state-name">🇨🇦 Canada GST/HST</span>
                <span className="sidebar-state-rate">5–15%</span>
              </Link>
              <Link href="/vat-calculator" className="sidebar-state-link">
                <span className="sidebar-state-name">🇪🇺 EU VAT</span>
                <span className="sidebar-state-rate">20–27%</span>
              </Link>
              <Link href="/vat-calculator" className="sidebar-state-link">
                <span className="sidebar-state-name">🇬🇧 UK VAT</span>
                <span className="sidebar-state-rate">20%</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Reference Tips (5 cols) */}
          <div className="dashboard-col-5">
            <div className="sidebar-quick-ref" style={{ height: '100%' }}>
              <h3>💡 Quick Reference Tips</h3>
              {[
                { title: 'The Formula', text: 'Price ÷ (1 + rate/100) backs out tax correctly.' },
                { title: 'Local Rates', text: 'Use the US state dropdown to auto-load combined local rates.' },
                { title: 'Quick Buttons', text: 'Use preset percentage buttons for fast standard calculations.' },
                { title: 'Batch Processing', text: 'Paste lists of numbers in Batch Mode to calculate in bulk.' },
                { title: 'Find Tax Rate', text: 'Switch tabs to compute the implied rate from a receipt total.' },
              ].map((tip, idx) => (
                <div key={idx} className="sidebar-quick-ref-item" style={{ fontSize: 13, padding: '10px 0' }}>
                  <strong style={{ color: 'var(--primary)' }}>{tip.title}</strong>
                  {tip.text}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Why Use PreTaxPrice? (4 cols) */}
          <div className="dashboard-col-4">
            <div className="sidebar-quick-ref" style={{ height: '100%', borderColor: 'rgba(204, 255, 0, 0.25)' }}>
              <h3 style={{ color: 'var(--primary)' }}>🚀 Why Use PreTaxPrice?</h3>
              <div className="sidebar-quick-ref-item" style={{ padding: '8px 0' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: 12 }}>100% Client-Side Safe</strong>
                Calculations run directly inside your browser. No receipt data or transaction totals ever leave your device.
              </div>
              <div className="sidebar-quick-ref-item" style={{ padding: '8px 0' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: 12 }}>Perfect Decimal Precision</strong>
                Eliminates the common "subtracting error" in bookkeeping, guaranteeing GAAP-compliant, rounded breakdowns.
              </div>
              <div className="sidebar-quick-ref-item" style={{ padding: '8px 0' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: 12 }}>Batch Mode Processing</strong>
                Paste multiple receipts or totals to calculate dozens of pre-tax prices simultaneously, saving accounting hours.
              </div>
              <div className="sidebar-quick-ref-item" style={{ padding: '8px 0' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: 12 }}>Combined Local Rates</strong>
                Preloaded with the latest 2026 combined state + local rates to account for local city and county surcharges.
              </div>
            </div>
          </div>

        </div>

        {/* Ad Space below the dashboard grid */}
        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <AdSlot slot="results-rectangle" size="rectangle" />
        </div>

        {/* Centered Educational Content Layout */}
        <div className="educational-content-layout">
              
              {/* SECTION: What is Reverse Sales Tax */}
              <section>
                <span className="section-label">About</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  What Is a Reverse Sales Tax Calculator?
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    A <strong>reverse sales tax calculator</strong> works backwards from a tax-included total to find the original price before tax was added. Most calculators start with a base price and add tax on top. This one does the opposite.
                  </p>
                  <p>
                    Here is why that matters. When you see a price on a receipt, invoice, or expense report, that number already includes tax. To find what the item actually cost, you cannot just subtract the tax percentage from the total. That gives you the wrong number every time.
                  </p>
                  <div style={{ background: 'rgba(239, 68, 68, 0.01)', borderLeft: '4px solid #ef4444', borderRight: '1px solid var(--border)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius)', margin: '20px 0' }}>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 700, textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
                      ⚠️ Example of the Subtracting Error:
                    </p>
                    <p style={{ margin: '10px 0 0', fontSize: 15, color: 'var(--text-secondary)' }}>
                      You paid $107.50 with a 7.5% tax rate. If you subtract 7.5% from $107.50, you get $99.44. <strong>That is wrong.</strong> The correct original price is <strong>$100.00</strong>. The reverse sales tax formula divides instead of subtracts, and the difference adds up fast across hundreds of transactions.
                    </p>
                  </div>
                  <p>
                    This tool fixes that problem instantly. The term <strong>reverse tax</strong> refers to working backwards from a final amount to isolate the base price and the tax component separately. Accountants, business owners, freelancers, and everyday shoppers use this process daily for expense tracking, invoice verification, and financial reporting.
                  </p>
                </div>
              </section>

              {/* SECTION: The Reverse Sales Tax Formula */}
              <section>
                <span className="section-label">Math</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  The Reverse Sales Tax Formula
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    The formula is straightforward once you see it:
                  </p>
                  
                  <div className="formula-box" style={{ margin: '16px 0' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: 12 }}>
                      The Standard Equation
                    </div>
                    <div className="formula-text" style={{ fontSize: 'clamp(18px, 4vw, 26px)' }}>Original Price = Final Price ÷ (1 + Tax Rate / 100)</div>
                  </div>

                  <p>
                    That is the sales tax reverse formula used by accountants, IRS-compliant bookkeeping systems, and financial reporting tools worldwide.
                  </p>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginTop: 12 }}>
                    How the math breaks down step-by-step:
                  </h3>

                  <ol style={{ listStyle: 'decimal', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
                    <li>Take the tax rate and divide it by 100. So 8.5% becomes <code>0.085</code>.</li>
                    <li>Add 1 to that number. You get <code>1.085</code>.</li>
                    <li>Divide the total price you paid by <code>1.085</code>.</li>
                    <li>The result is the original pre-tax price.</li>
                    <li>Subtract the original price from the total to find the exact tax amount paid.</li>
                  </ol>

                  {/* Worked Example Card */}
                  <div className="card" style={{ background: 'rgba(255,255,255,0.01)', marginTop: 24 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
                      Worked Example:
                    </h4>
                    <p style={{ fontSize: 15, margin: '0 0 16px', color: 'var(--text-secondary)' }}>
                      You paid <strong style={{ color: 'var(--text-primary)' }}>$215.70</strong>. The tax rate is <strong style={{ color: 'var(--text-primary)' }}>8.25%</strong>.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                      <div style={{ background: 'rgba(0,0,0,0.4)', padding: 16, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 6, textTransform: 'uppercase' }}>1. RATE DECIMAL</div>
                        <div style={{ color: 'var(--text-primary)' }}>8.25 ÷ 100 = 0.0825</div>
                        <div style={{ color: 'var(--text-primary)' }}>1 + 0.0825 = 1.0825</div>
                      </div>
                      <div style={{ background: 'rgba(0,0,0,0.4)', padding: 16, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 6, textTransform: 'uppercase' }}>2. ORIGINAL PRICE</div>
                        <div style={{ color: 'var(--text-primary)' }}>$215.70 ÷ 1.0825</div>
                        <div style={{ color: 'var(--primary)', fontWeight: 700 }}>= $199.26</div>
                      </div>
                      <div style={{ background: 'rgba(0,0,0,0.4)', padding: 16, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 6, textTransform: 'uppercase' }}>3. TAX AMOUNT</div>
                        <div style={{ color: 'var(--text-primary)' }}>$215.70 − $199.26</div>
                        <div style={{ color: 'var(--primary)', fontWeight: 700 }}>= $16.44 paid</div>
                      </div>
                    </div>
                  </div>

                  <p>
                    Many people try to figure sales tax from total amounts by multiplying the total by the tax rate. That produces the wrong answer because the tax rate applies to the base price, not the total. Division is the only correct method. Our calculator applies this formula automatically every time.
                  </p>
                </div>
              </section>

              {/* SECTION: How to Use This Calculator */}
              <section>
                <span className="section-label">Guide</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  How to Use This Calculator
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    Using our calculator is exceptionally simple and covers multiple advanced use cases.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, margin: '20px 0' }}>
                    <div style={{ border: '1px solid var(--border)', padding: 24, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>01</div>
                      <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: 14, marginBottom: 10 }}>Enter Total Price</h4>
                      <p style={{ fontSize: 14, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Type in the full amount you paid including tax, exactly as it appears on your receipt or invoice.</p>
                    </div>
                    <div style={{ border: '1px solid var(--border)', padding: 24, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>02</div>
                      <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: 14, marginBottom: 10 }}>Set Tax Rate</h4>
                      <p style={{ fontSize: 14, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Select your US state from the dropdown for automatic combined rates, or enter any custom rate.</p>
                    </div>
                    <div style={{ border: '1px solid var(--border)', padding: 24, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>03</div>
                      <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: 14, marginBottom: 10 }}>Get Results</h4>
                      <p style={{ fontSize: 14, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Click Calculate. Instantly see the original pre-tax price, the exact tax amount, and a breakdown.</p>
                    </div>
                  </div>

                  <p>
                    <strong>Batch Mode:</strong> If you have multiple receipts to process, click the <em>Batch / CSV Mode</em> tab at the top of the calculator. Paste a list of totals with their respective tax rates, and the calculator handles all of them simultaneously. This saves hours when reconciling a month of business expenses.
                  </p>
                  <p>
                    <strong>Find Tax Rate Mode:</strong> If you know the total you paid and the original pre-tax price, but don't know what tax rate was applied, switch to the <em>Find Tax Rate</em> mode. It reverse-calculates the implied tax rate, which is incredibly useful when a receipt shows a tax amount but not the percentage.
                  </p>
                </div>
              </section>

              {/* SECTION: US Sales Tax Rates by State (2026) */}
              <section>
                <span className="section-label">State Rates</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  US Sales Tax Rates by State (2026)
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    Every state page on this site uses the current combined rate, which includes the state base rate plus the average local rate. Click any state in the table below to open a calculator pre-loaded with that state's rate.
                  </p>
                  <p>
                    Sales tax in the United States operates at multiple levels. The state sets a base rate. Counties and cities can add their own rates on top. The combined total is what you actually pay at the register.
                  </p>
                  <p>
                    Five states have no state-level sales tax at all: <strong>Alaska, Delaware, Montana, New Hampshire, and Oregon</strong>. Alaska is worth noting separately because local municipalities there do charge sales tax, giving it a small combined average of around 1.76%.
                  </p>
                  <p>
                    The states with the highest combined average rates as of 2026 are Tennessee at 9.6%, Louisiana at 9.5%, Arkansas at 9.49%, and Alabama at 9.33%. These high totals come mostly from significant local district taxes stacked on top of the state rate.
                  </p>
                  <p>
                    The national average combined rate sits at approximately <strong>7.53%</strong> according to the Tax Foundation. But that average covers a range from 0% in tax-free states to over 9.5% in the highest-tax states.
                  </p>

                  {/* Pro Tip Callout */}
                  <div className="card" style={{ borderRadius: 'var(--radius)', border: '1px dashed var(--primary)', background: 'rgba(204, 255, 0, 0.02)', padding: '24px', margin: '24px 0' }}>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: 'var(--primary)', marginBottom: 10, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
                      ⭐ Pro Tip: Combined vs. State Rates
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
                      Always enter the <strong>combined tax rate</strong> (state + local taxes) printed on your physical receipt rather than the generic state base rate. Otherwise, your pre-tax calculations will be slightly wrong since local city and county surcharges won't be accounted for.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION: City-Level Tax Rates */}
              <section>
                <span className="section-label">Local Rates</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  City-Level Tax Rates: Where the Real Differences Are
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    State averages hide a lot of variation. Your specific city or county rate can be meaningfully higher than the statewide average, and that gap adds up on every purchase.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, margin: '20px 0' }}>
                    <div style={{ border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)', transition: 'border-color 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, textTransform: 'uppercase' }}>Chicago, IL</span>
                        <span style={{ background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 12 }}>10.25%</span>
                      </div>
                      <p style={{ fontSize: 13, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Breaks down as 6.25% state, 1.75% county, 1.25% city, plus additional district taxes.</p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)', transition: 'border-color 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, textTransform: 'uppercase' }}>New York City, NY</span>
                        <span style={{ background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 12 }}>8.875%</span>
                      </div>
                      <p style={{ fontSize: 13, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Includes 4% state, 4.5% city, plus a 0.375% MTA surcharge. Upstate counties typically range between 7% and 8%.</p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)', transition: 'border-color 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, textTransform: 'uppercase' }}>Los Angeles, CA</span>
                        <span style={{ background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 12 }}>10.25%</span>
                      </div>
                      <p style={{ fontSize: 13, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>California's base rate is 7.25%, but LA County adds local district taxes that push the rate to 10.25% in many ZIP codes.</p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)', transition: 'border-color 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, textTransform: 'uppercase' }}>Seattle, WA</span>
                        <span style={{ background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 12 }}>10.25%</span>
                      </div>
                      <p style={{ fontSize: 13, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Washington state charges 6.5%, but Seattle's combined rate including city and transit district taxes reaches 10.25%.</p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)', transition: 'border-color 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, textTransform: 'uppercase' }}>New Orleans, LA</span>
                        <span style={{ background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 12 }}>9.45%</span>
                      </div>
                      <p style={{ fontSize: 13, margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Louisiana's state rate is 4.45%, but Orleans Parish pushes the combined total above 9.45% depending on the transaction type.</p>
                    </div>
                  </div>

                  <p>
                    When you use the calculator for a city-specific purchase, always check whether your receipt shows the combined rate or just the state rate. The combined rate is the one you need to enter.
                  </p>
                </div>
              </section>

              {/* SECTION: How Businesses Use Reverse Tax Calculations Every Day */}
              <section>
                <span className="section-label">Business</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  How Businesses Use Reverse Tax Calculations Every Day
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <p style={{ margin: 0 }}>
                    For businesses, reverse sales tax calculation is a daily necessity. Accounting departments regularly receive invoices and receipts with tax-inclusive totals and must extract the pre-tax base for proper bookkeeping, expense categorization, and financial reporting.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 20 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textTransform: 'uppercase' }}>Expense Reporting</h3>
                      <p style={{ fontSize: 15, margin: 0, color: 'var(--text-secondary)' }}>
                        Every time an employee submits a receipt for reimbursement, the finance team needs the pre-tax amount. Most companies reimburse the base cost of a business expense and handle the tax separately. If a team member spent $86.40 on office supplies at an 8% tax rate, the reimbursable amount is $80.00. The tax amount is $6.40. The reverse sales tax calculator finds both numbers in one step.
                      </p>
                    </div>

                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 20 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textTransform: 'uppercase' }}>Vendor Invoice Verification</h3>
                      <p style={{ fontSize: 15, margin: 0, color: 'var(--text-secondary)' }}>
                        Vendors make tax errors. Sometimes the wrong rate gets applied, tax appears on a line item that should be exempt, or the arithmetic is simply off. Take the pre-tax subtotal on the invoice and multiply by <code>(1 + tax rate / 100)</code>. If the result matches the total on the invoice, the tax is correct. If it does not match, you have found a billing error before payment.
                      </p>
                    </div>

                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 20 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textTransform: 'uppercase' }}>Financial Statement Preparation</h3>
                      <p style={{ fontSize: 15, margin: 0, color: 'var(--text-secondary)' }}>
                        GAAP and IFRS both require businesses to report revenue net of sales tax. Sales tax is a liability that passes through the business to the government. It does not belong in your revenue line. If your point-of-sale system shows $45,000 in total receipts for the month and your average tax rate is 8.5%, your actual revenue is $41,475.11. The remaining $3,524.89 goes to the tax payable account. The reverse sales tax calculator gives you these numbers instantly.
                      </p>
                    </div>

                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 20 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textTransform: 'uppercase' }}>Sales Tax Remittance Reconciliation</h3>
                      <p style={{ fontSize: 15, margin: 0, color: 'var(--text-secondary)' }}>
                        Before filing a sales tax return, businesses need to verify that the amount in their tax payable account matches what was actually collected. Running a reverse calculation on total deposits confirms the split between revenue and tax. If the numbers do not reconcile, there is a recording error somewhere that needs to be found before the return is filed.
                      </p>
                    </div>

                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 20 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textTransform: 'uppercase' }}>Multi-State Operations</h3>
                      <p style={{ fontSize: 15, margin: 0, color: 'var(--text-secondary)' }}>
                        A business with nexus in multiple states deals with a different tax rate for every customer location. Reverse calculations let you verify that the correct rate was applied to each transaction by state. This matters especially for e-commerce sellers who collect tax across dozens of jurisdictions simultaneously.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: E-Commerce Sellers */}
              <section>
                <span className="section-label">E-Commerce</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  E-Commerce Sellers: What You Need to Know
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    The 2018 Supreme Court ruling in <em>South Dakota v. Wayfair</em> changed everything for online sellers. Before Wayfair, you only collected sales tax in states where you had a physical presence. After Wayfair, you collect in every state where you meet the economic nexus threshold, which is typically $100,000 in annual sales or 200 transactions.
                  </p>
                  <p>
                    That means an e-commerce seller with customers in 30 states potentially deals with 30 different tax rates. Reverse calculations become essential for several reasons:
                  </p>
                  <ul style={{ listStyle: 'square', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
                    <li>
                      <strong>Processing refunds correctly:</strong> When a customer returns an item, you refund both the product price and the exact tax they paid. If the original sale was $54.00 including 8% tax, the reverse calculation shows $50.00 product plus $4.00 tax. You refund $54.00 total. Getting this wrong means either shortchanging the customer or overpaying the refund.
                    </li>
                    <li>
                      <strong>Reconciling marketplace payouts:</strong> Amazon, eBay, and Etsy collect and remit sales tax in marketplace facilitator states on your behalf. Their payout reports show net amounts after tax. To verify your actual gross revenue, you work backwards from the totals using the applicable state rates.
                    </li>
                    <li>
                      <strong>Auditing tax collection accuracy:</strong> If your platform collected $1,092.90 on a product and you charged 9.29% tax, the reverse calculation confirms the base price was exactly $1,000.00. If the numbers do not line up, your tax settings have an error that will surface in a state audit.
                    </li>
                    <li>
                      <strong>Tracking nexus thresholds:</strong> Nexus thresholds are measured in gross revenue excluding tax. If you are approaching the threshold in a new state, you need to calculate your pre-tax revenue accurately. Using totals that include tax causes you to overestimate your revenue and potentially register for tax collection earlier than required.
                    </li>
                  </ul>
                </div>
              </section>

              {/* SECTION: Freelancers */}
              <section>
                <span className="section-label">Freelancers</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Freelancers and Independent Contractors
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    Freelancers often miss a straightforward tax deduction: the pre-tax cost of business purchases. The deductible amount is the base price, not the total you paid.
                  </p>
                  <p>
                    You spent <strong>$534.00</strong> on a new laptop. The tax rate in your state is <strong>7.5%</strong>. The reverse calculation shows your deductible business expense is <strong>$496.74</strong>. The remaining $37.26 is sales tax paid, which may also be deductible as a separate line item depending on your state and filing situation.
                  </p>
                  <p style={{ margin: '8px 0 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Common freelance purchases where this matters:
                  </p>
                  <ul style={{ listStyle: 'disc', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15 }}>
                    <li>Software subscriptions billed annually with tax included</li>
                    <li>Professional equipment and hardware</li>
                    <li>Office supplies from business purchases</li>
                    <li>Professional development courses sold at tax-inclusive prices</li>
                    <li>Coworking space memberships where tax is bundled into the monthly fee</li>
                  </ul>
                  <p>
                    If you use accounting software and enter the full tax-inclusive total instead of the pre-tax amount, your expense records are overstated. That produces inaccurate profit and loss reports and potentially incorrect tax deductions at year-end.
                  </p>
                </div>
              </section>

              {/* SECTION: Industry Segments */}
              <section>
                <span className="section-label">Industries</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Special Industry Considerations
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Restaurant and Hospitality</h3>
                    <p style={{ fontSize: 15, margin: 0, color: 'var(--text-secondary)' }}>
                      Food service operations deal with some of the most complex sales tax situations. Different items on the same check may carry different tax rates (e.g. prepared hot food, alcohol, soft drinks). 
                      <br />
                      <strong>Tip allocation:</strong> In many states, tips are calculated on the pre-tax amount of the bill, not the total. If a server presents a $108.00 check to a table expecting a 20% tip, the correct tip base is $100.00 (with 8% tax), making the tip $20.00, not $21.60. Customers and servers both benefit from clarity on this.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Real Estate and Property Management</h3>
                    <p style={{ fontSize: 15, margin: 0, color: 'var(--text-secondary)' }}>
                      Real estate transactions are not typically subject to sales tax, but many related services are. Property management fees are subject to sales tax in several states. A $1,620.00 monthly fee at 8% tax has a pre-tax base of $1,500.00. 
                      <br />
                      Short-term rental operators face a similar situation. Platforms like Airbnb collect occupancy taxes on behalf of hosts in many jurisdictions. The payout the host receives is the revenue after platform fees and taxes. Reverse calculations help hosts reconcile their gross rental income from the net amounts deposited.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION: Accounting Software Integration */}
              <section>
                <span className="section-label">Spreadsheets</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Accounting Software & Spreadsheet Integration
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <p style={{ margin: 0 }}>
                    The reverse sales tax formula translates directly into spreadsheet formulas and custom code snippets.
                  </p>

                  <div className="card" style={{ border: '2px solid var(--border)', background: '#121214' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
                      Excel & Google Sheets Formulas
                    </h3>
                    <p style={{ fontSize: 14, marginBottom: 12 }}>
                      If cell <strong>A1</strong> holds the final price and cell <strong>B1</strong> holds the tax rate as a percentage:
                    </p>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: '#09090b', padding: 14, borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div>
                        <span style={{ color: 'var(--primary)' }}>Original Price:</span> <code>=A1/(1+(B1/100))</code>
                      </div>
                      <div>
                        <span style={{ color: 'var(--primary)' }}>Tax Amount Paid:</span> <code>=A1-C1</code> <span style={{ opacity: 0.5 }}>(assuming C1 holds the original price formula)</span>
                      </div>
                    </div>
                  </div>

                  <p>
                    <strong>QuickBooks Workflow:</strong> When you enter a vendor bill or expense in QuickBooks, the system expects a pre-tax amount on the expense line. If you enter the tax-inclusive total instead, QuickBooks either double-counts the tax or records an inflated expense amount. Use the reverse calculator to find the pre-tax amount first, enter it on the expense line, and let QuickBooks apply the tax separately.
                  </p>

                  <p>
                    <strong>CSV Imports:</strong> Most accounting platforms accept CSV imports for bulk transaction entry. Add columns for tax rate and calculated pre-tax amounts using the spreadsheet formulas above. Run the calculations for every row at once, then import the clean file.
                  </p>
                </div>
              </section>

              {/* SECTION: Tax Compliance */}
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Compliance</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Tax Compliance & Record Keeping
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    The IRS and state tax authorities expect complete records of all transactions involving sales tax. The required retention period varies by state, but three to seven years covers most jurisdictions.
                  </p>
                  
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginTop: 8, marginBottom: 8 }}>Records You Need to Keep:</h3>
                  <ul style={{ listStyle: 'disc', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15 }}>
                    <li>Original receipts and invoices showing the total amounts paid</li>
                    <li>Documentation of the tax rates applied to each transaction</li>
                    <li>Bank and credit card statements confirming payments</li>
                    <li>General ledger entries showing how amounts were allocated between expense accounts and tax payable</li>
                  </ul>

                  <p>
                    <strong>Audit Preparation:</strong> During a sales tax audit, the auditor will ask how you calculated the tax on your transactions. Systematic use of the reverse sales tax calculator with documented rates gives you a clear answer, creating an audit trail that demonstrates accuracy and consistency.
                  </p>
                  <p>
                    <strong>Use Tax:</strong> Use tax applies when you purchase goods or services without paying sales tax and would have owed tax had you bought them in your home state. When calculating use tax, you need the pre-tax purchase price as the taxable base. If you only have the total paid, use the reverse calculator with the seller's rate to find the base price, then apply your home state's rate.
                  </p>
                </div>
              </section>

              {/* SECTION: Industry Edge Cases */}
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Edge Cases</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Industry-Specific Edge Cases
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    Understanding complex scenarios helps you maintain accurate books.
                  </p>
                  <ul style={{ listStyle: 'square', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
                    <li>
                      <strong>Coupons and Discounts:</strong> Sales tax applies to the price after discounts. If you used a $20 coupon on a $100 item with 8% tax, you paid <code>($100 - $20) x 1.08 = $86.40</code> total. The reverse calculation on $86.40 gives you the $80.00 discounted base price, which is correct.
                    </li>
                    <li>
                      <strong>Partial Refunds:</strong> When a customer returns one item from a multi-item purchase, you reverse calculate only the portion being refunded to ensure the refund reflects the accurate tax component.
                    </li>
                    <li>
                      <strong>Mixed Taxable and Non-Taxable Items:</strong> Some receipts include both taxable and exempt items (like unprepared groceries in many states). You must apply the reverse formula only to the taxable portion.
                    </li>
                    <li>
                      <strong>Digital Products and SaaS Subscriptions:</strong> Software subscriptions, streaming services, and digital downloads have different tax treatments depending on the state. Use the reverse calculator to find the pre-tax subscription cost for business expense deduction records.
                    </li>
                    <li>
                      <strong>Drop Shipping:</strong> You charge your customer the destination tax rate, while your supplier charges you tax at their location's rate. Reversing the tax on both sides is required to correctly compute your gross margin.
                    </li>
                  </ul>
                </div>
              </section>

              {/* SECTION: International Tax Rates */}
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Global</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  International Tax Rates & Reverse Calculations
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <p style={{ margin: 0 }}>
                    The reverse sales tax formula works identically for every consumption tax regardless of what it is called or where it applies.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    <div style={{ border: '1px solid var(--border)', padding: 16, borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16, marginBottom: 8 }}>🇬🇧 United Kingdom VAT</h4>
                      <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
                        The standard VAT rate is <strong>20%</strong>. Prices typically display inclusive of VAT. To find the pre-VAT price, divide the total by <code>1.20</code>.
                      </p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 16, borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16, marginBottom: 8 }}>🇪🇺 European Union VAT</h4>
                      <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
                        EU standard VAT rates range from 17% to 27%. Germany is 19% standard (7% reduced), France is 20% standard (5.5% reduced), Italy is 22%, Spain is 21%, and Sweden is 25%.
                      </p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 16, borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16, marginBottom: 8 }}>🇨🇦 Canada GST, HST, PST & QST</h4>
                      <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
                        Federal GST is 5%. HST provinces are Ontario (13%), New Brunswick, Nova Scotia, Newfoundland, and PEI (all 15%). British Columbia, Manitoba, and Saskatchewan charge GST and PST separately.
                      </p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 16, borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16, marginBottom: 8 }}>🇦🇺 Australia GST</h4>
                      <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
                        Australia applies a <strong>10%</strong> GST. Prices typically display GST-inclusive in retail settings. Divide the total by <code>1.10</code> to find the pre-GST price.
                      </p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 16, borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16, marginBottom: 8 }}>🇯🇵 Japan Consumption Tax</h4>
                      <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
                        Standard rate is 10%, with 8% reduced rate for food and non-alcoholic beverages. Prices are displayed tax-inclusive. Divide by <code>1.10</code> or <code>1.08</code>.
                      </p>
                    </div>

                    <div style={{ border: '1px solid var(--border)', padding: 16, borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16, marginBottom: 8 }}>🌎 Other Major Markets</h4>
                      <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
                        India has GST slabs of 5%, 12%, 18%, and 28%. Mexico IVA is 16%. Singapore GST is 9%. New Zealand GST is 15%.
                      </p>
                    </div>
                  </div>

                  <p>
                    <strong>Quebec sequential QST:</strong> Quebec charges 5% GST plus 9.975% QST. The effective combined rate is 14.975%, but the precise sequential calculation is handled correctly by our dedicated Canadian page.
                  </p>
                </div>
              </section>

              {/* SECTION: Who Uses This Calculator */}
              <section>
                <span className="section-label">Users</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Who Uses a Reverse Sales Tax Calculator?
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    This tool serves diverse financial and professional roles:
                  </p>
                  <ul style={{ listStyle: 'disc', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
                    <li><strong>Accountants and Bookkeepers:</strong> Splitting tax-inclusive receipts, vendor bills, and employee expense reports before entry into ledger books.</li>
                    <li><strong>Small Business Owners:</strong> Reconciling sales reports, ensuring expenses are recorded at the correct pre-tax amounts, and tracking profit accurately.</li>
                    <li><strong>E-Commerce Sellers:</strong> Verifying sales tax collection system accuracy, processing refunds, and reconciling facilitator deposits (like Amazon or eBay).</li>
                    <li><strong>Freelancers:</strong> Backing out tax amounts from software subscriptions, coworking, and hardware purchases for deductible expense reporting.</li>
                    <li><strong>Everyday Shoppers:</strong> Verifying how much of their purchase total went toward retail sales taxes versus the product base cost.</li>
                  </ul>
                </div>
              </section>

              {/* SECTION: Automation */}
              <section>
                <span className="section-label">Automation</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  How to Automate Reverse Tax Calculations
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <p style={{ margin: 0 }}>
                    Manual calculations work fine for occasional use, but high-volume operations benefit from developer-friendly automation:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
                    
                    {/* JS Code Snippet */}
                    <div style={{ border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)', background: 'rgba(0,0,0,0.3)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 13, fontFamily: 'var(--font-mono)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>JavaScript Implementation</h4>
                      <pre style={{ margin: 0, padding: 14, background: '#070709', borderRadius: 'var(--radius-sm)', fontSize: 12, overflowX: 'auto', border: '1px solid var(--border)', lineHeight: 1.5 }}>
<code style={{ color: 'var(--text-primary)' }}>{`function reverseTax(total, rate) {
  const original = total / (1 + rate / 100);
  const tax = total - original;
  return { 
    original: original.toFixed(2), 
    tax: tax.toFixed(2) 
  };
}`}</code>
                      </pre>
                    </div>

                    {/* Python Code Snippet */}
                    <div style={{ border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)', background: 'rgba(0,0,0,0.3)' }}>
                      <h4 style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 13, fontFamily: 'var(--font-mono)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Python Implementation</h4>
                      <pre style={{ margin: 0, padding: 14, background: '#070709', borderRadius: 'var(--radius-sm)', fontSize: 12, overflowX: 'auto', border: '1px solid var(--border)', lineHeight: 1.5 }}>
<code style={{ color: 'var(--text-primary)' }}>{`def reverse_tax(total, rate):
    original = total / (1 + rate / 100)
    tax = total - original
    return (
        round(original, 2), 
        round(tax, 2)
    )`}</code>
                      </pre>
                    </div>

                  </div>

                  <p>
                    <strong>Power Automate and Zapier:</strong> Cloud-based platforms can trigger reverse tax actions whenever a receipt upload occurs, extracting the data, executing the formula, and recording pre-tax amounts into QuickBooks automatically.
                  </p>
                </div>
              </section>

              {/* SECTION: Common Mistakes */}
              <section>
                <span className="section-label" style={{ background: '#ef4444', color: '#fff', borderColor: '#ef4444' }}>Mistakes</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Common Mistakes When Backing Out Sales Tax
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    Avoid these calculation pitfalls in your accounting books:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <li style={{ borderLeft: '2px solid #ef4444', paddingLeft: 12 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Subtracting Instead of Dividing:</strong> Subtracting 8% from $108.00 lands on $99.36, whereas the correct answer is $100.00. This error compounding over time creates misallocated balances. Always divide.
                    </li>
                    <li style={{ borderLeft: '2px solid #ef4444', paddingLeft: 12 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Using State Rate Instead of Combined Rate:</strong> Recording transactions at California's 7.25% state rate when the combined local rate paid was 9.5% results in underreporting your tax payable liabilities.
                    </li>
                    <li style={{ borderLeft: '2px solid #ef4444', paddingLeft: 12 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Applying Tax to Non-Taxable Items:</strong> Mixing taxable goods with tax-exempt items (e.g. services, groceries) on the same invoice and applying the tax percentage to the full total.
                    </li>
                    <li style={{ borderLeft: '2px solid #ef4444', paddingLeft: 12 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Not Accounting for Rate Changes:</strong> Tax rates change occasionally throughout the year. Run historical transactions against the rate active on the exact invoice date.
                    </li>
                  </ul>
                </div>
              </section>

              {/* SECTION: Comparison Table */}
              <section>
                <span className="section-label">Comparison</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Manual Calculation vs. This Calculator
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    Here is how backing out tax manually compares to using our pre-tax price finder tool:
                  </p>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table" style={{ minWidth: 500 }}>
                      <thead>
                        <tr>
                          <th>Feature</th>
                          <th>Manual Calculation</th>
                          <th>This Calculator</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Speed</strong></td>
                          <td>20–30 seconds per receipt</td>
                          <td>Under 2 seconds (Instant)</td>
                        </tr>
                        <tr>
                          <td><strong>Accuracy</strong></td>
                          <td>High human-error risk</td>
                          <td>Perfect decimal precision</td>
                        </tr>
                        <tr>
                          <td><strong>Rate Lookup</strong></td>
                          <td>Requires separate state lookup</td>
                          <td>Auto-loaded 50 state dropdown</td>
                        </tr>
                        <tr>
                          <td><strong>Documentation</strong></td>
                          <td>No automatic record created</td>
                          <td>Full, copyable result breakdown</td>
                        </tr>
                        <tr>
                          <td><strong>Formula Errors</strong></td>
                          <td>High risk of subtracting mistake</td>
                          <td>Guaranteed division formula</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* SECTION: Glossary */}
              <section>
                <span className="section-label">Glossary</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Glossary of Reverse Tax Terms
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, fontSize: 14 }}>
                  <div style={{ border: '1px solid var(--border)', padding: 18, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>Pre-tax price:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>The original price of a good or service before tax is added. Also called subtotal or net price.</p>
                  </div>
                  <div style={{ border: '1px solid var(--border)', padding: 18, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>Post-tax price:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>The final price paid including sales tax. Also called total or gross price.</p>
                  </div>
                  <div style={{ border: '1px solid var(--border)', padding: 18, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>Reverse sales tax:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>Working backwards from a total to find the pre-tax base. Also called backing out tax.</p>
                  </div>
                  <div style={{ border: '1px solid var(--border)', padding: 18, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>Tax-inclusive price:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>A price that already displays with tax built in (common in Europe, UK, Canada HST).</p>
                  </div>
                  <div style={{ border: '1px solid var(--border)', padding: 18, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>Combined tax rate:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>The total rate applied to a transaction, combining state, county, city, and district rates.</p>
                  </div>
                  <div style={{ border: '1px solid var(--border)', padding: 18, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.01)' }}>
                    <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>Economic nexus:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>Tax liability threshold for out-of-state e-commerce sellers based on gross revenue or sales quantity.</p>
                  </div>
                </div>
              </section>

              {/* SECTION: Quick Reference US Locations */}
              <section>
                <span className="section-label">Locations</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Sales Tax Rates for the Most-Searched US Locations
                </h2>
                <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p>
                    These are the combined rates for the cities and counties that generate the most reverse tax searches. Each rate reflects the current combined total of state, county, city, and applicable district taxes as of 2026:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)' }}>
                      <strong style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: 14, letterSpacing: '0.05em' }}>California</strong>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <li>Los Angeles: 10.25%</li>
                        <li>San Francisco: 8.625%</li>
                        <li>San Diego: 7.75%</li>
                        <li>Sacramento: 8.75%</li>
                        <li>Oakland: 10.25%</li>
                      </ul>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)' }}>
                      <strong style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: 14, letterSpacing: '0.05em' }}>Texas</strong>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <li>Houston: 8.25%</li>
                        <li>Dallas: 8.25%</li>
                        <li>San Antonio: 8.25%</li>
                        <li>Austin: 8.25%</li>
                        <li>Fort Worth: 8.25%</li>
                      </ul>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: 20, borderRadius: 'var(--radius)' }}>
                      <strong style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: 14, letterSpacing: '0.05em' }}>New York & Florida</strong>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <li>New York City: 8.875%</li>
                        <li>Buffalo: 8%</li>
                        <li>Miami: 7%</li>
                        <li>Orlando: 6.5%</li>
                        <li>Tampa: 7.5%</li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    For any location not listed here, look up the exact combined rate on your state's Department of Revenue website and enter it into the custom rate field of our calculator.
                  </p>
                </div>
              </section>

        </div>
      </div>

      {/* ── How It Works (Step Cards) ─────────────────────────── */}
      <div style={{ background: 'var(--card-bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '80px 0' }}>
        <div className="container-main">
          <HowItWorks />
        </div>
      </div>

      {/* ── State Rates Table ─────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <StateTable />
      </div>

      <div className="container-main" style={{ marginTop: 48 }}>
        <AdSlot slot="in-article-2" size="in-article" />
      </div>

      {/* ── FAQAccordion Section ─────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <FAQSection />
      </div>

      {/* ── References & Sources ──────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80, marginBottom: 80 }}>
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


      {/* ── Related Tools ─────────────────────────────────────── */}
      <div style={{ background: 'var(--card-bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '64px 0' }}>
        <div className="container-main">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label">Related Tools</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0' }}>
              More Free Tax Calculators
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
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
