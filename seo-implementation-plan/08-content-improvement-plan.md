# Content Implementation Plan
**Objective:** Eliminate thin programmatic boilerplate across high-opportunity regional and international assets, establishing authoritative, E-E-A-T-grounded tax calculation guides.  
**Source Evidence:** Google Search Console 28-day data (Sept 28 – Oct 23, 2026) and October 26 audit crawl.  

---

## 1. Page-Level Content Optimization Blueprint

### Page 1: Texas Reverse Sales Tax Calculator
- **URL:** `https://salestaxreversecalculator.com/us/texas`
- **Action:** Improve & Expand existing `TexasPage.tsx`
- **Search Intent:** Commercial / Calculative. Users (contractors, retail buyers, bookkeepers, freelancers) want to extract the pre-tax price from a Texas receipt or invoice total, or understand how to back out Texas sales tax for Comptroller tax reporting.
- **Target Topic / Keyword:** `texas reverse sales tax calculator`, `how to back out sales tax in texas`
- **Secondary Topics:** Texas state sales tax rate (6.25%), Texas combined local tax rates (up to 8.25%), Texas single local use tax (1.75%), Austin/Houston/Dallas/San Antonio sales tax rates, Texas Comptroller Form 01-114 audit guidelines.
- **Audit Metrics:** 618 impressions (28d), current rank: Position 22.8.
- **Existing Weakness:** Current component contains ~1,050 words. It mentions the 6.25% state rate and 8.25% cap, but lacks municipal jurisdiction tables, Comptroller backing-out rules, and industry use-cases.
- **Proposed Content Structure:**
  - **H1:** Texas Reverse Sales Tax Calculator (8.25% Standard Rate)
  - **Hero & Interactive Tool:** Pre-filled calculator island (`StateCalculatorClient`).
  - **H2: How to Calculate Reverse Sales Tax in Texas (The Mathematical Formula):** Detailed proof with divisor formula ($P = \text{Total} / 1.0825$).
  - **H2: Understanding Texas Sales and Use Tax Structure (6.25% State + Local Add-ons):** Breakdown of statutory 6.25% base + city (up to 1.5%), county (up to 0.5%), and special purpose districts (up to 2.0% combined cap).
  - **H2: Texas Combined Sales Tax Rates for Major Cities (2026 Reference Table):** Brackets for Houston (8.25%), Dallas (8.25%), Austin (8.25%), San Antonio (8.25%), Fort Worth (8.25%), and El Paso (7.25%).
  - **H2: Texas Comptroller Guidelines for Backing Out Sales Tax on Business Receipts:** Guidance on Texas Tax Code §151.052, explaining when retailers may state that "tax is included" and how to report taxable sales on Comptroller Form 01-114.
  - **H2: What Purchases Are Exempt from Texas Sales Tax?:** Unprepared grocery foods, prescription drugs, agricultural supplies, and manufacturing machinery exemptions.
  - **H2: Texas Single Local Use Tax (1.75%) for Remote and Interstate Sellers:** Mechanics of the 1.75% uniform rate for out-of-state sellers without physical presence.
  - **H2: Frequently Asked Questions About Texas Sales Tax (8 Detailed Accordion FAQs).**
- **Required Research & Citations:**
  - Texas Comptroller of Public Accounts: Publication 94-105 (*Local Sales and Use Tax Rates*).
  - Texas Tax Code Chapter 151 (*Limited Sales, Excise, and Use Tax*).
  - Texas Administrative Code Rule §3.286 (*Seller's and Purchaser's Responsibilities*).
- **Internal Links to Add:** Links to `/` (reverse sales tax calculator), `/tax-rates` (US state rate directory), `/about` (author credentials).
- **Recommended Writing Skill:** `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer`
- **Recommended Fact-Checking Skill:** `coreyhaines31/marketingskills@content-strategy`
- **Acceptance Criteria:** Word count >= 2,000 words; Texas Comptroller rules and citations accurate; zero calculation errors; 100% valid schema.

---

### Page 2: California Reverse Sales Tax Calculator
- **URL:** `https://salestaxreversecalculator.com/us/california`
- **Action:** Improve & Expand existing `CaliforniaPage.tsx`
- **Search Intent:** Calculative / Compliance. Users need to back out California sales tax from receipt totals with city-level accuracy ranging from 7.25% to 10.75%.
- **Target Topic / Keyword:** `california reverse sales tax calculator`, `back out sales tax california`
- **Secondary Topics:** California base sales tax rate (7.25%), Bradley-Burns Act, district taxes (transactions and use taxes), Los Angeles sales tax rate (9.50%–10.25%), San Francisco rate (8.625%), CDTFA Regulation 1602 (food products).
- **Audit Metrics:** 454 impressions (28d), current rank: Position 22.8.
- **Existing Weakness:** Currently ~1,100 words. Lacks district tax boundary explanation and hot food vs grocery 80/80 taxability rules.
- **Proposed Content Structure:**
  - **H1:** California Reverse Sales Tax Calculator (7.25% to 10.75% Rates)
  - **Hero & Interactive Tool:** Pre-filled calculator island.
  - **H2: The Reverse Sales Tax Formula for California Purchases:** Multi-tier rate divisor examples ($1.0725$ to $1.1075$).
  - **H2: Decoding California's 7.25% Base Tax Rate (State vs. Local Splits):** Explaining 6.00% state + 1.25% Bradley-Burns local operational funds.
  - **H2: California District Taxes: Why Rates Exceed 10% in Certain Municipalities:** Voter-approved special district taxes in Alameda County, Los Angeles, and Long Beach.
  - **H2: California Combined Sales Tax Rates by Major Metro Area (2026 Table):** City-by-city breakdown (LA, SF, San Diego, San Jose, Sacramento, Oakland, Fresno).
  - **H2: CDTFA Audit Instructions for Backing Out Tax on Form 401 Returns:** Proper accounting for businesses marking prices "tax included".
  - **H2: Food & Grocery Taxability Under CDTFA Regulation 1602 (The 80/80 Rule):** Clear guidelines on cold groceries vs prepared meals.
  - **H2: Frequently Asked Questions (8 Detailed Accordion FAQs).**
- **Required Research & Citations:**
  - California Department of Tax and Fee Administration (CDTFA) Publication 116 (*Sales and Use Tax Rates*).
  - CDTFA Regulation 1602 (*Food Products*).
  - Bradley-Burns Uniform Local Sales and Use Tax Law (California Revenue and Taxation Code §7200).
- **Internal Links to Add:** Contextual link to `/`, `/tax-rates`, `/us/texas` (comparative tax note).
- **Recommended Writing Skill:** `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer`
- **Acceptance Criteria:** Word count >= 2,000 words; CDTFA regulations verified; clean responsive layout.

---

### Page 3: Florida Reverse Sales Tax Calculator
- **URL:** `https://salestaxreversecalculator.com/us/florida`
- **Action:** Improve & Expand existing `FloridaPage.tsx`
- **Search Intent:** Calculative / Commercial. Users need to separate Florida sales tax from total costs, with specific interest in county discretionary surtaxes and high-value item rules.
- **Target Topic / Keyword:** `florida reverse sales tax calculator`, `florida sales tax backwards`
- **Secondary Topics:** Florida 6.00% state sales tax, county discretionary sales surtaxes (0.5%–1.5%), the $5,000 item surtax cap, Miami-Dade (7.0%), Orange County (6.5%), Hillsborough (7.5%), Form DR-15.
- **Audit Metrics:** 311 impressions (28d), current rank: Position 18.1.
- **Existing Weakness:** Currently ~1,050 words. Does not explain the unique mathematical mechanics of the $5,000 limitation on county surtaxes.
- **Proposed Content Structure:**
  - **H1:** Florida Reverse Sales Tax Calculator (6.00% Base + County Surtax)
  - **Hero & Interactive Tool:** Interactive calculation component.
  - **H2: How to Calculate Florida Reverse Sales Tax (Formula & Math Proof):** Divisor calculations for 6.0%, 6.5%, 7.0%, and 7.5%.
  - **H2: Understanding Florida's County Discretionary Sales Surtax:** How local surtaxes are levied under Florida Statute §212.055.
  - **H2: The Critical Florida $5,000 Single Item Surtax Limitation Rule:** Detailed mathematical proof showing that county surtax applies only to the first $5,000 of a single taxable item, while the 6% state rate applies to the entire amount.
  - **H2: Florida County Combined Sales Tax Rate Reference Table (2026):** Miami-Dade (7.0%), Broward (7.0%), Palm Beach (7.0%), Orange (6.5%), Hillsborough (7.5%), Duval (7.5%), Pinellas (7.0%).
  - **H2: Backing Out Sales Tax on Florida Department of Revenue Form DR-15:** Small business gross sales reconciliation.
  - **H2: Florida Sales Tax Exemptions (Groceries, Medicine, and Annual Holidays).**
  - **H2: Frequently Asked Questions (8 Detailed Accordion FAQs).**
- **Required Research & Citations:**
  - Florida Department of Revenue Form DR-15 (*Sales and Use Tax Return Instructions*).
  - Florida Department of Revenue Form GT-800019 (*Discretionary Sales Surtax Information*).
  - Florida Statutes Chapter 212 (*Tax on Sales, Use, and Other Transactions*).
- **Internal Links to Add:** In-content link to `/`, `/tax-rates`.
- **Recommended Writing Skill:** `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer`
- **Acceptance Criteria:** Word count >= 1,800 words; $5,000 surtax cap formula mathematically demonstrated with examples.

---

### Page 4: South Carolina Reverse Sales Tax Calculator
- **URL:** `https://salestaxreversecalculator.com/us/south-carolina`
- **Action:** Create dedicated `SouthCarolinaPage.tsx` (Migrate off generic template)
- **Search Intent:** Calculative / Informational. South Carolina taxpayers and businesses calculating pre-tax costs from receipt totals.
- **Target Topic / Keyword:** `south carolina reverse sales tax calculator`, `sc sales tax backwards`
- **Secondary Topics:** SC 6% state sales tax, Local Option Sales Tax (LOST), Capital Projects Sales Tax, School District taxes, maximum tax caps ($500 cap on vehicles).
- **Audit Metrics:** 345 impressions (28d), current rank: Position 23.0.
- **Existing Weakness:** Trapped in generic 850-word `stateContent.ts` template with repetitive boilerplate.
- **Proposed Content Structure:**
  - **H1:** South Carolina Reverse Sales Tax Calculator (6% Base + Local Taxes)
  - **Hero & Interactive Tool:** Pre-filled calculator island.
  - **H2: Reverse Sales Tax Calculation Formula for South Carolina Receipts.**
  - **H2: South Carolina Sales Tax Structure (6% Base + Local Option Taxes):** How county local option taxes (LOST), capital project taxes, and transportation taxes combine up to 9%.
  - **H2: County Combined Tax Rates Table (Charleston, Richland, Greenville, Horry).**
  - **H2: The South Carolina $500 Maximum Tax Cap on Vehicles, Boats, and Aircraft.**
  - **H2: South Carolina Department of Revenue Audit Guidelines for Deducting Tax.**
  - **H2: Frequently Asked Questions (6 Detailed Accordion FAQs).**
- **Required Research & Citations:**
  - South Carolina Department of Revenue (SCDOR) Information Letter (*Local Sales and Use Taxes*).
  - South Carolina Code of Laws Title 12 Chapter 36.
- **Internal Links to Add:** Link to `/`, `/tax-rates`.
- **Recommended Writing Skill:** `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer`
- **Acceptance Criteria:** Dedicated component; word count >= 1,800 words; valid JSON-LD schemas.

---

### Page 5: Arizona Reverse Sales Tax (TPT) Calculator
- **URL:** `https://salestaxreversecalculator.com/us/arizona`
- **Action:** Create dedicated `ArizonaPage.tsx` (Migrate off generic template)
- **Search Intent:** Commercial / Accounting. Arizona businesses and buyers calculating original amounts under Arizona's unique Transaction Privilege Tax.
- **Target Topic / Keyword:** `arizona reverse sales tax calculator`, `arizona tpt reverse calculator`, `back out tax arizona`
- **Secondary Topics:** Arizona Transaction Privilege Tax (TPT), 5.6% state rate, county excise taxes, city privilege taxes (combined rates 5.6% to 11.2%), Phoenix (8.6%), Tucson (8.7%), TPT Form TPT-2.
- **Audit Metrics:** 299 impressions (28d), current rank: Position 15.2 (closest non-Page-1 rank).
- **Existing Weakness:** Trapped on generic template; fails to explain that Arizona levies a Transaction Privilege Tax on vendors rather than a direct sales tax.
- **Proposed Content Structure:**
  - **H1:** Arizona Reverse Sales Tax (TPT) Calculator
  - **Hero & Interactive Tool:** Pre-filled calculator component.
  - **H2: How to Back Out Arizona Transaction Privilege Tax (The TPT Reverse Formula):** Explanation of statutory factoring formula: $\text{Taxable Sales} = \text{Gross Receipts} / (1 + \text{TPT Rate})$.
  - **H2: Arizona's Unique TPT Structure: Tax on Vendors, Not Consumers:** Legal distinction and accounting ramifications.
  - **H2: Arizona Combined Tax Rates by City (Phoenix, Tucson, Mesa, Scottsdale, Chandler, Flagstaff).**
  - **H2: How to Report Factored Tax on Arizona Department of Revenue Form TPT-2.**
  - **H2: Arizona TPT Exemptions (Unprepared Food, Prescription Drugs, Resale Certificates).**
  - **H2: Frequently Asked Questions (6 Detailed Accordion FAQs).**
- **Required Research & Citations:**
  - Arizona Department of Revenue (ADOR) Publication 600 (*Transaction Privilege Tax Factoring*).
  - Arizona Revised Statutes Title 42 (*Taxation*).
- **Internal Links to Add:** Link to `/`, `/tax-rates`.
- **Recommended Writing Skill:** `coreyhaines31/marketingskills@content-strategy`
- **Acceptance Criteria:** Dedicated component; word count >= 1,800 words; ADOR factoring formula verified.

---

### Page 6: Canada Reverse Tax Hub (GST, HST, PST & QST)
- **URL:** `https://salestaxreversecalculator.com/canada`
- **Action:** Improve & Expand existing `src/app/(site)/canada/page.tsx`
- **Search Intent:** Cross-border / Commercial. Canadian business owners, freelancers, and US businesses selling into Canada wanting to reverse-calculate GST/HST/PST/QST.
- **Target Topic / Keyword:** `canada reverse tax calculator`, `reverse gst calculator canada`, `back out hst ontario`
- **Secondary Topics:** Federal GST (5%), Harmonized Sales Tax HST (13% in Ontario, 15% in Atlantic provinces), Provincial Sales Tax PST (6% in SK, 7% in BC/MB), Quebec QST (9.975%), Canada Revenue Agency (CRA) Input Tax Credits (ITCs).
- **Audit Metrics:** 723 words currently.
- **Existing Weakness:** Lacks guidance on CRA Input Tax Credit (ITC) claiming formulas and provincial invoice documentation rules.
- **Proposed Content Structure:**
  - **H1:** Canada Reverse Tax Calculator: GST, HST, PST & QST (2026)
  - **Hero & Interactive Tool:** `CanadaCalculator` interactive component.
  - **H2: How to Calculate Reverse Tax in Canada: The Mathematical Formulas:** GST fraction ($\frac{5}{105}$), Ontario HST fraction ($\frac{13}{113}$), and Atlantic HST fraction ($\frac{15}{115}$).
  - **H2: Complete 2026 Provincial Tax Rate Reference Table (All 13 Provinces and Territories).**
  - **H2: Canada Revenue Agency (CRA) Input Tax Credit (ITC) Reverse Calculation Rules:** How businesses claim back GST/HST on tax-inclusive expenses.
  - **H2: Quebec Sequential Tax History vs Current Harmonized Base (GST + QST 14.975%).**
  - **H2: Mandatory Information Required on Canadian Tax Invoices (GST/HST Registration Numbers).**
  - **H2: Frequently Asked Questions (8 Detailed Accordion FAQs).**
- **Required Research & Citations:**
  - Canada Revenue Agency (CRA) Guide RC4022 (*General Information for GST/HST Registrants*).
  - Revenu Québec Guide IN-203-V (*General Information Concerning the QST and the GST/HST*).
- **Internal Links to Add:** Link to `/`, provincial subpages (`/canada/ontario`, `/canada/quebec`, `/canada/british-columbia`).
- **Recommended Writing Skill:** `coreyhaines31/marketingskills@content-strategy`
- **Acceptance Criteria:** Word count >= 1,800 words; CRA ITC fractions verified; clean layout.
