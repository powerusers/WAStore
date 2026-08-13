import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public/icons/icon.svg");
const outDir = join(root, "public/icons");

mkdirSync(outDir, { recursive: true });
const svg = readFileSync(svgPath);

const sizes = [
  { size: 180, name: "apple-touch-icon" },
  { size: 192, name: "icon-192" },
  { size: 512, name: "icon-512" },
];

for (const { size, name } of sizes) {
  await sharp(svg).resize(size, size).png().toFile(join(outDir, `${name}.png`));
  console.log(`Generated ${name}.png`);
}

// iOS also checks the site root for apple-touch-icon.png
await sharp(svg)
  .resize(180, 180)
  .png()
  .toFile(join(root, "public/apple-touch-icon.png"));
console.log("Generated public/apple-touch-icon.png");
