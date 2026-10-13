# Schema Markup, Entity Architecture & YMYL E-E-A-T Audit

## 1. Existing Structured Data Inventory

Inspection of the homepage JSON-LD blocks reveals an advanced multi-schema structure:

1. **`Organization`**: Declares name (`PreTaxPrice`), website URL, and logo image.
2. **`WebSite`**: Declares search action with query template (`/tax-rates?s={search_term_string}`).
3. **`WebApplication`**:
   - `applicationCategory`: `FinanceApplication`
   - `applicationSubCategory`: `Sales Tax Calculation & Accounting`
   - `operatingSystem`: `All modern browsers (Desktop & Mobile)`
   - `offers`: Free (`price: 0`)
   - `featureList`: 7 detailed utility features.
4. **`FAQPage`**: 6 comprehensive questions and answers covering reverse sales tax definition, formulas, division vs subtraction logic, zero-tax states, and Canada/EU compatibility.
5. **`ImageObject`**: Declares formula infographic diagram with descriptive caption.

---

## 2. Critical Missing Opportunities for #1 Ranking

### 1. `HowTo` Schema (Rich Result Snippet Driver)
Competitors currently winning the Google featured snippet and visual step pack for queries like *"how to calculate reverse sales tax"* or *"how to back out sales tax from total"* use `HowTo` schema.

**Recommended Implementation to Add**:
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Reverse Sales Tax (Back Out Tax from Total)",
  "description": "Step-by-step mathematical guide to reverse-calculate the pre-tax price from any sales-tax inclusive receipt or invoice total.",
  "image": "https://salestaxreversecalculator.com/images/reverse-sales-tax-formula-diagram.jpg",
  "totalTime": "PT1M",
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Reverse Sales Tax Calculator"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Identify Total Price and Tax Rate",
      "text": "Locate the gross receipt total paid and find the local sales tax rate applicable to your purchase (e.g., $107.50 at 7.5% tax).",
      "url": "https://salestaxreversecalculator.com/#calculator"
    },
    {
      "@type": "HowToStep",
      "name": "Convert Tax Rate to Decimal and Add 1",
      "text": "Divide the tax rate percentage by 100 to convert to a decimal, then add 1. For example, 7.5% becomes 0.075, and adding 1 gives 1.075.",
      "url": "https://salestaxreversecalculator.com/#formula"
    },
    {
      "@type": "HowToStep",
      "name": "Divide Total Price by Tax Divisor",
      "text": "Divide the total receipt amount by the divisor: $107.50 / 1.075 = $100.00 original pre-tax price. The sales tax paid is $107.50 - $100.00 = $7.50.",
      "url": "https://salestaxreversecalculator.com/#calculator"
    }
  ]
}
```

---

## 3. Financial YMYL & E-E-A-T Vulnerabilities

Tax calculations are classified under Google's **Your Money Your Life (YMYL)** guidelines:
- **Missing Authoritative Reviewer**: The site currently lacks an author or reviewer entity.
- **Gmail Contact Address**: The contact email is listed as `salestaxreversecalculator@gmail.com`.
- **Recommendation**:
  - Add an "Editorial & Accuracy Policy" section.
  - Add an author/reviewer bio: *"Tax methodology reviewed by [Name], Certified Public Accountant (CPA) / Enrolled Agent"*.
  - Add `Person` schema linked via `reviewedBy` on the `WebApplication` and `HowTo` schema blocks.
  - Setup a domain-branded email (`support@salestaxreversecalculator.com` or `tax@salestaxreversecalculator.com`) to establish institutional credibility.
