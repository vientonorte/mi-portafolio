/* global process, console */
/**
 * Prerender /servicios/ — react-dom/server sobre la entrada SSR de Vite.
 * Llamado desde vite.config.ts (plugin vn-prerender-servicios, closeBundle).
 *
 * 1. vite build --ssr src/servicios/entry-server.tsx (mismo config/base/aliases)
 * 2. render() → HTML
 * 3. inyecta en dist/servicios/index.html (<!--ssr-outlet-->); el cliente hidrata.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const OUTLET = '<!--ssr-outlet-->';

export async function prerenderServicios({ root, outDir, base }) {
  const { build } = await import('vite');
  const ssrOutDir = path.join(root, '.vn-ssr-servicios');
  const target = path.join(outDir, 'servicios', 'index.html');
  if (!fs.existsSync(target)) {
    throw new Error(`[prerender-servicios] falta ${target}`);
  }

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
        ssr: path.join(root, 'src/servicios/entry-server.tsx'),
        outDir: ssrOutDir,
        emptyOutDir: true,
        copyPublicDir: false,
        rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
      },
    });
  } finally {
    if (prev === undefined) delete process.env.VN_SSR_CHILD;
    else process.env.VN_SSR_CHILD = prev;
  }

  try {
    const entry = pathToFileURL(path.join(ssrOutDir, 'entry-server.mjs')).href;
    const mod = await import(`${entry}?t=${Date.now()}`);
    const appHtml = mod.render();
    const html = fs.readFileSync(target, 'utf8');
    if (!html.includes(OUTLET)) {
      throw new Error('[prerender-servicios] dist/servicios/index.html sin <!--ssr-outlet-->');
    }
    fs.writeFileSync(target, html.replace(OUTLET, appHtml), 'utf8');
    console.log(`[prerender-servicios] ${path.relative(root, target)} (${appHtml.length} bytes, base ${base})`);
  } finally {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }
}
