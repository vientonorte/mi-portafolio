/**
 * Build dedicado de la ficha /sobre-mi/ para ro.vientonorte.io (`npm run build:ro` → dist-ro/).
 * Una sola entrada (sobre-mi/index.html → src/sobre-mi/entry-client.tsx); no importa App ni el HashRouter.
 * CanonicalSobreMi importa PortfolioFrame desde `../App`: aquí ese import (y solo ese) se resuelve a
 * src/ro/app-shim.ts. Si algo más llega a src/App.tsx, el build falla.
 * No toca el build del apex: vite.config.ts y el código del apex siguen igual; aquí se quita el prerender de servicios.
 * El prerender de la ficha y la copia de assets públicos referenciados los hace scripts/build-ro.mjs.
 */
import path from 'path';
import { defineConfig, type Plugin, type PluginOption, type UserConfig } from 'vite';
import apex from './vite.config';

const base = apex as UserConfig;
const isSsrChild = Boolean(process.env.VN_SSR_CHILD);
const plugins = (base.plugins ?? []).flat().filter(
  (p) => !(p && typeof p === 'object' && 'name' in p && p.name === 'vn-prerender-servicios'),
) as PluginOption[];

const appModule = path.resolve(__dirname, 'src/App.tsx');
const canonicalSobreMi = path.resolve(__dirname, 'src/sobre-mi/CanonicalSobreMi.tsx');
const appShim = path.resolve(__dirname, 'src/ro/app-shim.ts');

/** `../App` desde CanonicalSobreMi → src/ro/app-shim.ts. Cualquier otra llegada a src/App.tsx = error. */
function vnRoNoApp(): Plugin {
  return {
    name: 'vn-ro-no-app',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer) return null;
      const from = importer.split('?')[0];
      if (from === canonicalSobreMi && source === '../App') return appShim;
      const resolved = await this.resolve(source, importer, { ...options, skipSelf: true });
      if (resolved && resolved.id.split('?')[0] === appModule) {
        throw new Error(`build:ro · ${path.relative(__dirname, from)} importa src/App.tsx; la ficha de ro no puede arrastrar el router de App`);
      }
      return resolved;
    },
  };
}

export default defineConfig({
  ...base,
  plugins: [vnRoNoApp(), ...plugins],
  // Los assets de public/ se copian por referencia en scripts/build-ro.mjs (sin CV, sin sw.js, sin el sitio entero).
  publicDir: false,
  build: {
    ...base.build,
    outDir: 'dist-ro',
    emptyOutDir: true,
    rollupOptions: {
      ...base.build?.rollupOptions,
      input: isSsrChild ? undefined : { sobreMi: path.resolve(__dirname, 'sobre-mi/index.html') },
    },
  },
});
