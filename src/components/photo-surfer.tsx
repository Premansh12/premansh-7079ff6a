import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Photo } from "@/lib/photos.functions";

type Variant = "full" | "compact";

type Props = {
  photos: Photo[];
  variant?: Variant;
  onSelect?: (slug: string) => void;
};

/**
 * PhotoSurfer — horizontal, scroll-driven editorial gallery.
 *
 * Cards live on a horizontal rail. Vertical wheel input is translated to
 * horizontal travel; each card tilts subtly toward the viewer as it
 * approaches the rail's center, producing a calm 3D "surf" effect.
 * Respects prefers-reduced-motion by collapsing into a plain horizontal
 * scroll.
 */
export function PhotoSurfer({ photos, variant = "full", onSelect }: Props) {
  const navigate = useNavigate();
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Wheel → horizontal translation
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Only hijack vertical wheel; allow horizontal trackpad gestures to pass.
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Tilt update on scroll
  useEffect(() => {
    const el = railRef.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      const railRect = el.getBoundingClientRect();
      const center = railRect.left + railRect.width / 2;
      for (const card of cardRefs.current) {
        if (!card) continue;
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const delta = (cardCenter - center) / (railRect.width / 2);
        const clamped = Math.max(-1.4, Math.min(1.4, delta));
        const rotateY = clamped * -14;
        const scale = 1 - Math.min(Math.abs(clamped) * 0.06, 0.12);
        const translateZ = -Math.abs(clamped) * 40;
        card.style.transform = `perspective(1400px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = String(1 - Math.min(Math.abs(clamped) * 0.25, 0.35));
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, photos.length]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.6;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      el.scrollBy({ left: step, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      el.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const open = (slug: string) => {
    if (onSelect) {
      onSelect(slug);
      return;
    }
    navigate({ to: "/album", search: { photo: slug }, replace: false });
  };

  const cardWidth =
    variant === "compact"
      ? "w-[58vw] sm:w-[34vw] md:w-[24vw] lg:w-[18vw]"
      : "w-[78vw] sm:w-[48vw] md:w-[34vw] lg:w-[28vw]";

  const aspect = variant === "compact" ? "aspect-[3/4]" : "aspect-[3/4]";

  return (
    <div
      ref={railRef}
      tabIndex={0}
      role="region"
      aria-label="Photography journal — horizontal gallery"
      onKeyDown={onKeyDown}
      className="surfer-rail no-scrollbar flex snap-x snap-mandatory items-center gap-8 overflow-x-auto overflow-y-hidden px-[10vw] py-8 outline-none focus-visible:ring-1 focus-visible:ring-gold/40 md:gap-12 md:py-12"
      style={{ perspective: "1400px" }}
    >
      {photos.map((p, i) => (
        <button
          key={p.id}
          ref={(node) => {
            cardRefs.current[i] = node;
          }}
          onClick={() => open(p.slug)}
          className={`group relative shrink-0 snap-center ${cardWidth} ${aspect} surfer-card-frame text-left transition-[opacity,transform] duration-300 ease-out will-change-transform`}
          aria-label={`Open ${p.title}`}
        >
          <img
            src={p.image}
            alt={p.title}
            loading={i < 3 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Gold hairline on hover */}
          <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/70" />
          {/* Overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a1a1a]/85 via-[#1a1a1a]/30 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-6">
            {p.category && (
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                {p.category}
              </p>
            )}
            <h3 className="mt-2 font-serif text-2xl leading-tight text-[#f7f4ee] md:text-3xl">
              {p.title}
            </h3>
            {(p.location || p.country) && (
              <p className="mt-1 text-xs text-[#e8e2d6]/80 md:text-sm">
                {[p.location, p.country].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
