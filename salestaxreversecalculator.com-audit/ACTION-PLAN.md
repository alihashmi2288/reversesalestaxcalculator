# Action Plan & Implementation Roadmap: salestaxreversecalculator.com

**Audit Date:** October 26, 2026  
**Target:** Climb to #1 for *"reverse sales tax calculator"* and capture Page 1 rankings across top 20 US states.

---

## Phase 1: Critical URL Equity & Schema Hygiene (Week 1)
| Priority | Action Item | File / Location | Estimated Effort | Impact |
|---|---|---|---|---|
| **Critical** | Add permanent 301 redirects from `/how-it-works` -> `/#how-it-works` and `/faq` -> `/#faq` | `next.config.mjs` | 15 mins | Consolidates crawl equity into root |
| **High** | Fix WebApplication schema name on New York page to `"New York Reverse Sales Tax Calculator"` | `src/app/us/new-york/page.tsx` | 5 mins | Eliminates entity mismatch |
| **Medium** | Ensure trailing slash consistency between `sitemap.xml` and canonical HTML headers | `src/app/sitemap.ts` | 15 mins | Removes redirect reconciliation cycles |

---

## Phase 2: High-Impact State Content Expansion (Weeks 2–3)
*Blueprint: Replicate the New York (2,409 words) and Connecticut (1,525 words) depth model that pushed them to Google Page 1.*

| Target State URL | Current Words | Current Rank | Impressions (28d) | Planned Depth | Priority Additions |
|---|---|---|---|---|---|
| `/us/texas` | 890 words | Pos 22.8 | 618 impr | 2,000+ words | Single local use tax rules, Texas Comptroller backing-out guidelines, Austin/Houston local brackets |
| `/us/california` | 996 words | Pos 22.8 | 454 impr | 2,000+ words | CDTFA Publication 116, district tax boundaries (up to 10.75%), grocery food exemptions |
| `/us/south-carolina` | 850 words | Pos 23.0 | 345 impr | 1,800+ words | SC Department of Revenue local option sales tax (LOST) calculation breakdown |
| `/us/florida` | 880 words | Pos 18.1 | 311 impr | 1,800+ words | Discretionary sales surtax rules (first $5,000 limitation rules), Form DR-15 reconciliation |
| `/us/arizona` | 870 words | Pos 15.2 | 299 impr | 1,800+ words | TPT (Transaction Privilege Tax) reverse calculation mechanics across cities |

---

## Phase 3: International Hub Expansion & Visual Assets (Month 2)
| Category | Action Item | Target Locations | Impact |
|---|---|---|---|
| **International Hubs** | Add comprehensive reverse-tax guides with local invoice requirements | `/canada` (GST/HST/PST splits), `/vat-calculator/united-kingdom`, `/vat-calculator/germany` | Expands international footprint beyond US |
| **Visual Assets** | Generate branded SVG/WebP tax bracket rate cards for the top 10 states | `public/images/states/` | Captures Google Image Search & snippet visual embeds |

---

## Phase 4: Authority & Backlink Acquisition (Ongoing)
| Strategy | Execution | Target Channels |
|---|---|---|
| **Free Accounting Widget** | Offer clean iframe / JS widget documentation with attribution link | Web developer directories, GitHub repositories, small business accounting blogs |
| **Resource Directory Submissions** | Submit utility tool to curated accounting tool lists | Product Hunt, Alternativeto, SaaSHub, Small Business Forum directories |
| **Rank Monitoring** | Monitor GSC query positions weekly for `reverse sales tax calculator` | Target transition from position 25 -> top 5 |
