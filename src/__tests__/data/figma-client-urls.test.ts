import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { FIGMA_ASSETS } from "@/data/figma-assets-ssot";
import {
  VALUE_PROOF_EXTERNAL_URLS,
  VALUE_PROOF_ITEMS,
} from "@/data/value-content-arsenal";
import { SERVICE_PATH_DEMOS } from "@/data/service-path-demos";
import { NAVIGABLE_PROTOTYPES } from "@/data/navigable-prototypes";

/** Keys de archivos Figma de clientes, partidas para que este test no las contenga literal. */
const REMOVED_KEYS = [
  ["AEMOE8Hv", "5iv1nfyR7jlMgO"],
  ["sRPhPaZN", "BewEhLVwu07TFu"],
  ["s5lLcHkN", "alH6p3LKCop7wT"],
  ["MOhbYMwU", "tCSZ8IuJxG41ho"],
  ["xxKiHNAO", "PDpxmfuqyE7N72"],
  ["lrMqvUER", "ZjDwTwZpQRBSC5"],
  ["D39xjsA7", "ObbhntcDEyPWQG"],
  ["xqCj0eIo", "cn9cG6pbPKu6Vy"],
  ["mdWSGYqQ", "trZvrQhvihoEFt"],
  ["1Aks0tH7", "nEkPsxpsvGDHs8"],
  ["2sqtmuru", "oylv9y2cQXZ1Ag"],
  ["58XKEXmM", "Y2x4xpLLCieAog"],
  ["SIXkvFSJ", "Qb4vgKgQiGtbDx"],
  ["ivwCPAxl", "R4iGDtxB9kFt0H"],
] as const;

const ROOT = process.cwd();
const SCAN_ROOTS = ["src", "docs", "scripts", "public"];
const SCAN_FILES = ["CHANGELOG.md", "index.html"];
const SKIP_DIR = new Set(["node_modules", "dist", "dist-ro"]);

function walk(dir: string, acc: string[]) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, acc);
    else if (/\.(ts|tsx|js|mjs|json|html|md|css)$/.test(name)) acc.push(path);
  }
  return acc;
}

function sourceHaystack(): string {
  const files = SCAN_ROOTS.flatMap((dir) => walk(join(ROOT, dir), []));
  for (const file of SCAN_FILES) files.push(join(ROOT, file));
  return files
    .filter((file) => !file.endsWith("figma-client-urls.test.ts"))
    .map((file) => `@@${relative(ROOT, file)}\n${readFileSync(file, "utf8")}`)
    .join("\n");
}

describe("higiene Figma de clientes", () => {
  const keys = REMOVED_KEYS.map(([a, b]) => a + b);

  it("no deja las keys en el SSOT ni en los datos que arman el bundle", () => {
    const runtime = [
      JSON.stringify(FIGMA_ASSETS),
      JSON.stringify(VALUE_PROOF_ITEMS),
      JSON.stringify(VALUE_PROOF_EXTERNAL_URLS),
      JSON.stringify(SERVICE_PATH_DEMOS),
      JSON.stringify(NAVIGABLE_PROTOTYPES),
    ].join("\n");
    for (const key of keys) {
      expect(runtime, key).not.toContain(key);
    }
    expect(FIGMA_ASSETS.find((a) => a.id === "transvip-proto-app")?.url).toBeNull();
    expect(FIGMA_ASSETS.find((a) => a.id === "sura-ria-proto")?.url).toBeNull();
    expect(FIGMA_ASSETS.find((a) => a.id === "claro-tienda-2021")?.url).toBeNull();
    expect(FIGMA_ASSETS.find((a) => a.id === "claro-portal-comercial")?.url).toBeNull();
    expect(FIGMA_ASSETS.find((a) => a.id === "valuesite-avem-proto")?.url).toBeNull();
    expect(FIGMA_ASSETS.find((a) => a.id === "sura-slides-colombia")?.url).toBeNull();
    expect(FIGMA_ASSETS.find((a) => a.id === "calor-vn-escenarios-demanda-sura")?.url).toBeNull();
  });

  it("no deja las keys en src, docs, scripts ni HTML público", () => {
    const haystack = sourceHaystack();
    for (const key of keys) {
      expect(haystack, key).not.toContain(key);
    }
  });
});
