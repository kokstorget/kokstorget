import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, "../public/favicon.svg");
const icoPath = resolve(__dirname, "../public/favicon.ico");

const svg = readFileSync(svgPath);
const sizes = [16, 32, 48, 64];
const pngs = await Promise.all(
  sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer())
);
const ico = await pngToIco(pngs);
writeFileSync(icoPath, ico);
console.log(`Wrote ${icoPath} (${sizes.join(", ")}px)`);
