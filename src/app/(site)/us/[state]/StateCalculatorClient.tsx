'use client';
import { useState } from 'react';
import { calculateReverseTax, fmt } from '@/lib/taxCalc';
import type { StateRate } from '@/data/stateTaxRates';

interface Props { 
  stateData: StateRate; 
  rateNote?: string;
}

export default function StateCalculatorClient({ stateData, rateNote }: Props) {
  const [finalPrice, setFinalPrice] = useState('');
  const [taxRate, setTaxRate] = useState(String(stateData.rate));
  const [result, setResult] = useState<ReturnType<typeof calculateReverseTax> | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    setError('');
    const price = parseFloat(finalPrice);
    const rate = parseFloat(taxRate);
    if (isNaN(price) || price <= 0) { setError('Enter a valid price.'); return; }
    if (isNaN(rate) || rate < 0) { setError('Enter a valid tax rate.'); return; }
    try { setResult(calculateReverseTax(price, rate)); } catch (e) { setError((e as Error).message); }
  };

  const reset = () => { setFinalPrice(''); setTaxRate(String(stateData.rate)); setResult(null); setError(''); };

  const copy = async () => {
    if (!result) return;
    const text = `${stateData.state} Tax Calculation\nTotal: $${fmt(result.totalPaid)}\nRate: ${result.taxRate}%\nPre-Tax: $${fmt(result.preTaxPrice)}\nTax: $${fmt(result.taxAmount)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="calc-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 24 }}>
        <div>
          <label htmlFor="state-final-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            Total Price Paid (with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="state-final-price"
              name="finalPrice"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="107.50"
              aria-label={`Total Price Paid in ${stateData.state} with tax in dollars`}
              value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
        </div>
        <div>
          <label htmlFor="state-tax-rate" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            {stateData.state} Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              id="state-tax-rate"
              name="taxRate"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.001"
              aria-label={`${stateData.state} sales tax rate percentage`}
              value={taxRate}
              onChange={(e) => { setTaxRate(e.target.value); setResult(null); }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
            {rateNote || `Pre-filled with ${stateData.state}'s combined average rate`}
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            background: 'var(--canvas-soft)',
            border: '1px solid var(--error)',
            borderRadius: 'var(--radius-xs)',
            padding: '12px 16px',
            color: 'var(--error)',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <button type="submit" className="btn-primary" style={{ minHeight: 52, marginBottom: 24 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        Calculate {stateData.state} Pre-Tax Price
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }} aria-live="polite">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            {/* Pre-Tax Price */}
            <div className="result-card success" style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)', marginBottom: 8 }}>
                ✓ Original Price (Pre-Tax)
              </div>
              <div className="tabular-nums" style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary-deep)', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 8 }}>Before tax was applied</div>
            </div>

            {/* Tax Amount */}
            <div className="result-card" style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 8 }}>
                Tax Amount Paid
              </div>
              <div className="tabular-nums" style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary-deep)', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 8 }}>{result.taxRate}% of pre-tax price</div>
            </div>

            {/* Total Paid */}
            <div className="result-card neutral" style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 8 }}>
                Total Paid
              </div>
              <div className="tabular-nums" style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.totalPaid)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 8 }}>Amount you entered</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={copy}
              className="btn-secondary"
              style={{ flex: '1 1 180px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              aria-label={`Copy ${stateData.state} calculation results to clipboard`}
            >
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  <span>Copy Results</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={reset}
              className="btn-secondary"
              style={{ flex: '1 1 180px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              aria-label="Reset calculator inputs"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              <span>Reset</span>
            </button>
          </div>

          {/* Formula reminder */}
          <div style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', fontSize: 13, color: 'var(--primary-deep)', marginTop: 16, fontFamily: 'var(--font-mono)', wordBreak: 'break-word' }}>
            <strong>Calculation formula:</strong> ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}
    </form>
  );
}
