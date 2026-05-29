import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/75 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="font-serif text-xl tracking-tight">
          Premansh<span className="text-gold">.</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) =>
            n.href.startsWith("/#") ? (
              <a key={n.href} href={n.href} className="gold-link text-sm text-foreground/80 hover:text-foreground">
                {n.label}
              </a>
            ) : (
              <Link key={n.href} to={n.href} className="gold-link text-sm text-foreground/80 hover:text-foreground">
                {n.label}
              </Link>
            ),
          )}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-opacity duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-serif text-xl">Premansh<span className="text-gold">.</span></span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-8 px-8 pt-16">
          {NAV.map((n) =>
            n.href.startsWith("/#") ? (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-serif text-5xl text-foreground"
              >
                {n.label}
              </a>
            ) : (
              <Link
                key={n.href}
                to={n.href}
                onClick={() => setOpen(false)}
                className="font-serif text-5xl text-foreground"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
