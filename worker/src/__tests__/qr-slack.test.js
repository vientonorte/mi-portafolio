import { describe, expect, it, vi } from 'vitest';
import { buildSlackText, realByDay, sendQrSlackReport } from '../api/qr-slack.js';
import worker from '../index.js';

// Fixture ficticio: no son cifras de producción.
function makeKv(data) {
  const store = new Map(Object.entries(data));
  return {
    async get(k) { return store.has(k) ? store.get(k) : null; },
    async put(k, v) { store.set(k, v); },
    async list({ prefix = '' } = {}) {
      return { keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true };
    },
  };
}
const fixture = {
  'qr:facebook:2026-10-29': '6', 'qr:facebook:total': '6', // 4 pruebas → 2 reales
  'qr:los-leones:2026-10-29': '3', 'qr:los-leones:total': '3', // 1 prueba → 2 reales
  'qr:av-matta:2026-10-27': '5', 'qr:av-matta:total': '5', // 1 prueba global ('*') ese día
};
const NOW = new Date('2026-10-31T12:00:00Z');

describe('reporte QR a Slack', () => {
  it('sin SLACK_WEBHOOK_URL no hace nada', async () => {
    const f = vi.fn();
    expect(await sendQrSlackReport({ ADMIN_KV: makeKv(fixture) }, NOW, f)).toBe(false);
    expect(f).not.toHaveBeenCalled();
  });

  it('postea totales reales por punto y por día', async () => {
    const f = vi.fn(async () => ({ ok: true }));
    const env = { ADMIN_KV: makeKv(fixture), SLACK_WEBHOOK_URL: 'https://hooks.slack.test/x' };
    expect(await sendQrSlackReport(env, NOW, f)).toBe(true);
    const [url, init] = f.mock.calls[0];
    expect(url).toBe('https://hooks.slack.test/x');
    expect(init.method).toBe('POST');
    const { text } = JSON.parse(init.body);
    expect(text).toContain('Escaneos reales: *8*');
    expect(text).toContain('• 2026-10-27: 4');
    expect(text).toContain('• 2026-10-29: 4');
  });

  it('realByDay descuenta pruebas por punto y globales', () => {
    expect(realByDay([
      { slug: 'facebook', days: { '2026-10-29': 6 } },
      { slug: 'av-matta', days: { '2026-10-27': 5 } },
    ])).toEqual({ '2026-10-29': 2, '2026-10-27': 4 });
  });

  it('si Slack falla, no lanza', async () => {
    const f = vi.fn(async () => { throw new Error('red'); });
    const env = { ADMIN_KV: makeKv(fixture), SLACK_WEBHOOK_URL: 'https://hooks.slack.test/x' };
    await expect(sendQrSlackReport(env, NOW, f)).resolves.toBe(false);
  });

  it('el handler scheduled sin webhook no rompe', async () => {
    const pending = [];
    await worker.scheduled({ cron: '0 12 * * *' }, { ADMIN_KV: makeKv(fixture) }, { waitUntil: (p) => pending.push(p) });
    await expect(Promise.all(pending)).resolves.toEqual([false]);
  });

  it('texto sin datos', () => {
    expect(buildSlackText([], NOW)).toContain('Sin escaneos aún');
  });
});
