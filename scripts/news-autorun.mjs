// Autorun News → LinkedIn "Flujos".
// 1) Marca como publicada la edición cuyo `month` ya llegó (published: null → hoy).
// 2) (Retirado 2026-09-27) El sitemap solo lista home + /servicios/ y lo escribe
//    scripts/generate-service-landings.py; News (/#/news) no va al sitemap.
// 3) Imprime al Step Summary el pack listo para pegar en LinkedIn:
//    URL de share con UTM + linkedinBody + hashtags (del SSOT).
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";

const CATALOG = "src/data/news-editions.json";

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

// Pack de share (Step Summary + output para el job)
const lines = ["## 📣 Pack LinkedIn · newsletter Flujos", ""];
for (const e of toPublish) {
  const shareUrl =
    `${catalog.spaIndex.replace(/\/+$/, "")}/${e.slug}/` +
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
