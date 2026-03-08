import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const html = await readFile(
    path.join(process.cwd(), "tools/crop-tool.html"),
    "utf-8"
  );

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
