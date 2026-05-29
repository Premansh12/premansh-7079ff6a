import { Instagram, Linkedin, Github, Twitter, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Premansh Panigrahi. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors"><Instagram className="h-4 w-4" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-gold transition-colors"><Linkedin className="h-4 w-4" /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-gold transition-colors"><Github className="h-4 w-4" /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-gold transition-colors"><Twitter className="h-4 w-4" /></a>
          <a href="mailto:hello@premansh.dev" aria-label="Email" className="hover:text-gold transition-colors"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
