const fs = require("fs");
const path = require("path");
const https = require("https");
const { exec } = require("child_process");

const originalsDir = path.join(__dirname, "../public/images/originals");
const optimizedDir = path.join(__dirname, "../public/images/optimized");

// Create directories if they don't exist
[originalsDir, optimizedDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Image URLs from Denver Post Gold Helmet Award articles
const imageUrls = [
  {
    name: "2025-elian-oliva-portrait",
    url: "https://www.denverpost.com/wp-content/uploads/2025/12/TDP-L-GOLD-HELMET-Elian-Oliva-121225-TH-02.jpg",
  },
  {
    name: "2025-elian-oliva-game-1",
    url: "https://www.denverpost.com/wp-content/uploads/2025/11/TDP-L-NorthfieldVsSkylineFB-TH-10.jpg",
  },
  {
    name: "2025-elian-oliva-game-2",
    url: "https://www.denverpost.com/wp-content/uploads/2025/11/TDP-L-NorthfieldVsSkylineFB-TH-08.jpg",
  },
  {
    name: "2025-elian-oliva-official",
    url: "https://www.denverpost.com/wp-content/uploads/2025/12/TDP-L-GOLD-HELMET-Elian-Oliva-121225-TH-10.jpg",
  },
  {
    name: "1999-marcus-houston",
    url: "https://www.denverpost.com/wp-content/uploads/2025/12/MARCUS-HOUSTON.jpg",
  },
];

function downloadImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(originalsDir, `${filename}.jpg`);

    if (fs.existsSync(filePath)) {
      console.log(`✓ ${filename} already exists`);
      resolve(filePath);
      return;
    }

    const file = fs.createWriteStream(filePath);

    https.get(imageUrl, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`✓ Downloaded ${filename}`);
        resolve(filePath);
      });
    }).on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete the file
      console.error(`✗ Failed to download ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log("Downloading images from Denver Post...\n");

  for (const image of imageUrls) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.log(`Skipping ${image.name} due to download error`);
    }
  }

  console.log("\n✓ Image download complete!");
}

downloadAllImages();
