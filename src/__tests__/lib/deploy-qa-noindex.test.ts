import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(resolve(process.cwd(), ".github/workflows/deploy-qa.yml"), "utf8");

/** Extrae el bloque `# noindex:begin … # noindex:end` del step de deploy-qa. */
function noindexScript(): string {
  const lines = workflow.split("\n");
  const start = lines.findIndex((l) => l.includes("# noindex:begin"));
  const end = lines.findIndex((l) => l.includes("# noindex:end"));
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return lines
    .slice(start, end + 1)
    .map((l) => l.replace(/^ {10}/, ""))
    .join("\n");
}

describe("deploy-qa noindex covers nested dist/**/*.html", () => {
  it("uses find over dist, not only index.html/404.html", () => {
    const script = noindexScript();
    expect(script).toMatch(/find dist -type f -name '\*\.html'/);
  });

  it("injects/normalizes robots noindex in nested pages, idempotently", () => {
    const dir = mkdtempSync(join(tmpdir(), "vn-qa-noindex-"));
    try {
      const dist = join(dir, "dist");
      mkdirSync(join(dist, "servicios", "consultoria-ux-pymes"), { recursive: true });
      writeFileSync(join(dist, "index.html"), '<!doctype html><html><head><meta name="robots" content="index, follow" /></head><body><header></header></body></html>');
      writeFileSync(join(dist, "servicios", "index.html"), "<!doctype html><html lang=\"es\"><head>\n<title>x</title></head><body></body></html>");
      writeFileSync(
        join(dist, "servicios", "consultoria-ux-pymes", "index.html"),
        '<html><head lang="es"><meta name="robots" content="noindex, follow"></head><body></body></html>'
      );
      writeFileSync(join(dist, "google5858e011b32ea566.html"), "google-site-verification: google5858e011b32ea566.html");
      writeFileSync(join(dir, "step.sh"), `set -euo pipefail\n${noindexScript()}\n`);
      const run = () => execFileSync("bash", [join(dir, "step.sh")], { cwd: dir });
      run();
      const files = ["index.html", "servicios/index.html", "servicios/consultoria-ux-pymes/index.html"];
      const snapshot = files.map((f) => readFileSync(join(dist, f), "utf8"));
      for (const html of snapshot) {
        expect(html.match(/name="robots"/g)).toHaveLength(1);
        expect(html).toContain('<meta name="robots" content="noindex, nofollow" />');
        expect(html).not.toContain("index, follow");
      }
      expect(snapshot[0]).toContain("<header></header>");
      run(); // idempotente
      expect(files.map((f) => readFileSync(join(dist, f), "utf8"))).toEqual(snapshot);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
