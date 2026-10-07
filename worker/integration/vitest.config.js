// Tests de integración del worker de contacto (S41 pipeline, paso 1).
// Corren el fetch handler real (../src/index.js) dentro de workerd vía Miniflare
// (@cloudflare/vitest-pool-workers), con KV y R2 en memoria. No hay red: el fetch
// saliente se mockea en cada test y outboundService corta cualquier request que se escape.
//
// Bindings definidos inline (no se lee ../wrangler.toml) para que el test no dependa de
// account_id/routes y nunca toque Cloudflare. Se mantienen alineados a mano con wrangler.toml.
import { cloudflareTest } from '@cloudflare/vitest-pool-workers';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    cloudflareTest({
      main: '../src/index.js',
      miniflare: {
        compatibilityDate: '2024-09-23', // = worker/wrangler.toml
        kvNamespaces: ['ADMIN_KV'],
        r2Buckets: ['IMAGES_BUCKET'],
        bindings: {
          ALLOWED_ORIGIN:
            'https://vientonorte.io,https://www.vientonorte.io,https://vientonorte.github.io,http://localhost:3000',
          CONTACT_FROM: 'contacto@vientonorte.io',
          CONTACT_FROM_NAME: 'Viento Norte',
          CONTACT_INBOX: 'inbox-test@vientonorte.test',
          ADMIN_GITHUB_USER: 'vientonorte',
          CALENDAR_BOOKING_URL: 'https://calendar.app.google/test-booking',
          GA4_MEASUREMENT_ID: 'G-TEST000000',
        },
        // Red de seguridad: si algún fetch saliente no está mockeado, nunca sale a internet.
        outboundService: () =>
          new Response('outbound bloqueado en tests', { status: 599 }),
      },
    }),
  ],
  test: {
    include: ['test/**/*.test.js'],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
