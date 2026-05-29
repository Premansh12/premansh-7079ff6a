import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={done}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="font-serif text-3xl tracking-tight">
          Premansh<span className="text-gold">.</span>
        </span>
        <div className="h-px w-32 overflow-hidden bg-border">
          <div className="h-full w-full origin-left animate-[loader_900ms_cubic-bezier(.2,.7,.2,1)_forwards] bg-gold" />
        </div>
      </div>
      <style>{`@keyframes loader { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </div>
  );
}
