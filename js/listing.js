/* ============================================================
   AURUM — Product Listing page
   Filters (category + price), sort, render grid
   Reads ?cat= from URL for category deep-links
   ============================================================ */

(function () {
  'use strict';

  const state = {
    categories: new Set(),
    maxPrice: 7000,
    sort: 'featured',
  };

  /* ---------- Build category filter checkboxes ---------- */
  function renderCategoryFilters() {
    const wrap = document.getElementById('filterCategories');
    if (!wrap) return;
    const cats = getCategories();
    wrap.innerHTML = cats
      .map(
        (c) => `
      <label class="filter-option">
        <input type="checkbox" value="${c}" />
        <span>${c}</span>
      </label>`
      )
      .join('');

    wrap.querySelectorAll('input[type=checkbox]').forEach((cb) => {
      cb.addEventListener('change', () => {
        if (cb.checked) state.categories.add(cb.value);
        else state.categories.delete(cb.value);
        // Sync label active style
        cb.closest('.filter-option').classList.toggle('active', cb.checked);
        renderGrid();
      });
    });
  }

  /* ---------- Apply URL ?cat= on load ---------- */
  function applyUrlCategory() {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (!cat) return;
    const cb = document.querySelector(
      `#filterCategories input[value="${cat}"]`
    );
    if (cb) {
      cb.checked = true;
      state.categories.add(cat);
      cb.closest('.filter-option').classList.add('active');
    }
    // Update title
    const title = document.getElementById('pageTitle');
    const crumb = document.getElementById('crumb');
    if (title) title.textContent = cat;
    if (crumb) crumb.textContent = cat;
  }

  /* ---------- Filter + sort pipeline ---------- */
  function getFilteredProducts() {
    let list = PRODUCTS.slice();

    if (state.categories.size > 0) {
      list = list.filter((p) => state.categories.has(p.category));
    }
    list = list.filter((p) => p.price <= state.maxPrice);

    switch (state.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }

  /* ---------- Render ---------- */
  function renderGrid() {
    const grid = document.getElementById('shopGrid');
    const count = document.getElementById('resultCount');
    if (!grid) return;

    const list = getFilteredProducts();

    if (count) {
      count.textContent = `${list.length} ${list.length === 1 ? 'piece' : 'pieces'}`;
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <p style="font-size:1.2rem; margin-bottom:0.5rem;">No pieces match your selection.</p>
          <p>Try adjusting your filters.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list
      .map((p, i) => window.productCardHTML(p, i))
      .join('');

    // Attach quick-add handlers
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

  /* ---------- Wire up controls ---------- */
  function initControls() {
    const priceRange = document.getElementById('priceRange');
    const priceLabel = document.getElementById('priceLabel');
    if (priceRange) {
      priceRange.addEventListener('input', () => {
        state.maxPrice = parseInt(priceRange.value, 10);
        priceLabel.textContent = formatPrice(state.maxPrice);
        renderGrid();
      });
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        renderGrid();
      });
    }

    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.categories.clear();
        state.maxPrice = 7000;
        state.sort = 'featured';
        document
          .querySelectorAll('#filterCategories input')
          .forEach((cb) => (cb.checked = false));
        document
          .querySelectorAll('#filterCategories .filter-option')
          .forEach((o) => o.classList.remove('active'));
        if (priceRange) priceRange.value = 7000;
        if (priceLabel) priceLabel.textContent = formatPrice(7000);
        if (sortSelect) sortSelect.value = 'featured';
        renderGrid();
      });
    }
  }

  /* ---------- Init ---------- */
  function init() {
    renderCategoryFilters();
    applyUrlCategory();
    initControls();
    renderGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
