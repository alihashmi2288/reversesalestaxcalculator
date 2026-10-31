import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateReverseTax, findTaxRate, processBatch } from '../taxCalc.js';

describe('Reverse Tax Calculations (Statutory Formulas)', () => {
  it('correctly calculates basic reverse tax for standard 7.5% rate', () => {
    const result = calculateReverseTax(107.5, 7.5);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 100.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 7.5);
    assert.strictEqual(result.totalPaid, 107.5);
  });

  it('correctly calculates Texas 8.25% metro standard reverse tax', () => {
    const result = calculateReverseTax(108.25, 8.25);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 100.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 8.25);
  });

  it('correctly calculates Los Angeles 9.50% district reverse tax', () => {
    const result = calculateReverseTax(547.5, 9.5);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 500.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 47.5);
  });

  it('correctly calculates New York City 8.875% combined reverse tax', () => {
    const result = calculateReverseTax(544.375, 8.875);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 500.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 44.38);
  });

  it('correctly calculates Arizona Phoenix 8.60% TPT factoring', () => {
    const result = calculateReverseTax(543.0, 8.6);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 500.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 43.0);
  });

  it('correctly calculates South Carolina Charleston 9.00% combined tax', () => {
    const result = calculateReverseTax(545.0, 9.0);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 500.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 45.0);
  });

  it('correctly calculates Ontario 13% HST for CRA ITC claims', () => {
    const result = calculateReverseTax(565.0, 13.0);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 500.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 65.0);
  });

  it('correctly calculates UK 20% VAT using 1/6 statutory fraction', () => {
    const result = calculateReverseTax(240.0, 20.0);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 200.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 40.0);
  });

  it('correctly calculates Germany 19% MwSt net price', () => {
    const result = calculateReverseTax(119.0, 19.0);
    assert.strictEqual(Math.round(result.preTaxPrice * 100) / 100, 100.0);
    assert.strictEqual(Math.round(result.taxAmount * 100) / 100, 19.0);
  });

  it('handles 0% tax-free states (Delaware, Oregon, Montana, NH) without alteration', () => {
    const result = calculateReverseTax(250.0, 0.0);
    assert.strictEqual(result.preTaxPrice, 250.0);
    assert.strictEqual(result.taxAmount, 0.0);
  });

  it('throws descriptive error on negative or zero prices', () => {
    assert.throws(() => calculateReverseTax(0, 7.5), /Final price must be greater than 0/);
    assert.throws(() => calculateReverseTax(-50, 7.5), /Final price must be greater than 0/);
    assert.throws(() => calculateReverseTax(100, -2), /Tax rate cannot be negative/);
  });
});

describe('Find Tax Rate Utilities', () => {
  it('identifies applied tax rate from original and final prices', () => {
    const result = findTaxRate(100.0, 108.25);
    assert.strictEqual(Math.round(result.taxRate * 100) / 100, 8.25);
    assert.strictEqual(result.taxAmount, 8.25);
  });

  it('throws error when final price is less than original price', () => {
    assert.throws(() => findTaxRate(100.0, 90.0), /Final price must be >= original price/);
  });
});

describe('Batch Processing Logic', () => {
  it('processes multi-line CSV formatted prices and tax rates', () => {
    const csv = '107.50,7.5\n108.25,8.25\n100.00,0';
    const results = processBatch(csv);
    assert.strictEqual(results.length, 3);
    assert.strictEqual(Math.round(results[0].preTaxPrice), 100);
    assert.strictEqual(Math.round(results[1].preTaxPrice), 100);
    assert.strictEqual(results[2].preTaxPrice, 100);
  });

  it('gracefully flags malformed rows in batch processing', () => {
    const csv = 'invalid_row\n100,invalid_rate';
    const results = processBatch(csv);
    assert.strictEqual(results.length, 2);
    assert.ok(results[0].error);
    assert.ok(results[1].error);
  });
});
