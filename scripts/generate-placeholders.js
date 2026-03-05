const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const originalsDir = path.join(__dirname, "../public/images/originals");

// Load winners from the single source of truth (requires bun for TS resolution)
const { WINNERS } = require("../lib/constants");
const RECENT_WINNERS = WINNERS.slice(0, 13);

if (!fs.existsSync(originalsDir)) {
  fs.mkdirSync(originalsDir, { recursive: true });
}

// Colors matching our design system
const COLORS = {
  primary: "#0f172a",
  accent: "#d4af37",
  border: "#1e293b",
  light: "#f8fafc",
};

async function generatePlaceholder(winner) {
  const slug = winner.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const filename = `${winner.year}-${slug}`;
  const filePath = path.join(originalsDir, `${filename}.jpg`);

  // Skip if already exists
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${filename} already exists`);
    return;
  }

  // Create a gradient background with text
  const svg = `
    <svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.border};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#grad)"/>
      <circle cx="400" cy="300" r="150" fill="${COLORS.accent}" opacity="0.1"/>
      <circle cx="200" cy="700" r="100" fill="${COLORS.accent}" opacity="0.05"/>
      <circle cx="700" cy="800" r="120" fill="${COLORS.accent}" opacity="0.08"/>

      <text x="400" y="500" font-size="48" fill="${COLORS.light}" text-anchor="middle" font-weight="bold">
        ${escapeXml(winner.year)}
      </text>
      <text x="400" y="570" font-size="36" fill="${COLORS.accent}" text-anchor="middle" font-weight="bold">
        ${escapeXml(winner.name)}
      </text>
      <text x="400" y="620" font-size="20" fill="${COLORS.light}" text-anchor="middle">
        ${escapeXml(winner.school)}
      </text>
      <text x="400" y="660" font-size="18" fill="${COLORS.light}" text-anchor="middle">
        ${escapeXml([winner.position, winner.college].map(v => String(v ?? "").trim()).filter(Boolean).join(" | "))}
      </text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .resize(800, 1000, {
        fit: "fill",
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(filePath);

    console.log(`✓ Generated placeholder: ${filename}`);
  } catch (error) {
    console.error(`✗ Failed to generate ${filename}: ${error.message}`);
  }
}

async function generateAllPlaceholders() {
  console.log("Generating placeholder images for recent winners...\n");

  for (const winner of RECENT_WINNERS) {
    await generatePlaceholder(winner);
  }

  console.log("\n✓ Placeholder generation complete!");
}

generateAllPlaceholders().catch((err) => {
  console.error("Failed to generate placeholders:", err);
  process.exit(1);
});
