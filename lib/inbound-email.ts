// Checks for site-update emails that Postmark forwards to
// /api/inbound-email. Kept separate from the route so they can be tested.
//
// Invariant: an email only reaches the update agent when (1) the From
// address is on the allowlist, (2) the receiving server saw SPF pass, and
// (3) the SPF-checked envelope domain (Return-Path) is the From domain.
// Without (3), SPF would only vouch for some other domain the sender owns.

export interface PostmarkHeader {
  Name: string;
  Value: string;
}

export interface PostmarkInbound {
  From?: string;
  FromFull?: { Email?: string; Name?: string };
  Subject?: string;
  TextBody?: string;
  StrippedTextReply?: string;
  MessageID?: string;
  Headers?: PostmarkHeader[];
  Attachments?: unknown[];
}

export const MAX_BODY_CHARS = 20_000;

export type SenderCheck =
  | { ok: true; email: string }
  | { ok: false; reason: "no-sender" | "not-allowed" | "spf-not-pass" | "envelope-mismatch" };

export function parseAllowlist(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

function header(msg: PostmarkInbound, name: string): string | undefined {
  const lower = name.toLowerCase();
  return msg.Headers?.find((h) => h.Name.toLowerCase() === lower)?.Value;
}

function domainOf(address: string): string {
  const match = address.trim().replace(/^<|>$/g, "").toLowerCase().match(/@([^@\s>]+)$/);
  return match ? match[1] : "";
}

export function checkSender(msg: PostmarkInbound, allowlist: Set<string>): SenderCheck {
  const email = (msg.FromFull?.Email ?? "").trim().toLowerCase();
  if (!email) return { ok: false, reason: "no-sender" };
  if (!allowlist.has(email)) return { ok: false, reason: "not-allowed" };

  const spf = header(msg, "Received-SPF") ?? "";
  if (!/^\s*pass\b/i.test(spf)) return { ok: false, reason: "spf-not-pass" };

  const returnPath = header(msg, "Return-Path") ?? "";
  if (domainOf(returnPath) !== domainOf(email)) {
    return { ok: false, reason: "envelope-mismatch" };
  }

  return { ok: true, email };
}

export function requestText(msg: PostmarkInbound): string {
  const stripped = (msg.StrippedTextReply ?? "").trim();
  const text = stripped || (msg.TextBody ?? "").trim();
  return text.slice(0, MAX_BODY_CHARS);
}
