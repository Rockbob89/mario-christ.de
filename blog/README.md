# Blog

Der Blog unter `/blog` wird von [Eleventy](https://www.11ty.dev/) aus Markdown
gebaut. Der Rest der Seite bleibt handgeschriebenes HTML und wird vom Build nur
unverändert durchgereicht.

Diese Datei wird nicht deployed (steht in `.eleventyignore`).

## Lokal entwickeln

```bash
npm install                  # einmalig
npx @11ty/eleventy --serve   # oder: npm run dev
```

Läuft dann auf <http://localhost:8080/>. Der Dev-Server liefert die **komplette**
Seite, nicht nur den Blog. Startseite, `/ueber-mich/`, `/tischfussball/` und alle
Assets funktionieren lokal genauso wie live. Änderungen an Markdown, Templates
oder CSS laden den Browser automatisch neu.

Einmalig bauen ohne Server:

```bash
npm run build                # Ergebnis liegt in _site/
```

`_site/` und `node_modules/` sind gitignored, die gehören nicht ins Repo.

## Neuen Post schreiben

Neue Datei in `blog/posts/` anlegen, zum Beispiel `blog/posts/mein-post.md`:

```markdown
---
title: "Titel des Beitrags"
date: 2026-08-15
description: "Ein bis zwei Sätze. Landen in der Übersicht, im Feed und als meta description."
tags: ["Kubernetes", "DSGVO"]
---

Hier der Text.
```

**Der Dateiname ist der Slug.** `mein-post.md` wird zu `/blog/mein-post/`.
Also klein, mit Bindestrichen, ohne Umlaute und ohne Datum im Namen. Sortiert
wird über `date` im Frontmatter, nicht über den Dateinamen.

Danach committen und pushen. Die GitHub Action baut und deployed, nach etwa
einer Minute ist der Post live. Mehr ist nicht zu tun.

### Frontmatter

| Feld | Pflicht | Wofür |
|---|---|---|
| `title` | ja | Überschrift, `<title>`, Übersicht, Feed |
| `date` | ja | `YYYY-MM-DD`, bestimmt die Sortierung |
| `description` | ja | Anrisstext in der Übersicht, `meta description`, OG |
| `tags` | nein | Themen-Tags, werden unter dem Titel angezeigt |

`tags` ist rein dekorativ. Die Post-Liste wird nicht darüber gebaut, sondern per
Glob über den Ordner. Es gibt (noch) keine Tag-Übersichtsseiten.

## Zwei Dinge, die anders sind als erwartet

**Im Markdown läuft kein Template-Engine.** Absicht: Helm-Werte,
Action-Snippets und Kubernetes-Manifeste stecken voller `{{ ... }}`, und mit
aktivem Nunjucks würde Eleventy die als Variablen lesen und der Build fällt um.
Posts sind deshalb reines Markdown. Wer doch mal einen Shortcode braucht, stellt
`markdownTemplateEngine` in `eleventy.config.js` auf `"njk"` und packt jeden
Code-Block in `{% raw %}` ... `{% endraw %}`.

**Externe Links brauchen keine Extra-Attribute.** `target="_blank"` und
`rel="noopener noreferrer"` hängt der Build automatisch an alles an, was nicht
auf mario-christ.de zeigt.

## Bilder

Wie überall auf der Seite: WebP, `cwebp -q 82`, direkt nach `img/`, Dateiname
lowercase-kebab. Im Markdown dann:

```markdown
![Beschreibung, was zu sehen ist](/img/mein-bild.webp)
```

Original-JPG/PNG bleiben lokal, die sind gitignored.

## Preview-Phase

Der Blog ist live erreichbar, aber bewusst nicht auffindbar:

- kein Link von der Hauptseite oder aus der Navigation
- `<meta name="robots" content="noindex, nofollow">` auf allen Blog-Seiten
- `/blog` steht nicht in der `sitemap.xml`

Bewusst **kein** `Disallow: /blog/` in der `robots.txt`. Das würde das Crawlen
verhindern, wodurch Google das `noindex` nie zu sehen bekäme und die URL
trotzdem listen könnte.

### Zum Launch

1. In `_data/site.js` die Zeile `const PREVIEW = ...` auf `false` setzen.
   Das entfernt das `noindex` überall.
2. `/blog/` und die Posts in `sitemap.xml` eintragen.
3. Den `Blog`-Link in die Navigation der statischen Seiten übernehmen: Master
   ist `/index.html`, von dort nach `impressum`, `datenschutz` und `ueber-mich`
   syncen. Das Markup steht fertig in `_includes/blog-base.njk`. Dabei prüfen,
   ob die Nav mit vier Links plus Foos-Switch noch einzeilig passt.

Für einen Testbuild ohne Commit lässt sich das Flag überschreiben:

```bash
BLOG_PUBLIC=true npx @11ty/eleventy   # oder: npm run build:public
```

## Wo was liegt

| Pfad | Inhalt |
|---|---|
| `blog/posts/*.md` | die Beiträge |
| `blog/posts/posts.11tydata.js` | Layout + Permalink-Regel für alle Posts |
| `blog/index.njk` | die Übersichtsseite |
| `_includes/blog-base.njk` | Seitengerüst: head, Navigation, Footer |
| `_includes/blog-post.njk` | Layout eines einzelnen Beitrags |
| `_data/site.js` | globale Daten, Preview-Flag |
| `css/blog.css` | alles Blog-spezifische CSS |
| `eleventy.config.js` | Build-Konfiguration |
| `.github/workflows/deploy.yml` | Build und Deploy |

Der Feed liegt unter `/blog/feed.xml` und wird vom
`@11ty/eleventy-plugin-rss` erzeugt, konfiguriert in `eleventy.config.js`.
