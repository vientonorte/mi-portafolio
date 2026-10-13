import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { WEBP_SIBLINGS, webpSiblingOf } from "../../lib/webp-siblings";
import { NAVIGABLE_PROTOTYPES } from "../../data/navigable-prototypes";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("webp siblings", () => {
  it("cada entrada existe en public/", () => {
    for (const f of WEBP_SIBLINGS) expect(existsSync(join("public", f)), f).toBe(true);
  });
  it("la lista cubre todo .webp con hermano png/jpg", () => {
    const found = walk("public/images")
      .filter((f) => f.endsWith(".webp"))
      .map((f) => f.replace(/^public\//, ""))
      .filter((f) => ["png", "jpg"].some((e) => existsSync(join("public", f.replace(/\.webp$/, `.${e}`)))));
    expect([...WEBP_SIBLINGS].sort()).toEqual(found.sort());
  });
  it("respeta BASE_URL y query", () => {
    const base = import.meta.env.BASE_URL || "/";
    expect(webpSiblingOf(`${base}images/consultoria/x-cms-dashboard.png?v=1`)).toBe(
      `${base}images/consultoria/x-cms-dashboard.webp?v=1`,
    );
    expect(webpSiblingOf(`${base}images/cases/monitas/01-wireframe.jpg`)).toBeNull();
  });
});

describe("prototipos navegables", () => {
  it("solo URLs https de Figma reales del repo, incluye Claro", () => {
    expect(NAVIGABLE_PROTOTYPES.length).toBeGreaterThanOrEqual(6);
    for (const p of NAVIGABLE_PROTOTYPES) {
      expect(p.url).toMatch(/^https:\/\/(www\.figma\.com\/(proto|design)\/|[a-z-]+-\d+\.figma\.site)/);
      expect(p.url).not.toMatch(/vnmkt/i);
    }
    expect(NAVIGABLE_PROTOTYPES.some((p) => p.client.startsWith("Claro"))).toBe(true);
  });
});
