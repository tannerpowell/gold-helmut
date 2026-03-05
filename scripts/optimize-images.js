const fs = require("fs");
const path = require("path");
const { optimizeImage } = require("./image-utils");

const originalsDir = path.join(__dirname, "../public/images/originals");
const optimizedDir = path.join(__dirname, "../public/images/optimized");

// Ensure optimized directory exists
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
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

  let hadErrors = false;

  for (const file of files) {
    const imagePath = path.join(originalsDir, file);
    if (
      fs.statSync(imagePath).isFile() &&
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    ) {
      const slug = file.replace(/\.[^/.]+$/, "");
      const ok = await optimizeImage(imagePath, slug, optimizedDir);
      if (ok) {
        console.log(`  OK: ${slug}`);
      } else {
        hadErrors = true;
      }
    }
  }

  if (hadErrors) {
    console.error("\n✗ Image optimization completed with errors.");
    process.exit(1);
  }

  console.log("\n✓ Image optimization complete!");
  console.log(`\nOptimized images saved to: ${optimizedDir}`);
  console.log("\nGenerated formats:");
  console.log("  - [name]-web.webp / [name]-web.jpg (full size)");
  console.log("  - [name]-portrait.webp / [name]-portrait.jpg (portrait crop)");
  console.log("  - [name]-thumb.webp / [name]-thumb.jpg (square thumbnail)");
  console.log("  - [name]-modal.webp / [name]-modal.jpg (modal, natural aspect)");
}

processAllImages();
