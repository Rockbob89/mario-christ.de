# BACKLOG.md – Offene Punkte

---

## Fotos einbauen

Mario hat 23 Top-Picks + ~35 Ergänzungsbilder. Platzhalter-Divs durch echte `<img>`-Tags ersetzen.

| Seite | Element | Beschreibung |
|-------|---------|--------------|
| `/index.html` | Tech-Hälfte | Portrait, professionell, büronah, ruhiger Blick |
| `/index.html` | Kicker-Hälfte | Action-Shot, Tisch, Turnier-Atmosphäre, voller Fokus |
| `/tischfussball/` | Hero | Kurbelkraft-Cap Close-up oder Bundesliga-Action |
| `/tischfussball/` | Über mich | Portrait lachend mit Bokeh oder Solo-Action |
| `/tischfussball/` | Die Szene (1) | Turnierhalle von oben – viele Tische, Screens, Bühne |
| `/tischfussball/` | Die Szene (2) | Nahaufnahme Spielsituation, Zuschauer unscharf im Hintergrund |
| `/tischfussball/` | Kontakt | Entspannt, einladend, kein Wettkampf-Modus |

Format: WebP bevorzugt, JPG als Fallback. Alle `<img>` mit `alt`-Text und `loading="lazy"`.

---

## DNS-Umstellung (INWX → GitHub Pages)

### DNS-Records bei INWX setzen

| Typ | Name | Wert |
|-----|------|------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `rockbob89.github.io` |

Die vier A-Records zeigen den Apex (`mario-christ.de`) auf GitHub Pages. Der CNAME sorgt dafür, dass auch `www.mario-christ.de` funktioniert. GitHub erkennt die Zuordnung zum Repo anhand der Custom-Domain-Einstellung in Pages Settings.

### GitHub Pages Settings (Repo)

1. Settings → Pages → Custom Domain: `mario-christ.de` eintragen
2. "Enforce HTTPS" aktivieren (GitHub stellt Let's Encrypt-Zertifikat aus, dauert ein paar Minuten nach DNS-Propagation)

Nach HTTPS: Lighthouse Best Practices steigt von 96 auf 100.

---

## Ranking-Automatisierung (optional, später)

- OpenClaw Agent (JW) soll DTFB- und ITSF-Rankings automatisch aktualisieren
- Aktuell hardcoded: Stand Feb. 2026
