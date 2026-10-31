# Detailed Task Specifications
**Document Purpose:** Executable technical specifications for each task in the SEO implementation plan. Any full-stack engineer or coding agent can execute these tasks sequentially without ambiguity.

---

### Task ID: TASK-001
- **Task Title:** Establish Git Baseline Tag and Pre-Implementation Snapshot
- **Phase:** Phase 0 — Baseline & Safety
- **Priority:** P0 — Critical
- **Finding IDs:** Baseline prerequisite
- **Evidence:** Operating Rule 5 and implementation safety governance.
- **Current Behavior:** Git HEAD is active on branch `main` with uncommitted exploration state.
- **Expected Behavior:** An immutable Git tag `v2026.10-baseline` is created; local build passes with zero errors.
- **Root Cause:** Need safe rollback point before modifying code.
- **Affected Files:** Git repository index.
- **Recommended Changes:** Run `git status`, verify clean tree, create annotated tag `git tag -a v2026.10-baseline -m "Pre-SEO implementation baseline"`.
- **Recommended Skill:** `none` (Git CLI)
- **Dependencies:** None.
- **Acceptance Criteria:** `git tag -l v2026.10-baseline` returns the tag; `npm run build` completes successfully.
- **Testing Strategy:** `git rev-parse v2026.10-baseline` returns valid commit hash.
- **Risks:** None.
- **Rollback Plan:** `git checkout v2026.10-baseline`
- **Estimated Effort:** S (15 mins)
- **Expected Impact:** 100% safety and immediate rollback capability.

---

### Task ID: TASK-004
- **Task Title:** Remove Shadowed Route Files for `/how-it-works` and `/faq`
- **Phase:** Phase 1 — Critical Technical SEO Corrections
- **Priority:** P1 — High
- **Finding IDs:** SEO-001
- **Evidence:** `next.config.ts` lines 18–28 returns 308 redirects to `/#how-it-works` and `/#faq`; `src/app/(site)/how-it-works/page.tsx` and `src/app/(site)/faq/page.tsx` remain in the filesystem.
- **Current Behavior:** Requests are redirected at the edge by `next.config.ts`, but the underlying route files still compile, declare independent metadata/canonicals, and create dead-code debt.
- **Expected Behavior:** Shadowed files are removed; `next.config.ts` handles redirects cleanly; zero unused route compilation.
- **Root Cause:** When anchor redirects were added to `next.config.ts`, the legacy standalone page components were left in the App Router tree.
- **Affected Files:**
  - `src/app/(site)/how-it-works/page.tsx` (delete)
  - `src/app/(site)/faq/page.tsx` (delete)
- **Recommended Changes:**
  1. Archive contents to planning reference if needed.
  2. Remove `src/app/(site)/how-it-works/page.tsx` and `src/app/(site)/faq/page.tsx`.
  3. Verify `next.config.ts` redirect rules remain intact.
- **Recommended Skill:** `next-best-practices`
- **Dependencies:** TASK-001.
- **Acceptance Criteria:** Directory paths `/how-it-works` and `/faq` no longer exist in `src/app/(site)/`; `next build` passes; `curl -sI /how-it-works` continues returning HTTP 308 to `/#how-it-works`.
- **Testing Strategy:** Run `next build` and curl endpoints to verify 308 response and target location.
- **Risks:** None, as redirects are already handling traffic at the edge.
- **Rollback Plan:** `git checkout HEAD -- src/app/(site)/how-it-works/page.tsx src/app/(site)/faq/page.tsx`
- **Estimated Effort:** S (15 mins)
- **Expected Impact:** Clean repository, eliminates duplicate canonical ambiguity, reduces build artifact size.

---

### Task ID: TASK-005
- **Task Title:** Update AI Agent Documentation Links in `llms.txt`
- **Phase:** Phase 1 — Critical Technical SEO Corrections
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-001
- **Evidence:** `public/llms.txt` lines 16–17 link to `https://salestaxreversecalculator.com/how-it-works` and `/faq`.
- **Current Behavior:** AI crawlers reading `llms.txt` hit 308 redirect hops when following documentation links.
- **Expected Behavior:** Links in `llms.txt` point directly to canonical anchor destinations `/#how-it-works` and `/#faq`.
- **Root Cause:** `llms.txt` was authored before the 308 anchor redirects were deployed.
- **Affected Files:**
  - `public/llms.txt`
  - `public/llms-full.txt`
- **Recommended Changes:**
  Update lines 16–17 in `public/llms.txt` and corresponding lines in `public/llms-full.txt`:
  ```markdown
  - [How Reverse Sales Tax Works](https://salestaxreversecalculator.com/#how-it-works): Mathematical guide and step-by-step examples.
  - [Sales Tax FAQ](https://salestaxreversecalculator.com/#faq): Answers to common sales tax, VAT, and accounting questions.
  ```
- **Recommended Skill:** `coreyhaines31/marketingskills@ai-seo`
- **Dependencies:** TASK-004.
- **Acceptance Criteria:** `public/llms.txt` contains zero links to bare `/how-it-works` or `/faq`.
- **Testing Strategy:** Grep `public/llms*.txt` for old URLs.
- **Risks:** None.
- **Rollback Plan:** Revert `public/llms.txt` via git.
- **Estimated Effort:** S (10 mins)
- **Expected Impact:** Seamless crawling for AI agents (Perplexity, ChatGPT, Claude) without redirect hops.

---

### Task ID: TASK-006
- **Task Title:** Correct WebApplication Schema Name on New York State Page
- **Phase:** Phase 1 — Critical Technical SEO Corrections
- **Priority:** P1 — High
- **Finding IDs:** SEO-003
- **Evidence:** `src/app/(site)/us/[state]/NewYorkPage.tsx` line 88 sets `name: "New York Sales Tax Calculator"`.
- **Current Behavior:** New York schema declares generic "Sales Tax Calculator" instead of "Reverse Sales Tax Calculator".
- **Expected Behavior:** Schema explicitly declares `"New York Reverse Sales Tax Calculator"` matching page H1, title, and reverse-calculation intent.
- **Root Cause:** Hardcoded typo in JSON-LD object definition in `NewYorkPage.tsx`.
- **Affected Files:** `src/app/(site)/us/[state]/NewYorkPage.tsx`
- **Recommended Changes:** Edit line 88 in `NewYorkPage.tsx`:
  ```typescript
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'New York Reverse Sales Tax Calculator',
    url: 'https://salestaxreversecalculator.com/us/new-york',
  ...
  ```
- **Recommended Skill:** `coreyhaines31/marketingskills@schema-markup`
- **Dependencies:** None.
- **Acceptance Criteria:** JSON-LD script tag on `/us/new-york` renders `name: "New York Reverse Sales Tax Calculator"`.
- **Testing Strategy:** Inspect rendered DOM script tag on `/us/new-york` via curl or browser.
- **Risks:** None.
- **Rollback Plan:** Revert file via git.
- **Estimated Effort:** S (5 mins)
- **Expected Impact:** Strengthens entity alignment on the site's top organic keyword asset (Position 9.4).

---

### Task ID: TASK-007
- **Task Title:** Standardize Root Canonical URL (Trailing Slash Parity)
- **Phase:** Phase 1 — Critical Technical SEO Corrections
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-002
- **Evidence:** `src/app/layout.tsx` line 46 has `canonical: `${SITE_URL}/`` while `src/app/sitemap.ts` line 14 has `url: SITE_URL`.
- **Current Behavior:** Root layout specifies trailing slash while sitemap and all subpages omit trailing slash.
- **Expected Behavior:** Root layout canonical uses `https://salestaxreversecalculator.com` (no trailing slash), establishing 100% uniformity.
- **Root Cause:** Trailing slash was manually appended in `RootLayout` metadata definition.
- **Affected Files:** `src/app/layout.tsx`
- **Recommended Changes:** In `src/app/layout.tsx`, change line 46:
  ```typescript
  alternates: { 
    canonical: `${SITE_URL}`,
    languages: {
      'x-default': `${SITE_URL}`,
      'en-US': `${SITE_URL}`,
  ```
- **Recommended Skill:** `next-best-practices`
- **Dependencies:** None.
- **Acceptance Criteria:** `<link rel="canonical" href="https://salestaxreversecalculator.com"/>` strictly matches sitemap `<loc>` tag.
- **Testing Strategy:** Compare rendered `<link rel="canonical">` against `/sitemap.xml` output.
- **Risks:** None.
- **Rollback Plan:** Revert `layout.tsx` via git.
- **Estimated Effort:** S (10 mins)
- **Expected Impact:** Eliminates edge normalization redirects and crawl reconciliation cycles.

---

### Task ID: TASK-008
- **Task Title:** Enrich Texas State Calculator Page to 2,000+ Words
- **Phase:** Phase 2 — High-Impact State Content Expansion
- **Priority:** P1 — High
- **Finding IDs:** SEO-005
- **Evidence:** GSC metrics: Texas has 618 impressions, average position 22.8; `TexasPage.tsx` currently has ~1,050 words.
- **Current Behavior:** Covers basic 6.25% state rate and 8.25% cap, but lacks municipal local tax tables, Comptroller backing-out rules, and industry use-cases.
- **Expected Behavior:** 2,000+ word deep-dive covering Texas Comptroller Form 01-114 audit procedures, single local use tax (1.75%), Austin/Houston/Dallas/San Antonio brackets, and retail food exemptions.
- **Root Cause:** Initial implementation created a basic summary component rather than an exhaustive state guide.
- **Affected Files:** `src/app/(site)/us/[state]/TexasPage.tsx`
- **Recommended Changes:**
  1. Add Texas Comptroller statutory citations (Texas Tax Code Chapter 151).
  2. Add detailed breakdown of the 6.25% state base + up to 2.00% local options (transit authorities, city, county).
  3. Detail single local use tax rate (1.75%) for remote/interstate sellers.
  4. Provide step-by-step receipt backing-out formulas for mixed food/retail purchases.
  5. Expand FAQ section from 4 to 8 high-intent questions.
- **Recommended Skill:** `coreyhaines31/marketingskills@content-strategy`, `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** Word count >= 2,000; statutory citations verified against Texas Comptroller 2026 publications; zero calculation errors; clean mobile rendering.
- **Testing Strategy:** Word count audit script; verification against Comptroller rate circular; calculator interactive test.
- **Risks:** Formatting shifts if styles are not encapsulated.
- **Rollback Plan:** `git checkout HEAD -- src/app/(site)/us/[state]/TexasPage.tsx`
- **Estimated Effort:** M (4–6 hours)
- **Expected Impact:** Transition Texas from position 22.8 onto Google Page 1, capturing ~600+ incremental clicks/mo.

---

### Task ID: TASK-009
- **Task Title:** Enrich California State Calculator Page to 2,000+ Words
- **Phase:** Phase 2 — High-Impact State Content Expansion
- **Priority:** P1 — High
- **Finding IDs:** SEO-005
- **Evidence:** GSC metrics: California has 454 impressions, average position 22.8; `CaliforniaPage.tsx` currently has ~1,100 words.
- **Current Behavior:** Explains Bradley-Burns 7.25% base, but lacks district tax jurisdiction maps, CDTFA Regulation 1602 nuances, and city-by-city brackets up to 10.75%.
- **Expected Behavior:** 2,000+ words covering CDTFA Publication 116, district tax boundaries (transactions and use tax), hot food vs grocery exemptions, and Form 401 reverse tax reconciliation.
- **Root Cause:** Content was summarized rather than exhaustive.
- **Affected Files:** `src/app/(site)/us/[state]/CaliforniaPage.tsx`
- **Recommended Changes:**
  1. Detail the 7.25% statewide base breakdown: 6.00% State General Fund + 1.25% Local County/City (Bradley-Burns).
  2. Detail district taxes that reach 10.75% in Alameda County (Newark, Albany) and Los Angeles.
  3. Add step-by-step CDTFA Form 401 backing-out reconciliation formula for retailers.
  4. Add restaurant cold vs hot food 80/80 rule taxability analysis.
  5. Expand FAQs to 8 detailed answers.
- **Recommended Skill:** `coreyhaines31/marketingskills@content-strategy`, `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** Word count >= 2,000; CDTFA statutory rules verified; clean build.
- **Testing Strategy:** Review against CDTFA Pub 116; automated word count check.
- **Risks:** None.
- **Rollback Plan:** `git checkout HEAD -- src/app/(site)/us/[state]/CaliforniaPage.tsx`
- **Estimated Effort:** M (4–6 hours)
- **Expected Impact:** Push California into Google top 10 positions.

---

### Task ID: TASK-010
- **Task Title:** Enrich Florida State Calculator Page to 1,800+ Words
- **Phase:** Phase 2 — High-Impact State Content Expansion
- **Priority:** P1 — High
- **Finding IDs:** SEO-005
- **Evidence:** GSC metrics: Florida has 311 impressions, average position 18.1; `FloridaPage.tsx` has ~1,050 words.
- **Current Behavior:** Explains 6.00% base and discretionary surtax, but lacks the crucial $5,000 item limitation calculation mechanics.
- **Expected Behavior:** 1,800+ words with Florida Department of Revenue Form DR-15 reconciliation, discretionary surtax county table (0.5%–1.5%), and the first $5,000 single item cap math.
- **Root Cause:** Missing deep coverage of Florida's unique single-transaction surtax cap.
- **Affected Files:** `src/app/(site)/us/[state]/FloridaPage.tsx`
- **Recommended Changes:**
  1. Add detailed mathematical explanation of Florida's $5,000 surtax cap: surtax applies only to the first $5,000 of a single taxable item, while the 6% state rate applies to the entire amount.
  2. Add worked receipt examples for vehicle/equipment purchases exceeding $5,000.
  3. Expand county surtax table covering Miami-Dade, Broward, Orange, Hillsborough, and Palm Beach.
  4. Add Form DR-15 line-by-line backing-out instructions.
- **Recommended Skill:** `coreyhaines31/marketingskills@content-strategy`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** Word count >= 1,800; Florida $5,000 surtax cap math 100% verified; zero lint errors.
- **Testing Strategy:** Mathematical unit test of Florida $5,000 cap calculation; manual QA.
- **Risks:** Mathematical misstatement if $5,000 cap formula is not rigorously verified.
- **Rollback Plan:** `git checkout HEAD -- src/app/(site)/us/[state]/FloridaPage.tsx`
- **Estimated Effort:** M (4 hours)
- **Expected Impact:** Propel Florida from position 18.1 to Google Page 1.

---

### Task ID: TASK-011
- **Task Title:** Create Dedicated Enriched Page for South Carolina
- **Phase:** Phase 2 — High-Impact State Content Expansion
- **Priority:** P1 — High
- **Finding IDs:** SEO-004
- **Evidence:** South Carolina generates 345 impressions (pos 23.0) but is currently rendered using the generic 850-word template in `stateContent.ts`.
- **Current Behavior:** Programmatic template with boilerplate paragraphs.
- **Expected Behavior:** Dedicated component `SouthCarolinaPage.tsx` with 1,800+ words covering SC Department of Revenue Local Option Sales Tax (LOST), Capital Projects Tax, and maximum tax caps on motor vehicles.
- **Root Cause:** SC was not included in the initial batch of custom state components.
- **Affected Files:**
  - `src/app/(site)/us/[state]/SouthCarolinaPage.tsx` (new file)
  - `src/app/(site)/us/[state]/page.tsx` (add routing branch)
- **Recommended Changes:**
  1. Author `SouthCarolinaPage.tsx` following the `ConnecticutPage.tsx` structural pattern.
  2. Include SC 6% state base + up to 3% local option taxes (combined rates 6%–9%).
  3. Detail SC $500 maximum tax cap on qualifying vehicles and boats.
  4. Integrate `StateCalculatorClient`, breadcrumb schema, FAQ schema, and WebApplication schema.
  5. Add route handler in `src/app/(site)/us/[state]/page.tsx`.
- **Recommended Skill:** `coreyhaines31/marketingskills@content-strategy`, `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** `/us/south-carolina` serves custom component; word count >= 1,800; SC DOR rules verified.
- **Testing Strategy:** Verify route in development; run word count audit.
- **Risks:** Build failure if component import or props interface is misconfigured.
- **Rollback Plan:** Revert `page.tsx` and delete `SouthCarolinaPage.tsx`.
- **Estimated Effort:** M (4–5 hours)
- **Expected Impact:** Move SC from position 23 onto Page 1.

---

### Task ID: TASK-012
- **Task Title:** Create Dedicated Enriched Page for Arizona
- **Phase:** Phase 2 — High-Impact State Content Expansion
- **Priority:** P1 — High
- **Finding IDs:** SEO-004
- **Evidence:** Arizona has 299 impressions and sits at position 15.2 (highest non-Page-1 rank), currently on generic template.
- **Current Behavior:** Generic template in `stateContent.ts`.
- **Expected Behavior:** Dedicated component `ArizonaPage.tsx` with 1,800+ words covering Arizona's unique Transaction Privilege Tax (TPT), municipal tax code differences, and Phoenix/Tucson rate splits.
- **Root Cause:** Programmatic template lacks Arizona-specific TPT accounting mechanics.
- **Affected Files:**
  - `src/app/(site)/us/[state]/ArizonaPage.tsx` (new file)
  - `src/app/(site)/us/[state]/page.tsx` (add routing branch)
- **Recommended Changes:**
  1. Create `ArizonaPage.tsx` explaining that Arizona levies a Transaction Privilege Tax (TPT) on the vendor rather than a true sales tax on the consumer.
  2. Detail how businesses back out TPT from gross receipts using the statutory deduction formula: $\text{Gross Receipts} / (1 + \text{TPT Rate})$.
  3. Cover Arizona 5.6% state rate + county (0.5%–1.8%) + city (1.5%–4.0%) resulting in combined rates up to 11.2%.
  4. Wire into `src/app/(site)/us/[state]/page.tsx`.
- **Recommended Skill:** `coreyhaines31/marketingskills@content-strategy`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** `/us/arizona` delivers custom 1,800+ word component; Arizona TPT terminology accurate; valid schemas.
- **Testing Strategy:** Test `/us/arizona` route prerender and schema validity.
- **Risks:** None.
- **Rollback Plan:** Revert `page.tsx` and delete `ArizonaPage.tsx`.
- **Estimated Effort:** M (4–5 hours)
- **Expected Impact:** Easily propel Arizona from position 15.2 into top 5 rankings.

---

### Task ID: TASK-013
- **Task Title:** Deploy Localized HowTo Structured Data on Top State Pages
- **Phase:** Phase 3 — Structured Data & Internal Linking
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-007
- **Evidence:** Top state pages (`/us/new-york`, `/us/connecticut`, `/us/california`, `/us/texas`, `/us/florida`) feature FAQ and WebApplication schemas but omit `HowTo` markup.
- **Current Behavior:** Search results for state queries display standard snippets without calculation steps.
- **Expected Behavior:** State pages render valid `HowTo` JSON-LD detailing exact local steps (e.g. "Divide total by 1.08875 in NYC").
- **Root Cause:** HowTo schema was previously only implemented on the root homepage.
- **Affected Files:**
  - `src/app/(site)/us/[state]/NewYorkPage.tsx`
  - `src/app/(site)/us/[state]/ConnecticutPage.tsx`
  - `src/app/(site)/us/[state]/CaliforniaPage.tsx`
  - `src/app/(site)/us/[state]/TexasPage.tsx`
  - `src/app/(site)/us/[state]/FloridaPage.tsx`
- **Recommended Changes:** Inject localized `HowTo` schema into each page's `<head>` JSON-LD output with 3 step objects containing localized rates and URLs.
- **Recommended Skill:** `coreyhaines31/marketingskills@schema-markup`
- **Dependencies:** Phase 2.
- **Acceptance Criteria:** Google Rich Results Test validates `HowTo` schema with 0 errors and 0 warnings on all 5 pages.
- **Testing Strategy:** Test schema output using Google Rich Results Test CLI / online validator.
- **Risks:** Schema syntax errors if escaping is malformed.
- **Rollback Plan:** Revert component modifications.
- **Estimated Effort:** S (2 hours)
- **Expected Impact:** Increases featured calculation snippet capture in regional SERPs.

---

### Task ID: TASK-014
- **Task Title:** Optimize In-Content Internal Links from State Pages to Root
- **Phase:** Phase 3 — Structured Data & Internal Linking
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-008
- **Evidence:** State pages currently link back to root primarily via navbar and breadcrumbs with generic anchor text ("Home").
- **Current Behavior:** Limited contextual equity flowing upward from strong ranking state pages (NY, CT) to the root calculator.
- **Expected Behavior:** Each state guide contains 1–2 contextual in-body links pointing to `/` with descriptive keywords (`free reverse sales tax calculator`, `sales tax reverse calculator`).
- **Root Cause:** State templates were written without structured internal link equity guidelines.
- **Affected Files:**
  - `src/app/(site)/us/[state]/page.tsx`
  - Custom state page components
- **Recommended Changes:** Add natural contextual links within the formula explanation and use-case paragraphs linking back to `/`.
- **Recommended Skill:** `coreyhaines31/marketingskills@site-architecture`
- **Dependencies:** Phase 2.
- **Acceptance Criteria:** Every state page contains at least 1 keyword-rich anchor pointing to `https://salestaxreversecalculator.com`.
- **Testing Strategy:** Run link crawler script checking internal anchor distribution.
- **Risks:** Avoid over-optimized, unnatural repetitive anchor text.
- **Rollback Plan:** Revert modified files.
- **Estimated Effort:** S (1.5 hours)
- **Expected Impact:** Strengthens root homepage authority for head keyword *"reverse sales tax calculator"*.

---

### Task ID: TASK-015
- **Task Title:** Generate Branded SVG/WebP Rate Cards for Top 10 States
- **Phase:** Phase 3 — Structured Data & Internal Linking
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-009
- **Evidence:** Only 3 infographics exist site-wide. No visual breakdown cards for state vs county vs municipal tax splits.
- **Current Behavior:** State pages are text-heavy without visual rate breakdowns.
- **Expected Behavior:** Top 10 state pages feature lightweight (<35 KB) branded WebP/SVG rate breakdown cards embedded via `<Image />` with `ImageObject` schema.
- **Root Cause:** Image generation pipeline was restricted to the homepage in initial development.
- **Affected Files:**
  - `public/images/states/` (new directory)
  - Top 10 state components
- **Recommended Changes:**
  1. Generate branded rate card graphics for NY, CT, CA, TX, FL, SC, AZ, PA, IL, OH.
  2. Embed using Next.js responsive image component.
  3. Attach `ImageObject` structured data.
- **Recommended Skill:** `vercel-react-best-practices`
- **Dependencies:** Phase 2.
- **Acceptance Criteria:** 10 images deployed; all WebP assets under 35 KB; valid `ImageObject` schema.
- **Testing Strategy:** Inspect image network payloads in DevTools; verify alt text.
- **Risks:** Image bloat if unoptimized.
- **Rollback Plan:** Remove image imports.
- **Estimated Effort:** M (3 hours)
- **Expected Impact:** Captures Google Image Search traffic and visual rich snippets.

---

### Task ID: TASK-016
- **Task Title:** Expand Canadian Hub and Provincial Invoicing Guides
- **Phase:** Phase 4 — International Hub Localization
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-006
- **Evidence:** `/canada` is only 723 words; international traffic represents high-intent e-commerce cross-border accounting volume.
- **Current Behavior:** High-level summary of GST (5%), HST (13–15%), and PST/QST.
- **Expected Behavior:** 1,800+ word Canadian hub covering Canada Revenue Agency (CRA) Input Tax Credit (ITC) reverse calculation, Quebec sequential QST mechanics, and B2B invoice disclosure rules.
- **Root Cause:** Canadian content was implemented as a secondary tier.
- **Affected Files:**
  - `src/app/(site)/canada/page.tsx`
  - `src/app/(site)/canada/CanadaCalculator.tsx`
- **Recommended Changes:**
  1. Detail CRA guidelines for claiming Input Tax Credits from tax-inclusive expense receipts (using CRA formula: $\text{Total} \times \frac{5}{105}$ for GST or $\frac{13}{113}$ for Ontario HST).
  2. Explain Quebec's historic sequential calculation vs current harmonized base calculation.
  3. Expand provincial rate table with specific commercial invoice thresholds.
- **Recommended Skill:** `coreyhaines31/marketingskills@content-strategy`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** `/canada` word count >= 1,800; CRA formulas accurate; clean build.
- **Testing Strategy:** Verify CRA mathematical proofs; inspect mobile layout.
- **Risks:** None.
- **Rollback Plan:** `git checkout HEAD -- src/app/(site)/canada/page.tsx`
- **Estimated Effort:** M (4 hours)
- **Expected Impact:** Captures Page 1 rankings for Canadian GST/HST reverse calculations.

---

### Task ID: TASK-017
- **Task Title:** Deepen International VAT Hubs (UK & Germany)
- **Phase:** Phase 4 — International Hub Localization
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-006
- **Evidence:** UK VAT (`/vat-calculator/united-kingdom`: 437 words), Germany VAT (`/vat-calculator/germany`: 374 words) are thin.
- **Current Behavior:** Minimal boilerplate with standard rate.
- **Expected Behavior:** 1,500+ words per country covering EU VAT Directive Article 194/196 reverse-charge rules, UK HMRC domestic reverse charge, and German UStG §13b compliance.
- **Root Cause:** International pages lacked localization depth.
- **Affected Files:**
  - `src/app/(site)/vat-calculator/page.tsx`
  - `src/app/(site)/vat-calculator/[country]/page.tsx`
  - `src/data/vatTaxRates.ts`
- **Recommended Changes:**
  1. Add detailed guidance on B2B cross-border reverse charge invoicing (where buyer self-assesses VAT).
  2. Add UK HMRC VAT fraction formula: $\text{Gross Price} \times \frac{1}{6} = \text{VAT amount}$ at 20%.
  3. Add German 19% standard and 7% reduced rate reverse calculations.
- **Recommended Skill:** `coreyhaines31/marketingskills@content-strategy`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** UK and Germany pages exceed 1,500 words of verified tax guidance.
- **Testing Strategy:** Verify HMRC and UStG references; run word count audit.
- **Risks:** None.
- **Rollback Plan:** Revert modified files.
- **Estimated Effort:** M (4 hours)
- **Expected Impact:** Positions site for international accounting traffic.

---

### Task ID: TASK-018
- **Task Title:** Configure Next.js Package Import Optimization
- **Phase:** Phase 5 — Performance, Accessibility & UX
- **Priority:** P3 — Low
- **Finding IDs:** SEO-010
- **Evidence:** Audit report highlights opportunity to shave 15–25ms off mobile bundle evaluation.
- **Current Behavior:** `next.config.ts` does not declare `optimizePackageImports`.
- **Expected Behavior:** `optimizePackageImports` is enabled for UI components, reducing client JS chunk size.
- **Root Cause:** Standard default configuration.
- **Affected Files:** `next.config.ts`
- **Recommended Changes:** Add experimental optimization block to `next.config.ts`:
  ```typescript
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  ```
- **Recommended Skill:** `vercel-react-best-practices`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** `next build` passes with zero warnings; build output chunk size verified.
- **Testing Strategy:** Run `npm run build` and compare `.next/static/chunks` bundle sizes.
- **Risks:** Build incompatibility if experimental flag is deprecated in Next 16.
- **Rollback Plan:** Remove experimental block from `next.config.ts`.
- **Estimated Effort:** S (15 mins)
- **Expected Impact:** Improves INP (Interaction to Next Paint) and mobile TTI.

---

### Task ID: TASK-019
- **Task Title:** Implement WAI-ARIA Keyboard Arrow Navigation in Calculator Tabs
- **Phase:** Phase 5 — Performance, Accessibility & UX
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-014
- **Evidence:** `CalculatorCard.tsx` has `role="tablist"` but tab switching requires click/Enter without arrow key roving index.
- **Current Behavior:** Keyboard tab navigation moves through DOM sequentially instead of roving arrow navigation.
- **Expected Behavior:** Full compliance with WAI-ARIA Tabs pattern: Left/Right arrow keys cycle active tabs; Home/End jumps to first/last tab.
- **Root Cause:** Standard state handler without `onKeyDown` roving tabindex handler.
- **Affected Files:** `src/components/calculator/CalculatorCard.tsx`
- **Recommended Changes:** Add `handleKeyDown` event listener on tab buttons handling `ArrowLeft`, `ArrowRight`, `Home`, and `End`.
- **Recommended Skill:** `a11y-debugging`
- **Dependencies:** Phase 1.
- **Acceptance Criteria:** Lighthouse Accessibility score reaches 100; keyboard tab switching verified via Tab/Arrows.
- **Testing Strategy:** Manual keyboard navigation test in browser.
- **Risks:** None.
- **Rollback Plan:** Revert `CalculatorCard.tsx`.
- **Estimated Effort:** S (30 mins)
- **Expected Impact:** Accessibility compliance (WCAG 2.1 AA).

---

### Task ID: TASK-021
- **Task Title:** Implement Calculator Unit Test Suite
- **Phase:** Phase 6 — Automated Testing & Regression Prevention
- **Priority:** P1 — High
- **Finding IDs:** SEO-015
- **Evidence:** No automated unit tests currently exist for `taxCalc.ts`.
- **Current Behavior:** Calculation correctness relies on manual verification.
- **Expected Behavior:** Automated unit test suite verifies reverse tax math across edge cases (zero tax, flat rates, split rates, negative inputs, floating-point precision).
- **Root Cause:** Rapid prototyping without initial test harness.
- **Affected Files:**
  - `src/lib/__tests__/taxCalc.test.ts` (new file)
  - `package.json` (add test script)
- **Recommended Changes:** Create Vitest / Jest test file covering all exported functions in `taxCalc.ts`.
- **Recommended Skill:** `anthropics/skills@webapp-testing`
- **Dependencies:** None.
- **Acceptance Criteria:** 100% of calculation test cases pass; coverage of `taxCalc.ts` >= 95%.
- **Testing Strategy:** Run `npm test`.
- **Risks:** None.
- **Rollback Plan:** Delete test file.
- **Estimated Effort:** S (1.5 hours)
- **Expected Impact:** Prevents math regressions during future updates.

---

### Task ID: TASK-022
- **Task Title:** Implement End-to-End Route, Redirect & Canonical Verification Test
- **Phase:** Phase 6 — Automated Testing & Regression Prevention
- **Priority:** P1 — High
- **Finding IDs:** SEO-015
- **Evidence:** Audit findings require ongoing verification of 308 redirects, canonical consistency, and 200 OK statuses.
- **Current Behavior:** Testing is performed ad-hoc via curl commands.
- **Expected Behavior:** Playwright E2E script automatically asserts:
  1. `/how-it-works` -> 308 redirect to `/#how-it-works`.
  2. `/faq` -> 308 redirect to `/#faq`.
  3. Root canonical matches `https://salestaxreversecalculator.com`.
  4. Sitemap XML contains valid URLs matching canonicals.
  5. State routes return 200 OK with valid schemas.
- **Root Cause:** Lack of automated CI/CD SEO regression gate.
- **Affected Files:** `tests/seo-verification.spec.ts` (new file)
- **Recommended Changes:** Author Playwright test script running against local build or preview deployment.
- **Recommended Skill:** `microsoft/playwright-cli@playwright-cli`
- **Dependencies:** Phases 1–5.
- **Acceptance Criteria:** `npx playwright test` passes all assertions with zero failures.
- **Testing Strategy:** Execute test suite against local production build (`npm run start`).
- **Risks:** None.
- **Rollback Plan:** Delete test file.
- **Estimated Effort:** M (2–3 hours)
- **Expected Impact:** Permanent automated protection against SEO regressions.

---

### Task ID: TASK-024
- **Task Title:** Deploy to Preview Environment & Smoke Test
- **Phase:** Phase 7 — Deployment, Monitoring & Authority Building
- **Priority:** P1 — High
- **Finding IDs:** Implementation deployment governance.
- **Evidence:** Vercel deployment architecture.
- **Current Behavior:** Changes in development.
- **Expected Behavior:** Vercel generates preview deployment URL; full smoke test verifies all changes before production release.
- **Root Cause:** Standard release governance.
- **Affected Files:** Production release branch.
- **Recommended Changes:** Push branch to remote; inspect preview deployment build logs; run Playwright test suite against preview URL.
- **Recommended Skill:** `agent-browser`
- **Dependencies:** Phase 6.
- **Acceptance Criteria:** Vercel preview build succeeds with zero errors; all tests pass on preview URL.
- **Testing Strategy:** Automated E2E run against preview URL.
- **Risks:** Environment variable differences.
- **Rollback Plan:** Close preview branch.
- **Estimated Effort:** S (30 mins)
- **Expected Impact:** Safe verification prior to production release.

---

### Task ID: TASK-025
- **Task Title:** Execute Production Release & Live Validation
- **Phase:** Phase 7 — Deployment, Monitoring & Authority Building
- **Priority:** P0 — Critical
- **Finding IDs:** Release execution.
- **Evidence:** Production deployment milestone.
- **Current Behavior:** Production running previous release.
- **Expected Behavior:** Production running updated release; edge cache invalidated; live endpoints verified.
- **Root Cause:** Final release execution.
- **Affected Files:** Production branch.
- **Recommended Changes:** Merge release branch into `main`; monitor Vercel production deployment; run live curl diagnostics.
- **Recommended Skill:** `none`
- **Dependencies:** TASK-024.
- **Acceptance Criteria:** Production live at `https://salestaxreversecalculator.com` with updated code; live curl tests pass.
- **Testing Strategy:** Run live production curl checks for headers, status codes, and schemas.
- **Risks:** Edge cache staleness (mitigated by automatic Vercel cache purge on deploy).
- **Rollback Plan:** `vercel rollback` to previous deployment ID.
- **Estimated Effort:** S (30 mins)
- **Expected Impact:** Full production realization of SEO enhancements.

---

### Task ID: TASK-027
- **Task Title:** Scale Syndication of Accounting Embed Widget
- **Phase:** Phase 7 — Deployment, Monitoring & Authority Building
- **Priority:** P2 — Medium
- **Finding IDs:** SEO-013
- **Evidence:** New domain launched in 2026 has low external referring domain count; `EmbedWidgetSection.tsx` and `/embed` are already built.
- **Current Behavior:** Embed widget exists on homepage but is not actively syndicated.
- **Expected Behavior:** Widget documentation submitted to accounting software directories, small business forums, and web developer resource listings with natural attribution links.
- **Root Cause:** Off-page outreach has not yet been executed.
- **Affected Files:** Outreach materials; external directory listings.
- **Recommended Changes:** Prepare outreach briefs for accounting blogs, bookkeeping portals (QuickBooks/Xero community forums), and SaaS tool directories offering the free embeddable widget.
- **Recommended Skill:** `coreyhaines31/marketingskills@seo-audit`
- **Dependencies:** TASK-025.
- **Acceptance Criteria:** Initial batch of 15–20 curated directory submissions completed; widget links verified with clean `rel="nofollow sponsored"` attributes.
- **Testing Strategy:** Monitor backlink profile growth via external indexing tools.
- **Risks:** Avoid manipulative or low-quality link schemes. Adhere strictly to Google Webmaster Guidelines.
- **Rollback Plan:** Disavow low-quality links if necessary.
- **Estimated Effort:** L (Ongoing / 10 hours)
- **Expected Impact:** Builds domain-level authority and referral traffic.
