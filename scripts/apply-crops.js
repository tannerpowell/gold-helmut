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
  thumb:    { width: 500,  height: 500 },
  modal:    { width: 1536 },
};

const SAFE_SLUG_RE = /^[a-z0-9_-]+$/i;

async function applyCrop(year, crop) {
  if (!crop || typeof crop.orig !== "string" || !crop.orig) {
    console.warn(`  SKIP ${year}: missing or invalid crop.orig`);
    return;
  }
  if (!Array.isArray(crop.points) || crop.points.length !== 4
      || !crop.points.every(p => typeof p === "number" && Number.isFinite(p))) {
    console.warn(`  SKIP ${year}: invalid crop.points (${JSON.stringify(crop.points)})`);
    return;
  }

  // Reject path traversal in orig filename
  if (crop.orig.includes("..") || path.isAbsolute(crop.orig)) {
    console.warn(`  SKIP ${year}: unsafe orig path "${crop.orig}"`);
    return;
  }
  // Validate slug to prevent writing files outside output dir
  if (typeof crop.slug !== "string" || !SAFE_SLUG_RE.test(crop.slug)) {
    console.warn(`  SKIP ${year}: unsafe or missing slug "${crop.slug}"`);
    return;
  }

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

  // Croppie points can extend beyond image bounds when zoomed out.
  // Pad the image with black so the extract matches what Croppie shows.
  let meta;
  try {
    meta = await sharp(inputPath).metadata();
  } catch (err) {
    console.warn(`  SKIP ${year}: unreadable image (${err.message})`);
    return;
  }
  if (!meta.width || !meta.height) {
    console.warn(`  SKIP ${year}: missing image dimensions`);
    return;
  }
  const imgW = meta.width;
  const imgH = meta.height;

  const padLeft = Math.max(0, -x1);
  const padTop = Math.max(0, -y1);
  const padRight = Math.max(0, x2 - imgW);
  const padBottom = Math.max(0, y2 - imgH);

  const croppedBuffer = await sharp(inputPath)
    .extend({
      top: padTop, bottom: padBottom, left: padLeft, right: padRight,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .extract({
      left: x1 + padLeft,
      top: y1 + padTop,
      width: cropWidth,
      height: cropHeight,
    })
    .toBuffer();

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
