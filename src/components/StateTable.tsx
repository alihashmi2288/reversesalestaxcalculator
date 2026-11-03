'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

const SORTED_STATES = STATE_TAX_RATES.slice().sort((a, b) => a.state.localeCompare(b.state));

export default function StateTable() {
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  const filtered = query
    ? SORTED_STATES.filter(
        (s) =>
          s.state.toLowerCase().includes(query) ||
          s.abbreviation.toLowerCase().includes(query)
      )
    : SORTED_STATES;

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
            aria-hidden="true"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="state-search"
            name="stateSearch"
            type="text"
            autoComplete="off"
            placeholder="Filter by state or abbreviation…"
            aria-label="Search US state sales tax rates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="calc-input"
            style={{
              width: '100%',
              height: 46,
              padding: '10px 16px 10px 40px',
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        <div
          tabIndex={0}
          role="region"
          aria-label="State sales tax rates comparison"
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          <table className="data-table" style={{ tableLayout: 'fixed', minWidth: 640, width: '100%', borderCollapse: 'collapse' }}>
            <caption className="sr-only">
              2026 US State and Local Sales Tax Rates and Reverse Multipliers
            </caption>
            <thead>
              <tr style={{ position: 'sticky', top: 0, backgroundColor: 'var(--canvas-soft)', zIndex: 10 }}>
                <th scope="col" style={{ width: '26%', position: 'sticky', top: 0, backgroundColor: 'var(--canvas-soft)' }}>State</th>
                <th scope="col" style={{ width: '12%', position: 'sticky', top: 0, backgroundColor: 'var(--canvas-soft)' }}>Abbr.</th>
                <th scope="col" style={{ width: '16%', position: 'sticky', top: 0, backgroundColor: 'var(--canvas-soft)' }}>State Base</th>
                <th scope="col" style={{ width: '16%', position: 'sticky', top: 0, backgroundColor: 'var(--canvas-soft)' }}>Avg Local</th>
                <th scope="col" style={{ width: '18%', position: 'sticky', top: 0, backgroundColor: 'var(--canvas-soft)' }}>Combined Average</th>
                <th scope="col" style={{ width: '12%', position: 'sticky', top: 0, backgroundColor: 'var(--canvas-soft)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--body)', fontSize: 14 }}>
                    No jurisdictions found matching &ldquo;{search}&rdquo;. <button type="button" onClick={() => setSearch('')} className="link-green" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Clear filter</button>
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.abbreviation}>
                    <th scope="row" style={{ fontWeight: 600, color: 'var(--ink)', textAlign: 'left', fontStyle: 'normal' }}>
                      {s.state}
                    </th>
                    <td>
                      <span
                        style={{
                          backgroundColor: 'var(--mint-100)',
                          color: 'var(--primary-deep)',
                          border: '1px solid var(--mint-200)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: 13,
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {s.abbreviation}
                      </span>
                    </td>
                    <td className="tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                      {s.stateRate === 0 ? <span style={{ color: 'var(--primary)', fontWeight: 600 }}>0% (None)</span> : `${s.stateRate}%`}
                    </td>
                    <td className="tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: 'var(--body)' }}>
                      {s.avgLocalRate > 0 ? `${s.avgLocalRate.toFixed(2)}%` : '—'}
                    </td>
                    <td>
                      <span className="tabular-nums" style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                        {s.rate === 0 ? '0%' : `${s.rate}%`}
                      </span>
                      {s.notes && (
                        <span
                          style={{
                            marginLeft: 8,
                            backgroundColor: 'var(--canvas-soft)',
                            color: 'var(--body)',
                            border: '1px solid var(--hairline-strong)',
                            fontSize: 13,
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
                        className="link-green focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-1 rounded-xs"
                        style={{ fontSize: 13 }}
                        aria-label={`Calculate for ${s.state}`}
                      >
                        Calculate →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '14px 20px', backgroundColor: 'var(--canvas-soft)', borderTop: '1px solid var(--hairline)', fontSize: 13, color: 'var(--body)' }}>
          Showing {filtered.length} of {STATE_TAX_RATES.length} jurisdictions · Combined average rates · Rates verified 2026
        </div>
      </div>
      <p className="table-note" style={{ marginTop: 14, fontSize: 13, color: 'var(--body)', textAlign: 'center' }}>
        Combined average rates include state baseline and population-weighted municipal/district surtaxes. Source:{' '}
        <a href="https://taxfoundation.org" target="_blank" rel="noopener noreferrer" className="link-inline">
          Tax Foundation
        </a>.
      </p>
    </section>
  );
}
