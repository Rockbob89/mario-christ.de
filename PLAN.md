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
