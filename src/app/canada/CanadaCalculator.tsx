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
        <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Province / Territory</label>
        <select className="state-select" value={province} onChange={(e) => { setProvince(e.target.value); setResult(null); }}>
          {CA_PROVINCES.map(p => (
            <option key={p.abbr} value={p.abbr}>
              {p.name} ({p.abbr}) — {p.total}% {p.hst ? 'HST' : p.pst ? `GST+PST` : 'GST'}
            </option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
          {selectedProvince.gst > 0 && <span style={{ background: '#eff6ff', color: 'var(--primary)', padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>GST: {selectedProvince.gst}%</span>}
          {selectedProvince.pst > 0 && <span style={{ background: '#f0fdf4', color: '#047857', padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>PST: {selectedProvince.pst}%</span>}
          {selectedProvince.hst > 0 && <span style={{ background: '#fdf4ff', color: '#7c3aed', padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>HST: {selectedProvince.hst}%</span>}
          <span style={{ background: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 700 }}>Total: {selectedProvince.total}%</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Total Price Paid (CAD, with tax)</label>
        <div className="input-wrapper">
          <span className="input-prefix">$</span>
          <input type="number" min="0" step="0.01" placeholder="113.00" value={finalPrice}
            onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }} className="calc-input with-prefix" />
        </div>
      </div>

      {error && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#dc2626', fontSize: 14, marginBottom: 16 }}>⚠️ {error}</div>}

      <button onClick={calculate} className="btn-primary" style={{ minHeight: 56, marginBottom: result ? 20 : 0 }}>
        Calculate Pre-Tax Price ({selectedProvince.name})
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-results">
            <div className="result-card success">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', marginBottom: 8 }}>Pre-Tax (CAD)</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#047857' }}>${fmt(result.preTaxPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', marginBottom: 8 }}>Tax Amount</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#dc2626' }}>${fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card neutral">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: 8 }}>Total Paid</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#374151' }}>${fmt(result.totalPaid)}</div>
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.grid-results{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
