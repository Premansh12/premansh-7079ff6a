# Global Contact & Social Identity Update

Establish a single source of truth for contact data, wire it everywhere, and redesign the Contact section + Footer to match the editorial language.

## 1. Single source of truth

Create `src/data/contact.ts` exporting:

- `EMAIL = "typeonecivilized@gmail.com"`
- `LOCATION_FOOTER = "Haldia, India"` (per spec)
- `LOCATION_CONTACT = "Jagdalpur / Remote · Available Q3 onward"` (keep existing line per prior edit)
- `SOCIALS` array: LinkedIn (`https://www.linkedin.com/in/premanshpanigrahi/`), GitHub (`https://github.com/Premansh12`), X (`https://x.com/Pr3mansh`), Instagram main (`https://www.instagram.com/premansh_panigrahi/`)
- `INSTAGRAM_PHOTO = "https://www.instagram.com/suturedpxl/"` (photography-only handle)

All components import from this file — no hard-coded URLs anywhere else.

## 2. Contact section redesign (`src/routes/index.tsx` → `Contact`)

Replace the current dark form layout with an editorial closing chapter:

- **Headline:** "Let's Build Something *Together*" (Instrument Serif, gold italic accent)
- **Subheadline:** the provided collaboration paragraph
- **Availability block** "Currently Open For" — gold chip/tag row: Design Projects · Branding Collaborations · UI/UX Consulting · Creative Experiments · Research & Innovation Discussions
- **Social Identity Block** — premium directory (not icon-only): each row shows icon + label (LinkedIn / GitHub / X / Instagram / Email) + handle/destination on the right + gold underline hover with arrow slide
- **Primary email CTA**: large mailto button → `typeonecivilized@gmail.com`
- Keep charcoal `#333333` background + gold `#d4a843` accents, spacious composition, Reveal animations
- Remove the contact form, `Field` helper, `sent` state, and `Send` icon usage

## 3. Footer redesign (`src/components/site-footer.tsx`)

Multi-row editorial footer:

- Top: "Premansh Panigrahi" wordmark + serif tagline "Have an idea worth *obsessing* over?" (italic gold on "obsessing"), location "Haldia, India"
- Social row with labeled links (LinkedIn / GitHub / X / Instagram) using Lucide icons + text
- Email line: `typeonecivilized@gmail.com` (mailto)
- Bottom: "© 2026 Premansh Panigrahi"
- Use design tokens (border, muted-foreground, gold)

## 4. Photography Journey integration

In `src/routes/album.tsx` header, add a "Follow My Photography Journey →" gold link pointing to `INSTAGRAM_PHOTO` (suturedpxl), placed under the existing intro paragraph.

## 5. SEO / metadata

In `src/routes/__root.tsx`, ensure no stale Twitter handle; keep og tags but add JSON-LD `Person` schema (name, email `mailto:typeonecivilized@gmail.com`, sameAs: the four socials).

## 6. Audit cleanup

- Remove `hello@premansh.dev` (2 occurrences) and dummy `https://instagram.com|linkedin.com|github.com|twitter.com` placeholders.
- Grep confirms no other placeholders elsewhere.

## Technical Details

- Files created: `src/data/contact.ts`
- Files edited: `src/routes/index.tsx` (Contact only), `src/components/site-footer.tsx`, `src/routes/album.tsx`, `src/routes/__root.tsx`
- No DB / server changes. Pure frontend + presentation.
- Lucide icons: `Linkedin`, `Github`, `Twitter` (for X), `Instagram`, `Mail`, `ArrowUpRight`.
- All colors via existing tokens (`text-gold`, `bg-foreground`, `text-background`) — no raw hex in components.
