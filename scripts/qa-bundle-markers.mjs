#!/usr/bin/env node
/* global process, console, fetch, AbortSignal, URL */
/**
 * qa:production · marcadores de bundle sobre el entry Y los chunks que carga.
 *
 * Vite/rolldown puede sacar código del entry (`main-*.js`) a chunks propios
 * que el HTML precarga con `<link rel="modulepreload">` (p. ej.
 * `normalize-hash-url-*.js`). Mirar solo el entry da falsos negativos, así que
 * se revisan todos los JS que referencia el HTML (`<script src>` y
 * `<link rel=modulepreload>`) y el marcador pasa si está en cualquiera.
 *
 * CLI (lo usa scripts/qa-production.sh):
 *   node scripts/qa-bundle-markers.mjs fetch <BASE_URL> <dir>   → baja HTML + JS a <dir>
 *   node scripts/qa-bundle-markers.mjs match <dir> <regex>      → exit 0 si algún JS matchea
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";

const MANIFEST = "manifest.tsv";

function readAttr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  if (!m) return null;
  return m[1] ?? m[2] ?? m[3] ?? null;
}

/**
 * JS que carga el HTML, en orden y sin repetir: `<script src="*.js">` y
 * `<link rel="modulepreload" href="*.js">` (cualquier orden de atributos).
 * @param {string} html
 * @returns {string[]}
 */
export function extractBundleAssets(html) {
  const out = [];
  const seen = new Set();
  const tagRe = /<(script|link)\b[^>]*>/gi;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const tag = m[0];
    const kind = m[1].toLowerCase();
    let ref = null;
    if (kind === "script") {
      ref = readAttr(tag, "src");
    } else {
      const rel = (readAttr(tag, "rel") || "").toLowerCase().split(/\s+/);
      if (rel.includes("modulepreload")) ref = readAttr(tag, "href");
    }
    if (!ref || !/\.m?js(?:[?#].*)?$/i.test(ref)) continue;
    if (seen.has(ref)) continue;
    seen.add(ref);
    out.push(ref);
  }
  return out;
}

/**
 * Resuelve una referencia del HTML contra BASE_URL (con o sin subpath, p. ej.
 * https://vientonorte.io/qa): `/qa/assets/x.js` va contra el origin y
 * `assets/x.js` contra el subpath.
 */
export function resolveAssetUrl(baseUrl, ref) {
  return new URL(ref, `${String(baseUrl).replace(/\/+$/, "")}/`).toString();
}

/**
 * Primer archivo cuyo contenido matchea el patrón (string = regex ERE simple
 * como los de qa-production.sh), o null si no está en ninguno.
 * @param {string | RegExp} pattern
 * @param {{ name: string, content: string }[]} files
 */
export function findMarker(pattern, files) {
  const re = pattern instanceof RegExp ? pattern : new RegExp(pattern);
  for (const file of files) {
    if (re.test(file.content)) return file.name;
  }
  return null;
}

async function cmdFetch(baseUrl, dir) {
  mkdirSync(dir, { recursive: true });
  const htmlUrl = `${String(baseUrl).replace(/\/+$/, "")}/`;
  const htmlRes = await fetch(htmlUrl, { signal: AbortSignal.timeout(25_000) });
  if (!htmlRes.ok) throw new Error(`HTML ${htmlRes.status} ${htmlUrl}`);
  const refs = extractBundleAssets(await htmlRes.text());
  if (refs.length === 0) throw new Error("el HTML no referencia JS");
  const rows = [];
  let failed = 0;
  for (const [i, ref] of refs.entries()) {
    const url = resolveAssetUrl(baseUrl, ref);
    const res = await fetch(url, { signal: AbortSignal.timeout(30_000) }).catch(() => null);
    if (!res || !res.ok) {
      console.error(`· no se pudo bajar ${url} (${res ? res.status : "red"})`);
      failed += 1;
      continue;
    }
    const file = `${String(i).padStart(2, "0")}-${basename(new URL(url).pathname)}`;
    writeFileSync(join(dir, file), await res.text());
    rows.push(`${file}\t${url}`);
  }
  writeFileSync(join(dir, MANIFEST), rows.join("\n"));
  console.log(`${rows.length} JS (entry + modulepreload)${failed ? ` · ${failed} sin bajar` : ""}`);
  return rows.length > 0 ? 0 : 1;
}

function cmdMatch(dir, pattern) {
  const rows = readFileSync(join(dir, MANIFEST), "utf8").split("\n").filter(Boolean);
  const files = rows.map((row) => {
    const [name] = row.split("\t");
    return { name, content: readFileSync(join(dir, name), "utf8") };
  });
  const hit = findMarker(pattern, files);
  if (hit) {
    console.log(hit.replace(/^\d+-/, ""));
    return 0;
  }
  return 1;
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCli) {
  const [cmd, a, b] = process.argv.slice(2);
  try {
    if (cmd === "fetch" && a && b) process.exitCode = await cmdFetch(a, b);
    else if (cmd === "match" && a && b) process.exitCode = cmdMatch(a, b);
    else {
      console.error("uso: qa-bundle-markers.mjs fetch <BASE_URL> <dir> | match <dir> <regex>");
      process.exitCode = 2;
    }
  } catch (err) {
    console.error(`✗ ${err?.message || err}`);
    process.exitCode = 1;
  }
}
