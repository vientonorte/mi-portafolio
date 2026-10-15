#!/usr/bin/env node
// Gate de anonimización: el cliente anonimizado no debe aparecer en dist/.
// Falla (case-insensitive) por /edu[ _-]?21/ en: nombres de archivo, contenido
// HTML/JS/JSON/XML (+ css/svg/txt/webmanifest) y texto de PDFs (pdftotext).
// Uso: node scripts/check-dist-no-edu21.mjs [dist]
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.argv[2] || "dist";
const RE = /edu[ _-]?21/i;
const TEXT = new Set([".html", ".htm", ".js", ".mjs", ".cjs", ".json", ".xml", ".css", ".svg", ".txt", ".webmanifest", ".map"]);
const hits = [];
let files = 0, pdfs = 0;

function hasPdftotext() {
  try { execFileSync("pdftotext", ["-v"], { stdio: "ignore" }); return true; } catch { return false; }
}
const pdfOk = hasPdftotext();

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = relative(root, p);
    if (RE.test(name)) hits.push(`nombre de archivo: ${rel}`);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    files++;
    const ext = extname(name).toLowerCase();
    if (TEXT.has(ext)) {
      const txt = readFileSync(p, "utf8");
      const m = txt.match(RE);
      if (m) hits.push(`contenido: ${rel} → «${txt.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, " ")}»`);
    } else if (ext === ".pdf") {
      pdfs++;
      if (!pdfOk) { hits.push(`PDF sin verificar (falta pdftotext): ${rel}`); continue; }
      const txt = execFileSync("pdftotext", ["-q", p, "-"], { maxBuffer: 64 * 1024 * 1024 }).toString();
      if (RE.test(txt)) hits.push(`texto PDF: ${rel}`);
    }
  }
}

walk(root);
if (hits.length) {
  console.error(`❌ /edu[ _-]?21/i encontrado en ${root}/ (${hits.length}):`);
  for (const h of hits) console.error(`  - ${h}`);
  process.exit(1);
}
console.log(`✅ ${root}/ sin /edu[ _-]?21/i — ${files} archivos, ${pdfs} PDF revisados (pdftotext ${pdfOk ? "ok" : "n/a"})`);
