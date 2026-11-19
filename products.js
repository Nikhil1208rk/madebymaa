/**
 * MadeByMaa - Product Catalogue Data
 * 11 Core Categories per PRD Section 5
 * All prices strictly within ₹200 – ₹1,500 range
 */

const CATEGORIES = [
  { id: 'all', name: 'All Creations', icon: '✨', count: 32 },
  { id: 'crochet-keychains', name: 'Crochet Keychains', icon: '🔑', count: 4, desc: 'Handmade miniature charms for keys, handbags and gifting' },
  { id: 'mufflers', name: 'Mufflers', icon: '🧣', count: 3, desc: 'Handmade crochet winter accessories and warm wraps' },
  { id: 'rakhis', name: 'Rakhis', icon: '🪡', count: 4, desc: 'Creative handcrafted rakhis for festive occasions' },
  { id: 'hair-accessories', name: 'Hair Accessories', icon: '🎀', count: 4, desc: 'Crochet hair clips, bands, bows and scrunchies' },
  { id: 'crochet-chokers', name: 'Crochet Chokers', icon: '📿', count: 3, desc: 'Handmade crochet jewellery and wearable neckpieces' },
  { id: 'book-bouquets', name: 'Book Bouquets', icon: '💐', count: 3, desc: 'Creative crochet floral arrangements for book lovers and gifting' },
  { id: 'crochet-bags', name: 'Crochet Bags', icon: '👜', count: 4, desc: 'Handmade handbags, mini bags and tote bags' },
  { id: 'decorative-items', name: 'Decorative Items', icon: '🪴', count: 3, desc: 'Crochet home decor, desk buddies and decorative creations' },
  { id: 'crochet-shoes', name: 'Crochet Shoes', icon: '🩰', count: 3, desc: 'Handmade crochet footwear, baby booties and lounge slippers' },
  { id: 'crochet-flowers', name: 'Crochet Flowers', icon: '🌸', count: 4, desc: 'Individual everlasting crochet flowers and floral stems' },
  { id: 'crochet-jerseys', name: 'Crochet Jerseys', icon: '🧶', count: 3, desc: 'Handmade crochet jerseys, vests and wearable knit tops' }
];

// Helper to create inline SVG art for products so every item renders with 100% reliability
function createCrochetSVG(type, primaryColor, secondaryColor) {
  const p = primaryColor || '#E8929A';
  const s = secondaryColor || '#FAF7F2';
  
  if (type === 'keychain') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="kg_${p.replace('#','')}" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${s}"/>
          <stop offset="100%" stop-color="${p}"/>
        </radialGradient>
      </defs>
      <!-- Keyring & chain -->
      <circle cx="100" cy="35" r="16" fill="none" stroke="#D19828" stroke-width="4"/>
      <circle cx="100" cy="35" r="12" fill="none" stroke="#FAF0D7" stroke-width="1.5"/>
      <line x1="100" y1="51" x2="100" y2="75" stroke="#D19828" stroke-width="3.5" stroke-dasharray="3,3"/>
      <!-- Hanging crochet charm -->
      <g transform="translate(100, 125)">
        <!-- Petals -->
        <circle cx="0" cy="-35" r="22" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
        <circle cx="33" cy="-12" r="22" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
        <circle cx="21" cy="28" r="22" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
        <circle cx="-21" cy="28" r="22" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
        <circle cx="-33" cy="-12" r="22" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
        <!-- Center -->
        <circle cx="0" cy="0" r="18" fill="#F4CA64" stroke="#4A2E2B" stroke-width="2.5"/>
        <!-- Stitched cute face -->
        <circle cx="-6" cy="-2" r="2" fill="#4A2E2B"/>
        <circle cx="6" cy="-2" r="2" fill="#4A2E2B"/>
        <path d="M -4 5 Q 0 9 4 5" stroke="#4A2E2B" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Little blush -->
        <circle cx="-9" cy="3" r="2.5" fill="#E8929A" opacity="0.7"/>
        <circle cx="9" cy="3" r="2.5" fill="#E8929A" opacity="0.7"/>
      </g>
    </svg>`;
  }

  if (type === 'muffler') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Muffler loops & folds -->
      <path d="M 40 50 Q 100 20 160 50 Q 170 100 145 130 Q 100 165 55 130 Q 30 100 40 50 Z" 
            fill="${s}" stroke="#4A2E2B" stroke-width="2.5"/>
      <!-- Ribbed stitches texture -->
      <path d="M 60 55 C 60 90, 80 135, 100 145 M 85 50 C 90 90, 110 130, 125 140 M 110 50 C 120 85, 135 120, 140 130" 
            stroke="${p}" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="5,3"/>
      <!-- Hanging scarf tails with fringes -->
      <path d="M 120 120 L 140 175 L 170 165 L 145 115 Z" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
      <line x1="140" y1="175" x2="138" y2="190" stroke="#4A2E2B" stroke-width="2"/>
      <line x1="146" y1="173" x2="146" y2="190" stroke="#4A2E2B" stroke-width="2"/>
      <line x1="154" y1="170" x2="156" y2="188" stroke="#4A2E2B" stroke-width="2"/>
      <line x1="162" y1="168" x2="166" y2="186" stroke="#4A2E2B" stroke-width="2"/>
      <!-- Little heart accent badge -->
      <circle cx="80" cy="100" r="14" fill="#FAF7F2" stroke="#4A2E2B" stroke-width="1.5"/>
      <path d="M 80 96 C 80 93 77 91 75 91 C 72 91 70 94 70 94 C 70 94 68 91 65 91 C 63 91 60 93 60 96 C 60 101 70 107 70 107 C 70 107 80 101 80 96 Z" 
            transform="translate(10, -2) scale(0.85)" fill="${p}"/>
    </svg>`;
  }

  if (type === 'rakhi') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Tied Threads Left and Right -->
      <path d="M 10 100 Q 50 115 75 100" stroke="#D19828" stroke-width="3" fill="none"/>
      <path d="M 10 104 Q 50 90 75 100" stroke="${p}" stroke-width="2.5" fill="none"/>
      <path d="M 125 100 Q 150 115 190 100" stroke="#D19828" stroke-width="3" fill="none"/>
      <path d="M 125 100 Q 150 90 190 104" stroke="${p}" stroke-width="2.5" fill="none"/>
      <!-- Thread tassel beads -->
      <circle cx="35" cy="106" r="4" fill="#FAF7F2" stroke="#4A2E2B" stroke-width="1.5"/>
      <circle cx="165" cy="106" r="4" fill="#FAF7F2" stroke="#4A2E2B" stroke-width="1.5"/>
      <!-- Rakhi Center Floral Motif -->
      <g transform="translate(100, 100)">
        <!-- Outer crochet lace ring -->
        <circle cx="0" cy="0" r="42" fill="${s}" stroke="#4A2E2B" stroke-width="2"/>
        <!-- Petals ring -->
        <circle cx="0" cy="-30" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="21" cy="-21" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="30" cy="0" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="21" cy="21" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="30" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="-21" cy="21" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="-30" cy="0" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="-21" cy="-21" r="10" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <!-- Inner ring -->
        <circle cx="0" cy="0" r="22" fill="#F4CA64" stroke="#4A2E2B" stroke-width="2"/>
        <circle cx="0" cy="0" r="12" fill="#FAF7F2" stroke="#C47B7B" stroke-width="2" stroke-dasharray="2,2"/>
        <circle cx="0" cy="0" r="5" fill="#4A2E2B"/>
      </g>
    </svg>`;
  }

  if (type === 'hair') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Hair Clip Base -->
      <rect x="35" y="90" width="130" height="20" rx="10" fill="#EAD7C5" stroke="#4A2E2B" stroke-width="2.5"/>
      <circle cx="45" cy="100" r="5" fill="#FAF7F2" stroke="#4A2E2B" stroke-width="1.5"/>
      <!-- Three Crochet Flowers on Clip -->
      <g transform="translate(70, 95) scale(0.9)">
        <circle cx="0" cy="-14" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="14" cy="0" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="14" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="-14" cy="0" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="8" fill="#F4CA64" stroke="#4A2E2B" stroke-width="1.5"/>
      </g>
      <g transform="translate(110, 95) scale(1.1)">
        <circle cx="0" cy="-14" r="9" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="14" cy="0" r="9" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="14" r="9" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="-14" cy="0" r="9" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="8" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
      </g>
      <g transform="translate(145, 95) scale(0.85)">
        <circle cx="0" cy="-14" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="14" cy="0" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="14" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="-14" cy="0" r="9" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="8" fill="#F4CA64" stroke="#4A2E2B" stroke-width="1.5"/>
      </g>
      <!-- Leaves -->
      <path d="M 85 80 Q 95 65 105 78 Q 95 86 85 80 Z" fill="#8FA882" stroke="#4A2E2B" stroke-width="1.5"/>
      <path d="M 125 78 Q 135 65 145 78 Q 135 86 125 78 Z" fill="#8FA882" stroke="#4A2E2B" stroke-width="1.5"/>
    </svg>`;
  }

  if (type === 'choker') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Elegant curved collar choker path -->
      <path d="M 25 75 Q 100 130 175 75" fill="none" stroke="#4A2E2B" stroke-width="4" stroke-linecap="round"/>
      <path d="M 25 75 Q 100 130 175 75" fill="none" stroke="${s}" stroke-width="2.5" stroke-dasharray="4,3"/>
      <!-- Scalloped lace edge -->
      <path d="M 35 83 Q 45 95 55 88 Q 65 100 75 93 Q 85 105 100 102 Q 115 105 125 93 Q 135 100 145 88 Q 155 95 165 83" 
            fill="none" stroke="${p}" stroke-width="3" stroke-linecap="round"/>
      <!-- Center Pendant Rose -->
      <g transform="translate(100, 118)">
        <circle cx="0" cy="0" r="16" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
        <path d="M -8 -3 Q 0 -11 8 -3 Q 0 9 -8 -3" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <!-- Pearl droplet hanging -->
        <line x1="0" y1="16" x2="0" y2="28" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="33" r="5" fill="#FAF7F2" stroke="#4A2E2B" stroke-width="1.5"/>
      </g>
    </svg>`;
  }

  if (type === 'bouquet') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Wrapping Kraft Paper -->
      <polygon points="100,185 55,110 145,110" fill="#EAD7C5" stroke="#4A2E2B" stroke-width="2.5"/>
      <polygon points="100,185 70,110 100,120 130,110" fill="#DFCAAF" opacity="0.6"/>
      <!-- Ribbon bow -->
      <g transform="translate(100, 140)">
        <ellipse cx="-12" cy="0" rx="10" ry="6" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <ellipse cx="12" cy="0" rx="10" ry="6" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="4" fill="#F4CA64" stroke="#4A2E2B" stroke-width="1.5"/>
        <path d="M -2 4 L -10 20 M 2 4 L 10 20" stroke="${p}" stroke-width="2.5" stroke-linecap="round"/>
      </g>
      <!-- Stems -->
      <line x1="100" y1="120" x2="100" y2="70" stroke="#8FA882" stroke-width="3"/>
      <line x1="90" y1="120" x2="75" y2="75" stroke="#8FA882" stroke-width="3"/>
      <line x1="110" y1="120" x2="125" y2="75" stroke="#8FA882" stroke-width="3"/>
      <!-- Flowers Blossom -->
      <!-- Center Main Rose -->
      <circle cx="100" cy="55" r="20" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
      <circle cx="100" cy="55" r="10" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
      <!-- Left Daisy -->
      <circle cx="70" cy="65" r="15" fill="${s}" stroke="#4A2E2B" stroke-width="2"/>
      <circle cx="70" cy="65" r="6" fill="#F4CA64" stroke="#4A2E2B" stroke-width="1.5"/>
      <!-- Right Tulip -->
      <path d="M 118 75 C 115 55, 140 55, 138 75 Z" fill="${p}" stroke="#4A2E2B" stroke-width="2"/>
      <!-- Mini lavender spray -->
      <circle cx="82" cy="38" r="4" fill="#C47B7B"/>
      <circle cx="88" cy="32" r="4" fill="#C47B7B"/>
      <circle cx="118" cy="36" r="4" fill="#8FA882"/>
    </svg>`;
  }

  if (type === 'bag') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Handles -->
      <path d="M 70 70 C 70 25, 130 25, 130 70" fill="none" stroke="#4A2E2B" stroke-width="5" stroke-linecap="round"/>
      <path d="M 70 70 C 70 25, 130 25, 130 70" fill="none" stroke="${s}" stroke-width="2" stroke-linecap="round"/>
      <!-- Bag Body -->
      <rect x="45" y="70" width="110" height="105" rx="14" fill="${s}" stroke="#4A2E2B" stroke-width="2.5"/>
      <!-- Granny Square Pattern -->
      <g transform="translate(62, 85)">
        <rect x="0" y="0" width="36" height="36" rx="4" fill="#FAF7F2" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="18" cy="18" r="10" fill="${p}"/>
        <circle cx="18" cy="18" r="5" fill="#F4CA64"/>
      </g>
      <g transform="translate(102, 85)">
        <rect x="0" y="0" width="36" height="36" rx="4" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="18" cy="18" r="10" fill="#FAF7F2"/>
        <circle cx="18" cy="18" r="5" fill="#8FA882"/>
      </g>
      <g transform="translate(62, 125)">
        <rect x="0" y="0" width="36" height="36" rx="4" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="18" cy="18" r="10" fill="#FAF7F2"/>
        <circle cx="18" cy="18" r="5" fill="#C47B7B"/>
      </g>
      <g transform="translate(102, 125)">
        <rect x="0" y="0" width="36" height="36" rx="4" fill="#FAF7F2" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="18" cy="18" r="10" fill="${p}"/>
        <circle cx="18" cy="18" r="5" fill="#F4CA64"/>
      </g>
    </svg>`;
  }

  if (type === 'plant') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Potted base -->
      <polygon points="65,120 75,175 125,175 135,120" fill="#EAD7C5" stroke="#4A2E2B" stroke-width="2.5"/>
      <!-- Rim -->
      <rect x="60" y="112" width="80" height="12" rx="4" fill="#DFCAAF" stroke="#4A2E2B" stroke-width="2"/>
      <!-- Cute pot face -->
      <circle cx="92" cy="145" r="2.5" fill="#4A2E2B"/>
      <circle cx="108" cy="145" r="2.5" fill="#4A2E2B"/>
      <path d="M 96 153 Q 100 157 104 153" stroke="#4A2E2B" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="87" cy="150" r="2.5" fill="#E8929A" opacity="0.6"/>
      <circle cx="113" cy="150" r="2.5" fill="#E8929A" opacity="0.6"/>
      <!-- Crochet Succulent / Cactus -->
      <g transform="translate(100, 75)">
        <ellipse cx="0" cy="0" rx="26" ry="38" fill="#8FA882" stroke="#4A2E2B" stroke-width="2.5"/>
        <path d="M 0 -36 C -12 -10, -12 20, 0 36 M 0 -36 C 12 -10, 12 20, 0 36" 
              stroke="#6E8563" stroke-width="2" fill="none" stroke-dasharray="3,3"/>
        <!-- Side sprout -->
        <ellipse cx="-24" cy="-2" rx="12" ry="16" transform="rotate(-25 -24 -2)" fill="#8FA882" stroke="#4A2E2B" stroke-width="2"/>
        <!-- Little bloom on top -->
        <circle cx="0" cy="-38" r="8" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
        <circle cx="0" cy="-38" r="3" fill="#F4CA64"/>
      </g>
    </svg>`;
  }

  if (type === 'shoes') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Bootie / Slipper left -->
      <g transform="translate(40, 70)">
        <!-- Sole -->
        <ellipse cx="45" cy="75" rx="35" ry="14" fill="#EAD7C5" stroke="#4A2E2B" stroke-width="2"/>
        <!-- Upper crochet body -->
        <path d="M 15 75 Q 15 45 35 40 Q 55 35 65 55 Q 75 65 75 75 Z" fill="${p}" stroke="#4A2E2B" stroke-width="2.5"/>
        <!-- Ribbed ankle cuff -->
        <rect x="25" y="25" width="30" height="20" rx="6" fill="${s}" stroke="#4A2E2B" stroke-width="2"/>
        <!-- Bunny ear left -->
        <ellipse cx="32" cy="14" rx="4" ry="14" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <ellipse cx="32" cy="14" rx="2" ry="9" fill="${p}"/>
        <!-- Bunny ear right -->
        <ellipse cx="46" cy="14" rx="4" ry="14" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <ellipse cx="46" cy="14" rx="2" ry="9" fill="${p}"/>
      </g>
      <!-- Bootie right -->
      <g transform="translate(95, 75)">
        <ellipse cx="45" cy="75" rx="35" ry="14" fill="#EAD7C5" stroke="#4A2E2B" stroke-width="2"/>
        <path d="M 15 75 Q 15 45 35 40 Q 55 35 65 55 Q 75 65 75 75 Z" fill="${p}" stroke="#4A2E2B" stroke-width="2.5"/>
        <rect x="25" y="25" width="30" height="20" rx="6" fill="${s}" stroke="#4A2E2B" stroke-width="2"/>
        <ellipse cx="32" cy="14" rx="4" ry="14" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <ellipse cx="32" cy="14" rx="2" ry="9" fill="${p}"/>
        <ellipse cx="46" cy="14" rx="4" ry="14" fill="${s}" stroke="#4A2E2B" stroke-width="1.5"/>
        <ellipse cx="46" cy="14" rx="2" ry="9" fill="${p}"/>
      </g>
    </svg>`;
  }

  if (type === 'flower') {
    return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Stem -->
      <path d="M 100 80 Q 95 130 100 185" stroke="#8FA882" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Leaves -->
      <path d="M 100 135 Q 75 125 70 145 Q 85 155 100 142" fill="#8FA882" stroke="#4A2E2B" stroke-width="1.8"/>
      <path d="M 100 115 Q 125 105 130 125 Q 115 135 100 122" fill="#8FA882" stroke="#4A2E2B" stroke-width="1.8"/>
      <!-- Flower Blossom -->
      <g transform="translate(100, 70)">
        <!-- 12 Crochet Petals -->
        <circle cx="0" cy="-35" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="18" cy="-30" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="30" cy="-18" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="35" cy="0" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="30" cy="18" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="18" cy="30" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="0" cy="35" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="-18" cy="30" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="-30" cy="18" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="-35" cy="0" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="-30" cy="-18" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <circle cx="-18" cy="-30" r="14" fill="${p}" stroke="#4A2E2B" stroke-width="1.8"/>
        <!-- Textured Seed Center -->
        <circle cx="0" cy="0" r="22" fill="#F4CA64" stroke="#4A2E2B" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="15" fill="#D19828" stroke="#4A2E2B" stroke-width="1.5" stroke-dasharray="3,2"/>
        <circle cx="0" cy="0" r="6" fill="#8A5E52"/>
      </g>
    </svg>`;
  }

  // Fallback jersey
  return `<svg viewBox="0 0 200 200" class="crochet-art-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- Jersey / Vest silhouette -->
    <path d="M 60 45 L 85 45 L 95 65 L 105 65 L 115 45 L 140 45 L 165 80 L 145 95 L 135 85 L 135 160 L 65 160 L 65 85 L 55 95 L 35 80 Z" 
          fill="${s}" stroke="#4A2E2B" stroke-width="2.5"/>
    <!-- Granny squares grid on vest -->
    <rect x="72" y="90" width="24" height="24" rx="2" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
    <circle cx="84" cy="102" r="6" fill="#F4CA64"/>
    <rect x="104" y="90" width="24" height="24" rx="2" fill="#8FA882" stroke="#4A2E2B" stroke-width="1.5"/>
    <circle cx="116" cy="102" r="6" fill="${p}"/>
    <rect x="72" y="122" width="24" height="24" rx="2" fill="#8FA882" stroke="#4A2E2B" stroke-width="1.5"/>
    <circle cx="84" cy="134" r="6" fill="${p}"/>
    <rect x="104" y="122" width="24" height="24" rx="2" fill="${p}" stroke="#4A2E2B" stroke-width="1.5"/>
    <circle cx="116" cy="134" r="6" fill="#F4CA64"/>
    <!-- Ribbed hem -->
    <line x1="65" y1="155" x2="135" y2="155" stroke="#4A2E2B" stroke-width="2"/>
  </svg>`;
}

const PRODUCTS = [
  // 1. CROCHET KEYCHAINS (₹200 - ₹350)
  {
    id: 'kc-daisy-charm',
    name: 'Daisy Flower Charm Keychain',
    category: 'crochet-keychains',
    categoryName: 'Crochet Keychains',
    price: 220,
    badge: 'Bestseller',
    artType: 'keychain',
    primaryColor: '#E8929A',
    secondaryColor: '#FFFDF9',
    description: 'Adorably handcrafted mini daisy charm with durable brass keyring. Perfect for bags, car keys, and thoughtful gifting.',
    colors: [
      { name: 'Blush Pink & Yellow', hex: '#E8929A' },
      { name: 'Cream & Ochre', hex: '#FAF0D7' },
      { name: 'Sage Mint & Honey', hex: '#8FA882' },
      { name: 'Lavender & Cream', hex: '#C49AC4' }
    ],
    sizes: ['Standard (approx. 7 cm)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      '100% Premium cotton-acrylic yarn',
      'Anti-tarnish reinforced keyring included',
      'Ultra-lightweight and durable'
    ]
  },
  {
    id: 'kc-strawberry-bliss',
    name: 'Strawberry Bliss Mini Keychain',
    category: 'crochet-keychains',
    categoryName: 'Crochet Keychains',
    price: 260,
    badge: 'Popular',
    artType: 'keychain',
    primaryColor: '#E0626B',
    secondaryColor: '#8FA882',
    description: 'Charming 3D stuffed crochet strawberry with detailed leaf calyx and embroidered seed accents.',
    colors: [
      { name: 'Berry Red', hex: '#E0626B' },
      { name: 'Pastel Strawberry Pink', hex: '#F7B2B7' },
      { name: 'Wild Berry Purple', hex: '#A8577E' }
    ],
    sizes: ['Standard (approx. 6.5 cm)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Soft polyfill stuffing with plush feel',
      'Hand-stitched seed accents',
      'Compact size for backpacks or keys'
    ]
  },
  {
    id: 'kc-sprout-positive',
    name: 'Lil Sprout Plant & Pot Charm',
    category: 'crochet-keychains',
    categoryName: 'Crochet Keychains',
    price: 200,
    badge: 'Affordable Favorite',
    artType: 'keychain',
    primaryColor: '#8FA882',
    secondaryColor: '#EAD7C5',
    description: 'A tiny green crochet sprout emerging from a terracotta-colored pot to bring good vibes wherever you go.',
    colors: [
      { name: 'Spring Green', hex: '#8FA882' },
      { name: 'Matcha Green', hex: '#A3B899' },
      { name: 'Baby Sprout Mint', hex: '#BCE3C5' }
    ],
    sizes: ['Standard (approx. 6 cm)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Embroidered sweet smiley face',
      'Sturdy loop ring fitting',
      'Cute study companion charm'
    ]
  },
  {
    id: 'kc-boba-charm',
    name: 'Mini Boba Milk Tea Charm',
    category: 'crochet-keychains',
    categoryName: 'Crochet Keychains',
    price: 280,
    badge: 'Trending',
    artType: 'keychain',
    primaryColor: '#D4A373',
    secondaryColor: '#FFFDF9',
    description: 'Handmade miniature boba milk tea cup with straw, crochet whipped cream and dark tapioca pearl accents.',
    colors: [
      { name: 'Classic Milk Tea', hex: '#D4A373' },
      { name: 'Taro Milk Tea', hex: '#C5A3CF' },
      { name: 'Matcha Boba', hex: '#97A97C' }
    ],
    sizes: ['Standard (approx. 8 cm)'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      '3D crocheted straw and pearl accents',
      'Handmade with love and precision',
      'Perfect gift for boba lovers'
    ]
  },

  // 2. MUFFLERS (₹890 - ₹1,150)
  {
    id: 'muf-chunky-cloud',
    name: 'Pastel Cloud Chunky Muffler',
    category: 'mufflers',
    categoryName: 'Mufflers',
    price: 890,
    badge: 'Winter Essential',
    artType: 'muffler',
    primaryColor: '#F7D6D8',
    secondaryColor: '#FFFDF9',
    description: 'Supremely plush and insulating chunky ribbed muffler hand-crocheted with cloud-soft hypoallergenic acrylic wool.',
    colors: [
      { name: 'Blush & Cream Melange', hex: '#F7D6D8' },
      { name: 'Oatmeal & Pearl', hex: '#EBE3D5' },
      { name: 'Powder Blue & White', hex: '#B8D8D8' }
    ],
    sizes: ['Free Size (150 cm x 18 cm)'],
    customisable: true,
    prepTime: '3–4 working days to craft',
    highlights: [
      'Thick ribbed crochet stitch for maximum warmth',
      'Ultra-soft on sensitive skin',
      'Custom length available on request'
    ]
  },
  {
    id: 'muf-wavy-ombre',
    name: 'Wavy Striped Ombré Muffler',
    category: 'mufflers',
    categoryName: 'Mufflers',
    price: 1150,
    badge: 'Statement Piece',
    artType: 'muffler',
    primaryColor: '#C47B7B',
    secondaryColor: '#FAF0D7',
    description: 'Artfully stitched ripple wave pattern featuring gradient hues of dusty rose, warm taupe and antique ivory.',
    colors: [
      { name: 'Sunset Rose Palette', hex: '#C47B7B' },
      { name: 'Earth & Forest Ombré', hex: '#8FA882' },
      { name: 'Vintage Mocha Blend', hex: '#7C5346' }
    ],
    sizes: ['Free Size (165 cm x 20 cm) with tassels'],
    customisable: true,
    prepTime: '4–5 working days to craft',
    highlights: [
      'Intricate wave chevron stitch',
      'Hand-knotted lush fringe border',
      'Pan-India delivery in 4–5 days'
    ]
  },
  {
    id: 'muf-vintage-ribbed',
    name: 'Classic Ribbed Rose Scarf',
    category: 'mufflers',
    categoryName: 'Mufflers',
    price: 980,
    badge: 'Handcrafted',
    artType: 'muffler',
    primaryColor: '#D48C8C',
    secondaryColor: '#FFFDF9',
    description: 'Timeless vertical ribbed knit scarf offering generous warmth, comfortable drape and elegant everyday styling.',
    colors: [
      { name: 'Dusty Rose', hex: '#D48C8C' },
      { name: 'Mocha Coffee', hex: '#5A3E36' },
      { name: 'Buttercream Cream', hex: '#FFFDF9' }
    ],
    sizes: ['Free Size (160 cm x 16 cm)'],
    customisable: true,
    prepTime: '3–4 working days to craft',
    highlights: [
      'Elegant drape with no curl edges',
      'Warm and snug without being heavy',
      'Gentle hand-wash friendly'
    ]
  },

  // 3. RAKHIS (₹220 - ₹280)
  {
    id: 'rak-sunshine-flower',
    name: 'Floral Sunshine Crochet Rakhi',
    category: 'rakhis',
    categoryName: 'Rakhis',
    price: 220,
    badge: 'Festive Special',
    artType: 'rakhi',
    primaryColor: '#F4CA64',
    secondaryColor: '#FFFDF9',
    description: 'Hand-crocheted bright floral dial Rakhi with golden zari threads and comfortable skin-friendly cotton tie strings.',
    colors: [
      { name: 'Sunshine Yellow & Gold', hex: '#F4CA64' },
      { name: 'Coral Pink & Gold', hex: '#F28482' },
      { name: 'Ivory Pearl & Ochre', hex: '#FAF0D7' }
    ],
    sizes: ['Adjustable tie cords (30 cm length)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Gentle on wrist with zero sharp edges',
      'Reusable as a bookmark or bracelet afterward',
      'Includes celebratory roli-chawal blessing pouch'
    ]
  },
  {
    id: 'rak-evil-eye',
    name: 'Evil Eye Crochet Rakhi',
    category: 'rakhis',
    categoryName: 'Rakhis',
    price: 250,
    badge: 'Bestseller',
    artType: 'rakhi',
    primaryColor: '#3A86FF',
    secondaryColor: '#FFFDF9',
    description: 'Concentric circular crochet talisman Rakhi designed with traditional evil eye colors to bestow protection and love.',
    colors: [
      { name: 'Traditional Cobalt & Turquoise', hex: '#3A86FF' },
      { name: 'Pastel Aqua & Sky', hex: '#83C5BE' }
    ],
    sizes: ['Adjustable tie cords (32 cm length)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Meaningful symbolic design',
      'Smooth cotton threads that do not fray',
      'Handcrafted stitch by stitch'
    ]
  },
  {
    id: 'rak-peacock-feather',
    name: 'Mor Pankh (Peacock) Rakhi',
    category: 'rakhis',
    categoryName: 'Rakhis',
    price: 280,
    badge: 'Artisanal',
    artType: 'rakhi',
    primaryColor: '#0077B6',
    secondaryColor: '#8FA882',
    description: 'Exquisite miniature crochet peacock feather Rakhi featuring emerald, royal blue and gold accents.',
    colors: [
      { name: 'Peacock Jewel Tones', hex: '#0077B6' },
      { name: 'Golden Krishna Hue', hex: '#D19828' }
    ],
    sizes: ['Adjustable tie cords (32 cm length)'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Layered micro-crochet stitchwork',
      'Delicate beaded tassel finishes',
      'Treasured keepsake for siblings'
    ]
  },
  {
    id: 'rak-pearl-daisy',
    name: 'Pearl Daisy Pastel Thread Rakhi',
    category: 'rakhis',
    categoryName: 'Rakhis',
    price: 240,
    badge: 'Handcrafted',
    artType: 'rakhi',
    primaryColor: '#E8929A',
    secondaryColor: '#FFFDF9',
    description: 'Delicate mini crochet daisy adorned with a lustrous faux pearl center and hand-braided pastel cords.',
    colors: [
      { name: 'Blush Daisy & White Pearl', hex: '#E8929A' },
      { name: 'Mint Daisy & Gold Bead', hex: '#8FA882' }
    ],
    sizes: ['Adjustable tie cords (30 cm length)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Understated minimalist aesthetic',
      'Soft braided cotton ties',
      'Can be worn as a summer anklet later'
    ]
  },

  // 4. HAIR ACCESSORIES (₹220 - ₹390)
  {
    id: 'hair-blossom-clips',
    name: 'Vintage Blossom Hair Clips (Pair)',
    category: 'hair-accessories',
    categoryName: 'Hair Accessories',
    price: 280,
    badge: 'Cute Must-Have',
    artType: 'hair',
    primaryColor: '#E8929A',
    secondaryColor: '#FAF0D7',
    description: 'Pair of metal snap hair clips encased in hand-crocheted pastel blossoms with soft yarn backing.',
    colors: [
      { name: 'Rose & Cream Duo', hex: '#E8929A' },
      { name: 'Sage & Buttercup Duo', hex: '#8FA882' },
      { name: 'Lavender & White Duo', hex: '#C49AC4' }
    ],
    sizes: ['Snap clips (5.5 cm)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Gentle grip that holds hair without snagging',
      'Hand-stitched petal details',
      'Set of 2 matching clips'
    ]
  },
  {
    id: 'hair-claw-cozy',
    name: 'Tulip Claw Clip Crochet Cozy',
    category: 'hair-accessories',
    categoryName: 'Hair Accessories',
    price: 320,
    badge: 'Trending',
    artType: 'hair',
    primaryColor: '#F28482',
    secondaryColor: '#8FA882',
    description: 'Transform your everyday hair claw into a floral statement piece with this snug crochet tulip overlay.',
    colors: [
      { name: 'Spring Tulip Coral', hex: '#F28482' },
      { name: 'Baby Pink Tulip', hex: '#F7D6D8' },
      { name: 'Lilac Tulip', hex: '#C47B7B' }
    ],
    sizes: ['Medium-Large Claw (8.5 cm)'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Sturdy claw clip included with crochet jacket',
      'Durable non-slip hold for long and thick hair',
      'Signature cottagecore aesthetic'
    ]
  },
  {
    id: 'hair-granny-headband',
    name: 'Granny Square Boho Headband',
    category: 'hair-accessories',
    categoryName: 'Hair Accessories',
    price: 390,
    badge: 'Bestseller',
    artType: 'hair',
    primaryColor: '#FAF0D7',
    secondaryColor: '#C47B7B',
    description: 'Bohemian bandana-style headband crafted from joined floral granny squares with gentle back tie cords.',
    colors: [
      { name: 'Retro Garden Multi', hex: '#FAF0D7' },
      { name: 'Monochrome Warm Taupe', hex: '#7C5346' },
      { name: 'Pastel Meadow', hex: '#A3B899' }
    ],
    sizes: ['Free Size (Tie-up back fits all head sizes)'],
    customisable: true,
    prepTime: '2–3 working days to craft',
    highlights: [
      'Breathable lightweight cotton yarn',
      'Adjustable tie ribbons for custom fit',
      'Zero headache headband pressure'
    ]
  },
  {
    id: 'hair-ruffle-scrunchies',
    name: 'Pastel Ruffle Crochet Scrunchie Set',
    category: 'hair-accessories',
    categoryName: 'Hair Accessories',
    price: 240,
    badge: 'Set of 2',
    artType: 'hair',
    primaryColor: '#F7D6D8',
    secondaryColor: '#FFFDF9',
    description: 'Pair of super-voluminous curly ruffled crochet scrunchies wrapped around high-elasticity hair ties.',
    colors: [
      { name: 'Blush & Milk Cream', hex: '#F7D6D8' },
      { name: 'Sage & Pistachio', hex: '#8FA882' }
    ],
    sizes: ['Free Size Elastic'],
    customisable: true,
    prepTime: '1 working day to craft',
    highlights: [
      'Damage-free tie that prevents hair creasing',
      'Extra fullness with ruffled triple stitch',
      'Comes as a pair of 2 scrunchies'
    ]
  },

  // 5. CROCHET CHOKERS (₹380 - ₹490)
  {
    id: 'chok-victorian-rose',
    name: 'Victorian Lace Rose Choker',
    category: 'crochet-chokers',
    categoryName: 'Crochet Chokers',
    price: 450,
    badge: 'Artisanal',
    artType: 'choker',
    primaryColor: '#C47B7B',
    secondaryColor: '#FFFDF9',
    description: 'Intricately patterned vintage-inspired crochet lace neck choker centered with a mini rose and teardrop bead.',
    colors: [
      { name: 'Dusty Rose & Cream', hex: '#C47B7B' },
      { name: 'Antique Ivory', hex: '#FAF0D7' },
      { name: 'Midnight Black Lace', hex: '#33272A' }
    ],
    sizes: ['Length 30 cm + 8 cm extension chain'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Hypoallergenic brass clasp & extender',
      'Featherlight and non-itchy cotton lace thread',
      'Statement piece for dresses and ethnic wear'
    ]
  },
  {
    id: 'chok-daisy-chain',
    name: 'Daisy Chain Collar Choker',
    category: 'crochet-chokers',
    categoryName: 'Crochet Chokers',
    price: 380,
    badge: 'Popular',
    artType: 'choker',
    primaryColor: '#FFFDF9',
    secondaryColor: '#F4CA64',
    description: 'Continuous chain of delicate white daisies with yellow centers connected into a sweet summer collar choker.',
    colors: [
      { name: 'White & Yellow Daisy', hex: '#FFFDF9' },
      { name: 'Pastel Pink & Mint Daisy', hex: '#F7D6D8' }
    ],
    sizes: ['Length 32 cm + 7 cm extension chain'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Each flower hand-crocheted individually',
      'Lightweight summer aesthetic',
      'Lobster claw closure with extension chain'
    ]
  },
  {
    id: 'chok-pearl-gothic',
    name: 'Victorian Pearl Thread Choker',
    category: 'crochet-chokers',
    categoryName: 'Crochet Chokers',
    price: 490,
    badge: 'Handcrafted',
    artType: 'choker',
    primaryColor: '#5A3E36',
    secondaryColor: '#FAF0D7',
    description: 'Dark warm-brown filigree crochet choker interwoven with cream faux pearls for an enchanting regal touch.',
    colors: [
      { name: 'Warm Espresso & Pearl', hex: '#5A3E36' },
      { name: 'Wine Plum & Pearl', hex: '#8A5E52' }
    ],
    sizes: ['Length 30 cm + 8 cm extension chain'],
    customisable: true,
    prepTime: '2–3 working days to craft',
    highlights: [
      'Hand-woven micro pearls',
      'Scalloped picot edge details',
      'Comfortable skin-friendly lining'
    ]
  },

  // 6. BOOK BOUQUETS (₹550 - ₹850)
  {
    id: 'bq-everlasting-daisy',
    name: 'Everlasting Daisy Book Bouquet',
    category: 'book-bouquets',
    categoryName: 'Book Bouquets',
    price: 650,
    badge: 'Top Gift Choice',
    artType: 'bouquet',
    primaryColor: '#E8929A',
    secondaryColor: '#FAF0D7',
    description: 'A charming bouquet of 3 everlasting crochet daisies and foliage wrapped in vintage literary kraft paper with ribbon.',
    colors: [
      { name: 'Pastel Dream Bouquet', hex: '#E8929A' },
      { name: 'Sunburst Golden Bouquet', hex: '#F4CA64' }
    ],
    sizes: ['Bouquet Height: ~25 cm'],
    customisable: true,
    prepTime: '3 working days to craft',
    highlights: [
      'Never withers or loses shape',
      'Wrapped in aesthetic literary sheet wrap',
      'Includes a matching crochet leaf bookmark'
    ]
  },
  {
    id: 'bq-rose-romance',
    name: 'Romance Rose Crochet Bouquet',
    category: 'book-bouquets',
    categoryName: 'Book Bouquets',
    price: 850,
    badge: 'Bestseller',
    artType: 'bouquet',
    primaryColor: '#C47B7B',
    secondaryColor: '#FFFDF9',
    description: 'Luxurious handcrafted bouquet featuring 5 individual stems: two blooming roses, one tulip, baby breath sprigs and eucalyptus.',
    colors: [
      { name: 'Dusty Rose & Cream Stems', hex: '#C47B7B' },
      { name: 'Crimson Velvet & Cream Stems', hex: '#A8434B' }
    ],
    sizes: ['Bouquet Height: ~30 cm'],
    customisable: true,
    prepTime: '4 working days to craft',
    highlights: [
      'Bendable wire core in stems for arranging',
      'Tied with premium satin bow',
      'The ultimate thoughtful gift for bookworms'
    ]
  },
  {
    id: 'bq-lavender-trio',
    name: 'Lavender Bundle with Bookmark',
    category: 'book-bouquets',
    categoryName: 'Book Bouquets',
    price: 550,
    badge: 'Artisanal',
    artType: 'bouquet',
    primaryColor: '#C49AC4',
    secondaryColor: '#8FA882',
    description: 'Bundle of 3 textured lavender spikes paired with a hand-stitched crochet sprout bookmark designed to slide inside your novel.',
    colors: [
      { name: 'Lilac & Sage Green', hex: '#C49AC4' },
      { name: 'Deep Violet & Meadow', hex: '#8E5A9E' }
    ],
    sizes: ['Bouquet: 24 cm, Bookmark: 20 cm'],
    customisable: true,
    prepTime: '2–3 working days to craft',
    highlights: [
      'Stems can be placed in vase or gifted together',
      'Includes bookmark for avid readers',
      'Crafted with colorfast cotton yarn'
    ]
  },

  // 7. CROCHET BAGS (₹890 - ₹1,350)
  {
    id: 'bag-granny-tote',
    name: "Grandma's Garden Granny Square Tote",
    category: 'crochet-bags',
    categoryName: 'Crochet Bags',
    price: 1350,
    badge: 'Signature Masterpiece',
    artType: 'bag',
    primaryColor: '#FAF0D7',
    secondaryColor: '#E8929A',
    description: 'Spectacular tote bag constructed from 13 meticulously stitched floral granny squares with reinforced shoulder straps.',
    colors: [
      { name: 'Earthy Pastel Meadow', hex: '#FAF0D7' },
      { name: 'Terracotta & Olive Mix', hex: '#D4A373' },
      { name: 'Rose Petal & Sage Blend', hex: '#E8929A' }
    ],
    sizes: ['Tote: 34 cm x 32 cm (Straps drop 28 cm)'],
    customisable: true,
    prepTime: '5–6 working days to craft',
    highlights: [
      'Inner cotton cloth lining prevents stretching',
      'Spacious capacity fits tablet, wallet & book',
      'Heavy-duty double crochet strap joinery'
    ]
  },
  {
    id: 'bag-daisy-crossbody',
    name: 'Daisy Bloom Crossbody Pouch',
    category: 'crochet-bags',
    categoryName: 'Crochet Bags',
    price: 890,
    badge: 'Popular',
    artType: 'bag',
    primaryColor: '#FFFDF9',
    secondaryColor: '#F4CA64',
    description: 'Compact everyday sling pouch with large daisy motif front panel and durable braided cross-body strap.',
    colors: [
      { name: 'Butter Cream & Daisy', hex: '#FFFDF9' },
      { name: 'Dusty Rose & Daisy', hex: '#F7D6D8' },
      { name: 'Olive Moss & Daisy', hex: '#8FA882' }
    ],
    sizes: ['Pouch: 20 cm x 18 cm (Strap: 110 cm)'],
    customisable: true,
    prepTime: '3–4 working days to craft',
    highlights: [
      'Wooden toggle button closure',
      'Fits phones up to iPhone Pro Max / Galaxy Ultra',
      'Perfect for brunch and casual outings'
    ]
  },
  {
    id: 'bag-checkered-shoulder',
    name: 'Pastel Checkered Shoulder Bag',
    category: 'crochet-bags',
    categoryName: 'Crochet Bags',
    price: 1200,
    badge: 'Trending',
    artType: 'bag',
    primaryColor: '#F7D6D8',
    secondaryColor: '#FAF0D7',
    description: 'Chic 90s inspired checkered shoulder baguette bag hand-crocheted in blush pink and warm cream squares.',
    colors: [
      { name: 'Blush & Vanilla Checks', hex: '#F7D6D8' },
      { name: 'Sage & Cream Checks', hex: '#8FA882' },
      { name: 'Mocha & Cream Checks', hex: '#7C5346' }
    ],
    sizes: ['Baguette: 26 cm x 15 cm x 6 cm'],
    customisable: true,
    prepTime: '4–5 working days to craft',
    highlights: [
      'Structured rectangular shape with reinforced base',
      'Comfortable under-arm drop handle',
      'Magnetic button closure'
    ]
  },
  {
    id: 'bag-cloud-dumpling',
    name: 'Mini Cloud Dumpling Handbag',
    category: 'crochet-bags',
    categoryName: 'Crochet Bags',
    price: 980,
    badge: 'Cute Design',
    artType: 'bag',
    primaryColor: '#FAF0D7',
    secondaryColor: '#C47B7B',
    description: 'Soft puffy dumpling pouch bag with ruched top handle and drawstring gathering closure.',
    colors: [
      { name: 'Cream Cloud', hex: '#FAF0D7' },
      { name: 'Rose Petal', hex: '#F7D6D8' }
    ],
    sizes: ['Dimensions: 22 cm x 16 cm'],
    customisable: true,
    prepTime: '3–4 working days to craft',
    highlights: [
      'Squishy textured bobble stitch',
      'Drawstring knot tassel detailing',
      'Lightweight and versatile pouch'
    ]
  },

  // 8. DECORATIVE ITEMS (₹320 - ₹450)
  {
    id: 'dec-desk-succulent',
    name: 'Cute Desk Potted Succulent Plant',
    category: 'decorative-items',
    categoryName: 'Decorative Items',
    price: 420,
    badge: 'Bestseller',
    artType: 'plant',
    primaryColor: '#8FA882',
    secondaryColor: '#EAD7C5',
    description: 'Never needs watering! Handcrafted crochet succulent in a cozy yarn pot with cute embroidered facial expression.',
    colors: [
      { name: 'Sage Green Succulent in Sandy Pot', hex: '#8FA882' },
      { name: 'Forest Green Aloe in Terracotta Pot', hex: '#52796F' }
    ],
    sizes: ['Height: 12 cm, Base Diameter: 7 cm'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Weighted base so it sits stably on desks',
      'Zero maintenance everlasting greenery',
      'Uplifting companion for work and study desks'
    ]
  },
  {
    id: 'dec-mushroom-buddy',
    name: 'Desk Mushroom Friend Figurine',
    category: 'decorative-items',
    categoryName: 'Decorative Items',
    price: 320,
    badge: 'Popular',
    artType: 'plant',
    primaryColor: '#C47B7B',
    secondaryColor: '#FAF0D7',
    description: 'Whimsical cottagecore toadstool mushroom with white polka dots, embroidered sleepy eyes and weighted stem base.',
    colors: [
      { name: 'Dusty Red Cap', hex: '#C47B7B' },
      { name: 'Pastel Lilac Cap', hex: '#C49AC4' },
      { name: 'Sun Ochre Cap', hex: '#F4CA64' }
    ],
    sizes: ['Height: 10 cm'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Self-standing weighted bottom',
      'Embroidered French knot polka dots',
      'Handmade with love in every stitch'
    ]
  },
  {
    id: 'dec-daisy-coasters',
    name: 'Handwoven Daisy Coasters (Set of 4)',
    category: 'decorative-items',
    categoryName: 'Decorative Items',
    price: 450,
    badge: 'Set of 4',
    artType: 'plant',
    primaryColor: '#FAF0D7',
    secondaryColor: '#F4CA64',
    description: 'Set of four absorbent 100% thick cotton crochet coasters shaped like delicate daisy blossoms.',
    colors: [
      { name: 'Classic Daisy (White + Yellow)', hex: '#FFFDF9' },
      { name: 'Pastel Meadow Mix (4 different pastels)', hex: '#F7D6D8' }
    ],
    sizes: ['Diameter: 12 cm each'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Absorbs drink condensation naturally',
      'Protects wooden tables from mug heat',
      'Machine washable on gentle cycle'
    ]
  },

  // 9. CROCHET SHOES (₹490 - ₹850)
  {
    id: 'shoe-bunny-booties',
    name: 'Baby Bunny Soft Sole Booties',
    category: 'crochet-shoes',
    categoryName: 'Crochet Shoes',
    price: 490,
    badge: 'Baby Favorite',
    artType: 'shoes',
    primaryColor: '#F7D6D8',
    secondaryColor: '#FFFDF9',
    description: 'Precious hand-crocheted infant booties with perky rabbit ears, ribbed snug ankle cuffs and soft flexible yarn soles.',
    colors: [
      { name: 'Baby Blush Pink', hex: '#F7D6D8' },
      { name: 'Cloud Cream Ivory', hex: '#FFFDF9' },
      { name: 'Sage Mint', hex: '#8FA882' }
    ],
    sizes: ['0–6 Months (10 cm sole)', '6–12 Months (11.5 cm sole)'],
    customisable: true,
    prepTime: '2–3 working days to craft',
    highlights: [
      'Soft baby-grade antimicrobial yarn',
      'Stays on tiny feet without tight elastic',
      'Heartfelt baby shower gift'
    ]
  },
  {
    id: 'shoe-lounge-slippers',
    name: 'Cozy Cloud Lounge Slippers',
    category: 'crochet-shoes',
    categoryName: 'Crochet Shoes',
    price: 790,
    badge: 'Cozy Pick',
    artType: 'shoes',
    primaryColor: '#7C5346',
    secondaryColor: '#FAF0D7',
    description: 'Chunky double-soled indoor slippers made for relaxing at home with thick cushioned yarn footbeds.',
    colors: [
      { name: 'Warm Taupe & Cream', hex: '#7C5346' },
      { name: 'Rose Melange', hex: '#D48C8C' }
    ],
    sizes: ['Small (UK 3-4)', 'Medium (UK 5-6)', 'Large (UK 7-8)'],
    customisable: true,
    prepTime: '3–4 working days to craft',
    highlights: [
      'Double-layered sole for soft underfoot padding',
      'Breathable and keeps feet naturally warm',
      'Custom sizing upon request'
    ]
  },
  {
    id: 'shoe-daisy-mules',
    name: 'Pastel Daisy Indoor Mule Slippers',
    category: 'crochet-shoes',
    categoryName: 'Crochet Shoes',
    price: 850,
    badge: 'Artisanal',
    artType: 'shoes',
    primaryColor: '#FAF0D7',
    secondaryColor: '#F4CA64',
    description: 'Slip-on crochet mule style slippers with an oversized floral daisy accent across the vamp.',
    colors: [
      { name: 'Vanilla & Daisy', hex: '#FAF0D7' },
      { name: 'Blush & Daisy', hex: '#F7D6D8' }
    ],
    sizes: ['Small (UK 4-5)', 'Medium (UK 6-7)'],
    customisable: true,
    prepTime: '3–4 working days to craft',
    highlights: [
      'Easy slip-on silhouette',
      'Comfortable arch contouring',
      'Handcrafted with care for indoor lounging'
    ]
  },

  // 10. CROCHET FLOWERS (₹250 - ₹380)
  {
    id: 'flw-sunflower-stem',
    name: 'Single Stem Sunshine Sunflower',
    category: 'crochet-flowers',
    categoryName: 'Crochet Flowers',
    price: 290,
    badge: 'Bestseller',
    artType: 'flower',
    primaryColor: '#F4CA64',
    secondaryColor: '#7C5346',
    description: 'Vibrant crochet sunflower on a long flexible wire stem with dark textured center disc and realistic leaves.',
    colors: [
      { name: 'Bright Golden Yellow', hex: '#F4CA64' },
      { name: 'Honey Amber Ochre', hex: '#D19828' }
    ],
    sizes: ['Stem Length: 30 cm (Bendable)'],
    customisable: true,
    prepTime: '1–2 working days to craft',
    highlights: [
      'Bendable floral wire wrapped in green yarn',
      'Arranges easily in any vase or cup',
      'Everlasting blossom that never fades'
    ]
  },
  {
    id: 'flw-pastel-tulip',
    name: 'Pastel Tulip Single Stem',
    category: 'crochet-flowers',
    categoryName: 'Crochet Flowers',
    price: 250,
    badge: 'Popular',
    artType: 'flower',
    primaryColor: '#F7D6D8',
    secondaryColor: '#8FA882',
    description: 'Elegantly shaped 3D tulip bloom with soft polyfill interior and a tall slender green stem with leaf.',
    colors: [
      { name: 'Baby Pink Tulip', hex: '#F7D6D8' },
      { name: 'Cream White Tulip', hex: '#FFFDF9' },
      { name: 'Lavender Tulip', hex: '#C49AC4' },
      { name: 'Peach Sunset Tulip', hex: '#F28482' }
    ],
    sizes: ['Stem Length: 28 cm'],
    customisable: true,
    prepTime: '1 working day to craft',
    highlights: [
      'Mix and match colors for your own vase bouquet',
      'Soft curved petal silhouette',
      'Handmade with love ♡'
    ]
  },
  {
    id: 'flw-lavender-trio-stems',
    name: 'Everlasting Lavender Stems (Trio)',
    category: 'crochet-flowers',
    categoryName: 'Crochet Flowers',
    price: 380,
    badge: 'Trio Set',
    artType: 'flower',
    primaryColor: '#C49AC4',
    secondaryColor: '#8FA882',
    description: 'Set of 3 slender textured lavender flower stems in varying shades of lilac and soft purple.',
    colors: [
      { name: 'Lilac & Violet Trio', hex: '#C49AC4' }
    ],
    sizes: ['Set of 3 stems (26 cm length each)'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Adds cozy French cottage charm to any room',
      'Can be scented with your favorite essential oil',
      'Bendable stems'
    ]
  },
  {
    id: 'flw-cherry-blossom',
    name: 'Cherry Blossom Twig Floral Stem',
    category: 'crochet-flowers',
    categoryName: 'Crochet Flowers',
    price: 340,
    badge: 'Handcrafted',
    artType: 'flower',
    primaryColor: '#E8929A',
    secondaryColor: '#8A5E52',
    description: 'Branch-like stem adorned with four miniature blush pink cherry blossoms and tiny delicate green leaf buds.',
    colors: [
      { name: 'Sakura Blush Pink', hex: '#E8929A' },
      { name: 'Snow White Blossom', hex: '#FFFDF9' }
    ],
    sizes: ['Branch Length: 32 cm'],
    customisable: true,
    prepTime: '2 working days to craft',
    highlights: [
      'Natural branching floral silhouette',
      'Fine micro-stitch floral details',
      'Stunning in minimalist glass bottles'
    ]
  },

  // 11. CROCHET JERSEYS (₹1,250 - ₹1,499)
  {
    id: 'jer-patchwork-cardigan',
    name: 'Patchwork Granny Square Cardigan',
    category: 'crochet-jerseys',
    categoryName: 'Crochet Jerseys',
    price: 1499,
    badge: 'Client Showcase Favorite',
    artType: 'jersey',
    primaryColor: '#E8929A',
    secondaryColor: '#FAF0D7',
    description: 'Showstopper wearable art! Meticulously assembled from over 40 individual granny squares with ribbed neckline and button cuffs.',
    colors: [
      { name: 'Pastel Meadow Multi', hex: '#E8929A' },
      { name: 'Vintage Neutral Taupe', hex: '#7C5346' },
      { name: 'Sage & Forest Blend', hex: '#8FA882' }
    ],
    sizes: ['XS/S (Bust 34-36")', 'M/L (Bust 38-42")', 'Custom Tailored'],
    customisable: true,
    prepTime: '7–9 working days to hand-stitch',
    highlights: [
      'Over 40 individual granny squares joined by hand',
      'Cozy relaxed oversized silhouette',
      'Custom color themes available upon request'
    ]
  },
  {
    id: 'jer-meadow-vest',
    name: 'Pastel Meadow Crop Knit Vest',
    category: 'crochet-jerseys',
    categoryName: 'Crochet Jerseys',
    price: 1250,
    badge: 'Trending Fashion',
    artType: 'jersey',
    primaryColor: '#8FA882',
    secondaryColor: '#FAF0D7',
    description: 'Trendy sleeveless crochet knit vest with V-neck collar, ribbed trim and cute floral motifs across front and back.',
    colors: [
      { name: 'Sage Green & Daisy Cream', hex: '#8FA882' },
      { name: 'Blush Pink & Ivory', hex: '#F7D6D8' },
      { name: 'Buttercup Yellow & White', hex: '#F4CA64' }
    ],
    sizes: ['S (Bust 32-34")', 'M (Bust 36-38")', 'L (Bust 40-42")'],
    customisable: true,
    prepTime: '5–6 working days to craft',
    highlights: [
      'Layers gorgeously over white shirts and dresses',
      'Breathable all-season cotton acrylic yarn',
      'Neat ribbed armholes and hem'
    ]
  },
  {
    id: 'jer-daisy-top',
    name: 'Daisy Border Short-Sleeved Jersey Top',
    category: 'crochet-jerseys',
    categoryName: 'Crochet Jerseys',
    price: 1390,
    badge: 'Artisanal Wear',
    artType: 'jersey',
    primaryColor: '#FAF0D7',
    secondaryColor: '#E8929A',
    description: 'Lightweight summer crochet top with scalloped sleeves, boat neckline and daisy border hemline.',
    colors: [
      { name: 'Antique Ivory & Daisy Border', hex: '#FAF0D7' },
      { name: 'Dusty Rose & Cream Border', hex: '#C47B7B' }
    ],
    sizes: ['XS/S (Bust 32-35")', 'M/L (Bust 36-40")'],
    customisable: true,
    prepTime: '6–7 working days to craft',
    highlights: [
      'Delicate open-work stitch with great breathability',
      'Scalloped picot edge finishes',
      'Handmade with love ♡'
    ]
  }
];

// Business Information
const BUSINESS_INFO = {
  name: 'MadeByMaa',
  tagline: 'Handmade with Love ♡',
  motto: 'Little things, made with love.',
  whatsappNumber: '+91 99962 67995',
  whatsappRaw: '919996267995',
  instagramHandle: '@madebymaa19',
  instagramUrl: 'https://www.instagram.com/madebymaa19/',
  deliveryTime: '4–5 working days',
  deliveryCoverage: 'Pan India',
  priceRange: '₹200–₹1,500',
  returnPolicy: 'No returns accepted (each product is handcrafted individually to order)',
  exchangePolicy: 'No exchanges accepted'
};
