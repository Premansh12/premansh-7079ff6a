# Cinematic Editorial Preloader

Replace `src/components/preloader.tsx` with a full-screen "opening title sequence" that ends by handing the exact `premansh-hero.png` image off to the existing Hero section. No cuts, no fade-to-black, no swap.

## Approach: one shared image, one timeline

The trick is that the preloader and the Hero render the **same image asset** (`@/assets/premansh-hero.png`, already imported at module top — same URL, browser-cached, zero reflow). The preloader paints a white overlay above the Hero, animates the title + a masked crop of the image, then dissolves the overlay precisely as the underlying Hero's own `heroFade` finishes. The visitor never sees a handoff because both layers are showing the same pixels in the same place at the moment of crossover.

The Hero stays untouched. The preloader runs purely as an overlay that uninstalls itself after ~6s.

## Files

### Edit: `src/components/preloader.tsx` (full rewrite)

- `position: fixed inset-0 z-[100] bg-white` (light) — always white, ignores dark mode for this intro since the brief says "Pure white".
- Single `useState` driving stage (0→5) via `setTimeout` chain, plus a final `done` flag that triggers `opacity-0 pointer-events-none` and unmounts after the transition.
- One `<img src={heroPortrait} />` rendered inside a masked wrapper so it can grow from a small editorial crop to fill the viewport.
- Title block centered with the same `font-serif` (Instrument Serif) the site already uses.

Stage timeline (all easing `cubic-bezier(0.22, 1, 0.36, 1)`):

```text
0.0s  Stage 1: "PREMANSH PANIGRAHI" fades+rises (translateY 16→0, opacity 0→1, 700ms)
0.45s            "2026" fades+rises (500ms)
1.2s  Stage 2: image mask wrapper visible, starts as 38vw × 22vw centered,
                opacity 0→0.9, clip-path inset shrinks from 12% to 0
2.5s  Stage 3: mask wrapper scales from its editorial crop to 100vw × 100vh
                (transform-origin center; uses width/height transition + scale),
                title opacity 1→0 (600ms), slight translateY -8px
4.0s  Stage 4: image now fills viewport at the exact size/position of the Hero
                background <img> (object-cover object-center), title fully gone
5.0s  Stage 5: white overlay opacity 1→0 over 800ms; nav + hero text + CTA
                + scroll indicator are already animating in underneath via the
                Hero's existing `fadeUp` keyframes (300–1800ms delays). Because
                the preloader image and the Hero image are the same asset at the
                same on-screen rect, the dissolve is invisible.
6.0s            unmount preloader (display:none after transition)
```

Implementation details:

- Use Tailwind arbitrary values + inline `style={{ transitionDuration, transitionTimingFunction }}` rather than custom keyframes — easier to chain.
- Mask wrapper: `<div style={{ width, height, clipPath: 'inset(... round 2px)', transition: 'all 1.3s cubic-bezier(.22,1,.36,1)' }}>` containing the `<img className="h-full w-full object-cover object-center" />`. Stage 3 sets `width: 100vw; height: 100vh; clipPath: inset(0)`.
- Title: two stacked lines, `text-[clamp(2rem,6vw,5rem)]`, `tracking-[0.02em]`, `text-foreground` (charcoal). Second line `2026` smaller, `text-[clamp(1rem,2vw,1.5rem)] tracking-[0.5em] text-foreground/70 mt-6`.
- `prefers-reduced-motion`: skip stages, render `done` immediately after 200ms so screen readers / motion-sensitive users see only a brief white flash.
- Add `aria-hidden` and lock `document.body.style.overflow = 'hidden'` during stages 0–4, restore at stage 5.

### Edit: `src/routes/__root.tsx` (1-line change)

`<Preloader />` already renders before `<SiteNav />` and `<Outlet />`. Keep that order — it's exactly what we need so the Hero is already mounted and the shared `<img>` is decoded by the time stage 5 starts. No changes needed beyond confirming render order, but I'll verify.

## Preserved

- `src/routes/index.tsx` Hero — untouched. The existing `heroFade` / `fadeUp` staggered entry animations become Stage 5 for free.
- `src/components/site-nav.tsx` — untouched (its scroll listener already runs from mount).
- All other components, routes, data, styles.
- Dark mode behavior elsewhere on the site.

## Out of scope

- Hero redesign, new images, new fonts, new routes.
- Any GSAP/Motion dependency — pure CSS transitions + setTimeout are enough for this sequence at 60fps.
- Persisting "already seen" state across navigations (the brief describes the arrival experience; running once per full page load is appropriate and matches current behavior).
