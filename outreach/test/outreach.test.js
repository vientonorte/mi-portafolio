import assert from "node:assert/strict";
import { afterEach, before, describe, it } from "node:test";
import { DatabaseSync } from "node:sqlite";
import { DAILY_CAP, DAILY_CAP_MAX, GMAIL_SEND_URL, GMAIL_TOKEN_URL, TEMPLATE_ID } from "../src/constants.js";
import { OutreachCounter } from "../src/counter.js";
import { buildRawMessage, encodeRfc2047, refreshTokenCacheKey, resetGmailTokenCache } from "../src/gmail.js";
import { handleRequest } from "../src/index.js";
import { capKey, decrementCap, incrementCap, isInsideSendWindow, isLiveMode, LOG_TTL_SEC, normalizeEmail, setHalt } from "../src/store.js";
import { optOutLine, PRIVACY_URL } from "../src/templates.js";

const ISSUER = "https://vn.cloudflareaccess.com";
const AUD = "aud-tag-0123456789";
const ALLOWED = "prueba@example.com";

let privateKey;
let publicJwk;

before(async () => {
  const pair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  privateKey = pair.privateKey;
  publicJwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
  publicJwk.kid = "test-key";
  publicJwk.alg = "RS256";
  publicJwk.use = "sig";
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  resetGmailTokenCache();
});

const originalFetch = globalThis.fetch;

class MemoryKV {
  constructor() {
    this.map = new Map();
    this.meta = new Map();
  }

  async get(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }

  async put(key, value, options) {
    this.map.set(key, String(value));
    this.meta.set(key, options || {});
  }

  async delete(key) {
    this.map.delete(key);
    this.meta.delete(key);
  }
}

function counterBinding() {
  const caps = new Map();
  const claims = new Map();
  const calls = [];
  const stub = {
    reserve(key, cap) {
      calls.push({ op: "reserve", key, cap });
      const current = caps.get(key) ?? 0;
      if (current >= cap) return { ok: false, key, count: current };
      const count = current + 1;
      caps.set(key, count);
      return { ok: true, key, count };
    },
    rollback(key) {
      calls.push({ op: "rollback", key });
      const count = Math.max(0, (caps.get(key) ?? 0) - 1);
      caps.set(key, count);
      return { ok: true, key, count };
    },
  };
  return {
    idFromName(name) {
      if (name !== "outreach") throw new Error("name");
      return "outreach";
    },
    get(id) {
      if (id !== "outreach") throw new Error("id");
      return stub;
    },
    calls,
    caps,
  };
}

function installClock(startMs) {
  const RealDate = Date;
  let current = startMs;
  function MockDate(...args) {
    if (args.length === 0) return new RealDate(current);
    return new RealDate(...args);
  }
  MockDate.now = () => current;
  MockDate.parse = RealDate.parse;
  MockDate.UTC = RealDate.UTC;
  MockDate.prototype = RealDate.prototype;
  globalThis.Date = MockDate;
  return {
    advance(ms) {
      current += ms;
    },
    restore() {
      globalThis.Date = RealDate;
    },
  };
}

const BEFORE_SANTIAGO_MIDNIGHT = Date.parse("2026-06-15T03:59:30.000Z");
const AFTER_SANTIAGO_MIDNIGHT = Date.parse("2026-06-15T04:00:30.000Z");
const LIVE_AT = new Date("2026-07-13T21:20:00.000Z");
const FUENTE = "https://ejemplo.cl/equipo";
const BASE = "fuente_publica";
const SENDER_EMAIL = "dedicated-vn@gmail.com";
const SENDER_NAME = "Viento Norte";

function makeEnv(overrides = {}) {
  return {
    OUTREACH_KV: new MemoryKV(),
    OUTREACH_MODE: "test",
    TEST_ALLOWLIST: ALLOWED,
    TEAM_DOMAIN: ISSUER,
    POLICY_AUD: AUD,
    GMAIL_CLIENT_ID: "test-client-id",
    GMAIL_CLIENT_SECRET: "test-client-secret",
    GMAIL_REFRESH_TOKEN: "test-refresh-token",
    SENDER_NAME,
    SENDER_EMAIL,
    ...overrides,
  };
}

function fields(extra = {}) {
  return {
    empresa: "Óptica Sur",
    hallazgo: "El botón de contacto tiene contraste 2.1:1.",
    servicio_ancla: "revision-gratis",
    rubro: "óptica",
    contacto_nombre: "Ana <Legal>",
    ...extra,
  };
}

function request(pathname, { token, body, headers = {}, method = "POST" } = {}) {
  return new Request(`https://outreach.internal${pathname}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(token ? { "cf-access-jwt-assertion": token } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
}

function b64url(bytes) {
  return Buffer.from(bytes).toString("base64url");
}

async function signToken(claims = {}, { alg = "RS256", kid = "test-key" } = {}) {
  const header = b64url(JSON.stringify({ alg, kid, typ: "JWT" }));
  const payload = b64url(JSON.stringify({
    iss: ISSUER,
    aud: AUD,
    exp: Math.floor(Date.now() / 1000) + 600,
    iat: Math.floor(Date.now() / 1000),
    sub: "",
    type: "app",
    ...claims,
  }));
  const input = `${header}.${payload}`;
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    privateKey,
    new TextEncoder().encode(input),
  );
  return `${input}.${b64url(new Uint8Array(signature))}`;
}

function mockFetch({ gmailStatus = 200, gmailId = "gmail_msg_1", gmailBody, tokenStatus = 200, expiresIn = 3600 } = {}) {
  const calls = [];
  const impl = async (input, init) => {
    const url = typeof input === "string" ? input : input.url;
    calls.push({ url, init });
    if (url === `${ISSUER}/cdn-cgi/access/certs`) {
      return new Response(JSON.stringify({ keys: [publicJwk] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url === GMAIL_TOKEN_URL) {
      if (tokenStatus !== 200) return new Response("no", { status: tokenStatus });
      return new Response(JSON.stringify({
        access_token: "ya29.test-token",
        expires_in: expiresIn,
        token_type: "Bearer",
      }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url === GMAIL_SEND_URL) {
      const body = gmailBody || JSON.stringify({ id: gmailId });
      return new Response(body, {
        status: gmailStatus,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  };
  globalThis.fetch = () => {
    throw new Error("global fetch should not be used");
  };
  return {
    impl,
    calls,
    gmailCalls: () => calls.filter((call) => call.url === GMAIL_SEND_URL),
    tokenCalls: () => calls.filter((call) => call.url === GMAIL_TOKEN_URL),
  };
}

function decodeRfc2047(value) {
  const unfolded = value.replace(/\r\n[ \t]+/g, " ");
  const collapsed = unfolded.replace(/(\?=)\s+(=\?)/g, "$1$2");
  return collapsed.replace(/=\?UTF-8\?B\?([A-Za-z0-9+/=]+)\?=/gi, (_, b64) => Buffer.from(b64, "base64").toString("utf8"));
}

function gmailMessage(net) {
  const calls = net.gmailCalls();
  assert.equal(calls.length, 1);
  const init = calls[0].init;
  const payload = JSON.parse(init.body);
  const pad = payload.raw.length % 4 === 0 ? "" : "=".repeat(4 - (payload.raw.length % 4));
  const mime = Buffer.from(payload.raw.replaceAll("-", "+").replaceAll("_", "/") + pad, "base64").toString("utf8");
  const headerEnd = mime.indexOf("\r\n\r\n");
  const unfolded = mime.slice(0, headerEnd).replace(/\r\n[ \t]+/g, " ");
  const headers = {};
  for (const line of unfolded.split("\r\n")) {
    const idx = line.indexOf(":");
    headers[line.slice(0, idx).toLowerCase()] = line.slice(idx + 1).trim();
  }
  const boundary = /boundary="([^"]+)"/.exec(headers["content-type"])[1];
  const parts = mime.split(`--${boundary}`).slice(1, -1);
  const decodePart = (part) => {
    const body = part.split("\r\n\r\n").slice(1).join("\r\n\r\n").replace(/\s/g, "");
    return Buffer.from(body, "base64").toString("utf8");
  };
  return {
    init,
    headers,
    mime,
    text: decodePart(parts[0]),
    html: decodePart(parts[1]),
    subject: decodeRfc2047(headers.subject),
    from: decodeRfc2047(headers.from),
  };
}

async function send(env, fetchImpl, token, body, now) {
  const clock = now !== undefined ? now : env?.OUTREACH_MODE === "live" ? LIVE_AT : undefined;
  const response = await handleRequest(
    request("/send", {
      token,
      body: {
        fuente: FUENTE,
        base: BASE,
        ...body,
      },
    }),
    env,
    fetchImpl,
    clock,
  );
  const json = await response.json();
  return { response, json };
}

describe("access fail-closed", () => {
  it("returns 403 when TEAM_DOMAIN is unset and does not call Gmail", async () => {
    const net = mockFetch();
    const env = makeEnv({ TEAM_DOMAIN: "" });
    const token = await signToken();
    const { response } = await send(env, net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.calls.length, 0);
    assert.equal(response.headers.get("access-control-allow-origin"), null);
  });

  it("returns 403 when POLICY_AUD is unset and does not call Gmail", async () => {
    const net = mockFetch();
    const env = makeEnv({ POLICY_AUD: "   " });
    const token = await signToken();
    const { response } = await send(env, net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(net.calls.length, 0);
  });

  it("returns 403 when TEAM_DOMAIN is not a Cloudflare Access host", async () => {
    const net = mockFetch();
    const env = makeEnv({ TEAM_DOMAIN: "https://example.com" });
    const token = await signToken();
    const { response } = await send(env, net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.calls.length, 0);
  });

  it("returns 403 when the JWT is missing", async () => {
    const net = mockFetch();
    const { response } = await send(makeEnv(), net.impl, undefined, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.calls.length, 0);
  });

  it("returns 403 for alg none without calling Gmail", async () => {
    const net = mockFetch();
    const header = b64url(JSON.stringify({ alg: "none", typ: "JWT" }));
    const payload = b64url(JSON.stringify({ iss: ISSUER, aud: AUD, exp: Math.floor(Date.now() / 1000) + 60 }));
    const { response } = await send(makeEnv(), net.impl, `${header}.${payload}.x`, {
      to: ALLOWED,
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 403);
    assert.equal(net.calls.length, 0);
  });

  it("returns 403 when the signature does not match the JWKS", async () => {
    const net = mockFetch();
    const token = await signToken();
    const broken = `${token.slice(0, -2)}aa`;
    const { response } = await send(makeEnv(), net.impl, broken, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(net.calls.length, 1);
    assert.match(net.calls[0].url, /\/cdn-cgi\/access\/certs$/);
  });

  it("returns 403 when aud does not equal POLICY_AUD", async () => {
    const net = mockFetch();
    const token = await signToken({ aud: "otro-aud-0123456789" });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
  });

  it("returns 403 when iss does not equal the team domain", async () => {
    const net = mockFetch();
    const token = await signToken({ iss: "https://otra.cloudflareaccess.com" });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
  });

  it("accepts aud as an array that includes POLICY_AUD", async () => {
    const net = mockFetch();
    const token = await signToken({ aud: [AUD, "otro-aud-0123456789"] });
    const { response } = await send(makeEnv(), net.impl, token, {
      to: ALLOWED,
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    assert.equal(net.gmailCalls().length, 1);
  });

  it("returns 403 when the Access token type is not app", async () => {
    const net = mockFetch();
    const token = await signToken({ type: "org" });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
  });

  it("returns 403 for an HS256 token without calling Gmail", async () => {
    const net = mockFetch();
    const header = b64url(JSON.stringify({ alg: "HS256", kid: "test-key", typ: "JWT" }));
    const payload = b64url(JSON.stringify({
      iss: ISSUER,
      aud: AUD,
      exp: Math.floor(Date.now() / 1000) + 600,
      type: "app",
    }));
    const { response } = await send(makeEnv(), net.impl, `${header}.${payload}.not-rs256`, {
      to: ALLOWED,
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 403);
    assert.equal(net.calls.length, 0);
  });

  it("returns 403 when the JWKS fetch fails", async () => {
    const token = await signToken();
    const calls = [];
    const impl = async (input) => {
      const url = typeof input === "string" ? input : input.url;
      calls.push(url);
      if (url.endsWith("/cdn-cgi/access/certs")) return new Response("down", { status: 500 });
      throw new Error(`unexpected fetch ${url}`);
    };
    const { response } = await send(makeEnv(), impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(calls.some((url) => url === "https://gmail.googleapis.com/gmail/v1/users/me/messages/send"), false);
  });

  it("returns 403 when nbf is in the future", async () => {
    const net = mockFetch();
    const token = await signToken({ nbf: Math.floor(Date.now() / 1000) + 600 });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
  });

  it("returns 403 when exp is in the past", async () => {
    const net = mockFetch();
    const token = await signToken({ exp: Math.floor(Date.now() / 1000) - 30 });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
  });
});

describe("test mode and Gmail payload", () => {
  it("rejects a recipient outside the allowlist and does not call Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response, json } = await send(makeEnv(), net.impl, token, {
      to: "otra@example.com",
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 403);
    assert.equal(json.error, "test_recipient");
    assert.equal(net.gmailCalls().length, 0);
  });

  it("treats a missing OUTREACH_MODE as test", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    delete env.OUTREACH_MODE;
    const { response } = await send(env, net.impl, token, {
      to: "otra@example.com",
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 403);
    assert.equal(net.gmailCalls().length, 0);
  });

  it("sends only the allowlisted recipient and prefixes [PRUEBA]", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const { response, json } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Contraste del botón",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    assert.equal(json.template, TEMPLATE_ID);
    assert.equal(json.gmail_id, "gmail_msg_1");
    assert.equal(net.gmailCalls().length, 1);
    assert.equal(net.tokenCalls().length, 1);
    const message = gmailMessage(net);
    const tokenBody = new URLSearchParams(message.init && net.tokenCalls()[0].init.body);
    assert.equal(tokenBody.get("grant_type"), "refresh_token");
    assert.equal(tokenBody.get("client_id"), env.GMAIL_CLIENT_ID);
    assert.equal(tokenBody.get("client_secret"), env.GMAIL_CLIENT_SECRET);
    assert.equal(tokenBody.get("refresh_token"), env.GMAIL_REFRESH_TOKEN);
    assert.equal(message.from, `${SENDER_NAME} <${SENDER_EMAIL}>`);
    assert.equal(message.headers["reply-to"], SENDER_EMAIL);
    assert.equal(message.headers.to, ALLOWED);
    assert.equal(message.subject, "[PRUEBA] Contraste del botón");
    assert.equal(message.headers["list-unsubscribe"], `<mailto:${SENDER_EMAIL}?subject=baja>`);
    assert.match(message.headers["content-type"], /multipart\/alternative/);
    assert.match(message.html, /El botón de contacto tiene contraste 2\.1:1\./);
    assert.match(message.text, /El botón de contacto tiene contraste 2\.1:1\./);
    assert.ok(message.html.includes(optOutLine(SENDER_EMAIL)));
    assert.ok(message.text.includes(optOutLine(SENDER_EMAIL)));
    assert.ok(message.html.includes(PRIVACY_URL));
    assert.ok(message.text.includes(PRIVACY_URL));
    assert.ok(message.html.includes("Ana &lt;Legal&gt;"));
    assert.ok(!message.html.includes("Ana <Legal>"));
    assert.match(message.html, /utm_source=email&amp;utm_medium=prospeccion&amp;utm_campaign=optica#revision-gratis/);
    assert.match(message.text, /utm_source=email&utm_medium=prospeccion&utm_campaign=optica#revision-gratis/);
    assert.equal(/\$\s*\d/.test(message.html), false);
    assert.equal(/\$\s*\d/.test(message.text), false);
    assert.equal(/^bcc:/im.test(message.mime), false);
    assert.match(message.init.headers.authorization, /^Bearer ya29\.test-token$/);
    assert.equal(message.init.headers["content-type"], "application/json");

    const log = JSON.parse(await env.OUTREACH_KV.get(`log:${json.id}`));
    assert.deepEqual(Object.keys(log).sort(), ["base", "error", "fuente", "gmail_id", "id", "result", "template", "timestamp", "to"]);
    assert.equal(log.to, ALLOWED);
    assert.equal(log.template, TEMPLATE_ID);
    assert.equal(log.gmail_id, "gmail_msg_1");
    assert.equal(log.fuente, FUENTE);
    assert.equal(log.base, BASE);
    assert.equal(log.result, "sent");
    assert.equal(log.empresa, undefined);
    assert.equal(log.hallazgo, undefined);
    assert.equal(env.OUTREACH_KV.meta.get(`log:${json.id}`).expirationTtl, LOG_TTL_SEC);
  });

  it("does not prefix the subject in live mode and allows another recipient", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response } = await send(makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: counterBinding() }), net.impl, token, {
      to: "lead@example.com",
      subject: "Contraste del botón",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    const message = gmailMessage(net);
    assert.equal(message.subject, "Contraste del botón");
    assert.equal(message.from, `${SENDER_NAME} <${SENDER_EMAIL}>`);
    assert.equal(message.headers["reply-to"], SENDER_EMAIL);
    assert.equal(message.headers.to, "lead@example.com");
    assert.equal(message.headers["list-unsubscribe"], `<mailto:${SENDER_EMAIL}?subject=baja>`);
    assert.equal(typeof message.html, "string");
    assert.equal(typeof message.text, "string");
  });

  it("sends when empresa and rubro are substrings of the canonical URL", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response } = await send(makeEnv(), net.impl, token, {
      to: ALLOWED,
      subject: "Servicios",
      fields: fields({ empresa: "servicios", rubro: "email" }),
    });
    assert.equal(response.status, 200);
    const message = gmailMessage(net);
    assert.match(message.text, /utm_source=email&utm_medium=prospeccion&utm_campaign=email#revision-gratis/);
    assert.match(message.text, /sitio de servicios/);
  });

  it("sends a finding that mentions null, mustache braces, or /news/", async () => {
    const net = mockFetch();
    const token = await signToken();
    const hallazgo = "El alt queda null, el template muestra {{nombre}} y la ruta /news/ no tiene título.";
    const { response } = await send(makeEnv(), net.impl, token, {
      to: ALLOWED,
      subject: "Hallazgo con null",
      fields: fields({ hallazgo }),
    });
    assert.equal(response.status, 200);
    const message = gmailMessage(net);
    assert.match(message.text, /ruta \/news\//);
    assert.match(message.text, /\{\{nombre\}\}/);
    assert.equal(net.gmailCalls().length, 1);
  });

  it("returns 403 when the test allowlist is empty", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response, json } = await send(makeEnv({ TEST_ALLOWLIST: "  " }), net.impl, token, {
      to: ALLOWED,
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 403);
    assert.equal(json.error, "test_recipient");
    assert.equal(net.gmailCalls().length, 0);
  });

  it("rejects a recipient with CR or LF and does not call Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response } = await send(makeEnv(), net.impl, token, {
      to: `${ALLOWED}\r\nBcc: otro@example.com`,
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 400);
    assert.equal(net.gmailCalls().length, 0);
  });

  it("refuses a price or a missing hallazgo without calling Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const priced = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Hola",
      fields: fields({ hallazgo: "Sale a $50000." }),
    });
    assert.equal(priced.response.status, 400);
    const missing = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Hola",
      fields: fields({ hallazgo: "   " }),
    });
    assert.equal(missing.response.status, 400);
    assert.equal(net.gmailCalls().length, 0);
  });
});

describe("daily cap", () => {
  it("allows 10 sends in the Santiago day and returns 429 on the next without calling Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    for (let i = 0; i < DAILY_CAP; i += 1) {
      const { response } = await send(env, net.impl, token, {
        to: ALLOWED,
        subject: `Nota ${i}`,
        fields: fields(),
      });
      assert.equal(response.status, 200);
    }
    assert.equal(net.gmailCalls().length, DAILY_CAP);
    const blocked = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "De más",
      fields: fields(),
    });
    assert.equal(blocked.response.status, 429);
    assert.equal(blocked.json.error, "cap");
    assert.equal(net.gmailCalls().length, DAILY_CAP);
  });

  it("returns 503 when the cap value is corrupt and does not call Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    await env.OUTREACH_KV.put(capKey(), "nope");
    const { response, json } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 503);
    assert.equal(json.error, "cap");
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), "nope");
  });

  it("reserves a cap slot before Gmail and rolls it back when Gmail fails", async () => {
    const net = mockFetch({ gmailStatus: 500, gmailBody: "{}" });
    const token = await signToken();
    const env = makeEnv();
    const reserved = capKey();
    const { response } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Falla",
      fields: fields(),
    });
    assert.equal(response.status, 502);
    assert.equal(net.gmailCalls().length, 1);
    assert.equal(await env.OUTREACH_KV.get(reserved), "0");
  });

  it("returns 503 unconfigured without a Gmail key and does not reserve or fetch the provider", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({ OUTREACH_COUNTER: binding });
    delete env.GMAIL_REFRESH_TOKEN;
    const { response, json } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Sin clave",
      fields: fields(),
    });
    assert.equal(response.status, 503);
    assert.equal(json.error, "unconfigured");
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(net.calls.filter((call) => call.url === "https://gmail.googleapis.com/gmail/v1/users/me/messages/send").length, 0);
    assert.equal(binding.calls.filter((call) => call.op === "reserve").length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), null);
  });

  it("returns 5xx when the durable object reserve throws and does not call Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const stub = binding.get(binding.idFromName("outreach"));
    stub.reserve = () => {
      throw new Error("reserve-down");
    };
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    const { response, json } = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Reserva rota",
      fields: fields(),
    });
    assert.ok(response.status >= 500 && response.status < 600);
    assert.equal(json.error, "cap");
    assert.equal(net.gmailCalls().length, 0);
  });

  it("logs a thrown rollback and still returns the Gmail error", async () => {
    const net = mockFetch({ gmailStatus: 422, gmailBody: "{}" });
    const token = await signToken();
    const binding = counterBinding();
    const stub = binding.get(binding.idFromName("outreach"));
    stub.rollback = () => {
      throw new Error("rollback-down");
    };
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    const lines = [];
    const original = console.log;
    console.log = (...args) => {
      lines.push(args.map(String).join(" "));
    };
    try {
      const { response, json } = await send(env, net.impl, token, {
        to: "lead@example.com",
        subject: "Devolución rota",
        fields: fields(),
      });
      assert.equal(response.status, 502);
      assert.equal(json.error, "gmail_error");
      const logged = lines.find((line) => line.includes("outreach_cap_rollback"));
      assert.ok(logged);
      const event = JSON.parse(logged);
      assert.equal(event.event, "outreach_cap_rollback");
      assert.equal(event.result, "failed");
      assert.equal(event.store, "do");
      assert.equal(event.key, capKey(LIVE_AT));
      assert.equal(logged.includes("lead@example.com"), false);
      assert.equal(logged.includes(token), false);
      assert.equal(binding.caps.get(event.key), 1);
    } finally {
      console.log = original;
    }
  });

  it("logs a thrown KV rollback and still returns the Gmail error", async () => {
    const net = mockFetch({ gmailStatus: 500, gmailBody: "{}" });
    const token = await signToken();
    const env = makeEnv();
    const put = env.OUTREACH_KV.put.bind(env.OUTREACH_KV);
    env.OUTREACH_KV.put = async (key, value, options) => {
      if (String(key).startsWith("cap:") && value === "0") throw new Error("kv-down");
      return put(key, value, options);
    };
    const lines = [];
    const original = console.log;
    console.log = (...args) => {
      lines.push(args.map(String).join(" "));
    };
    try {
      const { response, json } = await send(env, net.impl, token, {
        to: ALLOWED,
        subject: "Devolución KV rota",
        fields: fields(),
      });
      assert.equal(response.status, 502);
      assert.equal(json.error, "gmail_error");
      const event = JSON.parse(lines.find((line) => line.includes("outreach_cap_rollback")));
      assert.equal(event.result, "failed");
      assert.equal(event.store, "kv");
      assert.equal(event.key, capKey());
      assert.equal(lines.join("\n").includes(ALLOWED), false);
      assert.equal(lines.join("\n").includes(token), false);
      assert.equal(await env.OUTREACH_KV.get(capKey()), "1");
    } finally {
      console.log = original;
    }
  });

  it("does not refund the cap when the provider call times out or aborts", async () => {
    for (const error of [new DOMException("timed out", "TimeoutError"), new DOMException("aborted", "AbortError")]) {
      const net = mockFetch();
      const token = await signToken();
      const binding = counterBinding();
      const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
      const impl = async (input, init) => {
        const url = typeof input === "string" ? input : input.url;
        if (url === GMAIL_SEND_URL) {
          net.calls.push({ url, init });
          throw error;
        }
        return net.impl(input, init);
      };
      const reserved = capKey(LIVE_AT);
      const { response, json } = await send(env, impl, token, {
        to: "lead@example.com",
        subject: "Sin confirmación",
        fields: fields(),
      });
      assert.equal(response.status, 502);
      assert.equal(json.error, "gmail_error");
      assert.equal(net.gmailCalls().length, 1);
      assert.equal(binding.calls.filter((call) => call.op === "rollback").length, 0);
      assert.equal(binding.caps.get(reserved), 1);
    }
  });

  it("does not refund the KV cap when the provider call fails on the network", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const impl = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === "https://gmail.googleapis.com/gmail/v1/users/me/messages/send") throw new TypeError("network");
      return net.impl(input, init);
    };
    const reserved = capKey();
    const { response } = await send(env, impl, token, {
      to: ALLOWED,
      subject: "Red",
      fields: fields(),
    });
    assert.equal(response.status, 502);
    assert.equal(await env.OUTREACH_KV.get(reserved), "1");
  });

  it("refunds a definite 4xx and 5xx onto the reserved day key", async () => {
    for (const status of [422, 503]) {
      const net = mockFetch({ gmailStatus: status, gmailBody: "{}" });
      const token = await signToken();
      const binding = counterBinding();
      const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
      const reserved = capKey(LIVE_AT);
      const { response } = await send(env, net.impl, token, {
        to: "lead@example.com",
        subject: `Status ${status}`,
        fields: fields(),
      });
      assert.equal(response.status, 502);
      assert.deepEqual(
        binding.calls.filter((call) => call.op === "rollback").map((call) => call.key),
        [reserved],
      );
      assert.equal(binding.caps.get(reserved), 0);
    }
  });
});

describe("suppression", () => {
  it("stores a suppression from POST /suppress and refuses the next send", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: counterBinding() });
    const added = await handleRequest(
      request("/suppress", { token, body: { email: "Lead@Example.com", reason: "baja" } }),
      env,
      net.impl,
    );
    assert.equal(added.status, 200);
    const { response, json } = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 409);
    assert.equal(json.error, "suppressed");
    assert.equal(net.gmailCalls().length, 0);
  });

  it("does not write any address when a later suppress entry is invalid", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const response = await handleRequest(
      request("/suppress", { token, body: { emails: ["ok@example.com", "no-es-correo"] } }),
      env,
      net.impl,
    );
    assert.equal(response.status, 400);
    assert.equal(await env.OUTREACH_KV.get("suppress:ok@example.com"), null);
  });

  it("does not suppress when /suppress has no valid JWT", async () => {
    const net = mockFetch();
    const env = makeEnv();
    const response = await handleRequest(
      request("/suppress", { body: { email: ALLOWED } }),
      env,
      net.impl,
    );
    assert.equal(response.status, 403);
    assert.equal(await env.OUTREACH_KV.get(`suppress:${ALLOWED}`), null);
    assert.equal(net.calls.length, 0);
  });
});

describe("halt", () => {
  it("blocks /send while state:halt is set and /resume clears it", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    await setHalt(env.OUTREACH_KV, { reason: "manual", at: "2026-07-13T21:20:00.000Z" });
    const blocked = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Durante el corte",
      fields: fields(),
    });
    assert.equal(blocked.response.status, 409);
    assert.equal(blocked.json.error, "halted");
    assert.equal(net.gmailCalls().length, 0);
    const resumed = await handleRequest(request("/resume", { token, body: {} }), env, net.impl);
    assert.equal(resumed.status, 200);
    const again = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Después del resume",
      fields: fields(),
    });
    assert.equal(again.response.status, 200);
    assert.equal(net.gmailCalls().length, 1);
  });
});

describe("live gate", () => {
  it("returns false from isLiveMode unless mode is live and the counter binding is present", () => {
    const binding = counterBinding();
    assert.equal(isLiveMode({ OUTREACH_MODE: "live" }), false);
    assert.equal(isLiveMode({ OUTREACH_MODE: "test", OUTREACH_COUNTER: binding }), false);
    assert.equal(isLiveMode({ OUTREACH_MODE: "live", OUTREACH_COUNTER: {} }), false);
    assert.equal(isLiveMode({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding }), true);
  });

  it("refuses live mode without the durable object binding and does not call Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv({ OUTREACH_MODE: "live" });
    const { response, json } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Sin contador",
      fields: fields(),
    });
    assert.equal(response.status, 503);
    assert.equal(json.error, "live_gate");
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(net.calls.length, 1);
    assert.equal(await env.OUTREACH_KV.get(capKey()), null);
  });

  it("sends in live mode when the durable object binding is present and leaves the KV cap untouched", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    const { response, json } = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Con contador",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    assert.equal(json.template, TEMPLATE_ID);
    assert.equal(net.gmailCalls().length, 1);
    const message = gmailMessage(net);
    assert.equal(message.subject, "Con contador");
    assert.equal(message.headers.to, "lead@example.com");
    const reserves = binding.calls.filter((call) => call.op === "reserve");
    assert.equal(reserves.length, 1);
    assert.match(reserves[0].key, /^cap:\d{4}-\d{2}-\d{2}$/);
    assert.equal(reserves[0].cap, DAILY_CAP);
    assert.equal(binding.caps.get(reserves[0].key), 1);
    assert.equal(await env.OUTREACH_KV.get(reserves[0].key), null);
  });

  it("keeps the test-mode cap on KV when the durable object binding exists", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({ OUTREACH_COUNTER: binding });
    const { response } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Sigue en KV",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    assert.equal(binding.calls.filter((call) => call.op === "reserve").length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), "1");
  });

  it("returns 429 from the durable object cap without calling Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const key = capKey(LIVE_AT);
    binding.caps.set(key, DAILY_CAP);
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    const { response, json } = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Tope",
      fields: fields(),
    });
    assert.equal(response.status, 429);
    assert.equal(json.error, "cap");
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(binding.caps.get(key), DAILY_CAP);
  });
});

describe("midnight cap rollback", () => {
  it("decrementCap writes the reserved key and not the following Santiago day", async () => {
    const kv = new MemoryKV();
    const reservedAt = new Date(BEFORE_SANTIAGO_MIDNIGHT);
    const later = new Date(AFTER_SANTIAGO_MIDNIGHT);
    const reserved = await incrementCap(kv, reservedAt);
    assert.equal(reserved.key, capKey(reservedAt));
    assert.notEqual(reserved.key, capKey(later));
    await decrementCap(kv, reserved.key);
    assert.equal(await kv.get(reserved.key), "0");
    assert.equal(await kv.get(capKey(later)), null);
  });

  it("rolls the KV cap back onto the reserved key when Gmail fails after midnight", async () => {
    const { env, reservedKey, laterKey, net } = await sendAcrossMidnight({ live: false });
    assert.equal(net.gmailCalls().length, 1);
    assert.equal(await env.OUTREACH_KV.get(reservedKey), "0");
    assert.equal(await env.OUTREACH_KV.get(laterKey), null);
  });

  it("rolls the durable object cap back onto the reserved key when Gmail fails after midnight", async () => {
    const { binding, reservedKey, laterKey, net } = await sendAcrossMidnight({ live: true });
    assert.equal(net.gmailCalls().length, 1);
    assert.deepEqual(
      binding.calls.filter((call) => call.op === "reserve").map((call) => call.key),
      [reservedKey],
    );
    assert.deepEqual(
      binding.calls.filter((call) => call.op === "rollback").map((call) => call.key),
      [reservedKey],
    );
    assert.equal(binding.caps.get(reservedKey), 0);
    assert.equal(binding.caps.has(laterKey), false);
  });
});

describe("durable object cap", () => {
  it("rolls back only the reserved day and refuses a cap above 10", () => {
    const counter = openCounter();
    const reserved = "cap:2026-06-14";
    const later = "cap:2026-06-15";
    assert.equal(counter.reserve(reserved, DAILY_CAP).ok, true);
    assert.deepEqual(counter.rollback(reserved), { ok: true, key: reserved, count: 0 });
    assert.equal(counter.reserve(reserved, DAILY_CAP).count, 1);
    assert.deepEqual(counter.rollback(later), { ok: true, key: later, count: 0 });
    assert.equal(counter.reserve(reserved, DAILY_CAP).count, 2);
    assert.equal(counter.reserve(later, 2).count, 1);
    assert.equal(counter.reserve(later, 2).count, 2);
    assert.equal(counter.reserve(later, 2).ok, false);
    assert.equal(counter.reserve("cap:2026-06-16", DAILY_CAP_MAX).ok, true);
    assert.throws(() => counter.reserve(reserved, 0), /cap/);
    assert.throws(() => counter.reserve("cap:2026-06-17", DAILY_CAP_MAX + 1), /cap/);
  });
});

describe("compliance, window, and Gmail auth", () => {
  it("returns 400 when fuente or base is missing and does not call Gmail", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const missingFuente = await handleRequest(
      request("/send", {
        token,
        body: { to: ALLOWED, subject: "Hola", base: BASE, fields: fields() },
      }),
      env,
      net.impl,
    );
    assert.equal(missingFuente.status, 400);
    const badBase = await handleRequest(
      request("/send", {
        token,
        body: { to: ALLOWED, subject: "Hola", fuente: FUENTE, base: "manual", fields: fields() },
      }),
      env,
      net.impl,
    );
    assert.equal(badBase.status, 400);
    const tooLong = await handleRequest(
      request("/send", {
        token,
        body: { to: ALLOWED, subject: "Hola", fuente: "x".repeat(201), base: "interes_legitimo", fields: fields() },
      }),
      env,
      net.impl,
    );
    assert.equal(tooLong.status, 400);
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(net.tokenCalls().length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), null);
  });

  it("stores fuente and base on the send record", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const fuente = "Directorio público de la cámara, ficha 2026";
    const { response, json } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Fuente",
      fuente,
      base: "interes_legitimo",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    const log = JSON.parse(await env.OUTREACH_KV.get(`log:${json.id}`));
    assert.equal(log.fuente, fuente);
    assert.equal(log.base, "interes_legitimo");
    assert.equal(log.to, ALLOWED);
  });

  it("rejects a subject with CR or LF before reserving", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const { response } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Hola\r\nBcc: otro@example.com",
      fields: fields(),
    });
    assert.equal(response.status, 400);
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(net.tokenCalls().length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), null);
  });

  it("returns 503 when the From name contains CR or LF and does not reserve", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({
      OUTREACH_MODE: "live",
      OUTREACH_COUNTER: binding,
      SENDER_NAME: "Viento\r\nBcc: otro@example.com",
    });
    const { response, json } = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Nombre",
      fields: fields(),
    });
    assert.equal(response.status, 503);
    assert.equal(json.error, "unconfigured");
    assert.equal(net.tokenCalls().length, 0);
    assert.equal(binding.calls.filter((call) => call.op === "reserve").length, 0);
  });

  it("keeps test mode open on Sunday and refuses live mode outside the Santiago window", async () => {
    const sunday = new Date("2026-07-12T21:20:00.000Z");
    assert.equal(isInsideSendWindow(sunday), false);
    const net = mockFetch();
    const token = await signToken();
    const testSend = await send(makeEnv(), net.impl, token, {
      to: ALLOWED,
      subject: "Domingo",
      fields: fields(),
    }, sunday);
    assert.equal(testSend.response.status, 200);

    const liveNet = mockFetch();
    const live = await send(makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: counterBinding() }), liveNet.impl, token, {
      to: "lead@example.com",
      subject: "Domingo",
      fields: fields(),
    }, sunday);
    assert.equal(live.response.status, 403);
    assert.equal(live.json.error, "outside_window");
    assert.equal(liveNet.gmailCalls().length, 0);
    assert.equal(liveNet.tokenCalls().length, 0);
  });

  it("applies the Monday window in both Santiago offsets", async () => {
    const winterInside = new Date("2026-07-13T21:20:00.000Z");
    const winterOutside = new Date("2026-07-13T20:20:00.000Z");
    const summerInside = new Date("2026-11-09T20:20:00.000Z");
    const summerOutside = new Date("2026-11-09T21:20:00.000Z");
    assert.equal(isInsideSendWindow(winterInside), true);
    assert.equal(isInsideSendWindow(winterOutside), false);
    assert.equal(isInsideSendWindow(summerInside), true);
    assert.equal(isInsideSendWindow(summerOutside), false);
    assert.equal(isInsideSendWindow(new Date("2026-07-13T21:14:00.000Z")), false);
    assert.equal(isInsideSendWindow(new Date("2026-07-13T21:15:00.000Z")), true);
    assert.equal(isInsideSendWindow(new Date("2026-07-13T21:35:59.000Z")), true);
    assert.equal(isInsideSendWindow(new Date("2026-07-13T21:36:00.000Z")), false);
    assert.equal(isInsideSendWindow(new Date("2026-07-11T21:20:00.000Z")), false);

    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: counterBinding() });
    const opened = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Dentro",
      fields: fields(),
    }, summerInside);
    assert.equal(opened.response.status, 200);
    const closed = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Fuera",
      fields: fields(),
    }, summerOutside);
    assert.equal(closed.response.status, 403);
    assert.equal(closed.json.error, "outside_window");
  });

  it("honors DAILY_CAP in live mode and ignores it in test mode", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding, DAILY_CAP: "2" });
    for (let i = 0; i < 2; i += 1) {
      const { response } = await send(env, net.impl, token, {
        to: "lead@example.com",
        subject: `Cupo ${i}`,
        fields: fields(),
      });
      assert.equal(response.status, 200);
    }
    const blocked = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "De más",
      fields: fields(),
    });
    assert.equal(blocked.response.status, 429);
    assert.equal(net.gmailCalls().length, 2);

    const bad = mockFetch();
    const invalid = await send(makeEnv({
      OUTREACH_MODE: "live",
      OUTREACH_COUNTER: counterBinding(),
      DAILY_CAP: "0",
    }), bad.impl, token, {
      to: "lead@example.com",
      subject: "Tope inválido",
      fields: fields(),
    });
    assert.equal(invalid.response.status, 503);
    assert.equal(invalid.json.error, "cap");
    assert.equal(bad.gmailCalls().length, 0);

    const overBinding = counterBinding();
    const over = mockFetch();
    const overSend = await send(makeEnv({
      OUTREACH_MODE: "live",
      OUTREACH_COUNTER: overBinding,
      DAILY_CAP: "11",
    }), over.impl, token, {
      to: "lead@example.com",
      subject: "Tope alto",
      fields: fields(),
    });
    assert.equal(overSend.response.status, 503);
    assert.equal(overSend.json.error, "cap");
    assert.equal(over.gmailCalls().length, 0);
    assert.equal(overBinding.calls.filter((call) => call.op === "reserve").length, 0);

    const testNet = mockFetch();
    const testEnv = makeEnv({ DAILY_CAP: "1" });
    const first = await send(testEnv, testNet.impl, token, {
      to: ALLOWED,
      subject: "Test uno",
      fields: fields(),
    });
    const second = await send(testEnv, testNet.impl, token, {
      to: ALLOWED,
      subject: "Test dos",
      fields: fields(),
    });
    assert.equal(first.response.status, 200);
    assert.equal(second.response.status, 200);
  });

  it("reuses the access token until it expires", async () => {
    const net = mockFetch({ expiresIn: 3600 });
    const token = await signToken();
    const env = makeEnv();
    const firstAt = new Date("2026-07-13T21:20:00.000Z");
    const first = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Uno",
      fields: fields(),
    }, firstAt);
    assert.equal(first.response.status, 200);
    const second = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Dos",
      fields: fields(),
    }, new Date(firstAt.getTime() + 30 * 60 * 1000));
    assert.equal(second.response.status, 200);
    assert.equal(net.tokenCalls().length, 1);
    const third = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Tres",
      fields: fields(),
    }, new Date(firstAt.getTime() + 2 * 60 * 60 * 1000));
    assert.equal(third.response.status, 200);
    assert.equal(net.tokenCalls().length, 2);
  });

  it("refunds a token failure and keeps the cap when the send call times out", async () => {
    const tokenDown = mockFetch({ tokenStatus: 401 });
    const token = await signToken();
    const env = makeEnv();
    const failed = await send(env, tokenDown.impl, token, {
      to: ALLOWED,
      subject: "Token",
      fields: fields(),
    });
    assert.equal(failed.response.status, 502);
    assert.equal(failed.json.error, "gmail_error");
    assert.equal(tokenDown.gmailCalls().length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), "0");

    const net = mockFetch();
    const live = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: counterBinding() });
    const impl = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === GMAIL_SEND_URL) throw new DOMException("timed out", "TimeoutError");
      return net.impl(input, init);
    };
    const timed = await send(live, impl, token, {
      to: "lead@example.com",
      subject: "Timeout",
      fields: fields(),
    });
    assert.equal(timed.response.status, 502);
    assert.equal(live.OUTREACH_COUNTER.calls.filter((call) => call.op === "rollback").length, 0);
    assert.equal(live.OUTREACH_COUNTER.caps.get(capKey(LIVE_AT)), 1);
  });

  it("is idempotent for bounce and baja and rejects any other reason", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const lines = [];
    const original = console.log;
    console.log = (...args) => {
      lines.push(args.map(String).join(" "));
    };
    try {
      for (const reason of ["baja", "baja"]) {
        const response = await handleRequest(
          request("/suppress", { token, body: { email: "Lead@Example.com", reason } }),
          env,
          net.impl,
        );
        assert.equal(response.status, 200);
        const body = await response.json();
        assert.equal(body.ok, true);
        assert.equal(body.suppressed, 1);
      }
      const bounce = await handleRequest(
        request("/suppress", { token, body: { email: "rebote@example.com", reason: "bounce" } }),
        env,
        net.impl,
      );
      assert.equal(bounce.status, 200);
      const bad = await handleRequest(
        request("/suppress", { token, body: { email: ALLOWED, reason: "complaint" } }),
        env,
        net.impl,
      );
      assert.equal(bad.status, 400);
      const broken = await handleRequest(
        request("/suppress", { token, body: { email: "no-es-correo", reason: "baja" } }),
        env,
        net.impl,
      );
      assert.equal(broken.status, 400);
      assert.equal(await env.OUTREACH_KV.get("suppress:lead@example.com") != null, true);
      assert.equal(await env.OUTREACH_KV.get("suppress:rebote@example.com") != null, true);
      assert.equal(await env.OUTREACH_KV.get(`suppress:${ALLOWED}`), null);
      assert.equal(lines.join("\n").includes("Lead@Example.com"), false);
      assert.equal(lines.join("\n").includes("rebote@example.com"), false);
    } finally {
      console.log = original;
    }
  });

  it("rejects a display-name address and does not send", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const { response } = await send(env, net.impl, token, {
      to: "Bob<evil@x.cl>",
      subject: "Inyección",
      fields: fields(),
    });
    assert.equal(response.status, 400);
    assert.equal(net.gmailCalls().length, 0);
    assert.equal(net.tokenCalls().length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), null);
    const suppressed = await handleRequest(
      request("/suppress", { token, body: { email: "Bob<evil@x.cl>", reason: "baja" } }),
      env,
      net.impl,
    );
    assert.equal(suppressed.status, 400);
    assert.equal(await env.OUTREACH_KV.get("suppress:bob<evil@x.cl>"), null);
    assert.equal(normalizeEmail("Bob<evil@x.cl>"), null);
    assert.equal(normalizeEmail("a b@x.cl"), null);
    assert.equal(normalizeEmail("a@x.cl\u0001"), null);
  });

  it("encodes RFC 2047 on code points and keeps Subject lines within 78", () => {
    const subject = `${"a".repeat(44)}ñandú`;
    const encoded = encodeRfc2047(subject, "Subject: ");
    const lines = encoded.split("\r\n");
    assert.ok(lines.length >= 2);
    assert.ok(("Subject: " + lines[0]).length <= 78);
    for (const line of lines.slice(1)) {
      assert.equal(line.startsWith(" "), true);
      assert.ok(line.length <= 78);
    }
    assert.equal(decodeEncodedWords(encoded), subject);

    const name = `${"Ñandú ".repeat(12)}Árbol`;
    assert.ok(new TextEncoder().encode(name).length > 45);
    const fromEncoded = encodeRfc2047(name, "From: ");
    const fromLines = fromEncoded.split("\r\n");
    assert.ok(("From: " + fromLines[0]).length <= 78);
    for (const line of fromLines.slice(1)) assert.ok(line.length <= 78);
    assert.equal(decodeEncodedWords(fromEncoded), name);

    const raw = buildRawMessage({
      fromName: name,
      fromEmail: SENDER_EMAIL,
      replyTo: SENDER_EMAIL,
      to: ALLOWED,
      subject,
      text: "hola",
      html: "<p>hola</p>",
    });
    const pad = raw.length % 4 === 0 ? "" : "=".repeat(4 - (raw.length % 4));
    const mime = Buffer.from(`${raw.replaceAll("-", "+").replaceAll("_", "/")}${pad}`, "base64").toString("utf8");
    const physical = mime.slice(0, mime.indexOf("\r\n\r\n")).split("\r\n");
    let header = "";
    for (const line of physical) {
      if (line.startsWith(" ") || line.startsWith("\t")) {
        if (header === "Subject" || header === "From") assert.ok(line.length <= 78);
      } else {
        const nameEnd = line.indexOf(":");
        header = line.slice(0, nameEnd);
        if (header === "Subject" || header === "From") assert.ok(line.length <= 78);
      }
    }
  });

  it("hashes the refresh token for the cache key and retries a 401 without a second reserve", async () => {
    const key = await refreshTokenCacheKey("test-refresh-token");
    assert.equal(key.length, 64);
    assert.equal(key.includes("test-refresh-token"), false);
    assert.equal(await refreshTokenCacheKey("other-refresh-token") === key, false);

    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    let sends = 0;
    const impl = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === GMAIL_SEND_URL) {
        sends += 1;
        net.calls.push({ url, init });
        if (sends === 1) return new Response("unauthorized", { status: 401 });
      }
      return net.impl(input, init);
    };
    const { response, json } = await send(env, impl, token, {
      to: "lead@example.com",
      subject: "Reintento",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    assert.equal(json.gmail_id, "gmail_msg_1");
    assert.equal(sends, 2);
    assert.equal(binding.calls.filter((call) => call.op === "reserve").length, 1);
    assert.equal(binding.calls.filter((call) => call.op === "rollback").length, 0);
    assert.equal(binding.caps.get(capKey(LIVE_AT)), 1);
    assert.equal(net.tokenCalls().length, 2);

    resetGmailTokenCache();
    const other = mockFetch();
    const rotated = makeEnv({ GMAIL_REFRESH_TOKEN: "other-refresh-token" });
    const again = await send(rotated, other.impl, token, {
      to: ALLOWED,
      subject: "Otra clave",
      fields: fields(),
    });
    assert.equal(again.response.status, 200);
    assert.equal(other.tokenCalls().length, 1);
  });

  it("does not send a third time after two Gmail 401s", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    let sends = 0;
    const impl = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === GMAIL_SEND_URL) {
        sends += 1;
        net.calls.push({ url, init });
        return new Response("unauthorized", { status: 401 });
      }
      return net.impl(input, init);
    };
    const { response } = await send(env, impl, token, {
      to: "lead@example.com",
      subject: "Dos 401",
      fields: fields(),
    });
    assert.equal(response.status, 502);
    assert.equal(sends, 2);
    assert.equal(binding.calls.filter((call) => call.op === "reserve").length, 1);
    assert.equal(binding.calls.filter((call) => call.op === "rollback").length, 1);
    assert.equal(binding.caps.get(capKey(LIVE_AT)), 0);
  });

  it("retries a 401 from the token endpoint without reserving twice", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    let tokens = 0;
    const impl = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === GMAIL_TOKEN_URL) {
        tokens += 1;
        net.calls.push({ url, init });
        if (tokens === 1) return new Response("unauthorized", { status: 401 });
      }
      return net.impl(input, init);
    };
    const { response } = await send(env, impl, token, {
      to: "lead@example.com",
      subject: "Token",
      fields: fields(),
    });
    assert.equal(response.status, 200);
    assert.equal(tokens, 2);
    assert.equal(binding.calls.filter((call) => call.op === "reserve").length, 1);
    assert.equal(net.gmailCalls().length, 1);
  });

  it("turns the global halt on and off through POST /halt", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv();
    const missing = await handleRequest(
      request("/halt", { body: { on: true } }),
      env,
      net.impl,
    );
    assert.equal(missing.status, 403);
    const bad = await handleRequest(
      request("/halt", { token, body: { on: "true" } }),
      env,
      net.impl,
    );
    assert.equal(bad.status, 400);
    const halted = await handleRequest(
      request("/halt", { token, body: { on: true } }),
      env,
      net.impl,
    );
    assert.equal(halted.status, 200);
    assert.equal((await halted.json()).halted, true);
    const blocked = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Cortado",
      fields: fields(),
    });
    assert.equal(blocked.response.status, 409);
    assert.equal(blocked.json.error, "halted");
    assert.equal(net.gmailCalls().length, 0);
    const cleared = await handleRequest(
      request("/halt", { token, body: { on: false } }),
      env,
      net.impl,
    );
    assert.equal(cleared.status, 200);
    assert.equal((await cleared.json()).halted, false);
    const opened = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Otra vez",
      fields: fields(),
    });
    assert.equal(opened.response.status, 200);
  });

  it("answers /webhook/resend with 404", async () => {
    const response = await handleRequest(
      request("/webhook/resend", { body: { type: "email.bounced" } }),
      makeEnv(),
    );
    assert.equal(response.status, 404);
  });
});

describe("browser surface", () => {
  it("answers OPTIONS with 405 and no CORS header", async () => {
    const response = await handleRequest(
      request("/send", { method: "OPTIONS" }),
      makeEnv(),
    );
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("access-control-allow-origin"), null);
    assert.equal(response.headers.get("access-control-allow-headers"), null);
  });
});

function decodeEncodedWords(value) {
  const collapsed = value.replace(/\r\n[ \t]+/g, " ").replace(/(\?=)\s+(=\?)/g, "$1$2");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let out = "";
  for (const match of collapsed.matchAll(/=\?UTF-8\?B\?([A-Za-z0-9+/=]+)\?=/gi)) {
    out += decoder.decode(Buffer.from(match[1], "base64"));
  }
  return out;
}

function openCounter() {
  const db = new DatabaseSync(":memory:");
  const sql = {
    exec(query, ...params) {
      const stmt = db.prepare(query);
      if (/^\s*(SELECT|WITH)\b/i.test(query)) {
        const rows = stmt.all(...params);
        return { toArray() { return rows; } };
      }
      stmt.run(...params);
      return { toArray() { return []; } };
    },
  };
  return new OutreachCounter({
    storage: { sql },
    blockConcurrencyWhile(fn) {
      return fn();
    },
  }, {});
}

async function sendAcrossMidnight({ live }) {
  const startMs = live ? LIVE_AT.getTime() : BEFORE_SANTIAGO_MIDNIGHT;
  const jumpMs = live ? 12 * 60 * 60 * 1000 : 60_000;
  const reservedAt = new Date(startMs);
  const laterAt = new Date(startMs + jumpMs);
  const reservedKey = capKey(reservedAt);
  const laterKey = capKey(laterAt);
  assert.notEqual(reservedKey, laterKey);
  const net = mockFetch({ gmailStatus: 500, gmailBody: "{}" });
  const token = await signToken({
    exp: Math.floor(startMs / 1000) + 48 * 3600,
  });
  const binding = live ? counterBinding() : null;
  const env = makeEnv(live ? { OUTREACH_MODE: "live", OUTREACH_COUNTER: binding } : {});
  const clock = installClock(startMs);
  try {
    const impl = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === GMAIL_SEND_URL) clock.advance(jumpMs);
      return net.impl(input, init);
    };
    const { response } = await send(env, impl, token, {
      to: live ? "lead@example.com" : ALLOWED,
      subject: "Cruza medianoche",
      fields: fields(),
    }, live ? reservedAt : undefined);
    assert.equal(response.status, 502);
    assert.equal(Date.now(), startMs + jumpMs);
    return { env, binding, reservedKey, laterKey, net };
  } finally {
    clock.restore();
  }
}

