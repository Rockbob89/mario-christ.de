# DESIGN_CHOICES.md – Technische Referenz & Designentscheidungen

Dokumentiert Entscheidungen, die von CLAUDE.md abweichen oder es ergänzen. Für zukünftige Sessions als Kontext.

---

## Dateistruktur

```
/
├── index.html
├── tech/index.html
├── tischfussball/index.html
├── css/
│   ├── style.css           Design System (Tokens, Reset, Utilities)
│   ├── landing.css         Split-Screen Landing Page
│   ├── coming-soon.css     Tech-Platzhalter
│   └── sponsoring.css      Sponsoring-Seite
├── js/
│   └── main.js             Split-Hover + Sticky Nav (IntersectionObserver)
├── img/                    (leer – Fotos kommen später)
├── robots.txt
├── sitemap.xml
└── .gitignore
```

---

## Design System (finale Wahl)

| Element | Font | Weight |
|---------|------|--------|
| H1, H2 | Plus Jakarta Sans | 700/800 |
| H3 und kleiner | Syne | 600/700 |
| Body | DM Sans | 400/500 |

CLAUDE.md schlug Syne, Outfit, Satoshi o.ä. vor. Entschieden für Plus Jakarta Sans für H1/H2 wegen ruhigerer Buchstabenformen bei 60–80px (Syne hatte unruhige g/a/R bei großen Größen).

**Farben (Abweichungen/Ergänzungen):**
- `coming-soon__label`: `#1D4ED8` statt `var(--tech-accent)` (#2563EB) – Kontrast-Anforderung WCAG AA auf `#E8EAED` (4.28:1 → 5.55:1)
- `img-placeholder`-Text auf hellen Sections: `#4B5563` statt `var(--text-muted)` – rgba-Overlay-Hintergrund der Divs macht `--text-muted` zu hell
- Nav-Links (`rgba(245,245,245,0.55)`) – bewusst nicht erhöht, knapp ≥4.5:1, visuell stimmig

---

## Wichtige Implementierungsregeln

- Kein Text der nach AI klingt
- Keine Preise auf der Sponsoring-Seite
- Kein "Staff Engineer" im sichtbaren Seitentext
- "3." vor Bundesliga nur zusammen mit Aufstiegs-Narrativ
- Div-Platzhalter mit `aria-label` – einfacher durch `<img>` zu ersetzen wenn Fotos da sind

---

## Entscheidungen Landing Page

- **Split-Hover:** 60/40 (nicht 55/45) – aggressiverer Effekt, mit 0.7s ease gebremst
- **Aktivierungs-Delay:** 130ms (JS) + 0.12s CSS transition-delay – verhindert Pixel-Wackler
- **Reset-Delay:** 90ms – kein Flackern beim Wechsel zwischen Hälften
- **Content Reveal:** Ruhezustand `scale(0.97) opacity(0.85)` → Hover `scale(1.0) opacity(1.0)` mit 0.3s Delay
- **Inaktive Seite:** `scale(0.95) opacity(0.7)` – sofort ohne Delay
- **Keyboard-Focus:** `focusin`/`focusout`-Handler setzen `data-active` → Buttons bei vollem Kontrast für Keyboard-Nutzer
- **Name "Mario Christ":** Reiner Text, kein Hintergrund, `letter-spacing: 0.12em`, uppercase. Zwei Spans je 50% Breite – Trennlinie exakt zwischen den Wörtern. Mobile: `position: static`, fließt als eigene Zeile.

---

## Entscheidungen Sponsoring-Seite

- **Sticky Nav:** Text-Labels (nicht Punkte), Dark-Glass `rgba(26,26,46,0.95)` + `backdrop-filter: blur(8px)`, Active State per IntersectionObserver (`rootMargin: -40% 0px -55% 0px`)
- **Section-Layout:** Sections 2–6 `min-height: 100dvh; display:flex; justify-content:center` auf Desktop, `min-height:auto; display:block` auf Mobile
- **Hell/Dunkel-Rhythmus:** Hero=dunkel, Argument=hell, Über mich=dunkel, Szene=hell, Pakete=dunkel, Kontakt=hell
- **Credentials Grid:** 3-Ebenen-Struktur: `value` (groß, rot) → `context` (uppercase, gedimmt) → `label` (klein, gedimmt). Kontext-Zeile explizit ("DTFB National", "ITSF Weltrangliste").
- **Pakete:** Keine Icons/Illustrationen – Text trägt die Pakete
- **Kontakt-Button:** `font-size: 1.125rem; padding: 1rem 2.5rem` – mehr Präsenz als Standard-btn
- **Kontakt Sub-Text:** `text-wrap: balance` für ausgeglichene Umbrüche

---

## Was aus CLAUDE.md bewusst nicht umgesetzt wurde

| Punkt | Entscheidung |
|-------|-------------|
| Icons/Illustrationen für Pakete (optional) | Weggelassen – Text reicht |
| Sticky Nav als "optional" markiert | Umgesetzt, mit Labels statt Punkten |
| `scroll-behavior: smooth` im CSS | Bereits via html-Reset gesetzt |

---

## Lighthouse (Stand Cycle 5, commit 1d45b33)

| Seite | Perf | A11y | Best Practices | SEO |
|-------|------|------|----------------|-----|
| `/` | 100 | 100 | 96* | 100 |
| `/tischfussball/` | 99 | 100 | 96* | 100 |
| `/tech/` | 100 | 100 | 96* | 100 |

*96 wegen lokalem `http://` – auf GitHub Pages mit HTTPS wird das 100.
