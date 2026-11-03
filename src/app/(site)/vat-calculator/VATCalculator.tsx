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

function getCurrencySymbol(countryName: string): string {
  switch (countryName) {
    case 'United Kingdom':
      return '£';
    case 'Australia':
    case 'New Zealand':
      return '$';
    case 'Sweden':
    case 'Denmark':
    case 'Norway':
      return 'kr ';
    default:
      return '€';
  }
}

export default function VATCalculator() {
  const [country, setCountry] = useState('United Kingdom');
  const [vatRate, setVatRate] = useState('20');
  const [finalPrice, setFinalPrice] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateReverseTax> | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedCountry = EU_RATES.find(c => c.country === country)!;
  const currencySymbol = getCurrencySymbol(country);

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

  const reset = () => {
    setFinalPrice('');
    setResult(null);
    setError('');
  };

  const copy = async () => {
    if (!result) return;
    const text = `${country} VAT Calculation\nTotal: ${currencySymbol}${fmt(result.totalPaid)}\nRate: ${result.taxRate}%\nEx-VAT: ${currencySymbol}${fmt(result.preTaxPrice)}\nVAT: ${currencySymbol}${fmt(result.taxAmount)}`;
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
            <button
              type="button"
              aria-pressed={vatRate === String(selectedCountry.standard)}
              onClick={() => setVatRate(String(selectedCountry.standard))}
              className={`quick-btn ${vatRate === String(selectedCountry.standard) ? 'active' : ''}`}
              style={{ fontSize: 12 }}
              aria-label={`Set Standard VAT rate to ${selectedCountry.standard}%`}
            >
              Standard {selectedCountry.standard}%
            </button>
            <button
              type="button"
              aria-pressed={vatRate === String(selectedCountry.reduced)}
              onClick={() => setVatRate(String(selectedCountry.reduced))}
              className={`quick-btn ${vatRate === String(selectedCountry.reduced) ? 'active' : ''}`}
              style={{ fontSize: 12 }}
              aria-label={`Set Reduced VAT rate to ${selectedCountry.reduced}%`}
            >
              Reduced {selectedCountry.reduced}%
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 20 }}>
        <div>
          <label htmlFor="vat-rate" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>VAT Rate</label>
          <div className="input-wrapper">
            <input
              id="vat-rate"
              name="vatRate"
              autoComplete="off"
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
            <span className="input-prefix" aria-hidden="true">{currencySymbol.trim()}</span>
            <input
              id="vat-final-price"
              name="finalPrice"
              autoComplete="off"
              type="number"
              min="0"
              step="0.01"
              placeholder="120.00"
              aria-label={`Total Price including VAT in ${currencySymbol.trim()}`}
              value={finalPrice}
              onChange={(e) => { setFinalPrice(e.target.value); setResult(null); }}
              className="calc-input with-prefix"
            />
          </div>
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
        Remove VAT — Find Ex-VAT Price
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }} aria-live="polite">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }} className="grid-results">
            <div className="result-card success" style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)', marginBottom: 8 }}>Ex-VAT (Net Price)</div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>{currencySymbol}{fmt(result.preTaxPrice)}</div>
            </div>
            <div className="result-card" style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 8 }}>VAT Amount</div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>{currencySymbol}{fmt(result.taxAmount)}</div>
            </div>
            <div className="result-card neutral" style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 8 }}>Inc-VAT (Gross Price)</div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>{currencySymbol}{fmt(result.totalPaid)}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <button
              type="button"
              onClick={copy}
              className="btn-secondary"
              style={{ flex: '1 1 180px', minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              aria-label="Copy VAT calculation results to clipboard"
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
            <strong>Calculation formula:</strong> {currencySymbol}{fmt(result.preTaxPrice)} = {currencySymbol}{fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}
    </form>
  );
}
