import { calculateReverseTax, calculateForwardTax, findTaxRate, processBatch, parseNumberSafe } from '../src/lib/taxCalc.js';

console.log('--- Test 1: Reverse $108.25 at 8.25% ---');
const r1 = calculateReverseTax(108.25, 8.25);
console.log('Pre-tax:', r1.preTaxPrice, 'Tax:', r1.taxAmount, 'Total:', r1.totalPaid);
if (r1.preTaxPrice !== 100.00 || r1.taxAmount !== 8.25) throw new Error('Test 1 failed');

console.log('--- Test 2: Forward $100 at 8.25% ---');
const r2 = calculateForwardTax(100.00, 8.25);
console.log('Pre-tax:', r2.preTaxPrice, 'Tax:', r2.taxAmount, 'Total:', r2.totalPaid);
if (r2.taxAmount !== 8.25 || r2.totalPaid !== 108.25) throw new Error('Test 2 failed');

console.log('--- Test 3: 0% rate ---');
const r3Rev = calculateReverseTax(100.00, 0);
const r3Fwd = calculateForwardTax(100.00, 0);
if (r3Rev.preTaxPrice !== 100.00 || r3Rev.taxAmount !== 0) throw new Error('Test 3 rev failed');
if (r3Fwd.totalPaid !== 100.00 || r3Fwd.taxAmount !== 0) throw new Error('Test 3 fwd failed');

console.log('--- Test 4: Tip removal ---');
const r4 = calculateReverseTax(128.25, 8.25, { tip: 20 });
console.log('Pre-tax:', r4.preTaxPrice, 'Tax:', r4.taxAmount, 'Total:', r4.totalPaid, 'Tip:', r4.tipAmount);
if (r4.preTaxPrice !== 100.00 || r4.taxAmount !== 8.25) throw new Error('Test 4 failed');

console.log('--- Test 5: Receipt checker with 1-cent difference ---');
const r5 = findTaxRate(100.00, 108.26, 8.25);
console.log('Matches:', r5.rateComparison?.matches, 'Diff:', r5.rateComparison?.diffAmount);
if (!r5.rateComparison?.matches) throw new Error('Test 5 failed');

console.log('--- Test 6: Safe parse edge cases ---');
const p1 = parseNumberSafe('1,000,000');
const p2 = parseNumberSafe('10,000');
const p3 = parseNumberSafe('1,000');
const p4 = parseNumberSafe('1.234,56');
const p5 = parseNumberSafe('8,875');
console.log({ p1, p2, p3, p4, p5 });
if (p1 !== 1000000 || p2 !== 10000 || p3 !== 1000 || p4 !== 1234.56 || p5 !== 8.875) throw new Error('Test 6 failed');

console.log('--- Test 7: Batch CSV processing with comma decimals & formatted currency ---');
const batchInput = '107,50;7,5\n108.25,8.25\n1,000.00,8.25';
const batchResults = processBatch(batchInput);
console.log('Batch results:', batchResults.map(r => ({ line: r.line, finalPrice: r.finalPrice, preTax: r.preTaxPrice, tax: r.taxAmount })));
if (batchResults.some(r => r.error)) throw new Error('Batch processing had unexpected errors');
if (Math.round(batchResults[0].preTaxPrice) !== 100) throw new Error('Batch row 0 mismatch');
if (Math.round(batchResults[1].preTaxPrice) !== 100) throw new Error('Batch row 1 mismatch');
if (batchResults[2].finalPrice !== 1000) throw new Error('Batch row 2 price mismatch');

console.log('✔ ALL SECTION 1-5 PROGRAMMATIC CHECKS PASSED!');
