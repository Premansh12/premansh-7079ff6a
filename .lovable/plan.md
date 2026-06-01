## Goal

Replace the current 4-column minimalist Skills grid in `src/routes/index.tsx` with a 2-column editorial showcase of 11 large "visual identity" cards — one per role. Imagery is the hero; each card expands on click to reveal a richer layer (expertise, tools, selected work, highlights). Aesthetic, palette, and typography stay locked.

## What ships

### 1. Visuals — 11 AI-generated cinematic illustrations

Generated with `imagegen--generate_image` at `premium` quality, saved to `src/assets/skills/`, imported as ES modules. Each image is a luxury-magazine still life (Aesop / Monocle / Apple product photo register) — soft dramatic studio lighting, off-white backdrop, depth, shadows, no people, no text, no UI chrome that would clash with the page. Same aspect (4:5 portrait, 1024×1280) and consistent palette (warm neutrals + a single gold/charcoal note) so all 11 read as one set.

Per-role direction (one image each):
- **Web Designer** — open hardcover editorial magazine spread, gridded type specimen on left page, vellum overlay
- **Branding Expert** — stacked monogrammed brand book, embossed paper swatch, brass clip
- **Website Developer** — frosted glass panel etched with monospaced code fragment, brushed brass edge
- **UI/UX Designer** — matte black tablet leaning on linen, single product screen, ceramic stylus
- **Graphic Designer** — folded silkscreen poster, ink roller, type specimen card
- **Video Editor** — vintage 16mm film reel, color grading swatch strip, lens
- **Vibe Coder** — translucent acrylic terminal block, generative wireframe inside, soft gold caustics
- **Future Doctor** — leather-bound clinical notebook, antique stethoscope, pressed botanical
- **Hobbyist** — workbench corner, half-finished wooden model, tools laid in a row
- **Tinkerer** — opened mechanical watch movement, jeweler's loupe, brass tweezers
- **Hobby Photographer** — vintage rangefinder camera, contact sheet, film canister

### 2. Layout — editorial role cards

Replaces the existing `Skills` component. 2-column responsive grid (1-col on mobile, 2-col from `md`), generous gaps, each card large enough to feel like a magazine plate.

Per card structure:
```text
┌──────────────────────────┬──────────────────────────┐
│  01 / Eleven             │                          │
│                          │   [cinematic image]      │
│  Web Designer            │                          │
│  Editorial layouts,      │                          │
│  considered type…        │                          │
│                          │                          │
│  Explore  →              │                          │
└──────────────────────────┴──────────────────────────┘
```
- Left: role number (`01/11`), serif title (Instrument Serif, large), short description (kept from current copy), gold "Explore" affordance.
- Right: full-bleed image, charcoal hairline border, subtle gold glow on hover.
- Hover: card lifts (`-translate-y-1`), image scales `1.04` with eased transition, gold ring fades in, soft drop shadow. Cursor-reactive lighting via a single radial gradient pinned to pointer coords (lightweight `onMouseMove`, no library).

### 3. Click-to-expand layer

Clicking a card animates an expanded panel inline beneath that card (full grid-row width) revealing four sections, separated by gold hairlines:
- **Areas of expertise** — 3–5 bullets
- **Tools & technologies** — chip row (reuses tokens from existing Tools section)
- **Selected work** — 1–3 entries, linked to existing `/projects/$slug` where relevant (e.g. Branding Expert → Mascara Skincare)
- **Highlights** — 2–3 short statements

Only one card open at a time (`useState<string | null>`). Expansion uses height-auto + opacity transition; the trigger card itself stays visible.

### 4. Content — defaults written from existing portfolio context

Eleven role records drafted from the portfolio's existing voice (About copy, Tools section, projects). Examples:
- *Branding Expert* → expertise: identity systems, packaging, type specimens; tools: Illustrator, InDesign, Figma; selected work: Mascara Skincare; highlights: "Concept-first identities", "Editorial restraint as a brand voice".
- *Future Doctor* → expertise: clinical reasoning, anatomy, evidence-based thinking; tools: Notion, research notebooks; highlights: "Currently MBBS, IIMSAR Haldia (Dec 2024 — present)".

All content lives in a single typed array (`SKILL_ROLES`) in `src/data/skill-roles.ts` shaped to mirror a future Supabase table — see Technical notes.

### 5. Visual consistency

Reuses existing `--gold`, `--foreground` (charcoal), `font-serif` Instrument Serif, `Reveal` component, `hairline` utility. No new color tokens. Section background stays `bg-muted/40` to match current page rhythm.

## Out of scope

- Supabase table + migration for skill roles (data file is shaped for it; migration in a later pass)
- Per-role pages or routing
- Replacing the Tools section (it sits below Skills and stays as-is)
- Touching any other section

## Technical notes

**Data shape** (`src/data/skill-roles.ts`) — designed so a Supabase table swap is a one-file change later:
```ts
export type SkillRole = {
  slug: string;            // 'web-designer'
  index: number;           // 1..11
  title: string;
  tagline: string;         // short card description
  image: string;           // imported asset URL
  expertise: string[];
  tools: string[];
  selectedWork: { label: string; href?: string }[];
  highlights: string[];
};
```
The future Supabase table would mirror this 1:1 (`skill_roles` with the array fields as `jsonb`), letting a server fn return the same DTO with no component changes.

**Files**:
- `src/data/skill-roles.ts` — new, 11 typed records
- `src/assets/skills/*.jpg` — 11 generated images (premium quality, 1024×1280)
- `src/components/skill-card.tsx` — new card + expand panel + pointer-light hook
- `src/routes/index.tsx` — replace existing `Skills` component (and its `SKILLS` array) with the new one; remove the now-unused `Skill` type

**Performance**: images set `loading="lazy"` except the first 2; same `Reveal` staggering already used elsewhere.

**Animations**: pure Tailwind + CSS transitions; no new dependencies.
