// Decides whether an edit the email-update agent made may publish itself.
//
//   auto    — only donor/winner data changed, as plain literals, within the
//             field rules below, touching at most MAX_CHANGED_RECORDS
//             records. Published.
//   review  — data files only, but outside those rules. Nothing is
//             published; a human handles the email.
//   reject  — some other file changed, or a data file was deleted.
//   empty   — the agent changed nothing.
//
// The email body is untrusted input, so this judges the result, never the
// agent's intent. Files are parsed with the TypeScript compiler and every
// data value must be a literal AST node (no expressions, spreads, templates
// with substitutions, comments or directives can slip in). Field rules:
//   GIVING_LEVELS   level names and amounts fixed; donors may be added or
//                   moved between levels, never removed; one level per donor
//   WINNERS         same records in the same order; storyUrl/imageUrl fixed
//   WINNER_PROFILES profiles may be added or edited, never removed;
//                   actionImage/closingImage fixed
//   everywhere      no new string that looks like a URL or path
//
// Reasons never include values or file names: they land in public logs.
// The workflow runs this file from the base commit, never from the tree the
// agent edited.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import ts from "typescript";

export const DATA_FILES = {
  "lib/constants.ts": ["GIVING_LEVELS", "WINNERS"],
  "lib/winner-profiles.ts": ["WINNER_PROFILES"],
};

// Agent scratch file: never committed, so it may exist.
export const SCRATCH_FILES = new Set([".email-request.md"]);

export const MAX_CHANGED_RECORDS = 15;

const LOCKED_WINNER_FIELDS = ["storyUrl", "imageUrl"];
const LOCKED_PROFILE_FIELDS = ["actionImage", "closingImage"];
const URLISH = /\b[a-z][a-z0-9+.-]*:\/\/|\b(?:javascript|data|vbscript|mailto|tel|file):|^\/|\bwww\./i;

class NonLiteral extends Error {}

/** Converts a literal AST node to a plain value; throws on anything else. */
export function literalValue(node) {
  switch (node.kind) {
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      return node.text;
    case ts.SyntaxKind.NumericLiteral:
      return Number(node.text);
    case ts.SyntaxKind.TrueKeyword:
      return true;
    case ts.SyntaxKind.FalseKeyword:
      return false;
    case ts.SyntaxKind.PrefixUnaryExpression:
      if (node.operator === ts.SyntaxKind.MinusToken && node.operand.kind === ts.SyntaxKind.NumericLiteral) {
        return -Number(node.operand.text);
      }
      throw new NonLiteral();
    case ts.SyntaxKind.ArrayLiteralExpression:
      return node.elements.map((e) => literalValue(e));
    case ts.SyntaxKind.ObjectLiteralExpression: {
      const out = {};
      for (const p of node.properties) {
        if (!ts.isPropertyAssignment(p)) throw new NonLiteral();
        const n = p.name;
        if (!(ts.isIdentifier(n) || ts.isStringLiteral(n) || ts.isNumericLiteral(n))) throw new NonLiteral();
        if (Object.hasOwn(out, n.text)) throw new NonLiteral();
        out[n.text] = literalValue(p.initializer);
      }
      return out;
    }
    default:
      throw new NonLiteral();
  }
}

function commentsIn(sf, node) {
  const start = node.getStart(sf);
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, sf.text, undefined, start, node.end - start);
  const out = [];
  for (let t = scanner.scan(); t !== ts.SyntaxKind.EndOfFileToken; t = scanner.scan()) {
    if (t === ts.SyntaxKind.SingleLineCommentTrivia || t === ts.SyntaxKind.MultiLineCommentTrivia) out.push(scanner.getTokenText());
  }
  return out;
}

/** Parses a data file into its skeleton (text outside the data) and values. */
export function parseDataFile(text, names) {
  const sf = ts.createSourceFile("f.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (sf.parseDiagnostics?.length) return { error: "syntax" };
  const found = {};
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const d of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(d.name) || !names.includes(d.name.text) || !d.initializer) continue;
      if (found[d.name.text]) return { error: "duplicate" };
      let node = d.initializer;
      if (ts.isCallExpression(node) && node.expression.getText(sf) === "Object.freeze" && node.arguments.length === 1) {
        node = node.arguments[0];
      }
      found[d.name.text] = node;
    }
  }
  if (names.some((n) => !found[n])) return { error: "missing" };

  const spans = names.map((n) => [found[n].getStart(sf), found[n].end]).sort((a, b) => a[0] - b[0]);
  let skeleton = "";
  let at = 0;
  for (const [s, e] of spans) {
    skeleton += text.slice(at, s) + "<<DATA>>";
    at = e;
  }
  skeleton += text.slice(at);

  const values = {};
  const comments = [];
  for (const n of names) {
    try {
      values[n] = literalValue(found[n]);
    } catch (err) {
      if (err instanceof NonLiteral) return { error: "non-literal" };
      throw err;
    }
    comments.push(...commentsIn(sf, found[n]));
  }
  return { skeleton, values, comments };
}

function strings(v, out = []) {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => strings(x, out));
  return out;
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Field rules. Returns [reasons, changedRecordCount]. */
export function checkPolicy(name, before, after) {
  const reasons = [];
  let changed = 0;
  if (name === "GIVING_LEVELS") {
    if (!Array.isArray(after) || after.length !== before.length) return [["giving levels added or removed"], 0];
    const seen = new Set();
    const oldDonors = new Set(before.flatMap((l) => l.donors ?? []));
    after.forEach((lvl, i) => {
      const old = before[i];
      if (!lvl || typeof lvl !== "object" || !same(Object.keys(lvl).sort(), ["donors", "minAmount", "name"]) || lvl.name !== old.name || lvl.minAmount !== old.minAmount) {
        reasons.push("giving level name/amount/shape changed");
        return;
      }
      if (!Array.isArray(lvl.donors) || lvl.donors.some((d) => typeof d !== "string")) {
        reasons.push("donor list is not a list of names");
        return;
      }
      for (const d of lvl.donors) {
        if (seen.has(d)) reasons.push("a donor appears twice");
        seen.add(d);
      }
      const prev = new Set(old.donors);
      changed += lvl.donors.filter((d) => !prev.has(d)).length;
    });
    for (const d of oldDonors) if (!seen.has(d)) reasons.push("a donor was removed");
  } else if (name === "WINNERS") {
    if (!Array.isArray(after) || after.length !== before.length) return [["winners added or removed"], 0];
    after.forEach((w, i) => {
      const old = before[i];
      if (!w || typeof w !== "object" || w.year !== old.year) {
        reasons.push("winner order or year changed");
        return;
      }
      for (const f of LOCKED_WINNER_FIELDS) if (w[f] !== old[f]) reasons.push("a winner link/image changed");
      if (!same(w, old)) changed++;
    });
  } else if (name === "WINNER_PROFILES") {
    if (!after || typeof after !== "object" || Array.isArray(after)) return [["profiles are not a map"], 0];
    for (const year of Object.keys(before)) if (!Object.hasOwn(after, year)) reasons.push("a profile was removed");
    for (const [year, p] of Object.entries(after)) {
      const old = before[year] ?? {};
      for (const f of LOCKED_PROFILE_FIELDS) if (p?.[f] !== old[f]) reasons.push("a profile image changed");
      if (!same(p, before[year])) changed++;
    }
  }
  return [reasons, changed];
}

/**
 * @param {string[]} changedPaths paths that differ from the base commit
 * @param {Record<string, {before: string, after: string|null}>} contents
 * @returns {{verdict: "auto"|"review"|"reject"|"empty", reasons: string[]}}
 */
export function evaluate(changedPaths, contents) {
  const real = changedPaths.filter((p) => !SCRATCH_FILES.has(p));
  const outside = real.filter((p) => !Object.hasOwn(DATA_FILES, p));
  if (outside.length) return { verdict: "reject", reasons: [`${outside.length} non-data file(s) changed`] };
  if (!real.length) return { verdict: "empty", reasons: [] };

  const reasons = [];
  let changed = 0;
  for (const path of real) {
    const { before, after } = contents[path];
    if (after === null) return { verdict: "reject", reasons: ["a data file was deleted"] };
    const names = DATA_FILES[path];
    const a = parseDataFile(before, names);
    const b = parseDataFile(after, names);
    if (a.error) throw new Error(`base data file does not parse (${a.error})`);
    if (b.error) {
      reasons.push(`edited data file: ${b.error}`);
      continue;
    }
    if (a.skeleton !== b.skeleton) reasons.push("changed outside the data");
    const oldComments = new Set(a.comments);
    if (b.comments.some((c) => !oldComments.has(c))) reasons.push("added a comment in the data");
    const oldStrings = new Set(names.flatMap((n) => strings(a.values[n])));
    for (const n of names) {
      if (strings(b.values[n]).some((s) => !oldStrings.has(s) && URLISH.test(s))) reasons.push("new URL- or path-like value");
      const [r, c] = checkPolicy(n, a.values[n], b.values[n]);
      reasons.push(...r);
      changed += c;
    }
  }
  if (changed > MAX_CHANGED_RECORDS) reasons.push(`${changed} records changed (limit ${MAX_CHANGED_RECORDS})`);
  const unique = [...new Set(reasons)];
  return { verdict: unique.length ? "review" : "auto", reasons: unique };
}

function main() {
  const porcelain = execFileSync("git", ["status", "--porcelain", "--untracked-files=all", "-z"], { encoding: "utf8" });
  const changedPaths = [];
  const entries = porcelain.split("\0").filter(Boolean);
  for (let i = 0; i < entries.length; i++) {
    const status = entries[i].slice(0, 2);
    changedPaths.push(entries[i].slice(3));
    if (status[0] === "R" || status[0] === "C") changedPaths.push(entries[++i]); // -z puts the source path next
  }
  const contents = {};
  for (const p of changedPaths) {
    if (!Object.hasOwn(DATA_FILES, p)) continue;
    contents[p] = {
      before: execFileSync("git", ["show", `HEAD:${p}`], { encoding: "utf8" }),
      after: existsSync(p) ? readFileSync(p, "utf8") : null,
    };
  }
  process.stdout.write(JSON.stringify(evaluate(changedPaths, contents)) + "\n");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
