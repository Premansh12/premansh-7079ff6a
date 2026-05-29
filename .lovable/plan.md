# Premansh Portfolio — Build Plan

A luxury, editorial portfolio built on the existing TanStack Start stack. Single-page scroll experience for the main site, with dedicated routes for each project case study.

## Design System

- **Palette** (in `src/styles.css` as oklch tokens):
  - Background: crisp white `#ffffff` / dark mode: charcoal `#1a1a1a`
  - Foreground / ink: charcoal `#333333`
  - Accent (gold): `#d4a843`
  - Muted surfaces for section transitions
- **Typography**: Instrument Serif (display/headings) + Inter (body), loaded via Google Fonts in `__root.tsx` head links.
- **Spacing**: generous whitespace, large section padding (min ~`py-32` on desktop), wide gutters.
- **Micro-interactions**: gold underline grow on links, magnetic-ish button hovers, subtle card lifts.

## Routes

```
src/routes/
  __root.tsx          → fonts, theme provider, fixed nav, preloader, back-to-top
  index.tsx           → SPA scroll page: Hero, About, Certifications, Projects grid, Contact, Footer
  projects.index.tsx  → full Projects hub grid
  projects.$slug.tsx  → dedicated case study page with lightbox gallery
```

Each route gets its own `head()` with title, description, og:title, og:description.

## Sections (index.tsx)

1. **Hero** — full-viewport, Instrument Serif headline "Just making cool things with cool people." Animated canvas background (lightweight vanilla canvas: flowing gold particle field with parallax mouse offset). Name eyebrow + scroll cue.
2. **About** — scroll-storytelling timeline. Sticky left column with name, right column reveals roles one-by-one as you scroll (web designer → branding → developer → video editor → graphic designer → UI/UX → vibe coder → future doctor). Fade/slide-up on intersection.
3. **Certifications** — luxury cards in a restrained 2-column grid: issuer, credential, year, gold hairline accents.
4. **Projects (preview)** — 3–4 featured case studies as large editorial cards, each linking to `/projects/$slug`. "View all" links to `/projects`.
5. **Contact** — bold serif CTA, functional-looking form (name, email, message — local state, toast on submit), social links.
6. **Footer** — single-line minimalist: © Premansh Panigrahi · socials.

## Projects Detail Page

- Hero image, title, role, year, stack tags
- Long-form deep-dive copy (problem → process → outcome)
- Image gallery with click-to-open lightbox (custom dialog, no heavy lib)
- Prev/next project navigation
- Project data lives in a typed `src/data/projects.ts` array (4–6 case studies with realistic copy)

## Interactive / Technical

- **Preloader**: brief overlay with logo wordmark, fades on mount
- **Smooth scroll**: CSS `scroll-behavior: smooth` + offset for fixed nav
- **Parallax**: hero canvas + subtle background layer translation on scroll
- **Scroll reveals**: small `useInView` IntersectionObserver hook → fade/slide
- **Mobile nav**: full-screen overlay hamburger menu
- **Theme toggle**: light (white/charcoal/gold) ↔ dark (charcoal/white/gold), persisted to localStorage, no-flash inline script in root shell
- **Back-to-top**: appears after scroll past hero
- **Images**: `picsum.photos` seeded URLs for cinematic placeholders
- **Icons**: lucide-react (already common in stack)

## SEO

Per-route `head()` with title, description, og tags. Root sets sitewide defaults + Organization JSON-LD. Canonical only on leaves.

## Technical Notes

- Pure frontend; no backend, no Lovable Cloud needed.
- Canvas animation kept under ~60 particles with `requestAnimationFrame` + visibility pause for performance.
- All colors via semantic Tailwind tokens (`bg-background`, `text-foreground`, `text-accent`), no hardcoded hex in components.
- Fully responsive: mobile-first, tested at sm/md/lg breakpoints.

Ready to build on approval.