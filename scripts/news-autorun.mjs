// Autorun News → LinkedIn "Flujos".
// 1) Marca como publicada la edición cuyo `month` ya llegó (published: null → hoy).
// 2) Bump lastmod de /s/news/ en sitemap.xml (señal SEO de frescura).
// 3) Imprime al Step Summary el pack listo para pegar en LinkedIn:
//    URL de share con UTM + linkedinBody + hashtags (del SSOT).
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";

const CATALOG = "src/data/news-editions.json";
const SITEMAP = "public/sitemap.xml";

const catalog = JSON.parse(readFileSync(CATALOG, "utf8"));
const today = new Date().toISOString().slice(0, 10);   // YYYY-MM-DD
const ym = today.slice(0, 7);                          // YYYY-MM

const toPublish = catalog.editions.filter(
  (e) => !e.published && e.month <= ym
);

if (toPublish.length === 0) {
  console.log("## News autorun\n\nSin ediciones pendientes para " + ym);
  process.exit(0);
}

for (const e of toPublish) e.published = today;
writeFileSync(CATALOG, JSON.stringify(catalog, null, 2) + "\n");

// Sitemap: lastmod del índice y de cada edición publicada
let sm = readFileSync(SITEMAP, "utf8");
sm = sm.replace(
  /(<loc>https:\/\/vientonorte\.io\/s\/news\/<\/loc>\s*<lastmod>)[^<]+/,
  `$1${today}`
);
for (const e of toPublish) {
  const re = new RegExp(
    `(<loc>https:\\/\\/vientonorte\\.io\\/s\\/news\\/${e.slug}\\/<\\/loc>\\s*<lastmod>)[^<]+`
  );
  sm = sm.replace(re, `$1${today}`);
}
writeFileSync(SITEMAP, sm);

// Pack de share (Step Summary + output para el job)
const lines = ["## 📣 Pack LinkedIn · newsletter Flujos", ""];
for (const e of toPublish) {
  const shareUrl =
    `${catalog.canonicalIndex}${e.slug}/` +
    `?utm_source=linkedin&utm_medium=organic` +
    `&utm_campaign=news_seo&utm_content=${encodeURIComponent(e.slug)}`;
  lines.push(
    `### ${e.title.es}`,
    ``,
    `**URL de share (OG estático):** ${shareUrl}`,
    ``,
    `**Cuerpo (pegar en el artículo del newsletter):**`,
    ``,
    e.linkedinBody,
    ``,
    `**Hashtags:** ${e.hashtags.join(" ")}`,
    ``,
    `**CTA:** ${catalog.ctaUrl}`,
    ``,
    `---`,
    ``
  );
}
const summary = lines.join("\n");
console.log(summary);
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, "published=true\n");
}
