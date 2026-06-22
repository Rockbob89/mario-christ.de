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

  const READ_PAUSE = 3300; // Lesepause – Zeit, die ganze Zeile zu lesen, bevor der Twist zündet
  const STRIKE_TO_CORRECTION = 400;
  const CORRECTION_TO_REVEAL = 1200; // Twist sacken lassen, dann Payoff (Bild+Reassure+CTA) gemeinsam

  function runSequence() {
    window.setTimeout(() => {
      hero.classList.add('is-struck');
      window.setTimeout(() => {
        hero.classList.add('is-corrected');
        window.setTimeout(() => {
          hero.classList.add('is-revealed');
        }, CORRECTION_TO_REVEAL);
      }, STRIKE_TO_CORRECTION);
    }, READ_PAUSE);
  }

  // Erst starten, wenn die Seite sichtbar ist – sonst spielt der Twist im
  // Hintergrund-Tab (shift-/cmd-click) unbemerkt ab und ist beim Wechsel verpufft.
  if (document.visibilityState === 'visible') {
    runSequence();
  } else {
    const onVisible = function () {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVisible);
      runSequence();
    };
    document.addEventListener('visibilitychange', onVisible);
  }
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

/* ── Mobile Burger (Hub-Nav + Sponsoring-Nav, gleiches Muster) ── */
function initBurger(navSel, openClass, burgerSel, menuSel, linkSel) {
  const nav = document.querySelector(navSel);
  if (!nav) return;
  const burger = nav.querySelector(burgerSel);
  const menu   = nav.querySelector(menuSel);
  if (!burger || !menu) return;

  function setOpen(open) {
    nav.classList.toggle(openClass, open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }

  burger.addEventListener('click', () => {
    setOpen(!nav.classList.contains(openClass));
  });

  // Schließen bei Link-Klick (Anker-/Seiten-Navigation)
  menu.addEventListener('click', (e) => {
    if (e.target.closest(linkSel)) setOpen(false);
  });

  // Schließen bei Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initStickyNav();
  initBurger('.sticky-nav', 'sticky-nav--open', '.sticky-nav__burger', '.sticky-nav__list', '.sticky-nav__link');
  initBurger('.site-nav', 'site-nav--open', '.site-nav__burger', '.site-nav__links', 'a');
});
