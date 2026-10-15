'use client';
import { useState } from 'react';
import { calculateReverseTax, fmt } from '@/lib/taxCalc';
import type { ProvinceRate } from '@/data/canadaTaxRates';

interface Props { provinceData: ProvinceRate; }

export default function CanadaCalculatorClient({ provinceData }: Props) {
  const [finalPrice, setFinalPrice] = useState('');
  const [taxRate, setTaxRate] = useState(String(provinceData.rate));
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

  const reset = () => { setFinalPrice(''); setTaxRate(String(provinceData.rate)); setResult(null); setError(''); };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Canada ${provinceData.name} Tax Calculation\nTotal: $${fmt(result.totalPaid)}\nRate: ${result.taxRate}%\nPre-Tax: $${fmt(result.preTaxPrice)}\nTax: $${fmt(result.taxAmount)}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }} className="grid-responsive">
        <div>
          <label htmlFor="ca-prov-final-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            Total Price Paid (CAD, with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="ca-prov-final-price"
              suppressHydrationWarning
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="113.00"
              aria-label={`Total Price Paid in ${provinceData.name} in CAD with tax`}
              value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
        </div>
        <div>
          <label htmlFor="ca-prov-tax-rate" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            {provinceData.name} Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              id="ca-prov-tax-rate"
              suppressHydrationWarning
              type="number"
              inputMode="decimal"
              min="0"
              step="0.001"
              aria-label={`${provinceData.name} tax rate percentage`}
              value={taxRate}
              onChange={(e) => { setTaxRate(e.target.value); setResult(null); }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
            Pre-filled with {provinceData.name}&apos;s {provinceData.type} rate
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {provinceData.gst > 0 && <span style={{ background: 'var(--mint-100)', border: '1px solid var(--mint-200)', color: 'var(--primary-deep)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700 }}>GST: {provinceData.gst}%</span>}
        {provinceData.pst > 0 && <span style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', color: 'var(--body)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700 }}>PST: {provinceData.pst}%</span>}
        {provinceData.hst > 0 && <span style={{ background: 'var(--mint-100)', border: '1px solid var(--mint-200)', color: 'var(--primary-deep)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700 }}>HST: {provinceData.hst}%</span>}
        <span style={{ background: 'var(--primary)', color: '#ffffff', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 800 }}>Combined: {provinceData.rate}%</span>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-xs)', padding: '12px 16px', color: '#991b1b', fontSize: 13, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⚠️</span> {error}
        </div>
      )}

      <button suppressHydrationWarning onClick={calculate} className="btn-primary" style={{ minHeight: 52, marginBottom: 24 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        Calculate {provinceData.name} Pre-Tax Price
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }} className="grid-results">
            {/* Pre-Tax Price */}
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)', marginBottom: 6 }}>
                Pre-Tax Subtotal
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary-deep)', lineHeight: 1.1, fontFamily: 'monospace' }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Excluding {provinceData.type}</div>
            </div>

            {/* Tax Amount */}
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#991b1b', marginBottom: 6 }}>
                Tax Portion Paid
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#b91c1c', lineHeight: 1.1, fontFamily: 'monospace' }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 12, color: '#991b1b', marginTop: 6 }}>Total GST/HST/PST paid</div>
            </div>

            {/* Total Paid */}
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 6 }}>
                Total Paid
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.1, fontFamily: 'monospace' }}>
                ${fmt(result.totalPaid)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Checkout inclusive total</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button suppressHydrationWarning onClick={copy} className="btn-secondary" style={{ flex: 1, minHeight: 44 }}>
              {copied ? (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Copied!</>
              ) : (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Results</>
              )}
            </button>
            <button suppressHydrationWarning onClick={reset} className="btn-secondary" style={{ flex: 1, minHeight: 44 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
          </div>

          {/* Formula reminder */}
          <div style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-xs)', padding: '12px 16px', fontSize: 13, color: 'var(--ink)', marginTop: 16, fontFamily: 'monospace', wordBreak: 'break-word' }}>
            <strong style={{ color: 'var(--primary-deep)' }}>Calculation formula:</strong> ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.grid-responsive{grid-template-columns:1fr!important}.grid-results{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
