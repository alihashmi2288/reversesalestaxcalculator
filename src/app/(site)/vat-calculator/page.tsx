import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import VATCalculator from './VATCalculator';
import { VAT_COUNTRY_RATES } from '@/data/vatTaxRates';

export const metadata: Metadata = {
  title: 'Reverse VAT Calculator: Remove VAT (UK, EU, AU)',
  description: 'Free reverse VAT calculator. Remove VAT from gross prices for the UK (20%), EU member states, and Australia. Calculate net prices instantly.',
  alternates: { 
    canonical: 'https://salestaxreversecalculator.com/vat-calculator',
    languages: {
      'x-default': 'https://salestaxreversecalculator.com/',
      'en-US': 'https://salestaxreversecalculator.com/',
      'en-CA': 'https://salestaxreversecalculator.com/canada',
      'en-GB': 'https://salestaxreversecalculator.com/vat-calculator',
    },
  },
  openGraph: {
    title: 'Reverse VAT Calculator: Remove VAT (UK, EU, AU)',
    description: 'Free reverse VAT calculator. Remove VAT from gross prices for the UK (20%), EU member states, and Australia. Calculate net prices instantly.',
    url: 'https://salestaxreversecalculator.com/vat-calculator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Reverse VAT Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse VAT Calculator: Remove VAT (UK, EU, AU)',
    description: 'Free reverse VAT calculator. Remove VAT from gross prices for the UK (20%), EU member states, and Australia. Calculate net prices instantly.',
  },
};

const SITE_URL = 'https://salestaxreversecalculator.com';

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reverse VAT Calculator: Remove VAT from Any Price",
  "url": `${SITE_URL}/vat-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Free reverse VAT calculator for UK, EU, and Australia. Enter any VAT-inclusive price and find the ex-VAT net amount instantly. Supports UK 20%, EU standard rates, and Australian GST 10%.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "UK VAT reverse calculation (20% standard rate)",
    "EU VAT removal for Germany, France, Italy, Spain, and all EU member states",
    "Australia GST reverse calculation (10%)",
    "Custom VAT rate input",
    "No signup required"
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
      "name": "How do I remove VAT from a price in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The UK standard VAT rate is 20%. To remove VAT: divide the VAT-inclusive price by 1.20. Example: £120.00 / 1.20 = £100.00 ex-VAT price. The VAT amount is £20.00."
      }
    },
    {
      "@type": "Question",
      "name": "What is the reverse VAT formula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The reverse VAT formula is identical to reverse sales tax: Net Price = Gross Price divided by (1 + VAT Rate / 100). For UK 20% VAT: Net = Gross / 1.20. For Germany 19%: Net = Gross / 1.19."
      }
    },
    {
      "@type": "Question",
      "name": "What are the standard VAT rates in the EU?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard EU VAT rates vary by country: Germany 19%, France 20%, Italy 22%, Spain 21%, Netherlands 21%, Sweden 25%, Poland 23%, and Belgium 21%. Most EU countries also have reduced rates of 5-10% for essentials like food and books."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate the ex-VAT price from a gross amount?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide the gross VAT-inclusive amount by 1 plus the decimal VAT rate. For 20% VAT: divide by 1.20. For 19% VAT: divide by 1.19. For 10% VAT (Australia GST): divide by 1.10. The result is the net ex-VAT price."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between VAT and US sales tax for reverse calculations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For reverse calculation purposes the formula is identical: Net Price = Gross Price divided by (1 + rate/100). The difference is structural: VAT is collected at each stage of the supply chain, while US sales tax is only collected at the final point of sale. The reverse math does not change."
      }
    },
    {
      "@type": "Question",
      "name": "How do I remove Australian GST from a price?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Australia's GST rate is 10%. Divide the GST-inclusive total by 1.10 to find the pre-GST price. Example: $110.00 / 1.10 = $100.00. The GST component is $10.00."
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
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "VAT Calculator",
      "item": `${SITE_URL}/vat-calculator`
    }
  ]
};

export default function VATPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>🇪🇺</span> Global VAT & GST Standards (2026)
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4.5vw,44px)', fontWeight: 800, color: '#ffffff', marginBottom: 14, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Reverse VAT Calculator
          </h1>
          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
            Remove VAT from any gross price. Supports UK 20%, EU member states, Australia GST, and custom international rates.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 32, marginBottom: 80 }}>
        <nav style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ color: 'var(--hairline-strong)' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>VAT Calculator</span>
        </nav>

        <VATCalculator />

        {/* In-depth content for SEO authority and E-E-A-T */}
        <div style={{ marginTop: 64, maxWidth: 880, margin: '64px auto 0', display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          <div className="card" style={{ borderLeft: '4px solid var(--primary)', padding: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>
              What is Reverse VAT and How Does It Work?
            </h2>
            <p style={{ color: 'var(--body)', lineHeight: 1.75, fontSize: 15, marginBottom: 14 }}>
              VAT (Value Added Tax) is a consumption tax assessed on goods and services in the United Kingdom, the European Union, Australia, New Zealand, and over 160 countries globally. In standard retail environments throughout Europe and Australasia, prices are displayed <strong>inclusive of VAT (gross price)</strong>.
            </p>
            <p style={{ color: 'var(--body)', lineHeight: 1.75, fontSize: 15, marginBottom: 16 }}>
              When businesses, freelancers, or accountants need to claim input tax credits or reconcile invoices, they must calculate the <strong>net (ex-VAT) amount</strong> and isolate the tax component.
            </p>
            <div className="formula-box" style={{ margin: '16px 0 8px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)', marginBottom: 8 }}>The Reverse VAT Formula</div>
              <div className="formula-text">Net (Ex-VAT) Price = Gross Price ÷ (1 + VAT Rate / 100)</div>
              <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink)' }}>VAT Amount Paid = Gross Price − Net Price</div>
            </div>
          </div>

          {/* International VAT Rates Table */}
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Global Standard VAT & GST Rates by Country (2026)
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              Click on any country to open its dedicated reverse VAT calculator pre-configured with local currency and standard rates:
            </p>
            <div style={{ overflowX: 'auto', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                    <th style={{ padding: '12px 18px', color: 'var(--ink)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Country</th>
                    <th style={{ padding: '12px 18px', color: 'var(--ink)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tax Type</th>
                    <th style={{ padding: '12px 18px', color: 'var(--ink)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Standard Rate</th>
                    <th style={{ padding: '12px 18px', color: 'var(--ink)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Calculator</th>
                  </tr>
                </thead>
                <tbody>
                  {VAT_COUNTRY_RATES.map((c, idx) => (
                    <tr key={c.slug} style={{ borderBottom: idx === VAT_COUNTRY_RATES.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                      <td style={{ padding: '12px 18px', color: 'var(--ink)', fontWeight: 600, fontSize: 14 }}>{c.name}</td>
                      <td style={{ padding: '12px 18px', color: 'var(--body)', fontSize: 13, fontFamily: 'monospace' }}>{c.type}</td>
                      <td style={{ padding: '12px 18px', color: 'var(--primary)', fontWeight: 800, fontFamily: 'monospace', fontSize: 14 }}>{c.rate}%</td>
                      <td style={{ padding: '12px 18px' }}>
                        <Link href={`/vat-calculator/${c.slug}`} style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                          Open {c.name} →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Scenarios */}
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Common Reverse VAT Scenarios
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>💼 Expense Claim Reconciliations</h3>
                <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65, margin: 0 }}>
                  Employees submit hotel or meal receipts quoting the gross charge. Corporate accountants use reverse VAT to separate deductible tax from net business operating costs.
                </p>
              </div>
              <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>🇪🇺 B2B Cross-Border Reverse Charge</h3>
                <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65, margin: 0 }}>
                  When EU businesses sell to VAT-registered buyers in other member states, goods are invoiced net of VAT under the EU Reverse Charge mechanism.
                </p>
              </div>
              <div style={{ background: 'var(--canvas-soft)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>🛒 E-Commerce Payout Audits</h3>
                <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65, margin: 0 }}>
                  Online merchants receiving consolidated gross disbursements from payment gateways calculate net revenue to ensure proper quarterly VAT return filings.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <AdSlot slot="vat-rectangle" size="rectangle" />
        </div>
      </div>
    </main>
  );
}
