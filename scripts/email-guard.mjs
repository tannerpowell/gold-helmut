// Decides what happens to an edit the email-update agent made.
//
//   reject  — a file outside the data allowlist changed. Nothing is committed.
//   review  — data-only, but unusual (code outside the data blocks changed, a
//             new URL, anything but plain literals in the data, or a large
//             diff). A PR is opened and left for a human to merge.
//   auto    — only donor/winner literals changed, small, no new URLs. Merged.
//
// Reasons never include the changed values: they land in public logs.
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

const LITERAL_WORDS = new Set(["true", "false", "null", "undefined"]);

/**
 * Counts tokens in a data block that are not plain literals. Data blocks may
 * hold only string/number/boolean literals, object keys, comments and the
 * punctuation { } [ ] , : — so no expression can run or read anything
 * (e.g. `process.env.SECRET!` as a donor name would typecheck).
 * Returns a count, never the offending text, since output is public.
 */
export function nonLiteralTokens(src) {
  let bad = 0;
  let i = 0;
  const n = src.length;
  const nextNonSpace = (j) => {
    while (j < n && /\s/.test(src[j])) j++;
    return src[j];
  };
  while (i < n) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (src.startsWith("//", i)) { const e = src.indexOf("\n", i); i = e < 0 ? n : e; continue; }
    if (src.startsWith("/*", i)) { const e = src.indexOf("*/", i + 2); if (e < 0) return bad + 1; i = e + 2; continue; }
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < n && src[j] !== c) {
        if (src[j] === "\\") j++;
        else if (c === "`" && src[j] === "$" && src[j + 1] === "{") bad++;
        else if (c !== "`" && src[j] === "\n") { bad++; break; }
        j++;
      }
      if (j >= n) return bad + 1; // unterminated string
      i = j + 1;
      continue;
    }
    const num = /^-?(?:\d[\d_]*(?:\.\d+)?)/.exec(src.slice(i, i + 32));
    if (num) { i += num[0].length; continue; }
    const id = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 256));
    if (id) {
      i += id[0].length;
      if (!LITERAL_WORDS.has(id[0]) && nextNonSpace(i) !== ":") bad++;
      continue;
    }
    if ("{}[],:".includes(c)) { i++; continue; }
    bad++;
    i++;
  }
  return bad;
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
    const bad = nonLiteralTokens(b.inside);
    if (bad) reasons.push(`${path}: ${bad} non-literal token(s) in the data`);
    const oldUrls = new Set(a.inside.match(URL_RE) ?? []);
    const newUrls = [...new Set(b.inside.match(URL_RE) ?? [])].filter((u) => !oldUrls.has(u));
    if (newUrls.length) reasons.push(`${path}: ${newUrls.length} new URL(s)`);
    const scheme = /\b(?:javascript|data|vbscript):/gi;
    if ((b.inside.match(scheme) ?? []).length > (a.inside.match(scheme) ?? []).length) {
      reasons.push(`${path}: new script/data URL scheme`);
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
