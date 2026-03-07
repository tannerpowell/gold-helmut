/**
 * Shared image optimization utilities used by both
 * optimize-images.js and process-images.js.
 */
const sharp = require("sharp");
const path = require("path");

const SIZES = {
  web:      { width: 1600, height: 2000, fit: "cover" },
  portrait: { width: 800, height: 1000,  fit: "cover" },
  thumb:    { width: 500, height: 700,   fit: "cover" },
  modal:    { width: 1536, fit: "inside" },
};

/**
 * Generate all size variants (jpg + webp) for a single image.
 * Returns true on full success, false if any variant failed.
 */
async function optimizeImage(inputPath, slug, outputDir) {
  let anyFailed = false;

  for (const [sizeName, dims] of Object.entries(SIZES)) {
    const baseName = `${slug}-${sizeName}`;
    const resizeOpts = dims.height
      ? { width: dims.width, height: dims.height, fit: dims.fit, position: "attention" }
      : { width: dims.width, fit: dims.fit };
    const quality = sizeName === "thumb" ? 80 : 85;

    try {
      await sharp(inputPath)
        .resize(resizeOpts)
        .jpeg({ quality, progressive: true })
        .toFile(path.join(outputDir, `${baseName}.jpg`));

      await sharp(inputPath)
        .resize(resizeOpts)
        .webp({ quality })
        .toFile(path.join(outputDir, `${baseName}.webp`));
    } catch (error) {
      console.error(`  FAIL: ${baseName}: ${error?.message}`);
      anyFailed = true;
    }
  }

  return !anyFailed;
}

module.exports = { SIZES, optimizeImage };
