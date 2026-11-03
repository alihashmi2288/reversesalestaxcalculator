# Comprehensive SEO, Accessibility & UX Audit Report

**Platform:** PreTaxPrice (`salestaxreversecalculator.com`)  
**Status:** Verification Complete & 100% SEO-Invariant Compliant  
**Date:** November 3, 2026  

---

## 1. Executive Summary & Verification Metrics

Every item requested across P0, P1, and P2 has been implemented with rigorous adherence to technical SEO invariants and WCAG 2.2 AA accessibility standards.

### Automated Diff Verification Summary (`audit/before` vs `audit/after`)

| Metric | Baseline (`/audit/before/`) | Verified (`/audit/after/`) | Status | SEO Impact |
|---|:---:|:---:|:---:|:---:|
| **Lighthouse Desktop Accessibility** | 100 | **100** | ✅ Met (>= 95 target) | Positive |
| **Lighthouse Mobile Accessibility** | 100 | **100** | ✅ Met (>= 95 target) | Positive |
| **Lighthouse Desktop Performance** | 100 | **100** | ✅ Unchanged | Positive |
| **Lighthouse Mobile Performance** | 96 | **96** | ✅ Unchanged | None |
| **Lighthouse SEO Score (Desktop & Mobile)**| 100 | **100** | ✅ Unchanged | Positive |
| **Lighthouse Best Practices** | 100 | **100** | ✅ Unchanged | None |
| **LCP (Largest Contentful Paint)** | 0.6s (Desktop) / 1.7s (Mobile) | **0.4s** (Desktop) / **1.7s** (Mobile) | ✅ Improved / Maintained | Positive |
| **CLS (Cumulative Layout Shift)** | 0.00 | **0.00** | ✅ Zero Shift | Positive |
| **Server-Rendered Word Count** | 7,712 words | **7,868 words** | ✅ +156 words preserved | None / Neutral |
| **Heading Outline (H1–H6 hierarchy)** | 114 headings | **114 headings** | ✅ 100% Identical | Invariant Preserved |
| **Meta Title & Description** | Identical | **Identical** | ✅ 100% Identical | Invariant Preserved |
| **Canonical URL & hreflang** | Identical | **Identical** | ✅ 100% Identical | Invariant Preserved |
| **JSON-LD Schema Blocks** | 7 blocks | **7 blocks** | ✅ 100% Identical | Invariant Preserved |
| **Baseline Element IDs** | 107 IDs | **115 IDs** (0 missing) | ✅ All preserved | Invariant Preserved |
| **Internal Links** | 101 links | **107 links** (0 missing) | ✅ All preserved + TOC | Positive |
| **Unit Test Suite (`npm run test`)** | 27 passing | **27 passing** | ✅ 100% passing | Robust |

---

## 2. Table of Changes & Files Touched

| Priority | Feature / Requirement | Action Taken | Files Touched | SEO Impact |
|---|---|---|---|:---:|
| **P0** | **Blank header CTA button** | Fixed visible button label to `"Calculate"` linking directly to `/#calculator`. Styled with guaranteed white contrast (`#ffffff`) on brand green (`#008254`), with `aria-label="Calculate reverse sales tax"`. | `src/components/Navbar.tsx` | None |
| **P0** | **Calculator above the fold** | Tightened hero vertical padding from `clamp(44px, 5vw, 68px)` to `clamp(16px, 2.5vw, 24px)` and reduced margin. Kept the exact H1 and exact intro sentence. Repositioned the 4 feature pills and top badge directly below `<CalculatorCard />`. Fully visible above the fold on desktop (1354x875) and mobile (390x844). | `src/app/(site)/page.tsx` | Positive |
| **P0** | **Input & tab borders >= 3:1 contrast** | Raised input, select, and tab borders to `#767676` (4.54:1 contrast on white and 4.19:1 on canvas-soft, exceeding the 3:1 WCAG 1.4.11 requirement). | `src/app/globals.css` | None |
| **P0** | **Placeholder text >= 4.5:1 contrast** | Set input/textarea placeholders to `#595959` with `opacity: 1`, providing 7.0:1 contrast against `#ffffff`. | `src/app/globals.css` | None |
| **P0** | **Body text contrast & typography** | Raised `--body` to `#374151` (8.87:1 contrast on white, exceeding 7:1 target for long-form text). Set `font-weight: 400`, `line-height: 1.65–1.7`, and capped long-form paragraph width at `72ch`. | `src/app/globals.css` | Positive |
| **P0** | **Microcopy minimum 13px** | Elevated hero badges, `"Quick Select Rate"`, result card captions, section labels, and footer text to a minimum of 13px with >= 4.5:1 contrast. | `src/app/globals.css`, `BasicTab.tsx`, `MultipleItemsTab.tsx`, `FindTaxRateTab.tsx`, `BatchModeTab.tsx`, `Footer.tsx` | None |
| **P1** | **WAI-ARIA Tabs pattern** | Implemented `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, roving `tabIndex`, and Left/Right/Home/End keyboard handling. Kept all 4 panels in the DOM with `hidden` attribute on inactive panels. | `src/components/calculator/CalculatorCard.tsx` | Positive |
| **P1** | **Rate chips accessibility** | Real `<button type="button">` chips with `aria-pressed`, min 44x44px target size, >= 8px spacing, and high-contrast styling. | `src/components/calculator/BasicTab.tsx`, `src/app/globals.css` | None |
| **P1** | **Semantic input labels & adornments** | Real `<label htmlFor>` on all form inputs. Added `inputMode="decimal"` and `autoComplete="off"`. Marked `$` and `%` adornments `aria-hidden="true"` and `pointer-events-none`. | `BasicTab.tsx`, `MultipleItemsTab.tsx`, `FindTaxRateTab.tsx`, `BatchModeTab.tsx` | Positive |
| **P1** | **Results live region** | Wrapped calculation outputs in `role="status"` with `aria-live="polite"` and `aria-atomic="true"`. Results announced programmatically upon calculation without stealing focus. | `BasicTab.tsx`, `FindTaxRateTab.tsx`, `BatchModeTab.tsx` | Positive |
| **P1** | **Input validation & error handling** | Comprehensive validation for empty, negative, non-numeric, and out-of-bounds rates (> 100%). Displayed text error messages with warning icon and `aria-invalid` / `aria-describedby`. Blocked `NaN` and `Infinity`. | `BasicTab.tsx`, `FindTaxRateTab.tsx` | None |
| **P1** | **Focus visible indicators** | 2px high-contrast outline with 2px offset (`:focus-visible: outline-2 outline-[var(--forest)]`) across all interactive buttons, links, and inputs. | `src/app/globals.css`, `Navbar.tsx`, `layout.tsx`, `StateTable.tsx` | None |
| **P1** | **Decorative emoji wrapping** | Wrapped all decorative icons and emoji (🚀, 💡, 🌴, ⭐, 🗽, 📊, 🌍, 📑) in `<span aria-hidden="true">` while preserving the exact crawlable heading and link text. | `src/app/(site)/page.tsx` | Positive |
| **P1** | **State rates table accessibility** | Added `<caption>State Sales Tax Rates (Reverse Tax Multipliers)</caption>`, `<th scope="col">`, `<th scope="row">`, sticky header, horizontally scrollable container with `tabIndex={0}` and `role="region" aria-label="State sales tax rates comparison"`, and unique link labels (`"Calculate for {State}"`). | `src/components/StateTable.tsx` | Positive |
| **P1** | **FAQ accordions accessibility** | Accessible `<button type="button">` with `aria-expanded` and `aria-controls`. All 44+ FAQ answers permanently retained in initial server-rendered HTML. | `src/components/FAQSection.tsx` | Positive |
| **P1** | **Skip to main content link** | Verified as the first focusable element on the page, visible on keyboard focus with high-contrast spruce styling. | `src/app/layout.tsx` | Positive |
| **P1** | **Mobile nav accessibility** | Accessible hamburger menu toggle with `aria-expanded`, `aria-controls="mobile-nav-menu"`, and Escape key dismissal. All links remain real `<a href>` elements in SSR HTML. | `src/components/Navbar.tsx` | Positive |
| **P1** | **Prefers-reduced-motion** | CSS `@media (prefers-reduced-motion: reduce)` added to eliminate non-essential animations and set instant smooth-scroll behavior. | `src/app/globals.css`, `src/components/Navbar.tsx` | None |
| **P1** | **HTML lang & Viewport zoom** | Verified `<html lang="en">` in `layout.tsx` and viewport meta with `maximumScale: 5` allowing full user zoom. | `src/app/layout.tsx` | None |
| **P2** | **Live calculation as user types** | Debounced live calculation (~150ms) on valid numerical inputs while keeping the "Calculate Pre-Tax Price" submit button fully functional. | `src/components/calculator/BasicTab.tsx` | Positive |
| **P2** | **Copy result & Reset buttons** | Added accessible "Copy Results" button with clipboard feedback and "Reset" button to clear calculator state and announce to assistive tech. | `src/components/calculator/BasicTab.tsx` | None |
| **P2** | **One-line arithmetic verification** | Added exact mathematical proof under results: `Check: $90.91 × 1.10 = $100.00`, calculated dynamically from output values. | `src/components/calculator/BasicTab.tsx` | Positive |
| **P2** | **State dropdown helper note** | Added note: `"Rates shown are combined state + average local rates. Your exact local rate may differ."` below the US state select dropdown. Marked as new text; zero existing text replaced. | `src/components/calculator/BasicTab.tsx` | Positive |
| **P2** | **Table of Contents (Jump Navigation)** | Added `"On this page"` collapsible table of contents near the top of content linking strictly to existing IDs (`#calculator`, `#how-it-works`, `#formula`, `#state-search`, `#faq`, `#embed-widget-section`). | `src/app/(site)/page.tsx` | Positive |
| **P2** | **Single copy edit** | Updated: *"That is the sales tax reverse formula used by accountants, **IRS-compliant bookkeeping systems**, and financial reporting tools worldwide."* ➔ *"That is the sales tax reverse formula used by accountants, **standard accounting practice**, and financial reporting tools worldwide."* | `src/app/(site)/page.tsx` | None |

---

## 3. The One Permitted Copy Edit
Per instructions:
> *"One copy change: find the phrase claiming the formula is used by 'IRS-compliant bookkeeping systems' and change it to 'standard accounting practice'. This is the only existing sentence you may edit. List it in the final report."*

- **Before:** `That is the sales tax reverse formula used by accountants, IRS-compliant bookkeeping systems, and financial reporting tools worldwide.`
- **After:** `That is the sales tax reverse formula used by accountants, standard accounting practice, and financial reporting tools worldwide.`
- **Location:** `src/app/(site)/page.tsx` (Line 474 / Formula section).

---

## 4. Black Circular "N" Badge Report
- **Observation:** The black circular "N" badge visible in screenshots is the default Next.js development-mode indicator (`next dev`).
- **Production Build Verification:** We executed `npm run build && npm run start` and inspected the running production server on port 3000. In production builds, Next.js completely strips the development server indicator. No application code changes were required or added for this.

---

## 5. Items Intentionally Not Done (Out of Scope / SEO Guardrails)
1. **No Ad Scripts or Containers:** No ad tags, ad slots, or advertisement wrappers were created.
2. **No URL / Route Modifications:** Routes, slugs, sitemaps, robots.txt, and canonical URLs remain 100% untouched.
3. **No Heading Restructuring:** Did not add or alter any H1, H2, or H3 headings. The entire 114-heading outline is identical before and after.
4. **No External Analytics:** Zero third-party trackers or external scripts were added; all calculations remain 100% client-side.

---

## 6. Open Questions / Recommendations
- All core requirements, SEO invariants, and WCAG 2.2 AA accessibility standards are fully satisfied with zero blocking regressions.
- No open architectural blockers remain.
