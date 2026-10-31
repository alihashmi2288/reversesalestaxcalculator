# Master Prioritized Backlog
**Total Implementation Tasks:** 27  
**Prioritization Formula:** $\text{Priority} = f(\text{SEO Impact}, \text{Confidence}, \text{Traffic Potential}) / \text{Effort}$  

---

## Master Task Table

| Order | Task ID | Task Description | Phase | Priority | SEO Impact | Effort | Dependencies | Primary Recommended Skill |
|---|---|---|---|---|---|---|---|---|
| **1** | `TASK-001` | Establish Git baseline tag (`v2026.10-baseline`) and safety checkpoint | Phase 0 | P0 — Critical | Safety | S (15m) | None | Git CLI |
| **2** | `TASK-002` | Archive baseline crawl metrics and sitemap inventory | Phase 0 | P1 — High | Measurement | S (15m) | TASK-001 | `seo-audit` |
| **3** | `TASK-003` | Verify clean local build (`next build`) and zero lint errors | Phase 0 | P0 — Critical | Safety | S (15m) | TASK-001 | `next-best-practices` |
| **4** | `TASK-004` | Safely delete orphaned shadowed page files `/how-it-works` and `/faq` | Phase 1 | P1 — High | High | S (15m) | TASK-001 | `next-best-practices` |
| **5** | `TASK-006` | Correct WebApplication schema name on New York page in `NewYorkPage.tsx` | Phase 1 | P1 — High | High | S (5m) | TASK-001 | `coreyhaines31/marketingskills@schema-markup` |
| **6** | `TASK-007` | Standardize root canonical URL in `layout.tsx` (trailing slash parity) | Phase 1 | P2 — Medium | Medium | S (10m) | TASK-001 | `next-best-practices` |
| **7** | `TASK-005` | Update AI agent documentation links in `public/llms.txt` and `llms-full.txt` | Phase 1 | P2 — Medium | Medium | S (10m) | TASK-004 | `coreyhaines31/marketingskills@ai-seo` |
| **8** | `TASK-012` | Create dedicated enriched component for Arizona (`ArizonaPage.tsx`, 1,800+ words) | Phase 2 | P1 — High | Very High | M (4h) | Phase 1 | `coreyhaines31/marketingskills@content-strategy` |
| **9** | `TASK-008` | Expand Texas state calculator page to 2,000+ words in `TexasPage.tsx` | Phase 2 | P1 — High | Very High | M (5h) | Phase 1 | `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer` |
| **10** | `TASK-009` | Expand California state calculator page to 2,000+ words in `CaliforniaPage.tsx` | Phase 2 | P1 — High | Very High | M (5h) | Phase 1 | `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer` |
| **11** | `TASK-010` | Expand Florida state calculator page to 1,800+ words in `FloridaPage.tsx` | Phase 2 | P1 — High | Very High | M (4h) | Phase 1 | `coreyhaines31/marketingskills@content-strategy` |
| **12** | `TASK-011` | Create dedicated enriched component for South Carolina (`SouthCarolinaPage.tsx`) | Phase 2 | P1 — High | Very High | M (4h) | Phase 1 | `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer` |
| **13** | `TASK-013` | Deploy localized HowTo structured data across top 10 state pages | Phase 3 | P2 — Medium | High | S (2h) | Phase 2 | `coreyhaines31/marketingskills@schema-markup` |
| **14** | `TASK-014` | Add contextual in-body internal links from state pages to root calculator | Phase 3 | P2 — Medium | High | S (1.5h) | Phase 2 | `coreyhaines31/marketingskills@site-architecture` |
| **15** | `TASK-016` | Expand Canadian hub and provincial guides to 1,800+ words in `canada/page.tsx` | Phase 4 | P2 — Medium | High | M (4h) | Phase 1 | `coreyhaines31/marketingskills@content-strategy` |
| **16** | `TASK-017` | Deepen UK and Germany VAT hubs with reverse-charge accounting rules | Phase 4 | P2 — Medium | Medium | M (4h) | Phase 1 | `coreyhaines31/marketingskills@content-strategy` |
| **17** | `TASK-015` | Generate branded SVG/WebP tax bracket rate cards for top 10 states | Phase 3 | P2 — Medium | Medium | M (3h) | Phase 2 | `vercel-react-best-practices` |
| **18** | `TASK-019` | Implement WAI-ARIA keyboard arrow navigation in `CalculatorCard.tsx` | Phase 5 | P2 — Medium | Accessibility | S (30m) | Phase 1 | `a11y-debugging` |
| **19** | `TASK-018` | Configure Next.js `optimizePackageImports` in `next.config.ts` | Phase 5 | P3 — Low | CWV | S (15m) | Phase 1 | `vercel-react-best-practices` |
| **20** | `TASK-020` | Audit mobile viewport touch targets and eliminate any layout shifts | Phase 5 | P3 — Low | UX | S (1h) | Phase 5 | `agent-browser` |
| **21** | `TASK-021` | Implement automated unit test suite for `src/lib/taxCalc.ts` | Phase 6 | P1 — High | Quality | S (1.5h) | None | `anthropics/skills@webapp-testing` |
| **22** | `TASK-022` | Implement Playwright E2E suite for routes, status codes, and canonicals | Phase 6 | P1 — High | Quality | M (3h) | Phases 1–5 | `microsoft/playwright-cli@playwright-cli` |
| **23** | `TASK-023` | Implement automated sitemap-to-canonical integrity assertion | Phase 6 | P2 — Medium | Quality | S (1h) | TASK-022 | `microsoft/playwright-cli@playwright-cli` |
| **24** | `TASK-024` | Deploy to Vercel preview environment and run full smoke test suite | Phase 7 | P1 — High | Safety | S (30m) | Phase 6 | `agent-browser` |
| **25** | `TASK-025` | Execute production release and perform live edge header/redirect verification | Phase 7 | P0 — Critical | Delivery | S (30m) | TASK-024 | None |
| **26** | `TASK-026` | Set up weekly Google Search Console query position and impression tracking | Phase 7 | P2 — Medium | Measurement | S (1h) | TASK-025 | `coreyhaines31/marketingskills@seo-audit` |
| **27** | `TASK-027` | Syndicate embeddable accounting widget to finance and software directories | Phase 7 | P2 — Medium | Authority | L (10h) | TASK-025 | Outreach / Manual |

---

## 2. Workstream Categorization

- **Quick Wins (Under 30 mins each):** `TASK-001`, `TASK-004`, `TASK-005`, `TASK-006`, `TASK-007`, `TASK-018`, `TASK-019`.
- **High-Impact Engineering Work:** `TASK-021`, `TASK-022`, `TASK-023`, `TASK-024`, `TASK-025`.
- **Topical Content Expansion (Requires statutory verification):** `TASK-008`, `TASK-009`, `TASK-010`, `TASK-011`, `TASK-012`, `TASK-016`, `TASK-017`.
- **Parallel Tracks:** Technical hygiene (Phase 1) and Unit testing (Phase 6) can be executed concurrently without file conflicts.
