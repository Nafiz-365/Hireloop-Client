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
npm run build      # next build
```

- No test suite exists — don't look for one.
- Verify in this order: `format` → `typecheck` → `lint` → `build`. Prettier reorders Tailwind classes, so format before linting/diffing.
- A dev server may already be running on port 3000; `npm start` then fails with EADDRINUSE.

## Toolchain quirks

- **shadcn is Base UI here** (`@base-ui/react`), not Radix. To render a Button as a link: `render={<Link href="..." />}` plus `nativeButton={false}` — omitting `nativeButton={false}` produces a nested `<a><a>` (see `features/home/components/Cta.tsx`, `features/auth/components/AuthForm.tsx`). Add new primitives with `npx shadcn@latest add <component>`.
- `cn` is the `cn` npm package (no local helper) and **merges conflicting Tailwind classes like tailwind-merge, so an override wins when passed last**. Both `components/ui/*` and feature modules import through the re-export at `@/lib/utils`. Prettier's `tailwindFunctions` is `["cn", "cva"]`.
- **Tailwind v4**: no `tailwind.config.*`; theme lives in `app/globals.css` under `@theme inline`. `--radius: 0.625rem` and its `--radius-*` scales do not match Figma pixel radii — use arbitrary values (`rounded-[24px]`) when matching the design.
- Fonts are defined in `lib/fonts.ts` via `next/font` and applied by passing `className` to elements — they are not wired to CSS variables. `Space_Mono` requires an explicit `weight: ["400","700"]` (it has no variable axis).
- ESLint flat config (`eslint.config.mjs`) ignores `.next/`, `out/`, `build/`.

## Architecture

- App Router, single package (no workspaces). Path alias `@/*` → repo root (tsconfig).
- `app/page.tsx` = homepage; its sections live in `features/home/components/*` (Hero, Stats, Features, Cta), `features/jobs/components/JobsPreview.tsx`, and `features/pricing/components/PricingSection.tsx`. The global shell lives in `components/layout/*` (`Navbar.tsx`, `Footer.tsx`), shared common elements in `components/common/*` (`Icon.tsx`, `SectionLabel.tsx`), and the shared primitives in `components/ui/*` (button, input, sheet). `"use client"` only where a component uses Button/Input/useState; the rest are server components.
- Navbar (`components/layout/Navbar.tsx`) renders once in `app/layout.tsx` (sticky wrapper) — every page gets it; never render `<Navbar />` inside a page.
- Dark-only app: no theme provider. `next-themes` was removed because `enableSystem` caused an unfixable SSR hydration mismatch on `<html>` (`style={{color-scheme}}`) — don't re-add theme switching, and don't put `suppressHydrationWarning` on `<html>`.
- `components/ui/input.tsx` sets `suppressHydrationWarning` on the `<input>` **on purpose**: browser extensions (temp-mail/autofill) inject attributes such as `data-temp-mail-org` into inputs before React hydrates, and React 19 reports extra DOM attributes as a fatal hydration mismatch (see `warnForExtraAttributes` in `react-dom-client.development.js`). It skips attribute comparison for that element only — don't spread it to other elements.
- Auth: better-auth with MongoDB adapter. The Mongo client is managed via singleton pool cache in `lib/db/mongodb.ts` (with `MONGODB_URI` environment support and fallback). Route handler: `app/api/auth/[...all]/route.ts`.
- Static assets live in `public/images/*` and `public/icons/*` (Figma exports); icons render through `components/common/Icon.tsx` (`next/image` with `unoptimized` for SVGs).

## Auth pages (`/login`, `/signup`)

- Forms only — there are no auth calls yet. `Navbar.tsx` (Sign In / Get Started) and `Cta.tsx` already link to these two routes.
- One shared client component `features/auth/components/AuthForm.tsx` (`mode: "signin" | "signup"`), with pure validation in `features/auth/validation.ts` and types in `features/auth/types.ts`. `app/(auth)/login/page.tsx` and `app/(auth)/signup/page.tsx` are thin server wrappers that exist only to hold `metadata`. The `(auth)` route group does not affect the URL — both routes stay `/login` and `/signup`.
- Inputs are uncontrolled — data is read in `onSubmit` via `Object.fromEntries(new FormData(e.currentTarget))`. Validation (required, email format, password ≥ 8, confirm-match on signup) is handled via `validateAuthForm()`; `handleSubmit()` inside `AuthForm` is the single place to swap in `authClient.signIn.email` / `authClient.signUp.email` later.
- `lib/auth-client.ts` instantiates a single `authClient` and exports it along with convenience helpers `{ signIn, signUp, useSession }`.
- No auth screens exist in `hireloop.fig`, so these pages reuse homepage tokens: card `#151516` / `rounded-[24px]`, inputs `#101010` / `border-white/20` / `rounded-[16px]`, primary `#5c53fe` / `rounded-[12px]`.

## Design source

- Figma file: `C:\Users\hp\Desktop\hireloop-resources\hireloop.fig`. The homepage is frame `Design > Homepage` (`12022:10424`, 1440×5466, bg `#010103`); its other built frames are `Public / Browse Jobs`, `Public / Job Details`, `Public / Checkout — Stripe Payment` and `Public / Checkout — Payment Successful` — none are implemented yet, and there are no auth screens in the file.
- The body is dark (`bg-[#010103] text-white` in `app/layout.tsx`) — the light `oklch` tokens in `globals.css` are stock shadcn defaults and do not reflect the actual UI.

## Instruction sources

- `CLAUDE.md` is only `@AGENTS.md` — keep all guidance in this file, don't edit CLAUDE.md separately.
- `README.md` is stock template boilerplate (`npx shadcn@latest add …`); it carries no project setup or conventions.
