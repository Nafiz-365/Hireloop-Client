<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev        # Next dev server on port 3000 (BETTER_AUTH_URL assumes it)
npm run format     # prettier --write on **/*.{ts,tsx} only (not CSS/MD)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config, eslint-config-next)
npm run build      # next build --webpack (the script forces webpack; don't run bare `next build`)
```

- No test suite exists — don't look for one.
- Verify in this order: `format` → `typecheck` → `lint` → `build`. Prettier reorders Tailwind classes, so format before linting/diffing. There is no CI — this local chain is the only gate; last verified passing Nov 2026.
- A dev server may already be running on port 3000; `npm start` then fails with EADDRINUSE.
- `.env*` is gitignored — a fresh clone has none. Next loads `.env` automatically; it must contain at least `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL=http://localhost:3000`, and `MONGODB_URI` (auth fails at startup without it).
- `npm run build` prints `WARN [Better Auth]: Social provider google is missing clientId or clientSecret` — expected (Google env vars are unset), not a regression.

## Toolchain quirks

- **shadcn is Base UI here** (`@base-ui/react`), not Radix. To render a Button as a link: `render={<Link href="..." />}` plus `nativeButton={false}` — omitting `nativeButton={false}` produces a nested `<a><a>` (see `features/home/components/Cta.tsx`, `features/auth/components/AuthForm.tsx`). Add new primitives with `npx shadcn@latest add <component>`.
- `cn` is the `cn` npm package (no local helper) and **merges conflicting Tailwind classes like tailwind-merge, so an override wins when passed last**. Both `components/ui/*` and feature modules import through the re-export at `@/lib/utils`. Prettier's `tailwindFunctions` is `["cn", "cva"]`.
- **Tailwind v4**: no `tailwind.config.*`; theme lives in `app/globals.css` under `@theme inline`. `--radius: 0.625rem` and its `--radius-*` scales do not match Figma pixel radii — use arbitrary values (`rounded-[24px]`) when matching the design.
- Fonts: design fonts are exported from `lib/fonts.ts` via `next/font` and applied by passing `className` to elements — their `--font-*` variables are **not** consumed anywhere in CSS. The exception is `app/layout.tsx`, which loads Geist/Geist_Mono with `variable` and feeds the `font-sans`/`font-mono` theme tokens in `@theme inline`. `Space_Mono` requires an explicit `weight: ["400","700"]` (it has no variable axis).
- ESLint flat config (`eslint.config.mjs`) ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.
- Don't import `zod` in app code: it is **not** in `package.json` — only a transitive dep of better-auth / MCP tooling. `npm install zod` first if you want it (tree currently has v4).

## Architecture

- App Router, single package (no workspaces). Path alias `@/*` → repo root (tsconfig).
- `app/page.tsx` = homepage; its sections live in `features/home/components/*` (Hero, Stats, Features, Cta), `features/jobs/components/JobsPreview.tsx`, and `features/pricing/components/PricingSection.tsx`. The global shell lives in `components/layout/*` — `Navbar.tsx` renders in the root layout (see below) while `Footer.tsx` is rendered only by `app/page.tsx` (auth pages have no footer). Shared common elements live in `components/common/*` (`Icon.tsx`, `SectionLabel.tsx`), and the shared primitives in `components/ui/*` (button, input, sheet). `"use client"` only where a component uses Button/Input/useState; the rest are server components.
- Navbar (`components/layout/Navbar.tsx`) renders once in `app/layout.tsx` (sticky wrapper) — every page gets it; never render `<Navbar />` inside a page. It does **not** read the session yet (always shows Sign In / Get Started).
- Homepage content is **static mock data** — jobs from `features/jobs/data/mock-jobs.ts`, pricing from `features/pricing/data/plans.ts` (imported relatively, e.g. `../data/plans`); no content API exists yet.
- Dark-only app: no theme provider. `next-themes` was removed because `enableSystem` caused an unfixable SSR hydration mismatch on `<html>` (`style={{color-scheme}}`) — don't re-add theme switching, and don't put `suppressHydrationWarning` on `<html>`.
- `components/ui/input.tsx` sets `suppressHydrationWarning` on the `<input>` **on purpose**: browser extensions (temp-mail/autofill) inject attributes such as `data-temp-mail-org` into inputs before React hydrates, and React 19 reports extra DOM attributes as a fatal hydration mismatch (see `warnForExtraAttributes` in `react-dom-client.development.js`). It skips attribute comparison for that element only — don't spread it to other elements.
- Auth: better-auth with MongoDB adapter. Server config is `lib/auth.ts` — reads `MONGODB_URI` from `.env` (Atlas cluster, loaded at module start) and uses database `hireloop_db`; enables email/password plus a Google social provider reading `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (still unset in `.env` → the build's Google warning is expected). Route handler: `app/api/auth/[...all]/route.ts`.
- Static assets live in `public/images/*` and `public/icons/*` (Figma exports); icons render through `components/common/Icon.tsx` (`next/image` with `unoptimized` for SVGs).

## Auth pages (`/login`, `/signup`)

- Auth calls are wired through `handleSubmit()` in `AuthForm.tsx` (calls `authClient.signUp.email` / `authClient.signIn.email`); API errors render in a red `role="alert"` banner, success shows a message then `router.replace("/")` after 1.2s. `Navbar.tsx` (Sign In / Get Started) and `Cta.tsx` link to these two routes.
- Status (Nov 2026): typechecks/lints/builds, but the sign-up → Atlas → sign-in flow has **not** been exercised live yet — run a real test before assuming auth works.
- One shared client component `features/auth/components/AuthForm.tsx` (`mode: "signin" | "signup"`), with pure validation in `features/auth/validation.ts` and types in `features/auth/types.ts`. `app/(auth)/login/page.tsx` and `app/(auth)/signup/page.tsx` are thin server wrappers that exist only to hold `metadata`. The `(auth)` route group does not affect the URL — both routes stay `/login` and `/signup`.
- Inputs are uncontrolled — data is read in `onSubmit` via `Object.fromEntries(new FormData(e.currentTarget))`. Validation (required, email format, password ≥ 8, confirm-match on signup) runs in `validateAuthForm()` **before** any network call; `handleSubmit()` inside `AuthForm` is the single Better Auth integration point (sends only `name`/`email`/`password` — `confirmPassword` is stripped).
- `lib/auth-client.ts` creates **two** clients: `authClient` (uses `baseURL: process.env.BETTER_AUTH_URL`) and a second bare `createAuthClient()` whose exported `{ signIn, signUp, useSession }` helpers ignore `BETTER_AUTH_URL` (same-origin default). Prefer `authClient.*` when wiring calls.
- No auth screens exist in `hireloop.fig`, so these pages reuse homepage tokens: card `#151516` / `rounded-[24px]`, inputs `#101010` / `border-white/20` / `rounded-[16px]`, primary `#5c53fe` / `rounded-[12px]`.

## Design source

- Figma file: `C:\Users\hp\Desktop\hireloop-resources\hireloop.fig`. The homepage is frame `Design > Homepage` (`12022:10424`, 1440×5466, bg `#010103`); its other built frames are `Public / Browse Jobs`, `Public / Job Details`, `Public / Checkout — Stripe Payment` and `Public / Checkout — Payment Successful` — none are implemented yet, and there are no auth screens in the file.
- The body is dark (`bg-[#010103] text-white` in `app/layout.tsx`) — the light `oklch` tokens in `globals.css` are stock shadcn defaults and do not reflect the actual UI.

## Instruction sources

- `CLAUDE.md` is only `@AGENTS.md` — keep all guidance in this file, don't edit CLAUDE.md separately.
- `README.md` is stock template boilerplate (`npx shadcn@latest add …`); it carries no project setup or conventions.
