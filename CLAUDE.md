# Qanun — project rules

Qatar regulatory library. Users: consultants & auditors, and SMEs. Bilingual
(Arabic + English) source text. Reading-heavy, dense, trustworthy. Mobile-first but
desktop is where the deep work happens.

## Model
- Pipeline: official source → clauses → AI-drafted requirements → human review →
  published. Nothing AI-drafted is ever visible outside the review console.
- Every published requirement links to the exact source clause it came from.
- The official text is the authority. Arabic is binding for onshore law; QFC rules
  are English. Any English we generate is labelled "Unofficial translation". Always.
- Requirement statements are English in v1. statement_ar exists but stays null
  until phase 2.
- Applicability is decided by deterministic rules a reviewer approved. Never by an
  AI at request time.
- An unanswered or "Not sure" profile answer produces "May apply", never silent
  exclusion.
- AI answers cite approved content or say they could not find it. No uncited claims.
- Roles: public (anon), user, reviewer, admin. Reviewer and admin are assigned by an
  admin, never self-selected.
- Compliance-tracker data belongs to an organisation and is invisible to everyone
  outside it, including platform reviewers and admins.
- Free product. No payments, no plans, no billing UI. Do not build them.
- Not legal advice. The disclaimer appears on every requirement, check result and
  AI answer.

## Stack
Next.js App Router · TypeScript strict · Tailwind · Supabase (session 2) · zod ·
Vitest · Playwright · Python 3.12 ingestion worker in /worker (session 3) ·
Claude API, server-only, via src/lib/ai/ and worker/ai/.

## Rules
1. All data access goes through src/lib/queries/. Components never fetch directly.
   These functions read mock data now and Supabase from session 2 — signatures must
   not change.
2. From session 2: public and user routes read *_public views only. Base tables for
   requirements, provisions, rules and AI jobs are queried only under
   src/app/(review)/ and src/app/admin/.
3. Check src/components/ui/ before creating any new primitive.
4. Tokens only. No hardcoded colours, spacing, radii, shadows or durations.
5. Logical CSS only: ms-/me-/ps-/pe-/start-/end-/text-start. Never left/right.
   Arabic must flip cleanly.
6. Arabic text is always rendered in its own element with lang="ar" dir="rtl";
   English with lang="en". Never mix scripts in one text node. Use <LangBlock>.
7. Server Components by default. "use client" only on interactive leaves.
8. Every mutation validated by a zod schema shared client and server.
9. No `any`, no `@ts-ignore`.
10. User-facing strings in src/lib/copy/en.ts. src/lib/copy/ar.ts exists with the
    same keys, empty, for phase 2. Never inline strings.
11. Every AI call goes through src/lib/ai/ or worker/ai/. Model IDs come from env.
    Every call logs model, tokens and estimated cost.
12. Accent buttons in dark mode take dark text (--on-accent). Never white.
13. Never invent a regulation, number, date, URL, article, penalty, requirement,
    statistic or claim about Qanun. Unknown = null, surfaced as a TODO in admin.
14. Dates display as "12 March 2024". Store ISO.
15. next/image with explicit sizes. No raw <img>.

Run `pnpm typecheck && pnpm lint && pnpm test` before reporting any task done.
