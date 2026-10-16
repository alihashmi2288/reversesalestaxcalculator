const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Crisp, mathematically tuned SVG for PreTaxPrice brand
function getMasterSvg(size = 512) {
  // Compute proportional parameters based on 32 grid
  const scale = size / 32;
  const r = 5 * scale;
  const limeSize = 9 * scale;
  const frameX = 5.5 * scale;
  const frameY = 4.5 * scale;
  const frameW = 21 * scale;
  const frameH = 23 * scale;
  const frameRx = 3.5 * scale;
  const frameStroke = Math.max(1, 2 * scale);

  const screenX = 8.5 * scale;
  const screenY = 7.5 * scale;
  const screenW = 15 * scale;
  const screenH = 4.5 * scale;
  const screenRx = 1 * scale;

  const keyW = 6.5 * scale;
  const keyH = 4.5 * scale;
  const keyRx = 1 * scale;
  const keyCol1X = 8.5 * scale;
  const keyCol2X = 17 * scale;
  const keyRow1Y = 14.5 * scale;
  const keyRow2Y = 20.5 * scale;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <clipPath id="tile-clip-${size}">
      <rect width="${size}" height="${size}" rx="${r}" />
    </clipPath>
  </defs>

  <!-- Deep Spruce Tile Background -->
  <rect width="${size}" height="${size}" rx="${r}" fill="#008254" />

  <!-- High-def edge highlight for dark/light browser contrast -->
  <rect x="${scale * 0.5}" y="${scale * 0.5}" width="${size - scale}" height="${size - scale}" rx="${r - scale * 0.5}" fill="none" stroke="#00a36a" stroke-width="${Math.max(1, scale)}" stroke-opacity="0.3" />

  <!-- Top-Right NerdWallet Lime Corner Accent -->
  <g clip-path="url(#tile-clip-${size})">
    <rect x="${size - limeSize}" y="0" width="${limeSize}" height="${limeSize}" fill="#8dc63f" />
  </g>

  <!-- White Calculator Housing Frame -->
  <rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}" rx="${frameRx}" fill="none" stroke="#ffffff" stroke-width="${frameStroke}" />

  <!-- Mint LCD Display Window -->
  <rect x="${screenX}" y="${screenY}" width="${screenW}" height="${screenH}" rx="${screenRx}" fill="#effcf8" />

  <!-- 4 Distinct Financial Keys (2x2 Grid) -->
  <!-- Key 1: White -->
  <rect x="${keyCol1X}" y="${keyRow1Y}" width="${keyW}" height="${keyH}" rx="${keyRx}" fill="#ffffff" />
  <!-- Key 2: White -->
  <rect x="${keyCol2X}" y="${keyRow1Y}" width="${keyW}" height="${keyH}" rx="${keyRx}" fill="#ffffff" />
  <!-- Key 3: White -->
  <rect x="${keyCol1X}" y="${keyRow2Y}" width="${keyW}" height="${keyH}" rx="${keyRx}" fill="#ffffff" />
  <!-- Key 4: Lime Action Key -->
  <rect x="${keyCol2X}" y="${keyRow2Y}" width="${keyW}" height="${keyH}" rx="${keyRx}" fill="#8dc63f" />
</svg>`;
}

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerLen = 6;
  const dirEntryLen = 16;
  let offset = headerLen + dirEntryLen * count;

  const header = Buffer.alloc(headerLen);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntryLen);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Planes
    entry.writeUInt16LE(32, 6); // BPP
    entry.writeUInt32LE(item.buffer.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(b => b.buffer)]);
}

async function buildAllIcons() {
  const root = __dirname;
  const publicDir = path.join(root, 'public');
  const appDir = path.join(root, 'src', 'app');

  const svg512 = getMasterSvg(512);
  const svg32 = getMasterSvg(32);

  // 1. Save public/favicon.svg (Pure vector favicon for modern browsers)
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg32);
  console.log('✔ Generated public/favicon.svg');

  // 2. Generate PNG buffers at all required sizes
  const b16 = await sharp(Buffer.from(svg512)).resize(16, 16).png().toBuffer();
  const b32 = await sharp(Buffer.from(svg512)).resize(32, 32).png().toBuffer();
  const b48 = await sharp(Buffer.from(svg512)).resize(48, 48).png().toBuffer();
  const b96 = await sharp(Buffer.from(svg512)).resize(96, 96).png().toBuffer();
  const b180 = await sharp(Buffer.from(svg512)).resize(180, 180).png().toBuffer();
  const b192 = await sharp(Buffer.from(svg512)).resize(192, 192).png().toBuffer();
  const b512 = await sharp(Buffer.from(svg512)).resize(512, 512).png().toBuffer();

  // 3. Build multi-resolution ICO file (16, 32, 48)
  const ico = createIco([
    { width: 16, height: 16, buffer: b16 },
    { width: 32, height: 32, buffer: b32 },
    { width: 48, height: 48, buffer: b48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico);
  console.log('✔ Generated public/favicon.ico & src/app/favicon.ico (multi-resolution 16/32/48)');

  // 4. Save PNG files to public/ (including Google-compliant 48px multiples)
  fs.writeFileSync(path.join(publicDir, 'icon-48.png'), b48);
  fs.writeFileSync(path.join(publicDir, 'icon-96.png'), b96);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), b192);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), b192);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), b180);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), b512);
  console.log('✔ Generated public/icon-48.png, icon-96.png, icon-192.png, icon.png, apple-icon.png, icon-512.png');

  // 5. Save PNG files to src/app/
  fs.writeFileSync(path.join(appDir, 'icon.png'), b192);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), b180);
  console.log('✔ Generated src/app/icon.png and src/app/apple-icon.png');

  // 6. Generate public/site.webmanifest
  const manifest = {
    name: 'PreTaxPrice - Reverse Sales Tax Calculator',
    short_name: 'PreTaxPrice',
    description: 'Calculate original price before sales tax or VAT instantly.',
    start_url: '/',
    display: 'standalone',
    background_color: '#008254',
    theme_color: '#008254',
    icons: [
      {
        src: '/icon-48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/icon-96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✔ Generated public/site.webmanifest');
}

buildAllIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
