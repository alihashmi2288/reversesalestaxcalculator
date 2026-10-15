import type { Metadata } from 'next';
import Image from 'next/image';
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
    images: [{ url: '/images/reverse-sales-tax-formula-diagram.jpg', width: 1200, height: 675, alt: 'How Reverse Sales Tax Works Diagram' }],
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'How It Works', item: `${SITE_URL}/how-it-works` },
  ],
};

const imageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  name: 'Reverse Sales Tax Formula Flowchart',
  contentUrl: `${SITE_URL}/images/reverse-sales-tax-formula-diagram.jpg`,
  description: 'Infographic flowchart illustrating the reverse sales tax algebraic formula and step-by-step receipt calculation.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />

      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>📐</span> Educational Guide & Algebraic Formula
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', marginBottom: 14, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            How Reverse Sales Tax Works
          </h1>
          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
            A comprehensive guide to the reverse tax formula, algebraic derivation, and practical bookkeeping examples.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot="how-it-works-leaderboard" size="leaderboard" label="Leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 32, marginBottom: 80 }}>
        <nav style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ color: 'var(--hairline-strong)' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>How It Works</span>
        </nav>

        <HowItWorks />

        {/* Formula Detail */}
        <div style={{ marginTop: 64, maxWidth: 880, margin: '64px auto 0' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 24, letterSpacing: '-0.02em' }}>
            The Mathematics Behind Reverse Tax
          </h2>

          {/* Infographic Visual Asset */}
          <div style={{ margin: '24px 0 32px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--hairline)', background: 'var(--canvas)', boxShadow: 'var(--shadow-card)' }}>
            <Image
              src="/images/reverse-sales-tax-formula-diagram.jpg"
              alt="Reverse sales tax formula diagram: Total price divided by one plus tax rate equals original pre-tax price"
              width={1200}
              height={675}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
            <div style={{ padding: '12px 20px', background: 'var(--canvas-soft)', borderTop: '1px solid var(--hairline)', fontSize: 13, color: 'var(--muted)' }}>
              Figure 1: Reverse sales tax calculation flowchart demonstrating algebraic inverse division ($107.50 / 1.075 = $100.00).
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ borderLeft: '4px solid var(--primary)', padding: 32 }}>
              <h3 style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>Why Not Just Subtract the Percentage?</h3>
              <p style={{ color: 'var(--body)', lineHeight: 1.7, fontSize: 15 }}>
                The most frequent mistake in retail accounting is the &quot;percentage subtraction error.&quot;
                For example, if you paid $107.50 with a 7.5% tax rate: calculating $107.50 × 7.5% = $8.0625 and subtracting it produces $99.44. <strong>This is mathematically wrong</strong>.
              </p>
              <p style={{ color: 'var(--body)', lineHeight: 1.7, marginTop: 12, fontSize: 15 }}>
                The real original price was $100.00. The reason is simple: sales tax was originally levied on the <em>pre-tax base ($100.00)</em>, not the final gross amount ($107.50). Because $100.00 × 7.5% = $7.50, you must use the mathematical inverse: division.
              </p>
            </div>

            <div className="formula-box">
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.75, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)' }}>The Correct Reverse Tax Formula</div>
              <div className="formula-text">Original Price = Total Price ÷ (1 + Tax Rate / 100)</div>
              <div style={{ marginTop: 14, fontSize: 14, opacity: 0.85, color: 'var(--ink)' }}>
                Tax Component Paid = Total Price − Original Price
              </div>
            </div>

            <div className="card" style={{ padding: 32 }}>
              <h3 style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink)', marginBottom: 20, letterSpacing: '-0.01em' }}>Step-by-Step Worked Example</h3>
              {[
                { step: '1', label: 'Known: Total price paid from receipt', value: '$107.50' },
                { step: '2', label: 'Known: Sales tax rate applied', value: '7.5%' },
                { step: '3', label: 'Calculate divisor: 1 + (7.5 / 100)', value: '1.075' },
                { step: '4', label: 'Divide: $107.50 ÷ 1.075', value: '$100.00 (Original Pre-Tax Price)' },
                { step: '5', label: 'Isolate tax: $107.50 − $100.00', value: '$7.50 (Sales Tax Paid)' },
              ].map(({ step, label, value }) => (
                <div key={step} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-xs)', background: 'var(--primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{step}</div>
                  <div style={{ flex: 1, color: 'var(--body)', fontSize: 15 }}>{label}</div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 15, fontFamily: 'monospace' }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 32 }}>
              <h3 style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink)', marginBottom: 20, letterSpacing: '-0.01em' }}>Reverse Tax Divisor Quick Reference</h3>
              <div style={{ overflowX: 'auto', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                      <th style={{ padding: '12px 18px', color: 'var(--ink)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tax Rate</th>
                      <th style={{ padding: '12px 18px', color: 'var(--ink)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Divisor Factor</th>
                      <th style={{ padding: '12px 18px', color: 'var(--ink)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>$100 Receipt Pre-Tax Cost</th>
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
          <Link href="/" style={{ background: 'var(--primary)', color: '#ffffff', border: '1px solid var(--primary-deep)', boxShadow: 'none', padding: '14px 36px', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
            Try the Calculator Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
