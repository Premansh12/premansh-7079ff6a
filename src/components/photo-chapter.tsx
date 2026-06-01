import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Photo } from "@/lib/photos.functions";

function formatDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function PhotoChapter({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [photo.id]);

  return (
    <section
      ref={ref}
      key={photo.id}
      className="relative animate-[chapterIn_900ms_cubic-bezier(.2,.7,.2,1)_both] border-t border-border bg-background"
    >
      <button
        onClick={onClose}
        aria-label="Close chapter"
        className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/80 backdrop-blur hover:border-gold hover:text-gold"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative h-[70vh] overflow-hidden md:h-[90vh]">
        <img
          src={photo.image_url}
          alt={photo.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.6fr_1fr] md:px-12 md:py-28">
        <div>
          {photo.category && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              {photo.category}
            </p>
          )}
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl">
            {photo.title}
          </h2>
          <p className="mt-4 text-sm tracking-wide text-muted-foreground">
            {[photo.location, formatDate(photo.date_taken)].filter(Boolean).join("  ·  ")}
          </p>
          {photo.story && (
            <p className="mt-10 max-w-prose font-serif text-2xl leading-relaxed text-foreground/90 md:text-[28px]">
              {photo.story}
            </p>
          )}
        </div>

        <aside className="md:pt-2">
          <div className="hairline mb-8" />
          <dl className="space-y-6 text-sm">
            {photo.camera && <Row label="Camera" value={photo.camera} />}
            {photo.lens && <Row label="Lens" value={photo.lens} />}
            {photo.settings && <Row label="Settings" value={photo.settings} />}
            {photo.date_taken && <Row label="Captured" value={formatDate(photo.date_taken) ?? ""} />}
            {photo.category && <Row label="Category" value={photo.category} />}
          </dl>
          <div className="hairline mt-8" />
        </aside>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4">
      <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
