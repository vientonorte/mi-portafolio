import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildMessage } from "../src/render.js";

function message(hallazgo) {
  return buildMessage({
    subject: "Asunto",
    fields: {
      empresa: "Óptica Sur",
      hallazgo,
      servicio_ancla: "revision-gratis",
    },
  });
}

function preheader(hallazgo) {
  const html = message(hallazgo).html;
  const match = html.match(/mso-hide:all;color:#f7f2e7;">([\s\S]*?)<\/div>/);
  assert.ok(match);
  const zwsp = match[1].indexOf("&#8203;");
  assert.ok(zwsp > 0);
  const value = match[1].slice(0, zwsp);
  assert.ok(value.length <= 110);
  return value;
}

describe("preheader", () => {
  it("leaves a short hallazgo unchanged", () => {
    const hallazgo = "El botón de contacto tiene contraste 2.1:1.";
    assert.ok(hallazgo.length < 110);
    assert.equal(preheader(hallazgo), hallazgo);
  });

  it("leaves a hallazgo of exactly 110 characters unchanged", () => {
    const hallazgo = "a".repeat(110);
    assert.equal(preheader(hallazgo), hallazgo);
    assert.equal(preheader(hallazgo).includes("…"), false);
  });

  it("cuts a longer hallazgo at the last whitespace at or before 109 and trims", () => {
    const atIndex110 = `${"x".repeat(100)} ${"y".repeat(9)} ${"z".repeat(20)}`;
    assert.equal(atIndex110[110], " ");
    assert.ok(atIndex110.length > 110);
    assert.equal(preheader(atIndex110), `${"x".repeat(100)}…`);

    const trailing = `${"x".repeat(90)}   ${"y".repeat(40)}`;
    assert.ok(trailing.length > 110);
    assert.equal(preheader(trailing), `${"x".repeat(90)}…`);
  });

  it("keeps the ellipsis inside 110 when the only space is at index 110", () => {
    const hallazgo = `${"a".repeat(110)} ${"b".repeat(5)}`;
    assert.equal(hallazgo[110], " ");
    assert.equal(hallazgo.length, 116);
    const value = preheader(hallazgo);
    assert.equal(value, `${"a".repeat(109)}…`);
    assert.ok(value.length <= 110);
  });

  it("hard-cuts a 111-character hallazgo with no spaces to length 110", () => {
    const hallazgo = "b".repeat(111);
    const value = preheader(hallazgo);
    assert.equal(value, `${"b".repeat(109)}…`);
    assert.equal(value.length, 110);
  });

  it("hard-cuts a longer hallazgo that has no whitespace", () => {
    const hallazgo = "y".repeat(140);
    assert.equal(preheader(hallazgo), `${"y".repeat(109)}…`);
  });
});

describe("html header", () => {
  it("renders the wordmark without an image or a remote src", () => {
    const html = message("El botón de contacto tiene contraste 2.1:1.").html;
    assert.equal(/<img\b/i.test(html), false);
    assert.equal(/src\s*=\s*["']https?:/i.test(html), false);
    assert.ok(html.includes(">Viento Norte</span>"));
    assert.ok(html.includes("UXtech · Front office"));
    assert.ok(html.includes("&#8203;"));
    assert.ok(html.includes("mailto:contacto@vientonorte.io"));
  });
});
