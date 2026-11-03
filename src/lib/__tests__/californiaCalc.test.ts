import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { roundHalfUp } from '../../components/california/CaliforniaTaxCalculator';
import {
  CALIFORNIA_58_COUNTIES,
  CALIFORNIA_TOP_50_CITIES,
  TAXABILITY_MATRIX,
  CALIFORNIA_FAQS,
  TOP_10_PRESETS,
} from '../../data/californiaTaxData';

describe('California Tax Mathematical Calculations', () => {
  it('correctly calculates Reverse Tax for Los Angeles 9.50% standard $100 receipt', () => {
    const gross = 100.00;
    const rate = 9.50;
    const divisor = 1 + rate / 100;
    const preTax = roundHalfUp(gross / divisor);
    const tax = roundHalfUp(gross - preTax);

    assert.strictEqual(preTax, 91.32);
    assert.strictEqual(tax, 8.68);
    assert.strictEqual(roundHalfUp(preTax + tax), 100.00);
  });

  it('correctly calculates Forward Tax for Los Angeles 9.50% $100 shelf price', () => {
    const shelfPrice = 100.00;
    const rate = 9.50;
    const tax = roundHalfUp(shelfPrice * (rate / 100));
    const total = roundHalfUp(shelfPrice + tax);

    assert.strictEqual(tax, 9.50);
    assert.strictEqual(total, 109.50);
  });

  it('correctly verifies San Francisco 8.625% worked example ($1,086.25 receipt)', () => {
    const gross = 1086.25;
    const rate = 8.625;
    const divisor = 1 + rate / 100;
    const preTax = roundHalfUp(gross / divisor);
    const tax = roundHalfUp(gross - preTax);

    assert.strictEqual(preTax, 1000.00);
    assert.strictEqual(tax, 86.25);
  });

  it('correctly verifies Alameda 10.75% worked example ($2,215.00 receipt)', () => {
    const gross = 2215.00;
    const rate = 10.75;
    const divisor = 1 + rate / 100;
    const preTax = roundHalfUp(gross / divisor);
    const tax = roundHalfUp(gross - preTax);

    assert.strictEqual(preTax, 2000.00);
    assert.strictEqual(tax, 215.00);
  });

  it('proves the Subtractive Fallacy mathematical error ($4.51 discrepancy on $547.50)', () => {
    const gross = 547.50;
    const rate = 9.50;

    // Erroneous subtraction method:
    const wrongTax = roundHalfUp(gross * (rate / 100)); // 52.01

    // CDTFA statutory reverse division:
    const truePreTax = roundHalfUp(gross / (1 + rate / 100)); // 500.00
    const trueTax = roundHalfUp(gross - truePreTax); // 47.50

    const discrepancy = roundHalfUp(wrongTax - trueTax);
    assert.strictEqual(wrongTax, 52.01);
    assert.strictEqual(trueTax, 47.50);
    assert.strictEqual(discrepancy, 4.51);
  });

  it('correctly breaks down the 4 statutory tax components for Los Angeles 9.50% and reconciles total tax', () => {
    const gross = 100.00;
    const rate = 9.50;
    const divisor = 1 + rate / 100;
    const preTax = roundHalfUp(gross / divisor); // 91.32
    const totalTax = roundHalfUp(gross - preTax); // 8.68

    const stateFund = roundHalfUp(preTax * (3.9375 / 100)); // 3.60
    const localSafety = roundHalfUp(preTax * (2.0625 / 100)); // 1.88
    const bradleyBurns = roundHalfUp(preTax * (1.2500 / 100)); // 1.14
    // Statutory remainder allocation for district TUT
    const districtTut = roundHalfUp(totalTax - (stateFund + localSafety + bradleyBurns)); // 2.06

    assert.strictEqual(stateFund, 3.60);
    assert.strictEqual(localSafety, 1.88);
    assert.strictEqual(bradleyBurns, 1.14);
    assert.strictEqual(districtTut, 2.06);

    // Sum of 4 components equals isolated sales tax paid exactly ($8.68)
    const componentSum = roundHalfUp(stateFund + localSafety + bradleyBurns + districtTut);
    assert.strictEqual(componentSum, totalTax);
    assert.strictEqual(componentSum, 8.68);

    // Total statutory rates sum to 9.50%
    const rateSum = 3.9375 + 2.0625 + 1.2500 + (rate - 7.25);
    assert.strictEqual(rateSum, 9.50);
  });

  it('safely handles zero or boundary amounts without throwing or producing NaN', () => {
    const zeroGross = 0;
    const rate = 9.50;
    const divisor = 1 + rate / 100;
    const preTax = roundHalfUp(zeroGross / divisor);
    const tax = roundHalfUp(zeroGross - preTax);

    assert.strictEqual(preTax, 0);
    assert.strictEqual(tax, 0);
    assert.strictEqual(Number.isNaN(preTax), false);
    assert.strictEqual(Number.isNaN(tax), false);
  });
});

describe('California Static Data Integrity Checks', () => {
  it('contains exactly 58 California counties with valid base rates', () => {
    assert.strictEqual(CALIFORNIA_58_COUNTIES.length, 58);
    for (const county of CALIFORNIA_58_COUNTIES) {
      assert.strictEqual(county.baseRate, 7.25);
      assert.ok(county.minRate >= 7.25, `${county.name} min rate below 7.25%`);
      assert.ok(county.maxRate <= 11.25, `${county.name} max rate exceeds 11.25%`);
      assert.ok(county.seat.length > 0);
    }
  });

  it('contains exactly 50 California cities with correct reverse divisors', () => {
    assert.strictEqual(CALIFORNIA_TOP_50_CITIES.length, 50);
    for (const city of CALIFORNIA_TOP_50_CITIES) {
      assert.strictEqual(city.baseRate, 7.25);
      const computedTotal = roundHalfUp((city.baseRate + city.districtTutRate) * 1000) / 1000;
      assert.strictEqual(city.totalTaxRate, computedTotal, `Total rate mismatch for ${city.name}`);
      const computedDivisor = roundHalfUp((1 + city.totalTaxRate / 100) * 100000) / 100000;
      assert.strictEqual(city.divisor, computedDivisor, `Divisor mismatch for ${city.name}`);
    }
  });

  it('contains exactly 17 master taxability matrix rows', () => {
    assert.strictEqual(TAXABILITY_MATRIX.length, 17);
    for (const item of TAXABILITY_MATRIX) {
      assert.ok(item.status === 'EXEMPT' || item.status === 'TAXABLE');
      assert.ok(item.regulation.length > 0);
      assert.ok(item.details.length > 0);
    }
  });

  it('contains all 16 required California FAQs', () => {
    assert.strictEqual(CALIFORNIA_FAQS.length, 16);
    for (const faq of CALIFORNIA_FAQS) {
      assert.ok(faq.question.length > 10);
      assert.ok(faq.answer.length > 50);
    }
  });

  it('contains 11 top presets (Top 10 Metros + State Base)', () => {
    assert.strictEqual(TOP_10_PRESETS.length, 11);
  });
});
