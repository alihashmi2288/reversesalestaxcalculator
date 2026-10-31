# Agent Skills Research & Evaluation Report
**Evaluated Via:** `npx skills find` (skills.sh ecosystem), installed configuration inspect, and Agent Marketplace  
**Evaluation Date:** October 31, 2026  
**Status:** Planning & Recommendation Only — No skills installed during this phase (Rule 5 compliance)  

---

## 1. Skill Discovery & Selection Methodology

Candidate skills were evaluated against eight strict criteria:
1. **Relevance:** Does the skill directly address a verified problem identified in the audit?
2. **Quality & Trust:** Prefer official or highly recognized authors (`coreyhaines31`, `vercel-labs`, `microsoft`, `anthropics`) with >1,000 installs.
3. **Compatibility:** Must support Next.js 16 (App Router), React 19, TypeScript, and standard AI coding agent interfaces.
4. **Specificity:** Provides actionable implementation guidelines rather than generic advice.
5. **Safety:** Requires zero destructive permissions or unnecessary telemetry.
6. **Overlap:** Eliminates duplicate skills if an installed tool already covers the workflow.
7. **Value vs Built-in:** Assess whether the task can be completed with existing agent tools.

---

## 2. Recommended Skill Matrix

| Priority | Skill Name | Verified Source | Installation Status | Best Project Use | Applicable Findings | Limitations | Recommendation |
|---|---|---|---|---|---|---|---|
| **P1** | `seo-audit` | `coreyhaines31/marketingskills@seo-audit` (242.3K installs) | Available to install | Technical SEO validation, canonical audit, sitemap checks, and crawl consistency | SEO-001, SEO-002, SEO-007 | Broad marketing scope; must be focused specifically on technical audit checks. | **Recommend** when executing Phase 1 & 6 |
| **P1** | `content-strategy` | `coreyhaines31/marketingskills@content-strategy` (168.1K installs) | Available to install | Topical depth blueprinting, search intent mapping, and state page content structure | SEO-004, SEO-005, SEO-006 | Requires factual tax rate input; does not verify legal statutes. | **Recommend** when executing Phase 2 & 4 |
| **P1** | `schema-markup` | `coreyhaines31/marketingskills@schema-markup` (55.5K installs) | Available to install | JSON-LD schema design for `HowTo`, `WebApplication`, `BreadcrumbList`, and `FAQPage` | SEO-003, SEO-007 | Must ensure adherence to Google Rich Results guidelines. | **Recommend** when executing Phase 3 |
| **P1** | `playwright-cli` | `microsoft/playwright-cli@playwright-cli` (202.4K installs) | Available to install | End-to-end regression testing: HTTP status codes, redirects, canonicals, and calculator accuracy | SEO-015 | Requires Node/Chromium environment to execute tests. | **Recommend** when executing Phase 6 |
| **P2** | `vercel-react-best-practices` | `vercel-labs/agent-skills@vercel-react-best-practices` (856.4K installs) | **Already Installed** (`C:\Users\umerh\.gemini\config\skills\...`) | Next.js Server Component boundaries, bundling, prerendering, and performance | SEO-010, SEO-012 | Focuses on React/Next.js architecture, not direct SEO copywriting. | **Use Existing** (no install needed) |
| **P2** | `next-best-practices` | Installed builtin skill | **Already Installed** | Next.js 16 file conventions, metadata APIs, route handlers, async parameters | SEO-001, SEO-002 | Architecture specific; does not produce marketing copy. | **Use Existing** (no install needed) |
| **P2** | `web-quality-skills@core-web-vitals` | `addyosmani/web-quality-skills@core-web-vitals` (32.8K installs) | Available to install | Core Web Vitals optimization: LCP, CLS, INP, and font/script scheduling | SEO-010 | Focused primarily on performance metrics. | **Optional** for Phase 5 |
| **P2** | `seo-content-writer` | `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer` (7.6K installs) | Available to install | Writing localized state and country reverse tax accounting guides | SEO-004, SEO-005, SEO-006 | Requires factual review by tax specialist to prevent hallucinations. | **Recommend** for Phase 4 content drafting |
| **P3** | `agent-browser` | Installed builtin skill | **Already Installed** | Headless browser smoke testing, interactive calculator verification, visual checks | SEO-014, SEO-015 | Requires local browser process. | **Use Existing** (no install needed) |

---

## 3. Skill Overlap & Redundancy Analysis

- **Next.js Engineering:** The environment already has `vercel-react-best-practices` and `next-best-practices` installed. Installing additional generic Next.js skills like `nextjs-turbopack` or `nextjs-app-router-patterns` is redundant.
- **Browser Automation:** `agent-browser` and `chrome-devtools` are already installed and provide direct headless DOM inspection. Installing `browser-use` or `playwright-stealth-verify` is unnecessary.
- **Content Strategy & SEO Copywriting:** The project currently lacks a specialized SEO content drafting skill. Pairing `coreyhaines31/marketingskills@content-strategy` (for structure) with `aaron-he-zhu/seo-geo-claude-skills@seo-content-writer` (for localized writing) fills this gap cleanly.
- **Schema & Structured Data:** `coreyhaines31/marketingskills@schema-markup` provides focused JSON-LD patterns that prevent schema entity mismatches like the one identified in SEO-003.

---

## 4. Verified Installation Instructions (For Execution Phase)

*Note: Per Operating Rule 5, none of these commands should be executed during this planning stage.*

When implementation is authorized, the executing agent should install the chosen skills using the global Skills CLI flag:

```bash
# Phase 1 & 3: SEO Audit and Schema Markup
npx skills add coreyhaines31/marketingskills@seo-audit -g -y
npx skills add coreyhaines31/marketingskills@schema-markup -g -y

# Phase 2 & 4: Content Strategy and Localized Copywriting
npx skills add coreyhaines31/marketingskills@content-strategy -g -y
npx skills add aaron-he-zhu/seo-geo-claude-skills@seo-content-writer -g -y

# Phase 6: Automated End-to-End Testing
npx skills add microsoft/playwright-cli@playwright-cli -g -y
```
