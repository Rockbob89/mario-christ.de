/* Directory-Data: gilt fuer alle Posts in diesem Ordner.

   Permalink als Funktion statt als "{{ page.fileSlug }}"-String, weil im
   Markdown kein Template-Engine mehr laeuft (siehe markdownTemplateEngine
   in eleventy.config.js). Die Funktion ist davon unabhaengig.

   Dateiname = Slug: blog/posts/beispiel-post.md -> /blog/beispiel-post/ */

export default {
  layout: "blog-post.njk",
  permalink: (data) => `/blog/${data.page.fileSlug}/index.html`,
};
