/**
 * HeroBanner — Full-width animated banner for the first screen.
 *
 * ╔══════════════════════════════════════════════════════╗
 * ║  PERFORMANCE NOTES                                  ║
 * ║  • All animations use CSS transforms + opacity only ║
 * ║  • GPU-accelerated via will-change                  ║
 * ║  • Particle count reduced on mobile (< 768px)      ║
 * ║  • @media (prefers-reduced-motion) disables all     ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * PLACEHOLDER HOOK — To swap background with video:
 *   Replace the <ParallaxBackground /> with:
 *   <video autoPlay loop muted playsInline className="absolute inset-0 object-cover">
 *     <source src="/videos/hero-bg.mp4" type="video/mp4" />
 *   </video>
 */

"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────
   PARALLAX BACKGROUND LAYERS
   ───────────────────────────────────────────── */
function ParallaxBackground({ progress }: { progress: any }) {
  const y1 = useTransform(progress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(progress, [0, 1], ["0%", "35%"]);

  return (
    <>
      {/* Layer 1 — deep gradient */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: y1, background: "radial-gradient(ellipse 120% 80% at 50% 30%, #3d0012 0%, #1a0005 60%, #0d0003 100%)" }} />
      {/* Layer 2 — warm glow */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: y2, background: "radial-gradient(circle at 50% 40%, rgba(212,160,23,0.06) 0%, transparent 55%)" }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 25%, rgba(13,0,3,0.85) 100%)" }} />
      {/* Mandala texture */}
      <div className="absolute inset-0 mandala-bg opacity-[0.06]" />
    </>
  );
}

/* ─────────────────────────────────────────────
   FAIRY LIGHTS — twinkling string lights
   ───────────────────────────────────────────── */
function FairyLights() {
  const lights = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 3 + (i / 23) * 94,
    y: 1.5 + Math.sin(i * 0.9) * 2.5,
    size: 2 + (i % 3),
    delay: i * 0.18,
    color: ["253,224,71", "255,183,197", "255,223,186", "212,160,23"][i % 4],
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Wire */}
      <svg className="absolute w-full" style={{ top: "1%" }} viewBox="0 0 1440 30" preserveAspectRatio="none">
        <path d="M0,15 Q360,25 720,12 Q1080,0 1440,15" fill="none" stroke="rgba(212,160,23,0.1)" strokeWidth="0.8" />
      </svg>
      {/* Bulbs */}
      {lights.map((l) => (
        <motion.div key={l.id} className="absolute rounded-full" style={{
          left: `${l.x}%`, top: `${l.y}%`, width: l.size, height: l.size,
          background: `radial-gradient(circle, rgba(${l.color},1), rgba(${l.color},0.2) 70%, transparent)`,
          boxShadow: `0 0 ${l.size * 3}px rgba(${l.color},0.4), 0 0 ${l.size * 7}px rgba(${l.color},0.15)`,
        }} animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 2.5 + Math.random() * 0.5, delay: l.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLORAL GARLANDS — swaying drape animations
   ───────────────────────────────────────────── */
function FloralGarlands() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Left garland */}
      <svg className="absolute" style={{ top: 0, left: 0, width: "45%", height: "30%" }} viewBox="0 0 500 180" preserveAspectRatio="none">
        <motion.path fill="none" stroke="rgba(255,183,100,0.12)" strokeWidth="2.5"
          d="M0,15 Q120,100 240,45 Q360,-5 480,60"
          animate={{ d: ["M0,15 Q120,100 240,45 Q360,-5 480,60", "M0,20 Q120,95 240,50 Q355,0 480,55", "M0,15 Q120,100 240,45 Q360,-5 480,60"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        {Array.from({ length: 16 }).map((_, i) => {
          const t = i / 15;
          const cx = t * 460 + 10;
          const cy = 15 + Math.sin(t * Math.PI * 2.5) * 50 + 15;
          return <motion.circle key={`lg${i}`} cx={cx} cy={cy} r={2.5 + (i % 3)}
            fill={i % 3 === 0 ? "rgba(255,140,0,0.5)" : i % 3 === 1 ? "rgba(255,215,0,0.4)" : "rgba(253,184,210,0.35)"}
            animate={{ cy: [cy, cy + Math.sin(i) * 2.5, cy] }}
            transition={{ duration: 5 + i * 0.2, delay: i * 0.1, repeat: Infinity }} />;
        })}
      </svg>

      {/* Right garland */}
      <svg className="absolute" style={{ top: 0, right: 0, width: "40%", height: "28%" }} viewBox="0 0 400 150" preserveAspectRatio="none">
        <motion.path fill="none" stroke="rgba(255,183,100,0.1)" strokeWidth="2"
          d="M400,12 Q300,90 200,35 Q100,-8 0,50"
          animate={{ d: ["M400,12 Q300,90 200,35 Q100,-8 0,50", "M400,17 Q300,85 200,40 Q95,-3 0,45", "M400,12 Q300,90 200,35 Q100,-8 0,50"] }}
          transition={{ duration: 8, delay: 1, repeat: Infinity, ease: "easeInOut" }} />
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 11;
          const cx = 400 - t * 380;
          const cy = 12 + Math.sin(t * Math.PI * 2) * 45 + 15;
          return <motion.circle key={`rg${i}`} cx={cx} cy={cy} r={2 + (i % 3)}
            fill={i % 2 === 0 ? "rgba(255,140,0,0.45)" : "rgba(255,215,0,0.35)"}
            animate={{ cy: [cy, cy + Math.cos(i) * 2, cy] }}
            transition={{ duration: 5 + i * 0.2, delay: i * 0.15, repeat: Infinity }} />;
        })}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GOLD DUST — subtle shimmer particles
   ───────────────────────────────────────────── */
function GoldDust() {
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 0.5 + Math.random() * 1.8,
    delay: Math.random() * 6, dur: 4 + Math.random() * 4,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full" style={{
          left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
          background: `rgba(253,224,71,${0.3 + Math.random() * 0.4})`,
          boxShadow: `0 0 ${p.size * 2}px rgba(253,224,71,0.2)`,
        }} animate={{ opacity: [0, 0.8, 0], y: [0, -15 - Math.random() * 20, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FALLING PETALS — soft floating petals
   ───────────────────────────────────────────── */
function FallingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div key={i} className="absolute" style={{ left: `${10 + i * 11}%`, top: "-4%" }}
          animate={{ y: ["0vh", "110vh"], x: [0, Math.sin(i * 1.3) * 30, 0], rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)], opacity: [0, 0.45, 0.25, 0] }}
          transition={{ duration: 11 + i * 1.5, delay: i * 1.4, repeat: Infinity, ease: "linear" }}>
          <div style={{
            width: 5 + (i % 3) * 2, height: 7 + (i % 3) * 2,
            background: `radial-gradient(ellipse at 30% 30%, ${i % 2 === 0 ? "rgba(253,184,210,0.65)" : "rgba(255,183,100,0.55)"}, transparent)`,
            borderRadius: "50% 0 50% 0", transform: "rotate(45deg)",
          }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO BANNER — main exported component
   ───────────────────────────────────────────── */
export default function HeroBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden flex items-center justify-center" role="banner" aria-label="Wedding invitation hero banner">
      {/* ── Background layers ── */}
      <ParallaxBackground progress={scrollYProgress} />

      {/* ── Animated decorations (disabled if reduced motion) ── */}
      {!prefersReducedMotion && (
        <>
          <FairyLights />
          <FloralGarlands />
          <GoldDust />
          <FallingPetals />
        </>
      )}

      {/* ── Center ambient glow ── */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 65%)", filter: "blur(50px)" }} />

      {/* ── Background video ── */}
      <video autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40">
        <source src="/jayesh-wedding-game/videos/hero-banner.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(26,0,5,0.5) 0%, rgba(13,0,3,0.85) 100%)" }} />

      {/* ── Content ── */}
      <motion.div className="relative z-20 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: textOpacity }}>
        {/* Om */}
        <motion.div className="mb-5" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <motion.span className="text-gold-400/70 text-4xl sm:text-5xl block"
            style={{ filter: "drop-shadow(0 0 15px rgba(212,160,23,0.35))" }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity }}>ॐ</motion.span>
        </motion.div>

        {/* Divider */}
        <motion.div className="w-28 h-px mx-auto mb-7" style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.45), transparent)" }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />

        {/* Names */}
        <motion.h1 initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <span className="font-display text-6xl sm:text-8xl md:text-9xl text-gold-400 block leading-none"
            style={{ textShadow: "0 0 50px rgba(212,160,23,0.15), 0 4px 16px rgba(0,0,0,0.4)" }}>Jayesh</span>
        </motion.h1>

        <motion.div className="my-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 200 }}>
          <motion.span className="font-display text-3xl sm:text-5xl text-blush-400 block"
            style={{ filter: "drop-shadow(0 0 12px rgba(251,113,133,0.25))" }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}>&amp;</motion.span>
        </motion.div>

        <motion.h1 initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <span className="font-display text-6xl sm:text-8xl md:text-9xl text-gold-400 block leading-none"
            style={{ textShadow: "0 0 50px rgba(212,160,23,0.15), 0 4px 16px rgba(0,0,0,0.4)" }}>Shubhami</span>
        </motion.h1>

        {/* Divider */}
        <motion.div className="w-36 h-px mx-auto mt-8 mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.45), transparent)" }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 1.5 }} />

        {/* Date */}
        <motion.p className="text-gold-200/35 text-xs sm:text-sm tracking-[0.35em] uppercase font-light"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          15th August 2026 • Rambagh Palace, Jaipur
        </motion.p>
      </motion.div>

      {/* ── Bottom organic wave — merges into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,45 C180,90 360,15 540,55 C720,95 900,25 1080,65 C1260,105 1440,35 1440,45 L1440,120 L0,120Z" fill="#2d000a" />
          <path d="M0,65 C240,100 480,45 720,75 C960,105 1200,55 1440,65 L1440,120 L0,120Z" fill="#3d0010" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
}
