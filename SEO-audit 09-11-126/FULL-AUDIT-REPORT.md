# Full Website SEO Audit Report: salestaxreversecalculator.com

**Target Domain:** https://salestaxreversecalculator.com/  
**Audit Date:** November 9, 2026  
**Audited Pages:** 79 URLs (Full Sitemap Crawl)  
**Overall SEO Health Score:** **87/100** (Grade: **B+**)

---

## Executive Summary

A comprehensive 7-pillar SEO audit of **salestaxreversecalculator.com** was conducted on November 9, 2026. The audit combined live edge crawling of all 79 URLs, header inspections, schema validations, visual analysis, AI readiness checks, and authenticated Google Search Console performance data (28-day and 90-day analytics).

### Key Performance Snapshot
- **Overall Health Score:** 87/100
- **Google Search Impressions (Last 28 Days):** **23,595 impressions** (rebounding strongly from the September trough of 8,143 impressions)
- **Google Search Clicks (Last 28 Days):** **66 clicks**
- **Average Ranking Position:** **15.1** (improved from 19.1 over the 90-day baseline)
- **Average TTFB:** **447 ms** across 79 pages globally on Vercel Edge
- **Server-Rendered Content:** **8,413 words** on the homepage available without JavaScript
- **Schema Health:** **94/100** with rich `@graph` structured data across 74+ pages

```
                                  SEO HEALTH SCORECARD
┌─────────────────────────────────┬──────────┬────────┬─────────────────────────────┐
│ Category                        │ Weight   │ Score  │ Status                      │
├─────────────────────────────────┼──────────┼────────┼─────────────────────────────┤
│ 1. Technical SEO                │ 22%      │ 84/100 │ Good (Orphan pages found)   │
│ 2. Content Quality (E-E-A-T)    │ 23%      │ 86/100 │ Strong Depth & SSR Text     │
│ 3. On-Page SEO                  │ 20%      │ 84/100 │ Title/Desc Length Warning   │
│ 4. Schema / Structured Data     │ 10%      │ 94/100 │ Outstanding Implementation  │
│ 5. Performance & CWV            │ 10%      │ 83/100 │ Fast Edge TTFB (447ms)      │
│ 6. AI Search Readiness (GEO)    │ 10%      │ 96/100 │ Exceptional (llms.txt OK)   │
│ 7. Images                       │ 5%       │ 95/100 │ 100% Alt Text Compliance    │
├─────────────────────────────────┴──────────┼────────┼─────────────────────────────┤
│ WEIGHTED OVERALL SEO HEALTH SCORE          │ 87/100 │ Grade: B+                   │
└────────────────────────────────────────────┴────────┴─────────────────────────────┘
```

---

## Top 5 Critical & High-Priority Findings

1. **9 Canadian Provincial Calculator Pages Are Completely Orphaned (Critical)**  
   The provincial calculators for Manitoba, Saskatchewan, Nova Scotia, New Brunswick, Newfoundland, Prince Edward Island, Northwest Territories, Nunavut, and Yukon exist in `sitemap.xml`, but have **zero internal incoming links** from the rest of the website.
2. **55 State Titles Exceed 60 Characters Causing SERP Truncation (High)**  
   State page titles average 68–70 characters (e.g. `Arkansas Sales Tax Calculator 2026: Calculate or Back Out Tax (9.49%)`), cutting off the exact tax rate on mobile search displays.
3. **Severe CTR Depression on High-Impression State Pages (High)**  
   `/us/new-york` ranks on Google Page 1 (average position 9.1) with **2,133 impressions** in 28 days, but converted only **1 click** (0.05% CTR). Searchers are querying NYC rates (8.875%), but current snippets do not highlight NYC calculation capabilities.
4. **Striking Distance Opportunity on Core Head Terms (High)**  
   - *"reverse tax calculator"*: Position **9.2** with **235 impressions**, 4 clicks (1.7% CTR).
   - *"how to calculate sales tax backwards from total"*: Position **9.7** with **39 impressions**, 1 click.
   - Pushing these terms from bottom Page 1 into positions 1–3 represents an immediate 5x–10x traffic multiplier.
5. **GSC Tracking Internal Anchor Fragment Links (Medium)**  
   Google Search Console reports impressions for `/#calculator`, `/#faq`, and `/#how-it-works` due to internal anchor links exposing hash fragments to search crawlers.

---

## Detailed Category Breakdowns

### 1. Technical SEO (84/100)
- **Status Codes:** 79/79 crawled pages returned HTTP 200 OK.
- **Canonical Health:** 100% clean, self-referencing canonical links. No canonical loops, protocol mismatches, or non-canonical indexing.
- **Robots.txt:** Perfectly configured, allowing all legitimate search bots and AI crawlers while restricting internal API routes.
- **Security Headers:** HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin` are present. Only `Content-Security-Policy` is missing.

### 2. Content Quality & E-E-A-T (86/100)
- **Depth:** 8,413 words server-rendered on the homepage.
- **Formula Transparency:** Full mathematical proofs for reverse sales tax extraction:
  $$\text{Pre-Tax Amount} = \frac{\text{Total Receipt Amount}}{1 + \text{Sales Tax Rate}}$$
  $$\text{Sales Tax Paid} = \text{Total Receipt Amount} - \text{Pre-Tax Amount}$$
- **State Guides:** Detailed breakdown of state-level base rates vs county/municipal local surtaxes for all 50 states.
- **Opportunity:** Add worked word problems to answer natural language math queries in search results.

### 3. On-Page SEO (84/100)
- **Headings:** 100% of pages feature exactly one unique, descriptive `<h1>` tag followed by structured `<h2>` and `<h3>` tags.
- **Duplicates:** Zero duplicate title tags and zero duplicate meta descriptions.
- **Title Length Optimization:** 55 titles exceed 60 characters and should be tightened.
- **Meta Description Optimization:** 50 descriptions exceed 160 characters.

### 4. Schema & Structured Data (94/100)
- **WebApplication Schema:** Implemented on 74 pages with `FinanceApplication` classification.
- **FAQPage Schema:** Implemented on 74 pages with matching visible Q&As.
- **HowTo Schema:** Implemented on 16 pages detailing reverse tax math.
- **BreadcrumbList Schema:** Implemented on 76 pages.

### 5. Performance & Core Web Vitals (83/100)
- **Average TTFB:** 447 ms across all endpoints.
- **Font Delivery:** Preloaded `.woff2` fonts eliminate layout shift (CLS 0.00).
- **Responsive Images:** Next.js dynamic WebP/AVIF generation with proper `srcset` and `sizes`.

### 6. AI Search Readiness & GEO (96/100)
- **llms.txt:** Fully compliant (3,012 bytes) and accessible at `/llms.txt`.
- **llms-full.txt:** Implemented and returning HTTP 200.
- **AI Bots Welcome:** Explicit allow rules for GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended, and OAI-SearchBot.

---

## Google Search Console Performance & Striking Distance

### 28-Day Performance Summary
- **Total Impressions:** 23,595
- **Total Clicks:** 66
- **Average CTR:** 0.28%
- **Average Position:** 15.1

### Top Striking Distance Keywords (Positions 4–20, Imp >= 10)
| Query | Position | Impressions | Clicks | CTR | Best Target URL |
|-------|----------|-------------|--------|-----|-----------------|
| `reverse tax calculator` | 9.2 | 235 | 4 | 1.7% | `https://salestaxreversecalculator.com/` |
| `how to calculate sales tax backwards from total` | 9.7 | 39 | 1 | 2.6% | `https://salestaxreversecalculator.com/` |
| `before tax calculator` | 12.9 | 35 | 0 | 0.0% | `https://salestaxreversecalculator.com/` |
| `sales tax reverse calculator` | 13.7 | 26 | 1 | 3.9% | `https://salestaxreversecalculator.com/` |
| `formula to back out sales tax` | 8.0 | 22 | 0 | 0.0% | `https://salestaxreversecalculator.com/` |
| `reverse tax rate calculator` | 7.3 | 19 | 1 | 5.3% | `https://salestaxreversecalculator.com/` |
| `back out the tax calculator` | 8.1 | 15 | 0 | 0.0% | `https://salestaxreversecalculator.com/` |
| `back out sales tax calculator` | 16.3 | 11 | 0 | 0.0% | `https://salestaxreversecalculator.com/` |
| `deduct tax from amount` | 8.7 | 11 | 0 | 0.0% | `https://salestaxreversecalculator.com/` |

---

## Audit Artifacts Directory
All granular specialist reports and raw data have been stored in:
`C:\All Websites\MY BUSINESS\WEBSITES\SEO AUDITS\26-spet-2027 reverse sales tax audit\SEO-audit 09-11-126`

- `audit-data.json`: Machine-readable audit envelope
- `audit-raw.json`: Full crawl dump across all 79 pages
- `ACTION-PLAN.md`: Chronological prioritized implementation plan
- `findings/technical.md`: Technical crawlability, headers, and orphan analysis
- `findings/content.md`: E-E-A-T, word count, and search query alignment
- `findings/schema.md`: Schema.org validation and `@graph` inventory
- `findings/performance.md`: TTFB, CWV, and Next.js hydration analysis
- `findings/visual-sxo.md`: UI/UX, mobile viewport, and above-the-fold layout
- `findings/geo-agentic.md`: LLM readability, llms.txt, and AI bot access
- `findings/sitemap-indexability.md`: GSC indexation verification and sitemap status
- `screenshots/`: Desktop and mobile visual viewport captures
