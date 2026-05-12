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
    if (isNaN(orig) || orig <= 0) { setError('Please enter a valid original price.'); return; }
    if (isNaN(final) || final <= 0) { setError('Please enter a valid final price.'); return; }
    if (final < orig) { setError('Final price must be >= original price.'); return; }
    try { setResult(findTaxRate(orig, final)); } catch (e) { setError((e as Error).message); }
  };

  const reset = () => { setOriginalPrice(''); setFinalPrice(''); setResult(null); setError(''); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
        Know the original and final price? We calculate the exact tax rate that was applied.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="grid-responsive">
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Original Price (before tax)</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input id="find-rate-original" type="number" min="0" step="0.01" placeholder="100.00" value={originalPrice}
              onChange={(e) => { setOriginalPrice(e.target.value); setResult(null); }} className="calc-input with-prefix" />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Final Price (with tax)</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input id="find-rate-final" type="number" min="0" step="0.01" placeholder="108.25" value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }} className="calc-input with-prefix" />
          </div>
        </div>
      </div>
      {error && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#dc2626', fontSize: 14 }}>⚠️ {error}</div>}
      <div style={{ display: 'flex', gap: 12 }}>
        <button id="find-rate-calc-btn" onClick={calculate} className="btn-primary" style={{ flex: 1, minHeight: 56 }}>Find Tax Rate</button>
        <button onClick={reset} className="btn-secondary" style={{ minHeight: 56 }}>Reset</button>
      </div>
      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1A56DB)', borderRadius: 16, padding: 28, color: '#fff', textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.8, marginBottom: 8 }}>Tax rate applied</div>
            <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1 }}>{result.taxRate.toFixed(3)}%</div>
            <div style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>${fmt(result.taxAmount)} added in tax</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="grid-results">
            <div className="result-card neutral">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: 6 }}>Original</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#374151' }}>${fmt(result.originalPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', marginBottom: 6 }}>Tax amount</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#dc2626' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card success">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', marginBottom: 6 }}>Total paid</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#047857' }}>${fmt(result.finalPrice)}</div>
            </div>
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 16, marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              <span>Pre-tax: {((result.originalPrice / result.finalPrice) * 100).toFixed(1)}%</span>
              <span>Tax: {((result.taxAmount / result.finalPrice) * 100).toFixed(1)}%</span>
            </div>
            <div style={{ height: 12, background: '#e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(result.originalPrice / result.finalPrice) * 100}%`, background: 'linear-gradient(90deg, #047857, #059669)', borderRadius: 6 }} />
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.grid-responsive{grid-template-columns:1fr!important}.grid-results{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
