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
    if (isNaN(price) || price <= 0) { setError('Please enter a valid final price greater than 0.'); return; }
    if (isNaN(rate) || rate < 0) { setError('Please enter a valid tax rate (0 or above).'); return; }
    try {
      setResult(calculateReverseTax(price, rate));
    } catch (e) {
      setError((e as Error).message);
    }
  }, [finalPrice, taxRate]);

  const reset = () => {
    setFinalPrice(''); setTaxRate(''); setResult(null);
    setError(''); setCopied(false); setSelectedQuick(null); setSelectedState('');
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
          <label style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>
            Total Price Paid (with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              id="basic-final-price"
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

        {/* Tax Rate */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>
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
              value={taxRate}
              onChange={(e) => { setTaxRate(e.target.value); setResult(null); setSelectedQuick(null); setSelectedState(''); }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix">%</span>
          </div>
        </div>
      </div>

      {/* Quick Rates */}
      <div>
        <label style={{ display: 'block', fontWeight: 800, fontSize: 11, marginBottom: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Quick Select Rate
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {QUICK_RATES.map((r) => (
            <button key={r} onClick={() => handleQuickRate(r)} className={`quick-btn ${selectedQuick === r ? 'active' : ''}`}>
              {r}%
            </button>
          ))}
        </div>
      </div>

      {/* State Dropdown */}
      <div>
        <label style={{ display: 'block', fontWeight: 800, fontSize: 11, marginBottom: 8, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Or Select US State (auto-fills combined rate)
        </label>
        <select id="basic-state-select" className="state-select" value={selectedState} onChange={handleStateChange}>
          <option value="">— Select a State —</option>
          {STATE_TAX_RATES.sort((a, b) => a.state.localeCompare(b.state)).map((s) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.state} — {s.rate}%{s.notes ? ` (${s.notes})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius)', padding: '14px 18px', color: '#f87171', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
          [ERROR] {error}
        </div>
      )}

      {/* CTA */}
      <button id="basic-calculate-btn" onClick={calculate} className="btn-primary" style={{ minHeight: 56 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        Calculate Pre-Tax Price
      </button>

      {/* Results */}
      {result && (
        <div style={{ animation: 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)', marginTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }} className="grid-results">
            {/* Pre-Tax */}
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', marginBottom: 8 }}>
                ✓ Original Price
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>Pre-tax item value</div>
            </div>

            {/* Tax Amount */}
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f87171', marginBottom: 8 }}>
                Tax Amount
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#ef4444', lineHeight: 1 }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>{result.taxRate}% sales tax</div>
            </div>

            {/* Total */}
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e4e4e7', marginBottom: 8 }}>
                Total Paid
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                ${fmt(result.totalPaid)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>Receipt total</div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={copyToClipboard} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>
              {copied ? (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> <span style={{ color: 'var(--primary)' }}>Copied!</span></>
              ) : (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Results</>
              )}
            </button>
            <button onClick={reset} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
          </div>

          {/* Formula reminder */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '14px 18px', fontSize: 13, color: 'var(--primary)', marginTop: 16, fontFamily: 'var(--font-mono)', wordBreak: 'break-word', textAlign: 'center' }}>
            <strong>Calculation:</strong> ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}

    </div>
  );
}
