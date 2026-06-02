import { useEffect, useState } from "react";
import heroPortrait from "@/assets/premansh-hero.png";

/**
 * Cinematic editorial preloader.
 *
 * Renders the SAME hero image asset as the homepage Hero section so the final
 * frame of this overlay is pixel-identical to the first frame underneath.
 * When the white veil dissolves, the visitor sees no swap.
 */
export function Preloader() {
  // 0 idle, 1 title in, 2 image crop reveal, 3 image expands + title out,
  // 4 image fills, 5 white veil dissolves, 6 fully done (unmount)
  const [stage, setStage] = useState(0);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document.body.classList.remove("preloading");
      setStage(5);
      const t = setTimeout(() => setUnmount(true), 250);
      return () => clearTimeout(t);
    }

    // Lock scroll + freeze Hero content animations until the image is in place
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("preloading");

    const timers = [
      setTimeout(() => setStage(1), 0),      // title in
      setTimeout(() => setStage(2), 350),    // image crop emerges
      setTimeout(() => setStage(3), 900),    // image expands, text fades
      setTimeout(() => {                     // image fills + unfreeze Hero anims
        setStage(4);
        document.body.classList.remove("preloading");
      }, 1400),
      setTimeout(() => {                     // veil dissolves while text staggers in
        setStage(5);
        document.body.style.overflow = prevOverflow;
      }, 1500),
      setTimeout(() => setUnmount(true), 2200),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("preloading");
    };
  }, []);


  if (unmount) return null;

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  // Image mask wrapper: small editorial crop → full viewport
  const imgVisible = stage >= 2;
  const imgFills = stage >= 3;
  const maskStyle: React.CSSProperties = imgFills
    ? {
        width: "100vw",
        height: "100vh",
        opacity: 1,
        clipPath: "inset(0% round 0px)",
      }
    : {
        width: "min(38vw, 520px)",
        height: "min(24vw, 320px)",
        opacity: imgVisible ? 0.92 : 0,
        clipPath: imgVisible ? "inset(0% round 2px)" : "inset(14% round 2px)",
      };

  // White veil — fully opaque until stage 5, then dissolves
  const veilOpacity = stage >= 5 ? 0 : 1;

  // Title visibility
  const titleOut = stage >= 3;
  const line1Show = stage >= 1;
  const line2Show = stage >= 1;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      aria-hidden
      style={{ pointerEvents: stage >= 5 ? "none" : "auto" }}
    >
      {/* White veil — sits above the underlying Hero, dissolves at stage 5 */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          opacity: veilOpacity,
          transition: `opacity 700ms ${ease}`,
        }}
      />

      {/* Centered image crop that grows to fill the viewport */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          style={{
            ...maskStyle,
            transition: `width 850ms ${ease}, height 850ms ${ease}, clip-path 750ms ${ease}, opacity 500ms ${ease}`,
            willChange: "width, height, clip-path, opacity",
          }}
        >
          <img
            src={heroPortrait}
            alt=""
            className="h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      {/* Editorial title block */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div
          className="flex flex-col items-center text-center text-[#1a1a1a] mix-blend-difference"
          style={{
            opacity: titleOut ? 0 : 1,
            transform: titleOut ? "translateY(-12px)" : "translateY(0)",
            transition: `opacity 700ms ${ease}, transform 900ms ${ease}`,
          }}
        >
          <h1
            className="font-serif font-normal text-white"
            style={{
              fontSize: "clamp(2rem, 6.2vw, 5.25rem)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              opacity: line1Show ? 1 : 0,
              transform: line1Show ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 800ms ${ease}, transform 900ms ${ease}`,
            }}
          >
            PREMANSH PANIGRAHI
          </h1>
          <span
            className="mt-6 font-serif text-white/80"
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.35rem)",
              letterSpacing: "0.55em",
              paddingLeft: "0.55em", // optical centering for tracked text
              opacity: line2Show ? 1 : 0,
              transform: line2Show ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 700ms ${ease} 350ms, transform 800ms ${ease} 350ms`,
            }}
          >
            2026
          </span>
        </div>
      </div>
    </div>
  );
}
