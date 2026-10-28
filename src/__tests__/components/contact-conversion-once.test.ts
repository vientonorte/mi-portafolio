import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("formulario clasico", () => {
  it("dispara trackContactSubmitted una sola vez tras el 200 del worker", () => {
    const src = readFileSync("src/components/organisms/Contact.tsx", "utf8");
    const start = src.indexOf("const handleDirectSubmit");
    const end = src.indexOf("const updateIdentity");
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const body = src.slice(start, end);
    expect(body.split("trackContactSubmitted(").length - 1).toBe(1);
    expect(body).toContain(
      'if (trackContactSubmitted(result)) trackFormLead(200, { formId: "home-contacto", topic: motive });'
    );
  });
});
