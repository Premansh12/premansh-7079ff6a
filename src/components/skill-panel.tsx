import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { SkillRole } from "@/data/skill-roles";

type Props = {
  role: SkillRole | null;
  total: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SkillPanel({ role, total, open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border bg-background p-0 sm:max-w-xl lg:max-w-2xl"
      >
        {role && (
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-10 md:px-12">
              <span className="font-serif text-sm tracking-wider text-gold">
                {String(role.index).padStart(2, "0")}
                <span className="text-muted-foreground/60"> / {String(total).padStart(2, "0")}</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Role</span>
            </div>

            {/* Title + tagline */}
            <div className="px-8 pt-6 md:px-12">
              <h2 className="font-serif text-4xl leading-[1.05] md:text-5xl">{role.title}</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                {role.tagline}
              </p>
            </div>

            {/* Image */}
            <div className="mt-8 px-8 md:px-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md ring-1 ring-inset ring-border">
                <img src={role.image} alt="" className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-10 px-8 py-12 md:px-12 md:py-16">
              <Block label="Design philosophy">
                <p className="border-l border-gold/60 pl-4 font-serif text-xl italic leading-relaxed text-foreground">
                  {role.tagline}
                </p>
              </Block>

              <Divider />

              <Block label="Areas of expertise">
                <ul className="space-y-2">
                  {role.expertise.map((e) => (
                    <li key={e} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                      <span className="mt-2 h-px w-3 shrink-0 bg-gold" />
                      {e}
                    </li>
                  ))}
                </ul>
              </Block>

              <Divider />

              <Block label="Tools & technologies">
                <div className="flex flex-wrap gap-2">
                  {role.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs tracking-wide text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Block>

              <Divider />

              <Block label="Selected work">
                <ul className="space-y-3">
                  {role.selectedWork.map((w) =>
                    w.href ? (
                      <li key={w.label}>
                        <Link
                          to={w.href}
                          className="group/link inline-flex items-center gap-2 font-serif text-xl text-foreground transition-colors hover:text-gold"
                        >
                          {w.label}
                          <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </Link>
                      </li>
                    ) : (
                      <li key={w.label} className="font-serif text-xl text-foreground">
                        {w.label}
                      </li>
                    ),
                  )}
                </ul>
              </Block>

              <Divider />

              <Block label="Highlights">
                <ul className="space-y-3">
                  {role.highlights.map((h) => (
                    <li
                      key={h}
                      className="border-l border-gold/60 pl-4 text-[15px] italic leading-relaxed text-muted-foreground"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </Block>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold">{label}</p>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border" />;
}
