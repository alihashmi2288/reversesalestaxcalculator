# Action Plan — salestaxreversecalculator.com

Priorities: **Critical** (blocks indexing/penalties) > **High** (major ranking impact) > **Medium** (optimization) > **Low** (backlog)

---

## Phase 1: Critical Fixes — Week 1

| # | Priority | Action | Effort | Impact |
|---|----------|--------|--------|--------|
| 1 | Critical | Fix double-encoded em-dash mojibake ('ΓÇö') in metadata generator; verify served bytes are E2 80 94 for '—' | S | Fixes SERP titles on 70+ pages |
| 2 | Critical | Fix H1 spacing across `<br/>` (add spaces / aria-label) so screen readers get 'Texas Reverse Sales Tax Calculator' | S | Accessibility + extraction correctness |
| 3 | High | Add explicit noindex metadata to the 404/not-found route to stop homepage metadata leakage | S | Prevents canonical confusion |
| 4 | High | Add security headers via Vercel: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, CSP; scope ACAO to APIs | S | Security hardening |

## Phase 2: High-Impact Improvements — Weeks 2–3

| # | Priority | Action | Effort | Impact |
|---|----------|--------|--------|--------|
| 5 | High | Reduce mobile CLS below 0.1: reserve space for late-loaded elements, defer GA4/Clarity, font-display swap with matched fallbacks | M | CWV + mobile usability |
| 6 | High | Differentiate the 51 US state pages (unique city/county tables, worked examples, exemptions) to cut Jaccard overlap from ~0.9 to ~0.5 | M | Kills near-duplicate risk |
| 7 | Medium | Add reciprocal hreflang on /canada and /vat-calculator; add /contact to sitemap | S | Hreflang correctness |
| 8 | Medium | Add FAQPage JSON-LD to /faq | S | FAQ rich-result eligibility |
| 9 | Medium | Shorten titles to ≤60 chars and descriptions to ≤155 chars across templates | S | SERP CTR |
| 10 | Medium | Publish llms.txt + explicit AI-crawler directives in robots.txt | S | AI/GEO readiness |

## Phase 3: Content & Authority — Month 2

| # | Priority | Action | Effort | Impact |
|---|----------|--------|--------|--------|
| 11 | Medium | Expand thin pages (vat-calculator, how-it-works, Canada provinces) with examples and rate tables | M | Competitive depth |
| 12 | Medium | Launch blog/guides with monthly cadence; fix identical lastmod dates | M | Freshness + authority |
| 13 | Medium | Strengthen E-E-A-T: named authors, credentials, editorial policy, company identity instead of Gmail | M | YMYL trust |
| 14 | Medium | Make OG image crawlable (use /og-image.png or move generator off /api/) and align SearchAction with crawlable URL | S | Image + schema coherence |
| 15 | Low | Start backlink/PR program targeting finance, small-business, tax publications | M | Authority |

## Phase 4: Monitoring & Iteration — Ongoing

| # | Priority | Action | Effort | Impact |
|---|----------|--------|--------|--------|
| 16 | Medium | Connect GSC + PageSpeed/CrUX API key for field CWV and indexation tracking | S | Data-driven iteration |
| 17 | Medium | Set up drift baseline (seo-drift) for homepage + templates to catch metadata/header regressions | S | Regression guard |
| 18 | Low | Quarterly re-audit to verify CLS, title hygiene, hreflang, state-page uniqueness | L | Sustained health |
| 19 | Low | Monitor AI-crawler access and LLM citations once llms.txt is live | S | GEO visibility |

---

## Scoring Model Used
| Category | Weight |
|----------|--------|
| Technical SEO | 22% |
| Content Quality | 23% |
| On-Page SEO | 20% |
| Schema / Structured Data | 10% |
| Performance (CWV) | 10% |
| AI Search Readiness | 10% |
| Images | 5% |

**Overall SEO Health Score: 73/100**