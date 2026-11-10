import assert from "node:assert/strict";
import { afterEach, before, describe, it } from "node:test";
import { DAILY_CAP, FROM, REPLY_TO, TEMPLATE_ID } from "../src/constants.js";
import { handleRequest } from "../src/index.js";
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
  }

  async get(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }

  async put(key, value) {
    this.map.set(key, String(value));
  }

  async delete(key) {
    this.map.delete(key);
  }
}

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

    const log = JSON.parse(await env.OUTREACH_KV.get(`log:${json.id}`));
    assert.deepEqual(Object.keys(log).sort(), ["error", "id", "resend_id", "result", "template", "timestamp", "to"]);
    assert.equal(log.to, ALLOWED);
    assert.equal(log.template, TEMPLATE_ID);
    assert.equal(log.resend_id, "re_msg_1");
    assert.equal(log.result, "sent");
    assert.equal(log.empresa, undefined);
    assert.equal(log.hallazgo, undefined);
  });

  it("does not prefix the subject in live mode and allows another recipient", async () => {
    const net = mockFetch();
    const token = await signToken();
    const { response } = await send(makeEnv({ OUTREACH_MODE: "live" }), net.impl, token, {
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
});

describe("suppression", () => {
  it("stores a suppression from POST /suppress and refuses the next send", async () => {
    const net = mockFetch();
    const token = await signToken();
    const env = makeEnv({ OUTREACH_MODE: "live" });
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

  it("suppresses and halts on a signed permanent bounce until /resume", async () => {
    const net = mockFetch();
    const secret = webhookSecret();
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret });
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
    const env = makeEnv({ RESEND_WEBHOOK_SECRET: secret, OUTREACH_MODE: "live" });
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
