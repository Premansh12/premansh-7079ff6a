import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;
  const [i, setI] = useState(index ?? 0);
  useEffect(() => { if (index !== null) setI(index); }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") { const n = (i + 1) % images.length; setI(n); onIndexChange(n); }
      if (e.key === "ArrowLeft")  { const n = (i - 1 + images.length) % images.length; setI(n); onIndexChange(n); }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, i, images.length, onClose, onIndexChange]);

  if (!open) return null;
  const next = () => { const n = (i + 1) % images.length; setI(n); onIndexChange(n); };
  const prev = () => { const n = (i - 1 + images.length) % images.length; setI(n); onIndexChange(n); };

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/90 backdrop-blur" onClick={onClose}>
      <button onClick={onClose} aria-label="Close" className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold">
        <X className="h-4 w-4" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold">
        <ChevronRight className="h-5 w-5" />
      </button>
      <img
        src={images[i]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[86vh] max-w-[90vw] object-contain shadow-2xl"
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/70">
        {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}
