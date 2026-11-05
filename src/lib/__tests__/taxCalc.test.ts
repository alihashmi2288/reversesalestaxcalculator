import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateReverseTax,
  calculateForwardTax,
  findTaxRate,
  processBatch,
  parseNumberSafe,
  roundHalfUp,
  fmt
} from '../taxCalc.js';

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

  it('correctly handles tip removal before backing out tax', () => {
    // $120 total paid, $15 tip, 8.25% tax.
    // Taxable base = $105. Pre-tax = 105 / 1.0825 = 97.00. Tax = 105 - 97.00 = 8.00.
    const result = calculateReverseTax(120.0, 8.25, { tip: 15.0 });
    assert.strictEqual(result.preTaxPrice, 97.00);
    assert.strictEqual(result.taxAmount, 8.00);
    assert.strictEqual(result.tipAmount, 15.0);
    assert.strictEqual(result.totalPaid, 120.0);
  });

  it('correctly supports 3 decimals and no rounding', () => {
    const res3 = calculateReverseTax(100.0, 8.25, { rounding: '3' });
    assert.strictEqual(res3.preTaxPrice, 92.379);

    const resNone = calculateReverseTax(100.0, 8.25, { rounding: 'none' });
    assert.ok(resNone.preTaxPrice > 92.378 && resNone.preTaxPrice < 92.38);
  });

  it('throws descriptive error on negative or zero prices', () => {
    assert.throws(() => calculateReverseTax(0, 7.5), /Final price must be greater than 0/);
    assert.throws(() => calculateReverseTax(-50, 7.5), /Final price must be greater than 0/);
    assert.throws(() => calculateReverseTax(100, -2), /Tax rate cannot be negative/);
    assert.throws(() => calculateReverseTax(100, 7.5, { tip: 100 }), /Tip cannot be greater than or equal to total price/);
  });
});

describe('Forward Tax Calculations (Add Sales Tax)', () => {
  it('correctly calculates forward sales tax for $100 at 8.25%', () => {
    const result = calculateForwardTax(100.0, 8.25);
    assert.strictEqual(result.preTaxPrice, 100.0);
    assert.strictEqual(result.taxAmount, 8.25);
    assert.strictEqual(result.totalPaid, 108.25);
    assert.strictEqual(result.mode, 'forward');
  });

  it('correctly handles 0% forward sales tax', () => {
    const result = calculateForwardTax(250.0, 0);
    assert.strictEqual(result.preTaxPrice, 250.0);
    assert.strictEqual(result.taxAmount, 0.0);
    assert.strictEqual(result.totalPaid, 250.0);
  });

  it('handles negative or invalid forward tax inputs', () => {
    assert.throws(() => calculateForwardTax(0, 8.25), /Price must be greater than 0/);
    assert.throws(() => calculateForwardTax(-50, 8.25), /Price must be greater than 0/);
    assert.throws(() => calculateForwardTax(100, -5), /Tax rate cannot be negative/);
  });
});

describe('Find Tax Rate Utilities & Receipt Checker', () => {
  it('identifies applied tax rate from original and final prices', () => {
    const result = findTaxRate(100.0, 108.25);
    assert.strictEqual(Math.round(result.taxRate * 100) / 100, 8.25);
    assert.strictEqual(result.taxAmount, 8.25);
  });

  it('checks rate against expected rate (exact match)', () => {
    const result = findTaxRate(100.0, 108.25, 8.25);
    assert.ok(result.rateComparison);
    assert.strictEqual(result.rateComparison.matches, true);
    assert.strictEqual(result.rateComparison.diffAmount, 0);
  });

  it('treats 1-cent rounding difference as a match', () => {
    const result = findTaxRate(100.0, 108.26, 8.25);
    assert.ok(result.rateComparison);
    assert.strictEqual(result.rateComparison.matches, true);
    assert.strictEqual(result.rateComparison.diffAmount, 0.01);
  });

  it('flags larger differences as mismatch', () => {
    const result = findTaxRate(100.0, 109.00, 8.25);
    assert.ok(result.rateComparison);
    assert.strictEqual(result.rateComparison.matches, false);
    assert.strictEqual(result.rateComparison.diffAmount, 0.75);
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
    assert.strictEqual(Math.round(results[2].preTaxPrice), 100);
  });

  it('gracefully handles comma decimals in batch processing', () => {
    const csv = '107,50;7,5\n108.25,8.25\n107,50, 7,5\n1,000.00,8.25';
    const results = processBatch(csv);
    assert.strictEqual(results.length, 4);
    assert.strictEqual(results[0].error, undefined);
    assert.strictEqual(Math.round(results[0].preTaxPrice), 100);
    assert.strictEqual(results[1].error, undefined);
    assert.strictEqual(Math.round(results[1].preTaxPrice), 100);
    assert.strictEqual(results[2].error, undefined);
    assert.strictEqual(Math.round(results[2].preTaxPrice), 100);
    assert.strictEqual(results[3].error, undefined);
    assert.strictEqual(results[3].finalPrice, 1000.00);
  });

  it('gracefully flags malformed rows in batch processing', () => {
    const csv = 'invalid_row\n100,invalid_rate';
    const results = processBatch(csv);
    assert.strictEqual(results.length, 2);
    assert.ok(results[0].error);
    assert.ok(results[1].error);
  });
});

describe('Safe Number Parsing & Formatting', () => {
  it('parses numbers with periods or commas', () => {
    assert.strictEqual(parseNumberSafe('108.25'), 108.25);
    assert.strictEqual(parseNumberSafe('108,25'), 108.25);
    assert.strictEqual(parseNumberSafe('1,234.56'), 1234.56);
    assert.strictEqual(parseNumberSafe('$108.25'), 108.25);
    assert.strictEqual(parseNumberSafe('1,000,000'), 1000000);
    assert.strictEqual(parseNumberSafe('10,000'), 10000);
    assert.strictEqual(parseNumberSafe('1,000'), 1000);
    assert.strictEqual(parseNumberSafe('1.234,56'), 1234.56);
    assert.strictEqual(parseNumberSafe('8,875'), 8.875);
    assert.ok(isNaN(parseNumberSafe('')));
    assert.ok(isNaN(parseNumberSafe('abc')));
  });

  it('formats currency correctly', () => {
    assert.strictEqual(fmt(108.25, '2'), '108.25');
    assert.strictEqual(fmt(108.256, '3'), '108.256');
  });
});

describe('Edge Cases & Validation Requirements', () => {
  it('correctly calculates $108.25 at 8.25% yielding $100.00 pre-tax and $8.25 tax', () => {
    const res = calculateReverseTax(108.25, 8.25);
    assert.strictEqual(res.preTaxPrice, 100.00);
    assert.strictEqual(res.taxAmount, 8.25);
    assert.strictEqual(res.totalPaid, 108.25);
  });

  it('handles 0% sales tax rate correctly returning exact base price and zero tax', () => {
    const res = calculateReverseTax(100.00, 0);
    assert.strictEqual(res.preTaxPrice, 100.00);
    assert.strictEqual(res.taxAmount, 0.00);
    assert.strictEqual(res.totalPaid, 100.00);

    const fwd = calculateForwardTax(100.00, 0);
    assert.strictEqual(fwd.preTaxPrice, 100.00);
    assert.strictEqual(fwd.taxAmount, 0.00);
    assert.strictEqual(fwd.totalPaid, 100.00);
  });

  it('safely handles empty or whitespace input in parseNumberSafe', () => {
    assert.ok(isNaN(parseNumberSafe('')));
    assert.ok(isNaN(parseNumberSafe('   ')));
  });

  it('safely handles non-numeric input in parseNumberSafe', () => {
    assert.ok(isNaN(parseNumberSafe('hello')));
    assert.ok(isNaN(parseNumberSafe('$$$')));
    assert.ok(isNaN(parseNumberSafe('abc123xyz')));
  });

  it('correctly calculates very large amounts (1,000,000) at 8.25%', () => {
    const res = calculateReverseTax(1000000, 8.25);
    // 1000000 / 1.0825 = 923787.528868... -> 923787.53
    assert.strictEqual(res.preTaxPrice, 923787.53);
    assert.strictEqual(res.taxAmount, 76212.47);
    assert.strictEqual(res.totalPaid, 1000000);
  });

  it('validates rate over 100% properly without throwing unhandled exceptions', () => {
    // When rate > 100, calculateReverseTax can compute or caller UI flags rate > 100
    const res = calculateReverseTax(250.00, 150.0);
    // 250 / 2.5 = 100 pre-tax, 150 tax
    assert.strictEqual(res.preTaxPrice, 100.00);
    assert.strictEqual(res.taxAmount, 150.00);
  });
});

