# Landing-Redesign Phase 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die Tech/Kickern-Diagonal-Weiche auf `/` durch eine führende Consulting-Landing ersetzen (AI-Consultant für DSGVO-/EU-AI-Act-konformen KI-Einsatz), mit Incident-Hero, Substanz-Sektionen, Kickern-Brücke und Kontakt — eigenständig live-fähig, unabhängig vom Blog.

**Architecture:** Statisches HTML/CSS/JS, kein Build-Step, GitHub Pages. Shared `css/style.css` (Design-Tokens, Nav, Footer, Fonts) + seiten-spezifisches `css/landing.css`. Hub-Nav per HTML-Duplikation auf `/`, `/impressum/`, `/datenschutz/` (NICHT `/tischfussball/`). Hero-Animation als Progressive Enhancement über vollständigem statischem End-State — `<del>`/`<ins>` tragen die SEO-Wahrheit, JS überlagert nur.

**Tech Stack:** Vanilla HTML/CSS/JS, self-hosted Fonts (woff2), Caveat (Handschrift) neu dazu.

**Referenz-Spec:** `docs/specs/2026-06-18-landing-redesign-design.md`

---

## File Structure

| Datei | Aktion | Verantwortung |
|---|---|---|
| `fonts/caveat-latin.woff2` | Create | Handschrift-Font für Hero-Korrektur |
| `css/style.css` | Modify (additiv) | Caveat `@font-face` + `--font-handwriting` + Hub-Nav-Styles |
| `css/landing.css` | Replace | Hero, Substanz, Kickern-Teaser, Kontakt (alte Diagonal-Logik raus) |
| `index.html` | Replace | Neue Landing-Struktur |
| `js/main.js` | Modify | `initDiagonalLanding` raus, `initHero` rein, `initStickyNav` bleibt |
| `impressum/index.html` | Modify | Hub-Nav einfügen |
| `datenschutz/index.html` | Modify | Hub-Nav einfügen |
| `tech/index.html` | Replace | Redirect → `/` |
| `sitemap.xml` | Modify | `/tech/` entfernen |
| `tischfussball/index.html` | Modify | MC-Badge + Burger in sticky-nav (Task 11) |
| `css/sponsoring.css` | Modify | Burger- + Mobile-Menü-Styles, MC-Badge-Dark-Override (Task 11) |

**Nicht angefasst:** `css/coming-soon.css` (bleibt liegen, wird von tech-redirect nicht mehr referenziert). `/tischfussball/` wird **nur minimal** angefasst (MC-Badge + Burger, Task 11) — Inhalt/Pitch/Design der Seite bleibt unverändert.

---

## Task 1: Caveat-Font beschaffen

**Files:**
- Create: `fonts/caveat-latin.woff2`

- [ ] **Step 1: Font herunterladen (primär: google-webfonts-helper)**

```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
curl -sL 'https://gwfh.mranftl.com/api/fonts/caveat?download=zip&subsets=latin&variants=600&formats=woff2' -o /tmp/caveat.zip
mkdir -p /tmp/caveat && unzip -o /tmp/caveat.zip -d /tmp/caveat
cp /tmp/caveat/*600*.woff2 fonts/caveat-latin.woff2 2>/dev/null || cp /tmp/caveat/*.woff2 fonts/caveat-latin.woff2
```

- [ ] **Step 2: Fallback falls gwfh nicht erreichbar (Google Fonts CSS2)**

Nur ausführen wenn Step 1 keine Datei erzeugt hat:

```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
URL=$(curl -sL 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap' -H "User-Agent: $UA" \
  | grep -B2 'U+0000-00FF' | grep -oE 'https://[^)]+\.woff2' | head -1)
curl -sL "$URL" -o fonts/caveat-latin.woff2
```

- [ ] **Step 3: Verifizieren dass die Datei valide ist**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
file fonts/caveat-latin.woff2 && ls -l fonts/caveat-latin.woff2
```
Expected: `Web Open Font Format (Version 2)` und Größe > 5 KB.

- [ ] **Step 4: Commit**

```bash
git add fonts/caveat-latin.woff2
git commit -m "feat(fonts): caveat (handschrift) für hero-korrektur"
```

---

## Task 2: Caveat `@font-face` + Token in `style.css`

**Files:**
- Modify: `css/style.css` (nach dem Syne `@font-face`-Block, ca. Zeile 77; und im `:root`-Typography-Block ca. Zeile 105)

- [ ] **Step 1: `@font-face` für Caveat hinzufügen**

Direkt nach dem letzten Syne-`@font-face`-Block (vor `/* ── Design Tokens ── */`) einfügen:

```css
/* Caveat – Handschrift 600 (nur Hero-Korrektur) */
@font-face {
  font-family: 'Caveat';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('../fonts/caveat-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

- [ ] **Step 2: CSS-Variable `--font-handwriting` ergänzen**

Im `:root`-Block, direkt nach `--font-body: 'DM Sans', sans-serif;` (ca. Zeile 105):

```css
  --font-handwriting: 'Caveat', cursive;
```

- [ ] **Step 3: Verifizieren**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -c "font-family: 'Caveat'" css/style.css && grep -c 'font-handwriting' css/style.css
```
Expected: jeweils `1`.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat(css): caveat @font-face + --font-handwriting token"
```

---

## Task 3: Hub-Nav- + MC-Badge-Styles in `style.css`

**Files:**
- Modify: `css/style.css` (am Ende, nach `.site-footer`-Block)

- [ ] **Step 1: MC-Badge + Nav-Styles ans Ende von `style.css` anhängen**

```css
/* ── MC-Badge (Home-Anker, alle Seiten – Text+CSS, später SVG) ── */
.mc-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: var(--text-primary);
  color: var(--page-bg);
  font-family: var(--font-headline);
  font-weight: 800;
  font-size: var(--text-base);
  letter-spacing: 0.01em;
  line-height: 1;
  transition: transform var(--transition-base), background-color var(--transition-base);
}

.mc-badge:hover {
  transform: scale(1.06);
}

.mc-badge:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ── Site Nav (Hub-Seiten: /, /impressum, /datenschutz) ──── */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(250, 250, 250, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.site-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-3);
}

.site-nav__links {
  display: flex;
  gap: clamp(var(--space-4), 4vw, var(--space-8));
}

.site-nav__links a {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--transition-base);
}

.site-nav__links a:hover {
  color: var(--text-primary);
}

.site-nav__links a[aria-current="page"] {
  color: var(--text-primary);
}

.site-nav__links a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

- [ ] **Step 2: Verifizieren**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -c '.site-nav' css/style.css && grep -c '.mc-badge' css/style.css
```
Expected: `.site-nav` ≥ 6, `.mc-badge` ≥ 3.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat(css): hub-nav + mc-badge styles (shared)"
```

---

## Task 4: `landing.css` neu schreiben (Hero + Substanz + Teaser + Kontakt)

**Files:**
- Replace: `css/landing.css`

- [ ] **Step 1: `landing.css` komplett ersetzen**

Gesamter Datei-Inhalt (überschreibt die alte Diagonal-Logik):

```css
/* ============================================================
   Landing Page – Consulting (Phase 1)
   ============================================================ */

/* ── Hero ────────────────────────────────────────────────── */
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-8);
  padding-block: var(--section-padding);
}

.hero__bulletin {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: clamp(var(--space-6), 5vw, var(--space-12));
  background-color: #FFFFFF;
  max-width: 60rem;
}

.hero__label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: var(--space-4);
}

.hero__sentence {
  font-family: var(--font-h1);
  font-weight: 800;
  font-size: clamp(var(--text-3xl), 5vw, var(--text-6xl));
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  color: var(--text-primary);
  max-width: none;
}

/* del/ins: statischer End-State (no-JS = SEO-Wahrheit) */
.hero__strike {
  position: relative;
  text-decoration: line-through;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 3px;
  color: var(--text-muted);
}

.hero__correction {
  font-family: var(--font-handwriting);
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  /* leicht überhängend für Authentizität */
  display: inline-block;
  transform: rotate(-2deg);
  margin-inline: 0.1em;
}

.hero__sub {
  font-family: var(--font-body);
  font-size: clamp(var(--text-base), 2vw, var(--text-xl));
  color: var(--text-muted);
  margin-top: var(--space-6);
  max-width: 50ch;
}

.hero__reassure {
  font-family: var(--font-body);
  font-size: clamp(var(--text-lg), 2.5vw, var(--text-2xl));
  color: var(--text-primary);
  max-width: 40ch;
  padding-left: clamp(var(--space-2), 2vw, var(--space-6));
}

/* ── Hero Animation (nur wenn html.anim gesetzt) ─────────── */
/* Pre-Animation-Zustand: ab erstem Paint, kein Flash, kein Layout-Shift */
html.anim .hero__strike {
  text-decoration: none;          /* native Linie aus, Pseudo übernimmt */
  color: var(--text-primary);
}
html.anim .hero__strike::after {
  content: '';
  position: absolute;
  left: 0;
  top: 55%;
  width: 100%;
  height: 3px;
  background-color: var(--accent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.35s ease;
}
html.anim .hero__correction {
  opacity: 0;                     /* Breite bleibt reserviert → kein Shift */
  transition: opacity 0.45s ease;
}
html.anim .hero__reassure {
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* Sequenz-States (JS toggelt am .hero) */
html.anim .hero.is-struck .hero__strike::after { transform: scaleX(1); }
html.anim .hero.is-struck .hero__strike        { color: var(--text-muted); transition: color 0.35s ease; }
html.anim .hero.is-corrected .hero__correction { opacity: 1; }
html.anim .hero.is-settled .hero__reassure     { opacity: 1; }

/* ── Substanz (Was / Warum / Wie) ────────────────────────── */
.substance__block + .substance__block {
  border-top: 1px solid var(--border);
}

.substance__inner {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .substance__inner {
    grid-template-columns: minmax(0, 18rem) minmax(0, 1fr);
    gap: var(--space-12);
    align-items: start;
  }
}

.substance__title {
  font-size: clamp(var(--text-2xl), 3vw, var(--text-4xl));
}

.substance__body p + p {
  margin-top: var(--space-4);
}

/* ── Kickern-Teaser (dunkel) ─────────────────────────────── */
.foos-teaser__inner {
  max-width: 50rem;
}

.foos-teaser__title {
  margin-bottom: var(--space-4);
}

.foos-teaser__body {
  margin-bottom: var(--space-8);
}

/* ── Kontakt ─────────────────────────────────────────────── */
.contact__inner {
  max-width: 40rem;
}

.contact__title {
  margin-bottom: var(--space-4);
}

.contact__body {
  margin-bottom: var(--space-8);
}

.contact__mail {
  font-size: clamp(var(--text-lg), 2vw, var(--text-2xl));
}

/* ── Reduced Motion: Animation-Layer komplett neutralisieren ─ */
@media (prefers-reduced-motion: reduce) {
  html.anim .hero__strike { text-decoration: line-through; text-decoration-color: var(--accent); text-decoration-thickness: 3px; color: var(--text-muted); }
  html.anim .hero__strike::after { display: none; }
  html.anim .hero__correction,
  html.anim .hero__reassure { opacity: 1; transition: none; }
}
```

- [ ] **Step 2: Verifizieren dass alte Diagonal-Klassen weg sind**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -c 'clip-path\|\.bar__\|\.label--' css/landing.css
```
Expected: `0`.

- [ ] **Step 3: Commit**

```bash
git add css/landing.css
git commit -m "feat(css): landing.css neu – hero/substanz/teaser/kontakt"
```

---

## Task 5: `index.html` neu schreiben

**Files:**
- Replace: `index.html`

- [ ] **Step 1: `index.html` komplett ersetzen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mario Christ – AI-Consulting für DSGVO- und EU-AI-Act-konformen Einsatz</title>
  <meta name="description" content="AI-Consulting für den Mittelstand: KI rechtssicher einsetzen – DSGVO- und EU-AI-Act-konform, Sovereign-first, On-Premise. Beratung und Umsetzung aus DevOps-Hand." />
  <link rel="canonical" href="https://mario-christ.de/" />

  <!-- Open Graph -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="https://mario-christ.de/" />
  <meta property="og:title"       content="Mario Christ – AI-Consulting für DSGVO- und EU-AI-Act-konformen Einsatz" />
  <meta property="og:description" content="KI rechtssicher einsetzen – DSGVO- und EU-AI-Act-konform, Sovereign-first, On-Premise. Beratung und Umsetzung aus DevOps-Hand." />
  <meta property="og:image"       content="https://mario-christ.de/img/og-default.jpg" />
  <meta property="og:locale"      content="de_DE" />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="Mario Christ – AI-Consulting für DSGVO- und EU-AI-Act-konformen Einsatz" />
  <meta name="twitter:description" content="KI rechtssicher einsetzen – DSGVO- und EU-AI-Act-konform, Sovereign-first, On-Premise." />
  <meta name="twitter:image"       content="https://mario-christ.de/img/og-default.jpg" />

  <link rel="preload" href="/fonts/caveat-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/css/landing.css" />

  <!-- Früh: js + anim-Flag setzen, bevor gepaintet wird (kein Flash, kein Layout-Shift) -->
  <script>
    (function () {
      var d = document.documentElement;
      d.classList.add('js');
      try {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          d.classList.add('anim');
        }
      } catch (e) {}
    })();
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Zum Inhalt springen</a>

  <!-- NAV: SINGLE SOURCE (/index.html) — bei Änderung in /impressum/, /datenschutz/ syncen (NICHT /tischfussball/) -->
  <!-- MC-BADGE: später <img src="/img/mc-logo.svg" alt="Mario Christ" width="40" height="40"> statt Text "MC" -->
  <header class="site-nav">
    <div class="site-nav__inner container">
      <a class="mc-badge" href="/" aria-label="Startseite">MC</a>
      <nav class="site-nav__links" aria-label="Hauptnavigation">
        <a href="/" aria-current="page">Home</a>
        <a href="/tischfussball/">Foos</a>
        <a href="/#kontakt">Kontakt</a>
      </nav>
    </div>
  </header>

  <main id="main">

    <!-- ── Hero ──────────────────────────────────────────── -->
    <section class="hero" id="hero" aria-label="Sicherheitsvorfall">
      <div class="container">
        <div class="hero__bulletin">
          <p class="hero__label">Sicherheitsvorfall:</p>
          <p class="hero__sentence">
            <del class="hero__strike">Unbekannte Angreifer</del>
            <ins class="hero__correction">Legal &amp; HR</ins>
            laden sensible Vertragsdaten auf ausländische Server.
          </p>
          <p class="hero__sub">
            Wissen Sie, was ChatGPT, Claude und Gemini mit Ihren Uploads machen?
          </p>
        </div>
        <p class="hero__reassure">
          Kein Grund zur Panik. Lassen Sie uns doch mal schauen, was heute möglich ist.
        </p>
      </div>
    </section>

    <!-- ── Substanz: Was / Warum / Wie ───────────────────── -->
    <section class="section substance__block" aria-label="Was ich mache">
      <div class="container substance__inner">
        <div>
          <span class="accent-line" aria-hidden="true"></span>
          <h2 class="substance__title">Was ich mache</h2>
        </div>
        <div class="substance__body">
          <p>Ich helfe mittelständischen Unternehmen, KI einzusetzen, ohne dabei mit der DSGVO oder dem EU AI Act zu kollidieren. Das beginnt bei der Beratung: Wo bringt KI Ihnen wirklich etwas, welche Werkzeuge sind rechtlich sauber, was muss dokumentiert werden.</p>
          <p>Wenn ein Projekt zur Umsetzung kommt, baue ich auch mit – On-Premise-Setups, lokale Sprachmodelle, die nötige Infrastruktur. Was ich nicht mache: 24/7-Support oder Managed Services. Dafür bin ich der Falsche.</p>
        </div>
      </div>
    </section>

    <section class="section substance__block" aria-label="Warum ich">
      <div class="container substance__inner">
        <div>
          <span class="accent-line" aria-hidden="true"></span>
          <h2 class="substance__title">Warum ich</h2>
        </div>
        <div class="substance__body">
          <p>Ich komme aus dem DevOps. Ich rede nicht über Infrastruktur, ich baue sie – jeden Tag. Und ich arbeite täglich mit lokalen Sprachmodellen auf eigener Hardware, von der Quantisierung bis zum Deployment.</p>
          <p>Ich kenne die Stolperstellen, weil ich selbst über sie gefallen bin. Wenn KI für Ihr Problem das falsche Werkzeug ist, sage ich Ihnen das – bevor Sie Geld ausgeben.</p>
        </div>
      </div>
    </section>

    <section class="section substance__block" aria-label="Wie ich arbeite">
      <div class="container substance__inner">
        <div>
          <span class="accent-line" aria-hidden="true"></span>
          <h2 class="substance__title">Wie ich arbeite</h2>
        </div>
        <div class="substance__body">
          <p><strong>Sovereign first.</strong> EU-Hosting oder On-Premise sind der Standard, US-Cloud nur, wenn es einen guten Grund gibt – und den nenne ich Ihnen.</p>
          <p><strong>Pragmatismus vor Hype.</strong> Die Frage ist nicht, ob wir einen KI-Agenten bauen können, sondern ob Sie einen brauchen. Klare Scopes, feste Absprachen, keine versteckten Kosten.</p>
        </div>
      </div>
    </section>

    <!-- ── Kickern-Teaser ────────────────────────────────── -->
    <section class="section section--dark foos-teaser" aria-label="Tischfußball">
      <div class="container foos-teaser__inner">
        <span class="accent-line" aria-hidden="true"></span>
        <h2 class="foos-teaser__title">Nebenbei spiele ich in der Bundesliga.</h2>
        <p class="foos-teaser__body">Tischfußball, um genau zu sein – seit über zehn Saisons, aktuell mit dem HSV Kurbelkraft. Falls Sie aus der Tech-Branche kommen und über Sponsoring, Teambuilding oder Recruiting nachdenken: Das ist eine eigene Geschichte.</p>
        <a class="btn btn--kicker" href="/tischfussball/">Zum Sponsoring →</a>
      </div>
    </section>

    <!-- ── Kontakt ───────────────────────────────────────── -->
    <section class="section contact" id="kontakt" aria-label="Kontakt">
      <div class="container contact__inner">
        <span class="accent-line" aria-hidden="true"></span>
        <h2 class="contact__title">Lassen Sie uns reden.</h2>
        <p class="contact__body">Ein Erstgespräch kostet nichts und verpflichtet zu nichts. Schreiben Sie mir, worum es geht – ich melde mich.</p>
        <a class="btn btn--kicker contact__mail" href="mailto:hallo@mario-christ.de">hallo@mario-christ.de</a>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <a class="site-footer__home" href="/">← mario-christ.de</a>
      <nav class="site-footer__legal" aria-label="Rechtliches">
        <a href="/impressum/">Impressum</a>
        <a href="/datenschutz/">Datenschutz</a>
      </nav>
    </div>
  </footer>

  <script src="/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verifizieren dass End-State-Text vollständig im HTML steht**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -q 'Unbekannte Angreifer' index.html && grep -q 'Legal &amp; HR' index.html && grep -q 'laden sensible Vertragsdaten' index.html && echo "END-STATE OK"
grep -q 'landing' index.html && echo "WARN: alte landing-klasse noch da" || echo "DIAGONAL WEG OK"
```
Expected: `END-STATE OK` und `DIAGONAL WEG OK`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(landing): consulting-landing mit incident-hero, substanz, foos-teaser, kontakt"
```

---

## Task 6: `main.js` umbauen (Diagonal raus, Hero-Animation rein)

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: `initDiagonalLanding`-Funktion komplett entfernen**

Die gesamte Funktion `function initDiagonalLanding() { ... }` (Zeilen 8–121, inkl. Kommentar-Header `/* ── Landing Page: Diagonal ── */`) löschen.

- [ ] **Step 2: `initHero`-Funktion einfügen**

An die Stelle der gelöschten Funktion (vor `/* ── Sponsoring Page: Sticky Nav ── */`) einfügen:

```js
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
```

- [ ] **Step 3: Init-Block anpassen**

Den `DOMContentLoaded`-Handler am Dateiende ändern von:

```js
document.addEventListener('DOMContentLoaded', () => {
  initDiagonalLanding();
  initStickyNav();
});
```

zu:

```js
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initStickyNav();
});
```

- [ ] **Step 4: Verifizieren**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -c 'initDiagonalLanding' js/main.js   # erwartet 0
grep -c 'initHero' js/main.js              # erwartet 2 (Definition + Aufruf)
grep -c 'initStickyNav' js/main.js         # erwartet 2 (bleibt erhalten)
node --check js/main.js && echo "SYNTAX OK"
```
Expected: `0`, `2`, `2`, `SYNTAX OK`.

- [ ] **Step 5: Commit**

```bash
git add js/main.js
git commit -m "feat(js): hero-incident-animation, diagonal-logik entfernt"
```

---

## Task 7: Hub-Nav in `impressum` + `datenschutz` einfügen

**Files:**
- Modify: `impressum/index.html`
- Modify: `datenschutz/index.html`

- [ ] **Step 1: Nav in `impressum/index.html` einfügen**

Direkt nach `<a class="skip-link" href="#main">Zum Inhalt springen</a>` (vor `<main ...>`) einfügen:

```html

  <!-- NAV: SYNC mit Master /index.html (NICHT /tischfussball/) -->
  <!-- MC-BADGE: später <img src="/img/mc-logo.svg" alt="Mario Christ" width="40" height="40"> statt Text "MC" -->
  <header class="site-nav">
    <div class="site-nav__inner container">
      <a class="mc-badge" href="/" aria-label="Startseite">MC</a>
      <nav class="site-nav__links" aria-label="Hauptnavigation">
        <a href="/">Home</a>
        <a href="/tischfussball/">Foos</a>
        <a href="/#kontakt">Kontakt</a>
      </nav>
    </div>
  </header>
```

(Kein `aria-current` – Impressum ist kein Nav-Ziel.)

- [ ] **Step 2: Identische Nav in `datenschutz/index.html` einfügen**

An gleicher Stelle (nach skip-link, vor `<main>`) den exakt gleichen Block wie in Step 1 einfügen.

- [ ] **Step 3: Verifizieren dass beide Navs identisch sind**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
for f in impressum/index.html datenschutz/index.html; do
  echo "$f site-nav: $(grep -c 'site-nav__inner' $f)"
done
# Sicherstellen dass tischfussball KEINE hub-nav (site-nav) bekommen hat
echo "tischfussball site-nav: $(grep -c 'site-nav__inner' tischfussball/index.html)"
```
Expected: `impressum ... 1`, `datenschutz ... 1`, und `tischfussball site-nav: 0` (tischfussball nutzt `sticky-nav`, nicht `site-nav`).

- [ ] **Step 4: Commit**

```bash
git add impressum/index.html datenschutz/index.html
git commit -m "feat(nav): hub-nav auf impressum + datenschutz"
```

---

## Task 8: `/tech/` zu Redirect umbauen

**Files:**
- Replace: `tech/index.html`

- [ ] **Step 1: `tech/index.html` komplett ersetzen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weiterleitung – Mario Christ</title>
  <meta name="robots" content="noindex" />
  <link rel="canonical" href="https://mario-christ.de/" />
  <meta http-equiv="refresh" content="0; url=/" />
  <script>location.replace('/');</script>
</head>
<body>
  <p>Diese Seite ist umgezogen. <a href="/">Weiter zu mario-christ.de</a></p>
</body>
</html>
```

- [ ] **Step 2: Verifizieren**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -q "location.replace('/')" tech/index.html && grep -q 'noindex' tech/index.html && grep -q 'refresh' tech/index.html && echo "REDIRECT OK"
```
Expected: `REDIRECT OK`.

- [ ] **Step 3: Commit**

```bash
git add tech/index.html
git commit -m "feat(tech): redirect auf / (js + meta-refresh fallback, noindex)"
```

---

## Task 9: `sitemap.xml` aktualisieren

**Files:**
- Modify: `sitemap.xml`

- [ ] **Step 1: `/tech/`-Eintrag entfernen**

Den Block löschen:
```xml
  <url>
    <loc>https://mario-christ.de/tech/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
```

- [ ] **Step 2: Verifizieren**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -c '/tech/' sitemap.xml   # erwartet 0
grep -c '<loc>' sitemap.xml    # erwartet 4
xmllint --noout sitemap.xml 2>/dev/null && echo "XML VALID" || echo "xmllint nicht verfügbar – manuell prüfen"
```
Expected: `0`, `4`, und `XML VALID` (falls xmllint vorhanden).

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml
git commit -m "chore(seo): /tech aus sitemap entfernt"
```

---

## Task 10: Integrations-Verifikation (lokal im Browser)

**Files:** keine (reine Prüfung)

- [ ] **Step 1: Lokalen Server starten**

```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
python3 -m http.server 8765 &
echo "→ http://localhost:8765/"
```

- [ ] **Step 2: Hero-Animation manuell prüfen**

Öffne `http://localhost:8765/` im Browser. Erwartetes Verhalten:
1. Zuerst lesbar: „Unbekannte Angreifer laden sensible Vertragsdaten auf ausländische Server." (Korrektur unsichtbar, beruhigende Zeile unsichtbar).
2. Nach ~1,8 s: rote Linie wischt über „Unbekannte Angreifer".
3. Danach: „Legal & HR" (Handschrift, rot) faded ein.
4. Danach: beruhigende Zeile faded ein.
5. **Kein Layout-Shift** während der gesamten Sequenz (Satz springt nicht).

- [ ] **Step 3: No-JS-End-State prüfen**

Browser-DevTools → JavaScript deaktivieren → Reload. Erwartet: Satz steht sofort vollständig da — „Unbekannte Angreifer" durchgestrichen (rot), „Legal & HR" in Handschrift, Sub-Zeile + beruhigende Zeile sichtbar. Keine leeren Lücken.

- [ ] **Step 4: Reduced-Motion prüfen**

DevTools → Rendering → „Emulate prefers-reduced-motion: reduce" → Reload. Erwartet: sofortiger End-State, keine Bewegung.

- [ ] **Step 5: Nav-Konsistenz + Links prüfen**

- `/`, `/impressum/`, `/datenschutz/` zeigen identische Hub-Nav (MC-Badge links, Home / Foos / Kontakt rechts).
- `/tischfussball/` zeigt **keine** Hub-Nav, nur seine eigene sticky-nav (mit MC-Badge + Burger).
- MC-Badge auf **allen vier** Seiten oben links, Klick → `/`.
- „Foos" → `/tischfussball/`, „Kontakt" → scrollt zu `#kontakt`.
- `http://localhost:8765/tech/` leitet sofort auf `/` weiter.
- mailto-Button zeigt `hallo@mario-christ.de`.

- [ ] **Step 6: Lighthouse (Ziel > 90)**

```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
npx --yes lighthouse http://localhost:8765/ --quiet --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-landing.json 2>/dev/null
node -e "const r=require('/tmp/lh-landing.json');for(const k in r.categories)console.log(k, Math.round(r.categories[k].score*100))"
```
Expected: alle vier Kategorien ≥ 90. Falls Performance < 90 wegen Font: prüfen ob `preload` für Caveat greift.

- [ ] **Step 7: Server stoppen**

```bash
kill %1 2>/dev/null || pkill -f 'http.server 8765'
```

- [ ] **Step 8: Abschluss-Commit (falls Verifikation Fixes nötig machte)**

Nur falls in Step 2–6 etwas korrigiert wurde:
```bash
git add -A
git commit -m "fix(landing): verifikations-feedback eingearbeitet"
```

---

## Task 11: `/tischfussball/` — MC-Badge + Burger-Menü (Mobile)

**Files:**
- Modify: `tischfussball/index.html` (sticky-nav, ca. Zeile 31–40; init via bestehendes `/js/main.js`)
- Modify: `css/sponsoring.css` (sticky-nav-Block, ca. Zeile 5–53; Mobile-Block ca. Zeile 506)
- Modify: `js/main.js` (neue Funktion + Init-Aufruf)

**Hinweis:** Dies ist der einzige Eingriff in die Sponsoring-Seite, vom User explizit gewünscht. Inhalt/Pitch/Sektionen bleiben unverändert — nur die Nav-Leiste wird umgebaut.

- [ ] **Step 1: sticky-nav-Markup in `tischfussball/index.html` umbauen**

Den bestehenden Block ersetzen:

```html
  <!-- ── Sticky Anker-Navigation ───────────────────────── -->
  <nav class="sticky-nav" aria-label="Seitennavigation">
    <ul class="sticky-nav__list">
      <li><a class="sticky-nav__link" href="#argument">Das Argument</a></li>
      <li><a class="sticky-nav__link" href="#ueber-mich">Über mich</a></li>
      <li><a class="sticky-nav__link" href="#szene">Die Szene</a></li>
      <li><a class="sticky-nav__link" href="#pakete">Pakete</a></li>
      <li><a class="sticky-nav__link" href="#kontakt">Kontakt</a></li>
    </ul>
  </nav>
```

durch:

```html
  <!-- ── Sticky Anker-Navigation ───────────────────────── -->
  <!-- MC-BADGE: später <img src="/img/mc-logo.svg" alt="Mario Christ" width="40" height="40"> statt Text "MC" -->
  <nav class="sticky-nav" aria-label="Seitennavigation">
    <div class="sticky-nav__inner">
      <a class="mc-badge" href="/" aria-label="Startseite">MC</a>
      <button class="sticky-nav__burger" type="button" aria-label="Menü öffnen"
              aria-expanded="false" aria-controls="foos-menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="sticky-nav__list" id="foos-menu">
        <li><a class="sticky-nav__link" href="#argument">Das Argument</a></li>
        <li><a class="sticky-nav__link" href="#ueber-mich">Über mich</a></li>
        <li><a class="sticky-nav__link" href="#szene">Die Szene</a></li>
        <li><a class="sticky-nav__link" href="#pakete">Pakete</a></li>
        <li><a class="sticky-nav__link" href="#kontakt">Kontakt</a></li>
      </ul>
    </div>
  </nav>
```

- [ ] **Step 2: sticky-nav-Layout in `css/sponsoring.css` anpassen**

Den `.sticky-nav__list`-Block (ca. Zeile 18–27) ersetzen:

```css
.sticky-nav__list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  max-width: var(--max-width);
  margin-inline: auto;
  padding: var(--space-3) clamp(var(--space-4), 5vw, var(--space-12));
  flex-wrap: wrap;
}
```

durch:

```css
.sticky-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  max-width: var(--max-width);
  margin-inline: auto;
  padding: var(--space-3) clamp(var(--space-4), 5vw, var(--space-12));
}

.sticky-nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

/* MC-Badge: helle Variante auf dunklem Nav-Grund */
.sticky-nav .mc-badge {
  background-color: var(--text-on-dark);
  color: var(--page-bg-dark);
}

/* Burger: Desktop versteckt */
.sticky-nav__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.sticky-nav__burger span {
  display: block;
  width: 22px;
  height: 2px;
  margin-inline: auto;
  background-color: var(--text-on-dark);
  border-radius: 2px;
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.sticky-nav__burger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Burger offen: X-Animation */
.sticky-nav--open .sticky-nav__burger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.sticky-nav--open .sticky-nav__burger span:nth-child(2) { opacity: 0; }
.sticky-nav--open .sticky-nav__burger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

- [ ] **Step 3: Mobile-Verhalten in `css/sponsoring.css` ergänzen**

Im bestehenden `@media (max-width: 767px)`-Block den vorhandenen `.sticky-nav__list`-Override (ca. Zeile 506–508) ersetzen:

```css
  .sticky-nav__list {
    gap: var(--space-4);
  }
```

durch:

```css
  .sticky-nav__burger {
    display: flex;
  }

  .sticky-nav__list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: var(--space-2) clamp(var(--space-4), 5vw, var(--space-12)) var(--space-4);
    background-color: rgba(26, 26, 46, 0.98);
    border-bottom: 1px solid var(--border-light);
  }

  .sticky-nav--open .sticky-nav__list {
    display: flex;
  }

  .sticky-nav__list .sticky-nav__link {
    display: block;
    padding-block: var(--space-3);
    font-size: var(--text-base);
  }
```

- [ ] **Step 4: Burger-JS in `js/main.js` ergänzen**

Vor dem `/* ── Init ── */`-Block diese Funktion einfügen:

```js
/* ── Sponsoring Page: Mobile Burger ─────────────────────── */
function initFoosBurger() {
  const nav    = document.querySelector('.sticky-nav');
  if (!nav) return;
  const burger = nav.querySelector('.sticky-nav__burger');
  const menu   = nav.querySelector('.sticky-nav__list');
  if (!burger || !menu) return;

  function setOpen(open) {
    nav.classList.toggle('sticky-nav--open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }

  burger.addEventListener('click', () => {
    setOpen(!nav.classList.contains('sticky-nav--open'));
  });

  // Schließen bei Link-Klick (Anker-Navigation)
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.sticky-nav__link')) setOpen(false);
  });

  // Schließen bei Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}
```

- [ ] **Step 5: Init-Block in `js/main.js` erweitern**

Den `DOMContentLoaded`-Handler ändern von:

```js
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initStickyNav();
});
```

zu:

```js
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initStickyNav();
  initFoosBurger();
});
```

- [ ] **Step 6: Verifizieren**

Run:
```bash
cd /home/sergio/projects/sponsoring/mario-christ.de
grep -c 'sticky-nav__burger' tischfussball/index.html   # erwartet 1
grep -c 'mc-badge' tischfussball/index.html              # erwartet 1
grep -c 'sticky-nav__inner' css/sponsoring.css           # erwartet ≥ 1
grep -c 'initFoosBurger' js/main.js                      # erwartet 2 (Def + Aufruf)
node --check js/main.js && echo "SYNTAX OK"
```
Expected: `1`, `1`, `≥1`, `2`, `SYNTAX OK`.

- [ ] **Step 7: Burger manuell prüfen (lokaler Server aus Task 10)**

`http://localhost:8765/tischfussball/` bei Mobile-Viewport (DevTools ≤767px):
- Burger sichtbar, Link-Liste versteckt.
- Klick → Menü klappt auf, Burger wird zu X.
- Link-Klick → scrollt zur Section, Menü schließt.
- Escape → Menü schließt.
- MC-Badge oben links (hell auf dunkel), Klick → `/`.
- Desktop-Viewport (≥768px): Burger weg, Link-Liste sichtbar, MC-Badge links.

- [ ] **Step 8: Commit**

```bash
git add tischfussball/index.html css/sponsoring.css js/main.js
git commit -m "feat(foos): mc-badge + mobile burger-menü in sticky-nav"
```

---

## Offene Punkte für Marios Review (kein Code)

- **`hallo@mario-christ.de`** als Alias auf Marios Hauptadresse einrichten — Voraussetzung für Go-Live (Mario erledigt das).
- **KI vs. AI in Title/Meta:** Plan nutzt „AI-Consulting" (laut Spec) im Title, „KI" im Fließtext (DACH-SEO). Bewusste Mischung — falls einheitlich gewünscht, eine Zeile Änderung.
- **`og:image` (`/img/og-default.jpg`) fehlt** — Datei existiert nicht (verifiziert). Das ist das Vorschaubild beim Teilen des Links (LinkedIn/Slack/WhatsApp). Solange es fehlt, zeigt das Preview eine leere/kaputte Kachel. Format: 1200×630 px JPG/PNG. Lösung separat (siehe Chat) — nicht Teil dieses Plans.
- **MC-SVG-Monogramm:** fester Pfad `/img/mc-logo.svg`. Sobald Mario es liefert, in den vier Nav-Blöcken (`index.html`, `impressum`, `datenschutz`, `tischfussball`) den Text `MC` im `<a class="mc-badge">` durch `<img src="/img/mc-logo.svg" alt="Mario Christ" width="40" height="40">` ersetzen. Klasse + restliches Styling bleiben.

---

## Self-Review-Ergebnis

- **Spec-Coverage:** Hero (Task 4/5/6), Rahmen (Task 4 `.hero__bulletin`), beruhigende Zeile (Task 4/5/6), Substanz Was/Warum/Wie (Task 5), Kickern-Teaser dunkel (Task 5), Kontakt (Task 5), Nav nur auf Hub-Seiten (Task 3/5/7), MC-Badge alle Seiten (Task 3/5/7/11), Burger auf Foos (Task 11), `/tech`-Redirect (Task 8), sitemap (Task 9), Caveat (Task 1/2), reduced-motion + no-JS (Task 4/10), SEO/Meta (Task 5). ✓
- **MC-Badge-Konsistenz:** Klasse `.mc-badge` in style.css (Task 3), Markup identisch in index/impressum/datenschutz (Task 3/5/7) + tischfussball-Dark-Variante (Task 11). SVG-Swap-Kommentar in allen vier Nav-Blöcken. ✓
- **Burger:** Klassen `sticky-nav__inner`/`__burger`/`--open` konsistent in sponsoring.css (Task 11 Step 2/3) und main.js `initFoosBurger` (Task 11 Step 4). `initStickyNav` (IntersectionObserver für aktive Links) bleibt unberührt. ✓
- **IntersectionObserver-Abweichung:** Spec nennt IO, damit der End-State beim Zurück-Scrollen persistiert. Dieser Plan erreicht das Ziel by construction (State-Klassen werden nur gesetzt, nie entfernt; ohne JS/anim steht der native End-State). Der Hero belegt ohnehin den ersten Viewport, daher ist IO unnötige Komplexität — bewusst weggelassen (YAGNI), Spec-Intent erfüllt.
- **Layout-Shift:** `<ins>` nutzt `opacity` statt `display:none`, Breite immer reserviert. ✓
- **Kein Flash:** Inline-Script im `<head>` setzt `html.anim` vor erstem Paint. ✓
- **Placeholder-Scan:** Keine TBD/TODO; alle Texte final (Sie-Form, kein AI-Slop). ✓
- **Konsistenz:** Klassennamen `is-struck`/`is-corrected`/`is-settled` identisch in landing.css (Task 4) und main.js (Task 6). `html.anim` identisch in index.html-Inline-Script (Task 5) und CSS (Task 4) und JS-Guard (Task 6). ✓
