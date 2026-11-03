'use client';
import { useState } from 'react';
import { calculateReverseTax, fmt } from '@/lib/taxCalc';

const CA_PROVINCES = [
  { name: 'Alberta', abbr: 'AB', gst: 5, pst: 0, hst: 0, total: 5 },
  { name: 'British Columbia', abbr: 'BC', gst: 5, pst: 7, hst: 0, total: 12 },
  { name: 'Manitoba', abbr: 'MB', gst: 5, pst: 7, hst: 0, total: 12 },
  { name: 'New Brunswick', abbr: 'NB', gst: 0, pst: 0, hst: 15, total: 15 },
  { name: 'Newfoundland', abbr: 'NL', gst: 0, pst: 0, hst: 15, total: 15 },
  { name: 'Nova Scotia', abbr: 'NS', gst: 0, pst: 0, hst: 15, total: 15 },
  { name: 'Ontario', abbr: 'ON', gst: 0, pst: 0, hst: 13, total: 13 },
  { name: 'PEI', abbr: 'PE', gst: 0, pst: 0, hst: 15, total: 15 },
  { name: 'Quebec', abbr: 'QC', gst: 5, pst: 9.975, hst: 0, total: 14.975 },
  { name: 'Saskatchewan', abbr: 'SK', gst: 5, pst: 6, hst: 0, total: 11 },
  { name: 'Northwest Territories', abbr: 'NT', gst: 5, pst: 0, hst: 0, total: 5 },
  { name: 'Nunavut', abbr: 'NU', gst: 5, pst: 0, hst: 0, total: 5 },
  { name: 'Yukon', abbr: 'YT', gst: 5, pst: 0, hst: 0, total: 5 },
];

export default function CanadaCalculator() {
  const [province, setProvince] = useState('ON');
  const [finalPrice, setFinalPrice] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateReverseTax> | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedProvince = CA_PROVINCES.find(p => p.abbr === province)!;

  const calculate = () => {
    setError('');
    const price = parseFloat(finalPrice);
    if (isNaN(price) || price <= 0) { setError('Enter a valid price.'); return; }
    try { setResult(calculateReverseTax(price, selectedProvince.total)); } catch (e) { setError((e as Error).message); }
  };

  const reset = () => {
    setFinalPrice('');
    setResult(null);
    setError('');
  };

  const copy = async () => {
    if (!result) return;
    const text = `Canada ${selectedProvince.name} Tax Calculation\nTotal: $${fmt(result.totalPaid)}\nRate: ${result.taxRate}%\nPre-Tax: $${fmt(result.preTaxPrice)}\nTax: $${fmt(result.taxAmount)}`;
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
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="ca-province-select" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>Province / Territory</label>
        <select
          id="ca-province-select"
          aria-label="Select Canadian Province or Territory"
          className="state-select"
          value={province}
          onChange={(e) => { setProvince(e.target.value); setResult(null); }}
        >
          {CA_PROVINCES.map(p => (
            <option key={p.abbr} value={p.abbr}>
              {p.name} ({p.abbr}) — {p.total}% {p.hst ? 'HST' : p.pst ? `GST+PST` : 'GST'}
            </option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          {selectedProvince.gst > 0 && <span style={{ background: 'var(--canvas-soft)', color: 'var(--ink)', border: '1px solid var(--hairline-strong)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>GST: {selectedProvince.gst}%</span>}
          {selectedProvince.pst > 0 && <span style={{ background: 'var(--canvas-soft)', color: 'var(--ink)', border: '1px solid var(--hairline-strong)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>PST: {selectedProvince.pst}%</span>}
          {selectedProvince.hst > 0 && <span style={{ background: 'var(--canvas-soft)', color: 'var(--ink)', border: '1px solid var(--hairline-strong)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>HST: {selectedProvince.hst}%</span>}
          <span style={{ background: 'var(--mint-100)', color: 'var(--primary-deep)', border: '1px solid var(--mint-200)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>Total: {selectedProvince.total}%</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="ca-final-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>Total Price Paid (CAD, with tax)</label>
        <div className="input-wrapper">
          <span className="input-prefix" aria-hidden="true">$</span>
          <input
            id="ca-final-price"
            name="finalPrice"
            autoComplete="off"
            type="number"
            min="0"
            step="0.01"
            placeholder="113.00"
            aria-label="Total Price Paid in Canadian Dollars with tax"
            value={finalPrice}
            onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
            className="calc-input with-prefix"
          />
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
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      <button type="submit" className="btn-primary" style={{ minHeight: 52, marginBottom: result ? 20 : 0 }}>
        Calculate Pre-Tax Price ({selectedProvince.name})
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }} aria-live="polite">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }} className="grid-results">
            <div className="result-card success" style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)', marginBottom: 8 }}>Pre-Tax (CAD)</div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>${fmt(result.preTaxPrice)}</div>
            </div>
            <div className="result-card" style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 8 }}>Tax Amount</div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card neutral" style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 8 }}>Total Paid</div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>${fmt(result.totalPaid)}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <button
              type="button"
              onClick={copy}
              className="btn-secondary"
              style={{ flex: '1 1 180px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              aria-label="Copy Canadian tax calculation results to clipboard"
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

          {/* Formula breakdown banner */}
          <div style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', fontSize: 13, color: 'var(--primary-deep)', marginTop: 16, fontFamily: 'var(--font-mono)', wordBreak: 'break-word' }}>
            <strong>Calculation formula:</strong> ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}
    </form>
  );
}
