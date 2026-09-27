# Technical SEO Findings: salestaxreversecalculator.com

**Audit Date**: September 2026  
**Audited URL**: https://salestaxreversecalculator.com/  
**Category Score**: 82 / 100  
**Status**: Good with High-Priority Architecture Fixes  

---

## 1. Executive Overview

`salestaxreversecalculator.com` is built on a modern Next.js App Router stack deployed to Vercel's global edge network. The site demonstrates strong server-side rendering (SSR/SSG), rendering 7,646 words into raw HTML without requiring JavaScript execution for indexing. Crawlability and bot access policies are well-configured. However, there are redirect hop inefficiencies on WWW subdomains, trailing-slash canonical inconsistencies, and missing CSP headers.

---

## 2. Detailed Technical Findings

### Finding 1: 2-Hop Redirect Chain on HTTP WWW Traffic
- **Severity**: Medium
- **Location**: `http://www.salestaxreversecalculator.com`
- **Observed Chain**:
  1. `http://www.salestaxreversecalculator.com` -> `308 Permanent Redirect` to `https://www.salestaxreversecalculator.com/`
  2. `https://www.salestaxreversecalculator.com/` -> `301 Moved Permanently` to `https://salestaxreversecalculator.com/`
- **Impact**: Googlebot must make two round-trips to resolve the canonical destination. On slow mobile crawlers or third-party backlink discovery, redirect chains bleed crawl budget and dilute link equity transfer.
- **Recommendation**:
  Update Vercel routing configuration (`vercel.json` or domain redirection settings in Vercel Dashboard) to rewrite/redirect `http://www.salestaxreversecalculator.com` directly in 1 hop (HTTP 301) to `https://salestaxreversecalculator.com/`.

---

### Finding 2: Canonical Tag Trailing-Slash Inconsistency
- **Severity**: Low
- **Observed Behavior**:
  - The HTML canonical tag is:
    ```html
    <link rel="canonical" href="https://salestaxreversecalculator.com">
    ```
    (Note: lacking trailing slash).
  - The server serves the root page at `https://salestaxreversecalculator.com/` (with trailing slash) and sitemap XML lists `https://salestaxreversecalculator.com`.
- **Impact**: Minor, but conflicting canonical signals can cause search engines to normalize URLs unpredictably or split reporting in Google Search Console between `/` and non-slash variants.
- **Recommendation**:
  Standardize on trailing slash across all root metadata tags, ensuring `<link rel="canonical" href="https://salestaxreversecalculator.com/">` matches server-level URL canonicalization.

---

### Finding 3: Sitemaps & Robots.txt Architecture
- **Status**: Excellent (PASS)
- **Robots.txt Details**:
  - Located at `/robots.txt` (HTTP 200 OK).
  - Declares `Sitemap: https://salestaxreversecalculator.com/sitemap.xml`.
  - Disallows internal admin, dashboard, search query parameters (`/*?q=`, `/*?s=`, tracking params `utm_*`, `fbclid`, `gclid`).
  - Explicitly allows AI crawlers: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `CCBot`, `Google-Extended`, `anthropic-ai`, and `OAI-SearchBot`.
- **Sitemap Details**:
  - Valid XML urlset containing 81 unique indexable URLs.
  - Covers all 50 US states, 13 Canadian provinces/territories, 7 international VAT destinations, and 10 core pages.
  - Clean HTTP 200 responses on all sampled sitemap URLs.

---

### Finding 4: Security Headers & Transport Layer
- **Status**: Strong (PASS)
- **Observed Headers**:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (Qualifies for HSTS preload list)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- **Missing Header**:
  - `Content-Security-Policy`: Not currently served. Adding a CSP header will eliminate XSS vulnerability flags in third-party enterprise compliance scanners.

---

### Finding 5: Server-Side Rendering (SSR) & Crawlability
- **Status**: Superior (PASS)
- **Evidence**:
  - Headless crawler tests revealed **7,646 words** present in raw initial HTML payload.
  - Search engine spiders (Googlebot, Bingbot, Yandex) do not rely on second-wave client JavaScript hydration to discover links, text, or formulas.
  - 404 response codes are strictly returned for non-existent routes (tested with `claude-seo-404-probe`), preventing soft-404 index bloat.
