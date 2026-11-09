import Link from 'next/link';
import type { StateRate } from '@/data/stateTaxRates';
import { getNeighborStates } from '@/data/stateNeighbors';

interface Props {
  currentState: StateRate;
}

export default function NeighborStateComparison({ currentState }: Props) {
  const currentSlug = currentState.state.toLowerCase().replace(/\s+/g, '-');
  const neighbors = getNeighborStates(currentSlug);

  if (!neighbors || neighbors.length === 0) return null;

  return (
    <section className="card" style={{ padding: 28, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
          🗺️ Neighboring State Sales Tax Comparisons
        </h3>
        <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
          Compare {currentState.state}&apos;s {currentState.rate === 0 ? '0% tax-free' : `${currentState.rate}% combined`} rate against bordering jurisdictions:
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {neighbors.map((neighbor) => {
          const neighborSlug = neighbor.state.toLowerCase().replace(/\s+/g, '-');
          const diff = neighbor.rate - currentState.rate;
          let diffText = 'Same Rate';
          let diffColor = 'var(--muted)';

          if (neighbor.rate === 0) {
            diffText = 'Tax-Free (0%)';
            diffColor = 'var(--primary)';
          } else if (diff > 0) {
            diffText = `+${diff.toFixed(2)}% Higher`;
            diffColor = '#b91c1c';
          } else if (diff < 0) {
            diffText = `${diff.toFixed(2)}% Lower`;
            diffColor = 'var(--primary)';
          }

          return (
            <Link
              key={neighbor.abbr}
              href={`/us/${neighborSlug}`}
              className="card hover-lift"
              style={{
                padding: '14px 16px',
                textDecoration: 'none',
                background: 'var(--canvas)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease-in-out',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--ink)' }}>
                  {neighbor.state} ({neighbor.abbr})
                </span>
                <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: 14, fontFamily: 'monospace' }}>
                  {neighbor.rate === 0 ? '0%' : `${neighbor.rate}%`}
                </span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: diffColor, marginBottom: 8 }}>
                {diffText} vs {currentState.state}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>{neighbor.state} Reverse Tax</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
