import { NextRequest, NextResponse } from 'next/server';
import { calculateReverseTax } from '@/lib/taxCalc';

const roundTo2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const totalParam = searchParams.get('total') || searchParams.get('price') || searchParams.get('finalPrice');
  const rateParam = searchParams.get('rate') || searchParams.get('taxRate');

  if (!totalParam || !rateParam) {
    return NextResponse.json(
      {
        error: 'Missing required query parameters: "total" and "rate"',
        usage: '/api/calculate?total=107.50&rate=7.5',
      },
      { status: 400 }
    );
  }

  const total = parseFloat(totalParam);
  const rate = parseFloat(rateParam);

  if (isNaN(total) || total <= 0) {
    return NextResponse.json(
      { error: 'Parameter "total" must be a positive number' },
      { status: 400 }
    );
  }

  if (isNaN(rate) || rate < 0) {
    return NextResponse.json(
      { error: 'Parameter "rate" must be a non-negative number' },
      { status: 400 }
    );
  }

  try {
    const result = calculateReverseTax(total, rate);
    const preTaxRounded = roundTo2(result.preTaxPrice);
    const taxAmountRounded = roundTo2(result.taxAmount);
    const totalRounded = roundTo2(total);

    const decimalFactor = 1 + rate / 100;

    return NextResponse.json({
      totalPrice: totalRounded,
      taxRate: rate,
      preTaxPrice: preTaxRounded,
      taxAmount: taxAmountRounded,
      formula: `${totalRounded.toFixed(2)} / (1 + ${(rate / 100).toFixed(4)}) = ${preTaxRounded.toFixed(2)}`,
      formatted: {
        totalPrice: `$${totalRounded.toFixed(2)}`,
        preTaxPrice: `$${preTaxRounded.toFixed(2)}`,
        taxAmount: `$${taxAmountRounded.toFixed(2)}`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Calculation error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const total = parseFloat(body.total || body.price || body.finalPrice);
    const rate = parseFloat(body.rate || body.taxRate);

    if (isNaN(total) || total <= 0 || isNaN(rate) || rate < 0) {
      return NextResponse.json(
        { error: 'Valid "total" (> 0) and "rate" (>= 0) are required in JSON body' },
        { status: 400 }
      );
    }

    const result = calculateReverseTax(total, rate);
    const preTaxRounded = roundTo2(result.preTaxPrice);
    const taxAmountRounded = roundTo2(result.taxAmount);
    const totalRounded = roundTo2(total);

    return NextResponse.json({
      totalPrice: totalRounded,
      taxRate: rate,
      preTaxPrice: preTaxRounded,
      taxAmount: taxAmountRounded,
      formula: `${totalRounded.toFixed(2)} / (1 + ${(rate / 100).toFixed(4)}) = ${preTaxRounded.toFixed(2)}`,
      formatted: {
        totalPrice: `$${totalRounded.toFixed(2)}`,
        preTaxPrice: `$${preTaxRounded.toFixed(2)}`,
        taxAmount: `$${taxAmountRounded.toFixed(2)}`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid JSON body';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
