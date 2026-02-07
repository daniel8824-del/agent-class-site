import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Read favicon SVG
const faviconSvg = readFileSync(join(publicDir, 'favicon.svg'));

// Generate favicon PNGs
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

console.log('Generating favicon PNGs...');
for (const { name, size } of sizes) {
  await sharp(faviconSvg, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(join(publicDir, name));
  console.log(`  ✓ ${name} (${size}x${size})`);
}

// Generate OG Image (1200x630)
console.log('\nGenerating OG image...');

const ogWidth = 1200;
const ogHeight = 630;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0f1a"/>
      <stop offset="40%" stop-color="#111327"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="50%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="50%" stop-color="#a5b4fc"/>
      <stop offset="100%" stop-color="#67e8f9"/>
    </linearGradient>
    <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.15"/>
    </linearGradient>
    <radialGradient id="glow1" cx="15%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="70%" r="35%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur1">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${ogWidth}" height="${ogHeight}" fill="url(#bgGrad)"/>

  <!-- Ambient glows -->
  <rect width="${ogWidth}" height="${ogHeight}" fill="url(#glow1)"/>
  <rect width="${ogWidth}" height="${ogHeight}" fill="url(#glow2)"/>

  <!-- Decorative orbs -->
  <circle cx="120" cy="200" r="180" fill="#8b5cf6" opacity="0.06" filter="url(#blur1)"/>
  <circle cx="1080" cy="430" r="160" fill="#06b6d4" opacity="0.05" filter="url(#blur1)"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.04" stroke="#a5b4fc" stroke-width="0.5">
    <line x1="200" y1="0" x2="200" y2="${ogHeight}"/>
    <line x1="400" y1="0" x2="400" y2="${ogHeight}"/>
    <line x1="600" y1="0" x2="600" y2="${ogHeight}"/>
    <line x1="800" y1="0" x2="800" y2="${ogHeight}"/>
    <line x1="1000" y1="0" x2="1000" y2="${ogHeight}"/>
    <line x1="0" y1="157" x2="${ogWidth}" y2="157"/>
    <line x1="0" y1="315" x2="${ogWidth}" y2="315"/>
    <line x1="0" y1="472" x2="${ogWidth}" y2="472"/>
  </g>

  <!-- Neural connection dots -->
  <circle cx="200" cy="157" r="3" fill="#8b5cf6" opacity="0.25"/>
  <circle cx="400" cy="315" r="4" fill="#6366f1" opacity="0.2"/>
  <circle cx="600" cy="157" r="3" fill="#a5b4fc" opacity="0.15"/>
  <circle cx="800" cy="472" r="3.5" fill="#06b6d4" opacity="0.2"/>
  <circle cx="1000" cy="315" r="3" fill="#67e8f9" opacity="0.18"/>

  <!-- Connection lines -->
  <line x1="200" y1="157" x2="400" y2="315" stroke="url(#accent)" stroke-width="0.5" opacity="0.1"/>
  <line x1="400" y1="315" x2="600" y2="157" stroke="url(#accent)" stroke-width="0.5" opacity="0.08"/>
  <line x1="800" y1="472" x2="1000" y2="315" stroke="url(#accent)" stroke-width="0.5" opacity="0.1"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="${ogWidth}" height="4" fill="url(#accent)"/>

  <!-- Favicon icon (small, top-left area) -->
  <g transform="translate(80, 180) scale(0.28)">
    <rect width="512" height="512" rx="108" fill="url(#accent)" opacity="0.9"/>
    <path d="M256 96 L368 400 L328 400 L304 328 L208 328 L184 400 L144 400 Z M224 292 L288 292 L256 192 Z" fill="white" opacity="0.95"/>
    <circle cx="160" cy="160" r="12" fill="url(#textGrad)" opacity="0.6"/>
    <circle cx="352" cy="160" r="10" fill="url(#textGrad)" opacity="0.5"/>
  </g>

  <!-- Title: 에이전트 클래스 -->
  <text x="290" y="265" font-family="'Segoe UI', 'Apple SD Gothic Neo', sans-serif" font-size="72" font-weight="700" fill="url(#textGrad)">에이전트 클래스</text>

  <!-- Subtitle -->
  <text x="290" y="325" font-family="'Segoe UI', Arial, sans-serif" font-size="30" font-weight="400" fill="#94a3b8" letter-spacing="3">AI Agent Development Course</text>

  <!-- Chapter tags -->
  <g transform="translate(290, 370)">
    <rect x="0" y="0" width="72" height="32" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" stroke-width="1" stroke-opacity="0.3"/>
    <text x="36" y="21" font-family="'Segoe UI', sans-serif" font-size="13" fill="#c4b5fd" text-anchor="middle">RAG</text>

    <rect x="84" y="0" width="72" height="32" rx="6" fill="#7c3aed" opacity="0.15" stroke="#7c3aed" stroke-width="1" stroke-opacity="0.3"/>
    <text x="120" y="21" font-family="'Segoe UI', sans-serif" font-size="13" fill="#c4b5fd" text-anchor="middle">n8n</text>

    <rect x="168" y="0" width="72" height="32" rx="6" fill="#6366f1" opacity="0.15" stroke="#6366f1" stroke-width="1" stroke-opacity="0.3"/>
    <text x="204" y="21" font-family="'Segoe UI', sans-serif" font-size="13" fill="#a5b4fc" text-anchor="middle">MCP</text>

    <rect x="252" y="0" width="72" height="32" rx="6" fill="#4f46e5" opacity="0.15" stroke="#4f46e5" stroke-width="1" stroke-opacity="0.3"/>
    <text x="288" y="21" font-family="'Segoe UI', sans-serif" font-size="13" fill="#a5b4fc" text-anchor="middle">GIS</text>

    <rect x="336" y="0" width="120" height="32" rx="6" fill="#06b6d4" opacity="0.12" stroke="#06b6d4" stroke-width="1" stroke-opacity="0.25"/>
    <text x="396" y="21" font-family="'Segoe UI', sans-serif" font-size="13" fill="#67e8f9" text-anchor="middle">8 Chapters</text>
  </g>

  <!-- Bottom info -->
  <text x="80" y="560" font-family="'Segoe UI', sans-serif" font-size="16" fill="#475569" letter-spacing="1">agent-class-site.vercel.app</text>

  <!-- Bottom accent line -->
  <rect x="0" y="${ogHeight - 3}" width="${ogWidth}" height="3" fill="url(#accent)" opacity="0.6"/>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ quality: 95 })
  .toFile(join(publicDir, 'og-image.png'));
console.log('  ✓ og-image.png (1200x630)');

// Generate web manifest
const manifest = {
  name: '에이전트 클래스 | AI Agent Development Course',
  short_name: '에이전트 클래스',
  icons: [
    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: '#0d0f1a',
  background_color: '#0d0f1a',
  display: 'standalone',
};

import { writeFileSync } from 'fs';
writeFileSync(join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('  ✓ site.webmanifest');

console.log('\nAll assets generated successfully!');
