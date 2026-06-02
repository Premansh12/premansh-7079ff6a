"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "motion/react";

export const DraggableCardBody = ({
  className,
  children,
  onPointerDownCapture,
  onPointerUpCapture,
  dragConstraints,
}: {
  className?: string;
  children?: React.ReactNode;
  onPointerDownCapture?: (e: React.PointerEvent) => void;
  onPointerUpCapture?: (e: React.PointerEvent) => void;
  dragConstraints?: React.RefObject<HTMLElement | null>;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimationControls();
  const [fallbackConstraints, setFallbackConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.85, 1, 0.85]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.18, 0, 0.18]), springConfig);

  useEffect(() => {
    if (dragConstraints) return;
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setFallbackConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [dragConstraints]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = cardRef.current?.getBoundingClientRect() ?? {
      width: 0, height: 0, left: 0, top: 0,
    } as DOMRect;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={dragConstraints ?? fallbackConstraints}
      dragElastic={0.8}
      dragMomentum={true}
      dragTransition={{ power: 0.6, timeConstant: 350, bounceStiffness: 120, bounceDamping: 12 }}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={(_event, info) => {
        document.body.style.cursor = "default";
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: { type: "spring", ...springConfig },
        });
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();
        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX + currentVelocityY * currentVelocityY,
        );
        const bounce = Math.min(1.0, velocityMagnitude / 800);
        animate(info.point.x, info.point.x + currentVelocityX * 0.6, {
          duration: 0.9, ease: [0.2, 0, 0, 1], bounce,
          type: "spring", stiffness: 80, damping: 12, mass: 0.7,
        });
        animate(info.point.y, info.point.y + currentVelocityY * 0.6, {
          duration: 0.9, ease: [0.2, 0, 0, 1], bounce,
          type: "spring", stiffness: 80, damping: 12, mass: 0.7,
        });
      }}
      style={{ rotateX, rotateY, opacity, willChange: "transform" }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDownCapture={onPointerDownCapture}
      onPointerUpCapture={onPointerUpCapture}
      className={cn(
        "relative min-h-96 w-80 overflow-hidden rounded-[2px] bg-card p-0 shadow-2xl transform-3d cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#fff,_transparent_70%)] select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div ref={ref} className={cn("relative overflow-clip", className)}>
      {children}
    </div>
  );
});
DraggableCardContainer.displayName = "DraggableCardContainer";
