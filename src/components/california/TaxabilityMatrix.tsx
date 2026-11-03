'use client';

import React, { useState } from 'react';
import { TAXABILITY_MATRIX } from '@/data/californiaTaxData';

export default function TaxabilityMatrix() {
  const [filter, setFilter] = useState<'ALL' | 'EXEMPT' | 'TAXABLE'>('ALL');
  const [openDeepDive, setOpenDeepDive] = useState<number | null>(null);

  const filteredItems = TAXABILITY_MATRIX.filter((item) => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  const deepDives = [
    {
      title: '1. Groceries vs. Prepared Food & The 80/80 Rule (CDTFA Reg. 1603)',
      reg: 'Regulation 1603',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.65 }}>
          <p>
            Under California law, cold food products purchased for human consumption at home are exempt from tax (Regulation 1602). However, when food is heated or served for on-premises consumption, it becomes subject to sales tax under Regulation 1603.
          </p>
          <div style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-xs)', padding: 12 }}>
            <strong style={{ display: 'block', marginBottom: 6, color: 'var(--ink)' }}>The CDTFA 80/80 Rule Criteria:</strong>
            <p style={{ margin: '0 0 6px' }}>
              Retail food merchants (such as bakeries, delis, bagel shops, and coffee roasters) must apply sales tax to <strong>all sales of cold food for takeout</strong> if the business meets two cumulative conditions:
            </p>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              <li><strong>The 80% Food Test:</strong> More than 80% of the merchant&apos;s gross receipts are from the sale of food products (taxable and exempt combined); <strong>AND</strong></li>
              <li><strong>The 80% Taxable Test:</strong> More than 80% of those food sales are taxable (because they are hot food, sold for dine-in consumption, or served with utensils).</li>
            </ol>
          </div>
          <div style={{ background: 'var(--mint-50)', border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-xs)', padding: 12, color: 'var(--forest)' }}>
            <strong>Exemption Exception:</strong> A business meeting the 80/80 threshold can still sell cold food items (e.g., a quart of cold pasta salad or a dozen cold bagels) tax-free for takeout <em>only if</em> the merchant maintains strict segregated cash register accounting records and sells the cold food in a complete unheated form.
          </div>
        </div>
      ),
    },
    {
      title: '2. Software, Cloud SaaS, and Digital Goods (CDTFA Reg. 1502)',
      reg: 'Regulation 1502',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.65 }}>
          <p>
            California is one of the most favorable states in the nation for digital businesses. Under California Revenue and Taxation Code Section 6016, sales tax applies solely to tangible personal property:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li><strong>Cloud SaaS:</strong> Software accessed via the browser or API where data resides on remote cloud servers involves zero transfer of physical property and is <strong>100% tax-exempt</strong>.</li>
            <li><strong>Electronic Transmission:</strong> If prewritten (&quot;canned&quot;) desktop software is purchased online and downloaded directly across the web with zero physical media (no flash drive, no install DVD, no printed paper manuals), the transaction is <strong>exempt from California sales and use tax</strong>.</li>
            <li><strong>The Physical Media Trap:</strong> If a software company delivers the identical program on a $5 USB drive or includes a boxed physical reference manual, the CDTFA deems the <strong>entire purchase price</strong> (even if $50,000) fully subject to sales tax.</li>
          </ul>
        </div>
      ),
    },
    {
      title: '3. Shipping, Freight, and Handling (CDTFA Reg. 1628)',
      reg: 'Regulation 1628',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.65 }}>
          <p>
            Transportation charges are exempt only when they represent actual transportation costs paid to an independent carrier:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li><strong>Exempt Conditions:</strong> The merchandise must travel directly from the retailer to the customer via common carrier (USPS, FedEx, UPS), and the delivery line item on the invoice cannot exceed the merchant&apos;s actual out-of-pocket shipping cost.</li>
            <li><strong>Taxable Handling:</strong> Handling charges represent internal overhead, picking, and packing labor. If an invoice bills &quot;$15.00 Shipping &amp; Handling&quot; in an unsegregated lump sum, the entire fee is treated as taxable unless the business can prove the exact common carrier shipping portion.</li>
          </ul>
        </div>
      ),
    },
    {
      title: '4. Service Labor: Installation vs. Fabrication (CDTFA Regs. 1526 & 1546)',
      reg: 'Regulations 1526 & 1546',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.65 }}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li><strong>Installation Labor (Exempt):</strong> Affixing finished goods to real or personal property (e.g., bolting a machine to a factory floor, installing kitchen cabinetry, mounting tires on a car) is non-taxable when billed as a separate line item.</li>
            <li><strong>Fabrication Labor (Taxable):</strong> If a machine shop takes raw sheet metal and cuts, stamps, bends, or welds it into custom brackets for a client, that labor constitutes step-by-step manufacturing. The labor is classified as fabrication labor and is <strong>100% taxable</strong>, even if itemized separately on the invoice.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* ── Table Card ────────────────────────────────────────── */}
      <div className="card" style={{ padding: 24, border: '1px solid var(--hairline-strong)', background: 'var(--canvas)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px' }}>
              Master California Product &amp; Service Taxability Matrix
            </h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
              Determining taxable tangible personal property (TPP) versus statutory exemptions under California Law.
            </p>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['ALL', 'EXEMPT', 'TAXABLE'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFilter(mode)}
                className={`quick-btn ${filter === mode ? 'active' : ''}`}
                style={{
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {mode === 'ALL' ? 'Show All (17)' : mode === 'EXEMPT' ? 'Exempt Only' : 'Taxable Only'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table className="data-table" style={{ width: '100%', minWidth: 680 }}>
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Product / Service Category</th>
                <th style={{ width: '14%', textAlign: 'center' }}>Tax Status</th>
                <th style={{ width: '22%' }}>Governing CDTFA Reg</th>
                <th style={{ width: '36%' }}>Statutory Conditions &amp; Critical Nuances</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.category} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{item.category}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        background: item.status === 'EXEMPT' ? 'var(--mint-100)' : '#fee2e2',
                        color: item.status === 'EXEMPT' ? 'var(--forest)' : '#991b1b',
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>
                    {item.regulation}
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.5 }}>
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Deep Dive Accordions ───────────────────────────────── */}
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>
          Regulatory Deep Dives: CDTFA Exemption Standards
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {deepDives.map((dive, idx) => {
            const isOpen = openDeepDive === idx;
            return (
              <div
                key={dive.title}
                className="card"
                style={{
                  border: '1px solid var(--hairline-strong)',
                  background: 'var(--canvas)',
                  padding: 0,
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenDeepDive(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    background: isOpen ? 'var(--canvas-soft)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
                    {dive.title}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ padding: '16px 20px 20px', borderTop: '1px solid var(--hairline)' }}>
                    {dive.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
