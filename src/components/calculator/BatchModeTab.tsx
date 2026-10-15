'use client';
import { useState } from 'react';
import { processBatch, batchToCSV, fmt, type BatchResult } from '@/lib/taxCalc';

export default function BatchModeTab() {
  const [input, setInput] = useState('107.50,7.5\n53.99,8.25\n200.00,10\n49.99,6');
  const [results, setResults] = useState<BatchResult[]>([]);
  const [processed, setProcessed] = useState(false);

  const handleProcess = () => {
    setResults(processBatch(input));
    setProcessed(true);
  };

  const handleExportCSV = () => {
    const csv = batchToCSV(results);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reverse-tax-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setInput('');
    setResults([]);
    setProcessed(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Format Info Callout */}
      <div style={{ backgroundColor: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-sm)', padding: '14px 18px' }}>
        <p style={{ fontSize: 13, color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
          <strong>Format:</strong> One entry per line — <code style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', padding: '2px 6px', borderRadius: '2px', color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>finalPrice,taxRate</code>
          <br />Example: <code style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', padding: '2px 6px', borderRadius: '2px', color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>107.50,8.25</code> calculates a $107.50 total at 8.25% tax.
        </p>
      </div>

      <div>
        <label htmlFor="batch-input" style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--ink)' }}>
          Enter receipt amounts & rates:
        </label>
        <textarea
          id="batch-input"
          aria-label="Enter receipt prices and tax rates one per line in price,rate format"
          value={input}
          onChange={(e) => { setInput(e.target.value); setProcessed(false); }}
          rows={7}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--hairline-strong)',
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.6,
            background: 'var(--canvas)',
            color: 'var(--ink)',
          }}
          placeholder={'107.50,7.5\n53.99,8.25\n200.00,10'}
          onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--hairline-strong)')}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button id="batch-process-btn" onClick={handleProcess} className="btn-primary" style={{ flex: 1 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
          </svg>
          Process Batch
        </button>
        {processed && results.length > 0 && (
          <button onClick={handleExportCSV} className="btn-secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        )}
        <button onClick={reset} className="btn-secondary">
          Clear
        </button>
      </div>

      {processed && results.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
              Batch Breakdown — {results.filter(r => !r.error).length} of {results.length} processed
            </h3>
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline-strong)' }}>
            <table className="data-table" style={{ minWidth: 540 }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Final Price</th>
                  <th>Tax Rate</th>
                  <th>Pre-Tax Price</th>
                  <th>Tax Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.line} style={{ backgroundColor: r.error ? '#fff5f5' : undefined }}>
                    <td style={{ fontWeight: 600, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{r.line}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>${fmt(r.finalPrice)}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{r.taxRate}%</td>
                    <td style={{ fontWeight: 700, color: r.error ? 'var(--error)' : 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                      {r.error ? '—' : `$${fmt(r.preTaxPrice)}`}
                    </td>
                    <td style={{ color: r.error ? 'var(--error)' : 'var(--body)', fontFamily: 'var(--font-mono)' }}>
                      {r.error ? '—' : `$${fmt(r.taxAmount)}`}
                    </td>
                    <td>
                      {r.error
                        ? <span style={{ backgroundColor: '#fff1f1', border: '1px solid #ffd8d8', color: 'var(--error)', padding: '2px 8px', borderRadius: '2px', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>ERROR</span>
                        : <span style={{ backgroundColor: 'var(--mint-100)', border: '1px solid var(--mint-200)', color: 'var(--primary-deep)', padding: '2px 8px', borderRadius: '2px', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>✓ OK</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: 'var(--mint-50)', fontWeight: 700, borderTop: '2px solid var(--mint-200)' }}>
                  <td colSpan={3} style={{ padding: '14px 18px', color: 'var(--ink)' }}>Batch Totals</td>
                  <td style={{ padding: '14px 18px', color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)' }}>
                    ${fmt(results.filter(r => !r.error).reduce((s, r) => s + r.preTaxPrice, 0))}
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--error)', fontFamily: 'var(--font-mono)' }}>
                    ${fmt(results.filter(r => !r.error).reduce((s, r) => s + r.taxAmount, 0))}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
