import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { call, clearKv, makeEmailMock, mockOutbound, ORIGIN, readCollection } from './helpers.js';

const VALID = {
  name: 'Ana Pyme',
  email: 'Ana@Empresa.cl',
  message: 'Quiero rehacer la web de mi pyme este trimestre.',
  consent: true,
  // H2: sin formStartedAt el worker corta antes de validar el resto.
  formStartedAt: Date.now() - 10_000,
  intent: 'web-pymes',
  source: 'servicios',
  language: 'es',
  utm_source: 'linkedin',
  utm_medium: 'social',
  utm_campaign: 's41-web-pymes',
  landing_path: '/servicios/?utm_source=linkedin#web-pymes',
};

describe('POST /api/contact (fetch handler real + KV Miniflare)', () => {
  let EMAIL;
  beforeEach(async () => {
    await clearKv();
    EMAIL = makeEmailMock();
  });
  afterEach(() => vi.restoreAllMocks());

  it('happy path: guarda el lead con UTMs en KV, avisa por FormSubmit y confirma al visitante', async () => {
    const { calls } = mockOutbound({ formsubmit: 'ok' });
    const res = await call('/api/contact', { method: 'POST', body: VALID, envOverrides: { EMAIL } });

    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    const data = await res.json();
    expect(data).toMatchObject({ ok: true, emailed: true });
    expect(data.leadId).toMatch(/^lead_/);

    const leads = await readCollection('vn:leads');
    expect(leads).toHaveLength(1);
    expect(leads[0]).toMatchObject({
      id: data.leadId,
      status: 'nuevo',
      name: 'Ana Pyme',
      email: 'ana@empresa.cl',
      intent: 'web-pymes',
      source: 'servicios',
      channel: 'contact',
      utm_source: 'linkedin',
      utm_medium: 'social',
      utm_campaign: 's41-web-pymes',
      landing_path: '/servicios/', // sin query string (cleanLandingPath)
    });

    // Aviso al inbox VN: FormSubmit (mock, sin red) con el inbox configurado.
    const fs = calls.filter((c) => c.url.startsWith('https://formsubmit.co/ajax/'));
    expect(fs).toHaveLength(1);
    expect(fs[0].url).toBe('https://formsubmit.co/ajax/inbox-test%40vientonorte.test');
    expect(fs[0].body).toMatchObject({
      email: 'ana@empresa.cl',
      _subject: 'VN · web-pymes · Ana Pyme',
    });

    // EMAIL binding: solo la confirmación al visitante (el aviso salió por FormSubmit).
    expect(EMAIL.send).toHaveBeenCalledTimes(1);
    const confirmation = EMAIL.send.mock.calls[0][0];
    expect(confirmation.to).toBe('ana@empresa.cl');
    expect(confirmation.from).toEqual({ email: 'contacto@vientonorte.io', name: 'Viento Norte' });
    expect(confirmation.subject).toBeTruthy();
    expect(confirmation.html).toContain('Ana Pyme');
  });

  it('si FormSubmit falla, el aviso al inbox sale por el binding EMAIL con replyTo del visitante', async () => {
    mockOutbound({ formsubmit: 'fail' });
    const res = await call('/api/contact', { method: 'POST', body: VALID, envOverrides: { EMAIL } });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, emailed: true });

    expect(EMAIL.send).toHaveBeenCalledTimes(2);
    const [admin, visitor] = EMAIL.send.mock.calls.map((c) => c[0]);
    expect(admin).toMatchObject({
      to: 'inbox-test@vientonorte.test',
      from: { email: 'contacto@vientonorte.io', name: 'Viento Norte' },
      replyTo: { email: 'ana@empresa.cl', name: 'Ana Pyme' },
      subject: 'VN · web-pymes · Ana Pyme',
    });
    expect(admin.text).toContain('linkedin');
    expect(admin.text).toContain('s41-web-pymes');
    expect(visitor.to).toBe('ana@empresa.cl');
  });

  it('sin FormSubmit ni EMAIL igual guarda el lead y responde emailed:false', async () => {
    mockOutbound({ formsubmit: 'fail' });
    const res = await call('/api/contact', { method: 'POST', body: VALID });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, emailed: false });
    expect(await readCollection('vn:leads')).toHaveLength(1);
  });

  it('con GA4_MP_API_SECRET manda generate_lead con las UTMs (GA4 MP mockeado)', async () => {
    const { calls } = mockOutbound({ formsubmit: 'ok' });
    const res = await call('/api/contact', {
      method: 'POST',
      body: VALID,
      envOverrides: { EMAIL, GA4_MP_API_SECRET: 'test-only' },
    });
    expect(res.status).toBe(200);
    const mp = calls.find((c) => c.url.startsWith('https://www.google-analytics.com/mp/collect'));
    expect(mp).toBeTruthy();
    expect(mp.url).toContain('measurement_id=G-TEST000000');
    expect(mp.body.events[0]).toMatchObject({
      name: 'generate_lead',
      params: {
        channel: 'contact',
        utm_source: 'linkedin',
        utm_medium: 'social',
        utm_campaign: 's41-web-pymes',
      },
    });
  });

  it.each([
    ['JSON inválido', '{no-json', 'JSON inválido'],
    ['nombre corto', { ...VALID, name: 'A' }, 'Nombre inválido'],
    ['email inválido', { ...VALID, email: 'no-es-email' }, 'Email inválido'],
    ['mensaje corto', { ...VALID, message: 'hola' }, 'Mensaje demasiado corto'],
    ['sin consentimiento', { ...VALID, consent: false }, 'Se requiere consentimiento de contacto'],
  ])('payload inválido (%s) → 400 sin KV ni correo', async (_label, body, error) => {
    const { spy } = mockOutbound();
    const res = await call('/api/contact', { method: 'POST', body, envOverrides: { EMAIL } });
    expect(res.status).toBe(400);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    expect(await res.json()).toEqual({ ok: false, error });
    expect(await readCollection('vn:leads')).toHaveLength(0);
    expect(EMAIL.send).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('honeypot _gotcha → 200 con la forma de un envío real, sin guardar ni enviar (H2 #303)', async () => {
    const { spy } = mockOutbound();
    const res = await call('/api/contact', {
      method: 'POST',
      body: { ...VALID, _gotcha: 'bot' },
      envOverrides: { EMAIL },
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.emailed).toBe(true);
    expect(data.leadId).toMatch(/^lead_/);
    expect(await readCollection('vn:leads')).toHaveLength(0);
    expect(EMAIL.send).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('GET /api/contact no existe → 404 JSON con CORS', async () => {
    const res = await call('/api/contact');
    expect(res.status).toBe(404);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
  });
});

describe('POST /api/leads y /api/diagnostico (KV Miniflare)', () => {
  beforeEach(clearKv);
  afterEach(() => vi.restoreAllMocks());

  it('/api/leads guarda el lead (channel leads) → 201', async () => {
    mockOutbound();
    const res = await call('/api/leads', {
      method: 'POST',
      body: { name: 'Luis', email: 'luis@empresa.cl', message: 'Necesito una revisión UX.', consent: true },
    });
    expect(res.status).toBe(201);
    const { lead } = await res.json();
    const leads = await readCollection('vn:leads');
    expect(leads[0]).toMatchObject({ id: lead.id, channel: 'leads', email: 'luis@empresa.cl' });
  });

  it('/api/leads sin consentimiento → 400', async () => {
    mockOutbound();
    const res = await call('/api/leads', {
      method: 'POST',
      body: { name: 'Luis', email: 'luis@empresa.cl', message: 'Necesito una revisión UX.' },
    });
    expect(res.status).toBe(400);
    expect(await readCollection('vn:leads')).toHaveLength(0);
  });

  it('/api/diagnostico guarda en vn:diagnosticos → 201', async () => {
    const res = await call('/api/diagnostico', {
      method: 'POST',
      body: { name: 'Eva', email: 'eva@empresa.cl', friction: 'Nuestro design system no cumple WCAG' },
    });
    expect(res.status).toBe(201);
    const dx = await readCollection('vn:diagnosticos');
    expect(dx).toHaveLength(1);
    expect(dx[0].response.es).toContain('design-systems');
  });
});
