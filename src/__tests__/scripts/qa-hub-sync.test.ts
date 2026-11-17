import { describe, expect, it, beforeEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
// @ts-expect-error — módulo .mjs sin tipos (script de deploy QA)
import { syncQaHub } from "../../../scripts/qa-hub-sync.mjs";

function put(p: string, body = "x") {
  mkdirSync(join(p, ".."), { recursive: true });
  writeFileSync(p, body);
}

describe("qa-hub-sync: deploy QA no borra subcarpetas ajenas de qa/", () => {
  let dist: string, qa: string;
  beforeEach(() => {
    const root = mkdtempSync(join(tmpdir(), "qa-hub-"));
    dist = join(root, "dist");
    qa = join(root, "hub", "qa");
    put(join(dist, "index.html"), "new");
    put(join(dist, "assets", "main-NEW.js"));
    put(join(dist, "sobre-mi", "index.html"), "new");
    // hub previo: publicado por mi-portafolio + carpetas de otros repos
    put(join(qa, "index.html"), "old");
    put(join(qa, "assets", "main-OLD.js"));
    put(join(qa, "servicios", "index.html"), "old");
    put(join(qa, "antropologia-corrupcion", "index.html"), "otro repo");
    put(join(qa, "otro-proyecto", "index.html"), "otro repo");
  });

  it("primer deploy (sin manifiesto): reemplaza lo de mi-portafolio y preserva lo ajeno", () => {
    const r = syncQaHub(dist, qa);
    expect(readFileSync(join(qa, "index.html"), "utf8")).toBe("new");
    expect(existsSync(join(qa, "assets", "main-OLD.js"))).toBe(false);
    expect(existsSync(join(qa, "assets", "main-NEW.js"))).toBe(true);
    expect(existsSync(join(qa, "servicios"))).toBe(false);
    expect(readFileSync(join(qa, "antropologia-corrupcion", "index.html"), "utf8")).toBe("otro repo");
    expect(existsSync(join(qa, "otro-proyecto", "index.html"))).toBe(true);
    expect(r.preserved).toEqual(expect.arrayContaining(["antropologia-corrupcion", "otro-proyecto"]));
  });

  it("deploys siguientes (con manifiesto): borra lo que publicó antes y ya no está; preserva lo ajeno", () => {
    syncQaHub(dist, qa);
    put(join(qa, "antropologia-corrupcion", "nuevo.html"), "otro repo 2");
    const dist2 = join(dist, "..", "dist2");
    put(join(dist2, "index.html"), "v2");
    syncQaHub(dist2, qa);
    expect(readFileSync(join(qa, "index.html"), "utf8")).toBe("v2");
    expect(existsSync(join(qa, "sobre-mi"))).toBe(false);
    expect(existsSync(join(qa, "assets"))).toBe(false);
    expect(existsSync(join(qa, "antropologia-corrupcion", "nuevo.html"))).toBe(true);
    expect(existsSync(join(qa, "otro-proyecto", "index.html"))).toBe(true);
  });

  it("dist no puede pisar qa/antropologia-corrupcion", () => {
    put(join(dist, "antropologia-corrupcion", "index.html"));
    expect(() => syncQaHub(dist, qa)).toThrow(/protegida/);
  });
});

describe("deploy-qa.yml usa qa-hub-sync y no hace rm -rf qa", () => {
  it("workflow", () => {
    const y = readFileSync(join(__dirname, "../../../.github/workflows/deploy-qa.yml"), "utf8");
    expect(y).not.toMatch(/rm -rf qa\b/);
    expect(y).toMatch(/qa-hub-sync\.mjs/);
    expect(y).toMatch(/group: vientonorte-hub-push/);
  });
});
