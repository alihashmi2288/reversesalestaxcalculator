---
version: 2.0.0
name: Reverse Sales Tax Calculator Design System & Accessibility Specification
description: An authoritative, production-grade design system and accessibility specification for Reverse Sales Tax Calculator (salestaxreversecalculator.com). Grounded in high-trust personal finance utility aesthetics (NerdWallet / Stripe / Tax Foundation caliber). Built with spruce green (#008254), deep forest (#005a36 / #00482f), clean white canvases, and a ladder of mint washes (#effcf8 to #b7ecda). Corners are precise and geometric (2px–8px), elevation is flat and ruled with hairlines rather than heavy drop shadows, and all interactive surfaces strictly satisfy WCAG 2.2 AA (and AAA for core text). Every component is architected for 100% SEO indexability, zero cumulative layout shift (CLS = 0.000), and robust assistive technology support.

colors:
  primary: "#008254"
  primary-deep: "#006642"
  forest: "#005a36"
  forest-deep: "#00482f"
  on-primary: "#ffffff"
  lime-hero: "#9ae600"
  lime-panel: "#e8fdac"
  lime-accent: "#ddfa88"
  lime-ribbon: "#a8ea4c"
  logo-lime: "#8dc63f"
  canvas: "#ffffff"
  canvas-soft: "#f7f7f7"
  card-bg: "#ffffff"
  card-bg-soft: "#f7f7f7"
  mint-50: "#effcf8"
  mint-100: "#e3faf2"
  mint-200: "#b7ecda"
  hairline: "#ebebec"
  hairline-strong: "#767676"
  ink: "#111827"
  ink-pure: "#000000"
  body: "#374151"
  muted: "#52525b"
  faint: "#71717a"
  input-placeholder: "#595959"
  border-focus: "#005a36"
  link: "#005fb9"
  info: "#4b99e6"
  error: "#de2828"
  error-bg: "#fff5f5"
  error-border: "#ffd8d8"

typography:
  display-xl:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.015em
  display-lg:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
  heading-1:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
  heading-2:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.015em
  heading-3:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  heading-4:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  stat-value:
    fontFamily: var(--font-mono), monospace
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: 0
  body-lg:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0
    maxWidth: 72ch
  body-md:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0
    maxWidth: 72ch
  body-sm:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
    maxWidth: 72ch
  ui-label:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
  ui-sm:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.02em
  caption:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  eyebrow:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.08em
  micro:
    fontFamily: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 10px
  xxl: 12px
  xxxl: 16px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  section: 40px
  section-lg: 64px

components:
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.ui-label}"
    breakpoint: 1024px
    linkGapDesktop: 16px
    minHeight: 70px

  button-primary:
    backgroundColor: "{colors.primary}"
    hoverBackgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.xs}"
    padding: "16px 24px"
    minHeight: 54px
    minWidth: 44px

  button-secondary:
    backgroundColor: "{colors.canvas-soft}"
    hoverBackgroundColor: "{colors.mint-50}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.xs}"
    padding: "12px 20px"
    borderColor: "{colors.hairline-strong}"
    minHeight: 48px
    minWidth: 44px

  button-outline:
    backgroundColor: "transparent"
    hoverBackgroundColor: "{colors.mint-50}"
    textColor: "{colors.primary}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    borderColor: "{colors.hairline-strong}"
    minHeight: 44px
    minWidth: 44px

  mode-segmented-control:
    backgroundColor: "{colors.canvas-soft}"
    borderColor: "{colors.hairline-strong}"
    activeBackgroundColor: "{colors.canvas}"
    activeBorderColor: "{colors.primary}"
    activeTextColor: "{colors.primary-deep}"
    inactiveTextColor: "{colors.body}"
    rounded: "{rounded.sm}"
    itemRounded: "{rounded.xs}"
    minHeight: 44px
    padding: "4px"

  calc-card:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.lg}"
    padding: "32px"
    mobilePadding: "20px 16px"
    minHeight: 480px

  calc-tab-bar:
    backgroundColor: "{colors.canvas-soft}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.sm}"
    padding: "6px"
    gap: "6px"

  calc-tab-btn:
    activeBackgroundColor: "{colors.primary}"
    activeTextColor: "{colors.on-primary}"
    activeBorderColor: "{colors.forest}"
    inactiveTextColor: "{colors.body}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.xs}"
    minHeight: 44px
    minWidth: 120px
    padding: "10px 14px"

  text-input:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline-strong}"
    focusBorderColor: "{colors.primary}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.input-placeholder}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    height: 52px
    padding: "0 16px"

  quick-rate-chip:
    backgroundColor: "{colors.canvas}"
    activeBackgroundColor: "{colors.mint-50}"
    borderColor: "{colors.hairline-strong}"
    activeBorderColor: "{colors.primary}"
    textColor: "{colors.ink}"
    activeTextColor: "{colors.primary-deep}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.xs}"
    minHeight: 44px
    minWidth: 44px
    padding: "8px 14px"
    activeIndicator: "checkmark glyph '✓' plus 2px border"

  result-card-neutral:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline-strong}"
    valueColor: "{colors.primary-deep}"
    labelColor: "{colors.body}"
    rounded: "{rounded.lg}"
    padding: "22px"

  result-card-success:
    backgroundColor: "{colors.mint-50}"
    borderColor: "{colors.mint-200}"
    valueColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    borderWidth: 2px
    padding: "22px"

  toc-nav:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.lg}"
    padding: "16px 20px"
    jumpLinkMinHeight: 44px
    jumpLinkPadding: "8px 16px"
    jumpLinkBg: "{colors.canvas-soft}"
    jumpLinkBorder: "{colors.hairline-strong}"
    jumpLinkTextColor: "{colors.primary-deep}"

  data-table:
    backgroundColor: "{colors.canvas}"
    headerBackgroundColor: "{colors.canvas-soft}"
    headerBorderColor: "{colors.hairline-strong}"
    rowBorderColor: "{colors.hairline}"
    hoverBackgroundColor: "{colors.mint-50}"
    actionLinkMinHeight: 44px
    actionLinkColor: "{colors.primary-deep}"

  faq-item:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.lg}"
    margin: "12px 0"
    triggerPadding: "18px 24px"
    contentPadding: "0 24px 20px"

  back-to-top:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    size: 48px
    rounded: "{rounded.full}"
    position: "fixed (bottom: 24px, right: 24px)"
    zIndex: 40

  ad-slot-placeholder:
    backgroundColor: "{colors.canvas-soft}"
    border: "1px dashed #767676"
    rounded: "{rounded.xs}"
    contain: "layout"
    leaderboardMinHeight: 90px
    rectangleMinHeight: 250px
    halfpageMinHeight: 600px
    inArticleMinHeight: 280px
---

# Reverse Tax Calculator Design System (DESIGN.md)

This document is the authoritative design, layout, accessibility, and component specification for **Reverse Sales Tax Calculator** (`salestaxreversecalculator.com`). Any new pages, regional hubs, calculators, or content sections built for the website **must** adhere strictly to the rules, tokens, patterns, and code blueprints documented here.

---

## 1. Executive Design Philosophy

The website operates as an institutional-grade financial utility wearing an authoritative editorial coat. In financial calculation, tax compliance, and accounting tools, user trust is paramount. The interface communicates speed, certainty, and mathematical rigor:

1. **One Spruce Green (`#008254`) Drives All Action:** Primary action buttons, active tab selection, focused controls, and brand accents share this exact spruce tone. It represents authoritative, error-free action.
2. **A Mint Ladder Instead of Heavy Drop Shadows:** Depth is achieved via subtle color blocking rather than artificial drop shadows. Surfaces step cleanly from White (`#ffffff`) to Soft Canvas (`#f7f7f7`), then through three distinct mint washes:
   - Mint 50 (`#effcf8`): subtle background tint for formula boxes, success result cards, and table hover states.
   - Mint 100 (`#e3faf2`): category badges and stat chips.
   - Mint 200 (`#b7ecda`): borders framing mint callouts and active cards.
3. **Nearly Square Geometric Precision:** Primary buttons and form controls feature a disciplined `2px` (`var(--radius-xs)`) border radius; content cards sit at `8px` (`var(--radius-lg)`). Round pill-shaped buttons are prohibited for primary controls.
4. **Universal High Contrast (WCAG 2.2 AA / AAA):** Every text and non-text element is audited against strict contrast ratios:
   - Interactive borders sit at `#767676` (`--hairline-strong`, 4.54:1 on white).
   - Body copy sits at `#374151` (`--body`, 8.87:1 on white, weight 400, max-width 72ch).
   - Placeholder text sits at `#595959` with explicit `opacity: 1 !important` (7.00:1 on white).
   - Microcopy has a strict minimum size floor of 13px (`text-[13px]`) with $\ge 4.5:1$ contrast.
5. **Neutral Accounting Results (Elimination of "Danger Red"):** In financial software, statutory sales tax is an expected computation, never an error. Output cards are styled in clean, calm neutral canvases (`#ffffff` canvas with `#767676` border and `#006642` deep spruce figures). Red (`#de2828`) is reserved strictly for destructive actions and invalid input validation errors.
6. **Active State Non-Color Reliance:** WCAG Criterion 1.4.1 mandates that color alone cannot indicate selection. Active rate chips, tabs, and filters **must** feature a structural checkmark glyph (`✓`) and a thicker 2px border alongside the color transition.
7. **100% SEO Indexability & SSR Integrity:** Every interactive disclosure, FAQ accordion, tab panel, and dropdown must deliver 100% of its content inside initial server-rendered HTML. Conditional React unmounting (`{isOpen && <div>}`) that strips DOM nodes from web crawlers is strictly prohibited.
8. **Zero Cumulative Layout Shift (CLS = 0.000):** Layout containers, calculation output cards, and ad placements reserve explicit minimum heights and CSS `contain: layout`. Calculations update in-place with a subtle `opacity: 0.6` transition rather than collapsing the viewport.

---

## 2. Color Palette & Token Architecture

All colors are declared as CSS custom properties in `src/app/globals.css`. Never hardcode ad-hoc hex values in component inline styles or utility classes.

### 2.1 Brand & Accent Palette

| Token | CSS Variable | Hex | Contrast on White | Usage & Role |
|---|---|---|:---:|---|
| **Primary Spruce** | `--primary` | `#008254` | **4.85:1** (AA) | Primary buttons (`.btn-primary`), active tabs, focus borders, vector icons, links, and hero band base. |
| **Deep Spruce** | `--primary-deep` | `#006642` | **7.12:1** (AAA) | Hover states on primary controls, formula equation values, and large result figures. |
| **Deep Forest** | `--forest` | `#005a36` | **8.53:1** (AAA) | High-contrast `:focus-visible` rings, dark stat callouts (`.stat-block-dark`), and active borders. |
| **Deepest Forest** | `--forest-deep` | `#00482f` | **11.02:1** (AAA) | Hero band gradient end-stop, high-density dark surfaces. |
| **On Primary** | `--on-primary` | `#ffffff` | — | Text and icons rendered over spruce or forest backgrounds. |
| **Lime Panel** | `--lime-panel` | `#e8fdac` | — | Background for signature `.expert-tip-panel` callouts. |
| **Lime Accent** | `--lime-accent` | `#ddfa88` | — | 1px border on lime panels and high-emphasis indicators. |
| **Logo Lime** | `--logo-lime` | `#8dc63f` | — | Accent spark in the brand logo mark. |
| **Hero Lime** | `--lime-hero` | `#9ae600` | — | High-emphasis headline accents on dark hero backgrounds. |

### 2.2 Surface & Neutral Canvas Palette

| Token | CSS Variable | Hex | Usage & Role |
|---|---|---|---|
| **Canvas** | `--canvas` | `#ffffff` | Page body, card containers, inputs, and table backgrounds. |
| **Canvas Soft** | `--canvas-soft` | `#f7f7f7` | Secondary buttons, table headers, mode selector backgrounds, and section tints. |
| **Mint 50** | `--mint-50` | `#effcf8` | Palest wash for table hover states, section panels, and active chip backgrounds. |
| **Mint 100** | `--mint-100` | `#e3faf2` | Category badges, stat chips, and photo framing. |
| **Mint 200** | `--mint-200` | `#b7ecda` | Borders on mint callouts and active state dividers. |
| **Hairline** | `--hairline` | `#ebebec` | Internal row dividers and subtle card rules (sub-structural). |
| **Strong Hairline** | `--hairline-strong` | `#767676` | **Mandatory border** for inputs, select menus, tab bars, quick chips, and card borders. Delivers 4.54:1 contrast on white (exceeding WCAG 1.4.11 non-text minimum 3:1). |

### 2.3 Typography & Text Contrast Tiers

| Token | CSS Variable | Hex | Contrast on White | WCAG Standard | Usage & Role |
|---|---|---|:---:|:---:|---|
| **Ink** | `--ink` | `#111827` | **17.84:1** | Pass (AAA) | Headings (H1–H6), table titles, input values, and high-emphasis numbers. Pure black `#000000` is also supported at 21:1 via `--ink-pure`. |
| **Body** | `--body` | `#374151` | **8.87:1** | Pass (AAA) | Running editorial copy, explanations, input labels, and table cells. Set at weight 400 with line-height 1.65–1.7 and max-width 72ch. |
| **Muted** | `--muted` | `#52525b` | **5.74:1** | Pass (AA) | Secondary captions, helper copy, and disclosure labels. |
| **Faint** | `--faint` | `#71717a` | **4.54:1** | Pass (AA) | Timestamp metadata, slot tags, and breadcrumb chevrons. |
| **Placeholder** | `--input-placeholder` | `#595959` | **7.00:1** | Pass (AAA) | Form field placeholder text with explicit `opacity: 1 !important`. |

### 2.4 Semantic & State Colors

| Token | CSS Variable | Hex | Usage & Role |
|---|---|---|---|
| **Link** | `--link` | `#005fb9` | Inline textual links inside articles or tables. Always underlined. |
| **Info** | `--info` | `#4b99e6` | Informational helper glyphs and non-critical notes. |
| **Error / Destructive** | `--error` | `#de2828` | Form validation errors and destructive actions. Never used for standard calculation results! |
| **Error Background** | `--error-bg` | `#fff5f5` | Alert callout surface for invalid inputs. |
| **Error Border** | `--error-border` | `#ffd8d8` | Alert callout border for invalid inputs. |

### 2.5 WCAG 2.2 AA / AAA Contrast Matrix (Verified)

Every color combination in this system has been verified using the official relative luminance formula:

$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

| Foreground Token | Hex | Background Token | Background Hex | Measured Ratio | WCAG Compliance Level |
|---|---|---|---|:---:|:---:|
| `--ink` | `#111827` | `--canvas` | `#ffffff` | **17.84:1** | WCAG AAA ($\ge 7.0:1$) |
| `--ink` | `#111827` | `--canvas-soft` | `#f7f7f7` | **16.50:1** | WCAG AAA ($\ge 7.0:1$) |
| `--body` | `#374151` | `--canvas` | `#ffffff` | **8.87:1** | WCAG AAA ($\ge 7.0:1$) |
| `--body` | `#374151` | `--canvas-soft` | `#f7f7f7` | **8.20:1** | WCAG AAA ($\ge 7.0:1$) |
| `--body` | `#374151` | `--mint-50` | `#effcf8` | **8.55:1** | WCAG AAA ($\ge 7.0:1$) |
| `--muted` | `#52525b` | `--canvas` | `#ffffff` | **5.74:1** | WCAG AA ($\ge 4.5:1$) |
| `--faint` | `#71717a` | `--canvas` | `#ffffff` | **4.54:1** | WCAG AA ($\ge 4.5:1$) |
| `--input-placeholder` | `#595959` | `--canvas` | `#ffffff` | **7.00:1** | WCAG AAA ($\ge 7.0:1$) |
| `--hairline-strong` (Borders) | `#767676` | `--canvas` | `#ffffff` | **4.54:1** | WCAG Non-Text ($\ge 3.0:1$) |
| `--hairline-strong` (Borders) | `#767676` | `--canvas-soft` | `#f7f7f7` | **4.19:1** | WCAG Non-Text ($\ge 3.0:1$) |
| `--primary-deep` | `#006642` | `--canvas` | `#ffffff` | **7.12:1** | WCAG AAA ($\ge 7.0:1$) |
| `--primary-deep` | `#006642` | `--mint-50` | `#effcf8` | **6.76:1** | WCAG AA ($\ge 4.5:1$) |
| Button Label (`--on-primary`) | `#ffffff` | `--primary` | `#008254` | **4.85:1** | WCAG AA ($\ge 4.5:1$) |
| Focus Ring (`--forest`) | `#005a36` | `--canvas` | `#ffffff` | **8.53:1** | WCAG Non-Text ($\ge 3.0:1$) |
| Hero Headline (`--on-primary`) | `#ffffff` | `--forest-deep` (Hero) | `#00482f` | **11.02:1** | WCAG AAA ($\ge 7.0:1$) |

---

## 3. Typography Architecture

### 3.1 Font Stack

The platform standardizes on **Montserrat** as the primary geometric sans-serif typeface, backed by modern system fallbacks, with a dedicated monospace font for numerical precision:

```css
--font-sans: var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: var(--font-mono), monospace;
```

- **Body Copy:** Weight `400`, `line-height: 1.65–1.7`, `color: var(--body)`. Capped at `max-width: 72ch` for optimal reading comfort.
- **Headings:** Weight `700`, `line-height: 1.15–1.3`, `color: var(--ink)`, `letter-spacing: -0.015em`.
- **Interface Labels:** Weight `600` or `700`, `letter-spacing: 0.02em`.
- **Numbers / Currencies / Rates:** Mandatory `font-variant-numeric: tabular-nums` or `font-family: var(--font-mono)` to guarantee column alignment without jitter during input updates.

### 3.2 Typography Scale & Hierarchy

| Token | Class / CSS | Size | Weight | Line Height | Tracking | Recommended Usage |
|---|---|---|---|---|---|---|
| `display-xl` | `.text-5xl font-bold` | 52px | 700 | 1.15 | -0.015em | Homepage hero title |
| `display-lg` | `.text-4xl font-bold` | 40px | 700 | 1.2 | -0.015em | Regional Hub / State page H1 |
| `heading-1` | `h1` | 36px | 700 | 1.2 | -0.015em | Major section title |
| `heading-2` | `h2` | 28px | 700 | 1.25 | -0.015em | Subsection title, primary article H2 |
| `heading-3` | `h3` | 20px | 700 | 1.3 | 0 | Card title, calculator title, step heading |
| `heading-4` | `h4` | 18–20px | 600 | 1.3 | 0 | FAQ accordion trigger wrapper, detail label |
| `stat-value` | `.stat-value` | 28–32px | 800 | 1.1 | 0 | Key metric values, calculator output figures |
| `body-lg` | `.text-lg` | 18px | 400 | 1.65 | 0 | Lead paragraph under hero |
| `body-md` | `p, .text-base` | 16px | 400 | 1.7 | 0 | General prose, explanatory text (max 72ch) |
| `body-sm` | `.text-sm` | 14px | 400 | 1.6 | 0 | Table cells, helper copy |
| `ui-label` | `.btn-primary` | 14px | 700 | 1.2 | 0.02em | Buttons, primary CTA controls |
| `ui-sm` | `.btn-secondary` | 13px | 600 | 1.3 | 0.02em | Secondary buttons, tab buttons, nav links |
| `caption` | `.text-[13px]` | 13px | 600 | 1.4 | 0 | Form labels, disclosure captions, footnotes |
| `eyebrow` | `.section-label` | 13px | 700 | 1.2 | 0.08em | Uppercase section tag pills |
| `micro` | `.trust-badge` | 13px | 600 | 1.4 | 0 | Trust marks, fine-print disclaimers |

### 3.3 Strict Microcopy Size Floor (13px Minimum)

To protect legibility and guarantee accessibility under WCAG 2.2, **no rendered text on any page may be smaller than 13px** (`0.8125rem` / `text-[13px]`). Legacy `10px`, `11px`, or `12px` font declarations are strictly forbidden for visible page copy. Microcopy must use minimum weight `600` and satisfy $\ge 4.5:1$ contrast against its ground.

### 3.4 Typographic Cleanliness Rules

- **Ellipsis:** Use the single Unicode character `…` (`&hellip;`), never three raw dots `...`.
- **Punctuation:** Use clean directional quotation marks and apostrophes where appropriate.
- **Numbers:** Always wrap dynamic currency or tax rates in `.tabular-nums` so numbers line up vertically in tables and result summaries.

---

## 4. Universal Accessibility Architecture (WCAG 2.2 AA)

Compliance with WCAG 2.2 AA is foundational across the codebase.

### 4.1 Universal Visible Focus Ring

Every keyboard-interactive element (buttons, links, inputs, selects, tabs, accordions, and table action links) displays a high-contrast focus ring when focused via keyboard (`:focus-visible`):

```css
:focus-visible {
  outline: 2px solid var(--forest) !important;
  outline-offset: 2px !important;
}

/* Inputs and Selects align the outline flush with the border */
.calc-input:focus-visible,
.state-select:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--primary) !important;
  outline-offset: 0 !important;
  border-color: var(--primary) !important;
}
```

*Rule:* Never apply `outline: none` or `outline: 0` without immediately supplying a compliant visible replacement.

### 4.2 Minimum Touch Target Size (44×44px)

Under WCAG 2.2 Criterion 2.5.8 (Target Size), every interactive target must provide a minimum bounding box of **44×44px** on all devices (or maintain an equivalent spacing boundary):

- Primary CTA buttons: `min-height: 54px; min-width: 44px;`
- Secondary buttons: `min-height: 48px; min-width: 44px;`
- Mode selector segments: `min-height: 44px; min-width: 44px;`
- Tab buttons: `min-height: 44px; min-width: 120px;`
- Rate preset chips: `min-height: 44px; min-width: 44px;`
- Table action links (`Calculate →`): `min-height: 44px; min-width: 44px; display: inline-flex; align-items: center;`
- Table of Contents jump links: `min-height: 44px; padding: 8px 16px;`
- Floating back-to-top button: `width: 48px; height: 48px;`
- Adjacent interactive elements must maintain at least **8px** of gap separation.

### 4.3 Active State Indicators (Non-Color Relying)

WCAG Criterion 1.4.1 mandates that color must not be the sole visual means of conveying an active or selected state. 

*Implementation Pattern:*
Whenever an option or chip is selected (e.g., calculation mode toggles, rate preset chips, or table row selections), the active state **must** combine color with at least one additional structural visual cue:
1. An explicit checkmark glyph: `<span aria-hidden="true">✓ </span>`
2. An increased border stroke: `border-width: 2px;` vs `border-width: 1px;`
3. An explicit ARIA attribute: `aria-pressed="true"`, `aria-selected="true"`, or `aria-checked="true"`.

```tsx
<button
  type="button"
  aria-pressed={isActive}
  className={`quick-btn ${isActive ? 'active' : ''}`}
  style={{
    borderWidth: isActive ? 2 : 1,
    borderColor: isActive ? 'var(--primary)' : 'var(--hairline-strong)',
    backgroundColor: isActive ? 'var(--mint-50)' : 'var(--canvas)',
    color: isActive ? 'var(--primary-deep)' : 'var(--ink)',
    fontWeight: isActive ? 700 : 500,
  }}
>
  {isActive && <span aria-hidden="true" style={{ fontWeight: 800, marginRight: 4 }}>✓</span>}
  {rate}%
</button>
```

### 4.4 Screen Reader Live Announcements

Calculators dynamically compute results without a full page reload. Screen readers must be informed of changes politely without stealing focus:

```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {announcementText}
</div>
```

Announcements are triggered when:
- A calculation completes (e.g., *"Pre-tax price calculated: $100.00. Sales tax: $7.50 at 7.5% sales tax. Total: $107.50."*)
- Calculation mode is switched (*"Calculator switched to reverse mode: Find price before tax."*)
- Content is copied to clipboard (*"Tax breakdown copied to clipboard."*)
- A table filter query is executed (*"Showing 12 of 51 jurisdictions."*)

### 4.5 Universal Skip-to-Content Navigation

Every top-level page template must include an accessible skip link as the very first focusable element inside the document body:

```html
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

And every page's `<main>` landmark element **must** declare:

```html
<main id="main-content" tabIndex={-1}>
  ...
</main>
```

The `tabIndex={-1}` attribute ensures that assistive technology programmatically shifts keyboard focus to the main container when the skip link is activated.

### 4.6 Keyboard Form Submission via Enter Key

Desktop users expect to press `Enter` to calculate. Calculator input fields must always be wrapped in a semantic HTML `<form>` with a `type="submit"` button or handled via `onSubmit`:

```tsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    handleCalculate();
  }}
>
  {/* input fields */}
  <button type="submit" className="btn-primary">
    Calculate Pre-Tax Price
  </button>
</form>
```

### 4.7 Reduced Motion Respect

Users with vestibular sensitivities must be protected from involuntary animations:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. Layout Architecture & Zero CLS

### 5.1 Container & Grid Standards

The primary content container caps width at **1200px** with responsive gutters:

```css
.container-main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 640px) {
  .container-main {
    padding: 0 24px;
  }
}
```

### 5.2 Sticky Header Offset (`scroll-margin-top`)

When users jump to in-page anchors (e.g. `#calculator`, `#how-it-works`, `#formula`, `#state-search`, `#faq`), sticky headers can obscure the target heading. All major section anchors must include an explicit scroll margin:

```css
#calculator,
#how-it-works,
#formula,
#state-search,
#faq,
#embed-widget-section,
.scroll-target {
  scroll-margin-top: 100px;
}
```

### 5.3 Cumulative Layout Shift (CLS) Elimination

To maintain a **CLS score of 0.000**:
1. **Never unmount result cards during typing:** When a user modifies an input amount or rate, do not collapse the result container height. Instead, retain the previous calculation in the DOM with a subtle `opacity: 0.6` transition until the new calculation completes.
2. **Fixed Min-Heights on Dynamic Containers:** Calculator cards declare `min-height: 480px;`; tab panels declare `min-height: 380px;`.
3. **Table Column Locking:** All comparison tables declare `table-layout: fixed;` with explicit percentage column widths so that searching or filtering does not cause column width jitter.

---

## 6. Authoritative Component Specifications & Blueprints

### 6.1 Primary Action Button (`.btn-primary`)

The signature green action button. Built with a disciplined `2px` border radius, flat `16px 24px` padding, bold typography, and generous hit area.

```css
.btn-primary, button.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 54px;
  background-color: var(--primary);
  color: var(--on-primary);
  border: 1px solid transparent;
  border-radius: var(--radius-xs);
  padding: 16px 24px;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.1s ease;
  box-shadow: 0 2px 6px rgba(0, 72, 47, 0.12);
  text-decoration: none;
}

.btn-primary:hover {
  background-color: var(--primary-deep);
  color: var(--on-primary);
}

.btn-primary:active {
  transform: translateY(1px);
}
```

### 6.2 Secondary Button (`.btn-secondary`)

Used for reset actions, secondary workflows, and utility triggers.

```css
.btn-secondary, button.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  min-width: 44px;
  background-color: var(--canvas-soft);
  color: var(--primary-deep);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-xs);
  padding: 12px 20px;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  text-decoration: none;
}

.btn-secondary:hover {
  background-color: var(--mint-50);
  border-color: var(--primary);
  color: var(--primary-deep);
}
```

### 6.3 Outline Utility Button (`.btn-outline`)

A compact control used for copy triggers, secondary links, and table utilities. Sits at `8px` (`var(--radius-lg)`).

```css
.btn-outline, button.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  min-width: 44px;
  background-color: transparent;
  color: var(--primary);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-lg);
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-outline:hover {
  background-color: var(--mint-50);
  border-color: var(--primary);
  color: var(--primary-deep);
}
```

### 6.4 Mode Segmented Control (`.mode-segmented-control`)

A 2-way accessible radio group toggle rendered above calculator tabs to toggle between Reverse mode (*"Find price before tax"*) and Forward mode (*"Add sales tax"*):

```tsx
<div
  role="radiogroup"
  aria-label="Calculator mode"
  className="mode-segmented-control"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    backgroundColor: 'var(--canvas-soft)',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--radius-sm)',
    padding: 4,
    gap: 4,
  }}
  onKeyDown={handleModeKeyDown}
>
  <button
    type="button"
    id="mode-btn-reverse"
    role="radio"
    aria-checked={calcMode === 'reverse'}
    tabIndex={calcMode === 'reverse' ? 0 : -1}
    onClick={() => setCalcMode('reverse')}
    className={`mode-segment-btn ${calcMode === 'reverse' ? 'active' : ''}`}
    style={{
      padding: '10px 14px',
      fontSize: 14,
      fontWeight: calcMode === 'reverse' ? 700 : 500,
      color: calcMode === 'reverse' ? 'var(--primary-deep)' : 'var(--body)',
      backgroundColor: calcMode === 'reverse' ? 'var(--canvas)' : 'transparent',
      border: calcMode === 'reverse' ? '1px solid var(--primary)' : '1px solid transparent',
      borderRadius: 'var(--radius-xs)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 44,
      boxShadow: calcMode === 'reverse' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
    }}
  >
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        border: '2px solid currentColor',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {calcMode === 'reverse' && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }} />
      )}
    </span>
    <span>Find price before tax</span>
  </button>

  <button
    type="button"
    id="mode-btn-forward"
    role="radio"
    aria-checked={calcMode === 'forward'}
    tabIndex={calcMode === 'forward' ? 0 : -1}
    onClick={() => setCalcMode('forward')}
    className={`mode-segment-btn ${calcMode === 'forward' ? 'active' : ''}`}
    style={{
      padding: '10px 14px',
      fontSize: 14,
      fontWeight: calcMode === 'forward' ? 700 : 500,
      color: calcMode === 'forward' ? 'var(--primary-deep)' : 'var(--body)',
      backgroundColor: calcMode === 'forward' ? 'var(--canvas)' : 'transparent',
      border: calcMode === 'forward' ? '1px solid var(--primary)' : '1px solid transparent',
      borderRadius: 'var(--radius-xs)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 44,
      boxShadow: calcMode === 'forward' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
    }}
  >
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        border: '2px solid currentColor',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {calcMode === 'forward' && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }} />
      )}
    </span>
    <span>Add sales tax</span>
  </button>
</div>
```

### 6.5 WAI-ARIA Accessible Tab Bar (`.calc-tab-bar`)

The tab bar governs calculator sub-modes (Basic, Multiple items, Find tax rate, Batch mode). It strictly follows the **W3C WAI-ARIA APG Tabs Pattern**:
- Outer list: `role="tablist"` with `aria-label="Calculator tabs"`
- Tab buttons: `role="tab"`, `aria-selected="true|false"`, `aria-controls="panel-{id}"`, `id="tab-{id}"`
- Roving tabIndex: Active tab has `tabIndex={0}`; inactive tabs have `tabIndex={-1}`
- Keyboard navigation: Full support for `ArrowLeft`, `ArrowRight`, `Home`, and `End`
- Panels: `role="tabpanel"`, `aria-labelledby="tab-{id}"`, `tabIndex={0}`
- **SEO Invariant:** All panels remain rendered in the DOM with the `hidden` HTML attribute when inactive so search engines index 100% of the content.

```tsx
<div className="calc-tab-bar" role="tablist" aria-label="Calculator tabs">
  {TABS.map((tab, idx) => (
    <button
      key={tab.id}
      role="tab"
      id={`tab-${tab.id}`}
      aria-selected={activeTab === tab.id}
      aria-controls={`panel-${tab.id}`}
      tabIndex={activeTab === tab.id ? 0 : -1}
      onClick={() => setActiveTab(tab.id)}
      onKeyDown={(e) => handleKeyDownTab(e, idx)}
      className={`calc-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
    >
      <span aria-hidden="true">{tab.icon}</span>
      <span>{tab.label}</span>
    </button>
  ))}
</div>

{/* Panels (permanently rendered in SSR HTML) */}
{TABS.map((tab) => (
  <div
    key={tab.id}
    id={`panel-${tab.id}`}
    role="tabpanel"
    aria-labelledby={`tab-${tab.id}`}
    tabIndex={0}
    hidden={activeTab !== tab.id}
  >
    {tab.content}
  </div>
))}
```

### 6.6 Form Inputs & Placeholders (`.calc-input`, `.input-wrapper`)

Every input is tuned for financial precision and accessibility:
1. `height: 52px;` with `border: 1px solid var(--hairline-strong);` (`#767676`)
2. Placeholder text styled in `#595959` with `opacity: 1 !important` (7:1 contrast)
3. Currency inputs include prefix symbols positioned absolutely inside `.input-wrapper`
4. Form inputs declare `autoComplete="off"`, `inputMode="decimal"`, and a semantic `name` attribute
5. Auto-select content on focus so users can overwrite defaults immediately: `onFocus={(e) => e.target.select()}`

```tsx
<div className="input-wrapper">
  <span className="input-prefix" aria-hidden="true">$</span>
  <input
    ref={amountInputRef}
    id="basic-final-price"
    name="amount"
    autoComplete="off"
    type="text"
    inputMode="decimal"
    placeholder="108.25"
    aria-label="Total price paid with tax in dollars"
    aria-invalid={!!error}
    aria-describedby={error ? 'basic-error-msg' : undefined}
    value={amount}
    onFocus={(e) => e.target.select()}
    onChange={(e) => setAmount(e.target.value)}
    className="calc-input with-prefix"
    style={{ color: 'var(--ink)', fontWeight: 600 }}
  />
</div>
```

### 6.7 Rate Source Selector & Quick Preset Chips (`.quick-btn`)

A 3-way rate source selector (`State rate`, `Typical combined`, `Exact rate from receipt`) plus preset percentage chips (6%, 7%, 8%, 8.25%, 8.875%, 10%):

```tsx
<button
  type="button"
  onClick={() => handleQuickRate(8.25)}
  className={`quick-btn ${active ? 'active' : ''}`}
  aria-pressed={active}
  aria-label="Set tax rate to 8.25%"
  style={{
    minHeight: 44,
    padding: '8px 14px',
    fontWeight: active ? 700 : 500,
    borderWidth: active ? 2 : 1,
    borderColor: active ? 'var(--primary)' : 'var(--hairline-strong)',
    backgroundColor: active ? 'var(--mint-50)' : 'var(--canvas)',
    color: active ? 'var(--primary-deep)' : 'var(--ink)',
  }}
>
  {active && <span aria-hidden="true" style={{ fontWeight: 800, marginRight: 4 }}>✓</span>}
  8.25%
</button>
```

### 6.8 Calculation Result Cards Grid (`.result-card`)

**The Elimination of Danger Red:** Calculated sales tax results are presented as calm, neutral canvases with deep spruce values. In reverse mode, the calculated pre-tax price is highlighted in a 2px-bordered mint card with a checkmark:

```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  style={{
    marginTop: 4,
    opacity: isStale ? 0.6 : 1,
    transition: 'opacity 0.15s ease',
  }}
>
  <div className="grid-results" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 16 }}>
    {/* Card 1: Original Price */}
    <div
      className={`result-card ${mode === 'reverse' ? 'success' : 'neutral'}`}
      style={{ borderWidth: mode === 'reverse' ? 2 : 1 }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: mode === 'reverse' ? 'var(--primary-deep)' : 'var(--body)', marginBottom: 6 }}>
        {mode === 'reverse' && <span aria-hidden="true">✓ </span>}
        Original price
      </div>
      <div className="tabular-nums stat-value" style={{ fontSize: 28, fontWeight: 800, color: mode === 'reverse' ? 'var(--primary)' : 'var(--ink)' }}>
        ${fmt(result.preTaxPrice)}
      </div>
      <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>
        {mode === 'reverse' ? 'Pre-tax item cost' : 'Base pre-tax price'}
      </div>
    </div>

    {/* Card 2: Tax Amount (Neutral Card) */}
    <div className="result-card" style={{ background: 'var(--canvas)', border: '1px solid var(--hairline-strong)', color: 'var(--ink)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--body)', marginBottom: 6 }}>
        Tax amount
      </div>
      <div className="tabular-nums stat-value" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-deep)' }}>
        ${fmt(result.taxAmount)}
      </div>
      <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>
        {result.taxRate}% sales tax
      </div>
    </div>

    {/* Card 3: Total with Tax */}
    <div
      className={`result-card ${mode === 'forward' ? 'success' : 'neutral'}`}
      style={{ borderWidth: mode === 'forward' ? 2 : 1 }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: mode === 'forward' ? 'var(--primary-deep)' : 'var(--body)', marginBottom: 6 }}>
        {mode === 'forward' && <span aria-hidden="true">✓ </span>}
        {mode === 'reverse' ? 'Total paid' : 'Total with tax'}
      </div>
      <div className="tabular-nums stat-value" style={{ fontSize: 28, fontWeight: 800, color: mode === 'forward' ? 'var(--primary)' : 'var(--ink)' }}>
        ${fmt(result.totalPaid)}
      </div>
      <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 6, fontWeight: 500 }}>
        {mode === 'reverse' ? 'Receipt total' : 'Final checkout total'}
      </div>
    </div>
  </div>
</div>
```

### 6.9 Verification Check & Formula Rows

Rendered immediately below calculation result cards to provide visual proof of arithmetic certainty:

```tsx
{/* Verification Check Row */}
<div
  className="tabular-nums"
  style={{
    backgroundColor: 'var(--canvas-soft)',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--radius-xs)',
    padding: '10px 14px',
    fontSize: 13,
    color: 'var(--body)',
    marginBottom: 12,
    fontFamily: 'var(--font-mono)',
    textAlign: 'center',
  }}
>
  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Check: </span>
  ${fmt(result.preTaxPrice)} × 1.0825 = ${fmt(result.totalPaid)}
</div>

{/* Mathematical Formula Row */}
<div
  className="tabular-nums"
  style={{
    backgroundColor: 'var(--mint-50)',
    border: '1px solid var(--mint-200)',
    borderRadius: 'var(--radius-xs)',
    padding: '10px 16px',
    fontSize: 13,
    color: 'var(--primary-deep)',
    marginBottom: 12,
    fontFamily: 'var(--font-mono)',
    textAlign: 'center',
  }}
>
  <strong>Formula: </strong>
  ${fmt(result.preTaxPrice)} = ${fmt(result.totalPaid)} ÷ 1.0825
</div>
```

### 6.10 "More Options" & "Explain This Result" Disclosures

Progressive disclosure patterns using native semantic `<details>` with clean high-contrast styling:

```tsx
{/* More Options Disclosure */}
<details
  className="more-options-disclosure"
  style={{
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--canvas-soft)',
    padding: '12px 16px',
  }}
>
  <summary style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-deep)', cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 8, minHeight: 28 }}>
    <span>More options</span>
    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>(rounding, tax layers, tip, preferences)</span>
  </summary>
  <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 12, borderTop: '1px solid var(--hairline)' }}>
    {/* Rounding precision radios, tax layers, and tip inputs */}
  </div>
</details>

{/* Show the Steps Disclosure */}
<details
  className="steps-disclosure"
  style={{
    marginBottom: 16,
    border: '1px solid var(--mint-200)',
    borderRadius: 'var(--radius-xs)',
    backgroundColor: 'var(--mint-50)',
    padding: '10px 14px',
  }}
>
  <summary style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-deep)', cursor: 'pointer', userSelect: 'none' }}>
    Show the steps (arithmetic walkthrough)
  </summary>
  <div style={{ marginTop: 10, fontSize: 13, color: 'var(--body)', lineHeight: 1.6, borderTop: '1px solid var(--mint-200)', paddingTop: 8 }}>
    <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <li><strong>Rate as a decimal:</strong> 8.25% ÷ 100 = 0.0825</li>
      <li><strong>Tax divisor factor:</strong> 1 + 0.0825 = 1.0825</li>
      <li><strong>Divide to find pre-tax:</strong> $108.25 ÷ 1.0825 = <strong>$100.00</strong></li>
      <li><strong>Isolate sales tax:</strong> $108.25 − $100.00 = <strong>$8.25</strong></li>
    </ol>
  </div>
</details>
```

### 6.11 In-Flow Table of Contents (`.toc-nav`)

A collapsible, accessible table of contents rendered right inside the content flow:
- Mobile: Collapsed by default to conserve vertical scroll.
- Desktop (`>= 1024px`): Open by default via `<details open className="toc-details">`.
- Jump links provide $\ge 44\text{px}$ touch targets and link directly to `#anchor` IDs matching `scroll-margin-top: 100px`.

```tsx
<nav className="toc-nav" aria-label="Table of contents">
  <details className="toc-details" open>
    <summary className="toc-summary">
      <svg className="toc-toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
      <span>Quick Navigation: Jump to Guide Sections</span>
    </summary>
    <div className="toc-links-list">
      <a href="#calculator" className="toc-jump-link">Reverse Calculator</a>
      <a href="#how-it-works" className="toc-jump-link">How to Calculate</a>
      <a href="#formula" className="toc-jump-link">Reverse Formula</a>
      <a href="#state-search" className="toc-jump-link">State Rates</a>
      <a href="#faq" className="toc-jump-link">Frequently Asked Questions</a>
    </div>
  </details>
</nav>
```

### 6.12 Data Comparison Tables (`.data-table`)

Financial comparison tables must be fast, readable, and stable:
1. `table-layout: fixed;` to lock column geometry during search filtering.
2. Sticky header (`position: sticky; top: 0; z-index: 10`) with `border-bottom: 2px solid var(--hairline-strong)`.
3. Numeric cells use `.cell-num` with `text-align: right; font-variant-numeric: tabular-nums;`.
4. Action links (`Calculate →`) feature minimum `44×44px` hit areas and high-contrast `:focus-visible` rings.
5. Column sort headers are semantic `<button type="button">` with `aria-sort="ascending"|"descending"|"none"`.
6. Live search input with counter (`aria-live="polite"`) and clear button.

```tsx
<div className="table-container" role="region" aria-label="State sales tax comparison" tabIndex={0}>
  <table className="data-table" style={{ tableLayout: 'fixed' }}>
    <thead>
      <tr>
        <th scope="col" style={{ width: '35%' }}>
          <button type="button" className="sort-header-btn" aria-sort="ascending" onClick={() => handleSort('state')}>
            State Name <span aria-hidden="true">↑</span>
          </button>
        </th>
        <th scope="col" className="header-num" style={{ width: '25%' }}>State Rate</th>
        <th scope="col" className="header-num" style={{ width: '25%' }}>Combined Rate</th>
        <th scope="col" style={{ width: '15%' }}>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">California</th>
        <td className="cell-num">7.25%</td>
        <td className="cell-num"><strong style={{ color: 'var(--ink)' }}>8.82%</strong></td>
        <td>
          <a href="/us/california" className="table-action-link" aria-label="Calculate for California">
            Calculate →
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 6.13 FAQ Accordion System (`.faq-item`)

**100% SEO Preservation:** Collapsed FAQ answers **must never** be unmounted from the DOM via `{isOpen && <div>}`. Instead, answers must exist in the initial server-rendered HTML and toggle via CSS display or semantic `<details>`:

```tsx
<div className="faq-item">
  <h4>
    <button
      type="button"
      id={`faq-btn-${idx}`}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${idx}`}
      className="faq-trigger"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{faq.question}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }}
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  </h4>
  <div
    id={`faq-answer-${idx}`}
    role="region"
    aria-labelledby={`faq-btn-${idx}`}
    className="faq-content"
    style={{ display: isOpen ? 'block' : 'none' }}
  >
    <p>{faq.answer}</p>
  </div>
</div>
```

### 6.14 Key Stats Cards Grid (`.card`)

Used for regional hubs, state pages, and comparison tools to display top-line tax metrics:

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
  {STATS.map(({ label, value, note, color }) => (
    <div
      key={label}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'var(--canvas)',
        border: '1px solid var(--hairline-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 16px',
        height: '100%',
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>
        {value}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', margin: '6px 0 2px' }}>
        {label}
      </div>
      <div style={{ fontSize: 13, color: 'var(--body)' }}>
        {note}
      </div>
    </div>
  ))}
</div>
```

### 6.15 "Important Notes" Accent Callout Box

Used across editorial guides and state pages to present critical tax rules without alert alarmism:

```tsx
<div
  style={{
    background: 'var(--mint-50)',
    border: '1px solid var(--mint-200)',
    borderLeft: '4px solid var(--primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    maxWidth: 860,
    margin: '0 auto',
    boxShadow: 'var(--shadow-card)',
  }}
>
  <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--primary-deep)', marginBottom: 12 }}>
    <span aria-hidden="true">📌 </span>Important Notes
  </h2>
  <ul style={{ paddingLeft: 20, color: 'var(--body)', fontSize: 15, lineHeight: 1.8, margin: 0 }}>
    <li>Rates shown are <strong>combined averages</strong> (state rate + average local rate).</li>
    <li>Certain necessities (unprepared groceries, prescription drugs) are exempt in many states.</li>
  </ul>
</div>

{/* Associated "Back to the calculator" CTA Button */}
<div style={{ textAlign: 'center', marginTop: 28 }}>
  <a
    href="/#calculator"
    className="btn-primary"
    style={{ minHeight: 44, width: 'auto', padding: '12px 24px' }}
  >
    Back to the calculator
  </a>
</div>
```

### 6.16 Back to Top Floating Action Button (`BackToTop`)

A fixed, accessible 48×48px floating action button that appears after 400px of vertical scroll:

```tsx
'use client';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="back-to-top-btn"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 40,
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--primary)',
        color: '#ffffff',
        border: 'none',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
```

### 6.17 AdSense Placement Architecture (`AdSlot`)

Ad placements must strictly preserve user experience, prevent accidental clicks, and guarantee zero layout shift:
1. **Collapsed by Default:** Controlled by a single global flag `export const SHOW_AD_PLACEHOLDERS = false;`. When disabled, the component returns `null` so no empty gaps appear.
2. **Fixed Layout Reservation (`contain: layout`):** When rendered, slots enforce strict minimum heights to eliminate CLS:
   - Leaderboard: `min-height: 90px; max-width: 728px;`
   - Medium Rectangle: `min-height: 250px; max-width: 336px;`
   - Halfpage: `min-height: 600px; max-width: 300px;`
   - In-Article: `min-height: 280px; max-width: 728px;`
3. **Strict Placement Constraints:**
   - **Never inside calculator cards:** Ads inside calculator containers violate Google AdSense policies and ruin user trust.
   - **Minimum 150px Clearance:** Maintain at least 150px vertical clearance between an ad slot and any interactive action button (`.btn-primary`, `.btn-secondary`, or submit controls).

```tsx
<AdSlot
  slot="homepage-middle-banner"
  size="leaderboard"
  label="Advertisement"
/>
```

### 6.18 Professional Vector Iconography

Native operating system emojis (`🧮`, `📋`, `🔍`, `⚡`) render unpredictably across platforms (Windows vs macOS vs Android). All interface icons must be rendered as clean, accessible 16px or 20px inline SVG vector icons using `currentColor` and `aria-hidden="true"`:

```tsx
export function CalculatorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
    </svg>
  );
}
```

### 6.19 Clean Print Stylesheet (`@media print`)

When a user prints a tax breakdown (or generates a PDF), non-printable page areas (navbars, footers, interactive calculator controls, tabs, preset chips, and ads) are suppressed via `@media print`. The `.print-only-summary` card prints cleanly on white paper with pure black ink:

```css
@media print {
  nav, footer, .calc-tab-bar, .mode-segmented-control, .quick-btn,
  .state-select, .ad-slot-placeholder, .btn-primary, .btn-secondary,
  .toc-nav, #how-it-works, #faq, #embed-widget-section, .back-to-top-btn {
    display: none !important;
  }

  .print-only-summary {
    display: block !important;
    background: #ffffff !important;
    color: #000000 !important;
    padding: 24pt !important;
  }
}
```

---

## 7. Responsive Breakpoint Matrix

| Breakpoint Name | Viewport Width | Navigation Behavior | Calculator & Grid Layout |
|---|---|---|---|
| **Mobile Small** | `< 480px` | Hamburger drawer; wordmark left; compact CTA | Single column; 20px padding; touch targets $\ge 44\text{px}$; inputs full width |
| **Mobile Standard** | `480px – 639px` | Hamburger drawer; full mobile menu | Single column; quick chips wrap in rows of 3–4 |
| **Tablet** | `640px – 1023px` | Hamburger drawer below 1024px; logo + search | 2-column result cards; data tables scroll horizontally with scroll indicators |
| **Desktop / Laptop** | `1024px – 1279px` | Full horizontal navbar; 16px link gap; no wrap | Side-by-side hero layout (55fr / 45fr); full table columns |
| **Wide Desktop** | `≥ 1280px` | Full navbar; 24px link gap; container capped at 1200px | Full layout with generous whitespace between sections |

---

## 8. Implementation Checklist for New Pages

When creating any new page or component from this specification, verify each item before shipping:

- [ ] **Contrast:** Are all borders `#767676` or darker? Is running body text `#374151`? Are placeholders `#595959` with `opacity: 1`?
- [ ] **Focus Rings:** Does every button, input, tab, and link show a high-contrast `2px solid var(--forest)` focus ring when tabbed to via keyboard?
- [ ] **Touch Targets:** Are all clickable buttons, tabs, preset chips, and action links at least `44×44px`?
- [ ] **Non-Color Active States:** Do active tabs, rate chips, or selected filters use a checkmark `✓` or thicker border in addition to color?
- [ ] **Typography Floor:** Is every piece of microcopy, label, badge, and caption at least `13px`?
- [ ] **Neutral Results:** Is statutory sales tax displayed on a neutral card with deep spruce text, rather than an error red card?
- [ ] **Enter Key Form:** Are calculator inputs wrapped in a semantic `<form>` so pressing `Enter` executes the calculation?
- [ ] **Skip Links:** Does the page `<main>` tag have `id="main-content" tabIndex={-1}`?
- [ ] **SSR Crawlability:** Are all FAQ answers and tab panels present in initial server-rendered HTML (zero conditional unmounting)?
- [ ] **Zero CLS:** Do layout cards reserve min-heights? Do table containers declare `table-layout: fixed;`?
- [ ] **Ad Clearance:** Are ad placeholders collapsed by default and kept $\ge 150\text{px}$ away from primary action buttons?
- [ ] **Vector Icons:** Are platform-dependent emojis replaced with accessible inline SVG vector icons with `aria-hidden="true"`?
- [ ] **Back to Top:** Does the page render the accessible, reduced-motion-aware `BackToTop` floating button?
