// Pure tax calculation utilities — no external dependencies

export interface BasicResult {
  preTaxPrice: number;
  taxAmount: number;
  totalPaid: number;
  taxRate: number;
}

export interface FindRateResult {
  taxRate: number;
  taxAmount: number;
  originalPrice: number;
  finalPrice: number;
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
 * Reverse tax: given the TOTAL price (with tax) and tax rate,
 * calculate the pre-tax price.
 * Formula: preTaxPrice = finalPrice / (1 + taxRate / 100)
 */
export function calculateReverseTax(finalPrice: number, taxRate: number): BasicResult {
  if (finalPrice <= 0) throw new Error('Final price must be greater than 0');
  if (taxRate < 0) throw new Error('Tax rate cannot be negative');

  const preTaxPrice = finalPrice / (1 + taxRate / 100);
  const taxAmount = finalPrice - preTaxPrice;

  return {
    preTaxPrice,
    taxAmount,
    totalPaid: finalPrice,
    taxRate,
  };
}

/**
 * Find the tax rate given original (pre-tax) and final (with-tax) prices.
 * Formula: taxRate = ((finalPrice - originalPrice) / originalPrice) * 100
 */
export function findTaxRate(originalPrice: number, finalPrice: number): FindRateResult {
  if (originalPrice <= 0) throw new Error('Original price must be greater than 0');
  if (finalPrice <= 0) throw new Error('Final price must be greater than 0');
  if (finalPrice < originalPrice) throw new Error('Final price must be >= original price');

  const taxAmount = finalPrice - originalPrice;
  const taxRate = (taxAmount / originalPrice) * 100;

  return {
    taxRate,
    taxAmount,
    originalPrice,
    finalPrice,
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
    const parts = line.split(',').map((p) => p.trim().replace(/[^0-9.]/g, ''));
    if (parts.length < 2) {
      return {
        line: i + 1,
        finalPrice: 0,
        taxRate: 0,
        preTaxPrice: 0,
        taxAmount: 0,
        error: 'Invalid format. Use: price,rate',
      };
    }
    const finalPrice = parseFloat(parts[0]);
    const taxRate = parseFloat(parts[1]);
    if (isNaN(finalPrice) || isNaN(taxRate)) {
      return {
        line: i + 1,
        finalPrice,
        taxRate,
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

export function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
