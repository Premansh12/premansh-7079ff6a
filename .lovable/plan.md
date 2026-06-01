# Photography Journal — `/album` page

A new route showcasing photographs as an interactive expanding photo-strip, with each photo expanding into an immersive "journal chapter" view. Backed by Lovable Cloud (Supabase).

## 1. Enable Lovable Cloud

The project currently has no backend. Enable Lovable Cloud so we can store photo metadata and image URLs in a database (and host images via Storage).

## 2. Database

Create `photos` table (via migration):

```
photos
├── id            uuid PK
├── title         text
├── image_url     text          (Supabase Storage public URL)
├── location      text
├── category      text
├── story         text
├── camera        text
├── lens          text
├── settings      text          (e.g. "f/2.8 · 1/500s · ISO 200")
├── date_taken    date
├── sort_order    int           (manual ordering)
└── created_at    timestamptz
```

- RLS enabled
- Public read policy (`SELECT TO anon, authenticated USING (true)`) since this is portfolio content
- `GRANT SELECT ... TO anon, authenticated`, `GRANT ALL ... TO service_role`
- Storage bucket `photos` (public read) for image uploads

Seed with 5–6 starter rows using `picsum.photos` placeholder URLs so the page renders immediately. User can replace via Supabase later (or we add an admin uploader as a follow-up).

## 3. Route & data loading

- New file: `src/routes/album.tsx` → `/album`
- Add "Album" link to `src/components/site-nav.tsx` between Projects and Certifications
- Loader uses `createServerFn` + `supabaseAdmin` (public read) primed via `ensureQueryData`; component reads via `useSuspenseQuery`
- `head()` with route-specific title/description/OG tags
- `errorComponent` + `notFoundComponent`

## 4. Gallery component (`src/components/photo-strip.tsx`)

Desktop expanding photo-strip:
- Horizontal flex row of full-height panels (`h-[80vh]`)
- Each panel: `flex: 1` baseline; on hover, hovered panel gets `flex: 4`, siblings stay `flex: 1` → smooth CSS transition (`transition-[flex] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]`)
- Background-image cover, gold hairline dividers
- Bottom-left overlay info (title / location / category), hidden by default; on expanded panel, fades + slides up with staggered delays (title 0ms, location 120ms, category 240ms)
- Dark gradient overlay for legibility

Mobile (`<md`):
- Stack vertically; tap-to-expand state (first tap expands + reveals info; second tap opens detail)
- Tracked via `useState<number | null>(activeIndex)`

Click on a panel → sets `selectedId` (URL search param `?photo=<id>`) which scrolls the page to / mounts the Journal Chapter section below the strip.

## 5. Journal Chapter (immersive detail view)

`src/components/photo-chapter.tsx`, rendered inline on the same page (not a modal):
- Large hero image (`h-[90vh]`, object-cover)
- Editorial layout below: serif title, location · date, story prose column, right-side technical sidebar (camera / lens / settings / category) with gold hairlines
- Entrance animation: image fades + scales from 1.04, text reveals via existing `Reveal` component
- Smooth scroll into view on selection; "Close chapter" button clears the param

State synced to URL so chapters are linkable.

## 6. Styling

Reuses existing tokens — Instrument Serif headings, charcoal text, gold accents, white background. No new color tokens needed. Adds one keyframe (`chapterIn`) to `styles.css` for the chapter reveal.

## 7. Out of scope (can be added later)

- Admin upload UI (for now, photos managed directly in Supabase dashboard or via SQL)
- Lightbox keyboard nav across all photos
- Image optimization / responsive `srcset`

## Technical notes

- Server fn returns plain DTOs (Date → ISO string) for SSR safety
- Public read via server fn + `supabaseAdmin` (loader runs during SSR with no bearer token; do not use `requireSupabaseAuth` on a public route)
- Mobile state managed locally; desktop uses pure CSS hover for performance
- No new heavy dependencies — pure Tailwind transitions

Ready to build on approval.