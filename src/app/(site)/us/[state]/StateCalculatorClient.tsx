'use client';

import React, { useState, useId, useCallback } from 'react';
import { calculateReverseTax, calculateForwardTax, fmt, type BasicResult } from '@/lib/taxCalc';
import type { StateRate } from '@/data/stateTaxRates';

export interface PresetRate {
  label: string;
  rate: number;
  desc?: string;
}

interface Props {
  stateData: StateRate;
  rateNote?: string;
  presetRates?: PresetRate[];
}

type CalcMode = 'reverse' | 'forward';

export default function StateCalculatorClient({ stateData, rateNote, presetRates }: Props) {
  const [mode, setMode] = useState<CalcMode>('reverse');
  const [amountStr, setAmountStr] = useState<string>('100.00');
  const [taxRateStr, setTaxRateStr] = useState<string>(String(stateData.rate));
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const amountInputId = useId();
  const taxRateInputId = useId();

  // Compute available presets: use passed presetRates or derive sensible defaults from state data
  const presets: PresetRate[] = React.useMemo(() => {
    if (presetRates && presetRates.length > 0) {
      return presetRates;
    }
    const derived: PresetRate[] = [];
    if (stateData.rate === 0) {
      derived.push({ label: `${stateData.state} Tax-Free (0%)`, rate: 0, desc: 'No sales tax' });
      return derived;
    }
    if (stateData.stateRate > 0 && Math.abs(stateData.stateRate - stateData.rate) >= 0.01) {
      derived.push({
        label: `${stateData.state} Base (${stateData.stateRate}%)`,
        rate: stateData.stateRate,
        desc: 'Statewide base rate',
      });
      derived.push({
        label: `Combined Avg (${stateData.rate}%)`,
        rate: stateData.rate,
        desc: 'State + average local rate',
      });
    } else {
      derived.push({
        label: `${stateData.state} Rate (${stateData.rate}%)`,
        rate: stateData.rate,
        desc: 'Standard statewide rate',
      });
    }
    return derived;
  }, [presetRates, stateData]);

  // Execute calculation
  const executeCalculation = useCallback(
    (customAmount?: string, customRate?: string, customMode?: CalcMode): BasicResult | null => {
      const aStr = customAmount !== undefined ? customAmount : amountStr;
      const rStr = customRate !== undefined ? customRate : taxRateStr;
      const currentMode = customMode !== undefined ? customMode : mode;

      const rawAmount = parseFloat(aStr);
      const rawRate = parseFloat(rStr);

      if (isNaN(rawAmount) || rawAmount <= 0) {
        setError('Please enter a valid price greater than $0.');
        return null;
      }
      if (isNaN(rawRate) || rawRate < 0 || rawRate > 100) {
        setError('Please enter a valid tax rate between 0% and 100%.');
        return null;
      }

      setError('');
      try {
        if (currentMode === 'reverse') {
          return calculateReverseTax(rawAmount, rawRate);
        } else {
          return calculateForwardTax(rawAmount, rawRate);
        }
      } catch (err) {
        setError((err as Error).message || 'Calculation error');
        return null;
      }
    },
    [amountStr, taxRateStr, mode]
  );

  // Result state pre-populated with default sample on load (zero CLS)
  const [result, setResult] = useState<BasicResult | null>(() => {
    try {
      const defaultPrice = 100.0;
      const defaultRate = Number(stateData.rate) || 0;
      return calculateReverseTax(defaultPrice, defaultRate);
    } catch {
      return null;
    }
  });

  const handleModeChange = (newMode: CalcMode) => {
    setMode(newMode);
    const newResult = executeCalculation(amountStr, taxRateStr, newMode);
    if (newResult) setResult(newResult);
  };

  const handleAmountChange = (val: string) => {
    setAmountStr(val);
    const newResult = executeCalculation(val, taxRateStr, mode);
    if (newResult) setResult(newResult);
  };

  const handleRateChange = (val: string) => {
    setTaxRateStr(val);
    setActivePreset(null);
    const newResult = executeCalculation(amountStr, val, mode);
    if (newResult) setResult(newResult);
  };

  const handlePresetClick = (p: PresetRate) => {
    const rateString = String(p.rate);
    setTaxRateStr(rateString);
    setActivePreset(p.label);
    const newResult = executeCalculation(amountStr, rateString, mode);
    if (newResult) setResult(newResult);
  };

  const handleModeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleModeChange('forward');
      document.getElementById('mode-btn-forward-state')?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handleModeChange('reverse');
      document.getElementById('mode-btn-reverse-state')?.focus();
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const formattedRate = `${result.taxRate}%`;
    const text =
      mode === 'reverse'
        ? `${stateData.state} Sales Tax Calculation (Pre-Tax Backwards Tax):\nReceipt Total Paid: $${fmt(result.totalPaid)}\n${stateData.state} Tax Rate: ${formattedRate}\nCalculated Pre-Tax Price: $${fmt(result.preTaxPrice)}\nSales Tax Paid: $${fmt(result.taxAmount)}`
        : `${stateData.state} Sales Tax Calculation (Add Forward Sales Tax):\nPre-Tax Shelf Price: $${fmt(result.preTaxPrice)}\n${stateData.state} Tax Rate: ${formattedRate}\nSales Tax Added: $${fmt(result.taxAmount)}\nCheckout Total: $${fmt(result.totalPaid)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleReset = () => {
    setMode('reverse');
    setAmountStr('100.00');
    setTaxRateStr(String(stateData.rate));
    setActivePreset(null);
    setError('');
    const newResult = executeCalculation('100.00', String(stateData.rate), 'reverse');
    if (newResult) setResult(newResult);
  };

  return (
    <div
      id="state-tax-calculator"
      className="calc-card"
      style={{
        border: '1px solid var(--hairline-strong)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--canvas)',
      }}
    >
      {/* ── Mode Switcher (Accessible Segmented Control) ──────── */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--ink)',
            }}
          >
            Select Calculation Mode
          </span>
          <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
            {mode === 'reverse'
              ? 'Backing out tax from gross total to find pre-tax price'
              : 'Adding sales tax to shelf/sticker price to calculate total'}
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label={`${stateData.state} Sales Tax Calculator Mode`}
          className="mode-segmented-control"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: 'var(--canvas-soft)',
            border: '1px solid var(--hairline-strong)',
            borderRadius: 'var(--radius-sm)',
            padding: 4,
            gap: 4,
          }}
          onKeyDown={handleModeKeyDown}
        >
          <button
            type="button"
            id="mode-btn-reverse-state"
            role="radio"
            aria-checked={mode === 'reverse'}
            tabIndex={mode === 'reverse' ? 0 : -1}
            onClick={() => handleModeChange('reverse')}
            className={`mode-segment-btn ${mode === 'reverse' ? 'active' : ''}`}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-xs)',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 46,
              background: mode === 'reverse' ? 'var(--primary)' : 'transparent',
              color: mode === 'reverse' ? '#ffffff' : 'var(--body)',
              boxShadow: mode === 'reverse' ? '0 2px 6px rgba(0, 130, 84, 0.25)' : 'none',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 16 }}>↺</span>
            <span>Pre-Tax Backwards Tax</span>
          </button>

          <button
            type="button"
            id="mode-btn-forward-state"
            role="radio"
            aria-checked={mode === 'forward'}
            tabIndex={mode === 'forward' ? 0 : -1}
            onClick={() => handleModeChange('forward')}
            className={`mode-segment-btn ${mode === 'forward' ? 'active' : ''}`}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-xs)',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 46,
              background: mode === 'forward' ? 'var(--primary)' : 'transparent',
              color: mode === 'forward' ? '#ffffff' : 'var(--body)',
              boxShadow: mode === 'forward' ? '0 2px 6px rgba(0, 130, 84, 0.25)' : 'none',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 16 }}>+</span>
            <span>Add Forward Sales Tax</span>
          </button>
        </div>
      </div>

      {/* ── Preset Rate Chips ──────────────────────────────────── */}
      {presets.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <span
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--ink)',
              marginBottom: 8,
            }}
          >
            Select {stateData.state} Rate Preset:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {presets.map((p) => {
              const isSelected = activePreset === p.label || (!activePreset && Math.abs(Number(taxRateStr) - p.rate) < 0.001);
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePresetClick(p)}
                  className={`quick-btn ${isSelected ? 'active' : ''}`}
                  style={{
                    fontSize: 12,
                    padding: '8px 12px',
                    minHeight: 38,
                  }}
                  title={p.desc || p.label}
                  aria-pressed={isSelected}
                >
                  <span>{isSelected ? '✓ ' : ''}{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Inputs Grid ────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Amount Input */}
        <div>
          <label
            htmlFor={amountInputId}
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 8,
              color: 'var(--ink)',
            }}
          >
            {mode === 'reverse'
              ? '1. Gross Receipt Amount (With Tax)'
              : '1. Pre-Tax Shelf Price (Sticker Price)'}
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id={amountInputId}
              name="taxAmountInput"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={amountStr}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="100.00"
              className="calc-input with-prefix"
              style={{ fontSize: 20, fontWeight: 700 }}
              aria-label={
                mode === 'reverse'
                  ? `Gross receipt total in ${stateData.state} with tax in dollars`
                  : `Pre-tax shelf price in ${stateData.state} in dollars`
              }
            />
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, display: 'block' }}>
            {mode === 'reverse'
              ? 'Enter the final checkout total paid from your receipt'
              : 'Enter the retail sticker/item price before tax is applied'}
          </span>
        </div>

        {/* Tax Rate Input */}
        <div>
          <label
            htmlFor={taxRateInputId}
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 8,
              color: 'var(--ink)',
            }}
          >
            2. {stateData.state} Sales Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              id={taxRateInputId}
              name="taxRateInput"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="0.001"
              value={taxRateStr}
              onChange={(e) => handleRateChange(e.target.value)}
              aria-label={`${stateData.state} sales tax rate percentage`}
              className="calc-input with-suffix"
              style={{ fontSize: 20, fontWeight: 700 }}
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, display: 'block' }}>
            {rateNote ||
              `Pre-filled with ${stateData.state}'s ${stateData.rate}% combined average rate`}
          </span>
        </div>
      </div>

      {/* ── Error Banner ───────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            background: 'var(--error-bg, #fff5f5)',
            border: '1px solid var(--error, #de2828)',
            borderRadius: 'var(--radius-xs)',
            padding: '12px 16px',
            color: 'var(--error, #de2828)',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* ── Calculate Primary Button ───────────────────────────── */}
      <button
        type="button"
        onClick={() => {
          const newResult = executeCalculation();
          if (newResult) setResult(newResult);
        }}
        className="btn-primary"
        style={{ minHeight: 52, marginBottom: 24, width: '100%' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h4" />
        </svg>
        <span>
          {mode === 'reverse'
            ? `Calculate ${stateData.state} Pre-Tax Price`
            : `Calculate Total with ${stateData.state} Tax`}
        </span>
      </button>

      {/* ── Results Display ────────────────────────────────────── */}
      {result && (
        <div style={{ animation: 'slideIn 0.3s ease' }} aria-live="polite">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 20,
            }}
          >
            {/* Pre-Tax Price Card */}
            <div
              className="result-card success"
              style={{
                background: 'var(--mint-50)',
                border: '2px solid var(--mint-200)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--primary-deep)',
                  marginBottom: 8,
                }}
              >
                {mode === 'reverse' ? '✓ Net Pre-Tax Price' : 'Pre-Tax Shelf Price'}
              </div>
              <div
                className="tabular-nums"
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--primary-deep)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ${fmt(result.preTaxPrice)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 8 }}>
                {mode === 'reverse'
                  ? 'Original price before sales tax was added'
                  : 'Sticker price entered'}
              </div>
            </div>

            {/* Tax Amount Card */}
            <div
              className="result-card"
              style={{
                background: 'var(--canvas)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--muted)',
                  marginBottom: 8,
                }}
              >
                Sales Tax ({result.taxRate}%)
              </div>
              <div
                className="tabular-nums"
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--primary-deep)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ${fmt(result.taxAmount)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 8 }}>
                {mode === 'reverse'
                  ? `${stateData.state} tax portion backed out`
                  : `${stateData.state} sales tax added`}
              </div>
            </div>

            {/* Total Paid Card */}
            <div
              className="result-card neutral"
              style={{
                background: 'var(--canvas-soft)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--muted)',
                  marginBottom: 8,
                }}
              >
                {mode === 'reverse' ? 'Total Receipt Paid' : '✓ Total with Tax'}
              </div>
              <div
                className="tabular-nums"
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ${fmt(result.totalPaid)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--body)', marginTop: 8 }}>
                {mode === 'reverse' ? 'Gross checkout amount entered' : 'Final checkout total to pay'}
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-secondary"
              style={{
                flex: '1 1 180px',
                minHeight: 44,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
              aria-label={`Copy ${stateData.state} calculation results to clipboard`}
            >
              {copied ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  <span>Copy Results</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
              style={{
                flex: '1 1 180px',
                minHeight: 44,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
              aria-label="Reset calculator inputs"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Reset</span>
            </button>
          </div>

          {/* Dynamic Mathematical Formula Box */}
          <div
            style={{
              background: 'var(--mint-50)',
              border: '1px solid var(--mint-200)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              fontSize: 13,
              color: 'var(--primary-deep)',
              marginTop: 16,
              fontFamily: 'var(--font-mono)',
              wordBreak: 'break-word',
            }}
          >
            {mode === 'reverse' ? (
              <span>
                <strong>Calculation formula:</strong> Pre-Tax Price = ${fmt(result.totalPaid)} ÷ (1 + {result.taxRate}/100) = ${fmt(result.preTaxPrice)} (Sales Tax: ${fmt(result.taxAmount)})
              </span>
            ) : (
              <span>
                <strong>Calculation formula:</strong> Sales Tax = ${fmt(result.preTaxPrice)} × ({result.taxRate}/100) = ${fmt(result.taxAmount)} → Checkout Total = ${fmt(result.totalPaid)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
