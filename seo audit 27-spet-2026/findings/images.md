# Image & Visual SEO Findings: salestaxreversecalculator.com

**Audit Date**: September 2026  
**Audited URL**: https://salestaxreversecalculator.com/  
**Category Score**: 60 / 100  
**Status**: Critical Missed Traffic Opportunity: 0 Indexable Images Across Site  

---

## 1. Executive Summary

Every sampled page across `salestaxreversecalculator.com` contains **exactly zero `<img>` tags**. All interface visual elements are implemented via CSS borders, gradients, and inline SVGs.

While this approach prevents image-induced CLS (Cumulative Layout Shift) and minimizes network image downloads, it creates a **100% blind spot in Google Image Search**, image carousels, and visual SERP packs. In high-intent educational search queries (e.g. *"reverse sales tax formula chart"*, *"sales tax map 2026"*, *"sales tax vs vat diagram"*), Google frequently displays prominent visual image carousels at position 0.

---

## 2. Quantitative Image Audit

- **Total `<img>` tags on homepage**: 0
- **Total `<img>` tags on state pages**: 0
- **Total `<img>` tags on /how-it-works**: 0
- **Missing Alt Text Count**: 0 (no images exist to evaluate)
- **Open Graph Image Tag**: `https://salestaxreversecalculator.com/api/og?title=Reverse%20Sales%20Tax%20Calculator&rate=7.53`
- **Schema Image Object**: `https://salestaxreversecalculator.com/og-image.png`

---

## 3. Critical SEO Consequences & Missed Opportunities

### 1. Zero Google Image Search Presence
- Searchers frequently look for visual references when doing expense reports:
  - *"reverse sales tax formula infographic"*
  - *"sales tax by state map 2026"*
  - *"canada gst hst rate map by province"*
- By having no indexable graphics, the domain forfeits high-intent organic clicks and natural backlink acquisition (infographics are historically top link-magnets in the financial sector).

### 2. Discrepancy Between Open Graph & Schema Images
- Social metadata uses a dynamic endpoint (`/api/og?title=...`).
- Schema.org markup references a static `/og-image.png`.
- While dynamic OG generation is modern, discrepancies can cause inconsistencies when aggregators fall back to Schema markup to render link previews.

---

## 4. Recommended Visual SEO Strategy

1. **Produce 3 Core Editorial Visual Assets**:
   - **Asset 1: "The Reverse Sales Tax Formula Flowchart"**  
     A high-resolution step-by-step diagram showing *Receipt Total -> Division Factor (1 + Rate) -> Pre-Tax Price -> Tax Component*.  
     Place in `/how-it-works` and the homepage math section.
   - **Asset 2: "US State & Local Sales Tax Map (2026 Edition)"**  
     A color-coded visual map of all 50 US states categorized by average combined tax rates.  
     Embed on `/tax-rates` and the homepage state table.
   - **Asset 3: "Canada GST / HST / PST Provincial Breakdown Map"**  
     A visual graphic showing Canadian provincial tax rates. Embed on `/canada`.

2. **Image Technical Specifications**:
   - Save in modern **WebP** format with responsive `<picture>` or Next.js `<Image>` component.
   - Add explicit `width` and `height` dimensions to prevent CLS.
   - Write keyword-rich descriptive alt attributes:
     ```html
     <img 
       src="/images/reverse-sales-tax-formula-diagram.webp" 
       alt="Reverse sales tax formula diagram: Total price divided by one plus tax rate equals original pre-tax price"
       width="800" 
       height="450" 
       loading="lazy" 
       decoding="async" 
     />
     ```
   - Embed `ImageObject` schema within the page JSON-LD graph.
