import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import VATCalculator from './VATCalculator';
import { VAT_COUNTRY_RATES } from '@/data/vatTaxRates';

export const metadata: Metadata = {
  title: 'Reverse VAT Calculator: Remove VAT from Any Price (UK, EU, AU)',
  description: 'Free reverse VAT calculator. Remove VAT from prices for the UK (20%), EU, Australia, and more. Calculate ex-VAT prices instantly.',
  alternates: { 
    canonical: 'https://salestaxreversecalculator.com/vat-calculator',
    languages: {
      'en-US': 'https://salestaxreversecalculator.com',
      'en-CA': 'https://salestaxreversecalculator.com/canada',
      'en-GB': 'https://salestaxreversecalculator.com/vat-calculator',
    },
  },
  openGraph: {
    title: 'Reverse VAT Calculator: Remove VAT from Any Price (UK, EU, AU)',
    description: 'Free reverse VAT calculator. Remove VAT from prices for the UK (20%), EU, Australia, and more. Calculate ex-VAT prices instantly.',
    url: 'https://salestaxreversecalculator.com/vat-calculator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Reverse VAT Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse VAT Calculator: Remove VAT from Any Price (UK, EU, AU)',
    description: 'Free reverse VAT calculator. Remove VAT from prices for the UK (20%), EU, Australia, and more. Calculate ex-VAT prices instantly.',
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
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #065f46)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🇪🇺</div>
          <h1 style={{ fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
            Reverse VAT Calculator
          </h1>
          <p style={{ fontSize: 17, color: '#6ee7b7', maxWidth: 620, margin: '0 auto' }}>
            Remove VAT from any price. Supports UK 20%, EU member states, Australia GST, and custom international rates.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 32, marginBottom: 80 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>VAT Calculator</span>
        </nav>

        <VATCalculator />

        {/* In-depth content for SEO authority and E-E-A-T */}
        <div style={{ marginTop: 64, maxWidth: 860, margin: '64px auto 0', display: 'flex', flexDirection: 'column', gap: 40 }}>
          
          <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase' }}>
              What is Reverse VAT and How Does It Work?
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 16, marginBottom: 12 }}>
              VAT (Value Added Tax) is a consumption tax assessed on goods and services in the United Kingdom, the European Union, Australia, New Zealand, and over 160 countries globally. In standard retail environments throughout Europe and Australasia, prices are displayed <strong>inclusive of VAT (gross price)</strong>.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 16, marginBottom: 12 }}>
              When businesses, freelancers, or accountants need to claim input tax credits or reconcile invoices, they must calculate the <strong>net (ex-VAT) amount</strong> and isolate the tax component.
            </p>
            <div className="formula-box" style={{ margin: '20px 0' }}>
              <div style={{ fontSize: 12, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>The Reverse VAT Formula</div>
              <div className="formula-text">Net (Ex-VAT) Price = Gross Price ÷ (1 + VAT Rate / 100)</div>
              <div style={{ marginTop: 12, fontSize: 14, opacity: 0.85 }}>VAT Amount Paid = Gross Price − Net Price</div>
            </div>
          </div>

          {/* International VAT Rates Table */}
          <div className="card">
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase' }}>
              Global Standard VAT & GST Rates by Country (2026)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              Click on any country to open its dedicated reverse VAT calculator pre-configured with local currency and standard rates:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#09090b', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Country</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Tax Type</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Standard Rate</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Calculator</th>
                  </tr>
                </thead>
                <tbody>
                  {VAT_COUNTRY_RATES.map((c, idx) => (
                    <tr key={c.slug} style={{ borderBottom: idx === VAT_COUNTRY_RATES.length - 1 ? 'none' : '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 600 }}>{c.name}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{c.type}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{c.rate}%</td>
                      <td style={{ padding: '12px 16px' }}>
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
          <div className="card">
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase' }}>
              Common Reverse VAT Scenarios
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: 18, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>💼 Expense Claim Reconciliations</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  Employees submit hotel or meal receipts quoting the gross charge. Corporate accountants use reverse VAT to separate deductible tax from net business operating costs.
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: 18, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>🇪🇺 B2B Cross-Border Reverse Charge</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  When EU businesses sell to VAT-registered buyers in other member states, goods are invoiced net of VAT under the EU Reverse Charge mechanism.
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: 18, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>🛒 E-Commerce Payout Audits</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
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
