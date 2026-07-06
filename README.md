# AURUM — Luxury E-Commerce

Live > https://motion-ui-web.netlify.app/

A premium mixed-luxury boutique (watches, bags, jewelry, perfume) built in
**plain HTML / CSS / JavaScript** — no build tools, no frameworks. The dark,
motion-rich design language is ported from a Framer-Motion reference
("Jack 3D Creator") and re-implemented in vanilla JS.

![AURUM](https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80)

## ✨ Features

- **4 pages**: Home, Product Listing, Product Detail, Cart & Checkout
- **Dark luxury theme** — `#0C0C0C` background, gradient headings, Kanit typeface
- **Motion (vanilla JS)**:
  - Magnetic mouse-follow hover on hero image & CTAs
  - Scroll-triggered fade-ins via `IntersectionObserver`
  - Character-by-character text reveal (brand story)
  - Seamless CSS marquee of product imagery
- **Full cart** — `localStorage`-backed, live badge, quantity controls
- **Checkout** — validated form → order confirmation (front-end demo)
- **Filters & sort** on the listing page (category, price, sort order)
- **Deep-links** — `products.html?cat=Watches` pre-selects a category
- **Fully responsive** with a mobile slide-out menu

## 🚀 Run it

No installation required. Pick one:

**Option A — open directly**
```
double-click index.html
```

**Option B — local server (recommended)**
```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000
```

## 📁 Structure

```
ZCodeProject/
├── index.html          Home / landing
├── products.html       Listing (filters + sort)
├── product.html        Detail (gallery + variants)
├── cart.html           Cart + checkout
├── css/
│   └── style.css       All styles + design system
├── js/
│   ├── data.js         Product catalog (12 luxury items)
│   ├── cart.js         Cart logic (localStorage)
│   ├── ui.js           Shared motion: magnet, fade-in, char-reveal, nav
│   ├── home.js         Home page rendering
│   ├── listing.js      Filters / sort / grid
│   ├── detail.js       Gallery / variants / add-to-cart
│   └── checkout.js     Cart render + checkout form
└── README.md
```

## 🎨 Design Tokens

| Token        | Value                                            |
|--------------|--------------------------------------------------|
| Background   | `#0C0C0C`                                        |
| Text         | `#D7E2EA`                                        |
| Heading grad | `linear-gradient(180deg,#646973,#BBCCD7)`        |
| CTA gradient | `linear-gradient(123deg,#18011F,#B600A8,#7621B0,#BE4C00)` |
| Font         | Kanit (Google Fonts, 300–900)                    |
| Radius       | 16 / 28 / 40 / 60px + full-pill buttons          |

## 🛒 Cart behavior

- Add from any product card ("Quick Add") or detail page
- Cart persists across pages via `localStorage`
- Badge in the navbar updates live
- Checkout validates required fields, then shows an order confirmation

## 🖼️ Imagery

All product photography uses the Unsplash CDN (stable photo IDs). Replace the
URLs in `js/data.js` to use your own assets.

---

Built with intent. Designed to endure.
