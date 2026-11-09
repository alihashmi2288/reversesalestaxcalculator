'use client';
import { useState, useCallback, useRef, useMemo } from 'react';
import { calculateReverseTax, parseNumberSafe, fmt } from '@/lib/taxCalc';

interface RowItem {
  id: number;
  name: string;
  totalPrice: string;
  taxRate: string;
  taxable: boolean;
}

export default function MultipleItemsTab() {
  const nextIdRef = useRef(4);
  const [rows, setRows] = useState<RowItem[]>([
    { id: 1, name: 'Item 1', totalPrice: '', taxRate: '8.25', taxable: true },
    { id: 2, name: 'Item 2', totalPrice: '', taxRate: '8.25', taxable: true },
    { id: 3, name: 'Item 3', totalPrice: '', taxRate: '8.25', taxable: true },
  ]);
  const [calculated, setCalculated] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const updateRow = <K extends keyof RowItem>(id: number, field: K, value: RowItem[K]) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addRow = () => {
    const id = nextIdRef.current++;
    setRows((prev) => [
      ...prev,
      {
        id,
        name: `Item ${id}`,
        totalPrice: '',
        taxRate: rows[0]?.taxRate || '8.25',
        taxable: true,
      },
    ]);
  };

  const removeRow = (id: number) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const getCalc = useCallback((row: RowItem) => {
    const price = parseNumberSafe(row.totalPrice);
    const rate = parseNumberSafe(row.taxRate);
    if (isNaN(price) || price <= 0) return null;

    if (!row.taxable) {
      // Exempt item (e.g. groceries, medicine) - zero sales tax
      return {
        preTaxPrice: price,
        taxAmount: 0,
        totalPaid: price,
        taxRate: 0,
      };
    }

    if (isNaN(rate) || rate < 0) return null;
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

  const hasAnyData = rows.some((r) => r.totalPrice);

  const handleCalculate = () => {
    if (hasAnyData) {
      setCalculated(true);
      setAnnouncement(
        `Calculated ${validCount} items. Pre-tax subtotal: $${fmt(totals.preTax)}, total tax: $${fmt(totals.taxAmount)}, total paid: $${fmt(totals.totalPaid)}.`
      );
    }
  };

  const handleReset = () => {
    nextIdRef.current = 4;
    setRows([
      { id: 1, name: 'Item 1', totalPrice: '', taxRate: '8.25', taxable: true },
      { id: 2, name: 'Item 2', totalPrice: '', taxRate: '8.25', taxable: true },
      { id: 3, name: 'Item 3', totalPrice: '', taxRate: '8.25', taxable: true },
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

      <p style={{ color: 'var(--body)', fontSize: 14, margin: 0, lineHeight: 1.5 }}>
        Enter multiple receipt items to calculate pre-tax amounts in bulk. Uncheck &quot;Taxable&quot; for exempt items such as groceries or prescriptions.
      </p>

      {/* Table Container */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Multiple items table"
        style={{
          overflowX: 'auto',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--hairline-strong)',
        }}
      >
        <table className="data-table" style={{ minWidth: 680, width: '100%' }}>
          <caption className="sr-only">Multiple items reverse tax calculation list</caption>
          <thead>
            <tr>
              <th scope="col" style={{ width: '25%' }}>Item Name</th>
              <th scope="col" style={{ width: '20%' }}>Total Price ($)</th>
              <th scope="col" style={{ width: '18%' }}>Tax Rate (%)</th>
              <th scope="col" style={{ width: '12%', textAlign: 'center' }}>Taxable</th>
              <th scope="col" style={{ width: '15%' }}>Pre-Tax Price</th>
              <th scope="col" style={{ width: '15%' }}>Tax Amount</th>
              <th scope="col" style={{ width: 44 }}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rowCalcs.map(({ row, calc }) => (
              <tr key={row.id}>
                <th scope="row" style={{ fontWeight: 'normal', textAlign: 'left', padding: '10px 12px' }}>
                  <input
                    id={`item-name-${row.id}`}
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
                      padding: '8px 10px',
                      fontSize: 14,
                      fontFamily: 'var(--font-sans)',
                    }}
                    placeholder="Item name"
                  />
                </th>
                <td>
                  <div className="input-wrapper" style={{ width: '100%' }}>
                    <span className="input-prefix" aria-hidden="true">$</span>
                    <input
                      id={`item-price-${row.id}`}
                      type="text"
                      name={`itemPrice-${row.id}`}
                      autoComplete="off"
                      inputMode="decimal"
                      aria-label={`Item ${row.id} total price in dollars`}
                      value={row.totalPrice}
                      onChange={(e) => updateRow(row.id, 'totalPrice', e.target.value)}
                      className="calc-input with-prefix"
                      style={{
                        width: '100%',
                        height: 38,
                        fontSize: 14,
                        fontFamily: 'var(--font-mono)',
                      }}
                      placeholder="0.00"
                    />
                  </div>
                </td>
                <td>
                  <div className="input-wrapper" style={{ width: '100%' }}>
                    <input
                      id={`item-tax-rate-${row.id}`}
                      type="text"
                      name={`itemTaxRate-${row.id}`}
                      autoComplete="off"
                      inputMode="decimal"
                      disabled={!row.taxable}
                      aria-label={`Item ${row.id} tax rate percentage`}
                      value={row.taxable ? row.taxRate : '0.00'}
                      onChange={(e) => updateRow(row.id, 'taxRate', e.target.value)}
                      className="calc-input with-suffix"
                      style={{
                        width: '100%',
                        height: 38,
                        fontSize: 14,
                        fontFamily: 'var(--font-mono)',
                        opacity: row.taxable ? 1 : 0.6,
                      }}
                      placeholder="8.25"
                    />
                    <span className="input-suffix" aria-hidden="true">%</span>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <label
                    htmlFor={`item-taxable-${row.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 44,
                      minHeight: 44,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      id={`item-taxable-${row.id}`}
                      name={`itemTaxable-${row.id}`}
                      type="checkbox"
                      checked={row.taxable}
                      onChange={(e) => updateRow(row.id, 'taxable', e.target.checked)}
                      aria-label={`Item ${row.id} is taxable`}
                      style={{ accentColor: 'var(--primary)', width: 18, height: 18, cursor: 'pointer' }}
                    />
                  </label>
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
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--error)',
                      padding: 8,
                      minWidth: 44,
                      minHeight: 44,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={`Remove Item ${row.id}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Totals Summary Row */}
          {calculated && hasAnyData && (
            <tfoot>
              <tr style={{ backgroundColor: 'var(--mint-50)', fontWeight: 700, borderTop: '2px solid var(--mint-200)' }}>
                <td colSpan={2} style={{ padding: '14px 18px', fontSize: 13, color: 'var(--ink)' }}>
                  Summary ({validCount} items calculated)
                </td>
                <td className="tabular-nums" colSpan={2} style={{ padding: '14px 18px', color: 'var(--body)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                  Receipt total: <strong>${fmt(totals.totalPaid)}</strong>
                </td>
                <td className="tabular-nums" style={{ padding: '14px 18px', color: 'var(--primary-deep)', fontSize: 15, fontFamily: 'var(--font-mono)' }}>
                  Subtotal: ${fmt(totals.preTax)}
                </td>
                <td className="tabular-nums" style={{ padding: '14px 18px', color: 'var(--primary-deep)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>
                  Tax: ${fmt(totals.taxAmount)}
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" onClick={addRow} className="btn-secondary" style={{ flex: '1 1 auto', minHeight: 44 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Add item
        </button>

        <button
          type="button"
          onClick={handleCalculate}
          className="btn-primary"
          style={{ flex: '2 1 auto', minHeight: 44, opacity: hasAnyData ? 1 : 0.6, cursor: hasAnyData ? 'pointer' : 'not-allowed' }}
          disabled={!hasAnyData}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
          </svg>
          Calculate all items
        </button>

        {calculated && (
          <button type="button" onClick={handleReset} className="btn-secondary" style={{ minHeight: 44 }}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
