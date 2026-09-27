export interface StateRevenueInfo {
  state: string;
  agencyName: string;
  agencyUrl: string;
  exemptionNotes: string;
}

export const STATE_REVENUE_LINKS: Record<string, StateRevenueInfo> = {
  "alabama": {
    state: "Alabama",
    agencyName: "Alabama Department of Revenue (ADOR)",
    agencyUrl: "https://revenue.alabama.gov/",
    exemptionNotes: "Groceries taxed at reduced 3% state rate (local taxes apply). Prescription drugs and medical devices are exempt.",
  },
  "alaska": {
    state: "Alaska",
    agencyName: "Alaska Department of Revenue",
    agencyUrl: "https://dor.alaska.gov/",
    exemptionNotes: "No state general sales tax. Local borough and municipal sales taxes range from 0% to 7.5% across jurisdictions.",
  },
  "arizona": {
    state: "Arizona",
    agencyName: "Arizona Department of Revenue (ADOR)",
    agencyUrl: "https://azdor.gov/",
    exemptionNotes: "Transaction Privilege Tax (TPT). Food for home consumption and prescription medications are exempt from state base.",
  },
  "arkansas": {
    state: "Arkansas",
    agencyName: "Arkansas Department of Finance and Administration",
    agencyUrl: "https://www.dfa.arkansas.gov/",
    exemptionNotes: "Qualifying groceries taxed at reduced 0.125% rate. Prescription drugs are exempt from state and local sales tax.",
  },
  "california": {
    state: "California",
    agencyName: "California Department of Tax and Fee Administration (CDTFA)",
    agencyUrl: "https://www.cdtfa.ca.gov/",
    exemptionNotes: "Unprepared grocery food, prescription drugs, and certain medical devices are exempt from California sales tax.",
  },
  "colorado": {
    state: "Colorado",
    agencyName: "Colorado Department of Revenue",
    agencyUrl: "https://tax.colorado.gov/",
    exemptionNotes: "Essential groceries and prescription medications are exempt. Home-rule cities may impose their own local rules.",
  },
  "connecticut": {
    state: "Connecticut",
    agencyName: "Connecticut Department of Revenue Services (DRS)",
    agencyUrl: "https://portal.ct.gov/drs",
    exemptionNotes: "Groceries and prescription drugs exempt. Clothing under $110 taxed at standard 6.35%; luxury items taxed at 7.75%.",
  },
  "delaware": {
    state: "Delaware",
    agencyName: "Delaware Division of Revenue",
    agencyUrl: "https://revenue.delaware.gov/",
    exemptionNotes: "Delaware has zero state or local sales tax (Gross Receipts Tax applies to businesses, not retail consumers).",
  },
  "florida": {
    state: "Florida",
    agencyName: "Florida Department of Revenue",
    agencyUrl: "https://floridarevenue.com/",
    exemptionNotes: "General groceries, common household remedies, and prescription medications are exempt from Florida sales tax.",
  },
  "georgia": {
    state: "Georgia",
    agencyName: "Georgia Department of Revenue",
    agencyUrl: "https://dor.georgia.gov/",
    exemptionNotes: "Eligible food and food ingredients for home consumption are exempt from 4% state tax (local taxes may still apply).",
  },
  "hawaii": {
    state: "Hawaii",
    agencyName: "Hawaii Department of Taxation",
    agencyUrl: "https://tax.hawaii.gov/",
    exemptionNotes: "General Excise Tax (GET) applies to almost all business activities and retail sales, including groceries and services.",
  },
  "idaho": {
    state: "Idaho",
    agencyName: "Idaho State Tax Commission",
    agencyUrl: "https://tax.idaho.gov/",
    exemptionNotes: "Groceries are subject to sales tax, but residents can claim an annual grocery tax credit on state income tax returns.",
  },
  "illinois": {
    state: "Illinois",
    agencyName: "Illinois Department of Revenue (IDOR)",
    agencyUrl: "https://tax.illinois.gov/",
    exemptionNotes: "Qualifying food, drugs, and medical appliances are taxed at a reduced 1% state rate plus local taxes.",
  },
  "indiana": {
    state: "Indiana",
    agencyName: "Indiana Department of Revenue (DOR)",
    agencyUrl: "https://www.in.gov/dor/",
    exemptionNotes: "Unprepared grocery food and prescription drugs are exempt from the flat 7.00% statewide sales tax.",
  },
  "iowa": {
    state: "Iowa",
    agencyName: "Iowa Department of Revenue",
    agencyUrl: "https://tax.iowa.gov/",
    exemptionNotes: "Unprepared food items for home consumption and prescription medications are exempt from Iowa sales tax.",
  },
  "kansas": {
    state: "Kansas",
    agencyName: "Kansas Department of Revenue",
    agencyUrl: "https://www.ksrevenue.gov/",
    exemptionNotes: "Food and food ingredients state sales tax eliminated as of 2025 (0% state food tax; local sales taxes still apply).",
  },
  "kentucky": {
    state: "Kentucky",
    agencyName: "Kentucky Department of Revenue",
    agencyUrl: "https://revenue.ky.gov/",
    exemptionNotes: "Groceries and prescription drugs exempt from the flat 6.00% statewide sales tax. No local sales taxes.",
  },
  "louisiana": {
    state: "Louisiana",
    agencyName: "Louisiana Department of Revenue (LDR)",
    agencyUrl: "https://revenue.louisiana.gov/",
    exemptionNotes: "Food for home consumption and prescription drugs exempt from state tax (local parish and municipal taxes may apply).",
  },
  "maine": {
    state: "Maine",
    agencyName: "Maine Revenue Services",
    agencyUrl: "https://www.maine.gov/revenue/",
    exemptionNotes: "Grocery staples and prescription medications are exempt from Maine's 5.50% general sales tax.",
  },
  "maryland": {
    state: "Maryland",
    agencyName: "Comptroller of Maryland",
    agencyUrl: "https://www.marylandtaxes.gov/",
    exemptionNotes: "Basic grocery foods, prescription medicines, and disposable medical supplies are exempt from the 6.00% rate.",
  },
  "massachusetts": {
    state: "Massachusetts",
    agencyName: "Massachusetts Department of Revenue (DOR)",
    agencyUrl: "https://www.mass.gov/orgs/massachusetts-department-of-revenue",
    exemptionNotes: "Food for human consumption, prescription drugs, and clothing items priced up to $175 are exempt from sales tax.",
  },
  "michigan": {
    state: "Michigan",
    agencyName: "Michigan Department of Treasury",
    agencyUrl: "https://www.michigan.gov/treasury",
    exemptionNotes: "Food for home consumption and prescription drugs are exempt from Michigan's flat 6.00% statewide sales tax.",
  },
  "minnesota": {
    state: "Minnesota",
    agencyName: "Minnesota Department of Revenue",
    agencyUrl: "https://www.revenue.state.mn.us/",
    exemptionNotes: "General clothing, grocery food items, and prescription drugs are completely exempt from Minnesota sales tax.",
  },
  "mississippi": {
    state: "Mississippi",
    agencyName: "Mississippi Department of Revenue",
    agencyUrl: "https://www.dor.ms.gov/",
    exemptionNotes: "Groceries are subject to the full 7.00% state sales tax. Prescription medications are exempt.",
  },
  "missouri": {
    state: "Missouri",
    agencyName: "Missouri Department of Revenue",
    agencyUrl: "https://dor.mo.gov/",
    exemptionNotes: "Food for home consumption is taxed at a reduced 1.225% state rate plus applicable local county and city taxes.",
  },
  "montana": {
    state: "Montana",
    agencyName: "Montana Department of Revenue",
    agencyUrl: "https://mtrevenue.gov/",
    exemptionNotes: "Montana levies no state general sales tax (resort communities may assess small local resort taxes).",
  },
  "nebraska": {
    state: "Nebraska",
    agencyName: "Nebraska Department of Revenue",
    agencyUrl: "https://revenue.nebraska.gov/",
    exemptionNotes: "Food and food ingredients for home consumption, as well as prescription drugs, are exempt from sales tax.",
  },
  "nevada": {
    state: "Nevada",
    agencyName: "Nevada Department of Taxation",
    agencyUrl: "https://tax.nv.gov/",
    exemptionNotes: "Unprepared grocery food and prescription drugs are exempt under the Nevada state constitution.",
  },
  "new-hampshire": {
    state: "New Hampshire",
    agencyName: "New Hampshire Department of Revenue Administration",
    agencyUrl: "https://www.revenue.nh.gov/",
    exemptionNotes: "New Hampshire has no general sales tax on retail goods (meals and rentals tax applies at 8.5%).",
  },
  "new-jersey": {
    state: "New Jersey",
    agencyName: "New Jersey Division of Taxation",
    agencyUrl: "https://www.state.nj.us/treasury/taxation/",
    exemptionNotes: "Most clothing, footwear, unprepared grocery foods, and prescription drugs are exempt from sales tax.",
  },
  "new-mexico": {
    state: "New Mexico",
    agencyName: "New Mexico Taxation and Revenue Department",
    agencyUrl: "https://www.tax.newmexico.gov/",
    exemptionNotes: "Gross Receipts Tax (GRT). Food for home consumption and medical services/drugs qualify for state tax deductions.",
  },
  "new-york": {
    state: "New York",
    agencyName: "New York State Department of Taxation and Finance",
    agencyUrl: "https://www.tax.ny.gov/",
    exemptionNotes: "Groceries, prescription and non-prescription medicines, and clothing/footwear under $110 are exempt from NY state tax.",
  },
  "north-carolina": {
    state: "North Carolina",
    agencyName: "North Carolina Department of Revenue (NCDOR)",
    agencyUrl: "https://www.ncdor.gov/",
    exemptionNotes: "Qualifying food for home consumption is exempt from state tax but subject to 2.00% local county sales tax.",
  },
  "north-dakota": {
    state: "North Dakota",
    agencyName: "Office of State Tax Commissioner (ND Tax)",
    agencyUrl: "https://www.tax.nd.gov/",
    exemptionNotes: "Most grocery food items and prescription medications are exempt from the 5.00% state sales tax.",
  },
  "ohio": {
    state: "Ohio",
    agencyName: "Ohio Department of Taxation",
    agencyUrl: "https://tax.ohio.gov/",
    exemptionNotes: "Food consumed off the premises where sold (groceries) and prescription drugs are exempt from Ohio sales tax.",
  },
  "oklahoma": {
    state: "Oklahoma",
    agencyName: "Oklahoma Tax Commission (OTC)",
    agencyUrl: "https://oklahoma.gov/tax.html",
    exemptionNotes: "State grocery sales tax eliminated in 2024 (0% state rate on groceries; local municipal taxes may still apply).",
  },
  "oregon": {
    state: "Oregon",
    agencyName: "Oregon Department of Revenue",
    agencyUrl: "https://www.oregon.gov/dor/",
    exemptionNotes: "Oregon has zero general retail sales tax (Corporate Activity Tax is assessed on commercial entities).",
  },
  "pennsylvania": {
    state: "Pennsylvania",
    agencyName: "Pennsylvania Department of Revenue",
    agencyUrl: "https://www.revenue.pa.gov/",
    exemptionNotes: "Everyday clothing, footwear, unprepared grocery foods, and prescription drugs are completely tax-exempt.",
  },
  "rhode-island": {
    state: "Rhode Island",
    agencyName: "Rhode Island Division of Taxation",
    agencyUrl: "https://tax.ri.gov/",
    exemptionNotes: "Clothing items up to $250, grocery foods, and prescription drugs are exempt from the flat 7.00% state tax.",
  },
  "south-carolina": {
    state: "South Carolina",
    agencyName: "South Carolina Department of Revenue (SCDOR)",
    agencyUrl: "https://dor.sc.gov/",
    exemptionNotes: "Unprepared grocery foods and prescription medicines are exempt from the 6.00% state sales tax.",
  },
  "south-dakota": {
    state: "South Dakota",
    agencyName: "South Dakota Department of Revenue",
    agencyUrl: "https://dor.sd.gov/",
    exemptionNotes: "Groceries are subject to sales tax at 4.2% state rate plus local taxes. Prescription drugs are exempt.",
  },
  "tennessee": {
    state: "Tennessee",
    agencyName: "Tennessee Department of Revenue",
    agencyUrl: "https://www.tn.gov/revenue.html",
    exemptionNotes: "Food and food ingredients are taxed at a reduced 4.00% state rate plus local options. Prescription drugs are exempt.",
  },
  "texas": {
    state: "Texas",
    agencyName: "Texas Comptroller of Public Accounts",
    agencyUrl: "https://comptroller.texas.gov/",
    exemptionNotes: "Basic grocery foods, prescription medicines, and over-the-counter drugs are exempt from Texas sales and use tax.",
  },
  "utah": {
    state: "Utah",
    agencyName: "Utah State Tax Commission",
    agencyUrl: "https://tax.utah.gov/",
    exemptionNotes: "Qualifying food and food ingredients are taxed at a reduced statewide rate of 3.00%. Prescription drugs are exempt.",
  },
  "vermont": {
    state: "Vermont",
    agencyName: "Vermont Department of Taxes",
    agencyUrl: "https://tax.vermont.gov/",
    exemptionNotes: "Grocery food items, general clothing and footwear, and prescription drugs are exempt from the 6.00% rate.",
  },
  "virginia": {
    state: "Virginia",
    agencyName: "Virginia Department of Taxation",
    agencyUrl: "https://www.tax.virginia.gov/",
    exemptionNotes: "Qualifying food for home consumption and personal hygiene items are taxed at a reduced 1.00% local rate with 0% state tax.",
  },
  "washington": {
    state: "Washington",
    agencyName: "Washington State Department of Revenue",
    agencyUrl: "https://dor.wa.gov/",
    exemptionNotes: "Unprepared grocery food and prescription drugs are exempt from Washington retail sales and use taxes.",
  },
  "west-virginia": {
    state: "West Virginia",
    agencyName: "West Virginia State Tax Department",
    agencyUrl: "https://tax.wv.gov/",
    exemptionNotes: "Food and food ingredients for home consumption and prescription medications are exempt from the 6.00% sales tax.",
  },
  "wisconsin": {
    state: "Wisconsin",
    agencyName: "Wisconsin Department of Revenue",
    agencyUrl: "https://www.revenue.wi.gov/",
    exemptionNotes: "Basic food and food ingredients, prescription drugs, and certain durable medical equipment are exempt from sales tax.",
  },
  "wyoming": {
    state: "Wyoming",
    agencyName: "Wyoming Department of Revenue",
    agencyUrl: "https://revenue.wyo.gov/",
    exemptionNotes: "Food for domestic home consumption and prescription medications are exempt from Wyoming state and local sales tax.",
  },
  "district-of-columbia": {
    state: "District of Columbia",
    agencyName: "DC Office of Tax and Revenue (OTR)",
    agencyUrl: "https://otr.cfo.dc.gov/",
    exemptionNotes: "Groceries and prescription drugs are exempt from the general 6.00% retail sales tax.",
  }
};

export function getStateRevenueInfo(slug: string): StateRevenueInfo | undefined {
  return STATE_REVENUE_LINKS[slug];
}
