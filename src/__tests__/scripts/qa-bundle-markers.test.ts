import { describe, expect, it } from "vitest";
// @ts-expect-error — módulo .mjs sin tipos (script de QA)
import { extractBundleAssets, findMarker, resolveAssetUrl } from "../../../scripts/qa-bundle-markers.mjs";

/**
 * qa:production revisa los marcadores en el entry Y en los chunks que carga el
 * HTML (<script src> + <link rel=modulepreload>): pasa si el marcador está en
 * cualquiera, falla si no está en ninguno.
 */
const HTML = `<!doctype html><html><head>
  <script type="module" crossorigin src="/qa/assets/main-AAA.js"></script>
  <link rel="modulepreload" crossorigin href="/qa/assets/rolldown-runtime-BBB.js">
  <link crossorigin href="/qa/assets/normalize-hash-url-CCC.js" rel="modulepreload">
  <link rel="stylesheet" href="/qa/assets/main-DDD.css">
  <link rel="preload" href="/qa/assets/font.woff2" as="font">
  <link rel=modulepreload href=assets/routes-EEE.js>
  <script src="/qa/assets/main-AAA.js" type="module"></script>
  <script>window.inline = true</script>
</head><body><div id="root"></div></body></html>`;

const CHUNKS: Record<string, string> = {
  "main-AAA.js": `import"./normalize-hash-url-CCC.js";createRoot(document.getElementById("root"))`,
  "rolldown-runtime-BBB.js": "var __defProp=Object.defineProperty;",
  "normalize-hash-url-CCC.js": 'var cr=new Set(["modalidades","consultoria-onboarding"]);o="/consultoria/embudo"',
  "routes-EEE.js": 'export const ROUTES={home:"/",sobreMi:"/sobre-mi"}',
};

const MARKER = "onboarding|embudo|consultoria-onboarding";

function filesFor(names: string[]) {
  return names.map((name) => ({ name, content: CHUNKS[name] }));
}

describe("qa-bundle-markers · extractBundleAssets", () => {
  it("toma <script src> y <link rel=modulepreload> (cualquier orden de atributos), sin CSS/preload ni repetidos", () => {
    expect(extractBundleAssets(HTML)).toEqual([
      "/qa/assets/main-AAA.js",
      "/qa/assets/rolldown-runtime-BBB.js",
      "/qa/assets/normalize-hash-url-CCC.js",
      "assets/routes-EEE.js",
    ]);
  });

  it("resuelve rutas absolutas contra el origin y relativas contra el subpath de BASE_URL", () => {
    expect(resolveAssetUrl("https://vientonorte.io/qa", "/qa/assets/main-AAA.js")).toBe(
      "https://vientonorte.io/qa/assets/main-AAA.js"
    );
    expect(resolveAssetUrl("https://vientonorte.io/qa/", "assets/routes-EEE.js")).toBe(
      "https://vientonorte.io/qa/assets/routes-EEE.js"
    );
    expect(resolveAssetUrl("https://vientonorte.io", "/assets/main-AAA.js")).toBe(
      "https://vientonorte.io/assets/main-AAA.js"
    );
  });
});

describe("qa-bundle-markers · findMarker", () => {
  const all = filesFor(extractBundleAssets(HTML).map((ref: string) => ref.split("/").pop() as string));

  it("pasa si el marcador está solo en un chunk con modulepreload (no en el entry)", () => {
    expect(findMarker(MARKER, filesFor(["main-AAA.js"]))).toBeNull();
    expect(findMarker(MARKER, all)).toBe("normalize-hash-url-CCC.js");
  });

  it("falla (null) si el marcador no está en ninguno de los archivos", () => {
    const sinMarcador = all.filter((f: { name: string }) => f.name !== "normalize-hash-url-CCC.js");
    expect(findMarker(MARKER, sinMarcador)).toBeNull();
    expect(findMarker("ChunkLoadError", all)).toBeNull();
  });

  it("devuelve el primero que matchea, empezando por el entry", () => {
    expect(findMarker("sobre-mi|SobreMi", all)).toBe("routes-EEE.js");
    expect(findMarker("createRoot", all)).toBe("main-AAA.js");
  });
});
