/* Globale Daten fuer den Blog. Die statischen Seiten sind davon nicht
   betroffen, die werden durchgereicht. */

/* ── Preview-Schalter ──────────────────────────────────────────
   Solange PREVIEW true ist:
     - <meta name="robots" content="noindex, nofollow"> auf allen Blog-Seiten
     - /blog taucht in keiner sitemap.xml auf
     - kein Link von den Hauptseiten (das ist Handarbeit, siehe blog/README.md)

   ZUM LAUNCH: die Zeile unten auf `false` setzen. Das ist der ganze Handgriff.
   Fuer einen Test-Build ohne Commit: BLOG_PUBLIC=true npx @11ty/eleventy
   ──────────────────────────────────────────────────────────── */
const PREVIEW = process.env.BLOG_PUBLIC !== "true";

export default {
  url: "https://mario-christ.de",
  title: "Mario Christ",
  author: "Mario Christ",
  // Default-OG-Bild, solange ein Post keins mitbringt
  ogImage: "/img/og-default.jpg",
  blog: {
    preview: PREVIEW,
    title: "Blog",
    description:
      "Notizen aus der Praxis: lokale Sprachmodelle, Datenschutz, Infrastruktur.",
    feed: "/blog/feed.xml",
  },
};
