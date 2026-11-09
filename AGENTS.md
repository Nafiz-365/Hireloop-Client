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

- **shadcn is Base UI here** (`@base-ui/react`), not Radix. To render a Button as a link: `render={<Link href="..." />}` plus `nativeButton={false}` — omitting `nativeButton={false}` produces a nested `<a><a>` (see any file in `components/home/`). Add new primitives with `npx shadcn@latest add <component>`.
- `cn` is the `cn` npm package (not a local clsx/tailwind-merge helper). `components/ui/*` imports it from `"cn"`; everything else goes through the re-export at `@/lib/utils`. Prettier's `tailwindFunctions` is `["cn", "cva"]`.
- **Tailwind v4**: no `tailwind.config.*`; theme lives in `app/globals.css` under `@theme inline`. `--radius: 0.625rem` and its `--radius-*` scales do not match Figma pixel radii — use arbitrary values (`rounded-[24px]`) when matching the design.
- Fonts are defined in `lib/fonts.ts` via `next/font` and applied by passing `className` to elements — they are not wired to CSS variables. `Space_Mono` requires an explicit `weight: ["400","700"]` (it has no variable axis).
- ESLint flat config (`eslint.config.mjs`) ignores `.next/`, `out/`, `build/`.

## Architecture

- App Router, single package (no workspaces). Path alias `@/*` → repo root (tsconfig).
- `app/page.tsx` = homepage; sections live in `components/home/*` (Navbar, Hero, Stats, Jobs, JobCard, Features, Pricing, Cta, Footer). `"use client"` only where a component uses Button/Input/useState; the rest are server components.
- Auth: better-auth with MongoDB adapter. The Mongo connection is hardcoded to `mongodb://localhost:27017/database` in `lib/auth.ts` — a local MongoDB is required for auth routes to work. `.env` holds `BETTER_AUTH_SECRET`/`BETTER_AUTH_URL`; Google OAuth needs `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (not present in `.env`). Route handler: `app/api/auth/[...all]/route.ts`.
- Static assets: use `public/images/*` and `public/icons/*` (Figma exports). `app/images/*` is an unreferenced duplicate — don't import from it. Icons render through `components/home/Icon.tsx` (`next/image` with `unoptimized` for SVGs).

## Design source

- Figma file: `C:\Users\hp\Desktop\hireloop-resources\hireloop.fig`. The homepage is frame `Design > Homepage` (`12022:10424`, 1440×5466, bg `#010103`); other screens are not yet built.
- The body is dark (`bg-[#010103] text-white` in `app/layout.tsx`) — the light `oklch` tokens in `globals.css` are stock shadcn defaults and do not reflect the actual UI.
