// Decides what happens to an edit the email-update agent made.
//
//   reject  — a file outside the data allowlist changed. Nothing is committed.
//   review  — data-only, but unusual (code outside the data blocks changed, a
//             new URL, code-like text, or a large diff). A PR is opened and
//             left for a human to merge.
//   auto    — only donor/winner data changed, small, no new URLs. Merged.
//
// The email body is untrusted input. This guard holds no matter what the
// agent was persuaded to do, so it judges the diff, never the agent's intent.
// The workflow runs this file from the base commit, never from the tree the
// agent just edited.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const DATA_FILES = {
  "lib/constants.ts": [
    { start: /^export const GIVING_LEVELS\b/, end: /^\]\);\s*$/ },
    { start: /^export const WINNERS\b/, end: /^\];\s*$/ },
  ],
  "lib/winner-profiles.ts": [{ start: /^export const WINNER_PROFILES\b/, end: /^\};\s*$/ }],
};

// Agent scratch files: never committed, so they may exist.
export const SCRATCH_FILES = new Set([".email-request.md", ".email-summary.md"]);

export const MAX_CHANGED_LINES = 80;

const CODE_LIKE = [/\$\{/, /\bimport\b/, /\brequire\s*\(/, /=>/, /\bfunction\b/, /<\/?script/i, /javascript:/i, /\beval\b/];
const URL_RE = /https?:\/\/[^\s"'`)]+/g;

/** Splits a file into the text outside its data blocks and the text inside. */
export function splitData(text, blocks) {
  const lines = text.split("\n");
  const outside = [];
  const inside = [];
  let i = 0;
  let found = 0;
  while (i < lines.length) {
    const block = blocks.find((b) => b.start.test(lines[i]));
    if (!block) {
      outside.push(lines[i++]);
      continue;
    }
    outside.push(lines[i++], "<<DATA>>");
    while (i < lines.length && !block.end.test(lines[i])) inside.push(lines[i++]);
    if (i >= lines.length) return null; // unterminated block
    outside.push(lines[i++]);
    found++;
  }
  if (found !== blocks.length) return null;
  return { outside: outside.join("\n"), inside: inside.join("\n") };
}

function count(re, text) {
  return (text.match(new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g")) ?? []).length;
}

function changedLineCount(a, b) {
  const tally = new Map();
  for (const l of a.split("\n")) tally.set(l, (tally.get(l) ?? 0) + 1);
  let added = 0;
  for (const l of b.split("\n")) {
    const n = tally.get(l) ?? 0;
    if (n > 0) tally.set(l, n - 1);
    else added++;
  }
  let removed = 0;
  for (const n of tally.values()) removed += n;
  return added + removed;
}

/**
 * @param {string[]} changed paths that differ from the base commit
 * @param {Record<string, {before: string, after: string|null}>} contents
 * @returns {{verdict: "auto"|"review"|"reject"|"empty", reasons: string[]}}
 */
export function evaluate(changed, contents) {
  const real = changed.filter((p) => !SCRATCH_FILES.has(p));
  const outsideAllowlist = real.filter((p) => !(p in DATA_FILES));
  if (outsideAllowlist.length) {
    return { verdict: "reject", reasons: outsideAllowlist.map((p) => `changed non-data file: ${p}`) };
  }
  if (!real.length) return { verdict: "empty", reasons: [] };

  const reasons = [];
  let total = 0;
  for (const path of real) {
    const { before, after } = contents[path];
    if (after === null) return { verdict: "reject", reasons: [`deleted data file: ${path}`] };
    const a = splitData(before, DATA_FILES[path]);
    const b = splitData(after, DATA_FILES[path]);
    if (!a || !b) {
      reasons.push(`${path}: data blocks not found`);
      continue;
    }
    if (a.outside !== b.outside) reasons.push(`${path}: changed outside the data blocks`);
    for (const re of CODE_LIKE) {
      if (count(re, b.inside) > count(re, a.inside)) reasons.push(`${path}: added code-like text ${re}`);
    }
    const oldUrls = new Set(a.inside.match(URL_RE) ?? []);
    for (const u of new Set(b.inside.match(URL_RE) ?? [])) {
      if (!oldUrls.has(u)) reasons.push(`${path}: new URL ${u}`);
    }
    total += changedLineCount(before, after);
  }
  if (total > MAX_CHANGED_LINES) reasons.push(`${total} changed lines (limit ${MAX_CHANGED_LINES})`);
  return { verdict: reasons.length ? "review" : "auto", reasons };
}

function main() {
  const porcelain = execFileSync("git", ["status", "--porcelain", "--untracked-files=all"], { encoding: "utf8" });
  const changed = [];
  for (const line of porcelain.split("\n").filter(Boolean)) {
    const path = line.slice(3);
    // Renames/copies show "old -> new"; treat both sides as changed.
    changed.push(...path.split(" -> "));
  }
  const contents = {};
  for (const p of changed) {
    if (!(p in DATA_FILES)) continue;
    contents[p] = {
      before: execFileSync("git", ["show", `HEAD:${p}`], { encoding: "utf8" }),
      after: existsSync(p) ? readFileSync(p, "utf8") : null,
    };
  }
  const result = evaluate(changed, contents);
  process.stdout.write(JSON.stringify(result) + "\n");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
