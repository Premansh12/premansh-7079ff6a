## Goal

Replace the horizontal 3D scroll rail on `/album` with a **draggable, scattered photo card stack** (Aceternity-style draggable cards), keeping all existing data wiring (Supabase `photos` table, slug deep-linking, PhotoStory panel) and the luxury editorial design language (white/cream bg, charcoal type, gold accents, Instrument Serif).

## Scope

- Only the `/album` rail experience changes. Featured Frames on homepage continues to use the existing compact `PhotoSurfer` (no change).
- Data, server functions, storage, schema, and PhotoStory panel are **unchanged**.

## Changes

### 1. Add primitive: `src/components/ui/draggable-card.tsx`
- Port the supplied component verbatim (uses `motion/react`, already installed for CometCard).
- Exports `DraggableCardBody` and `DraggableCardContainer`.
- Keep `cn` import from `@/lib/utils`. Cards: `rounded-[2px]` to match `surfer-card-frame` aesthetic instead of `rounded-md`, and swap `bg-neutral-100 dark:bg-neutral-900` for our cream `#efeae0` so it matches the editorial frame.

### 2. New composed component: `src/components/photo-draggable.tsx`
- Takes `photos: Photo[]` and optional `onSelect(slug)`.
- Renders a `DraggableCardContainer` with `relative` positioning, min height `~85vh`, on the cream `#fbf9f4` canvas of /album.
- Centered backdrop caption (under the cards, low opacity) — serif headline already lives in the page header, so the backdrop text reads small/muted: e.g. "Drag · Toss · Explore" in gold tracked caps. Optional; can be omitted to keep it pure.
- Maps photos to `DraggableCardBody` instances scattered with deterministic-but-varied `top/left/rotate` classes (computed from index so layout is stable across renders, not random per render — avoids hydration jumps). Example pattern cycles through 7 preset positions like the demo.
- Each card: 3:4 aspect, `w-64 md:w-72`, the photo as a full-bleed `<img>` inside, with a thin caption strip at the bottom showing title (serif) + location (charcoal xs). Click (non-drag) opens the story panel via `onSelect(slug)`.
- Click vs drag: track pointer-down position; only fire `onSelect` if pointer moved < 6px between down and up (standard drag-vs-click guard). This avoids the story opening every time the user tosses a card.
- Respects `prefers-reduced-motion`: falls back to a static masonry-style grid of the same cards (no drag, no rotation) so the page remains usable.

### 3. Update `src/routes/album.tsx`
- Replace `<PhotoSurfer photos={photos} onSelect={open} />` with `<PhotoDraggable photos={photos} onSelect={open} />`.
- Adjust the surrounding section: remove the `pb-24 md:pb-32` rail wrapper, use a `relative` full-width container sized to hold the scattered cards (e.g. `min-h-[85vh]`).
- Update the header copy hint: change "Scroll, drag, or use the arrow keys to surf the rail" → "Drag the frames around. Click one to open its story." Keep everything else (eyebrow, headline, frame count, Instagram CTA) intact.
- Keep `PhotoStory` deep-linking via `?photo=<slug>` unchanged.

### 4. Keep PhotoSurfer
- Do **not** delete `src/components/photo-surfer.tsx`; the homepage Featured Frames still uses it.

## Out of scope
- No database / storage / server function changes.
- No homepage changes.
- No new dependencies (`motion` is already installed).

## Files

- **Created:** `src/components/ui/draggable-card.tsx`, `src/components/photo-draggable.tsx`
- **Edited:** `src/routes/album.tsx`

## Open question

Should the scattered layout be **fully overlapping pile** (demo-style, cards stacked with rotations across center) or **spread across the canvas** (more like a pinned moodboard, less overlap, every photo visible at rest)? I'll default to **moodboard spread** since the journal has many photos and a pure pile would hide most of them — let me know if you'd rather have the tight pile.
