import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { getStateBySlug, STATE_TAX_RATES } from '@/data/stateTaxRates';
import StateCalculatorClient from './StateCalculatorClient';

// Generate static paths for top 10 states + all others
export async function generateStaticParams() {
  return STATE_TAX_RATES.map((s) => ({
    state: s.state.toLowerCase().replace(/\s+/g, '-'),
  }));
}

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return { title: 'State Not Found' };

  return {
    title: `${stateData.state} Reverse Sales Tax Calculator — ${stateData.rate}% Combined Rate`,
    description: `Free ${stateData.state} reverse sales tax calculator. Pre-filled with the ${stateData.rate}% combined average rate. Find original prices before ${stateData.state} sales tax instantly.`,
    alternates: { canonical: `https://reversetaxcalculator.com/us/${stateSlug}` },
  };
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reversetaxcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://reversetaxcalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: stateData.state, item: `https://reversetaxcalculator.com/us/${stateSlug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, padding: '6px 16px', marginBottom: 16 }}>
            <span style={{ color: '#a5b4fc', fontSize: 13, fontWeight: 600 }}>🗺️ {stateData.abbreviation} · Combined Rate: {stateData.rate}%</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
            {stateData.state} Reverse Sales<br />Tax Calculator
          </h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 540, margin: '0 auto' }}>
            Pre-filled with {stateData.state}&apos;s {stateData.rate}% combined average tax rate.
            Enter any total price to find the original pre-tax amount.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot={`${stateSlug}-leaderboard`} size="leaderboard" label={`${stateData.state} — Leaderboard`} />
      </div>

      <div className="container-main" style={{ marginTop: 32 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/tax-rates" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Tax Rates</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>{stateData.state}</span>
        </nav>

        {/* Rate Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'State Rate', value: `${stateData.stateRate}%`, color: 'var(--primary)' },
            { label: 'Avg Local Rate', value: stateData.avgLocalRate > 0 ? `${stateData.avgLocalRate.toFixed(2)}%` : 'None', color: '#7c3aed' },
            { label: 'Combined Rate', value: `${stateData.rate}%`, color: stateData.rate === 0 ? '#047857' : stateData.rate > 8 ? '#dc2626' : '#d97706' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <StateCalculatorClient stateData={stateData} />

        {/* State Info */}
        <div style={{ marginTop: 48, maxWidth: 720, margin: '48px auto 0' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            About {stateData.state} Sales Tax
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75 }}>
            {stateData.rate === 0 ? (
              <p>{stateData.state} is one of five US states with <strong>no sales tax</strong>. Shoppers in {stateData.state} pay the listed price — no tax is added at checkout for most purchases.</p>
            ) : (
              <>
                <p>
                  {stateData.state} has a state sales tax rate of <strong>{stateData.stateRate}%</strong>.
                  {stateData.avgLocalRate > 0 ? ` Added to this are local taxes averaging ${stateData.avgLocalRate.toFixed(2)}%, bringing the combined average to ${stateData.rate}%.` : ' There are no local sales taxes in this state.'}
                </p>
                <p>
                  This means for every $100 of pre-tax goods, you pay ${stateData.rate} in sales tax for a total of ${(100 + stateData.rate).toFixed(2)}.
                  Reversely, if you paid ${(100 + stateData.rate).toFixed(2)}, the original price was $100.00.
                </p>
              </>
            )}
          </div>
        </div>

        <div style={{ marginTop: 48, marginBottom: 64 }}>
          <AdSlot slot={`${stateSlug}-rectangle`} size="rectangle" label={`${stateData.state} — Rectangle`} />
        </div>
      </div>
    </main>
  );
}
