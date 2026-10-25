#!/usr/bin/env node
// Gate: toda imagen referenciada por dist/sobre-mi/index.html existe en dist
// (lo que GitHub Pages serviría con 200). Falla si alguna falta o está vacía.
// Si /sobre-mi/ es el stub de redirección (meta refresh o location.replace),
// valida que el destino sea https://ro.vientonorte.io y sale 0.
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const REDIRECT_HOST = "ro.vientonorte.io";

/** Destinos de redirección del HTML (meta refresh / location.replace). */
export function findRedirectTargets(html) {
  const targets = [];
  for (const m of html.matchAll(/<meta\b[^>]*http-equiv=["']?refresh["']?[^>]*>/gi)) {
    const c = m[0].match(/content=["'][^"']*?url=([^"';\s]+)/i);
    if (c) targets.push(c[1]);
  }
  for (const m of html.matchAll(/location\.replace\(\s*["'`]([^"'`]+)["'`]/g)) targets.push(m[1]);
  return targets;
}

/** null si no es stub; {ok, targets} si lo es. */
export function checkRedirectStub(html) {
  const targets = findRedirectTargets(html);
  if (targets.length === 0) return null;
  const ok = targets.every((t) => {
    try {
      const u = new URL(t);
      return u.protocol === "https:" && u.hostname === REDIRECT_HOST;
    } catch {
      return false;
    }
  });
  return { ok, targets };
}

export function checkImages(html, dist) {
  const refs = new Set();
  for (const m of html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]+)"/gi))
    for (const part of m[1].split(",")) refs.add(part.trim().split(/\s+/)[0]);
  const missing = [];
  let local = 0;
  for (const ref of refs) {
    if (!ref || /^(https?:)?\/\//.test(ref) || ref.startsWith("data:")) continue;
    const path = decodeURIComponent(ref.split(/[?#]/)[0]).replace(/^\/(qa\/)?/, "");
    const file = join(dist, path);
    local++;
    if (!existsSync(file) || statSync(file).size === 0) missing.push(ref);
  }
  return { local, missing };
}

/** Devuelve el exit code. */
export function run(dist = "dist", log = console.log, err = console.error) {
  const html = readFileSync(join(dist, "sobre-mi/index.html"), "utf8");
  const stub = checkRedirectStub(html);
  if (stub) {
    if (stub.ok) {
      log(`/sobre-mi/: stub de redirección → ${stub.targets.join(", ")} (OK)`);
      return 0;
    }
    err(`/sobre-mi/: stub redirige fuera de https://${REDIRECT_HOST}: ${stub.targets.join(", ")}`);
    return 1;
  }
  const { local, missing } = checkImages(html, dist);
  for (const ref of missing) err(`MISSING in dist: ${ref}`);
  if (local === 0) {
    err("dist/sobre-mi/index.html no referencia ninguna imagen local");
    return 1;
  }
  log(`/sobre-mi/: ${local} imágenes locales, ${missing.length} faltantes`);
  return missing.length ? 1 : 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  process.exit(run(process.argv[2] || "dist"));
}
