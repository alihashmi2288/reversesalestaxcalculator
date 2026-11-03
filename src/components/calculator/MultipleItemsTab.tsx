'use client';
import { useState, useCallback, useRef, useMemo } from 'react';
import { calculateReverseTax, fmt } from '@/lib/taxCalc';

interface RowItem {
  id: number;
  name: string;
  totalPrice: string;
  taxRate: string;
}

export default function MultipleItemsTab() {
  const nextIdRef = useRef(4);
  const [rows, setRows] = useState<RowItem[]>([
    { id: 1, name: 'Item 1', totalPrice: '', taxRate: '8.25' },
    { id: 2, name: 'Item 2', totalPrice: '', taxRate: '8.25' },
    { id: 3, name: 'Item 3', totalPrice: '', taxRate: '8.25' },
  ]);
  const [calculated, setCalculated] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const updateRow = (id: number, field: keyof RowItem, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addRow = () => {
    const id = nextIdRef.current++;
    setRows((prev) => [...prev, { id, name: `Item ${id}`, totalPrice: '', taxRate: rows[0]?.taxRate || '8.25' }]);
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

  const rowCalcs = useMemo(() => {
    return rows.map((row) => ({
      row,
      calc: getCalc(row),
    }));
  }, [rows, getCalc]);

  const { totals, validCount } = useMemo(() => {
    let totalPaid = 0;
    let preTax = 0;
    let taxAmount = 0;
    let count = 0;
    for (const { calc } of rowCalcs) {
      if (calc) {
        totalPaid += calc.totalPaid;
        preTax += calc.preTaxPrice;
        taxAmount += calc.taxAmount;
        count += 1;
      }
    }
    return {
      totals: { totalPaid, preTax, taxAmount },
      validCount: count,
    };
  }, [rowCalcs]);

  const hasAnyData = rows.some((r) => r.totalPrice && r.taxRate);

  const handleCalculate = () => {
    if (hasAnyData) {
      setCalculated(true);
      setAnnouncement(`Calculated ${validCount} items. Combined pre-tax total: $${fmt(totals.preTax)}, combined sales tax: $${fmt(totals.taxAmount)}, receipt total: $${fmt(totals.totalPaid)}.`);
    }
  };

  const handleReset = () => {
    nextIdRef.current = 4;
    setRows([
      { id: 1, name: 'Item 1', totalPrice: '', taxRate: '8.25' },
      { id: 2, name: 'Item 2', totalPrice: '', taxRate: '8.25' },
      { id: 3, name: 'Item 3', totalPrice: '', taxRate: '8.25' },
    ]);
    setCalculated(false);
    setAnnouncement('Multiple items calculator reset.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Persistent live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <p style={{ color: 'var(--body)', fontSize: 14, margin: 0 }}>
        Enter multiple receipt items to calculate pre-tax amounts in bulk. Add as many rows as needed.
      </p>

      {/* Table */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Multiple items table"
        style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline-strong)' }}
      >
        <table className="data-table" style={{ minWidth: 640, width: '100%' }}>
          <caption className="sr-only">Multiple Items Reverse Tax Calculation List</caption>
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Total Price ($)</th>
              <th scope="col">Tax Rate (%)</th>
              <th scope="col">Pre-Tax Price</th>
              <th scope="col">Tax Amount</th>
              <th scope="col" style={{ width: 44 }}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rowCalcs.map(({ row, calc }) => (
              <tr key={row.id}>
                <th scope="row" style={{ fontWeight: 'normal', textAlign: 'left', padding: '12px 14px' }}>
                  <input
                    type="text"
                    name={`itemName-${row.id}`}
                    autoComplete="off"
                    aria-label={`Item ${row.id} name`}
                    value={row.name}
                    onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                    className="calc-input"
                    style={{
                      width: '100%',
                      height: 38,
                      padding: '8px 12px',
                      fontSize: 14,
                      fontFamily: 'var(--font-sans)',
                    }}
                    placeholder="Item name"
                  />
                </th>
                <td>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14, fontFamily: 'var(--font-mono)' }} aria-hidden="true">$</span>
                    <input
                      type="number"
                      name={`itemPrice-${row.id}`}
                      autoComplete="off"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      aria-label={`Item ${row.id} total price in dollars`}
                      value={row.totalPrice}
                      onChange={(e) => updateRow(row.id, 'totalPrice', e.target.value)}
                      className="calc-input"
                      style={{
                        width: '100%',
                        height: 38,
                        padding: '8px 10px 8px 24px',
                        fontSize: 14,
                        fontFamily: 'var(--font-mono)',
                      }}
                      placeholder="0.00"
                    />
                  </div>
                </td>
                <td>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      name={`itemTaxRate-${row.id}`}
                      autoComplete="off"
                      inputMode="decimal"
                      min="0"
                      step="0.001"
                      aria-label={`Item ${row.id} tax rate percentage`}
                      value={row.taxRate}
                      onChange={(e) => updateRow(row.id, 'taxRate', e.target.value)}
                      className="calc-input"
                      style={{
                        width: '100%',
                        height: 38,
                        padding: '8px 26px 8px 10px',
                        fontSize: 14,
                        fontFamily: 'var(--font-mono)',
                      }}
                      placeholder="8.25"
                    />
                    <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }} aria-hidden="true">%</span>
                  </div>
                </td>
                <td className="tabular-nums" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>
                  {calculated && calc ? `$${fmt(calc.preTaxPrice)}` : '—'}
                </td>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--primary-deep)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>
                  {calculated && calc ? `$${fmt(calc.taxAmount)}` : '—'}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    aria-label={`Remove Item ${row.id}`}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', padding: 8, minWidth: 44, minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    title={`Remove Item ${row.id}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Totals row — after Calculate */}
          {calculated && hasAnyData && (
            <tfoot>
              <tr style={{ backgroundColor: 'var(--mint-50)', fontWeight: 700, borderTop: '2px solid var(--mint-200)' }}>
                <td colSpan={2} style={{ padding: '14px 18px', fontSize: 13, color: 'var(--ink)' }}>
                  Totals ({validCount} items)
                </td>
                <td className="tabular-nums" style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                  Total: ${fmt(totals.totalPaid)}
                </td>
                <td className="tabular-nums" style={{ padding: '14px 18px', color: 'var(--primary-deep)', fontSize: 15, fontFamily: 'var(--font-mono)' }}>
                  ${fmt(totals.preTax)}
                </td>
                <td className="tabular-nums" style={{ padding: '14px 18px', color: 'var(--primary-deep)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>
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
        <button type="button" onClick={addRow} className="btn-secondary" style={{ flex: '1 1 auto' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Add Item
        </button>

        <button
          type="button"
          onClick={handleCalculate}
          className="btn-primary"
          style={{ flex: '2 1 auto', opacity: hasAnyData ? 1 : 0.6, cursor: hasAnyData ? 'pointer' : 'not-allowed' }}
          disabled={!hasAnyData}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
          </svg>
          Calculate All Items
        </button>

        {calculated && (
          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
