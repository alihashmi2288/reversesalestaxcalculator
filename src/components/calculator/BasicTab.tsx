'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { calculateReverseTax, fmt, type BasicResult } from '@/lib/taxCalc';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

const QUICK_RATES = [6, 7, 8, 8.25, 8.875, 10];
const SORTED_STATE_TAX_RATES = STATE_TAX_RATES.slice().sort((a, b) => a.state.localeCompare(b.state));

export default function BasicTab() {
  const [finalPrice, setFinalPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState<BasicResult | null>(null);
  const [isStale, setIsStale] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedQuick, setSelectedQuick] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [announcement, setAnnouncement] = useState('');

  const finalPriceInputRef = useRef<HTMLInputElement>(null);
  const taxRateInputRef = useRef<HTMLInputElement>(null);

  // Debounced live calculation (~150ms)
  useEffect(() => {
    if (!finalPrice || !taxRate) return;
    const timer = setTimeout(() => {
      const price = parseFloat(finalPrice.replace(/[^0-9.]/g, ''));
      const rate = parseFloat(taxRate.replace(/[^0-9.]/g, ''));
      if (!isNaN(price) && price > 0 && !isNaN(rate) && rate >= 0 && rate <= 100) {
        try {
          const res = calculateReverseTax(price, rate);
          if (isFinite(res.preTaxPrice) && isFinite(res.taxAmount)) {
            setResult(res);
            setIsStale(false);
            setError('');
          }
        } catch {
          // ignore typing validation errors until manual calculation
        }
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [finalPrice, taxRate]);

  const handleQuickRate = (rate: number) => {
    setTaxRate(String(rate));
    setSelectedQuick(rate);
    setSelectedState('');
    if (result) setIsStale(true);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedState(val);
    if (val) {
      const found = SORTED_STATE_TAX_RATES.find((s) => s.abbreviation === val);
      if (found) {
        setTaxRate(String(found.rate));
        setSelectedQuick(null);
        if (result) setIsStale(true);
      }
    }
  };

  const calculate = useCallback(() => {
    setError('');
    if (!finalPrice.trim()) {
      setError('Please enter the total price paid.');
      finalPriceInputRef.current?.focus();
      return;
    }
    const cleanPrice = finalPrice.replace(/[^0-9.-]/g, '');
    const price = parseFloat(cleanPrice);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price greater than $0.00.');
      finalPriceInputRef.current?.focus();
      return;
    }
    if (!taxRate.trim()) {
      setError('Please enter a sales tax rate (e.g. 7.5% or 0% for tax-free).');
      taxRateInputRef.current?.focus();
      return;
    }
    const cleanRate = taxRate.replace(/[^0-9.-]/g, '');
    const rate = parseFloat(cleanRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setError('Please enter a valid tax rate between 0% and 100%.');
      taxRateInputRef.current?.focus();
      return;
    }
    try {
      const res = calculateReverseTax(price, rate);
      if (!isFinite(res.preTaxPrice) || !isFinite(res.taxAmount)) {
        setError('Calculation resulted in an invalid number. Please check your inputs.');
        return;
      }
      setResult(res);
      setIsStale(false);
      setAnnouncement(`Calculation complete. Original pre-tax price: $${fmt(res.preTaxPrice)}. Sales tax amount: $${fmt(res.taxAmount)}. Total paid: $${fmt(res.totalPaid)}.`);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [finalPrice, taxRate]);

  const reset = () => {
    setFinalPrice('');
    setTaxRate('');
    setResult(null);
    setIsStale(false);
    setError('');
    setCopied(false);
    setSelectedQuick(null);
    setSelectedState('');
    setAnnouncement('Calculator reset.');
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Reverse Tax Calculation\nFinal Price: $${fmt(result.totalPaid)}\nTax Rate: ${result.taxRate}%\nPre-Tax Price: $${fmt(result.preTaxPrice)}\nTax Amount: $${fmt(result.taxAmount)}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setAnnouncement('Calculation results copied to clipboard.');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); calculate(); }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Persistent live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

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
              ref={finalPriceInputRef}
              id="basic-final-price"
              name="finalPrice"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="107.50"
              aria-label="Total Price Paid with tax in dollars"
              aria-invalid={!!error}
              aria-describedby={error ? "basic-error-msg" : undefined}
              value={finalPrice}
              onChange={(e) => {
                setFinalPrice(e.target.value);
                if (result) setIsStale(true);
              }}
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
              ref={taxRateInputRef}
              id="basic-tax-rate"
              name="taxRate"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="0.001"
              placeholder="8.25"
              aria-label="Sales Tax Rate percentage"
              aria-invalid={!!error}
              aria-describedby={error ? "basic-error-msg" : undefined}
              value={taxRate}
              onChange={(e) => {
                setTaxRate(e.target.value);
                setSelectedQuick(null);
                setSelectedState('');
                if (result) setIsStale(true);
              }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
        </div>
      </div>

      {/* Quick Rates */}
      <div role="group" aria-label="Quick Select Rate">
        <div style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--body)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Quick Select Rate
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {QUICK_RATES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleQuickRate(r)}
              className={`quick-btn ${selectedQuick === r ? 'active' : ''}`}
              aria-pressed={selectedQuick === r}
              aria-label={`Set tax rate to ${r}%`}
            >
              {r}%
            </button>
          ))}
        </div>
      </div>

      {/* State Dropdown */}
      <div>
        <label htmlFor="basic-state-select" style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--body)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
          {SORTED_STATE_TAX_RATES.map((s) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.state} — {s.rate}%{s.notes ? ` (${s.notes})` : ''}
            </option>
          ))}
        </select>
        <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 6, lineHeight: 1.5 }}>
          Rates shown are combined state + average local rates. Your exact local rate may differ.
        </div>
      </div>

      {/* Error Announcement */}
      {error && (
        <div
          id="basic-error-msg"
          role="alert"
          aria-live="assertive"
          style={{
            backgroundColor: '#fff1f1',
            border: '1px solid #ffd8d8',
            borderRadius: 'var(--radius-xs)',
            padding: '12px 16px',
            color: 'var(--error)',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* CTA Button */}
      <button id="basic-calculate-btn" type="submit" className="btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        Calculate Pre-Tax Price
      </button>

      {/* Results */}
      {result && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            marginTop: 8,
            opacity: isStale ? 0.6 : 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }} className="grid-results">
            {/* Pre-Tax Original Price */}
            <div className="result-card success">
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--primary-deep)', marginBottom: 6 }}>
                <span aria-hidden="true">✓ </span>Original Price
              </div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>Pre-tax item cost</div>
            </div>

            {/* Tax Amount */}
            <div
              className="result-card"
              style={{
                background: 'var(--canvas)',
                border: '1px solid var(--hairline-strong)',
                color: 'var(--ink)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--body)', marginBottom: 6 }}>
                Tax Amount
              </div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-deep)', lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>{result.taxRate}% sales tax</div>
            </div>

            {/* Total Paid */}
            <div className="result-card neutral">
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--body)', marginBottom: 6 }}>
                Total Paid
              </div>
              <div className="tabular-nums" style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}>
                ${fmt(result.totalPaid)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>Receipt total</div>
            </div>
          </div>

          {/* Verification check line */}
          <div className="tabular-nums" style={{ backgroundColor: 'var(--canvas-soft)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-xs)', padding: '10px 14px', fontSize: 13, color: 'var(--body)', marginBottom: 16, fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Check: </span>
            ${fmt(result.preTaxPrice)} × {(1 + Number(result.taxRate) / 100).toFixed(4).replace(/\.?0+$/, '')} = ${fmt(result.totalPaid)}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" onClick={copyToClipboard} className="btn-secondary" style={{ flex: 1, minHeight: 44 }}>
              {copied ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{ color: 'var(--primary)' }}>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  Copy Results
                </>
              )}
            </button>
            <button type="button" onClick={reset} className="btn-secondary" style={{ flex: 1, minHeight: 44 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
          </div>

          {/* Formula reminder */}
          <div className="tabular-nums" style={{ backgroundColor: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-xs)', padding: '12px 16px', fontSize: 13, color: 'var(--primary-deep)', marginTop: 14, fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            <strong>Formula:</strong> ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100)
          </div>
        </div>
      )}
    </form>
  );
}
