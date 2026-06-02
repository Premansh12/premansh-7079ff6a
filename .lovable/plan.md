## Album page polish

### 1. Dotted canvas + visible boundary
- Add a subtle dot-grid background to the `PhotoDraggable` container (CSS `radial-gradient` of 1px dots at ~24px spacing, low-opacity ink color, themed).
- Wrap the moodboard in a visible boundary: a thin hairline border with rounded corners and inset shadow, sitting inside the section padding so users see where cards can be tossed.
- Constrain drag to that boundary instead of the full window: replace the `useEffect` that sets `constraints` from `window.innerWidth/innerHeight` with a `dragConstraints` ref pointing at the container element (passed down via a context or prop on `DraggableCardContainer`). Cards can no longer fly off-screen.

### 2. Increase drag sensitivity / throw
In `src/components/ui/draggable-card.tsx`:
- Lower spring damping and raise stiffness on the post-release `animate` calls so cards travel further and settle faster.
- Increase the velocity multiplier from `0.3` → `~0.6` so a flick throws the card noticeably further.
- Raise the max `bounce` cap from `0.8` → `1.0` and tune the springs (`stiffness: 80`, `damping: 12`) for a more physical toss.
- Add `dragElastic: 0.8` (up from default ~0.5) so the card follows the cursor more responsively.

### 3. Theme on /album
The route hardcodes `bg-[#fbf9f4] text-[#222]` and the moodboard uses `#1a1a1a` text, so the global `ThemeToggle` has no effect on this page. Fix:
- Replace hardcoded colors on `src/routes/album.tsx` with semantic tokens: `bg-background text-foreground`, `text-muted-foreground`, etc. Headline uses `text-foreground`, helper copy uses `text-muted-foreground`.
- In `src/components/photo-draggable.tsx`, swap the centered watermark `text-[#1a1a1a]/15` for `text-foreground/15`, and the card caption gradient/colors stay (they sit over the photo, so they remain ink-on-image and work in both themes).
- In `draggable-card.tsx`, swap `bg-[#efeae0]` for `bg-card` so the card frame follows theme. Keep shadow.
- Verify `ThemeToggle` itself works (it does — toggles `.dark` on `<html>`). The bug is only that album styles ignored tokens.

### Files touched
- `src/routes/album.tsx` — semantic colors, dotted/boundary wrapper around `<PhotoDraggable />`.
- `src/components/photo-draggable.tsx` — pass container ref for boundary constraints, themed watermark.
- `src/components/ui/draggable-card.tsx` — accept `dragConstraints` ref, raise sensitivity, themed card bg.
- `src/styles.css` — add a `.dot-grid` utility (themed via `currentColor` or token).

### Out of scope
Homepage `PhotoSurfer`, lightbox, data layer, Supabase. No new deps.
