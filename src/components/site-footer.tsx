import { Instagram, Linkedin, Github, Twitter, Mail, ArrowUpRight } from "lucide-react";
import {
  EMAIL,
  MAILTO,
  LOCATION_FOOTER,
  SOCIALS,
  type SocialKey,
} from "@/data/contact";

const ICONS: Record<SocialKey, typeof Linkedin> = {
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
  instagram: Instagram,
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:gap-24">
          <div>
            <p className="font-serif text-2xl tracking-tight">
              Premansh<span className="text-gold">.</span>Panigrahi
            </p>
            <h2 className="mt-8 max-w-xl font-serif text-4xl leading-[1.05] md:text-5xl">
              Have an idea worth <em className="italic text-gold">obsessing</em> over?
            </h2>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {LOCATION_FOOTER}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Connect
              </p>
              <ul className="mt-5 space-y-3">
                {SOCIALS.map((s) => {
                  const Icon = ICONS[s.key];
                  return (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-3 text-sm text-foreground/80 transition-colors hover:text-gold"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{s.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Email
              </p>
              <a
                href={MAILTO}
                className="mt-3 inline-flex items-center gap-3 text-sm text-foreground/90 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Premansh Panigrahi</p>
          <p className="uppercase tracking-[0.3em]">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
