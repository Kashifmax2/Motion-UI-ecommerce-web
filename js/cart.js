/* ============================================================
   AURUM — Cart Logic (localStorage-backed)
   Items stored as { id, qty, size }
   ============================================================ */

const CART_KEY = 'aurum_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
  document.dispatchEvent(new CustomEvent('cart:changed'));
}

/**
 * Add to cart. If the same id+size exists, increment quantity.
 */
function addToCart(id, qty = 1, size = null) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty, size });
  }
  saveCart(cart);
}

function removeFromCart(id, size = null) {
  let cart = getCart();
  cart = cart.filter((i) => !(i.id === id && i.size === size));
  saveCart(cart);
}

function updateQty(id, delta, size = null) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}

function setQty(id, qty, size = null) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCartBadge();
  document.dispatchEvent(new CustomEvent('cart:changed'));
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, i) => {
    const p = window.getProductById(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

/* ---------- Badge rendering ---------- */
function renderCartBadge() {
  const count = cartCount();
  document.querySelectorAll('.cart-badge').forEach((el) => {
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
}

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
    '<span>' +
    message +
    '</span>';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* Expose globally */
window.getCart = getCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.setQty = setQty;
window.clearCart = clearCart;
window.cartCount = cartCount;
window.cartSubtotal = cartSubtotal;
window.renderCartBadge = renderCartBadge;
window.showToast = showToast;
