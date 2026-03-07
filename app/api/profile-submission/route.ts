import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const body = await req.json();

  const fields: Record<string, unknown> = {
    Name: body.name,
    "Year Won": Number(body.yearWon),
    Headline: body.headline,
    Bio: body.bio,
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

  if (body.actionPhotoUrl) {
    fields["Action Photo"] = [{ url: body.actionPhotoUrl }];
  }

  // Strip undefined values
  Object.keys(fields).forEach((k) => fields[k] === undefined && delete fields[k]);

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/Winner%20Profiles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Airtable error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
