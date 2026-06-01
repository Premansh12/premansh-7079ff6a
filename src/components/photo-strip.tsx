import { useState } from "react";
import type { Photo } from "@/lib/photos.functions";

export function PhotoStrip({
  photos,
  selectedId,
  onSelect,
}: {
  photos: Photo[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  // Desktop: hover-driven via CSS group state. Mobile: tap-to-expand.
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);

  return (
    <div className="group/strip flex h-[70vh] w-full flex-col gap-1 md:h-[80vh] md:flex-row">
      {photos.map((p) => {
        const isHovered = hoveredId === p.id;
        const isTapped = tappedId === p.id;
        // Desktop expand via hover; mobile via tap state
        const desktopFlex = hoveredId
          ? isHovered
            ? "md:flex-[5]"
            : "md:flex-[1]"
          : "md:flex-[2]";
        const mobileFlex = isTapped ? "flex-[4]" : "flex-[1]";

        return (
          <button
            key={p.id}
            type="button"
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              // Mobile: first tap expands, second tap opens chapter
              const isTouch = window.matchMedia("(hover: none)").matches;
              if (isTouch && tappedId !== p.id) {
                setTappedId(p.id);
                return;
              }
              onSelect(p.id);
            }}
            aria-label={`${p.title}, ${p.location ?? ""}`}
            className={`relative ${mobileFlex} ${desktopFlex} group/panel min-h-[120px] overflow-hidden bg-muted text-left transition-[flex] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
          >
            <img
              src={p.image_url}
              alt={p.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover/panel:scale-[1.04]"
            />
            {/* Gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Selected outline */}
            {selectedId === p.id && (
              <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-gold" />
            )}

            {/* Info — visible when this panel is expanded (hovered on desktop, tapped on mobile) */}
            <div
              className={`absolute inset-x-0 bottom-0 p-6 text-white transition-opacity duration-500 md:p-8 ${
                isHovered || isTapped ? "opacity-100" : "opacity-0 md:opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <h3
                  className={`font-serif text-3xl leading-tight transition-all duration-700 md:text-5xl ${
                    isHovered || isTapped
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isHovered || isTapped ? "80ms" : "0ms" }}
                >
                  {p.title}
                </h3>
              </div>
              {p.location && (
                <div className="mt-2 overflow-hidden">
                  <p
                    className={`text-sm tracking-wide text-white/80 transition-all duration-700 ${
                      isHovered || isTapped
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: isHovered || isTapped ? "200ms" : "0ms" }}
                  >
                    {p.location}
                  </p>
                </div>
              )}
              {p.category && (
                <div className="mt-3 overflow-hidden">
                  <p
                    className={`text-[10px] uppercase tracking-[0.3em] text-gold transition-all duration-700 ${
                      isHovered || isTapped
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: isHovered || isTapped ? "320ms" : "0ms" }}
                  >
                    {p.category}
                  </p>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
