/* global process, console */
/**
 * Prerender de las páginas Vite bajo /servicios/ — react-dom/server sobre entradas SSR.
 * Llamado desde vite.config.ts (plugin vn-prerender-servicios, closeBundle).
 *
 * 1. vite build --ssr con dos entradas (mismo config/base/aliases):
 *    - src/servicios/entry-server.tsx → /servicios/ (índice, #277)
 *    - src/rubros/entry-server.tsx    → /servicios/<slug>/ por cada entrada de src/data/rubros.json (P4)
 * 2. /servicios/: inyecta render() en dist/servicios/index.html (<!--ssr-outlet-->).
 * 3. Rubros: toma la plantilla dist/rubros/index.html (entrada Vite "rubros"), inyecta el
 *    <head> del rubro (<!--rubro-head-->), el HTML (<!--ssr-outlet-->) y data-slug, y escribe
 *    dist/servicios/<slug>/index.html. Luego borra dist/rubros/ (la plantilla no se publica).
 * El cliente hidrata (hydrateRoot).
 *
 * Guardas: una ruta de rubro nunca puede venir de public/ (generate-service-landings.py /
 * build-static-share.py) ni estar en src/data/legacy-redirects.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const OUTLET = '<!--ssr-outlet-->';
export const HEAD_OUTLET = '<!--rubro-head-->';
export const SLUG_ATTR = 'data-slug=""';
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Slugs de src/data/rubros.json (validados). */
export function readRubroSlugs(root) {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'src/data/rubros.json'), 'utf8'));
  const slugs = Object.keys(data.rubros || {});
  for (const slug of slugs) {
    if (!SLUG_RE.test(slug)) throw new Error(`[prerender-servicios] slug inválido en rubros.json: ${slug}`);
  }
  return slugs;
}

/** Falla si alguna ruta de rubro también la reclama el sistema de redirecciones o public/. */
export function assertRubroPathsFree(root, slugs) {
  const redirects = JSON.parse(fs.readFileSync(path.join(root, 'src/data/legacy-redirects.json'), 'utf8'));
  const froms = new Set(redirects.redirects.map((r) => r.from));
  for (const slug of slugs) {
    const p = `/servicios/${slug}/`;
    if (froms.has(p)) {
      throw new Error(`[prerender-servicios] ${p} está en legacy-redirects.json y en rubros.json`);
    }
    const pub = path.join(root, 'public', 'servicios', slug, 'index.html');
    if (fs.existsSync(pub)) {
      throw new Error(`[prerender-servicios] ${path.relative(root, pub)} existe: pisaría la página Vite del rubro`);
    }
  }
}

/** Referencias a /servicios/web-<slug>/ (con o sin base de Vite, p. ej. /qa/servicios/web-dental/). */
const RUBRO_REF_RE = /servicios\/(web-[a-z0-9]+(?:-[a-z0-9]+)*)\//g;

export function findRubroRefs(text) {
  return [...new Set([...text.matchAll(RUBRO_REF_RE)].map((m) => m[1]))].sort();
}

function walkFiles(dir, exts, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    if (fs.statSync(abs).isDirectory()) walkFiles(abs, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(abs);
  }
  return out;
}

/**
 * Falla si alguna página o el sitemap del build enlaza un rubro que no tiene página
 * generada (dist/servicios/<slug>/index.html) o que no está en rubros.json.
 * Así un rubro no publicado no puede aparecer en cards, nav ni sitemap.
 */
export function assertRubroLinksResolve(outDir, slugs) {
  const known = new Set(slugs);
  const problems = [];
  for (const file of walkFiles(outDir, ['.html', '.xml'])) {
    for (const slug of findRubroRefs(fs.readFileSync(file, 'utf8'))) {
      const page = path.join(outDir, 'servicios', slug, 'index.html');
      if (!known.has(slug) || !fs.existsSync(page)) {
        problems.push(`${path.relative(outDir, file)} → /servicios/${slug}/`);
      }
    }
  }
  if (problems.length) {
    throw new Error(`[prerender-servicios] enlaces a rubros sin página generada:\n  ${problems.join('\n  ')}`);
  }
}

/** HTML final de un rubro a partir de la plantilla construida por Vite. */
export function injectRubro(template, { slug, head, app }) {
  for (const marker of [HEAD_OUTLET, OUTLET, SLUG_ATTR]) {
    if (!template.includes(marker)) throw new Error(`[prerender-servicios] plantilla de rubros sin ${marker}`);
  }
  return template
    .replace(HEAD_OUTLET, head)
    .replace(SLUG_ATTR, `data-slug="${slug}"`)
    .replace(OUTLET, app);
}

export async function prerenderServicios({ root, outDir, base }) {
  const { build } = await import('vite');
  const ssrOutDir = path.join(root, '.vn-ssr-servicios');
  const target = path.join(outDir, 'servicios', 'index.html');
  const rubroTemplatePath = path.join(outDir, 'rubros', 'index.html');
  if (!fs.existsSync(target)) {
    throw new Error(`[prerender-servicios] falta ${target}`);
  }
  if (!fs.existsSync(rubroTemplatePath)) {
    throw new Error(`[prerender-servicios] falta ${rubroTemplatePath}`);
  }
  const slugs = readRubroSlugs(root);
  assertRubroPathsFree(root, slugs);

  const prev = process.env.VN_SSR_CHILD;
  process.env.VN_SSR_CHILD = '1';
  try {
    await build({
      root,
      base,
      configFile: path.join(root, 'vite.config.ts'),
      logLevel: 'warn',
      publicDir: false,
      build: {
        ssr: true,
        outDir: ssrOutDir,
        emptyOutDir: true,
        copyPublicDir: false,
        rollupOptions: {
          input: {
            servicios: path.join(root, 'src/servicios/entry-server.tsx'),
            rubros: path.join(root, 'src/rubros/entry-server.tsx'),
          },
          output: { entryFileNames: '[name].mjs' },
        },
      },
    });
  } finally {
    if (prev === undefined) delete process.env.VN_SSR_CHILD;
    else process.env.VN_SSR_CHILD = prev;
  }

  try {
    const load = async (name) =>
      import(`${pathToFileURL(path.join(ssrOutDir, `${name}.mjs`)).href}?t=${Date.now()}`);

    // /servicios/ (índice)
    const servicios = await load('servicios');
    const appHtml = servicios.render();
    const html = fs.readFileSync(target, 'utf8');
    if (!html.includes(OUTLET)) {
      throw new Error('[prerender-servicios] dist/servicios/index.html sin <!--ssr-outlet-->');
    }
    fs.writeFileSync(target, html.replace(OUTLET, appHtml), 'utf8');
    console.log(`[prerender-servicios] ${path.relative(root, target)} (${appHtml.length} bytes, base ${base})`);

    // /servicios/<slug>/ (rubros)
    const rubros = await load('rubros');
    const template = fs.readFileSync(rubroTemplatePath, 'utf8');
    for (const slug of slugs) {
      const dest = path.join(outDir, 'servicios', slug, 'index.html');
      if (fs.existsSync(dest)) {
        throw new Error(`[prerender-servicios] ${path.relative(root, dest)} ya existe (¿copiado desde public/?)`);
      }
      const app = rubros.render(slug);
      const out = injectRubro(template, { slug, head: rubros.renderHead(slug), app });
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, out, 'utf8');
      console.log(`[prerender-servicios] ${path.relative(root, dest)} (${app.length} bytes, base ${base})`);
    }
    fs.rmSync(path.join(outDir, 'rubros'), { recursive: true, force: true });
    assertRubroLinksResolve(outDir, slugs);
  } finally {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }
}
