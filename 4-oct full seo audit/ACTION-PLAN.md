# Prioritized Action Plan to Reach Rank #1

This action plan provides a step-by-step roadmap for lifting Google's algorithmic quality dampener, consolidating ranking signals, and driving `salestaxreversecalculator.com` to **Rank #1** for `"reverse sales tax calculator"`.

---

## Priority Matrix

| Priority | Impact | Effort | Timeline | Key Objectives |
|---|---|---|---|---|
| **Critical** | Massive | Low | Days 1–3 | 301 redirect cannibalized routes (`/how-it-works`, `/faq`), unify brand entity |
| **High** | High | Medium | Weeks 1–2 | Add `HowTo` schema, rewrite Top 10 State pages to remove scaled boilerplate |
| **Medium** | High | Medium | Month 2 | YMYL E-E-A-T CPA review, backlink outreach, embed widget |
| **Low** | Medium | Low | Ongoing | Image WebP conversion, trailing slash clean-up, city-level page expansion |

---

## Phase 1: Critical Fixes & Cannibalization Elimination (Days 1–3)

### Task 1.1: 301 Redirect `/how-it-works` & `/faq`
- **Problem**: `/how-it-works` (391 words) and `/faq` (2,576 words) compete with the homepage for the exact same keywords, splitting equity.
- **Implementation in `next.config.js`**:
  ```javascript
  module.exports = {
    async redirects() {
      return [
        {
          source: '/how-it-works',
          destination: '/#how-it-works',
          permanent: true,
        },
        {
          source: '/faq',
          destination: '/#faq',
          permanent: true,
        },
      ];
    },
  };
  ```

### Task 1.2: Fix New York State H1 Tag
- **File**: `app/us/new-york/page.tsx`
- **Change**:
  ```diff
  - <h1>New York Sales Tax Calculator</h1>
  + <h1>New York Reverse Sales Tax Calculator (NYC 8.875%)</h1>
  ```

### Task 1.3: Align Brand Entity & Schema
- Update the navigation logo text and Schema `Organization` / `WebApplication` publisher fields:
  ```json
  "publisher": {
    "@type": "Organization",
    "name": "Reverse Sales Tax Calculator",
    "alternateName": "PreTaxPrice",
    "url": "https://salestaxreversecalculator.com"
  }
  ```

---

## Phase 2: High-Impact Improvements (Weeks 1–3)

### Task 2.1: Add `HowTo` Schema to Homepage
- **File**: `app/page.tsx`
- Add the following JSON-LD block:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Reverse Sales Tax",
    "description": "Calculate the original pre-tax price from any sales tax-inclusive receipt or total.",
    "image": "https://salestaxreversecalculator.com/images/reverse-sales-tax-formula-diagram.jpg",
    "totalTime": "PT1M",
    "tool": [{ "@type": "HowToTool", "name": "Reverse Sales Tax Calculator" }],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Note the Total and Tax Rate",
        "text": "Find the total amount paid on your receipt and the applicable state/local tax rate.",
        "url": "https://salestaxreversecalculator.com/#calculator"
      },
      {
        "@type": "HowToStep",
        "name": "Convert Tax Rate to Decimal Divisor",
        "text": "Divide the tax rate by 100 and add 1 (e.g., 7.5% becomes 1.075).",
        "url": "https://salestaxreversecalculator.com/#formula"
      },
      {
        "@type": "HowToStep",
        "name": "Divide Total by Divisor",
        "text": "Divide the total receipt price by the divisor: Total / (1 + Rate/100) = Pre-Tax Price.",
        "url": "https://salestaxreversecalculator.com/#calculator"
      }
    ]
  }
  </script>
  ```

### Task 2.2: Rewrite Top 10 State Pages (De-Boilerplating)
Follow the New York model to create substantive, unique state pages for:
1. **California (`/us/california`)** - CDTFA regulations, district tax ranges (7.25% to 10.75%), grocery exemptions.
2. **Texas (`/us/texas`)** - 6.25% base + 2.0% local maximum, transit authorities, resale certificates.
3. **Florida (`/us/florida`)** - 6.0% base + county discretionary surtaxes (up to 8.0%), commercial lease tax rules.
4. **Pennsylvania (`/us/pennsylvania`)** - 6% state + 1% Allegheny / 2% Philadelphia, clothing exemption.
5. **Illinois (`/us/illinois`)** - Complex municipal Retailers' Occupation Tax (ROT), Chicago 10.25% rate.
6. **Ohio, Georgia, North Carolina, Michigan, New Jersey**.

---

## Phase 3: Authority & Trust Building (Month 2)

### Task 3.1: YMYL Financial E-E-A-T Enhancement
- Add a "Reviewed by a Tax Specialist" badge above the calculator.
- Include a reviewer card:
  - *"Formulas and tax rates verified for 2026 compliance by [Name], CPA / Tax Professional."*
- Add `Person` schema with `@type: Person`, `jobTitle: Certified Public Accountant`.

### Task 3.2: Embeddable Calculator Widget (Backlink Magnet)
- Create a lightweight embed route (`/embed`) that webmasters and financial bloggers can paste onto their sites:
  ```html
  <iframe src="https://salestaxreversecalculator.com/embed" width="100%" height="480" frameborder="0"></iframe>
  <p><small>Powered by <a href="https://salestaxreversecalculator.com/" target="_blank">Reverse Sales Tax Calculator</a></small></p>
  ```
- Reach out to small business bookkeeping blogs, Etsy seller forums, and freelance financial tool directories.

---

## Phase 4: Long-Term Dominance & City Expansion (Month 3+)

### Task 4.1: Launch High-Intent US City Pages
Expand programmatic authority to city-level search queries where users search for specific local rates:
- `/us/california/los-angeles` (9.50%)
- `/us/california/san-francisco` (8.625%)
- `/us/illinois/chicago` (10.25%)
- `/us/texas/houston` (8.25%)
- `/us/texas/austin` (8.25%)

### Task 4.2: Enable Markdown Content Negotiation for AI Agents
- Add Next.js middleware to serve raw markdown (`llms-full.txt`) when incoming request includes `Accept: text/markdown` or comes from ChatGPT Search / Perplexity user-agents.
