import fs from 'fs';

// Helper to create clean SVG placeholders in Blue & White Theme
function makeSvgImage({ width, height, title, subtitle, filename, category }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="50%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
  
  <!-- Architectural grid accent lines -->
  <g stroke="#F1F5F9" stroke-width="1" stroke-dasharray="4,6">
    <line x1="${width * 0.2}" y1="20" x2="${width * 0.2}" y2="${height - 20}" />
    <line x1="${width * 0.5}" y1="20" x2="${width * 0.5}" y2="${height - 20}" />
    <line x1="${width * 0.8}" y1="20" x2="${width * 0.8}" y2="${height - 20}" />
    <line x1="20" y1="${height * 0.3}" x2="${width - 20}" y2="${height * 0.3}" />
    <line x1="20" y1="${height * 0.7}" x2="${width - 20}" y2="${height * 0.7}" />
  </g>

  <!-- Central Crest / Monogram in Royal Blue -->
  <g transform="translate(${width / 2}, ${height * 0.42})">
    <circle cx="0" cy="0" r="48" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
    <circle cx="0" cy="0" r="40" fill="#FFFFFF" stroke="url(#blueGrad)" stroke-width="2.5" />
    <g fill="none" stroke="url(#blueGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-20 -15 L-6 20 L6 -8" />
      <path d="M8 -20 L8 20" />
      <path d="M24 -12 L10 4 L24 20" />
    </g>
  </g>

  <!-- Labels -->
  <text x="${width / 2}" y="${height * 0.65}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#0F172A" letter-spacing="-0.3">
    ${title}
  </text>
  <text x="${width / 2}" y="${height * 0.72}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#2563EB">
    ${subtitle}
  </text>

  <!-- Replaceable instruction badge -->
  <g transform="translate(${width / 2 - 130}, ${height * 0.80})">
    <rect width="260" height="28" rx="6" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1" />
    <text x="130" y="18" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748B">
      [Replace with: ${filename}]
    </text>
  </g>

  <!-- Corner blue marks -->
  <path d="M 24 38 L 24 24 L 38 24" fill="none" stroke="url(#blueGrad)" stroke-width="2" stroke-linecap="round" />
  <path d="M ${width - 38} 24 L ${width - 24} 24 L ${width - 24} 38" fill="none" stroke="url(#blueGrad)" stroke-width="2" stroke-linecap="round" />
  <path d="M 24 ${height - 38} L 24 ${height - 24} L 38 ${height - 24}" fill="none" stroke="url(#blueGrad)" stroke-width="2" stroke-linecap="round" />
  <path d="M ${width - 38} ${height - 24} L ${width - 24} ${height - 24} L ${width - 24} ${height - 38}" fill="none" stroke="url(#blueGrad)" stroke-width="2" stroke-linecap="round" />
</svg>`;
}

// 1. Logo SVG in Blue & White
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="lBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="50%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="36" fill="#0F172A" />
  <rect x="8" y="8" width="184" height="184" rx="28" fill="none" stroke="url(#lBlue)" stroke-width="2" stroke-opacity="0.6" />
  <!-- Monogram VK in Royal Blue -->
  <g fill="none" stroke="url(#lBlue)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
    <path d="M52 64 L82 140 L104 86" />
    <path d="M108 60 L108 140" />
    <path d="M148 70 L114 104 L150 140" />
  </g>
</svg>`;

// 2. Favicon SVG in Blue & White
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="fBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="fBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" />
      <stop offset="50%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="104" fill="url(#fBg)" />
  <rect x="24" y="24" width="464" height="464" rx="88" fill="none" stroke="url(#fBlue)" stroke-width="6" stroke-opacity="0.4" />
  
  <!-- Monogram VK -->
  <g fill="none" stroke="url(#fBlue)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round">
    <path d="M140 160 L216 352 L272 216" />
    <path d="M280 152 L280 352" />
    <path d="M372 176 L288 264 L380 352" />
  </g>
  <circle cx="216" cy="378" r="8" fill="url(#fBlue)" />
</svg>`;

// 3. Social Preview SVG in Blue & White (1200x630)
const socialPreviewSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="sBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>
    <linearGradient id="sBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="50%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0F172A" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#sBg)" />
  <rect x="30" y="30" width="1140" height="570" rx="20" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" filter="url(#cardShadow)" />
  
  <!-- Royal Blue top accent bar -->
  <path d="M 50 32 L 1150 32" stroke="url(#sBlue)" stroke-width="6" stroke-linecap="round" />

  <!-- Left Content Column -->
  <g transform="translate(80, 110)">
    <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="#2563EB">
      OFFICIAL PERSONAL PROFILE
    </text>

    <text x="0" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="800" fill="#0F172A" letter-spacing="-1">
      Vikash Kumar
    </text>

    <text x="0" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="600" fill="#2563EB">
      Co-Founder, Elite Interior
    </text>

    <text x="0" y="220" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="#475569" font-weight="400">
      Interior Design, Turnkey Execution &amp; Digital Business Systems
    </text>
    <text x="0" y="250" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" fill="#64748B" font-weight="400">
      Ahmedabad, Gujarat · Roots in Bamarla, Barmer, Rajasthan
    </text>

    <g transform="translate(0, 310)">
      <rect x="0" y="0" width="180" height="42" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#0F172A">
        eliteinterior.pro
      </text>

      <rect x="195" y="0" width="225" height="42" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <text x="215" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#0F172A">
        +91 8529326036
      </text>
    </g>

    <text x="0" y="420" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" font-weight="600" fill="#2563EB">
      https://vikash.eliteinterior.pro/
    </text>
  </g>

  <!-- Right Visual Frame in Blue & White -->
  <g transform="translate(760, 95)">
    <rect width="360" height="440" rx="24" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
    <circle cx="180" cy="180" r="90" fill="#FFFFFF" stroke="url(#sBlue)" stroke-width="3" filter="url(#cardShadow)" />
    
    <g fill="none" stroke="url(#sBlue)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
      <path d="M135 145 L165 215 L190 165" />
      <path d="M195 140 L195 218" />
      <path d="M232 152 L198 185 L234 220" />
    </g>
    
    <text x="180" y="320" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="700" fill="#0F172A">
      VIKASH KUMAR
    </text>
    <text x="180" y="350" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#2563EB">
      Co-Founder · Elite Interior
    </text>
    <text x="180" y="380" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="400" fill="#64748B">
      Ahmedabad, Gujarat
    </text>
  </g>
</svg>`;

// 4. Profile Photo SVG in Blue & White
const profileSvg = makeSvgImage({
  width: 600,
  height: 750,
  title: 'Vikash Kumar',
  subtitle: 'Co-Founder · Elite Interior',
  filename: 'vikashkumar.jpg',
  category: 'Profile'
});

const galleryItems = [
  {
    filename: 'vikash-kumar-profile.jpg',
    title: 'Vikash Kumar — Profile Portrait',
    subtitle: 'Co-Founder, Elite Interior',
    category: 'Profile'
  },
  {
    filename: 'vikash-kumar-elite-interior.jpg',
    title: 'Elite Interior — Turnkey Architecture',
    subtitle: 'Residential Interior Projects, Ahmedabad',
    category: 'Business'
  },
  {
    filename: 'vikash-kumar-office.jpg',
    title: 'Office Base — Sun South Trade',
    subtitle: 'South Bopal, Ahmedabad, Gujarat',
    category: 'Workspace'
  },
  {
    filename: 'vikash-kumar-projects.jpg',
    title: 'Modular Living & Dining Spaces',
    subtitle: 'Contemporary Interior Execution',
    category: 'Projects'
  },
  {
    filename: 'vikash-kumar-execution.jpg',
    title: 'Site Execution & Craftsmanship',
    subtitle: 'Turnkey Project Delivery',
    category: 'Execution'
  },
  {
    filename: 'vikash-kumar-event.jpg',
    title: 'Industry & Design Engagement',
    subtitle: 'Design Industry Connections',
    category: 'Events'
  }
];

fs.writeFileSync('favicon.svg', faviconSvg);
fs.writeFileSync('public/favicon.svg', faviconSvg);

fs.writeFileSync('logo.svg', logoSvg);
fs.writeFileSync('assets/images/logo.svg', logoSvg);
fs.writeFileSync('public/logo.svg', logoSvg);
fs.writeFileSync('public/assets/images/logo.svg', logoSvg);

fs.writeFileSync('assets/images/vikash-kumar-social-preview.svg', socialPreviewSvg);
fs.writeFileSync('public/assets/images/vikash-kumar-social-preview.svg', socialPreviewSvg);

fs.writeFileSync('vikashkumar.svg', profileSvg);
fs.writeFileSync('assets/images/vikashkumar.svg', profileSvg);
fs.writeFileSync('public/vikashkumar.svg', profileSvg);
fs.writeFileSync('public/assets/images/vikashkumar.svg', profileSvg);

// Also copy to jpg alias
fs.writeFileSync('vikashkumar.jpg', profileSvg);
fs.writeFileSync('logo.jpg', logoSvg);
fs.writeFileSync('public/vikashkumar.jpg', profileSvg);
fs.writeFileSync('public/logo.jpg', logoSvg);

galleryItems.forEach(item => {
  const svg = makeSvgImage({
    width: 800,
    height: 600,
    title: item.title,
    subtitle: item.subtitle,
    filename: item.filename,
    category: item.category
  });
  const svgName = item.filename.replace('.jpg', '.svg');
  fs.writeFileSync(`assets/gallery/${svgName}`, svg);
  fs.writeFileSync(`public/assets/gallery/${svgName}`, svg);
  fs.writeFileSync(`assets/gallery/${item.filename}`, svg);
  fs.writeFileSync(`public/assets/gallery/${item.filename}`, svg);
});

console.log('Blue & White assets generated successfully!');
