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
      {/* Format Info Callout */}
      <div className="card" style={{ borderRadius: 'var(--radius)', border: '1px dashed var(--primary)', background: 'rgba(204, 255, 0, 0.01)', padding: 18 }}>
        <p style={{ fontSize: 14, color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>
          📋 <strong>Format:</strong> One entry per line — <code style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>finalPrice,taxRate</code>
          <br />Example: <code style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>107.50,8.25</code> means $107.50 total with 8.25% tax.
        </p>
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>
          Enter prices (one per line):
        </label>
        <textarea
          id="batch-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setProcessed(false); }}
          rows={8}
          style={{
            width: '100%', padding: 16, borderRadius: 'var(--radius)', border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)', fontSize: 15, resize: 'vertical',
            outline: 'none', lineHeight: 1.8, background: 'rgba(0, 0, 0, 0.4)', color: 'var(--primary)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          placeholder={'107.50,7.5\n53.99,8.25\n200.00,10'}
          onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.6), var(--shadow-glow)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.4)'; }}
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
          <button onClick={handleExportCSV} className="btn-secondary" style={{ minHeight: 52, borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        )}
        <button onClick={reset} className="btn-secondary" style={{ minHeight: 52 }}>Clear</button>
      </div>

      {processed && results.length > 0 && (
        <div style={{ animation: 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)', marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Results — {results.filter(r => !r.error).length} of {results.length} processed
            </h3>
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
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
                  <tr key={r.line} style={{ background: r.error ? 'rgba(239, 68, 68, 0.05)' : undefined }}>
                    <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{r.line}</td>
                    <td>${fmt(r.finalPrice)}</td>
                    <td>{r.taxRate}%</td>
                    <td style={{ fontWeight: 700, color: r.error ? '#f87171' : 'var(--accent)' }}>
                      {r.error ? '—' : `$${fmt(r.preTaxPrice)}`}
                    </td>
                    <td style={{ color: r.error ? '#f87171' : undefined }}>
                      {r.error ? '—' : `$${fmt(r.taxAmount)}`}
                    </td>
                    <td>
                      {r.error
                        ? <span style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '2px 8px', borderRadius: '4px', fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>ERROR</span>
                        : <span style={{ background: 'rgba(204, 255, 0, 0.1)', border: '1px solid rgba(204, 255, 0, 0.3)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>✓ OK</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: 'rgba(0,0,0,0.5)', fontWeight: 700, borderTop: '1px solid var(--border)' }}>
                  <td colSpan={3} style={{ padding: '16px 24px', color: 'var(--text-primary)' }}>Totals</td>
                  <td style={{ padding: '16px 24px', color: 'var(--primary)' }}>
                    ${fmt(results.filter(r => !r.error).reduce((s, r) => s + r.preTaxPrice, 0))}
                  </td>
                  <td style={{ padding: '16px 24px', color: '#f87171' }}>
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
