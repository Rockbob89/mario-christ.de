/* ============================================================
   mario-christ.de – main.js
   Vanilla JS only. No libraries.
   ============================================================ */

'use strict';

/* ── Landing Page: Split-Screen Hover ───────────────────── */
function initSplitScreen() {
  const wrapper = document.querySelector('.split-screen');
  if (!wrapper) return;

  const techSide   = wrapper.querySelector('.split--tech');
  const kickerSide = wrapper.querySelector('.split--kicker');
  if (!techSide || !kickerSide) return;

  let activateTimer = null;
  let resetTimer    = null;

  // 130ms Aktivierungs-Delay: schnelle Maus-Durchfahrten lösen nichts aus
  function activate(side) {
    clearTimeout(resetTimer);
    clearTimeout(activateTimer);
    activateTimer = setTimeout(() => {
      wrapper.setAttribute('data-active', side);
    }, 130);
  }

  // 90ms Reset-Delay: verhindert Flackern beim Wechsel zwischen den Hälften
  function scheduleReset() {
    clearTimeout(activateTimer);
    resetTimer = setTimeout(() => {
      wrapper.removeAttribute('data-active');
    }, 90);
  }

  techSide.addEventListener('mouseenter',   () => activate('tech'));
  kickerSide.addEventListener('mouseenter', () => activate('kicker'));
  wrapper.addEventListener('mouseleave',    scheduleReset);

  // Keyboard: focusin setzt data-active sofort (kein Delay – Nutzer ist schon da)
  techSide.addEventListener('focusin',   () => { clearTimeout(resetTimer); clearTimeout(activateTimer); wrapper.setAttribute('data-active', 'tech'); });
  kickerSide.addEventListener('focusin', () => { clearTimeout(resetTimer); clearTimeout(activateTimer); wrapper.setAttribute('data-active', 'kicker'); });
  wrapper.addEventListener('focusout', (e) => {
    if (!wrapper.contains(e.relatedTarget)) {
      clearTimeout(activateTimer);
      wrapper.removeAttribute('data-active');
    }
  });

  // Touch: erster Tap aktiviert, zweiter Tap navigiert
  let touchActive = null;

  function handleTouch(e, side) {
    if (touchActive !== side) {
      e.preventDefault();
      touchActive = side;
      clearTimeout(resetTimer);
      wrapper.setAttribute('data-active', side);
    }
    // Zweiter Tap: Link greift normal
  }

  techSide.addEventListener('touchstart',   (e) => handleTouch(e, 'tech'),   { passive: false });
  kickerSide.addEventListener('touchstart', (e) => handleTouch(e, 'kicker'), { passive: false });

  // Touch außerhalb → Reset
  document.addEventListener('touchstart', (e) => {
    if (!wrapper.contains(e.target)) {
      touchActive = null;
      wrapper.removeAttribute('data-active');
    }
  });
}

/* ── Sponsoring Page: Sticky Nav Active State ───────────── */
function initStickyNav() {
  const nav = document.querySelector('.sticky-nav');
  if (!nav) return;

  const navLinks  = nav.querySelectorAll('a[href^="#"]');
  const sections  = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initSplitScreen();
  initStickyNav();
});
