# Site Audit Specification — November 5, 2026

**Target Domain:** `salestaxreversecalculator.com`  
**Date of Audit:** November 5, 2026  
**Auditor:** OpenSEO Site Audit Agent  
**First-Party Data Source:** Google Search Console Search Analytics API (October 6 – November 2, 2026; 81 landing pages, 250+ active query rows)  
**Technical Inspection:** HTTP crawl across 50 pages, Next.js routing inspection, robots.txt, and sitemap validation.

---

## 1. Executive Summary & Core Insights

- **Total State Page Impressions:** 8,000+ monthly impressions currently sitting on Google SERP Page 1 and Page 2.
- **Current Blended CTR:** ~0.15% (critically depressed due to one-way "Reverse Tax" title branding that repels general "sales tax calculator" searchers).
- **Core Strategy:** Standardize high-CTR bidirectional (two-way) title tags and H1 headers following the California pilot model across all 50 US state pages.
- **Cannibalization Fix:** 301-redirect `/faq` and `/how-it-works` to root anchors (`/#faq` and `/#how-it-works`) to consolidate split link equity and GSC impressions back to the homepage.
- **Canadian Traffic Unlock:** Retitle Canadian provincial pages to CRA statutory terminology (GST/HST/QST/ITC) to capture high-intent accounting and business search volume where top-10 positions already exist.
- **Strict SEO Disclaimer & Constraint:** Absolutely zero changes that could negatively affect current organic rankings, indexation, or canonical declarations.

---

## 2. Recommendation 1: Standardize Two-Way Titles Across 50 US State Calculators

### Problem Observed
The state pages already feature active bidirectional calculators in the interface (Add Tax / Remove Tax), but `<title>` and `<h1>` tags are fragmented and predominantly one-way "reverse" focused.
- Connecticut uses: `Connecticut Reverse Sales Tax Calculator (6.35% Rate)` (1,484 imp, 0.3% CTR, pos #10.6)
- New York uses: `NY Sales Tax Calculator (NYC 8.875%)` (2,197 imp, 0.1% CTR, pos #9.2)
- Texas uses: `Texas Reverse Sales Tax Calculator (8.25% Standard Rate)` (834 imp, 0.1% CTR, pos #20.2)
- Utah uses: `Utah Sales Tax Calculator` (759 imp, 0.0% CTR, pos #15.5)
- California pilot: `California Sales Tax Calculator 2026 | Forward & Reverse Tool (7.25% - 10.75%)`

### Target Solution
1. **HTML `<title>` Template:**
   `[State] Sales Tax Calculator 2026: Calculate or Back Out Tax ([Rate]%)`
   *(For 0% states: `[State] Sales Tax Calculator 2026: Calculate or Back Out Tax (0% Tax-Free)`)*
2. **`<h1>` Header Template:**
   `[State] Sales Tax Calculator 2026: Calculate or Back Out Tax`
3. **Meta Description Template:**
   `Free [State] sales tax and reverse tax calculator for 2026. Calculate tax forward on purchases or back out tax from receipts instantly. Includes local city and county rates.`
4. **Scope:** Apply systematically across all 51 US state routes (`src/app/(site)/us/[state]/page.tsx`) and the 7 specialized state component pages (`NewYorkPage.tsx`, `ConnecticutPage.tsx`, `TexasPage.tsx`, `CaliforniaPage.tsx`, `FloridaPage.tsx`, `ArizonaPage.tsx`, `SouthCarolinaPage.tsx`).
5. **Plausible Benefit:** Lift CTR from 0.15% to 1.5%–2.5% across 8,000+ monthly Google Search impressions, generating 120–200 immediate monthly visits without needing external links.

---

## 3. Recommendation 2: 301-Redirect Duplicate /faq and /how-it-works Routes to Root Anchors

### Problem Observed
Both `/faq` (257 impressions, avg pos #9.6) and `/how-it-works` (163 impressions, avg pos #30.0) historically return the full homepage payload under standalone URLs, fragmenting link equity and cannibalizing homepage rankings.

### Target Solution
1. **Server-Side Permanent 301 Redirects:**
   - Next.js permanent redirects in `next.config.ts`: `/faq` -> `/#faq`, `/how-it-works` -> `/#how-it-works`.
   - Edge routing permanent redirects in `vercel.json` to ensure zero cold-start 301 responses.
2. **Internal Link Sanitization:**
   - Update all remaining internal links in `src/app/(site)/contact/page.tsx` and across all components from `/faq` and `/how-it-works` to `/#faq` and `/#how-it-works`.
3. **Canonical Verification:**
   - Ensure homepage canonical strictly declares `https://salestaxreversecalculator.com`.
4. **Plausible Benefit:** Consolidate split link equity and GSC impressions back to the homepage, pushing primary informational keywords from page 2 into the top 5.

---

## 4. Recommendation 3: Align Canadian Provincial Pages with CRA HST/GST Terminology

### Problem Observed
Canadian provincial hubs rank in top-10 positions on Page 1 for reverse tax queries in Canada (Quebec avg pos #7.2, Nova Scotia pos #8.4, British Columbia pos #8.1), but received 0 clicks over 30 days because Canadians search for CRA terms ("HST calculator", "GST reverse calculator", "ITC receipt deduction", "QST TVQ") rather than generic US "sales tax".

### Target Solution
1. **Retitle Provincial Hubs with CRA Terminology:**
   - HST Provinces (ON, NS, NB, NL, PE): `[Province] Reverse HST Calculator 2026: Back Out [Rate]% Tax`
   - Quebec: `Quebec Reverse GST & QST (TVQ) Calculator 2026: Back Out 14.975% Tax`
   - GST+PST Provinces (BC, SK, MB): `[Province] Reverse GST/PST Calculator 2026: Back Out [Rate]% Tax`
   - GST Territories/Provinces (AB, NT, NU, YT): `[Province] Reverse GST Calculator 2026: Back Out 5% Tax`
2. **`<h1>` Header Alignment:**
   - Update hero `<h1>` across all 13 Canadian provinces to reflect statutory CRA tax nomenclature.
3. **Meta Description:**
   - Align meta description with CRA Input Tax Credit (ITC) reconciliation and receipt extraction.
4. **Dedicated Input Tax Credit (ITC) Section:**
   - Add an explicit, authoritative section on Canadian pages addressing CRA Form GST34 reconciliation, commercial eligibility, math formulas, and invoice documentation rules for GST/HST registrants.
5. **Plausible Benefit:** Immediately unlocks high-intent Canadian traffic where pages already possess top-10 ranking authority.
