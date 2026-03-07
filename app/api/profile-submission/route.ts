import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const yearNum = Number(body.yearWon);
  if (!Number.isFinite(yearNum) || yearNum < 1951 || yearNum > 2025) {
    return NextResponse.json({ error: "Valid year is required" }, { status: 400 });
  }

  if (body.actionPhotoUrl && typeof body.actionPhotoUrl === "string" && body.actionPhotoUrl.trim()) {
    try {
      new URL(body.actionPhotoUrl as string);
    } catch {
      return NextResponse.json({ error: "Action photo must be a valid URL" }, { status: 400 });
    }
  }

  const fields: Record<string, unknown> = {
    Name: (body.name as string).trim(),
    "Year Won": yearNum,
    Headline: body.headline || undefined,
    Bio: body.bio || undefined,
    "Stat 1 Label": body.stat1Label || undefined,
    "Stat 1 Value": body.stat1Value || undefined,
    "Stat 2 Label": body.stat2Label || undefined,
    "Stat 2 Value": body.stat2Value || undefined,
    "Stat 3 Label": body.stat3Label || undefined,
    "Stat 3 Value": body.stat3Value || undefined,
    "Stat 4 Label": body.stat4Label || undefined,
    "Stat 4 Value": body.stat4Value || undefined,
    "Stat 5 Label": body.stat5Label || undefined,
    "Stat 5 Value": body.stat5Value || undefined,
    "Stat 6 Label": body.stat6Label || undefined,
    "Stat 6 Value": body.stat6Value || undefined,
    "Career Highlight": body.careerHighlight || undefined,
    Academics: body.academics || undefined,
    "Other Achievement": body.otherAchievement || undefined,
    "Community 1": body.community1 || undefined,
    "Community 2": body.community2 || undefined,
    "Community 3": body.community3 || undefined,
    "Community 4": body.community4 || undefined,
    "Player Quote": body.playerQuote || undefined,
    "Coach Quote": body.coachQuote || undefined,
    "Coach Name": body.coachName || undefined,
    "Next Chapter Title": body.nextChapterTitle || undefined,
    "Next Chapter Subtitle": body.nextChapterSubtitle || undefined,
    "Submitted At": new Date().toISOString().split("T")[0],
  };

  if (body.actionPhotoUrl && typeof body.actionPhotoUrl === "string" && body.actionPhotoUrl.trim()) {
    fields["Action Photo"] = [{ url: (body.actionPhotoUrl as string).trim() }];
  }

  // Strip undefined values
  Object.keys(fields).forEach((k) => fields[k] === undefined && delete fields[k]);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`https://api.airtable.com/v0/${baseId}/Winner%20Profiles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const error = await res.json();
      console.error("Airtable error:", error);
      return NextResponse.json({ error: "Submission failed" }, { status: 500 });
    }
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }
    throw err;
  }

  return NextResponse.json({ success: true });
}
