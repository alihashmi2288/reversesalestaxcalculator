'use client';
import { useState } from 'react';
import { calculateReverseTax, fmt } from '@/lib/taxCalc';
import type { StateRate } from '@/data/stateTaxRates';

interface Props { stateData: StateRate; }

export default function StateCalculatorClient({ stateData }: Props) {
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

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${stateData.state} Tax Calculation\nTotal: $${fmt(result.totalPaid)}\nRate: ${result.taxRate}%\nPre-Tax: $${fmt(result.preTaxPrice)}\nTax: $${fmt(result.taxAmount)}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card" style={{ border: '2px solid var(--primary)', boxShadow: 'var(--shadow-solid-dark)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }} className="grid-responsive">
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--text-primary)' }}>
            Total Price Paid (with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              suppressHydrationWarning
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="107.50"
              value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--text-primary)' }}>
            {stateData.state} Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              suppressHydrationWarning
              type="number"
              inputMode="decimal"
              min="0"
              step="0.001"
              value={taxRate}
              onChange={(e) => { setTaxRate(e.target.value); setResult(null); }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix">%</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Pre-filled with {stateData.state}&apos;s combined average rate</p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#000', border: '2px solid #ef4444', borderRadius: 'var(--radius)', padding: '12px 16px', color: '#ef4444', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
          [ERROR] {error}
        </div>
      )}

      <button suppressHydrationWarning onClick={calculate} className="btn-primary" style={{ minHeight: 56, marginBottom: 24 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        Calculate {stateData.state} Pre-Tax Price
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }} className="grid-results">
            {/* Pre-Tax Price */}
            <div className="result-card success" style={{ background: 'var(--card-bg)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: 8 }}>
                ✓ Original Price (Pre-Tax)
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>Before tax was applied</div>
            </div>

            {/* Tax Amount */}
            <div className="result-card danger" style={{ background: 'var(--card-bg)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f87171', marginBottom: 8 }}>
                Tax Amount Paid
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#ef4444', lineHeight: 1 }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>{result.taxRate}% of pre-tax price</div>
            </div>

            {/* Total Paid */}
            <div className="result-card neutral" style={{ background: 'var(--card-bg)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#e4e4e7', marginBottom: 8 }}>
                Total Paid
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                ${fmt(result.totalPaid)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>Amount you entered</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button suppressHydrationWarning onClick={copy} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>
              {copied ? (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Copied!</>
              ) : (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Results</>
              )}
            </button>
            <button suppressHydrationWarning onClick={reset} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
          </div>

          {/* Formula reminder */}
          <div style={{ background: 'var(--bg)', border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: 13, color: 'var(--primary)', marginTop: 16, fontFamily: 'var(--font-mono)', wordBreak: 'break-word' }}>
            <strong>Calculation formula:</strong> ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.grid-responsive{grid-template-columns:1fr!important}.grid-results{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
