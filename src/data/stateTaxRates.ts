export interface StateRate {
  state: string;
  abbreviation: string;
  abbr: string;
  rate: number; // combined average rate %
  combinedRate: number; // alias for rate
  stateRate: number;
  avgLocalRate: number;
  lastVerified: string;
  source: string;
  notes?: string;
}

export const STATE_TAX_RATES: StateRate[] = [
  { state: 'Alabama', abbreviation: 'AL', abbr: 'AL', rate: 9.33, combinedRate: 9.33, stateRate: 4, avgLocalRate: 5.33, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Alaska', abbreviation: 'AK', abbr: 'AK', rate: 1.76, combinedRate: 1.76, stateRate: 0, avgLocalRate: 1.76, notes: 'No state tax', lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Arizona', abbreviation: 'AZ', abbr: 'AZ', rate: 8.51, combinedRate: 8.51, stateRate: 5.6, avgLocalRate: 2.91, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Arkansas', abbreviation: 'AR', abbr: 'AR', rate: 9.49, combinedRate: 9.49, stateRate: 6.5, avgLocalRate: 2.99, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'California', abbreviation: 'CA', abbr: 'CA', rate: 9.21, combinedRate: 9.21, stateRate: 7.25, avgLocalRate: 1.96, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Colorado', abbreviation: 'CO', abbr: 'CO', rate: 8.07, combinedRate: 8.07, stateRate: 2.9, avgLocalRate: 5.17, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Connecticut', abbreviation: 'CT', abbr: 'CT', rate: 6.35, combinedRate: 6.35, stateRate: 6.35, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Delaware', abbreviation: 'DE', abbr: 'DE', rate: 0, combinedRate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax', lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Florida', abbreviation: 'FL', abbr: 'FL', rate: 7.13, combinedRate: 7.13, stateRate: 6, avgLocalRate: 1.13, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Georgia', abbreviation: 'GA', abbr: 'GA', rate: 7.5, combinedRate: 7.5, stateRate: 4, avgLocalRate: 3.5, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Hawaii', abbreviation: 'HI', abbr: 'HI', rate: 4.5, combinedRate: 4.5, stateRate: 4, avgLocalRate: 0.5, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Idaho', abbreviation: 'ID', abbr: 'ID', rate: 6.03, combinedRate: 6.03, stateRate: 6, avgLocalRate: 0.03, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Illinois', abbreviation: 'IL', abbr: 'IL', rate: 8.95, combinedRate: 8.95, stateRate: 6.25, avgLocalRate: 2.7, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Indiana', abbreviation: 'IN', abbr: 'IN', rate: 7, combinedRate: 7, stateRate: 7, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Iowa', abbreviation: 'IA', abbr: 'IA', rate: 6.95, combinedRate: 6.95, stateRate: 6, avgLocalRate: 0.95, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Kansas', abbreviation: 'KS', abbr: 'KS', rate: 8.79, combinedRate: 8.79, stateRate: 6.5, avgLocalRate: 2.29, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Kentucky', abbreviation: 'KY', abbr: 'KY', rate: 6, combinedRate: 6, stateRate: 6, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Louisiana', abbreviation: 'LA', abbr: 'LA', rate: 9.5, combinedRate: 9.5, stateRate: 4.45, avgLocalRate: 5.05, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Maine', abbreviation: 'ME', abbr: 'ME', rate: 5.5, combinedRate: 5.5, stateRate: 5.5, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Maryland', abbreviation: 'MD', abbr: 'MD', rate: 6, combinedRate: 6, stateRate: 6, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Massachusetts', abbreviation: 'MA', abbr: 'MA', rate: 6.25, combinedRate: 6.25, stateRate: 6.25, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Michigan', abbreviation: 'MI', abbr: 'MI', rate: 6, combinedRate: 6, stateRate: 6, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Minnesota', abbreviation: 'MN', abbr: 'MN', rate: 7.58, combinedRate: 7.58, stateRate: 6.875, avgLocalRate: 0.71, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Mississippi', abbreviation: 'MS', abbr: 'MS', rate: 7.08, combinedRate: 7.08, stateRate: 7, avgLocalRate: 0.08, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Missouri', abbreviation: 'MO', abbr: 'MO', rate: 8.35, combinedRate: 8.35, stateRate: 4.225, avgLocalRate: 4.13, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Montana', abbreviation: 'MT', abbr: 'MT', rate: 0, combinedRate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax', lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Nebraska', abbreviation: 'NE', abbr: 'NE', rate: 7.05, combinedRate: 7.05, stateRate: 5.5, avgLocalRate: 1.55, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Nevada', abbreviation: 'NV', abbr: 'NV', rate: 8.49, combinedRate: 8.49, stateRate: 6.85, avgLocalRate: 1.64, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'New Hampshire', abbreviation: 'NH', abbr: 'NH', rate: 0, combinedRate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax', lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'New Jersey', abbreviation: 'NJ', abbr: 'NJ', rate: 6.65, combinedRate: 6.65, stateRate: 6.625, avgLocalRate: 0.03, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'New Mexico', abbreviation: 'NM', abbr: 'NM', rate: 7.95, combinedRate: 7.95, stateRate: 5, avgLocalRate: 2.95, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'New York', abbreviation: 'NY', abbr: 'NY', rate: 8.66, combinedRate: 8.66, stateRate: 4, avgLocalRate: 4.66, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'North Carolina', abbreviation: 'NC', abbr: 'NC', rate: 7, combinedRate: 7, stateRate: 4.75, avgLocalRate: 2.25, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'North Dakota', abbreviation: 'ND', abbr: 'ND', rate: 7.23, combinedRate: 7.23, stateRate: 5, avgLocalRate: 2.23, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Ohio', abbreviation: 'OH', abbr: 'OH', rate: 7.37, combinedRate: 7.37, stateRate: 5.75, avgLocalRate: 1.62, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Oklahoma', abbreviation: 'OK', abbr: 'OK', rate: 9.02, combinedRate: 9.02, stateRate: 4.5, avgLocalRate: 4.52, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Oregon', abbreviation: 'OR', abbr: 'OR', rate: 0, combinedRate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax', lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Pennsylvania', abbreviation: 'PA', abbr: 'PA', rate: 6.34, combinedRate: 6.34, stateRate: 6, avgLocalRate: 0.34, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Rhode Island', abbreviation: 'RI', abbr: 'RI', rate: 7, combinedRate: 7, stateRate: 7, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'South Carolina', abbreviation: 'SC', abbr: 'SC', rate: 7.51, combinedRate: 7.51, stateRate: 6, avgLocalRate: 1.51, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'South Dakota', abbreviation: 'SD', abbr: 'SD', rate: 6.19, combinedRate: 6.19, stateRate: 4.2, avgLocalRate: 1.99, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Tennessee', abbreviation: 'TN', abbr: 'TN', rate: 9.6, combinedRate: 9.6, stateRate: 7, avgLocalRate: 2.6, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Texas', abbreviation: 'TX', abbr: 'TX', rate: 8.24, combinedRate: 8.24, stateRate: 6.25, avgLocalRate: 1.99, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Utah', abbreviation: 'UT', abbr: 'UT', rate: 7.29, combinedRate: 7.29, stateRate: 6.1, avgLocalRate: 1.19, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Vermont', abbreviation: 'VT', abbr: 'VT', rate: 6.37, combinedRate: 6.37, stateRate: 6, avgLocalRate: 0.37, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Virginia', abbreviation: 'VA', abbr: 'VA', rate: 5.82, combinedRate: 5.82, stateRate: 5.3, avgLocalRate: 0.52, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Washington', abbreviation: 'WA', abbr: 'WA', rate: 9.4, combinedRate: 9.4, stateRate: 6.5, avgLocalRate: 2.9, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'West Virginia', abbreviation: 'WV', abbr: 'WV', rate: 6.59, combinedRate: 6.59, stateRate: 6, avgLocalRate: 0.59, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Wisconsin', abbreviation: 'WI', abbr: 'WI', rate: 5.64, combinedRate: 5.64, stateRate: 5, avgLocalRate: 0.64, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'Wyoming', abbreviation: 'WY', abbr: 'WY', rate: 5.44, combinedRate: 5.44, stateRate: 4, avgLocalRate: 1.44, lastVerified: '2026-05-01', source: 'Tax Foundation' },
  { state: 'District of Columbia', abbreviation: 'DC', abbr: 'DC', rate: 6, combinedRate: 6, stateRate: 6, avgLocalRate: 0, lastVerified: '2026-05-01', source: 'Tax Foundation' },
];

export const NATIONAL_AVERAGE_COMBINED_RATE = 7.53;

export const TOP_10_STATES = [
  'california',
  'texas',
  'new-york',
  'florida',
  'illinois',
  'pennsylvania',
  'ohio',
  'georgia',
  'north-carolina',
  'washington',
];

export const POPULAR_STATE_SLUGS = [
  'california',
  'texas',
  'new-york',
  'florida',
  'washington',
  'illinois',
  'tennessee',
  'ohio',
];

export function getStateByAbbr(abbr: string): StateRate | undefined {
  return STATE_TAX_RATES.find((s) => s.abbreviation.toLowerCase() === abbr.toLowerCase());
}

export function getStateBySlug(slug: string): StateRate | undefined {
  return STATE_TAX_RATES.find((s) => s.state.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());
}

export function getHighestRateStates(limit: number = 5): StateRate[] {
  return [...STATE_TAX_RATES].sort((a, b) => b.rate - a.rate).slice(0, limit);
}

export function getPopularStates(): StateRate[] {
  return POPULAR_STATE_SLUGS.map((slug) => getStateBySlug(slug)).filter((s): s is StateRate => Boolean(s));
}
