import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import VATCalculator from './VATCalculator';

export const metadata: Metadata = {
  title: 'Reverse VAT Calculator — Remove VAT from Any Price (UK, EU, AU)',
  description: 'Free reverse VAT calculator. Remove VAT from prices for the UK (20%), EU, Australia, and more. Calculate ex-VAT prices instantly.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/vat-calculator' },
};

const SITE_URL = 'https://salestaxreversecalculator.com';

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reverse VAT Calculator",
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
        "text": "For reverse calculation purposes the formula is identical: Net Price = Gross Price divided by (1 + rate/100). The difference is structural — VAT is collected at each stage of the supply chain, while US sales tax is only collected at the final point of sale. The reverse math does not change."
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
          <p style={{ fontSize: 17, color: '#6ee7b7', maxWidth: 540, margin: '0 auto' }}>
            Remove VAT from any price. Supports UK, EU, Australia, New Zealand, India, and custom rates.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot="vat-leaderboard" size="leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 32, marginBottom: 80 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>VAT Calculator</span>
        </nav>

        <VATCalculator />

        <div style={{ marginTop: 48, maxWidth: 720 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>What is VAT?</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 16, marginBottom: 16 }}>
            VAT (Value Added Tax) is a consumption tax applied to goods and services in the UK, European Union, Australia, 
            New Zealand, and over 160 other countries worldwide. Unlike US sales tax, VAT is included in the displayed price 
            rather than added at checkout.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 16 }}>
            To find the ex-VAT (pre-tax) price, use the same reverse formula: <strong>Ex-VAT Price = Inc-VAT Price ÷ (1 + VAT Rate / 100)</strong>.
            For example, a UK price of £120 with 20% VAT: £120 ÷ 1.20 = £100.00 ex-VAT, and £20.00 VAT paid.
          </p>
        </div>

        <div style={{ marginTop: 32 }}>
          <AdSlot slot="vat-rectangle" size="rectangle" />
        </div>
      </div>
    </main>
  );
}
