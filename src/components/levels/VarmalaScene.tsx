/**
 * VarmalaScene — Interactive reveal moment.
 *
 * FLOW:
 *   1. User sees a glowing "Reveal the Moment" button
 *   2. On click → petals burst, curtain parts
 *   3. Bride & groom slide in from sides
 *   4. Varmala garlands appear and cross
 *   5. Final celebration burst of petals + glow
 *
 * All animations use GPU-friendly transforms/opacity.
 * Reduced motion → static display, no animation.
 */

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────
   PETAL BURST — celebration particles
   ───────────────────────────────────────────── */
function PetalBurst({ active }: { active: boolean }) {
  const petals = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 30,
    y: 40 + (Math.random() - 0.5) * 20,
    angle: (i / 24) * 360,
    dist: 20 + Math.random() * 60,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 0.3,
    color: ["rgba(253,184,210,0.8)", "rgba(255,183,100,0.7)", "rgba(255,215,0,0.6)", "rgba(253,224,71,0.7)"][i % 4],
  }));

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {petals.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const endX = Math.cos(rad) * p.dist;
        const endY = Math.sin(rad) * p.dist - 30;
        return (
          <motion.div key={p.id} className="absolute rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size * 1.3, background: p.color, borderRadius: "50% 0 50% 0", transform: "rotate(45deg)" }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ x: `${endX}vw`, y: `${endY}vh`, opacity: [0, 1, 0.5, 0], scale: [0, 1.2, 1, 0.3], rotate: [45, 360 + 45] }}
            transition={{ duration: 2.5, delay: p.delay, ease: "easeOut" }} />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING PETALS — ambient background
   ───────────────────────────────────────────── */
function FloatingPetals({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.div key={i} className="absolute" style={{ left: `${8 + i * 15}%`, top: "-3%" }}
          animate={{ y: ["0vh", "105vh"], x: [0, Math.sin(i * 1.3) * 25, 0], rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)], opacity: [0, 0.4, 0.2, 0] }}
          transition={{ duration: 10 + i * 2, delay: i * 1.5, repeat: Infinity, ease: "linear" }}>
          <div style={{
            width: 5 + (i % 3) * 2, height: 7 + (i % 3) * 2,
            background: `radial-gradient(ellipse at 30% 30%, ${i % 2 === 0 ? "rgba(253,184,210,0.6)" : "rgba(255,223,186,0.5)"}, transparent)`,
            borderRadius: "50% 0 50% 0", transform: "rotate(45deg)",
          }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHANDELIERS
   ───────────────────────────────────────────── */
function Chandelier({ x, delay = 0 }: { x: string; delay?: number }) {
  return (
    <div className="absolute top-0 pointer-events-none z-10" style={{ left: x }} aria-hidden="true">
      <div className="w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,160,23,0.2))" }} />
      <motion.div className="relative w-14 h-10 mx-auto" animate={{ rotate: [0, 0.8, -0.8, 0] }}
        transition={{ duration: 8, delay, repeat: Infinity }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = -50 + i * 25;
          return (
            <motion.div key={i} className="absolute w-px top-0.5 left-1/2" style={{
              height: 20, transformOrigin: "top center", transform: `rotate(${angle}deg)`,
              background: "linear-gradient(to bottom, rgba(212,160,23,0.3), rgba(212,160,23,0.06))",
            }}>
              <motion.div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full"
                style={{ background: "radial-gradient(ellipse at bottom, #FFD700, #FF8C00 50%, transparent)", boxShadow: "0 0 5px rgba(253,224,71,0.4)" }}
                animate={{ opacity: [0.4, 0.9, 0.4], scaleY: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, delay: delay + i * 0.2, repeat: Infinity }} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVEAL BUTTON
   ───────────────────────────────────────────── */
function RevealButton({ onClick, revealed }: { onClick: () => void; revealed: boolean }) {
  if (revealed) return null;

  return (
    <motion.button onClick={onClick}
      className="relative group cursor-pointer z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}>
      {/* Outer pulse rings */}
      <motion.div className="absolute inset-0 rounded-full border border-gold-400/20"
        animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity }} />
      <motion.div className="absolute inset-0 rounded-full border border-gold-400/15"
        animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
        transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />

      {/* Main button */}
      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #d4a017 0%, #fde047 40%, #d4a017 80%, #b8860b 100%)", boxShadow: "0 0 40px rgba(212,160,23,0.3), 0 0 80px rgba(212,160,23,0.15)" }}>
        {/* Shimmer sweep */}
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full border-2 border-maroon-900/20" />
        {/* Icon */}
        <div className="relative text-center">
          <span className="text-3xl sm:text-4xl block mb-0.5">🌸</span>
          <span className="text-maroon-900 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">Tap</span>
        </div>
      </div>

      {/* Label */}
      <motion.p className="text-gold-400/50 text-xs tracking-[0.3em] uppercase mt-5 text-center font-serif"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 2.5, repeat: Infinity }}>
        Reveal the Moment
      </motion.p>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   GARLAND (Varmala) — animated garland crossing
   ───────────────────────────────────────────── */
function AnimatedVarmala({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div className="absolute left-1/2 top-[42%] -translate-x-1/2 z-30 w-64 sm:w-80"
      initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
      <svg viewBox="0 0 320 60" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Main garland rope */}
        <motion.path fill="none" stroke="#FF8C00" strokeWidth="4" strokeLinecap="round"
          d="M20,30 Q80,10 160,30 Q240,50 300,30"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }} />
        <motion.path fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"
          d="M20,30 Q80,10 160,30 Q240,50 300,30"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }} />
        {/* Marigold flowers */}
        {Array.from({ length: 11 }).map((_, i) => {
          const t = i / 10;
          const cx = 20 + t * 280;
          const cy = 30 + Math.sin(t * Math.PI) * (-20) + Math.sin(t * Math.PI * 2) * 5;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r={4 + (i % 3)}
              fill={i % 3 === 0 ? "#FF8C00" : i % 3 === 1 ? "#FFD700" : "#FF6347"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ delay: 0.8 + i * 0.08, type: "spring", stiffness: 300 }} />
          );
        })}
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CHARACTER — premium illustrated bride/groom
   Uses CSS art + SVG for a stylized look
   ───────────────────────────────────────────── */
function CharacterFigure({ type, side }: { type: "bride" | "groom"; side: "left" | "right" }) {
  const isBride = type === "bride";
  const x = side === "left" ? "20%" : "80%";

  return (
    <motion.div className="absolute z-20" style={{ left: x, top: "30%", transform: "translateX(-50%)" }}
      initial={{ x: side === "left" ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      <div className="relative w-28 sm:w-36">
        <img
          src={isBride ? "/images/bride-illustration.png" : "/images/groom-illustration.png"}
          alt={isBride ? "Bride in traditional Indian wedding attire" : "Groom in traditional Indian sherwani"}
          className="w-full h-auto object-contain rounded-2xl shadow-2xl"
          style={{ filter: "drop-shadow(0 0 20px rgba(212,160,23,0.2))" }}
        />
        {/* Name label */}
        <motion.div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}>
          <span className="text-gold-400/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-serif">
            {isBride ? "Shubhami" : "Jayesh"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CELEBRATION GLOW — final burst
   ───────────────────────────────────────────── */
function CelebrationGlow({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
        style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
      {/* Sparkle rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/15"
          style={{ width: 200 + i * 100, height: 200 + i * 100 }}
          animate={{ scale: [0.5, 1.2 + i * 0.1], opacity: [0.5, 0] }}
          transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }} />
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN VARMALA SCENE
   ═══════════════════════════════════════════ */
export default function VarmalaScene() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [showGarland, setShowGarland] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    setTimeout(() => setShowGarland(true), 1000);
    setTimeout(() => setShowCelebration(true), 2000);
  };

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #3d0010 0%, #2a0009 30%, #1f0007 55%, #2d000a 100%)" }}>

      {/* ── Top wave ── */}
      <div className="absolute top-0 left-0 right-0 z-40 -mt-px">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" style={{ width: "100%", height: "45px" }}>
          <path d="M0,0 L0,35 C240,5 480,55 720,25 C960,5 1200,45 1440,18 L1440,0 Z" fill="#3d0010" />
        </svg>
      </div>

      {/* ── Background layers ── */}
      <div className="absolute inset-0 mandala-bg opacity-[0.04]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.05), transparent 65%)", filter: "blur(50px)" }} />

      {/* ── Chandeliers ── */}
      {!prefersReducedMotion && (
        <>
          <Chandelier x="18%" delay={0} />
          <Chandelier x="50%" delay={1.2} />
          <Chandelier x="82%" delay={0.6} />
        </>
      )}

      {/* ── Ambient petals ── */}
      {!prefersReducedMotion && <FloatingPetals />}

      {/* ── Celebration burst ── */}
      {revealed && !prefersReducedMotion && <PetalBurst active={revealed} />}
      <CelebrationGlow active={showCelebration} />

      {/* ── Main content area ── */}
      <div className="relative z-30 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-20">

        {/* Section heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          <span className="text-gold-400/35 text-[10px] sm:text-xs tracking-[0.5em] uppercase block mb-2">Level 2</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400 mb-2"
            style={{ textShadow: "0 0 30px rgba(212,160,23,0.1)" }}>Varmala</h2>
          <div className="w-20 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        </motion.div>

        {/* ── REVEAL STAGE ── */}
        <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] flex items-center justify-center">

          {/* Mandap backdrop (visible after reveal) */}
          <AnimatePresence>
            {revealed && (
              <motion.div className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                <svg viewBox="0 0 500 350" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  {/* Mandap pillars */}
                  <rect x="60" y="30" width="6" height="280" rx="3" fill="#8B4513" opacity="0.3" />
                  <rect x="434" y="30" width="6" height="280" rx="3" fill="#8B4513" opacity="0.3" />
                  <rect x="170" y="60" width="4" height="250" rx="2" fill="#8B4513" opacity="0.15" />
                  <rect x="326" y="60" width="4" height="250" rx="2" fill="#8B4513" opacity="0.15" />
                  {/* Arch */}
                  <path d="M60,30 Q180,-15 250,-5 Q320,-15 440,30" fill="none" stroke="#DAA520" strokeWidth="2" opacity="0.25" />
                  {/* Drape */}
                  <path d="M63,30 Q180,0 250,5 Q320,0 437,30 Q355,18 290,8 Q250,2 210,8 Q145,18 63,30Z" fill="#800020" opacity="0.1" />
                  {/* Marigolds on arch */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const t = i / 11;
                    const cx = 60 + t * 380;
                    const cy = 30 + Math.sin(t * Math.PI) * -38;
                    return <circle key={i} cx={cx} cy={cy} r={2.5 + (i % 2)} fill={i % 2 === 0 ? "rgba(255,140,0,0.4)" : "rgba(255,215,0,0.35)"} />;
                  })}
                  {/* Ground */}
                  <ellipse cx="250" cy="310" rx="200" ry="18" fill="#2d000a" opacity="0.4" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Characters */}
          <AnimatePresence>
            {revealed && (
              <>
                <CharacterFigure type="bride" side="left" />
                <CharacterFigure type="groom" side="right" />
              </>
            )}
          </AnimatePresence>

          {/* Varmala garland */}
          <AnimatedVarmala show={showGarland} />

          {/* Reveal button (before reveal) */}
          <AnimatePresence>
            {!revealed && <RevealButton onClick={handleReveal} revealed={revealed} />}
          </AnimatePresence>
        </div>

        {/* ── Text below ── */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.p key="hint" className="text-gold-200/30 text-xs sm:text-sm mt-6 text-center font-light max-w-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Tap the golden orb to witness the sacred garland exchange.
            </motion.p>
          ) : (
            <motion.div key="text" className="text-center mt-8"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}>
              <p className="text-gold-400/60 font-serif text-lg sm:text-xl italic mb-2">
                "Where two hearts became one"
              </p>
              <p className="text-gold-200/30 text-xs tracking-[0.3em] uppercase">
                Under a canopy of flowers and blessings
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" style={{ width: "100%", height: "45px" }}>
          <path d="M0,30 C200,0 400,50 650,20 C900,0 1150,45 1440,25 L1440,70 L0,70Z" fill="#2d000a" />
        </svg>
      </div>
    </div>
  );
}
