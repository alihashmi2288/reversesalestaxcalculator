import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import CanadaCalculator from './CanadaCalculator';

export const metadata: Metadata = {
  title: 'Canada Reverse Tax Calculator — GST, HST, PST by Province',
  description: 'Free Canada reverse sales tax calculator. Remove GST, HST, or PST from any price. Supports all 13 provinces and territories with current 2024 rates.',
  alternates: { canonical: 'https://reversetaxcalculator.com/canada' },
};

export default function CanadaPage() {
  return (
    <main>
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
        <AdSlot slot="canada-leaderboard" size="leaderboard" label="Canada — Leaderboard" />
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
              <AdSlot slot="canada-rectangle" size="rectangle" label="Canada — Rectangle" />
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
        <style>{`@media(max-width:900px){.calc-layout{grid-template-columns:1fr!important}}`}</style>
      </div>
    </main>
  );
}
