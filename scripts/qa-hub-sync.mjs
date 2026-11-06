#!/usr/bin/env node
// Sincroniza dist/ → <hub>/qa/ SIN borrar subcarpetas ajenas (p. ej. qa/antropologia-corrupcion/).
// Solo elimina lo que este deploy publicó antes (manifiesto qa/.qa-managed.json) o lo que
// el nuevo dist vuelve a escribir. Todo lo demás en qa/ se preserva.
// Uso: node scripts/qa-hub-sync.mjs <dist> <hub-qa-dir>
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const MANIFEST = ".qa-managed.json";
/** Nunca se borran aunque el manifiesto las liste (publicadas por otros repos). */
export const PROTECTED = new Set(["antropologia-corrupcion"]);
/** Entradas de mi-portafolio previas al manifiesto (primer deploy con este script). */
export const LEGACY_MANAGED = [
  "assets", "auditoria", "fonts", "images", "mi-portafolio", "news", "noticias", "poc",
  "resources", "s", "servicios", "sobre-mi", "README-QA.txt",
];

export function syncQaHub(distDir, qaDir) {
  mkdirSync(qaDir, { recursive: true });
  const manifestPath = join(qaDir, MANIFEST);
  let previous;
  if (existsSync(manifestPath)) {
    previous = JSON.parse(readFileSync(manifestPath, "utf8")).entries ?? [];
  } else {
    // Sin manifiesto: lo heredado de mi-portafolio = entradas legacy conocidas + archivos sueltos de raíz
    // (index.html, sitemap.xml…). Las subcarpetas desconocidas se preservan.
    previous = readdirSync(qaDir, { withFileTypes: true })
      .filter((d) => !d.isDirectory() || LEGACY_MANAGED.includes(d.name))
      .map((d) => d.name);
  }
  const next = readdirSync(distDir);
  const removed = [];
  for (const name of new Set([...previous, ...next])) {
    if (PROTECTED.has(name) || name === MANIFEST) continue;
    const p = join(qaDir, name);
    if (existsSync(p)) { rmSync(p, { recursive: true, force: true }); removed.push(name); }
  }
  for (const name of next) {
    if (PROTECTED.has(name)) throw new Error(`dist/ no puede publicar en qa/${name} (carpeta protegida)`);
    cpSync(join(distDir, name), join(qaDir, name), { recursive: true });
  }
  writeFileSync(manifestPath, JSON.stringify({ entries: [...next].sort() }, null, 2) + "\n");
  const preserved = readdirSync(qaDir).filter((n) => n !== MANIFEST && !next.includes(n));
  return { removed, written: next, preserved };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [dist, qa] = process.argv.slice(2);
  if (!dist || !qa) { console.error("uso: qa-hub-sync.mjs <dist> <hub-qa-dir>"); process.exit(2); }
  const r = syncQaHub(dist, qa);
  console.log(`qa-hub-sync: escritas ${r.written.length}, preservadas: ${r.preserved.join(", ") || "—"}`);
}
