import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { evaluate, MAX_CHANGED_LINES } from "./email-guard.mjs";

// Invariants (from the guard's header): only donor/winner data may change;
// anything else is rejected; unusual data edits wait for a human; a small,
// URL-free, data-only edit is the only thing that merges automatically.

const C = "lib/constants.ts";
const P = "lib/winner-profiles.ts";
const constants = readFileSync(C, "utf8");
const profiles = readFileSync(P, "utf8");

const run = (after: string, path = C, before = path === C ? constants : profiles, extra: string[] = []) =>
  evaluate([path, ...extra], { [path]: { before, after } });

// Fixtures edit the live files, so they key on structure, not on names.
const addDonor = (name: string) => {
  const after = constants.replace(/donors: \["/, `donors: ["${name}", "`);
  if (after === constants) throw new Error("fixture: no donors array found");
  return after;
};

describe("email guard", () => {
  test("adding a donor name auto-merges", () => {
    expect(run(addDonor("Pat Example"))).toEqual({ verdict: "auto", reasons: [] });
  });

  test("editing a winner profile bio auto-merges", () => {
    const after = profiles.replace(/headline: "/, 'headline: "Updated: ');
    expect(after).not.toBe(profiles);
    expect(run(after, P).verdict).toBe("auto");
  });

  test("no changes is empty", () => {
    expect(evaluate([".email-summary.md"], {}).verdict).toBe("empty");
  });

  test("any non-data file change is rejected", () => {
    expect(run(addDonor("Pat Example"), C, constants, ["app/page.tsx"]).verdict).toBe("reject");
    expect(evaluate(["package.json"], {}).verdict).toBe("reject");
    expect(evaluate([".github/workflows/email-update.yml"], {}).verdict).toBe("reject");
  });

  test("deleting a data file is rejected", () => {
    expect(evaluate([C], { [C]: { before: constants, after: null } }).verdict).toBe("reject");
  });

  test("changing code outside the data blocks needs review", () => {
    const after = constants.replace('chairman: "Matt Schubert"', 'chairman: "Someone Else"');
    expect(after).not.toBe(constants);
    expect(run(after).verdict).toBe("review");
  });

  test("a new URL needs review", () => {
    expect(run(addDonor("https://evil.example/x")).verdict).toBe("review");
  });

  test("an existing URL kept in place is fine", () => {
    expect(constants).toMatch(/https:\/\/www\.denverpost\.com/);
    expect(run(addDonor("Pat Example")).verdict).toBe("auto");
  });

  test.each(["${process.env.X}", "x => x", "import(\"y\")", "<script>", "javascript:alert"])("code-like text %p needs review", (s: string) => {
    expect(run(addDonor(s)).verdict).toBe("review");
  });

  test("a large edit needs review", () => {
    const names = Array.from({ length: MAX_CHANGED_LINES + 5 }, (_, i) => `"Name ${i}",\n`).join("");
    expect(run(constants.replace(/donors: \[/, `donors: [\n${names}`)).verdict).toBe("review");
  });

  test("breaking a data block's end marker needs review", () => {
    expect(run(constants.replace(/^\]\);$/m, "]) ;")).verdict).toBe("review");
  });
});
