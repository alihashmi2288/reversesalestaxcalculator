'use client';
import { useState } from 'react';
import { findTaxRate, fmt, type FindRateResult } from '@/lib/taxCalc';

export default function FindTaxRateTab() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [result, setResult] = useState<FindRateResult | null>(null);
  const [error, setError] = useState('');

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
      setResult(findTaxRate(orig, final));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const reset = () => {
    setOriginalPrice('');
    setFinalPrice('');
    setResult(null);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        <div style={{ backgroundColor: '#fff1f1', border: '1px solid #ffd8d8', borderRadius: 'var(--radius-xs)', padding: '12px 16px', color: 'var(--error)', fontSize: 13, fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button id="find-rate-calc-btn" onClick={calculate} className="btn-primary" style={{ flex: 1 }}>
          Find Tax Rate
        </button>
        <button onClick={reset} className="btn-secondary">
          Reset
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 8 }}>
          {/* Main Rate Feature Card */}
          <div style={{ backgroundColor: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-deep)', marginBottom: 6 }}>
              ✓ Implied Sales Tax Rate
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
              {result.taxRate.toFixed(3)}%
            </div>
            <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
              ${fmt(result.taxAmount)} added in sales tax
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="grid-results">
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>Original Price</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>${fmt(result.originalPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--error)', marginBottom: 6 }}>Tax Amount</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--error)', fontFamily: 'var(--font-mono)' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-deep)', marginBottom: 6 }}>Total Paid</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>${fmt(result.finalPrice)}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '14px 18px', marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, fontWeight: 600, color: 'var(--body)', fontFamily: 'var(--font-mono)' }}>
              <span>Pre-tax: {((result.originalPrice / result.finalPrice) * 100).toFixed(1)}%</span>
              <span>Tax: {((result.taxAmount / result.finalPrice) * 100).toFixed(1)}%</span>
            </div>
            <div style={{ height: 8, backgroundColor: 'var(--hairline-strong)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(result.originalPrice / result.finalPrice) * 100}%`, backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-full)' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
