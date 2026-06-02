## Goal

Keep the existing 11 cinematic images, titles, descriptions, numbering, and gold/charcoal/serif identity. Replace the oversized 2-col expanding cards with a compact, uniform 4-col marketplace-style grid, and move all expanded content into a premium side panel.

## What changes

### 1. `src/components/skill-card.tsx` — compact uniform card

New layout (fixed structure, no inline expansion):

```text
┌────────────────────────┐
│ 01     ROLE            │   ← top: number + category label
├────────────────────────┤
│                        │
│   [cinematic image]    │   ← center: 4:5 image, object-cover
│                        │
├────────────────────────┤
│ Web Designer           │   ← bottom: serif title
│ Editorial layouts and  │   one-line tagline (clamped)
│ considered digital…    │
└────────────────────────┘
```

- Single `<button>` wrapping the card, fires `onOpen()` (no in-grid expansion, no `expanded` prop).
- Image wrapper uses `aspect-[4/5]` so every card is identical height regardless of viewport.
- Tagline clamped to one line on desktop, two on mobile (`line-clamp-1 md:line-clamp-2`).
- Hover: `-translate-y-0.5`, gold ring fades in (`ring-gold/30`), image `scale-[1.04]` over 700ms, soft gold glow shadow. No card resize.
- Pointer-reactive gold wash kept but toned down (smaller radius, lower opacity) so it reads at small size.
- Remove `Plus`/`X`/"Explore" affordance — replaced by a tiny gold arrow in the top-right that animates on hover.

### 2. `src/components/skill-panel.tsx` — new side panel for details

Built on the existing shadcn `Sheet` primitive (`src/components/ui/sheet.tsx`), `side="right"`, width `w-full sm:max-w-xl lg:max-w-2xl`, background `bg-background`, charcoal hairline borders, gold accents.

Panel content (same data already in `SKILL_ROLES`, no new fields):

```text
01 / 11                              ROLE
Web Designer
Editorial layouts and considered digital experiences.

[cinematic image — 16:10, full panel width]

Design philosophy        ← derived from existing tagline (no new copy)
Areas of expertise       ← role.expertise
Tools & technologies     ← role.tools (chip row)
Selected work            ← role.selectedWork (links to /projects/$slug)
Highlights               ← role.highlights
```

- One panel instance lives in the Skills section; opens for the active role.
- Close via `X`, overlay click, or `Esc` (handled by Sheet).
- Body scroll locked while open (Sheet default).
- Reuses the existing `Block` styling pattern (gold uppercase label, hairlines).

### 3. Skills section in `src/routes/index.tsx`

- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8`.
- State: `const [activeSlug, setActiveSlug] = useState<string | null>(null)`.
- Each `<SkillCard role={r} total={11} onOpen={() => setActiveSlug(r.slug)} />`.
- Render `<SkillPanel role={activeRole} open={!!activeSlug} onOpenChange={(o) => !o && setActiveSlug(null)} />` once at section root.
- `Reveal` stagger preserved but reduced (cards are smaller — 40–60ms steps).
- Section heading and intro copy unchanged.

## Preserved

- All 11 images in `src/assets/skills/*.jpg` — untouched.
- `src/data/skill-roles.ts` shape and content — untouched (no schema change, future Supabase swap still 1:1).
- Color tokens, `font-serif`, `Reveal`, `hairline`, gold accent, section background.
- Tools section below Skills.

## Out of scope

- Regenerating or re-cropping any image.
- Editing role copy, titles, tagline text, or order.
- Supabase migration for `skill_roles`.
- Any other section on the page.

## Files

- Edit: `src/components/skill-card.tsx` (rewrite into compact card, drop `expanded`/`onToggle` props).
- New: `src/components/skill-panel.tsx` (Sheet-based detail view).
- Edit: `src/routes/index.tsx` (Skills section — new grid + panel wiring; remove single-open `useState<string|null>` toggle logic in favor of `activeSlug` driving the panel).

No new dependencies. Pure Tailwind + existing shadcn Sheet.
