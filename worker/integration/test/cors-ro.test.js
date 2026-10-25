import { describe, expect, it } from 'vitest';
import { call } from './helpers.js';

const RO = 'https://ro.vientonorte.io';

describe('CORS ro.vientonorte.io (portafolio personal)', () => {
  it('preflight OPTIONS /api/images/manifest desde ro → 204 con ACAO = ro', async () => {
    const res = await call('/api/images/manifest', { method: 'OPTIONS', origin: RO });
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(RO);
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('GET');
  });

  it('GET /api/images/manifest desde ro → ACAO = ro', async () => {
    const res = await call('/api/images/manifest', { origin: RO });
    expect(res.status).not.toBe(403);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(RO);
  });

  it('subdominio no listado sigue rechazado (sin comodines)', async () => {
    for (const origin of ['https://evil.vientonorte.io', 'https://ro.vientonorte.io.evil.example']) {
      const res = await call('/api/images/manifest', { method: 'OPTIONS', origin });
      expect(res.status).toBe(403);
      expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
    }
  });
});
