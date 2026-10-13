/**
 * TL 13-oct: ningún PDF del repo lleva Gmail, teléfono ni RUT, ni en el texto ni en los metadatos.
 * Sin dependencias: infla los streams FlateDecode (texto de PDFs tipo ReportLab) y revisa el diccionario
 * Info y el XMP. Si hay `pdftotext` (poppler) en la máquina, además extrae el texto real.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { inflateRawSync, inflateSync } from "node:zlib";
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
const PII = [/@(gmail|googlemail|hotmail|outlook|live|yahoo|icloud|me)\.(com|cl|es)\b/i, /\+?56[\s.-]?9[\s.-]?\d{4}[\s.-]?\d{4}/, /\bRUT\b/, /\b\d{1,2}\.\d{3}\.\d{3}-[\dkK]\b/];

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

/**
 * Extensión TL 13-oct: TODO archivo .pdf/.docx/.txt que termina en dist/ (= public/ + build) sin
 * correos personales, teléfono ni RUT, incluidos metadatos (Info/XMP del PDF; docProps/*.xml del docx).
 * Sin build se revisa public/ (lo que Vite copia a dist/). `DIST_PII_REQUIRE=1` (npm run qa:pii-dist,
 * tras `npm run build`) exige dist/.
 */
function unzipXml(file: string): string {
  // ZIP mínimo: recorre los local file headers e infla (método 8) o copia (método 0) cada entrada .xml.
  const buf = readFileSync(file);
  let out = "";
  let i = 0;
  while (i + 30 <= buf.length && buf.readUInt32LE(i) === 0x04034b50) {
    const method = buf.readUInt16LE(i + 8);
    const csize = buf.readUInt32LE(i + 18);
    const nlen = buf.readUInt16LE(i + 26);
    const xlen = buf.readUInt16LE(i + 28);
    const name = buf.subarray(i + 30, i + 30 + nlen).toString("utf8");
    const start = i + 30 + nlen + xlen;
    const data = buf.subarray(start, start + csize);
    if (/\.(xml|rels)$/.test(name)) {
      try {
        out += "\n" + (method === 8 ? inflateRawSync(data) : data).toString("utf8");
      } catch {
        /* entrada ilegible */
      }
    }
    i = start + csize;
  }
  return out.replace(/<[^>]+>/g, " ");
}

const distDir = join(root, "dist");
const requireDist = process.env.DIST_PII_REQUIRE === "1";
const hasDist = (() => {
  try {
    return statSync(distDir).isDirectory();
  } catch {
    return false;
  }
})();
const scanDir = requireDist || hasDist ? distDir : join(root, "public");

function walkExt(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkExt(p, out);
    else if (/\.(pdf|docx|txt)$/i.test(name)) out.push(p);
  }
  return out;
}

describe("dist/ (o public/) sin PII en .pdf/.docx/.txt (contenido y metadatos)", () => {
  if (requireDist) it("dist/ existe", () => expect(hasDist).toBe(true));
  const files = (requireDist && !hasDist ? [] : walkExt(scanDir)).map((p) => relative(root, p)).sort();
  it("no publica .docx (PO 13-oct: solo los 2 CV PDF)", () => {
    expect(files.filter((f) => f.toLowerCase().endsWith(".docx"))).toEqual([]);
  });
  it.each(files.length ? files : ["(sin archivos)"])("%s", (rel) => {
    if (rel === "(sin archivos)") return;
    const abs = join(root, rel);
    const text = rel.endsWith(".docx") ? unzipXml(abs) : rel.endsWith(".pdf") ? pdfText(abs) : readFileSync(abs, "utf8");
    for (const re of PII) expect(text, `${rel} ${re}`).not.toMatch(re);
  });
});
