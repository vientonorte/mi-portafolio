import assert from "node:assert/strict";
import { afterEach, before, describe, it } from "node:test";
import { DatabaseSync } from "node:sqlite";
import { DAILY_CAP, FROM, REPLY_TO, TEMPLATE_ID, WEBHOOK_DEDUPE_TTL_SEC, WEBHOOK_TOLERANCE_SEC } from "../src/constants.js";
import { OutreachCounter } from "../src/counter.js";
import { handleRequest } from "../src/index.js";
import { capKey, decrementCap, incrementCap, isLiveMode, LOG_TTL_SEC } from "../src/store.js";
import { OPT_OUT_LINE } from "../src/templates.js";

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
    claimWebhook(id, ttlSec, now) {
      calls.push({ op: "claim", id, ttlSec, now });
      const expires = claims.get(id);
      if (expires != null && expires > now) return { ok: false };
      claims.set(id, now + ttlSec * 1000);
      return { ok: true };
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
    claims,
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

function makeEnv(overrides = {}) {
  return {
    OUTREACH_KV: new MemoryKV(),
    OUTREACH_MODE: "test",
    TEST_ALLOWLIST: ALLOWED,
    TEAM_DOMAIN: ISSUER,
    POLICY_AUD: AUD,
    RESEND_API_KEY: "re_test_key_value",
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

function mockFetch({ resendStatus = 200, resendId = "re_msg_1", resendBody } = {}) {
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
    if (url === "https://api.resend.com/emails") {
      const body = resendBody || JSON.stringify({ id: resendId });
      return new Response(body, {
        status: resendStatus,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  };
  globalThis.fetch = () => {
    throw new Error("global fetch should not be used");
  };
  return { impl, calls, resendCalls: () => calls.filter((call) => call.url === "https://api.resend.com/emails") };
}

async function send(env, fetchImpl, token, body) {
  const response = await handleRequest(
    request("/send", { token, body }),
    env,
    fetchImpl,
  );
  const json = await response.json();
  return { response, json };
}

describe("access fail-closed", () => {
  it("returns 403 when TEAM_DOMAIN is unset and does not call Resend", async () => {
    const net = mockFetch();
    const env = makeEnv({ TEAM_DOMAIN: "" });
    const token = await signToken();
    const { response } = await send(env, net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.calls.length, 0);
    assert.equal(response.headers.get("access-control-allow-origin"), null);
  });

  it("returns 403 when POLICY_AUD is unset and does not call Resend", async () => {
    const net = mockFetch();
    const env = makeEnv({ POLICY_AUD: "   " });
    const token = await signToken();
    const { response } = await send(env, net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.resendCalls().length, 0);
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

  it("returns 403 for alg none without calling Resend", async () => {
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
    assert.equal(net.resendCalls().length, 0);
    assert.equal(net.calls.length, 1);
    assert.match(net.calls[0].url, /\/cdn-cgi\/access\/certs$/);
  });

  it("returns 403 when aud does not equal POLICY_AUD", async () => {
    const net = mockFetch();
    const token = await signToken({ aud: "otro-aud-0123456789" });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.resendCalls().length, 0);
  });

  it("returns 403 when iss does not equal the team domain", async () => {
    const net = mockFetch();
    const token = await signToken({ iss: "https://otra.cloudflareaccess.com" });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.resendCalls().length, 0);
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
    assert.equal(net.resendCalls().length, 1);
  });

  it("returns 403 when the Access token type is not app", async () => {
    const net = mockFetch();
    const token = await signToken({ type: "org" });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.resendCalls().length, 0);
  });

  it("returns 403 for an HS256 token without calling Resend", async () => {
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
    assert.equal(calls.some((url) => url === "https://api.resend.com/emails"), false);
  });

  it("returns 403 when nbf is in the future", async () => {
    const net = mockFetch();
    const token = await signToken({ nbf: Math.floor(Date.now() / 1000) + 600 });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.resendCalls().length, 0);
  });

  it("returns 403 when exp is in the past", async () => {
    const net = mockFetch();
    const token = await signToken({ exp: Math.floor(Date.now() / 1000) - 30 });
    const { response } = await send(makeEnv(), net.impl, token, { to: ALLOWED, subject: "Hola", fields: fields() });
    assert.equal(response.status, 403);
    assert.equal(net.resendCalls().length, 0);
  });
});

describe("test mode and Resend payload", () => {
  it("rejects a recipient outside the allowlist and does not call Resend", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response, json } = await send(makeEnv(), net.impl, token, {
      to: "otra@example.com",
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 403);
    assert.equal(json.error, "test_recipient");
    assert.equal(net.resendCalls().length, 0);
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
    assert.equal(net.resendCalls().length, 0);
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
    assert.equal(net.resendCalls().length, 1);
    const init = net.resendCalls()[0].init;
    const payload = JSON.parse(init.body);
    assert.equal(payload.from, FROM);
    assert.equal(payload.reply_to, REPLY_TO);
    assert.deepEqual(payload.to, [ALLOWED]);
    assert.equal(payload.subject, "[PRUEBA] Contraste del botón");
    assert.match(payload.html, /El botón de contacto tiene contraste 2\.1:1\./);
    assert.match(payload.text, /El botón de contacto tiene contraste 2\.1:1\./);
    assert.ok(payload.html.includes(OPT_OUT_LINE));
    assert.ok(payload.text.includes(OPT_OUT_LINE));
    assert.ok(payload.html.includes("Ana &lt;Legal&gt;"));
    assert.ok(!payload.html.includes("Ana <Legal>"));
    assert.match(payload.html, /utm_source=email&amp;utm_medium=prospeccion&amp;utm_campaign=optica#revision-gratis/);
    assert.match(payload.text, /utm_source=email&utm_medium=prospeccion&utm_campaign=optica#revision-gratis/);
    assert.equal(/\$\s*\d/.test(payload.html), false);
    assert.equal(/\$\s*\d/.test(payload.text), false);
    assert.match(init.headers.authorization, /^Bearer re_test_key_value$/);
    assert.equal(init.headers["content-type"], "application/json");
    assert.deepEqual(payload.headers, {
      "List-Unsubscribe": "<mailto:contacto@vientonorte.io?subject=baja>",
    });

    const log = JSON.parse(await env.OUTREACH_KV.get(`log:${json.id}`));
    assert.deepEqual(Object.keys(log).sort(), ["error", "id", "resend_id", "result", "template", "timestamp", "to"]);
    assert.equal(log.to, ALLOWED);
    assert.equal(log.template, TEMPLATE_ID);
    assert.equal(log.resend_id, "re_msg_1");
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
    const payload = JSON.parse(net.resendCalls()[0].init.body);
    assert.equal(payload.subject, "Contraste del botón");
    assert.equal(payload.from, FROM);
    assert.equal(payload.reply_to, REPLY_TO);
    assert.equal(typeof payload.html, "string");
    assert.equal(typeof payload.text, "string");
    assert.deepEqual(payload.headers, {
      "List-Unsubscribe": "<mailto:contacto@vientonorte.io?subject=baja>",
    });
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
    const payload = JSON.parse(net.resendCalls()[0].init.body);
    assert.match(payload.text, /utm_source=email&utm_medium=prospeccion&utm_campaign=email#revision-gratis/);
    assert.match(payload.text, /sitio de servicios/);
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
    const payload = JSON.parse(net.resendCalls()[0].init.body);
    assert.match(payload.text, /ruta \/news\//);
    assert.match(payload.text, /\{\{nombre\}\}/);
    assert.equal(net.resendCalls().length, 1);
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
    assert.equal(net.resendCalls().length, 0);
  });

  it("rejects a recipient with CR or LF and does not call Resend", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response } = await send(makeEnv(), net.impl, token, {
      to: `${ALLOWED}\r\nBcc: otro@example.com`,
      subject: "Hola",
      fields: fields(),
    });
    assert.equal(response.status, 400);
    assert.equal(net.resendCalls().length, 0);
  });

  it("refuses a price or a missing hallazgo without calling Resend", async () => {
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
    assert.equal(net.resendCalls().length, 0);
  });
});

describe("daily cap", () => {
  it("allows 10 sends in the Santiago day and returns 429 on the next without calling Resend", async () => {
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
    assert.equal(net.resendCalls().length, DAILY_CAP);
    const blocked = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "De más",
      fields: fields(),
    });
    assert.equal(blocked.response.status, 429);
    assert.equal(blocked.json.error, "cap");
    assert.equal(net.resendCalls().length, DAILY_CAP);
  });

  it("returns 503 when the cap value is corrupt and does not call Resend", async () => {
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
    assert.equal(net.resendCalls().length, 0);
    assert.equal(await env.OUTREACH_KV.get(capKey()), "nope");
  });

  it("reserves a cap slot before Resend and rolls it back when Resend fails", async () => {
    const net = mockFetch({ resendStatus: 500, resendBody: "{}" });
    const token = await signToken();
    const env = makeEnv();
    const reserved = capKey();
    const { response } = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Falla",
      fields: fields(),
    });
    assert.equal(response.status, 502);
    assert.equal(net.resendCalls().length, 1);
    assert.equal(await env.OUTREACH_KV.get(reserved), "0");
  });

  it("returns 5xx when the durable object reserve throws and does not call Resend", async () => {
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
    assert.equal(net.resendCalls().length, 0);
  });

  it("logs a thrown rollback and still returns the Resend error", async () => {
    const net = mockFetch({ resendStatus: 422, resendBody: "{}" });
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
      assert.equal(json.error, "resend_error");
      const logged = lines.find((line) => line.includes("outreach_cap_rollback"));
      assert.ok(logged);
      const event = JSON.parse(logged);
      assert.equal(event.event, "outreach_cap_rollback");
      assert.equal(event.result, "failed");
      assert.equal(event.store, "do");
      assert.equal(event.key, capKey());
      assert.equal(logged.includes("lead@example.com"), false);
      assert.equal(logged.includes(token), false);
      assert.equal(binding.caps.get(event.key), 1);
    } finally {
      console.log = original;
    }
  });

  it("logs a thrown KV rollback and still returns the Resend error", async () => {
    const net = mockFetch({ resendStatus: 500, resendBody: "{}" });
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
      assert.equal(json.error, "resend_error");
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
        if (url === "https://api.resend.com/emails") {
          net.calls.push({ url, init });
          throw error;
        }
        return net.impl(input, init);
      };
      const reserved = capKey();
      const { response, json } = await send(env, impl, token, {
        to: "lead@example.com",
        subject: "Sin confirmación",
        fields: fields(),
      });
      assert.equal(response.status, 502);
      assert.equal(json.error, "resend_error");
      assert.equal(net.resendCalls().length, 1);
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
      if (url === "https://api.resend.com/emails") throw new TypeError("network");
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
      const net = mockFetch({ resendStatus: status, resendBody: "{}" });
      const token = await signToken();
      const binding = counterBinding();
      const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
      const reserved = capKey();
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
    assert.equal(net.resendCalls().length, 0);
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

describe("hard bounce halt", () => {
  it("fail-closes the webhook when the signing secret is unset", async () => {
    const net = mockFetch();
    const env = makeEnv();
    const response = await handleRequest(
      request("/webhook/resend", { body: { type: "email.bounced" } }),
      env,
      net.impl,
    );
    assert.equal(response.status, 403);
    assert.equal(net.resendCalls().length, 0);
    assert.equal(await env.OUTREACH_KV.get("state:halt"), null);
  });

  it("rejects a bad signature and does not suppress", async () => {
    const net = mockFetch();
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret });
    const body = JSON.stringify({ type: "email.bounced", data: { to: ["lead@example.com"], bounce: { type: "Permanent" } } });
    const response = await handleRequest(
      request("/webhook/resend", {
        body,
        headers: {
          "svix-id": "msg_test",
          "svix-timestamp": String(Math.floor(Date.now() / 1000)),
          "svix-signature": "v1,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
      }),
      env,
      net.impl,
    );
    assert.equal(response.status, 403);
    assert.equal(await env.OUTREACH_KV.get("suppress:lead@example.com"), null);
  });

  it("rejects a Svix timestamp skewed by more than 5 minutes", async () => {
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret });
    const body = JSON.stringify({
      type: "email.bounced",
      data: { to: ["viejo@example.com"], bounce: { type: "Permanent" } },
    });
    const timestamp = String(Math.floor(Date.now() / 1000) - (WEBHOOK_TOLERANCE_SEC + 1));
    const signature = await signWebhook(secret, "msg_old", timestamp, body);
    const response = await handleRequest(
      request("/webhook/resend", {
        body,
        headers: { "svix-id": "msg_old", "svix-timestamp": timestamp, "svix-signature": signature },
      }),
      env,
    );
    assert.equal(response.status, 403);
    assert.equal(await env.OUTREACH_KV.get("suppress:viejo@example.com"), null);
    assert.equal(await env.OUTREACH_KV.get("svix:msg_old"), null);
  });

  it("accepts a valid v1 signature among several and rejects a replay of the same svix-id", async () => {
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret });
    const body = JSON.stringify({ type: "email.delivered", data: { to: ["ok@example.com"] } });
    const timestamp = String(Math.floor(Date.now() / 1000));
    const good = await signWebhook(secret, "msg_multi", timestamp, body);
    const headers = {
      "svix-id": "msg_multi",
      "svix-timestamp": timestamp,
      "svix-signature": `v1,${"a".repeat(44)} ${good}`,
    };
    const first = await handleRequest(request("/webhook/resend", { body, headers }), env);
    assert.equal(first.status, 200);
    assert.equal(env.OUTREACH_KV.meta.get("svix:msg_multi").expirationTtl, WEBHOOK_DEDUPE_TTL_SEC);
    assert.ok(WEBHOOK_DEDUPE_TTL_SEC >= 600);
    assert.ok(WEBHOOK_DEDUPE_TTL_SEC >= WEBHOOK_TOLERANCE_SEC * 2);
    assert.ok(WEBHOOK_DEDUPE_TTL_SEC > WEBHOOK_TOLERANCE_SEC);
    const replay = await handleRequest(request("/webhook/resend", { body, headers }), env);
    assert.equal(replay.status, 403);
    assert.equal(await env.OUTREACH_KV.get("state:halt"), null);
  });

  it("does not treat a trailing slash or an extra segment as the webhook", async () => {
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret });
    const body = JSON.stringify({
      type: "email.bounced",
      data: { email_id: "re_path", to: ["ruta@example.com"], bounce: { type: "Permanent" } },
    });
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signWebhook(secret, "msg_path", timestamp, body);
    const headers = { "svix-id": "msg_path", "svix-timestamp": timestamp, "svix-signature": signature };
    for (const path of ["/webhook/resend/", "/webhook/resend/x"]) {
      const response = await handleRequest(request(path, { body, headers }), env);
      assert.equal(response.status, 404);
    }
    assert.equal(await env.OUTREACH_KV.get("suppress:ruta@example.com"), null);
    assert.equal(await env.OUTREACH_KV.get("state:halt"), null);
  });

  it("suppresses and halts on a signed permanent bounce until /resume", async () => {
    const net = mockFetch();
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret, OUTREACH_COUNTER: counterBinding() });
    const token = await signToken();
    const event = {
      type: "email.bounced",
      data: {
        email_id: "re_bounce_1",
        to: ["rebote@example.com"],
        bounce: { type: "Permanent", subType: "General" },
      },
    };
    const body = JSON.stringify(event);
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signWebhook(secret, "msg_bounce", timestamp, body);
    const hooked = await handleRequest(
      request("/webhook/resend", {
        body,
        headers: { "svix-id": "msg_bounce", "svix-timestamp": timestamp, "svix-signature": signature },
      }),
      env,
      net.impl,
    );
    assert.equal(hooked.status, 200);
    assert.notEqual(await env.OUTREACH_KV.get("suppress:rebote@example.com"), null);
    assert.notEqual(await env.OUTREACH_KV.get("state:halt"), null);

    const blocked = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Después del rebote",
      fields: fields(),
    });
    assert.equal(blocked.response.status, 409);
    assert.equal(blocked.json.error, "halted");
    assert.equal(net.resendCalls().length, 0);

    const resumed = await handleRequest(request("/resume", { token, body: {} }), env, net.impl);
    assert.equal(resumed.status, 200);
    const again = await send(env, net.impl, token, {
      to: ALLOWED,
      subject: "Después del resume",
      fields: fields(),
    });
    assert.equal(again.response.status, 200);
    env.OUTREACH_MODE = "live";
    const still = await send(env, net.impl, token, {
      to: "rebote@example.com",
      subject: "Otra vez",
      fields: fields(),
    });
    assert.equal(still.response.status, 409);
    assert.equal(still.json.error, "suppressed");
    assert.equal(net.resendCalls().length, 1);
  });

  it("suppresses and halts on a signed complaint", async () => {
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret, OUTREACH_MODE: "live", OUTREACH_COUNTER: counterBinding() });
    const token = await signToken();
    const net = mockFetch();
    const event = {
      type: "email.complained",
      data: { email_id: "re_complaint", to: ["queja@example.com"] },
    };
    const body = JSON.stringify(event);
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signWebhook(secret, "msg_complaint", timestamp, body);
    const hooked = await handleRequest(
      request("/webhook/resend", {
        body,
        headers: {
          "svix-id": "msg_complaint",
          "svix-timestamp": timestamp,
          "svix-signature": signature,
        },
      }),
      env,
      net.impl,
    );
    assert.equal(hooked.status, 200);
    const blocked = await send(env, net.impl, token, {
      to: "otra@example.com",
      subject: "Después de la queja",
      fields: fields(),
    });
    assert.equal(blocked.response.status, 409);
    assert.equal(blocked.json.error, "halted");
    assert.equal(net.resendCalls().length, 0);
    assert.notEqual(await env.OUTREACH_KV.get("suppress:queja@example.com"), null);
  });

  it("logs a transient bounce without suppressing or halting", async () => {
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret });
    const event = {
      type: "email.bounced",
      data: { email_id: "re_soft", to: ["lleno@example.com"], bounce: { type: "Transient" } },
    };
    const body = JSON.stringify(event);
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signWebhook(secret, "msg_soft", timestamp, body);
    const response = await handleRequest(
      request("/webhook/resend", {
        body,
        headers: { "svix-id": "msg_soft", "svix-timestamp": timestamp, "svix-signature": signature },
      }),
      env,
    );
    assert.equal(response.status, 200);
    assert.equal(await env.OUTREACH_KV.get("suppress:lleno@example.com"), null);
    assert.equal(await env.OUTREACH_KV.get("state:halt"), null);
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

  it("refuses live mode without the durable object binding and does not call Resend", async () => {
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
    assert.equal(net.resendCalls().length, 0);
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
    assert.equal(net.resendCalls().length, 1);
    const payload = JSON.parse(net.resendCalls()[0].init.body);
    assert.equal(payload.subject, "Con contador");
    assert.deepEqual(payload.to, ["lead@example.com"]);
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

  it("returns 429 from the durable object cap without calling Resend", async () => {
    const net = mockFetch();
    const token = await signToken();
    const binding = counterBinding();
    const key = capKey();
    binding.caps.set(key, DAILY_CAP);
    const env = makeEnv({ OUTREACH_MODE: "live", OUTREACH_COUNTER: binding });
    const { response, json } = await send(env, net.impl, token, {
      to: "lead@example.com",
      subject: "Tope",
      fields: fields(),
    });
    assert.equal(response.status, 429);
    assert.equal(json.error, "cap");
    assert.equal(net.resendCalls().length, 0);
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

  it("rolls the KV cap back onto the reserved key when Resend fails after midnight", async () => {
    const { env, reservedKey, laterKey, net } = await sendAcrossMidnight({ live: false });
    assert.equal(net.resendCalls().length, 1);
    assert.equal(await env.OUTREACH_KV.get(reservedKey), "0");
    assert.equal(await env.OUTREACH_KV.get(laterKey), null);
  });

  it("rolls the durable object cap back onto the reserved key when Resend fails after midnight", async () => {
    const { binding, reservedKey, laterKey, net } = await sendAcrossMidnight({ live: true });
    assert.equal(net.resendCalls().length, 1);
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

describe("webhook dedupe", () => {
  it("keeps the dedupe TTL at least twice the signature tolerance", () => {
    assert.ok(WEBHOOK_DEDUPE_TTL_SEC >= 600);
    assert.ok(WEBHOOK_DEDUPE_TTL_SEC >= WEBHOOK_TOLERANCE_SEC * 2);
    assert.ok(WEBHOOK_DEDUPE_TTL_SEC > WEBHOOK_TOLERANCE_SEC);
  });

  it("rejects a replay inside the signature window on the durable object and does not write KV", async () => {
    const secret = webhookSecret();
    const binding = counterBinding();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret, OUTREACH_COUNTER: binding });
    const body = JSON.stringify({ type: "email.delivered", data: { to: ["ok@example.com"] } });
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signWebhook(secret, "msg_do", timestamp, body);
    const headers = { "svix-id": "msg_do", "svix-timestamp": timestamp, "svix-signature": signature };
    const first = await handleRequest(request("/webhook/resend", { body, headers }), env);
    assert.equal(first.status, 200);
    const replay = await handleRequest(request("/webhook/resend", { body, headers }), env);
    assert.equal(replay.status, 403);
    assert.equal(await env.OUTREACH_KV.get("svix:msg_do"), null);
    const claims = binding.calls.filter((call) => call.op === "claim");
    assert.equal(claims.length, 2);
    assert.equal(claims[0].id, "msg_do");
    assert.equal(claims[0].ttlSec, WEBHOOK_DEDUPE_TTL_SEC);
    assert.ok(claims[0].ttlSec > WEBHOOK_TOLERANCE_SEC);
    assert.equal(await env.OUTREACH_KV.get("state:halt"), null);
  });

  it("rejects a second durable object claim inside the signature window and rolls back only the reserved day", () => {
    const counter = openCounter();
    const reserved = "cap:2026-06-14";
    const later = "cap:2026-06-15";
    assert.equal(counter.reserve(reserved, DAILY_CAP).ok, true);
    assert.deepEqual(counter.rollback(reserved), { ok: true, key: reserved, count: 0 });
    assert.equal(counter.reserve(reserved, DAILY_CAP).count, 1);
    assert.deepEqual(counter.rollback(later), { ok: true, key: later, count: 0 });
    assert.equal(counter.reserve(reserved, DAILY_CAP).count, 2);
    assert.equal(counter.reserve(later, DAILY_CAP).count, 1);

    const now = 1_700_000_000_000;
    assert.equal(counter.claimWebhook("msg_window", WEBHOOK_DEDUPE_TTL_SEC, now).ok, true);
    const stillInside = now + WEBHOOK_TOLERANCE_SEC * 1000;
    assert.ok(stillInside < now + WEBHOOK_DEDUPE_TTL_SEC * 1000);
    assert.equal(counter.claimWebhook("msg_window", WEBHOOK_DEDUPE_TTL_SEC, stillInside).ok, false);
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
  const reservedAt = new Date(BEFORE_SANTIAGO_MIDNIGHT);
  const laterAt = new Date(AFTER_SANTIAGO_MIDNIGHT);
  const reservedKey = capKey(reservedAt);
  const laterKey = capKey(laterAt);
  assert.notEqual(reservedKey, laterKey);
  const net = mockFetch({ resendStatus: 500, resendBody: "{}" });
  const token = await signToken({
    exp: Math.floor(BEFORE_SANTIAGO_MIDNIGHT / 1000) + 3600,
  });
  const binding = live ? counterBinding() : null;
  const env = makeEnv(live ? { OUTREACH_MODE: "live", OUTREACH_COUNTER: binding } : {});
  const clock = installClock(BEFORE_SANTIAGO_MIDNIGHT);
  try {
    const impl = async (input, init) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === "https://api.resend.com/emails") clock.advance(60_000);
      return net.impl(input, init);
    };
    const { response } = await send(env, impl, token, {
      to: live ? "lead@example.com" : ALLOWED,
      subject: "Cruza medianoche",
      fields: fields(),
    });
    assert.equal(response.status, 502);
    assert.equal(Date.now(), AFTER_SANTIAGO_MIDNIGHT);
    return { env, binding, reservedKey, laterKey, net };
  } finally {
    clock.restore();
  }
}

function webhookSecret() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return `whsec_${Buffer.from(bytes).toString("base64")}`;
}

async function signWebhook(secret, id, timestamp, body) {
  const raw = secret.slice("whsec_".length);
  const keyBytes = Uint8Array.from(Buffer.from(raw, "base64"));
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${id}.${timestamp}.${body}`),
  );
  return `v1,${Buffer.from(new Uint8Array(sig)).toString("base64")}`;
}
