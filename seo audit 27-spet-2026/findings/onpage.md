# On-Page SEO Findings: salestaxreversecalculator.com

**Audit Date**: September 2026  
**Audited URL**: https://salestaxreversecalculator.com/  
**Category Score**: 72 / 100  
**Status**: Critical Fixes Required for Headings & Title Tags  

---

## 1. Executive Summary

While the site features rich informative content and clear conversion elements, several critical formatting and metadata bugs impair on-page SEO. Most notably, an H1 spacing bug is merging words into concatenated strings in the DOM (e.g. `Reverse Sales TaxCalculator`), title tags repeat the brand name unnecessarily causing severe pixel truncation, and secondary sidebar components use H2/H3 tags that pollute document semantic hierarchy.

---

## 2. Detailed On-Page Findings

### Finding 1: H1 Heading Text Concatenation Bug
- **Severity**: Critical
- **Observed Bug**:
  In the browser DOM and accessibility tree, H1 elements have missing whitespace between styled spans or line breaks:
  - Homepage: `Reverse Sales TaxCalculator` (renders as one word without space)
  - California page: `CaliforniaReverse SalesTax Calculator`
  - Texas page: `TexasReverse SalesTax Calculator`
  - New York page: `New YorkReverse SalesTax Calculator`
  - Ontario page: `OntarioReverse SalesTax Calculator`
  - UK page: `United KingdomReverse VATCalculator`
- **Root Cause**:
  In Next.js JSX templates, the H1 is structured as:
  ```html
  <h1>Reverse Sales Tax<br><span style="...">Calculator</span></h1>
  ```
  or:
  ```html
  <h1>California<br><span>Reverse Sales Tax Calculator</span></h1>
  ```
  When screen readers, Googlebot text extractors, or headless browsers parse the text nodes without CSS line-break styling, adjacent characters collide without a space delimiter (`Tax` + `Calculator` -> `TaxCalculator`).
- **Fix**:
  Ensure a explicit whitespace exists in the template:
  ```html
  <h1>Reverse Sales Tax <span class="highlight">Calculator</span></h1>
  ```
  and for state pages:
  ```html
  <h1>California Reverse Sales Tax Calculator</h1>
  ```

---

### Finding 2: Title Tag Duplication & Length Truncation
- **Severity**: High
- **Analysis**:
  Google displays approximately 50-60 characters (or ~600px width) before truncating with an ellipsis (`...`).
- **Current Titles vs Recommended**:

| Page | Current Title (Chars) | Status | Recommended Replacement (Chars) |
|---|---|---|---|
| **Homepage** | `Reverse Sales Tax Calculator: Find Your Pre-Tax Price Free \| Reverse Sales Tax Calculator` (89 chars) | ❌ Severely truncated & duplicate brand | `Reverse Sales Tax Calculator: Find Pre-Tax Price Free` (52 chars) |
| **New York** | `New York Reverse Sales Tax Calculator: NYC 8.875% and NY 8.66% \| Reverse Sales Tax Calculator` (93 chars) | ❌ Truncated | `New York Reverse Sales Tax Calculator (NYC & State)` (51 chars) |
| **Texas** | `Texas Reverse Sales Tax Calculator: 8.24% Combined Rate \| Reverse Sales Tax Calculator` (86 chars) | ❌ Truncated | `Texas Reverse Sales Tax Calculator (8.24% Rate)` (47 chars) |
| **California** | `California Reverse Sales Tax Calculator: 9.21% Rate \| Reverse Sales Tax Calculator` (82 chars) | ❌ Truncated | `California Reverse Sales Tax Calculator (9.21% Rate)` (52 chars) |
| **Canada** | `Canada Reverse Tax Calculator: GST HST PST by Province 2026 \| Reverse Sales Tax Calculator` (90 chars) | ❌ Truncated | `Canada Reverse Tax Calculator: GST, HST & PST (2026)` (52 chars) |
| **VAT Hub** | `Reverse VAT Calculator: Remove VAT from Any Price (UK, EU, AU) \| Reverse Sales Tax Calculator` (93 chars) | ❌ Truncated | `Reverse VAT Calculator: Remove VAT (UK, EU, AU)` (47 chars) |

---

### Finding 3: Meta Description Over-Length
- **Severity**: Medium
- **Analysis**:
  Google typically truncates snippets exceeding 155-160 characters on desktop and 120 characters on mobile.
  - **Homepage**: 172 characters (*"Free reverse sales tax calculator. Enter any receipt total and find the original pre-tax price instantly. Works for all 50 US states, Canada GST/HST, and EU VAT. No signup."*)
  - **Texas**: 180 characters (*"Free Texas reverse sales tax calculator. Pre-filled with Texas's 6.25% state rate and 8.24% combined average rate. Find the original pre-tax price from any Texas receipt instantly."*)
  - **New York**: 170 characters
  - **Canada**: 170 characters
- **Recommendation**:
  Condense meta descriptions to 140-155 characters with a clear user value proposition:
  > *Example for Homepage (145 chars)*:  
  > "Free reverse sales tax calculator. Find the pre-tax price from any receipt total instantly. Supports all 50 US states, Canada GST/HST, and VAT."

---

### Finding 4: Heading Hierarchy Dilution
- **Severity**: Medium
- **Analysis**:
  The homepage contains 28 `<h2>` tags and 48 `<h3>` tags. Crucially, secondary components and sidebar items use high-level semantic heading tags:
  - `<h2>Embed Reverse Tax Calculator on your site.</h2>` (appears above the main guide)
  - `<h2>Popular States</h2>` (sidebar navigation)
  - `<h2>Quick Reference Tips</h2>` (sidebar widget)
  - `<h2>Why Use PreTaxPrice?</h2>` (sidebar callout)
  - `<h3>Calculators</h3>`, `<h3>Resources</h3>`, `<h3>Legal</h3>` (footer navigation)
- **Recommendation**:
  Convert sidebar widgets and navigation lists to `<div class="sidebar-heading">` or `<p class="title-sub">`. Reserve `<h2>` strictly for the primary topical sections of the page.
