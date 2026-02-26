# PLAN.md – mario-christ.de Implementierungsplan

## Status-Übersicht

| Cycle | Beschreibung | Status |
|-------|-------------|--------|
| 1 | Foundation – CSS Design System + Infra | ✅ done |
| 2 | Landing Page (`/index.html`) | ✅ done |
| 3 | Coming Soon (`/tech/index.html`) | ✅ done |
| 4 | Sponsoring-Seite (`/tischfussball/index.html`) | ✅ done |
| 5 | Polish & Accessibility | ⬜ todo |

---

## Cycle 5 – Polish & Accessibility

### Accessibility
- [ ] WCAG AA Kontrastverhältnisse prüfen – kritische Stellen:
  - `rgba(245,245,245,0.55)` Nav-Links auf dunklem Hintergrund
  - `rgba(245,245,245,0.4)` Credentials-Labels
  - `var(--text-muted)` (#6B7280) auf hellem Hintergrund
- [ ] Tab-Reihenfolge auf allen drei Seiten prüfen (Keyboard-only Navigation)
- [ ] Alle `focus-visible`-Styles auf Sichtbarkeit testen

### Performance
- [ ] Lighthouse-Audit auf allen drei Seiten (Ziel: >90 in allen Kategorien)
- [ ] Keine Layout Shifts (CLS = 0 anstreben)
- [ ] Google Fonts `display=swap` bereits gesetzt ✓
- [ ] `loading="lazy"` – wenn echte `<img>`-Tags eingebaut werden (aktuell Div-Platzhalter)

### Bereits erledigt (kein Handlungsbedarf)
- `prefers-reduced-motion` – global in style.css ✓
- `<html lang="de">` – alle Seiten ✓
- Skip-Links – alle Seiten ✓
- Canonical URLs – alle Seiten ✓
- `robots.txt` + `sitemap.xml` ✓
- Open Graph + Twitter Card Tags – alle Seiten ✓
- `color-scheme: light` (kein Dark-Mode-Override) ✓

---

## Nach Cycle 5 – Deployment & Content

### Fotos einbauen
Mario hat 23 Top-Picks + ~35 Ergänzungsbilder. Platzhalter-Divs durch echte `<img>`-Tags ersetzen.
Offene Platzhalter:

| Seite | Element | Beschreibung im HTML |
|-------|---------|----------------------|
| `/index.html` | Tech-Hälfte | Portrait, professionell, büronah, ruhiger Blick |
| `/index.html` | Kicker-Hälfte | Action-Shot, Tisch, Turnier-Atmosphäre, voller Fokus |
| `/tischfussball/` | Hero | Kurbelkraft-Cap Close-up oder Bundesliga-Action |
| `/tischfussball/` | Über mich | Portrait lachend mit Bokeh oder Solo-Action |
| `/tischfussball/` | Die Szene (1) | Turnierhalle von oben – viele Tische, Screens, Bühne |
| `/tischfussball/` | Die Szene (2) | Nahaufnahme Spielsituation, Zuschauer unscharf im Hintergrund |
| `/tischfussball/` | Kontakt | Entspannt, einladend, kein Wettkampf-Modus |

Format: WebP bevorzugt, JPG als Fallback. Alle `<img>` mit `alt`-Text und `loading="lazy"`.

### DNS-Umstellung
- INWX: A-Records auf GitHub Pages IPs setzen
- CNAME `www` → `rockbob89.github.io`
- In GitHub Pages Settings: Custom Domain `mario-christ.de` eintragen
- HTTPS erzwingen (GitHub stellt Let's Encrypt Zertifikat aus)

### Ranking-Automatisierung (optional, später)
- OpenClaw Agent (JW) soll DTFB- und ITSF-Rankings automatisch aktualisieren
- Aktuell hardcoded mit Stand Feb. 2026

---

## Technische Referenz

### Dateistruktur (final)
```
/
├── index.html
├── tech/index.html
├── tischfussball/index.html
├── css/
│   ├── style.css           Design System
│   ├── landing.css         Split-Screen Landing Page
│   ├── coming-soon.css     Tech-Platzhalter
│   └── sponsoring.css      Sponsoring-Seite
├── js/
│   └── main.js             Split-Hover + Sticky Nav (IntersectionObserver)
├── img/                    (leer – Fotos kommen später)
├── robots.txt
└── sitemap.xml
```

### Design System
- **H1/H2:** Plus Jakarta Sans 700/800
- **H3 und kleiner:** Syne 600/700
- **Body:** DM Sans 400/500
- **Akzentfarbe:** `#DC2626` (Rot)
- **Tech-Bg:** `#E8EAED` | **Tech-Accent:** `#2563EB`
- **Sponsoring-Sections 2–6:** `min-height: 100dvh` Desktop, `auto` Mobile

### Wichtige Regeln (aus CLAUDE.md)
- Kein Text der nach AI klingt
- Keine Preise auf der Sponsoring-Seite
- Kein "Staff Engineer" im sichtbaren Seitentext
- "3." vor Bundesliga nur zusammen mit Aufstiegs-Narrativ
- Div-Platzhalter mit `aria-label` – einfacher durch `<img>` zu ersetzen

---

## Designentscheidungen aus der Session (abweichend von / ergänzend zu CLAUDE.md)

### Typografie – finale Wahl
CLAUDE.md schlug Syne, Outfit, Satoshi o.ä. vor. Entschieden:
- **H1/H2:** Plus Jakarta Sans – ruhigere Buchstabenformen bei 60–80px (Syne hatte unruhige g/a/R)
- **H3 und kleiner:** Syne bleibt (Labels, Paket-Titel, Credentials-Werte)
- **Body:** DM Sans (statt Inter/Roboto – zu generisch)

### Landing Page – Interaktion
- Split-Hover: 60/40 (nicht 55/45) – aggressiverer Effekt, aber mit 0.7s ease gebremst
- Aktivierungs-Delay: 130ms (JS) + 0.12s CSS transition-delay – verhindert Pixel-Wackler
- Reset-Delay: 90ms – kein Flackern beim Wechsel zwischen Hälften
- Content Reveal: Ruhezustand scale(0.97) opacity(0.85) → Hover scale(1.0) opacity(1.0) mit 0.3s Delay
- Inaktive Seite: scale(0.95) opacity(0.7) – sofort ohne Delay

### Landing Page – Name "Mario Christ"
- Kein Chip/Badge mit Hintergrundbox (ursprüngliche Implementierung verworfen)
- Reiner Text, kein Hintergrund, `letter-spacing: 0.12em`, uppercase
- Zwei Spans (Mario | Christ), je 50% Breite – Trennlinie läuft exakt zwischen den Wörtern
- Lücke zwischen den Wörtern: 0.3em je Seite = 0.6em gesamt
- Mobile: `position: static`, fließt als eigene Zeile über dem vertikalen Stack

### Sponsoring-Seite – Sticky Nav
- Kurze Text-Labels (nicht Punkte) – Sponsor soll wissen wo er ist
- Dark glass: `rgba(26,26,46,0.95)` + `backdrop-filter: blur(8px)`
- Active State per IntersectionObserver (rootMargin -40% 0px -55% 0px)

### Sponsoring-Seite – Section-Layout
- Sections 2–6: `min-height: 100dvh; display:flex; flex-direction:column; justify-content:center` auf Desktop
- Mobile: `min-height:auto; display:block` – natürlicher Content-Flow
- Hero (Section 1): `min-height: calc(100dvh - 3rem)` via Grid, kein Flex-Override nötig
- Hell/Dunkel-Wechsel: Hero=dunkel, Argument=hell, Über mich=dunkel, Szene=hell, Pakete=dunkel, Kontakt=hell

### Credentials Grid (Section 3)
- 3-Ebenen-Struktur pro Item: `credentials__value` (groß, rot) → `credentials__context` (uppercase, medium) → `credentials__label` (klein, gedimmt)
- Kontext explizit: "DTFB National" und "ITSF Weltrangliste" als eigene Zeile – nicht nur in der Label-Zeile
- "Rankings: Stand Feb. 2026" als Fußnote unter dem Grid

### Pakete (Section 5)
- Keine Icons/Illustrationen (war in CLAUDE.md als optional markiert) – Text trägt die Pakete
- Hover: `border-color: accent; background: rgba(220,38,38,0.05)` – subtiles Rot-Highlight
- Outro mit explizitem `<br>` nach "tickt anders." für kontrollierten Umbruch

### Kontakt (Section 6)
- Button-Größe: `font-size: 1.125rem; padding: 1rem 2.5rem` – mehr Präsenz als Standard-btn
- Mobile: `contact__text` als flex column, `align-items:center; text-align:center`
- Sub-Text gekürzt: "Schreiben Sie mir – oder fordern Sie mich heraus." (ohne "direkt")
- `text-wrap: balance` auf Sub-Text für ausgeglichene Umbrüche

### Was aus CLAUDE.md nicht umgesetzt wurde (bewusst)
- Icons/Illustrationen für Pakete → weggelassen, Text reicht
- Sticky Nav als "optional" markiert → umgesetzt, mit Labels statt Punkten
- `scroll-behavior: smooth` im CSS → bereits via html-Reset gesetzt
