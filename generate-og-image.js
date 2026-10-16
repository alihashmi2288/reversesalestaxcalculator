const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function getMasterOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00482f" />
      <stop offset="45%" stop-color="#006642" />
      <stop offset="100%" stop-color="#008254" />
    </linearGradient>

    <radialGradient id="lime-glow" cx="90%" cy="10%" r="50%">
      <stop offset="0%" stop-color="#9ae600" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#9ae600" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="mint-glow" cx="10%" cy="90%" r="50%">
      <stop offset="0%" stop-color="#b7ecda" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#b7ecda" stop-opacity="0" />
    </radialGradient>

    <clipPath id="tile-clip">
      <rect width="48" height="48" rx="8" />
    </clipPath>
  </defs>

  <style>
    .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Montserrat, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: "JetBrains Mono", Consolas, "Courier New", monospace; }
  </style>

  <!-- 1. Background Gradient -->
  <rect width="1200" height="630" fill="url(#bg-grad)" />

  <!-- 2. Ambient Corner Glows -->
  <rect width="1200" height="630" fill="url(#lime-glow)" />
  <rect width="1200" height="630" fill="url(#mint-glow)" />

  <!-- 3. Inner Card Container -->
  <g transform="translate(48, 48)">
    <rect width="1104" height="534" rx="16" fill="#00301f" fill-opacity="0.6" stroke="#b7ecda" stroke-opacity="0.25" stroke-width="1.5" />

    <!-- Header Section -->
    <g transform="translate(48, 44)">
      <!-- Logo Tile (48x48) -->
      <g>
        <rect width="48" height="48" rx="8" fill="#008254" stroke="#00a36a" stroke-width="1.5" />
        <g clip-path="url(#tile-clip)">
          <rect x="34" y="0" width="14" height="14" fill="#8dc63f" />
        </g>
        <!-- Housing -->
        <rect x="9" y="7" width="30" height="34" rx="4" fill="none" stroke="#ffffff" stroke-width="2" />
        <!-- Mint LCD -->
        <rect x="14" y="11" width="20" height="7" rx="2" fill="#effcf8" />
        <!-- 4 Keys -->
        <rect x="14" y="22" width="8" height="6" rx="1" fill="#ffffff" />
        <rect x="26" y="22" width="8" height="6" rx="1" fill="#ffffff" />
        <rect x="14" y="31" width="8" height="6" rx="1" fill="#ffffff" />
        <rect x="26" y="31" width="8" height="6" rx="1" fill="#8dc63f" />
      </g>

      <!-- Wordmark -->
      <text x="64" y="28" class="font-sans" font-size="28" font-weight="800" fill="#ffffff" letter-spacing="-0.5">PreTaxPrice</text>
      <text x="64" y="44" class="font-sans" font-size="11" font-weight="700" fill="#e8fdac" letter-spacing="1.2">REVERSE SALES TAX CALCULATOR</text>

      <!-- Trust Badge Pill (Right) -->
      <g transform="translate(760, 4)">
        <rect width="248" height="36" rx="6" fill="#e8fdac" />
        <text x="124" y="23" text-anchor="middle" class="font-sans" font-size="13" font-weight="800" fill="#00482f" letter-spacing="0.6">✓ 2026 TAX RATES VERIFIED</text>
      </g>
    </g>

    <!-- Main Content Body -->
    <g transform="translate(48, 150)">
      <!-- Eyebrow -->
      <text x="0" y="24" class="font-sans" font-size="14" font-weight="700" fill="#9ae600" letter-spacing="1.8">INSTANT PRE-TAX PRICE &amp; SALES TAX BREAKDOWN</text>

      <!-- Main Headline -->
      <text x="0" y="86" class="font-sans" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-1.2">Reverse Sales Tax Calculator</text>

      <!-- Subtitle -->
      <text x="0" y="132" class="font-sans" font-size="20" font-weight="400" fill="#effcf8">Calculate original before-tax price from any checkout receipt or invoice total.</text>
    </g>

    <!-- 3 Data / Feature Stat Tiles -->
    <g transform="translate(48, 335)">
      <!-- Tile 1: US States -->
      <g transform="translate(0, 0)">
        <rect width="315" height="74" rx="8" fill="#006642" fill-opacity="0.65" stroke="#b7ecda" stroke-opacity="0.35" stroke-width="1.5" />
        <text x="24" y="28" class="font-sans" font-size="11" font-weight="700" fill="#b7ecda" letter-spacing="0.8">UNITED STATES</text>
        <text x="24" y="55" class="font-sans" font-size="20" font-weight="800" fill="#ffffff">All 50 States + Local</text>
      </g>

      <!-- Tile 2: Canada -->
      <g transform="translate(345, 0)">
        <rect width="315" height="74" rx="8" fill="#006642" fill-opacity="0.65" stroke="#b7ecda" stroke-opacity="0.35" stroke-width="1.5" />
        <text x="24" y="28" class="font-sans" font-size="11" font-weight="700" fill="#b7ecda" letter-spacing="0.8">CANADA</text>
        <text x="24" y="55" class="font-sans" font-size="20" font-weight="800" fill="#9ae600">GST, HST, PST &amp; QST</text>
      </g>

      <!-- Tile 3: Formula -->
      <g transform="translate(690, 0)">
        <rect width="318" height="74" rx="8" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1" />
        <text x="24" y="28" class="font-sans" font-size="11" font-weight="700" fill="#b7ecda" letter-spacing="0.8">EXACT ALGEBRA FORMULA</text>
        <text x="24" y="55" class="font-mono" font-size="18" font-weight="700" fill="#effcf8">PreTax = Total ÷ (1 + r)</text>
      </g>
    </g>

    <!-- Footer Bar -->
    <g transform="translate(48, 470)">
      <line x1="0" y1="0" x2="1008" y2="0" stroke="#b7ecda" stroke-opacity="0.2" stroke-width="1" />
      <text x="0" y="32" class="font-sans" font-size="16" font-weight="700" fill="#e8fdac" letter-spacing="0.4">salestaxreversecalculator.com</text>
      <text x="1008" y="32" text-anchor="end" class="font-sans" font-size="13" font-weight="500" fill="#b7ecda">Free Financial Tool • Accurate to the Cent • Updated for 2026</text>
    </g>
  </g>
</svg>`;
}

async function generateMasterOg() {
  const svg = getMasterOgSvg();
  const targetPath = path.join(__dirname, 'public', 'og-image.png');
  
  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile(targetPath);

  console.log('✔ Successfully generated brand new public/og-image.png (1200x630)');
}

generateMasterOg().catch(err => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
