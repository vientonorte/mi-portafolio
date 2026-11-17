import { describe, expect, it } from "vitest";
import { findDeniedTokens, sha256 } from "../../../scripts/check-dist-no-leaks.mjs";

describe("dist sin tokens denegados", () => {
  it("detecta un token cuyo hash está en la lista", () => {
    const token = "zzfixtureleak";
    const deny = new Set([sha256(token)]);
    expect(findDeniedTokens(`nota ${token} final`, deny)).toEqual([sha256(token)]);
    expect(findDeniedTokens("texto limpio", deny)).toEqual([]);
  });

  it("une palabras vecinas aunque las separe un espacio o un guion", () => {
    const joined = "alfa" + "beta";
    const deny = new Set([sha256(joined)]);
    expect(findDeniedTokens("alfa-beta", deny)).toEqual([sha256(joined)]);
    expect(findDeniedTokens("alfa beta", deny)).toEqual([sha256(joined)]);
    expect(findDeniedTokens("alfa_beta", deny)).toEqual([sha256(joined)]);
  });
});
