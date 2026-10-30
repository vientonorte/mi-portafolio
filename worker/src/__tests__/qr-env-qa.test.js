import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import worker from '../index.js';

// env.qa no tiene EMAIL ni IMAGES_BUCKET: /q/* debe funcionar solo con ADMIN_KV.
function memKv() {
  const m = new Map();
  return {
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async put(k, v) { m.set(k, String(v)); },
    async list({ prefix = '' } = {}) { return { keys: [...m.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true }; },
  };
}
const ctx = { waitUntil: (p) => p };

describe('env.qa: /q/* sin EMAIL ni R2', () => {
  it('redirect y stats no usan EMAIL ni IMAGES_BUCKET', async () => {
    const env = { ADMIN_KV: memKv(), QR_VIEW_KEY: 'qa-ficticia' };
    const r = await worker.fetch(new Request('https://qa.example/q/stats'), env, ctx);
    expect(r.status).toBeLessThan(500);
    const r2 = await worker.fetch(new Request('https://qa.example/'), env, ctx);
    expect(r2.status).toBe(200);
  });
  it('wrangler.toml [env.qa]: sin rutas, sin send_email/R2, KV distinto a prod', () => {
    const t = readFileSync(fileURLToPath(new URL('../../wrangler.toml', import.meta.url)), 'utf8');
    const qa = t.slice(t.indexOf('[env.qa]'));
    expect(qa).toMatch(/name = "mi-portafolio-contact-qa"/);
    expect(qa).toMatch(/routes = \[\]/);
    expect(qa).not.toMatch(/send_email|r2_buckets|custom_domain|169497b8/);
    expect(qa).toMatch(/binding = "ADMIN_KV"\nid = "REPLACE_WITH_QA_KV_ID"/);
  });
});
