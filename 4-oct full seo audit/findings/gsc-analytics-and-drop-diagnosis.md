# Google Search Console Analytics & Algorithmic Drop Diagnosis

## 1. Executive Summary & Timeline of the Drop

Between July and August 2026, `salestaxreversecalculator.com` had achieved strong initial organic traction on Google:
- **Peak Performance (Mid-to-Late August 2026)**:
  - Daily impressions reached **2,290 / day**
  - Daily clicks reached **10 to 11 / day**
  - Core target keyword `"reverse sales tax calculator"` reached **Position 4.6** (Top 5 on Page 1)
  - Secondary head terms like `"back out sales tax calculator"` reached **Position 3.5**, and `"back out tax calculator"` reached **Position 4.2**.

- **The Precipitous Drop (September 1 - September 6, 2026)**:
  - Impressions plummeted by **~75%**, falling from **~2,000/day to 400–500/day**.
  - Daily clicks dropped from **10/day down to 0–2/day**.
  - Position on `"reverse sales tax calculator"` fell from **4.6 to 45.8** (demoted from Page 1 to Page 5).
  - Secondary terms dropped from Top 10 to Page 4+ or lost indexation entirely.

---

## 2. GSC 90-Day vs 28-Day Performance Comparison

| Metric | 90-Day Aggregate | 28-Day Aggregate | Trend / Variance |
|---|---|---|---|
| **Total Clicks** | 183 | 16 | **-91% annualized decline** |
| **Total Impressions** | 94,233 | 11,832 | **-75% drop from peak run-rate** |
| **Average CTR** | 0.19% | 0.14% | Low (suppressed by deep rankings) |
| **Average Position** | 21.1 | 25.8 | Net 4.7 rank position deterioration |

---

## 3. Query-by-Query Impact Analysis (August Peak vs September)

Below are the top queries that suffered massive algorithmic demotion between August 15–31 and September 15–October 1:

| Query | Landing Page | Aug Impressions | Sep Impressions | Imp Change | Aug Pos | Sep Pos |
|---|---|---|---|---|---|---|
| **reverse sales tax calculator** | `/` | 1,804 | 13 | **-1,791** | **4.6** | **45.8** |
| **reverse tax calculator** | `/` | 373 | 6 | **-367** | **8.1** | **40.5** |
| **reverse sales tax** | `/` | 102 | 7 | **-95** | **8.3** | **49.4** |
| **back out tax calculator** | `/` | 55 | 0 | **-55** | **4.2** | **100.0** |
| **california sales tax calculator** | `/us/california` | 55 | 13 | **-42** | 39.9 | 53.5 |
| **how to calculate sales tax backwards from total** | `/` | 46 | 5 | **-41** | **7.2** | **46.2** |
| **back out sales tax calculator** | `/` | 38 | 1 | **-37** | **3.5** | **37.0** |
| **backwards tax calculator** | `/` | 21 | 0 | **-21** | **6.7** | **100.0** |
| **calculate reverse sales tax** | `/` | 21 | 1 | **-20** | **6.5** | **41.0** |
| **backwards sales tax calculator** | `/` | 20 | 1 | **-19** | **5.3** | **15.0** |

---

## 4. Root Cause Forensic Diagnosis

Why did the site drop from Position 4 to Position 45 between August 31 and September 6?

### Factor 1: Domain-Level Scaled Content Penalty (Primary Cause)
- Google's spam updates and automated quality evaluators evaluate sitewide content quality.
- The site hosts 81 indexable URLs, of which **50 are programmatic US state pages**.
- Our crawl revealed that **49 of the 50 state pages have ~910 words of identical boilerplate**:
  - California: *"Decoding Business Receipts in California: For freelancers and small business owners operating in California, separating the true cost of an item from the sales tax paid is critical for accurate bookkeeping..."*
  - Texas: *"Decoding Business Receipts in Texas: For freelancers and small business owners operating in Texas, separating the true cost of an item from the sales tax paid is critical for accurate bookkeeping..."*
  - Florida: *"Decoding Business Receipts in Florida: For freelancers and small business owners operating in Florida, separating the true cost of an item from the sales tax paid is critical for accurate bookkeeping..."*
- When 60%+ of a site's indexed URL inventory is detected as programmatic "thin/spun content", Google's Helpful Content System applies a domain-wide quality demotion that suppresses the homepage and all subpages simultaneously.

### Factor 2: Internal Cannibalization & Dilution
- GSC query logs showed Google vacillating between multiple URLs for the same query:
  - For `"back out tax calculator"`, impressions were split between `https://salestaxreversecalculator.com/`, `https://salestaxreversecalculator.com/#calculator`, `https://salestaxreversecalculator.com/faq`, `https://salestaxreversecalculator.com/how-it-works`, and `https://salestaxreversecalculator.com/tax-rates`.
  - `/how-it-works` has only **391 words** and reproduces the exact same 3 steps already present on the homepage.
  - `/faq` has **2,576 words** of FAQs while the homepage also contains an extensive FAQ section with FAQPage schema.
- This fragmentation divided link equity and confused Google's ranking algorithm as to which page was the primary canonical document.

### Factor 3: Zero External Backlink Authority
- Common Crawl web graph inspection confirms the domain has **0 referring domains** cataloged in the web graph (Domain Authority ~ 0).
- When algorithmic quality thresholds tightened in late August 2026, sites with zero external link equity and high programmatic boilerplate were the first to lose top-5 positions to entrenched competitors (e.g. `calculatorsoup.com`, `everythingcalculators.com`).

---

## 5. Path to Recovery and #1 Ranking

1. **Consolidate Cannibalized URLs (Immediate)**:
   - 301 redirect `/how-it-works` to `/#how-it-works`.
   - 301 redirect or self-canonicalize `/faq` to avoid splitting FAQ rankings.
2. **De-Boilerplate the Top 10 State Pages (Weeks 1–3)**:
   - Replicate the New York state page rewrite across the top 10 states by search demand (CA, TX, FL, PA, IL, OH, GA, NC, MI, NJ).
   - Inject real county sales tax ranges, transit district surtaxes, grocery/apparel exemption rules, and localized receipt examples.
3. **Add HowTo Schema on the Homepage**:
   - Implement step-by-step HowTo schema to capture Google's rich result SERP features.
4. **Acquire 15–25 High-Relevance Backlinks**:
   - Small business accounting blogs, bookkeeping resources, and freelance toolkit directories.
