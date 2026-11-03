'use client';

import React, { useState, useEffect, useId } from 'react';
import { TOP_10_PRESETS } from '@/data/californiaTaxData';

type CalcMode = 'reverse' | 'forward';

interface StatutoryItem {
  name: string;
  rate: number;
  rateLabel: string;
  amount: number;
  description: string;
}

export function roundHalfUp(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

export function fmtMoney(val: number): string {
  return val.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CaliforniaTaxCalculator({ initialRate = 9.50 }: { initialRate?: number }) {
  const [mode, setMode] = useState<CalcMode>('reverse');
  const [amountStr, setAmountStr] = useState<string>('100.00');
  const [taxRateStr, setTaxRateStr] = useState<string>(String(initialRate));
  const [activePreset, setActivePreset] = useState<string | null>('Los Angeles (9.50%)');
  const [copied, setCopied] = useState<boolean>(false);
  const amountInputId = useId();
  const taxRateInputId = useId();

  // Listen for global custom events to allow external components (like the City table) to set the rate
  useEffect(() => {
    const handleSetRate = (e: CustomEvent<{ rate: number; cityName?: string }>) => {
      if (typeof e.detail?.rate === 'number') {
        setTaxRateStr(String(e.detail.rate));
        const matched = TOP_10_PRESETS.find(
          (p) =>
            p.city.toLowerCase() === e.detail.cityName?.toLowerCase() ||
            (Math.abs(p.rate - e.detail.rate) < 0.0001 && p.city.toLowerCase().includes(e.detail.cityName?.toLowerCase() || ''))
        );
        setActivePreset(matched ? matched.label : null);
        const calcEl = document.getElementById('ca-calculator');
        if (calcEl) {
          calcEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    window.addEventListener('set-ca-rate' as never, handleSetRate as EventListener);
    return () => {
      window.removeEventListener('set-ca-rate' as never, handleSetRate as EventListener);
    };
  }, []);

  const rawAmount = parseFloat(amountStr);
  const amount = isNaN(rawAmount) ? 0 : Math.max(0, rawAmount);
  const rawTaxRate = parseFloat(taxRateStr);
  const taxRate = isNaN(rawTaxRate) ? 0 : Math.max(0, rawTaxRate);

  // Real-time calculations (<5ms execution)
  let preTaxAmount = 0;
  let taxAmount = 0;
  let grossReceipt = 0;
  const effectiveDivisor = 1 + taxRate / 100;

  if (mode === 'reverse') {
    grossReceipt = amount;
    if (effectiveDivisor > 0 && amount >= 0) {
      preTaxAmount = roundHalfUp(amount / effectiveDivisor);
      taxAmount = roundHalfUp(amount - preTaxAmount);
    }
  } else {
    // Forward mode
    preTaxAmount = amount;
    taxAmount = roundHalfUp(amount * (taxRate / 100));
    grossReceipt = roundHalfUp(amount + taxAmount);
  }

  // Statutory breakdown:
  // 1. California State General Fund: 3.9375%
  // 2. Local Public Safety & Realignment: 2.0625% (1.0625% 2011 + 0.50% 1991 + 0.50% Prop 172)
  // 3. Bradley-Burns Mandatory Local Base: 1.2500%
  // 4. Local District TUT Taxes: Remainder (Combined Rate minus 7.2500%)
  const stateFundRate = 3.9375;
  const realignmentRate = 2.0625;
  const bradleyBurnsRate = 1.2500;
  const districtTutRate = Math.max(0, roundHalfUp((taxRate - 7.25) * 10000) / 10000);

  const stateFundAmt = roundHalfUp(preTaxAmount * (stateFundRate / 100));
  const realignmentAmt = roundHalfUp(preTaxAmount * (realignmentRate / 100));
  const bradleyBurnsAmt = roundHalfUp(preTaxAmount * (bradleyBurnsRate / 100));
  // Reconcile district TUT as statutory remainder to guarantee components sum to taxAmount
  const districtTutAmt = districtTutRate > 0
    ? Math.max(0, roundHalfUp(taxAmount - (stateFundAmt + realignmentAmt + bradleyBurnsAmt)))
    : 0;

  const statutoryBreakdown: StatutoryItem[] = [
    {
      name: 'California State General Fund',
      rate: stateFundRate,
      rateLabel: '3.9375%',
      amount: stateFundAmt,
      description: 'Cal. Rev. & Tax Code §§ 6051, 6051.3 (Schools, State Ops, Health)',
    },
    {
      name: 'Local Public Safety & Realignment',
      rate: realignmentRate,
      rateLabel: '2.0625%',
      amount: realignmentAmt,
      description: 'Prop 172 (0.50%) + 1991 (0.50%) + 2011 (1.0625%) County Realignment',
    },
    {
      name: 'Bradley-Burns Mandatory Local Base',
      rate: bradleyBurnsRate,
      rateLabel: '1.2500%',
      amount: bradleyBurnsAmt,
      description: 'Cal. Rev. & Tax Code § 7200 (1.00% City/County Ops + 0.25% Transit)',
    },
    {
      name: 'Local District TUT Taxes',
      rate: districtTutRate,
      rateLabel: `${districtTutRate.toFixed(4)}%`,
      amount: districtTutAmt,
      description: 'Voter-Approved Municipal & Transit District Taxes (RTC § 7251)',
    },
  ];

  const formattedRate = taxRateStr.includes('.')
    ? `${parseFloat(taxRateStr).toFixed(Math.max(2, (taxRateStr.split('.')[1] || '').length))}%`
    : `${taxRate.toFixed(2)}%`;

  const divisorDisplay = effectiveDivisor.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 5,
  });

  const handleCopy = async () => {
    const text = mode === 'reverse'
      ? `Receipt: $${fmtMoney(grossReceipt)} | Pre-Tax: $${fmtMoney(preTaxAmount)} | CA Sales Tax (${formattedRate}): $${fmtMoney(taxAmount)}`
      : `Pre-Tax: $${fmtMoney(preTaxAmount)} | CA Sales Tax (${formattedRate}): $${fmtMoney(taxAmount)} | Checkout Total: $${fmtMoney(grossReceipt)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleReset = () => {
    setMode('reverse');
    setAmountStr('100.00');
    setTaxRateStr('9.50');
    setActivePreset('Los Angeles (9.50%)');
  };

  return (
    <div id="ca-calculator" className="calc-card" style={{ border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)' }}>
      {/* ── Mode Switcher Pills ─────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>
            Select Calculation Mode
          </span>
          <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
            {mode === 'reverse' ? 'Backing out tax from gross total' : 'Adding sales tax to shelf price'}
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--canvas-soft)',
            padding: 4,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--hairline-strong)',
            gap: 4,
          }}
        >
          <button
            type="button"
            aria-pressed={mode === 'reverse'}
            onClick={() => setMode('reverse')}
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
              background: mode === 'reverse' ? 'var(--primary)' : 'transparent',
              color: mode === 'reverse' ? '#ffffff' : 'var(--body)',
              boxShadow: mode === 'reverse' ? '0 2px 6px rgba(0, 130, 84, 0.25)' : 'none',
            }}
          >
            <span>↺</span> Back Out Tax (Reverse Mode)
          </button>
          <button
            type="button"
            aria-pressed={mode === 'forward'}
            onClick={() => setMode('forward')}
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
              background: mode === 'forward' ? 'var(--primary)' : 'transparent',
              color: mode === 'forward' ? '#ffffff' : 'var(--body)',
              boxShadow: mode === 'forward' ? '0 2px 6px rgba(0, 130, 84, 0.25)' : 'none',
            }}
          >
            <span>+</span> Add Sales Tax (Forward Mode)
          </button>
        </div>
      </div>

      {/* ── Inputs Grid ────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 20 }}>
        {/* Amount Input */}
        <div>
          <label
            htmlFor={amountInputId}
            style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}
          >
            {mode === 'reverse' ? '1. Gross Receipt Amount (With Tax)' : '1. Pre-Tax Shelf Price'}
          </label>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">$</span>
            <input
              id={amountInputId}
              name="receiptTotal"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="100.00"
              className="calc-input with-prefix"
              style={{ fontSize: 20, fontWeight: 700 }}
              aria-label={mode === 'reverse' ? 'Gross receipt amount in dollars' : 'Pre-tax shelf price in dollars'}
            />
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, display: 'block' }}>
            {mode === 'reverse' ? 'Enter the final checkout total paid' : 'Enter the retail sticker/item price'}
          </span>
        </div>

        {/* Combined Tax Rate Input */}
        <div>
          <label
            htmlFor={taxRateInputId}
            style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}
          >
            2. Combined CA Sales Tax Rate
          </label>
          <div className="input-wrapper">
            <input
              id={taxRateInputId}
              name="taxRate"
              autoComplete="off"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.001"
              value={taxRateStr}
              onChange={(e) => {
                setTaxRateStr(e.target.value);
                setActivePreset(null);
              }}
              placeholder="9.50"
              className="calc-input with-suffix"
              style={{ fontSize: 20, fontWeight: 700 }}
              aria-label="Combined California sales tax rate percentage"
            />
            <span className="input-suffix" aria-hidden="true">%</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, display: 'block' }}>
            State Base (7.25%) + Local City/County District Taxes
          </span>
        </div>
      </div>

      {/* ── Top 10 Metropolitan Preset Pills ───────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--muted)', marginBottom: 8 }}>
          Top California Metropolitan Presets (Click to Load):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {TOP_10_PRESETS.map((preset) => {
            const isSelected = activePreset
              ? activePreset === preset.label
              : Math.abs(taxRate - preset.rate) < 0.0001;
            return (
              <button
                key={preset.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setActivePreset(preset.label);
                  setTaxRateStr(String(preset.rate));
                }}
                className={`quick-btn ${isSelected ? 'active' : ''}`}
                style={{
                  minHeight: 36,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  fontWeight: isSelected ? 700 : 500,
                }}
              >
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Calculation Results Display ────────────────────────── */}
      <div
        aria-live="polite"
        style={{
          background: 'var(--canvas-soft)',
          border: '1px solid var(--hairline-strong)',
          borderRadius: 'var(--radius-md)',
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: 14 }}>
          {mode === 'reverse' ? '✓ Extracted Pre-Tax Results (CDTFA Form 401-A Line 1 Standard)' : '✓ Calculated Forward Retail Checkout Results'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <div className="card" style={{ padding: 16, background: '#ffffff', border: '1px solid var(--hairline)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
              {mode === 'reverse' ? 'Pre-Tax Net Amount' : 'Net Pre-Tax Base'}
            </span>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
              ${fmtMoney(preTaxAmount)}
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, display: 'block' }}>
              Base taxable receipt amount
            </span>
          </div>

          <div className="card" style={{ padding: 16, background: 'var(--mint-50)', border: '1px solid var(--mint-200)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--forest)', display: 'block', marginBottom: 4 }}>
              {mode === 'reverse' ? 'CA Sales Tax Paid' : 'CA Sales Tax Added'}
            </span>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>
              ${fmtMoney(taxAmount)}
            </div>
            <span style={{ fontSize: 11, color: 'var(--forest)', marginTop: 2, display: 'block' }}>
              At {taxRate}% combined rate
            </span>
          </div>

          <div className="card" style={{ padding: 16, background: '#ffffff', border: '1px solid var(--hairline)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
              {mode === 'reverse' ? 'Total Gross Receipt' : 'Final Total Checkout'}
            </span>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
              ${fmtMoney(grossReceipt)}
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, display: 'block' }}>
              Grand total with tax
            </span>
          </div>
        </div>

        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--hairline-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'var(--body)' }}>
          <div>
            <strong>Effective Mathematical Divisor:</strong>{' '}
            <code style={{ background: '#ffffff', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--hairline-strong)', fontWeight: 700, color: 'var(--primary)' }}>
              {divisorDisplay}
            </code>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Formula: {mode === 'reverse' ? `$${fmtMoney(grossReceipt)} ÷ ${divisorDisplay} = $${fmtMoney(preTaxAmount)}` : `$${fmtMoney(preTaxAmount)} × (1 + ${taxRate / 100}) = $${fmtMoney(grossReceipt)}`}
          </div>
        </div>
      </div>

      {/* ── Dynamic 4-Part Statutory Breakdown Visualizer ─────── */}
      <div style={{ marginBottom: 24, border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-md)', padding: 18, background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)' }}>
            Dynamic 4-Part Statutory Allocation Breakdown
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Apportionment of every collected sales tax dollar
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {statutoryBreakdown.map((item) => (
            <div
              key={item.name}
              style={{
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-xs)',
                padding: '12px 14px',
                background: 'var(--canvas-soft)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{item.name}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  {item.rateLabel}
                </span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
                ${fmtMoney(item.amount)}
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', lineHeight: 1.3 }}>
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Action Utilities ───────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-primary"
          style={{
            flex: '1 1 200px',
            minHeight: 46,
            padding: '10px 18px',
            fontSize: 13,
            position: 'relative',
          }}
        >
          <span>📋</span> {copied ? '✓ Copied to Clipboard!' : 'Copy Tax Breakdown'}
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="btn-secondary"
          style={{
            flex: '1 1 200px',
            minHeight: 46,
            padding: '10px 18px',
            fontSize: 13,
          }}
        >
          <span>🖨️</span> Print Receipt Audit Slip
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn-outline"
          style={{
            minHeight: 46,
            padding: '10px 18px',
            fontSize: 13,
          }}
        >
          <span>↺</span> Reset
        </button>
      </div>

      {/* ── Hidden Print Voucher (Visible only on @media print) ── */}
      <div className="ca-print-audit-voucher" aria-hidden="true">
        <style dangerouslySetInnerHTML={{ __html: `
          @media screen {
            .ca-print-audit-voucher { display: none !important; }
          }
          @media print {
            body * { visibility: hidden !important; }
            .ca-print-audit-voucher, .ca-print-audit-voucher * { visibility: visible !important; }
            .ca-print-audit-voucher {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 24px !important;
              border: 2px solid #000 !important;
              font-family: Arial, sans-serif !important;
              color: #000 !important;
              background: #fff !important;
              box-sizing: border-box !important;
            }
          }
        `}} />
        <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: 12, marginBottom: 16 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 18, textTransform: 'uppercase' }}>
            CDTFA FORM 401-A SALES TAX RECONCILIATION SLIP
          </h2>
          <p style={{ margin: 0, fontSize: 12, color: '#333' }}>
            Official Statutory Calculation Record · California Department of Tax & Fee Administration Standards
          </p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16, fontSize: 13 }}>
          <tbody>
            <tr>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd' }}><strong>Audit Date & Time:</strong></td>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}>
                <time suppressHydrationWarning>
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </time>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd' }}><strong>Calculation Engine Mode:</strong></td>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}>
                {mode === 'reverse' ? 'Back Out Sales Tax (Reverse Receipt Extraction)' : 'Add Sales Tax (Forward Retail Checkout)'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd' }}><strong>Gross Transaction Total:</strong></td>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}>${fmtMoney(grossReceipt)}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd' }}><strong>Pre-Tax Subtotal (Line 1 Taxable Sales):</strong></td>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}><strong>${fmtMoney(preTaxAmount)}</strong></td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd' }}><strong>Combined California Sales Tax Rate:</strong></td>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}>{taxRate.toFixed(3)}%</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd' }}><strong>Total Sales Tax Reimbursement Isolated:</strong></td>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}><strong>${fmtMoney(taxAmount)}</strong></td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd' }}><strong>Statutory Divisor Applied:</strong></td>
              <td style={{ padding: '6px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}>{effectiveDivisor.toFixed(5)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ border: '1px solid #000', padding: 12, marginBottom: 16 }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 13, textTransform: 'uppercase' }}>
            Statutory Fund Allocation Breakdown:
          </h4>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6 }}>
            <li>State General Fund (3.9375%): ${fmtMoney(stateFundAmt)}</li>
            <li>Local Public Safety & Realignment (2.0625%): ${fmtMoney(realignmentAmt)}</li>
            <li>Bradley-Burns Mandatory Local Base (1.2500%): ${fmtMoney(bradleyBurnsAmt)}</li>
            <li>Local District TUT Taxes ({districtTutRate.toFixed(4)}%): ${fmtMoney(districtTutAmt)}</li>
          </ul>
        </div>

        <p style={{ margin: 0, fontSize: 11, color: '#444', fontStyle: 'italic', textAlign: 'center' }}>
          Certified CDTFA RTC Title 18 computational reconciliation slip for bookkeeping and audit defense.
        </p>
      </div>
    </div>
  );
}
