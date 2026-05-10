import type { Metadata } from 'next';
import StateTable from '@/components/StateTable';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'US State Sales Tax Rates 2026 — All 50 States',
  description: 'Complete list of US state sales tax rates for all 50 states plus DC. Combined average rates (state + local) with filterable table.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/tax-rates' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
    { '@type': 'ListItem', position: 2, name: 'Tax Rates', item: 'https://salestaxreversecalculator.com/tax-rates' },
  ],
};

export default function TaxRatesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#a5b4fc' }}>US Tax Rates</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', margin: '16px 0 16px', lineHeight: 1.15 }}>
            US State Sales Tax Rates 2026
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            Combined average sales tax rates (state + local) for all 50 states and Washington DC.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16, marginBottom: 12 }}>
        <AdSlot slot="tax-rates-leaderboard" size="leaderboard" label="Leaderboard — Tax Rates Page" />
      </div>

      {/* Breadcrumb */}
      <div className="container-main" style={{ marginTop: 24, marginBottom: 8 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Tax Rates</span>
        </nav>
      </div>

      {/* Key Stats */}
      <div className="container-main" style={{ marginTop: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'Highest Rate', value: '9.55%', note: 'Louisiana & Tennessee', color: '#dc2626' },
            { label: 'Average Rate', value: '7.12%', note: 'National average', color: 'var(--primary)' },
            { label: 'Lowest Rate', value: '0%', note: '5 tax-free states', color: '#047857' },
            { label: 'States Covered', value: '51', note: '50 states + DC', color: '#7c3aed' },
          ].map(({ label, value, note, color }) => (
            <div key={label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color }}>{value}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', margin: '4px 0 2px' }}>{label}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{note}</div>
            </div>
          ))}
        </div>
        <StateTable />
      </div>

      {/* Notes */}
      <div className="container-main" style={{ marginTop: 48, marginBottom: 64 }}>
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 16, padding: 24, maxWidth: 860, margin: '0 auto' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: '#92400e', marginBottom: 12 }}>📌 Important Notes</h3>
          <ul style={{ paddingLeft: 20, color: '#78350f', fontSize: 15, lineHeight: 2 }}>
            <li>Rates shown are <strong>combined averages</strong> (state rate + average local rate).</li>
            <li>Your actual rate may differ based on your specific city and county.</li>
            <li>Some products (groceries, medicine) may be taxed at reduced or zero rates.</li>
            <li>Rates are updated periodically — verify with your state&#39;s Department of Revenue for legal accuracy.</li>
            <li>Alaska, Delaware, Montana, New Hampshire, and Oregon have no state sales tax.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
