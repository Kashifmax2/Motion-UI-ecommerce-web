/* ============================================================
   AURUM — Product Catalog
   Mixed luxury boutique: watches, bags, jewelry, perfume
   Images: Unsplash CDN (stable IDs)
   ============================================================ */

const PRODUCTS = [
  {
    id: 'watch-01',
    name: 'Celestial Automatic',
    category: 'Watches',
    price: 4250,
    oldPrice: 4800,
    badge: 'Sale',
    material: '18k Gold / Sapphire',
    description:
      'A self-winding automatic movement housed in a hand-finished 18k gold case. The sapphire crystal exhibition back reveals the celestial rotor at work — engineered to last generations.',
    sizes: ['38mm', '40mm', '42mm'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=80',
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=900&q=80',
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=900&q=80',
    ],
  },
  {
    id: 'watch-02',
    name: 'Noir Chronograph',
    category: 'Watches',
    price: 3200,
    material: 'Black Steel',
    description:
      'A precision chronograph wrapped in stealth black steel. Designed for those who command the room without saying a word.',
    sizes: ['40mm', '42mm', '44mm'],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=80',
      'https://images.unsplash.com/photo-1495856458515-0637185db551?w=900&q=80',
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=900&q=80',
      'https://images.unsplash.com/photo-1639037687665-37e0e07fee19?w=900&q=80',
    ],
  },
  {
    id: 'watch-03',
    name: 'Heritage Moonphase',
    category: 'Watches',
    price: 6800,
    badge: 'New',
    material: 'Platinum 950',
    description:
      'An astronomical complication that tracks the lunar cycle with poetic precision. Each Moonphase is assembled and regulated by a single master watchmaker.',
    sizes: ['39mm', '41mm'],
    images: [
      'https://images.unsplash.com/photo-1548171245-3c0c52d9c4b5?w=900&q=80',
      'https://images.unsplash.com/photo-1611703537642-c4039c3e1397?w=900&q=80',
      'https://images.unsplash.com/photo-1606293459337-0b8d8b9bfbe1?w=900&q=80',
      'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=900&q=80',
    ],
  },
  {
    id: 'bag-01',
    name: 'Milano Leather Tote',
    category: 'Bags',
    price: 1850,
    material: 'Italian Calfskin',
    description:
      'Hand-stitched in Florence from full-grain Italian calfskin, the Milano tote is a structured companion that softens beautifully with age.',
    sizes: ['Standard', 'Large'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
    ],
  },
  {
    id: 'bag-02',
    name: 'Atelier Crossbody',
    category: 'Bags',
    price: 1290,
    oldPrice: 1450,
    badge: 'Sale',
    material: 'Saffiano Leather',
    description:
      'A minimalist crossbody with signature saffiano texture. Compact, secure, and effortlessly elegant from day to night.',
    sizes: ['Mini', 'Standard'],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
      'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=900&q=80',
      'https://images.unsplash.com/photo-1564222256577-45785d4e6095?w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
    ],
  },
  {
    id: 'bag-03',
    name: 'Voyager Weekender',
    category: 'Bags',
    price: 2400,
    badge: 'New',
    material: 'Coated Canvas & Leather',
    description:
      'Built for the journey. A spacious weekender in coated canvas trimmed with vegetable-tanned leather — patina-ready and built to travel.',
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
    ],
  },
  {
    id: 'jewel-01',
    name: 'Eternity Diamond Ring',
    category: 'Jewelry',
    price: 5600,
    material: 'Platinum / 1.2ct',
    description:
      'A continuous circle of brilliant-cut diamonds set in platinum — the eternal symbol, reimagined with conflict-free stones of exceptional clarity.',
    sizes: ['4', '5', '6', '7', '8'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80',
    ],
  },
  {
    id: 'jewel-02',
    name: 'Solenne Pearl Necklace',
    category: 'Jewelry',
    price: 2200,
    material: 'Akoya Pearls / 18k Gold',
    description:
      'Lustrous Akoya pearls graduate along an 18k gold chain. A timeless heirloom that catches light from every angle.',
    sizes: ['16in', '18in', '20in'],
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80',
    ],
  },
  {
    id: 'jewel-03',
    name: 'Onyx Cufflinks',
    category: 'Jewelry',
    price: 980,
    material: 'Black Onyx / Silver',
    description:
      'Polished black onyx set in sterling silver. The finishing detail for the discerning collector of bespoke tailoring.',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80',
    ],
  },
  {
    id: 'perfume-01',
    name: 'Velvet Oud Eau de Parfum',
    category: 'Perfume',
    price: 320,
    material: '100ml',
    description:
      'A deep, resinous oud wrapped in rose and amber. Hand-blended in Grasse, France, and aged for six months before bottling.',
    sizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=900&q=80',
    ],
  },
  {
    id: 'perfume-02',
    name: 'Blanc Bergamot',
    category: 'Perfume',
    price: 240,
    oldPrice: 280,
    badge: 'Sale',
    material: '100ml',
    description:
      'Crisp Calabrian bergamot over white musk and cedar — a luminous signature scent for the modern aesthete.',
    sizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=80',
    ],
  },
  {
    id: 'perfume-03',
    name: 'Noir Absolu',
    category: 'Perfume',
    price: 410,
    badge: 'New',
    material: '75ml',
    description:
      'An intense extrait Strength concentration — leather, tobacco, and vanilla orchid melt into a singular, unforgettable trail.',
    sizes: ['30ml', '75ml'],
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80',
    ],
  },
];

/* ---------- Helpers (global) ---------- */
function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getByCategory(cat) {
  return PRODUCTS.filter((p) => p.category === cat);
}

function getCategories() {
  return [...new Set(PRODUCTS.map((p) => p.category))];
}

function formatPrice(n) {
  return '$' + n.toLocaleString('en-US');
}

// Expose globally for non-module scripts
window.PRODUCTS = PRODUCTS;
window.getProductById = getProductById;
window.getByCategory = getByCategory;
window.getCategories = getCategories;
window.formatPrice = formatPrice;
