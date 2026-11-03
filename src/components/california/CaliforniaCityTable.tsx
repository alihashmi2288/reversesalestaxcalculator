'use client';

import React, { useState, useMemo } from 'react';
import { CALIFORNIA_TOP_50_CITIES, type CaliforniaCity } from '@/data/californiaTaxData';

type SortField = 'name' | 'county' | 'totalTaxRate';
type SortOrder = 'asc' | 'desc';

export default function CaliforniaCityTable() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('totalTaxRate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = CALIFORNIA_TOP_50_CITIES.filter((city) => {
      if (!q) return true;
      return (
        city.name.toLowerCase().includes(q) ||
        city.county.toLowerCase().includes(q) ||
        city.totalTaxRate.toString().includes(q)
      );
    });

    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'county') {
        comparison = a.county.localeCompare(b.county);
      } else {
        comparison = a.totalTaxRate - b.totalTaxRate;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [search, sortField, sortOrder]);

  const handleUseRate = (city: CaliforniaCity) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('set-ca-rate', {
          detail: { rate: city.totalTaxRate, cityName: city.name },
        })
      );
    }
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'name' ? 'asc' : 'desc');
    }
  };

  return (
    <div className="card" style={{ padding: 24, border: '1px solid var(--hairline-strong)', background: 'var(--canvas)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px' }}>
            Top 50 California Cities: Sales Tax & Divisor Directory
          </h3>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
            Click &quot;Use Rate&quot; to automatically load any city&apos;s verified 2026 CDTFA rate into the calculator.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ minWidth: 260, maxWidth: 360, width: '100%' }}>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true" style={{ fontSize: 14 }}>🔍</span>
            <input
              type="text"
              name="citySearch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city, county, or rate..."
              className="calc-input with-prefix"
              style={{ height: 42, fontSize: 14 }}
              aria-label="Filter California cities"
            />
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table className="data-table" style={{ width: '100%', minWidth: 640 }}>
          <thead>
            <tr>
              <th
                aria-sort={sortField === 'name' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                style={{ userSelect: 'none' }}
              >
                <button
                  type="button"
                  onClick={() => toggleSort('name')}
                  style={{
                    background: 'none',
                    border: 'none',
                    font: 'inherit',
                    color: 'inherit',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: 0,
                    fontWeight: 'inherit',
                  }}
                  aria-label={`Sort by City Name, currently ${sortField === 'name' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'unsorted'}`}
                >
                  City Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                </button>
              </th>
              <th
                aria-sort={sortField === 'county' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                style={{ userSelect: 'none' }}
              >
                <button
                  type="button"
                  onClick={() => toggleSort('county')}
                  style={{
                    background: 'none',
                    border: 'none',
                    font: 'inherit',
                    color: 'inherit',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: 0,
                    fontWeight: 'inherit',
                  }}
                  aria-label={`Sort by County, currently ${sortField === 'county' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'unsorted'}`}
                >
                  County {sortField === 'county' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                </button>
              </th>
              <th style={{ textAlign: 'center' }}>Base Rate</th>
              <th style={{ textAlign: 'center' }}>District TUT</th>
              <th
                aria-sort={sortField === 'totalTaxRate' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                style={{ userSelect: 'none', textAlign: 'center' }}
              >
                <button
                  type="button"
                  onClick={() => toggleSort('totalTaxRate')}
                  style={{
                    background: 'none',
                    border: 'none',
                    font: 'inherit',
                    color: 'inherit',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    padding: 0,
                    fontWeight: 'inherit',
                    width: '100%',
                  }}
                  aria-label={`Sort by Total Tax Rate, currently ${sortField === 'totalTaxRate' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'unsorted'}`}
                >
                  Total Tax Rate {sortField === 'totalTaxRate' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                </button>
              </th>
              <th style={{ textAlign: 'center' }}>Reverse Divisor</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 24, color: 'var(--muted)' }}>
                  No California cities match &quot;{search}&quot;. Try searching for another city or county.
                </td>
              </tr>
            ) : (
              filteredCities.map((city) => (
                <tr key={city.name} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{city.name}</td>
                  <td style={{ color: 'var(--body)' }}>{city.county}</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{city.baseRate.toFixed(2)}%</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: city.districtTutRate > 0 ? 'var(--primary)' : 'var(--muted)' }}>
                    {city.districtTutRate.toFixed(3).replace(/\.?0+$/, '')}%
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink)' }}>
                    {city.totalTaxRate.toFixed(3).replace(/\.?0+$/, '')}%
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontSize: 13 }}>
                    {city.divisor.toFixed(5)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleUseRate(city)}
                      className="quick-btn"
                      style={{
                        padding: '6px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)',
                      }}
                    >
                      Use Rate →
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>
        Showing {filteredCities.length} of {CALIFORNIA_TOP_50_CITIES.length} major California cities. Source: CDTFA Publication 71.
      </div>
    </div>
  );
}
