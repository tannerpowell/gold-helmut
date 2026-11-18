import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { checkSender, parseAllowlist, requestText, type PostmarkInbound } from "@/lib/inbound-email";

// Postmark inbound webhook. Postmark posts each email sent to the site-update
// address here (webhook URL carries Basic auth credentials). Accepted emails
// are handed to the `email-update` GitHub workflow via repository_dispatch.
// See .github/email-updates.md.

function authorized(req: Request, expected: string): boolean {
  const got = req.headers.get("authorization") ?? "";
  const want = `Basic ${Buffer.from(expected).toString("base64")}`;
  const a = Buffer.from(got);
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const basicAuth = process.env.INBOUND_EMAIL_BASIC_AUTH;
  const dispatchToken = process.env.GITHUB_DISPATCH_TOKEN;
  const repo = process.env.GITHUB_DISPATCH_REPO ?? "tannerpowell/gold-helmut";
  if (!basicAuth || !dispatchToken) {
    console.error("inbound-email: missing INBOUND_EMAIL_BASIC_AUTH or GITHUB_DISPATCH_TOKEN");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }
  if (!authorized(req, basicAuth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let msg: PostmarkInbound;
  try {
    msg = (await req.json()) as PostmarkInbound;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Rejections return 200 so Postmark doesn't retry them.
  const sender = checkSender(msg, parseAllowlist(process.env.INBOUND_EMAIL_ALLOWED_SENDERS));
  if (!sender.ok) {
    console.warn(`inbound-email: dropped (${sender.reason})`);
    return NextResponse.json({ accepted: false });
  }

  const body = requestText(msg);
  if (!body) {
    console.warn("inbound-email: dropped (empty body)");
    return NextResponse.json({ accepted: false });
  }

  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${dispatchToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      event_type: "site-update-email",
      client_payload: {
        from: sender.email,
        subject: (msg.Subject ?? "").slice(0, 300),
        body,
        attachments: msg.Attachments?.length ?? 0,
      },
    }),
  });

  if (!res.ok) {
    console.error(`inbound-email: dispatch failed (${res.status})`);
    // A 500 makes Postmark retry, which covers a GitHub outage.
    return NextResponse.json({ error: "Dispatch failed" }, { status: 500 });
  }

  console.log("inbound-email: dispatched");
  return NextResponse.json({ accepted: true });
}
