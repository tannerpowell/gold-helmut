import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { evaluate, MAX_CHANGED_RECORDS } from "./email-guard.mjs";

// Invariants (from the guard's header): only donor/winner data may change,
// only as plain literals; donors may be added or moved up, never removed or
// duplicated; level names/amounts, winner links/images and profile images
// are fixed; winners and profiles are never removed; no new URL-like value;
// nothing else auto-publishes. Reasons never echo values or file names.

const C = "lib/constants.ts";
const P = "lib/winner-profiles.ts";
const constants = readFileSync(C, "utf8");
const profiles = readFileSync(P, "utf8");

const run = (after: string, path = C, extra: string[] = []) =>
  evaluate([path, ...extra], { [path]: { before: path === C ? constants : profiles, after } });

// Fixtures edit the live files, so they key on structure, not on names.
function edit(src: string, re: RegExp, to: string) {
  const out = src.replace(re, to);
  if (out === src) throw new Error(`fixture did not apply: ${re}`);
  return out;
}
const firstDonors = /donors: \["/;
const addDonor = (name: string) => edit(constants, firstDonors, `donors: [${JSON.stringify(name)}, "`);
const addRaw = (expr: string) => edit(constants, firstDonors, `donors: [${expr}, "`);

// The first donor of the last (lowest) level, moved into the first level.
function moveLowestFirstDonorUp() {
  const levels = [...constants.matchAll(/donors: \[("[^"]+")/g)];
  const name = levels[levels.length - 1][1];
  const removed = constants.replace(`donors: [${name}, `, "donors: [");
  return edit(removed, firstDonors, `donors: [${name}, "`);
}

describe("auto: data-only edits within the rules", () => {
  test("adding a donor", () => {
    expect(run(addDonor("Pat Example"))).toEqual({ verdict: "auto", reasons: [] });
  });
  test("moving a donor up a level", () => {
    expect(run(moveLowestFirstDonorUp()).verdict).toBe("auto");
  });
  test("editing a winner's college", () => {
    expect(run(edit(constants, /college: "[^"]*"/, 'college: "Somewhere State"')).verdict).toBe("auto");
  });
  test("editing a profile headline", () => {
    expect(run(edit(profiles, /headline: "/, 'headline: "Updated: '), P).verdict).toBe("auto");
  });
  test("adding a profile with whereNow", () => {
    const after = edit(profiles, /WINNER_PROFILES: Partial<Record<number, WinnerProfile>> = \{/, '$&\n  1901: { whereNow: { location: "Boise, Idaho", funFact: "Fun Fact: works with a 2007 winner" } },');
    expect(run(after, P).verdict).toBe("auto");
  });
});

describe("review: data files only, outside the rules", () => {
  test.each([
    ["env read", "process.env.STRIPE_SECRET_KEY!"],
    ["template substitution", "`${process.env.X}`"],
    ["tagged template via bracket access", '"a"["constructor"]`x`'],
    ["iife", '(() => "x")()'],
    ["require", 'require("fs").readFileSync("/etc/passwd", "utf8")'],
    ["spread", '...["a"]'],
    ["identifier", "SOME_CONSTANT"],
  ])("non-literal: %s", (_label, expr) => {
    expect(run(addRaw(expr)).verdict).toBe("review");
  });

  test("a line comment ended by U+2028 hiding an expression", () => {
    expect(run(addRaw("// x\u2028process.env.X!")).verdict).toBe("review");
  });
  test("an added comment directive", () => {
    expect(run(addRaw('// @ts-ignore\n"Pat"')).verdict).toBe("review");
  });
  test("removing a donor", () => {
    expect(run(constants.replace(/donors: \["[^"]+", /, "donors: [")).verdict).toBe("review");
  });
  test("the same donor in two levels", () => {
    const name = /donors: \["([^"]+)"/.exec(constants)![1];
    const levels = [...constants.matchAll(/donors: \[/g)];
    const lastAt = levels[levels.length - 1].index!;
    const after = constants.slice(0, lastAt) + constants.slice(lastAt).replace("donors: [", `donors: ["${name}", `);
    expect(run(after).verdict).toBe("review");
  });
  test("changing a level's amount", () => {
    expect(run(edit(constants, /minAmount: 5000/, "minAmount: 50")).verdict).toBe("review");
  });
  test("changing a winner's story link", () => {
    expect(run(edit(constants, /storyUrl: "https:\/\/www\.denverpost\.com\//, 'storyUrl: "https://evil.example/')).verdict).toBe("review");
  });
  test("removing a winner", () => {
    expect(run(edit(constants, /\n  \{ year: 1951[^\n]*/, "")).verdict).toBe("review");
  });
  test("changing a profile image", () => {
    expect(run(edit(profiles, /actionImage: "[^"]*"/, 'actionImage: "/x.jpg"'), P).verdict).toBe("review");
  });
  test("a URL in a plain field, even escaped", () => {
    expect(run(addDonor("see https://x.example")).verdict).toBe("review");
    expect(run(addRaw('"\\u0068ttps://x.example"')).verdict).toBe("review");
    expect(run(addDonor("javascript:alert(1)")).verdict).toBe("review");
  });
  test("code outside the data", () => {
    expect(run(edit(constants, /chairman: "[^"]*"/, 'chairman: "Someone Else"')).verdict).toBe("review");
  });
  test("too many records", () => {
    const names = Array.from({ length: MAX_CHANGED_RECORDS + 1 }, (_, i) => `"Name ${i}", `).join("");
    expect(run(edit(constants, firstDonors, `donors: [${names}"`)).verdict).toBe("review");
  });
  test("a syntax error", () => {
    expect(run(addRaw('"unterminated')).verdict).toBe("review");
  });
});

describe("review: rules no other check would catch", () => {
  test("a non-literal in a winner field", () => {
    expect(run(edit(constants, /college: "[^"]*"/, "college: process.env.X!")).verdict).toBe("review");
  });
  test("a getter in a winner record", () => {
    expect(run(edit(constants, /college: "[^"]*"/, 'get college() { return "x"; }')).verdict).toBe("review");
  });
  test("a story link swapped for another existing link", () => {
    const urls = [...constants.matchAll(/storyUrl: ("[^"]+")/g)].map((m) => m[1]);
    const after = constants.replace(`storyUrl: ${urls[0]}`, `storyUrl: ${urls[1]}`);
    expect(after).not.toBe(constants);
    expect(run(after).verdict).toBe("review");
  });
  test("a profile image swapped for another existing image", () => {
    const imgs = [...profiles.matchAll(/actionImage: ("[^"]+")/g)].map((m) => m[1]);
    const after = profiles.replace(`actionImage: ${imgs[0]}`, `actionImage: ${imgs[1]}`);
    expect(after).not.toBe(profiles);
    expect(run(after, P).verdict).toBe("review");
  });
  test("two strings with a missing comma (parses only with recovery)", () => {
    expect(run(addRaw('"Pat" "Lee"')).verdict).toBe("review");
  });
  test("removing a profile", () => {
    expect(run(edit(profiles, /\n  1963: \{[\s\S]*?\n  \},/, ""), P).verdict).toBe("review");
  });
});

describe("reject and empty", () => {
  test("any non-data file", () => {
    expect(run(addDonor("Pat Example"), C, ["app/page.tsx"]).verdict).toBe("reject");
    expect(evaluate([".github/workflows/email-update.yml"], {}).verdict).toBe("reject");
  });
  test("deleting a data file", () => {
    expect(evaluate([C], { [C]: { before: constants, after: null } }).verdict).toBe("reject");
  });
  test("no changes", () => {
    expect(evaluate([".email-request.md"], {}).verdict).toBe("empty");
  });
});

test("reasons never echo values or file names", () => {
  const r1 = run(addDonor("https://private.example/secret"));
  const r2 = evaluate(["secret-name.txt"], {});
  const text = [...r1.reasons, ...r2.reasons].join(" ");
  expect(text).not.toContain("private.example");
  expect(text).not.toContain("secret-name");
});
