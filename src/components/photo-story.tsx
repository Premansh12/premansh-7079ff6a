import { useEffect } from "react";
import { X } from "lucide-react";
import type { Photo } from "@/lib/photos.functions";

type Props = {
  photo: Photo;
  onClose: () => void;
};

function formatDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PhotoStory({ photo, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const date = formatDate(photo.date_taken);
  const place = [photo.location, photo.country].filter(Boolean).join(", ");
  const made = [photo.camera, photo.lens, photo.settings].filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-stretch justify-end bg-[#0f0f0f]/55 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Story: ${photo.title}`}
      onClick={onClose}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="ml-auto flex h-full w-full max-w-[1400px] flex-col overflow-y-auto bg-[#fbf9f4] text-[#222] shadow-2xl md:flex-row"
        style={{ animation: "story-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#fbf9f4] text-[#222] shadow-sm transition hover:bg-gold hover:text-[#1a1a1a]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="relative flex shrink-0 items-center justify-center bg-[#efeae0] p-6 md:w-[58%] md:p-12">
          <img
            src={photo.image}
            alt={photo.title}
            className="max-h-[80vh] w-full object-contain"
          />
        </div>

        {/* Editorial column */}
        <div className="flex-1 px-7 py-10 md:px-14 md:py-20">
          {photo.category && (
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
              {photo.category}
            </p>
          )}
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] md:text-6xl">
            {photo.title}
          </h1>

          <dl className="mt-8 grid gap-y-3 text-sm text-[#444]">
            {place && (
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-[10px] uppercase tracking-[0.3em] text-[#888]">
                  Place
                </dt>
                <dd>{place}</dd>
              </div>
            )}
            {date && (
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-[10px] uppercase tracking-[0.3em] text-[#888]">
                  Date
                </dt>
                <dd>{date}</dd>
              </div>
            )}
          </dl>

          {photo.story && (
            <div className="mt-10 max-w-prose space-y-5 font-serif text-lg leading-[1.7] text-[#2a2a2a] md:text-xl">
              {photo.story.split(/\n\s*\n/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {made.length > 0 && (
            <div className="mt-12 border-t border-[#e6dfd2] pt-6">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                Made with
              </p>
              <ul className="mt-3 grid gap-1 font-mono text-xs text-[#555]">
                {photo.camera && <li>Camera · {photo.camera}</li>}
                {photo.lens && <li>Lens · {photo.lens}</li>}
                {photo.settings && <li>Settings · {photo.settings}</li>}
              </ul>
            </div>
          )}
        </div>
      </article>

      <style>{`
        @keyframes story-in {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
