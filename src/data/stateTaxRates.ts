export interface StateRate {
  state: string;
  abbreviation: string;
  rate: number; // combined average rate %
  stateRate: number;
  avgLocalRate: number;
  notes?: string;
}

export const STATE_TAX_RATES: StateRate[] = [
  { state: 'Alabama', abbreviation: 'AL', rate: 9.33, stateRate: 4, avgLocalRate: 5.33 },
  { state: 'Alaska', abbreviation: 'AK', rate: 1.76, stateRate: 0, avgLocalRate: 1.76, notes: 'No state tax' },
  { state: 'Arizona', abbreviation: 'AZ', rate: 8.51, stateRate: 5.6, avgLocalRate: 2.91 },
  { state: 'Arkansas', abbreviation: 'AR', rate: 9.49, stateRate: 6.5, avgLocalRate: 2.99 },
  { state: 'California', abbreviation: 'CA', rate: 9.21, stateRate: 7.25, avgLocalRate: 1.96 },
  { state: 'Colorado', abbreviation: 'CO', rate: 8.07, stateRate: 2.9, avgLocalRate: 5.17 },
  { state: 'Connecticut', abbreviation: 'CT', rate: 6.35, stateRate: 6.35, avgLocalRate: 0 },
  { state: 'Delaware', abbreviation: 'DE', rate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax' },
  { state: 'Florida', abbreviation: 'FL', rate: 7.13, stateRate: 6, avgLocalRate: 1.13 },
  { state: 'Georgia', abbreviation: 'GA', rate: 7.5, stateRate: 4, avgLocalRate: 3.5 },
  { state: 'Hawaii', abbreviation: 'HI', rate: 4.5, stateRate: 4, avgLocalRate: 0.5 },
  { state: 'Idaho', abbreviation: 'ID', rate: 6.03, stateRate: 6, avgLocalRate: 0.03 },
  { state: 'Illinois', abbreviation: 'IL', rate: 8.95, stateRate: 6.25, avgLocalRate: 2.7 },
  { state: 'Indiana', abbreviation: 'IN', rate: 7, stateRate: 7, avgLocalRate: 0 },
  { state: 'Iowa', abbreviation: 'IA', rate: 6.95, stateRate: 6, avgLocalRate: 0.95 },
  { state: 'Kansas', abbreviation: 'KS', rate: 8.79, stateRate: 6.5, avgLocalRate: 2.29 },
  { state: 'Kentucky', abbreviation: 'KY', rate: 6, stateRate: 6, avgLocalRate: 0 },
  { state: 'Louisiana', abbreviation: 'LA', rate: 9.5, stateRate: 4.45, avgLocalRate: 5.05 },
  { state: 'Maine', abbreviation: 'ME', rate: 5.5, stateRate: 5.5, avgLocalRate: 0 },
  { state: 'Maryland', abbreviation: 'MD', rate: 6, stateRate: 6, avgLocalRate: 0 },
  { state: 'Massachusetts', abbreviation: 'MA', rate: 6.25, stateRate: 6.25, avgLocalRate: 0 },
  { state: 'Michigan', abbreviation: 'MI', rate: 6, stateRate: 6, avgLocalRate: 0 },
  { state: 'Minnesota', abbreviation: 'MN', rate: 7.58, stateRate: 6.875, avgLocalRate: 0.71 },
  { state: 'Mississippi', abbreviation: 'MS', rate: 7.08, stateRate: 7, avgLocalRate: 0.08 },
  { state: 'Missouri', abbreviation: 'MO', rate: 8.35, stateRate: 4.225, avgLocalRate: 4.13 },
  { state: 'Montana', abbreviation: 'MT', rate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax' },
  { state: 'Nebraska', abbreviation: 'NE', rate: 7.05, stateRate: 5.5, avgLocalRate: 1.55 },
  { state: 'Nevada', abbreviation: 'NV', rate: 8.49, stateRate: 6.85, avgLocalRate: 1.64 },
  { state: 'New Hampshire', abbreviation: 'NH', rate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax' },
  { state: 'New Jersey', abbreviation: 'NJ', rate: 6.65, stateRate: 6.625, avgLocalRate: 0.03 },
  { state: 'New Mexico', abbreviation: 'NM', rate: 7.95, stateRate: 5, avgLocalRate: 2.95 },
  { state: 'New York', abbreviation: 'NY', rate: 8.66, stateRate: 4, avgLocalRate: 4.66 },
  { state: 'North Carolina', abbreviation: 'NC', rate: 7, stateRate: 4.75, avgLocalRate: 2.25 },
  { state: 'North Dakota', abbreviation: 'ND', rate: 7.23, stateRate: 5, avgLocalRate: 2.23 },
  { state: 'Ohio', abbreviation: 'OH', rate: 7.37, stateRate: 5.75, avgLocalRate: 1.62 },
  { state: 'Oklahoma', abbreviation: 'OK', rate: 9.02, stateRate: 4.5, avgLocalRate: 4.52 },
  { state: 'Oregon', abbreviation: 'OR', rate: 0, stateRate: 0, avgLocalRate: 0, notes: 'No sales tax' },
  { state: 'Pennsylvania', abbreviation: 'PA', rate: 6.34, stateRate: 6, avgLocalRate: 0.34 },
  { state: 'Rhode Island', abbreviation: 'RI', rate: 7, stateRate: 7, avgLocalRate: 0 },
  { state: 'South Carolina', abbreviation: 'SC', rate: 7.51, stateRate: 6, avgLocalRate: 1.51 },
  { state: 'South Dakota', abbreviation: 'SD', rate: 6.19, stateRate: 4.2, avgLocalRate: 1.99 },
  { state: 'Tennessee', abbreviation: 'TN', rate: 9.6, stateRate: 7, avgLocalRate: 2.6 },
  { state: 'Texas', abbreviation: 'TX', rate: 8.24, stateRate: 6.25, avgLocalRate: 1.99 },
  { state: 'Utah', abbreviation: 'UT', rate: 7.29, stateRate: 6.1, avgLocalRate: 1.19 },
  { state: 'Vermont', abbreviation: 'VT', rate: 6.37, stateRate: 6, avgLocalRate: 0.37 },
  { state: 'Virginia', abbreviation: 'VA', rate: 5.82, stateRate: 5.3, avgLocalRate: 0.52 },
  { state: 'Washington', abbreviation: 'WA', rate: 9.4, stateRate: 6.5, avgLocalRate: 2.9 },
  { state: 'West Virginia', abbreviation: 'WV', rate: 6.59, stateRate: 6, avgLocalRate: 0.59 },
  { state: 'Wisconsin', abbreviation: 'WI', rate: 5.64, stateRate: 5, avgLocalRate: 0.64 },
  { state: 'Wyoming', abbreviation: 'WY', rate: 5.44, stateRate: 4, avgLocalRate: 1.44 },
  { state: 'District of Columbia', abbreviation: 'DC', rate: 6, stateRate: 6, avgLocalRate: 0 },
];

export const TOP_10_STATES = ['california', 'texas', 'new-york', 'florida', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'washington'];

export function getStateByAbbr(abbr: string): StateRate | undefined {
  return STATE_TAX_RATES.find((s) => s.abbreviation.toLowerCase() === abbr.toLowerCase());
}

export function getStateBySlug(slug: string): StateRate | undefined {
  return STATE_TAX_RATES.find((s) => s.state.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());
}
