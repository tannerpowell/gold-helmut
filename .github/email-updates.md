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
   (`route.ts:50`). Only the reply text is sent (quoted thread stripped),
   capped at 20,000 characters (`lib/inbound-email.ts:25`). Rejected mail
   gets a 200 so Postmark doesn't retry it. GitHub failures get a 500 so it
   does.
3. **`.github/workflows/email-update.yml`** runs 2 jobs:
   - `edit` has a **read-only** token (`email-update.yml:32-33`). Claude Code
     runs with only file tools: no shell, no web (`email-update.yml:64-65`).
     The guard is copied from `main` before the agent runs
     (`email-update.yml:41`), so the agent can't edit its own judge.
   - `land` has write access but runs no agent (`email-update.yml:125-126`).
     It re-applies the patch on a clean checkout, re-runs the guard, then
     typechecks, lints and tests before it opens a PR. It merges only when
     everything is clean (`email-update.yml:240`).
4. **Vercel** deploys `main` as usual.

## What the guard allows

`scripts/email-guard.mjs` judges the diff, not the agent:

| Verdict | When | Outcome |
|---|---|---|
| `auto` | Only the data blocks in `lib/constants.ts` (`GIVING_LEVELS`, `WINNERS`) or `lib/winner-profiles.ts` (`WINNER_PROFILES`) changed, no new URLs, no code-like text, at most 80 changed lines (`email-guard.mjs:18-31`) | PR auto-merged |
| `review` | Data files only, but something is unusual (see above) | PR left open |
| `reject` | Any other file changed, or a data file deleted | Issue opened, nothing committed |
| `empty` | Agent made no edit (unclear request) | Issue opened |

Emails with attachments (photos) always stay open for review
(`email-update.yml:219`).

The repo is public. The workflow never prints the email's sender or body.
PRs and issues contain only the agent's summary, and the agent is told to
keep contact details and amounts out of it.

## Setup

| Where | Name | Value |
|---|---|---|
| Vercel (Production) | `INBOUND_EMAIL_BASIC_AUTH` | `user:pass`, also in the Postmark webhook URL. 1Password: "Gold Helmet inbound email webhook" |
| Vercel (Production) | `INBOUND_EMAIL_ALLOWED_SENDERS` | comma-separated addresses |
| Vercel (Production) | `GITHUB_DISPATCH_TOKEN` | fine-grained PAT, this repo only, Contents: read & write |
| GitHub Actions secret | `ANTHROPIC_API_KEY` | dedicated key, spend-capped |
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
