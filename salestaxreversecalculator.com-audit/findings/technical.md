# Technical SEO Audit: salestaxreversecalculator.com

**Audit Date:** October 26, 2026  
**Auditor:** Claude SEO Multi-Platform Engine  
**Score:** 90 / 100

---

## 1. Crawlability & Indexability
- **Server Rendering:** The entire application uses Next.js server-side rendering (SSR) deployed on Vercel. 7,683 words of primary content and table data are fully present in the raw initial HTML without requiring JavaScript execution.
- **Google Search Console Verification:** 11 out of 11 sampled core and state URLs pass GSC URL Inspection with `Submitted and indexed`, `crawled_as: MOBILE`, and `page_fetch_state: SUCCESSFUL`.
- **Robots.txt:** Accessible at `https://salestaxreversecalculator.com/robots.txt` (HTTP 200). Explicitly configured to allow standard bots (`*`), Googlebot-Image, and AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, `OAI-SearchBot`).
- **HTTP 404 Response:** Valid real 404 responses returned for non-existent routes (tested with random nonce probe).

## 2. Security & Headers
- **HSTS:** `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` is active.
- **X-Content-Type-Options:** `nosniff` prevents MIME-type sniffing.
- **X-Frame-Options:** `SAMEORIGIN` prevents clickjacking.
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **Permissions-Policy:** Restricts camera, microphone, geolocation, and browsing-topics.

## 3. Issues & Recommendations
### Critical: None
### Medium: Duplicate URL Handlers on /how-it-works and /faq
- **Evidence:** Both `https://salestaxreversecalculator.com/how-it-works` and `https://salestaxreversecalculator.com/faq` return HTTP 200 with identical 6,706-word content to the root homepage, while maintaining self-referencing canonicals to root.
- **Fix:** Update `next.config.mjs` to execute permanent HTTP 301 redirects to the corresponding homepage anchor tags (`/#how-it-works` and `/#faq`). This preserves equity and stops search bots from re-crawling redundant URLs.

### Low: Trailing Slash Uniformity
- Ensure URLs listed in `sitemap.xml` strictly match canonical tags (either all trailing slash or non-trailing slash).
