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

  const reset = () => { setInput(''); setResults([]); setProcessed(false); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 16 }}>
        <p style={{ fontSize: 14, color: '#1e40af', margin: 0, fontWeight: 500 }}>
          📋 <strong>Format:</strong> One entry per line — <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: 4 }}>finalPrice,taxRate</code>
          <br />Example: <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: 4 }}>107.50,7.5</code> means $107.50 total with 7.5% tax
        </p>
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
          Enter prices (one per line):
        </label>
        <textarea
          id="batch-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setProcessed(false); }}
          rows={8}
          style={{
            width: '100%', padding: 16, borderRadius: 12, border: '2px solid var(--border)',
            fontFamily: 'Courier New, monospace', fontSize: 15, resize: 'vertical',
            outline: 'none', lineHeight: 1.8,
          }}
          placeholder={'107.50,7.5\n53.99,8.25\n200.00,10'}
          onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button id="batch-process-btn" onClick={handleProcess} className="btn-primary" style={{ flex: 1, minHeight: 52 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
          </svg>
          Process All
        </button>
        {processed && results.length > 0 && (
          <button onClick={handleExportCSV} className="btn-accent" style={{ minHeight: 52 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        )}
        <button onClick={reset} className="btn-secondary" style={{ minHeight: 52 }}>Clear</button>
      </div>

      {processed && results.length > 0 && (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>
              Results — {results.filter(r => !r.error).length} of {results.length} processed
            </h3>
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid var(--border)' }}>
            <table className="data-table" style={{ minWidth: 520 }}>
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
                  <tr key={r.line} style={{ background: r.error ? '#fef2f2' : undefined }}>
                    <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{r.line}</td>
                    <td>${fmt(r.finalPrice)}</td>
                    <td>{r.taxRate}%</td>
                    <td style={{ fontWeight: 700, color: r.error ? '#dc2626' : 'var(--accent)' }}>
                      {r.error ? '—' : `$${fmt(r.preTaxPrice)}`}
                    </td>
                    <td style={{ color: r.error ? '#dc2626' : undefined }}>
                      {r.error ? '—' : `$${fmt(r.taxAmount)}`}
                    </td>
                    <td>
                      {r.error
                        ? <span style={{ background: '#fecaca', color: '#dc2626', padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>Error: {r.error}</span>
                        : <span style={{ background: '#d1fae5', color: '#047857', padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>✓ OK</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f9fafb', fontWeight: 700 }}>
                  <td colSpan={3} style={{ padding: '14px 16px' }}>Totals</td>
                  <td style={{ padding: '14px 16px', color: 'var(--accent)' }}>
                    ${fmt(results.filter(r => !r.error).reduce((s, r) => s + r.preTaxPrice, 0))}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#dc2626' }}>
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
