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
    <div className="calc-card" style={{ border: '2px solid var(--primary)', boxShadow: 'var(--shadow-solid-dark)' }}>
      {/* Mode Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => handleModeChange('forward')}
          style={{
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-mono)',
            borderRadius: 'var(--radius)',
            border: '2px solid #000',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            background: mode === 'forward' ? 'var(--primary)' : 'var(--card-bg)',
            color: mode === 'forward' ? '#000' : 'var(--text-secondary)',
            boxShadow: mode === 'forward' ? '3px 3px 0px 0px rgba(255,255,255,0.15)' : 'none',
          }}
        >
          ➕ Add Tax (Forward)
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('reverse')}
          style={{
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-mono)',
            borderRadius: 'var(--radius)',
            border: '2px solid #000',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            background: mode === 'reverse' ? 'var(--primary)' : 'var(--card-bg)',
            color: mode === 'reverse' ? '#000' : 'var(--text-secondary)',
            boxShadow: mode === 'reverse' ? '3px 3px 0px 0px rgba(255,255,255,0.15)' : 'none',
          }}
        >
          ➖ Remove Tax (Reverse)
        </button>
      </div>

      {/* Quick Rate Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>
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
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(34, 197, 94, 0.15)' : 'var(--card-bg)',
                  color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
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
          <label htmlFor="ny-price" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>
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
          <label htmlFor="ny-tax-rate" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>
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
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            State (4%) + Local + MCTD (0.375% if downstate)
          </p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#000', border: '2px solid #ef4444', borderRadius: 'var(--radius)', padding: '12px 16px', color: '#ef4444', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
          [ERROR] {error}
        </div>
      )}

      <button suppressHydrationWarning onClick={() => calculate()} className="btn-primary" style={{ minHeight: 56, marginBottom: 24 }}>
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
            <div className="result-card success" style={{ background: 'var(--card-bg)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: 8 }}>
                {mode === 'forward' ? 'Pre-Tax Price' : '✓ Original Price (Pre-Tax)'}
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>
                {mode === 'forward' ? 'Amount entered' : 'Before tax was applied'}
              </div>
            </div>

            {/* Tax Amount */}
            <div className="result-card danger" style={{ background: 'var(--card-bg)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f87171', marginBottom: 8 }}>
                Sales Tax ({result.taxRate}%)
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#ef4444', lineHeight: 1 }}>
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>
                NY combined tax
              </div>
            </div>

            {/* Total Price */}
            <div className="result-card neutral" style={{ background: 'var(--card-bg)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#e4e4e7', marginBottom: 8 }}>
                {mode === 'forward' ? '✓ Total Price Paid' : 'Total Paid'}
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                ${fmt(result.totalPrice)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>
                {mode === 'forward' ? 'Checkout price' : 'Amount you entered'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button suppressHydrationWarning onClick={copy} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
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
            <button suppressHydrationWarning onClick={reset} className="btn-secondary" style={{ flex: 1, minHeight: 48 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset
            </button>
          </div>

          {/* Formula display */}
          <div style={{ background: 'var(--bg)', border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: 13, color: 'var(--primary)', marginTop: 16, fontFamily: 'var(--font-mono)', wordBreak: 'break-word' }}>
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
