import { describe, expect, test } from "bun:test";
import { checkSender, parseAllowlist, parseInbound, requestText, MAX_BODY_CHARS, type PostmarkInbound } from "./inbound-email";

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

describe("requestText: acts on the reply text; empty or oversized goes to a human", () => {
  test("uses StrippedTextReply when present", () => {
    expect(requestText({ StrippedTextReply: " add Bob ", TextBody: "add Bob\n> old thread" })).toEqual({ triage: null, text: "add Bob" });
  });
  test("falls back to TextBody", () => {
    expect(requestText({ StrippedTextReply: "  ", TextBody: "add Bob" })).toEqual({ triage: null, text: "add Bob" });
  });
  test("empty (e.g. attachment-only) is triaged, not dropped", () => {
    expect(requestText({ TextBody: "  " })).toEqual({ triage: "empty", text: "" });
  });
  test("oversized is triaged, never truncated", () => {
    expect(requestText({ TextBody: "x".repeat(MAX_BODY_CHARS + 1) })).toEqual({ triage: "oversize", text: "" });
    expect(requestText({ TextBody: "x".repeat(MAX_BODY_CHARS) }).triage).toBeNull();
  });
});

describe("parseInbound: malformed payloads are rejected, not thrown on", () => {
  const malformed: unknown[] = [null, 42, "x", [], { Headers: {} }, { Headers: [{ Name: 1, Value: "x" }] }, { TextBody: 5 }, { FromFull: null }, { FromFull: { Email: 3 } }, { Attachments: "x" }];
  test.each(malformed.map((m) => [JSON.stringify(m), m]))("%s is malformed", (_label: unknown, raw: unknown) => {
    expect(parseInbound(raw)).toBeNull();
  });
  test("a normal payload passes through", () => {
    const m = { FromFull: { Email: "a@b.c" }, Headers: [{ Name: "X", Value: "y" }], TextBody: "hi", Attachments: [] };
    expect(parseInbound(m)).toBe(m);
  });
});
