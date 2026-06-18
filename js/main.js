/* ============================================================
   mario-christ.de – main.js
   Vanilla JS only. No libraries.
   ============================================================ */

'use strict';

/* ── Landing: Hero-Incident-Animation ───────────────────── */
function initHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  // Nur animieren, wenn das frühe Inline-Script html.anim gesetzt hat
  // (sonst reduced-motion oder no-JS → statischer End-State steht schon im HTML/CSS)
  if (!document.documentElement.classList.contains('anim')) return;

  const READ_PAUSE = 1800; // Lesepause – kritisch, sonst zündet der Twist nicht
  const STRIKE_TO_CORRECTION = 400;
  const CORRECTION_TO_REASSURE = 450;

  window.setTimeout(() => {
    hero.classList.add('is-struck');
    window.setTimeout(() => {
      hero.classList.add('is-corrected');
      window.setTimeout(() => {
        hero.classList.add('is-settled');
      }, CORRECTION_TO_REASSURE);
    }, STRIKE_TO_CORRECTION);
  }, READ_PAUSE);
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
  initHero();
  initStickyNav();
});
