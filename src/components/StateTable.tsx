'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

export default function StateTable() {
  const [search, setSearch] = useState('');

  const filtered = STATE_TAX_RATES
    .filter((s) => s.state.toLowerCase().includes(search.toLowerCase()) || s.abbreviation.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.state.localeCompare(b.state));

  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span className="section-label">State Tax Reference</span>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: 'var(--ink)', margin: '10px 0 14px' }}>
          2026 Reverse Sales Tax Rates by State
        </h2>
        <p style={{ fontSize: 16, color: 'var(--body)', maxWidth: 620, margin: '0 auto 24px' }}>
          Combined average statutory rates (state + local). Select any state to pre-fill its rate directly in the calculator.
        </p>
        <div style={{ maxWidth: 380, margin: '0 auto', position: 'relative' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="2.5"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <title>Search Icon</title>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Filter by state or abbreviation..."
            aria-label="Search US state sales tax rates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--hairline-strong)',
              background: 'var(--canvas)',
              color: 'var(--ink)',
              fontSize: 14,
              fontFamily: 'var(--font-montserrat), sans-serif',
              outline: 'none',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--hairline-strong)')}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Abbr.</th>
                <th>State Base</th>
                <th>Avg Local</th>
                <th>Combined Average</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.abbreviation}>
                  <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{s.state}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: 'var(--mint-100)',
                        color: 'var(--primary-deep)',
                        border: '1px solid var(--mint-200)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {s.abbreviation}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {s.stateRate === 0 ? <span style={{ color: 'var(--primary)', fontWeight: 600 }}>0% (None)</span> : `${s.stateRate}%`}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {s.avgLocalRate > 0 ? `${s.avgLocalRate.toFixed(2)}%` : '—'}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                      {s.rate === 0 ? '0%' : `${s.rate}%`}
                    </span>
                    {s.notes && (
                      <span
                        style={{
                          marginLeft: 8,
                          backgroundColor: 'var(--canvas-soft)',
                          color: 'var(--muted)',
                          border: '1px solid var(--hairline-strong)',
                          fontSize: 11,
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-xs)',
                          fontWeight: 500,
                        }}
                      >
                        {s.notes}
                      </span>
                    )}
                  </td>
                  <td>
                    <Link
                      href={`/us/${s.state.toLowerCase().replace(/\s+/g, '-')}`}
                      className="link-green"
                      style={{ fontSize: 13 }}
                    >
                      Calculate →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '14px 20px', backgroundColor: 'var(--canvas-soft)', borderTop: '1px solid var(--hairline)', fontSize: 12, color: 'var(--muted)' }}>
          Showing 51 of 51 jurisdictions · Combined average rates · Rates verified 2026
        </div>
      </div>
      <p className="table-note" style={{ marginTop: 14, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
        Combined average rates include state baseline and population-weighted municipal/district surtaxes. Source:{' '}
        <a href="https://taxfoundation.org" target="_blank" rel="noopener noreferrer" className="link-inline">
          Tax Foundation
        </a>.
      </p>
    </section>
  );
}
