# SEO Audit Implementation Plan — November 9, 2026 Audit Remediation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute all actionable code, content, architectural, schema, and technical SEO improvements from the November 9, 2026 Audit (`SEO-audit 09-11-126`) for `salestaxreversecalculator.com`: resolve 9 Canadian provincial orphans, trim 55 state titles under 58 chars, overhaul high-impression NYC/NY snippets, compress meta descriptions, target core head terms, add worked word-problem FAQ schemas, implement AdSense-safe CSP headers, clean anchor URL leakage, add lateral border-state cross-links, and update agentic `llms.txt`.

**Architecture:**
1. **Internal Linking & Silo Restoration:** Build a responsive 13-province/territory card grid on `/canada` with statutory rate badges and descriptive anchors to eliminate all 9 orphan pages; implement a lateral "Neighboring State Sales Tax Comparison" engine across state pages.
2. **SERP Snippet & Mobile CTR Optimization:** Standardize state page titles to `[State] Reverse Sales Tax Calculator ([Combined Rate]%)` (<58 chars to eliminate mobile SERP truncation), overhaul `/us/new-york` metadata and H1 for NYC 8.875% queries (targeting 2,133 monthly impressions), and compress state meta descriptions to 145–155 chars.
3. **Featured Snippet & AI Overview Capture:** Add a "Worked Math Examples & Word Problems" FAQ module with instant tabular proofs ($176 @ 6%, $100 @ 8.875%, $50 @ 7%, $20 @ 4%) to the homepage and FAQ schema.
4. **Technical & Security Hardening:** Add Content-Security-Policy (CSP) headers in `next.config.ts` configured for Google AdSense and Vercel Analytics; clean on-page anchor navigation to prevent GSC URL fragment indexing (`/#calculator`, `/#faq`); add `BreadcrumbList` JSON-LD to `/privacy-policy` and `/terms-of-service`.
5. **Agentic Web & Documentation:** Update `llms.txt` and `llms-full.txt` with all 13 Canadian provinces, API calculation definitions, and formulas.

**Tech Stack:** Next.js 16.4.1 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS v4, Node.js test runner via `tsx`.

**Spec:** [`SEO-audit 09-11-126/ACTION-PLAN.md`](file:///c:/All%20Websites/reverse-tax-calculator/SEO-audit%2009-11-126/ACTION-PLAN.md) and [`SEO-audit 09-11-126/FULL-AUDIT-REPORT.md`](file:///c:/All%20Websites/reverse-tax-calculator/SEO-audit%2009-11-126/FULL-AUDIT-REPORT.md)

---

## Global Constraints

- **Strict Preservation of Canonical URLs:** All canonical tags must stay exact self-referencing (`https://salestaxreversecalculator.com/us/${stateSlug}`, `https://salestaxreversecalculator.com/canada/${provinceSlug}`, etc.).
- **Zero 404s or Broken Links:** All 79 URLs in `sitemap.xml` must remain 200 OK.
- **Mobile Title Length Budget:** Every state calculator title must remain strictly under 58 characters to guarantee no SERP truncation.
- **AdSense & Monetization Compatibility:** Content Security Policy (CSP) must permit Google AdSense (`pagead2.googlesyndication.com`, `partner.googleadservices.com`, `adservice.google.com`, `googleads.g.doubleclick.net`) and Google Tag Manager.
- **Next.js 16 Dynamic Convention:** Dynamic route params must remain `params: Promise<{ ... }>`.

---

## Review Focus

1. **Canadian Orphan Resolution:** All 13 provinces/territories must be linked with valid `href` from `/canada`, verified with zero orphan pages.
2. **State Page Title Length Verification:** Test must verify that zero state titles exceed 58 characters and all follow the new concise template.
3. **AdSense CSP Compatibility:** CSP header must not block Google AdSense scripts, ads iframe embeds, or font assets.
4. **Anchor Navigation Cleanliness:** Internal clicks on "Calculator", "How It Works", or "FAQ" must smoothly scroll without appending `#` fragments into browser history or emitting bare hash URLs to crawlers.
5. **Test Suite Green:** Node test suite (`npm run test`) must pass with 100% success.

---

## Categorization: Implementable vs Non-Implementable (External)

### A. Implementable in Code (Tasks 1 to 8):
- Task 1: Eliminate 9 Canadian Provincial Orphan Pages with 13-Province Hub Grid
- Task 2: Trim State Titles to <58 Characters & Overhaul NY/NYC Snippet
- Task 3: Compress State Meta Descriptions to 145–155 Characters
- Task 4: Add "Worked Math Examples & Word Problems" FAQ Module & Rich Schema
- Task 5: Deploy AdSense-Ready Content-Security-Policy (CSP) Header
- Task 6: Add Missing BreadcrumbList Schema to Utility Pages
- Task 7: Clean Internal Anchor Link Leakage in Navbar & Footer
- Task 8: Deploy Lateral Border-State Cross-Linking Widget & Agentic llms.txt Updates

### B. Non-Implementable via Code (External / Operational Actions for User):
- **P4.3: Manual Outreach to Bookkeepers / Accounting Blogs (Backlink Acquisition):** Requires human outreach, PR pitches, and relationship building with QuickBooks/FreshBooks community bloggers.
- **P4.1: Future 2027 Legislative Tax Rate Updates:** Effective Jan 1, 2027; cannot be coded now as 2026 statutory rates are current.
- **P4.4: Real Verified Person Author Profiles with LinkedIn sameAs:** Requires user's real LinkedIn URLs and verified CPA credential certificates.
- **Google Search Console Indexing Re-crawls:** Must be manually requested via GSC dashboard URL Inspection tool once deployed.

---

## Implementation Tasks

### Task 1: Eliminate 9 Canadian Provincial Orphan Pages on `/canada`

**Files:**
- Modify: `src/app/(site)/canada/page.tsx:345-370`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Consumes: `CANADA_PROV_TAX_RATES` from `@/data/canadaTaxRates`
- Produces: Complete 13-province/territory navigation grid on `/canada` linking directly to `/canada/[province]` with rates and statutory tax badges.

- [ ] **Step 1: Write test verifying `/canada` links to all 13 provinces**
Add test in `src/lib/__tests__/seoAuditVerification.test.ts` asserting that `/canada` page content contains links to all 13 province slugs.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm run test`
Expected: FAIL (missing 9 provincial links in `/canada/page.tsx`).

- [ ] **Step 3: Update `src/app/(site)/canada/page.tsx`**
Replace the 4-province button list with a 13-province interactive responsive grid displaying province flag/name, tax rate, tax type (HST, GST+PST, GST+QST, GST), and direct link.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS.

---

### Task 2: Standardize State Titles (<58 Chars) & Overhaul New York Snippet

**Files:**
- Modify: `src/app/(site)/us/[state]/page.tsx:35-72`
- Modify: `src/app/(site)/us/[state]/NewYorkPage.tsx:1-40`
- Modify: `src/app/(site)/us/[state]/ConnecticutPage.tsx`
- Modify: `src/app/(site)/us/[state]/TexasPage.tsx`
- Modify: `src/app/(site)/us/[state]/CaliforniaPage.tsx`
- Modify: `src/app/(site)/us/[state]/FloridaPage.tsx`
- Modify: `src/app/(site)/us/[state]/ArizonaPage.tsx`
- Modify: `src/app/(site)/us/[state]/SouthCarolinaPage.tsx`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Consumes: `STATE_TAX_RATES` from `@/data/stateTaxRates`
- Produces: State titles strictly <= 58 characters (`[State] Reverse Sales Tax Calculator ([Rate]%)`), New York snippet targeting NYC 8.875% queries, synchronized H1s.

- [ ] **Step 1: Update test in `src/lib/__tests__/seoAuditVerification.test.ts` to enforce <= 58 chars**
Assert that every state title is <= 58 characters and uses `Reverse Sales Tax Calculator`.

- [ ] **Step 2: Run test to verify failure**
Run: `npm run test`
Expected: FAIL (titles currently exceed 60 chars).

- [ ] **Step 3: Implement title shortening in `src/app/(site)/us/[state]/page.tsx` and custom state pages**
Standard template: `${stateData.state} Reverse Sales Tax Calculator (${rateDisplay})`.
New York: `New York Reverse Sales Tax Calculator (NYC 8.875%)` (54 chars).
California: `California Reverse Sales Tax Calculator (8.85%)` (47 chars).
Texas: `Texas Reverse Sales Tax Calculator (8.25%)` (42 chars).
Florida: `Florida Reverse Sales Tax Calculator (7.13%)` (44 chars).
Connecticut: `Connecticut Reverse Sales Tax Calculator (6.35%)` (48 chars).
Arizona: `Arizona Reverse Sales Tax Calculator (8.51%)` (44 chars).
South Carolina: `South Carolina Reverse Sales Tax Calculator (7.51%)` (51 chars).
Update corresponding H1s in custom state pages.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS.

---

### Task 3: Compress State Meta Descriptions to 145–155 Characters

**Files:**
- Modify: `src/app/(site)/us/[state]/page.tsx:38-72`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Produces: State meta descriptions between 140 and 158 characters to eliminate Google SERP truncation.

- [ ] **Step 1: Add test asserting meta descriptions are <= 160 characters**
Add test in `src/lib/__tests__/seoAuditVerification.test.ts`.

- [ ] **Step 2: Run test to verify failure**
Run: `npm run test`
Expected: FAIL (descriptions currently ~180+ chars).

- [ ] **Step 3: Update description templates in `src/app/(site)/us/[state]/page.tsx`**
Shorten default template to:
`Calculate pre-tax price or add sales tax in ${stateData.state} instantly. Pre-filled with ${stateData.state}'s ${stateData.rate}% rate plus all local county and city surtaxes free.` (145-155 chars).
Update custom overrides (NY, CA, TX, FL, CT, AZ, SC) to adhere to the 145-155 char standard.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS.

---

### Task 4: Add "Worked Math Examples & Word Problems" FAQ Module & Rich Schema

**Files:**
- Modify: `src/components/FAQSection.tsx`
- Modify: `src/app/(site)/page.tsx`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Produces: 4 structured word problem cards with instant breakdown tables ($176 @ 6%, $100 @ 8.875%, $50 @ 7%, $20 @ 4%) on homepage and in FAQ schema.

- [ ] **Step 1: Write test for word problems content in FAQ**
Add test asserting presence of the $176 @ 6% and $100 @ 8.875% word problem breakdowns in FAQ.

- [ ] **Step 2: Run test to verify failure**
Run: `npm run test`
Expected: FAIL.

- [ ] **Step 3: Add "Word Problems & Worked Examples" category in `FAQSection.tsx` and rich schema in `src/app/(site)/page.tsx`**
Add 4 word problems with tabular proofs and exact math.
Also update homepage H2 to `How Our Reverse Tax Calculator Works` and add prominent formula highlight cards.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS.

---

### Task 5: Deploy AdSense-Ready Content-Security-Policy (CSP) Header

**Files:**
- Modify: `next.config.ts`
- Modify: `vercel.json`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Produces: Strict CSP header allowing Google AdSense, Google Analytics, and fonts while mitigating XSS.

- [ ] **Step 1: Write test for CSP header presence in `next.config.ts`**
Add test asserting CSP header exists and includes Google AdSense domains.

- [ ] **Step 2: Run test to verify failure**
Run: `npm run test`
Expected: FAIL.

- [ ] **Step 3: Add CSP header to `next.config.ts` and `vercel.json`**
Inject Content-Security-Policy header supporting self, Google AdSense, GTM, Google Fonts, and Google APIs.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS.

---

### Task 6: Add Missing BreadcrumbList Schema to Utility Pages

**Files:**
- Modify: `src/app/(site)/privacy-policy/page.tsx`
- Modify: `src/app/(site)/terms-of-service/page.tsx`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Produces: Valid Schema.org `BreadcrumbList` JSON-LD on all utility pages.

- [ ] **Step 1: Write test verifying all utility pages have BreadcrumbList**
Check `/privacy-policy` and `/terms-of-service`.

- [ ] **Step 2: Run test to verify failure**
Run: `npm run test`
Expected: FAIL.

- [ ] **Step 3: Implement BreadcrumbList in `privacy-policy/page.tsx` and `terms-of-service/page.tsx`**
Add JSON-LD script and breadcrumb navigation markup.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS.

---

### Task 7: Clean Internal Anchor Link Leakage in Navbar & Footer

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Produces: Smooth in-page scrolling without exposing bare `/#calculator` or pushing `#` hash into URL history.

- [ ] **Step 1: Write test verifying internal anchor navigation hygiene**
Ensure no href pushes bare `#` hash to browser history on click.

- [ ] **Step 2: Implement smooth scroll without `window.history.pushState(null, '', '/#...')`**
Update `handleSectionScroll` in `Navbar.tsx` to scroll without polluting history or address bar; ensure footer links point to clean paths or clean on-page triggers.

- [ ] **Step 3: Run test to verify it passes**
Run: `npm run test`
Expected: PASS.

---

### Task 8: Deploy Lateral Border-State Cross-Linking Widget & Agentic Updates

**Files:**
- Create: `src/data/stateNeighbors.ts`
- Modify: `src/app/(site)/us/[state]/page.tsx`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Produces: "Neighboring State Sales Tax Comparison" widget on state pages; updated LLM manifest covering all 13 Canadian provinces and API endpoints.

- [ ] **Step 1: Create `src/data/stateNeighbors.ts` mapping adjacent states**
Define neighboring state connections (e.g. NY -> NJ, CT, PA, MA, VT).

- [ ] **Step 2: Add Neighboring State Comparison section on state pages**
Render adjacent state cards with rates and comparisons to pass link equity laterally.

- [ ] **Step 3: Update `public/llms.txt` and `public/llms-full.txt`**
Add all 13 Canadian province URLs and formulas.

- [ ] **Step 4: Run test to verify all tests pass**
Run: `npm run test`
Expected: PASS.
