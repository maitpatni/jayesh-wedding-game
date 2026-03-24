/**
 * HeroBanner — Clean video showcase section.
 * No text/overlay — just the banner video with subtle effects.
 * Names are on the invitation seal (InvitationSeal.tsx).
 *
 * PLACEHOLDER: Replace ./videos/hero-banner.mp4 with your own video.
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────
   FALLING PETALS — soft overlay
   ───────────────────────────────────────────── */
function FallingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div key={i} className="absolute" style={{ left: `${10 + i * 15}%`, top: "-4%" }}
          animate={{ y: ["0vh", "110vh"], x: [0, Math.sin(i * 1.3) * 25, 0], rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)], opacity: [0, 0.3, 0.15, 0] }}
          transition={{ duration: 12 + i * 2, delay: i * 1.5, repeat: Infinity, ease: "linear" }}>
          <div style={{
            width: 5 + (i % 3) * 2, height: 7 + (i % 3) * 2,
            background: `radial-gradient(ellipse at 30% 30%, ${i % 2 === 0 ? "rgba(253,184,210,0.5)" : "rgba(255,223,186,0.4)"}, transparent)`,
            borderRadius: "50% 0 50% 0", transform: "rotate(45deg)",
          }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO BANNER — main component
   ───────────────────────────────────────────── */
export default function HeroBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden" role="banner" aria-label="Wedding banner video">

      {/* ── Banner video — full screen, crystal clear ── */}
      <motion.video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale: videoScale }}
      >
        <source src="./videos/hero-banner.mp4" type="video/mp4" />
      </motion.video>

      {/* ── Very subtle vignette — keeps edges dark but center clear ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(13,0,3,0.4) 100%)" }} />

      {/* ── Petals overlay ── */}
      {!prefersReducedMotion && <FallingPetals />}

      {/* ── Bottom organic wave — merges into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
          <path d="M0,40 C180,80 360,15 540,50 C720,85 900,25 1080,60 C1260,95 1440,35 1440,45 L1440,100 L0,100Z" fill="#2d000a" />
          <path d="M0,60 C240,90 480,40 720,70 C960,100 1200,50 1440,60 L1440,100 L0,100Z" fill="#3d0010" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
}
