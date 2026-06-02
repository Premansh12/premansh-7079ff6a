import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { name: "About", link: "/#about" },
  { name: "Skills", link: "/#skills" },
  { name: "Projects", link: "/projects" },
  { name: "Album", link: "/album" },
  { name: "Certifications", link: "/#certifications" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={NAV} />
        <div className="relative z-20 flex items-center gap-3">
          <ThemeToggle />
          <NavbarButton href="/#contact" variant="gold">
            Contact
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
          {NAV.map((item) =>
            item.link.startsWith("/#") ? (
              <a
                key={item.link}
                href={item.link}
                onClick={() => setOpen(false)}
                className="w-full font-serif text-2xl text-foreground"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.link}
                to={item.link}
                onClick={() => setOpen(false)}
                className="w-full font-serif text-2xl text-foreground"
              >
                {item.name}
              </Link>
            ),
          )}
          <NavbarButton
            href="/#contact"
            variant="gold"
            className="mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            Contact
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
