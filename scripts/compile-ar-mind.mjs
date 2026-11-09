/**
 * Compila public/ar/targets/*.png → public/ar/targets.mind
 * con el compilador offline de mind-ar (node-canvas + CPU).
 *
 *   npm install --prefix /tmp/mindar-cli mind-ar@1.2.5
 *   node scripts/compile-ar-mind.mjs
 *
 * El orden de las imágenes es el targetIndex de la escena:
 *   0 Lissajous 3:4, 1 nudo trébol, 2 diagrama de Penrose.
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mindarRoot = process.env.MINDAR_ROOT || "/tmp/mindar-cli/node_modules/mind-ar";
const require = createRequire(resolve(mindarRoot, "package.json"));
const { loadImage } = require("canvas");

const { OfflineCompiler } = await import(
  resolve(mindarRoot, "src/image-target/offline-compiler.js")
);

const files = [
  resolve(root, "public/ar/targets/lissajous-3-4.png"),
  resolve(root, "public/ar/targets/nudo-trebol.png"),
  resolve(root, "public/ar/targets/penrose-veritasium.png"),
];
const out = resolve(root, "public/ar/targets.mind");

const images = [];
for (const file of files) {
  const img = await loadImage(file);
  console.log(`${file.split("/").pop()} ${img.width}x${img.height}`);
  images.push(img);
}

const compiler = new OfflineCompiler();
await compiler.compileImageTargets(images, (percent) => {
  process.stdout.write(`\r${percent.toFixed(1)}%`);
});
process.stdout.write("\n");

for (let i = 0; i < compiler.data.length; i++) {
  const frames = compiler.data[i].matchingData;
  const counts = frames
    .map((frame) => frame.maximaPoints.length + frame.minimaPoints.length)
    .join(",");
  console.log(`target ${i} features by scale: ${counts}`);
}

const buffer = compiler.exportData();
writeFileSync(out, Buffer.from(buffer));
console.log(`wrote ${out} (${buffer.byteLength} bytes)`);
