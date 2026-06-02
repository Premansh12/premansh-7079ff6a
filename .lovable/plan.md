## Findings — full data-flow audit

### Step 1 — Database contents
- The Supabase database has exactly one user-facing table: `photos`.
- **There is no `projects` table.** It has never existed, so there is nothing to query, no rows, no RLS, no GRANTs to debug.

### Step 2 — Supabase connection
- The Lovable Cloud connection itself is healthy. `src/integrations/supabase/client.ts` is wired correctly; the `photos` table (used by `/album`) reads fine, which proves URL, anon key, and client init are all good.
- So the connection is **not** the problem.

### Step 3 — Query execution
- Nothing in the app ever queries `projects` from Supabase. Search across `src/` shows zero references to `supabase.from("projects")`.
- All project rendering imports from a **static file**: `src/data/projects.ts` (`import { projects } from "@/data/projects"`). Used by:
  - `src/routes/index.tsx` (Featured Projects — `projects.slice(0, 4)`)
  - `src/routes/projects.index.tsx` (all-projects grid)
  - `src/routes/projects.$slug.tsx` (detail page, via `getProject` / `getAdjacent` / `getRelated`)
  - `src/routes/sitemap[.]xml.ts`

### Step 4 — RLS
- Not applicable. No table exists, so RLS is not the blocker. (If/when we create one, we'll add a public-read policy + GRANT to anon.)

### Step 5 — Frontend rendering
- The grid and featured-projects logic are correct. There are no hidden filters, no `featured` flag, no category filter accidentally hiding rows.
- `projects.ts` currently exports an array with **1 entry** (`mascara-skincare`). So today the home page should show 1 featured card and `/projects` should show 1 card. If the user is seeing "no projects", it's because they expected the array to be longer or to be Supabase-driven, not because rendering is broken.

### Step 6 — Dynamic pages
- `projects.$slug.tsx` is fully template-driven off the `Project` shape, so any new entry — static or from Supabase — produces a complete case study with zero template work. No hardcoded per-project pages remain.

---

## Root Cause

The Projects section is **not connected to Supabase at all**. The codebase intentionally ships a static `projects` array (see comments at top of `src/data/projects.ts`) and only one project has been populated. There is no failing query, no RLS block, no fetch bug — just no data source wired up.

---

## Recommended Fix (simplest)

Wire Projects to Supabase end-to-end, keeping the same `Project` shape so route templates don't change:

1. **Migration** — create `public.projects` mirroring the `Project` type:
   - columns: `slug` (text, unique), `title`, `category`, `year`, `cover`, `tagline`, `role`, `stack` (text[]), `overview`, `challenge`, `solution`, `process`, `results` (text[]), `gallery` (jsonb), `behance_url` (text, nullable), `sort_order` (int, default 0), `created_at`
   - GRANT `SELECT` to `anon` + `authenticated`; `ALL` to `service_role`
   - Enable RLS, single policy: `FOR SELECT USING (true)` (portfolio is public)
2. **Server fns** in `src/lib/projects.functions.ts`:
   - `listProjects()` → ordered by `sort_order, created_at desc`
   - `getProjectBySlug(slug)`
   - `getAdjacentProjects(slug)` and `getRelatedProjects(slug)` (same signatures as today)
3. **Route loaders** — convert each route to use `ensureQueryData` + `useSuspenseQuery` per the TanStack Query default. Add `errorComponent` + `notFoundComponent`.
4. **Seed** the one existing project (`mascara-skincare`) by inserting the current static row, so nothing visually regresses.
5. **Delete** `src/data/projects.ts` once routes compile against the loaders. Update `sitemap[.]xml.ts` to read from the loader too.

---

## Alternative Fixes

- **A. Quick win, no backend** — just append more entries to `src/data/projects.ts`. Zero infra; every new project = a code edit.
- **B. Keep static, add a build-time import script** — a Node script reads a Behance gallery URL and appends a new entry to `projects.ts`. Still no DB, still requires a commit per project.
- **C. Full Supabase + admin UI** — Supabase table + a small `/admin/projects` page (auth-gated) for CRUD. Best long-term but most work up front.

---

## Architecture Recommendation

**Option D — Supabase + Behance Import Workflow** is the right fit. Reasoning against the stated criteria:

- **GitHub Pages hosting**: not a constraint here — this app runs on Lovable's serverless runtime, which can call Supabase from server functions. Static-only hosting is not required.
- **Behance portfolio integration**: the import workflow is what makes this scale. New case studies enter via a small server fn that accepts a Behance URL, scrapes/normalizes the metadata + image URLs, and inserts a row.
- **Future project growth**: a `projects` table scales linearly; no code edits per project.
- **Minimal maintenance**: one schema, one loader, one importer.
- **Dynamic project pages**: already templated — they just need a data loader instead of a static array.
- **Future AI-assisted imports**: easy to layer on. The importer becomes "AI fills the `overview / challenge / solution / process / results` fields from the Behance scrape, you review, you publish."

Why not the others:
- **A (fully dynamic Supabase, no importer)** is fine but leaves the Behance step manual — every new project still means copy/pasting 10 image URLs.
- **B (hybrid metadata + Behance hot-linked images)** is brittle. Behance CDN URLs change and break. Better to copy the images into Supabase Storage at import time.
- **C (static JSON)** is what we have today, and is exactly what surfaces this bug — the user expected database-backed content and got an unpopulated array.

---

## Technical details (build-mode work, listed for transparency)

- New migration creating `public.projects` + GRANTs + RLS policy.
- New file `src/lib/projects.functions.ts` with the four server fns above (all read-only, no auth middleware needed since the table is public-read).
- Edits to `src/routes/index.tsx`, `src/routes/projects.index.tsx`, `src/routes/projects.$slug.tsx`, `src/routes/sitemap[.]xml.ts` to consume the loader.
- Seed insert for the existing Mascara Skincare row.
- Importer (`src/lib/projects.import.functions.ts`) is a follow-up; not part of the first cut unless you want it included now.

Want me to proceed with the Recommended Fix as the first cut (schema + loader + route wiring + seed), and tackle the Behance importer in a second pass?
