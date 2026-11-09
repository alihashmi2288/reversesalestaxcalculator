'use client';
import { useState, useCallback, useRef, useEffect, useId } from 'react';
import {
  calculateReverseTax,
  calculateForwardTax,
  parseNumberSafe,
  fmt,
  type BasicResult,
} from '@/lib/taxCalc';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

// 4 common quick percentage chips
const QUICK_RATES = [6, 7, 8.25, 10];
const SORTED_STATE_TAX_RATES = STATE_TAX_RATES.slice().sort((a, b) => a.state.localeCompare(b.state));

export type RoundingMode = '2' | '3' | 'none';

interface TaxLayer {
  id: number;
  name: string;
  rate: string;
}

export interface BasicTabProps {
  mode?: 'reverse' | 'forward';
  onModeChange?: (mode: 'reverse' | 'forward') => void;
  onSwitchTab?: (tabId: string) => void;
  defaultAmount?: string;
  defaultRate?: string;
}

export default function BasicTab({
  mode = 'reverse',
  onModeChange,
  onSwitchTab,
  defaultAmount,
  defaultRate,
}: BasicTabProps) {
  // Input IDs for strict accessibility linking
  const amountInputId = useId();
  const taxRateInputId = useId();
  const amountErrorId = useId();
  const rateErrorId = useId();
  const stateSelectId = useId();
  const tipInputId = useId();

  // Initial values: identical on server and client to guarantee zero hydration mismatch
  const initialAmount = defaultAmount || (mode === 'reverse' ? '108.25' : '100.00');
  const initialRate = defaultRate || '8.25';

  const [amount, setAmount] = useState(initialAmount);
  const [taxRate, setTaxRate] = useState(initialRate);
  const [selectedQuick, setSelectedQuick] = useState<number | null>(8.25);
  const [selectedState, setSelectedState] = useState('');

  // More options disclosure state
  const [rounding, setRounding] = useState<RoundingMode>('2');
  const [tip, setTip] = useState('');
  const [taxLayers, setTaxLayers] = useState<TaxLayer[]>([]);
  const [rememberChoices, setRememberChoices] = useState(false);

  // Initial calculation result rendered synchronously for immediate SSR output (Googlebot/SEO)
  const [result, setResult] = useState<BasicResult | null>(() => {
    try {
      const p = parseFloat(initialAmount);
      const r = parseFloat(initialRate);
      if (mode === 'reverse') {
        return calculateReverseTax(p, r, { rounding: '2' });
      } else {
        return calculateForwardTax(p, r, { rounding: '2' });
      }
    } catch {
      return null;
    }
  });

  const [amountError, setAmountError] = useState('');
  const [rateError, setRateError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const amountInputRef = useRef<HTMLInputElement>(null);
  const taxRateInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const nextLayerId = useRef(1);

  // Safe universal select-all on focus (handles iOS Safari touch selection deselect)
  const handleSelectOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    target.select();
    setTimeout(() => {
      try {
        target.setSelectionRange(0, target.value.length);
      } catch {
        // unsupported or element unmounted
      }
    }, 50);
  };

  // Restore saved preferences from localStorage safely after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pretax_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.state) {
          setSelectedState(parsed.state);
          const found = SORTED_STATE_TAX_RATES.find((s) => s.abbreviation === parsed.state);
          if (found) {
            setTaxRate(String(found.rate));
            setSelectedQuick(null);
          }
        }
        if (parsed.rounding) setRounding(parsed.rounding);
        setRememberChoices(true);
      }
    } catch {
      // localStorage disabled or private browsing; safely ignore
    }
  }, []);

  // Restore state from URL hash if provided
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applyHash = () => {
      const hash = window.location.hash;
      if (hash && (hash.startsWith('#calc?') || hash.startsWith('#mode='))) {
        try {
          const queryStr = hash.startsWith('#calc?') ? hash.slice(6) : hash.slice(1);
          const params = new URLSearchParams(queryStr);
          const hMode = params.get('mode');
          const hAmount = params.get('amount');
          const hRate = params.get('rate');

          if (hMode === 'reverse' || hMode === 'forward') {
            onModeChange?.(hMode);
          }
          if (hAmount && !isNaN(parseNumberSafe(hAmount))) {
            setAmount(hAmount);
          }
          if (hRate && !isNaN(parseNumberSafe(hRate))) {
            setTaxRate(hRate);
            setSelectedQuick(null);
            setSelectedState('');
          }
        } catch {
          // ignore malformed hash
        }
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [onModeChange]);

  // Persist preferences when rememberChoices is enabled
  useEffect(() => {
    if (!rememberChoices) return;
    try {
      localStorage.setItem(
        'pretax_preferences',
        JSON.stringify({
          state: selectedState,
          rounding,
        })
      );
    } catch {
      // ignore
    }
  }, [rememberChoices, selectedState, rounding]);

  // Live debounced calculation (120ms) as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      setAmountError('');
      setRateError('');
      setGeneralError('');

      // If either field is completely cleared, switch to neutral state without error
      if (!amount.trim() || !taxRate.trim()) {
        setResult(null);
        return;
      }

      const p = parseNumberSafe(amount);
      const r = parseNumberSafe(taxRate);
      const tipVal = tip.trim() ? parseNumberSafe(tip) : 0;

      let hasError = false;

      // Validate Amount
      if (isNaN(p) || p <= 0) {
        setAmountError('Please enter a valid dollar amount greater than $0.00.');
        hasError = true;
      } else if (p > 1_000_000_000_000) {
        setAmountError('Amount exceeds calculation limit ($1 trillion).');
        hasError = true;
      }

      // Validate Tax Rate
      if (isNaN(r) || r < 0) {
        setRateError('Enter a valid tax rate percentage.');
        hasError = true;
      } else if (r > 100) {
        setRateError('Enter a rate between 0% and 100%.');
        hasError = true;
      }

      // Validate Tip
      if (mode === 'reverse' && tipVal > 0 && !isNaN(p) && tipVal >= p) {
        setGeneralError('Tip cannot be greater than or equal to total receipt price.');
        hasError = true;
      }

      if (hasError) {
        setResult(null);
        return;
      }

      try {
        let res: BasicResult;
        if (mode === 'reverse') {
          res = calculateReverseTax(p, r, {
            tip: tipVal > 0 ? tipVal : undefined,
            rounding,
          });
        } else {
          res = calculateForwardTax(p, r, { rounding });
        }

        if (isFinite(res.preTaxPrice) && isFinite(res.taxAmount)) {
          setResult(res);
          const preTaxFormatted = fmt(res.preTaxPrice, rounding);
          const taxFormatted = fmt(res.taxAmount, rounding);
          const totalFormatted = fmt(res.totalPaid, rounding);

          if (mode === 'reverse') {
            setAnnouncement(
              `Pre-tax price: $${preTaxFormatted}. Sales tax: $${taxFormatted}. Total paid: $${totalFormatted}.`
            );
          } else {
            setAnnouncement(
              `Price before tax: $${preTaxFormatted}. Sales tax: $${taxFormatted}. Total with tax: $${totalFormatted}.`
            );
          }
        } else {
          setResult(null);
        }
      } catch (err) {
        setGeneralError((err as Error).message);
        setResult(null);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [amount, taxRate, mode, rounding, tip]);

  // Handle Quick Rate chip clicks
  const handleQuickRate = (rateVal: number) => {
    setTaxRate(String(rateVal));
    setSelectedQuick(rateVal);
    setSelectedState('');
  };

  // Handle State Dropdown selection
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedState(val);
    if (val) {
      const found = SORTED_STATE_TAX_RATES.find((s) => s.abbreviation === val);
      if (found) {
        setTaxRate(String(found.rate));
        setSelectedQuick(null);
      }
    }
  };

  // Local tax layers logic
  const addTaxLayer = () => {
    if (taxLayers.length >= 5) return;
    const id = nextLayerId.current++;
    const defaultName = taxLayers.length === 0 ? 'State rate' : taxLayers.length === 1 ? 'County rate' : 'City rate';
    const updated = [...taxLayers, { id, name: defaultName, rate: '1.0' }];
    setTaxLayers(updated);
    recomputeFromLayers(updated);
  };

  const updateTaxLayer = (id: number, field: 'name' | 'rate', value: string) => {
    const updated = taxLayers.map((l) => (l.id === id ? { ...l, [field]: value } : l));
    setTaxLayers(updated);
    if (field === 'rate') {
      recomputeFromLayers(updated);
    }
  };

  const removeTaxLayer = (id: number) => {
    const updated = taxLayers.filter((l) => l.id !== id);
    setTaxLayers(updated);
    recomputeFromLayers(updated);
  };

  const recomputeFromLayers = (layers: TaxLayer[]) => {
    if (layers.length === 0) return;
    let sum = 0;
    for (const l of layers) {
      const parsed = parseNumberSafe(l.rate);
      if (!isNaN(parsed) && parsed >= 0) sum += parsed;
    }
    const combinedRate = (Math.round(sum * 1000) / 1000).toString();
    setTaxRate(combinedRate);
    setSelectedQuick(null);
    setSelectedState('');
  };

  // Reset to default sample values
  const handleReset = () => {
    const defaultAmt = mode === 'reverse' ? '108.25' : '100.00';
    setAmount(defaultAmt);
    setTaxRate('8.25');
    setTip('');
    setTaxLayers([]);
    setAmountError('');
    setRateError('');
    setGeneralError('');
    setSelectedQuick(8.25);
    setSelectedState('');
    setCopied(false);
    setShared(false);
    try {
      const p = parseFloat(defaultAmt);
      const res = mode === 'reverse' ? calculateReverseTax(p, 8.25) : calculateForwardTax(p, 8.25);
      setResult(res);
    } catch {
      setResult(null);
    }
    setAnnouncement('Calculator reset to default sample values.');
  };

  // Copy results to clipboard
  const handleCopy = () => {
    if (!result) return;
    const modeLabel = mode === 'reverse' ? 'Reverse Sales Tax Calculation' : 'Sales Tax Calculation (Forward)';
    const text = `${modeLabel}
Pre-Tax Price: $${fmt(result.preTaxPrice, rounding)}
Tax Rate: ${result.taxRate}%
Sales Tax Amount: $${fmt(result.taxAmount, rounding)}
Total Amount: $${fmt(result.totalPaid, rounding)}${result.tipAmount ? `\nTip Deducted: $${fmt(result.tipAmount, rounding)}` : ''}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setAnnouncement('Calculation results copied to clipboard.');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Share calculation link
  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const hash = `#calc?mode=${mode}&amount=${encodeURIComponent(amount)}&rate=${encodeURIComponent(taxRate)}`;
    const fullUrl = `${window.location.origin}${window.location.pathname}${hash}`;

    navigator.clipboard.writeText(fullUrl).then(() => {
      setShared(true);
      setAnnouncement('Shareable calculation link copied to clipboard.');
      setTimeout(() => setShared(false), 2500);
    });
  };

  // Print results
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Screen Reader Live Region for Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* ── 1. DUAL INPUT GRID (Desktop: 2 columns, Mobile: 1 column) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="grid-responsive">
        {/* Field 1: Amount */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', height: 26, marginBottom: 8 }}>
            <label
              htmlFor={amountInputId}
              style={{
                fontWeight: 700,
                fontSize: 13.5,
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {mode === 'reverse' ? 'Total with tax' : 'Price before tax'}
            </label>
          </div>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              ref={amountInputRef}
              id={amountInputId}
              name="amount"
              autoComplete="off"
              type="text"
              inputMode="decimal"
              placeholder={mode === 'reverse' ? '108.25' : '100.00'}
              aria-label={mode === 'reverse' ? 'Total with tax in dollars' : 'Price before tax in dollars'}
              aria-invalid={!!amountError}
              aria-describedby={amountError ? amountErrorId : undefined}
              value={amount}
              onFocus={handleSelectOnFocus}
              onChange={(e) => setAmount(e.target.value)}
              className="calc-input with-prefix"
              style={{
                color: 'var(--ink)',
                fontWeight: 600,
                borderColor: amountError ? 'var(--error)' : undefined,
              }}
            />
          </div>
          {amountError && (
            <div
              id={amountErrorId}
              role="alert"
              style={{
                color: 'var(--error)',
                fontSize: 12.5,
                fontWeight: 600,
                marginTop: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{amountError}</span>
            </div>
          )}
        </div>

        {/* Field 2: Sales Tax Rate + 'Don't know your rate?' Link */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 26, marginBottom: 8 }}>
            <label
              htmlFor={taxRateInputId}
              style={{
                fontWeight: 700,
                fontSize: 13.5,
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Sales tax rate
            </label>
            <button
              type="button"
              onClick={() => onSwitchTab?.('find-rate')}
              className="link-green"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontSize: 12.5,
                fontWeight: 600,
                color: 'var(--primary)',
                textDecoration: 'underline',
                lineHeight: 1.2,
              }}
              title="Calculate applied tax rate from receipt totals"
            >
              Don&apos;t know your rate?
            </button>
          </div>
          <div className="input-wrapper">
            <input
              ref={taxRateInputRef}
              id={taxRateInputId}
              name="taxRate"
              autoComplete="off"
              type="text"
              inputMode="decimal"
              placeholder="8.25"
              aria-label="Sales tax rate percentage"
              aria-invalid={!!rateError}
              aria-describedby={rateError ? rateErrorId : undefined}
              value={taxRate}
              onFocus={handleSelectOnFocus}
              onChange={(e) => {
                setTaxRate(e.target.value);
                setSelectedQuick(null);
                setSelectedState('');
              }}
              className="calc-input with-suffix"
              style={{
                color: 'var(--ink)',
                fontWeight: 600,
                borderColor: rateError ? 'var(--error)' : undefined,
              }}
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
          {rateError && (
            <div
              id={rateErrorId}
              role="alert"
              style={{
                color: 'var(--error)',
                fontSize: 12.5,
                fontWeight: 600,
                marginTop: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{rateError}</span>
            </div>
          )}
        </div>
      </div>

      {/* General Form Error Callout (if any, e.g. tip validation) */}
      {generalError && (
        <div
          role="alert"
          style={{
            backgroundColor: 'var(--error-bg)',
            border: '1px solid var(--error-border)',
            borderRadius: 'var(--radius-xs)',
            padding: '10px 14px',
            color: 'var(--error)',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{generalError}</span>
        </div>
      )}

      {/* ── 2. MERGED RATE CONTROLS: State Dropdown + 4 Quick Chips ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }} className="grid-responsive">
          {/* State Dropdown */}
          <div style={{ flex: 1 }}>
            <label htmlFor={stateSelectId} className="sr-only">Select your state</label>
            <select
              id={stateSelectId}
              name="state"
              aria-label="Select US state to auto-fill combined sales tax rate"
              className="state-select"
              value={selectedState}
              onChange={handleStateChange}
              style={{ height: 44, color: 'var(--ink)' }}
            >
              <option value="">Select your state (auto-fills rate)</option>
              {SORTED_STATE_TAX_RATES.map((s) => (
                <option key={s.abbreviation} value={s.abbreviation}>
                  {s.state} — {s.rate}% combined ({s.stateRate}% state base)
                </option>
              ))}
            </select>
          </div>

          {/* 4 Quick Preset Chips */}
          <div role="group" aria-label="Quick sales tax percentage presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {QUICK_RATES.map((r) => {
              const active = selectedQuick === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleQuickRate(r)}
                  className={`quick-btn ${active ? 'active' : ''}`}
                  aria-pressed={active}
                  aria-label={`Set tax rate to ${r}%`}
                  style={{
                    minHeight: 44,
                    minWidth: 44,
                    padding: '8px 12px',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? 'var(--primary)' : 'var(--canvas)',
                    color: active ? '#ffffff' : 'var(--body)',
                    borderColor: active ? 'var(--forest)' : 'var(--hairline-strong)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  {r}%
                </button>
              );
            })}
          </div>
        </div>

        {/* Small Helper Line */}
        <div style={{ fontSize: 12.5, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>Combined state + average local rate. Check your receipt for the exact rate.</span>
        </div>
      </div>

      {/* ── 3. MORE OPTIONS (Collapsed Disclosure) ── */}
      <details
        className="more-options-disclosure"
        style={{
          border: '1px solid var(--hairline-strong)',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--canvas-soft)',
          padding: '12px 16px',
        }}
      >
        <summary
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            color: 'var(--primary-deep)',
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            minHeight: 28,
          }}
        >
          <span>More options</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>
            (rounding, tax layers, tip, preferences)
          </span>
        </summary>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 12, borderTop: '1px solid var(--hairline)' }}>
          {/* Rounding Precision */}
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginBottom: 6 }}>
              Rounding precision
            </legend>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[
                { id: '2', label: '2 decimals (standard cents)' },
                { id: '3', label: '3 decimals' },
                { id: 'none', label: 'No rounding (full precision)' },
              ].map(({ id, label }) => (
                <label key={id} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--body)', cursor: 'pointer', minHeight: 44, padding: '4px 0' }}>
                  <input
                    type="radio"
                    name="rounding-choice"
                    value={id}
                    checked={rounding === id}
                    onChange={() => setRounding(id as RoundingMode)}
                    style={{ accentColor: 'var(--primary)', width: 18, height: 18 }}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Local Tax Layers */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>
                Add local tax layers (State, County, City)
              </span>
              {taxLayers.length < 5 && (
                <button
                  type="button"
                  onClick={addTaxLayer}
                  className="btn-secondary"
                  style={{ minHeight: 32, padding: '4px 10px', fontSize: 12 }}
                >
                  + Add layer
                </button>
              )}
            </div>

            {taxLayers.length === 0 ? (
              <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: 0 }}>
                Break your sales tax into individual jurisdictions (e.g. State 6.25% + County 1% + City 1%). Up to 5 layers.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {taxLayers.map((layer) => (
                  <div key={layer.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      id={`tax-layer-name-${layer.id}`}
                      name={`taxLayerName-${layer.id}`}
                      type="text"
                      value={layer.name}
                      onChange={(e) => updateTaxLayer(layer.id, 'name', e.target.value)}
                      placeholder="Layer name (e.g. County)"
                      className="calc-input"
                      style={{ flex: 2, height: 36, fontSize: 13, padding: '6px 10px' }}
                      aria-label="Tax layer name"
                    />
                    <div className="input-wrapper" style={{ flex: 1 }}>
                      <input
                        id={`tax-layer-rate-${layer.id}`}
                        name={`taxLayerRate-${layer.id}`}
                        type="text"
                        inputMode="decimal"
                        value={layer.rate}
                        onChange={(e) => updateTaxLayer(layer.id, 'rate', e.target.value)}
                        placeholder="1.0"
                        className="calc-input with-suffix"
                        style={{ height: 36, fontSize: 13, padding: '6px 24px 6px 10px' }}
                        aria-label="Tax layer rate percentage"
                      />
                      <span className="input-suffix" aria-hidden="true" style={{ fontSize: 12 }}>%</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTaxLayer(layer.id)}
                      aria-label={`Remove ${layer.name}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--error)',
                        cursor: 'pointer',
                        padding: 6,
                        minWidth: 36,
                        minHeight: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--primary-deep)', marginTop: 4 }}>
                  Combined rate: {taxRate}% (feeds calculator rate field)
                </div>
              </div>
            )}
          </div>

          {/* Optional Tip (Reverse Mode Only) */}
          {mode === 'reverse' && (
            <div>
              <label
                htmlFor={tipInputId}
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: 13,
                  color: 'var(--ink)',
                  marginBottom: 6,
                }}
              >
                Tip included on receipt (optional)
              </label>
              <div className="input-wrapper" style={{ maxWidth: 200 }}>
                <span className="input-prefix" aria-hidden="true">$</span>
                <input
                  id={tipInputId}
                  name="tip"
                  autoComplete="off"
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={tip}
                  onFocus={handleSelectOnFocus}
                  onChange={(e) => setTip(e.target.value)}
                  className="calc-input with-prefix"
                  style={{ height: 44, fontSize: 13 }}
                />
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                Tax is charged before tip, so tip is removed before backing out sales tax.
              </div>
            </div>
          )}

          {/* Remember Choices */}
          <div>
            <label htmlFor="remember-choices" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink)', cursor: 'pointer', fontWeight: 600, minHeight: 44, padding: '4px 0' }}>
              <input
                id="remember-choices"
                name="rememberChoices"
                type="checkbox"
                checked={rememberChoices}
                onChange={(e) => {
                  setRememberChoices(e.target.checked);
                  if (!e.target.checked) {
                    try {
                      localStorage.removeItem('pretax_preferences');
                    } catch {
                      // ignore
                    }
                  }
                }}
                style={{ accentColor: 'var(--primary)', width: 18, height: 18 }}
              />
              <span>Remember my choices (stores state and rounding locally in your browser)</span>
            </label>
          </div>
        </div>
      </details>

      {/* ── 4. LIVE RESULTS AREA (Reserved Space to Prevent CLS) ── */}
      <div
        ref={resultsRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.15s ease',
        }}
      >
        {/* 3 Result Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: 14,
          }}
          className="grid-results"
        >
          {/* Card 1: Original Price */}
          <div
            className={`result-card ${result ? (mode === 'reverse' ? 'success' : 'neutral') : 'neutral'}`}
            style={{
              borderWidth: result && mode === 'reverse' ? 2 : 1,
              padding: '16px 14px',
            }}
          >
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: result && mode === 'reverse' ? 'var(--primary-deep)' : 'var(--body)',
                marginBottom: 4,
              }}
            >
              Original price
            </div>
            <div
              className="tabular-nums"
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: result ? (mode === 'reverse' ? 'var(--primary)' : 'var(--ink)') : 'var(--muted)',
                lineHeight: 1.15,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {result ? `$${fmt(result.preTaxPrice, rounding)}` : '$—'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontWeight: 500 }}>
              {mode === 'reverse' ? 'Pre-tax item cost' : 'Base pre-tax price'}
            </div>
          </div>

          {/* Card 2: Tax Amount */}
          <div
            className="result-card"
            style={{
              background: 'var(--canvas)',
              border: '1px solid var(--hairline-strong)',
              color: 'var(--ink)',
              padding: '16px 14px',
            }}
          >
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: 'var(--body)',
                marginBottom: 4,
              }}
            >
              Tax amount
            </div>
            <div
              className="tabular-nums"
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: result ? 'var(--primary-deep)' : 'var(--muted)',
                lineHeight: 1.15,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {result ? `$${fmt(result.taxAmount, rounding)}` : '$—'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontWeight: 500 }}>
              {result ? `${result.taxRate}% sales tax` : 'Sales tax'}
            </div>
          </div>

          {/* Card 3: Total Paid / Total with Tax */}
          <div
            className={`result-card ${result ? (mode === 'forward' ? 'success' : 'neutral') : 'neutral'}`}
            style={{
              borderWidth: result && mode === 'forward' ? 2 : 1,
              padding: '16px 14px',
            }}
          >
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: result && mode === 'forward' ? 'var(--primary-deep)' : 'var(--body)',
                marginBottom: 4,
              }}
            >
              {mode === 'reverse' ? 'Total paid' : 'Total with tax'}
            </div>
            <div
              className="tabular-nums"
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: result ? (mode === 'forward' ? 'var(--primary)' : 'var(--ink)') : 'var(--muted)',
                lineHeight: 1.15,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {result ? `$${fmt(result.totalPaid, rounding)}` : '$—'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontWeight: 500 }}>
              {mode === 'reverse' ? 'Receipt total' : 'Final checkout total'}
            </div>
          </div>
        </div>

        {/* Consolidated: 'How this was calculated' Collapsed Section */}
        <details className="how-calc-disclosure">
          <summary>
            <span>How this was calculated</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="how-calc-content">
            {result ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Formula Line */}
                <div style={{ background: 'var(--canvas)', padding: '8px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--mint-200)', fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                  <strong style={{ color: 'var(--primary-deep)' }}>Formula: </strong>
                  {mode === 'reverse' ? (
                    <>
                      ${fmt(result.preTaxPrice, rounding)} = ${fmt(result.totalPaid - (result.tipAmount || 0), rounding)} ÷ (1 + {result.taxRate}/100)
                    </>
                  ) : (
                    <>
                      ${fmt(result.totalPaid, rounding)} = ${fmt(result.preTaxPrice, rounding)} × (1 + {result.taxRate}/100)
                    </>
                  )}
                </div>

                {/* Verification Check Line */}
                <div style={{ background: 'var(--canvas)', padding: '8px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--mint-200)', fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>Check: </strong>
                  {mode === 'reverse' ? (
                    <>
                      ${fmt(result.preTaxPrice, rounding)} × {(1 + Number(result.taxRate) / 100).toFixed(4).replace(/\.?0+$/, '')} = ${fmt(result.totalPaid - (result.tipAmount || 0), rounding)}
                      {result.tipAmount ? ` (plus $${fmt(result.tipAmount, rounding)} tip = $${fmt(result.totalPaid, rounding)})` : ''}
                    </>
                  ) : (
                    <>
                      ${fmt(result.preTaxPrice, rounding)} + ${fmt(result.taxAmount, rounding)} = ${fmt(result.totalPaid, rounding)}
                    </>
                  )}
                </div>

                {/* Arithmetic Walkthrough Steps */}
                <div style={{ marginTop: 2 }}>
                  <strong style={{ display: 'block', fontSize: 12.5, color: 'var(--ink)', marginBottom: 4 }}>
                    Arithmetic steps:
                  </strong>
                  {mode === 'reverse' ? (
                    <ol style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5 }}>
                      {result.tipAmount ? (
                        <li>
                          <strong>Deduct tip:</strong> ${fmt(result.totalPaid, rounding)} − ${fmt(result.tipAmount, rounding)} = ${fmt(result.totalPaid - result.tipAmount, rounding)} taxable base.
                        </li>
                      ) : null}
                      <li>
                        <strong>Tax factor:</strong> 1 + ({result.taxRate}% ÷ 100) = {(1 + result.taxRate / 100).toFixed(4).replace(/\.?0+$/, '')} divisor.
                      </li>
                      <li>
                        <strong>Divide for pre-tax:</strong> ${fmt(result.totalPaid - (result.tipAmount || 0), rounding)} ÷ {(1 + result.taxRate / 100).toFixed(4).replace(/\.?0+$/, '')} = <strong>${fmt(result.preTaxPrice, rounding)}</strong>
                      </li>
                      <li>
                        <strong>Isolate sales tax:</strong> ${fmt(result.totalPaid - (result.tipAmount || 0), rounding)} − ${fmt(result.preTaxPrice, rounding)} = <strong>${fmt(result.taxAmount, rounding)}</strong>
                      </li>
                    </ol>
                  ) : (
                    <ol style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5 }}>
                      <li>
                        <strong>Tax rate decimal:</strong> {result.taxRate}% ÷ 100 = {(result.taxRate / 100).toFixed(4).replace(/\.?0+$/, '')}
                      </li>
                      <li>
                        <strong>Calculate sales tax:</strong> ${fmt(result.preTaxPrice, rounding)} × {(result.taxRate / 100).toFixed(4).replace(/\.?0+$/, '')} = <strong>${fmt(result.taxAmount, rounding)}</strong>
                      </li>
                      <li>
                        <strong>Add to base price:</strong> ${fmt(result.preTaxPrice, rounding)} + ${fmt(result.taxAmount, rounding)} = <strong>${fmt(result.totalPaid, rounding)}</strong>
                      </li>
                    </ol>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--muted)', fontSize: 12.5 }}>
                Enter a dollar amount and sales tax rate above to see the complete mathematical breakdown.
              </div>
            )}
          </div>
        </details>

        {/* Short One-Line Rounding Note */}
        <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginBottom: 14 }}>
          Results rounded to nearest cent. Store receipt line items may differ by ±$0.01.
        </div>

        {/* Dedicated Print-Only Summary (Preserved for Print Stylesheet) */}
        {result && (
          <div className="print-only-summary" aria-hidden="true">
            <div style={{ borderBottom: '2pt solid #008254', paddingBottom: '6pt', marginBottom: '12pt' }}>
              <div style={{ fontSize: '16pt', fontWeight: 800, color: '#000000' }}>
                PreTaxPrice — Reverse Sales Tax Calculation Summary
              </div>
              <div style={{ fontSize: '10pt', color: '#555555', marginTop: '4pt' }}>
                Calculated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · salestaxreversecalculator.com
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '14pt', fontSize: '11pt' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '4pt 0', fontWeight: 600 }}>Mode:</td>
                  <td style={{ padding: '4pt 0', textAlign: 'right' }}>{mode === 'reverse' ? 'Reverse (Find price before tax)' : 'Forward (Add sales tax)'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4pt 0', fontWeight: 600 }}>{mode === 'reverse' ? 'Total with Tax (Input):' : 'Price Before Tax (Input):'}</td>
                  <td style={{ padding: '4pt 0', textAlign: 'right' }}>${amount}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4pt 0', fontWeight: 600 }}>Sales Tax Rate:</td>
                  <td style={{ padding: '4pt 0', textAlign: 'right' }}>{result.taxRate}%</td>
                </tr>
                {result.tipAmount ? (
                  <tr>
                    <td style={{ padding: '4pt 0', fontWeight: 600 }}>Tip Deducted:</td>
                    <td style={{ padding: '4pt 0', textAlign: 'right' }}>${fmt(result.tipAmount, rounding)}</td>
                  </tr>
                ) : null}
                <tr style={{ borderTop: '1pt solid #cccccc' }}>
                  <td style={{ padding: '6pt 0', fontWeight: 700 }}>Original Pre-Tax Price:</td>
                  <td style={{ padding: '6pt 0', textAlign: 'right', fontWeight: 700 }}>${fmt(result.preTaxPrice, rounding)}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4pt 0', fontWeight: 700 }}>Sales Tax Amount:</td>
                  <td style={{ padding: '4pt 0', textAlign: 'right', fontWeight: 700 }}>${fmt(result.taxAmount, rounding)}</td>
                </tr>
                <tr style={{ borderTop: '2pt solid #000000' }}>
                  <td style={{ padding: '6pt 0', fontWeight: 800 }}>Total Paid:</td>
                  <td style={{ padding: '6pt 0', textAlign: 'right', fontWeight: 800 }}>${fmt(result.totalPaid, rounding)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ── 5. ACTION ROW: Primary Copy Result + Smaller Secondary Actions ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 0.9fr',
            gap: 8,
          }}
          className="grid-responsive"
        >
          {/* Primary Action: Copy Result */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!result}
            className="btn-primary"
            style={{
              minHeight: 44,
              fontSize: 13,
              fontWeight: 700,
              padding: '8px 12px',
              opacity: result ? 1 : 0.6,
              cursor: result ? 'pointer' : 'not-allowed',
            }}
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                <span>Copy result</span>
              </>
            )}
          </button>

          {/* Secondary Action: Share Link */}
          <button
            type="button"
            onClick={handleShare}
            className="btn-secondary"
            style={{
              minHeight: 44,
              fontSize: 13,
              padding: '8px 10px',
            }}
          >
            {shared ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Copied!</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                <span>Share link</span>
              </>
            )}
          </button>

          {/* Secondary Action: Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="btn-secondary"
            style={{
              minHeight: 44,
              fontSize: 13,
              padding: '8px 10px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print</span>
          </button>

          {/* Secondary Action: Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
            style={{
              minHeight: 44,
              fontSize: 13,
              padding: '8px 10px',
              color: 'var(--muted)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
