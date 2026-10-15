'use client';

import { useState, useCallback } from 'react';
import { calculateReverseTax, fmt, type BasicResult } from '@/lib/taxCalc';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

export default function EmbedCalculator() {
  const [finalPrice, setFinalPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState<BasicResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedState(val);
    if (val) {
      const found = STATE_TAX_RATES.find((s) => s.abbreviation === val);
      if (found) {
        setTaxRate(String(found.rate));
      }
    }
  };

  const calculate = useCallback(() => {
    setError('');
    const price = parseFloat(finalPrice.replace(/[^0-9.]/g, ''));
    const rate = parseFloat(taxRate.replace(/[^0-9.]/g, ''));
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }
    if (isNaN(rate) || rate < 0) {
      setError('Please enter a valid tax rate (0 or above).');
      return;
    }
    try {
      setResult(calculateReverseTax(price, rate));
    } catch (e) {
      setError((e as Error).message);
    }
  }, [finalPrice, taxRate]);

  const reset = () => {
    setFinalPrice('');
    setTaxRate('');
    setResult(null);
    setError('');
    setCopied(false);
    setSelectedState('');
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Reverse Tax Calculation\nFinal Price: $${fmt(result.totalPaid)}\nTax Rate: ${result.taxRate}%\nPre-Tax Price: $${fmt(result.preTaxPrice)}\nTax Amount: $${fmt(result.taxAmount)}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 580,
        margin: '0 auto',
        padding: '16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: 'var(--font-montserrat), sans-serif',
        color: 'var(--body)',
        backgroundColor: 'var(--canvas)',
      }}
    >
      {/* Compact Widget Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--hairline)',
          paddingBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--on-primary)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <path d="M9 7h6M9 12h6M9 17h4" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--ink)',
            }}
          >
            Reverse Sales Tax Calculator
          </span>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--muted)',
            fontWeight: 600,
          }}
        >
          Free Tool
        </span>
      </div>

      {/* Input Row: Total Price + Tax Rate */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
        }}
      >
        {/* Total Price */}
        <div>
          <label
            htmlFor="embed-final-price"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '4px',
              color: 'var(--ink)',
            }}
          >
            Total Paid (with tax)
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true" style={{ fontSize: '14px', left: '10px' }}>
              $
            </span>
            <input
              id="embed-final-price"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="107.50"
              aria-label="Total Price Paid with tax in dollars"
              value={finalPrice}
              onChange={(e) => {
                setFinalPrice(e.target.value);
                setResult(null);
              }}
              className="calc-input with-prefix"
              style={{ height: '42px', fontSize: '14px', paddingLeft: '28px' }}
            />
          </div>
        </div>

        {/* Tax Rate */}
        <div>
          <label
            htmlFor="embed-tax-rate"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '4px',
              color: 'var(--ink)',
            }}
          >
            Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              id="embed-tax-rate"
              type="number"
              inputMode="decimal"
              min="0"
              max="99"
              step="0.001"
              placeholder="8.25"
              aria-label="Sales Tax Rate percentage"
              value={taxRate}
              onChange={(e) => {
                setTaxRate(e.target.value);
                setResult(null);
                setSelectedState('');
              }}
              className="calc-input with-suffix"
              style={{ height: '42px', fontSize: '14px', paddingRight: '28px' }}
            />
            <span className="input-suffix" aria-hidden="true" style={{ fontSize: '13px', right: '10px' }}>
              %
            </span>
          </div>
        </div>
      </div>

      {/* State Dropdown */}
      <div>
        <label
          htmlFor="embed-state-select"
          style={{
            display: 'block',
            fontWeight: 700,
            fontSize: '11px',
            marginBottom: '4px',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Or Select US State (auto-fills rate)
        </label>
        <select
          id="embed-state-select"
          aria-label="Select US State for combined sales tax rate"
          className="state-select"
          value={selectedState}
          onChange={handleStateChange}
          style={{ height: '40px', fontSize: '13px' }}
        >
          <option value="">— Select a State —</option>
          {STATE_TAX_RATES.slice().sort((a, b) => a.state.localeCompare(b.state)).map((s) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.state} — {s.rate}%{s.notes ? ` (${s.notes})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: '#fff1f1',
            border: '1px solid #ffd8d8',
            borderRadius: 'var(--radius-xs)',
            padding: '8px 12px',
            color: 'var(--error)',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      {/* Action Button */}
      <button
        id="embed-calculate-btn"
        onClick={calculate}
        className="btn-primary"
        style={{ minHeight: '44px', fontSize: '13px', padding: '10px 16px' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        Calculate Pre-Tax Price
      </button>

      {/* Results Box */}
      {result && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '2px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {/* Pre-Tax Price */}
            <div className="result-card success" style={{ padding: '10px 12px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--primary-deep)',
                  marginBottom: '2px',
                }}
              >
                Pre-Tax
              </div>
              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ${fmt(result.preTaxPrice)}
              </div>
            </div>

            {/* Tax Amount */}
            <div className="result-card danger" style={{ padding: '10px 12px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--error)',
                  marginBottom: '2px',
                }}
              >
                Tax
              </div>
              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: 'var(--error)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ${fmt(result.taxAmount)}
              </div>
            </div>

            {/* Total Paid */}
            <div className="result-card neutral" style={{ padding: '10px 12px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--muted)',
                  marginBottom: '2px',
                }}
              >
                Total
              </div>
              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ${fmt(result.totalPaid)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={copyToClipboard}
              className="btn-secondary"
              style={{ flex: 1, minHeight: '36px', fontSize: '11px', padding: '0 12px' }}
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span style={{ color: 'var(--primary)' }}>Copied</span>
                </>
              ) : (
                'Copy Result'
              )}
            </button>
            <button
              onClick={reset}
              className="btn-secondary"
              style={{ flex: 1, minHeight: '36px', fontSize: '11px', padding: '0 12px' }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
