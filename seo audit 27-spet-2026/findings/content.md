# Content Quality & E-E-A-T Findings: salestaxreversecalculator.com

**Audit Date**: September 2026  
**Audited URL**: https://salestaxreversecalculator.com/  
**Category Score**: 84 / 100  
**Status**: High Quality Core Content; State Boilerplate & E-E-A-T Trust Signals Require Upgrades  

---

## 1. Executive Summary

The homepage features exceptional educational depth: 7,650+ words of meticulously structured explanations covering reverse tax calculations, algebraic proofs, worked step-by-step examples, code implementations (JavaScript & Python), accounting spreadsheet formulas (Excel/Google Sheets), and common pitfalls. Machine evaluation via `content_quality.py` scored the homepage at **91/100** with **0 detected AI filler phrases** and a **1.0 information density**.

However, because financial calculations fall directly into Google's **Your Money or Your Life (YMYL)** taxonomy, the site's reliance on a generic Gmail contact address, anonymous publisher persona ("PreTaxPrice"), and lack of CPA-reviewed credentialing present vulnerabilities under Google Quality Rater Guidelines. Furthermore, the 50 state pages rely on repetitive programmatic templating without state-level primary source citations.

---

## 2. Quantitative Quality Analysis

Results from Claude SEO QRG-Aligned Content Scorer (`content_quality.py`):
```json
{
  "filler_score": 0,
  "ai_pattern_score": 0,
  "information_density": 1.0,
  "repetition_score": 57,
  "overall_quality": 91,
  "flags": ["repetitive"],
  "tokens": 33496,
  "unique_tokens": 1898
}
```

- **Information Density**: 1.0 (Maximum score — dense educational copy).
- **Filler Score**: 0 (Clean, direct mathematical and procedural explanations).
- **Repetition Flag (57)**: Triggered because rate tables and formula references recur throughout multiple comparison sections. This is natural for a reference manual, but highlights the need for modular layouts.

---

## 3. E-E-A-T & Trust Assessment

### 1. Experience & Expertise (Score: Moderate)
- **Positive**: The mathematical explanation of the "subtracting error" ($107.50 at 7.5% is $100.00 pre-tax, NOT $99.44) demonstrates genuine financial domain competence.
- **Vulnerability**: No named author or credentials. Under Google's March 2024 Core Update and Helpfulness standards, finance/tax tools need demonstrable human oversight.
- **Action**: Add an **"Editorial & Tax Advisory Board"** or note: *"Reviewed by [Name], CPA / Enrolled Agent with 10+ years in state tax compliance"*.

### 2. Authoritativeness & Citations (Score: High on Root, Low on States)
- **Homepage Citations**: Links out directly to authoritative bodies:
  - Internal Revenue Service (IRS) — Sales Tax Deduction
  - Tax Foundation — State and Local Sales Tax Rates
  - Sales Tax Institute — Industry Guidelines
  - Canada Revenue Agency (CRA) — GST/HST Guidance
  - OECD — Consumption Tax Trends
  - Tax Policy Center — State and Local Data
- **State Pages Vulnerability**:
  While the homepage cites federal and international bodies, the 50 state pages have **zero outbound links to state departments of taxation**:
  - California page missing CDTFA link (California Department of Tax and Fee Administration).
  - Texas page missing Texas Comptroller link.
  - New York page missing NYS Dept of Taxation and Finance link.
  - Florida page missing Florida Dept of Revenue link.
- **Action**: Add a standardized *"Official State Tax Resources"* section on all 50 state pages linking to the corresponding state government revenue department.

### 3. Trustworthiness & Transparency (Score: Needs Immediate Action)
- **Contact Channel**: The footer and Organization schema list:
  ```json
  "email": "salestaxreversecalculator@gmail.com"
  ```
  Using a free `@gmail.com` address rather than a domain-level address (`support@salestaxreversecalculator.com`) degrades perceived authority for accounting and corporate users.
- **Physical / Entity Identity**: The site does not declare a registered corporate entity or physical operating jurisdiction.
- **Action**:
  1. Transition to `support@salestaxreversecalculator.com` or `tax@salestaxreversecalculator.com`.
  2. Add a clear disclaimer on all calculator pages: *"Disclaimer: This calculator is provided for informational and preliminary estimation purposes. For complex multi-jurisdictional tax remittance and nexus compliance, consult a licensed CPA or tax professional."*
