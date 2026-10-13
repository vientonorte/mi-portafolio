#!/usr/bin/env node
/**
 * Falla si algún <loc> de dist/sitemap.xml no responde 200 (sin seguir redirecciones) en el
 * preview del build. Puerto 4180 por defecto (SITEMAP_200_PORT); 4173 está prohibido.
 * Uso: npm run build && npm run qa:sitemap-200
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const PORT = Number(process.env.SITEMAP_200_PORT || 4180);
if (PORT === 4173) throw new Error("sitemap-200: el puerto 4173 está reservado; usa otro");
const ORIGIN = JSON.parse(readFileSync("src/data/sitemap-canon.json", "utf8")).origin;
const locs = [...readFileSync("dist/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!locs.length) throw new Error("sitemap-200: dist/sitemap.xml sin <loc>");

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"], {
  stdio: ["ignore", "pipe", "inherit"],
  detached: true,
});
const base = `http://127.0.0.1:${PORT}`;
let fail = 0;
try {
  for (let i = 0; ; i++) {
    try { await fetch(base + "/"); break; } catch { if (i > 60) throw new Error("preview no levantó"); await new Promise((r) => setTimeout(r, 500)); }
  }
  for (const loc of locs) {
    const url = base + loc.slice(ORIGIN.length);
    const res = await fetch(url, { redirect: "manual" });
    console.log(`${res.status} ${url}`);
    if (res.status !== 200) fail++;
  }
} finally {
  try { process.kill(-server.pid); } catch { /* preview ya terminó */ }
}
if (fail) { console.error(`sitemap-200: ${fail} loc sin 200`); process.exit(1); }
console.log(`sitemap-200: ${locs.length} loc OK`);
