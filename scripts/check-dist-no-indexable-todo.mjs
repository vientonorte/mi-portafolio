#!/usr/bin/env node
// Una página con marcador TODO no puede indexarse ni estar en el sitemap.
// Uso: node scripts/check-dist-no-indexable-todo.mjs [dist]
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const TODO_RE = /\[TODO\b/i;

export function robotsNoindex(html) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const name = tag.match(/\bname\s*=\s*["']([^"']*)["']/i)?.[1]?.toLowerCase();
    if (name !== "robots") continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
    if (/\bnoindex\b/i.test(content)) return true;
  }
  return false;
}

export function sitemapPaths(xml) {
  const paths = new Set();
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      paths.add(new URL(match[1]).pathname);
    } catch {
      paths.add(match[1]);
    }
  }
  return paths;
}

export function indexableTodoProblems(pages, sitemapXml) {
  const listed = sitemapPaths(sitemapXml);
  const problems = [];
  for (const page of pages) {
    if (!TODO_RE.test(page.html)) continue;
    const indexed = !robotsNoindex(page.html);
    const inSitemap = listed.has(page.route);
    if (indexed || inSitemap) problems.push({ route: page.route, indexed, inSitemap });
  }
  return problems;
}

function routeFromIndex(rel) {
  const dir = rel.replace(/\\/g, "/").replace(/(^|\/)index\.html$/, "");
  return dir ? `/${dir}/` : "/";
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else if (name === "index.html") out.push(abs);
  }
  return out;
}

if (process.argv[1]?.endsWith("check-dist-no-indexable-todo.mjs")) {
  const root = process.argv[2] || "dist";
  if (!existsSync(join(root, "sitemap.xml"))) {
    console.error(`falta ${root}/sitemap.xml`);
    process.exit(2);
  }
  const sitemapXml = readFileSync(join(root, "sitemap.xml"), "utf8");
  const pages = walk(root).map((abs) => ({
    route: routeFromIndex(relative(root, abs)),
    html: readFileSync(abs, "utf8"),
  }));
  const problems = indexableTodoProblems(pages, sitemapXml);
  if (problems.length) {
    console.error(`❌ página con TODO indexable (${problems.length}):`);
    for (const problem of problems) {
      console.error(`  - ${problem.route} indexed=${problem.indexed} sitemap=${problem.inSitemap}`);
    }
    process.exit(1);
  }
  console.log(`✅ ninguna página con TODO está indexada ni en el sitemap (${pages.length} HTML)`);
}
