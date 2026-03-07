#!/usr/bin/env node

/**
 * Apply crop data from crop-tool.html to generate optimized images.
 *
 * Reads crop-data.json (exported from the browser tool), extracts the
 * selected region from each original, then generates all size variants.
 *
 * Usage: node scripts/apply-crops.js [path/to/crop-data.json]
 *        Defaults to ./crop-data.json in the project root.
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const PROJECT_ROOT = path.join(__dirname, "..");
const ORIGINALS_DIR = path.join(PROJECT_ROOT, "public/images/originals");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public/images/optimized");

const SIZES = {
  web:      { width: 1600, height: 2000 },
  portrait: { width: 800,  height: 1000 },
  thumb:    { width: 500,  height: 700 },
  modal:    { width: 1536 },
};

async function applyCrop(year, crop) {
  const inputPath = path.join(ORIGINALS_DIR, crop.orig);
  if (!fs.existsSync(inputPath)) {
    console.warn(`  SKIP ${year}: ${crop.orig} not found`);
    return;
  }

  // Croppie points: [topLeftX, topLeftY, bottomRightX, bottomRightY]
  const [x1, y1, x2, y2] = crop.points.map(Math.round);
  const cropWidth = x2 - x1;
  const cropHeight = y2 - y1;

  if (cropWidth <= 0 || cropHeight <= 0) {
    console.warn(`  SKIP ${year}: invalid crop region`);
    return;
  }

  console.log(`  ${year} (${crop.slug}): extract ${cropWidth}x${cropHeight} from [${x1},${y1}]`);

  // Extract the cropped region first, then resize to each output size
  const cropped = sharp(inputPath).extract({
    left: Math.max(0, x1),
    top: Math.max(0, y1),
    width: cropWidth,
    height: cropHeight,
  });

  // Get the cropped buffer once, reuse for all sizes
  const croppedBuffer = await cropped.toBuffer();

  for (const [sizeName, dims] of Object.entries(SIZES)) {
    const baseName = `${crop.slug}-${sizeName}`;
    const quality = sizeName === "thumb" ? 80 : 85;

    const resizeOpts = dims.height
      ? { width: dims.width, height: dims.height, fit: "cover", position: "top" }
      : { width: dims.width, fit: "inside" };

    try {
      await sharp(croppedBuffer)
        .resize(resizeOpts)
        .jpeg({ quality, progressive: true })
        .toFile(path.join(OUTPUT_DIR, `${baseName}.jpg`));

      await sharp(croppedBuffer)
        .resize(resizeOpts)
        .webp({ quality })
        .toFile(path.join(OUTPUT_DIR, `${baseName}.webp`));
    } catch (err) {
      console.error(`  FAIL ${baseName}: ${err.message}`);
    }
  }

  console.log(`  OK ${crop.slug}`);
}

async function main() {
  const jsonPath = process.argv[2] || path.join(PROJECT_ROOT, "crop-data.json");

  if (!fs.existsSync(jsonPath)) {
    console.error(`crop-data.json not found at: ${jsonPath}`);
    console.error("Export it from the crop tool (localhost:3000/crop-tool.html) first.");
    process.exit(1);
  }

  const cropDataRaw = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const years = Object.keys(cropDataRaw);

  console.log(`Applying crops for ${years.length} winners...\n`);

  for (const year of years) {
    await applyCrop(year, cropDataRaw[year]);
  }

  console.log("\nDone. Run your dev server and check the results.");
  console.log("Tip: You may need to clear .next/cache if images look stale.");
}

main().catch(err => { console.error(err); process.exit(1); });
