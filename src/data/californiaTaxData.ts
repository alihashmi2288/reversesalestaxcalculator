// California Sales Tax Data & Regulations (2026 CDTFA Standards)

export interface CaliforniaCity {
  name: string;
  county: string;
  baseRate: number;
  districtTutRate: number;
  totalTaxRate: number;
  divisor: number;
}

export interface CaliforniaCounty {
  name: string;
  seat: string;
  baseRate: number;
  minRate: number;
  maxRate: number;
  municipalities: string;
}

export interface TaxabilityItem {
  category: string;
  status: 'EXEMPT' | 'TAXABLE';
  regulation: string;
  details: string;
}

export interface CaliforniaFAQ {
  question: string;
  answer: string;
}

export const TOP_10_PRESETS = [
  { label: 'Los Angeles (9.50%)', city: 'Los Angeles', rate: 9.50 },
  { label: 'San Francisco (8.625%)', city: 'San Francisco', rate: 8.625 },
  { label: 'San Diego (7.75%)', city: 'San Diego', rate: 7.75 },
  { label: 'San Jose (9.375%)', city: 'San Jose', rate: 9.375 },
  { label: 'Sacramento (8.75%)', city: 'Sacramento', rate: 8.75 },
  { label: 'Oakland / Alameda (10.75%)', city: 'Oakland / Alameda', rate: 10.75 },
  { label: 'Long Beach (10.25%)', city: 'Long Beach', rate: 10.25 },
  { label: 'Fresno (8.35%)', city: 'Fresno', rate: 8.35 },
  { label: 'Bakersfield (8.25%)', city: 'Bakersfield', rate: 8.25 },
  { label: 'Anaheim / Orange (7.75%)', city: 'Anaheim / Orange', rate: 7.75 },
  { label: 'State Base (7.25%)', city: 'State Base', rate: 7.25 },
];

export const CALIFORNIA_58_COUNTIES: CaliforniaCounty[] = [
  { name: 'Alameda', seat: 'Oakland', baseRate: 7.25, minRate: 10.25, maxRate: 10.75, municipalities: 'Oakland (10.25%), Alameda (10.75%), Albany (10.75%), Newark (10.75%), Union City (10.75%)' },
  { name: 'Alpine', seat: 'Markleeville', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Unincorporated countywide (7.25%)' },
  { name: 'Amador', seat: 'Jackson', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'Jackson (8.75%), Sutter Creek (8.00%), Plymouth (7.75%)' },
  { name: 'Butte', seat: 'Oroville', baseRate: 7.25, minRate: 7.25, maxRate: 8.25, municipalities: 'Chico (8.25%), Paradise (8.25%), Oroville (8.25%)' },
  { name: 'Calaveras', seat: 'San Andreas', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Angels Camp (7.25%), San Andreas (7.25%)' },
  { name: 'Colusa', seat: 'Colusa', baseRate: 7.25, minRate: 7.25, maxRate: 7.75, municipalities: 'Colusa (7.75%), Williams (7.75%)' },
  { name: 'Contra Costa', seat: 'Martinez', baseRate: 7.25, minRate: 8.75, maxRate: 9.75, municipalities: 'Concord (9.25%), Richmond (9.75%), El Cerrito (9.75%), Antioch (9.25%)' },
  { name: 'Del Norte', seat: 'Crescent City', baseRate: 7.25, minRate: 7.50, maxRate: 8.50, municipalities: 'Crescent City (8.50%), Unincorporated (7.50%)' },
  { name: 'El Dorado', seat: 'Placerville', baseRate: 7.25, minRate: 7.25, maxRate: 8.75, municipalities: 'Placerville (8.75%), South Lake Tahoe (8.75%), El Dorado Hills (7.25%)' },
  { name: 'Fresno', seat: 'Fresno', baseRate: 7.25, minRate: 8.35, maxRate: 9.35, municipalities: 'Fresno (8.35%), Clovis (8.35%), Reedley (9.35%), Sanger (9.10%)' },
  { name: 'Glenn', seat: 'Willows', baseRate: 7.25, minRate: 7.25, maxRate: 7.75, municipalities: 'Willows (7.75%), Orland (7.75%)' },
  { name: 'Humboldt', seat: 'Eureka', baseRate: 7.25, minRate: 7.75, maxRate: 9.25, municipalities: 'Arcata (8.50%), Eureka (9.25%), Trinidad (8.50%), Fortuna (8.50%)' },
  { name: 'Imperial', seat: 'El Centro', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'El Centro (8.25%), Calexico (8.75%), Brawley (8.25%)' },
  { name: 'Inyo', seat: 'Independence', baseRate: 7.25, minRate: 7.75, maxRate: 8.25, municipalities: 'Bishop (8.25%), Unincorporated (7.75%)' },
  { name: 'Kern', seat: 'Bakersfield', baseRate: 7.25, minRate: 7.25, maxRate: 8.50, municipalities: 'Bakersfield (8.25%), Delano (8.25%), Ridgecrest (8.25%), Wasco (8.25%)' },
  { name: 'Kings', seat: 'Hanford', baseRate: 7.25, minRate: 7.25, maxRate: 8.25, municipalities: 'Hanford (8.25%), Lemoore (8.25%), Corcoran (8.25%)' },
  { name: 'Lake', seat: 'Lakeport', baseRate: 7.25, minRate: 7.25, maxRate: 8.75, municipalities: 'Clearlake (8.75%), Lakeport (8.75%)' },
  { name: 'Lassen', seat: 'Susanville', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Susanville (7.25%), Westwood (7.25%)' },
  { name: 'Los Angeles', seat: 'Los Angeles', baseRate: 7.25, minRate: 9.50, maxRate: 10.25, municipalities: 'Los Angeles (9.50%), Long Beach (10.25%), Pasadena (10.25%), Santa Monica (10.25%), Glendale (10.25%)' },
  { name: 'Madera', seat: 'Madera', baseRate: 7.25, minRate: 7.75, maxRate: 8.25, municipalities: 'Madera (8.25%), Chowchilla (8.25%)' },
  { name: 'Marin', seat: 'San Rafael', baseRate: 7.25, minRate: 8.25, maxRate: 9.00, municipalities: 'San Rafael (9.00%), Novato (8.50%), Mill Valley (8.25%), Sausalito (8.50%)' },
  { name: 'Mariposa', seat: 'Mariposa', baseRate: 7.25, minRate: 7.75, maxRate: 7.75, municipalities: 'Unincorporated countywide (7.75%)' },
  { name: 'Mendocino', seat: 'Ukiah', baseRate: 7.25, minRate: 7.875, maxRate: 8.875, municipalities: 'Ukiah (8.875%), Fort Bragg (8.875%), Point Arena (8.375%)' },
  { name: 'Merced', seat: 'Merced', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'Merced (8.25%), Atwater (8.75%), Los Banos (8.25%)' },
  { name: 'Modoc', seat: 'Alturas', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Alturas (7.25%), Cedarville (7.25%)' },
  { name: 'Mono', seat: 'Bridgeport', baseRate: 7.25, minRate: 7.25, maxRate: 7.75, municipalities: 'Mammoth Lakes (7.75%), Bridgeport (7.25%)' },
  { name: 'Monterey', seat: 'Salinas', baseRate: 7.25, minRate: 7.75, maxRate: 9.25, municipalities: 'Salinas (9.25%), Seaside (9.25%), Monterey (8.75%), Marina (9.25%)' },
  { name: 'Napa', seat: 'Napa', baseRate: 7.25, minRate: 7.75, maxRate: 8.25, municipalities: 'Napa (7.75%), St. Helena (8.25%), Calistoga (8.25%)' },
  { name: 'Nevada', seat: 'Nevada City', baseRate: 7.25, minRate: 7.50, maxRate: 8.50, municipalities: 'Grass Valley (8.50%), Truckee (8.25%), Nevada City (8.50%)' },
  { name: 'Orange', seat: 'Santa Ana', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'Anaheim (7.75%), Irvine (7.75%), Santa Ana (8.75%), Huntington Beach (7.75%)' },
  { name: 'Placer', seat: 'Auburn', baseRate: 7.25, minRate: 7.25, maxRate: 7.75, municipalities: 'Roseville (7.75%), Rocklin (7.25%), Auburn (7.25%), Lincoln (7.25%)' },
  { name: 'Plumas', seat: 'Quincy', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Portola (7.25%), Quincy (7.25%)' },
  { name: 'Riverside', seat: 'Riverside', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'Riverside (8.75%), Palm Springs (9.25%), Corona (8.75%), Temecula (8.75%)' },
  { name: 'Sacramento', seat: 'Sacramento', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'Sacramento (8.75%), Elk Grove (7.75%), Folsom (7.75%), Citrus Heights (7.75%)' },
  { name: 'San Benito', seat: 'Hollister', baseRate: 7.25, minRate: 8.25, maxRate: 9.25, municipalities: 'Hollister (9.25%), San Juan Bautista (8.75%)' },
  { name: 'San Bernardino', seat: 'San Bernardino', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'San Bernardino (8.75%), Ontario (7.75%), Victorville (8.75%), Fontana (7.75%)' },
  { name: 'San Diego', seat: 'San Diego', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'San Diego (7.75%), Chula Vista (8.75%), Oceanside (8.25%), Escondido (7.75%)' },
  { name: 'San Francisco', seat: 'San Francisco', baseRate: 7.25, minRate: 8.625, maxRate: 8.625, municipalities: 'Consolidated City and County of San Francisco (8.625%)' },
  { name: 'San Joaquin', seat: 'Stockton', baseRate: 7.25, minRate: 7.75, maxRate: 9.00, municipalities: 'Stockton (9.00%), Tracy (8.25%), Lodi (7.75%), Manteca (8.25%)' },
  { name: 'San Luis Obispo', seat: 'San Luis Obispo', baseRate: 7.25, minRate: 7.25, maxRate: 8.75, municipalities: 'San Luis Obispo (8.75%), Paso Robles (8.75%), Atascadero (8.75%), Morro Bay (8.25%)' },
  { name: 'San Mateo', seat: 'Redwood City', baseRate: 7.25, minRate: 9.375, maxRate: 9.875, municipalities: 'San Mateo (9.625%), Daly City (9.375%), Redwood City (9.875%), South SF (9.875%)' },
  { name: 'Santa Barbara', seat: 'Santa Barbara', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'Santa Barbara (8.75%), Santa Maria (8.75%), Lompoc (8.75%), Carpinteria (8.75%)' },
  { name: 'Santa Clara', seat: 'San Jose', baseRate: 7.25, minRate: 9.125, maxRate: 9.375, municipalities: 'San Jose (9.375%), Sunnyvale (9.125%), Santa Clara (9.125%), Mountain View (9.125%)' },
  { name: 'Santa Cruz', seat: 'Santa Cruz', baseRate: 7.25, minRate: 8.50, maxRate: 9.75, municipalities: 'Santa Cruz (9.25%), Watsonville (9.75%), Capitola (8.75%)' },
  { name: 'Shasta', seat: 'Redding', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Redding (7.25%), Anderson (7.25%), Shasta Lake (7.25%)' },
  { name: 'Sierra', seat: 'Downieville', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Loyalton (7.25%), Downieville (7.25%)' },
  { name: 'Siskiyou', seat: 'Yreka', baseRate: 7.25, minRate: 7.25, maxRate: 7.75, municipalities: 'Weed (7.75%), Mount Shasta (7.25%), Yreka (7.25%)' },
  { name: 'Solano', seat: 'Fairfield', baseRate: 7.25, minRate: 7.375, maxRate: 8.625, municipalities: 'Vallejo (8.625%), Fairfield (7.875%), Vacaville (7.875%), Benicia (8.125%)' },
  { name: 'Sonoma', seat: 'Santa Rosa', baseRate: 7.25, minRate: 8.25, maxRate: 9.25, municipalities: 'Santa Rosa (9.25%), Petaluma (8.75%), Healdsburg (8.75%), Sebastopol (9.00%)' },
  { name: 'Stanislaus', seat: 'Modesto', baseRate: 7.25, minRate: 7.375, maxRate: 8.375, municipalities: 'Modesto (8.375%), Turlock (8.125%), Ceres (8.375%), Patterson (7.875%)' },
  { name: 'Sutter', seat: 'Yuba City', baseRate: 7.25, minRate: 7.25, maxRate: 8.25, municipalities: 'Yuba City (8.25%), Live Oak (7.75%)' },
  { name: 'Tehama', seat: 'Red Bluff', baseRate: 7.25, minRate: 7.25, maxRate: 7.50, municipalities: 'Red Bluff (7.50%), Corning (7.50%)' },
  { name: 'Trinity', seat: 'Weaverville', baseRate: 7.25, minRate: 7.25, maxRate: 7.25, municipalities: 'Unincorporated countywide (7.25%)' },
  { name: 'Tulare', seat: 'Visalia', baseRate: 7.25, minRate: 7.75, maxRate: 8.75, municipalities: 'Visalia (8.50%), Tulare (8.75%), Porterville (8.75%), Dinuba (8.50%)' },
  { name: 'Tuolumne', seat: 'Sonora', baseRate: 7.25, minRate: 7.25, maxRate: 7.75, municipalities: 'Sonora (7.75%), Jamestown (7.25%)' },
  { name: 'Ventura', seat: 'Ventura', baseRate: 7.25, minRate: 7.25, maxRate: 7.75, municipalities: 'Oxnard (7.75%), Ventura (7.75%), Thousand Oaks (7.25%), Simi Valley (7.25%)' },
  { name: 'Yolo', seat: 'Woodland', baseRate: 7.25, minRate: 7.25, maxRate: 8.50, municipalities: 'Davis (8.25%), West Sacramento (8.25%), Woodland (8.00%)' },
  { name: 'Yuba', seat: 'Marysville', baseRate: 7.25, minRate: 7.25, maxRate: 8.25, municipalities: 'Marysville (8.25%), Wheatland (7.75%)' },
];

export const CALIFORNIA_TOP_50_CITIES: CaliforniaCity[] = [
  { name: 'Los Angeles', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 2.25, totalTaxRate: 9.50, divisor: 1.09500 },
  { name: 'San Diego', county: 'San Diego', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'San Jose', county: 'Santa Clara', baseRate: 7.25, districtTutRate: 2.125, totalTaxRate: 9.375, divisor: 1.09375 },
  { name: 'San Francisco', county: 'San Francisco', baseRate: 7.25, districtTutRate: 1.375, totalTaxRate: 8.625, divisor: 1.08625 },
  { name: 'Fresno', county: 'Fresno', baseRate: 7.25, districtTutRate: 1.10, totalTaxRate: 8.35, divisor: 1.08350 },
  { name: 'Sacramento', county: 'Sacramento', baseRate: 7.25, districtTutRate: 1.50, totalTaxRate: 8.75, divisor: 1.08750 },
  { name: 'Long Beach', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Oakland', county: 'Alameda', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Bakersfield', county: 'Kern', baseRate: 7.25, districtTutRate: 1.00, totalTaxRate: 8.25, divisor: 1.08250 },
  { name: 'Anaheim', county: 'Orange', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Stockton', county: 'San Joaquin', baseRate: 7.25, districtTutRate: 1.75, totalTaxRate: 9.00, divisor: 1.09000 },
  { name: 'Riverside', county: 'Riverside', baseRate: 7.25, districtTutRate: 1.50, totalTaxRate: 8.75, divisor: 1.08750 },
  { name: 'Santa Ana', county: 'Orange', baseRate: 7.25, districtTutRate: 1.50, totalTaxRate: 8.75, divisor: 1.08750 },
  { name: 'Irvine', county: 'Orange', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Chula Vista', county: 'San Diego', baseRate: 7.25, districtTutRate: 1.50, totalTaxRate: 8.75, divisor: 1.08750 },
  { name: 'Fremont', county: 'Alameda', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Santa Clarita', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 2.25, totalTaxRate: 9.50, divisor: 1.09500 },
  { name: 'San Bernardino', county: 'San Bernardino', baseRate: 7.25, districtTutRate: 1.50, totalTaxRate: 8.75, divisor: 1.08750 },
  { name: 'Modesto', county: 'Stanislaus', baseRate: 7.25, districtTutRate: 1.125, totalTaxRate: 8.375, divisor: 1.08375 },
  { name: 'Moreno Valley', county: 'Riverside', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Fontana', county: 'San Bernardino', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Oxnard', county: 'Ventura', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Huntington Beach', county: 'Orange', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Glendale', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Santa Rosa', county: 'Sonoma', baseRate: 7.25, districtTutRate: 2.00, totalTaxRate: 9.25, divisor: 1.09250 },
  { name: 'Ontario', county: 'San Bernardino', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Elk Grove', county: 'Sacramento', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Corona', county: 'Riverside', baseRate: 7.25, districtTutRate: 1.50, totalTaxRate: 8.75, divisor: 1.08750 },
  { name: 'Lancaster', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 2.25, totalTaxRate: 9.50, divisor: 1.09500 },
  { name: 'Palmdale', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 2.25, totalTaxRate: 9.50, divisor: 1.09500 },
  { name: 'Salinas', county: 'Monterey', baseRate: 7.25, districtTutRate: 2.00, totalTaxRate: 9.25, divisor: 1.09250 },
  { name: 'Hayward', county: 'Alameda', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Pomona', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Escondido', county: 'San Diego', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Sunnyvale', county: 'Santa Clara', baseRate: 7.25, districtTutRate: 1.875, totalTaxRate: 9.125, divisor: 1.09125 },
  { name: 'Torrance', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 2.25, totalTaxRate: 9.50, divisor: 1.09500 },
  { name: 'Pasadena', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Orange', county: 'Orange', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Fullerton', county: 'Orange', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Roseville', county: 'Placer', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Visalia', county: 'Tulare', baseRate: 7.25, districtTutRate: 1.25, totalTaxRate: 8.50, divisor: 1.08500 },
  { name: 'Concord', county: 'Contra Costa', baseRate: 7.25, districtTutRate: 2.00, totalTaxRate: 9.25, divisor: 1.09250 },
  { name: 'Simi Valley', county: 'Ventura', baseRate: 7.25, districtTutRate: 0.00, totalTaxRate: 7.25, divisor: 1.07250 },
  { name: 'Santa Clara', county: 'Santa Clara', baseRate: 7.25, districtTutRate: 1.875, totalTaxRate: 9.125, divisor: 1.09125 },
  { name: 'Vallejo', county: 'Solano', baseRate: 7.25, districtTutRate: 1.375, totalTaxRate: 8.625, divisor: 1.08625 },
  { name: 'Berkeley', county: 'Alameda', baseRate: 7.25, districtTutRate: 2.50, totalTaxRate: 9.75, divisor: 1.09750 },
  { name: 'El Monte', county: 'Los Angeles', baseRate: 7.25, districtTutRate: 3.00, totalTaxRate: 10.25, divisor: 1.10250 },
  { name: 'Carlsbad', county: 'San Diego', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
  { name: 'Temecula', county: 'Riverside', baseRate: 7.25, districtTutRate: 1.50, totalTaxRate: 8.75, divisor: 1.08750 },
  { name: 'Costa Mesa', county: 'Orange', baseRate: 7.25, districtTutRate: 0.50, totalTaxRate: 7.75, divisor: 1.07750 },
];

export const TAXABILITY_MATRIX: TaxabilityItem[] = [
  { category: 'Unprepared Groceries (Home Use)', status: 'EXEMPT', regulation: 'CDTFA Reg. 1602', details: 'Cold grocery staples, raw meat, poultry, fish, fresh fruit, vegetables, milk, bakery bread, and flour.' },
  { category: 'Hot Prepared Food & Dine-In', status: 'TAXABLE', regulation: 'CDTFA Reg. 1603', details: 'Heated meals, restaurant food, takeout hot soups/sandwiches, and hot coffee drinks.' },
  { category: 'Food Sold Under the 80/80 Rule', status: 'TAXABLE', regulation: 'CDTFA Reg. 1603', details: 'Cold takeout food is taxable if retailer meets both 80% tests unless segregated records are maintained.' },
  { category: 'Prescription Medications', status: 'EXEMPT', regulation: 'CDTFA Reg. 1591', details: 'Prescribed by a licensed physician and dispensed by a registered pharmacist for human treatment.' },
  { category: 'Over-the-Counter (OTC) Drugs', status: 'TAXABLE', regulation: 'CDTFA Reg. 1591', details: 'Aspirin, vitamins, cough syrups, pain relievers, and bandages sold without a medical prescription.' },
  { category: 'Prosthetic Devices & Implants', status: 'EXEMPT', regulation: 'CDTFA Reg. 1591', details: 'Artificial limbs, pacemakers, mammary prostheses, hearing aids, and prescription eyeglasses.' },
  { category: 'Cloud Computing / SaaS', status: 'EXEMPT', regulation: 'CDTFA Reg. 1502', details: 'Remotely accessed cloud software; no physical media (discs or drives) or software transferred to buyer.' },
  { category: 'Digital Software Downloads', status: 'EXEMPT', regulation: 'CDTFA Reg. 1502', details: 'Canned prewritten software transmitted solely over the internet or FTP without physical storage media.' },
  { category: 'Canned Software on Physical Media', status: 'TAXABLE', regulation: 'CDTFA Reg. 1502', details: 'Prewritten programs delivered on USB drives, CD-ROMs, DVDs, or bundled with mandatory physical manuals.' },
  { category: 'Custom Software Development', status: 'EXEMPT', regulation: 'CDTFA Reg. 1502(f)', details: 'Written to the unique, bespoke specifications of a single customer, even if delivered physically.' },
  { category: 'Digital Goods (Music, E-books)', status: 'EXEMPT', regulation: 'Cal. Rev. & Tax Code § 6016', details: 'Streaming video, electronic books, audiobooks, and digital photos are not tangible personal property.' },
  { category: 'Separately Stated Common Carrier Shipping', status: 'EXEMPT', regulation: 'CDTFA Reg. 1628', details: 'Delivery via USPS, UPS, or FedEx where charge equals actual carrier cost and is separately invoiced.' },
  { category: 'Handling & Packaging Charges', status: 'TAXABLE', regulation: 'CDTFA Reg. 1628', details: 'Labor costs for packaging, boxing, handling, or processing merchandise are always fully taxable.' },
  { category: 'Delivery in Seller’s Vehicle', status: 'TAXABLE', regulation: 'CDTFA Reg. 1628', details: 'Freight charges for delivery made in the seller\'s commercial vehicles prior to title passing to buyer.' },
  { category: 'Installation Labor', status: 'EXEMPT', regulation: 'CDTFA Reg. 1546', details: 'Labor to install, attach, or assemble already-manufactured items (e.g., mounting a TV), if itemized.' },
  { category: 'Repair Labor', status: 'EXEMPT', regulation: 'CDTFA Reg. 1546', details: 'Labor to fix, recondition, or restore existing property (parts used remain taxable), if separately stated.' },
  { category: 'Fabrication Labor', status: 'TAXABLE', regulation: 'CDTFA Reg. 1526', details: 'Labor to cut, carve, weld, stitch, or fabricate raw materials into finished property is always taxable.' },
];

export const CALIFORNIA_FAQS: CaliforniaFAQ[] = [
  {
    question: 'What is the sales tax rate in California in 2026?',
    answer: 'As of 2026, California has a mandatory statewide base sales tax rate of 7.25%, consisting of a 6.00% state general levy and a 1.25% mandatory Bradley-Burns local allocation. When local voter-approved district taxes (Transactions and Use Taxes) are added, actual checkout sales tax rates across California range from 7.25% to 10.75% depending on the specific city and county.',
  },
  {
    question: 'How do you calculate sales tax backwards from a California receipt?',
    answer: 'To reverse-calculate sales tax from a California receipt total, divide the gross total by 1 plus the combined tax rate as a decimal (Pre-Tax Price = Total / (1 + r)). For example, in Los Angeles where the sales tax rate is 9.50% (divisor 1.0950), dividing a $109.50 receipt by 1.0950 yields an exact pre-tax price of $100.00, isolating the sales tax paid at $9.50.',
  },
  {
    question: 'Why is California sales tax different in every city?',
    answer: 'While California enforces a statewide base rate of 7.25%, local voters can approve special Transactions and Use Taxes (district taxes) to fund municipal services, transit systems, parks, and libraries. These local add-ons range from 0.10% to over 3.50%, creating differing combined rates across California\'s 482 cities.',
  },
  {
    question: 'What is the highest sales tax rate in California?',
    answer: 'The highest combined sales tax rate in California is 10.75%, levied in Alameda County municipalities including Alameda, Albany, Newark, San Leandro, and Union City. In these jurisdictions, voter-approved transportation, healthcare, and civic district taxes add 3.50% on top of the 7.25% state base.',
  },
  {
    question: 'What is the lowest sales tax rate in California?',
    answer: 'The lowest sales tax rate in California is 7.25%, which is the mandatory statewide base rate. This rate applies in rural jurisdictions that have enacted zero local district taxes, including Alpine County, Modoc County, Sierra County, and unincorporated areas of Calaveras, Inyo, and Shasta counties.',
  },
  {
    question: 'Are groceries and food taxable in California?',
    answer: 'Under CDTFA Regulation 1602, cold, unprepared grocery food staples (produce, dairy, bakery bread, raw meat) sold for home consumption are exempt from sales tax. However, hot prepared food, restaurant dine-in meals, carbonated beverages, alcohol, and food sold under the 80/80 rule (Regulation 1603) are fully taxable.',
  },
  {
    question: 'How does the 80/80 rule work in California?',
    answer: 'Under CDTFA Regulation 1603, if a food vendor derives more than 80% of its revenue from food sales and more than 80% of those food sales are taxable (e.g., hot food or dine-in meals), all food sales—including cold takeaway items—become subject to sales tax unless the seller maintains detailed, segregated cash register accounting records.',
  },
  {
    question: 'How is sales tax calculated on a car purchase in California?',
    answer: 'Under CDTFA Regulation 1610, vehicle sales tax is calculated based on the buyer\'s home registration address where the car is registered with the DMV, not where the dealership is located. Furthermore, California does NOT allow trade-in vehicle values to reduce the taxable sales price; sales tax is paid on the full purchase price.',
  },
  {
    question: 'Are trade-ins deducted from sales tax on vehicle purchases in California?',
    answer: 'No. California Revenue and Taxation Code explicitly prohibits deducting vehicle trade-in allowances from the taxable gross receipt. If you purchase a vehicle for $35,000 and receive a $10,000 trade-in credit for your used vehicle, California sales tax is assessed on the full $35,000 purchase price.',
  },
  {
    question: 'Is software-as-a-service (SaaS) and digital software taxable in California?',
    answer: 'Under CDTFA Regulation 1502, pure SaaS accessed remotely via cloud servers is exempt from California sales tax because no tangible personal property is transferred. Electronically downloaded software and digital goods (e-books, digital music) are also exempt. However, canned software delivered on physical media (USB, DVD) is fully taxable.',
  },
  {
    question: 'Are digital goods, streaming media, and e-books taxable in California?',
    answer: 'No. Under California Revenue and Taxation Code Section 6016, sales tax applies solely to tangible personal property that can be seen, weighed, measured, or touched. Electronically delivered digital media, streaming movies, digital photos, podcasts, and e-books are completely exempt from California sales and use tax.',
  },
  {
    question: 'Are shipping and freight charges taxable in California?',
    answer: 'Under CDTFA Regulation 1628, shipping charges are exempt if items are shipped directly to the customer via common carrier (USPS, FedEx, UPS) and actual delivery costs are stated separately on the invoice. Handling and processing charges are always taxable. If shipping and handling are combined into a single fee, the handling portion is taxable.',
  },
  {
    question: 'What is California Use Tax and who is required to pay it?',
    answer: 'California Use Tax is a companion tax to sales tax imposed at the identical rate on taxable goods purchased without sales tax from out-of-state or online retailers for use, storage, or consumption in California. California residents must declare and remit unpaid use tax on their annual California state tax return (FTB Form 540) or directly to the CDTFA.',
  },
  {
    question: 'What are the California economic nexus rules for out-of-state sellers under AB 147?',
    answer: 'Under California Assembly Bill 147, an out-of-state remote seller is required to register with the CDTFA and collect California sales tax if their total sales of tangible personal property delivered into California exceed $500,000 in the preceding or current calendar year. California has no 200-transaction threshold test.',
  },
  {
    question: 'Can a California business include sales tax in displayed prices?',
    answer: 'Yes. Under CDTFA Regulation 1700, retailers may include sales tax in marked prices (common in bars, food trucks, and festivals) provided they post a visible sign stating: \'All prices include California sales tax reimbursement,\' or state \'Tax Included\' on menus and receipts. When filing taxes, they back out the sales tax using the reverse formula.',
  },
  {
    question: 'What are the penalties for late filing or failing to remit sales tax to the CDTFA?',
    answer: 'Under California Revenue and Taxation Code Section 6591, late returns incur an automatic 10% penalty on the unpaid tax liability plus variable statutory interest charges. An additional 10% penalty is assessed for negligence, and a 25% penalty applies for deliberate fraudulent non-compliance or tax evasion.',
  },
];
