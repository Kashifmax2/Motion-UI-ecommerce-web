/* ============================================================
   AURUM — Cart & Checkout page
   Renders line items, order summary, checkout form,
   and order confirmation (front-end only)
   ============================================================ */

(function () {
  'use strict';

  const root = document.getElementById('cartRoot');
  const SHIPPING = 0; // complimentary luxury shipping
  const TAX_RATE = 0.0;

  /* ---------- Render cart or confirmation ---------- */
  function render() {
    const cart = getCart();
    if (cart.length === 0) {
      renderEmpty();
      return;
    }
    renderCart(cart);
  }

  /* ---------- Empty state ---------- */
  function renderEmpty() {
    root.innerHTML = `
      <div class="empty-state" style="padding:5rem 1rem;">
        <p style="font-size:1.4rem; margin-bottom:0.5rem; color:var(--text);">Your cart is empty.</p>
        <p>Discover pieces worth keeping for a lifetime.</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:1.5rem;">Explore the Collection</a>
      </div>`;
  }

  /* ---------- Cart with items + summary + checkout form ---------- */
  function renderCart(cart) {
    const subtotal = cartSubtotal();
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax + SHIPPING;

    root.innerHTML = `
      <div class="cart-layout">
        <!-- Items -->
        <div class="cart-items" id="cartItems">
          ${cart.map((item) => cartItemHTML(item)).join('')}
        </div>

        <!-- Summary + checkout -->
        <aside class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-line"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-line"><span>Shipping</span><span class="summary-free">Complimentary</span></div>
          <div class="summary-line"><span>Estimated Tax</span><span>${formatPrice(tax)}</span></div>
          <div class="summary-line total"><span>Total</span><span>${formatPrice(total)}</span></div>

          <div class="checkout-divider">Secure Checkout</div>

          <form class="checkout-form" id="checkoutForm" novalidate>
            <div class="form-row">
              <div class="field">
                <label>First Name</label>
                <input type="text" name="firstName" required />
              </div>
              <div class="field">
                <label>Last Name</label>
                <input type="text" name="lastName" required />
              </div>
            </div>
            <div class="field">
              <label>Email</label>
              <input type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div class="field">
              <label>Shipping Address</label>
              <input type="text" name="address" required />
            </div>
            <div class="form-row">
              <div class="field">
                <label>City</label>
                <input type="text" name="city" required />
              </div>
              <div class="field">
                <label>Postal Code</label>
                <input type="text" name="zip" required />
              </div>
            </div>

            <div class="checkout-divider">Payment</div>

            <div class="field">
              <label>Card Number</label>
              <input type="text" name="card" placeholder="4242 4242 4242 4242" maxlength="19" required />
            </div>
            <div class="form-row">
              <div class="field">
                <label>Expiry</label>
                <input type="text" name="exp" placeholder="MM / YY" maxlength="7" required />
              </div>
              <div class="field">
                <label>CVC</label>
                <input type="text" name="cvc" placeholder="123" maxlength="4" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" style="margin-top:0.5rem;">
              Place Order · ${formatPrice(total)}
            </button>
          </form>
        </aside>
      </div>`;

    wireItemControls();
    wireCheckoutForm();
  }

  /* ---------- Single cart line item ---------- */
  function cartItemHTML(item) {
    const p = getProductById(item.id);
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    return `
      <div class="cart-item" data-id="${item.id}" data-size="${item.size || ''}">
        <a href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="${p.name}" /></a>
        <div class="cart-item-info">
          <span class="meta">${p.category}${item.size ? ' · ' + item.size : ''}</span>
          <h3><a href="product.html?id=${p.id}" style="color:inherit;">${p.name}</a></h3>
          <div class="qty-control" style="margin-top:0.6rem;">
            <button type="button" data-action="dec" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button type="button" data-action="inc" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${formatPrice(lineTotal)}</span>
          <button type="button" class="cart-remove" data-action="remove">Remove</button>
        </div>
      </div>`;
  }

  /* ---------- Quantity / remove controls ---------- */
  function wireItemControls() {
    root.querySelectorAll('.cart-item').forEach((el) => {
      const id = el.getAttribute('data-id');
      const size = el.getAttribute('data-size') || null;

      el.querySelectorAll('[data-action]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          if (action === 'inc') updateQty(id, 1, size);
          else if (action === 'dec') updateQty(id, -1, size);
          else if (action === 'remove') {
            removeFromCart(id, size);
            showToast('Item removed');
          }
        });
      });
    });

    // Re-render on any cart change
    document.addEventListener('cart:changed', onCartChanged, { once: true });
  }

  function onCartChanged() {
    render();
  }

  /* ---------- Checkout submission ---------- */
  function wireCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ff6b6b';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      if (!valid) {
        showToast('Please complete all required fields.');
        return;
      }

      // Simulate order completion
      const orderNum = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
      clearCart();
      renderConfirmation(orderNum);
    });
  }

  /* ---------- Confirmation ---------- */
  function renderConfirmation(orderNum) {
    root.innerHTML = `
      <div class="confirmation">
        <div class="confirmation-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="eyebrow">Order Confirmed</span>
        <h1 class="hero-heading" style="font-size:clamp(2rem,6vw,3.5rem); font-weight:900; text-transform:uppercase; margin:1rem 0;">
          Thank You
        </h1>
        <p style="color:var(--text-dim); max-width:440px; margin-inline:auto; line-height:1.7;">
          Your order <strong style="color:var(--text);">${orderNum}</strong> has been received.
          A confirmation has been sent to your email, and our concierge will contact you shortly to arrange insured delivery.
        </p>
        <a href="products.html" class="btn btn-primary" style="margin-top:2rem;">Continue Shopping</a>
      </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Init ---------- */
  function init() {
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
