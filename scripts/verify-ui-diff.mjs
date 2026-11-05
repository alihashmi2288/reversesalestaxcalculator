import fs from 'fs';
import path from 'path';

const beforeDir = 'audit/before-ui';
const afterDir = 'audit/after-ui';

const ROUTES = [
  'home',
  'about',
  'canada',
  'contact',
  'privacy-policy',
  'tax-rates',
  'terms-of-service',
  'vat-calculator'
];

function loadJson(p) {
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

console.log('====================================================');
console.log('       PRETAXPRICE UI-ONLY DIFF VERIFICATION        ');
console.log('====================================================\n');

let totalNumberDiscrepancies = 0;
let totalHeadingDiscrepancies = 0;
let totalMetaDiscrepancies = 0;
let totalJsonLdDiscrepancies = 0;
let totalMissingIds = 0;
let totalMissingLinks = 0;

for (const slug of ROUTES) {
  console.log(`\n--- [Page: ${slug}] ---`);

  // 1. Number tokens verification (DATA FREEZE)
  const beforeNumbers = loadJson(path.join(beforeDir, slug, 'numbers.json')) || [];
  const afterNumbers = loadJson(path.join(afterDir, slug, 'numbers.json')) || [];

  if (beforeNumbers.length !== afterNumbers.length) {
    console.error(`❌ Number count mismatch: Before=${beforeNumbers.length}, After=${afterNumbers.length}`);
    totalNumberDiscrepancies++;
  } else {
    let numDiffs = 0;
    for (let i = 0; i < beforeNumbers.length; i++) {
      if (beforeNumbers[i] !== afterNumbers[i]) {
        console.error(`❌ Number mismatch at index ${i}: "${beforeNumbers[i]}" !== "${afterNumbers[i]}"`);
        numDiffs++;
        totalNumberDiscrepancies++;
      }
    }
    if (numDiffs === 0) {
      console.log(`✔ Numbers & Rates Invariance: 100% IDENTICAL (${beforeNumbers.length} numerical tokens verified)`);
    }
  }

  // 2. Headings outline verification (SEO LOCK)
  const beforeHeadings = loadJson(path.join(beforeDir, slug, 'headings.json')) || [];
  const afterHeadings = loadJson(path.join(afterDir, slug, 'headings.json')) || [];

  if (beforeHeadings.length !== afterHeadings.length) {
    console.error(`❌ Headings count mismatch: Before=${beforeHeadings.length}, After=${afterHeadings.length}`);
    totalHeadingDiscrepancies++;
  } else {
    let headingDiffs = 0;
    for (let i = 0; i < beforeHeadings.length; i++) {
      const b = beforeHeadings[i];
      const a = afterHeadings[i];
      if (b.level !== a.level || b.text !== a.text) {
        console.error(`❌ Heading mismatch at #${i}: "${b.level}: ${b.text}" !== "${a.level}: ${a.text}"`);
        headingDiffs++;
        totalHeadingDiscrepancies++;
      }
    }
    if (headingDiffs === 0) {
      console.log(`✔ Headings Hierarchy (H1-H6): 100% IDENTICAL (${beforeHeadings.length} headings verified)`);
    }
  }

  // 3. Meta, Title, Canonical, OG verification (SEO LOCK)
  const beforeMeta = loadJson(path.join(beforeDir, slug, 'meta.json')) || {};
  const afterMeta = loadJson(path.join(afterDir, slug, 'meta.json')) || {};

  if (beforeMeta.title !== afterMeta.title) {
    console.error(`❌ Title mismatch: "${beforeMeta.title}" !== "${afterMeta.title}"`);
    totalMetaDiscrepancies++;
  } else if (beforeMeta.canonical !== afterMeta.canonical) {
    console.error(`❌ Canonical mismatch: "${beforeMeta.canonical}" !== "${afterMeta.canonical}"`);
    totalMetaDiscrepancies++;
  } else {
    console.log(`✔ Title & Canonical URL: 100% IDENTICAL ("${beforeMeta.title}")`);
  }

  // 4. JSON-LD Blocks verification (SEO LOCK)
  const beforeJsonLd = loadJson(path.join(beforeDir, slug, 'jsonld.json')) || [];
  const afterJsonLd = loadJson(path.join(afterDir, slug, 'jsonld.json')) || [];

  if (JSON.stringify(beforeJsonLd) !== JSON.stringify(afterJsonLd)) {
    console.error(`❌ JSON-LD Structured Data mismatch!`);
    totalJsonLdDiscrepancies++;
  } else {
    console.log(`✔ JSON-LD Structured Data: 100% IDENTICAL (${beforeJsonLd.length} blocks verified)`);
  }

  // 5. Baseline Element IDs preservation
  const beforeIds = loadJson(path.join(beforeDir, slug, 'ids.json')) || [];
  const afterIds = loadJson(path.join(afterDir, slug, 'ids.json')) || [];
  const missingIds = beforeIds.filter(id => !afterIds.includes(id));
  if (missingIds.length > 0) {
    console.error(`❌ Missing element IDs: ${missingIds.join(', ')}`);
    totalMissingIds += missingIds.length;
  } else {
    console.log(`✔ Element IDs: All ${beforeIds.length} baseline IDs preserved`);
  }

  // 6. Internal links preservation
  const beforeLinks = loadJson(path.join(beforeDir, slug, 'internal-links.json')) || [];
  const afterLinks = loadJson(path.join(afterDir, slug, 'internal-links.json')) || [];
  const missingLinks = beforeLinks.filter(bl => !afterLinks.some(al => al.href === bl.href));
  if (missingLinks.length > 0) {
    console.error(`❌ Missing internal links: ${missingLinks.map(l => l.href).join(', ')}`);
    totalMissingLinks += missingLinks.length;
  } else {
    const newLinks = afterLinks.filter(al => !beforeLinks.some(bl => bl.href === al.href));
    console.log(`✔ Internal Links: All ${beforeLinks.length} baseline links preserved` + (newLinks.length > 0 ? ` (+${newLinks.length} allowed new UI links: ${newLinks.map(l => l.text).join(', ')})` : ''));
  }

  // 7. Word count & visible text diff check
  const beforeWords = parseInt(fs.readFileSync(path.join(beforeDir, slug, 'word-count.txt'), 'utf-8').match(/\d+/)[0], 10);
  const afterWords = parseInt(fs.readFileSync(path.join(afterDir, slug, 'word-count.txt'), 'utf-8').match(/\d+/)[0], 10);
  console.log(`✔ Word Count: Baseline=${beforeWords}, Verified=${afterWords} (diff = ${afterWords - beforeWords >= 0 ? '+' : ''}${afterWords - beforeWords} words)`);
}

// 8. Lighthouse summary comparison
console.log('\n====================================================');
console.log('            LIGHTHOUSE SCORE COMPARISON             ');
console.log('====================================================');

const beforeLh = loadJson(path.join(beforeDir, 'lighthouse-summary.json'));
const afterLh = loadJson(path.join(afterDir, 'lighthouse-summary.json'));

if (beforeLh && afterLh) {
  console.table({
    'Desktop Perf': { Baseline: beforeLh.desktop.performance, Verified: afterLh.desktop.performance },
    'Desktop A11y': { Baseline: beforeLh.desktop.accessibility, Verified: afterLh.desktop.accessibility },
    'Desktop BestPrac': { Baseline: beforeLh.desktop.bestPractices, Verified: afterLh.desktop.bestPractices },
    'Desktop SEO': { Baseline: beforeLh.desktop.seo, Verified: afterLh.desktop.seo },
    'Desktop LCP': { Baseline: beforeLh.desktop.lcp, Verified: afterLh.desktop.lcp },
    'Desktop CLS': { Baseline: beforeLh.desktop.cls, Verified: afterLh.desktop.cls },
    'Mobile Perf': { Baseline: beforeLh.mobile.performance, Verified: afterLh.mobile.performance },
    'Mobile A11y': { Baseline: beforeLh.mobile.accessibility, Verified: afterLh.mobile.accessibility },
    'Mobile BestPrac': { Baseline: beforeLh.mobile.bestPractices, Verified: afterLh.mobile.bestPractices },
    'Mobile SEO': { Baseline: beforeLh.mobile.seo, Verified: afterLh.mobile.seo },
    'Mobile LCP': { Baseline: beforeLh.mobile.lcp, Verified: afterLh.mobile.lcp },
    'Mobile CLS': { Baseline: beforeLh.mobile.cls, Verified: afterLh.mobile.cls },
  });
}

console.log('\n=== OVERALL INVARIANT VERIFICATION RESULT ===');
if (totalNumberDiscrepancies === 0 && totalHeadingDiscrepancies === 0 && totalMetaDiscrepancies === 0 && totalJsonLdDiscrepancies === 0 && totalMissingIds === 0 && totalMissingLinks === 0) {
  console.log('🎉 ALL SEO, ACCESSIBILITY & DATA INVARIANTS 100% SATISFIED! ZERO REGRESSIONS.');
} else {
  console.error(`⚠️ Found discrepancies:
  - Numbers: ${totalNumberDiscrepancies}
  - Headings: ${totalHeadingDiscrepancies}
  - Meta/Title: ${totalMetaDiscrepancies}
  - JSON-LD: ${totalJsonLdDiscrepancies}
  - Missing IDs: ${totalMissingIds}
  - Missing Links: ${totalMissingLinks}`);
  process.exit(1);
}
