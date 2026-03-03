const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const originalsDir = path.join(__dirname, "../public/images/originals");
const optimizedDir = path.join(__dirname, "../public/images/optimized");

// Ensure optimized directory exists
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Image processing config
const PORTRAIT_WIDTH = 400;
const PORTRAIT_HEIGHT = 500;
const GRID_WIDTH = 500;
const GRID_HEIGHT = 600;
const THUMBNAIL_WIDTH = 300;
const THUMBNAIL_HEIGHT = 300;

async function optimizeImage(imagePath, filename) {
  try {
    const baseName = filename.replace(/\.[^/.]+$/, "");

    // Get image metadata to determine orientation
    const metadata = await sharp(imagePath).metadata();

    // 1. Optimized web version (full size, webp + jpg)
    await sharp(imagePath)
      .resize(800, 1000, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(path.join(optimizedDir, `${baseName}-web.webp`));

    await sharp(imagePath)
      .resize(800, 1000, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(optimizedDir, `${baseName}-web.jpg`));

    console.log(`✓ Optimized web versions: ${baseName}`);

    // 2. Portrait crop (for winner cards in grid)
    try {
      await sharp(imagePath)
        .resize(PORTRAIT_WIDTH, PORTRAIT_HEIGHT, {
          fit: "cover",
          position: "top",
        })
        .webp({ quality: 85 })
        .toFile(path.join(optimizedDir, `${baseName}-portrait.webp`));

      await sharp(imagePath)
        .resize(PORTRAIT_WIDTH, PORTRAIT_HEIGHT, {
          fit: "cover",
          position: "top",
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(optimizedDir, `${baseName}-portrait.jpg`));

      console.log(`✓ Portrait crop: ${baseName}`);
    } catch (err) {
      console.log(`  (portrait crop skipped - unusual aspect ratio)`);
    }

    // 3. Square thumbnail (for timeline, smaller displays)
    try {
      await sharp(imagePath)
        .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
          fit: "cover",
          position: "center",
        })
        .webp({ quality: 80 })
        .toFile(path.join(optimizedDir, `${baseName}-thumb.webp`));

      await sharp(imagePath)
        .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 80, progressive: true })
        .toFile(path.join(optimizedDir, `${baseName}-thumb.jpg`));

      console.log(`✓ Thumbnail crop: ${baseName}`);
    } catch (err) {
      console.log(`  (thumbnail skipped)`);
    }
  } catch (error) {
    console.error(`✗ Failed to process ${filename}: ${error.message}`);
  }
}

async function processAllImages() {
  console.log("Starting image optimization...\n");

  if (!fs.existsSync(originalsDir)) {
    console.log("No originals directory found. Run download-images.js first.");
    return;
  }

  const files = fs.readdirSync(originalsDir);

  if (files.length === 0) {
    console.log("No images to process in originals directory.");
    return;
  }

  for (const file of files) {
    const imagePath = path.join(originalsDir, file);
    if (
      fs.statSync(imagePath).isFile() &&
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    ) {
      await optimizeImage(imagePath, file);
    }
  }

  console.log("\n✓ Image optimization complete!");
  console.log(`\nOptimized images saved to: ${optimizedDir}`);
  console.log("\nGenerated formats:");
  console.log("  - [name]-web.webp / [name]-web.jpg (full size)");
  console.log("  - [name]-portrait.webp / [name]-portrait.jpg (portrait crop)");
  console.log("  - [name]-thumb.webp / [name]-thumb.jpg (square thumbnail)");
}

processAllImages();
