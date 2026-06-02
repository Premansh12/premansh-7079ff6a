## Goal

Replace the current `/album` (PhotoStrip + PhotoChapter) with a from-scratch, 3D scroll-driven "Photo Surfer" rooted in the portfolio's editorial design language — white background, charcoal type, gold accents, Instrument Serif. All photos live in Supabase Storage; the `photos` table is the single source of truth. Adding a photo = upload + insert row, no code changes.

---

## 1. Database (extend existing `photos`)

Migration adds columns the surfer + story panel need, keeps existing rows intact:

- `slug` text unique (auto-generated from title if null)
- `storage_path` text — path inside the `photography` bucket
- `country` text
- `featured` boolean default false

Data migration:
- For existing rows where `image_url` points to public Supabase URLs, attempt to derive `storage_path`. Where that's not possible, leave `image_url` as fallback and set `storage_path` null — the resolver below handles both.
- Backfill `slug` from `title`.

Keep RLS as-is (public SELECT).

## 2. Storage

- Create public bucket `photography`.
- Add `storage.objects` RLS: public SELECT on `bucket_id = 'photography'`.
- No write policies — uploads happen via Lovable Cloud UI / admin tools.

## 3. Server function

`src/lib/photos.functions.ts` (extend existing):
- `listPhotos()` — returns all photos, sorted by `sort_order`, with a resolved `image` URL: `storage_path` → `supabase.storage.from('photography').getPublicUrl()`, falling back to `image_url`.
- `listFeaturedPhotos(limit)` — same, filtered to `featured = true`.
- `getPhotoBySlug(slug)` — for deep-linkable story panels.

Returns plain DTOs matching the new `Photo` type (id, slug, title, image, location, country, category, story, date_taken, camera, lens, settings, featured).

## 4. The Photo Surfer component

`src/components/photo-surfer.tsx` — built from scratch, NOT a generic demo.

Layout:
- Top-left header block:
  - Eyebrow: `PHOTOGRAPHY JOURNAL` in 10px gold tracked caps
  - Headline: "Moments & Frames" in Instrument Serif
  - Meta: dynamic `(42 Frames)` count + "A visual archive of places, experiments, observations, and stories."
- Horizontal track of cards, each card 3:4, charcoal frame on white.
- Scroll-driven horizontal motion with perspective: cards rotate slightly toward viewer as they pass center (CSS `perspective` + `rotateY` driven by scroll progress). Inertial, calm — no aggressive snap.
- Wheel + drag + arrow-key navigation. Keyboard accessible; respects `prefers-reduced-motion` (falls back to a clean horizontal grid).
- Each card overlay on hover: gold hairline border, subtle white-to-cream gradient bottom, text reveals title (Instrument Serif), location (charcoal), category (gold caps).

## 5. Story panel (click-through)

`src/components/photo-story.tsx` — full-bleed editorial entry, not a lightbox:
- Slides in from the right (or fades up on mobile), takes ~92vw, scrollable internally.
- Left column: large image (object-contain, framed in cream).
- Right column (editorial): category eyebrow, serif title, location · country, date_taken, story prose, then a small "Made with" block listing camera / lens / settings as charcoal mono.
- Deep-linkable via `?photo=<slug>` search param.
- Close on Esc / backdrop / button.

## 6. /album route

Rewrite `src/routes/album.tsx`:
- White background, editorial spacing.
- Renders `<PhotoSurfer photos={...} />` and `<PhotoStory />` when a slug is in the search params.
- Loader uses `ensureQueryData(listPhotos)`.
- Keep Instagram CTA line.

Delete `src/components/photo-strip.tsx` and `src/components/photo-chapter.tsx`.

## 7. Homepage Featured Frames

New section in `src/routes/index.tsx` (above contact):
- Eyebrow `FEATURED FRAMES`, serif headline, 3–5 featured photos in a compact horizontal strip (same surfer, smaller scale, no full chrome).
- CTA: `Explore Photography Journal →` linking to `/album`.

## 8. Design tokens

Uses existing tokens (`--background`, `--foreground`, `--gold`, Instrument Serif). Adds two utility classes in `styles.css` if needed: `.surfer-card-frame` (cream border + soft shadow) and a `--shadow-editorial` token.

---

## Technical notes

- Scroll motion: native `scroll` event on a horizontal container + `requestAnimationFrame`, no external dep.
- Image loading: `loading="lazy"`, `decoding="async"`, intrinsic aspect-ratio to prevent CLS.
- Public URLs computed on the server in the listing function (cheap, deterministic) so client doesn't need the storage SDK.
- Adding a photo flow: upload to `photography` bucket via Lovable Cloud → insert row in `photos` with `storage_path` set → appears automatically (router invalidate on next nav, or `staleTime: 0`).

## Files

- Migration: extend `photos`, create `photography` bucket policy.
- New: `src/components/photo-surfer.tsx`, `src/components/photo-story.tsx`.
- Edited: `src/lib/photos.functions.ts`, `src/lib/photos.types.ts` (if exists, else add), `src/routes/album.tsx`, `src/routes/index.tsx`.
- Deleted: `src/components/photo-strip.tsx`, `src/components/photo-chapter.tsx`.

## Out of scope

- Admin upload UI (uploads done via Cloud dashboard for now).
- Pagination — full list ships at once; revisit if count grows past ~80.
