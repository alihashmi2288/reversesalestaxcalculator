# Full SEO Audit Report — salestaxreversecalculator.com

**Audit date:** 2026-08-20 | **Domain:** salestaxreversecalculator.com
**Platform:** Next.js (App Router) on Vercel, pre-rendered | **Pages in sitemap:** 80
**Business type:** Free web tool / calculator (finance / SaaS-style tool site)

---

## Executive Summary

### SEO Health Score: **73 / 100** (Good)

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 80 | 22% | 17.6 |
| Content Quality | 75 | 23% | 17.3 |
| On-Page SEO | 70 | 20% | 14.0 |
| Schema / Structured Data | 88 | 10% | 8.8 |
| Performance (CWV) | 55 | 10% | 5.5 |
| AI Search Readiness | 60 | 10% | 6.0 |
| Images | 85 | 5% | 4.3 |
| **Total** | | | **73.4** |

### Top 5 Critical Issues
1. **Double-encoded em-dash mojibake ('ΓÇö' instead of '—') in titles** across all templated pages (FAQ, tax-rates, state, province, VAT, how-it-works) — corrupts SERP titles and social shares.
2. **Mobile CLS 0.55** (threshold 0.1) — layout instability fails Core Web Vitals and undermines tool usability on phones.
3. **404 pages leak homepage metadata** (title, canonical, OG tags) via the Next.js root not-found layout — canonical confusion for missing URLs.
4. **Missing security headers** (no CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
5. **51 US state pages share 68–91% of unique words** — high near-duplicate content risk across the biggest page group.

### Top 5 Quick Wins
1. Fix the mojibake encoding bug at the metadata source (instant fix for 70+ titles).
2. Make hreflang reciprocal on /canada and /vat-calculator.
3. Add FAQPage JSON-LD to the /faq page (content already exists).
4. Trim meta descriptions over 160 chars (Texas, New York, home) to ≤155.
5. Publish /llms.txt for AI-crawler accessibility.

---

## Technical SEO (80/100)

### Crawlability & Indexability
- ✅ Clean redirects: HTTP→HTTPS (308), www→apex (301), trailing-slash strip (308), double-slash normalize
- ✅ robots.txt is well-structured and explicitly allows all SEO pages
- ✅ sitemap.xml present with all 80 URLs, referenced from robots.txt
- ✅ Canonical tags on every page; real 404s for missing URLs
- ⚠️ **404 pages leak homepage title/canonical/OG metadata** — set explicit noindex on the not-found route
- ⚠️ **og:image (/api/og) is blocked by `Disallow: /api/`** — social image not crawlable
- ⚠️ **WebSite SearchAction target (/tax-rates?s=) matches blocked `/*?s=` rule**

### Security
- ✅ HSTS (2 years)
- ❌ No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy
- ⚠️ Unnecessary `Access-Control-Allow-Origin: *` on HTML responses

### Core Web Vitals (lab)
- Mobile: **LCP 1.89s ✓, CLS 0.55 ✗**, TTFB 193ms ✓
- Desktop: **LCP 2.09s ✓, CLS 0.13 ✗**, TTFB 237ms ✓
- No field data available (PSI/CrUX API 403 — no API key configured)

---

## Content Quality (75/100)

- ✅ Homepage is comprehensive (~7,748 words); quality scores 90–95 across sampled pages
- ✅ Zero filler, zero AI-pattern markers, high information density
- ✅ Cites authoritative sources (IRS.gov, Tax Foundation, Canada.ca, OECD)
- ⚠️ **State pages heavily templated** — Jaccard word overlap 0.68–0.91 (FL–WA 0.907)
- ⚠️ **Thin content**: vat-calculator ~340w, how-it-works ~434w, Canada provinces ~520–576w
- ⚠️ **Weak E-E-A-T**: anonymous operator, Gmail contact only, brand mismatch (PreTaxPrice vs domain), YMYL-adjacent topic
- ⚠️ No blog/publishing cadence; identical lastmod dates across sitemap

---

## On-Page SEO (70/100)

- ✅ Homepage title 58 chars, unique per-page titles/metas, single H1, strong heading hierarchy
- ✅ OG/Twitter cards, robust internal linking (101 internal links on homepage)
- ❌ **Mojibake 'ΓÇö' in titles on all templated pages**
- ❌ **H1 text merges across `<br/>`** — 'TexasReverse SalesTax Calculator' (screen readers lose spaces)
- ⚠️ Titles > 60 chars on most subpages (up to 96 chars)
- ⚠️ Meta descriptions > 160 chars on home/Texas/New York
- ⚠️ Hreflang is one-way (not reciprocal on /canada, /vat-calculator)
- ⚠️ /contact indexable but missing from sitemap

---

## Schema & Structured Data (88/100)

- ✅ 5 valid JSON-LD blocks on homepage: Organization, WebSite+SearchAction, WebApplication+Offer, FAQPage, BreadcrumbList
- ✅ State/province/VAT pages each carry 4 valid blocks
- ⚠️ **/faq page missing FAQPage schema** despite having FAQ content
- ⚠️ SearchAction target conflicts with robots.txt
- ⚠️ Brand inconsistency (PreTaxPrice vs public-facing name); public Gmail in ContactPoint

---

## Performance (55/100)

| Metric | Mobile | Desktop |
|--------|--------|---------|
| LCP | 1.89s ✓ | 2.09s ✓ |
| CLS | **0.55 ✗** | **0.13 ✗** |
| TTFB | 193ms ✓ | 237ms ✓ |
| Requests | 48 | 116 |
| Scripts | 24 | 34 |

- ❌ CLS fails on both form factors (worst on mobile)
- ⚠️ Heavy JS (GA4 + Microsoft Clarity + Next.js chunks)
- ⚠️ High request count on desktop (116)

---

## AI Search Readiness (60/100)

- ✅ Structured, quotable content; no AI-crawler blocks
- ❌ No llms.txt / llms-full.txt (404)
- ⚠️ No explicit AI-crawler directives in robots.txt
- ⚠️ Weak brand/citation signals for AI engines to cite the site

---

## Images (85/100)

- ✅ No `<img>` tags (SVG/CSS UI) — no alt/format issues on tool pages
- ✅ Static /og-image.png (1200×630) + dynamic /api/og with alt text
- ⚠️ Primary homepage OG image uses robots-blocked /api/og URL

---

## SXO (Search Experience)

- ✅ Page types match intent well (tool-first homepage, location tools, reference hub, FAQ)
- ⚠️ Mobile CLS hurts usability; trust gap on YMYL-adjacent topic

---

## Methodology & Limitations

- Local Playwright rendering (mobile 390px + desktop 1440px) for lab CWV; PSI/CrUX APIs returned 403 (no API key) so field data is unavailable.
- 80 sitemap URLs enumerated; 13 pages deep-fetched and analyzed (home, FAQ, tax-rates, 4 US states, 2 Canada provinces, 2 VAT countries, how-it-works) plus robots.txt, sitemap.xml, redirects, and headers.
- Backlinks, Google Search Console, GA4, and DataForSEO integrations were not available (no credentials configured).
- Screenshots saved under `screenshots/`.

See `ACTION-PLAN.md` for the prioritized roadmap and `findings/` for category-level detail.