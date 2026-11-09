# Technical SEO Audit Finding: salestaxreversecalculator.com

**Category Score: 84/100**
**Audit Date:** November 9, 2026

## Executive Overview
The technical foundation of salestaxreversecalculator.com is exceptionally strong. Built on Next.js and deployed on Vercel, the site benefits from fast server-side generation, clean edge caching, and zero canonical or redirect chain defects across all 79 crawled URLs.

---

## 1. Crawlability & Indexability
- **Total Crawled URLs:** 79 (matches sitemap.xml perfectly)
- **HTTP Status Codes:** 100% 200 OK responses on all valid routes.
- **404 Error Handling:** Non-existent URLs return a proper HTTP 404 response with `text/html; charset=utf-8`. Soft-404 test passed.
- **Canonicals:** 100% of pages implement clean self-referencing canonical links. No protocol, trailing slash, or cross-domain mismatches.

## 2. Orphan Pages (Critical Severity)
9 Canadian provincial calculator pages exist in `sitemap.xml` but have **0 internal links** pointing to them:
- `https://salestaxreversecalculator.com/canada/manitoba`
- `https://salestaxreversecalculator.com/canada/saskatchewan`
- `https://salestaxreversecalculator.com/canada/nova-scotia`
- `https://salestaxreversecalculator.com/canada/new-brunswick`
- `https://salestaxreversecalculator.com/canada/newfoundland`
- `https://salestaxreversecalculator.com/canada/pei`
- `https://salestaxreversecalculator.com/canada/northwest-territories`
- `https://salestaxreversecalculator.com/canada/nunavut`
- `https://salestaxreversecalculator.com/canada/yukon`

**Impact:** Search engines rely on internal links to understand site hierarchy, depth, and page authority. Without inlinks, orphan pages suffer from low crawl frequency and impaired indexing.
**Remediation:** Update `https://salestaxreversecalculator.com/canada` to include a complete 13-province/territory navigation grid linking to each specific provincial calculator.

---

## 3. Google Search Console Fragment URL Leakage
The following fragment URLs are accumulating impressions in GSC:
- `https://salestaxreversecalculator.com/#calculator` (50 impressions)
- `https://salestaxreversecalculator.com/#faq` (48 impressions)
- `https://salestaxreversecalculator.com/#how-it-works` (48 impressions)

**Impact:** Google treats fragments as separate search results or display anchors when internal anchor tags link directly to `#` IDs.
**Remediation:** Ensure navigation links use clean top-level paths or JavaScript-driven smooth scrolling without exposing bare hash fragments to crawlers.

---

## 4. HTTP Headers & Security Audit
- **Strict-Transport-Security (HSTS):** `max-age=63072000; includeSubDomains; preload` (PASS)
- **X-Content-Type-Options:** `nosniff` (PASS)
- **X-Frame-Options:** `SAMEORIGIN` (PASS)
- **Referrer-Policy:** `strict-origin-when-cross-origin` (PASS)
- **Permissions-Policy:** `camera=(), microphone=(), geolocation=(), browsing-topics=()` (PASS)
- **Content-Security-Policy (CSP):** **MISSING** (FAIL)

**Remediation:** Add a CSP header in `next.config.mjs` or `vercel.json` restricting script execution to self and trusted domains.
