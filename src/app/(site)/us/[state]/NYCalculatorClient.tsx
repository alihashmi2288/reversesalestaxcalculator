'use client';

import { useState } from 'react';
import { fmt } from '@/lib/taxCalc';
import type { StateRate } from '@/data/stateTaxRates';

interface Props {
  stateData: StateRate;
}

type CalcMode = 'reverse' | 'forward';

interface CalcResult {
  mode: CalcMode;
  preTaxPrice: number;
  taxAmount: number;
  totalPrice: number;
  taxRate: number;
}

const PRESETS = [
  { label: 'New York City (8.875%)', rate: '8.875', desc: 'All 5 Boroughs' },
  { label: 'NY State Avg (8.66%)', rate: '8.66', desc: 'Statewide Average' },
  { label: 'Suffolk County (8.75%)', rate: '8.75', desc: 'Long Island' },
  { label: 'Nassau County (8.625%)', rate: '8.625', desc: 'Long Island' },
];

export default function NYCalculatorClient({ stateData }: Props) {
  const [mode, setMode] = useState<CalcMode>('forward');
  const [inputPrice, setInputPrice] = useState('200');
  const [taxRate, setTaxRate] = useState('8.875');
  const [result, setResult] = useState<CalcResult | null>({
    mode: 'forward',
    preTaxPrice: 200,
    taxAmount: 17.75,
    totalPrice: 217.75,
    taxRate: 8.875,
  });
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate = (customPrice?: string, customRate?: string, customMode?: CalcMode) => {
    setError('');
    const pStr = customPrice !== undefined ? customPrice : inputPrice;
    const rStr = customRate !== undefined ? customRate : taxRate;
    const currentMode = customMode !== undefined ? customMode : mode;

    const price = parseFloat(pStr);
    const rate = parseFloat(rStr);

    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price greater than $0.');
      return;
    }
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setError('Please enter a valid tax rate between 0% and 100%.');
      return;
    }

    const rateDecimal = rate / 100;

    if (currentMode === 'forward') {
      // Forward calculation: Pre-tax price * rate = Tax amount
      const taxAmount = Math.round(price * rateDecimal * 100) / 100;
      const totalPrice = Math.round((price + taxAmount) * 100) / 100;
      setResult({
        mode: 'forward',
        preTaxPrice: price,
        taxAmount,
        totalPrice,
        taxRate: rate,
      });
    } else {
      // Reverse calculation: Total price / (1 + rate) = Pre-tax price
      const preTaxPrice = Math.round((price / (1 + rateDecimal)) * 100) / 100;
      const taxAmount = Math.round((price - preTaxPrice) * 100) / 100;
      setResult({
        mode: 'reverse',
        preTaxPrice,
        taxAmount,
        totalPrice: price,
        taxRate: rate,
      });
    }
  };

  const handleModeChange = (newMode: CalcMode) => {
    setMode(newMode);
    calculate(inputPrice, taxRate, newMode);
  };

  const handlePresetSelect = (presetRate: string) => {
    setTaxRate(presetRate);
    calculate(inputPrice, presetRate, mode);
  };

  const reset = () => {
    setInputPrice('');
    setTaxRate('8.875');
    setResult(null);
    setError('');
  };

  const copy = () => {
    if (!result) return;
    const text = `New York Sales Tax Calculation (${result.mode === 'forward' ? 'Add Tax' : 'Reverse Tax'})\n` +
      `Rate: ${result.taxRate}%\n` +
      `Pre-Tax Price: $${fmt(result.preTaxPrice)}\n` +
      `Sales Tax: $${fmt(result.taxAmount)}\n` +
      `Total Price: $${fmt(result.totalPrice)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card">
      {/* Mode Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => handleModeChange('forward')}
          style={{
            padding: '10px 16px',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            borderRadius: 'var(--radius-xs)',
            border: mode === 'forward' ? '1px solid var(--primary)' : '1px solid var(--hairline)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            background: mode === 'forward' ? 'var(--primary)' : 'var(--canvas-soft)',
            color: mode === 'forward' ? '#ffffff' : 'var(--body)',
          }}
        >
          ➕ Add Tax (Forward)
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('reverse')}
          style={{
            padding: '10px 16px',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            borderRadius: 'var(--radius-xs)',
            border: mode === 'reverse' ? '1px solid var(--primary)' : '1px solid var(--hairline)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            background: mode === 'reverse' ? 'var(--primary)' : 'var(--canvas-soft)',
            color: mode === 'reverse' ? '#ffffff' : 'var(--body)',
          }}
        >
          ➖ Remove Tax (Reverse)
        </button>
      </div>

      {/* Quick Rate Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.04em' }}>
          Select New York Location Rate Preset:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PRESETS.map((p) => {
            const isSelected = taxRate === p.rate;
            return (
              <button
                key={p.rate}
                type="button"
                onClick={() => handlePresetSelect(p.rate)}
                className={`quick-btn ${isSelected ? 'active' : ''}`}
                style={{ fontSize: 12 }}
              >
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }} className="grid-responsive">
        <div>
          <label htmlFor="ny-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            {mode === 'forward' ? 'Pre-Tax Price (Sticker Price)' : 'Total Price Paid (Receipt with tax)'}
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id="ny-price"
              suppressHydrationWarning
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder={mode === 'forward' ? '200.00' : '217.75'}
              aria-label={mode === 'forward' ? 'Pre-Tax Price in dollars' : 'Total Price Paid in New York with tax in dollars'}
              value={inputPrice}
              onChange={(e) => {
                setInputPrice(e.target.value);
                setResult(null);
              }}
              className="calc-input with-prefix"
            />
          </div>
        </div>

        <div>
          <label htmlFor="ny-tax-rate" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
            Combined Sales Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              id="ny-tax-rate"
              suppressHydrationWarning
              type="number"
              inputMode="decimal"
              min="0"
              step="0.001"
              aria-label="New York combined sales tax rate percentage"
              value={taxRate}
              onChange={(e) => {
                setTaxRate(e.target.value);
                setResult(null);
              }}
              className="calc-input with-suffix"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
            State (4%) + Local + MCTD (0.375% if downstate)
          </p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-xs)', padding: '12px 16px', color: '#991b1b', fontSize: 13, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⚠️</span> {error}
        </div>
      )}

      <button suppressHydrationWarning onClick={() => calculate()} className="btn-primary" style={{ minHeight: 52, marginBottom: 24 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        {mode === 'forward' ? 'Calculate Total with NY Tax' : 'Calculate NY Pre-Tax Price'}
      </button>

      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }} className="grid-results">
            {/* Pre-Tax Price */}
            <div className="result-card success">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-deep)', marginBottom: 6 }}>
                {mode === 'forward' ? 'Pre-Tax Price' : 'Original Price (Pre-Tax)'}
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary-deep)', lineHeight: 1.1, fontFamily: 'monospace' }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                {mode === 'forward' ? 'Amount entered' : 'Before tax was applied'}
              </div>
            </div>

            {/* Tax Amount */}
            <div className="result-card danger">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#991b1b', marginBottom: 6 }}>
                Sales Tax ({result.taxRate}%)
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#b91c1c', lineHeight: 1.1, fontFamily: 'monospace' }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 12, color: '#991b1b', marginTop: 6 }}>
                NY combined tax
              </div>
            </div>

            {/* Total Price */}
            <div className="result-card neutral">
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 6 }}>
                {mode === 'forward' ? 'Total Price Paid' : 'Total Paid'}
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.1, fontFamily: 'monospace' }}>
                ${fmt(result.totalPrice)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                {mode === 'forward' ? 'Checkout price' : 'Amount you entered'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button suppressHydrationWarning onClick={copy} className="btn-secondary" style={{ flex: 1, minHeight: 44 }}>
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>{' '}
                  Copied!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>{' '}
                  Copy Results
                </>
              )}
            </button>
            <button suppressHydrationWarning onClick={reset} className="btn-secondary" style={{ flex: 1, minHeight: 44 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset
            </button>
          </div>

          {/* Formula display */}
          <div style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-xs)', padding: '12px 16px', fontSize: 13, color: 'var(--ink)', marginTop: 16, fontFamily: 'monospace', wordBreak: 'break-word' }}>
            {mode === 'forward' ? (
              <span>Formula: ${fmt(result.preTaxPrice)} × {(result.taxRate / 100).toFixed(5)} = ${fmt(result.taxAmount)} tax → Total = ${fmt(result.totalPrice)}</span>
            ) : (
              <span>Formula: Pre-Tax Price = ${fmt(result.totalPrice)} / {(1 + result.taxRate / 100).toFixed(5)} = ${fmt(result.preTaxPrice)} (Tax: ${fmt(result.taxAmount)})</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
