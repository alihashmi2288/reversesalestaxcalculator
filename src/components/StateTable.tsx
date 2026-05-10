'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

export default function StateTable() {
  const [search, setSearch] = useState('');

  const filtered = STATE_TAX_RATES
    .filter((s) => s.state.toLowerCase().includes(search.toLowerCase()) || s.abbreviation.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.state.localeCompare(b.state));

  const rateColor = (rate: number) => {
    if (rate === 0) return '#047857';
    if (rate < 5) return '#059669';
    if (rate < 7) return '#d97706';
    if (rate < 8.5) return '#ea580c';
    return '#dc2626';
  };

  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span className="section-label">State Rates</span>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
          US State Sales Tax Rates 2026
        </h2>
        <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 24px' }}>
          Combined average rates (state + local). Click any state to use that rate in the calculator.
        </p>
        <div style={{ maxWidth: 360, margin: '0 auto', position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Search state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 'var(--radius)', border: '2px solid var(--border)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)', outline: 'none' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--border-focus)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
      </div>

      <div style={{ background: 'var(--card-bg)', border: '2px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-solid-dark)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Abbr.</th>
                <th>State Rate</th>
                <th>Avg Local</th>
                <th>Combined Rate</th>
                <th>Calculator</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.abbreviation}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.state}</td>
                  <td>
                    <span style={{ background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: 'var(--radius)', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)', border: '1px solid #000' }}>
                      {s.abbreviation}
                    </span>
                  </td>
                  <td>{s.stateRate === 0 ? <span style={{ color: '#047857', fontWeight: 600 }}>None</span> : `${s.stateRate}%`}</td>
                  <td>{s.avgLocalRate > 0 ? `${s.avgLocalRate.toFixed(2)}%` : '—'}</td>
                  <td>
                    <span style={{ fontWeight: 800, fontSize: 16, color: rateColor(s.rate) }}>
                      {s.rate === 0 ? '0%' : `${s.rate}%`}
                    </span>
                    {s.notes && (
                      <span style={{ marginLeft: 8, background: '#d1fae5', color: '#047857', fontSize: 11, padding: '1px 6px', borderRadius: 'var(--radius)', fontWeight: 600, fontFamily: 'var(--font-mono)', border: '1px solid #047857' }}>
                        {s.notes}
                      </span>
                    )}
                  </td>
                  <td>
                    <Link
                      href={`/us/${s.state.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
                    >
                      Calculate →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px 24px', background: 'var(--bg)', borderTop: '2px solid var(--border)', fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          Showing {filtered.length} of {STATE_TAX_RATES.length} states · Rates are combined averages · Last updated 2026
        </div>
      </div>
    </section>
  );
}
