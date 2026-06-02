# Compact Editorial Capability Cards

Replace the current tall 4:5-image cards with wide, fixed-height horizontal cards. 60% content / 40% image, same imagery, same panel, same data — only the card architecture changes.

## File: `src/components/skill-card.tsx` (full rewrite)

New layout — fixed aspect, no resize on hover:

```text
┌──────────────────────────────────────────────────────┐
│ 01 / 11                                         ROLE │
│                                                      │
│ Web Designer                          ┌────────────┐ │
│                                       │            │ │
│ Editorial layouts and             →   │   image    │ │
│ considered digital experiences.       │            │ │
│                              Explore →└────────────┘ │
└──────────────────────────────────────────────────────┘
       ~60% content                     ~40% image
```

- Outer button: `aspect-[16/9]` so card height tracks column width and stays uniform. Targets ~340×190 at 4-col on a typical desktop.
- Inner: `grid grid-cols-[1fr_40%]` (mobile collapses to `grid-cols-[1fr_38%]` — image stays on the right at every breakpoint).
- Left column (`flex flex-col justify-between p-5`):
  - Top row: `01 / 11` (gold serif) on the left, `ROLE` label on the right.
  - Middle: `<h3 class="font-serif text-lg md:text-xl leading-tight">` role title.
  - Bottom row: one-line tagline (`line-clamp-1 text-[12px] text-muted-foreground`) + small `Explore →` with arrow that slides on hover (`group-hover:translate-x-0.5`).
- Right column: image wrapper fills the card's full height, `h-full`, `object-cover object-center`, subtle inner gold ring on hover (`ring-1 ring-inset ring-gold/0 group-hover:ring-gold/30`). Image scales `1.04` on hover (existing 1200ms ease).
- Cursor-reactive gold wash kept, radius reduced to ~160px and confined to the content side via a non-clipping overlay layer.
- Hover surface: `hover:-translate-y-0.5`, `hover:border-gold/40`, `hover:shadow-[0_20px_50px_-25px_rgba(212,168,67,0.45)]`. No size/layout change.
- Rounded corners `rounded-xl`, `overflow-hidden` so the image's right edge sits flush with the card.

Props unchanged: `{ role, total, onOpen }` — `SkillPanel` opens unchanged.

## File: `src/routes/index.tsx` (grid only)

- Grid stays `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, gap tightened to `gap-4 lg:gap-5` so 4-up reads denser.
- `Reveal` stagger reduced to ~30ms (cards are much shorter now).
- Everything else in the Skills section (intro copy, `SkillPanel` mount, `activeSlug` state) untouched.

## Preserved

- All 11 images in `src/assets/skills/*.jpg` — untouched, same `role.image` reference.
- `src/data/skill-roles.ts` — untouched.
- `SkillPanel` (side drawer on click) — untouched; click behavior identical.
- Charcoal/gold palette, Instrument Serif, hairlines, existing `Reveal`.

## Out of scope

- Regenerating any image, re-cropping, editing role copy.
- `SkillPanel` redesign — only the grid card changes.
- Any other section on the page.

No new dependencies. Pure Tailwind.
