# Site updates by email

Board members email a change ("add Jake Stone to Brotherhood") to the
site-update address. An agent edits the site data, a guard checks the
result, and edits that pass every rule publish on their own. Everything else
publishes nothing and opens an issue for a human.

## Flow

1. **Postmark inbound** receives mail for `*@in.goldhelmetaward.com` and POSTs
   it as JSON to `https://<user>:<pass>@goldhelmetaward.com/api/inbound-email`.
2. **`app/api/inbound-email/route.ts`**:
   - checks Basic auth (`route.ts:26`)
   - validates the payload's shape, and drops malformed bodies with a 200 so
     Postmark doesn't retry (`route.ts:38`, `lib/inbound-email.ts:69`)
   - checks the sender (`route.ts:44`, `lib/inbound-email.ts:50`): the From
     address must be in `INBOUND_EMAIL_ALLOWED_SENDERS`, `Received-SPF` must
     be `pass`, and the `Return-Path` domain must equal the From domain
   - picks the text to act on (`route.ts:52`, `lib/inbound-email.ts:91`):
     Postmark's reply-only text, else the full text. If that's empty, or
     longer than 20,000 characters, the email is flagged for a human rather
     than dropped or cut off.
   - sends it to GitHub as a `repository_dispatch` event (`route.ts:54`). A
     GitHub failure returns 500 so Postmark retries.
3. **`.github/workflows/email-update.yml`** runs 2 jobs:
   - `edit` has a **read-only** token (`email-update.yml:39`).
     - The guard and its TypeScript dependency are installed outside the
       workspace before the agent runs (`:50`), so the agent can't alter its
       own judge.
     - Flagged emails, and any email with attachments, skip the agent
       (`:56`).
     - Claude Code runs in restricted mode: file tools only, confined to the
       workspace, with no shell, web or extra MCP servers (`:78`).
     - An `auto` edit is frozen as a patch with a SHA-256 digest. Typecheck,
       lint and tests then run on a clean tree with exactly that patch
       applied (`:116-126`).
   - `land` has write access but runs no code from the edit (`:163`).
     - It treats the edit job's outputs as untrusted (`:176`) and checks the
       patch digest (`:214`).
     - It re-applies the patch to a clean checkout and re-runs the guard.
     - It lands with a fast-forward push to `main` (`:242`). GitHub refuses
       that push atomically if `main` moved, so the tree that lands is the
       tree that was checked. A PR records the change.
     - Anything that wasn't published opens an issue (`:248`).
4. **Vercel** deploys `main` as usual.

## What the guard allows

`scripts/email-guard.mjs` parses both versions of each data file with the
TypeScript compiler and judges the result:

- **Literals only.** Every value in `GIVING_LEVELS`, `WINNERS` and
  `WINNER_PROFILES` must be a literal AST node: string, number, boolean,
  array or plain object (`email-guard.mjs:48`). No expressions, spreads,
  getters, template substitutions or new comments (`:218`).
- **Nothing outside the data changes.**
- **Field rules** (`:144`):
  - Level names and amounts are fixed. Donors may be added or moved between
    levels, but never removed, and never listed in 2 levels.
  - Winners are never added, removed or reordered. `storyUrl` and
    `imageUrl` are fixed.
  - Profiles may be added or edited, but never removed. `actionImage` and
    `closingImage` are fixed.
- **No new URL- or path-like values** anywhere, checked on the decoded value
  (`:43`).
- **At most 15 records change** (`:39`).

| Verdict | Outcome |
|---|---|
| `auto` | Published |
| `review`, `empty`, `triage`, `checks-failed`, `failed` | Issue opened, nothing published |
| `reject` (another file changed, or a data file deleted) | Issue opened, nothing published |

## Privacy

The repo is public. Nothing from the email (sender, subject, body) and no
agent-written text reaches logs, artifacts, commits, PRs or issues. Only
`auto` edits upload their patch, which is the same data that goes live. Guard
reasons never include values or file names. To see what someone asked for,
open the message in Postmark's inbound activity.

## Known limits

- **Sender authentication is domain-level** (a deliberate choice,
  2026-11-19). Aligned SPF proves the mail came from servers the sender's
  domain authorizes. It doesn't prove which mailbox sent it, and shared
  providers (Google, Microsoft) are authorized for many customers. A forged
  email could at worst publish a fake donor name or bio text within the
  field rules. That would be visible and easy to revert.
- **Header trust is unverified.** The route assumes Postmark's own
  `Received-SPF` and `Return-Path` headers come first in its `Headers`
  array. Confirm this with the first real email.
- **No dedup.** A Postmark retry after a lost response dispatches twice. The
  second run finds nothing to change and opens an issue.
- **Collisions are loud, not queued.** Runs aren't serialized, because a
  GitHub concurrency group drops pending runs. If 2 emails land at once, the
  second fast-forward fails and its PR stays open with a comment.

## Setup

| Where | Name | Value |
|---|---|---|
| Vercel (Production) | `INBOUND_EMAIL_BASIC_AUTH` | `user:pass`, also in the Postmark webhook URL. 1Password: "Gold Helmet inbound email webhook" |
| Vercel (Production) | `INBOUND_EMAIL_ALLOWED_SENDERS` | comma-separated addresses |
| Vercel (Production) | `GITHUB_DISPATCH_TOKEN` | fine-grained PAT, this repo only, Contents: read & write |
| GitHub Actions secret | `ANTHROPIC_API_KEY` | dedicated key, spend-capped |
| GitHub repo settings → Actions → General | Workflow permissions | check "Allow GitHub Actions to create and approve pull requests" |
| GoDaddy DNS | `in` MX 10 | `inbound.postmarkapp.com` |
| Postmark inbound stream | Inbound domain | `in.goldhelmetaward.com` |
| Postmark inbound stream | Webhook URL | `https://<user>:<pass>@goldhelmetaward.com/api/inbound-email` |

Send to any address at `in.goldhelmetaward.com`, e.g. `updates@in.goldhelmetaward.com`.

## Changing the rules

- **New editable data:** add the file and its declaration names to
  `DATA_FILES`, add field rules to `checkPolicy`, and add cases to
  `scripts/email-guard.test.ts`.
- **New sender:** edit `INBOUND_EMAIL_ALLOWED_SENDERS` in Vercel and
  redeploy.
- **Turn off auto-publish:** replace the fast-forward push in the `Land` step
  with nothing. Every edit then waits as a PR.
