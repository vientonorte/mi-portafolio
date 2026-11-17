#!/usr/bin/env node
// Gate de anonimización. Tokeniza el texto de dist (minúsculas, palabras
// alfanuméricas y bigramas de palabras vecinas, ya sin espacio ni guion),
// hashea cada token y falla si el hash está en la lista. La lista no guarda
// el texto en claro. Uso: node scripts/check-dist-no-leaks.mjs [dist]
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

export const DENY_HASHES = [
  "b8b9d5d91dc6b98ea0d5eeea0e95e96f6c1201e2ba1740c8773eaf39b25c9881",
  "3c1163420b32a1b11465ce534a2fe7b9c819d9d8109df9e023f0185e279e48f9",
  "ad8f7dd43df6350a473cd754710f8ca271a5cc69e6be560bca85f653e517559d",
  "a4339da23c4e489645407f9011b73bf861787d509cb55335bb27a97fdcf78ae3",
];

const TEXT = new Set([
  ".html", ".htm", ".js", ".mjs", ".cjs", ".json", ".xml", ".css", ".svg", ".txt", ".webmanifest", ".map",
]);

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

/** NFD y sin marcas diacríticas, para que el OCR y el texto coincidan con la lista. */
export function foldAccents(text) {
  return text.normalize("NFD").replace(/\p{M}/gu, "");
}

/** Palabras [a-z0-9]+ y la unión de cada par vecino (espacio y guion ya no están). */
export function tokensOf(text) {
  const words = foldAccents(text).toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const out = new Set(words);
  for (let i = 0; i < words.length - 1; i += 1) out.add(words[i] + words[i + 1]);
  return out;
}

export function findDeniedTokens(text, deny = new Set(DENY_HASHES)) {
  const hits = new Set();
  for (const token of tokensOf(text)) {
    const hash = sha256(token);
    if (deny.has(hash)) hits.add(hash);
  }
  return [...hits];
}

function hasPdftotext() {
  try {
    execFileSync("pdftotext", ["-v"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

export function scanDist(root, deny = new Set(DENY_HASHES)) {
  const hits = [];
  let files = 0;
  let pdfs = 0;
  const pdfOk = hasPdftotext();

  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name);
      const rel = relative(root, abs);
      for (const hash of findDeniedTokens(name, deny)) hits.push(`nombre de archivo: ${rel} → ${hash}`);
      if (statSync(abs).isDirectory()) {
        walk(abs);
        continue;
      }
      files += 1;
      const ext = extname(name).toLowerCase();
      if (TEXT.has(ext)) {
        for (const hash of findDeniedTokens(readFileSync(abs, "utf8"), deny)) {
          hits.push(`contenido: ${rel} → ${hash}`);
        }
      } else if (ext === ".pdf") {
        pdfs += 1;
        if (!pdfOk) {
          hits.push(`PDF sin verificar (falta pdftotext): ${rel}`);
          continue;
        }
        const txt = execFileSync("pdftotext", ["-q", abs, "-"], { maxBuffer: 64 * 1024 * 1024 }).toString();
        for (const hash of findDeniedTokens(txt, deny)) hits.push(`texto PDF: ${rel} → ${hash}`);
      }
    }
  }

  if (!existsSync(root)) throw new Error(`falta ${root}`);
  walk(root);
  const casoDir = join(root, "casos");
  if (existsSync(casoDir)) {
    let casoHtml = 0;
    function count(dir) {
      for (const name of readdirSync(dir)) {
        const abs = join(dir, name);
        if (statSync(abs).isDirectory()) count(abs);
        else if (name.endsWith(".html")) casoHtml += 1;
      }
    }
    count(casoDir);
    if (casoHtml === 0) hits.push("dist/casos/ existe pero ninguna página HTML de casos fue revisada");
  }
  return { hits, files, pdfs, pdfOk };
}

if (process.argv[1]?.endsWith("check-dist-no-leaks.mjs")) {
  const root = process.argv[2] || "dist";
  const { hits, files, pdfs, pdfOk } = scanDist(root);
  if (hits.length) {
    console.error(`❌ token denegado en ${root}/ (${hits.length}):`);
    for (const hit of hits) console.error(`  - ${hit}`);
    process.exit(1);
  }
  console.log(`✅ ${root}/ sin tokens denegados — ${files} archivos, ${pdfs} PDF revisados (pdftotext ${pdfOk ? "ok" : "n/a"})`);
}
