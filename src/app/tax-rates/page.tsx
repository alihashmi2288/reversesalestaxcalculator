import type { Metadata } from 'next';
import Link from 'next/link';
import StateTable from '@/components/StateTable';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'US State Sales Tax Rates 2026: All 50 States & DC',
  description: 'Complete list of US state sales tax rates for all 50 states plus DC. Combined average rates (state + local) with filterable table.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/tax-rates' },
  openGraph: {
    title: 'US State Sales Tax Rates 2026: All 50 States & DC',
    description: 'Complete list of US state sales tax rates for all 50 states plus DC. Combined average rates (state + local) with filterable table.',
    url: 'https://salestaxreversecalculator.com/tax-rates',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'US State Sales Tax Rates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US State Sales Tax Rates 2026: All 50 States & DC',
    description: 'Complete list of US state sales tax rates for all 50 states plus DC. Combined average rates (state + local) with filterable table.',
  },
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

      {/* Breadcrumb */}
      <div className="container-main" style={{ marginTop: 24, marginBottom: 8 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Tax Rates</span>
        </nav>
      </div>

      {/* Key Stats */}
      <div className="container-main" style={{ marginTop: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'Highest Rate', value: '9.60%', note: 'Tennessee & Louisiana', color: '#dc2626' },
            { label: 'Average Rate', value: '7.53%', note: 'National average', color: 'var(--primary)' },
            { label: 'Lowest Rate', value: '0%', note: '5 tax-free states', color: '#047857' },
            { label: 'States Covered', value: '51', note: '50 states + DC', color: '#7c3aed' },
          ].map(({ label, value, note, color }) => (
            <div key={label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', margin: '4px 0 2px' }}>{label}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{note}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 860 }}>
          All rates in the table below are pre-loaded into each state&apos;s dedicated calculator. Click any state to open a{' '}
          <Link
            href="/"
            style={{
              color: 'var(--primary)',
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(165,180,252,0.3)',
            }}
          >
            reverse tax calculator
          </Link>{' '}
          pre-filled with that state&apos;s current combined rate.
        </p>
        <StateTable />
        {/* Ezoic Ad Position — Below State Rate Table */}
        <script
          dangerouslySetInnerHTML={{
            __html: `ezstandalone.cmd.push(function () { ezstandalone.showAds({}); });`,
          }}
        />
      </div>

      {/* Notes */}
      <div className="container-main" style={{ marginTop: 48, marginBottom: 64 }}>
        <div style={{ background: 'rgba(255, 251, 235, 0.04)', border: '1px solid rgba(253, 230, 138, 0.2)', borderRadius: 16, padding: 24, maxWidth: 860, margin: '0 auto' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: '#fef08a', marginBottom: 12 }}>📌 Important Notes</h3>
          <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 2 }}>
            <li>Rates shown are <strong>combined averages</strong> (state rate + average local rate).</li>
            <li>Your actual rate may differ based on your specific city and county jurisdiction.</li>
            <li>Certain necessities (unprepared groceries, prescription drugs) are exempt in many states.</li>
            <li>Rates are sourced from official state Revenue Departments and updated periodically for 2026.</li>
            <li>Alaska, Delaware, Montana, New Hampshire, and Oregon have no general state sales tax.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
