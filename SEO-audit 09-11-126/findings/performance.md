# Performance & Core Web Vitals Audit Finding

**Category Score: 83/100**
**Audit Date:** November 9, 2026

## Executive Overview
salestaxreversecalculator.com is built on Next.js 16 with Turbopack and deployed globally on Vercel's Edge Network. The site achieves an average Time to First Byte (TTFB) of **447ms**, well within Google's "Good" threshold (<800ms).

---

## 1. Edge & Network Performance
- **Average TTFB:** 447 ms across 79 pages.
- **Fastest Response:** 312 ms.
- **Slowest Response:** 618 ms.
- **Caching:** Vercel edge cache hit (`X-Vercel-Cache: HIT` / `MISS` with `stale-time: 300`).
- **HTTP Compression:** `gzip` / `brotli` content encoding active on HTML and asset chunks.

---

## 2. Visual & Font Optimization
- **Font Delivery:** Preloaded `.woff2` font files (`70bc3e132a0a741e-s.p.269kn9uafm0ti.woff2`) with `crossorigin=""`.
- **Zero FOIT/FOUT:** Preloaded fonts eliminate Flash of Invisible Text during first paint.
- **Layout Shift Prevention:** Dimensions are explicitly defined on interactive input containers and diagrams, preventing Cumulative Layout Shift (CLS).

---

## 3. Hydration & Bundle Analysis
- The page requests 8+ JavaScript chunk files during client hydration.
- Because the entire page is pre-rendered server-side with 8,400+ words of HTML, crawlers and users receive full content immediately without waiting for client-side JavaScript execution.
- **Recommendation:** Maintain lean dependencies in `package.json` to prevent bundle creep as new features are added.
