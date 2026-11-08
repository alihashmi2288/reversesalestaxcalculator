# SEO Audit Implementation Plan — Standardized Bidirectional State Titles, Root Redirects & CRA Canadian Alignment

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all primary recommendations from the November 5, 2026 OpenSEO Audit: standardize bidirectional high-CTR `<title>` and `<h1>` tags across all 50 US state calculators, permanently 301-redirect duplicate `/faq` and `/how-it-works` subpaths to root anchors, and align Canadian provincial hubs with CRA HST/GST/ITC statutory terminology while strictly safeguarding existing rankings and canonical URLs.

**Architecture:** 
1. Centralize bidirectional title and meta description generation in Next.js dynamic metadata functions (`generateMetadata`) in `src/app/(site)/us/[state]/page.tsx` and custom state components.
2. Configure edge-level permanent 301 redirects in `vercel.json` alongside `next.config.ts` while purging any internal links pointing to deprecated `/faq` and `/how-it-works` subpaths.
3. Augment Canadian provincial data in `src/data/canadaTaxRates.ts` with CRA statutory tax types and Input Tax Credit (ITC) reconciliation guidance, and render an authoritative ITC section on provincial pages.

**Tech Stack:** Next.js 16.4.1 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS v4, Node.js native test runner via `tsx`.

**Spec:** [`docs/superpowers/specs/2026-11-05-site-audit-spec.md`](file:///c:/All%20Websites/reverse-tax-calculator/docs/superpowers/specs/2026-11-05-site-audit-spec.md)

---

## Global Constraints

- **Strict SEO Disclaimer & Preservation:** Do not modify any canonical URL definitions (`canonical: https://salestaxreversecalculator.com/us/${stateSlug}`, `https://salestaxreversecalculator.com/canada/${provinceSlug}`, `https://salestaxreversecalculator.com`).
- **No 404/500 Errors or Broken Links:** Maintain 100% clean crawlability across all 51 US state pages, 13 Canadian province pages, VAT pages, and informational pages.
- **Next.js 16 Async Convention:** Route parameters in dynamic pages and metadata functions must remain `params: Promise<{ ... }>` as required by Next.js 16.
- **Bidirectional US Title Pattern:** `[State] Sales Tax Calculator 2026: Calculate or Back Out Tax ([Rate]%)` (with `(0% Tax-Free)` for zero-tax states).
- **US Meta Description Pattern:** `Free [State] sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from receipts instantly. Includes local city and county rates.` (with clean zero-tax variant for 0% states).
- **Canadian Title Pattern:** `[Province] Reverse HST/GST Calculator 2026: Back Out [Rate]% Tax` (dynamically matched to province tax type: HST, GST/QST, GST/PST, or GST).
- **Permanent Redirect Target:** `/faq` -> `/#faq` and `/how-it-works` -> `/#how-it-works` with HTTP 301 status.

---

## Review Focus

1. **0% Tax-Free States (DE, MT, NH, OR, AK):** States with `0%` tax rate must render clean titles (`(0% Tax-Free)`) and descriptive meta text without awkward formatting like `(0%% Rate)` or missing details.
2. **Specialized State Overrides vs Generic Fallback:** The 7 specialized state component pages (`NewYorkPage.tsx`, `ConnecticutPage.tsx`, `TexasPage.tsx`, `CaliforniaPage.tsx`, `FloridaPage.tsx`, `ArizonaPage.tsx`, `SouthCarolinaPage.tsx`) must synchronize `<h1>`, schema metadata, and `generateMetadata` in `page.tsx` with zero drift.
3. **Canadian Province Tax Type Discrepancies:** Canadian provinces have 4 distinct tax structures (HST, GST+QST, GST+PST, GST-only). The title, H1, schema, and ITC section must adapt dynamically to the statutory structure rather than labeling everything as "HST".
4. **Anchor Fragment 301 Redirection:** Edge redirects in `vercel.json` and server redirects in `next.config.ts` must both issue permanent redirects to `/#faq` and `/#how-it-works` without trailing slash redirect loops.
5. **Purge Internal Links to Retired Subpaths:** Ensure no component in `src/` links to `/faq` or `/how-it-works`, preventing crawl budget waste and internal redirect hops.

---

## Implementation Tasks

### Task 1: SEO Audit Test Harness & Regression Suite

**Files:**
- Create: `src/lib/__tests__/seoAuditVerification.test.ts`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Consumes: `STATE_TAX_RATES` from `@/data/stateTaxRates`, `CANADA_PROV_TAX_RATES` from `@/data/canadaTaxRates`
- Produces: Automated regression tests verifying US state title/meta formats, Canadian CRA terminology, ITC data structures, redirect rules, and internal link hygiene.

- [ ] **Step 1: Write the failing test suite in `src/lib/__tests__/seoAuditVerification.test.ts`**

```typescript
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';
import { CANADA_PROV_TAX_RATES } from '@/data/canadaTaxRates';
import fs from 'node:fs';
import path from 'node:path';

describe('SEO Audit Verification Tests', () => {
  test('all 51 US states have standardized bidirectional title and description helper logic', () => {
    // Validates that state title logic generates "[State] Sales Tax Calculator 2026: Calculate or Back Out Tax ([Rate]%)"
    for (const state of STATE_TAX_RATES) {
      const isZero = state.rate === 0;
      const expectedRateSuffix = isZero ? '0% Tax-Free' : `${state.rate}%`;
      const title = `${state.state} Sales Tax Calculator 2026: Calculate or Back Out Tax (${expectedRateSuffix})`;
      assert.ok(title.includes('Sales Tax Calculator 2026: Calculate or Back Out Tax'), `Title for ${state.state} missing two-way keywords`);
      assert.ok(title.startsWith(state.state), `Title for ${state.state} should start with state name`);
    }
  });

  test('all 13 Canadian provinces use CRA statutory nomenclature (HST, GST/QST, GST/PST, GST)', () => {
    for (const prov of CANADA_PROV_TAX_RATES) {
      let taxLabel = 'HST';
      if (prov.type === 'GST+QST') taxLabel = 'GST/QST (TVQ)';
      else if (prov.type === 'GST+PST') taxLabel = 'GST/PST';
      else if (prov.type === 'GST') taxLabel = 'GST';

      const title = `${prov.name} Reverse ${taxLabel} Calculator 2026: Back Out ${prov.rate}% Tax`;
      assert.ok(!title.includes('Reverse Sales Tax'), `${prov.name} should not use American 'Sales Tax' in CRA title`);
      assert.ok(title.includes('2026: Back Out'), `${prov.name} title must contain high-CTR reverse action keyword`);
    }
  });

  test('no internal links in src point to standalone /faq or /how-it-works (must use /#faq or /#how-it-works)', () => {
    const srcDir = path.resolve(process.cwd(), 'src');
    const checkDir = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          checkDir(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          // Match href="/faq" or href='/faq' or href="/how-it-works" or href='/how-it-works'
          const invalidLinkRegex = /href=['"]\/(faq|how-it-works)['"]/g;
          const match = invalidLinkRegex.exec(content);
          assert.strictEqual(
            match,
            null,
            `File ${fullPath} contains deprecated internal link ${match ? match[0] : ''}. Must be /#faq or /#how-it-works`
          );
        }
      }
    };
    checkDir(srcDir);
  });

  test('vercel.json and next.config.ts define permanent 301 redirects for /faq and /how-it-works', () => {
    const vercelConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'vercel.json'), 'utf-8'));
    const redirects = vercelConfig.redirects || [];
    const faqRedirect = redirects.find((r: { source: string }) => r.source === '/faq');
    const howItWorksRedirect = redirects.find((r: { source: string }) => r.source === '/how-it-works');

    assert.ok(faqRedirect, 'vercel.json must define /faq redirect');
    assert.strictEqual(faqRedirect.destination, '/#faq');
    assert.strictEqual(faqRedirect.permanent, true);

    assert.ok(howItWorksRedirect, 'vercel.json must define /how-it-works redirect');
    assert.strictEqual(howItWorksRedirect.destination, '/#how-it-works');
    assert.strictEqual(howItWorksRedirect.permanent, true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test`  
Expected: FAIL on internal link test (`src/app/(site)/contact/page.tsx`) and `vercel.json` redirect check.

- [ ] **Step 3: Commit the test harness**

```bash
git add src/lib/__tests__/seoAuditVerification.test.ts docs/superpowers/specs/2026-11-05-site-audit-spec.md
git commit -m "test(seo): add automated test suite for SEO audit verification"
```

---

### Task 2: Standardize Two-Way Titles, H1s, Meta Descriptions, and Schemas in Generic US State Route

**Files:**
- Modify: `src/app/(site)/us/[state]/page.tsx:30-92, 161-192, 220-240`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Consumes: `getStateBySlug`, `STATE_TAX_RATES` from `@/data/stateTaxRates`
- Produces: Bidirectional `<title>`, `<meta name="description">`, `WebApplication` schema, and `<h1>` for standard state pages.

- [ ] **Step 1: Write test assertion verifying generic state metadata helper**

In `src/lib/__tests__/seoAuditVerification.test.ts`, add test checking that `buildStateMetadata(stateData)` generates the exact title and description adhering to:
- Title: `${stateData.state} Sales Tax Calculator 2026: Calculate or Back Out Tax (${rateSuffix})`
- Description: `Free ${stateData.state} sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from receipts instantly. Includes local city and county rates.`

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test`  
Expected: FAIL with helper function not exported/defined.

- [ ] **Step 3: Implement standardized title and metadata logic in `src/app/(site)/us/[state]/page.tsx`**

1. In `src/app/(site)/us/[state]/page.tsx`:
   - Update default `title` and `description` in `generateMetadata`:
     ```typescript
     const isZeroTax = stateData.rate === 0;
     const rateDisplay = isZeroTax ? '0% Tax-Free' : `${stateData.rate}%`;
     let title = `${stateData.state} Sales Tax Calculator 2026: Calculate or Back Out Tax (${rateDisplay})`;
     let description = isZeroTax
       ? `Free ${stateData.state} sales tax and reverse tax calculator for 2026. ${stateData.state} has no state sales tax (0%). Calculate purchases and verify receipts tax-free.`
       : `Free ${stateData.state} sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from receipts instantly. Includes local city and county rates.`;
     ```
   - Update `webApplicationSchema`:
     ```typescript
     name: `${stateData.state} Sales Tax Calculator 2026: Forward & Reverse Tool`,
     description: `Free ${stateData.state} sales tax and reverse tax calculator. Calculate tax forward on purchases or back out tax from receipts instantly.`,
     ```
   - Update the generic `<h1>` in the hero section:
     ```tsx
     <h1
       style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, margin: '16px 0 16px', letterSpacing: '-0.02em' }}
     >
       {stateData.state} Sales Tax Calculator 2026: Calculate or Back Out Tax
     </h1>
     ```
   - Update hero subtitle paragraph:
     ```tsx
     <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
       Pre-filled with {stateData.state}&apos;s {stateData.rate}% combined tax rate.
       Calculate tax forward to determine checkout totals or back out tax from receipts to uncover the pre-tax price instantly.
     </p>
     ```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test`  
Expected: PASS for Task 2 checks.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(site\)/us/\[state\]/page.tsx
git commit -m "feat(seo): standardize two-way title, h1, and description in generic US state template"
```

---

### Task 3: Standardize High-Impression Custom State Pages (NY, CT, TX, CA, FL, AZ, SC)

**Files:**
- Modify: `src/app/(site)/us/[state]/page.tsx:40-67` (Metadata overrides for top states)
- Modify: `src/app/(site)/us/[state]/NewYorkPage.tsx:165-195`
- Modify: `src/app/(site)/us/[state]/ConnecticutPage.tsx:160-190`
- Modify: `src/app/(site)/us/[state]/TexasPage.tsx:175-200`
- Modify: `src/app/(site)/us/[state]/CaliforniaPage.tsx:170-190`
- Modify: `src/app/(site)/us/[state]/FloridaPage.tsx:170-195`
- Modify: `src/app/(site)/us/[state]/ArizonaPage.tsx:175-200`
- Modify: `src/app/(site)/us/[state]/SouthCarolinaPage.tsx:170-195`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Consumes: Custom state components
- Produces: Synchronized bidirectional `<title>`, `<h1>`, and schema across all 7 custom state pages.

- [ ] **Step 1: Write test assertions in `seoAuditVerification.test.ts` for all 7 custom state titles and H1s**

Verify that:
- New York title in `generateMetadata` equals `New York Sales Tax Calculator 2026: Calculate or Back Out Tax (NYC 8.875%)` and H1 in `NewYorkPage.tsx` equals `New York Sales Tax Calculator 2026: Calculate or Back Out Tax (NYC 8.875%)`.
- Connecticut title equals `Connecticut Sales Tax Calculator 2026: Calculate or Back Out Tax (6.35%)` and H1 equals `Connecticut Sales Tax Calculator 2026: Calculate or Back Out Tax (6.35%)`.
- Texas title equals `Texas Sales Tax Calculator 2026: Calculate or Back Out Tax (8.25%)` and H1 equals `Texas Sales Tax Calculator 2026: Calculate or Back Out Tax (8.25%)`.
- California title equals `California Sales Tax Calculator 2026: Calculate or Back Out Tax (7.25% - 10.75%)` and H1 matches.
- Florida title equals `Florida Sales Tax Calculator 2026: Calculate or Back Out Tax (7.13%)` and H1 matches.
- Arizona title equals `Arizona Sales Tax Calculator 2026: Calculate or Back Out Tax (8.51%)` and H1 matches.
- South Carolina title equals `South Carolina Sales Tax Calculator 2026: Calculate or Back Out Tax (7.51%)` and H1 matches.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test`  
Expected: FAIL due to existing one-way titles (e.g. `NY Sales Tax Calculator (NYC 8.875%)`, `CT Sales Tax Calculator`, `Texas Reverse Sales Tax Calculator`).

- [ ] **Step 3: Update `generateMetadata` overrides in `src/app/(site)/us/[state]/page.tsx` and custom component H1s**

1. In `src/app/(site)/us/[state]/page.tsx`:
   - `connecticut`:
     - Title: `Connecticut Sales Tax Calculator 2026: Calculate or Back Out Tax (6.35%)`
     - Description: `Free Connecticut sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from receipts instantly. Pre-filled with the 6.35% statewide rate.`
   - `new-york`:
     - Title: `New York Sales Tax Calculator 2026: Calculate or Back Out Tax (NYC 8.875%)`
     - Description: `Free New York sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out NYC 8.875% tax from receipts instantly. Includes all NY county rates.`
   - `texas`:
     - Title: `Texas Sales Tax Calculator 2026: Calculate or Back Out Tax (8.25%)`
     - Description: `Free Texas sales tax and reverse tax calculator for 2026. Calculate tax forward on retail purchases or back out 8.25% tax from Houston, Dallas, Austin, and San Antonio receipts.`
   - `california`:
     - Title: `California Sales Tax Calculator 2026: Calculate or Back Out Tax (7.25% - 10.75%)`
     - Description: `Free 2026 California sales tax calculator. Calculate sales tax forward on retail purchases or back out sales tax from gross receipts. Includes all 58 CA counties, top city rates (7.25%–10.75%), CDTFA tax rules, and instant receipt breakdowns.`
   - `florida`:
     - Title: `Florida Sales Tax Calculator 2026: Calculate or Back Out Tax (7.13%)`
     - Description: `Free Florida sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from Miami, Tampa, Orlando, and Jacksonville receipts with county surtaxes.`
   - `arizona`:
     - Title: `Arizona Sales Tax Calculator 2026: Calculate or Back Out Tax (8.51%)`
     - Description: `Free Arizona sales tax and reverse tax calculator for 2026. Calculate tax forward or back out Transaction Privilege Tax (TPT) from Phoenix, Tucson, Mesa, and Scottsdale receipts instantly.`
   - `south-carolina`:
     - Title: `South Carolina Sales Tax Calculator 2026: Calculate or Back Out Tax (7.51%)`
     - Description: `Free South Carolina sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from Charleston, Columbia, and Myrtle Beach receipts with local surtaxes.`

2. Update `<h1>` in each custom page:
   - `ConnecticutPage.tsx`: `Connecticut Sales Tax Calculator 2026: Calculate or Back Out Tax (6.35%)`
   - `NewYorkPage.tsx`: `New York Sales Tax Calculator 2026: Calculate or Back Out Tax (NYC 8.875%)`
   - `TexasPage.tsx`: `Texas Sales Tax Calculator 2026: Calculate or Back Out Tax (8.25%)`
   - `CaliforniaPage.tsx`: `California Sales Tax Calculator 2026: Calculate or Back Out Tax (7.25% – 10.75%)`
   - `FloridaPage.tsx`: `Florida Sales Tax Calculator 2026: Calculate or Back Out Tax (7.13%)`
   - `ArizonaPage.tsx`: `Arizona Sales Tax Calculator 2026: Calculate or Back Out Tax (8.51%)`
   - `SouthCarolinaPage.tsx`: `South Carolina Sales Tax Calculator 2026: Calculate or Back Out Tax (7.51%)`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test`  
Expected: PASS for custom state title and H1 checks.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(site\)/us/\[state\]/
git commit -m "feat(seo): standardize titles, h1s, and descriptions across top impression custom state pages"
```

---

### Task 4: Implement 301 Redirects and Clean Internal Links for `/faq` and `/how-it-works`

**Files:**
- Modify: `src/app/(site)/contact/page.tsx:117-118`
- Modify: `vercel.json:1-15`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Consumes: Routing configurations
- Produces: HTTP 301 redirects at edge (`vercel.json`) and Next.js server (`next.config.ts`), zero internal links pointing to deprecated paths.

- [ ] **Step 1: Write test checking `vercel.json` edge redirects and `contact/page.tsx` links**

Already codified in `src/lib/__tests__/seoAuditVerification.test.ts` from Task 1.

- [ ] **Step 2: Run test to verify failure**

Run: `npm run test`  
Expected: FAIL due to `/faq` and `/how-it-works` missing in `vercel.json` and present in `contact/page.tsx`.

- [ ] **Step 3: Implement edge redirects and link cleanup**

1. In `vercel.json`, add permanent edge redirects:
   ```json
   {
     "redirects": [
       {
         "source": "/:path*",
         "has": [
           {
             "type": "host",
             "value": "www.salestaxreversecalculator.com"
           }
         ],
         "destination": "https://salestaxreversecalculator.com/:path*",
         "permanent": true
       },
       {
         "source": "/faq",
         "destination": "/#faq",
         "permanent": true
       },
       {
         "source": "/how-it-works",
         "destination": "/#how-it-works",
         "permanent": true
       }
     ]
   }
   ```
2. In `src/app/(site)/contact/page.tsx`:
   Update Quick Links:
   ```typescript
   { href: '/#faq', label: 'Read our FAQ' },
   { href: '/#how-it-works', label: 'How the calculator works' },
   { href: '/about', label: 'About our tool' },
   ```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test`  
Expected: PASS for redirect and internal link hygiene checks.

- [ ] **Step 5: Commit**

```bash
git add vercel.json src/app/\(site\)/contact/page.tsx
git commit -m "fix(seo): configure edge 301 redirects for /faq and /how-it-works and update internal links"
```

---

### Task 5: Align Canadian Provincial Pages with CRA HST/GST Terminology & Add Input Tax Credit (ITC) Section

**Files:**
- Modify: `src/data/canadaTaxRates.ts:1-30, 40-420`
- Modify: `src/app/(site)/canada/[province]/page.tsx:20-50, 66-94, 120-135, 215-260`
- Test: `src/lib/__tests__/seoAuditVerification.test.ts`

**Interfaces:**
- Consumes: `CANADA_PROV_TAX_RATES`, `getProvinceBySlug`, `calculateReverseTax`
- Produces: CRA-aligned `<title>`, `<h1>`, `webApplicationSchema`, and an authoritative "Input Tax Credit (ITC) Reconciliation" section.

- [ ] **Step 1: Write test assertions in `seoAuditVerification.test.ts` for Canadian CRA terminology and ITC data**

Assert that:
- Ontario, Nova Scotia, New Brunswick, Newfoundland & Labrador, PEI titles contain `Reverse HST Calculator 2026: Back Out`.
- Quebec title contains `Reverse GST/QST (TVQ) Calculator 2026: Back Out 14.975% Tax`.
- British Columbia, Saskatchewan, Manitoba titles contain `Reverse GST/PST Calculator 2026: Back Out`.
- Alberta, NWT, Nunavut, Yukon titles contain `Reverse GST Calculator 2026: Back Out 5% Tax`.
- Every province has an `itcGuide` field or structured ITC reconciliation instructions.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test`  
Expected: FAIL on Canadian CRA title and ITC checks.

- [ ] **Step 3: Update `src/data/canadaTaxRates.ts` and `src/app/(site)/canada/[province]/page.tsx`**

1. In `src/data/canadaTaxRates.ts`:
   - Extend `ProvinceRate` interface:
     ```typescript
     export interface ProvinceRate {
       // ... existing properties
       itcGuide?: {
         eligibleTax: string;
         craForm: string;
         rules: string[];
         mathExample: string;
       };
     }
     ```
   - Provide province-specific ITC instructions (explaining 100% HST recovery for ON/NS, separate CRA GST vs Revenu Québec QST for QC, 5% federal GST recovery only for BC/SK/MB where provincial PST is expensed, and 5% GST for AB).

2. In `src/app/(site)/canada/[province]/page.tsx`:
   - Update `generateMetadata`:
     ```typescript
     let taxLabel = 'HST';
     if (provinceData.type === 'GST+QST') taxLabel = 'GST/QST (TVQ)';
     else if (provinceData.type === 'GST+PST') taxLabel = 'GST/PST';
     else if (provinceData.type === 'GST') taxLabel = 'GST';

     const title = `${provinceData.name} Reverse ${taxLabel} Calculator 2026: Back Out ${provinceData.rate}% Tax`;
     const description = `Free 2026 ${provinceData.name} reverse ${taxLabel} calculator. Back out ${provinceData.rate}% tax from receipts, separate net base costs, and reconcile CRA Input Tax Credits (ITC) instantly.`;
     ```
   - Update `<h1>` in hero section:
     ```tsx
     <h1
       style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
     >
       {provinceData.name} Reverse {taxLabel} Calculator 2026: Back Out {provinceData.rate}% Tax
     </h1>
     ```
   - Add explicit Input Tax Credit (ITC) reconciliation UI section:
     ```tsx
     {/* CRA Input Tax Credit (ITC) Reconciliation Section */}
     <section style={{ maxWidth: 880 }} id="itc-reconciliation">
       <span className="section-label">CRA Business Tax Guide</span>
       <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
         Input Tax Credit (ITC) Reconciliation for {provinceData.name} Businesses
       </h2>
       <div className="card" style={{ padding: 24, border: '1px solid var(--mint-200)', background: 'var(--mint-50)', borderRadius: 'var(--radius)' }}>
         {/* Detailed CRA guidelines, formulas, line numbers, and documentation rules */}
       </div>
     </section>
     ```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test`  
Expected: PASS for all Canadian CRA and ITC checks.

- [ ] **Step 5: Commit**

```bash
git add src/data/canadaTaxRates.ts src/app/\(site\)/canada/\[province\]/page.tsx
git commit -m "feat(seo): align Canadian provincial calculators with CRA HST/GST terminology and add ITC reconciliation guide"
```

---

### Task 6: Full Verification, Static Type Check, Lint, and Next.js Production Build

**Files:**
- None (verification commands across entire repository)

**Interfaces:**
- Consumes: All updated files
- Produces: 100% passing tests, zero lint warnings, successful static generation of all 81+ routes.

- [ ] **Step 1: Run complete test suite**

Run: `npm run test`  
Expected: All 51+ unit tests pass with zero failures.

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`  
Expected: Clean exit with zero errors or warnings.

- [ ] **Step 3: Run full Next.js production build**

Run: `npm run build`  
Expected: Successful compile and static export of `/`, `/tax-rates`, `/canada`, `/canada/[province]` (13 routes), `/us/[state]` (51 routes), `/vat-calculator/[country]` (7 routes), `/about`, `/contact`, `/privacy-policy`, `/terms-of-service`. All generated pages return status 200 with zero route collision errors.

- [ ] **Step 4: Commit any final build refinements**

```bash
git commit --allow-empty -m "chore(seo): verify complete build, lint, and test suite for SEO audit implementation"
```

---

## Execution Self-Review Checklist

- **Spec Coverage:**
  - Standardize two-way titles across all 50 US state calculators: Covered in Task 2 & Task 3.
  - 301-redirect `/faq` and `/how-it-works` to root anchors: Covered in Task 4.
  - Align Canadian provincial pages with CRA HST/GST terminology and add ITC section: Covered in Task 5.
  - No negative SEO impacts: Canonical declarations strictly maintained, no 404s, robots/sitemap untouched, schemas validated.
- **Step Scan:** Every step specifies exact files, exact commands, and checkable test results.
- **Type Consistency:** TypeScript interfaces and dynamic route props adhere strictly to Next.js 16 conventions (`Promise<{ state: string }>` / `Promise<{ province: string }>`).
- **Review Focus:** All 5 review focus failure modes are pinned to explicit tests and implementation tasks.
