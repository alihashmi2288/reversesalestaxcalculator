import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import LinkifiedText from '@/components/LinkifiedText';
import CanadaCalculator from './CanadaCalculator';

export const metadata: Metadata = {
  title: 'Canada Reverse Tax Calculator: GST, HST & PST (2026)',
  description: 'Free Canada reverse sales tax calculator. Remove GST, HST, PST, and QST from any price across all 13 provinces and territories instantly.',
  alternates: { 
    canonical: 'https://salestaxreversecalculator.com/canada',
    languages: {
      'x-default': 'https://salestaxreversecalculator.com/',
      'en-US': 'https://salestaxreversecalculator.com/',
      'en-CA': 'https://salestaxreversecalculator.com/canada',
      'en-GB': 'https://salestaxreversecalculator.com/vat-calculator',
    },
  },
  openGraph: {
    title: 'Canada Reverse Tax Calculator: GST, HST & PST (2026)',
    description: 'Free Canada reverse sales tax calculator. Remove GST, HST, PST, and QST from any price across all 13 provinces and territories instantly.',
    url: 'https://salestaxreversecalculator.com/canada',
    images: [{ url: '/images/canada-sales-tax-rates-map-2026.jpg', width: 1200, height: 675, alt: 'Canada Reverse Tax Map 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada Reverse Tax Calculator: GST, HST & PST (2026)',
    description: 'Free Canada reverse sales tax calculator. Remove GST, HST, PST, and QST from any price across all 13 provinces and territories instantly.',
  },
};

const SITE_URL = 'https://salestaxreversecalculator.com';

const imageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  name: 'Canada Provincial Sales Tax Rates 2026 Map',
  contentUrl: `${SITE_URL}/images/canada-sales-tax-rates-map-2026.jpg`,
  description: 'Infographic map illustrating provincial GST, HST, PST, and QST tax rates across all Canadian provinces and territories in 2026.',
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Canada Reverse Sales Tax Calculator: GST, HST, PST, QST",
  "url": `${SITE_URL}/canada`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Free Canadian reverse sales tax calculator. Remove GST, HST, PST, or Quebec QST from any price to find the original pre-tax amount. Covers all provinces including Ontario, Quebec, British Columbia, and Alberta.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CAD"
  },
  "featureList": [
    "Federal GST reverse calculation (5%)",
    "Ontario HST reverse calculation (13%)",
    "Nova Scotia, New Brunswick, Newfoundland, PEI HST (15%)",
    "Quebec GST + QST reverse calculation (14.975% combined)",
    "British Columbia GST + PST reverse calculation (12%)",
    "Alberta GST-only reverse calculation (5%)",
    "Saskatchewan GST + PST (11%)",
    "Manitoba GST + PST (12%)"
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
      "name": "How do I calculate the price before HST in Ontario?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ontario's HST rate is 13%. Divide the HST-inclusive total by 1.13 to find the pre-tax price. Example: $226.00 / 1.13 = $200.00. The HST paid was $26.00."
      }
    },
    {
      "@type": "Question",
      "name": "How do I remove GST from a price in Alberta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alberta charges only the federal 5% GST with no provincial sales tax. Divide your total by 1.05. Example: $105.00 / 1.05 = $100.00 pre-tax price."
      }
    },
    {
      "@type": "Question",
      "name": "What is the combined tax rate in Quebec?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quebec charges the 5% federal GST plus the 9.975% QST (Quebec Sales Tax). The effective combined rate is approximately 14.975%. In Quebec, QST is calculated on the GST-inclusive price, making the precise combined multiplier 1.05 x 1.09975 = 1.14975."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between GST, HST, and PST in Canada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GST (Goods and Services Tax) is the federal Canadian tax at 5%, applicable in all provinces. HST (Harmonized Sales Tax) combines the federal GST with a provincial component into a single rate, used in Ontario (13%), New Brunswick (15%), Nova Scotia (15%), Newfoundland (15%), and PEI (15%). PST (Provincial Sales Tax) is a separate provincial tax charged alongside GST in British Columbia (7%), Saskatchewan (6%), and Manitoba (7%)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I reverse calculate GST/HST for an input tax credit claim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To claim an input tax credit (ITC) from the Canada Revenue Agency, you need the GST/HST component of a purchase. Use the reverse formula to find the pre-tax price, then subtract it from the total to get the exact tax paid. Example for Ontario HST: Total $565.00 / 1.13 = $500.00 pre-tax. HST component = $65.00. This $65.00 is your claimable ITC."
      }
    },
    {
      "@type": "Question",
      "name": "Which Canadian provinces have the highest combined sales tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Atlantic provinces have the highest combined rates. Nova Scotia, New Brunswick, Newfoundland and Labrador, and Prince Edward Island all have a 15% HST. Ontario's 13% HST is mid-range. Alberta remains the lowest with only the 5% federal GST and no provincial sales tax."
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
      "name": "Canada GST/HST/PST Calculator",
      "item": `${SITE_URL}/canada`
    }
  ]
};

export default function CanadaPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />
      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>🇨🇦</span> Provincial & Federal Rates (2026)
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4.5vw,44px)', fontWeight: 800, color: '#ffffff', marginBottom: 14, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Canada Reverse Tax Calculator
          </h1>
          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Remove GST, HST, PST, or QST from any Canadian price across all 13 provinces and territories.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 32, marginBottom: 80 }}>
        <nav style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ color: 'var(--hairline-strong)' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>Canada Calculator</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }} className="calc-layout">
          <div>
            <CanadaCalculator />
            <div style={{ marginTop: 24 }}>
              <AdSlot slot="canada-rectangle" size="rectangle" />
            </div>
          </div>
          <div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontWeight: 800, fontSize: 16, color: 'var(--ink)', marginBottom: 4, letterSpacing: '-0.01em' }}>
                🇨🇦 Canadian Tax Rates
              </h3>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
                2026 combined provincial & federal rates
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { label: 'Federal GST', value: '5%', note: 'All provinces' },
                  { label: 'Ontario HST', value: '13%', note: 'ON' },
                  { label: 'Maritime HST', value: '15%', note: 'NB, NL, NS, PE' },
                  { label: 'BC GST+PST', value: '12%', note: 'BC' },
                  { label: 'Quebec GST+QST', value: '14.975%', note: 'QC' },
                  { label: 'MB GST+PST', value: '12%', note: 'MB' },
                  { label: 'SK GST+PST', value: '11%', note: 'SK' },
                  { label: 'AB/NT/NU/YT', value: '5%', note: 'GST only' },
                ].map(({ label, value, note }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--hairline)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{label}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{note}</div>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 15, fontFamily: 'monospace' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- SEO Content Section --- */}
        <div style={{ marginTop: 64, maxWidth: 880, margin: '64px auto 0' }}>
          <div className="seo-content" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            
            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Understanding Canadian Sales Tax (GST, HST, PST, QST)
              </h2>

              {/* Canada Provincial Tax Map Infographic */}
              <div style={{ margin: '20px 0 28px', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--hairline)', background: 'var(--canvas)', boxShadow: 'var(--shadow-card)' }}>
                <Image
                  src="/images/canada-sales-tax-rates-map-2026.jpg"
                  alt="Canada provincial sales tax rates 2026 map infographic showing GST, HST, PST, and QST by province"
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
                <div style={{ padding: '12px 20px', background: 'var(--canvas-soft)', borderTop: '1px solid var(--hairline)', fontSize: 13, color: 'var(--muted)' }}>
                  Figure 3: 2026 Canada provincial sales tax structure map across all 10 provinces and 3 territories.
                </div>
              </div>

              <div style={{ color: 'var(--body)', fontSize: 16, lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>
                  <LinkifiedText text="Unlike the US state sales tax system (which is collected only at the final point of sale), Canada operates on a Value Added Tax (VAT) model. The base federal tax is the GST (Goods and Services Tax) at 5%. Most provinces combine this with a provincial tax to create the HST (Harmonized Sales Tax) at 13% to 15%. Other provinces charge GST and a separate PST (Provincial Sales Tax), while Quebec charges GST and QST (Quebec Sales Tax)." currentState="Canada" />
                </p>
                <p>
                  <LinkifiedText text="If you're a business owner or consumer trying to extract the exact pre-tax cost from a receipt, you cannot simply subtract the tax percentage from the final total. You must use the reverse tax formula. Our calculator does this instantly for every province." currentState="Canada" />
                </p>
                <p>
                  When you purchase items in Canada, these taxes are automatically added at the register. If you are looking at a final receipt and need to know the original price before tax was applied, our Canada Reverse Sales Tax Calculator allows you to work backwards instantly, no matter which province&apos;s tax rules apply to your purchase.
                </p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 24, letterSpacing: '-0.02em' }}>
                When to Use the Canadian Reverse Tax Calculator
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>Claiming Input Tax Credits (ITCs)</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7 }}>
                    <LinkifiedText text="Canadian businesses can claim Input Tax Credits (ITCs) to recover the GST/HST paid on eligible business expenses. To claim an ITC, you must know the exact amount of GST/HST paid. If your receipt only shows the total, our calculator extracts the precise tax amount required for your CRA return." currentState="Canada" />
                  </p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>Cross-Border Budgeting</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7 }}>
                    <LinkifiedText text="If your business operates nationally, reconciling expenses from Ontario (13% HST), British Columbia (5% GST + 7% PST), and Alberta (5% GST) is an accounting headache. Using our province dropdown lets you standardize all inter-provincial receipts back to their base cost instantly." currentState="Canada" />
                  </p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>Verifying Handwritten Receipts</h3>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7 }}>
                    Sometimes receipts from smaller vendors, contractors, or handwritten invoices only show a final total. Our tool helps you instantly verify that the correct tax rate was applied according to your specific province&apos;s HST, PST, or QST regulations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 24, letterSpacing: '-0.02em' }}>
                Frequently Asked Questions: Canada Taxes
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  {
                    question: 'How do I calculate a price before 13% HST in Ontario?',
                    answer: 'To manually find the pre-tax price in Ontario, you divide the final total by 1.13. For example, if you paid $113.00 total, you divide by 1.13 to get the original pre-tax price of $100.00. Our calculator does this math for you automatically.'
                  },
                  {
                    question: 'Are groceries taxed in Canada?',
                    answer: 'Basic groceries (like milk, bread, and fresh vegetables) are generally "zero-rated" in Canada, meaning they are taxed at 0%. However, snack foods, hot prepared meals, and alcohol are fully taxable under standard GST/HST/PST/QST rules.'
                  },
                  {
                    question: 'Does the calculator work for Quebec\'s QST?',
                    answer: 'Yes! Quebec charges a 5% federal GST and a 9.975% provincial QST, bringing the combined rate to 14.975%. Our calculator natively supports Quebec\'s unique tax structure.'
                  },
                  {
                    question: 'Why do Alberta and the Territories only charge 5%?',
                    answer: 'Alberta, the Northwest Territories, Nunavut, and Yukon do not have a provincial sales tax (PST). Residents and businesses in these areas only pay the federal 5% Goods and Services Tax (GST) on taxable items.'
                  }
                ].map((faq, idx) => (
                  <details key={idx} className="faq-item">
                    <summary style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {faq.question}
                      <span style={{ color: 'var(--primary)', fontSize: 20, fontWeight: 800 }}>+</span>
                    </summary>
                    <p style={{ marginTop: 14, fontSize: 14, color: 'var(--body)', lineHeight: 1.7, paddingTop: 14, borderTop: '1px solid var(--hairline)' }}>
                      <LinkifiedText text={faq.answer} currentState="Canada" />
                    </p>
                  </details>
                ))}
              </div>
            </section>

          </div>
        </div>

        <style>{`@media(max-width:900px){.calc-layout{grid-template-columns:1fr!important}}`}</style>
      </div>
    </main>
  );
}
