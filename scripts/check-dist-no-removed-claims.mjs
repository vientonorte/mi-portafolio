#!/usr/bin/env node
/* global console, process */
// Gate: las afirmaciones retiradas de la trayectoria no deben volver a dist/
// (SURA −40 %, «5+ países», «17 participantes», NPS 72, «etnógrafo certificado»).
// Además exige la redacción exacta de los certificados en la ficha /sobre-mi/.
// Uso: node scripts/check-dist-no-removed-claims.mjs [dist]
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { findRemovedClaims, REQUIRED_WORDING } from "./removed-claims.mjs";

const root = process.argv[2] || "dist";
const TEXT = new Set([".html", ".htm", ".js", ".mjs", ".cjs", ".json", ".xml", ".txt", ".webmanifest", ".map"]);
const hits = [];
let files = 0;
let corpus = "";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!TEXT.has(extname(name).toLowerCase())) continue;
    files++;
    const txt = readFileSync(p, "utf8");
    for (const h of findRemovedClaims(txt)) hits.push(`${relative(root, p)} [${h.id}] «${h.snippet}»`);
    if (!name.endsWith(".map")) corpus += txt;
  }
}

if (!existsSync(root)) { console.error(`❌ ${root}/ no existe (corre el build antes)`); process.exit(1); }
walk(root);
for (const re of REQUIRED_WORDING) if (!re.test(corpus)) hits.push(`falta la redacción exacta ${re}`);
if (!existsSync(join(root, "sobre-mi", "index.html"))) hits.push("falta sobre-mi/index.html");
if (hits.length) {
  console.error(`❌ Afirmaciones retiradas en ${root}/ (${hits.length}):`);
  for (const h of hits) console.error(`  - ${h}`);
  process.exit(1);
}
console.log(`✅ ${root}/ sin afirmaciones retiradas y con redacción exacta de certificados — ${files} archivos revisados`);
