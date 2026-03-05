#!/usr/bin/env node

/**
 * Process original winner images into optimized sizes.
 * Generates web (1600x2000), portrait (800x1000), thumb (500x500), modal (1536w) in jpg + webp.
 *
 * Usage: node scripts/process-images.js
 */

const path = require("path");
const fs = require("fs");
const { optimizeImage } = require("./image-utils");

const ORIGINALS_DIR = path.join(__dirname, "../public/images/originals");
const OUTPUT_DIR = path.join(__dirname, "../public/images/optimized");

// Map of original filename -> { year, slug }
// slug becomes the base name: e.g. "2025-elian-oliva"
const IMAGE_MAP = {
  // 2025 - Elian Oliva (multiple images, pick best for each size)
  "TDP-L-GOLD-HELMET-Elian-Oliva-121225-TH-02.webp": { year: 2025, slug: "2025-elian-oliva", type: "hero" },
  "TDP-L-GOLD-HELMET-Elian-Oliva-121225-TH-10.webp": { year: 2025, slug: "2025-elian-oliva-closeup", type: "extra" },
  "TDP-L-NorthfieldVsSkylineFB-TH-08.webp": { year: 2025, slug: "2025-elian-oliva-action1", type: "extra" },
  "TDP-L-NorthfieldVsSkylineFB-TH-10.webp": { year: 2025, slug: "2025-elian-oliva-action2", type: "extra" },

  // 2024 - Marcus Mozer
  "TDP-L-ALL-COLORADOA03_2732xxx_9fb4ca.webp": { year: 2024, slug: "2024-marcus-mozer", type: "hero" },

  // 2023 - Josh Snyder
  "TDP-L-ALL-COLORADO6231.webp": { year: 2023, slug: "2023-josh-snyder", type: "hero" },

  // 2022 - Brayden Dorman
  "TDP-L-ALL-COLORADO_AAO9042xx.webp": { year: 2022, slug: "2022-brayden-dorman", type: "hero" },

  // 2021 - Gavin Sawchuk
  "TDP-L-GOLD-HELMET-SAWCHUK_JAC1663x.webp": { year: 2021, slug: "2021-gavin-sawchuk", type: "hero" },

  // 2020 - Q Jones Jr.
  "TDP-L-GOLD_HELMET_EL039x.webp": { year: 2020, slug: "2020-q-jones-jr", type: "hero" },

  // 2019 - Andrew Gentry
  "TDP-L-GOLD-HELMET-AAO-_7AO9734xxx.webp": { year: 2019, slug: "2019-andrew-gentry", type: "hero" },

  // 2018 - Barrett Miller
  "gold-helmet-award-db-122018-0046_A.webp": { year: 2018, slug: "2018-barrett-miller", type: "hero" },

  // 2017 - Max Borghi
  "Borghi_Gold_Helmet_rj_101-0687.webp": { year: 2017, slug: "2017-max-borghi", type: "hero" },

  // 2016 - Dylan McCaffrey
  "ALL_COLORADO_FOOTBALL_GOLD_HELMET_12152016_AC_AC39035x.webp": { year: 2016, slug: "2016-dylan-mccaffrey", type: "hero" },

  // 2015 - Carlo Kemp
  "SPXXGOLDHELMET____CHM6685.webp": { year: 2015, slug: "2015-carlo-kemp", type: "hero" },

  // 2014 - Mike Morean
  "SP21PRPGOLDHELMET783.webp": { year: 2014, slug: "2014-mike-morean", type: "hero" },

  // 2013 - Christian McCaffrey
  "SP13PRPGOLDLUNCH_CM29858.webp": { year: 2013, slug: "2013-christian-mccaffrey", type: "hero" },

  // 2012 - Xavier Lewis
  "SP23PRPGOLD___CM24246.webp": { year: 2012, slug: "2012-xavier-lewis", type: "hero" },

  // 2011 - Sean Rubalcaba
  "SP25GoldHelmetCM2_2837.webp": { year: 2011, slug: "2011-sean-rubalcaba", type: "hero" },

  // 2010 - Ian Imamura
  "9423985-Ian-Imamura-2010.webp": { year: 2010, slug: "2010-ian-imamura", type: "hero" },

  // 2009 - Matt Brown
  "7419675-Matt-Brown-2009.webp": { year: 2009, slug: "2009-matt-brown", type: "hero" },

  // 2008 - Bryan Peters
  "5864173.webp": { year: 2008, slug: "2008-bryan-peters", type: "hero" },

  // 2007 - Tyler Jackson
  "4321516.webp": { year: 2007, slug: "2007-tyler-jackson", type: "hero" },

  // 1999 - Marcus Houston
  "MARCUS-HOUSTON.webp": { year: 1999, slug: "1999-marcus-houston", type: "hero" },
};

async function processImage(filename, info) {
  const inputPath = path.join(ORIGINALS_DIR, filename);

  if (!fs.existsSync(inputPath)) {
    console.warn(`  SKIP: ${filename} not found`);
    return null; // skipped, not an error
  }

  const ok = await optimizeImage(inputPath, info.slug, OUTPUT_DIR);
  if (ok) console.log(`  OK: ${info.slug} (${filename})`);
  return ok;
}

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Processing ${Object.keys(IMAGE_MAP).length} images...\n`);

  let hadErrors = false;
  for (const [filename, info] of Object.entries(IMAGE_MAP)) {
    const ok = await processImage(filename, info);
    if (ok === false) hadErrors = true; // null = skipped, false = transform error
  }

  // Count output files
  const outputFiles = fs.readdirSync(OUTPUT_DIR).filter(f => !f.startsWith("."));
  console.log(`\nDone! ${outputFiles.length} files in ${OUTPUT_DIR}`);

  if (hadErrors) process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
