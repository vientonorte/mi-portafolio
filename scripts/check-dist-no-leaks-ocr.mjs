#!/usr/bin/env node
// OCR de dist/**/*.{png,jpg,jpeg,webp}. El texto pasa por el mismo tokenizador
// sha256 que check-dist-no-leaks.mjs (con pliegue de acentos). No imprime el texto.
// Omite imágenes cuyo lado mayor mide menos de 200 px. Uso: node scripts/check-dist-no-leaks-ocr.mjs [dist]
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join, relative } from "node:path";
import { findDeniedTokens } from "./check-dist-no-leaks.mjs";

const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const MIN_SIDE = 200;

function hasBin(bin, args) {
  try {
    execFileSync(bin, args, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function dimensions(file) {
  const out = execFileSync(
    "ffprobe",
    ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=s=x:p=0", file],
    { encoding: "utf8" },
  ).trim();
  const [width, height] = out.split("x").map((n) => Number.parseInt(n, 10));
  if (!width || !height) throw new Error(`sin medidas: ${file}`);
  return { width, height };
}

function ocrImage(file, work) {
  const ext = extname(file).toLowerCase();
  let src = file;
  if (ext === ".webp") {
    src = join(work, `${relative(".", file).replace(/[^\w.-]+/g, "_")}.png`);
    execFileSync("ffmpeg", ["-y", "-v", "error", "-i", file, src], { stdio: "ignore" });
  }
  return execFileSync("tesseract", [src, "stdout", "-l", "spa+eng"], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
}

export function scanImages(root) {
  if (!hasBin("tesseract", ["--version"])) throw new Error("falta tesseract (tesseract-ocr y tesseract-ocr-spa)");
  if (!hasBin("ffprobe", ["-version"]) || !hasBin("ffmpeg", ["-version"])) {
    throw new Error("falta ffmpeg/ffprobe para medir y convertir webp");
  }
  const hits = [];
  let scanned = 0;
  let skipped = 0;
  const work = mkdtempSync(join(tmpdir(), "vn-ocr-"));
  const started = Date.now();

  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name);
      if (statSync(abs).isDirectory()) {
        walk(abs);
        continue;
      }
      if (!RASTER.has(extname(name).toLowerCase())) continue;
      const { width, height } = dimensions(abs);
      if (Math.max(width, height) < MIN_SIDE) {
        skipped += 1;
        continue;
      }
      scanned += 1;
      const text = ocrImage(abs, work);
      for (const hash of findDeniedTokens(text)) {
        hits.push(`${relative(root, abs)} → ${hash}`);
      }
    }
  }

  try {
    if (!existsSync(root)) throw new Error(`falta ${root}`);
    walk(root);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
  return { hits, scanned, skipped, ms: Date.now() - started };
}

if (process.argv[1]?.endsWith("check-dist-no-leaks-ocr.mjs")) {
  const root = process.argv[2] || "dist";
  const { hits, scanned, skipped, ms } = scanImages(root);
  const seconds = (ms / 1000).toFixed(1);
  if (hits.length) {
    console.error(`❌ OCR denegado en ${root}/ (${hits.length}, ${seconds}s, ${scanned} imágenes, ${skipped} <${MIN_SIDE}px):`);
    for (const hit of hits) console.error(`  - ${hit}`);
    process.exit(1);
  }
  console.log(`✅ OCR ${root}/ sin tokens denegados — ${scanned} imágenes, ${skipped} omitidas (<${MIN_SIDE}px), ${seconds}s`);
}
