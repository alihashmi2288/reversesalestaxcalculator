# AI Search, GEO & Agent Readiness: salestaxreversecalculator.com

**Audit Date**: September 2026  
**Audited URL**: https://salestaxreversecalculator.com/  
**Category Score**: 86 / 100  
**Status**: Superior AI Visibility; Minor Text Encoding & Tooling Fixes  

---

## 1. Executive Summary

`salestaxreversecalculator.com` is in the top tier of AI and generative search readiness. The site provides a clean, well-structured `/llms.txt` and `/llms-full.txt` at the root domain, explicitly grants crawl and index permissions to all leading AI search and training agents in `robots.txt`, and delivers complete text representations in server-rendered HTML.

Areas for improvement include fixing a character encoding corruption in `llms-full.txt` and exposing machine-actionable calculation endpoints (WebMCP / JSON API) for autonomous agent invocation.

---

## 2. Agentic Check Diagnostic Results

Results from Claude SEO Agentic Audit (`agentic_check.py`):
```json
{
  "summary": {
    "P0": { "pass": 3 },
    "P1": { "info": 2, "pass": 3 },
    "P2": { "info": 1, "na": 4 },
    "P3": { "na": 4 }
  },
  "data": {
    "page": {
      "words_without_js": 7646,
      "js_shell_marker": false
    },
    "robots": {
      "group_count": 8,
      "agents": [
        { "token": "GPTBot", "root_allowed": true },
        { "token": "ClaudeBot", "root_allowed": true },
        { "token": "PerplexityBot", "root_allowed": true },
        { "token": "OAI-SearchBot", "root_allowed": true },
        { "token": "Google-Extended", "root_allowed": true },
        { "token": "CCBot", "root_allowed": true }
      ]
    },
    "llms": {
      "status": 200,
      "bytes": 2317,
      "llms_full_status": 200,
      "lighthouse": "pass"
    }
  }
}
```

---

## 3. Specific Observations & Fixes

### 1. Character Encoding Glitch in `llms-full.txt`
- **Observed Glitch**:
  The top header line of `https://salestaxreversecalculator.com/llms-full.txt` reads:
  ```markdown
  # Full Documentation & Rate Matrix  Reverse Sales Tax Calculator
  ```
  The character `` (Unicode Replacement Character `U+FFFD`) appears where an en-dash or em-dash was saved in non-UTF-8 encoding (likely CP-1252).
- **Fix**: Re-encode the file as UTF-8 without BOM and replace the byte with a standard ASCII hyphen (`-`) or valid UTF-8 em-dash (`—`).

### 2. Citability & Structural Passage Extraction (GEO)
- **Positive**: Formula definitions are enclosed in distinct semantic markdown-like blocks:
  > **Pre-Tax Price** = Final Price / (1 + (Tax Rate / 100))  
  > **Tax Amount** = Final Price - Pre-Tax Price
- This enables LLM models (ChatGPT, Perplexity, Claude, Gemini) and Google AI Overviews to cleanly cite the formula and worked examples without hallucination.

### 3. Machine-Callable WebMCP / Tool Readiness
- Currently, agents reading the site can understand the math, but have no machine-callable tool to execute reverse calculations programmatically.
- **Recommendation**:
  Implement a lightweight public API route:
  ```
  GET /api/calculate?total=107.50&rate=7.5
  ```
  Returning:
  ```json
  {
    "preTaxPrice": 100.00,
    "taxAmount": 7.50,
    "taxRate": 7.5,
    "formula": "107.50 / (1 + 0.075)"
  }
  ```
  Document this endpoint in `llms.txt` under an `## Agent Tools / API` section.
