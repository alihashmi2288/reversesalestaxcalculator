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

  const selectedProvince = CA_PROVINCES.find(p => p.abbr === province)!;

  const calculate = () => {
    setError('');
    const price = parseFloat(finalPrice);
    if (isNaN(price) || price <= 0) { setError('Enter a valid price.'); return; }
    try { setResult(calculateReverseTax(price, selectedProvince.total)); } catch (e) { setError((e as Error).message); }
  };

  return (
    <div className="calc-card">
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="ca-province-select" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>Province / Territory</label>
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
          {selectedProvince.gst > 0 && <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>GST: {selectedProvince.gst}%</span>}
          {selectedProvince.pst > 0 && <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>PST: {selectedProvince.pst}%</span>}
          {selectedProvince.hst > 0 && <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>HST: {selectedProvince.hst}%</span>}
          <span style={{ background: 'rgba(204, 255, 0, 0.1)', color: 'var(--primary)', border: '1px solid rgba(204, 255, 0, 0.3)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>Total: {selectedProvince.total}%</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="ca-final-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>Total Price Paid (CAD, with tax)</label>
        <div className="input-wrapper">
          <span className="input-prefix" aria-hidden="true">$</span>
          <input
            id="ca-final-price"
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

      {error && <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', color: '#f87171', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 16 }}>[ERROR] {error}</div>}

      <button onClick={calculate} className="btn-primary" style={{ minHeight: 56, marginBottom: result ? 20 : 0 }}>
        Calculate Pre-Tax Price ({selectedProvince.name})
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-results">
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', marginBottom: 8 }}>Pre-Tax (CAD)</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--primary)' }}>${fmt(result.preTaxPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f87171', marginBottom: 8 }}>Tax Amount</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#ef4444' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e4e4e7', marginBottom: 8 }}>Total Paid</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#ffffff' }}>${fmt(result.totalPaid)}</div>
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.grid-results{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
