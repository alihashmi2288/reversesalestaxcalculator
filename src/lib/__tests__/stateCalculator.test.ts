import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateReverseTax, calculateForwardTax, fmt } from '../taxCalc.js';
import { STATE_TAX_RATES } from '../../data/stateTaxRates.js';

describe('Bidirectional State Calculator Tests', () => {
  it('correctly calculates Pre-Tax Backwards Tax for Texas standard 8.25%', () => {
    const reverseResult = calculateReverseTax(108.25, 8.25);
    assert.strictEqual(reverseResult.preTaxPrice, 100.0);
    assert.strictEqual(reverseResult.taxAmount, 8.25);
    assert.strictEqual(reverseResult.totalPaid, 108.25);
    assert.strictEqual(fmt(reverseResult.preTaxPrice), '100.00');
  });

  it('correctly calculates Add Forward Sales Tax for Texas standard 8.25%', () => {
    const forwardResult = calculateForwardTax(100.0, 8.25);
    assert.strictEqual(forwardResult.preTaxPrice, 100.0);
    assert.strictEqual(forwardResult.taxAmount, 8.25);
    assert.strictEqual(forwardResult.totalPaid, 108.25);
    assert.strictEqual(fmt(forwardResult.totalPaid), '108.25');
  });

  it('correctly calculates Pre-Tax Backwards Tax for Florida Miami-Dade 7.00%', () => {
    const reverseResult = calculateReverseTax(107.0, 7.0);
    assert.strictEqual(reverseResult.preTaxPrice, 100.0);
    assert.strictEqual(reverseResult.taxAmount, 7.0);
    assert.strictEqual(reverseResult.totalPaid, 107.0);
  });

  it('correctly calculates Add Forward Sales Tax for Florida Miami-Dade 7.00%', () => {
    const forwardResult = calculateForwardTax(100.0, 7.0);
    assert.strictEqual(forwardResult.preTaxPrice, 100.0);
    assert.strictEqual(forwardResult.taxAmount, 7.0);
    assert.strictEqual(forwardResult.totalPaid, 107.0);
  });

  it('correctly handles Connecticut 6.35% standard and 7.75% luxury forward and reverse', () => {
    const reverseCT = calculateReverseTax(106.35, 6.35);
    assert.strictEqual(reverseCT.preTaxPrice, 100.0);
    assert.strictEqual(reverseCT.taxAmount, 6.35);

    const forwardCT = calculateForwardTax(100.0, 6.35);
    assert.strictEqual(forwardCT.totalPaid, 106.35);

    const luxuryCT = calculateForwardTax(2000.0, 7.75);
    assert.strictEqual(luxuryCT.taxAmount, 155.0);
    assert.strictEqual(luxuryCT.totalPaid, 2155.0);
  });

  it('correctly handles 0% tax-free states (Delaware, Oregon, Montana, New Hampshire, Alaska)', () => {
    const zeroStates = ['Delaware', 'Oregon', 'Montana', 'New Hampshire', 'Alaska'];
    for (const stateName of zeroStates) {
      const state = STATE_TAX_RATES.find((s) => s.state === stateName);
      assert.ok(state, `State ${stateName} should exist`);
      if (state.stateRate === 0) {
        const rev = calculateReverseTax(100.0, 0);
        assert.strictEqual(rev.preTaxPrice, 100.0);
        assert.strictEqual(rev.taxAmount, 0.0);
        assert.strictEqual(rev.totalPaid, 100.0);

        const fwd = calculateForwardTax(100.0, 0);
        assert.strictEqual(fwd.preTaxPrice, 100.0);
        assert.strictEqual(fwd.taxAmount, 0.0);
        assert.strictEqual(fwd.totalPaid, 100.0);
      }
    }
  });

  it('maintains mathematical inversion symmetry between forward and reverse modes', () => {
    const testCases = [
      { price: 250.0, rate: 8.25 }, // Texas
      { price: 89.99, rate: 7.5 },  // Georgia
      { price: 1250.0, rate: 8.6 }, // Arizona Phoenix
      { price: 45.5, rate: 9.0 },   // South Carolina Charleston
    ];

    for (const { price, rate } of testCases) {
      const fwd = calculateForwardTax(price, rate);
      const rev = calculateReverseTax(fwd.totalPaid, rate);
      assert.strictEqual(rev.preTaxPrice, price);
      assert.strictEqual(rev.taxAmount, fwd.taxAmount);
    }
  });
});
