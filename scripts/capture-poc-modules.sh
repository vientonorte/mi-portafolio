#!/usr/bin/env bash
# Captura mockups reales X|CMS → public/images/poc-modules/{dashboard,riesgo,inventario,pedidos,clientes,reportes}.png
# Fuente: https://pouch-growl-74881457.figma.site (login admin demo)
# Uso: bash scripts/capture-poc-modules.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/poc-modules"
XCMS_URL="${XCMS_URL:-https://pouch-growl-74881457.figma.site}"

mkdir -p "$OUT"
cd "$ROOT"

node --input-type=module <<'JS'
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("public/images/poc-modules");
const BASE = process.env.XCMS_URL || "https://pouch-growl-74881457.figma.site";
fs.mkdirSync(OUT_DIR, { recursive: true });

async function login(page, user, pass) {
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1000);
  const inputs = page.locator("input");
  await inputs.nth(0).fill(user);
  await inputs.nth(1).fill(pass);
  await page.getByRole("button", { name: /iniciar/i }).click();
  await page.waitForTimeout(2800);
  await page.getByText("Dashboard", { exact: true }).first().waitFor({ timeout: 15000 });
}

async function clickNavExact(page, label) {
  const how = await page.evaluate((label) => {
    const nodes = Array.from(
      document.querySelectorAll('a,button,[role="button"],div,span,li')
    );
    const exact = nodes.find(
      (n) => (n.textContent || "").trim() === label && n.offsetParent !== null
    );
    if (exact) {
      exact.click();
      return "exact";
    }
    return null;
  }, label);
  await page.waitForTimeout(1600);
  return how;
}

async function shot(page, name) {
  const out = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: out, fullPage: false });
  const bytes = fs.statSync(out).size;
  console.log(`✓ ${name}.png (${bytes} bytes)`);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await login(page, "admin@cms.com", "admin123");

/** Nav label X|CMS → archivo POC */
const map = [
  ["dashboard", "Dashboard"],
  ["riesgo", "Dashboard Financiero"], // control financiero / alertas
  ["inventario", "Productos"],
  ["pedidos", "POS"],
  ["clientes", "Clientes"],
  ["reportes", "Reportes"],
];

for (const [id, label] of map) {
  const how = await clickNavExact(page, label);
  if (!how) console.warn(`! no click: ${label}`);
  await shot(page, id);
}

await browser.close();
console.log(`✓ Mockups en ${OUT_DIR}`);
JS

echo "Listo. Wire: portfolioImages.pocModules → POC tour."
ls -la "$OUT"/*.png
