# Resizable Navbar Integration

Swap the current `SiteNav` for the Aceternity-style resizable navbar that shrinks/blurs on scroll, while keeping all existing routes, theme toggle, and brand identity.

## Files

1. **`src/components/ui/resizable-navbar.tsx`** (new)
   - Port the primitive from the snippet: `Navbar`, `NavBody`, `NavItems`, `MobileNav`, `MobileNavHeader`, `MobileNavMenu`, `MobileNavToggle`, `NavbarLogo`, `NavbarButton`.
   - Use `motion/react` (already installed as `motion`) for `useScroll` / `useMotionValueEvent` / `AnimatePresence`.
   - Replace `@tabler/icons-react` (not installed, avoid extra dep) with `Menu` / `X` from `lucide-react` (already used).
   - Replace hardcoded `bg-white`, `text-black`, `text-zinc-*`, `dark:bg-neutral-950` etc. with semantic tokens: `bg-background/80`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-accent` for the hover pill. Keeps the toggle working in both themes.
   - `NavbarLogo` becomes a TanStack `<Link to="/">` rendering `Premansh.` with the gold dot (matches current brand).
   - `NavbarButton` supports `as={Link}` for internal navigation and a `gold` variant for the CTA.

2. **`src/components/site-nav.tsx`** (rewrite, same export)
   - Replace the current sticky header with the new primitives.
   - Desktop `NavItems` fed from existing `NAV` array. Hash links (`/#about`, `/#skills`, `/#certifications`, `/#contact`) stay as `<a href>`; route links (`/projects`, `/album`) become `<Link>` via `NavbarButton as={Link}` or a small wrapper inside `NavItems` that picks the right element by prefix.
   - Right side: `ThemeToggle` + a gold "Contact" `NavbarButton` (`href="/#contact"`).
   - Mobile: `MobileNav` + `MobileNavHeader` (logo, theme toggle, hamburger) + `MobileNavMenu` listing the same items in serif type matching the current overlay aesthetic.
   - Keep `fixed inset-x-0 top-0 z-50` wrapper so it floats over hero like today.

3. **No changes** to `__root.tsx` — `<SiteNav />` is still rendered there.

## Behavior

- Scroll < 100px: full-width transparent bar (matches current top-of-page look).
- Scroll ≥ 100px: width animates to ~40rem max, `backdrop-blur-md`, subtle border + shadow, pill-shaped.
- Hover on a nav item shows the animated `bg-accent` pill behind the label.
- Theme toggle keeps working (it already toggles `.dark` on `<html>`).

## Out of scope

- No new npm packages (reuse `motion`, `lucide-react`).
- No demo `DummyContent` page — the snippet's demo content is ignored.
- No route changes, no footer changes, no homepage layout changes.
