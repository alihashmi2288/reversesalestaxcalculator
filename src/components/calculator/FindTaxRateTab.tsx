'use client';
import { useState } from 'react';
import { findTaxRate, parseNumberSafe, fmt, type FindRateResult } from '@/lib/taxCalc';

export default function FindTaxRateTab() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [expectedRate, setExpectedRate] = useState('');
  const [result, setResult] = useState<FindRateResult | null>(null);
  const [error, setError] = useState('');
  const [announcement, setAnnouncement] = useState('');

  const calculate = () => {
    setError('');
    const orig = parseNumberSafe(originalPrice);
    const final = parseNumberSafe(finalPrice);
    const exp = expectedRate.trim() ? parseNumberSafe(expectedRate) : undefined;

    if (isNaN(orig) || orig <= 0) {
      setError('Please enter a valid original price greater than $0.00.');
      return;
    }
    if (isNaN(final) || final <= 0) {
      setError('Please enter a valid final price greater than $0.00.');
      return;
    }
    if (final < orig) {
      setError('Final price must be greater than or equal to original price.');
      return;
    }
    if (exp !== undefined && (isNaN(exp) || exp < 0 || exp > 100)) {
      setError('Expected rate must be between 0% and 100%.');
      return;
    }

    try {
      const res = findTaxRate(orig, final, exp);
      setResult(res);

      let msg = `Tax rate identified: ${res.taxRate.toFixed(3)}%. Pre-tax price: $${fmt(res.originalPrice)}, sales tax: $${fmt(res.taxAmount)}, final total: $${fmt(res.finalPrice)}.`;
      if (res.rateComparison) {
        msg += ` ${res.rateComparison.description}.`;
      }
      setAnnouncement(msg);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const reset = () => {
    setOriginalPrice('');
    setFinalPrice('');
    setExpectedRate('');
    setResult(null);
    setError('');
    setAnnouncement('Find tax rate form reset.');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        calculate();
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Persistent live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <p style={{ color: 'var(--body)', fontSize: 14, margin: 0, lineHeight: 1.5 }}>
        Know the pre-tax and final receipt totals? Discover the exact sales tax rate charged on your receipt and check whether it matches what you expected.
      </p>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {/* Original Price */}
        <div>
          <label
            htmlFor="find-rate-original"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'none',
              letterSpacing: '0.02em',
              marginBottom: 8,
              color: 'var(--ink)',
            }}
          >
            Original price (before tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="find-rate-original"
              name="originalPrice"
              autoComplete="off"
              type="text"
              inputMode="decimal"
              placeholder="100.00"
              aria-label="Original price before tax in dollars"
              aria-invalid={!!error}
              aria-describedby={error ? 'find-rate-error' : undefined}
              value={originalPrice}
              onChange={(e) => {
                setOriginalPrice(e.target.value);
                setResult(null);
              }}
              className="calc-input with-prefix"
            />
          </div>
        </div>

        {/* Final Price */}
        <div>
          <label
            htmlFor="find-rate-final"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'none',
              letterSpacing: '0.02em',
              marginBottom: 8,
              color: 'var(--ink)',
            }}
          >
            Final price paid (with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="find-rate-final"
              name="finalPrice"
              autoComplete="off"
              type="text"
              inputMode="decimal"
              placeholder="108.25"
              aria-label="Final price with tax in dollars"
              aria-invalid={!!error}
              aria-describedby={error ? 'find-rate-error' : undefined}
              value={finalPrice}
              onChange={(e) => {
                setFinalPrice(e.target.value);
                setResult(null);
              }}
              className="calc-input with-prefix"
            />
          </div>
        </div>

        {/* Optional: Expected Rate (Receipt Checker) */}
        <div>
          <label
            htmlFor="find-rate-expected"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'none',
              letterSpacing: '0.02em',
              marginBottom: 8,
              color: 'var(--body)',
            }}
          >
            Rate I expected (optional)
          </label>
          <div className="input-wrapper">
            <input
              id="find-rate-expected"
              name="expectedRate"
              autoComplete="off"
              type="text"
              inputMode="decimal"
              placeholder="8.25"
              aria-label="Rate I expected percentage"
              value={expectedRate}
              onChange={(e) => {
                setExpectedRate(e.target.value);
                setResult(null);
              }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
        </div>
      </div>

      {/* Error Announcement */}
      {error && (
        <div
          id="find-rate-error"
          role="alert"
          aria-live="assertive"
          style={{
            backgroundColor: 'var(--error-bg)',
            border: '1px solid var(--error-border)',
            borderRadius: 'var(--radius-xs)',
            padding: '12px 16px',
            color: 'var(--error)',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Button Row */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button id="find-rate-calc-btn" type="submit" className="btn-primary" style={{ flex: 1, minHeight: 44 }}>
          Find tax rate
        </button>
        <button type="button" onClick={reset} className="btn-secondary" style={{ minHeight: 44 }}>
          Reset
        </button>
      </div>

      {/* Results View */}
      {result && (
        <div role="status" aria-live="polite" aria-atomic="true" style={{ marginTop: 8 }}>
          {/* Main Rate Feature Card */}
          <div
            style={{
              backgroundColor: 'var(--mint-50)',
              border: '1px solid var(--mint-200)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px 20px',
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'none',
                letterSpacing: '0.02em',
                color: 'var(--primary-deep)',
                marginBottom: 6,
              }}
            >
              <span aria-hidden="true">✓ </span>Implied sales tax rate
            </div>
            <div
              className="tabular-nums"
              style={{
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1.1,
                fontFamily: 'var(--font-mono)',
                color: 'var(--primary)',
              }}
            >
              {result.taxRate.toFixed(3)}%
            </div>
            <div className="tabular-nums" style={{ fontSize: 13, color: 'var(--body)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
              ${fmt(result.taxAmount)} added in sales tax
            </div>
          </div>

          {/* Section 3c: Receipt Checker Comparison Callout */}
          {result.rateComparison && (
            <div
              style={{
                backgroundColor: result.rateComparison.matches ? 'var(--mint-50)' : '#fff8f0',
                border: result.rateComparison.matches ? '1px solid var(--mint-200)' : '1px solid #ffd8a8',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  color: result.rateComparison.matches ? 'var(--primary)' : '#d9480f',
                  fontWeight: 800,
                }}
                aria-hidden="true"
              >
                {result.rateComparison.matches ? '✓' : '⚠️'}
              </span>
              <div>
                <strong style={{ color: result.rateComparison.matches ? 'var(--primary-deep)' : '#d9480f', fontSize: 14 }}>
                  {result.rateComparison.matches ? 'Matches expected rate' : 'Rate difference detected'}
                </strong>
                <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 2 }}>
                  {result.rateComparison.description}
                </div>
              </div>
            </div>
          )}

          {/* 3 Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="grid-results">
            <div className="result-card neutral">
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--body)', marginBottom: 6 }}>Original price</div>
              <div className="tabular-nums" style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.originalPrice)}
              </div>
            </div>
            <div className="result-card" style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', color: 'var(--ink)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--body)', marginBottom: 6 }}>Tax amount</div>
              <div className="tabular-nums" style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.taxAmount)}
              </div>
            </div>
            <div className="result-card success">
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-deep)', marginBottom: 6 }}>Total paid</div>
              <div className="tabular-nums" style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.finalPrice)}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
