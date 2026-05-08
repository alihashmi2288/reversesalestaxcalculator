import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import HowItWorks from '@/components/HowItWorks';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Calculate Reverse Sales Tax — Step-by-Step Guide',
  description: 'Learn how to calculate the original price before tax with the reverse sales tax formula. Step-by-step guide with examples.',
  alternates: { canonical: 'https://reversetaxcalculator.com/how-it-works' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reversetaxcalculator.com' },
    { '@type': 'ListItem', position: 2, name: 'How It Works', item: 'https://reversetaxcalculator.com/how-it-works' },
  ],
};

export default function HowItWorksPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            How Reverse Sales Tax Works
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            A complete guide to the reverse tax formula with real-world examples.
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
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
            The Mathematics Behind Reverse Tax
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 12 }}>Why Not Just Subtract the Percentage?</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                A common mistake is to subtract the tax percentage directly from the total.
                For example, with a 7.5% tax on $107.50: some people calculate $107.50 × 7.5% = $8.0625 and subtract that, 
                getting $99.44. <strong>This is wrong</strong>.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 12 }}>
                The correct answer is $100.00. The issue is that tax was calculated on the <em>original price</em>, 
                not on the total. 7.5% of $100 = $7.50, so the total is $107.50. To reverse this, we divide.
              </p>
            </div>

            <div className="formula-box">
              <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>The Correct Formula</div>
              <div className="formula-text">Original Price = Total Price ÷ (1 + Tax Rate / 100)</div>
              <div style={{ marginTop: 16, fontSize: 14, opacity: 0.8 }}>
                Then: Tax Amount = Total Price − Original Price
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 16 }}>Step-by-Step Example</h3>
              {[
                { step: '1', label: 'Known: Total price paid', value: '$107.50' },
                { step: '2', label: 'Known: Tax rate', value: '7.5%' },
                { step: '3', label: 'Calculate divisor: 1 + (7.5 / 100)', value: '1.075' },
                { step: '4', label: 'Divide: $107.50 ÷ 1.075', value: '$100.00 ← Original Price' },
                { step: '5', label: 'Tax amount: $107.50 − $100.00', value: '$7.50 ← Tax Paid' },
              ].map(({ step, label, value }) => (
                <div key={step} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{step}</div>
                  <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 15 }}>{label}</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 15 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, marginBottom: 64 }}>
          <Link href="/" style={{ background: 'var(--primary)', color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 4px 16px rgba(26,86,219,0.3)', display: 'inline-block' }}>
            Try the Calculator Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
