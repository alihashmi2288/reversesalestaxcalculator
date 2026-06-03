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
          <label style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>Original Price (before tax)</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input id="find-rate-original" type="number" min="0" step="0.01" placeholder="100.00" value={originalPrice}
              onChange={(e) => { setOriginalPrice(e.target.value); setResult(null); }} className="calc-input with-prefix" />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>Final Price (with tax)</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input id="find-rate-final" type="number" min="0" step="0.01" placeholder="108.25" value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }} className="calc-input with-prefix" />
          </div>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius)', padding: '14px 18px', color: '#f87171', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
          [ERROR] {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button id="find-rate-calc-btn" onClick={calculate} className="btn-primary" style={{ flex: 1, minHeight: 56 }}>Find Tax Rate</button>
        <button onClick={reset} className="btn-secondary" style={{ minHeight: 56 }}>Reset</button>
      </div>

      {result && (
        <div style={{ animation: 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)', marginTop: 8 }}>
          <div className="card" style={{ border: '1px solid rgba(204, 255, 0, 0.3)', borderRadius: 'var(--radius-lg)', padding: 28, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 20, background: 'rgba(204, 255, 0, 0.01)', boxShadow: 'var(--shadow-glow)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', marginBottom: 8 }}>
              ✓ Implied Tax Rate Applied
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-mono)', color: 'var(--primary)', textShadow: '0 0 15px rgba(204, 255, 0, 0.3)' }}>
              {result.taxRate.toFixed(3)}%
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 10, fontFamily: 'var(--font-mono)' }}>
              ${fmt(result.taxAmount)} added in tax
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-results">
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e4e4e7', marginBottom: 8 }}>Original Price</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#ffffff' }}>${fmt(result.originalPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f87171', marginBottom: 8 }}>Tax Amount</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#ef4444' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', marginBottom: 8 }}>Total Paid</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}>${fmt(result.finalPrice)}</div>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              <span>Pre-tax: {((result.originalPrice / result.finalPrice) * 100).toFixed(1)}%</span>
              <span>Tax: {((result.taxAmount / result.finalPrice) * 100).toFixed(1)}%</span>
            </div>
            <div style={{ height: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(result.originalPrice / result.finalPrice) * 100}%`, background: 'var(--primary)', borderRadius: 'var(--radius)', boxShadow: '0 0 8px var(--primary)' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
