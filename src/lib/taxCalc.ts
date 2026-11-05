// Pure tax calculation utilities — no external dependencies

export interface BasicResult {
  preTaxPrice: number;
  taxAmount: number;
  totalPaid: number;
  taxRate: number;
  mode?: 'reverse' | 'forward';
  tipAmount?: number;
  rawPreTaxPrice?: number;
  rawTaxAmount?: number;
}

export interface FindRateResult {
  taxRate: number;
  taxAmount: number;
  originalPrice: number;
  finalPrice: number;
  expectedRate?: number;
  rateComparison?: {
    matches: boolean;
    diffAmount: number;
    diffPercent: number;
    description: string;
  };
}

export interface BatchResult {
  line: number;
  finalPrice: number;
  taxRate: number;
  preTaxPrice: number;
  taxAmount: number;
  error?: string;
}

/**
 * Standard round-half-up utility with configurable decimals
 */
export function roundHalfUp(n: number, decimals: '2' | '3' | 'none' = '2'): number {
  if (decimals === '3') {
    return Math.round((n + Number.EPSILON) * 1000) / 1000;
  }
  if (decimals === 'none') {
    return n;
  }
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Safely parse numeric string handling localized comma/decimal input,
 * currency symbols, percentages, and thousands groupings.
 */
export function parseNumberSafe(input: string): number {
  if (!input) return NaN;
  let cleaned = input.trim().replace(/[$%\s]/g, '');
  if (!cleaned) return NaN;
  if (/[a-zA-Z]/.test(cleaned)) return NaN;

  const isNegative = cleaned.startsWith('-');
  if (isNegative) {
    cleaned = cleaned.slice(1);
  }

  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');

  if (hasComma && hasDot) {
    const lastComma = cleaned.lastIndexOf(',');
    const lastDot = cleaned.lastIndexOf('.');
    if (lastDot > lastComma) {
      // e.g. 1,234.56 or 1,000,000.50 (comma is thousands)
      cleaned = cleaned.replace(/,/g, '');
    } else {
      // e.g. 1.234,56 or 1.000.000,50 (dot is thousands, comma is decimal)
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    }
  } else if (hasComma) {
    const parts = cleaned.split(',');
    if (parts.length > 2) {
      // Multiple commas: 1,000,000
      cleaned = cleaned.replace(/,/g, '');
    } else {
      // Exactly one comma: e.g. 108,25 or 1,000 or 8,875
      const afterComma = parts[1];
      if (afterComma.length !== 3) {
        // e.g. 108,25 or 8,25 or 5,5 -> decimal comma
        cleaned = cleaned.replace(',', '.');
      } else {
        // Exactly 3 digits after comma:
        // Standard thousands format if ends in '00' (e.g. 1,000 or 10,000) or parts[0].length >= 3 (e.g. 100,000)
        if (afterComma.endsWith('00') || parts[0].length >= 3) {
          cleaned = cleaned.replace(/,/g, '');
        } else {
          // 3 decimals rate or fuel price (e.g. 8,875 or 7,125 or 0,125)
          cleaned = cleaned.replace(',', '.');
        }
      }
    }
  }

  cleaned = cleaned.replace(/[^0-9.]/g, '');
  if (!cleaned) return NaN;

  const num = parseFloat(cleaned);
  return isNegative ? -num : num;
}

/**
 * Reverse tax: given the TOTAL price (with tax) and tax rate,
 * calculate the pre-tax price.
 * Formula: preTaxPrice = (finalPrice - tip) / (1 + taxRate / 100)
 */
export function calculateReverseTax(
  finalPrice: number,
  taxRate: number,
  options?: { tip?: number; rounding?: '2' | '3' | 'none' }
): BasicResult {
  if (finalPrice <= 0) throw new Error('Final price must be greater than 0');
  if (taxRate < 0) throw new Error('Tax rate cannot be negative');

  const tip = options?.tip || 0;
  if (tip < 0) throw new Error('Tip cannot be negative');
  if (tip >= finalPrice) throw new Error('Tip cannot be greater than or equal to total price');

  const taxableTotal = finalPrice - tip;
  const rawPreTax = taxableTotal / (1 + taxRate / 100);
  const rawTax = taxableTotal - rawPreTax;

  const rounding = options?.rounding ?? '2';
  const preTaxPrice = roundHalfUp(rawPreTax, rounding);
  const taxAmount = rounding === 'none' ? rawTax : roundHalfUp(taxableTotal - preTaxPrice, rounding);

  return {
    preTaxPrice,
    taxAmount,
    totalPaid: finalPrice,
    taxRate,
    mode: 'reverse',
    tipAmount: tip > 0 ? tip : undefined,
    rawPreTaxPrice: rawPreTax,
    rawTaxAmount: rawTax,
  };
}

/**
 * Forward tax: given base PRICE and tax rate,
 * calculate the tax amount and total with tax.
 * Formula: tax = price * (rate / 100); total = price + tax
 */
export function calculateForwardTax(
  basePrice: number,
  taxRate: number,
  options?: { rounding?: '2' | '3' | 'none' }
): BasicResult {
  if (basePrice <= 0) throw new Error('Price must be greater than 0');
  if (taxRate < 0) throw new Error('Tax rate cannot be negative');

  const rawTax = basePrice * (taxRate / 100);
  const rawTotal = basePrice + rawTax;

  const rounding = options?.rounding ?? '2';
  const taxAmount = roundHalfUp(rawTax, rounding);
  const totalPaid = rounding === 'none' ? rawTotal : roundHalfUp(basePrice + taxAmount, rounding);

  return {
    preTaxPrice: basePrice,
    taxAmount,
    totalPaid,
    taxRate,
    mode: 'forward',
    rawPreTaxPrice: basePrice,
    rawTaxAmount: rawTax,
  };
}

/**
 * Find the tax rate given original (pre-tax) and final (with-tax) prices.
 * Formula: taxRate = ((finalPrice - originalPrice) / originalPrice) * 100
 * Optionally checks against an expected rate, treating a 1-cent difference as a match.
 */
export function findTaxRate(
  originalPrice: number,
  finalPrice: number,
  expectedRate?: number
): FindRateResult {
  if (originalPrice <= 0) throw new Error('Original price must be greater than 0');
  if (finalPrice <= 0) throw new Error('Final price must be greater than 0');
  if (finalPrice < originalPrice) throw new Error('Final price must be >= original price');

  const taxAmount = finalPrice - originalPrice;
  const taxRate = (taxAmount / originalPrice) * 100;

  let rateComparison: FindRateResult['rateComparison'] = undefined;
  if (expectedRate !== undefined && !isNaN(expectedRate) && expectedRate >= 0) {
    const expectedTax = roundHalfUp(originalPrice * (expectedRate / 100), '2');
    const rawDiffAmount = Math.abs(taxAmount - expectedTax);
    const diffAmount = roundHalfUp(rawDiffAmount, '2');
    const diffPercent = Math.abs(taxRate - expectedRate);
    const isMatch = diffAmount <= 0.01;
    const description = isMatch
      ? diffAmount === 0
        ? `Matches expected rate (${expectedRate}%)`
        : `Matches expected rate (within 1¢ rounding difference)`
      : `Differs by $${fmt(diffAmount)} (${diffPercent.toFixed(2)}% difference)`;

    rateComparison = {
      matches: isMatch,
      diffAmount,
      diffPercent,
      description,
    };
  }

  return {
    taxRate,
    taxAmount,
    originalPrice,
    finalPrice,
    expectedRate,
    rateComparison,
  };
}

/**
 * Parse and process a batch of price,rate lines.
 * Each line: "finalPrice,taxRate" e.g. "107.50,7.5"
 */
export function processBatch(raw: string): BatchResult[] {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return lines.map((line, i) => {
    let pricePart = '';
    let ratePart = '';

    if (line.includes(';')) {
      const parts = line.split(';').map((p) => p.trim());
      pricePart = parts[0] || '';
      ratePart = parts[1] || '';
    } else if (line.includes('\t')) {
      const parts = line.split('\t').map((p) => p.trim());
      pricePart = parts[0] || '';
      ratePart = parts[1] || '';
    } else if (line.includes(',')) {
      const matchQuotes = line.match(/^"([^"]+)"[,\s]+"([^"]+)"$/);
      if (matchQuotes) {
        pricePart = matchQuotes[1];
        ratePart = matchQuotes[2];
      } else {
        const parts = line.split(',').map((p) => p.trim());
        if (parts.length === 2) {
          pricePart = parts[0];
          ratePart = parts[1];
        } else if (parts.length === 3) {
          // e.g. "1,000.00, 8.25" -> parts[0]+','+parts[1] is price
          if (!isNaN(parseNumberSafe(parts[2]))) {
            pricePart = `${parts[0]},${parts[1]}`;
            ratePart = parts[2];
          } else {
            pricePart = parts[0];
            ratePart = `${parts[1]}.${parts[2]}`;
          }
        } else if (parts.length === 4) {
          // e.g. "107, 50, 7, 5" -> 107.50, 7.5
          pricePart = `${parts[0]}.${parts[1]}`;
          ratePart = `${parts[2]}.${parts[3]}`;
        } else {
          const lastCommaIdx = line.lastIndexOf(',');
          pricePart = line.slice(0, lastCommaIdx);
          ratePart = line.slice(lastCommaIdx + 1);
        }
      }
    } else {
      return {
        line: i + 1,
        finalPrice: 0,
        taxRate: 0,
        preTaxPrice: 0,
        taxAmount: 0,
        error: 'Invalid format. Use: price,rate (or separated by semicolon/tab)',
      };
    }

    const finalPrice = parseNumberSafe(pricePart);
    const taxRate = parseNumberSafe(ratePart);

    if (isNaN(finalPrice) || isNaN(taxRate)) {
      return {
        line: i + 1,
        finalPrice: isNaN(finalPrice) ? 0 : finalPrice,
        taxRate: isNaN(taxRate) ? 0 : taxRate,
        preTaxPrice: 0,
        taxAmount: 0,
        error: 'Invalid numbers',
      };
    }

    try {
      const result = calculateReverseTax(finalPrice, taxRate);
      return {
        line: i + 1,
        finalPrice,
        taxRate,
        preTaxPrice: result.preTaxPrice,
        taxAmount: result.taxAmount,
      };
    } catch (e) {
      return {
        line: i + 1,
        finalPrice,
        taxRate,
        preTaxPrice: 0,
        taxAmount: 0,
        error: (e as Error).message,
      };
    }
  });
}

/**
 * Export batch results to CSV string
 */
export function batchToCSV(results: BatchResult[]): string {
  const headers = 'Line,Final Price,Tax Rate %,Pre-Tax Price,Tax Amount,Error\n';
  const rows = results
    .map(
      (r) =>
        `${r.line},${r.finalPrice.toFixed(2)},${r.taxRate.toFixed(3)},${r.preTaxPrice.toFixed(2)},${r.taxAmount.toFixed(2)},"${r.error || ''}"`
    )
    .join('\n');
  return headers + rows;
}

export function fmt(n: number, decimals: '2' | '3' | 'none' = '2'): string {
  if (decimals === '3') {
    return n.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  }
  if (decimals === 'none') {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  }
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
