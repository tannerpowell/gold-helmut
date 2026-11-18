import { describe, expect, test } from "bun:test";
import { checkSender, parseAllowlist, requestText, MAX_BODY_CHARS, type PostmarkInbound } from "./inbound-email";

const allow = parseAllowlist(" Board@Example.org , chair@example.net ");

function msg(over: Partial<PostmarkInbound> = {}, headers: Record<string, string> = {}): PostmarkInbound {
  const h = { "Received-SPF": "Pass (sender SPF authorized)", "Return-Path": "<board@example.org>", ...headers };
  return {
    FromFull: { Email: "board@example.org" },
    Headers: Object.entries(h).map(([Name, Value]) => ({ Name, Value })),
    ...over,
  };
}

describe("checkSender: only allowlisted, SPF-passing, domain-aligned mail gets through", () => {
  test("allowlisted sender with SPF pass and matching envelope is accepted", () => {
    expect(checkSender(msg(), allow)).toEqual({ ok: true, email: "board@example.org" });
  });

  test("allowlist match is case-insensitive", () => {
    expect(checkSender(msg({ FromFull: { Email: "BOARD@example.ORG" } }), allow).ok).toBe(true);
  });

  test("sender not on the allowlist is rejected", () => {
    expect(checkSender(msg({ FromFull: { Email: "someone@example.org" } }), allow)).toEqual({ ok: false, reason: "not-allowed" });
  });

  test("missing sender is rejected", () => {
    expect(checkSender(msg({ FromFull: {} }), allow)).toEqual({ ok: false, reason: "no-sender" });
  });

  test.each(["Fail", "SoftFail (domain transitioning)", "Neutral", "None", ""])("SPF %p is rejected", (spf: string) => {
    expect(checkSender(msg({}, { "Received-SPF": spf }), allow)).toEqual({ ok: false, reason: "spf-not-pass" });
  });

  test("SPF pass for a different envelope domain is rejected", () => {
    expect(checkSender(msg({}, { "Return-Path": "<bounce@attacker.example>" }), allow)).toEqual({ ok: false, reason: "envelope-mismatch" });
  });

  test("missing Return-Path is rejected", () => {
    const m = msg();
    m.Headers = m.Headers!.filter((h) => h.Name !== "Return-Path");
    expect(checkSender(m, allow)).toEqual({ ok: false, reason: "envelope-mismatch" });
  });
});

describe("requestText: prefers the reply text, capped", () => {
  test("uses StrippedTextReply when present", () => {
    expect(requestText({ StrippedTextReply: " add Bob ", TextBody: "add Bob\n> old thread" })).toBe("add Bob");
  });
  test("falls back to TextBody", () => {
    expect(requestText({ StrippedTextReply: "  ", TextBody: "add Bob" })).toBe("add Bob");
  });
  test("caps length", () => {
    expect(requestText({ TextBody: "x".repeat(MAX_BODY_CHARS + 50) }).length).toBe(MAX_BODY_CHARS);
  });
});
