export async function resolve(specifier, context, nextResolve) {
  if (specifier === "cloudflare:workers") {
    return {
      format: "module",
      shortCircuit: true,
      url: new URL("./durable-object-stub.js", import.meta.url).href,
    };
  }
  return nextResolve(specifier, context);
}
