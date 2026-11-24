import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(process.cwd(), "src/imports");

function filesIn(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...filesIn(path));
    else if (/\.(tsx|ts|jsx|js)$/.test(name)) out.push(path);
  }
  return out;
}

/** Etiqueta de apertura `<a` cuyo tag no declara href. */
function anchorsWithoutHref(source: string): string[] {
  const hits: string[] = [];
  const re = /<a\b[^>]*>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source))) {
    if (!/\bhref\s*=/.test(match[0])) {
      const line = source.slice(0, match.index).split("\n").length;
      hits.push(`${line}: ${match[0]}`);
    }
  }
  return hits;
}

describe("src/imports", () => {
  it("tiene 0 <a sin href", () => {
    const offenders: string[] = [];
    for (const file of filesIn(ROOT)) {
      const source = readFileSync(file, "utf8");
      for (const hit of anchorsWithoutHref(source)) {
        offenders.push(`${file.slice(ROOT.length + 1)}:${hit}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
