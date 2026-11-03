# PROJECT CONTEXT DOCUMENT: REVERSE SALES TAX CALCULATOR
**Audit & Enhancement Baseline for Sub-Agents**
*Date: November 3, 2026 | Principal Orchestrator: Antigravity*

---

## 1. Executive Summary & Website Mission
**Website:** Reverse Sales Tax Calculator (`https://salestaxreversecalculator.com`)  
**Core Purpose:** Provide free, instantaneous, 100% private, client-side reverse sales tax calculations that allow users (accountants, small businesses, bookkeepers, consumers, freelancers) to calculate the pre-tax price from any sales-tax inclusive receipt or invoice total:
$$\text{Pre-Tax Price} = \frac{\text{Total Paid}}{1 + \text{Tax Rate}}$$
And:
$$\text{Tax Amount} = \text{Total Paid} - \text{Pre-Tax Price}$$

### Primary Objective & Non-Negotiable Constraint
**SEO PRESERVATION IS THE HIGHEST PRIORITY.**
The primary business objective is to rank on Google, capture organic search queries across US states, Canadian provinces, VAT countries, and reverse tax search intents.
- **NO CONTENT REWRITING**: Existing text, headings, FAQs, explanations, tables, and formula descriptions must be preserved word-for-word.
- **NO ROUTE OR URL CHANGES**: All slugs, canonical URLs, redirects, and query behavior must remain intact.
- **NO METADATA REGRESSIONS**: Titles, descriptions, OpenGraph, JSON-LD schemas, sitemap, and robots.txt directives must be preserved.
- **SSG / SSR PRESERVATION**: All content must remain rendered in server-generated HTML. No SEO content may be hidden or moved to client-only JS.

---

## 2. Technical Architecture & Tech Stack
- **Framework:** Next.js 16.4.1 (Turbopack, App Router)
- **React:** React 19.2.4
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) with CSS variables and custom utility classes in `src/app/globals.css`
- **Fonts:** `Montserrat` (substituting Gotham geometric sans) + `JetBrains Mono` (tabular numbers/code) via `next/font/google`
- **Testing:** Node.js native test runner via `tsx --test src/lib/__tests__/*.test.ts` (27 passing tests)
- **Deployment Target:** Vercel (clean SSG static generation of 88 routes in ~9 seconds)

---

## 3. Design System & Design Direction (`DESIGN.md`)
The website is styled following the **NerdWallet design system specification** documented in `DESIGN.md`:
- **Philosophy:** A comparison and utility engine wearing an editorial coat. Pure white/soft canvas with a deep spruce green action color and a 3-step mint ladder (`mint-50`, `mint-100`, `mint-200`) providing airy surface contrast instead of heavy elevation/shadows.
- **Key Brand Tokens:**
  - `primary`: `#008254` (Spruce green — used strictly for primary CTAs, active tabs, rating stars, key links)
  - `primary-deep`: `#006642` (Dark spruce — stat blocks, dark badges)
  - `forest`: `#00482f` (Deepest green — hero borders, contrast edges)
  - `on-primary`: `#ffffff`
  - `lime-hero`: `#9ae600`, `lime-panel`: `#e8fdac`, `lime-accent`: `#ddfa88` (Accent lime for hero badges, tip callouts)
  - `canvas`: `#ffffff`, `canvas-soft`: `#f7f7f7`
  - `mint-50`: `#effcf8`, `mint-100`: `#e3faf2`, `mint-200`: `#b7ecda`
  - `hairline`: `#ebebec`, `hairline-strong`: `#d8d9da`
  - `ink`: `#000000` (Headings, titles — pure black)
  - `body`: `#3d4045` (Body copy, 300 weight)
  - `muted`: `#64666a`
  - `link`: `#005fb9` (Inline reference links, always underlined)
  - `error`: `#de2828`
- **Radii:** Controls are tight at `rounded-xs` (2px), cards at `rounded-lg` (8px), category tiles at `rounded-xxl` (12px), mint panels at `rounded-xxxl` (16px), pills/badges at `rounded-full` (9999px).
- **Elevation:** Flat, hairline borders (`1px solid #ebebec` / `#d8d9da`), faint 4-5% opacity shadows (`0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(100,102,106,0.05)`).
- **Typography Hierarchy:** Bold weight contrast (300 body vs. 700 headings). Montserrat used with tight letter spacing for headings.

---

## 4. Key Routes & User Journeys
1. **Homepage (`/`):**
   - Editorial Hero Band (green gradient with trust pills and badge)
   - Calculator Card (Basic, Batch Mode, Multiple Items, Find Tax Rate)
   - Definition & Subtractive Fallacy Callout
   - 12-Column Dashboard Grid:
     - Col 1: Popular US States sidebar links
     - Col 2: Step-by-Step Worked Examples, Visual Diagram, Method Breakdown
     - Col 3: International Hubs (Canada GST/HST, VAT countries, Tax Rates directory)
   - Master 50-State Interactive Rates Table
   - Step-by-step How It Works component
   - Embed Widget generator
   - Comprehensive FAQ Section (16 questions with schema)
2. **US State Pages (`/us/[state]`):**
   - Dedicated pages for all 50 states + DC.
   - Comprehensive dedicated pages for California (`CaliforniaPage.tsx`), New York, Texas, Florida, Arizona, South Carolina, Connecticut.
   - Features: State base rates, local district taxes, city lookup, county matrix, taxability rules, worked receipts, state revenue department citations.
3. **Canada Hub & Provinces (`/canada`, `/canada/[province]`):**
   - 13 provinces/territories (GST 5%, HST 13-15%, PST, Quebec QST 9.975%).
   - CRA Input Tax Credit (ITC) claiming guidance.
4. **VAT Hub & Countries (`/vat-calculator`, `/vat-calculator/[country]`):**
   - UK (20%), Germany (19%), France (20%), and European VAT rate structures.
5. **Utility Pages:**
   - `/tax-rates`: All-state directory and comparison.
   - `/embed`: Standalone widget embedder.
   - `/about`, `/contact`, `/privacy-policy`, `/terms-of-service`.

---

## 5. SEO & Accessibility Constraints for All Agents
1. **Heading Semantics:**
   - Do NOT change H1, H2, or H3 text or hierarchy.
   - Never replace an `<h2>` with a `<div>` or change its content.
2. **Accessible Form Controls:**
   - Every input MUST have an accessible name (`aria-label`, `<label>`, or `aria-labelledby`).
   - Touch targets must be $\ge 44 \times 44\text{px}$ on touch devices or $\ge 24 \times 24\text{px}$ minimum.
   - Visible `:focus-visible` outline on all interactive controls.
3. **Contrast Compliance:**
   - Text against background must satisfy WCAG AA $\ge 4.5:1$ for regular text, $\ge 3:1$ for large text and UI components.
4. **Performance:**
   - Keep calculations client-side and instantaneous.
   - Zero layout shift (CLS < 0.1).
   - Efficient re-renders and clean DOM trees.
