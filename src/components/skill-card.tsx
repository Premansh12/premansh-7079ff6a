import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import type { SkillRole } from "@/data/skill-roles";

type Props = {
  role: SkillRole;
  total: number;
  onOpen: () => void;
};

export function SkillCard({ role, total, onOpen }: Props) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [light, setLight] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setLight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  const lightStyle = light
    ? {
        background: `radial-gradient(160px circle at ${light.x}% ${light.y}%, rgba(212,168,67,0.14), transparent 65%)`,
      }
    : undefined;

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={() => setLight(null)}
      aria-label={`Open ${role.title} details`}
      className="group relative grid aspect-[16/9] w-full grid-cols-[1fr_38%] overflow-hidden rounded-xl border border-border bg-background text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_20px_50px_-25px_rgba(212,168,67,0.45)]"
    >
      {/* Cursor-reactive gold wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={lightStyle}
      />

      {/* Content column */}
      <div className="flex flex-col justify-between p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="font-serif text-[11px] tracking-wider text-gold">
            {String(role.index).padStart(2, "0")}
            <span className="text-muted-foreground/60">
              {" "}/ {String(total).padStart(2, "0")}
            </span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">
            Role
          </span>
        </div>

        <h3 className="font-serif text-lg leading-tight md:text-xl">
          {role.title}
        </h3>

        <div className="flex items-end justify-between gap-3">
          <p className="line-clamp-1 flex-1 text-[12px] leading-relaxed text-muted-foreground">
            {role.tagline}
          </p>
          <span className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-300 group-hover:text-gold">
            Explore
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* Image column */}
      <div className="relative h-full overflow-hidden">
        <img
          src={role.image}
          alt=""
          loading={role.index <= 4 ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/30" />
      </div>
    </button>
  );
}
