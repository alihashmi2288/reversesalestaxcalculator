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
    try {
      return calculateReverseTax(price, rate);
    } catch {
      return null;
    }
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ color: 'var(--body)', fontSize: 14, margin: 0 }}>
        Enter multiple receipt items to calculate pre-tax amounts in bulk. Add as many rows as needed.
      </p>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline-strong)' }}>
        <table className="data-table" style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Total Price ($)</th>
              <th>Tax Rate (%)</th>
              <th>Pre-Tax Price</th>
              <th>Tax Amount</th>
              <th style={{ width: 44 }}></th>
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
                      aria-label={`Item ${row.id} name`}
                      value={row.name}
                      onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid var(--hairline-strong)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '8px 12px',
                        fontSize: 14,
                        fontFamily: 'var(--font-montserrat), sans-serif',
                        outline: 'none',
                        background: 'var(--canvas)',
                        color: 'var(--ink)',
                      }}
                      placeholder="Item name"
                      onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--hairline-strong)')}
                    />
                  </td>
                  <td>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14, fontFamily: 'var(--font-mono)' }} aria-hidden="true">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        aria-label={`Item ${row.id} total price in dollars`}
                        value={row.totalPrice}
                        onChange={(e) => updateRow(row.id, 'totalPrice', e.target.value)}
                        style={{
                          width: '100%',
                          border: '1px solid var(--hairline-strong)',
                          borderRadius: 'var(--radius-xs)',
                          padding: '8px 10px 8px 24px',
                          fontSize: 14,
                          fontFamily: 'var(--font-mono)',
                          outline: 'none',
                          background: 'var(--canvas)',
                          color: 'var(--ink)',
                        }}
                        placeholder="0.00"
                        onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--hairline-strong)')}
                      />
                    </div>
                  </td>
                  <td>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        min="0"
                        step="0.001"
                        aria-label={`Item ${row.id} tax rate percentage`}
                        value={row.taxRate}
                        onChange={(e) => updateRow(row.id, 'taxRate', e.target.value)}
                        style={{
                          width: '100%',
                          border: '1px solid var(--hairline-strong)',
                          borderRadius: 'var(--radius-xs)',
                          padding: '8px 26px 8px 10px',
                          fontSize: 14,
                          fontFamily: 'var(--font-mono)',
                          outline: 'none',
                          background: 'var(--canvas)',
                          color: 'var(--ink)',
                        }}
                        placeholder="8.25"
                        onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--hairline-strong)')}
                      />
                      <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }} aria-hidden="true">%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>
                    {calculated && calc ? `$${fmt(calc.preTaxPrice)}` : '—'}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--error)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>
                    {calculated && calc ? `$${fmt(calc.taxAmount)}` : '—'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => removeRow(row.id)}
                      aria-label={`Remove Item ${row.id}`}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', padding: 4, display: 'inline-flex', alignItems: 'center' }}
                      title={`Remove Item ${row.id}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Totals row — after Calculate */}
          {calculated && hasAnyData && (
            <tfoot>
              <tr style={{ backgroundColor: 'var(--mint-50)', fontWeight: 700, borderTop: '2px solid var(--mint-200)' }}>
                <td colSpan={2} style={{ padding: '14px 18px', fontSize: 13, color: 'var(--ink)' }}>
                  Totals ({rows.filter((r) => getCalc(r)).length} items)
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                  Total: ${fmt(totals.totalPaid)}
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--primary-deep)', fontSize: 15, fontFamily: 'var(--font-mono)' }}>
                  ${fmt(totals.preTax)}
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--error)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>
                  ${fmt(totals.taxAmount)}
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Action bar */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={addRow} className="btn-secondary" style={{ flex: '1 1 auto' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Add Item
        </button>

        <button
          suppressHydrationWarning
          onClick={handleCalculate}
          className="btn-primary"
          style={{ flex: '2 1 auto', opacity: hasAnyData ? 1 : 0.6, cursor: hasAnyData ? 'pointer' : 'not-allowed' }}
          disabled={!hasAnyData}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
          </svg>
          Calculate All Items
        </button>

        {calculated && (
          <button suppressHydrationWarning onClick={handleReset} className="btn-secondary">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
