import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import VATCalculator from './VATCalculator';

export const metadata: Metadata = {
  title: 'Reverse VAT Calculator — Remove VAT from Any Price (UK, EU, AU)',
  description: 'Free reverse VAT calculator. Remove VAT from prices for the UK (20%), EU, Australia, and more. Calculate ex-VAT prices instantly.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/vat-calculator' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
    { '@type': 'ListItem', position: 2, name: 'Reverse VAT Calculator', item: 'https://salestaxreversecalculator.com/vat-calculator' },
  ],
};

export default function VATPage() {
  return (
    <main>
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
