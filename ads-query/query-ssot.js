#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createQueryProcessorDeps,
  LiveAdsClient,
} from "./src/google-ads-client.js";
import { QueryProcessor } from "./src/query-processor.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const account = process.argv.includes("--account");

const deps = createQueryProcessorDeps();
const processor = new QueryProcessor({
  client: deps.client,
  customerId: deps.customerId,
  campaignId: deps.campaignId,
});

const report = await processor.fetchKeywords({ account });
const day = new Date().toISOString().slice(0, 10);
const outDir = join(__dirname, "ssot");
await mkdir(outDir, { recursive: true });
const outPath = join(outDir, "live-" + day + ".json");

const payload = {
  ...report,
  _meta: {
    mode: deps.mode,
    generatedAt: new Date().toISOString(),
    liveClient: deps.client instanceof LiveAdsClient,
    scope: report.scope,
  },
};

await writeFile(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log("Wrote " + outPath + " (mode=" + deps.mode + ", keywords=" + report.keywords.length + ")");
console.log("Do not commit ssot/live-*.json");
