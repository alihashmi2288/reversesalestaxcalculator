# Performance & Core Web Vitals Audit: salestaxreversecalculator.com

**Audit Date:** October 26, 2026  
**Auditor:** Claude SEO Multi-Platform Engine  
**Score:** 88 / 100

---

## 1. Network & Infrastructure
- **Hosting / CDN:** Vercel Global Edge Network with edge POP delivery.
- **Protocol:** HTTP/2 with gzip compression and byte streaming.
- **Caching:** Global Vercel cache hit with `stale-while-revalidate` policies.
- **Server Latency:** TTFB ~46ms from edge locations.

## 2. Asset & Media Delivery
- **Image Optimization:** Primary infographic image `/images/reverse-sales-tax-formula-diagram.jpg` (412 KB uncompressed) is dynamically compressed to 46.7 KB WebP via `_next/image` responsive srcset delivery.
- **Fonts:** System and preloaded WOFF2 fonts with `font-display: swap` prevent FOIT (Flash of Invisible Text).
- **DOM Stability:** The calculator interface renders instantaneously without layout shifts (CLS estimated < 0.02).

## 3. Visual & Cross-Device Audit
- Headless browser captures across 4 viewports (Desktop: 1920x1080, Laptop: 1366x768, Tablet: 768x1024, Mobile: 375x667):
  - H1 and interactive calculator form inputs are immediately visible above the fold.
  - No horizontal scrolling or content clipping on mobile.
  - Touch targets exceed the recommended 48x48px clickable threshold.
