# Audit Folder Inventory: salestaxreversecalculator.com-audit
**Location:** `C:\All Websites\reverse-tax-calculator\salestaxreversecalculator.com-audit`  
**Audit Baseline Date:** October 26, 2026  
**Review Completed:** October 31, 2026  
**Auditor Engine:** Claude SEO Multi-Platform Engine / Antigravity Specialist Team  

---

## 1. Master Audit File Inventory

All 18 files and subdirectories located within the audit folder were recursively discovered, cataloged, and inspected. Zero files were inaccessible or corrupt.

| File Name | Relative Path | File Type | Size | Purpose & Contents | Review Status | Key Findings Extracted | Dependencies |
|---|---|---|---|---|---|---|---|
| **ACTION-PLAN.md** | `/ACTION-PLAN.md` | Markdown | 3,192 B | 4-Phase execution roadmap | Fully reviewed | Prioritizes 301 redirects, NY schema fix, top 5 state enrichment, international hub expansion, widget outreach. | `FULL-AUDIT-REPORT.md`, `audit-data.json` |
| **FULL-AUDIT-REPORT.md** | `/FULL-AUDIT-REPORT.md` | Markdown | 5,554 B | Complete audit summary report with health score | Fully reviewed | Overall score: 86/100 (B+). 28-day GSC metrics: 17,534 impr, 32 clicks, avg pos 18.6. Enriched NY (pos 9.4) & CT (pos 10.9) proof. | All sub-findings |
| **audit-data.json** | `/audit-data.json` | JSON | 12,883 B | Structured schema representation of audit metrics & action plan | Fully reviewed | Machine-readable breakdown of categories: Technical (90), Content (74), On-Page (88), Schema (92), CWV (88), Agentic (94), Visual (85). | `findings/*.md` |
| **Google-SEO-Report-salestaxreversecalculator.com-full.html** | `/Google-SEO-Report-...full.html` | HTML | 27,868 B | Client-ready presentation report with styling | Fully reviewed | Detailed formatting of executive summary, category findings, methodology, and action plan. | `audit-data.json` |
| **Google-SEO-Report-salestaxreversecalculator.com-full.pdf** | `/Google-SEO-Report-...full.pdf` | PDF | 43,667 B | Compiled publication artifact of full HTML report | Fully reviewed (via HTML source) | Mirrors the exact structure and findings of the full HTML report. | HTML source |
| **agentic.md** | `/findings/agentic.md` | Markdown | 1,168 B | AI search readiness & LLM crawler access audit | Fully reviewed | Score: 94/100. Robots.txt grants explicit access to GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot. `llms.txt` active (3,010 B). | `public/robots.txt`, `public/llms.txt` |
| **content.md** | `/findings/content.md` | Markdown | 2,293 B | Content quality, word count, and E-E-A-T evaluation | Fully reviewed | Score: 74/100. Homepage: 7,737 words (Quality 91/100, zero filler). Proven disparity: NY (2,409 words, pos 9.4) vs 48 states (633–996 words, pos 15–45). Top 5 state opportunities identified. | `src/data/stateContent.ts` |
| **drift.md** | `/findings/drift.md` | Markdown | 1,658 B | Month-over-month SEO drift analysis (Sept 26 vs Oct 26) | Fully reviewed | 5 intentional optimizations confirmed: title tag de-duplication, meta description refinement, H1 spacing fix, schema expansion (5->7 blocks), heading hierarchy tightening. | Baseline audit dumps |
| **performance.md** | `/findings/performance.md` | Markdown | 1,320 B | Core Web Vitals, CDN latency & responsive rendering | Fully reviewed | Score: 88/100. TTFB ~46ms from Vercel edge. Next.js image optimization compresses formula infographic from 412 KB to 46.7 KB WebP. CLS < 0.02. Touch targets compliant (>48x48px). | Lighthouse audit exports |
| **schema.md** | `/findings/schema.md` | Markdown | 1,586 B | JSON-LD structured data verification | Fully reviewed | Score: 92/100. 7 schemas on homepage verified. WebApplication schema name discrepancy on `/us/new-york` confirmed. Need for HowTo schemas on state pages. | `src/app/layout.tsx`, `NewYorkPage.tsx` |
| **technical.md** | `/findings/technical.md` | Markdown | 2,154 B | Crawlability, indexability, security headers, redirects | Fully reviewed | Score: 90/100. 100% SSR content delivered on initial HTML payload. 11/11 GSC URLs indexed. HSTS, nosniff, SAMEORIGIN active. Duplicate URL handlers on `/how-it-works` and `/faq` identified. | Vercel headers, GSC URL Inspection |
| **salestaxreversecalculator_com_desktop.png** | `/screenshots/...desktop.png` | PNG Image | 281,657 B | Viewport render capture: Desktop (1920x1080) | Fully reviewed | Above-the-fold H1 and interactive calculator render cleanly; zero clipping. | Browser rendering |
| **salestaxreversecalculator_com_laptop.png** | `/screenshots/...laptop.png` | PNG Image | 213,627 B | Viewport render capture: Laptop (1366x768) | Fully reviewed | Clean responsive layout; calculator tabs and inputs immediately usable. | Browser rendering |
| **salestaxreversecalculator_com_tablet.png** | `/screenshots/...tablet.png` | PNG Image | 151,248 B | Viewport render capture: Tablet (768x1024) | Fully reviewed | Vertical stacking operates properly without horizontal scrollbar. | Browser rendering |
| **salestaxreversecalculator_com_mobile.png** | `/screenshots/...mobile.png` | PNG Image | 343,364 B | Viewport render capture: Mobile (375x667) | Fully reviewed | Mobile viewport meta tag confirmed compliant; touch targets spaced properly. | Browser rendering |
| **charts/** | `/charts/` | Directory | 0 B | Charts directory | Inspected | Empty folder reserved for visual chart generation. | None |
| **findings/** | `/findings/` | Directory | 0 B | Category findings directory | Fully reviewed | Contains 6 core technical audit markdown files listed above. | None |
| **screenshots/** | `/screenshots/` | Directory | 0 B | Cross-device screenshots directory | Fully reviewed | Contains 4 device screenshots listed above. | None |

---

## 2. Quantitative Evidence Extracted from Audit Materials

- **Total Impressions (28d):** 17,534
- **Total Organic Clicks (28d):** 32
- **Average Position:** 18.6 (improved from 45.8 on Sept 26)
- **Homepage:** 5,282 impressions, 18 clicks, avg position 10.4
- **New York (`/us/new-york`):** 1,764 impressions, avg position 9.4 (Page 1)
- **Connecticut (`/us/connecticut`):** 1,566 impressions, 4 clicks, avg position 10.9 (Page 1)
- **Texas (`/us/texas`):** 618 impressions, avg position 22.8
- **California (`/us/california`):** 454 impressions, avg position 22.8
- **South Carolina (`/us/south-carolina`):** 345 impressions, avg position 23.0
- **Florida (`/us/florida`):** 311 impressions, avg position 18.1
- **Arizona (`/us/arizona`):** 299 impressions, avg position 15.2
- **Homepage Word Count:** 7,737 words (prerendered HTML)
- **State Page Word Counts:** Enriched states: 1,525–2,409 words; Standard states: 633–996 words
- **Image Optimization:** 412 KB uncompressed JPG -> 46.7 KB WebP via Next.js image pipeline
- **TTFB:** ~46ms from Vercel edge POPs
- **Structured Data Types Deployed:** 7 on homepage (`Organization`, `WebSite`, `WebApplication`, `HowTo`, `Person`, `FAQPage`, `ImageObject`)
