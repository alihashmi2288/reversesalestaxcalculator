'use client';
import { useState, useCallback } from 'react';
import { calculateReverseTax, fmt } from '@/lib/taxCalc';

interface RowItem {
  id: number;
  name: string;
  totalPrice: string;
  taxRate: string;
}

let nextId = 4;

export default function MultipleItemsTab() {
  const [rows, setRows] = useState<RowItem[]>([
    { id: 1, name: 'Item 1', totalPrice: '', taxRate: '8.25' },
    { id: 2, name: 'Item 2', totalPrice: '', taxRate: '8.25' },
    { id: 3, name: 'Item 3', totalPrice: '', taxRate: '8.25' },
  ]);
  const [calculated, setCalculated] = useState(false);

  const updateRow = (id: number, field: keyof RowItem, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addRow = () => {
    setRows((prev) => [...prev, { id: nextId++, name: `Item ${nextId - 1}`, totalPrice: '', taxRate: rows[0]?.taxRate || '8.25' }]);
  };

  const removeRow = (id: number) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const getCalc = useCallback((row: RowItem) => {
    const price = parseFloat(row.totalPrice);
    const rate = parseFloat(row.taxRate);
    if (isNaN(price) || isNaN(rate) || price <= 0) return null;
    try { return calculateReverseTax(price, rate); } catch { return null; }
  }, []);

  const totals = rows.reduce(
    (acc, row) => {
      const calc = getCalc(row);
      if (calc) {
        acc.totalPaid += calc.totalPaid;
        acc.preTax += calc.preTaxPrice;
        acc.taxAmount += calc.taxAmount;
      }
      return acc;
    },
    { totalPaid: 0, preTax: 0, taxAmount: 0 }
  );

  const hasAnyData = rows.some((r) => r.totalPrice && r.taxRate);

  const handleCalculate = () => {
    if (hasAnyData) setCalculated(true);
  };

  const handleReset = () => {
    setRows([
      { id: 1, name: 'Item 1', totalPrice: '', taxRate: '8.25' },
      { id: 2, name: 'Item 2', totalPrice: '', taxRate: '8.25' },
      { id: 3, name: 'Item 3', totalPrice: '', taxRate: '8.25' },
    ]);
    setCalculated(false);
    nextId = 4;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
        Enter multiple items to calculate pre-tax prices in bulk. Add as many rows as needed.
      </p>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', border: '2px solid var(--border)' }}>
        <table className="data-table" style={{ minWidth: 600 }}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Total Price ($)</th>
              <th>Tax Rate (%)</th>
              <th>Pre-Tax Price</th>
              <th>Tax Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const calc = getCalc(row);
              return (
                <tr key={row.id}>
                  <td>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                      style={{ width: '100%', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px 12px', fontSize: 14, fontFamily: 'var(--font-mono)' }}
                      placeholder="Item name"
                    />
                  </td>
                  <td>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: 14 }}>$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={row.totalPrice}
                        onChange={(e) => updateRow(row.id, 'totalPrice', e.target.value)}
                        style={{ width: '100%', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px 12px 8px 24px', fontSize: 14, fontFamily: 'var(--font-mono)' }}
                        placeholder="0.00"
                      />
                    </div>
                  </td>
                  <td>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        min="0"
                        step="0.001"
                        value={row.taxRate}
                        onChange={(e) => updateRow(row.id, 'taxRate', e.target.value)}
                        style={{ width: '100%', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px 32px 8px 12px', fontSize: 14, fontFamily: 'var(--font-mono)' }}
                        placeholder="8.25"
                      />
                      <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: 14 }}>%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 15 }}>
                    {calculated && calc ? `$${fmt(calc.preTaxPrice)}` : '—'}
                  </td>
                  <td style={{ fontWeight: 600, color: '#dc2626', fontSize: 14 }}>
                    {calculated && calc ? `$${fmt(calc.taxAmount)}` : '—'}
                  </td>
                  <td>
                    <button
                      onClick={() => removeRow(row.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}
                      title="Remove row"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Totals row — only after Calculate */}
          {calculated && hasAnyData && (
            <tfoot>
              <tr style={{ background: '#f9fafb', fontWeight: 700 }}>
                <td colSpan={2} style={{ padding: '14px 16px', fontSize: 14, color: 'var(--text-primary)' }}>
                  Totals ({rows.filter((r) => getCalc(r)).length} items)
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>
                  Total Paid: ${fmt(totals.totalPaid)}
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--accent)', fontSize: 15 }}>
                  ${fmt(totals.preTax)}
                </td>
                <td style={{ padding: '14px 16px', color: '#dc2626', fontSize: 14 }}>
                  ${fmt(totals.taxAmount)}
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Action bar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={addRow} className="btn-secondary" style={{ minHeight: 48 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Add Another Item
        </button>

        <button
          suppressHydrationWarning
          onClick={handleCalculate}
          className="btn-primary"
          style={{ minHeight: 48, opacity: hasAnyData ? 1 : 0.5, cursor: hasAnyData ? 'pointer' : 'not-allowed' }}
          disabled={!hasAnyData}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
          </svg>
          Calculate All Items
        </button>

        {calculated && (
          <button suppressHydrationWarning onClick={handleReset} className="btn-secondary" style={{ minHeight: 48 }}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
