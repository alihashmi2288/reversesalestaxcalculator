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
    <div className="calc-card">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="grid-responsive">
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Total Price Paid (with tax)</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input type="number" min="0" step="0.01" placeholder="107.50" value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }} className="calc-input with-prefix" />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
            {stateData.state} Tax Rate
          </label>
          <div className="input-wrapper">
            <input type="number" min="0" step="0.001" value={taxRate}
              onChange={(e) => { setTaxRate(e.target.value); setResult(null); }} className="calc-input with-suffix" />
            <span className="input-suffix">%</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Pre-filled with {stateData.state}&apos;s combined average rate</p>
        </div>
      </div>

      {error && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#dc2626', fontSize: 14, marginBottom: 16 }}>⚠️ {error}</div>}

      <button onClick={calculate} className="btn-primary" style={{ minHeight: 56, marginBottom: 20 }}>
        Calculate {stateData.state} Pre-Tax Price
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }} className="grid-results">
            <div className="result-card success">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', marginBottom: 8 }}>Pre-Tax Price</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#047857' }}>${fmt(result.preTaxPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', marginBottom: 8 }}>Tax Amount</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#dc2626' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card neutral">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: 8 }}>Total Paid</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#374151' }}>${fmt(result.totalPaid)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={copy} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>{copied ? '✓ Copied!' : 'Copy Results'}</button>
            <button onClick={reset} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>Reset</button>
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.grid-responsive{grid-template-columns:1fr!important}.grid-results{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
