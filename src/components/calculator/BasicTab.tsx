'use client';
import { useState, useCallback } from 'react';
import { calculateReverseTax, fmt, type BasicResult } from '@/lib/taxCalc';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

const QUICK_RATES = [6, 7, 8, 8.25, 8.875, 10];

export default function BasicTab() {
  const [finalPrice, setFinalPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState<BasicResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedQuick, setSelectedQuick] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState('');

  const handleQuickRate = (rate: number) => {
    setTaxRate(String(rate));
    setSelectedQuick(rate);
    setSelectedState('');
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedState(val);
    if (val) {
      const found = STATE_TAX_RATES.find((s) => s.abbreviation === val);
      if (found) {
        setTaxRate(String(found.rate));
        setSelectedQuick(null);
      }
    }
  };

  const calculate = useCallback(() => {
    setError('');
    const price = parseFloat(finalPrice.replace(/[^0-9.]/g, ''));
    const rate = parseFloat(taxRate.replace(/[^0-9.]/g, ''));
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid final price greater than 0.');
      return;
    }
    if (isNaN(rate) || rate < 0) {
      setError('Please enter a valid tax rate (0 or above).');
      return;
    }
    try {
      setResult(calculateReverseTax(price, rate));
    } catch (e) {
      setError((e as Error).message);
    }
  }, [finalPrice, taxRate]);

  const reset = () => {
    setFinalPrice('');
    setTaxRate('');
    setResult(null);
    setError('');
    setCopied(false);
    setSelectedQuick(null);
    setSelectedState('');
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Reverse Tax Calculation\nFinal Price: $${fmt(result.totalPaid)}\nTax Rate: ${result.taxRate}%\nPre-Tax Price: $${fmt(result.preTaxPrice)}\nTax Amount: $${fmt(result.taxAmount)}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="grid-responsive">
        {/* Final Price */}
        <div>
          <label htmlFor="basic-final-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            Total Price Paid (with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="basic-final-price"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="107.50"
              aria-label="Total Price Paid with tax in dollars"
              value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
        </div>

        {/* Tax Rate */}
        <div>
          <label htmlFor="basic-tax-rate" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              id="basic-tax-rate"
              type="number"
              inputMode="decimal"
              min="0"
              max="99"
              step="0.001"
              placeholder="8.25"
              aria-label="Sales Tax Rate percentage"
              value={taxRate}
              onChange={(e) => { setTaxRate(e.target.value); setResult(null); setSelectedQuick(null); setSelectedState(''); }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
        </div>
      </div>

      {/* Quick Rates */}
      <div role="group" aria-label="Quick Select Rate">
        <div style={{ display: 'block', fontWeight: 700, fontSize: 11, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Quick Select Rate
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {QUICK_RATES.map((r) => (
            <button key={r} onClick={() => handleQuickRate(r)} className={`quick-btn ${selectedQuick === r ? 'active' : ''}`} aria-label={`Set tax rate to ${r}%`}>
              {r}%
            </button>
          ))}
        </div>
      </div>

      {/* State Dropdown */}
      <div>
        <label htmlFor="basic-state-select" style={{ display: 'block', fontWeight: 700, fontSize: 11, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Or Select US State (auto-fills combined rate)
        </label>
        <select
          id="basic-state-select"
          aria-label="Select US State for combined sales tax rate"
          className="state-select"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">— Select a State —</option>
          {STATE_TAX_RATES.slice().sort((a, b) => a.state.localeCompare(b.state)).map((s) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.state} — {s.rate}%{s.notes ? ` (${s.notes})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div style={{ backgroundColor: '#fff1f1', border: '1px solid #ffd8d8', borderRadius: 'var(--radius-xs)', padding: '12px 16px', color: 'var(--error)', fontSize: 13, fontWeight: 600 }}>
          {error}
        </div>
      )}

      {/* CTA Button */}
      <button id="basic-calculate-btn" onClick={calculate} className="btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        Calculate Pre-Tax Price
      </button>

      {/* Results */}
      {result && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }} className="grid-results">
            {/* Pre-Tax Original Price */}
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-deep)', marginBottom: 6 }}>
                ✓ Original Price
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>Pre-tax item cost</div>
            </div>

            {/* Tax Amount */}
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--error)', marginBottom: 6 }}>
                Tax Amount
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--error)', lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>{result.taxRate}% sales tax</div>
            </div>

            {/* Total Paid */}
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>
                Total Paid
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.totalPaid)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>Receipt total</div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={copyToClipboard} className="btn-secondary" style={{ flex: 1 }}>
              {copied ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{ color: 'var(--primary)' }}>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  Copy Results
                </>
              )}
            </button>
            <button onClick={reset} className="btn-secondary" style={{ flex: 1 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
          </div>

          {/* Formula reminder */}
          <div style={{ backgroundColor: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-xs)', padding: '12px 16px', fontSize: 13, color: 'var(--primary-deep)', marginTop: 14, fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            <strong>Formula:</strong> ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}
    </div>
  );
}
