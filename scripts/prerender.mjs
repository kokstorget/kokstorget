// Renders every route to static HTML after `vite build`, so crawlers and link previews
// get each page's own title, meta tags, structured data and content without running JS.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");
const SITE_URL = "https://kokstorget.se";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/inspiration", changefreq: "monthly", priority: "0.8" },
  { path: "/kundcase", changefreq: "monthly", priority: "0.8" },
  { path: "/guider", changefreq: "weekly", priority: "0.8" },
  { path: "/partners", changefreq: "monthly", priority: "0.7" },
  { path: "/om-oss", changefreq: "monthly", priority: "0.6" },
  { path: "/anslut", changefreq: "monthly", priority: "0.6" },
];

const template = readFileSync(resolve(dist, "index.html"), "utf-8");
const { prefetch, render, fallbackGuides } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

const { queryClient, guides: sanityGuides } = await prefetch();
const guides = sanityGuides.length
  ? sanityGuides.map((g) => ({ slug: g.slug, lastmod: g._updatedAt ?? g.publishedAt }))
  : fallbackGuides.map((g) => ({ slug: g.slug, lastmod: g.publishedAt }));
if (!sanityGuides.length) console.warn("prerender: no guides from Sanity, using fallback guides");

const fill = ({ head, html, state }) =>
  template
    .replace("<!--head-outlet-->", head)
    .replace("<!--app-outlet-->", html)
    .replace(
      "<!--state-outlet-->",
      state
        ? `<script>window.__QUERY_STATE__=${JSON.stringify(state).replace(/</g, "\\u003c")}</script>`
        : ""
    );

const write = (file, content) => {
  const target = resolve(dist, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
};

// Untouched shell for guides published after the last build (see vercel.json rewrite)
write("app-shell.html", fill({ head: "", html: "", state: null }));

const pages = [...STATIC_ROUTES.map((r) => r.path), ...guides.map((g) => `/guider/${g.slug}`)];
for (const path of pages) {
  const file = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  write(file, fill(render(path, queryClient)));
}

// Vercel serves 404.html with a 404 status for paths that match no file
write("404.html", fill(render("/sidan-finns-inte", queryClient)));

const urls = [
  ...STATIC_ROUTES.map(
    (r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  ),
  ...guides.map(
    (g) => `  <url>\n    <loc>${SITE_URL}/guider/${g.slug}</loc>\n    <lastmod>${g.lastmod.slice(0, 10)}</lastmod>\n    <priority>0.7</priority>\n  </url>`
  ),
];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: ${pages.length} pages, 404.html, app-shell.html and sitemap.xml written`);
