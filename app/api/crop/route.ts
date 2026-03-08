import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

const ORIGINALS_DIR = path.join(process.cwd(), "public/images/originals");
const OUTPUT_DIR = path.join(process.cwd(), "public/images/optimized");

// portrait: 4:5 for grid cards. thumb: 1:1 square, exact Croppie crop for timeline circles.
// Web (homepage) and modal (detail view) use the full original via process-images.js.
const SIZES = {
  portrait: { width: 800, height: 1000, fit: "cover" as const, quality: 85 },
  thumb: { width: 500, height: 500, fit: "cover" as const, quality: 80 },
} as const;

const SAFE_FILENAME = /^[\w.\-]+$/;

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    const { year, slug, orig, points } = await req.json();

    if (!year || !slug || !orig || !points || points.length !== 4) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!SAFE_FILENAME.test(orig) || !SAFE_FILENAME.test(slug)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const [x1, y1, x2, y2] = points.map((p: number) => Math.round(p));
    const cropWidth = x2 - x1;
    const cropHeight = y2 - y1;

    if (cropWidth <= 0 || cropHeight <= 0) {
      return NextResponse.json({ error: "Invalid crop region" }, { status: 400 });
    }

    const inputPath = path.join(ORIGINALS_DIR, orig);
    if (!path.resolve(inputPath).startsWith(ORIGINALS_DIR)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    // Croppie points can extend beyond image bounds when zoomed out.
    // Pad the image with black so the extract matches what Croppie shows.
    const meta = await sharp(inputPath).metadata();
    const imgW = meta.width!;
    const imgH = meta.height!;

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

    // Resize to each variant, write jpg + webp in parallel per size
    for (const [sizeName, dims] of Object.entries(SIZES)) {
      const baseName = `${slug}-${sizeName}`;
      const resized = sharp(croppedBuffer).resize({
        width: dims.width, height: dims.height, fit: dims.fit,
        ...(sizeName === "portrait" && { position: "top" }),
      });

      await Promise.all([
        resized.clone().jpeg({ quality: dims.quality, progressive: true })
          .toFile(path.join(OUTPUT_DIR, `${baseName}.jpg`)),
        resized.clone().webp({ quality: dims.quality })
          .toFile(path.join(OUTPUT_DIR, `${baseName}.webp`)),
      ]);
    }

    return NextResponse.json({ ok: true, year, slug, crop: { x1, y1, cropWidth, cropHeight } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
