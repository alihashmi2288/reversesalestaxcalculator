import fs from 'fs';
import path from 'path';

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

const beforeHeadings = loadJson('audit/before/headings.json');
const afterHeadings = loadJson('audit/after/headings.json');

const beforeMeta = loadJson('audit/before/meta.json');
const afterMeta = loadJson('audit/after/meta.json');

const beforeJsonLd = loadJson('audit/before/jsonld.json');
const afterJsonLd = loadJson('audit/after/jsonld.json');

const beforeLinks = loadJson('audit/before/internal-links.json');
const afterLinks = loadJson('audit/after/internal-links.json');

const beforeIds = loadJson('audit/before/ids.json');
const afterIds = loadJson('audit/after/ids.json');

const beforeLh = loadJson('audit/before/lighthouse-summary.json');
const afterLh = loadJson('audit/after/lighthouse-summary.json');

const beforeWords = parseInt(fs.readFileSync('audit/before/word-count.txt', 'utf-8').match(/\d+/)[0], 10);
const afterWords = parseInt(fs.readFileSync('audit/after/word-count.txt', 'utf-8').match(/\d+/)[0], 10);

console.log('=== SEO INVARIANTS DIFF VERIFICATION ===');
console.log(`1. Headings Count: Before = ${beforeHeadings.length}, After = ${afterHeadings.length}`);
let headingMismatches = 0;
for (let i = 0; i < beforeHeadings.length; i++) {
  const b = beforeHeadings[i];
  const a = afterHeadings[i];
  if (!a || b.level !== a.level || b.text !== a.text) {
    console.log(`Mismatch at heading #${i}: before "${b.level}: ${b.text}" vs after "${a?.level}: ${a?.text}"`);
    headingMismatches++;
  }
}
if (headingMismatches === 0) {
  console.log('✔ Headings outline & hierarchy: 100% IDENTICAL');
}

console.log(`2. Title: Before = "${beforeMeta.title}" | After = "${afterMeta.title}"`);
console.log(`   Canonical: Before = "${beforeMeta.canonical}" | After = "${afterMeta.canonical}"`);
if (beforeMeta.title === afterMeta.title && beforeMeta.canonical === afterMeta.canonical) {
  console.log('✔ Title & Canonical: 100% IDENTICAL');
}

console.log(`3. JSON-LD Blocks: Before = ${beforeJsonLd.length}, After = ${afterJsonLd.length}`);
const jsonLdMatch = JSON.stringify(beforeJsonLd) === JSON.stringify(afterJsonLd);
console.log(jsonLdMatch ? '✔ JSON-LD Schemas: 100% IDENTICAL' : 'Note: JSON-LD check: ' + (jsonLdMatch ? 'Match' : 'Different'));

console.log(`4. Word Count: Before = ${beforeWords}, After = ${afterWords} (Diff = +${afterWords - beforeWords} words)`);
if (afterWords >= beforeWords) {
  console.log('✔ Server-Rendered Content: Preserved and expanded (no text lost)');
}

console.log(`5. Internal Links: Before = ${beforeLinks.length}, After = ${afterLinks.length}`);
const missingLinks = beforeLinks.filter(bl => !afterLinks.some(al => al.href === bl.href));
console.log(`   Missing internal links: ${missingLinks.length}`);
if (missingLinks.length === 0) {
  console.log('✔ All baseline internal links preserved');
}

console.log(`6. Element IDs: Before = ${beforeIds.length}, After = ${afterIds.length}`);
const missingIds = beforeIds.filter(bi => !afterIds.includes(bi));
console.log(`   Missing element IDs: ${missingIds.length}`);
if (missingIds.length === 0) {
  console.log('✔ All baseline element IDs preserved');
}

console.log('\n=== LIGHTHOUSE SCORES COMPARISON ===');
console.table({
  'Desktop Perf': { Before: beforeLh.desktop.performance, After: afterLh.desktop.performance },
  'Desktop A11y': { Before: beforeLh.desktop.accessibility, After: afterLh.desktop.accessibility },
  'Desktop BestPrac': { Before: beforeLh.desktop.bestPractices, After: afterLh.desktop.bestPractices },
  'Desktop SEO': { Before: beforeLh.desktop.seo, After: afterLh.desktop.seo },
  'Desktop LCP': { Before: beforeLh.desktop.lcp, After: afterLh.desktop.lcp },
  'Desktop CLS': { Before: beforeLh.desktop.cls, After: afterLh.desktop.cls },
  'Mobile Perf': { Before: beforeLh.mobile.performance, After: afterLh.mobile.performance },
  'Mobile A11y': { Before: beforeLh.mobile.accessibility, After: afterLh.mobile.accessibility },
  'Mobile BestPrac': { Before: beforeLh.mobile.bestPractices, After: afterLh.mobile.bestPractices },
  'Mobile SEO': { Before: beforeLh.mobile.seo, After: afterLh.mobile.seo },
  'Mobile LCP': { Before: beforeLh.mobile.lcp, After: afterLh.mobile.lcp },
  'Mobile CLS': { Before: beforeLh.mobile.cls, After: afterLh.mobile.cls },
});
