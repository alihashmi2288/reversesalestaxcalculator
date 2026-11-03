'use client';
import { useState } from 'react';
import { findTaxRate, fmt, type FindRateResult } from '@/lib/taxCalc';

export default function FindTaxRateTab() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [result, setResult] = useState<FindRateResult | null>(null);
  const [error, setError] = useState('');
  const [announcement, setAnnouncement] = useState('');

  const calculate = () => {
    setError('');
    const orig = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
    const final = parseFloat(finalPrice.replace(/[^0-9.]/g, ''));
    if (isNaN(orig) || orig <= 0) {
      setError('Please enter a valid original price.');
      return;
    }
    if (isNaN(final) || final <= 0) {
      setError('Please enter a valid final price.');
      return;
    }
    if (final < orig) {
      setError('Final price must be greater than or equal to original price.');
      return;
    }
    try {
      const res = findTaxRate(orig, final);
      setResult(res);
      setAnnouncement(`Tax rate identified: ${res.taxRate.toFixed(3)}%. Pre-tax price: $${fmt(res.originalPrice)}, sales tax: $${fmt(res.taxAmount)}, final total: $${fmt(res.finalPrice)}.`);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const reset = () => {
    setOriginalPrice('');
    setFinalPrice('');
    setResult(null);
    setError('');
    setAnnouncement('Find Tax Rate form reset.');
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); calculate(); }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Persistent live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <p style={{ color: 'var(--body)', fontSize: 14, margin: 0 }}>
        Know the pre-tax and final receipt totals? Discover the exact sales tax rate that was charged.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="grid-responsive">
        <div>
          <label htmlFor="find-rate-original" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            Original Price (before tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="find-rate-original"
              name="originalPrice"
              autoComplete="off"
              type="number"
              min="0"
              step="0.01"
              placeholder="100.00"
              aria-label="Original Price before tax in dollars"
              value={originalPrice}
              onChange={(e) => { setOriginalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
        </div>
        <div>
          <label htmlFor="find-rate-final" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            Final Price (with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="find-rate-final"
              name="finalPrice"
              autoComplete="off"
              type="number"
              min="0"
              step="0.01"
              placeholder="108.25"
              aria-label="Final Price with tax in dollars"
              value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
        </div>
      </div>

      {error && (
        <div role="alert" aria-live="assertive" style={{ backgroundColor: '#fff1f1', border: '1px solid #ffd8d8', borderRadius: 'var(--radius-xs)', padding: '12px 16px', color: 'var(--error)', fontSize: 13, fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button id="find-rate-calc-btn" type="submit" className="btn-primary" style={{ flex: 1 }}>
          Find Tax Rate
        </button>
        <button type="button" onClick={reset} className="btn-secondary">
          Reset
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 8 }} aria-live="polite">
          {/* Main Rate Feature Card */}
          <div style={{ backgroundColor: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-deep)', marginBottom: 6 }}>
              ✓ Implied Sales Tax Rate
            </div>
            <div className="tabular-nums" style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
              {result.taxRate.toFixed(3)}%
            </div>
            <div className="tabular-nums" style={{ fontSize: 13, color: 'var(--body)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
              ${fmt(result.taxAmount)} added in sales tax
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="grid-results">
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>Original Price</div>
              <div className="tabular-nums" style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>${fmt(result.originalPrice)}</div>
            </div>
            <div className="result-card" style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', color: 'var(--ink)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>Tax Amount</div>
              <div className="tabular-nums" style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-deep)', marginBottom: 6 }}>Total Paid</div>
              <div className="tabular-nums" style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>${fmt(result.finalPrice)}</div>
            </div>
          </div>

          {/* Clean Dual-Segment Proportion Indicator */}
          {(() => {
            const preTaxPct = (result.originalPrice / result.finalPrice) * 100;
            const taxPct = (result.taxAmount / result.finalPrice) * 100;
            return (
              <div style={{ backgroundColor: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '16px 20px', marginTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, fontSize: 12, fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--primary)', display: 'inline-block' }} aria-hidden="true" />
                    <span style={{ color: 'var(--ink)' }}>Pre-tax Cost:</span>
                    <span className="tabular-nums" style={{ color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>{preTaxPct.toFixed(1)}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--forest)', display: 'inline-block' }} aria-hidden="true" />
                    <span style={{ color: 'var(--ink)' }}>Tax:</span>
                    <span className="tabular-nums" style={{ color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>{taxPct.toFixed(1)}%</span>
                  </div>
                </div>
                <div
                  role="progressbar"
                  aria-label={`Proportion of pre-tax cost (${preTaxPct.toFixed(1)}%) vs sales tax (${taxPct.toFixed(1)}%)`}
                  aria-valuenow={Math.round(preTaxPct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ height: 10, backgroundColor: 'var(--hairline-strong)', borderRadius: 'var(--radius-full)', overflow: 'hidden', display: 'flex' }}
                >
                  <div
                    style={{
                      width: `${preTaxPct}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary)',
                      transition: 'width 0.3s ease',
                    }}
                    title={`Pre-tax: ${preTaxPct.toFixed(1)}%`}
                  />
                  <div
                    style={{
                      width: `${taxPct}%`,
                      height: '100%',
                      backgroundColor: 'var(--forest)',
                      transition: 'width 0.3s ease',
                    }}
                    title={`Tax: ${taxPct.toFixed(1)}%`}
                  />
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </form>
  );
}
