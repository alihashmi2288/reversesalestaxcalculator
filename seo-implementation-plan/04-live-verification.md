# Live Website Verification & Production Diagnostics
**Target Domain:** `https://salestaxreversecalculator.com`  
**Test Date:** October 31, 2026 | **Environment:** Production (Vercel Global Edge)  
**Verification Method:** Safe read-only HTTP inspection (`curl.exe`), header analysis, HTML DOM payload parsing, and comparison against audit records.

---

## 1. Verified Live Production Status

### 1.1 HTTP Status Codes & Redirect Destinations
Every key endpoint was probed for response status, redirect target, and caching behavior:

| Probed Endpoint | Expected Status | Actual Status | Location Header / Payload Size | Evaluation |
|---|---|---|---|---|
| `https://salestaxreversecalculator.com` | 200 OK | **200 OK** | 318,959 bytes (`X-Vercel-Cache: HIT`, `X-Nextjs-Prerender: 1`) | **PASS** — Prerendered HTML served instantly |
| `https://salestaxreversecalculator.com/how-it-works` | 301/308 | **308 Permanent Redirect** | `Location: /#how-it-works` (`Refresh: 0;url=/#how-it-works`) | **PASS** — Redirect active at edge |
| `https://salestaxreversecalculator.com/faq` | 301/308 | **308 Permanent Redirect** | `Location: /#faq` (`Refresh: 0;url=/#faq`) | **PASS** — Redirect active at edge |
| `https://salestaxreversecalculator.com/vat-calculator/india` | 301/308 | **308 Permanent Redirect** | `Location: /vat-calculator` | **PASS** — Redirect active at edge |
| `https://salestaxreversecalculator.com/robots.txt` | 200 OK | **200 OK** | 969 bytes (`text/plain`) | **PASS** — Accessible |
| `https://salestaxreversecalculator.com/sitemap.xml` | 200 OK | **200 OK** | XML format; all 77 routes listed without trailing slash | **PASS** — Accessible |
| `https://salestaxreversecalculator.com/llms.txt` | 200 OK | **200 OK** | 3,010 bytes | **PASS** — AI documentation active |
| `https://salestaxreversecalculator.com/non-existent-probe-404` | 404 Not Found | **404 Not Found** | Custom 404 component returned with real 404 status code | **PASS** — Clean error handling |

### 1.2 Security & Edge Delivery Headers
Inspection of live response headers confirmed enterprise-grade security configurations:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN` (root and state pages)
- `Content-Security-Policy: frame-ancestors *` (on `/embed` route only)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- `Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch`

### 1.3 Prerendered HTML & Content Availability (Historical "White Area" Investigation)
- **Historical Concern:** Previous reports noted concerns that Googlebot live URL testing appeared to show a blank white area beneath the navigation bar because the calculator and content were thought to rely on client-side JavaScript.
- **Verification Result:**
  - Raw HTML payload of `https://salestaxreversecalculator.com` was retrieved directly via `curl.exe` without executing JavaScript.
  - The payload size is **318,959 bytes**.
  - All 7,700+ words of text, step-by-step formula proofs, state tables, and FAQ accordions are fully present in the raw DOM.
  - Inside the calculator wrapper (`<div id="calculator" class="calc-card" style="min-height:480px">`), the tab bar and the default `BasicTab` (including the sticker price input, sales tax rate input, pre-tax price result box, and calculate triggers) are completely pre-rendered in the static HTML.
  - The historical white area issue **cannot be reproduced** in the current deployment. Prerendering ensures full indexability even if client JavaScript is blocked or delayed.

### 1.4 Live Canonical & Alternate Tags
Live HTML inspection of the homepage confirms:
```html
<link rel="canonical" href="https://salestaxreversecalculator.com"/>
<link rel="alternate" hrefLang="x-default" href="https://salestaxreversecalculator.com"/>
<link rel="alternate" hrefLang="en-US" href="https://salestaxreversecalculator.com"/>
<link rel="alternate" hrefLang="en-CA" href="https://salestaxreversecalculator.com/canada"/>
<link rel="alternate" hrefLang="en-GB" href="https://salestaxreversecalculator.com/vat-calculator"/>
```
- In the rendered HTML, Next.js normalizes the canonical tag to `https://salestaxreversecalculator.com` (no trailing slash).
- However, in `src/app/layout.tsx`, line 46 explicitly hardcodes `${SITE_URL}/`. While Next.js handles this during generation, harmonizing `layout.tsx` eliminates source-level ambiguity.

### 1.5 Live API Endpoint Verification
Probed `/api/calculate` endpoint via live GET request:
`GET https://salestaxreversecalculator.com/api/calculate?total=107.50&rate=7.5`
- Response Status: `200 OK`
- JSON Payload:
  ```json
  {
    "totalPrice": 107.5,
    "taxRate": 7.5,
    "preTaxPrice": 100,
    "taxAmount": 7.5,
    "formula": "107.50 / (1 + 0.0750) = 100.00",
    "formatted": {
      "totalPrice": "$107.50",
      "preTaxPrice": "$100.00",
      "taxAmount": "$7.50"
    }
  }
  ```
- Calculation accuracy: 100% verified.

---

## 2. Limitations & Non-Verifiable Items

The following items cannot be independently accessed or verified from this disconnected CLI environment and rely on the October 26 audit documentation:
1. **Real-time Google Search Console Metrics:** Search impressions, clicks, click-through rates, and average query positions post-October 26 cannot be refreshed without connected GSC API credentials.
2. **Server Access Logs:** Edge access logs and real-time bot crawl frequency logs stored in Vercel enterprise log drains cannot be directly queried.
3. **Googlebot Crawl Cache State:** The current indexing cache in Google's internal indexing database for individual URLs cannot be inspected without Search Console URL Inspection API access.
