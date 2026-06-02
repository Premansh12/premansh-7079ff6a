import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import type { Photo } from "@/lib/photos.functions";

type Props = {
  photos: Photo[];
  onSelect?: (slug: string) => void;
};

// Deterministic scattered moodboard layout — cycles through preset slots so
// SSR and client render identically (no hydration jump) and every photo is
// visible at rest.
const SLOTS = [
  "top-[4%] left-[6%] rotate-[-6deg]",
  "top-[8%] left-[28%] rotate-[3deg]",
  "top-[2%] left-[52%] rotate-[-4deg]",
  "top-[10%] left-[74%] rotate-[7deg]",
  "top-[34%] left-[2%] rotate-[4deg]",
  "top-[38%] left-[22%] rotate-[-8deg]",
  "top-[30%] left-[44%] rotate-[6deg]",
  "top-[36%] left-[64%] rotate-[-3deg]",
  "top-[32%] left-[80%] rotate-[5deg]",
  "top-[62%] left-[8%] rotate-[8deg]",
  "top-[66%] left-[30%] rotate-[-5deg]",
  "top-[60%] left-[52%] rotate-[2deg]",
  "top-[64%] left-[72%] rotate-[-7deg]",
];

export function PhotoDraggable({ photos, onSelect }: Props) {
  const navigate = useNavigate();

  const open = (slug: string) => {
    if (onSelect) return onSelect(slug);
    navigate({ to: "/album", search: { photo: slug } });
  };

  return (
    <DraggableCardContainer className="relative h-[180vh] w-full md:h-[140vh]">
      <p className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/15 md:text-xs">
        Drag · Toss · Click to read
      </p>

      {photos.map((p, i) => (
        <DraggablePhotoCard
          key={p.id}
          photo={p}
          slotClass={SLOTS[i % SLOTS.length]}
          onOpen={open}
          eager={i < 4}
        />
      ))}
    </DraggableCardContainer>
  );
}

function DraggablePhotoCard({
  photo,
  slotClass,
  onOpen,
  eager,
}: {
  photo: Photo;
  slotClass: string;
  onOpen: (slug: string) => void;
  eager: boolean;
}) {
  const downPos = useRef<{ x: number; y: number } | null>(null);

  return (
    <DraggableCardBody
      className={`${slotClass} h-[22rem] w-56 md:h-[26rem] md:w-64`}
      onPointerDownCapture={(e) => {
        downPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUpCapture={(e) => {
        if (!downPos.current) return;
        const dx = e.clientX - downPos.current.x;
        const dy = e.clientY - downPos.current.y;
        downPos.current = null;
        if (Math.hypot(dx, dy) < 6) onOpen(photo.slug);
      }}
    >
      <div className="relative h-full w-full">
        <img
          src={photo.image}
          alt={photo.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a1a1a]/85 via-[#1a1a1a]/20 to-transparent p-4">
          {photo.category && (
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold">
              {photo.category}
            </p>
          )}
          <h3 className="mt-1 font-serif text-lg leading-tight text-[#f7f4ee]">
            {photo.title}
          </h3>
          {(photo.location || photo.country) && (
            <p className="mt-0.5 text-[11px] text-[#e8e2d6]/80">
              {[photo.location, photo.country].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </div>
    </DraggableCardBody>
  );
}
