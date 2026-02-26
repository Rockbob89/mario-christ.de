/* ============================================================
   mario-christ.de – main.js
   Vanilla JS only. No libraries.
   ============================================================ */

'use strict';

/* ── Landing Page: Diagonal ─────────────────────────────── */
function initDiagonalLanding() {
  const landing    = document.getElementById('landing');
  if (!landing) return;

  const bar        = document.getElementById('bar');
  const labelTech  = document.getElementById('label-tech');
  const labelFoos  = document.getElementById('label-foos');
  const sectionTech = landing.querySelector('.section--tech');
  const sectionFoos = landing.querySelector('.section--foos');
  if (!bar || !labelTech || !labelFoos || !sectionTech || !sectionFoos) return;

  let resizeTimer  = null;
  let activateTimer = null;
  let resetTimer   = null;

  // Berechnet den Diagonal-Winkel und positioniert Bar + Labels
  function updateDiagonal() {
    const deg = -(Math.atan(window.innerHeight / window.innerWidth) * 180) / Math.PI;
    const vw  = window.innerWidth / 100; // 1vw in px (für maximale Browser-Kompatibilität)

    bar.style.transform      = `translate(-50%,-50%) rotate(${deg}deg)`;
    labelTech.style.transform = `translate(-50%,-50%) rotate(${deg}deg) translate(${-29 * vw}px,-52px)`;
    labelFoos.style.transform = `translate(-50%,-50%) rotate(${deg}deg) translate(${29 * vw}px,52px)`;

    bar.style.visibility      = 'visible';
    labelTech.style.visibility = 'visible';
    labelFoos.style.visibility = 'visible';
  }

  updateDiagonal();

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateDiagonal, 100);
  });

  // 130ms Delay: verhindert Auslösung bei schnellen Maus-Durchfahrten
  function setHoverClass(cls) {
    clearTimeout(resetTimer);
    clearTimeout(activateTimer);
    activateTimer = setTimeout(() => {
      landing.classList.remove('hover-tech', 'hover-foos');
      if (cls) landing.classList.add(cls);
    }, 130);
  }

  // 90ms Reset-Delay: verhindert Flackern beim Wechsel zwischen den Hälften
  function scheduleReset() {
    clearTimeout(activateTimer);
    resetTimer = setTimeout(() => {
      landing.classList.remove('hover-tech', 'hover-foos');
    }, 90);
  }

  sectionTech.addEventListener('mouseenter', () => setHoverClass('hover-tech'));
  sectionFoos.addEventListener('mouseenter', () => setHoverClass('hover-foos'));
  landing.addEventListener('mouseleave', scheduleReset);

  // Keyboard: focusin setzt Klasse sofort (kein Delay – Nutzer ist schon da)
  sectionTech.addEventListener('focusin', () => {
    clearTimeout(resetTimer);
    clearTimeout(activateTimer);
    landing.classList.remove('hover-tech', 'hover-foos');
    landing.classList.add('hover-tech');
  });

  sectionFoos.addEventListener('focusin', () => {
    clearTimeout(resetTimer);
    clearTimeout(activateTimer);
    landing.classList.remove('hover-tech', 'hover-foos');
    landing.classList.add('hover-foos');
  });

  landing.addEventListener('focusout', (e) => {
    if (!landing.contains(e.relatedTarget)) {
      clearTimeout(activateTimer);
      landing.classList.remove('hover-tech', 'hover-foos');
    }
  });

  // Touch: erster Tap aktiviert, zweiter Tap navigiert
  let touchActive = null;

  sectionTech.addEventListener('touchstart', (e) => {
    if (touchActive !== 'tech') {
      e.preventDefault();
      touchActive = 'tech';
      landing.classList.remove('hover-tech', 'hover-foos');
      landing.classList.add('hover-tech');
    }
  }, { passive: false });

  sectionFoos.addEventListener('touchstart', (e) => {
    if (touchActive !== 'foos') {
      e.preventDefault();
      touchActive = 'foos';
      landing.classList.remove('hover-tech', 'hover-foos');
      landing.classList.add('hover-foos');
    }
  }, { passive: false });

  // Touch außerhalb → Reset
  document.addEventListener('touchstart', (e) => {
    if (!landing.contains(e.target)) {
      touchActive = null;
      landing.classList.remove('hover-tech', 'hover-foos');
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
  initDiagonalLanding();
  initStickyNav();
});
