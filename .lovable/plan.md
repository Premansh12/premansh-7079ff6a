# Polish pass: faster handoff, denser skills, drop the Kit, fix a11y nits

Used the accessibility skill to audit interactive bits along the way.

## 1. Preloader → Hero handoff (faster, no lag)

`src/components/preloader.tsx` — compress the timeline and overlap the veil dissolve with Hero text staggering in, so there's no gap.

```text
old → new
40   → 0     Stage 1 (title in)
600  → 350   Stage 2 (image crop emerges)
1300 → 900   Stage 3 (image expands, title fades)
2100 → 1400  Stage 4 (image fills, unfreeze Hero anims)
2400 → 1500  Stage 5 (veil dissolves, 500ms)
4200 → 2200  unmount
```

Also drop the veil dissolve duration from 700ms → 500ms and reduce mask transition from 850ms → 600ms. Net experience: ~2.2s from blank to interactive Hero, with the Hero text already staggering in during the last 700ms — no perceptible pause.

## 2. Drop the Tools / Kit section from home

`src/routes/index.tsx`:
- Remove `<Tools />` from the `Index()` JSX.
- Delete the `Tools` function (lines 317–389).
- Delete the `TOOL_GROUPS` data and `Tool` / `ToolGroup` types (lines 95–146).

Skills section stays; nothing else changes around it.

## 3. Skill cards: smaller & more compact

`src/components/skill-card.tsx`:
- Change card aspect from `aspect-[16/9]` → `aspect-[2/1]` (much shorter — ~340×170 at 4-col desktop).
- Image column from `38%` → `34%`.
- Padding `p-5` → `px-4 py-3`.
- Title size `text-lg md:text-xl` → `text-base md:text-lg`.
- Tighten internal vertical rhythm via `gap-1.5` on the flex column (replaces `justify-between` which over-spaced when card is short).
- Keep cursor wash, gold hover ring, image scale, `Explore →` arrow — just at smaller scale.

`src/routes/index.tsx` Skills grid: gap `gap-4 lg:gap-5` → `gap-3 lg:gap-4`, Reveal stagger `30ms` → `20ms`.

## 4. Accessibility / polish nits

Audit results (only the actual hits — most shadcn primitives are fine):

- **`src/components/preloader.tsx`** — the title block currently sets `text-[#1a1a1a]` then a wrapper uses `mix-blend-difference` with white children. Result is correct but hardcoded color; switch the wrapper to `text-foreground` so it follows theme tokens (passes a11y review's "no arbitrary colors" rule). No visual change.
- **`src/components/skill-card.tsx`** — outer `<button>` already has `aria-label`; add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background` so keyboard focus is visible (currently relies on browser default which the rounded border swallows).
- **`src/components/back-to-top.tsx`** — verify `aria-label`; if missing add `aria-label="Back to top"` and `focus-visible` ring. (Will check during build; one-line fix at most.)
- **`src/components/site-nav.tsx`** — menu/close buttons already have `aria-label`. Add `focus-visible` ring on the mobile menu trigger to match.
- **Hero scroll indicator** (`src/routes/index.tsx` ~line 223) — `<a href="#about" aria-label="Scroll">` already labeled; add `focus-visible:outline-gold` for keyboard users.

No content/copy edits, no other section touched.

## Out of scope

- Tools data file removal beyond `src/routes/index.tsx` (the section was inlined — nothing else to clean up).
- SkillPanel changes.
- Any redesign of cards beyond size/padding.
