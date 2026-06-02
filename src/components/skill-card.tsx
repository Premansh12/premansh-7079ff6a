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
        background: `radial-gradient(220px circle at ${light.x}% ${light.y}%, rgba(212,168,67,0.12), transparent 60%)`,
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
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-background text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_24px_60px_-30px_rgba(212,168,67,0.5)]"
    >
      {/* Cursor-reactive gold wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={lightStyle}
      />

      {/* Top — number + role label */}
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="font-serif text-xs tracking-wider text-gold">
          {String(role.index).padStart(2, "0")}
          <span className="text-muted-foreground/60"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Role
          <ArrowUpRight className="h-3 w-3 text-gold opacity-0 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </span>
      </div>

      {/* Center — cinematic image, fixed aspect */}
      <div className="relative mx-5 mt-4 overflow-hidden rounded-md">
        <div className="aspect-[4/5] w-full">
          <img
            src={role.image}
            alt=""
            loading={role.index <= 4 ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/30" />
      </div>

      {/* Bottom — title + tagline */}
      <div className="flex flex-col gap-2 px-5 pb-5 pt-5">
        <h3 className="font-serif text-xl leading-tight">{role.title}</h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground md:line-clamp-1">
          {role.tagline}
        </p>
        <span className="mt-2 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
      </div>
    </button>
  );
}
