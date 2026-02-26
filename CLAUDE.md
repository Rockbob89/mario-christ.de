# CLAUDE.md – mario-christ.de Website

## Projekt-Kontext

Persönliche Website für Mario Christ – Staff Engineer (ab Juni 2026) und Bundesliga-Spieler im Tischfußball (3. Liga, HSV Kurbelkraft). Die Website dient zwei Zwecken: Professionelle Präsenz (Tech) und Sponsoring-Akquise (Tischfußball). Der Sponsoring-Fokus liegt auf B2B Tech-Unternehmen in Hamburg – Employer Branding, Teambuilding & IT-Recruiting statt Reichweitenwerbung.

**Wichtig:** Kein Text auf der Website darf nach AI klingen. Tonalität: Locker-professionell, selbstbewusst aber nicht überheblich, Humor erlaubt. Deutsch durchgehend. Ich-Form durchgehend.
- **Landing Page & Coming Soon:** Neutraler Ton, kein Sie/Du nötig (kaum Text)
- **Sponsoring-Seite (/tischfussball):** Sponsoren werden gesiezt (Erstkontakt-Ton). Kein Marketing-Deutsch, aber respektvoller Umgang.
- **Gendern:** Doppelpunkt-Form wo es natürlich passt (Spieler:innen, Entwickler:innen). Nicht in jeden Satz pressen – Lesbarkeit geht vor.

## Tech-Stack

- **Statisches HTML/CSS/JS** – kein Framework, kein Build-Step
- **Hosting:** GitHub Pages
- **Domain:** mario-christ.de (DNS bei INWX, muss auf GitHub Pages umgebogen werden)
- **Fonts:** Google Fonts (Auswahl siehe Design-System)
- **Kein JavaScript-Framework** – Vanilla JS nur für Interaktionen (Hover-Effekte, Smooth Scroll, ggf. mobile Navigation)

## Grundprinzip: SEO von Anfang an

Bei jeder Änderung, jeder neuen Section, jedem neuen Element: Semantisches HTML, `alt`-Texte, Meta-Tags und Open Graph Tags direkt mitdenken – nicht nachträglich draufschrauben. Details stehen unter "SEO & Social Sharing Basics" weiter unten, aber die Regel ist einfach: **Kein Element ohne semantische Bedeutung, kein Bild ohne alt-Text, keine Seite ohne Meta-Tags.** Das spart Refactoring und ist bei statischem HTML null Mehraufwand wenn man es von Anfang an macht.

## Seitenstruktur

### 1. Landing Page (`/index.html`)

Split-Screen: Viewport vertikal zweigeteilt.

**Links: Tech**
- Hintergrund: Grau (kühl, professionell)
- Akzentfarbe: Blau
- Schrift: Dunkel
- Button: Blau → verlinkt auf `/tech` (Coming Soon)
- Foto-Platzhalter: Portrait/professionell (noch nicht vorhanden)

**Rechts: Tischfußball**
- Hintergrund: Weiß
- Akzentfarbe: Rot
- Schrift: Dunkel
- Button: Rot → verlinkt auf `/tischfussball`
- Foto-Platzhalter: Action/Sportkleidung (noch nicht vorhanden)

**Verbindendes Element:**
- "Mario Christ" als Name mittig oben, über beiden Hälften
- Langfristig: Foto-Komposition beider Versionen von Mario auf der Mittelgrenze (Platzhalter bis Shooting)

**Interaktion:**
- Hover über eine Hälfte → wird breiter (CSS transition), andere weicht zurück UND wird leicht abgedunkelt (Overlay/Opacity)
- Smooth, nicht ruckartig – ca. 55/45 oder 60/40 Split beim Hover
- Die inaktive Hälfte dimmt dezent (z.B. dunkles Overlay mit opacity 0.15-0.25), sodass der Fokus klar auf der aktiven Seite liegt
- Mobile: Hälften stacken vertikal (oben Tech, unten Tischfußball)

### 2. Coming Soon (`/tech/index.html`)

Minimale Seite. Gleiche Farbwelt wie Tech-Hälfte der Landing Page (Grau/Blau). Kurzer Text ("Kommt bald." o.ä.), Link zurück zur Landing Page. Kein Aufwand hier – Platzhalter.

### 3. Sponsoring-Seite (`/tischfussball/index.html`)

Scroll-Down Single Page mit 6 Sections. Kein klassisches Navigationsmenü nötig, optional sticky Anker-Navigation.

**Farbwelt:** Weiß/helles Grau als Standard-Hintergrund. Einzelne Sections dürfen dunklen Hintergrund (Charcoal/Anthrazit) mit heller Schrift nutzen, um Rhythmus zu erzeugen. Rot als Akzentfarbe (Buttons, Highlights, Hover-States, Linien).

#### Section 1: Hero
- Große Headline (Deck-Titel adaptiert: "Das schnellste Recruiting-Tool der Welt." oder Variante)
- Untertitel / kurzer Teaser
- Hero-Image: Platzhalter für Kurbelkraft-Cap Close-up oder Bundesliga-Action
- CTA-Button der nach unten scrollt oder direkt zu Kontakt springt

#### Section 2: Das Argument (IT-Biotop)
- Kernargument: Die Kicker-Szene ist ein IT-Biotop, jeder zweite Turnierspieler arbeitet in Tech
- Zahlen: 1.000+ Spieler:innen allein in Hamburg, organisierter Leistungssport
- Deck-Seite 2 als Textbasis, aber für Web adaptiert (kürzer, scannbarer)
- Kein "Ihr ROI", kein HR-Bingo, kein Marketing-Deutsch

#### Section 3: Über mich
- Persönlicher als im Deck – die Story hinter den Zahlen
- Doppelrolle: DevOps Engineer unter der Woche, Bundesliga am Wochenende
- Credentials (zeitlose Fakten, direkt im HTML):
  - Erstes Turnier: 06. Mai 2007
  - DTFB national: Platz 34/621 (Top 6%)
  - ITSF Weltrangliste: Platz 171/4.237 (Top 4%)
  - *(Rankings-Zahlen: Stand Feb. 2026 – kleiner Hinweis bei den Zahlen, keine eigene Zeile)*
  - 35 Turniere in 2025 (5 Länder: DE, AT, FR, GB, HU)
  - 10 Bundesliga-Saisons
  - Aktuell: 3. Bundesliga mit HSV Kurbelkraft – neues Team gegründet, Relegation ungeschlagen gewonnen, Durchmarsch in die 2. Liga steht bevor
  - **Darstellungsregel:** Die "3." nur dort nennen wo der Aufstiegs-Narrativ direkt folgt. In isolierten Erwähnungen einfach "Bundesliga" – klingt sonst drittklassig.
  - WM-Teilnehmer 2017
- Links zu den Live-Profilen:
  - DTFB: https://dtfb.de/wettbewerbe/turnierserie/spielersuche?task=spieler_details&id=3545&kategorie=&filter=mario&veranstaltungid=0&veranstalterid=0&einstufungid=0&beginn=0
  - ITSF: https://www.tablesoccer.org/player/?id=62G5RO
  - Label z.B.: "Aktuelle Rankings: DTFB-Profil | ITSF-Weltrangliste" (als externe Links, target="_blank")
  - Perspektivisch: Automatisiertes Ranking-Update durch JW (OpenClaw Agent) – siehe JWs TODO.md
- Foto-Platzhalter: Portrait (lachend mit Bokeh) oder Action solo

#### Section 4: Die Szene
- Macht greifbar was Tischfußball-Turniere tatsächlich sind
- Atmosphäre-Fotos: Volle Hallen mit Screens und Bühne, Turnier-Setups
- Zahlen zur Community
- Diese Section gibt es im Deck nicht – sie schließt die Wissenslücke für Sponsoren die noch nie ein Turnier gesehen haben
- Dunkler Hintergrund für visuellen Kontrast (Fotos kommen hier besser zur Geltung)

#### Section 5: Pakete
- Die drei Formate aus dem Deck:
  - **"The Office Takedown"** – Einmaliges Büro-Event
  - **"The Agile Masterclass"** – Mehrteiliges Coaching
  - **"The Full Stack Partner"** – Jahrespartnerschaft
- Kursive Punchlines am Ende jedes Pakets bleiben
- **KEINE PREISE** auf der Website (kommen im persönlichen Gespräch)
- Ggf. Icons oder kleine Illustrationen pro Paket

#### Section 6: Kontakt / CTA
- Closing-Spruch (Deck: "Die beste Verhandlung beginnt mit einem guten Spiel.")
- E-Mail: sponsoring@mario-christ.de (als mailto-Link/Button)
- Website: mario-christ.de
- Foto-Platzhalter
- Kein Kontaktformular – direkte Mail ist persönlicher

## Design-Qualität

Bevor du anfängst zu bauen: Lies die Frontend-Design-Skill (`/mnt/skills/public/frontend-design/SKILL.md`) und halte dich an deren Prinzipien. Darüber hinaus:

- **Etablierte Design-Patterns verwenden:** Bewährte UI-Patterns für Landing Pages, Split-Screens, Scroll-Pages. Keine experimentellen Layouts.
- **Accessibility:** Kontrastverhältnisse WCAG AA einhalten, fokusbare Elemente, sinnvolle Tab-Reihenfolge, `prefers-reduced-motion` respektieren.
- **Performance:** Kein Layout-Shift, optimierte Assets, minimales CSS/JS. Lighthouse-Score >90 anstreben.
- **Responsive:** Nicht nur "funktioniert auf Mobile", sondern sieht auf jedem Viewport gut aus. Breakpoints bewusst setzen, nicht raten.
- **Konsistenz:** Einmal definierte Abstände, Farben, Schriftgrößen als CSS-Variablen anlegen und überall wiederverwenden. Kein Freestyle.

## Design-System

### Farbpalette

```
/* Landing Page – Tech-Seite */
--tech-bg: #E8EAED;          /* Kühles Grau */
--tech-accent: #2563EB;       /* Kräftiges Blau */
--tech-text: #1A1A2E;         /* Fast Schwarz */

/* Landing Page – Kicker-Seite */
--kicker-bg: #FFFFFF;         /* Weiß */
--kicker-accent: #DC2626;     /* Kräftiges Rot */
--kicker-text: #1A1A2E;       /* Fast Schwarz */

/* Sponsoring-Seite (/tischfussball) */
--page-bg: #FAFAFA;           /* Sehr helles Grau */
--page-bg-dark: #1A1A2E;      /* Dunkle Sections (Charcoal) */
--text-primary: #1A1A2E;
--text-on-dark: #F5F5F5;
--accent: #DC2626;             /* Rot als Akzent */
--accent-hover: #B91C1C;       /* Dunkleres Rot für Hover */
```

Die Farben sind Richtwerte – CLI darf bei der Implementierung feintunen, solange die Grundlogik (kühl/Tech vs. warm/Sport, Rot als Akzent nicht als Hintergrund) erhalten bleibt.

### Typografie

- **Headline-Font:** Eine markante, moderne Sans-Serif mit Charakter. NICHT Inter, NICHT Space Grotesk, NICHT Roboto – diese sind zu generisch. Gute Optionen: Outfit, General Sans, Satoshi, Syne, oder etwas mit ähnlicher Persönlichkeit. Headlines sollen selbstbewusst und groß sein.
- **Body-Font:** Gut lesbar, clean, modern. Darf die gleiche Font-Family sein (in Regular/Light) oder ein bewusster Kontrast.
- **Alle Fonts über Google Fonts** (kostenlos, kein Self-Hosting nötig für v1)

### Spacing & Layout

- Großzügig. Viel Luft zwischen Sections.
- Max-Width für Content: ~1200px, zentriert
- Fotos dürfen full-width gehen (edge-to-edge)
- **Mobile-first:** Landing Page Split wird vertikal gestackt, Sections bleiben scrollbar
- Kein visuelles Clutter – weniger ist mehr

### Interaktionen

- Smooth Scroll zwischen Sections (CSS `scroll-behavior: smooth`)
- Hover-Effekte auf Buttons (Farbshift, leichter Scale)
- Landing Page: Split-Hover-Animation (CSS transition, ~0.4s ease)
- Keine Heavy-JS-Animationen, keine Bibliotheken – Performance > Fancy

## Foto-Handling

Alle Bilder sind Platzhalter bis Mario die finalen Fotos liefert. **Für jeden Platzhalter eine konkrete Beschreibung reinschreiben**, was für ein Foto dort hin soll – Vibe, Stimmung, Perspektive, Kontext. Beispiel: Nicht einfach "Foto folgt", sondern "Action-Shot am Tisch, Seitenperspektive, konzentrierter Blick, Turnier-Atmosphäre im Hintergrund". Mario hat eine sortierte Sammlung von 23 Top-Picks + ~35 Ergänzungsbilder und kann anhand der Beschreibung passende Fotos zuordnen.

- Platzhalter visuell: Einfarbige Fläche oder dezenter Gradient mit der Beschreibung als Text darin
- Bilder als `<img>` mit `alt`-Text, nicht als CSS-Background (Accessibility)
- WebP bevorzugen wenn verfügbar, JPG als Fallback
- Lazy Loading für Bilder unterhalb des Viewports

## Texte

**Oberste Regel: Kein AI-Slop.** Kein "in der heutigen schnelllebigen Welt", kein "nahtlos", kein "ganzheitlich", kein "Synergien", kein "auf das nächste Level heben". Jeder Satz muss klingen als hätte ein selbstbewusster Mensch ihn geschrieben, nicht eine Maschine. Im Zweifel: Lieber ein kurzer, ehrlicher Satz als ein aufgeblähter Absatz. Wenn ein Text nach AI riecht, ist er falsch.

Die finalen Pitch-Deck-Texte existieren bereits (Mario liefert sie separat). Sie müssen für das Web adaptiert werden:
- Kürzer und scannbarer als im Deck
- Keine 1:1-Kopie – Website wird anders konsumiert als ein PDF
- Ich-Form durchgehend
- "Wir" = Mario + Sponsor gemeinsam, nicht Mario + Team
- Kein "Ihr ROI", kein HR-Bingo, kein Marketing-Deutsch
- Kursive Punchlines am Ende der Pakete bleiben

## Performance-Grundregeln

- **Google Fonts preconnect:** Jede Seite braucht im `<head>` vor dem CSS-Link:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```
  Ohne das wartet der Browser auf den CSS-Parse-Cycle bevor die Font-Verbindung aufgebaut wird → schlechter LCP.

## Deployment

- GitHub Pages aus dem Main-Branch
- Verzeichnisstruktur:
  ```
  /
  ├── index.html              (Landing Page)
  ├── tech/
  │   └── index.html          (Coming Soon)
  ├── tischfussball/
  │   └── index.html          (Sponsoring-Seite)
  ├── css/
  │   └── style.css           (Shared Styles + Page-specific)
  ├── js/
  │   └── main.js             (Vanilla JS, minimal)
  └── img/
      └── (Platzhalter + spätere Fotos)
  ```

## SEO & Social Sharing Basics

Kein aktives SEO nötig – der primäre Kanal ist Direktkontakt, nicht Google. Aber die Grundlagen sollen von Anfang an stimmen:

- **`<title>`** pro Seite (z.B. "Mario Christ – DevOps Engineer & Bundesliga-Spieler Tischfußball")
- **`<meta name="description">`** pro Seite (1-2 Sätze, kein Keyword-Stuffing)
- **Semantisches HTML:** `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` – kein div-Friedhof
- **`alt`-Texte** auf allen Bildern (auch Platzhaltern)
- **`robots.txt`** und **`sitemap.xml`** im Root
- **Open Graph Tags** (`og:title`, `og:description`, `og:image`, `og:url`) – wichtig damit die URL in Slack, LinkedIn, WhatsApp, Telegram gut aussieht wenn jemand sie teilt. Pro Seite eigene OG-Tags.
- **`<html lang="de">`**
- **Canonical URLs** setzen

## Was NICHT tun

- Kein React/Vue/Svelte – overkill
- Kein Tailwind – für 3 Seiten unnötiger Overhead
- Keine Cookie-Banner (keine Cookies, kein Tracking für v1)
- Keine externen Abhängigkeiten außer Google Fonts
- Kein Kontaktformular
- Keine Preise für Sponsoring-Pakete
- Kein "3." vor Bundesliga in isolierten Erwähnungen (nur zusammen mit Aufstiegs-Story)
- Keinen Text der nach AI klingt
- Keine Purple-Gradients-on-White-Ästhetik