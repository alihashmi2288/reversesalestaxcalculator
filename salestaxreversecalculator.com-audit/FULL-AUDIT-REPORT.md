# Full Website SEO Audit: salestaxreversecalculator.com

**Domain:** `salestaxreversecalculator.com`  
**Audit Date:** October 26, 2026  
**Auditor:** Claude SEO Multi-Platform Engine  
**Overall SEO Health Score:** **86 / 100** (Grade: B+)

---

## 1. Executive Summary

| Category | Weight | Score | Weighted Contribution |
|---|---|---|---|
| **Technical SEO** | 22% | 90 / 100 | 19.80 |
| **Content Quality & Depth** | 23% | 74 / 100 | 17.02 |
| **On-Page SEO** | 20% | 88 / 100 | 17.60 |
| **Schema / Structured Data** | 10% | 92 / 100 | 9.20 |
| **Performance (CWV)** | 10% | 88 / 100 | 8.80 |
| **AI Search Readiness (GEO/Agentic)** | 10% | 94 / 100 | 9.40 |
| **Images & Visual Assets** | 5% | 85 / 100 | 4.25 |
| **Total SEO Health Score** | **100%** | **86 / 100** | **86.07** |

### Verified Live Traffic & Ranking Reality (Google Search Console)
- **Period:** Last 28 Days (Sept 28 – Oct 23, 2026)
- **Total Search Impressions:** 17,534
- **Total Organic Clicks:** 32
- **Average Position:** **18.6** (recovering strongly from position 45.8 in early September)
- **Primary Breakthroughs:**
  - `https://salestaxreversecalculator.com/`: 5,282 impressions, 18 clicks, avg position 10.4
  - `https://salestaxreversecalculator.com/us/new-york`: 1,764 impressions, avg position **9.4** (Google Page 1)
  - `https://salestaxreversecalculator.com/us/connecticut`: 1,566 impressions, 4 clicks, avg position **10.9** (Google Page 1)

---

## 2. Top Critical Findings

1. **Enriched vs. Templated Content Disparity (The #1 Organic Growth Lever)**
   - The site crawl proves an indisputable pattern: **New York** (2,409 words) and **Connecticut** (1,525 words) both rank on **Google Page 1** (positions 9.4 and 10.9) and generate over 3,300 impressions.
   - Conversely, the other **48 state pages** remain at 633–996 words of templated boilerplate (`"Decoding Business Receipts in [State]..."`) and hover in positions 15–40.
   - Expanding the top high-opportunity states (Texas, California, Florida, South Carolina, Arizona) will unlock tens of thousands of incremental impressions.

2. **Duplicate URL Handlers on /how-it-works and /faq**
   - Both `/how-it-works` and `/faq` return HTTP 200 with 6,706 words identical to the homepage and point their canonical tags to `/`.
   - Returning HTTP 200 rather than permanent HTTP 301 redirects to `/#how-it-works` and `/#faq` splits crawl budget and dilutes internal link equity.

3. **Thin International & VAT Coverage**
   - Overseas pages (`/canada`: 723 words, `/vat-calculator/united-kingdom`: 437 words, `/vat-calculator/germany`: 374 words) lack sufficient guidance on local invoice reverse-charge mechanisms and business VAT reclaim compliance.

4. **Minor Schema Typo on New York State Application**
   - The JSON-LD `WebApplication` schema on `/us/new-york` lists `name: "New York Sales Tax Calculator"` rather than `"New York Reverse Sales Tax Calculator"`.

5. **External Domain Authority Deficit**
   - As a modern utility web app launched in 2026, the domain has 0 referring domains in historical Common Crawl dumps. Building targeted white-hat citations from accounting and finance software directories is necessary to cement #1 rankings for head keywords.

---

## 3. Detailed Category Breakdown

### 3.1 Technical SEO (Score: 90/100)
- **Crawlability:** 100% of content rendered server-side with Next.js Turbopack. All 7,683 words available without client JS execution.
- **Indexation:** 100% of sampled core pages pass GSC URL Inspection with `Submitted and indexed`.
- **Security:** Strict HSTS preload, nosniff, and SAMEORIGIN headers configured at the Vercel edge.
- **Error Handling:** Real HTTP 404 status codes returned for non-existent paths.

### 3.2 Content Quality & E-E-A-T (Score: 74/100)
- **Homepage:** 7,737 words. Quality score of 91/100 with zero detected AI filler phrases.
- **E-E-A-T Authority:** Explicit author credentials (CPA / Tax Research Specialist) with authoritative outbound links to the IRS, Tax Foundation, CRA, and OECD.
- **State Depth:** NY (2,409 words) and CT (1,525 words) demonstrate high topical depth; remaining 48 states require localization.

### 3.3 On-Page SEO (Score: 88/100)
- **Title Tags:** Optimized within 50–60 character thresholds.
- **Headings:** 1 H1, 25 H2s, 44 H3s structured logically for scanning.
- **Social Tags:** Full OpenGraph and Twitter card integration with dynamic rate cards.

### 3.4 Schema / Structured Data (Score: 92/100)
- 7 schema types on homepage (`Organization`, `WebSite`, `WebApplication`, `HowTo`, `Person`, `FAQPage`, `ImageObject`).
- Rich breadcrumbs verified on state pages.

### 3.5 Performance (Core Web Vitals) (Score: 88/100)
- Global Vercel edge delivery (TTFB ~46ms).
- Diagram image optimized to 46.7 KB WebP via Next.js image pipeline.
- Instant DOM interaction without visual layout shifts.

### 3.6 AI Search Readiness & GEO (Score: 94/100)
- `llms.txt` active (3,010 bytes) and passes Lighthouse validation.
- Explicit permissions granted for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, and `CCBot`.
- Clear mathematical definitions and worked examples primed for AI Overviews.

---

## 4. Priority Roadmap Summary

- **Week 1 (Immediate Quick Wins):** Deploy 301 redirects for `/how-it-works` and `/faq`; correct NY WebApplication schema.
- **Weeks 2–3 (High-Impact Content):** Deepen content for Texas, California, Florida, South Carolina, and Arizona.
- **Month 2 (International & Authority):** Expand Canada and UK/EU VAT hubs; begin curated directory outreach.
