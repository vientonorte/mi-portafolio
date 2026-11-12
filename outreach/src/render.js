import { ANCHORS } from "./constants.js";
import { normalizeEmail } from "./store.js";
import { optOutLine, PRIVACY_URL, PROSPECCION_HTML, PROSPECCION_TXT } from "./templates.js";

const SIGNATURE = "Rodrigo Gaete · UX Manager · Viento Norte";
const FORBIDDEN = [
  "/s/",
  "/#/",
  "/news/",
  "/servicios/diagnostico-accesibilidad-wcag/",
  "/servicios/consultoria-ux-pymes/",
];

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isFilled(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function findSectionEnd(src, from, name) {
  let depth = 1;
  let i = from;
  while (i < src.length) {
    const next = src.indexOf("{{", i);
    if (next === -1) break;
    const end = src.indexOf("}}", next + 2);
    if (end === -1) break;
    const tag = src.slice(next + 2, end).trim();
    const section = tag.slice(1).trim();
    if ((tag.startsWith("#") || tag.startsWith("^")) && section === name) depth += 1;
    else if (tag.startsWith("/") && section === name) {
      depth -= 1;
      if (depth === 0) return next;
    }
    i = end + 2;
  }
  throw new Error(`unclosed:${name}`);
}

export function renderMustache(src, data, { html = false } = {}) {
  let i = 0;
  let out = "";
  while (i < src.length) {
    const open = src.indexOf("{{", i);
    if (open === -1) {
      out += src.slice(i);
      break;
    }
    out += src.slice(i, open);
    const close = src.indexOf("}}", open + 2);
    if (close === -1) throw new Error("unclosed-tag");
    const tag = src.slice(open + 2, close).trim();
    if (tag.startsWith("#") || tag.startsWith("^")) {
      const name = tag.slice(1).trim();
      const end = findSectionEnd(src, close + 2, name);
      const inner = src.slice(close + 2, end);
      const show = tag.startsWith("#") ? isFilled(data[name]) : !isFilled(data[name]);
      if (show) out += renderMustache(inner, data, { html });
      const closeTag = src.indexOf("}}", end);
      i = closeTag + 2;
    } else if (tag.startsWith("/") || tag.startsWith("!") || tag.startsWith(">")) {
      throw new Error(`bad-tag:${tag}`);
    } else {
      if (!isFilled(data[tag])) throw new Error(`empty:${tag}`);
      const value = String(data[tag]);
      out += html ? escapeHtml(value) : value;
      i = close + 2;
    }
  }
  return out;
}

export function rubroSlug(rubro) {
  if (!isFilled(rubro)) return "general";
  const slug = rubro
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "general";
}

export function hasPrice(value) {
  return /\$\s*\d/.test(value);
}

export function hasWebGratis(value) {
  const withoutUrls = value.replace(/https?:\/\/\S+/g, "");
  const withoutAllowed = withoutUrls.replace(/revisi[oó]n gratis/gi, "");
  // «gratuita» contiene el prefijo «gratis» y no es un precio ni «web gratis».
  return /web[\s\S]{0,40}gratis(?!a)|gratis(?!a)[\s\S]{0,40}web/i.test(withoutAllowed);
}

function clip(value, max) {
  if (typeof value !== "string") return "";
  const trimmed = value.replace(/[\r\n]+/g, " ").trim();
  if (trimmed.length > max) throw new Error("too-long");
  return trimmed;
}

const PREHEADER_MAX = 110;

function preheaderFrom(hallazgo) {
  const chars = Array.from(hallazgo);
  if (chars.length <= PREHEADER_MAX) return hallazgo;
  const ellipsis = "…";
  const room = PREHEADER_MAX - Array.from(ellipsis).length;
  let cut = -1;
  const last = Math.min(chars.length - 1, room);
  for (let i = last; i >= 0; i -= 1) {
    if (/\s/u.test(chars[i])) {
      cut = i;
      break;
    }
  }
  const base = (cut === -1 ? chars.slice(0, room) : chars.slice(0, cut)).join("").trimEnd();
  return `${base}${ellipsis}`;
}

export function buildMessage({ subject, fields, replyTo }) {
  const baja = normalizeEmail(typeof replyTo === "string" ? replyTo.trim() : "");
  if (!baja || baja !== (typeof replyTo === "string" ? replyTo.trim() : replyTo)) throw new Error("reply");
  const input = fields && typeof fields === "object" ? fields : {};
  const anchorId = clip(input.servicio_ancla, 40);
  const anchor = ANCHORS[anchorId];
  if (!anchor) throw new Error("anchor");

  const empresa = clip(input.empresa, 200);
  const hallazgo = clip(input.hallazgo, 2000);
  if (!empresa || !hallazgo) throw new Error("required");

  const contactoNombre = clip(input.contacto_nombre, 200);
  const contactoCargo = clip(input.contacto_cargo, 200);
  const rubro = clip(input.rubro, 80);
  const cta = clip(input.cta_texto, 80) || anchor.cta;
  const asunto = clip(subject, 200);
  if (!asunto) throw new Error("subject");

  const data = {
    contacto_nombre: contactoNombre,
    contacto_cargo: contactoCargo,
    empresa,
    rubro,
    hallazgo,
    servicio_ancla: anchorId,
    cta_texto: cta,
    asunto,
    rubro_slug: rubroSlug(rubro),
    kicker: anchor.kicker,
    oferta: anchor.oferta,
    preheader: preheaderFrom(hallazgo),
    baja_email: baja,
  };
  data.link =
    `https://vientonorte.io/servicios/?utm_source=email&utm_medium=prospeccion&utm_campaign=${data.rubro_slug}#${anchorId}`;

  const prose = [empresa, hallazgo, contactoNombre, contactoCargo, rubro, cta, asunto, anchor.oferta, anchor.kicker].join("\n");
  if (hasPrice(prose) || hasWebGratis(prose)) throw new Error("copy");

  const html = renderMustache(PROSPECCION_HTML, data, { html: true });
  const text = renderMustache(PROSPECCION_TXT, data, { html: false });
  const supplied = [empresa, hallazgo, contactoNombre, contactoCargo, rubro, cta, asunto, data.preheader];
  validateBodies(html, text, data.link, supplied, baja);
  return { html, text, subject: asunto, link: data.link };
}

function splitKeep(text, token) {
  if (!token || !text.includes(token)) return [text];
  const parts = [];
  let rest = text;
  while (rest.length > 0) {
    const at = rest.indexOf(token);
    if (at === -1) {
      parts.push(rest);
      break;
    }
    if (at > 0) parts.push(rest.slice(0, at));
    parts.push(token);
    rest = rest.slice(at + token.length);
  }
  return parts;
}

function maskValues(body, values) {
  let out = body;
  const sorted = values
    .filter((value) => typeof value === "string" && value.length > 0)
    .sort((a, b) => b.length - a.length);
  for (const value of sorted) {
    out = out.split(value).join(" ".repeat(value.length));
    const escaped = escapeHtml(value);
    if (escaped !== value) out = out.split(escaped).join(" ".repeat(escaped.length));
  }
  return out;
}

function maskSupplied(body, values, protectedStrings = []) {
  const guards = protectedStrings
    .filter((value) => typeof value === "string" && value.length > 0)
    .sort((a, b) => b.length - a.length);
  let parts = [body];
  for (const guard of guards) {
    parts = parts.flatMap((part) => (guards.includes(part) ? [part] : splitKeep(part, guard)));
  }
  return parts.map((part) => (guards.includes(part) ? part : maskValues(part, values))).join("");
}

function validateBodies(html, text, link, supplied, baja) {
  const mailto = `mailto:${baja}`;
  const line = optOutLine(baja);
  for (const body of [html, text]) {
    if (hasPrice(body) || hasWebGratis(body)) throw new Error("copy");
    if (body.length > 100_000) throw new Error("size");
    if (!body.includes(SIGNATURE) || !body.includes(line)) throw new Error("footer");
    if (!body.includes(PRIVACY_URL)) throw new Error("privacy");
    if (body.includes("Hola, :")) throw new Error("gap");
    const shell = maskSupplied(body, supplied, [link, escapeHtml(link), mailto, escapeHtml(mailto), baja, escapeHtml(baja)]);
    if (shell.includes("{{") || shell.includes("}}")) throw new Error("leftover");
    if (/\b(None|null|undefined)\b/.test(shell)) throw new Error("empty-literal");
    for (const forbidden of FORBIDDEN) {
      if (shell.includes(forbidden)) throw new Error("url");
    }
  }

  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  if (hrefs.length === 0) throw new Error("href");
  const hrefLink = escapeHtml(link);
  const allowedHrefs = new Set([hrefLink, escapeHtml(mailto), PRIVACY_URL]);
  for (const href of hrefs) {
    if (!allowedHrefs.has(href)) throw new Error("href");
  }
  const urls = maskSupplied(text, supplied, [link, PRIVACY_URL]).match(/https?:\/\/\S+/g) || [];
  for (const url of urls) {
    if (url !== link && url !== PRIVACY_URL) throw new Error("href");
  }
}

export { SIGNATURE };
