'use client';

import React, { useState, useMemo } from 'react';
import { CALIFORNIA_58_COUNTIES } from '@/data/californiaTaxData';

export default function CaliforniaCountyMatrix() {
  const [search, setSearch] = useState('');

  const filteredCounties = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CALIFORNIA_58_COUNTIES;
    return CALIFORNIA_58_COUNTIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.seat.toLowerCase().includes(q) ||
        c.municipalities.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="card" style={{ padding: 24, border: '1px solid var(--hairline-strong)', background: 'var(--canvas)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px' }}>
            Complete 58-County California Sales Tax Matrix
          </h3>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
            Minimum and maximum combined rates accounting for unincorporated county jurisdictions and incorporated city district taxes.
          </p>
        </div>

        {/* Filter Input */}
        <div style={{ minWidth: 260, maxWidth: 360, width: '100%' }}>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true" style={{ fontSize: 14 }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 58 counties or cities..."
              className="calc-input with-prefix"
              style={{ height: 42, fontSize: 14 }}
              aria-label="Filter California counties"
            />
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table className="data-table" style={{ width: '100%', minWidth: 720 }}>
          <thead>
            <tr>
              <th>County Name</th>
              <th>County Seat</th>
              <th style={{ textAlign: 'center' }}>State Base</th>
              <th style={{ textAlign: 'center' }}>Min County Rate</th>
              <th style={{ textAlign: 'center' }}>Max County Rate</th>
              <th>Key Municipalities & Rates</th>
            </tr>
          </thead>
          <tbody>
            {filteredCounties.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 24, color: 'var(--muted)' }}>
                  No county matches &quot;{search}&quot;.
                </td>
              </tr>
            ) : (
              filteredCounties.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{c.name}</td>
                  <td style={{ color: 'var(--body)' }}>{c.seat}</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{c.baseRate.toFixed(2)}%</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {c.minRate.toFixed(3).replace(/\.?0+$/, '')}%
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary)' }}>
                    {c.maxRate.toFixed(3).replace(/\.?0+$/, '')}%
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--body)' }}>{c.municipalities}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>
        Showing {filteredCounties.length} of 58 California counties. Verified against CDTFA 2026 District Tax schedules.
      </div>
    </div>
  );
}
