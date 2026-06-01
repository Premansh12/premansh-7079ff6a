import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { SkillRole } from "@/data/skill-roles";

type Props = {
  role: SkillRole;
  total: number;
  expanded: boolean;
  onToggle: () => void;
};

export function SkillCard({ role, total, expanded, onToggle }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [light, setLight] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setLight({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }

  const lightStyle = light
    ? { background: `radial-gradient(420px circle at ${light.x}% ${light.y}%, rgba(212,168,67,0.18), transparent 60%)` }
    : undefined;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setLight(null)}
      className={[
        "group relative overflow-hidden rounded-2xl border bg-background transition-all duration-700",
        "hover:-translate-y-1 hover:shadow-[0_40px_100px_-50px_rgba(212,168,67,0.55)]",
        expanded ? "border-gold/60 shadow-[0_40px_100px_-50px_rgba(212,168,67,0.55)]" : "border-border",
      ].join(" ")}
    >
      {/* Cursor-reactive gold wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={lightStyle} />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${role.title}`}
        className="relative grid w-full grid-cols-1 items-stretch text-left md:grid-cols-[1.1fr_1fr]"
      >
        {/* Left — editorial copy */}
        <div className="flex flex-col justify-between gap-10 p-8 md:p-10 lg:p-12">
          <div className="flex items-center justify-between">
            <span className="font-serif text-sm tracking-wider text-gold">
              {String(role.index).padStart(2, "0")} <span className="text-muted-foreground/60">/ {String(total).padStart(2, "0")}</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Role</span>
          </div>

          <div>
            <h3 className="font-serif text-4xl leading-[1.02] md:text-5xl">{role.title}</h3>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">{role.tagline}</p>
            <span className="mt-8 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-24" />
          </div>

          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-foreground">
            {expanded ? (
              <>
                <X className="h-3.5 w-3.5 text-gold" /> Close
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 text-gold transition-transform duration-500 group-hover:rotate-90" /> Explore
              </>
            )}
          </span>
        </div>

        {/* Right — cinematic visual */}
        <div className="relative h-72 overflow-hidden md:h-full">
          <img
            src={role.image}
            alt=""
            loading={role.index <= 2 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/30" />
        </div>
      </button>

      {/* Expanded layer */}
      <div
        className={[
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-10 border-t border-border p-8 md:grid-cols-2 md:gap-12 md:p-10 lg:p-12">
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
                        <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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

            <Block label="Highlights">
              <ul className="space-y-3">
                {role.highlights.map((h) => (
                  <li key={h} className="border-l border-gold/60 pl-4 text-[15px] italic leading-relaxed text-muted-foreground">
                    {h}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </div>
    </article>
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
