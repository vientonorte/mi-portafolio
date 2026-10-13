#!/usr/bin/env node
// Gate: toda imagen referenciada por dist/sobre-mi/index.html existe en dist
// (lo que GitHub Pages serviría con 200). Falla si alguna falta o está vacía.
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = process.argv[2] || "dist";
const html = readFileSync(join(dist, "sobre-mi/index.html"), "utf8");
const refs = new Set();
for (const m of html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"/g)) refs.add(m[1]);
for (const m of html.matchAll(/\bsrcset="([^"]+)"/gi))
  for (const part of m[1].split(",")) refs.add(part.trim().split(/\s+/)[0]);

let bad = 0;
let local = 0;
for (const ref of refs) {
  if (!ref || /^(https?:)?\/\//.test(ref) || ref.startsWith("data:")) continue;
  const path = decodeURIComponent(ref.split(/[?#]/)[0]).replace(/^\/(qa\/)?/, "");
  const file = join(dist, path);
  local++;
  if (!existsSync(file) || statSync(file).size === 0) {
    console.error(`MISSING in dist: ${ref}`);
    bad++;
  }
}
if (local === 0) {
  console.error("dist/sobre-mi/index.html no referencia ninguna imagen local");
  process.exit(1);
}
console.log(`/sobre-mi/: ${local} imágenes locales, ${bad} faltantes`);
process.exit(bad ? 1 : 0);
