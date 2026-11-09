'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { STATE_TAX_RATES, type StateRate } from '@/data/stateTaxRates';
import { parseNumberSafe, fmt } from '@/lib/taxCalc';

const SORTED_STATES = STATE_TAX_RATES.slice().sort((a, b) => a.state.localeCompare(b.state));

type SortField = 'state' | 'abbreviation' | 'stateRate' | 'avgLocalRate' | 'rate';
type SortOrder = 'asc' | 'desc';

export default function StateTable() {
  const [search, setSearch] = useState('');
  const [compareAmount, setCompareAmount] = useState('');
  const [compareMode, setCompareMode] = useState<'reverse' | 'forward'>('reverse');
  const [sortField, setSortField] = useState<SortField>('state');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const query = search.trim().toLowerCase();
  const numAmount = parseNumberSafe(compareAmount);
  const hasCompareAmount = !isNaN(numAmount) && numAmount > 0;

  const processedStates = useMemo(() => {
    let list = SORTED_STATES;
    if (query) {
      list = list.filter(
        (s) =>
          s.state.toLowerCase().includes(query) ||
          s.abbreviation.toLowerCase().includes(query)
      );
    }

    if (sortField !== 'state' || sortOrder !== 'asc') {
      list = [...list].sort((a: StateRate, b: StateRate) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortOrder === 'asc' ? (Number(valA) - Number(valB)) : (Number(valB) - Number(valA));
      });
    }

    return list;
  }, [query, sortField, sortOrder]);

  const getAriaSort = (field: SortField) => {
    if (sortField !== field) return 'none';
    return sortOrder === 'asc' ? 'ascending' : 'descending';
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return ' ↕';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <section>
      <div style={{ textAlign: 'left', marginBottom: 28 }}>
        <span className="section-label">State Tax Reference</span>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: 'var(--ink)', margin: '10px 0 14px' }}>
          2026 Reverse Sales Tax Rates by State
        </h2>
        <p style={{ fontSize: 16, color: 'var(--body)', maxWidth: 720, margin: '0 0 24px' }}>
          Combined average statutory rates (state + local). Select any state to pre-fill its rate directly in the calculator.
        </p>

        {/* Filter & Compare Controls */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end', maxWidth: 840 }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <label htmlFor="state-search" className="sr-only">
              Filter by state or abbreviation
            </label>
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
              aria-label="Filter US state sales tax rates"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="calc-input"
              style={{
                width: '100%',
                height: 44,
                padding: search ? '10px 38px 10px 40px' : '10px 16px 10px 40px',
                fontSize: 14,
                fontFamily: 'var(--font-sans)',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear filter"
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Section 3e: Compare States Amount Box & Mode Toggle */}
          <div style={{ flex: '1 1 340px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <label htmlFor="compare-amount-input" className="sr-only">
                Compare price across states
              </label>
              <div className="input-wrapper" style={{ width: '100%' }}>
                <span className="input-prefix" aria-hidden="true">$</span>
                <input
                  id="compare-amount-input"
                  name="compareAmount"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={compareMode === 'reverse' ? 'Compare total (e.g. 100)' : 'Compare base (e.g. 100)'}
                  aria-label="Compare price across all states in dollars"
                  value={compareAmount}
                  onChange={(e) => setCompareAmount(e.target.value)}
                  className="calc-input with-prefix"
                  style={{
                    width: '100%',
                    height: 44,
                    paddingLeft: 30,
                    paddingRight: compareAmount ? 36 : 14,
                    fontSize: 14,
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                {compareAmount && (
                  <button
                    type="button"
                    onClick={() => setCompareAmount('')}
                    aria-label="Clear compare amount"
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--muted)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div
              role="radiogroup"
              aria-label="Compare mode"
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--canvas-soft)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--radius-xs)',
                padding: 2,
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                role="radio"
                aria-checked={compareMode === 'reverse'}
                onClick={() => setCompareMode('reverse')}
                style={{
                  padding: '6px 10px',
                  fontSize: 12,
                  fontWeight: compareMode === 'reverse' ? 700 : 500,
                  backgroundColor: compareMode === 'reverse' ? 'var(--canvas)' : 'transparent',
                  color: compareMode === 'reverse' ? 'var(--primary-deep)' : 'var(--body)',
                  border: compareMode === 'reverse' ? '1px solid var(--primary)' : '1px solid transparent',
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                  minHeight: 38,
                }}
              >
                Reverse
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={compareMode === 'forward'}
                onClick={() => setCompareMode('forward')}
                style={{
                  padding: '6px 10px',
                  fontSize: 12,
                  fontWeight: compareMode === 'forward' ? 700 : 500,
                  backgroundColor: compareMode === 'forward' ? 'var(--canvas)' : 'transparent',
                  color: compareMode === 'forward' ? 'var(--primary-deep)' : 'var(--body)',
                  border: compareMode === 'forward' ? '1px solid var(--primary)' : '1px solid transparent',
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                  minHeight: 38,
                }}
              >
                Forward
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        <div
          tabIndex={0}
          role="region"
          aria-label="State sales tax rates table"
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxHeight: 620, overflowY: 'auto' }}
        >
          <table className="data-table" style={{ tableLayout: 'fixed', minWidth: 760, width: '100%' }}>
            <caption className="sr-only">
              2026 US State and Local Sales Tax Rates and Reverse Multipliers
            </caption>
            <thead>
              <tr>
                <th scope="col" aria-sort={getAriaSort('state')} style={{ width: '22%', textAlign: 'left' }}>
                  <button
                    type="button"
                    onClick={() => handleSort('state')}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center' }}
                  >
                    State{getSortIcon('state')}
                  </button>
                </th>
                <th scope="col" aria-sort={getAriaSort('abbreviation')} style={{ width: '10%', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleSort('abbreviation')}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center' }}
                  >
                    Abbr.{getSortIcon('abbreviation')}
                  </button>
                </th>
                <th scope="col" aria-sort={getAriaSort('stateRate')} className="header-num" style={{ width: '14%' }}>
                  <button
                    type="button"
                    onClick={() => handleSort('stateRate')}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}
                  >
                    State Base{getSortIcon('stateRate')}
                  </button>
                </th>
                <th scope="col" aria-sort={getAriaSort('avgLocalRate')} className="header-num" style={{ width: '14%' }}>
                  <button
                    type="button"
                    onClick={() => handleSort('avgLocalRate')}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}
                  >
                    Avg Local{getSortIcon('avgLocalRate')}
                  </button>
                </th>
                <th scope="col" aria-sort={getAriaSort('rate')} className="header-num" style={{ width: '18%' }}>
                  <button
                    type="button"
                    onClick={() => handleSort('rate')}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}
                  >
                    Combined Average{getSortIcon('rate')}
                  </button>
                </th>
                <th scope="col" className="header-num" style={{ width: '22%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {processedStates.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--body)', fontSize: 14 }}>
                    No states match your filter.{' '}
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      aria-label="Clear filter"
                      className="link-green"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                    >
                      Clear filter
                    </button>
                  </td>
                </tr>
              ) : (
                processedStates.map((s) => {
                  const calculatedReversePreTax = hasCompareAmount && compareMode === 'reverse' ? numAmount / (1 + s.rate / 100) : null;
                  const calculatedForwardTax = hasCompareAmount && compareMode === 'forward' ? numAmount * (s.rate / 100) : null;
                  const calculatedForwardTotal = hasCompareAmount && compareMode === 'forward' ? numAmount + (calculatedForwardTax || 0) : null;
                  return (
                    <tr key={s.abbreviation}>
                      <th scope="row">
                        <Link
                          href={`/us/${s.state.toLowerCase().replace(/\s+/g, '-')}`}
                          className="state-table-link hover:underline focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
                          style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 600 }}
                          title={`View ${s.state} reverse sales tax rates and calculator`}
                        >
                          {s.state}
                        </Link>
                      </th>
                      <td style={{ textAlign: 'center' }}>
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
                      <td className="cell-num">
                        {s.stateRate === 0 ? <span style={{ color: 'var(--primary)', fontWeight: 600 }}>0% (None)</span> : `${s.stateRate}%`}
                      </td>
                      <td className="cell-num" style={{ color: 'var(--ink)' }}>
                        {s.avgLocalRate > 0 ? `${s.avgLocalRate.toFixed(2)}%` : '—'}
                      </td>
                      <td className="cell-num">
                        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>
                          {s.rate === 0 ? '0%' : `${s.rate}%`}
                        </span>
                        {s.notes && (
                          <span
                            style={{
                              marginLeft: 8,
                              backgroundColor: 'var(--canvas-soft)',
                              color: 'var(--body)',
                              border: '1px solid var(--hairline-strong)',
                              fontSize: 12,
                              padding: '2px 6px',
                              borderRadius: 'var(--radius-xs)',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {s.notes}
                          </span>
                        )}
                        {calculatedReversePreTax !== null && (
                          <div style={{ fontSize: 13, color: 'var(--primary-deep)', fontWeight: 700, marginTop: 4 }}>
                            Pre-tax: ${fmt(calculatedReversePreTax)}
                          </div>
                        )}
                        {calculatedForwardTax !== null && calculatedForwardTotal !== null && (
                          <div style={{ fontSize: 12, color: 'var(--primary-deep)', fontWeight: 700, marginTop: 4 }}>
                            Tax: ${fmt(calculatedForwardTax)} · Total: ${fmt(calculatedForwardTotal)}
                          </div>
                        )}
                      </td>
                      <td className="cell-num">
                        <Link
                          href={`/us/${s.state.toLowerCase().replace(/\s+/g, '-')}`}
                          className="table-action-link focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
                          aria-label={`Calculate ${s.state} reverse sales tax`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Calculate {s.state} Tax →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div aria-live="polite" style={{ padding: '14px 20px', backgroundColor: 'var(--canvas-soft)', borderTop: '1px solid var(--hairline)', fontSize: 13, color: 'var(--body)' }}>
          Showing {processedStates.length} of {STATE_TAX_RATES.length} jurisdictions · Combined average rates · Rates verified 2026
        </div>
      </div>
      <p className="table-note" style={{ marginTop: 14, fontSize: 13, color: 'var(--body)', textAlign: 'left' }}>
        Combined average rates include state baseline and population-weighted municipal/district surtaxes. Source:{' '}
        <a href="https://taxfoundation.org" target="_blank" rel="noopener noreferrer" className="link-inline" style={{ textDecoration: 'underline' }}>
          Tax Foundation
        </a>.
      </p>
    </section>
  );
}
