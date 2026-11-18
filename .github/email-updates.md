# Site updates by email

Board members email a change ("add Jake Stone to Brotherhood") to the
site-update address. An agent edits the site data, a guard checks the diff,
and safe edits merge and deploy on their own. Anything unusual becomes a PR
or an issue for a human.

## Flow

1. **Postmark inbound** receives mail for `*@in.goldhelmetaward.com` and POSTs
   it as JSON to `https://<user>:<pass>@goldhelmetaward.com/api/inbound-email`.
2. **`app/api/inbound-email/route.ts`** checks Basic auth (`route.ts:26-28`),
   then the sender (`route.ts:38`, logic in `lib/inbound-email.ts:50-64`):
   - From address must be in `INBOUND_EMAIL_ALLOWED_SENDERS`
   - `Received-SPF` must be `pass`
   - the `Return-Path` domain must equal the From domain, so SPF is vouching
     for the sender's own domain

   Accepted mail goes to GitHub as a `repository_dispatch` event
   (`route.ts:50`). The body is Postmark's reply-only text when it has one,
   otherwise the full text including any quoted thread, capped at 20,000
   characters (`lib/inbound-email.ts:66-70`). Rejected mail gets a 200 so
   Postmark doesn't retry it. GitHub failures get a 500 so it does.
3. **`.github/workflows/email-update.yml`** runs 2 jobs:
   - `edit` has a **read-only** token (`email-update.yml:34-35`). The email
     is read from the event file, never through `env:`, because Actions
     prints step env in public logs (`email-update.yml:47`). Claude Code runs
     with only file tools: no shell, no web, no new files
     (`email-update.yml:61-62`). The guard is copied before the agent runs
     (`email-update.yml:44`), so the agent can't edit its own judge.
     Typecheck, lint and tests run here as well, still read-only
     (`email-update.yml:97`).
   - `land` has write access but runs no code from the edit
     (`email-update.yml:125-126`). It maps the edit job's outputs onto fixed
     values (`email-update.yml:157`), re-applies the patch on a clean
     checkout and re-runs the guard. It merges only when everything is clean
     and `main` hasn't moved since the checkout
     (`email-update.yml:207`, `226`).
4. **Vercel** deploys `main` as usual.

## What the guard allows

`scripts/email-guard.mjs` judges the diff, not the agent:

| Verdict | When | Outcome |
|---|---|---|
| `auto` | Only the data blocks in `lib/constants.ts` (`GIVING_LEVELS`, `WINNERS`) or `lib/winner-profiles.ts` (`WINNER_PROFILES`) changed, every token in them is a plain literal, object key, comment or `{}[],:` (`email-guard.mjs:67`), no new URLs or `javascript:`/`data:` schemes, at most 80 changed lines | PR auto-merged |
| `review` | Data files only, but something is unusual (see above) | PR left open |
| `reject` | Any other file changed, or a data file deleted | Issue opened, nothing committed |
| `empty` | Agent made no edit (unclear request) | Issue opened |

Emails with attachments (photos) always stay open for review
(`email-update.yml:206`).

## Privacy

The repo is public. Nothing from the email (sender, subject, body) and no
agent-written text reaches logs, artifacts, commits, PRs or issues. Those
carry fixed text plus the data diff, which goes live on the site anyway.
Guard reasons count problems without echoing values. To see what someone
asked for, open the message in Postmark's inbound activity.

## Known limits

- **Sender authentication is domain-level.** The check proves the mail came
  from infrastructure the sender's domain authorizes (aligned SPF). It does
  not prove which mailbox sent it, and shared senders (Google, Microsoft)
  are authorized for many customers. A forged email could at worst get a
  literal-only data edit merged: a fake donor name or bio text, which is
  visible and revertible. Requiring a per-sender passphrase or DKIM-aligned
  results would tighten this.
- **Header trust is unverified.** The route assumes Postmark's own
  `Received-SPF` and `Return-Path` headers come first in its `Headers`
  array. Confirm this with the first real email.
- **No dedup.** A Postmark retry after a lost response dispatches twice. The
  second run finds nothing to change and opens a "needs a human" issue.
- **Collisions are loud, not queued.** Runs aren't serialized (GitHub's
  concurrency groups drop pending runs). Two emails at once can make the
  second merge fail; its PR then stays open.

## Setup

| Where | Name | Value |
|---|---|---|
| Vercel (Production) | `INBOUND_EMAIL_BASIC_AUTH` | `user:pass`, also in the Postmark webhook URL. 1Password: "Gold Helmet inbound email webhook" |
| Vercel (Production) | `INBOUND_EMAIL_ALLOWED_SENDERS` | comma-separated addresses |
| Vercel (Production) | `GITHUB_DISPATCH_TOKEN` | fine-grained PAT, this repo only, Contents: read & write |
| GitHub Actions secret | `ANTHROPIC_API_KEY` | dedicated key, spend-capped |
| GitHub repo settings → Actions → General | Workflow permissions | check "Allow GitHub Actions to create and approve pull requests" (needed for `gh pr create`) |
| GoDaddy DNS | `in` MX 10 | `inbound.postmarkapp.com` |
| Postmark inbound stream | Inbound domain | `in.goldhelmetaward.com` |
| Postmark inbound stream | Webhook URL | `https://<user>:<pass>@goldhelmetaward.com/api/inbound-email` |

Send to any address at `in.goldhelmetaward.com`, e.g. `updates@in.goldhelmetaward.com`.

## Changing the rules

- New editable data: add the file and its block markers to `DATA_FILES` in
  `scripts/email-guard.mjs`, then add a case to `scripts/email-guard.test.ts`.
- New sender: edit `INBOUND_EMAIL_ALLOWED_SENDERS` in Vercel and redeploy.
- Turn off auto-merge: delete the `gh pr merge` line in the workflow. Every
  edit then waits as a PR.
