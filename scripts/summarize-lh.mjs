import fs from 'fs';
import path from 'path';

function summarize(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null;
  }
  const report = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const cats = report.categories || {};
  const audits = report.audits || {};

  return {
    performance: Math.round((cats.performance?.score || 0) * 100),
    accessibility: Math.round((cats.accessibility?.score || 0) * 100),
    bestPractices: Math.round((cats['best-practices']?.score || 0) * 100),
    seo: Math.round((cats.seo?.score || 0) * 100),
    lcp: audits['largest-contentful-paint']?.displayValue || audits['largest-contentful-paint']?.numericValue,
    cls: audits['cumulative-layout-shift']?.displayValue || audits['cumulative-layout-shift']?.numericValue,
    tbt: audits['total-blocking-time']?.displayValue || audits['total-blocking-time']?.numericValue,
    inp: audits['interaction-to-next-paint']?.displayValue || 'N/A'
  };
}

const dir = process.argv[2] || 'audit/before';
const desktopPath = path.join(dir, 'lighthouse-desktop.report.json');
const mobilePath = path.join(dir, 'lighthouse-mobile.report.json');

const desktop = summarize(desktopPath);
const mobile = summarize(mobilePath);

const summary = { desktop, mobile };
console.log(JSON.stringify(summary, null, 2));

fs.writeFileSync(path.join(dir, 'lighthouse-summary.json'), JSON.stringify(summary, null, 2), 'utf-8');
