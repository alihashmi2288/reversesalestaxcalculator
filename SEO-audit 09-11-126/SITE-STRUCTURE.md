# Site Architecture & URL Hierarchy Design: salestaxreversecalculator.com

**Target Domain:** https://salestaxreversecalculator.com/  
**Architecture Model:** Hub-and-Spoke Semantic Siloing  
**Design Date:** November 9, 2026

---

## 1. Architectural Diagnosis & Baseline Assessment

### Current Structure (79 URLs)
The existing site features a clean programmatic architecture but exhibits two critical structural vulnerabilities:
1. **Severe Internal Link Orphanage:** 9 Canadian provincial pages exist in `sitemap.xml` with **0 internal inlinks**.
2. **Missing Inter-State Semantic Connections:** State pages act as isolated leaves without lateral cross-links to bordering jurisdictions or tax-free neighbor comparisons.

```
                           CURRENT SITE STRUCTURE (FLAT)
                                       / (Home)
                  ┌──────────────────────┼──────────────────────┐
                  │                      │                      │
             /tax-rates               /canada            /vat-calculator
                  │                      │                      │
             (No links)           [4 provinces linked]     [7 countries]
                                  [9 provinces ORPHANED!]
                                         │
                                       /us/
                            ┌────────────┴────────────┐
                      /us/alabama  ...  /us/wyoming (50 isolated pages)
```

---

## 2. Proposed Hub-and-Spoke Target Architecture

To maximize crawl efficiency, semantic topical authority, and internal PageRank flow, the site is structured into **5 distinct thematic silos**:

```
                              TARGET SILO ARCHITECTURE
                                       / (Home)
           ┌──────────────┬──────────────┼──────────────┬──────────────┐
           │              │              │              │              │
      [US Hub]       [Canada Hub]    [VAT Hub]     [Guides Hub]   [Company]
        /us/           /canada       /vat-calculator  /guides/      /about
           │              │              │              │           /contact
     ┌─────┴─────┐  ┌─────┴─────┐  ┌─────┴─────┐  ┌─────┴─────┐     /privacy
     │ 50 States │  │ 13 Provs  │  │ 8 Country │  │ Excel/GSh │     /terms
     │ + DC      │  │ (100% In) │  │ Calculators│ │ Bookkeeper│
     └─────┬─────┘  └───────────┘  └───────────┘  │ Nexus 2026│
           │                                      └───────────┘
     [Top Metro Surtax Sub-Sections]
     (NYC 8.875%, LA 9.5%, Chicago 10.25%, Houston 8.25%)
```

---

## 3. URL Hierarchy & Folder Taxonomies

### Core Calculators & Tools
* `/`: Main Reverse Sales Tax Calculator (Global default, US focus)
* `/tax-rates`: Master 2026 State & Local Sales Tax Rates Directory
* `/formula`: Mathematical Reverse Sales Tax Proofs, Derivations & Divisors

### US State Hub & Jurisdiction Spokes (`/us/`)
Every state page maintains an identical clean slug structure:
* `https://salestaxreversecalculator.com/us/[state-slug]`
  * `/us/california` (8.85% avg combined)
  * `/us/new-york` (8.52% avg / 8.875% NYC)
  * `/us/texas` (8.20% avg combined)
  * `/us/florida` (7.02% avg combined)
  * ... (All 50 states + Washington D.C.)

#### Metro High-Intent Landing Modules (In-Page Anchor Siloing)
Rather than splitting link equity across hundreds of thin municipal pages, integrate high-volume metropolitan surtaxes directly into the state pillar via clear semantic sub-anchors:
* `/us/new-york#nyc-sales-tax` (8.875%)
* `/us/california#los-angeles` (9.50%)
* `/us/illinois#chicago-cook-county` (10.25%)
* `/us/texas#houston-harris-county` (8.25%)

### Canadian Provincial Hub & Spokes (`/canada`)
* `/canada`: Canadian Reverse GST/HST/PST Hub Calculator
* Spokes (13 complete provinces and territories):
  * `/canada/ontario` (13% HST)
  * `/canada/quebec` (14.975% GST + QST)
  * `/canada/british-columbia` (12% GST + PST)
  * `/canada/alberta` (5% GST - No provincial tax)
  * `/canada/manitoba` (12% GST + PST) — **Orphan Resolved**
  * `/canada/saskatchewan` (11% GST + PST) — **Orphan Resolved**
  * `/canada/nova-scotia` (15% HST) — **Orphan Resolved**
  * `/canada/new-brunswick` (15% HST) — **Orphan Resolved**
  * `/canada/newfoundland` (15% HST) — **Orphan Resolved**
  * `/canada/pei` (15% HST) — **Orphan Resolved**
  * `/canada/northwest-territories` (5% GST) — **Orphan Resolved**
  * `/canada/nunavut` (5% GST) — **Orphan Resolved**
  * `/canada/yukon` (5% GST) — **Orphan Resolved**

### International VAT Hub & Spokes (`/vat-calculator`)
* `/vat-calculator`: Global Value-Added Tax Reverse Calculator
* Spokes:
  * `/vat-calculator/united-kingdom` (20% Standard, 5% Reduced)
  * `/vat-calculator/germany` (19% Standard, 7% Reduced)
  * `/vat-calculator/france` (20% Standard, 10% / 5.5% Reduced)
  * `/vat-calculator/italy` (22% Standard, 10% / 5% Reduced)
  * `/vat-calculator/spain` (21% Standard, 10% / 4% Reduced)
  * `/vat-calculator/australia` (10% GST)
  * `/vat-calculator/new-zealand` (15% GST)

### New Content & Resource Silo (`/guides/`)
* `/guides/reverse-sales-tax-excel-google-sheets`: Formulas, templates & workbook downloads
* `/guides/receipt-sales-tax-bookkeeping-guide`: Expense report calculations without receipts
* `/guides/sales-tax-holidays-2026`: State-by-state exemption calendar
* `/guides/economic-nexus-state-guide-2026`: Revenue & transaction thresholds for e-commerce

---

## 4. Internal Linking Strategy & Equity Distribution

Internal linking is engineered to pass maximum authority from high-traffic hubs into long-tail spokes:

### 1. Global Header Navigation
* **Logo:** `https://salestaxreversecalculator.com/`
* **Nav Links:**
  * `US States` (Dropdown containing 50 states grouped by region: Northeast, South, Midwest, West)
  * `Canada (GST/HST)` (`/canada`)
  * `VAT Calculator` (`/vat-calculator`)
  * `Tax Rates 2026` (`/tax-rates`)
  * `Guides` (`/guides/`)

### 2. The /canada Province Grid (Orphan Fix)
Replace the existing 4-card list with a full, responsive 13-province interactive grid:
* Every card includes:
  * Province Name & Flag icon
  * Combined Tax Rate (e.g., *"15% HST"*, *"5% GST"*)
  * Direct descriptive anchor link: `[Province] Reverse Tax Calculator`

### 3. Lateral Inter-State Cross-Linking (Border State Clusters)
Every US state page will include a "Neighboring State Tax Comparisons" widget:
* *Example on `/us/new-york`:*
  * New Jersey (`/us/new-jersey` — 6.625%)
  * Connecticut (`/us/connecticut` — 6.35%)
  * Pennsylvania (`/us/pennsylvania` — 6.00%)
  * Massachusetts (`/us/massachusetts` — 6.25%)
* *Example on `/us/washington` (No state income tax, 6.5% base sales tax):*
  * Links directly to Oregon (`/us/oregon` — 0% sales tax comparison)

### 4. Semantic Breadcrumbs Across All 79 URLs
All pages adhere to the three-tier breadcrumb pattern matching Schema.org `BreadcrumbList`:
* `Home > US Sales Tax > California Reverse Sales Tax Calculator`
* `Home > Canada Sales Tax > Ontario HST Calculator`
* `Home > VAT Calculator > United Kingdom VAT Calculator`

---

## 5. XML Sitemap Architecture & Quality Gates

To support Googlebot crawl prioritization, transition from a monolithic sitemap to a categorized sitemap index:

```xml
<!-- https://salestaxreversecalculator.com/sitemap.xml -->
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://salestaxreversecalculator.com/sitemaps/sitemap-core.xml</loc>
    <lastmod>2026-11-09T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://salestaxreversecalculator.com/sitemaps/sitemap-us-states.xml</loc>
    <lastmod>2026-11-09T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://salestaxreversecalculator.com/sitemaps/sitemap-canada.xml</loc>
    <lastmod>2026-11-09T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://salestaxreversecalculator.com/sitemaps/sitemap-vat.xml</loc>
    <lastmod>2026-11-09T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://salestaxreversecalculator.com/sitemaps/sitemap-guides.xml</loc>
    <lastmod>2026-11-09T00:00:00Z</lastmod>
  </sitemap>
</sitemapindex>
```

### Sitemap Quality Gates
* **Status Code Check:** 100% of URLs in sitemaps must return HTTP 200 OK (no redirects, no 404s).
* **Canonical Match:** Sitemaps only contain the exact canonical URL.
* **No Fragment URLs:** URLs containing `#` are strictly prohibited in XML sitemaps.
* **Dynamic Lastmod:** Update `<lastmod>` only when content or tax rates change.
