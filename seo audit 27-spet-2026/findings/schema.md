# Schema & Structured Data Findings: salestaxreversecalculator.com

**Audit Date**: September 2026  
**Audited URL**: https://salestaxreversecalculator.com/  
**Category Score**: 88 / 100  
**Status**: Comprehensive Schema Graph; Minor Cleanups & Enhancements Needed  

---

## 1. Executive Summary

`salestaxreversecalculator.com` features a robust, multi-entity Schema.org JSON-LD architecture. The implementation includes `Organization`, `WebSite` (with Sitelinks Searchbox), `WebApplication`, `FAQPage`, `BreadcrumbList`, and `HowTo` markup. Syntactically, all JSON-LD blocks are error-free and parse cleanly in Google Rich Results tests. Minor issues include a redundant single-item breadcrumb on the root domain and missing sub-properties on `WebApplication`.

---

## 2. Inventory of Implemented Schema Types

| Schema Type | Pages Implemented | Key Properties | Status |
|---|---|---|---|
| **WebSite** | Homepage | `name`, `url`, `publisher`, `potentialAction` (`SearchAction`) | Valid |
| **WebApplication** | Homepage, State pages, VAT pages | `name`, `applicationCategory` ("FinanceApplication"), `offers`, `areaServed` (`State`) | Valid |
| **FAQPage** | Homepage, State pages, FAQ page | `mainEntity` with questions & answers | Valid |
| **HowTo** | `/how-it-works` | `name`, `step` (5 sequential steps) | Valid |
| **BreadcrumbList** | All pages | `itemListElement` with `ListItem` positions | Valid (minor root issue) |
| **Organization** | All pages | `name`, `url`, `logo`, `contactPoint` | Valid |

---

## 3. Specific Findings & Recommendations

### Finding 1: Redundant 1-Item Breadcrumb on Root Homepage
- **Observed Markup**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Reverse Sales Tax Calculator",
        "item": "https://salestaxreversecalculator.com"
      }
    ]
  }
  ```
- **Issue**: Google documentation indicates breadcrumb rich snippets require hierarchical traversal (at least 2 levels, e.g. Home > Category > Page). A single-node breadcrumb pointing to the same page is redundant and can generate warnings in Google Search Console.
- **Recommendation**:
  Remove `BreadcrumbList` from the root homepage (`/`), while maintaining multi-level breadcrumbs on subpages (e.g. `Home > US States > California`).

---

### Finding 2: WebApplication Property Enrichment
- **Current State**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reverse Sales Tax Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  }
  ```
- **Enhancement Opportunity**:
  Add `applicationSubCategory`, `softwareVersion`, and `inLanguage`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reverse Sales Tax Calculator",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Sales Tax Calculation & Accounting",
    "softwareVersion": "2.4.0",
    "inLanguage": "en",
    "operatingSystem": "All modern browsers (Desktop & Mobile)",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  ```

---

### Finding 3: Organization Schema Professionalization
- **Current State**: Uses `@gmail.com` contact email.
- **Recommendation**: Update to domain-matched email:
  ```json
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@salestaxreversecalculator.com",
    "contactType": "customer service",
    "url": "https://salestaxreversecalculator.com/contact"
  }
  ```
