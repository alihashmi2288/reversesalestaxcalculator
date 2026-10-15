import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StateTable from '@/components/StateTable';
import { getHighestRateStates, NATIONAL_AVERAGE_COMBINED_RATE, STATE_TAX_RATES } from '@/data/stateTaxRates';

export const metadata: Metadata = {
  title: 'US Sales Tax Rates by State (2026 Combined Rates)',
  description: 'Complete list of 2026 sales tax rates for all 50 US states and DC. Compare state rates, local averages, and combined tax rates in a searchable table.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/tax-rates' },
  openGraph: {
    title: 'US Sales Tax Rates by State (2026 Combined Rates)',
    description: 'Complete list of 2026 sales tax rates for all 50 US states and DC. Compare state rates, local averages, and combined tax rates in a searchable table.',
    url: 'https://salestaxreversecalculator.com/tax-rates',
    images: [{ url: '/images/us-sales-tax-rates-map-2026.jpg', width: 1200, height: 675, alt: 'US State Sales Tax Rates Map 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Sales Tax Rates by State (2026 Combined Rates)',
    description: 'Complete list of 2026 sales tax rates for all 50 US states and DC. Compare state rates, local averages, and combined tax rates in a searchable table.',
  },
};

const SITE_URL = 'https://salestaxreversecalculator.com';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Tax Rates', item: `${SITE_URL}/tax-rates` },
  ],
};

const imageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  name: 'US Sales Tax Rates by State 2026 Map',
  contentUrl: `${SITE_URL}/images/us-sales-tax-rates-map-2026.jpg`,
  description: 'Infographic map illustrating combined state and local sales tax rates across all 50 US states and DC in 2026.',
};

export default function TaxRatesPage() {
  const highestState = getHighestRateStates(1)[0];
  const zeroTaxCount = STATE_TAX_RATES.filter((s) => s.rate === 0).length;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />

      {/* Hero */}
      <section className="hero-band" style={{ padding: '56px 0', textAlign: 'center' }}>
        <div className="container-main">
          <span className="section-label" style={{ background: 'var(--mint-100)', color: 'var(--primary-deep)', border: '1px solid var(--mint-200)' }}>US Tax Rates</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,46px)', fontWeight: 700, color: '#ffffff', margin: '14px 0 12px', lineHeight: 1.15 }}>
            US State Sales Tax Rates 2026
          </h1>
          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Combined average sales tax rates (state + local) for all 50 states and Washington DC.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container-main" style={{ marginTop: 24, marginBottom: 8 }}>
        <nav style={{ fontSize: 13, color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Tax Rates</span>
        </nav>
      </div>

      {/* Key Stats */}
      <div className="container-main" style={{ marginTop: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Highest Rate', value: `${highestState.rate.toFixed(2)}%`, note: `${highestState.state}`, color: 'var(--error)' },
            { label: 'Average Rate', value: `${NATIONAL_AVERAGE_COMBINED_RATE}%`, note: 'National average', color: 'var(--primary)' },
            { label: 'Lowest Rate', value: '0%', note: `${zeroTaxCount} tax-free states`, color: 'var(--primary-deep)' },
            { label: 'States Covered', value: `${STATE_TAX_RATES.length}`, note: '50 states + DC', color: 'var(--ink)' },
          ].map(({ label, value, note, color }) => (
            <div key={label} className="card" style={{ textAlign: 'center', background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', padding: '20px 16px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', margin: '6px 0 2px' }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{note}</div>
            </div>
          ))}
        </div>

        {/* US Sales Tax Map 2026 Infographic */}
        <div style={{ margin: '24px 0 32px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--hairline-strong)', background: 'var(--canvas)', boxShadow: 'var(--shadow-card)' }}>
          <Image
            src="/images/us-sales-tax-rates-map-2026.jpg"
            alt="US sales tax rates by state 2026 map infographic showing combined state and local averages"
            width={1200}
            height={675}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
          <div style={{ padding: '12px 20px', background: 'var(--canvas-soft)', borderTop: '1px solid var(--hairline-strong)', fontSize: 13, color: 'var(--muted)' }}>
            Figure 2: 2026 US state and local combined average sales tax rate map visualization across all 50 states and Washington DC.
          </div>
        </div>

        <p style={{ fontSize: 16, color: 'var(--body)', lineHeight: 1.7, marginBottom: 24, maxWidth: 860 }}>
          All rates in the table below are pre-loaded into each state&apos;s dedicated calculator. Click any state to open a{' '}
          <Link
            href="/"
            style={{
              color: 'var(--primary)',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            reverse tax calculator
          </Link>{' '}
          pre-filled with that state&apos;s current combined rate.
        </p>
        <StateTable />
      </div>

      {/* Notes */}
      <div className="container-main" style={{ marginTop: 48, marginBottom: 64 }}>
        <div style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-lg)', padding: 24, maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--primary-deep)', marginBottom: 12 }}>📌 Important Notes</h2>
          <ul style={{ paddingLeft: 20, color: 'var(--body)', fontSize: 15, lineHeight: 1.9, margin: 0 }}>
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
