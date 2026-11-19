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

const optString = (v: unknown) => v === undefined || typeof v === "string";

/** Validates the webhook body's shape; null means malformed (don't retry). */
export function parseInbound(raw: unknown): PostmarkInbound | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const m = raw as Record<string, unknown>;
  if (!optString(m.Subject) || !optString(m.TextBody) || !optString(m.StrippedTextReply)) return null;
  const from = m.FromFull;
  if (from !== undefined && (!from || typeof from !== "object" || !optString((from as Record<string, unknown>).Email))) return null;
  if (m.Headers !== undefined) {
    if (!Array.isArray(m.Headers)) return null;
    if (!m.Headers.every((h) => h && typeof h === "object" && typeof h.Name === "string" && typeof h.Value === "string")) return null;
  }
  if (m.Attachments !== undefined && !Array.isArray(m.Attachments)) return null;
  return m as PostmarkInbound;
}

export type RequestText =
  | { triage: null; text: string }
  | { triage: "empty" | "oversize"; text: "" };

/**
 * The text the agent acts on. Empty or oversized requests go to a human
 * instead: acting on a truncated request could drop a trailing condition.
 */
export function requestText(msg: PostmarkInbound): RequestText {
  const stripped = (msg.StrippedTextReply ?? "").trim();
  const text = stripped || (msg.TextBody ?? "").trim();
  if (!text) return { triage: "empty", text: "" };
  if (text.length > MAX_BODY_CHARS) return { triage: "oversize", text: "" };
  return { triage: null, text };
}
