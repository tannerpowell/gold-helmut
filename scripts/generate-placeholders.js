const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const originalsDir = path.join(__dirname, "../public/images/originals");

// Recent winners for placeholders (2025 down to 2014)
const RECENT_WINNERS = [
  { year: 2025, name: "Elian Oliva", school: "Northfield HS", position: "LB/S", college: "Air Force" },
  { year: 2024, name: "Trey Woodhouse", school: "Chatfield HS", position: "WR", college: "Colorado" },
  { year: 2023, name: "Baron Browning", school: "Cherry Creek HS", position: "OLB", college: "Ohio State" },
  { year: 2022, name: "Braylen Russell", school: "Regis Jesuit HS", position: "CB", college: "Colorado" },
  { year: 2021, name: "D'Shawn Jamison", school: "Denver South HS", position: "CB", college: "Colorado" },
  { year: 2020, name: "Myles Steed", school: "Columbine HS", position: "S", college: "Colorado State" },
  { year: 2019, name: "Derrick Gore", school: "Littleton HS", position: "RB", college: "Kansas State" },
  { year: 2018, name: "Daylon Stoner", school: "Gateway HS", position: "OL", college: "Colorado" },
  { year: 2017, name: "Jason Foster", school: "Rock Canyon HS", position: "DE", college: "Colorado" },
  { year: 2016, name: "Alec Ingold", school: "Mullen HS", position: "RB", college: "Wisconsin" },
  { year: 2015, name: "Lorenzo Soria", school: "Kennedy HS", position: "QB", college: "Colorado" },
  { year: 2014, name: "Phillip Taylor", school: "Manual HS", position: "LB", college: "Colorado" },
];

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
  const filename = `${winner.year}-${winner.name.toLowerCase().replace(/\s+/g, "-")}`;
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
        ${winner.year}
      </text>
      <text x="400" y="570" font-size="36" fill="${COLORS.accent}" text-anchor="middle" font-weight="bold">
        ${winner.name}
      </text>
      <text x="400" y="620" font-size="20" fill="${COLORS.light}" text-anchor="middle">
        ${winner.school}
      </text>
      <text x="400" y="660" font-size="18" fill="${COLORS.light}" text-anchor="middle">
        ${winner.position} | ${winner.college}
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

generateAllPlaceholders();
