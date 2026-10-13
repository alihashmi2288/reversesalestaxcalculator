# Content Quality & Programmatic Scaled Duplication Audit

## 1. Overview & Analysis

The website presents a contrast in content quality:
- **Homepage (`/`)**: Exceptional depth at **6,687 words**. It provides a comprehensive mathematical breakdown, worked examples, city tax comparison tables, business use cases (freelancers, e-commerce, restaurants), and an FAQ section.
- **New York State Page (`/us/new-york`)**: Outstanding overhaul at **2,408 words** with 11 structured H2 headings covering NYC local 8.875% tax, MTA transit surtaxes, clothing & footwear exemptions under $110, county tax comparisons, and specific worked receipt examples.
- **Remaining 49 State Pages (`/us/[state]`)**: Programmatic boilerplate of **~910 words** each, repeating identical phrasing with string substitution for state names.

---

## 2. The Scaled Content Trap: Forensic Proof

An analysis of text similarity across state templates demonstrates that 49 state pages share **85%+ identical boilerplate text**:

### Section: "When to Use This Calculator in [State]"
- **California**:  
  > *"Decoding Business Receipts in California: For freelancers and small business owners operating in California, separating the true cost of an item from the sales tax paid is critical for accurate bookkeeping. If you lost an itemized receipt but have the bank statement total..."*
- **Texas**:  
  > *"Decoding Business Receipts in Texas: For freelancers and small business owners operating in Texas, separating the true cost of an item from the sales tax paid is critical for accurate bookkeeping. If you lost an itemized receipt but have the bank statement total..."*
- **Florida**:  
  > *"Decoding Business Receipts in Florida: For freelancers and small business owners operating in Florida, separating the true cost of an item from the sales tax paid is critical for accurate bookkeeping. If you lost an itemized receipt but have the bank statement total..."*

### Section: "Frequently Asked Questions: [State] Taxes"
Each state page repeats identical generic FAQs:
1. *"How do I back out sales tax from a total in [State]?"*
2. *"Can I use this calculator for [State] local sales taxes?"*
3. *"Why can't I just subtract [Rate]% from my total?"*

### Why This Triggers Google's Quality Demotion
In 2026, Google's Helpful Content and Scaled Content Abuse policies strictly penalize programmatic page generation where pages do not offer unique, substantive value beyond what could be calculated with a simple tool. When 49 pages are essentially identical duplicates, the entire domain's quality score is lowered, causing even high-quality pages like the Homepage to drop in search rankings.

---

## 3. Brand Identity Inconsistency: "PreTaxPrice" vs Domain

- The domain is registered as `salestaxreversecalculator.com`.
- However, throughout the page headers, navigation, title tags (`About PreTaxPrice`, `Privacy Policy: PreTaxPrice`), and JSON-LD schema, the site identifies itself as `PreTaxPrice`.
- **Impact**:
  - Google's Knowledge Graph cannot establish a clear entity correlation between the domain `salestaxreversecalculator.com` and the brand `PreTaxPrice`.
  - Backlinks and brand searches targeting "Reverse Sales Tax Calculator" are disconnected from the brand name.
- **Remediation**:
  - Standardize to: `"Reverse Sales Tax Calculator by PreTaxPrice"` across Schema, OpenGraph, navigation, and footer.

---

## 4. Thin Content & Cannibalization: `/how-it-works` & `/faq`

- **`/how-it-works`**: Only **391 words**. It simply repeats the 3 steps of the calculator already detailed on the homepage. GSC shows it cannibalizes the homepage for queries like `"back out tax calculator"`.
- **`/faq`**: **2,576 words** of FAQs, but the homepage already contains the core FAQ section and FAQPage schema.
- **Action Plan**:
  - Issue a **301 permanent redirect** from `/how-it-works` to `https://salestaxreversecalculator.com/#how-it-works`.
  - Issue a **301 permanent redirect** from `/faq` to `https://salestaxreversecalculator.com/#faq`.
  - This immediately consolidates all internal link juice, topical relevance, and ranking signals directly onto the homepage.
