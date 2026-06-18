# Spec: Landing-Redesign — Phase 1

**Status:** Draft zur User-Review
**Datum:** 2026-06-18
**Scope:** Phase 1 (Landing). Phase 2 (Blog/Eleventy) und Phase 3 (Blog-Link) sind separate Specs.

---

## Ziel

Die aktuelle Tech/Kickern-Weiche auf `/` wird durch eine **führende Landing** ersetzt, die Mario als AI-Consultant für DSGVO- und EU-AI-Act-konformen AI-Einsatz im DACH-Mittelstand positioniert. Die Landing muss eigenständig live-fähig sein — unabhängig von Blog und ohne Pflicht zur sofortigen Phase-2-Umsetzung.

## Architektur

**Hub + Unterseiten** (kein One-Pager):

| Pfad | Rolle | Status |
|---|---|---|
| `/` | Landing/Hub mit Sektionen | **Neu in Phase 1** |
| `/tischfussball/` | Sponsoring-Seite, unverändert | bleibt |
| `/blog/` | Eleventy-Blog | **Phase 2** (nicht jetzt) |
| `/impressum/`, `/datenschutz/` | Rechtliches | bleibt |
| `/tech/` | Coming-Soon-Platzhalter | **wird Redirect → `/`** (siehe unten) |

Kontakt ist Anker `#kontakt` auf `/`, **keine eigene Seite.**

## Navigation

- Eine zentrale `<nav>`-Struktur, **per HTML-Duplikation** auf den **Consulting-/Hub-Seiten**: `/`, `/impressum/`, `/datenschutz/` (und später `/blog/`).
- **`/tischfussball/` bekommt NICHT die globale Hub-Nav.** Die Sponsoring-Seite ist eine eigenständige Landing für eine andere Zielgruppe (B2B-Sponsoren) und behält ihre eigene `.sticky-nav` (Anker-Navigation durch ihre Sektionen). Die globale Hub-Nav würde diese Funktion ohne Nutzen kaputtmachen.
- **Zwei gezielte, vom User gewünschte Eingriffe in `/tischfussball/`** (heben die „unangetastet"-Regel für genau diese Features auf):
  1. **MC-Badge** als Home-Anker in der sticht-nav (siehe MC-Badge unten) — helle Variante auf dunklem Nav-Grund.
  2. **Burger-Menü** für die Anker-Nav auf Mobile (≤767px) statt der aktuellen Schrumpf-Liste.
- **Single-Source-Master:** `/index.html`. Kommentar `<!-- NAV: SINGLE SOURCE — bei Änderung in /impressum/, /datenschutz/ syncen (NICHT /tischfussball/) -->` über dem Nav-Block in jeder Datei.
- **Sichtbare Links (Phase 1):** MC-Badge (Home-Anker), Home (`/`), Foos (`/tischfussball/`), Kontakt (`/#kontakt`).
- Blog kommt erst in Phase 3 dazu.
- Aktive Seite markiert via `aria-current="page"`.

### MC-Badge (Home-Anker, alle Seiten)

- Konsistenter Home-Anker auf **allen** Seiten (`/`, `/impressum/`, `/datenschutz/`, `/tischfussball/`), Link auf `/`.
- **Vorerst Text + CSS, kein Asset:** runder Hintergrund via `border-radius: 50%`, „MC" stilisiert, erbt Seitenschrift (`--font-headline` / Syne). **Eine** CSS-Klasse `.mc-badge`, leicht austauschbar.
- Auf dunklem Grund (tischfussball sticky-nav, `section--dark`) helle Variante via Kontext-Override `.sticky-nav .mc-badge { ... }`.
- **Späterer SVG-Tausch:** Mario liefert ein SVG-Monogramm nach. **Fester Pfad: `/img/mc-logo.svg`** (analog zu den anderen Bildern in `/img/`). Tausch: `MC`-Text im `<a class="mc-badge">` durch `<img src="/img/mc-logo.svg" …>` ersetzen — Klasse bleibt, Markup an einer Stelle pro Seite (Nav ist ohnehin dupliziert).

### Burger-Menü (nur `/tischfussball/`, Mobile)

- Auf `/tischfussball/` ersetzt ein Burger-Toggle die aktuelle Schrumpf-Liste auf Mobile (≤767px).
- Button mit `aria-expanded` + `aria-controls`, Menü als ausklappende Liste unter der Nav-Leiste.
- JS: Toggle öffnen/schließen, schließen bei Link-Klick und `Escape`.
- Desktop unverändert: Burger versteckt, Link-Liste sichtbar.

## Seitenstruktur `/` (Landing)

```
<nav> (siehe oben)

<main>
  1. HERO                — Sicherheitsvorfall-Inszenierung (volle Viewport-Höhe)
                            gerahmtes Incident-Bulletin + beruhigende Übergangszeile
  2. SUBSTANZ            — Was / Warum / Wie (drei Sub-Sektionen)
  3. KICKERN-TEASER      — Brücke zu /tischfussball/
  4. KONTAKT (#kontakt)  — hallo@mario-christ.de
</main>

<footer> (bestehender site-footer)
```

## Hero (Kernstück)

### Statisches HTML (SEO-Wahrheit, no-JS-Endzustand)

```html
<section class="hero">
  <div class="hero__bulletin">          <!-- gerahmtes Incident-Bulletin -->
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
  <p class="hero__reassure">                <!-- außerhalb des Rahmens -->
    Kein Grund zur Panik. Lassen Sie uns doch mal schauen, was heute möglich ist.
  </p>
</section>
```

- `<del>` und `<ins>` sind semantisches HTML. Default-Darstellung (Durchstrich + Unterstreichung) trifft bereits den Endzustand. Screenreader, Crawler und no-JS-Besucher sehen die Aussage **vollständig**.
- "Sicherheitsvorfall:" in `--accent` (Rot, `#DC2626`), **klein/akten-mäßig**: uppercase, kleine Schrift, leichtes letter-spacing — wie ein Aktenzeichen. Hauptgewicht liegt beim Twist-Satz.
- Hauptzeile Plus Jakarta Sans 800 (`--font-h1`), responsive `clamp()` wie bestehende H1.
- `Legal & HR` als Handschrift-Font (siehe unten).
- Sub-Zeile DM Sans, gedämpft (`--text-muted` oder ähnlich).

### Hero-Rahmen (Incident-Bulletin)

- `.hero__bulletin` umrahmt Label + Twist-Satz + Sub-Zeile, sodass der Block wie eine sachlich-trockene Meldung/Schlagzeile wirkt. Der nüchterne Rahmen verstärkt den Twist.
- **Schlicht halten:** dünne Linie (1px, `--border` oder dezentes Grau), großzügiges Innen-Padding, evtl. dezentes Label-Eck. Optional `--radius-md`.
- **Verboten:** Icons, Warndreiecke, Rot-Flächen, Schatten-Orgien. Rot und Durchstreichung bleiben die **einzigen lauten Elemente**. Die Botschaft ist der Schocker, nicht das Chrome.

### Beruhigende Übergangszeile

- `.hero__reassure` steht **außerhalb** des Rahmens, direkt darunter — Brotkrume/Brücke zum Rest der Seite, nicht Teil der Schlagzeile.
- Text: „Kein Grund zur Panik. Lassen Sie uns doch mal schauen, was heute möglich ist."
- Ton bewusst **lockerer** als der Schock drüber — der weiche Kontrast trägt die Wende von Anklage zu Begleitung. Dramaturgie: Bang → kurze Stille → ruhige Hand.
- DM Sans, ruhig, nicht gedämpft bis zur Unsichtbarkeit (sie ist die emotionale Auflösung).
- **Choreografie (JS):** nicht von Anfang sichtbar. Fade-in (~0,4s) **nach** der Durchstreichungs-/Korrektur-Animation. Erst den Stich allein wirken lassen, dann die Hand reichen.
- **No-JS-Fallback:** steht statisch da (wie der Hero-Endzustand). Reine Enhancement-Choreografie über vollständigem Grundzustand.

### Animation (Progressive Enhancement, JS-Layer)

**Pflicht-Reihenfolge:**

1. **Initial-State (JS-overlay):** Nur `Unbekannte Angreifer laden sensible Vertragsdaten auf ausländische Server.` sichtbar. Keine Durchstreichung, kein `Legal & HR`. Realisiert durch CSS-Klasse `.hero--animating` die `<ins>` und Durchstrich-Linie hidden hält.
2. **Lesepause:** 1,5–2 s. Kritischer Wert — kürzer zündet der Twist nicht.
3. **Durchstreichung:** Linie wischt über "Unbekannte Angreifer" (CSS-Transition auf `clip-path` oder `transform: scaleX()` einer Pseudoelement-Linie).
4. **Korrektur erscheint:** `Legal & HR` faded/slidet ein. Übergangs-Detail (Fade / Wush) bewusst **in Phase 1 schlicht** halten — Feinschliff später.
5. **Beruhigende Zeile faded ein:** `.hero__reassure` ~0,4s Fade-in, kurze Pause nach der Korrektur. Bang → Stille → ruhige Hand.
6. **End-State:** identisch mit statischem HTML.

**Spezielle Anforderungen:**

- `@media (prefers-reduced-motion: reduce)` → JS überspringt Animation, End-State sofort.
- JS prüft `prefers-reduced-motion` und setzt `.hero--animating` gar nicht erst.
- IntersectionObserver: Animation startet wenn Hero im Viewport (für direkten Aufruf von `#kontakt` etc., damit beim Zurück-Scrollen niemand auf `Unbekannte Angreifer` allein stehen bleibt — End-State persistiert).
- **Kein Buchstaben-Typewriter.** Explizit verboten.
- Layout-Shift-frei: `<ins>` darf nicht beim Einblenden den Textfluss verschieben. Lösung: `<ins>` ist von Anfang an im DOM mit voller Breite, nur `opacity: 0` → `opacity: 1`. ODER feste Mindestbreite via Container.

### Handschrift-Font

- **Empfehlung:** Caveat (Google Fonts, Open Font License), Weight 600, self-hosted unter `/fonts/caveat-latin.woff2` analog zu DM Sans/Syne.
- CSS-Variable: `--font-handwriting: 'Caveat', cursive;`.
- Größe: ca. 1,1–1,2× der Hauptzeile, leicht überhängend für Authentizität.

### Hero-Layout

- Volle erste Viewport-Höhe (`min-height: 100svh` für mobile-safe).
- Vertikal mittig, links-bündig.
- Kein Hintergrund-Bild — Aussage trägt allein.
- Max-Width `--max-width` (1200px), `--section-padding` für Außenabstand.

## Substanz (Was / Warum / Wie)

Drei aufeinanderfolgende Sektionen direkt unter Hero. **Ruhiger Boden** nach Hero-Schock.

### Was ich mache
- Beratung primär: AI-Roadmap, EU-AI-Act-Compliance-Check, Tool-/Architektur-Auswahl, Risiko-Audit für bestehende AI-Nutzung.
- Implementierung opportunistisch: On-Prem-/Sovereign-AI-Setups, RAG, lokale LLM-Stacks. "Wenn das Projekt passt — wenn nicht, sage ich's."
- Kein 24/7-Support, kein Managed Service.

### Warum ich
- DevOps-Background → ich rede nicht nur über Infrastruktur, ich baue sie.
- Täglich praktisch an lokalen LLMs (eigener Multi-GPU-Setup, llama.cpp-Stack). Ich kenne die Bruchstellen weil ich sie selbst getroffen habe.
- Ehrlich. Wenn AI für ein Problem nicht das richtige Werkzeug ist, sage ich das.

### Wie ich arbeite
- **Sovereign-First:** EU-Hosting / On-Prem als Default, US-Cloud nur mit Rechtfertigung.
- **Pragmatismus statt Hype:** "Brauchen Sie wirklich einen Agent?" vor "Wir bauen einen Agent."
- Klare Auftragsbegrenzung: feste Scopes, kein Scope-Creep, keine versteckten Mehrkosten.

**Format der Sektion:** Jede Sub-Sektion mit kurzer H2 oder H3 + 2–4 prägnanten Sätzen (kein Bullet-Friedhof). Headline-Style wie auf Sponsoring-Seite, `accent-line` als Trenner. Layout: Stapel mit großzügigem Whitespace, optional zweispaltig auf Desktop (Titel links, Text rechts).

## Kickern-Teaser

Eigene Sektion. Knapper Absatz, der zweigleisig funktioniert:

- B2B-Visitor: "Aha, der hat noch eine andere Welt — sympathisch, normaler Mensch."
- Sponsoring-Interessent: "Genau dafür bin ich hier."

**CTA-Button → `/tischfussball/`** (Style `.btn--kicker`).

Inhaltlicher Anker: Bundesliga + HSV Kurbelkraft, kurz. Kein Doppeln der Sponsoring-Pitch-Inhalte.

Optional: dunkler Hintergrund (`section--dark`) als visueller Rhythmus.

## Kontakt-Block (`#kontakt`)

- H2 ("Lassen Sie uns reden." o.ä. — kein Marketing-Sprech, später feintunen).
- 1–2 Sätze: Erstgespräch unverbindlich, Sie schreiben, ich melde mich.
- E-Mail: `hallo@mario-christ.de` als `mailto:`-Link + Button (Style `.btn--kicker` oder neuer `.btn--accent`).
- LinkedIn-Link optional (wenn Mario das will).
- **Kein Kontaktformular.**

**Vorbedingung:** Mailbox `hallo@mario-christ.de` muss vor Go-Live als Alias auf Marios Hauptadresse eingerichtet sein. Nicht von der Spec abhängig — kann parallel passieren.

## Tonalität

- **Sie-Form durchgehend.** Konsistent zu Sponsoring-Seite, passt zur B2B-Mittelstand-Zielgruppe.
- Direkt, kein Marketing-Deutsch, kein AI-Slop.
- Konkrete Aussagen statt Hedging. Wenn etwas nicht gemacht wird, das ehrlich sagen.

## Visuelle Sprache

- **Design-Tokens aus `css/style.css` weiternutzen** — keine neuen Farben/Schriften erfinden außer Caveat.
- Primärfarbe `--page-bg` (#FAFAFA), Text `--text-primary` (#1A1A2E), Akzent `--accent` (#DC2626).
- Headlines Plus Jakarta Sans 800 (H1/H2) und Syne (H3+) — bestehend.
- Body DM Sans — bestehend.
- Neue Variable `--font-handwriting` für Hero-Korrektur.
- Großzügiger Whitespace (`--section-padding`).
- Optional: eine `section--dark`-Sektion (Kickern-Teaser) für Rhythmus.

## Datei-Struktur

```
/index.html                  ← komplett neu
/css/landing.css             ← komplett neu (alte Diagonal-Logik weg)
/js/main.js                  ← Hero-Animation + IntersectionObserver
                               (alte Diagonal-Bar-Logik entfernen)
/fonts/caveat-latin.woff2    ← neu
/tech/index.html             ← Redirect auf / (Detail siehe "/tech/-Redirect")
```

**Bestehend, nicht angefasst:**
`/tischfussball/` (komplett, inkl. eigener sticky-nav), `/css/sponsoring.css`, `/css/style.css` (Design-Tokens — nur additiv ergänzt um `--font-handwriting` + Caveat `@font-face` + Nav-Styles).

**Nav-Update in:** `/impressum/index.html`, `/datenschutz/index.html` — neue Hub-Nav-Bar einbauen. **Nicht** in `/tischfussball/`.

## SEO / Meta

`/index.html`:

- `<title>`: "Mario Christ — AI-Consulting für DSGVO- und EU-AI-Act-konformen Einsatz" (oder Variante).
- `<meta name="description">`: 1–2 Sätze, kein Keyword-Stuffing.
- Open Graph + Twitter Card.
- Canonical `https://mario-christ.de/`.
- `<html lang="de">`.

### `/tech/`-Redirect (GitHub-Pages-Constraint)

Ein echter Server-301 ist auf GitHub Pages **nicht möglich** (nur statisches File-Serving, kein Header-Control). Beste machbare Lösung ohne externen Layer (Cloudflare o.ä.) — Kombi, priorisiert:

1. **JS führt:** `location.replace('/')` → instant, **kein** History-Eintrag (Back-Button überspringt die tote Seite).
2. `<link rel="canonical" href="https://mario-christ.de/">` → Konsolidierungs-Signal an Google.
3. `<meta name="robots" content="noindex">` → Pfad fällt aus dem Index.
4. `<meta http-equiv="refresh" content="0; url=/">` → **No-JS-Fallback**. Delay = 0 wird von Google wie ein permanenter Redirect behandelt (kein Anti-Pattern; das wäre delay > 0).
5. Sichtbarer Fallback-Link ("Weiter zu mario-christ.de") als letzte Absicherung.

Minimales HTML, kein CSS/Font-Laden nötig.

`sitemap.xml` aktualisieren — `/tech/` raus, `/` mit neuem `lastmod`.

## Accessibility

- Skip-Link bleibt.
- Semantisches HTML (`<nav>`, `<main>`, `<section>`, `<footer>`).
- `prefers-reduced-motion` respektiert (siehe Hero).
- WCAG-AA-Kontraste (Akzent-Rot auf Weiß: ✓).
- Tab-Reihenfolge sinnvoll.
- Hero-Animation per Screenreader nicht störend — `<del>`/`<ins>` werden als "gestrichen" / "eingefügt" angesagt, das passt zum Inhalt.

## Performance

- Self-hosted Fonts mit `font-display: swap`, `preload` für Caveat (Hero-Element).
- Kein JS-Framework, kein Lottie, keine Heavy-Lib.
- Lighthouse-Ziel > 90 (Performance, A11y, Best Practices, SEO).
- Keine externen Ressourcen außer ggf. LinkedIn-Logo (wenn überhaupt — sonst Text-Link).

## Explizit NICHT in Phase 1

- Blog / Eleventy / GitHub Action — Phase 2.
- Blog-Link in Nav — Phase 3.
- Service-Detail-Unterseiten.
- Kontaktformular, Newsletter.
- Preise.
- Komplexe Animationen (Lottie, GSAP).
- Dark-Mode-Toggle.
- Mehrsprachigkeit.

**Backlog-Kandidaten (v2):**
- Hero-Animations-Feinschliff (Übergangs-Wush, evtl. Sound-Effekt).
- Case Studies / Referenzen.
- Newsletter für Local-AI-Journey.
- Schema.org / strukturierte Daten.

## Akzeptanzkriterien Phase 1

- [ ] Neue Landing live auf `/`, alte Diagonal-Weiche entfernt.
- [ ] Hero zeigt End-State auch ohne JS, ohne Layout-Shift.
- [ ] Hero-Animation startet, `prefers-reduced-motion` respektiert.
- [ ] Nav auf allen vier Seiten identisch, Master-Kommentar gesetzt.
- [ ] `/tech/` redirected sauber auf `/` und ist `noindex`.
- [ ] Lighthouse > 90 auf `/`.
- [ ] WCAG-AA-Kontraste eingehalten.
- [ ] Anrede durchgehend Sie.
- [ ] `hallo@mario-christ.de` als Alias eingerichtet (Marios To-Do, nicht Code).
- [ ] sitemap.xml aktualisiert.
