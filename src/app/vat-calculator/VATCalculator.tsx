'use client';
import { useState } from 'react';
import { calculateReverseTax, fmt } from '@/lib/taxCalc';

const EU_RATES = [
  { country: 'United Kingdom', flag: '🇬🇧', standard: 20, reduced: 5 },
  { country: 'Germany', flag: '🇩🇪', standard: 19, reduced: 7 },
  { country: 'France', flag: '🇫🇷', standard: 20, reduced: 5.5 },
  { country: 'Italy', flag: '🇮🇹', standard: 22, reduced: 10 },
  { country: 'Spain', flag: '🇪🇸', standard: 21, reduced: 10 },
  { country: 'Netherlands', flag: '🇳🇱', standard: 21, reduced: 9 },
  { country: 'Belgium', flag: '🇧🇪', standard: 21, reduced: 6 },
  { country: 'Sweden', flag: '🇸🇪', standard: 25, reduced: 12 },
  { country: 'Denmark', flag: '🇩🇰', standard: 25, reduced: 0 },
  { country: 'Norway', flag: '🇳🇴', standard: 25, reduced: 12 },
  { country: 'Australia', flag: '🇦🇺', standard: 10, reduced: 0 },
  { country: 'New Zealand', flag: '🇳🇿', standard: 15, reduced: 0 },
  { country: 'India (GST)', flag: '🇮🇳', standard: 18, reduced: 5 },
  { country: 'Custom Rate', flag: '🌍', standard: 0, reduced: 0 },
];

export default function VATCalculator() {
  const [country, setCountry] = useState('United Kingdom');
  const [vatRate, setVatRate] = useState('20');
  const [finalPrice, setFinalPrice] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateReverseTax> | null>(null);
  const [error, setError] = useState('');

  const selectedCountry = EU_RATES.find(c => c.country === country)!;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = EU_RATES.find(c => c.country === e.target.value)!;
    setCountry(selected.country);
    if (selected.standard > 0) setVatRate(String(selected.standard));
    setResult(null);
  };

  const calculate = () => {
    setError('');
    const price = parseFloat(finalPrice);
    const rate = parseFloat(vatRate);
    if (isNaN(price) || price <= 0) { setError('Enter a valid price.'); return; }
    if (isNaN(rate) || rate < 0) { setError('Enter a valid VAT rate.'); return; }
    try { setResult(calculateReverseTax(price, rate)); } catch (e) { setError((e as Error).message); }
  };

  return (
    <div className="calc-card">
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Country / Region</label>
        <select className="state-select" value={country} onChange={handleCountryChange}>
          {EU_RATES.map(c => (
            <option key={c.country} value={c.country}>
              {c.flag} {c.country}{c.standard > 0 ? ` — ${c.standard}% standard` : ' — Enter custom rate'}
            </option>
          ))}
        </select>
        {selectedCountry.reduced > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setVatRate(String(selectedCountry.standard))} className="quick-btn" style={{ fontSize: 12 }}>Standard {selectedCountry.standard}%</button>
            <button onClick={() => setVatRate(String(selectedCountry.reduced))} className="quick-btn" style={{ fontSize: 12 }}>Reduced {selectedCountry.reduced}%</button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="grid-responsive">
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>VAT Rate</label>
          <div className="input-wrapper">
            <input type="number" min="0" step="0.1" value={vatRate}
              onChange={(e) => { setVatRate(e.target.value); setResult(null); }} className="calc-input with-suffix" />
            <span className="input-suffix">%</span>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Price (VAT-inclusive)</label>
          <div className="input-wrapper">
            <input type="number" min="0" step="0.01" placeholder="120.00" value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }} className="calc-input with-prefix" />
          </div>
        </div>
      </div>

      {error && <div style={{ background: '#000', border: '2px solid #ef4444', borderRadius: 'var(--radius)', padding: '12px 16px', color: '#ef4444', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 16 }}>[ERROR] {error}</div>}

      <button onClick={calculate} className="btn-primary" style={{ minHeight: 56, marginBottom: result ? 20 : 0 }}>
        Remove VAT — Find Ex-VAT Price
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-results">
            <div className="result-card success">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', marginBottom: 8 }}>Ex-VAT Price</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#047857' }}>{fmt(result.preTaxPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', marginBottom: 8 }}>VAT Amount</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#dc2626' }}>{fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card neutral">
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: 8 }}>Inc-VAT Price</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#374151' }}>{fmt(result.totalPaid)}</div>
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.grid-responsive{grid-template-columns:1fr!important}.grid-results{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
