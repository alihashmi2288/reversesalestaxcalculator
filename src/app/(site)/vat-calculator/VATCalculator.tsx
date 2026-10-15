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
        <label htmlFor="vat-country-select" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>Country / Region</label>
        <select
          id="vat-country-select"
          aria-label="Select Country or Region for VAT rate"
          className="state-select"
          value={country}
          onChange={handleCountryChange}
        >
          {EU_RATES.map(c => (
            <option key={c.country} value={c.country}>
              {c.flag} {c.country}{c.standard > 0 ? ` — ${c.standard}% standard` : ' — Enter custom rate'}
            </option>
          ))}
        </select>
        {selectedCountry.reduced > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }} role="group" aria-label="Select Standard or Reduced VAT Rate">
            <button onClick={() => setVatRate(String(selectedCountry.standard))} className={`quick-btn ${vatRate === String(selectedCountry.standard) ? 'active' : ''}`} style={{ fontSize: 12 }} aria-label={`Set Standard VAT rate to ${selectedCountry.standard}%`}>Standard {selectedCountry.standard}%</button>
            <button onClick={() => setVatRate(String(selectedCountry.reduced))} className={`quick-btn ${vatRate === String(selectedCountry.reduced) ? 'active' : ''}`} style={{ fontSize: 12 }} aria-label={`Set Reduced VAT rate to ${selectedCountry.reduced}%`}>Reduced {selectedCountry.reduced}%</button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="grid-responsive">
        <div>
          <label htmlFor="vat-rate" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>VAT Rate</label>
          <div className="input-wrapper">
            <input
              id="vat-rate"
              type="number"
              min="0"
              step="0.1"
              aria-label="VAT Rate percentage"
              value={vatRate}
              onChange={(e) => { setVatRate(e.target.value); setResult(null); }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
        </div>
        <div>
          <label htmlFor="vat-final-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>Price (VAT-inclusive)</label>
          <div className="input-wrapper">
            <input
              id="vat-final-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="120.00"
              aria-label="Total Price including VAT"
              value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-xs)', padding: '12px 16px', color: '#991b1b', fontSize: 13, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⚠️</span> {error}
        </div>
      )}

      <button onClick={calculate} className="btn-primary" style={{ minHeight: 52, marginBottom: result ? 20 : 0 }}>
        Remove VAT — Find Ex-VAT Price
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-results">
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)', marginBottom: 6 }}>Ex-VAT (Net Price)</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'monospace' }}>{fmt(result.preTaxPrice)}</div>
            </div>
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#991b1b', marginBottom: 6 }}>VAT Amount</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#b91c1c', fontFamily: 'monospace' }}>{fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 6 }}>Inc-VAT (Gross Price)</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', fontFamily: 'monospace' }}>{fmt(result.totalPaid)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
