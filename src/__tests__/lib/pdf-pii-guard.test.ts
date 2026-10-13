/**
 * TL 13-oct: ningún PDF del repo lleva Gmail, teléfono ni RUT, ni en el texto ni en los metadatos.
 * Sin dependencias: infla los streams FlateDecode (texto de PDFs tipo ReportLab) y revisa el diccionario
 * Info y el XMP. Si hay `pdftotext` (poppler) en la máquina, además extrae el texto real.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { inflateSync } from "node:zlib";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", "coverage", ".vercel"]);
/**
 * Excepción explícita (pendiente de decisión de Rö/TL, 13-oct): CV ATS internos en docs/entregables/,
 * NO publicados en el sitio. Llevan el Gmail personal. Sacarlos de aquí apenas se limpien o se borren.
 */
const KNOWN_PENDING = new Set([
  "docs/entregables/Rodrigo-Gaete-CV-ES-ATS.pdf",
  "docs/entregables/Rodrigo-Gaete-CV-EN-ATS.pdf",
]);
const PII = [/@gmail\.com/i, /\+?56[\s.-]?9[\s.-]?\d{4}[\s.-]?\d{4}/, /\bRUT\b/, /\b\d{1,2}\.\d{3}\.\d{3}-[\dkK]\b/];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.toLowerCase().endsWith(".pdf")) out.push(p);
  }
  return out;
}

function pdfText(file: string): string {
  const buf = readFileSync(file);
  const raw = buf.toString("latin1");
  let out = raw;
  const re = /stream\r?\n/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const start = m.index + m[0].length;
    const end = raw.indexOf("endstream", start);
    try {
      out += "\n" + inflateSync(buf.subarray(start, end)).toString("latin1");
    } catch {
      /* stream no Flate */
    }
  }
  try {
    out += "\n" + execFileSync("pdftotext", [file, "-"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    out += "\n" + execFileSync("pdfinfo", [file], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    /* sin poppler: queda la extracción cruda */
  }
  return out;
}

const pdfs = walk(root).map((p) => relative(root, p)).sort();

describe("PDFs del repo sin PII (Gmail, teléfono, RUT) ni metadatos personales", () => {
  it("encuentra PDFs", () => expect(pdfs.length).toBeGreaterThan(0));
  it.each(pdfs.filter((p) => !KNOWN_PENDING.has(p)))("%s", (rel) => {
    const text = pdfText(join(root, rel));
    for (const re of PII) expect(text, `${rel} ${re}`).not.toMatch(re);
  });
  it.each(pdfs.filter((p) => p.startsWith("public/cv")))("%s sin Author/Creator/Producer ni XMP", (rel) => {
    const raw = readFileSync(join(root, rel)).toString("latin1");
    expect(raw).not.toMatch(/\/(Author|Creator|Producer)\s*\(/);
    expect(raw).not.toMatch(/x:xmpmeta/);
  });
  it("las excepciones pendientes siguen existiendo (si se limpian, sacarlas de KNOWN_PENDING)", () => {
    for (const p of KNOWN_PENDING) expect(pdfs).toContain(p);
  });
});
