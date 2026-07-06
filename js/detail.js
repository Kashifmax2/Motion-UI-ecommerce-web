/* ============================================================
   AURUM — Product Detail page
   Gallery, size/variant selectors, quantity, add-to-cart
   Reads ?id= from URL
   ============================================================ */

(function () {
  'use strict';

  let selectedSize = null;
  let qty = 1;
  let activeImage = 0;
  let product = null;

  /* ---------- Resolve product from URL ---------- */
  function resolveProduct() {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    product = id ? getProductById(id) : null;
    return product;
  }

  /* ---------- Render detail ---------- */
  function render() {
    const grid = document.getElementById('detailGrid');
    const crumb = document.getElementById('detailCrumb');

    if (!product) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <p style="font-size:1.4rem; margin-bottom:0.5rem;">Piece not found.</p>
          <p>This item may have been moved or sold.</p>
          <a href="products.html" class="btn btn-ghost" style="margin-top:1.5rem;">Back to Shop</a>
        </div>`;
      return;
    }

    document.title = `${product.name} — AURUM`;
    selectedSize = product.sizes ? product.sizes[0] : null;
    activeImage = 0;

    // Breadcrumb
    crumb.innerHTML = `
      <a href="index.html">Home</a><span>/</span>
      <a href="products.html">Shop</a><span>/</span>
      <a href="products.html?cat=${encodeURIComponent(product.category)}">${product.category}</a><span>/</span>
      <span style="color:var(--text);">${product.name}</span>`;

    const oldPrice = product.oldPrice
      ? `<span class="old" style="color:var(--text-dim);text-decoration:line-through;font-weight:400;margin-left:0.6rem;font-size:1.1rem;">${formatPrice(product.oldPrice)}</span>`
      : '';
    const badge = product.badge
      ? `<span class="product-badge" style="position:static;display:inline-block;margin-bottom:1rem;">${product.badge}</span>`
      : '';

    const sizesHTML = product.sizes
      ? `<div class="option-row">
          <label>Select Size</label>
          <div class="option-pills" id="sizePills">
            ${product.sizes
              .map(
                (s, i) =>
                  `<button class="option-pill${i === 0 ? ' active' : ''}" data-size="${s}">${s}</button>`
              )
              .join('')}
          </div>
        </div>`
      : '';

    grid.innerHTML = `
      <!-- Gallery -->
      <div>
        <div class="gallery-main">
          <img id="mainImage" src="${product.images[0]}" alt="${product.name}" />
        </div>
        <div class="gallery-thumbs" id="thumbs">
          ${product.images
            .map(
              (src, i) =>
                `<div class="gallery-thumb${i === 0 ? ' active' : ''}" data-index="${i}">
                  <img src="${src}" alt="" loading="lazy" />
                </div>`
            )
            .join('')}
        </div>
      </div>

      <!-- Info -->
      <div class="detail-info">
        ${badge}
        <span class="detail-cat">${product.category} · ${product.material}</span>
        <h1>${product.name}</h1>
        <div class="detail-price">${formatPrice(product.price)}${oldPrice}</div>
        <p class="detail-desc">${product.description}</p>

        ${sizesHTML}

        <div class="option-row">
          <label>Quantity</label>
          <div class="qty-control">
            <button id="qtyDown" type="button" aria-label="Decrease">−</button>
            <span id="qtyValue">1</span>
            <button id="qtyUp" type="button" aria-label="Increase">+</button>
          </div>
        </div>

        <div class="detail-actions">
          <button class="btn btn-primary" id="addToCartBtn" data-magnet data-magnet-padding="60" data-magnet-strength="6">
            Add to Cart
          </button>
          <a href="cart.html" class="btn btn-ghost">View Cart</a>
        </div>

        <div class="detail-meta">
          <div><strong>Complimentary Shipping</strong>Insured worldwide delivery</div>
          <div><strong>14-Day Returns</strong>Return in original condition</div>
          <div><strong>2-Year Warranty</strong>Against manufacturing defects</div>
          <div><strong>Authenticity Guaranteed</strong>Individually inspected</div>
        </div>
      </div>`;

    wireGallery();
    wireSizes();
    wireQty();
    wireAddToCart();
    if (window.AURUM) window.AURUM.refreshFadeIns(grid);
    // Re-init magnet for newly injected button
    initNewMagnets();
  }

  function wireGallery() {
    const main = document.getElementById('mainImage');
    document.querySelectorAll('#thumbs .gallery-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.getAttribute('data-index'), 10);
        activeImage = index;
        main.style.opacity = '0';
        setTimeout(() => {
          main.src = product.images[index];
          main.style.opacity = '1';
        }, 150);
        document
          .querySelectorAll('#thumbs .gallery-thumb')
          .forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  function wireSizes() {
    const pills = document.querySelectorAll('#sizePills .option-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSize = pill.getAttribute('data-size');
      });
    });
  }

  function wireQty() {
    const value = document.getElementById('qtyValue');
    document.getElementById('qtyUp').addEventListener('click', () => {
      qty = Math.min(10, qty + 1);
      value.textContent = qty;
    });
    document.getElementById('qtyDown').addEventListener('click', () => {
      qty = Math.max(1, qty - 1);
      value.textContent = qty;
    });
  }

  function wireAddToCart() {
    document.getElementById('addToCartBtn').addEventListener('click', () => {
      addToCart(product.id, qty, selectedSize);
      showToast(`${product.name} added to cart`);
    });
  }

  /* ---------- Magnet init for dynamically injected elements ---------- */
  function initNewMagnets() {
    if (typeof window.AURUM === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('[data-magnet]').forEach((el) => {
      if (el.dataset.magnetBound) return;
      el.dataset.magnetBound = '1';
      const padding = parseFloat(el.getAttribute('data-magnet-padding')) || 120;
      const strength = parseFloat(el.getAttribute('data-magnet-strength')) || 3;
      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const inside =
          e.clientX > rect.left - padding &&
          e.clientX < rect.right + padding &&
          e.clientY > rect.top - padding &&
          e.clientY < rect.bottom + padding;
        if (inside) {
          el.style.transition = 'transform 0.3s ease-out';
          el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
        } else {
          el.style.transition = 'transform 0.6s ease-in-out';
          el.style.transform = 'translate3d(0,0,0)';
        }
      };
      document.addEventListener('mousemove', onMove);
    });
  }

  /* ---------- Related products (same category, exclude current) ---------- */
  function renderRelated() {
    const grid = document.getElementById('relatedGrid');
    if (!grid || !product) return;
    const related = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
    // Pad with other categories if fewer than 4
    if (related.length < 4) {
      PRODUCTS.filter(
        (p) => p.id !== product.id && !related.includes(p)
      )
        .slice(0, 4 - related.length)
        .forEach((p) => related.push(p));
    }
    grid.innerHTML = related
      .map((p, i) => window.productCardHTML(p, i))
      .join('');
    grid.querySelectorAll('[data-quick-add]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-quick-add');
        const p = getProductById(id);
        addToCart(id, 1, p.sizes ? p.sizes[0] : null);
        showToast(`${p.name} added to cart`);
      });
    });
    if (window.AURUM) window.AURUM.refreshFadeIns(grid);
  }

  /* ---------- Init ---------- */
  function init() {
    if (!resolveProduct()) {
      render(); // shows not-found state
      return;
    }
    render();
    renderRelated();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
