/* ============================================================
   AURUM — Home page rendering
   Renders marquee, category cards, and featured product grid
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Marquee: duplicate product images for seamless loop ---------- */
  function renderMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    // Pick a subset of product images
    const imgs = PRODUCTS.slice(0, 8).map((p) => p.images[0]);
    // Duplicate the set so the loop is seamless (translateX(-50%))
    const doubled = [...imgs, ...imgs];
    track.innerHTML = doubled
      .map(
        (src) =>
          `<img class="marquee-item" src="${src}?w=640&q=70" alt="" loading="lazy" />`
      )
      .join('');
  }

  /* ---------- Category cards ---------- */
  const CATEGORIES = [
    {
      name: 'Watches',
      img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    },
    {
      name: 'Bags',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    },
    {
      name: 'Jewelry',
      img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    },
    {
      name: 'Perfume',
      img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
    },
  ];

  function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map(
      (c, i) => `
      <a href="products.html?cat=${encodeURIComponent(c.name)}" class="category-card" data-fade data-delay="${i * 0.08}">
        <img src="${c.img}" alt="${c.name} collection" loading="lazy" />
        <span class="category-label">
          ${c.name}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
      </a>`
    ).join('');
  }

  /* ---------- Product card markup (reused across pages via window) ---------- */
  function productCardHTML(p, i) {
    const oldPrice =
      p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : '';
    const badge = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
    return `
      <article class="product-card" data-fade data-delay="${(i % 4) * 0.08}">
        <a href="product.html?id=${p.id}" class="product-media">
          ${badge}
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
          <button class="product-add" data-quick-add="${p.id}" type="button">Quick Add</button>
        </a>
        <div class="product-info">
          <span class="product-cat">${p.category}</span>
          <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
          <div class="product-price">${formatPrice(p.price)} ${oldPrice}</div>
        </div>
      </article>`;
  }
  window.productCardHTML = productCardHTML;

  /* ---------- Featured grid ---------- */
  function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    // Show 8 featured items
    const featured = PRODUCTS.slice(0, 8);
    grid.innerHTML = featured.map((p, i) => productCardHTML(p, i)).join('');
    attachQuickAdd(grid);
    if (window.AURUM) window.AURUM.refreshFadeIns(grid);
  }

  /* ---------- Quick-add handler ---------- */
  function attachQuickAdd(scope) {
    scope.querySelectorAll('[data-quick-add]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-quick-add');
        const p = getProductById(id);
        addToCart(id, 1, p.sizes ? p.sizes[0] : null);
        showToast(`${p.name} added to cart`);
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    renderMarquee();
    renderCategories();
    renderFeatured();
    // Re-run fade-in observer for dynamically rendered elements
    if (window.AURUM) window.AURUM.refreshFadeIns(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
