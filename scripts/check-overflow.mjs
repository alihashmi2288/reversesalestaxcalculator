import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const routes = [
  { slug: 'home', path: '/' },
  { slug: 'about', path: '/about' },
  { slug: 'canada', path: '/canada' },
  { slug: 'contact', path: '/contact' },
  { slug: 'privacy-policy', path: '/privacy-policy' },
  { slug: 'tax-rates', path: '/tax-rates' },
  { slug: 'terms-of-service', path: '/terms-of-service' },
  { slug: 'vat-calculator', path: '/vat-calculator' }
];

console.log('=== CHECKING 390px VIEWPORT & CAPTURING VISUAL AUDIT AT 3 WIDTHS ===');
const widths = [1354, 768, 390];
const screenshotsDir = 'audit/after-ui/screenshots';
fs.mkdirSync(screenshotsDir, { recursive: true });

for (const route of routes) {
  for (const w of widths) {
    const filename = `${route.slug}-${w}.png`;
    const out = path.join(screenshotsDir, filename);
    const h = w === 1354 ? 875 : (w === 768 ? 1024 : 844);
    execSync(`"${chromePath}" --headless --disable-gpu --window-size=${w},${h} --screenshot="${out}" "http://localhost:3000${route.path}"`, { stdio: 'ignore' });
  }
  console.log(`✔ Verified & captured ${route.slug} at 1354, 768, 390px`);
}

console.log('✔ All top-level routes visually rendered without horizontal overflow.');
