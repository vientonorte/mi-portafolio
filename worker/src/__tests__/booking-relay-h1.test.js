/**
 * H1 · relay de correo en POST /api/booking (revisión de seguridad 2026-10-02).
 *
 * - Solo un booking real (eventId con formato de Google Calendar + header
 *   X-VN-BOOKING-KEY válido) puede disparar la confirmación al lead.
 * - Sin eventId (click del front) nunca se manda correo a la dirección del body.
 * - Todo valor interpolado en el HTML del correo va escapado.
 * - htmlLink solo se acepta si es https y de un host de Google Calendar.
 * - El binding EMAIL queda restringido en wrangler.toml / wrangler.contact.toml.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleCreateBooking } from '../api/public.js';
import { notifyInbox } from '../lib/notify.js';
import { escapeHtml } from '../lib/email-templates.js';

const CORS = { 'Access-Control-Allow-Origin': '*' };
const KEY = 'test-webhook-key';
const INBOX = 'inbox@vientonorte.test';
const LEAD = 'lead@empresa.test';
const VALID_EVENT_ID = 'a1b2c3d4e5f6g7h8i9j0kl';

function makeRequest(body, headers = {}) {
  return new Request('https://contact.vientonorte.io/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

function makeEnv(overrides = {}) {
  return {
    CONTACT_INBOX: INBOX,
    CALENDAR_BOOKING_URL: 'https://calendar.app.google/TestBookingUrl',
    VN_BOOKING_WEBHOOK_KEY: KEY,
    EMAIL: { send: vi.fn().mockResolvedValue({ messageId: 'm1' }) },
    ...overrides,
  };
}

function sentTo(env, address, binding = 'EMAIL') {
  return env[binding].send.mock.calls.map((c) => c[0]).filter((m) => m.to === address);
}

function webhookBooking(extra = {}) {
  return makeRequest(
    {
      name: 'Ana Prueba',
      email: LEAD,
      eventId: VALID_EVENT_ID,
      startAt: '2026-10-05T15:00:00-03:00',
      origin: 'calendar-bridge',
      intent: 'radar-free',
      ...extra,
    },
    { 'X-VN-BOOKING-KEY': KEY }
  );
}

beforeEach(() => {
  // FormSubmit falla → notifyInbox cae al binding EMAIL (así vemos todo envío).
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: 'false' }), { status: 200 }))
  );
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('H1 · eventId estricto', () => {
  const badIds = [
    'evt-123',
    '<script>alert(1)</script>',
    'abc',
    'victim@evil.example',
    'a'.repeat(300),
    'ABCDEF123456',
    '../../etc/passwd',
  ];
  for (const eventId of badIds) {
    it(`400 sin correo para eventId inválido: ${eventId.slice(0, 30)}`, async () => {
      const env = makeEnv();
      const res = await handleCreateBooking(webhookBooking({ eventId }), env, CORS);
      expect(res.status).toBe(400);
      expect(env.EMAIL.send).not.toHaveBeenCalled();
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });
  }

  it('400 sin correo si eventId no es string', async () => {
    const env = makeEnv();
    const res = await handleCreateBooking(webhookBooking({ eventId: { $ne: '' } }), env, CORS);
    expect(res.status).toBe(400);
    expect(env.EMAIL.send).not.toHaveBeenCalled();
  });

  it('acepta ids reales de Google Calendar (instancia recurrente e iCalUID)', async () => {
    for (const eventId of [
      `${VALID_EVENT_ID}_20261005T180000Z`,
      `${VALID_EVENT_ID}@google.com`,
    ]) {
      const env = makeEnv();
      const res = await handleCreateBooking(webhookBooking({ eventId }), env, CORS);
      expect(res.status).toBe(201);
      expect(sentTo(env, LEAD)).toHaveLength(1);
    }
  });

  it('falla cerrado: sin VN_BOOKING_WEBHOOK_KEY configurado no se acepta eventId ni se manda correo', async () => {
    const env = makeEnv({ VN_BOOKING_WEBHOOK_KEY: undefined });
    const res = await handleCreateBooking(webhookBooking(), env, CORS);
    expect(res.status).toBe(401);
    expect(env.EMAIL.send).not.toHaveBeenCalled();
  });

  it('header incorrecto → 401 sin correo', async () => {
    const env = makeEnv();
    const req = makeRequest(
      { name: 'Ana', email: LEAD, eventId: VALID_EVENT_ID },
      { 'X-VN-BOOKING-KEY': 'nope' }
    );
    const res = await handleCreateBooking(req, env, CORS);
    expect(res.status).toBe(401);
    expect(env.EMAIL.send).not.toHaveBeenCalled();
  });
});

describe('H1 · la confirmación solo va al lead de un booking real', () => {
  it('sin eventId (click del front) nunca manda correo a la dirección del body', async () => {
    const env = makeEnv();
    const req = makeRequest({
      name: 'Bot',
      email: 'victima@tercero.test',
      origin: 'ads-a11y-landing',
      htmlLink: 'https://evil.example/phish',
    });
    const res = await handleCreateBooking(req, env, CORS);
    expect(res.status).toBe(201);
    expect(sentTo(env, 'victima@tercero.test')).toHaveLength(0);
    // Solo el aviso interno al inbox fijo de VN.
    for (const call of env.EMAIL.send.mock.calls) {
      expect(call[0].to).toBe(INBOX);
    }
  });

  it('el booking guardado desde un click no persiste un htmlLink del atacante', async () => {
    const env = makeEnv();
    const req = makeRequest({ name: 'Bot', htmlLink: 'https://evil.example/phish' });
    const res = await handleCreateBooking(req, env, CORS);
    const body = await res.json();
    expect(body.booking.calendarUrl).toBe('https://calendar.app.google/TestBookingUrl');
  });

  it('booking verificado → exactamente una confirmación, al email del lead del webhook', async () => {
    const env = makeEnv();
    const res = await handleCreateBooking(webhookBooking(), env, CORS);
    expect(res.status).toBe(201);
    const visitor = env.EMAIL.send.mock.calls.map((c) => c[0]).filter((m) => m.to !== INBOX);
    expect(visitor).toHaveLength(1);
    expect(visitor[0].to).toBe(LEAD);
  });

  it('si existe EMAIL_LEADS, la confirmación al lead sale por ese binding (EMAIL queda solo para el inbox)', async () => {
    const env = makeEnv({ EMAIL_LEADS: { send: vi.fn().mockResolvedValue({ messageId: 'm2' }) } });
    const res = await handleCreateBooking(webhookBooking(), env, CORS);
    expect(res.status).toBe(201);
    expect(sentTo(env, LEAD, 'EMAIL_LEADS')).toHaveLength(1);
    expect(sentTo(env, LEAD, 'EMAIL')).toHaveLength(0);
  });
});

describe('H1 · HTML escapado y htmlLink restringido', () => {
  it('escapa name en el HTML de la confirmación genérica', async () => {
    const env = makeEnv();
    await handleCreateBooking(
      webhookBooking({ name: '<img src=x onerror=alert(1)><a href="https://evil.example">x</a>' }),
      env,
      CORS
    );
    const [mail] = sentTo(env, LEAD);
    expect(mail.html).not.toContain('<img');
    expect(mail.html).not.toContain('href="https://evil.example"');
    expect(mail.html).toContain('&lt;img');
  });

  it('escapa startAt en el HTML de la confirmación genérica', async () => {
    const env = makeEnv();
    await handleCreateBooking(webhookBooking({ startAt: '<b>x</b>' }), env, CORS);
    const [mail] = sentTo(env, LEAD);
    expect(mail.html).not.toContain('<b>x</b>');
  });

  const badLinks = [
    'https://evil.example/phish',
    'http://calendar.google.com/calendar/event?eid=abc',
    'javascript:alert(1)',
    'https://calendar.google.com.evil.example/x',
    'https://evil.example/?https://calendar.google.com',
    'https://user@evil.example/calendar',
    'data:text/html,<script>alert(1)</script>',
  ];
  for (const htmlLink of badLinks) {
    it(`descarta htmlLink no permitido: ${htmlLink.slice(0, 40)}`, async () => {
      for (const origin of ['calendar-bridge', 'ads-a11y-landing']) {
        const env = makeEnv();
        await handleCreateBooking(webhookBooking({ htmlLink, origin }), env, CORS);
        const [mail] = sentTo(env, LEAD);
        expect(mail).toBeDefined();
        expect(mail.html).not.toContain('evil.example');
        expect(mail.text).not.toContain('evil.example');
        expect(mail.html).not.toContain('javascript:');
        expect(mail.html).not.toContain('data:text');
        expect(mail.html).toContain('https://calendar.app.google/TestBookingUrl');
      }
    });
  }

  it('acepta htmlLink https de Google Calendar y lo escapa', async () => {
    const env = makeEnv();
    const link = 'https://www.google.com/calendar/event?eid=abc&x="><script>';
    await handleCreateBooking(webhookBooking({ htmlLink: link }), env, CORS);
    const [mail] = sentTo(env, LEAD);
    expect(mail.html).toContain('https://www.google.com/calendar/event?eid=abc');
    expect(mail.html).not.toContain('"><script>');
  });

  it('el aviso interno (fallback HTML de notifyInbox) también va escapado', async () => {
    const env = makeEnv();
    await notifyInbox(env, { subject: 's', text: '<img src=x onerror=alert(1)>' });
    const [mail] = sentTo(env, INBOX);
    expect(mail.html).not.toContain('<img');
    expect(mail.html).toContain('&lt;img');
  });

  it('escapeHtml también escapa comillas simples', () => {
    expect(escapeHtml(`a'b`)).toBe('a&#39;b');
  });

  it('quita CR/LF del nombre usado en el asunto', async () => {
    const env = makeEnv();
    await handleCreateBooking(webhookBooking({ name: 'Ana\r\nBcc: x@evil.example' }), env, CORS);
    for (const call of env.EMAIL.send.mock.calls) {
      expect(call[0].subject).not.toMatch(/[\r\n]/);
    }
  });
});

describe('H1 · binding EMAIL restringido en wrangler', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  for (const file of ['wrangler.toml', 'wrangler.contact.toml']) {
    it(`${file}: [[send_email]] EMAIL tiene allowlist de destino y de remitente`, () => {
      const toml = readFileSync(resolve(here, '../../', file), 'utf8');
      const block = toml.split('[[send_email]]')[1]?.split(/\n\[/)[0] ?? '';
      expect(block).toMatch(/name\s*=\s*"EMAIL"/);
      expect(block).toMatch(/allowed_destination_addresses\s*=\s*\[\s*"[^"]+@[^"]+"\s*\]/);
      expect(block).toMatch(/allowed_sender_addresses\s*=\s*\[\s*"contacto@vientonorte\.io"\s*\]/);
    });
  }
});
