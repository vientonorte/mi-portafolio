import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const script = resolve(__dirname, "../../../scripts/check-dist-no-placeholders.sh");
const dirs: string[] = [];

function dist(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), "guard-dist-"));
  dirs.push(dir);
  const all = { "index.html": '<div id="root"></div>', ...files };
  for (const [name, body] of Object.entries(all)) {
    const path = join(dir, name);
    mkdirSync(resolve(path, ".."), { recursive: true });
    writeFileSync(path, body);
  }
  return dir;
}

function run(dir: string): number {
  return spawnSync("bash", [script], { env: { ...process.env, DIST: dir }, encoding: "utf8" }).status ?? -1;
}

afterEach(() => {
  while (dirs.length) rmSync(dirs.pop()!, { recursive: true, force: true });
});

describe("guard check-dist-no-placeholders.sh (TL 9-oct)", () => {
  it("pasa con un dist limpio, incluidas vistas hash internas y data-placeholder de Radix", () => {
    const dir = dist({
      "servicios/index.html": '<a href="/qa/#/sobre-mi">x</a><a href="#/proyectos">y</a><a href="https://vientonorte.io/#/contacto">z</a>',
      "assets/app.js": 'const a={to:"/sobre-mi"},b={href:"/#/proyectos"};x={"data-placeholder":y?"":void 0};const n="https://otro.cl/news/";',
    });
    expect(run(dir)).toBe(0);
  });

  it("falla con el texto «Imagen pendiente de exportar»", () => {
    expect(run(dist({ "servicios/index.html": "<p>Imagen pendiente de exportar</p>" }))).toBe(1);
  });

  it("falla con el marcador de PendingSlot (pendiente-ro) en HTML o JS", () => {
    expect(run(dist({ "x/index.html": '<div data-placeholder="pendiente-ro"></div>' }))).toBe(1);
    expect(run(dist({ "assets/m.js": "var s=`pendiente-ro`;" }))).toBe(1);
  });

  it.each([
    '<a href="/#/news">n</a>',
    '<a href="#/news">n</a>',
    '<a href="/qa/#/news/edicion-1/">n</a>',
    '<a href="/news/">n</a>',
    '<a href="https://vientonorte.io/news/">n</a>',
    "<a href='/qa/news/'>n</a>",
  ])("falla con href a News en HTML: %s", (html) => {
    expect(run(dist({ "servicios/index.html": html }))).toBe(1);
  });

  it.each(['n={to:"/news/"+s}', "n={href:`/#/news/${s}`}", 'n={to:"/news"}'])("falla con href/to a News en JS: %s", (js) => {
    expect(run(dist({ "assets/a.js": js }))).toBe(1);
  });

  it("sin index.html devuelve 2", () => {
    const dir = mkdtempSync(join(tmpdir(), "guard-empty-"));
    dirs.push(dir);
    expect(run(dir)).toBe(2);
  });
});
