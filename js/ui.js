/* ============================================================
   AURUM — Shared UI behaviors (all pages)
   - Sticky navbar scrolled state
   - Mobile menu toggle
   - FadeIn via IntersectionObserver
   - Magnet mouse-follow hover (ported from reference)
   - Char-by-char reveal (brand story)
   - Footer year + cart badge init
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Navbar scrolled state ---------- */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.nav-backdrop');
    if (!toggle || !links) return;

    const close = () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };
    const open = () => {
      toggle.classList.add('open');
      links.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () =>
      toggle.classList.contains('open') ? close() : open()
    );
    if (backdrop) backdrop.addEventListener('click', close);
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) close();
    });
  }

  /* ---------- FadeIn: IntersectionObserver ---------- */
  function initFadeIns() {
    const els = document.querySelectorAll('[data-fade]');
    if (!els.length) return;

    // Respect per-item delay
    els.forEach((el) => {
      const delay = el.getAttribute('data-delay');
      if (delay) el.style.transitionDelay = delay + 's';
    });

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  /**
   * Re-scan for [data-fade] elements that were added dynamically
   * (e.g. product grids rendered by JS). Call after injecting markup.
   */
  function refreshFadeIns(scope) {
    const root = scope || document;
    const els = root.querySelectorAll('[data-fade]:not(.is-visible)');
    els.forEach((el) => {
      const delay = el.getAttribute('data-delay');
      if (delay) el.style.transitionDelay = delay + 's';
    });
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Magnet hover (ported from reference) ----------
   * Elements with [data-magnet] gently translate toward the cursor
   * when the pointer is within `padding` px of the element edge.
   * Strength divides the raw offset (higher = subtler motion).
   */
  function initMagnet() {
    const magnets = document.querySelectorAll('[data-magnet]');
    if (!magnets.length) return;

    // Disable on touch / coarse pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    magnets.forEach((el) => {
      const padding = parseFloat(el.getAttribute('data-magnet-padding')) || 120;
      const strength = parseFloat(el.getAttribute('data-magnet-strength')) || 3;

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Activate when cursor within padding distance of element bounds
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
          el.style.transform = 'translate3d(0, 0, 0)';
        }
      };

      const onLeave = () => {
        el.style.transition = 'transform 0.6s ease-in-out';
        el.style.transform = 'translate3d(0, 0, 0)';
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseleave', onLeave);
    });
  }

  /* ---------- Char-by-char reveal (brand story) ---------- */
  function initCharReveal() {
    const targets = document.querySelectorAll('[data-reveal-text]');
    if (!targets.length) return;

    targets.forEach((target) => {
      const text = target.textContent;
      target.setAttribute('aria-label', text);
      target.innerHTML = '';
      [...text].forEach((ch) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        target.appendChild(span);
      });
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const chars = entry.target.querySelectorAll('.char');
          chars.forEach((c, i) => {
            c.style.transitionDelay = i * 0.012 + 's';
          });
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- Footer year + active nav link ---------- */
  function initMisc() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });

    // Highlight active nav link based on filename
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  /* ---------- Init on DOM ready ---------- */
  function init() {
    initNavbar();
    initMobileMenu();
    initFadeIns();
    initMagnet();
    initCharReveal();
    initMisc();
    if (typeof window.renderCartBadge === 'function') {
      window.renderCartBadge();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for dynamic content
  window.AURUM = { refreshFadeIns };
})();
