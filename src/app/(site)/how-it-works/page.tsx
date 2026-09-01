import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import HowItWorks from '@/components/HowItWorks';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Calculate Reverse Sales Tax: Step-by-Step Guide',
  description: 'Learn how to calculate the original price before tax with the reverse sales tax formula. Step-by-step mathematical guide with real-world examples.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/how-it-works' },
  openGraph: {
    title: 'How to Calculate Reverse Sales Tax: Step-by-Step Guide',
    description: 'Learn how to calculate the original price before tax with the reverse sales tax formula. Step-by-step mathematical guide with real-world examples.',
    url: 'https://salestaxreversecalculator.com/how-it-works',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'How Reverse Sales Tax Works' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Calculate Reverse Sales Tax: Step-by-Step Guide',
    description: 'Learn how to calculate the original price before tax with the reverse sales tax formula. Step-by-step mathematical guide with real-world examples.',
  },
};

const SITE_URL = 'https://salestaxreversecalculator.com';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'How It Works', item: `${SITE_URL}/how-it-works` },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Original Pre-Tax Price from a Receipt Total',
  description: 'A 5-step mathematical walkthrough to reverse calculate sales tax from a tax-inclusive final amount.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Identify your total and tax rate',
      text: 'Find the final amount paid on your receipt (e.g. $107.50) and the tax percentage applied (e.g. 7.5%).',
      position: 1
    },
    {
      '@type': 'HowToStep',
      name: 'Convert the tax rate to a decimal',
      text: 'Divide the tax percentage by 100 (e.g. 7.5 / 100 = 0.075).',
      position: 2
    },
    {
      '@type': 'HowToStep',
      name: 'Add 1 to the decimal rate',
      text: 'Add 1 to obtain your division factor (1 + 0.075 = 1.075).',
      position: 3
    },
    {
      '@type': 'HowToStep',
      name: 'Divide the total by the factor',
      text: 'Divide your final receipt total by 1.075 ($107.50 / 1.075 = $100.00). This is your original pre-tax price.',
      position: 4
    },
    {
      '@type': 'HowToStep',
      name: 'Calculate the sales tax paid',
      text: 'Subtract the pre-tax price from the total paid ($107.50 - $100.00 = $7.50 tax paid).',
      position: 5
    }
  ]
};

export default function HowItWorksPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            How Reverse Sales Tax Works
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 620, margin: '0 auto' }}>
            A comprehensive guide to the reverse tax formula, algebraic derivation, and practical bookkeeping examples.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot="how-it-works-leaderboard" size="leaderboard" label="Leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 48 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 48 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>How It Works</span>
        </nav>

        <HowItWorks />

        {/* Formula Detail */}
        <div style={{ marginTop: 64, maxWidth: 860, margin: '64px auto 0' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, textTransform: 'uppercase' }}>
            The Mathematics Behind Reverse Tax
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 12 }}>Why Not Just Subtract the Percentage?</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                The most frequent mistake in retail accounting is the &quot;percentage subtraction error.&quot;
                For example, if you paid $107.50 with a 7.5% tax rate: calculating $107.50 × 7.5% = $8.0625 and subtracting it produces $99.44. <strong>This is mathematically wrong</strong>.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 12 }}>
                The real original price was $100.00. The reason is simple: sales tax was originally levied on the <em>pre-tax base ($100.00)</em>, not the final gross amount ($107.50). Because $100.00 × 7.5% = $7.50, you must use the mathematical inverse: division.
              </p>
            </div>

            <div className="formula-box">
              <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>The Correct Reverse Tax Formula</div>
              <div className="formula-text">Original Price = Total Price ÷ (1 + Tax Rate / 100)</div>
              <div style={{ marginTop: 16, fontSize: 14, opacity: 0.85 }}>
                Tax Component Paid = Total Price − Original Price
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase' }}>Step-by-Step Worked Example</h3>
              {[
                { step: '1', label: 'Known: Total price paid from receipt', value: '$107.50' },
                { step: '2', label: 'Known: Sales tax rate applied', value: '7.5%' },
                { step: '3', label: 'Calculate divisor: 1 + (7.5 / 100)', value: '1.075' },
                { step: '4', label: 'Divide: $107.50 ÷ 1.075', value: '$100.00 (Original Pre-Tax Price)' },
                { step: '5', label: 'Isolate tax: $107.50 − $100.00', value: '$7.50 (Sales Tax Paid)' },
              ].map(({ step, label, value }) => (
                <div key={step} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{step}</div>
                  <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 15 }}>{label}</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase' }}>Reverse Tax Divisor Quick Reference</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#09090b', borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Tax Rate</th>
                      <th style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Divisor Factor</th>
                      <th style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>$100 Receipt Pre-Tax Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rate: '5.00%', div: '1.050', res: '$95.24' },
                      { rate: '6.00%', div: '1.060', res: '$94.34' },
                      { rate: '6.25% (MA/TX base)', div: '1.0625', res: '$94.12' },
                      { rate: '7.00% (NC/MS)', div: '1.070', res: '$93.46' },
                      { rate: '8.25% (TX city max)', div: '1.0825', res: '$92.38' },
                      { rate: '8.875% (NYC)', div: '1.08875', res: '$91.85' },
                      { rate: '10.00%', div: '1.100', res: '$90.91' },
                      { rate: '13.00% (Ontario HST)', div: '1.130', res: '$88.50' },
                      { rate: '20.00% (UK VAT)', div: '1.200', res: '$83.33' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '10px 14px', color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{row.rate}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{row.div}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{row.res}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, marginBottom: 64 }}>
          <Link href="/" style={{ background: 'var(--primary)', color: '#000', border: '2px solid #000', boxShadow: '3px 3px 0px 0px #000', padding: '16px 40px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block', textTransform: 'uppercase' }}>
            Try the Calculator Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
