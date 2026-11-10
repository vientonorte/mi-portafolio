import { register } from "node:module";

// node:test loads the worker source, which imports the Workers runtime module.
// The hook replaces that specifier so the suite can load without workerd.
register("./cloudflare-workers-hook.js", import.meta.url);
