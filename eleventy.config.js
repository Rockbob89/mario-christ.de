/* ============================================================
   Eleventy-Config – mario-christ.de

   Eleventy baut die GESAMTE Ausgabe nach _site/, aber es rendert nur
   den Blog. Die handgeschriebenen Bestandsseiten werden ausschliesslich
   durchgereicht (Passthrough), nie als Template verarbeitet:
   templateFormats laesst .html gar nicht erst als Template zu.
   Damit ist "die alten Seiten bleiben unveraendert" per `cmp` pruefbar
   und nicht bloss Hoffnung.

   Nebeneffekt, der so gewollt ist: `npx @11ty/eleventy --serve` liefert
   lokal die komplette Seite inklusive /css, /fonts und /img – die
   root-absoluten Pfade der Bestandsseiten funktionieren dadurch auch
   in der lokalen Vorschau.
   ============================================================ */

import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  /* ── Bestandsseiten + Assets: 1:1 durchreichen ─────────────
     Bei einer neuen statischen Seite muss ihr Ordner hier ergaenzt
     werden, sonst fehlt sie im Build. */
  const passthrough = [
    // Handgeschriebene Seiten
    "index.html",
    "ueber-mich",
    "impressum",
    "datenschutz",
    "tischfussball",
    "tech",
    // Assets
    "css",
    "js",
    "fonts",
    // Root-Dateien. CNAME ist kritisch: fehlt sie im Artefakt,
    // verliert GitHub Pages die Custom Domain.
    "CNAME",
    "robots.txt",
    "sitemap.xml",
    /* .nojekyll schaltet die Jekyll-Verarbeitung ab. Fuer den Actions-Deploy
       ist das egal (da laeuft ohnehin kein Jekyll), aber es deckt zwei Faelle:
       das Fenster zwischen Merge und Umstellen der Pages-Source, und einen
       spaeteren Rollback auf Branch-Deploy. Ohne die Datei wuerde Jekyll die
       Post-Markdowns zu eigenen, nicht-noindexten Seiten rendern. */
    ".nojekyll",
  ];
  passthrough.forEach((path) => eleventyConfig.addPassthroughCopy(path));

  /* Bilder gezielt statt "img" pauschal: im Repo liegen lokal die
     Original-JPG/PNG (gitignored, nur WebP wird deployed). Ein pauschales
     Passthrough wuerde die lokal nach _site kopieren und die Vorschau zu
     einem unehrlichen Abbild des Deployments machen. */
  eleventyConfig.addPassthroughCopy("img/**/*.webp");
  eleventyConfig.addPassthroughCopy("img/**/*.svg");
  eleventyConfig.addPassthroughCopy("img/og-*.jpg");

  /* ── Blog-Collection ───────────────────────────────────────
     Bewusst per Glob und NICHT ueber ein `tags: post` in der
     Directory-Data: sonst wuerde der Collection-Marker mit den
     Themen-Tags aus dem Frontmatter zusammenlaufen.

     Reihenfolge bleibt aufsteigend (Eleventy-Default, aeltester zuerst).
     Das feedPlugin dreht die Collection selbst um; die Uebersicht macht
     das per `| reverse` im Template. */
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("blog/posts/*.md"),
  );

  /* ── Datums-Filter ─────────────────────────────────────────
     timeZone UTC ist kein Detail: `date: 2026-08-09` im Frontmatter wird
     als UTC-Mitternacht geparst. Ohne die Angabe formatiert Node in der
     lokalen Zone und macht daraus je nach Offset den 8. August. */
  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  eleventyConfig.addFilter("dateDE", (value) => dateFormatter.format(value));

  // Fuer <time datetime="…"> – YYYY-MM-DD
  eleventyConfig.addFilter("dateISO", (value) =>
    value.toISOString().slice(0, 10),
  );

  /* ── Externe Links im Markdown ─────────────────────────────
     DESIGN_CHOICES verlangt target="_blank" + rel="noopener noreferrer" fuer
     externe Links. Beim Schreiben in Markdown laesst sich das nicht mitgeben,
     also haengt es der Build an. Greift nur auf gerenderten Blog-Seiten;
     Passthrough-Dateien laufen ohnehin durch keine Transforms. */
  eleventyConfig.addTransform("externalLinks", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    if (!(this.page.url || "").startsWith("/blog/")) return content;

    return content.replace(
      /<a href="(https?:\/\/(?!(?:www\.)?mario-christ\.de)[^"]*)"/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer"',
    );
  });

  /* ── Atom-Feed unter /blog/feed.xml ────────────────────────
     base zeigt auf /blog/, damit der Feed auf die Uebersicht verweist und
     nicht auf die Startseite. Post-URLs sind root-absolut und werden
     dagegen aufgeloest – das ergibt trotzdem die korrekten vollen URLs. */
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/blog/feed.xml",
    collection: {
      name: "posts",
      limit: 20,
    },
    metadata: {
      language: "de",
      title: "Blog - Mario Christ",
      subtitle:
        "Notizen aus der Praxis: lokale Sprachmodelle, Datenschutz, Infrastruktur.",
      base: "https://mario-christ.de/blog/",
      author: {
        name: "Mario Christ",
      },
    },
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // .html fehlt hier absichtlich – Bestandsseiten sind Passthrough,
    // keine Templates.
    templateFormats: ["md", "njk"],

    /* Kein Template-Engine im Markdown. Klingt nach Einschraenkung, ist aber
       genau richtig fuer die Themen hier: Helm-Charts, GitHub-Action-Snippets
       und Kubernetes-Manifeste stecken voller {{ … }}. Mit aktivem Nunjucks
       wuerde Eleventy die als Variablen lesen und der Build faellt um.
       Posts sind damit reines Markdown.
       Falls doch mal ein Shortcode gebraucht wird: hier auf "njk" stellen und
       Code-Bloecke in {% raw %} … {% endraw %} einpacken. */
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
