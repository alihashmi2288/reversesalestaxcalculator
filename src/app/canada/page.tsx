import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import LinkifiedText from '@/components/LinkifiedText';
import CanadaCalculator from './CanadaCalculator';

export const metadata: Metadata = {
  title: 'Canada Reverse Tax Calculator — GST, HST, PST by Province',
  description: 'Free Canada reverse sales tax calculator. Remove GST, HST, or PST from any price. Supports all 13 provinces and territories with current 2026 rates.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/canada' },
  openGraph: {
    images: [{ url: 'https://salestaxreversecalculator.com/api/og?title=Canada%20Reverse%20Tax%20Calculator&location=Canada' }],
  },
};

const SITE_URL = 'https://salestaxreversecalculator.com';

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Canada Reverse Sales Tax Calculator — GST, HST, PST, QST",
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
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #7c3aed)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🇨🇦</div>
          <h1 style={{ fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
            Canada Reverse Tax Calculator
          </h1>
          <p style={{ fontSize: 17, color: '#c4b5fd', maxWidth: 540, margin: '0 auto' }}>
            Remove GST, HST, or PST from any Canadian price. Supports all provinces and territories.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot="canada-leaderboard" size="leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 32, marginBottom: 80 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Canada Calculator</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }} className="calc-layout">
          <div>
            <CanadaCalculator />
            <div style={{ marginTop: 24 }}>
              <AdSlot slot="canada-rectangle" size="rectangle" />
            </div>
          </div>
          <div>
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 16 }}>🇨🇦 Canadian Tax Rates</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{note}</div>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 15 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- SEO Content Section --- */}
        <div style={{ marginTop: 64, maxWidth: 860, margin: '64px auto 0' }}>
          <div className="seo-content" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            
            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
                Understanding Canadian Sales Tax (GST, HST, PST, QST)
              </h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>
                  <LinkifiedText text="Unlike the US state sales tax system (which is collected only at the final point of sale), Canada operates on a Value Added Tax (VAT) model. The base federal tax is the GST (Goods and Services Tax) at 5%. Most provinces combine this with a provincial tax to create the HST (Harmonized Sales Tax) at 13% to 15%. Other provinces charge GST and a separate PST (Provincial Sales Tax), while Quebec charges GST and QST (Quebec Sales Tax)." currentState="Canada" />
                </p>
                <p>
                  <LinkifiedText text="If you're a business owner or consumer trying to extract the exact pre-tax cost from a receipt, you cannot simply subtract the tax percentage from the final total. You must use the reverse tax formula. Our calculator does this instantly for every province." currentState="Canada" />
                </p>
                <p>
                  When you purchase items in Canada, these taxes are automatically added at the register. If you are looking at a final receipt and need to know the original price before tax was applied, our Canada Reverse Sales Tax Calculator allows you to work backwards instantly, no matter which province's tax rules apply to your purchase.
                </p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                When to Use the Canadian Reverse Tax Calculator
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Claiming Input Tax Credits (ITCs)</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    <LinkifiedText text="Canadian businesses can claim Input Tax Credits (ITCs) to recover the GST/HST paid on eligible business expenses. To claim an ITC, you must know the exact amount of GST/HST paid. If your receipt only shows the total, our calculator extracts the precise tax amount required for your CRA return." currentState="Canada" />
                  </p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Cross-Border Budgeting</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    <LinkifiedText text="If your business operates nationally, reconciling expenses from Ontario (13% HST), British Columbia (5% GST + 7% PST), and Alberta (5% GST) is an accounting headache. Using our province dropdown lets you standardize all inter-provincial receipts back to their base cost instantly." currentState="Canada" />
                  </p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Verifying Handwritten Receipts</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Sometimes receipts from smaller vendors, contractors, or handwritten invoices only show a final total. Our tool helps you instantly verify that the correct tax rate was applied according to your specific province's HST, PST, or QST regulations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                Frequently Asked Questions: Canada Taxes
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                  <details key={idx} className="card" style={{ padding: '24px 32px', cursor: 'pointer', outline: 'none' }}>
                    <summary style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {faq.question}
                      <span style={{ color: 'var(--primary)', fontSize: 24 }}>+</span>
                    </summary>
                    <p style={{ marginTop: 16, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
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
