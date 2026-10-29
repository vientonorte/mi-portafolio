import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error — módulo .mjs sin tipos (script de QA)
import { run } from "../../../scripts/check-dist-sobre-mi-images.mjs";

function distWith(html: string, files: Record<string, string> = {}) {
  const dist = mkdtempSync(join(tmpdir(), "sobre-mi-"));
  mkdirSync(join(dist, "sobre-mi"), { recursive: true });
  writeFileSync(join(dist, "sobre-mi/index.html"), html);
  for (const [p, c] of Object.entries(files)) {
    mkdirSync(join(dist, p, ".."), { recursive: true });
    writeFileSync(join(dist, p), c);
  }
  return dist;
}
const quiet = () => {};

describe("check-dist-sobre-mi-images", () => {
  it("stub hacia ro.vientonorte.io pasa (meta refresh + location.replace)", () => {
    const dist = distWith(
      `<meta http-equiv="refresh" content="0; url=https://ro.vientonorte.io/"><script>location.replace("https://ro.vientonorte.io/" + location.search)</script>`,
    );
    expect(run(dist, quiet, quiet)).toBe(0);
  });
  it("stub hacia otro host falla", () => {
    const dist = distWith(`<script>window.location.replace("https://evil.example.com/")</script>`);
    expect(run(dist, quiet, quiet)).toBe(1);
    const meta = distWith(`<meta http-equiv="refresh" content="0;url=https://ro.vientonorte.io.evil.com/">`);
    expect(run(meta, quiet, quiet)).toBe(1);
  });
  it("página normal sin imágenes falla", () => {
    expect(run(distWith("<html><body><h1>Sobre mí</h1></body></html>"), quiet, quiet)).toBe(1);
  });
  it("página normal con imágenes existentes pasa", () => {
    const dist = distWith(`<img src="/images/ro.webp" alt="">`, { "images/ro.webp": "x" });
    expect(run(dist, quiet, quiet)).toBe(0);
  });
  it("página normal con imagen faltante falla", () => {
    expect(run(distWith(`<img src="/images/nada.webp" alt="">`), quiet, quiet)).toBe(1);
  });
});
